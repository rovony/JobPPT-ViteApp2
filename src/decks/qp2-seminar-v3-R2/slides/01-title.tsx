import React, { useRef, useState, useEffect } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { useDeck } from '@/lib/deck-store';

/**
 * 01-title — V3-R2 cover (Kinetic PK Spine).
 *
 * Ported verbatim from `qp2-seminar/slides/01-title.jsx` per explicit
 * authoring decision (Apr 2026). The v3-R2 cover adopts the v1 kinetic
 * composition: amber PK curve with three landmark dots, three case
 * cards anchored to Cmax / AUC / T½, presenter card + framed meta
 * spec (3 cases / 3 regulators / 45 min), soft ambient gradient.
 *
 * Locked talk identity:
 *   Title:    "Quantitative Pharmacology in Action."
 *   Subtitle: "Strategies for Dose Selection and Regulatory Impact
 *              Across Therapeutic Areas"
 *
 * This slide is fully self-contained — it does NOT use TitleLayout
 * because it manages its own chrome (page number, meta line, gradient).
 * Manifest still marks it isTitle: true so the deck's standard footer
 * is suppressed for the cover.
 *
 * Token-only styling — every size, color, and rhythm value pulls from
 * src/index.css. Animation is gated behind useInView(once) +
 * useReducedMotion() — motion-safe and only runs on first entry.
 *
 * After the draw choreography finishes, a slow **idle loop** (PK stroke +
 * landmark breathing) keeps the first slide alive while the room settles —
 * it respects prefers-reduced-motion (no loop).
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
    label: 'CASE 02 · IVOSIDENIB · INDIA AML',
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
    label: 'CASE 03 · AI / ML · CLIN PHARM AGENT',
    title: 'Agentic ML for dose-finding workflows.',
    note: 'Pilot deployment, 2026.',
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

const TITLE_IDLE_MS = 3400;

export default function TitleSlide() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const prefersReducedMotion = useReducedMotion();
  const go = isInView && !prefersReducedMotion;
  const { index, total } = useDeck();

  // After one-shot intro ends, enable slow ambient loop (waiting-room polish).
  const [idleAtRest, setIdleAtRest] = useState(false);
  useEffect(() => {
    if (!isInView || prefersReducedMotion) {
      setIdleAtRest(false);
      return;
    }
    if (!go) {
      setIdleAtRest(true);
      return;
    }
    setIdleAtRest(false);
    const t = setTimeout(() => setIdleAtRest(true), TITLE_IDLE_MS);
    return () => clearTimeout(t);
  }, [isInView, go, prefersReducedMotion]);

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
      {/* Ambient depth — very soft; keeps the cover from reading as flat void */}
      <div
        aria-hidden
        className="title-slide-ambient pointer-events-none absolute inset-0 z-0"
        style={{
          /* All stops use theme tokens — flips with data-theme-mode on .deck-root */
          background: [
            'radial-gradient(ellipse 85% 55% at 50% -8%, color-mix(in srgb, var(--amber) 16%, transparent), transparent 52%)',
            'radial-gradient(ellipse 70% 40% at 100% 100%, color-mix(in srgb, var(--violet) 6%, transparent), transparent 50%)',
            'linear-gradient(180deg, color-mix(in srgb, var(--panel) 20%, transparent) 0%, transparent 38%, transparent 100%)',
          ].join(', '),
        }}
      />
      <div
        className="relative z-[1] w-full mx-auto flex flex-col"
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
            fontSize: 'var(--fs-slide-display)',
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
              animate={go && idleAtRest ? { scaleX: 1, opacity: [0.9, 1, 0.9] } : { scaleX: 1, opacity: 1 }}
              transition={
                go && idleAtRest
                  ? { opacity: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }
                  : { duration: 0.8, delay: 1.55, ease: [0.2, 0.7, 0.3, 1] }
              }
            />
          </span>
        </h1>

        {/* ---------- Subtitle ---------- */}
        <motion.p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'var(--fs-slide-lead)',
            color: 'var(--cream-muted)',
            maxWidth: '60ch',
            fontWeight: 400,
            lineHeight: 1.3,
          }}
          initial={{ opacity: 0, y: 12 }}
          animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 1.0 }}
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
            <CaseCard key={c.id} c={c} index={i} go={go} idleAtRest={idleAtRest} />
          ))}
        </div>

        {/* ---------- PK curve — anchored directly under the cards ---------- */}
        <motion.div
          className="w-full"
          style={{ flex: '0 1 auto', minHeight: 0 }}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 1 } : { opacity: 1 }}
          transition={{ duration: 0.3, delay: 1.3 }}
        >
          <PKCurve go={go} idleAtRest={idleAtRest} />
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
            transition={{ duration: 0.5, delay: 2.4, ease: [0.2, 0.7, 0.3, 1] }}
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

          {/* Meta — framed spec line (replaces ad-hoc top rule) */}
          <motion.div
            className="text-left md:text-right deck-mono uppercase self-stretch md:self-end"
            style={{
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid color-mix(in srgb, var(--cream) 14%, transparent)',
              borderRadius: 'var(--radius-lg)',
              background:
                'linear-gradient(145deg, color-mix(in srgb, var(--panel) 65%, transparent) 0%, color-mix(in srgb, var(--panel) 25%, transparent) 100%)',
              boxShadow: 'var(--shadow-sm)',
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              lineHeight: 1.65,
              minWidth: 'min(100%, 22ch)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 0.9 } : { opacity: 0.9 }}
            transition={{ duration: 0.3, delay: 2.7 }}
          >
            <div>SEMINAR · APRIL 2026</div>
            <div>3 CASES · 3 REGULATORS · 45 MIN</div>
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
function CaseCard({ c, index, go, idleAtRest }) {
  // Cards land while the PK curve is still finishing its draw, so the
  // composition resolves in ~2.5s total instead of dragging past 5s.
  // Title slides should not have a 5-second entrance choreography.
  const base = 1.6 + index * 0.18;
  // Idle state: once entrance is complete, each card's outer border glows
  // softly when its case is in the spotlight cycle (synced with the PK-curve
  // dot cycle — 18s loop, 6s per case, peak ~3s into own slot). Reduced-motion
  // users see baseline (no glow). Glow is on the CARD (not the rail) so it
  // extends outside the card edge — readable against the cream background.
  // Inset top-edge highlight is preserved across all keyframes to keep the
  // card's editorial polish intact during the cycle.
  const cardIdle = go && idleAtRest;
  const baseInset = 'inset 0 1px 0 color-mix(in srgb, var(--cream) 6%, transparent)';
  const cardGlowOff = `${baseInset}, 0 0 0 0 transparent`;
  const cardGlowPeak = `${baseInset}, 0 0 24px 2px color-mix(in srgb, ${c.color} 75%, transparent)`;
  const cardGlowFade = `${baseInset}, 0 0 12px 1px color-mix(in srgb, ${c.color} 35%, transparent)`;
  return (
    <motion.div
      className="relative h-full"
      style={{
        padding: 'var(--space-4) var(--space-4) var(--space-4) var(--space-5)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid color-mix(in srgb, var(--cream) 10%, transparent)',
        background: 'color-mix(in srgb, var(--panel) 38%, transparent)',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, boxShadow: cardGlowOff }}
      animate={
        cardIdle
          ? {
              opacity: 1,
              boxShadow: [
                cardGlowOff,
                cardGlowOff,
                cardGlowPeak,
                cardGlowFade,
                cardGlowOff,
                cardGlowOff,
                cardGlowOff,
              ],
            }
          : go
            ? { opacity: 1, boxShadow: cardGlowOff }
            : { opacity: 1, boxShadow: cardGlowOff }
      }
      transition={
        cardIdle
          ? {
              opacity: { duration: 0 },
              boxShadow: {
                duration: 18,
                times: [0, 1 / 18, 3 / 18, 5 / 18, 6 / 18, 17 / 18, 1],
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 6,
              },
            }
          : { duration: 0.01, delay: base }
      }
    >
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 'var(--space-4)',
          bottom: 'var(--space-4)',
          width: 2,
          borderRadius: '1px',
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
function PKCurve({ go, idleAtRest }) {
  const primaryIdle = go && idleAtRest;
  return (
    <svg
      viewBox="0 0 900 240"
      preserveAspectRatio="xMidYMid meet"
      className="w-full h-full block"
      style={{ maxHeight: 'clamp(180px, 30vh, 360px)' }}
      aria-label="Oral pharmacokinetic concentration-time curve with Cmax, AUC, and T½ landmarks"
    >
      <defs>
        <filter id="title-pk-amber-glow-01" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur in="SourceGraphic" stdDeviation="1.2" result="blur" />
          <feMerge>
            <feMergeNode in="blur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      {/* ±1 SD companions */}
      <motion.path
        d={PK_UPPER}
        fill="none"
        stroke="var(--cream-faint)"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          primaryIdle
            ? { pathLength: 1, opacity: [0.2, 0.38, 0.2] }
            : { pathLength: 1, opacity: 0.32 }
        }
        transition={
          primaryIdle
            ? { opacity: { duration: 3.6, repeat: Infinity, ease: 'easeInOut' } }
            : { duration: 1.0, delay: 1.4, ease: 'easeInOut' }
        }
      />
      <motion.path
        d={PK_LOWER}
        fill="none"
        stroke="var(--cream-faint)"
        strokeWidth={1}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={
          primaryIdle
            ? { pathLength: 1, opacity: [0.2, 0.38, 0.2] }
            : { pathLength: 1, opacity: 0.32 }
        }
        transition={
          primaryIdle
            ? { opacity: { duration: 3.6, repeat: Infinity, ease: 'easeInOut', delay: 0.4 } }
            : { duration: 1.0, delay: 1.4, ease: 'easeInOut' }
        }
      />

      {/* Primary PK curve — draw once, then slow luminance "breath" in idle */}
      <motion.path
        d={PK_PRIMARY}
        fill="none"
        stroke="var(--amber)"
        strokeWidth={2.5}
        strokeLinecap="round"
        filter="url(#title-pk-amber-glow-01)"
        initial={{ pathLength: 0, strokeOpacity: 0.5 }}
        animate={
          primaryIdle
            ? { pathLength: 1, strokeOpacity: [0.52, 0.92, 0.52] }
            : { pathLength: 1, strokeOpacity: 0.72 }
        }
        transition={
          primaryIdle
            ? { strokeOpacity: { duration: 3.4, repeat: Infinity, ease: 'easeInOut' } }
            : { pathLength: { duration: 1.0, delay: 1.4, ease: 'easeInOut' } }
        }
      />

      {/* Baseline */}
      <motion.line
        x1={0} y1={210} x2={900} y2={210}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        initial={{ pathLength: 0 }}
        animate={go ? { pathLength: 1 } : { pathLength: 1 }}
        transition={{ duration: 0.8, delay: 1.6 }}
      />

      {/* Landmark choreography per case (matches HTML reference):
          1. Dot pops in with overshoot at its (x,y)
          2. Dashed hairline draws down from dot → baseline and STAYS
             (scientific-precision cue anchoring each PK landmark to x-axis)
          3. Axis label fades in at baseline */}
      {CASES.map((c, i) => {
        const base = 2.0 + i * 0.18;
        return (
          <g key={c.id}>
            {/* Dot — gentle fade-in (no pop, no directional slide). On idle, the
             * three dots run a soft "spotlight cycle" through coral → cyan → violet
             * on an 18-second loop (6s per case · ~3s peak in own slot · dim during
             * off-slots). Signals the slide is alive during multi-minute opens and
             * reads as the speaker walking the audience through the three cases
             * visually, without competing with the spoken intro. Reduced-motion
             * users see baseline opacity only (gated behind primaryIdle). */}
            <motion.circle
              cx={c.dotX} cy={c.dotY} r={7}
              fill={c.color}
              initial={{ opacity: 0 }}
              animate={
                primaryIdle
                  ? { opacity: [0.55, 0.55, 1.0, 0.75, 0.5, 0.5, 0.55] }
                  : { opacity: 1 }
              }
              transition={
                primaryIdle
                  ? {
                    opacity: {
                      duration: 18,
                      times: [0, 1 / 18, 3 / 18, 5 / 18, 6 / 18, 17 / 18, 1],
                      repeat: Infinity,
                      ease: 'easeInOut',
                      delay: i * 6,
                    },
                  }
                  : go
                    ? { duration: 0.9, delay: base, ease: [0.4, 0, 0.2, 1] }
                    : { duration: 0.01 }
              }
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
                fontSize: 'var(--fs-slide-pageno)',
                letterSpacing: 'var(--ls-mono-wide)',
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
