// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { BlockMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import ComponentCard from '../components/ComponentCard';
import PhaseChip from '../components/PhaseChip';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * Slide 13 — Component 1 / 5 · Non-Compartmental Analysis (NCA).
 *
 * Elevation pass (Apr 2026): adopts the cs3-06 cinematic pattern.
 *   - useStory() drives every reveal off one rAF clock with named beats
 *   - 90% CI ribbon underneath the concentration curve
 *   - Leader lines connect each parameter callout to its anchor point
 *   - Trapezoidal AUC equation appears as the parameters resolve
 *   - PhaseChip in the upper-right narrates the current beat
 *   - Animated stamp glow + dashed-rule sweep replaces a flat appearance
 *
 * Curve math: classical IV-bolus monoexponential.
 *   C(t) = 92 · exp(-k·t),  k = ln(2)/6.2  (t½ = 6.2 h)
 *
 * Case color: sage (links back to working-system slide 12).
 */

const PLOT = { x0: 100, x1: 720, y0: 60, y1: 460 };

const CURVE_POINTS = [
  { t: 0,  c: 92.0,  x: 100, y: 64.8  },
  { t: 6,  c: 47.0,  x: 255, y: 103.7 },
  { t: 12, c: 24.0,  x: 410, y: 142.7 },
  { t: 18, c: 12.3,  x: 565, y: 181.5 },
  { t: 24, c: 6.29,  x: 720, y: 220.2 },
];

// 90% CI envelope (±15% on the y-axis, log-scale-aware).
const CI_UPPER = [
  { x: 100, y: 56.7  },
  { x: 255, y: 95.6  },
  { x: 410, y: 134.5 },
  { x: 565, y: 173.4 },
  { x: 720, y: 212.1 },
];
const CI_LOWER = [
  { x: 100, y: 74.2  },
  { x: 255, y: 113.1 },
  { x: 410, y: 152.0 },
  { x: 565, y: 190.8 },
  { x: 720, y: 229.5 },
];

const CURVE_PATH = `M ${CURVE_POINTS.map((p) => `${p.x} ${p.y}`).join(' L ')}`;
const AUC_PATH =
  CURVE_PATH + ` L ${PLOT.x1} ${PLOT.y1} L ${PLOT.x0} ${PLOT.y1} Z`;
const CI_PATH =
  `M ${CI_UPPER.map((p) => `${p.x} ${p.y}`).join(' L ')}` +
  ` L ${[...CI_LOWER].reverse().map((p) => `${p.x} ${p.y}`).join(' L ')} Z`;

const Y_TICKS = [
  { value: 100, y: 60   },
  { value: 10,  y: 193  },
  { value: 1,   y: 327  },
  { value: 0.1, y: 460  },
];
const X_TICKS = [0, 6, 12, 18, 24];
const X_FOR_T = (t: number) => PLOT.x0 + (t / 24) * (PLOT.x1 - PLOT.x0);

// Story sequence in seconds — loops every 7s.
const SEQ = {
  start:    0.00,
  draw:     0.10,   // curve drawing 0.10 → 1.55
  ci:       1.30,   // CI ribbon fades in
  fill:     1.65,   // AUC area fills 1.65 → 2.35
  marker:   2.30,   // Cmax peak marker pops
  params:   2.50,   // parameter callouts cascade 2.50 → 3.20
  leaders:  3.10,   // leader lines from callouts to anchors
  equation: 3.60,   // KaTeX trapezoidal formula appears
  stamp:    4.20,   // audit stamp + glow sweep
  final:    4.80,
};

const PHASE_LABEL: Record<keyof typeof SEQ, string> = {
  start:    'priming',
  draw:     'drawing curve',
  ci:       'computing CI',
  fill:     'computing AUC',
  marker:   'reading Cmax',
  params:   'reading parameters',
  leaders:  'anchoring',
  equation: 'writing equation',
  stamp:    'stamping audit',
  final:    'verified',
};

const CALLOUTS = [
  // anchorX/Y is the curve point each callout points to
  { label: 'Cmax',  value: '87.4 μg/mL',    bx: 760, by: 92,  anchorX: 100, anchorY: 65  },
  { label: 't½',    value: '6.2 h',         bx: 760, by: 172, anchorX: 320, anchorY: 122 },
  { label: 'CL/F',  value: '2.4 L/h',       bx: 760, by: 252, anchorX: 410, anchorY: 350 },
  { label: 'Vd/F',  value: '21.3 L',        bx: 760, by: 332, anchorX: 565, anchorY: 220 },
];

