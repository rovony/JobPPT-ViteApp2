import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useDictation — hands-free voice input for the presenter assistant.
 *
 * Why a separate hook from useAmbientListen?
 *   useAmbientListen runs continuously and tries to detect AUDIENCE
 *   questions. useDictation is the OPERATOR'S OWN voice — they tap
 *   mic once, speak, and it auto-sends to the AI when they pause.
 *   Different intent, different lifecycle, different keyboard model.
 *
 * Design (informed by how voice assistants ship in production tools —
 * Otter, Granola, ChatGPT mobile, Whisper UIs):
 *   1. Single tap toggles dictation on/off (no press-and-hold —
 *      holding a button mid-talk while presenting is unusable).
 *   2. Live interim transcript surfaces in the parent's input field
 *      so the user sees in real time WHAT THE MIC IS HEARING — that
 *      single piece of feedback is what makes voice trustworthy.
 *   3. Silence-based auto-finalize: when the recognizer pauses for
 *      ~SILENCE_MS without new speech, we treat it as end-of-utterance,
 *      stop, and emit `onFinal(text)` so the parent sends to AI.
 *   4. Esc cancels (drops what was heard, doesn't send). Manual
 *      tap-again finalizes immediately.
 *
 * The browser's SpeechRecognition is free, interim-capable, and
 * already in our dependency surface (used by useAmbientListen). We
 * only fall back to MediaRecorder+Whisper for browsers without
 * SpeechRecognition (Firefox).
 *
 * Returns:
 *   supported       browser has SpeechRecognition
 *   listening       mic is hot
 *   interim         live transcript so far (string, may end mid-word)
 *   error           last recognizer error code, '' if none
 *   start()         turn dictation on (idempotent)
 *   stop({finalize}) turn off; if finalize=true, call onFinal with
 *                   the buffered transcript before stopping; if
 *                   false, drop what was heard (Esc / cancel)
 *   toggle()        flip listening
 */

const SILENCE_MS = 1500;
const MAX_DURATION_MS = 30_000; // hard cap: even if user forgets, we stop

export function useDictation({ onFinal, onInterim } = {}) {
  const SR =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;
  const supported = !!SR;

  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');

  const recRef = useRef(null);
  const bufRef = useRef(''); // running final transcript across results
  const silenceTimer = useRef(null);
  const maxTimer = useRef(null);
  const wantOnRef = useRef(false);

  const finalizeAndStop = useCallback(() => {
    const text = (bufRef.current || interim).trim();
    bufRef.current = '';
    setInterim('');
    wantOnRef.current = false;
    try { recRef.current?.stop(); } catch {}
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    setListening(false);
    if (text) onFinal?.(text);
  }, [interim, onFinal]);

  const armSilence = useCallback(() => {
    clearTimeout(silenceTimer.current);
    silenceTimer.current = setTimeout(() => {
      // No new speech for SILENCE_MS → treat as end-of-utterance.
      finalizeAndStop();
    }, SILENCE_MS);
  }, [finalizeAndStop]);

  const start = useCallback(() => {
    if (!supported || listening) return;
    setError('');
    bufRef.current = '';
    setInterim('');
    wantOnRef.current = true;

    try {
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onresult = (e) => {
        let interimText = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) {
            bufRef.current = `${bufRef.current} ${res[0].transcript}`.trim();
          } else {
            interimText += res[0].transcript;
          }
        }
        const combined = `${bufRef.current} ${interimText}`.trim();
        setInterim(combined);
        onInterim?.(combined);
        // Restart the silence timer on every speech event — as long
        // as user keeps talking, we keep listening.
        armSilence();
      };

      rec.onerror = (e) => {
        if (e.error && e.error !== 'no-speech' && e.error !== 'aborted') {
          setError(e.error);
        }
      };

      rec.onend = () => {
        // The browser sometimes ends recognition unilaterally (mic
        // glitch, long pause). If the user still wants it on AND
        // we haven't passed our hard cap, restart.
        if (wantOnRef.current) {
          try { rec.start(); } catch { /* ignore — auto-restart will retry */ }
          return;
        }
        setListening(false);
      };

      rec.start();
      recRef.current = rec;
      setListening(true);
      armSilence();
      // Hard cap so a forgotten mic doesn't stay on for the entire talk.
      clearTimeout(maxTimer.current);
      maxTimer.current = setTimeout(finalizeAndStop, MAX_DURATION_MS);
    } catch (err) {
      setError(err?.message || String(err));
      setListening(false);
      wantOnRef.current = false;
    }
  }, [supported, listening, SR, onInterim, armSilence, finalizeAndStop]);

  const stop = useCallback(({ finalize = true } = {}) => {
    wantOnRef.current = false;
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    if (finalize) {
      finalizeAndStop();
    } else {
      // Cancel — drop the buffered text, just stop.
      bufRef.current = '';
      setInterim('');
      try { recRef.current?.stop(); } catch {}
      setListening(false);
    }
  }, [finalizeAndStop]);

  const toggle = useCallback(() => {
    if (listening) stop({ finalize: true });
    else start();
  }, [listening, start, stop]);

  // Cleanup on unmount.
  useEffect(() => () => {
    wantOnRef.current = false;
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    try { recRef.current?.stop(); } catch {}
  }, []);

  return { supported, listening, interim, error, start, stop, toggle };
}
