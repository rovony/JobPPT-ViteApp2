import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * 01-title — Blueprint-inspired cover for v7-xencor-v3.
 *
 * Theme: follows `.deck-root[data-theme-mode]` via `--bp-*` tokens in
 * `deck-type.css` (light complementary paper + dark navy blueprint).
 * Aesthetic reference: Xencor/deck-react — adapt sizes for FitStage; do not
 * blind-copy 58pt. Tag: Pharmacometrics & Clinical Pharmacology (no Senior Director).
 * isTitle: true suppresses the standard footer.
 */

const FONT = {
  sans: "'Poppins', 'Avenir Next', Futura, 'Segoe UI', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, 'Courier New', monospace",
} as const;

/** Fallbacks = dark blueprint; CSS vars override when light/dark tokens load. */
const bp = (name: string, fallback: string) => `var(--bp-${name}, ${fallback})`;

const BP = {
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
  decisionInk: bp('decision-ink', '#FFFFFF'),
  decisionAccent: bp('decision-accent', '#0FB4D8'),
  markerF: bp('marker-f', '#12294C'),
  markerC: bp('marker-c', '#0FB4D8'),
  xStroke: bp('x-stroke', '#FFFFFF'),
} as const;

/** Adapted for this canvas — blueprint is reference, not a size lock. */
const TYPE = {
  tag: {
    fontSize: 'clamp(0.72rem, 1.2vh, 0.88rem)',
    letterSpacing: '0.16em',
    fontWeight: 600 as const,
  },
  h1: {
    fontSize: 'clamp(2.15rem, min(3.9vw, 5.6vh), 3.25rem)',
    lineHeight: 1.08,
    fontWeight: 700 as const,
    letterSpacing: '-0.022em',
  },
  subtitle: {
    fontSize: 'clamp(1.05rem, min(1.55vw, 2.35vh), 1.4rem)',
    lineHeight: 1.38,
    fontWeight: 600 as const,
  },
  name: {
    fontSize: 'clamp(1.1rem, min(1.6vw, 2.4vh), 1.45rem)',
    fontWeight: 700 as const,
    lineHeight: 1.2,
  },
  meta: {
    fontSize: 'clamp(0.68rem, 1.15vh, 0.82rem)',
    letterSpacing: '0.08em',
  },
  slideNum: {
    fontSize: 'clamp(0.68rem, 1.1vh, 0.8rem)',
    letterSpacing: '0.12em',
  },
  svgAxis: { fontSize: 14, letterSpacing: '0.06em' },
  svgAnnot: { fontSize: 14, letterSpacing: '0.12em' },
  svgLabel: { fontSize: 14, fontWeight: 600 as const },
  svgDecision: { fontSize: 17, fontWeight: 700 as const },
} as const;

