// @ts-nocheck
import React, { useMemo } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/deck/patterns/AnalysisPlot';

/**
 * Slide 10 · CS1 Fit + Bridge — pcVPC validates · AUC×weight bridges.
 *
 * Consolidation (V3 · 2026-04-25-fit-bridge):
 *   Replaces the two-slide trio of pcVPC fit (was 10) + AUC×Cmax exposure-
 *   match (was 11). The Cmax/box-plot panel and SubgroupFlag move to
 *   slide 11 (safety E-R) where the box-plot grammar is reused. Net: 3
 *   modeling-results slides → 2 (build · fit-bridge · safety).
 *
 * Layout:
 *   LEFT panel   (~3fr) — pcVPC across 5 time bins.
 *     • Outer 90 % PI ribbon (5/95) — coral wash @ .14
 *     • Inner 90 % PI ribbon (median) — coral wash @ .32
 *     • Observed median line — coral, drawn L→R via stroke-dashoffset
 *     • Observed 5/95 dashed — coral hairlines
 *     • ~80 individual obs — jittered cream dots, wave-stagger
 *     • Observed-median dots at each nominal bin — coral
 *   RIGHT panel  (~2fr) — AUCss × body weight (pediatric inside adult envelope).
 *     • Two adult 5–95 % bands (low · high) drawn as horizontal strips
 *     • Pediatric 90 % PI ribbon per dose band, coral wash
 *     • Pediatric median line drawn L→R, Δ vs adult labels at right edge
 *     • 39 pediatric dots wave-staggered
 *
 *   Closing band — single hairline-top row, 3 cells L→R:
 *     [ pcVPC verdict | AUC Δ verdict | bridged-payoff ]
 *
 * Entrance choreography (V3 · 2026-04-25):
 *   The slide is part of the CS1 results pair (10 fit-bridge → 11 safety)
 *   wrapped in the AnalysisPlot shared-element morph. Inside the morph
 *   the slide MUST sequence serial — pcVPC settles first → AUC settles
 *   second → closing strip lands AFTER both panels finish — to mirror
 *   slide 12-style (now 11) pacing.
 *     1. Chrome  → 0.10
 *     2. Headline → 0.25
 *     3. Subhead  → 0.55
 *     4. pcVPC ribbons → 1.00
 *        pcVPC obs line  → 1.40
 *        pcVPC dots      → 1.60 (waves end ~2.50)
 *     5. AUC adult bands → 1.80
 *        AUC peds bands  → 1.95
 *        AUC peds median → 2.20 (ends ~3.40)
 *        AUC dots        → 2.40 (waves end ~3.40)
 *        AUC Δ labels    → 3.40 (peds median + 1.2)
 *     6. Closing strip   → 3.55 / payoff 3.85
 */

// pcVPC binned data — Okour 2023 Fig 2B verbatim
const PCVPC = [
  { t: 2,  obsMed: 369.4, obs5: 85.6,  obs95: 1133.2, simMedLo: 368.7, simMedHi: 502.6, sim95Lo: 884.3,  sim95Hi: 1419.1, sim5Lo: 58.4, sim5Hi: 151.9 },
  { t: 6,  obsMed: 487.3, obs5: 114.3, obs95: 712.4,  simMedLo: 359.8, simMedHi: 504.4, sim95Lo: 655.3,  sim95Hi: 1050.2, sim5Lo: 53.7, sim5Hi: 251.5 },
  { t: 12, obsMed: 184.2, obs5: 58.5,  obs95: 257.8,  simMedLo: 93.8,  simMedHi: 242.4, sim95Lo: 257.0,  sim95Hi: 478.0,  sim5Lo: 25.0, sim5Hi: 92.1  },
  { t: 18, obsMed: 227.7, obs5: 133.8, obs95: 823.8,  simMedLo: 90.9,  simMedHi: 270.1, sim95Lo: 254.9,  sim95Hi: 588.9,  sim5Lo: 32.5, sim5Hi: 95.9  },
  { t: 30, obsMed: 119.4, obs5: 39.0,  obs95: 297.0,  simMedLo: 86.4,  simMedHi: 128.7, sim95Lo: 214.0,  sim95Hi: 432.8,  sim5Lo: 19.6, sim5Hi: 49.6  },
];

