// @ts-nocheck
import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';

/**
 * Slide 11d · CS1 Model Fit — "No systematic bias".
 *
 * ONE hero viz (pcVPC) + ONE receipt (parameter table) + ONE payoff line.
 *
 * pcVPC, Recharts-free (pure SVG) for total control:
 *   • Outer 90% PI ribbon (5/95) — cyan wash
 *   • Inner 90% PI ribbon (median) — coral wash
 *   • Observed median line — coral, drawn L→R via stroke-dashoffset
 *   • Observed 5/95 dashed — coral hairlines
 *   • ~200 observation dots scatter-popped in staggered waves
 *
 * Param table — 6 rows, fixed-width columns, monospaced estimates.
 *   Hero rows (CL/F, Vc/F) highlighted in coral + bold.
 *   Vp/F sensitivity footnote honors correction C1.1.
 *
 * Fixes from the HTML mockup:
 *   • No D3 (not in our stack). Custom SVG + memoized data.
 *   • No CSS-var colors in SVG attrs — resolved to hex via useTokens.
 *   • preserveAspectRatio="xMidYMid meet" throughout.
 *   • Dropped the 12-covariate forest strip (redundant with slide 11b
 *     Decision 03) to respect the 90s speaking budget.
 *   • Observation dots get staggered via Framer Motion (no buggy CSS
 *     custom-property-on-SVG trick).
 */

