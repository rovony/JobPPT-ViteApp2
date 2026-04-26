// Narrative-first motion grammar. Centralized variants + transitions for Framer Motion.
// All motion respects prefers-reduced-motion via a utility wrapper.

import { useReducedMotion } from 'framer-motion';

export const durations = {
  fast: 0.18,
  base: 0.32,
  slow: 0.64,
  narrative: 0.9,
};

export const easings = {
  out: [0.2, 0.8, 0.2, 1],
  inOut: [0.65, 0, 0.35, 1],
  standard: [0.4, 0, 0.2, 1],
};

// Slide-level (entrance of an entire slide)
export const slideVariants = {
  initial: { opacity: 0, y: 24 },
  enter: { opacity: 1, y: 0, transition: { duration: durations.slow, ease: easings.out } },
  exit: { opacity: 0, y: -16, transition: { duration: durations.base, ease: easings.inOut } },
};

// Narrative stagger (reveal layered content in sequence)
export const narrativeStagger = (delayChildren = 0.15, stagger = 0.12) => ({
  initial: {},
  enter: {
    transition: { delayChildren, staggerChildren: stagger },
  },
});

// Elemental reveals (words, bullets, figures)
export const revealUp = {
  initial: { opacity: 0, y: 12 },
  enter: { opacity: 1, y: 0, transition: { duration: durations.base, ease: easings.out } },
};

export const revealIn = {
  initial: { opacity: 0 },
  enter: { opacity: 1, transition: { duration: durations.base, ease: easings.standard } },
};

// Step-driven variants: given a `step` and a target `at`, returns animate state.
export function stepState(step, at) {
  return step >= at ? 'enter' : 'initial';
}

export function prefersReducedMotion() {
  if (typeof window === 'undefined') return false;
  return window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;
}

// Reactive hook. Returns true when the user has `prefers-reduced-motion:
// reduce` set at the OS level, and updates when the setting changes.
//
// Shared-element transitions (lungs across slides 5/6, analysis-plot frame
// across slides 10/11/12, approval timeline across 7/13) gate their
// layoutId wrapper on this hook — when it returns true, render the element
// WITHOUT a layoutId so framer-motion falls back to a plain swap / fade
// instead of running a flight animation.
//
// Delegates to framer-motion's useReducedMotion under the hood, but named
// for the deck so callsites read intentionally. If we swap motion libraries
// later, only this wrapper needs updating.
export function useReducedMotionPref() {
  return useReducedMotion();
}