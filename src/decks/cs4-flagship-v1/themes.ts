/**
 * cs4-flagship-v1 themes.
 *
 * CS4 = sage as the locked case identity (per zaj-slides P5 case-color
 * contract). Editorial accents (amber for review-gate, faint cream for
 * non-data ink) per Zaj editorial-motion canonical spec — never more
 * than 2 amber instances total across the deck.
 */

export const CS4_CASE = {
  token: 'sage' as const,
  color: '#7BAE7F',
  name: 'PharmAgent',
};

// Shared editorial easings — matches Zaj editorial-motion signature.
// Use these in slide JSX via `import { EASE_EDITORIAL } from '../themes'`.
export const EASE_EDITORIAL: [number, number, number, number] = [0.22, 1, 0.36, 1];   // out-expo
export const EASE_DATA:      [number, number, number, number] = [0.16, 1, 0.30, 1];   // even smoother out
export const EASE_CAMERA:    [number, number, number, number] = [0.65, 0, 0.35, 1];   // in-out-cubic
export const EASE_MICRO:     [number, number, number, number] = [0.40, 0, 0.20, 1];   // hover, tap
export const EASE_EXIT:      [number, number, number, number] = [0.40, 0, 1.00, 1];   // ease-in

// Duration tiers (seconds, for framer-motion `transition.duration`).
export const DUR = {
  micro:     0.20,
  quick:     0.45,
  standard:  0.80,
  slow:      1.40,
  cinematic: 3.20,
  hold:      2.20,
} as const;

// The case-marker layoutId is shared with V5's CS3 divider so that
// (when this deck is embedded inside V5) the sage hairline morphs
// continuously. Keep this string in sync with `CaseHeroDivider`'s
// `layoutId={`case-marker-${caseToken}`}` template.
export const SHARED_LAYOUT_IDS = {
  caseMarker:    'case-marker-sage',
  caseCard:      'case-card-sage',
  aiBrain:       'cs4-flagship-brain',     // S01 illustration → S02 Venn center
  m15Anchor:     'cs4-m15-aiml-anchor',    // S03 pillar → S05 supervisor
  network:       'cs4-pharmagent-network', // S05 hierarchy → S09 trace
  beam:          'cs4-tracing-beam',       // continuous spine
} as const;
