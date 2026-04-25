import { useCallback, useEffect, useRef, useState } from 'react';

/**
 * useDictation — hands-free voice input for the presenter assistant.
 *
 * Why a separate hook from useAmbientListen?
 *   useAmbientListen runs continuously and tries to detect AUDIENCE
 *   questions. useDictation is the OPERATOR'S OWN voice — they tap
 *   mic once, speak, and it auto-sends to the AI when they pause.
 *
 * Lifecycle:
 *   1. Tap mic → start() creates a SpeechRecognition, sets it
 *      continuous + interimResults, and arms a silence timer.
 *   2. Each onresult event mirrors interim text to the parent (so
 *      the presenter sees what's being heard) and re-arms the
 *      silence timer.
 *   3. After SILENCE_MS without new speech → finalizeAndStop fires
 *      onFinal(text), parent sends to AI.
 *   4. Esc cancels (drops buffer); tapping mic again finalizes early.
 *
 * Diagnostic logging:
 *   Every state transition logs to the console under `[dictation]`
 *   AND pushes a recent-events buffer so a UI debug panel can show
 *   what just happened. The log lines plus the buffer are how we
 *   answer "I tapped mic, nothing happened — what failed?".
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
 *   events          recent diagnostic events (most-recent first)
 *   clearEvents()   wipe the diagnostic buffer
 */

const SILENCE_MS = 1500;
const MAX_DURATION_MS = 30_000; // hard cap: even if user forgets, we stop
const MAX_EVENTS = 30;

function dlog(tag, msg, extra) {
  // Always-on console traces so the user can open DevTools and see the
  // exact sequence of events. Tagged so they're easy to filter.
  if (extra !== undefined) {
    console.info(`[dictation] ${tag}: ${msg}`, extra);
  } else {
    console.info(`[dictation] ${tag}: ${msg}`);
  }
}

