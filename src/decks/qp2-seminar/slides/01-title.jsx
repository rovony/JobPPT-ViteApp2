import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useDeck } from '@/lib/deck-store';

/**
 * Slide 01 · Kinetic PK Spine (v0 rewrite).
 *
 * Title + three-case seminar slide. A plausible oral PK curve is the
 * narrative spine; each case anchors at a pharmacologic landmark:
 *   · CS1 (coral)  → Cmax  at x ≈ 22 %
 *   · CS2 (cyan)   → AUC   at x ≈ 55 %
 *   · CS3 (violet) → T½    at x ≈ 68 %
 *
 * Motion choreographed entirely with framer-motion (no GSAP). Animation
 * is gated behind `useInView(once)` + `useReducedMotion()` — motion-safe
 * and only runs on first entry. Tokens only, zero hardcoded colors.
 */

// Landmarks float ABOVE the PK curve — pharmacologic markers, no drop-lines.
// Each dot is positioned at its own (x,y) independent of the curve path.
// Labels sit at a shared baseline below, offset to match reference layout.
const CASES = [
  {
    id: 1,
    label: 'CASE 01 · AMBRISENTAN · PEDIATRIC PAH',
    title: 'Model-based dose for a trial that could not be run.',
    note: 'Approved by EMA + PMDA.',
    color: 'var(--coral)',
    dotX: 170,
    dotY: 18,
    labelX: 235,
    labelText: 'CMAX',
  },
  {
    id: 2,
    label: 'CASE 02 · TIBSOVO · INDIA AML',
    title: 'Global dossier extrapolated to CDSCO.',
    note: 'Local-data waiver granted, 2025.',
    color: 'var(--cyan)',
    dotX: 495,
    dotY: 118,
    labelX: 555,
    labelText: 'AUC',
  },
  {
    id: 3,
    label: 'CASE 03 · ASPARLAS · ADULT ALL',
    title: 'Two FDA-precedented methods stacked.',
    note: 'N=60 agreed, novel primary deferred.',
    color: 'var(--violet)',
    dotX: 625,
    dotY: 165,
    labelX: 680,
    labelText: 'T½',
  },
];

// Primary oral-PK curve — absorption → Cmax (x=150, y=20) → decline.
const PK_PRIMARY = 'M 0,200 C 60,200 100,20 150,20 C 200,20 280,80 400,120 C 520,160 700,180 900,190';
const PK_UPPER   = 'M 0,195 C 60,195 95,10 145,10 C 195,10 275,70 395,110 C 515,150 700,170 900,180';
const PK_LOWER   = 'M 0,210 C 60,210 105,35 155,35 C 205,35 285,95 405,135 C 525,175 700,195 900,205';