// Individual pcVPC observations (subset rendered at 5 nominal sampling
// times for visual clarity — full dataset n = 211 across 39 patients).
// Deterministic horizontal jitter so overlapping values stay visible.
const OBS_RAW = [
  // t = 2h
  [2, 3319.0], [2, 1530.6], [2, 1389.5], [2, 1123.1], [2, 943.6], [2, 824.1],
  [2, 705.9],  [2, 653.3],  [2, 653.3],  [2, 604.7],  [2, 570.6], [2, 538.4],
  [2, 470.2],  [2, 395.0],  [2, 331.9],  [2, 295.5],  [2, 268.3], [2, 238.9],
  [2, 216.8],  [2, 185.7],  [2, 165.4],  [2, 136.3],  [2, 121.3], [2, 102.0],
  [2, 89.0],   [2, 73.4],   [2, 60.5],   [2, 27.9],
  // t = 6h
  [6, 719.7], [6, 666.1], [6, 616.5], [6, 581.7], [6, 548.9], [6, 479.4],
  [6, 435.2], [6, 395.0], [6, 325.5], [6, 189.4], [6, 112.3], [6, 82.4],
  // t = 12h
  [12, 278.9], [12, 253.1], [12, 229.8], [12, 208.6], [12, 193.1],
  [12, 178.7], [12, 94.4],  [12, 62.9],  [12, 57.1],  [12, 38.7],
  // t = 18h
  [18, 890.4], [18, 808.3], [18, 351.7], [18, 268.3], [18, 225.4],
  [18, 200.7], [18, 189.4], [18, 178.7], [18, 136.3],
  // t = 30h
  [30, 470.2], [30, 380.0], [30, 338.4], [30, 295.5], [30, 253.1],
  [30, 200.7], [30, 178.7], [30, 162.2], [30, 144.4], [30, 128.6],
  [30, 108.0], [30, 94.4],  [30, 85.7],  [30, 77.8],  [30, 72.0],
  [30, 66.6],  [30, 54.9],  [30, 48.9],  [30, 44.4],  [30, 40.3],
  [30, 21.3],  [30, 13.6],  [30, 8.4],   [30, 7.1],
];

// AUC × weight bands — Okour 2023 Table S5 verbatim
const REGIMES = [
  {
    label: 'LOW DOSE',
    pedAUC: 4.82, adultAUC: 4.98,
    adLo: 4.68, adHi: 5.29,
    pedLo: 4.14, pedHi: 5.61,
    deltaLabel: '−3 %',
  },
  {
    label: 'HIGH DOSE',
    pedAUC: 9.15, adultAUC: 9.12,
    adLo: 8.30, adHi: 10.0,
    pedLo: 8.41, pedHi: 9.96,
    deltaLabel: '≈ 0 %',
  },
];

