import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * 03 · What you will see — blueprint-inspired roadmap (deck-react intro/03).
 *
 * Inspired by Xencor/deck-react HUD cards + statement band — not a blind
 * pt-size copy. FitStage 1920×1080; light/dark via --bp-* (deck-type.css).
 * Locked order: Ambrisentan → Ivosidenib India → Asparlas → Pharazi
 * Times: 15–17 · 11 · 7 · 3 min (GOAL / 00-Portfolio-Case-Jobs)
 */

const FONT = {
  sans: "'Poppins', 'Avenir Next', Futura, 'Segoe UI', system-ui, -apple-system, sans-serif",
  mono: "'JetBrains Mono', 'SF Mono', Menlo, Consolas, 'Courier New', monospace",
} as const;

const bp = (name: string, fallback: string) => `var(--bp-${name}, ${fallback})`;

const BP = {
  paper: bp('paper', '#0C1420'),
  paper2: bp('paper2', '#141E2E'),
  ink: bp('ink', '#EAF1F9'),
  ink2: bp('ink2', '#C4D2E4'),
  ink3: bp('ink3', '#93A6BE'),
  ink4: bp('ink4', '#8497AF'),
  hair: bp('hair', 'rgba(190,215,245,.20)'),
  hair2: bp('hair2', 'rgba(190,215,245,.10)'),
  grid: bp('grid', 'rgba(130,200,255,.045)'),
  cyan: bp('cyan', '#22D3EE'),
  teal: bp('teal', '#5EEAD4'),
  cyanWash: bp('cyan-wash', 'rgba(34,211,238,.12)'),
  bandBg: bp('band-bg', 'rgba(20,30,46,.86)'),
} as const;

const EASE = [0.22, 0.7, 0.2, 1] as const;

type CaseAccent = 'cyan' | 'teal';

type RoadmapCase = {
  n: string;
  kick: string;
  drug: string;
  meta: string;
  body: string;
  principle: { before: string; em: string; after: string };
  accent: CaseAccent;
  Viz: () => React.ReactElement;
};

function VizAmbrisentan() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <rect
        x="10"
        y="34"
        width="280"
        height="52"
        fill={BP.cyanWash}
        stroke={BP.cyan}
        strokeDasharray="5 4"
      />
      <text
        x="150"
        y="24"
        textAnchor="middle"
        fill={BP.cyan}
        style={{ fontFamily: FONT.mono, fontSize: 13, letterSpacing: '0.06em' }}
      >
        ADULT BAND
      </text>
      <g fill={BP.paper2}>
        <circle cx="60" cy="66" r="5" />
        <circle cx="110" cy="52" r="5" />
        <circle cx="160" cy="72" r="5" />
        <circle cx="210" cy="56" r="5" />
        <circle cx="255" cy="64" r="5" />
      </g>
      <text
        x="150"
        y="110"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '0.06em' }}
      >
        PEDIATRIC EXPOSURES
      </text>
    </svg>
  );
}

function VizIvosidenib() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <g stroke={BP.teal} strokeWidth="2" fill="none">
        <path d="M20 26 L130 60" />
        <path d="M20 60 L130 60" />
        <path d="M20 94 L130 60" />
        <path d="M280 26 L170 60" />
        <path d="M280 60 L170 60" />
        <path d="M280 94 L170 60" />
      </g>
      <circle cx="150" cy="60" r="22" fill="none" stroke={BP.teal} strokeWidth="2.5" />
      <text
        x="150"
        y="66"
        textAnchor="middle"
        fill={BP.teal}
        style={{ fontFamily: FONT.mono, fontSize: 18, fontWeight: 700 }}
      >
        6
      </text>
      <text
        x="150"
        y="112"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '0.06em' }}
      >
        CONVERGENT PILLARS
      </text>
    </svg>
  );
}