export default function Slide01() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const go = isInView && !prefersReducedMotion;
  const { index, total } = useDeck();

  return (
    <motion.section
      ref={ref}
      data-slide="01"
      aria-labelledby="s01-title"
      className="relative w-full h-full overflow-hidden flex"
      style={{
        background: 'var(--bg)',
        color: 'var(--cream)',
        padding: 'var(--deck-pad-top) var(--deck-gutter) var(--deck-pad-bottom)',
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <div
        className="w-full mx-auto flex flex-col"
        style={{ maxWidth: '1600px', rowGap: 'var(--space-6)' }}
      >
        {/* ---------- Eyebrow ---------- */}
        <motion.div
          className="flex items-center"
          style={{ gap: 'var(--space-4)' }}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <motion.span
            aria-hidden
            style={{
              display: 'inline-block',
              height: 2,
              width: 'clamp(40px, 5vw, 72px)',
              background: 'var(--amber)',
              transformOrigin: 'left center',
            }}
            initial={{ scaleX: 0 }}
            animate={go ? { scaleX: 1 } : { scaleX: 1 }}
            transition={{ duration: 0.35, delay: 0.2, ease: 'easeOut' }}
          />
          <motion.span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--amber)',
              fontWeight: 500,
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.35, delay: 0.35 }}
          >
            A THREE-CASE SEMINAR · SENIOR DIRECTOR CANDIDATE
          </motion.span>
        </motion.div>

        {/* ---------- Title ---------- */}
        <h1
          id="s01-title"
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'clamp(2.1rem, 5.8vw, 5.2rem)',
            lineHeight: 1.04,
            letterSpacing: 'var(--ls-display)',
            fontWeight: 450,
            color: 'var(--cream)',
          }}
        >
          {['Quantitative', 'Pharmacology', 'in'].map((word, i) => (
            <motion.span
              key={word}
              style={{ display: 'inline-block', marginRight: '0.25em' }}
              initial={{ opacity: 0, y: 24 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: 0.4,
                delay: 0.55 + i * 0.09,
                ease: [0.2, 0.7, 0.2, 1],
              }}
            >
              {word}
            </motion.span>
          ))}
          <span style={{ display: 'inline-block', position: 'relative' }}>
            <motion.span
              style={{
                display: 'inline-block',
                fontStyle: 'italic',
                fontWeight: 500,
                color: 'var(--amber)',
                transformOrigin: 'top center',
              }}
              initial={{ opacity: 0, rotateX: -90 }}
              animate={go ? { opacity: 1, rotateX: 0 } : { opacity: 1, rotateX: 0 }}
              transition={{ duration: 0.24, delay: 1.3, ease: [0.2, 0.9, 0.3, 1.2] }}
            >
              Action.
            </motion.span>
            {/* Animated underline — draws L→R after the word lands */}
            <motion.span
              aria-hidden
              style={{
                position: 'absolute',
                left: 0,
                right: '0.12em',
                bottom: '-0.08em',
                height: '0.09em',
                background: 'var(--amber)',
                borderRadius: 999,
                transformOrigin: 'left center',
                boxShadow: '0 0 18px color-mix(in srgb, var(--amber) 55%, transparent)',
              }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={go ? { scaleX: 1, opacity: 1 } : { scaleX: 1, opacity: 1 }}
              transition={{ duration: 0.8, delay: 1.55, ease: [0.2, 0.7, 0.3, 1] }}
            />
          </span>
        </h1>

        {/* ---------- Subtitle ---------- */}
        <motion.p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'clamp(1.05rem, 1.75vw, 1.7rem)',
            color: 'var(--cream-muted)',
            maxWidth: '60ch',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.7 }}
        >
          Strategies for Dose Selection and Regulatory Impact Across Therapeutic Areas
        </motion.p>

        {/* Top spacer — title breathing room above the cards.
            Flex: grows modestly, shrinks to the minimum on small screens. */}
        <div style={{ flex: '0 1 var(--space-6)', minHeight: 'var(--space-2)' }} aria-hidden />

        {/* ---------- Case cards (3 col desktop, 1 col mobile) ---------- */}
        <div
          className="grid grid-cols-1 md:grid-cols-3"
          style={{ gap: 'var(--space-8)' }}
        >
          {CASES.map((c, i) => (
            <CaseCard key={c.id} c={c} index={i} go={go} />
          ))}
        </div>

        {/* ---------- PK curve — anchored directly under the cards ---------- */}
        <motion.div
          className="w-full"
          style={{ flex: '0 1 auto', minHeight: 0 }}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.3, delay: 2.0 }}
        >
          <PKCurve go={go} />
        </motion.div>

        {/* Bottom spacer — absorbs any slack before the footer so the cards+curve
            cluster sits centered-vertical rather than stuck at the top. */}
        <div style={{ flex: '0 1 var(--space-4)', minHeight: 'var(--space-2)' }} aria-hidden />

        {/* ---------- Author card + meta ---------- */}
        <div
          className="flex flex-col md:flex-row md:items-end md:justify-between"
          style={{ gap: 'var(--space-6)' }}
        >
          {/* Author card — bordered, accent rule, modern editorial */}
          <motion.div
            className="relative"
            style={{
              padding: 'var(--space-6) var(--space-8) var(--space-6) var(--space-8)',
              border: '1px solid var(--cream-hairline)',
              borderLeft: '3px solid var(--amber)',
              borderRadius: 'var(--radius-lg)',
              background:
                'linear-gradient(180deg, color-mix(in srgb, var(--panel) 55%, transparent) 0%, color-mix(in srgb, var(--panel) 20%, transparent) 100%)',
              backdropFilter: 'blur(6px)',
              WebkitBackdropFilter: 'blur(6px)',
              boxShadow: 'var(--shadow-md)',
              maxWidth: '56ch',
            }}
            initial={{ opacity: 0, y: 14 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 4.2, ease: [0.2, 0.7, 0.3, 1] }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-kicker)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                marginBottom: 'var(--space-3)',
              }}
            >
              Presenter
            </div>
            {/* Presenter name = card title role; original 1.85rem cap is
                slightly above token's 1.3rem ceiling — accept the small
                shrink at large viewports for tokenization consistency. */}
            <p
              className="deck-display"
              style={{
                margin: 0,
                fontSize: 'var(--fs-card-title)',
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
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Director, Clinical Pharmacology · Servier Pharmaceuticals
            </p>
          </motion.div>

          {/* Meta chip */}
          <motion.div
            className="text-left md:text-right deck-mono uppercase"
            style={{
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              lineHeight: 1.6,
              minWidth: '18ch',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 0.8 } : { opacity: 0.8 }}
            transition={{ duration: 0.3, delay: 4.5 }}
          >
            <div>SEMINAR · APRIL 2026 / QP2-CMD</div>
            <div>3 CASES · 5 THEMES · 45 MIN</div>
            <div style={{ marginTop: 'var(--space-2)' }}>
              {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
            </div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}

/* ========================================================
   CaseCard — left 2px accent rule, label, title, note.
   Staggered entrance after the curve has drawn past its landmark.
   ======================================================== */
function CaseCard({ c, index, go }) {
  const base = 3.8 + index * 0.55;
  return (
    <motion.div
      className="relative"
      style={{ paddingLeft: 'var(--space-4)' }}
      initial={{ opacity: 0 }}
      animate={go ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.01, delay: base }}
    >
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 2,
          height: '100%',
          backgroundColor: c.color,
          transformOrigin: 'top center',
        }}
        initial={{ scaleY: 0 }}
        animate={go ? { scaleY: 1 } : { scaleY: 1 }}
        transition={{ duration: 0.3, delay: base }}
      />
      <motion.p
        className="deck-mono uppercase"
        style={{
          margin: 0,
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: 600,
          color: c.color,
          marginBottom: 'var(--space-1)',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: base + 0.08 }}
      >
        {c.label}
      </motion.p>
      <motion.h3
        style={{
          margin: 0,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-title)',
          fontWeight: 600,
          lineHeight: 1.2,
          color: 'var(--cream)',
          marginBottom: 'var(--space-1)',
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: base + 0.16 }}
      >
        {c.title}
      </motion.h3>
      <motion.p
        style={{
          margin: 0,
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: base + 0.24 }}
      >
        {c.note}
      </motion.p>
    </motion.div>
  );
}