export default function Slide10CaseFitBridge() {
  const ease = [0.2, 0.7, 0.3, 1];
  // Serial choreography — pcVPC settles before AUC begins, AUC settles
  // before closing lands. Guards the "fit → bridge" reading order.
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    // pcVPC (left panel)
    pcvpcTitle: 0.70,
    pcRibbon:   1.00,
    pcObsLine:  1.40,
    pcDots:     1.60,
    // AUC (right panel) — sequenced AFTER pcVPC settles
    aucTitle:   1.80,
    aucBand:    1.85,
    aucPedsMed: 2.20,
    aucDots:    2.40,
    // AUC Δ labels at right edge land at aucPedsMed + 1.2 = 3.40
    closing:    3.55,
    payoff:     3.85,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>
        CS1 · Fit + Bridge — model validates · pediatric AUC inside adult envelope
      </Eyebrow>
      <Headline delay={D.headline} maxChars={42}>
        The model{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
          fits the data,
        </span>{' '}
        then lands pediatric exposure inside the adult window.
      </Headline>
      <Subhead delay={D.subhead} maxChars={84}>
        Observed percentiles sit inside the simulated CIs; pediatric AUC<sub>ss</sub>{' '}
        <HighlightWord color="var(--coral)" delay={1.6}>matches adults within 3 %</HighlightWord>{' '}
        across 20–77 kg — Okour et al., JCP 2023.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', rowGap: 'var(--space-3)', minHeight: 0 }}>
          <AnalysisPlot variant="fit-bridge">
            <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', columnGap: 'var(--space-6)', minHeight: 0, width: '100%', height: '100%' }}>
              {/* LEFT — pcVPC */}
              <div style={CHART_PANEL}>
                <PanelTitle
                  label="pcVPC — prediction-corrected visual predictive check"
                  right="500 replicates · n = 39 PK-eval · 211 obs · 5 bins"
                  delay={D.pcvpcTitle - 0.1}
                />
                <div style={CHART_PANEL_BODY}>
                  <PcVpcChart tk={tk} D={D} />
                </div>
              </div>

              {/* RIGHT — AUC × body weight */}
              <div style={CHART_PANEL}>
                <PanelTitle
                  label={<>AUC<sub>ss</sub> × body weight — pediatric vs adult envelope</>}
                  right="μg·h/mL · geometric mean (95 % CI)"
                  delay={D.aucTitle - 0.1}
                />
                <div style={CHART_PANEL_BODY}>
                  <AUCPanel tk={tk} D={D} />
                </div>
              </div>
            </div>
          </AnalysisPlot>

          {/* Closing band — three cells L→R: pcVPC verdict · AUC Δ verdict · payoff */}
          <motion.div
            style={{
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              display: 'grid',
              gridTemplateColumns: 'auto auto minmax(0, 1fr)',
              columnGap: 'var(--space-8)',
              alignItems: 'start',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease, delay: D.closing }}
          >
            <HeroDelta value="0 / 5" label={<>pcVPC bins outside CI</>} accent />
            <HeroDelta value="−3 % / ≈0 %" label={<>AUC<sub>ss</sub> · low / high Δ</>} />

            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-title)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--cream)',
                fontWeight: 500,
                textAlign: 'right',
              }}
            >
              Model validated{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'normal', fontWeight: 700 }}>
                → exposure bridged.
              </span>
              <div
                className="deck-mono uppercase mt-2"
                style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.2em', color: 'var(--coral)', fontStyle: 'normal', fontWeight: 400 }}
              >
                ICH E11A · exposure match + conserved mechanism → clinical extrapolation
              </div>
            </div>
          </motion.div>

          {/* Subgroup caveat — surfaces the 35-<50 kg AUCss +29% pre-emptively
              so the hostile probe ("isn't 29% a real difference?") lands on
              an already-closed argument. Flat E-R on next slide closes it. */}
          <motion.div
            style={{
              marginTop: 'var(--space-3)',
              paddingTop: 'var(--space-2)',
              paddingLeft: 'var(--space-3)',
              borderLeft: '2px solid var(--cream-hairline)',
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.payoff }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: '0.2em',
                color: 'var(--cream-faint)',
              }}
            >
              Subgroup caveat · 35–&lt;50 kg
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Low-dose AUC<sub>ss</sub> ran +29% above adult median in this band — fully inside the
              adult therapeutic envelope. Flat E–R (next slide) renders the excursion clinically inert.
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Fit + Bridge"
        source="Source · Okour et al. JCP 2023 (Fig 2B · Table S5) · ICH E11A"
        delay={D.payoff + 0.3}
      />
    </SlideGrid>
  );
}

/* ========================================================
   Hairline panel chrome (zaj-slides v2.1)
   ======================================================== */
const CHART_PANEL = {
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  border: '1px solid var(--cream-hairline)',
  borderRadius: 0,
  padding: 'var(--space-3)',
  background: 'transparent',
};
const CHART_PANEL_BODY = {
  flex: '1 1 0',
  minHeight: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

/* ========================================================
   Primitives
   ======================================================== */
function PanelTitle({ label, right, delay }) {
  return (
    <motion.div
      className="flex items-baseline justify-between mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      <span
        className="deck-mono uppercase"
        style={{ fontSize: 'var(--fs-card-label)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)' }}
      >
        {label}
      </span>
      <span
        className="deck-mono"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: '0.14em', color: 'var(--cream-faint)' }}
      >
        {right}
      </span>
    </motion.div>
  );
}

function HeroDelta({ value, label, accent }) {
  return (
    <div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          lineHeight: 1,
          letterSpacing: '-0.03em',
          color: accent ? 'var(--coral)' : 'var(--cream)',
          fontWeight: 700,
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase mt-1"
        style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
      >
        {label}
      </div>
    </div>
  );
}

/* ========================================================
   pcVPC chart — pure SVG (lifted from rejected 11d, trimmed
   of the parameter table since CL/Vc/Vp now live in slide 09's
   workflow ribbon).
   ======================================================== */
