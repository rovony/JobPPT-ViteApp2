import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import CASES from '../../_shared/cases';
import CaseCard from '../../_shared/CaseCard';
import XencorWordmark from '../../components/XencorWordmark';

/**
 * 01-title — V3-R2 cover (Kinetic PK Spine).
 *
 * Ported verbatim from `qp2-seminar/slides/01-title.jsx` per explicit
 * authoring decision (Apr 2026). The v3-R2 cover adopts the v1 kinetic
 * composition: amber PK curve with four landmark dots, four case
 * cards anchored to Cmax / precision / reliance / audit, presenter
 * card + framed meta spec (4 cases / Xencor fit / 45 min), soft ambient
 * gradient.
 *
 * Locked talk identity (V7-Xencor):
 *   Title:    "When measurement falls short"
 *   Subtitle: "Clinical pharmacology makes the dose defensible"
 *
 * Light-editorial polish: solid panels, no amber glow filters / idle
 * pulse theater. Token-only styling from src/index.css. Animation gated
 * behind useInView(once) + useReducedMotion().
 */

// Landmarks float ABOVE the PK curve — pharmacologic markers, no drop-lines.
// Each dot is positioned at its own (x,y) independent of the curve path.
const PK_PRIMARY = 'M 0,200 C 60,200 100,20 150,20 C 200,20 280,80 400,120 C 520,160 700,180 900,190';
const PK_UPPER   = 'M 0,195 C 60,195 95,10 145,10 C 195,10 275,70 395,110 C 515,150 700,170 900,180';
const PK_LOWER   = 'M 0,210 C 60,210 105,35 155,35 C 205,35 285,95 405,135 C 525,175 700,195 900,205';

