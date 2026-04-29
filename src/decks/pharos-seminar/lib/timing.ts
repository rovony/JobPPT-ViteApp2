/**
 * D-table convention — named time beats (seconds) for cinematic slides.
 *
 * Adapted from cs3-06-pilot's `SEQ` and the Amendment-4 §6.3 timing-table
 * spec. Each table is consumed by `useStory(table, { loop })` and the
 * slide gates content via `story.isAfter('beat')` / `story.progress(a, b)`.
 *
 * Why one file for all of them? — when a beat slips on slide 11, the same
 * beat name on slide 12a may need to slip too (the Magic Move from 12a
 * lands at a fixed musical phrase). Keeping every table in one place lets
 * us tune choreography across the deck without grepping individual slides.
 */

/** Slide 5 — A4 Decisive Move. Sparse hero with 700ms breath. */
export const D_GAP = {
  bg:        0.0,
  line1:     0.30,
  line2:     0.95,
  pause:     1.65,   // 700ms breath here
  line3:     2.35,   // italic hammer line
  rule:      3.10,
  mono:      3.45,
  final:     4.20,
} as const;

/**
 * Slide 11 — A4 Cinematic Movie Scene (killer · principle 5 · orthogonal).
 * Three acts: 5 expert boxes → +4 boxes → +4 more, fixed shared band below.
 * Speaker-triggered acts at 60s and 120s; overlay lines at 150s/165s.
 */
export const D_KILLER = {
  bg:           0.0,
  band:         0.60,    // shared-infrastructure band reveals
  act1:         1.20,    // 5 initial expert boxes drop
  act1Settled:  3.20,
  act2:         60.0,    // +4 boxes (speaker-triggered, but auto-fires for autoplay)
  act2Settled:  62.0,
  act3:         120.0,   // +4 more
  act3Settled:  122.0,
  overlay1:     150.0,   // first overlay line
  overlay2:     165.0,   // second overlay line
  payoff:       170.0,   // takeaway lands
  glow:         172.0,   // violet stripe glow on take-home
  final:        180.0,
} as const;

/** Slide 12a — Composed Dashboard 4-quadrant entrance cascade. */
export const D_WORKING_OVERVIEW = {
  bg:        0.0,
  q1:        0.30,    // user input quadrant
  q2:        0.85,    // orchestration trace (typewriter)
  q3:        1.65,    // NCA result table
  q4:        2.40,    // deployment status
  ticker:    3.10,    // live integer ticker starts
  final:     4.20,
} as const;

/** Slide 12b — Magic Move from 12a; bottom audit row reveals. */
export const D_WORKING_AUDIT = {
  bg:        0.0,
  morph:     0.60,    // shared layoutId morph completes
  auditRow:  1.20,    // bottom audit chain row reveals
  hashes:    2.20,    // hash blocks cascade
  verify:    3.40,    // VERIFY sweep
  badge:     5.40,    // "DEPLOYED · LIVE" glass badge pulses
  final:     6.20,
} as const;

/**
 * Slide 21 — Synthesis · Workflow Trace (cs3-06-pilot distilled to ~120s).
 * Each act lights one principle + one component; act 9 shows 5/5 · 5/5 tally.
 */
export const D_SYNTHESIS_TRACE = {
  bg:           0.20,
  nodes:        1.00,
  s1_human:     4.00,    // P1 hierarchy introduced
  s2_privacy:   18.00,   // P2 + Privacy Wall
  s3_data:      32.00,   // Data Flow component
  s4_nca:       50.00,   // NCA component
  s5_modeler:   70.00,   // PopPK lit
  s6_review:    88.00,   // P4 SOPs + Marketplace SOP
  s7_final:    102.00,
  s8_audit:    116.00,   // P3 + Audit Chain
  s9_done:     120.00,   // P5 overlay; tally
  final:       126.00,
} as const;

/** Slide 22 — Publication close + iframe load. */
export const D_PUBLICATION = {
  bg:        0.0,
  manuscript: 0.30,   // left manuscript block
  frame:     0.85,    // BrowserFrame mounts (iframe begins loading)
  qr:        2.20,    // QR card slides up
  badge:     3.10,    // "live at pharazi.ai" badge pulses
  final:     5.00,
} as const;

/** Generic helper — clamp 0..1 progress between two beats. */
export function progress(time: number, from: number, to: number): number {
  if (to <= from) return 1;
  return Math.max(0, Math.min(1, (time - from) / (to - from)));
}
