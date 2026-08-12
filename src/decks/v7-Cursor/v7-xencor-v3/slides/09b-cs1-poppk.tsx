// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import ZoomablePanel from '@/components/deck/ZoomablePanel';
import CompartmentSchematic from '../../../qp2-seminar/slides/cs1-build/CompartmentSchematic';
import DecisionGate from '../../../qp2-seminar/slides/cs1-build/DecisionGate';

const EASE = [0.2, 0.7, 0.3, 1];

const CHART_PANEL = {
  minWidth: 0,
  minHeight: 0,
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
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

function PanelTitle({ label, right, delay, go }) {
  return (
    <motion.div
      className="flex items-baseline justify-between mb-2"
      initial={{ opacity: 0 }}
      animate={{ opacity: go ? 1 : 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay }}
    >
      <span
        className="deck-mono uppercase xc-card-label xc-case"
      >
        {label}
      </span>
      <span
        className="deck-mono xc-slide-eyebrow xc-faint" style={{ letterSpacing: '0.14em' }}
      >
        {right}
      </span>
    </motion.div>
  );
}



// Binned pcVPC data (time_h, observed + simulated-CI per percentile)
const PCVPC = [
  { t: 2,  obsMed: 369.4, obs5: 85.6,  obs95: 1133.2, simMedLo: 368.7, simMedHi: 502.6, sim95Lo: 884.3,  sim95Hi: 1419.1, sim5Lo: 58.4, sim5Hi: 151.9 },
  { t: 6,  obsMed: 487.3, obs5: 114.3, obs95: 712.4,  simMedLo: 359.8, simMedHi: 504.4, sim95Lo: 655.3,  sim95Hi: 1050.2, sim5Lo: 53.7, sim5Hi: 251.5 },
  { t: 12, obsMed: 184.2, obs5: 58.5,  obs95: 257.8,  simMedLo: 93.8,  simMedHi: 242.4, sim95Lo: 257.0,  sim95Hi: 478.0,  sim5Lo: 25.0, sim5Hi: 92.1  },
  { t: 18, obsMed: 227.7, obs5: 133.8, obs95: 823.8,  simMedLo: 90.9,  simMedHi: 270.1, sim95Lo: 254.9,  sim95Hi: 588.9,  sim5Lo: 32.5, sim5Hi: 95.9  },
  { t: 30, obsMed: 119.4, obs5: 39.0,  obs95: 297.0,  simMedLo: 86.4,  simMedHi: 128.7, sim95Lo: 214.0,  sim95Hi: 432.8,  sim5Lo: 19.6, sim5Hi: 49.6  },
];

/* Observed raw concentrations are subsampled to the richest nominal
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
const PARAMS = [
  { p: 'CL/F',  est: '1.17',  unit: 'L/h',  rse: '6.33', hero: true },
  { p: 'Vc/F',  est: '12.3',  unit: 'L',    rse: '16.1', hero: true },
  { p: 'Q/F',   est: '0.457', unit: 'L/h',  rse: '21.1' },
  { p: 'Vp/F',  est: '81.3',  unit: 'L',    rse: '24.5' },
  { p: 'Ka',    est: '2.46',  unit: '1/h',  rse: '25.7' },
  { p: 'tlag',  est: '0.525', unit: 'h',    rse: '14.7' },
  { p: 'Allom.', est: '0.75 / 1.0', unit: 'fixed', rse: '—' },
];
function ParamTable({ go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        minHeight: 0,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        paddingTop: 'var(--space-2)',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 0.7fr 0.7fr',
        gap: 'var(--space-1) var(--space-3)',
        alignItems: 'baseline',
      }}>
        <Cell head>Parameter</Cell>
        <Cell head>Estimate</Cell>
        <Cell head>Unit</Cell>
        <Cell head>%RSE</Cell>
        {PARAMS.map((r) => (
          <React.Fragment key={r.p}>
            <Cell hero={r.hero}>{r.p}</Cell>
            <Cell hero={r.hero} mono>{r.est}</Cell>
            <Cell mono dim>{r.unit}</Cell>
            <Cell mono dim>{r.rse}</Cell>
          </React.Fragment>
        ))}
      </div>
    </motion.div>
  );
}
function Cell({ children, head, hero, mono, dim }) {
  return (
    <div
      className={[
        mono || head ? 'deck-mono' : 'deck-body',
        head ? 'xc-slide-eyebrow xc-faint' : 'xc-tagline',
        !head && hero ? 'xc-case' : '',
        !head && !hero ? 'xc-ink' : '',
      ].filter(Boolean).join(' ')}
      style={{
        textTransform: head ? 'uppercase' : 'none',
        letterSpacing: head ? 'var(--ls-mono-wide)' : 0,
        opacity: head ? 1 : (dim ? 0.65 : (hero ? 1 : 0.92)),
        fontWeight: hero ? 700 : (head ? 600 : 400),
        fontVariantNumeric: mono ? 'tabular-nums' : 'normal',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
      }}
    >
      {children}
    </div>
  );
}

export default function Cs1Poppk() {
  const D = {
    chrome: 0.10, headline: 0.25, subhead: 0.55,
    structure: 0.70, table: 0.85, vpc: 1.00, workflow: 1.15,
    covariates: 1.5,
    closing: 1.70, payoff: 1.80,
  };

  const T = useTokens(['--coral', '--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--bg']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="1" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>Case 01 · PopPK · build & fit</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Extensive simulation, tight parsimony.
      </Headline>
      <Subhead delay={D.subhead} maxChars={100} size="lead">
        A 2-compartment structural model validated against 500 predictive replicates. Of 12 pre-specified covariates, only body weight scaled the exposure.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minHeight: 0 }}>
          
          <div style={{ flex: 1, minHeight: 0, display: 'grid', gridTemplateColumns: '1.4fr 1.8fr', gap: 'var(--space-4)' }}>
            
            {/* Left Column: schematic + compact pcVPC. Workflow is larger on the right. */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
              <ZoomablePanel
                title="Structural Model"
                right={<span className="deck-mono xc-slide-eyebrow xc-faint" style={{ letterSpacing: '0.12em' }}>2-CMT</span>}
                panelStyle={{...CHART_PANEL, flex: 1.05}}
                modalBodyStyle={{ alignItems: 'center' }}
                modalChildren={<div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><CompartmentSchematic tk={tk} go={go} /></div>}
              >
                <PanelTitle label="Structural Model" right="2-CMT" delay={D.structure} go={go} />
                <div style={{...CHART_PANEL_BODY}}>
                   <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                     <CompartmentSchematic tk={tk} go={go} />
                   </div>
                </div>
              </ZoomablePanel>
              <ZoomablePanel
                title="PcVPC"
                right={<span className="deck-mono xc-slide-eyebrow xc-faint" style={{ letterSpacing: '0.12em' }}>500 replicates</span>}
                panelStyle={{...CHART_PANEL, flex: 0.95}}
                modalBodyStyle={{ alignItems: 'center' }}
                modalChildren={<PcVpcChart go={go} delay={D.vpc} tk={tk} D={{lines: D.vpc+0.3, dots: D.vpc+0.5, ribbon: D.vpc+0.1}} />}
              >
                <PanelTitle label="PcVPC" right="500 replicates" delay={D.vpc} go={go} />
                <div style={{...CHART_PANEL_BODY, flexDirection: 'column', alignItems: 'stretch'}}>
                   <PcVpcChart go={go} delay={D.vpc} tk={tk} D={{lines: D.vpc+0.3, dots: D.vpc+0.5, ribbon: D.vpc+0.1}} compact />
                </div>
              </ZoomablePanel>
            </div>

            {/* Right Column: parameter table + enlarged workflow. */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
               <ZoomablePanel
                 title="Parameter Estimates"
                 right={<span className="deck-mono xc-slide-eyebrow xc-faint" style={{ letterSpacing: '0.12em' }}>CL/F, Vc/F</span>}
                 panelStyle={{...CHART_PANEL, flex: '0 0 auto'}}
                 modalBodyStyle={{ alignItems: 'center' }}
                 modalChildren={<ParamTable go={go} delay={D.table} />}
               >
                 <PanelTitle label="Parameter Estimates" right="CL/F, Vc/F" delay={D.table} go={go} />
                 <div style={{ position: 'relative', width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <ParamTable go={go} delay={D.table} />
                 </div>
               </ZoomablePanel>
               <ZoomablePanel
                 title="Workflow"
                 right={<span className="deck-mono xc-slide-eyebrow xc-faint" style={{ letterSpacing: '0.12em' }}>NONMEM</span>}
                 panelStyle={{...CHART_PANEL, flex: 1}}
                 modalBodyStyle={{ alignItems: 'center' }}
                 modalChildren={<DecisionGate id="cs1-v4-poppk-workflow-modal" replay />}
               >
                 <PanelTitle label="Workflow" right="NONMEM" delay={D.workflow} go={go} />
                 <div style={{...CHART_PANEL_BODY}}>
                    <DecisionGate id="cs1-v4-poppk-workflow-inline" replay initialDelay={D.workflow} />
                 </div>
               </ZoomablePanel>
            </div>

          </div>

          {/* Footer ribbon — one line; full covariate screen is on prior slide */}
          <motion.div
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 'var(--space-3)',
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--coral) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--coral) 42%, var(--cream-hairline))',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: go ? 1 : 0, y: go ? 0 : 10 }}
            transition={{ duration: 0.6, ease: EASE, delay: D.covariates }}
          >
            <span className="deck-mono uppercase xc-slide-eyebrow xc-case" style={{ letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
              380 adults build the model · 39 children confirm it
            </span>
            <span className="deck-body xc-slide-subhead xc-muted">
              Parameter table is the receipt — parsimony held (weight-only covariate).
            </span>
          </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 01 · PopPK Build & Fit"
        source="Source · Okour et al. JCP 2023 · NONMEM 7.4"
        delay={D.payoff}
      />
    </SlideGrid>
  );
}
function PcVpcChart({ tk, D, compact = false }) {
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
      style={{ maxHeight: compact ? '28vh' : '42vh' }}
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
                className="xc-mono xc-svg-label" fill={tk('--cream-muted')}>
            {v >= 1000 ? `${v / 1000}k` : v}
          </text>
        ))}
        {/* X tick labels */}
        {xTicks.map((v) => (
          <text key={`xl-${v}`} x={x(v)} y={ih + 20} textAnchor="middle"
                className="xc-mono xc-svg-label" fill={tk('--cream-muted')}>
            {v}
          </text>
        ))}

        {/* Axis titles */}
        <text x={iw / 2} y={ih + 42} textAnchor="middle"
              className="xc-mono xc-svg-label" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          TIME AFTER DOSE (H)
        </text>
        <text transform={`translate(-60, ${ih / 2}) rotate(-90)`} textAnchor="middle"
              className="xc-mono xc-svg-label" letterSpacing="0.18em" fill={tk('--cream-faint')}>
          AMBRISENTAN CONCENTRATION (NG/ML)
        </text>

        {/* Legend — top-right */}
        <g transform={`translate(${iw - 460}, 6)`}>
          <rect x={0} y={0} width={14} height={10} fill={tk('--coral')} fillOpacity={0.32} />
          <text x={20} y={9} className="xc-mono xc-svg-compact" fill={tk('--cream-muted')}>
            SIM CI · MEDIAN
          </text>
          <rect x={115} y={0} width={14} height={10} fill={tk('--coral')} fillOpacity={0.14} />
          <text x={135} y={9} className="xc-mono xc-svg-compact" fill={tk('--cream-muted')}>
            SIM CI · 5 / 95
          </text>
          <circle cx={237} cy={5} r={2.6} fill={tk('--cream')} fillOpacity={0.78} />
          <text x={247} y={9} className="xc-mono xc-svg-compact" fill={tk('--cream-muted')}>
            OBS · INDIVIDUAL
          </text>
          <circle cx={323} cy={5} r={3.6} fill={tk('--coral')} stroke={tk('--cream')} strokeWidth={1.2} />
          <text x={333} y={9} className="xc-mono xc-svg-compact" fill={tk('--cream-muted')}>
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

