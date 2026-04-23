/**
 * Pure pharmacokinetic math — 1-compartment oral absorption model.
 *
 * Model (Bateman equation):
 *   C(t) = (F · Dose · ka) / (V · (ka − ke)) · [ exp(−ke · t) − exp(−ka · t) ]
 *
 * where:
 *   ke = CL / V        (elimination rate constant, 1/h)
 *   F  = bioavailability fraction (0–1, fixed at 1 here for simplicity)
 *
 * Units assumed throughout:
 *   Dose  — mg
 *   ka    — 1/h
 *   CL    — L/h
 *   V     — L
 *   t     — h
 *   C(t)  — mg/L  (= µg/mL)
 *
 * This file has no React / no side effects — pure functions only, so it
 * can be reused in tests, other slides, and offline analyses.
 */

export const DEFAULTS = {
  dose: 100,   // mg
  ka:   1.2,   // 1/h
  CL:   5,     // L/h
  V:    20,    // L
  tMax: 24,    // h (simulation horizon)
};

/**
 * Build a concentration-time series over [0, tMax] with `steps` points.
 * Returns an array of { t, c } — ready to feed directly to Recharts.
 */
export function simulateConcentration({ dose, ka, CL, V, tMax, steps = 200 }) {
  const ke = CL / V;
  // Degenerate case: ka === ke collapses the Bateman denominator.
  // Nudge ke slightly so the curve renders without a NaN spike.
  const keSafe = Math.abs(ka - ke) < 1e-6 ? ke * 1.0001 : ke;
  const coef = (dose * ka) / (V * (ka - keSafe));

  const pts = new Array(steps + 1);
  for (let i = 0; i <= steps; i++) {
    const t = (i / steps) * tMax;
    const c = coef * (Math.exp(-keSafe * t) - Math.exp(-ka * t));
    pts[i] = { t, c: Math.max(0, c) };
  }
  return pts;
}

/**
 * Derive headline PK metrics from parameters (closed-form where possible):
 *   · tMax  — time of peak concentration (h)
 *   · cMax  — peak concentration (mg/L)
 *   · auc   — AUC₀→∞ (mg·h/L) = Dose / CL
 *   · tHalf — elimination half-life (h) = ln(2) · V / CL
 *   · ke    — elimination rate constant (1/h)
 */
export function deriveMetrics({ dose, ka, CL, V }) {
  const ke = CL / V;
  const keSafe = Math.abs(ka - ke) < 1e-6 ? ke * 1.0001 : ke;
  const tMax = Math.log(ka / keSafe) / (ka - keSafe);
  const coef = (dose * ka) / (V * (ka - keSafe));
  const cMax = coef * (Math.exp(-keSafe * tMax) - Math.exp(-ka * tMax));
  const auc = dose / CL;          // AUC₀→∞ for a single oral dose, F = 1
  const tHalf = Math.log(2) / keSafe;
  return { tMax, cMax, auc, tHalf, ke: keSafe };
}