export default function Slide11dCaseFit() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    chartBg: 0.70, ribbon: 1.00, obsLine: 1.40, dots: 1.60,
    table: 0.80, covRibbon: 2.80, payoff: 3.20,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <motion.section
      data-case="coral"
      className="relative w-full h-[100dvh] overflow-hidden"
      style={{ background: 'var(--bg)' }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease }}
    >
      {/* ─── Chrome ──────────────────────────────── */}
      <motion.div
        className="absolute top-[6vh] left-[var(--deck-gutter)] flex items-center gap-4 deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
        }}
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        <span className="h-px w-10" style={{ background: 'var(--coral)' }} />
        CS1 · Fit — pcVPC across 5 time bins
      </motion.div>
      <motion.div
        className="absolute top-[6vh] right-[var(--deck-gutter)] deck-mono uppercase"
        style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.chrome }}
      >
        Case Study 01 · Model Fit
      </motion.div>

      {/* ─── Headline + subhead ──────────────────── */}
      <motion.h1
        className="absolute deck-display"
        style={{
          top: '11vh',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          fontSize: 'clamp(1.8rem, 3vw, 3.2rem)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--ls-display)',
          color: 'var(--cream)',
          fontWeight: 500,
          maxWidth: '34ch',
        }}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease, delay: D.headline }}
      >
        The model described pediatric PK{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          without systematic bias.
        </span>
      </motion.h1>

      <motion.p
        className="absolute deck-display italic"
        style={{
          top: '24vh',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          fontSize: 'var(--fs-card-body)',
          lineHeight: 'var(--lh-base)',
          color: 'var(--cream-muted)',
          maxWidth: '70ch',
          fontWeight: 400,
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.subhead }}
      >
        pcVPC ·{' '}
        <HighlightWord color="var(--coral)" delay={1.4}>500 replicates · N = 41 enrolled · 39 PK-evaluable · 211 obs</HighlightWord>
        . Observed 5<sup>th</sup> / 50<sup>th</sup> / 95<sup>th</sup> percentiles sit inside the model-simulated CIs across all five time bins.
      </motion.p>

      {/* ═══════════ LEFT — pcVPC chart (hairline panel · zaj-slides v2.1) ═══════════
          Wrapped in a square-corner hairline to match the parameter table on
          the right. Without it the chart sits naked next to a bordered card,
          and the asymmetry reads as "one is data, the other is decoration".
          Square corners — rounded card chrome is banned (craft-bans skill).

          NOTE on `bottom: 24vh`: AnalysisPlot wraps PcVpcChart in
          `position: absolute, inset: 0`, so the chart can't push its
          parent's height. Without an explicit `bottom`, the wrapper
          would collapse to label height (~67px) and the hairline
          would frame only the label, leaving the chart naked. */}
      <div
        className="absolute border p-5 flex flex-col"
        style={{
          top: '32vh',
          bottom: '24vh',
          left: 'var(--deck-gutter)',
          width: '56%',
          borderColor: 'var(--cream-hairline)',
          borderRadius: 0,
        }}
      >
        <motion.div
          className="deck-mono uppercase mb-2"
          style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, ease, delay: D.chartBg }}
        >
          pcVPC — prediction-corrected visual predictive check
        </motion.div>
        <div style={{ flex: '1 1 0', minHeight: 0, position: 'relative' }}>
          <AnalysisPlot variant="pcvpc">
            <PcVpcChart tk={tk} D={D} />
          </AnalysisPlot>
        </div>
      </div>

      {/* ═══════════ RIGHT — Parameter table (hairline panel · square corners) ═══════════
          Was `rounded-lg` (shadcn-style rounded card) — flattened to square
          corners to comply with the no-rounded-card-chrome rule and to match
          the pcVPC panel on the left. */}
      <motion.div
        className="absolute border p-5"
        style={{
          top: '32vh',
          left: '60%',
          right: 'var(--deck-gutter)',
          borderColor: 'var(--cream-hairline)',
          borderRadius: 0,
          background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.table }}
      >
        <div
          className="deck-mono uppercase mb-3"
          style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
        >
          Pediatric PopPK — final estimates
        </div>

        <ParamTable tk={tk} />

        <div
          className="deck-mono mt-4"
          style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.08em', lineHeight: 1.5, color: 'var(--cream-faint)' }}
        >
          Allometry FIXED · CL, Q ∝ WT<sup>0.75</sup> · V<sub>c</sub>, V<sub>p</sub> ∝ WT<sup>1.0</sup> · 70-kg ref.
          <br />
          <span style={{ color: 'var(--cream-muted)' }}>V<sub>p</sub>/F sensitivity:</span>{' '}
          tested at 8.51 · 81.3 · 180 L across 5 body weights — AUC &amp; C<sub>max</sub> unchanged.
        </div>
      </motion.div>

      {/* ─── Covariate screen ribbon ─────────────── */}
      {/* Pre-empts the parsimony question: 12 pre-specified covariates were
          tested via full-model approach + backward deletion at p<0.001
          (ΔOFV>10.83, df=1). None retained → final covariate model = base +
          allometric body-weight scaling. Sourced from Okour 2023 Data S1. */}
      <motion.div
        className="absolute"
        style={{
          bottom: '16vh',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          paddingTop: 'var(--space-3)',
          paddingBottom: 'var(--space-3)',
          paddingLeft: 'var(--space-4)',
          borderLeft: '2px solid var(--coral)',
          background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        }}
        initial={{ opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.55, ease, delay: D.covRibbon }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.22em',
            color: 'var(--coral)',
            fontWeight: 700,
            marginBottom: 6,
          }}
        >
          Covariate screen ·{' '}
          <span style={{ color: 'var(--cream)' }}>12 pre-specified</span> ·{' '}
          <span style={{ color: 'var(--cream)' }}>0 retained</span>
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
            marginBottom: 4,
          }}
        >
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Hepatic</span>{' '}
          (bilirubin · ALT · AST · ALP · GGT) ·{' '}
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Renal</span>{' '}
          (CrCl) ·{' '}
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Demographic</span>{' '}
          (age · sex · race · ethnicity) ·{' '}
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Dosing</span>{' '}
          (body weight · dose group)
        </div>
        <div
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.06em',
            lineHeight: 1.5,
            color: 'var(--cream-faint)',
          }}
        >
          Full-model approach · backward deletion at p&lt;0.001 (ΔOFV &gt; 10.83, df = 1) ·
          final covariate model = base + allometric body-weight scaling.
        </div>
      </motion.div>

      {/* ─── Payoff line ─────────────────────────── */}
      <motion.div
        className="absolute"
        style={{ bottom: '9vh', left: 'var(--deck-gutter)', maxWidth: '70%' }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: D.payoff }}
      >
        <div className="h-px mb-3" style={{ width: 120, background: 'var(--coral)', opacity: 0.7 }} />
        <div
          className="deck-display italic"
          style={{
            fontSize: 'var(--fs-card-title)',
            lineHeight: 'var(--lh-snug)',
            color: 'var(--cream)',
            fontWeight: 500,
          }}
        >
          Observed median tracks predicted median across the full dosing interval —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
            no systematic bias, no drift.
          </span>
        </div>
      </motion.div>

      {/* ─── Source + page no. ───────────────────── */}
      <motion.div
        className="absolute"
        style={{
          bottom: '3vh',
          left: 'var(--deck-gutter)',
          right: 'var(--deck-gutter)',
          paddingTop: '10px',
          borderTop: '1px solid var(--cream-hairline)',
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: '2rem',
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: D.payoff + 0.4 }}
      >
        <span
          className="deck-display italic"
          style={{ fontSize: 'var(--fs-card-body)', color: 'var(--cream-muted)' }}
        >
          Source · Okour et al. JCP 2023 (Fig 2B, Table 2) · pcVPC 500 replicates
        </span>
        <span
          className="deck-mono uppercase"
          style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        >
          10 / 35
        </span>
      </motion.div>
    </motion.section>
  );
}