/* ========================================================
   PKCurve — primary amber curve, faint ±1 SD companions,
   landmark dots with idle-pulse at Cmax / AUC / T½.
   ======================================================== */
function PKCurve({ go }) {
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
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 0.32 } : { pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 1.7, delay: 2.1, ease: 'easeInOut' }}
      />
      <motion.path
        d={PK_LOWER}
        fill="none"
        stroke="var(--cream-faint)"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 0.32 } : { pathLength: 1, opacity: 0.32 }}
        transition={{ duration: 1.7, delay: 2.1, ease: 'easeInOut' }}
      />

      {/* Primary PK curve */}
      <motion.path
        d={PK_PRIMARY}
        fill="none"
        stroke="var(--amber)"
        strokeWidth={2.5}
        strokeLinecap="round"
        strokeOpacity={0.62}
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1.7, delay: 2.1, ease: 'easeInOut' }}
      />

      {/* Baseline */}
      <motion.line
        x1={0} y1={210} x2={900} y2={210}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 1.2, delay: 2.8 }}
      />

      {/* Landmark choreography per case (matches HTML reference):
          1. Dot pops in with overshoot at its (x,y)
          2. Dashed hairline draws down from dot → baseline and STAYS
             (scientific-precision cue anchoring each PK landmark to x-axis)
          3. Axis label fades in at baseline */}
      {CASES.map((c, i) => {
        const base = 3.4 + i * 0.4;
        // Each landmark dot carries a layoutId that pairs with the
        // case-color hairline on its corresponding CaseHeroDivider
        // (slides 5, 15, 23). When the user advances from this title
        // slide directly into a divider, framer-motion morphs the
        // colored dot's bounding box into the divider's hairline —
        // SVG <circle> ↔ HTML <div> is partial (bbox only, not the
        // shape itself) but the visual reads as "the case marker
        // we showed at the start IS the case we're now opening."
        // Token list mirrors CASES order: coral=CS1, cyan=CS2,
        // violet=CS3 (also documented in the file header §10-12).
        const markerToken = ['coral', 'cyan', 'violet'][i];
        return (
          <g key={c.id}>
            {/* Dot — gentle fade-in (no pop, no directional slide) */}
            <motion.circle
              layoutId={`case-marker-${markerToken}`}
              cx={c.dotX} cy={c.dotY} r={7}
              fill={c.color}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{
                duration: 0.9,
                delay: base,
                ease: [0.4, 0, 0.2, 1],
              }}
            />
            {/* Dashed hairline — dot → baseline · persistent after draw */}
            <motion.line
              x1={c.dotX} y1={c.dotY} x2={c.dotX} y2={210}
              stroke="var(--cream-hairline)"
              strokeWidth={1}
              strokeDasharray="3 4"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={go ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 1 }}
              transition={{ duration: 0.5, delay: base + 0.25, ease: 'easeOut' }}
            />
            {/* Baseline label */}
            <motion.text
              x={c.dotX} y={232}
              textAnchor="middle"
              className="deck-mono uppercase"
              style={{
                fontSize: 10,
                letterSpacing: '0.22em',
                fill: 'var(--cream-faint)',
              }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.3, delay: base + 0.5 }}
            >
              {c.labelText}
            </motion.text>
          </g>
        );
      })}
    </svg>
  );
}