export function useDictation({ onFinal, onInterim } = {}) {
  const SR =
    typeof window !== 'undefined'
      ? window.SpeechRecognition || window.webkitSpeechRecognition
      : null;
  const supported = !!SR;

  const [listening, setListening] = useState(false);
  const [interim, setInterim] = useState('');
  const [error, setError] = useState('');
  const [events, setEvents] = useState([]);

  const recRef = useRef(null);
  const bufRef = useRef(''); // running final transcript across results
  const silenceTimer = useRef(null);
  const maxTimer = useRef(null);
  const wantOnRef = useRef(false);

  const pushEvent = useCallback((tag, msg, extra) => {
    dlog(tag, msg, extra);
    setEvents((prev) => {
      const next = [
        { ts: Date.now(), tag, msg, extra: extra !== undefined ? safeStringify(extra) : null },
        ...prev,
      ];
      return next.slice(0, MAX_EVENTS);
    });
  }, []);

  // One-time supported probe + permission heads-up. Runs once on mount
  // so the console immediately reveals "your browser doesn't speak this"
  // before the user even taps.
  useEffect(() => {
    if (!supported) {
      pushEvent('init', 'NOT supported in this browser', {
        ua: navigator.userAgent,
        hint: 'Web Speech API needs Chrome / Edge / Brave / Arc. Firefox & Safari (older) lack it.',
      });
    } else {
      pushEvent('init', 'supported', { ua: navigator.userAgent.slice(0, 80) });
    }
  }, [supported, pushEvent]);

  const finalizeAndStop = useCallback(() => {
    const text = (bufRef.current || interim).trim();
    pushEvent('finalize', `text="${text}"`, { hasOnFinal: !!onFinal, len: text.length });
    bufRef.current = '';
    setInterim('');
    wantOnRef.current = false;
    try { recRef.current?.stop(); } catch (err) {
      pushEvent('finalize.stop-throw', err?.message || String(err));
    }
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    setListening(false);
    if (text) {
      try {
        onFinal?.(text);
      } catch (err) {
        pushEvent('finalize.onFinal-throw', err?.message || String(err));
      }
    } else {
      pushEvent('finalize', 'no text — skipping onFinal');
    }
  }, [interim, onFinal, pushEvent]);

  const armSilence = useCallback(() => {
    clearTimeout(silenceTimer.current);
    silenceTimer.current = setTimeout(() => {
      pushEvent('silence-fired', `no speech for ${SILENCE_MS}ms — finalizing`);
      finalizeAndStop();
    }, SILENCE_MS);
  }, [finalizeAndStop, pushEvent]);

  const start = useCallback(async () => {
    if (!supported) {
      pushEvent('start.skip', 'unsupported browser');
      return;
    }
    if (listening) {
      pushEvent('start.skip', 'already listening');
      return;
    }

    // Pre-warm mic permission via getUserMedia. This forces an
    // explicit permission prompt the first time, instead of relying
    // on SpeechRecognition's silent permission probe (which on some
    // builds returns 'not-allowed' without ever showing a prompt).
    if (navigator.mediaDevices?.getUserMedia) {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        // Immediately release — SpeechRecognition opens its own track.
        stream.getTracks().forEach((t) => t.stop());
        pushEvent('mic.permission', 'granted');
      } catch (err) {
        const name = err?.name || 'unknown';
        pushEvent('mic.permission', 'denied', { name, message: err?.message });
        setError(
          name === 'NotAllowedError'
            ? 'mic-blocked: click the lock icon in the address bar and allow microphone'
            : `mic-${name.toLowerCase()}`
        );
        return;
      }
    }

    pushEvent('start', 'creating SpeechRecognition');
    setError('');
    bufRef.current = '';
    setInterim('');
    wantOnRef.current = true;

    try {
      const rec = new SR();
      rec.continuous = true;
      rec.interimResults = true;
      rec.lang = 'en-US';

      rec.onstart = () => pushEvent('rec.onstart', 'recognizer running');
      rec.onaudiostart = () => pushEvent('rec.onaudiostart', 'mic capturing audio');
      rec.onsoundstart = () => pushEvent('rec.onsoundstart', 'sound detected');
      rec.onspeechstart = () => pushEvent('rec.onspeechstart', 'speech detected');
      rec.onspeechend = () => pushEvent('rec.onspeechend', 'speech ended');

      rec.onresult = (e) => {
        let interimText = '';
        let finalAdded = '';
        for (let i = e.resultIndex; i < e.results.length; i++) {
          const res = e.results[i];
          if (res.isFinal) {
            finalAdded += ' ' + res[0].transcript;
            bufRef.current = `${bufRef.current} ${res[0].transcript}`.trim();
          } else {
            interimText += res[0].transcript;
          }
        }
        const combined = `${bufRef.current} ${interimText}`.trim();
        pushEvent('rec.onresult', 'result', {
          interim: interimText,
          finalAdded: finalAdded.trim(),
          buffer: bufRef.current,
        });
        setInterim(combined);
        try {
          onInterim?.(combined);
        } catch (err) {
          pushEvent('rec.onresult.onInterim-throw', err?.message || String(err));
        }
        armSilence();
      };

      rec.onerror = (e) => {
        pushEvent('rec.onerror', e.error || 'unknown', { message: e.message });
        if (e.error && e.error !== 'no-speech' && e.error !== 'aborted') {
          setError(e.error);
        }
        // Permission errors will NEVER recover from a restart — bail
        // out hard so we don't loop. The user has to grant mic access
        // (browser address-bar lock icon → Site settings → Microphone).
        if (e.error === 'not-allowed' || e.error === 'service-not-allowed') {
          pushEvent('rec.onerror', 'fatal — disabling auto-restart');
          wantOnRef.current = false;
          clearTimeout(silenceTimer.current);
          clearTimeout(maxTimer.current);
          setListening(false);
        }
      };

      rec.onend = () => {
        pushEvent('rec.onend', `wantOn=${wantOnRef.current}`);
        if (wantOnRef.current) {
          try {
            rec.start();
            pushEvent('rec.onend', 'auto-restarted');
          } catch (err) {
            pushEvent('rec.onend.restart-throw', err?.message || String(err));
            // If restart throws (typically because the recognizer is in
            // an invalid state after a permission error), don't keep
            // wanting it on — that's how the loop happens.
            wantOnRef.current = false;
            setListening(false);
          }
          return;
        }
        setListening(false);
      };

      rec.start();
      recRef.current = rec;
      setListening(true);
      armSilence();
      clearTimeout(maxTimer.current);
      maxTimer.current = setTimeout(() => {
        pushEvent('max-timer-fired', 'hit hard cap, finalizing');
        finalizeAndStop();
      }, MAX_DURATION_MS);
      pushEvent('start.ok', 'recognizer.start() returned, silence armed');
    } catch (err) {
      pushEvent('start.throw', err?.message || String(err));
      setError(err?.message || String(err));
      setListening(false);
      wantOnRef.current = false;
    }
  }, [supported, listening, SR, onInterim, armSilence, finalizeAndStop, pushEvent]);

  const stop = useCallback(({ finalize = true } = {}) => {
    pushEvent('stop', `finalize=${finalize}`);
    wantOnRef.current = false;
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    if (finalize) {
      finalizeAndStop();
    } else {
      bufRef.current = '';
      setInterim('');
      try { recRef.current?.stop(); } catch (err) {
        pushEvent('stop.cancel-throw', err?.message || String(err));
      }
      setListening(false);
    }
  }, [finalizeAndStop, pushEvent]);

  const toggle = useCallback(() => {
    pushEvent('toggle', listening ? 'currently on → finalizing' : 'currently off → starting');
    if (listening) stop({ finalize: true });
    else start();
  }, [listening, start, stop, pushEvent]);

  const clearEvents = useCallback(() => setEvents([]), []);

  useEffect(() => () => {
    wantOnRef.current = false;
    clearTimeout(silenceTimer.current);
    clearTimeout(maxTimer.current);
    try { recRef.current?.stop(); } catch {}
  }, []);

  return {
    supported,
    listening,
    interim,
    error,
    start,
    stop,
    toggle,
    events,
    clearEvents,
  };
}

function safeStringify(v) {
  try { return JSON.parse(JSON.stringify(v)); } catch { return String(v); }
}