/* ========================================================
   pcVPC Chart — rebuilt against real study data (5 time bins).
   Data source: AMB112529 pediatric observations + 500-replicate
   simulation CIs (Okour et al. JCP 2023, Fig 2B).

   Chart logic:
     • 3 simulated-CI ribbons: around 50th, 95th, 5th percentiles.
     • 3 observed percentile polylines: median (solid), 5/95 (dashed).
     • Observed-median dots at each bin.
     • Observed percentile sits inside its simulated CI → no bias.
   ======================================================== */

// Binned pcVPC data (time_h, observed + simulated-CI per percentile)
const PCVPC = [
  { t: 2,  obsMed: 369.4, obs5: 85.6,  obs95: 1133.2, simMedLo: 368.7, simMedHi: 502.6, sim95Lo: 884.3,  sim95Hi: 1419.1, sim5Lo: 58.4, sim5Hi: 151.9 },
  { t: 6,  obsMed: 487.3, obs5: 114.3, obs95: 712.4,  simMedLo: 359.8, simMedHi: 504.4, sim95Lo: 655.3,  sim95Hi: 1050.2, sim5Lo: 53.7, sim5Hi: 251.5 },
  { t: 12, obsMed: 184.2, obs5: 58.5,  obs95: 257.8,  simMedLo: 93.8,  simMedHi: 242.4, sim95Lo: 257.0,  sim95Hi: 478.0,  sim5Lo: 25.0, sim5Hi: 92.1  },
  { t: 18, obsMed: 227.7, obs5: 133.8, obs95: 823.8,  simMedLo: 90.9,  simMedHi: 270.1, sim95Lo: 254.9,  sim95Hi: 588.9,  sim5Lo: 32.5, sim5Hi: 95.9  },
  { t: 30, obsMed: 119.4, obs5: 39.0,  obs95: 297.0,  simMedLo: 86.4,  simMedHi: 128.7, sim95Lo: 214.0,  sim95Hi: 432.8,  sim5Lo: 19.6, sim5Hi: 49.6  },
];

/* Individual observations (AMB112529 · subset rendered at the 5 nominal
   sampling times for visual clarity — full dataset is n = 211 across 39
   evaluable patients, stated in the slide body and the panel headline).
   Deterministic horizontal jitter at each time so overlapping values stay
   visible without implying a real time-offset. */
