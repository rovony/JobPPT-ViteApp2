// @ts-nocheck
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * useStory — single rAF clock + named phase budget.
 *
 * Adapted from `cs3-06-pilot.tsx` (qp2-seminar-v4) and trimmed for the
 * 5 component-tour cards: each card declares a sequence of named beats
 * (`{ start: 0, draw: 0.6, fill: 1.5, params: 2.3, ... }`) in seconds,
 * and the hook returns a single live `time` plus helpers for gating
 * elements off it.
 *
 *   const story = useStory({
 *     start: 0, draw: 0.6, fill: 1.5, params: 2.3, stamp: 3.0,
 *   }, { loop: 6.0 });
 *
 *   {story.isAfter('fill') && <AucFill />}
 *   <ProgressBar v={story.progress('draw', 'fill')} />
 *   <PhaseChip name={story.phase} />
 *
 * Reduced-motion: `time` snaps to the highest beat (`final`) so every
 * `isAfter()` resolves true and the slide renders its end state with
 * no animation.
 */

export type StorySeq = Record<string, number>;

export interface UseStoryOpts {
  /** Loop period in seconds. If set, the clock resets every `loop` s. */
  loop?: number;
  /** Pause the clock until this is true (e.g. inView gate). Defaults true. */
  go?: boolean;
}

export interface Story<S extends StorySeq> {
  /** Current elapsed seconds (reset each loop). */
  time: number;
  /** Highest beat name whose start is <= time. */
  phase: keyof S | null;
  /** Returns true if `time >= seq[name]`. */
  isAfter: (name: keyof S) => boolean;
  /** Returns true if `time < seq[name]`. */
  isBefore: (name: keyof S) => boolean;
  /** Returns 0..1 progress between two named beats (clamped). */
  progress: (from: keyof S, to: keyof S) => number;
  /** True when reduced-motion is active and the slide should render its final state. */
  reduced: boolean;
}

export function useStory<S extends StorySeq>(seq: S, opts: UseStoryOpts = {}): Story<S> {
  const { loop, go = true } = opts;
  const reduced = !!useReducedMotion();
  const [time, setTime] = useState<number>(reduced ? Infinity : 0);
  const startedAtRef = useRef<number | null>(null);
  const frameRef = useRef<number | null>(null);

  useEffect(() => {
    if (reduced) {
      setTime(Infinity);
      return;
    }
    if (!go) return;

    startedAtRef.current = performance.now();
    const tick = () => {
      const now = performance.now();
      const elapsed = (now - (startedAtRef.current ?? now)) / 1000;
      const t = loop ? elapsed % loop : elapsed;
      setTime(t);
      frameRef.current = requestAnimationFrame(tick);
    };
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      if (frameRef.current != null) cancelAnimationFrame(frameRef.current);
      frameRef.current = null;
    };
  }, [reduced, go, loop]);

  // Pre-compute sorted beats once per render — small N (≤ ~10).
  const beats = Object.keys(seq) as Array<keyof S>;

  let phase: keyof S | null = null;
  if (reduced) {
    // Pick the last (highest-time) beat so render reaches end state.
    let max = -Infinity;
    for (const b of beats) {
      if (seq[b] >= max) {
        max = seq[b];
        phase = b;
      }
    }
  } else {
    let bestT = -Infinity;
    for (const b of beats) {
      if (time >= seq[b] && seq[b] > bestT) {
        bestT = seq[b];
        phase = b;
      }
    }
  }

  return {
    time,
    phase,
    reduced,
    isAfter: (name) => reduced || time >= seq[name],
    isBefore: (name) => !reduced && time < seq[name],
    progress: (from, to) => {
      if (reduced) return 1;
      const a = seq[from];
      const b = seq[to];
      if (b <= a) return 1;
      return Math.max(0, Math.min(1, (time - a) / (b - a)));
    },
  };
}