export default function TitleSlide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.25 });
  const prefersReducedMotion = useReducedMotion();
  const go = isInView && !prefersReducedMotion;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 10 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: {
      duration: 0.45,
      delay,
      ease: [0.22, 0.7, 0.2, 1] as const,
    },
  });

  return (
    <motion.section
      ref={ref}
      data-slide="01"
      data-title-blueprint=""
      aria-labelledby="s01-title"
      className="relative w-full h-full overflow-hidden"
      style={{
        color: BP.ink2,
        padding: '48px 64px 56px',
        background: [
          `repeating-linear-gradient(0deg, transparent 0 39px, ${BP.grid} 39px 40px)`,
          `repeating-linear-gradient(90deg, transparent 0 39px, ${BP.grid} 39px 40px)`,
          BP.paper,
        ].join(', '),
        fontFamily: FONT.sans,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{
          inset: 28,
          border: `1px solid ${BP.hair2}`,
        }}
      />

      <div
        className="relative z-[1] h-full w-full min-h-0 grid"
        style={{
          gridTemplateColumns: 'minmax(0, 0.95fr) minmax(0, 1.15fr)',
          gap: 'clamp(20px, 2.5vw, 40px)',
          alignItems: 'stretch',
        }}
      >
        <div
          className="flex flex-col min-w-0 min-h-0"
          style={{ paddingTop: 'clamp(8px, 1.5vh, 24px)' }}
        >
          <motion.div
            style={{
              display: 'inline-block',
              width: 'fit-content',
              maxWidth: '100%',
              fontFamily: FONT.mono,
              textTransform: 'uppercase',
              ...TYPE.tag,
              color: BP.cyan,
              border: `1.5px solid ${BP.cyan}`,
              padding: '5px 11px',
            }}
            {...enter(0.06)}
          >
            Pharmacometrics &amp; Clinical Pharmacology
          </motion.div>

          <motion.h1
            id="s01-title"
            style={{
              margin: 'clamp(1rem, 2.2vh, 1.6rem) 0 0 0',
              fontFamily: FONT.sans,
              ...TYPE.h1,
              color: BP.ink,
              maxWidth: '16ch',
            }}
            {...enter(0.14)}
          >
            Quantitative decisions
            <br />
            when the{' '}
            <span style={{ color: BP.cyan }}>clean experiment</span>
            <br />
            is unavailable
          </motion.h1>

          <motion.p
            style={{
              margin: 'clamp(0.85rem, 1.8vh, 1.35rem) 0 0 0',
              fontFamily: FONT.sans,
              ...TYPE.subtitle,
              color: BP.teal,
              maxWidth: '36ch',
            }}
            {...enter(0.26)}
          >
            Four decisions. Four different reasons the obvious study
            could not be run. One discipline.
          </motion.p>

          <motion.div
            style={{
              marginTop: 'auto',
              paddingTop: 'clamp(0.85rem, 2vh, 1.5rem)',
              borderTop: `3px solid ${BP.ink}`,
              maxWidth: '36ch',
              flexShrink: 0,
            }}
            {...enter(0.38)}
          >
            <div
              style={{
                fontFamily: FONT.sans,
                ...TYPE.name,
                color: BP.ink,
                whiteSpace: 'nowrap',
              }}
            >
              Malek Okour, BDS, Ph.D.
            </div>
            <div
              style={{
                marginTop: 6,
                fontFamily: FONT.mono,
                ...TYPE.meta,
                color: BP.ink3,
                textTransform: 'uppercase',
              }}
            >
              Xencor interview panel · 12 August 2026
            </div>
          </motion.div>
        </div>

        <motion.div
          className="relative min-w-0 min-h-0 flex items-center justify-center"
          style={{ paddingBottom: 8 }}
          {...enter(0.2)}
        >
          <DecisionLattice />
        </motion.div>
      </div>

      <div
        className="absolute z-[2]"
        style={{
          right: 64,
          bottom: 28,
          fontFamily: FONT.mono,
          ...TYPE.slideNum,
          color: BP.ink4,
        }}
      >
        01
      </div>
    </motion.section>
  );
}

