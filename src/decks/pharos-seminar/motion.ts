/**
 * Pharos motion contract — C1 custom-easing palette + delay table + spring presets.
 * Every slide imports from here. No browser-default easings anywhere in the deck.
 */

export const EASE = {
  expoOut: [0.16, 1, 0.3, 1] as const,
  smooth:  [0.4, 0, 0.2, 1] as const,
  settle:  [0.34, 1.56, 0.64, 1] as const,
  snap:    [0.7, 0, 0.84, 0] as const,
};

export const SPRING = {
  snappy:    { type: 'spring', stiffness: 320, damping: 26 } as const,
  cushiony:  { type: 'spring', stiffness: 180, damping: 20 } as const,
};

/** Default C3 delay-table — every slide may override. */
export const DELAYS = {
  eyebrow:   0.10,
  headline:  0.25,
  subhead:   0.45,
  body:      0.65,
  bodyLate:  1.10,
  flourish:  1.80,
  payoff:    2.40,
  footer:    2.60,
};
