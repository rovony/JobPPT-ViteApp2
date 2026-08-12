import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BP } from '../_shared/blueprint';

/**
 * 03 · What you will see — blueprint-inspired roadmap.
 * FitStage 1920×1080; light/dark via --bp-* / `.xc-*` (`styles/xencor-deck.css`).
 * Order: Ambrisentan → Ivosidenib India → Asparlas → Pharazi (15–17 · 11 · 7 · 3).
 */

const FONT = {
  sans: 'var(--font-display)',
  mono: 'var(--font-mono)',
} as const;

const EASE = [0.22, 0.7, 0.2, 1] as const;

type CaseId = 1 | 2 | 3 | 4;

type RoadmapCase = {
  n: string;
  caseId: CaseId;
  kick: string;
  drug: string;
  meta: string;
  /** One-line decision thesis (teaser under viz) */
  body: string;
  /**
   * Approach frame — how the gap was closed (not a conclusion).
   * Emphasized word sits in `em`; surrounding mono copy in before/after.
   */
  frame: { before: string; em: string; after: string };
  Viz: () => React.ReactElement;
};

function VizAmbrisentan() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <rect x="12" y="36" width="276" height="48" fill="var(--xc-case-wash)" rx="1" />
      <text
        x="150"
        y="26"
        textAnchor="middle"
        fill="var(--xc-case-accent)"
        style={{ fontFamily: FONT.mono, fontSize: 'var(--bp-fs-svg)', letterSpacing: 'var(--ls-mono)' }}
      >
        ADULT BAND
      </text>
      <g fill={BP.ink} stroke="var(--xc-case-accent)" strokeWidth="1.25">
        <circle cx="60" cy="66" r="4.5" />
        <circle cx="110" cy="52" r="4.5" />
        <circle cx="160" cy="72" r="4.5" />
        <circle cx="210" cy="56" r="4.5" />
        <circle cx="255" cy="64" r="4.5" />
      </g>
      <text
        x="150"
        y="110"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: '0.75rem', letterSpacing: 'var(--ls-mono)' }}
      >
        PEDIATRIC EXPOSURES
      </text>
    </svg>
  );
}

function VizIvosidenib() {
  return (
    <svg viewBox="0 0 300 120" aria-hidden style={{ width: '100%', height: '100%' }}>
      <g stroke="var(--xc-case-accent)" strokeWidth="2" fill="none">
        <path d="M20 26 L130 60" />
        <path d="M20 60 L130 60" />
        <path d="M20 94 L130 60" />
        <path d="M280 26 L170 60" />
        <path d="M280 60 L170 60" />
        <path d="M280 94 L170 60" />
      </g>
      <circle cx="150" cy="60" r="22" fill="none" stroke="var(--xc-case-accent)" strokeWidth="2.5" />
      <text
        x="150"
        y="66"
        textAnchor="middle"
        fill="var(--xc-case-accent)"
        style={{ fontFamily: FONT.mono, fontSize: '1.125rem', fontWeight: 700 }}
      >
        6
      </text>
      <text
        x="150"
        y="112"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: '0.75rem', letterSpacing: 'var(--ls-mono)' }}
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
        stroke="var(--xc-case-accent)"
        strokeWidth="3"
      />
      <line
        x1="112"
        y1="14"
        x2="112"
        y2="104"
        stroke={BP.hair}
        strokeDasharray="5 4"
        strokeWidth="1.25"
      />
      <circle cx="112" cy="80" r="6" fill="var(--xc-case-accent)" />
      <text
        x="126"
        y="34"
        fill={BP.ink3}
        style={{ fontFamily: FONT.mono, fontSize: '0.75rem', letterSpacing: 'var(--ls-mono)' }}
      >
        PLATEAU
      </text>
      <text
        x="150"
        y="116"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: '0.75rem', letterSpacing: 'var(--ls-mono)' }}
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
          <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--xc-case-accent)" />
        </marker>
      </defs>
      <g fill="none" stroke="var(--xc-case-accent)" strokeWidth="2">
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
          style={{ fontFamily: FONT.mono, fontSize: '0.6875rem', fontWeight: 600 }}
        >
          {label}
        </text>
      ))}
      <text
        x="150"
        y="110"
        textAnchor="middle"
        fill={BP.ink4}
        style={{ fontFamily: FONT.mono, fontSize: '0.75rem', letterSpacing: 'var(--ls-mono)' }}
      >
        AUDIT TRAIL
      </text>
    </svg>
  );
}