function VizAsparlas() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <path
        d="M22 24 C 70 60, 110 84, 280 90"
        fill="none"
        stroke={BP.cyan}
        strokeWidth="3"
      />
      <line
        x1="112"
        y1="14"
        x2="112"
        y2="104"
        stroke={BP.ink}
        strokeDasharray="5 4"
        strokeWidth="1.6"
      />
      <circle cx="112" cy="80" r="6" fill={BP.cyan} />
      <text
        x="126"
        y="34"
        fill={BP.ink3}
        style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '0.06em' }}
      >
        PLATEAU
      </text>
      <text
        x="150"
        y="116"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '0.06em' }}
      >
        PRECISION vs N
      </text>
    </svg>
  );
}

function VizPharazi() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <defs>
        <marker
          id="wyws-arrow"
          viewBox="0 0 10 10"
          refX="9"
          refY="5"
          markerWidth="6"
          markerHeight="6"
          orient="auto-start-reverse"
        >
          <path d="M 0 0 L 10 5 L 0 10 z" fill={BP.teal} />
        </marker>
      </defs>
      <g fill="none" stroke={BP.teal} strokeWidth="2">
        <rect x="14" y="44" width="56" height="34" />
        <rect x="88" y="44" width="56" height="34" />
        <rect x="162" y="44" width="56" height="34" />
        <rect x="236" y="44" width="52" height="34" />
        <path d="M70 61 L86 61" markerEnd="url(#wyws-arrow)" />
        <path d="M144 61 L160 61" markerEnd="url(#wyws-arrow)" />
        <path d="M218 61 L234 61" markerEnd="url(#wyws-arrow)" />
      </g>
      {(
        [
          [42, 'PLAN'],
          [116, 'RUN'],
          [190, 'CHECK'],
          [262, 'RECORD'],
        ] as const
      ).map(([x, label]) => (
        <text
          key={label}
          x={x}
          y="66"
          textAnchor="middle"
          fill={BP.ink2}
          style={{ fontFamily: FONT.mono, fontSize: 11, fontWeight: 600 }}
        >
          {label}
        </text>
      ))}
      <text
        x="150"
        y="110"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: 12, letterSpacing: '0.06em' }}
      >
        AUDIT TRAIL
      </text>
    </svg>
  );
}

const CASES: RoadmapCase[] = [
  {
    n: '01',
    kick: 'CASE 01 · UNTRIALABLE',
    drug: 'Ambrisentan',
    meta: 'PEDIATRIC PAH · 15–17 MIN',
    body: 'Exposure matching can carry a label when the efficacy trial cannot.',
    principle: { before: 'BRIDGING ', em: 'WITHIN', after: ' A SHARED BASE' },
    accent: 'cyan',
    Viz: VizAmbrisentan,
  },
  {
    n: '02',
    kick: 'CASE 02 · LOCAL-EVIDENCE',
    drug: 'Ivosidenib · India',
    meta: 'IDH1-MUTANT AML · 11 MIN',
    body: 'Convergent evidence plus a named residual gap can replace a local trial.',
    principle: { before: 'BRIDGING ', em: 'ACROSS', after: ' A MISSING ONE' },
    accent: 'teal',
    Viz: VizIvosidenib,
  },
  {
    n: '03',
    kick: 'CASE 03 · SAMPLE-LIMITED',
    drug: 'Asparlas',
    meta: 'ADULT Ph− ALL · 7 MIN',
    body: 'Precision and pre-agreed design can replace endpoint power you cannot afford.',
    principle: { before: 'CHANGING THE STUDY ', em: 'BEFORE', after: ' IT RUNS' },
    accent: 'cyan',
    Viz: VizAsparlas,
  },
  {
    n: '04',
    kick: 'CASE 04 · UNBUILT',
    drug: 'Pharazi',
    meta: 'PERSONAL RESEARCH · 3 MIN',
    body: 'Traceable, human-owned workflows are what make AI acceleration usable.',
    principle: { before: 'BUILDING THE ', em: 'SYSTEM', after: ', NOT THE ANALYSIS' },
    accent: 'teal',
    Viz: VizPharazi,
  },
];

