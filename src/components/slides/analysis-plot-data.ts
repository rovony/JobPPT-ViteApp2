/**
 * analysis-plot-data.ts
 *
 * Placeholder datasets for the reference AnalysisPlot component
 * (src/components/slides/AnalysisPlot.tsx). Realistic-shaped synthetic
 * data; not meant for presentation use — the live deck slides 11d/11e/11f
 * already use real Okour et al. JCP 2023 data via their custom SVG charts.
 *
 * This file exists so Prompt 3 of the friend's guide is satisfied and the
 * Recharts-powered AnalysisPlot has something to render during a visual
 * smoke test. If/when the Recharts version is promoted to the live deck,
 * these arrays get replaced with the corresponding real extracts.
 */

/* ---------- pcVPC · concentration-time prediction intervals ---------- */
/* Median + 90% PI (5–95) from 0 → 24 hr. Rises to Cmax ≈ 200 ng/mL at
   2 hr, decays to ~20 ng/mL at 24 hr. PI half-width ~35% around median. */
export interface PcVpcPoint {
  t: number;       // time post-dose (hr)
  median: number;  // median concentration (ng/mL)
  piLow: number;   // 5th percentile
  piHigh: number;  // 95th percentile
}

export const PCVPC_DATA: PcVpcPoint[] = (() => {
  const pts: PcVpcPoint[] = [];
  for (let t = 0; t <= 24; t += 0.5) {
    // Simple 1-compartment-ish absorption+elimination shape
    const ka = 1.8;     // /hr
    const ke = 0.12;    // /hr
    const F = 1.0;
    const dose = 10;    // arbitrary
    const c = (dose * F * ka) / (ka - ke) * (Math.exp(-ke * t) - Math.exp(-ka * t));
    const median = c * 25; // scale into ng/mL band
    const halfWidth = median * 0.35;
    pts.push({
      t,
      median: round(median, 2),
      piLow: round(Math.max(0, median - halfWidth), 2),
      piHigh: round(median + halfWidth, 2),
    });
  }
  return pts;
})();

/* ---------- exposure-match · AUCss vs body weight ---------- */
/* ~40 pediatric points coral (20–77 kg), ~100 adult points cyan (45–120 kg).
   Both populations cluster around target AUCss = 5 μg·h/mL with ±1 spread.
   Demonstrates pediatric values inside the adult envelope. */
export interface ExposureMatchPoint {
  weight: number; // kg
  AUCss: number;  // μg·h/mL
  population: 'pediatric' | 'adult';
}

export const EXPOSURE_MATCH_DATA: ExposureMatchPoint[] = (() => {
  const pts: ExposureMatchPoint[] = [];
  let seed = 1;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  // pediatric (n=40, 20–77 kg)
  for (let i = 0; i < 40; i++) {
    const weight = 20 + rnd() * 57;
    const AUCss = 4.8 + (rnd() - 0.5) * 1.8 + (weight / 100) * 0.2;
    pts.push({ weight: round(weight, 1), AUCss: round(AUCss, 2), population: 'pediatric' });
  }
  // adult reference (n=100, 45–120 kg)
  for (let i = 0; i < 100; i++) {
    const weight = 45 + rnd() * 75;
    const AUCss = 5.0 + (rnd() - 0.5) * 2.1 + (weight / 100) * 0.15;
    pts.push({ weight: round(weight, 1), AUCss: round(AUCss, 2), population: 'adult' });
  }
  return pts;
})();

/* ---------- exposure-response · Δ6MWD vs AUCss ---------- */
/* Flat scatter with 95% CI band; slope ≈ 0 across AUCss range 2–10. */
export interface ExposureResponsePoint {
  AUCss: number;   // μg·h/mL
  delta6MWD: number; // meters change from baseline
  ciLow: number;
  ciHigh: number;
}

export const EXPOSURE_RESPONSE_DATA: ExposureResponsePoint[] = (() => {
  const pts: ExposureResponsePoint[] = [];
  let seed = 42;
  const rnd = () => { seed = (seed * 9301 + 49297) % 233280; return seed / 233280; };
  for (let auc = 2; auc <= 10; auc += 0.25) {
    // Flat slope near zero, with jittered scatter
    const baseline = 32; // meters
    const noise = (rnd() - 0.5) * 30;
    const delta = baseline + 0.004 * (auc - 6) * 100 + noise;
    const ciHalfWidth = 12;
    pts.push({
      AUCss: round(auc, 2),
      delta6MWD: round(delta, 1),
      ciLow: round(delta - ciHalfWidth, 1),
      ciHigh: round(delta + ciHalfWidth, 1),
    });
  }
  return pts;
})();

function round(v: number, d: number) {
  const f = Math.pow(10, d);
  return Math.round(v * f) / f;
}