function DecisionLattice() {
  const mono = FONT.mono;
  const sans = FONT.sans;

  return (
    <svg
      viewBox="0 0 880 780"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full"
      style={{ maxHeight: '100%', maxWidth: '100%' }}
      aria-label="Decision lattice: four evidence routes converging on a defendable decision when the clean experiment is unavailable"
    >
      <defs>
        <filter id="title-glow" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <filter id="title-glowS" x="-60%" y="-60%" width="220%" height="220%">
          <feGaussianBlur stdDeviation="3" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
        <marker
          id="title-aF"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 z" fill={BP.markerF} />
        </marker>
        <marker
          id="title-aFC"
          markerWidth="9"
          markerHeight="9"
          refX="8"
          refY="4.5"
          orient="auto"
        >
          <path d="M0,0 L9,4.5 L0,9 z" fill={BP.markerC} />
        </marker>
      </defs>

      <g stroke={BP.hair} strokeWidth="1" fill="none">
        <path
          d="M60 40 L820 40"
          markerStart="url(#title-aF)"
          markerEnd="url(#title-aF)"
        />
        <path
          d="M40 60 L40 740"
          markerStart="url(#title-aF)"
          markerEnd="url(#title-aF)"
        />
      </g>
      <text
        x="440"
        y="28"
        textAnchor="middle"
        style={{
          fill: BP.ink4,
          ...TYPE.svgAxis,
          fontFamily: mono,
        }}
      >
        DECISION SPACE
      </text>
      <text
        x="28"
        y="400"
        textAnchor="middle"
        transform="rotate(-90 28 400)"
        style={{
          fill: BP.ink4,
          ...TYPE.svgAxis,
          fontFamily: mono,
        }}
      >
        EVIDENCE AVAILABLE
      </text>

      <rect
        x="330"
        y="96"
        width="260"
        height="120"
        fill={BP.roseWash}
        stroke={BP.rose}
        strokeWidth="2"
        strokeDasharray="9 7"
      />
      <text
        x="460"
        y="142"
        textAnchor="middle"
        style={{
          fill: BP.ink3,
          ...TYPE.svgLabel,
          letterSpacing: '0.1em',
          fontFamily: mono,
        }}
      >
        THE CLEAN
      </text>
      <text
        x="460"
        y="168"
        textAnchor="middle"
        style={{
          fill: BP.ink3,
          ...TYPE.svgLabel,
          letterSpacing: '0.1em',
          fontFamily: mono,
        }}
      >
        EXPERIMENT
      </text>
      <text
        x="460"
        y="196"
        textAnchor="middle"
        style={{
          fill: BP.rose,
          ...TYPE.svgAnnot,
          fontFamily: mono,
        }}
      >
        not available
      </text>
      <circle cx="590" cy="96" r="19" fill={BP.rose} />
      <path
        d="M582 88 L598 104 M598 88 L582 104"
        stroke={BP.xStroke}
        strokeWidth="2.6"
        strokeLinecap="round"
      />

      <g
        fill="none"
        stroke={BP.cyan}
        strokeWidth="2.5"
        filter="url(#title-glowS)"
      >
        <path
          d="M120 300 L120 420 L400 420 L400 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M330 300 L330 380 L430 380 L430 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M560 300 L560 380 L490 380 L490 500"
          markerEnd="url(#title-aFC)"
        />
        <path
          d="M780 300 L780 420 L520 420 L520 500"
          markerEnd="url(#title-aFC)"
        />
      </g>

      <g>
        {(
          [
            { x: 52, cx: 120, label: 'EXPOSURE', caseN: 'case 01' },
            { x: 262, cx: 330, label: 'TRANSPORT', caseN: 'case 02' },
            { x: 492, cx: 560, label: 'PRECISION', caseN: 'case 03' },
            { x: 712, cx: 780, label: 'TRACEABILITY', caseN: 'case 04' },
          ] as const
        ).map((n) => (
          <g key={n.label}>
            <text
              x={n.cx}
              y="238"
              textAnchor="middle"
              style={{
                fill: BP.ink4,
                ...TYPE.svgAnnot,
                fontFamily: mono,
              }}
            >
              {n.caseN}
            </text>
            <rect
              x={n.x}
              y="252"
              width="136"
              height="48"
              fill={BP.paper2}
              stroke={BP.ink}
              strokeWidth="2"
            />
            <text
              x={n.cx}
              y="282"
              textAnchor="middle"
              style={{
                fill: BP.ink,
                ...TYPE.svgLabel,
                letterSpacing: '0.1em',
                fontFamily: mono,
              }}
            >
              {n.label}
            </text>
          </g>
        ))}
      </g>

      <g filter="url(#title-glow)">
        <rect
          x="330"
          y="508"
          width="260"
          height="96"
          fill={BP.panelHi}
        />
      </g>
      <text
        x="460"
        y="548"
        textAnchor="middle"
        style={{
          ...TYPE.svgDecision,
          fill: BP.decisionInk,
          fontFamily: sans,
        }}
      >
        A DEFENDABLE
      </text>
      <text
        x="460"
        y="578"
        textAnchor="middle"
        style={{
          ...TYPE.svgDecision,
          fill: BP.decisionAccent,
          fontFamily: sans,
        }}
      >
        DECISION
      </text>

      <path
        d="M600 556 L700 556 L700 640"
        fill="none"
        stroke={BP.ink4}
        strokeWidth="1.2"
      />
      <circle cx="600" cy="556" r="4" fill={BP.cyan} />
      <text
        x="700"
        y="666"
        textAnchor="middle"
        style={{
          fill: BP.ink4,
          ...TYPE.svgAnnot,
          fontFamily: mono,
        }}
      >
        the method changed
      </text>
      <text
        x="700"
        y="688"
        textAnchor="middle"
        style={{
          fill: BP.ink4,
          ...TYPE.svgAnnot,
          fontFamily: mono,
        }}
      >
        every time
      </text>
      <text
        x="700"
        y="716"
        textAnchor="middle"
        style={{
          fill: BP.cyan,
          ...TYPE.svgAnnot,
          fontFamily: mono,
        }}
      >
        the route did not
      </text>
    </svg>
  );
}
