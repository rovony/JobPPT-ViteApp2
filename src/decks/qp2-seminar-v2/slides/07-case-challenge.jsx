import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import SurvivalMiniChart from './cs1-challenge/SurvivalMiniChart';
import LabelCoverageChart from './cs1-challenge/LabelCoverageChart';

// Token resolver passed to charts — reads CSS custom properties from
// :root so chart internals can stay token-driven without importing any
// global. Memoized at module scope so every chart shares the same fn
// identity and doesn't retrigger renders.
const tk = (name) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name
    : name;

/**
 * Slide 07 · Case 01 · CHALLENGE — editorial diptych.
 *
 * Redesign (v3 · 2026-04-25):
 *   The previous layout (left coral spine + 2 vertical cards each with
 *   their own chart panel) used only ~70% of the canvas width and let
 *   the right-side dark band sit empty. The two charts also lived
 *   inside the cards they "belonged to," but the survival curve was
 *   really illustrating LETHALITY, not "trial design defeat" — and the
 *   label-coverage gap was about TIMING, not "ethics" — so each card
 *   read as a copy-block with an unrelated illustration.
 *
 *   New structure:
 *
 *     ┌─────────────────────────────┬───────────────────────────┐
 *     │ 01 · RARITY · HETEROGENEITY │ EVIDENCE                  │
 *     │ ── A trial needs population │ ┌───────────────────────┐ │
 *     │    stability, equipoise.    │ │ Survival mini chart   │ │
 *     │    Pediatric PAH gives you  │ │ untreated PAH decay   │ │
 *     │    none.                    │ └───────────────────────┘ │
 *     │                             │ ── 14–20 children / M     │
 *     │ ─────────────────────────── │                           │
 *     │                             │ ┌───────────────────────┐ │
 *     │ 02 · ETHICS                 │ │ Label coverage gap    │ │
 *     │ ── Effective adult therapy  │ │ adult ──── pediatric  │ │
 *     │    already exists.          │ └───────────────────────┘ │
 *     │    A placebo arm in kids is │ ── 19 yrs of silence      │
 *     │    indefensible.            │                           │
 *     └─────────────────────────────┴───────────────────────────┘
 *     ◆ Could an integrated adult + pediatric PopPK model deliver
 *       regulatory-grade evidence for a pediatric dose?
 *
 *   Why this works:
 *   · Argument lives on the LEFT in display-size editorial type — the
 *     two beats are PARALLEL but the structural framing makes them
 *     read as a single compounding argument ("the paradigm cannot run
 *     because A AND because B"). No card chrome, no spine rail.
 *   · Charts are unified into ONE EVIDENCE PANEL on the right, stacked
 *     and sharing a single bordered frame — they read together as
 *     "the patients are dying while the label sits empty," which is
 *     the slide's actual implicit claim.
 *   · Focal question keeps the inline-diamond ribbon convention from
 *     S08 — single editorial unit at the bottom.
 */
export default function Slide07() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Challenge — pediatric PAH demanded an alternative"
      headline={
        <>
          A traditional efficacy trial was{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            practically impossible and ethically indefensible.
          </span>
        </>
      }
      headlineMaxChars={32}
      subhead="Rare · heterogeneous · life-threatening — and proven adult therapies already exist. The standard randomized placebo-controlled paradigm could not run."
      footerKicker="Case 01 · The challenge"
      footerSource="Source · Galiè 2013 · Ivy 2024 · ICH E11(R1) 2017"
    >
      <ChallengeStack />
    </SlideFrame>
  );
}

/* ================================================================
   ChallengeStack — viz-cell content for the editorial diptych.
   Top region = 2-col grid (argument + evidence). Bottom = focal
   question ribbon spanning full width. The two regions share one
   parent grid so the focal ribbon stays anchored without floating
   margins.
   ================================================================ */