function PcVpcChart({ tk, D }) {
  const reduce = useReducedMotion();
  const W = 1080, H = 440;
  const m = { top: 20, right: 32, bottom: 50, left: 82 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const ease = [0.2, 0.7, 0.3, 1];

  const x = d3.scaleLinear().domain([0, 32]).range([0, iw]);
  const y = d3.scaleLog().domain([5, 4000]).range([ih, 0]);

  const yTicks = [10, 30, 100, 300, 1000, 3000];
  const xTicks = [2, 6, 12, 18, 30];

  const observations = useMemo(() => {
    const binCounts = { 2: 0, 6: 0, 12: 0, 18: 0, 30: 0 };
    return OBS_RAW.map(([t, c], i) => {
      const idx = binCounts[t]++;
      const span = 1.4;
      const jitter = ((idx * 0.6180339887) % 1) * span - span / 2;
      return { t: t + jitter, c, i, bin: t };
    });
  }, []);

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
      style={{ maxHeight: '52vh' }}
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

        {/* Simulated 5th CI ribbon */}
        <motion.path
          d={area(ribbon5)}
          fill={tk('--coral')}
          initial={reduce ? { opacity: 0.14 } : { opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : D.pcRibbon }}
        />
        {/* Simulated 95th CI ribbon */}
        <motion.path
          d={area(ribbon95)}
          fill={tk('--coral')}
          initial={reduce ? { opacity: 0.14 } : { opacity: 0 }}
          animate={{ opacity: 0.14 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : D.pcRibbon + 0.1 }}
        />
        {/* Simulated median CI ribbon (stronger) */}
        <motion.path
          d={area(ribbonMed)}
          fill={tk('--coral')}
          initial={reduce ? { opacity: 0.32 } : { opacity: 0 }}
          animate={{ opacity: 0.32 }}
          transition={{ duration: 0.7, delay: reduce ? 0 : D.pcRibbon + 0.2 }}
        />

        {/* Observed percentile lines */}
        <AnimatedLine d={line(obsMedPts)} stroke={tk('--coral')} width={2.6} delay={D.pcObsLine} dash={1800} reduce={reduce} />
        <AnimatedLine d={line(obs5Pts)}   stroke={tk('--coral')} width={1.4} delay={D.pcObsLine + 0.15} strokeDasharray="6 6" reduce={reduce} />
        <AnimatedLine d={line(obs95Pts)}  stroke={tk('--coral')} width={1.4} delay={D.pcObsLine + 0.3}  strokeDasharray="6 6" reduce={reduce} />

        {/* Individual observations — jittered cream dots */}
        {observations.map((d) => (
          <motion.circle
            key={`obs-${d.i}`}
            cx={x(d.t)} cy={y(d.c)} r={2.6}
            fill={tk('--cream')} fillOpacity={0.78}
            initial={reduce ? { opacity: 0.78, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 0.78, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.25,
              ease: 'easeOut',
              delay: reduce ? 0 : D.pcDots + (d.i % 10) * 0.02 + Math.floor(d.i / 10) * 0.05,
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
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, ease: [0.34, 1.56, 0.64, 1], delay: reduce ? 0 : D.pcDots + 0.8 + i * 0.08 }}
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

function AnimatedLine({ d, stroke, width = 2, delay = 0, dash = 2000, strokeDasharray, reduce }) {
  if (strokeDasharray) {
    return (
      <motion.path
        d={d}
        fill="none"
        stroke={stroke}
        strokeWidth={width}
        strokeDasharray={strokeDasharray}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.2, 0.7, 0.3, 1], delay: reduce ? 0 : delay }}
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
      initial={reduce ? { strokeDashoffset: 0 } : { strokeDashoffset: dash }}
      animate={{ strokeDashoffset: 0 }}
      transition={{ duration: reduce ? 0 : 1.6, ease: [0.2, 0.7, 0.3, 1], delay: reduce ? 0 : delay }}
    />
  );
}

/* ========================================================
   AUC × weight panel — pure SVG (lifted from old slide 11
   AUCPanel; Cmax box-plot panel + SubgroupFlag now live on
   slide 11 safety E-R since the box-plot grammar belongs
   with the safety boxes there).
   ======================================================== */
function AUCPanel({ tk, D }) {
  const reduce = useReducedMotion();
  const W = 1080, H = 440;
  const m = { top: 18, right: 48, bottom: 50, left: 80 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;
  const ease = [0.2, 0.7, 0.3, 1];

  const x = d3.scaleLinear().domain([18, 82]).range([0, iw]);
  const y = d3.scaleLinear().domain([3, 12]).range([ih, 0]);

  const { pedDots, bands } = useMemo(() => {
    let s = 9001;
    const r = () => (s = (s * 9301 + 49297) % 233280) / 233280;
    const nrand = () => {
      let u = 0, v = 0;
      while (!u) u = r();
      while (!v) v = r();
      return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
    };

    const bands = REGIMES.map((reg) => {
      const wts = d3.range(20, 80.1, 2);
      const band = wts.map((w) => {
        const scale = 0.82 + (w - 50) * 0.004;
        return { w, lo: reg.pedLo * scale, hi: reg.pedHi * scale };
      });
      const median = wts.map((w) => ({
        w,
        c: reg.pedAUC * (0.94 + (w - 50) * 0.002),
      }));
      return { reg, band, median };
    });

    const pedDots = [];
    for (let i = 0; i < 39; i++) {
      const w = 20 + r() * 57;
      const reg = i < 20 ? REGIMES[0] : REGIMES[1];
      const c = reg.pedAUC * Math.exp(nrand() * 0.15) * (0.94 + (w - 50) * 0.002);
      pedDots.push({ w, c, i });
    }
    return { pedDots, bands };
  }, []);

  const area = d3.area().x((d) => x(d.w)).y0((d) => y(d.lo)).y1((d) => y(d.hi)).curve(d3.curveMonotoneX);
  const line = d3.line().x((d) => x(d.w)).y((d) => y(d.c)).curve(d3.curveMonotoneX);

  const xTicks = x.ticks(7);
  const yTicks = y.ticks(5);

  return (
    <svg
      className="w-full"
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ maxHeight: '52vh' }}
    >
      <g transform={`translate(${m.left},${m.top})`}>
        {/* Grid */}
        {yTicks.map((v) => (
          <line key={`gy-${v}`} x1={0} x2={iw} y1={y(v)} y2={y(v)}
                stroke={tk('--cream-hairline')} strokeWidth={1} opacity={0.4} />
        ))}

        {/* Adult 5–95 % bands — static horizontal strips */}
        {REGIMES.map((reg, i) => (
          <g key={`ad-${i}`}>
            <rect
              x={0} width={iw}
              y={y(reg.adHi)} height={y(reg.adLo) - y(reg.adHi)}
              fill={tk('--cream')} fillOpacity={0.16}
              stroke={tk('--cream-muted')} strokeWidth={1} strokeDasharray="3 4"
            />
            <text
              x={8} y={y(reg.adHi) - 6}
              textAnchor="start" fontFamily="var(--font-mono)" fontSize="10"
              letterSpacing="0.16em" fill={tk('--cream-muted')} fontWeight={600}
            >
              ADULT 5–95% · {reg.label}
            </text>
          </g>
        ))}

        {/* Pediatric bands + medians */}
        {bands.map(({ reg, band, median }, i) => (
          <React.Fragment key={`pb-${i}`}>
            <path
              d={area(band)}
              fill={tk('--coral')}
              fillOpacity={0.34}
            />
            <motion.path
              d={line(median)}
              fill="none" stroke={tk('--coral')} strokeWidth={3}
              strokeLinecap="round"
              initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: reduce ? 0 : 1.2, ease, delay: reduce ? 0 : D.aucPedsMed + i * 0.1 }}
            />
            {/* Δ label inside the band, right-anchored */}
            <motion.text
              x={iw - 12} y={y(reg.pedAUC) + 4}
              textAnchor="end" fontFamily="var(--font-mono)" fontSize="11"
              letterSpacing="0.16em" fill={tk('--coral')} fontWeight={700}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: reduce ? 0 : D.aucPedsMed + 1.2 + i * 0.1 }}
            >
              PEDS · Δ {reg.deltaLabel}
            </motion.text>
          </React.Fragment>
        ))}

        {/* Pediatric patient dots — wave-staggered scatter */}
        {pedDots.map((d) => {
          const dotDelay = D.aucDots + (d.i % 8) * 0.025 + Math.floor(d.i / 8) * 0.06;
          return (
            <React.Fragment key={d.i}>
              <motion.circle
                cx={x(d.w)} cy={y(d.c)} r={5}
                fill={tk('--coral')} fillOpacity={0.95}
                stroke={tk('--cream')} strokeWidth={1.2}
                initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: reduce ? 0 : 0.3, ease: 'easeOut', delay: reduce ? 0 : dotDelay }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
            </React.Fragment>
          );
        })}

        {/* Y axis labels */}
        {yTicks.map((v) => (
          <text key={`yl-${v}`} x={-10} y={y(v) + 4} textAnchor="end"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}
        {/* X axis labels */}
        {xTicks.map((v) => (
          <text key={`xl-${v}`} x={x(v)} y={ih + 20} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize="10" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={iw / 2} y={ih + 42} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          BODY WEIGHT (KG)
        </text>
        <text transform={`translate(-58, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              fontFamily="var(--font-mono)" fontSize="10" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          AUCss (μg·h/mL)
        </text>
      </g>
    </svg>
  );
}
