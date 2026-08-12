/**
 * Shared blueprint color helper for title / roadmap slides.
 * Values resolve from `--bp-*` on `.deck-root[data-theme-mode]`.
 */
export const bp = (name: string, fallback: string) =>
  `var(--bp-${name}, ${fallback})`;

/** Fallbacks = dark blueprint; CSS overrides for light/dark. */
export const BP = {
  paper: bp('paper', '#0C1420'),
  paper2: bp('paper2', '#141E2E'),
  panelHi: bp('panel-hi', '#1D2A3C'),
  ink: bp('ink', '#EAF1F9'),
  ink2: bp('ink2', '#C4D2E4'),
  ink3: bp('ink3', '#93A6BE'),
  ink4: bp('ink4', '#8497AF'),
  hair: bp('hair', 'rgba(190,215,245,.20)'),
  hair2: bp('hair2', 'rgba(190,215,245,.10)'),
  grid: bp('grid', 'rgba(130,200,255,.045)'),
  cyan: bp('cyan', '#22D3EE'),
  teal: bp('teal', '#5EEAD4'),
  rose: bp('rose', '#F4737F'),
  roseWash: bp('rose-wash', 'rgba(244,115,127,.10)'),
  cyanWash: bp('cyan-wash', 'rgba(34,211,238,.12)'),
  bandBg: bp('band-bg', 'rgba(20,30,46,.86)'),
  decisionInk: bp('decision-ink', '#FFFFFF'),
  decisionAccent: bp('decision-accent', '#0FB4D8'),
  markerF: bp('marker-f', '#12294C'),
  markerC: bp('marker-c', '#0FB4D8'),
  xStroke: bp('x-stroke', '#FFFFFF'),
} as const;