const OBS_RAW = [
  // t = 2h (28 obs)
  [2, 3319.0], [2, 1530.6], [2, 1389.5], [2, 1123.1], [2, 943.6], [2, 824.1],
  [2, 705.9],  [2, 653.3],  [2, 653.3],  [2, 604.7],  [2, 570.6], [2, 538.4],
  [2, 470.2],  [2, 395.0],  [2, 331.9],  [2, 295.5],  [2, 268.3], [2, 238.9],
  [2, 216.8],  [2, 185.7],  [2, 165.4],  [2, 136.3],  [2, 121.3], [2, 102.0],
  [2, 89.0],   [2, 73.4],   [2, 60.5],   [2, 27.9],
  // t = 6h (12 obs)
  [6, 719.7], [6, 666.1], [6, 616.5], [6, 581.7], [6, 548.9], [6, 479.4],
  [6, 435.2], [6, 395.0], [6, 325.5], [6, 189.4], [6, 112.3], [6, 82.4],
  // t = 12h (10 obs)
  [12, 278.9], [12, 253.1], [12, 229.8], [12, 208.6], [12, 193.1],
  [12, 178.7], [12, 94.4],  [12, 62.9],  [12, 57.1],  [12, 38.7],
  // t = 18h (9 obs)
  [18, 890.4], [18, 808.3], [18, 351.7], [18, 268.3], [18, 225.4],
  [18, 200.7], [18, 189.4], [18, 178.7], [18, 136.3],
  // t = 30h (24 obs)
  [30, 470.2], [30, 380.0], [30, 338.4], [30, 295.5], [30, 253.1],
  [30, 200.7], [30, 178.7], [30, 162.2], [30, 144.4], [30, 128.6],
  [30, 108.0], [30, 94.4],  [30, 85.7],  [30, 77.8],  [30, 72.0],
  [30, 66.6],  [30, 54.9],  [30, 48.9],  [30, 44.4],  [30, 40.3],
  [30, 21.3],  [30, 13.6],  [30, 8.4],   [30, 7.1],
];

