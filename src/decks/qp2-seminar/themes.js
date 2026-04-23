/**
 * QP2 narrative themes — v3.3 language.
 * Each theme has a glyph + a color token name (resolves via CSS var).
 * Use `themeColor(key)` to get the CSS var string for inline styles/SVG.
 */
export const QP2_THEMES = [
  { num: '01', key: 'qp-replaces-study', token: 'amber',  glyph: '⇌', title: 'QP replaces study',  short: 'Model stands in for trial' },
  { num: '02', key: 'dose-precision',    token: 'cyan',   glyph: '◎', title: 'Dose precision',      short: 'Exposure matching · extrapolation' },
  { num: '03', key: 'global-strategy',   token: 'sage',   glyph: '⊕', title: 'Global strategy',     short: 'Multi-agency convergence' },
  { num: '04', key: 'novel-methods',     token: 'violet', glyph: '◇', title: 'Novel methods',       short: 'Stacked FDA-precedented methods' },
  { num: '05', key: 'judgment',          token: 'coral',  glyph: '◈', title: 'Judgment',             short: 'Editorial decisions that matter' },
];

export const themeVar = (token) => `var(--${token})`;