export default function TitleSlide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();
  // Always reveal when in view — reduced motion skips stagger, not content.
  const go = isInView || !!prefersReducedMotion;

  return (
    <section
      ref={ref}
      data-slide="01"
      aria-labelledby="s01-title"
      className="relative w-full h-full overflow-hidden flex"
      style={{
        background: 'var(--bg)',
        color: 'var(--cream)',
        padding: 'var(--deck-pad-top) var(--deck-gutter) var(--deck-pad-bottom)',
      }}
    >
      {/* Soft paper depth — no neon ambient bloom */}
      <div
        aria-hidden
        className="title-slide-ambient pointer-events-none absolute inset-0 z-0"
        style={{
          background: [
            'radial-gradient(ellipse 85% 55% at 50% -8%, color-mix(in srgb, var(--amber) 8%, transparent), transparent 52%)',
            'linear-gradient(180deg, color-mix(in srgb, var(--panel) 35%, transparent) 0%, transparent 38%, transparent 100%)',
          ].join(', '),
        }}
      />
      {/* ---------- Xencor wordmark · top-right (inset from edge) ---------- */}
      <div
        className="absolute z-[2] pointer-events-none"
        style={{
          top: 'calc(var(--deck-pad-top) + var(--space-3))',
          right: 'calc(var(--deck-gutter) + var(--space-3))',
        }}
      >
        <XencorWordmark
          layoutId="xencor-wordmark"
          go={go}
          color="var(--cream-muted)"
          width="clamp(140px, 14vw, 220px)"
          restOpacity={0.92}
        />
      </div>

      <div
        className="relative z-[1] w-full mx-auto flex flex-col"
        style={{ maxWidth: '1600px', rowGap: 'var(--space-6)' }}
      >
        {/* ---------- Eyebrow ---------- */}
        <div className="flex items-center" style={{ gap: 'var(--space-4)' }}>
          <span
            aria-hidden
            style={{
              display: 'inline-block',
              height: 2,
              width: 'clamp(40px, 5vw, 72px)',
              background: 'var(--amber)',
            }}
          />
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--amber)',
              fontWeight: 500,
            }}
          >
            XENCOR · SENIOR DIRECTOR PHARMACOMETRICS & QUANTITATIVE MEDICINE
          </span>
        </div>

        {/* ---------- Title — solid type (no opacity-0 word cascade) ---------- */}
        <h1
          id="s01-title"
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'var(--fs-slide-display)',
            lineHeight: 1.04,
            letterSpacing: 'var(--ls-display)',
            fontWeight: 450,
            color: 'var(--cream)',
          }}
        >
          When measurement falls{' '}
          <span
            style={{
              display: 'inline-block',
              position: 'relative',
              fontStyle: 'italic',
              fontWeight: 500,
              color: 'var(--amber)',
            }}
          >
            short.
            <span
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: '0.12em',
                bottom: '-0.08em',
                height: '0.09em',
                background: 'var(--amber)',
                borderRadius: 999,
              }}
            />
          </span>
        </h1>

        {/* ---------- Subtitle — matches slide 02 lead-line typography ---------- */}
        <p
          className="deck-body"
          style={{
            margin: 0,
            fontSize: 'var(--fs-slide-lead)',
            color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
            maxWidth: '60ch',
            fontWeight: 400,
            lineHeight: 1.35,
          }}
        >
          Four cases where{' '}
          <span style={{ color: 'var(--amber)', fontWeight: 600 }}>
            clinical pharmacology
          </span>
          {' '}makes the dose — and the decision — defensible.
        </p>

        {/* Top spacer — title breathing room above the cards. */}
        <div style={{ flex: '0 1 var(--space-6)', minHeight: 'var(--space-2)' }} aria-hidden />

        {/* ---------- Case cards (4 col desktop, 2 col tablet, 1 col mobile) ---------- */}
        <div
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4"
          style={{ gap: 'var(--space-4)' }}
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.id} c={c} index={i} go={go} compact />
          ))}
        </div>

        {/* ---------- PK curve — anchored directly under the cards ---------- */}
        <div className="w-full" style={{ flex: '0 1 auto', minHeight: 0 }}>
          <PKCurve go={go} />
        </div>

        {/* Bottom spacer */}
        <div style={{ flex: '0 1 var(--space-4)', minHeight: 'var(--space-2)' }} aria-hidden />

        {/* ---------- Author card + meta ---------- */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: 'var(--space-6)' }}
        >
          {/* Author card — solid panel, left accent, no glass blur */}
          <div
            className="relative"
            style={{
              padding: 'var(--space-6) var(--space-8) var(--space-6) var(--space-8)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '3px solid var(--amber)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--panel)',
              maxWidth: '56ch',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--amber)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Presenter
            </div>
            <p
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-slide-lead)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: 'var(--ls-headline)',
                lineHeight: 1.15,
              }}
            >
              Malek Okour, Ph.D.
            </p>
            <p
              style={{
                margin: 'var(--space-2) 0 0 0',
                fontSize: 'var(--fs-slide-name)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Director, Clinical Pharmacology · Servier Pharmaceuticals
            </p>
          </div>

          {/* Meta — solid framed spec */}
          <div
            className="text-left md:text-right deck-mono uppercase self-stretch md:self-end"
            style={{
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'var(--panel)',
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              lineHeight: 1.65,
              minWidth: 'min(100%, 22ch)',
            }}
          >
            <div>SEMINAR · JUNE 17 2026</div>
            <div>4 CASES · XENCOR · 45 MIN</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ========================================================
   PKCurve — primary amber curve, faint ±1 SD companions,
   landmark dots. One-shot draw; no idle pulse / glow filter.
   ======================================================== */
function PKCurve({ go }) {
  const drawDelay = go ? 0.12 : 0;
  return (
    <svg
      viewBox="0 0 900 240"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full block"
      style={{ maxHeight: 'clamp(180px, 30vh, 360px)' }}
      aria-label="Oral pharmacokinetic concentration-time curve with Cmax, AUC, and T½ landmarks"
    >
      {/* ±1 SD companions */}
      <motion.path
        d={PK_UPPER}
        fill="none"
        stroke="var(--cream-faint)"
        strokeWidth={1}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 0.55, delay: drawDelay, ease: 'easeInOut' }}
      />
      <motion.path
        d={PK_LOWER}
        fill="none"
        stroke="var(--cream-faint)"
        strokeWidth={1}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 0.55, delay: drawDelay, ease: 'easeInOut' }}
      />

      {/* Primary PK curve — draw once, steady stroke */}
      <motion.path
        d={PK_PRIMARY}
        fill="none"
        stroke="var(--amber)"
        strokeWidth={2.5}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: 1, strokeOpacity: 0.85 }}
        transition={{ pathLength: { duration: 0.55, delay: drawDelay, ease: 'easeInOut' } }}
      />

      {/* Baseline */}
      <line
        x1={0} y1={210} x2={900} y2={210}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
      />

      {CASES.map((c) => (
        <g key={c.id}>
          <circle cx={c.dotX} cy={c.dotY} r={7} fill={c.color} />
          <line
            x1={c.dotX} y1={c.dotY} x2={c.dotX} y2={210}
            stroke="var(--cream-hairline)"
            strokeWidth={1}
            strokeDasharray="3 4"
            strokeLinecap="round"
          />
          <text
            x={c.dotX} y={232}
            textAnchor="middle"
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono)',
              fill: 'var(--cream-muted)',
            }}
          >
            {c.labelText}
          </text>
        </g>
      ))}
    </svg>
  );
}
