/* C1 — Custom easing palette. Mirror of CSS tokens for JS consumers (Framer Motion). */

export const EASE = {
  /** Classic editorial entrance — fast start, settled finish */
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  /** Symmetric — useful for transitions between two stable states */
  smoothStep: [0.45, 0, 0.55, 1] as [number, number, number, number],
  /** Settling — for elements that "land" softly */
  settle: [0.22, 1, 0.36, 1] as [number, number, number, number],
  /** Acceleration only — for exits */
  snap: [0.5, 0, 0.75, 0] as [number, number, number, number],
} as const;

/** Spring presets — Framer Motion physics */
export const SPRING = {
  snappy: { type: "spring" as const, stiffness: 300, damping: 30 },
  cushiony: { type: "spring" as const, stiffness: 120, damping: 18 },
} as const;

/** Standard durations (seconds) — match CSS --dur-* tokens */
export const DUR = {
  instant: 0.12,
  snap: 0.2,
  base: 0.35,
  soft: 0.6,
  cinematic: 1.2,
  setPiece: 2.4,
} as const;