function CornerBrackets({ color }: { color: string }) {
  const arm = 14;
  const thick = 2.5;
  const shared: React.CSSProperties = {
    position: 'absolute',
    width: arm,
    height: arm,
    borderColor: color,
    borderStyle: 'solid',
    pointerEvents: 'none',
    zIndex: 3,
  };
  return (
    <>
      <i aria-hidden style={{ ...shared, left: -2, top: -2, borderWidth: `${thick}px 0 0 ${thick}px` }} />
      <i aria-hidden style={{ ...shared, right: -2, top: -2, borderWidth: `${thick}px ${thick}px 0 0` }} />
      <i aria-hidden style={{ ...shared, left: -2, bottom: -2, borderWidth: `0 0 ${thick}px ${thick}px` }} />
      <i aria-hidden style={{ ...shared, right: -2, bottom: -2, borderWidth: `0 ${thick}px ${thick}px 0` }} />
    </>
  );
}

function CaseCard({
  c,
  index,
  go,
  reduced,
}: {
  c: RoadmapCase;
  index: number;
  go: boolean;
  reduced: boolean | null;
}) {
  const accent = c.accent === 'teal' ? BP.teal : BP.cyan;
  const delay = reduced ? 0 : 0.28 + index * 0.09;

  return (
    <motion.article
      aria-label={`${c.kick}: ${c.drug}`}
      style={{
        position: 'relative',
        minWidth: 0,
        minHeight: 0,
        display: 'flex',
        flexDirection: 'column',
        background: BP.paper2,
        border: `2px solid ${BP.ink}`,
        padding:
          'clamp(14px, 1.4vh, 22px) clamp(14px, 1.2vw, 22px) clamp(14px, 1.4vh, 22px) clamp(22px, 1.6vw, 30px)',
        height: '100%',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: EASE }}
    >
      <CornerBrackets color={BP.ink} />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 5,
          border: `1px solid ${BP.hair2}`,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 8,
          background: accent,
          zIndex: 2,
        }}
      />

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          minHeight: 0,
        }}
      >
        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 'clamp(0.62rem, 1.05vh, 0.78rem)',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: accent,
            fontWeight: 600,
            marginBottom: 6,
          }}
        >
          {c.kick}
        </div>

        <h3
          style={{
            margin: 0,
            fontFamily: FONT.sans,
            fontSize: 'clamp(1.15rem, min(1.7vw, 2.6vh), 1.55rem)',
            fontWeight: 700,
            color: BP.ink,
            lineHeight: 1.15,
            letterSpacing: '-0.015em',
          }}
        >
          {c.drug}
        </h3>

        <div
          style={{
            fontFamily: FONT.mono,
            fontSize: 'clamp(0.62rem, 1.05vh, 0.78rem)',
            color: BP.ink4,
            letterSpacing: '0.06em',
            marginTop: 6,
            marginBottom: 'clamp(8px, 1vh, 12px)',
          }}
        >
          {c.meta}
        </div>

        <div
          style={{
            flex: '0 0 auto',
            height: 'clamp(88px, 12vh, 130px)',
            marginBottom: 'clamp(8px, 1vh, 12px)',
          }}
        >
          <c.Viz />
        </div>

        <p
          style={{
            margin: 0,
            fontFamily: FONT.sans,
            fontSize: 'clamp(0.88rem, min(1.15vw, 1.7vh), 1.1rem)',
            lineHeight: 1.4,
            color: BP.ink2,
            flex: 1,
          }}
        >
          {c.body}
        </p>

        <div
          style={{
            marginTop: 'clamp(10px, 1.2vh, 14px)',
            paddingTop: 10,
            borderTop: `1px solid ${BP.hair2}`,
            fontFamily: FONT.mono,
            fontSize: 'clamp(0.58rem, 1vh, 0.72rem)',
            color: accent,
            letterSpacing: '0.06em',
            lineHeight: 1.35,
          }}
        >
          {c.principle.before}
          <b style={{ color: accent, fontWeight: 700 }}>{c.principle.em}</b>
          {c.principle.after}
        </div>
      </div>
    </motion.article>
  );
}