function ChallengeStack() {
  return (
    <div
      className="cs1-challenge-stack"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      <style>{`
        .cs1-challenge-stack .cs1-row-chart svg {
          width: 100% !important;
          display: block;
        }
        @media (max-width: 1100px) {
          .cs1-challenge-stack .cs1-main {
            row-gap: var(--space-3) !important;
          }
          .cs1-challenge-stack .cs1-row {
            grid-template-columns: minmax(0, 1.15fr) minmax(0, 0.85fr) !important;
            column-gap: var(--space-3) !important;
          }
        }
        @media (max-width: 900px) {
          .cs1-challenge-stack .cs1-row {
            grid-template-columns: 1fr !important;
            row-gap: var(--space-2) !important;
          }
        }
      `}</style>

      <div
        className="cs1-main"
        style={{
          display: 'flex',
          flexDirection: 'column',
          rowGap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        <ChallengeRow
          number="01"
          eyebrow="Rarity · heterogeneity"
          title="The condition defeats trial design"
          body={
            <>
              A randomized placebo-controlled trial needs population, stability, and ethical
              equipoise. Pediatric PAH gives you none —{' '}
              <Highlight>orphan-rare, mechanistically heterogeneous.</Highlight>{' '}
              <Strong>The paradigm cannot run.</Strong>
            </>
          }
          captionLabel="Survival · untreated PAH"
          captionSignal="Median ≈ 2.8 yr from diagnosis"
          delay={1.6}
        >
          <SurvivalMiniChart tk={tk} delay={1.9} />
        </ChallengeRow>

        <ChallengeRow
          number="02"
          eyebrow="The ethical wall"
          title="Effective adult therapies already exist"
          body={
            <>
              Proven targeted therapies are already on the shelf for adults. A placebo arm in
              children means withholding effective treatment from a fatal disease —{' '}
              <Highlight>ethically indefensible.</Highlight>{' '}
              <Strong>So no sponsor moves first.</Strong>
            </>
          }
          captionLabel="Label coverage · adult ↔ pediatric"
          captionSignal="19 yr · 0 pediatric labels"
          delay={2.0}
        >
          <LabelCoverageChart tk={tk} delay={2.2} />
        </ChallengeRow>
      </div>

      <FocalQuestion />
    </div>
  );
}

function ChallengeRow({
  number,
  eyebrow,
  title,
  body,
  captionLabel,
  captionSignal,
  delay,
  children,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
      className="cs1-row"
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.35fr) minmax(0, 0.75fr)',
        columnGap: 'var(--space-4)',
        minHeight: 0,
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        padding: 'var(--space-3)',
      }}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.45, ease, delay: reduce ? 0 : delay }}
    >
      <div
        style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
          minWidth: 0,
          justifyContent: 'center',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: '0.18em',
            color: 'var(--cream-muted)',
            fontWeight: 500,
          }}
        >
          <span style={{ color: 'var(--case, var(--coral))' }}>{number}</span>
          <span style={{ color: 'var(--cream-dim)', margin: '0 0.55em' }}>·</span>
          {eyebrow}
        </div>

        <div
          className="cs1-arg-title"
          style={{
            fontFamily: 'var(--font-display, var(--font-body))',
            fontSize: 'clamp(1.15rem, 1.8vw, 1.45rem)',
            fontWeight: 550,
            color: 'var(--cream)',
            lineHeight: 1.18,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>

        <div
          className="cs1-arg-body"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.86rem, 1.15vw, 0.98rem)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
            maxWidth: '60ch',
          }}
        >
          {body}
        </div>
      </div>
      <div
        className="cs1-row-chart"
        style={{
          display: 'grid',
          gridTemplateRows: '1fr auto',
          rowGap: 'var(--space-2)',
          minHeight: 0,
          borderLeft: '1px solid var(--cream-hairline)',
          paddingLeft: 'var(--space-3)',
        }}
      >
        <div
          style={{
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
        <EvidenceRowCaption label={captionLabel} signal={captionSignal} />
      </div>
    </motion.div>
  );
}

function EvidenceRowCaption({ label, signal }) {
  return (
    <div
      className="cs1-evidence-row-cap"
      style={{
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-2)',
        paddingTop: 2,
      }}
    >
      <div
        className="cs1-evidence-cap deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.12em',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </div>
      <div
        className="cs1-evidence-cap deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.1em',
          color: 'var(--cream-muted)',
        }}
      >
        {signal}
      </div>
    </div>
  );
}

/* ================================================================
   FocalQuestion — bottom strip of the stack.
   Amber-tinted ribbon with an inline ◆ marker on the leading edge —
   same convention as slide 08's closing ribbon. "Regulatory-grade
   evidence" flips cream → amber.
   ================================================================ */
function FocalQuestion() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
      className="cs1-focal-ribbon"
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) var(--space-5)',
        background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
        borderRadius: 'var(--radius-md)',
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.6 }}
    >
      <div
        aria-hidden
        style={{
          flexShrink: 0,
          transform: 'rotate(45deg)',
          width: 14,
          height: 14,
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--amber)',
          }}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            delay: reduce ? 0 : 2.5,
          }}
        />
      </div>

      <motion.div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-title)',
          fontWeight: 400,
          lineHeight: 1.35,
          color: 'var(--cream)',
          flex: 1,
          letterSpacing: '-0.005em',
        }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.8 }}
      >
        Could an integrated adult + pediatric PopPK model deliver{' '}
        <motion.span
          style={{ fontStyle: 'italic', fontWeight: 500 }}
          initial={reduce ? { color: 'var(--amber)' } : { color: 'var(--cream)' }}
          animate={{ color: 'var(--amber)' }}
          transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 3.4 }}
        >
          regulatory-grade evidence
        </motion.span>{' '}
        for a pediatric dose?
      </motion.div>
    </motion.div>
  );
}

/* ================================================================
   Inline typography utilities
   ================================================================ */
function Highlight({ children }) {
  return (
    <span
      style={{
        background: 'color-mix(in srgb, var(--case, var(--coral)) 22%, transparent)',
        color: 'var(--cream)',
        padding: '2px 8px',
        borderRadius: 4,
        boxDecorationBreak: 'clone',
        WebkitBoxDecorationBreak: 'clone',
        fontWeight: 500,
      }}
    >
      {children}
    </span>
  );
}

function Strong({ children }) {
  return <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>{children}</strong>;
}