/* Teasers = locked theses; frames = approach tags (how the gap was closed) */
const CASES: RoadmapCase[] = [
  {
    n: '01',
    caseId: 1 as const,
    kick: 'CASE 01 · UNTRIALABLE',
    drug: 'Ambrisentan',
    meta: 'PEDIATRIC PAH',
    body: 'Exposure matching can carry a label when the efficacy trial cannot.',
    frame: { before: 'BRIDGING ', em: 'WITHIN', after: ' A SHARED BASE' },
    Viz: VizAmbrisentan,
  },
  {
    n: '02',
    caseId: 2 as const,
    kick: 'CASE 02 · LOCAL-EVIDENCE',
    drug: 'Ivosidenib · India',
    meta: 'IDH1-MUTANT AML',
    body: 'Convergent evidence plus a named residual gap can replace a local trial.',
    frame: { before: 'BRIDGING ', em: 'ACROSS', after: ' A MISSING ONE' },
    Viz: VizIvosidenib,
  },
  {
    n: '03',
    caseId: 3 as const,
    kick: 'CASE 03 · SAMPLE-LIMITED',
    drug: 'Asparlas',
    meta: 'ADULT Ph− ALL',
    body: 'Precision and pre-agreed design can replace endpoint power you cannot afford.',
    frame: { before: 'CHANGING THE STUDY ', em: 'BEFORE', after: ' IT RUNS' },
    Viz: VizAsparlas,
  },
  {
    n: '04',
    caseId: 4 as const,
    kick: 'CASE 04 · UNBUILT',
    drug: 'Pharazi',
    meta: 'PERSONAL RESEARCH',
    body: 'Traceable, human-owned workflows make AI acceleration usable.',
    frame: { before: 'BUILDING THE ', em: 'SYSTEM', after: ', NOT THE ANALYSIS' },
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
  const delay = reduced ? 0 : 0.28 + index * 0.09;

  return (
    <motion.div
      aria-label={`${c.kick}: ${c.drug}`}
      className="xc-wyws__col"
      data-case={c.caseId}
      initial={{ opacity: 0, y: 8 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.42, delay, ease: EASE }}
    >
      <div className="xc-wyws__kick">{c.kick}</div>

      <article className="xc-case-card">
        <CornerBrackets color={BP.ink} />
        <div className="xc-frame-inner" aria-hidden />
        <div className="xc-case-card__accent" aria-hidden />

        <div className="xc-wyws__card-body">
          <h3 className="xc-title">{c.drug}</h3>
          <div className="xc-wyws__meta">{c.meta}</div>

          <div className="xc-viz-frame">
            <c.Viz />
          </div>

          <p className="xc-wyws__teaser">{c.body}</p>

          <div className="xc-wyws__frame">
            <div className="xc-wyws__frame-label">Frame</div>
            <div className="xc-wyws__frame-text">
              {c.frame.before}
              <b>{c.frame.em}</b>
              {c.frame.after}
            </div>
          </div>
        </div>
      </article>
    </motion.div>
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
      className="xc-blueprint-surface xc-wyws relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div aria-hidden className="xc-blueprint-frame" />

      <motion.div className="xc-tag xc-wyws__kicker" {...enter(0.06)}>
        What you will see
      </motion.div>

      <motion.h2 id="s03-wyws-title" className="xc-h2 xc-wyws__title" {...enter(0.14)}>
        Four cases, four different reasons the{' '}
        <span className="xc-em">obvious study</span> could not answer
      </motion.h2>

      <div className="xc-roadmap-row xc-wyws__row">
        {CASES.map((c, i) => (
          <CaseCard key={c.n} c={c} index={i} go={!!go} reduced={reduced} />
        ))}
      </div>

      <motion.div className="xc-statement-band" {...enter(0.62)}>
        <div className="xc-frame-inner" aria-hidden />
        <span className="xc-statement-band__inner">
          The cases are evidence. The argument is that{' '}
          <b className="xc-em" style={{ fontWeight: 700 }}>
            the same discipline carried all four.
          </b>
        </span>
      </motion.div>
    </motion.section>
  );
}
