/**
 * QP2 narrative themes — v3.3 language.
 * Each theme has a glyph + a color token name (resolves via CSS var).
 * Use `themeColor(key)` to get the CSS var string for inline styles/SVG.
 */
// Per zaj-slides P5 case-color contract (CLAUDE.md): coral, cyan,
// violet are reserved for CS1 / CS2 / CS3 case identity across the
// deck. Themes are CROSS-CASE concepts that appear in framework
// ribbons, bridge slides, and theme tiles on every case — so
// theme-token colors MUST be drawn from the deck-neutral palette
// (amber + sage) only, otherwise a "Dose precision" tile rendered
// on a violet CS3 slide reads as a CS2 callback (cyan) and a
// "Judgment" tile on a cyan CS2 slide reads as a CS1 callback
// (coral). Five themes alternate amber/sage; glyph + number carry
// the per-theme differentiation. (Apr 2026 P5 audit fix.)
export const QP2_THEMES = [
  { num: '01', key: 'qp-replaces-study', token: 'amber', glyph: '⇌', title: 'QP replaces study',  short: 'Model stands in for trial' },
  { num: '02', key: 'dose-precision',    token: 'sage',  glyph: '◎', title: 'Dose precision',      short: 'Exposure matching · extrapolation' },
  { num: '03', key: 'global-strategy',   token: 'amber', glyph: '⊕', title: 'Global strategy',     short: 'Multi-agency convergence' },
  { num: '04', key: 'novel-methods',     token: 'sage',  glyph: '◇', title: 'Novel methods',       short: 'Stacked FDA-precedented methods' },
  { num: '05', key: 'judgment',          token: 'amber', glyph: '◈', title: 'Judgment',             short: 'Editorial decisions that matter' },
];

export const themeVar = (token) => `var(--${token})`;