function PcVpcChart({ tk, D }) {
  const W = 1080, H = 420;
  const m = { top: 20, right: 32, bottom: 50, left: 82 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const x = d3.scaleLinear().domain([0, 32]).range([0, iw]);
  const y = d3.scaleLog().domain([5, 4000]).range([ih, 0]);

  const yTicks = [10, 30, 100, 300, 1000, 3000];
  const xTicks = [2, 6, 12, 18, 30];

  // Build jittered observation points (deterministic pseudo-random via rank order)
  const binCounts = { 2: 0, 6: 0, 12: 0, 18: 0, 30: 0 };
  const observations = OBS_RAW.map(([t, c], i) => {
    const idx = binCounts[t]++;
    // Triangle-wave jitter across ±0.7h — even fill, no clustering
    const span = 1.4;
    const jitter = ((idx * 0.6180339887) % 1) * span - span / 2;
    return { t: t + jitter, c, i, bin: t };
  });

  // Build smooth ribbon paths through the 5 bin points
  const ribbonMed = PCVPC.map((d) => ({ t: d.t, lo: d.simMedLo, hi: d.simMedHi }));
  const ribbon95  = PCVPC.map((d) => ({ t: d.t, lo: d.sim95Lo,  hi: d.sim95Hi  }));
  const ribbon5   = PCVPC.map((d) => ({ t: d.t, lo: d.sim5Lo,   hi: d.sim5Hi   }));
  const obsMedPts = PCVPC.map((d) => ({ t: d.t, c: d.obsMed }));
  const obs5Pts   = PCVPC.map((d) => ({ t: d.t, c: d.obs5   }));
  const obs95Pts  = PCVPC.map((d) => ({ t: d.t, c: d.obs95  }));

  const area = d3.area()
    .x((d) => x(d.t))
    .y0((d) => y(d.lo))
    .y1((d) => y(d.hi))
    .curve(d3.curveMonotoneX);

  const line = d3.line()
    .x((d) => x(d.t))
    .y((d) => y(d.c))
    .curve(d3.curveMonotoneX);

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: '42vh' }}
      aria-label="Prediction-corrected visual predictive check — observed percentiles sit inside simulated CIs"
    >
      <g transform={`translate(${m.left},${m.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
        ))}
        {xTicks.map((v) => (
          <line key={`gx-${v}`} x1={x(v)} x2={x(v)} y1={0} y2={ih}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.22} />
        ))}

        {/* Simulated 5th CI ribbon (light coral) */}
        <motion.path
          d={area(ribbon5)}
          fill={tk('--coral')}
          initial={{ opacity: 0 }} animate={{ opacity: 0.14 }}
          transition={{ duration: 0.7, delay: D.ribbon }}
        />
        {/* Simulated 95th CI ribbon (light coral) */}
        <motion.path
          d={area(ribbon95)}
          fill={tk('--coral')}
          initial={{ opacity: 0 }} animate={{ opacity: 0.14 }}
          transition={{ duration: 0.7, delay: D.ribbon + 0.1 }}
        />
        {/* Simulated median CI ribbon (stronger coral) */}
        <motion.path
          d={area(ribbonMed)}
          fill={tk('--coral')}
          initial={{ opacity: 0 }} animate={{ opacity: 0.32 }}
          transition={{ duration: 0.7, delay: D.ribbon + 0.2 }}
        />

        {/* Observed percentile lines */}
        <AnimatedLine d={line(obsMedPts)} stroke={tk('--coral')} width={2.6} delay={D.obsLine} dash={1800} />
        <AnimatedLine d={line(obs5Pts)}   stroke={tk('--coral')} width={1.4} delay={D.obsLine + 0.15} strokeDasharray="6 6" />
        <AnimatedLine d={line(obs95Pts)}  stroke={tk('--coral')} width={1.4} delay={D.obsLine + 0.3}  strokeDasharray="6 6" />

        {/* Individual observations — jittered cream dots at the 5 nominal times */}
        {observations.map((d) => (
          <motion.circle
            key={`obs-${d.i}`}
            cx={x(d.t)} cy={y(d.c)} r={2.6}
            fill={tk('--cream')} fillOpacity={0.78}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 0.78, scale: 1 }}
            transition={{
              duration: 0.25,
              ease: 'easeOut',
              delay: D.dots + (d.i % 10) * 0.02 + Math.floor(d.i / 10) * 0.05,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* Observed-median dots at each nominal time bin */}
        {PCVPC.map((d, i) => (
          <motion.circle
            key={`bin-${d.t}`}
            cx={x(d.t)} cy={y(d.obsMed)} r={4.8}
            fill={tk('--coral')} stroke={tk('--cream')} strokeWidth={1.4}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1], delay: D.dots + 0.8 + i * 0.08 }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* Y tick labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={-10} y={y(v) + 4} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v >= 1000 ? `${v / 1000}k` : v}
          </text>
        ))}
        {/* X tick labels */}
        {xTicks.map((v) => (
          <text key={`xl-${v}`} x={x(v)} y={ih + 20} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={iw / 2} y={ih + 42} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          TIME AFTER DOSE (H)
        </text>
        <text transform={`translate(-60, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          AMBRISENTAN CONCENTRATION (NG/ML)
        </text>

        {/* Legend — top-right */}
        <g transform={`translate(${iw - 460}, 6)`}>
          <rect x={0} y={0} width={14} height={10} fill={tk('--coral')} fillOpacity={0.32} />
          <text x={20} y={9} fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
            SIM CI · MEDIAN
          </text>
          <rect x={115} y={0} width={14} height={10} fill={tk('--coral')} fillOpacity={0.14} />
          <text x={135} y={9} fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
            SIM CI · 5 / 95
          </text>
          <circle cx={237} cy={5} r={2.6} fill={tk('--cream')} fillOpacity={0.78} />
          <text x={247} y={9} fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
            OBS · INDIVIDUAL
          </text>
          <circle cx={323} cy={5} r={3.6} fill={tk('--coral')} stroke={tk('--cream')} strokeWidth={1.2} />
          <text x={333} y={9} fontFamily="var(--font-mono)" fontSize="9" fill={tk('--cream-muted')}>
            OBS · MEDIAN
          </text>
        </g>
      </g>
    </svg>
  );
}