export default function NCAComponent() {
  const story = useStory(SEQ, { loop: 7.0 });

  return (
    <ComponentCard
      dataCase="sage"
      componentNumber={1}
      domainEyebrow="CLINICAL PHARMACOLOGY"
      headline={
        <>
          Non-Compartmental{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>Analysis.</span>
        </>
      }
      subhead="Concentration in. Parameters out. Stamped, hashed, reproducible."
      takeHomeText="AUC, Cmax, t½ — first-principles math, computed live, audit-stamped."
      activeId="nca"
      withoutText="NCA executions are unverified against gold-standard. Drift compounds across analyses."
      withText="Every NCA validates within 0.1% of PKNCA. Audit-trail confirms each run."
      footerSource="NCA per FDA Guidance · Bioavailability Studies (2014); ICH M15 (effective Jul 2026)"
    >
      <div className="relative w-full h-full flex flex-col" style={{ minHeight: 0 }}>
        {/* Phase chip narrates the current named beat */}
        <PhaseChip label={story.phase ? PHASE_LABEL[story.phase] : null} />

        <svg
          viewBox="0 0 1100 540"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          role="img"
          aria-label="Concentration-time curve with 90% CI ribbon, AUC fill, parameter callouts, and audit stamp."
          style={{ minHeight: 0 }}
        >
          <defs>
            <linearGradient id="auc-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--case)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--case)" stopOpacity="0.04" />
            </linearGradient>
            <linearGradient id="ci-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%"  stopColor="var(--case)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="var(--case)" stopOpacity="0.05" />
            </linearGradient>
            <filter id="stamp-glow" x="-20%" y="-50%" width="140%" height="200%">
              <feGaussianBlur stdDeviation="3" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === GRID === */}
          <g opacity="0.18">
            {Y_TICKS.map((tick) => (
              <line
                key={`yg-${tick.value}`}
                x1={PLOT.x0} y1={tick.y} x2={PLOT.x1} y2={tick.y}
                stroke="var(--cream)" strokeWidth="0.5" strokeDasharray="2 4"
              />
            ))}
            {X_TICKS.map((t) => (
              <line
                key={`xg-${t}`}
                x1={X_FOR_T(t)} y1={PLOT.y0} x2={X_FOR_T(t)} y2={PLOT.y1}
                stroke="var(--cream)" strokeWidth="0.5" strokeDasharray="2 4"
              />
            ))}
          </g>

          {/* === AXES === */}
          <line x1={PLOT.x0} y1={PLOT.y0} x2={PLOT.x0} y2={PLOT.y1}
                stroke="var(--cream)" strokeWidth="1" opacity="0.45" />
          <line x1={PLOT.x0} y1={PLOT.y1} x2={PLOT.x1} y2={PLOT.y1}
                stroke="var(--cream)" strokeWidth="1" opacity="0.45" />

          {Y_TICKS.map((tick) => (
            <text key={`yl-${tick.value}`}
              x={PLOT.x0 - 12} y={tick.y + 4} textAnchor="end"
              className="deck-mono"
              style={{ fontSize: 11, fill: 'var(--cream-muted)', letterSpacing: '0.04em' }}
            >
              {tick.value < 1 ? tick.value.toFixed(1) : tick.value}
            </text>
          ))}
          <text
            x={PLOT.x0 - 56} y={(PLOT.y0 + PLOT.y1) / 2}
            textAnchor="middle"
            transform={`rotate(-90 ${PLOT.x0 - 56} ${(PLOT.y0 + PLOT.y1) / 2})`}
            className="deck-mono uppercase"
            style={{ fontSize: 9, fill: 'var(--cream-faint)', letterSpacing: '0.18em' }}
          >
            CONC · μg/mL · log
          </text>

          {X_TICKS.map((t) => (
            <text key={`xl-${t}`}
              x={X_FOR_T(t)} y={PLOT.y1 + 22} textAnchor="middle"
              className="deck-mono"
              style={{ fontSize: 11, fill: 'var(--cream-muted)', letterSpacing: '0.04em' }}
            >
              {t}
            </text>
          ))}
          <text
            x={(PLOT.x0 + PLOT.x1) / 2} y={PLOT.y1 + 44} textAnchor="middle"
            className="deck-mono uppercase"
            style={{ fontSize: 9, fill: 'var(--cream-faint)', letterSpacing: '0.18em' }}
          >
            TIME · h
          </text>

          {/* === 90% CI RIBBON === fades in just before the AUC fill */}
          <motion.path
            d={CI_PATH}
            fill="url(#ci-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('ci') ? 1 : 0 }}
            transition={{ duration: 0.55, ease: EASE.expoOut }}
          />
          {/* Upper/lower CI hairlines */}
          <motion.path
            d={`M ${CI_UPPER.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none" stroke="var(--case)" strokeOpacity="0.45"
            strokeWidth="0.8" strokeDasharray="2 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: story.isAfter('ci') ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE.expoOut }}
          />
          <motion.path
            d={`M ${CI_LOWER.map((p) => `${p.x} ${p.y}`).join(' L ')}`}
            fill="none" stroke="var(--case)" strokeOpacity="0.45"
            strokeWidth="0.8" strokeDasharray="2 3"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: story.isAfter('ci') ? 1 : 0 }}
            transition={{ duration: 0.6, ease: EASE.expoOut }}
          />
          {/* CI label */}
          <motion.text
            x={170} y={50}
            className="deck-mono uppercase"
            style={{ fontSize: 9, fill: 'var(--case)', letterSpacing: '0.18em', fontWeight: 600 }}
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('ci') ? 0.9 : 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            90% CI · n=412
          </motion.text>

          {/* === AUC AREA === */}
          <motion.path
            d={AUC_PATH}
            fill="url(#auc-fill)"
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('fill') ? 0.55 : 0 }}
            transition={{ duration: 0.7, ease: EASE.expoOut }}
          />

          {/* === CONCENTRATION CURVE === drawn left-to-right */}
          <motion.path
            d={CURVE_PATH}
            fill="none" stroke="var(--case)" strokeWidth="2.4"
            strokeLinecap="round" strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: story.isAfter('draw') ? 1 : 0 }}
            transition={{ duration: 1.45, ease: EASE.expoOut }}
            style={{ filter: 'drop-shadow(0 0 6px color-mix(in srgb, var(--case) 40%, transparent))' }}
          />

          {/* Sampling dots on each timepoint, appear just after curve fills */}
          {CURVE_POINTS.map((p, i) => (
            <motion.circle
              key={`dot-${p.t}`}
              cx={p.x} cy={p.y} r={3}
              fill="var(--cream)" stroke="var(--case)" strokeWidth="1.2"
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: story.isAfter('marker') ? 1 : 0,
                scale: story.isAfter('marker') ? 1 : 0,
              }}
              transition={{
                duration: 0.3,
                delay: i * 0.04,
                ease: EASE.settle,
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
          ))}

          {/* Cmax marker — larger pulsing ring on peak */}
          <motion.g
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: story.isAfter('marker') ? 1 : 0,
              scale: story.isAfter('marker') ? 1 : 0,
            }}
            transition={{ duration: 0.4, ease: EASE.settle }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          >
            <circle
              cx={CURVE_POINTS[0].x} cy={CURVE_POINTS[0].y} r={6}
              fill="var(--cream)" stroke="var(--case)" strokeWidth="2"
            />
            {/* outer halo */}
            <motion.circle
              cx={CURVE_POINTS[0].x} cy={CURVE_POINTS[0].y} r={9}
              fill="none" stroke="var(--case)" strokeWidth="1.4"
              animate={story.isAfter('marker')
                ? { opacity: [0.6, 0.0, 0.6], r: [9, 18, 9] }
                : { opacity: 0 }}
              transition={{ duration: 2.2, repeat: Infinity, ease: 'easeOut' }}
            />
          </motion.g>

          {/* === LEADER LINES from callouts to curve points === */}
          {CALLOUTS.map((c, i) => {
            const startX = c.bx - 4;
            const startY = c.by + 33;
            const midX = (startX + c.anchorX) / 2;
            const path = `M ${startX} ${startY} C ${midX} ${startY}, ${midX} ${c.anchorY}, ${c.anchorX + 4} ${c.anchorY}`;
            return (
              <motion.g key={`leader-${c.label}`}>
                <motion.path
                  d={path}
                  fill="none"
                  stroke="var(--case)"
                  strokeOpacity="0.55"
                  strokeWidth="0.9"
                  strokeDasharray="3 3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{
                    pathLength: story.isAfter('leaders') ? 1 : 0,
                    opacity: story.isAfter('leaders') ? 0.55 : 0,
                  }}
                  transition={{
                    duration: 0.55,
                    delay: i * 0.06,
                    ease: EASE.expoOut,
                  }}
                />
                {/* anchor dot at the curve end */}
                <motion.circle
                  cx={c.anchorX + 4} cy={c.anchorY} r={2.2}
                  fill="var(--case)"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: story.isAfter('leaders') ? 1 : 0 }}
                  transition={{ duration: 0.3, delay: i * 0.06 + 0.3 }}
                />
              </motion.g>
            );
          })}

          {/* === PARAMETER CALLOUTS === stack on right side */}
          {CALLOUTS.map((c, i) => (
            <ParamCallout
              key={c.label}
              x={c.bx} y={c.by}
              label={c.label} value={c.value}
              show={story.isAfter('params')}
              delay={i * 0.10}
            />
          ))}

          {/* AUC label inside the area */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('fill') ? 1 : 0 }}
            transition={{ duration: 0.4, delay: 0.5 }}
          >
            <text
              x={400} y={350} textAnchor="middle"
              className="deck-display"
              style={{ fontSize: 13, fill: 'var(--cream)', fontStyle: 'italic', letterSpacing: '0.02em' }}
            >
              AUC₀-∞
            </text>
            <text
              x={400} y={370} textAnchor="middle"
              className="deck-mono"
              style={{ fontSize: 11, fill: 'var(--case)', letterSpacing: '0.04em' }}
            >
              412 μg·h/mL
            </text>
          </motion.g>

          {/* === STAMP === bottom-right under callouts */}
          <motion.g
            initial={{ opacity: 0, y: 8 }}
            animate={{
              opacity: story.isAfter('stamp') ? 1 : 0,
              y: story.isAfter('stamp') ? 0 : 8,
            }}
            transition={{ duration: 0.5, ease: EASE.expoOut }}
          >
            {/* glow halo */}
            <motion.rect
              x={760} y={420} width={290} height={68} rx={6}
              fill="color-mix(in srgb, var(--case) 18%, transparent)"
              filter="url(#stamp-glow)"
              animate={story.isAfter('stamp')
                ? { opacity: [0.0, 0.6, 0.25] }
                : { opacity: 0 }}
              transition={{
                duration: 1.6,
                ease: 'easeOut',
                times: [0, 0.4, 1],
              }}
            />
            <rect
              x={760} y={420} width={290} height={68} rx={6}
              fill="color-mix(in srgb, var(--panel) 32%, transparent)"
              stroke="color-mix(in srgb, var(--case) 50%, transparent)"
              strokeWidth="1"
            />
            {/* sweep underline that draws under the stamp text */}
            <motion.line
              x1={774} y1={488} x2={1042} y2={488}
              stroke="var(--case)" strokeWidth="1.4"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: story.isAfter('stamp') ? 1 : 0 }}
              transition={{ duration: 0.8, delay: 0.35, ease: EASE.expoOut }}
            />
            <text x={774} y={444}
              className="deck-mono uppercase"
              style={{ fontSize: 9, fill: 'var(--case)', letterSpacing: '0.18em' }}
            >
              PARAMETERS · STAMPED
            </text>
            <text x={774} y={464}
              className="deck-mono"
              style={{ fontSize: 10.5, fill: 'var(--cream)', letterSpacing: '0.06em' }}
            >
              v1.0 · sha:f8a29c41
            </text>
            <text x={774} y={482}
              className="deck-mono"
              style={{ fontSize: 9, fill: 'var(--cream-muted)', letterSpacing: '0.04em' }}
            >
              chain · audit · 21 CFR 11
            </text>
          </motion.g>
        </svg>

        {/* === KaTeX trapezoidal AUC equation, overlay top-left === */}
        <motion.div
          className="absolute"
          style={{
            left: '4%',
            top: '5%',
            padding: '10px 14px',
            borderRadius: 8,
            borderLeft: '2px solid var(--case)',
            background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow: '0 8px 24px color-mix(in srgb, var(--case) 14%, transparent)',
            fontSize: '0.85rem',
            color: 'var(--cream)',
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{
            opacity: story.isAfter('equation') ? 1 : 0,
            x: story.isAfter('equation') ? 0 : -8,
          }}
          transition={{ duration: 0.5, ease: EASE.expoOut }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: '0.20em',
              color: 'var(--case)',
              marginBottom: 6,
              fontWeight: 600,
            }}
          >
            TRAPEZOIDAL AUC
          </div>
          <div style={{ color: 'var(--cream)', fontSize: '0.78rem' }}>
            <BlockMath math={String.raw`AUC_{0\text{-}\infty} = \sum_{i=0}^{n-1} \frac{C_i + C_{i+1}}{2}\,\Delta t \;+\; \frac{C_n}{\lambda_z}`} />
          </div>
        </motion.div>
      </div>
    </ComponentCard>
  );
}

/* ────────── helpers ────────── */

function ParamCallout({
  x, y, label, value, show, delay,
}: {
  x: number; y: number;
  label: string; value: string;
  show: boolean; delay: number;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, x: 14 }}
      animate={{
        opacity: show ? 1 : 0,
        x: show ? 0 : 14,
      }}
      transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
    >
      <rect
        x={x} y={y} width={290} height={66} rx={6}
        fill="color-mix(in srgb, var(--panel) 24%, transparent)"
        stroke="color-mix(in srgb, var(--case) 28%, transparent)"
        strokeWidth="1"
      />
      <text
        x={x + 14} y={y + 22}
        className="deck-mono uppercase"
        style={{ fontSize: 9, fill: 'var(--case)', letterSpacing: '0.20em' }}
      >
        {label}
      </text>
      <text
        x={x + 14} y={y + 50}
        className="deck-display"
        style={{ fontSize: 22, fill: 'var(--cream)', fontWeight: 500, letterSpacing: '-0.01em' }}
      >
        {value}
      </text>
    </motion.g>
  );
}