export default function WhatYouWillSee() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: { duration: 0.42, delay: reduced ? 0 : delay, ease: EASE },
  });

  return (
    <motion.section
      ref={ref}
      data-slide="03"
      data-roadmap-blueprint=""
      aria-labelledby="s03-wyws-title"
      className="relative w-full h-full overflow-hidden"
      style={{
        color: BP.ink2,
        padding:
          'clamp(36px, 4.2vh, 48px) clamp(40px, 3.5vw, 64px) clamp(28px, 3.2vh, 40px)',
        background: [
          `repeating-linear-gradient(0deg, transparent 0 39px, ${BP.grid} 39px 40px)`,
          `repeating-linear-gradient(90deg, transparent 0 39px, ${BP.grid} 39px 40px)`,
          BP.paper,
        ].join(', '),
        fontFamily: FONT.sans,
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute"
        style={{ inset: 28, border: `1px solid ${BP.hair2}` }}
      />

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          fontFamily: FONT.mono,
          fontSize: 'clamp(0.68rem, 1.15vh, 0.82rem)',
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: BP.ink3,
          fontWeight: 600,
        }}
        {...enter(0.06)}
      >
        What you will see
      </motion.div>

      <motion.h2
        id="s03-wyws-title"
        style={{
          position: 'relative',
          zIndex: 1,
          margin: 'clamp(10px, 1.4vh, 16px) 0 0 0',
          fontFamily: FONT.sans,
          fontSize: 'clamp(1.55rem, min(2.8vw, 4.2vh), 2.35rem)',
          fontWeight: 700,
          lineHeight: 1.15,
          letterSpacing: '-0.02em',
          color: BP.ink,
          maxWidth: '42ch',
        }}
        {...enter(0.14)}
      >
        Four cases, four different reasons the{' '}
        <span style={{ color: BP.cyan }}>obvious study</span> could not answer
      </motion.h2>

      <div
        style={{
          position: 'relative',
          zIndex: 1,
          flex: 1,
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          gap: 'clamp(12px, 1.4vw, 22px)',
          marginTop: 'clamp(18px, 2.4vh, 28px)',
          alignContent: 'stretch',
        }}
      >
        {CASES.map((c, i) => (
          <CaseCard key={c.n} c={c} index={i} go={!!go} reduced={reduced} />
        ))}
      </div>

      <motion.div
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: 'clamp(14px, 1.8vh, 22px)',
          flexShrink: 0,
          border: `2.5px solid ${BP.ink}`,
          background: BP.bandBg,
          padding: 'clamp(12px, 1.5vh, 18px) clamp(18px, 2vw, 28px)',
          fontFamily: FONT.sans,
          fontSize: 'clamp(0.95rem, min(1.35vw, 2.1vh), 1.25rem)',
          lineHeight: 1.35,
          color: BP.ink,
          textAlign: 'center',
          fontWeight: 500,
        }}
        {...enter(0.62)}
      >
        <div
          aria-hidden
          style={{
            position: 'absolute',
            inset: 5,
            border: `1px solid ${BP.hair2}`,
            pointerEvents: 'none',
          }}
        />
        <span style={{ position: 'relative' }}>
          The cases are evidence. The argument is that{' '}
          <b style={{ color: BP.cyan, fontWeight: 700 }}>
            the same discipline carried all four.
          </b>
        </span>
      </motion.div>

      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: 'clamp(40px, 3.5vw, 64px)',
          bottom: 'clamp(14px, 1.8vh, 22px)',
          fontFamily: FONT.mono,
          fontSize: 'clamp(0.62rem, 1vh, 0.75rem)',
          letterSpacing: '0.12em',
          color: BP.ink4,
          zIndex: 2,
        }}
      >
        03
      </div>
    </motion.section>
  );
}
