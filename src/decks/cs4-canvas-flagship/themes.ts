/**
 * cs4-canvas-flagship themes.
 *
 * Re-exports the editorial palette + easings + duration tiers from
 * cs4-flagship-v1/themes (sage = #7BAE7F, EASE_EDITORIAL, DUR.standard,
 * SHARED_LAYOUT_IDS.beam, etc.) and adds canvas-specific constants
 * (logical canvas size, viewport size, layoutId family for the canvas
 * primitives).
 *
 * Keeping this in one place means the canvas deck shares vocabulary
 * with cs4-flagship-v1 — when CS4 is folded into V5, the layoutIds
 * and easings line up exactly.
 */

export {
  CS4_CASE,
  EASE_EDITORIAL,
  EASE_DATA,
  EASE_CAMERA,
  EASE_MICRO,
  EASE_EXIT,
  DUR,
  SHARED_LAYOUT_IDS,
} from '../cs4-flagship-v1/themes';

// ────────────────────────────────────────────────────────────────────
// Canvas geometry
// ────────────────────────────────────────────────────────────────────

/** Logical canvas size — every zone's coordinates are relative to this. */
export const CANVAS_W = 8000;
export const CANVAS_H = 4500;

/** Viewport (the visible "frame"). The CanvasStage renders at logical
 *  size; CanvasViewport translates+scales the stage to bring camera
 *  positions into this frame. */
export const VIEWPORT_W = 1920;
export const VIEWPORT_H = 1080;

// ────────────────────────────────────────────────────────────────────
// Canvas-specific layoutIds (additive to SHARED_LAYOUT_IDS)
//
// Every shared element that morphs across camera positions gets a
// stable id here. The strings are byte-identical across all components
// — Framer Motion uses them to interpolate bounding boxes when an
// element visually relocates between camera framings.
// ────────────────────────────────────────────────────────────────────
export const CANVAS_LAYOUT_IDS = {
  // Camera 4 LLM badge ↔ Camera 5 L0 Supervisor node
  llmBadge:        'cs4-llm-badge',

  // Camera 2 silhouette ↔ Camera 5 Tier-1 Analyst icon ↔
  // Camera 9 review-gate icon ↔ Camera 10 stage 3 Analyst at desk
  analyst:         'cs4-analyst',

  // Architecture node ids (used in C5 + C9 + C10 stage 1)
  l0:              'cs4-arch-l0',
  l1Data:          'cs4-arch-l1-data',
  l1Nca:           'cs4-arch-l1-nca',
  l1PopPK:         'cs4-arch-l1-poppk',
  l1Sim:           'cs4-arch-l1-sim',
  l1Review:        'cs4-arch-l1-review',
  l2Cov:           'cs4-arch-l2-cov',
  l2Vpc:           'cs4-arch-l2-vpc',
  l2Design:        'cs4-arch-l2-design',
  pharmStateBus:   'cs4-pharmstate-bar',

  // Audit chain (C8 ↔ C10 stages 1 + 4)
  auditChain:      'cs4-audit-chain',

  // TracingBeam (C2..C10) — the right-edge progress hairline
  beamTrack:       'cs4-canvas-beam-track',
  beamFill:        'cs4-canvas-beam-fill',
  beamHead:        'cs4-canvas-beam-head',
} as const;

// ────────────────────────────────────────────────────────────────────
// Camera transition defaults — overridden per-position in
// canvas/cameraPositions.ts when needed (e.g. finale stage 1 = 4.5s)
// ────────────────────────────────────────────────────────────────────
export const CAMERA_DEFAULTS = {
  duration:       1.4,                         // standard pan
  ease:           [0.65, 0, 0.35, 1] as const, // in-out-cubic
  finaleS1Dur:    4.5,                         // C10 stage 1 zoom-out
  finaleS3Dur:    0.6,                         // C10 stage 3 rapid zoom-in
};
