import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useAmbientListen — continuous speech-to-text via the browser's
 * Web Speech API. Free, zero-latency, no audio leaves the device.
 *
 * Returns:
 *   supported        · true if SpeechRecognition exists in this browser
 *   listening        · true while the mic is live
 *   interim          · the current not-yet-final transcript fragment
 *                      (shown as a typing-style indicator)
 *   questions        · [{ id, text, at }]  detected question sentences
 *   start() / stop() · toggle listening
 *   clear()          · empty the questions queue
 *   dismiss(id)      · remove one question from the queue
 *   pauseBriefly()   · temporarily stop for ~1.5s (called while the
 *                      presenter is using push-to-talk so the engine
 *                      doesn't hear the presenter's own voice as
 *                      audience questions)
 *
 * Design decisions:
 *   · Only sentences that pattern-match as QUESTIONS are added to
 *     the queue — either ending with "?" OR starting with an
 *     interrogative stem (what, how, why, when, who, where, which,
 *     is, are, do, does, did, can, could, would, should, will).
 *     That filters out 90%+ of the presenter's own statements.
 *   · We keep only the most recent 6 questions — enough for mid-talk
 *     recall, not enough to become visual clutter.
 *   · The recognition session auto-restarts on end / error so the
 *     presenter can leave it on across the entire talk without
 *     babysitting it.
 */

const QUESTION_STEMS = /^(what|how|why|when|who|where|which|is|are|was|were|do|does|did|can|could|would|should|will|has|have|had|may|might|shall)\b/i;

function isQuestionLike(text) {
  const t = text.trim();
  if (!t) return false;
  if (t.endsWith('?')) return true;
  // Needs at least ~3 words so short statements ("Sure.", "Right.") don't count.
  const wordCount = t.split(/\s+/).length;
  if (wordCount < 3) return false;
  return QUESTION_STEMS.test(t);
}

// Best-effort split of a free-running transcript into sentence-sized
// chunks. Native SpeechRecognition returns one "final" result at a
// time but sometimes a whole paragraph lands in one result — so we
// break on ?/./! ourselves too.
function splitSentences(text) {
  return text
    .replace(/\s+/g, ' ')
    .split(/(?<=[.!?])\s+/)
    .map((s) => s.trim())
    .filter(Boolean);
}

export function useAmbientListen() {
  const SpeechRecognition =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;
  const supported = !!SpeechRecognition;

  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [questions, setQuestions] = useState([]);
  const [error, setError] = useState('');

  const recRef = useRef(null);
  const wantOnRef = useRef(false);   // user's desired state (survives auto-restarts)
  const pausedRef = useRef(false);   // temporary pause (e.g. during push-to-talk)
  const pauseTimer = useRef(null);

  const addQuestion = useCallback((text) => {
    setQuestions((prev) => {
      // Dedupe against the most recent entry — same sentence landing
      // as both an interim and a final shouldn't double-post.
      if (prev.length && prev[prev.length - 1].text === text) return prev;
      const next = [...prev, { id: `q-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`, text, at: Date.now() }];
      // Cap at 6
      return next.slice(-6);
    });
  }, []);

  const startInternal = useCallback(() => {
    if (!supported || pausedRef.current) return;
    try {
      const rec = new SpeechRecognition();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (e) => {
        let finalText = '';
        let interimText = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) finalText += res[0].transcript;
          else interimText += res[0].transcript;
        }
        if (interimText) setInterim(interimText.trim());
        if (finalText) {
          setInterim('');
          for (const sentence of splitSentences(finalText)) {
            if (isQuestionLike(sentence)) addQuestion(sentence);
          }
        }
      };

      rec.onerror = (e) => {
        // 'no-speech' and 'aborted' are expected; anything else is real.
        if (e.error && e.error !== 'no-speech' && e.error !== 'aborted') {
          setError(e.error);
        }
      };

      rec.onend = () => {
        // Auto-restart while the user still wants listening, unless
        // we're in a brief pause window.
        setInterim('');
        if (wantOnRef.current && !pausedRef.current) {
          // Small guard against tight-loop restarts if the browser
          // is rejecting fast.
          setTimeout(() => {
            if (wantOnRef.current && !pausedRef.current) {
              try { rec.start(); } catch { startInternal(); }
            }
          }, 150);
        } else {
          setListening(false);
        }
      };

      rec.start();
      recRef.current = rec;
      setListening(true);
      setError('');
    } catch (err) {
      // start() throws if already started or if permissions were denied.
      setError(err?.message || String(err));
      setListening(false);
    }
  }, [SpeechRecognition, supported, addQuestion]);

  const start = useCallback(() => {
    if (!supported) return;
    wantOnRef.current = true;
    pausedRef.current = false;
    startInternal();
  }, [supported, startInternal]);

  const stop = useCallback(() => {
    wantOnRef.current = false;
    pausedRef.current = false;
    const rec = recRef.current;
    if (rec) {
      try { rec.stop(); } catch {}
    }
    setListening(false);
    setInterim('');
  }, []);

  const clear = useCallback(() => setQuestions([]), []);
  const dismiss = useCallback((id) => {
    setQuestions((prev) => prev.filter((q) => q.id !== id));
  }, []);

  const pauseBriefly = useCallback((ms = 1500) => {
    if (!listening) return;
    pausedRef.current = true;
    const rec = recRef.current;
    if (rec) { try { rec.stop(); } catch {} }
    clearTimeout(pauseTimer.current);
    pauseTimer.current = setTimeout(() => {
      pausedRef.current = false;
      if (wantOnRef.current) startInternal();
    }, ms);
  }, [listening, startInternal]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      wantOnRef.current = false;
      clearTimeout(pauseTimer.current);
      const rec = recRef.current;
      if (rec) { try { rec.stop(); } catch {} }
    };
  }, []);

  return {
    supported,
    listening,
    interim,
    questions,
    error,
    start,
    stop,
    clear,
    dismiss,
    pauseBriefly,
  };
}