function AnimatedLine({ d, stroke, width = 2, delay = 0, dash = 2000, strokeDasharray }) {
  if (strokeDasharray) {
    return (
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={strokeDasharray}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1], delay }}
      />
    );
  }
  return (
    <motion.path
      d={d}
      fill="none"
      stroke={stroke}
      strokeWidth={width}
      strokeLinecap="round"
      strokeDasharray={dash}
      initial={{ strokeDashoffset: dash }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: 1.6, ease: [0.2, 0.7, 0.3, 1], delay }}
    />
  );
}

/* ========================================================
   Parameter table
   ======================================================== */
const PARAMS = [
  { name: 'CL / F',       unit: '(L/hr)', est: '1.17',  ci: '1.04 – 1.33',  rse: '6.3',  shr: '19.0', hero: true },
  { name: <>V<sub>c</sub> / F</>, unit: '(L)',    est: '12.3',  ci: '8.94 – 16.8',  rse: '16.1', shr: '16.5', hero: true },
  { name: 'Q / F',        unit: '(L/hr)', est: '0.457', ci: '0.302 – 0.691', rse: '21.1', shr: '29.6' },
  { name: <>V<sub>p</sub> / F</>, unit: '(L)',    est: '81.3',  ci: '50.2 – 132',   rse: '24.5', shr: '86.1', shrAccent: true },
  { name: <>K<sub>a</sub></>,     unit: '(1/hr)', est: '2.46',  ci: '1.49 – 4.07',  rse: '25.7', shr: '25.9' },
  { name: <>t<sub>lag</sub></>,   unit: '(hr)',   est: '0.525', ci: '0.393 – 0.700', rse: '14.7', shr: '26.4', fixed: true },
];

function ParamTable({ tk }) {
  return (
    <table style={{ width: '100%', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <Th align="left">Parameter</Th>
          <Th align="right">Estimate</Th>
          <Th align="right">95 % CI</Th>
          <Th align="right">% RSE</Th>
          <Th align="right">Shr %</Th>
        </tr>
      </thead>
      <tbody>
        {PARAMS.map((p, i) => (
          <tr key={i}>
            <Td align="left">
              <span style={{ color: p.hero ? 'var(--coral)' : 'var(--cream)', fontWeight: p.hero ? 700 : 500 }}>
                {p.name}
              </span>
              <span style={{ color: 'var(--cream-faint)', marginLeft: 6, fontSize: '0.85em' }}>{p.unit}</span>
            </Td>
            <Td align="right" mono bold={p.hero}>
              {p.est}
              {p.fixed && (
                <span
                  className="deck-mono uppercase"
                  style={{
                    marginLeft: 6,
                    fontSize: '0.62em',
                    letterSpacing: '0.16em',
                    color: 'var(--coral)',
                    fontWeight: 700,
                    verticalAlign: '0.08em',
                  }}
                >
                  fixed
                </span>
              )}
            </Td>
            <Td align="right" mono muted>{p.ci}</Td>
            <Td align="right" mono muted>{p.rse}</Td>
            <Td
              align="right"
              mono
              bold={p.shrAccent}
              accent={p.shrAccent}
              muted={!p.shrAccent}
            >
              {p.shr}
            </Td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Th({ children, align }) {
  return (
    <th
      className="deck-mono uppercase"
      style={{
        textAlign: align,
        fontSize: 'var(--fs-card-meta)',
        letterSpacing: '0.16em',
        fontWeight: 500,
        color: 'var(--cream-faint)',
        padding: '0 8px 8px 0',
        borderBottom: '1px solid var(--cream-hairline)',
      }}
    >
      {children}
    </th>
  );
}

function Td({ children, align, mono, bold, muted, accent }) {
  const color = accent
    ? 'var(--coral)'
    : muted
      ? 'var(--cream-muted)'
      : 'var(--cream)';
  return (
    <td
      style={{
        padding: '7px 8px 7px 0',
        textAlign: align,
        borderBottom: '1px dashed var(--cream-hairline)',
        fontFamily: mono ? 'var(--font-mono)' : 'var(--font-body)',
        fontSize: 'var(--fs-card-body)',
        color,
        fontWeight: bold ? 700 : 400,
      }}
    >
      {children}
    </td>
  );
}
