import { useEffect, useRef } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * useSlideTracker — records each slide visit as a SlideView row.
 *
 * Writes a row every time the slide changes (or the tab closes/hides),
 * capturing: the slide left, how long it was on screen, which slide
 * the viewer came from, and the nav direction (forward/backward/jump).
 *
 * A single session_id persists per browser tab so rows can be chained
 * back into a session for funnel/navigation-pattern analysis.
 *
 * Noise filters:
 *   · Durations < 300ms are dropped (rapid skip-throughs).
 *   · Rows are written via bulkCreate-style single create per flush —
 *     simple and reliable; analytics volume for a seminar is low.
 */
const MIN_DURATION_MS = 300;

function makeSessionId() {
  return `s_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 8)}`;
}

export function useSlideTracker({ deckId, slideId, slideIndex, isPresenter = false, enabled = true }) {
  const sessionIdRef = useRef(null);
  const enteredAtRef = useRef(null);
  const currentRef = useRef(null); // { slideId, slideIndex, enteredFromSlideId, direction }
  const prevIndexRef = useRef(null);

  if (sessionIdRef.current == null) sessionIdRef.current = makeSessionId();

  useEffect(() => {
    if (!enabled || !deckId || !slideId) return;

    // Figure out direction based on previous index
    const prev = prevIndexRef.current;
    let direction = 'entry';
    let enteredFrom = '';
    if (prev != null && currentRef.current) {
      enteredFrom = currentRef.current.slideId || '';
      if (slideIndex === prev + 1) direction = 'forward';
      else if (slideIndex === prev - 1) direction = 'backward';
      else direction = 'jump';
    }

    // Flush the previous slide's view before starting the new one
    const flushPrev = () => {
      const cur = currentRef.current;
      const enteredAt = enteredAtRef.current;
      if (!cur || !enteredAt) return;
      const duration = Date.now() - enteredAt;
      if (duration < MIN_DURATION_MS) return;
      // Fire-and-forget; no await to avoid blocking nav
      base44.entities.SlideView.create({
        deck_id: deckId,
        slide_id: cur.slideId,
        slide_index: cur.slideIndex,
        duration_ms: duration,
        entered_from_slide_id: cur.enteredFromSlideId || '',
        direction: cur.direction,
        session_id: sessionIdRef.current,
        is_presenter: !!isPresenter,
      }).catch(() => { /* swallow — analytics must not break the deck */ });
    };

    flushPrev();

    currentRef.current = { slideId, slideIndex, enteredFromSlideId: enteredFrom, direction };
    enteredAtRef.current = Date.now();
    prevIndexRef.current = slideIndex;

    // Also flush on tab hide / unload
    const onHide = () => {
      if (document.visibilityState === 'hidden') flushPrev();
    };
    const onUnload = () => flushPrev();
    document.addEventListener('visibilitychange', onHide);
    window.addEventListener('beforeunload', onUnload);

    return () => {
      document.removeEventListener('visibilitychange', onHide);
      window.removeEventListener('beforeunload', onUnload);
      // On unmount (deck close), flush one last time
      flushPrev();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [deckId, slideId, slideIndex, isPresenter, enabled]);
}