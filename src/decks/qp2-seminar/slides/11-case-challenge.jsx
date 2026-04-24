import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import SurvivalMiniChart from './cs1-challenge/SurvivalMiniChart';
import LabelCoverageChart from './cs1-challenge/LabelCoverageChart';
import SparsePKChart from './cs1-challenge/SparsePKChart';
import ApprovalTimeline from '@/components/deck/patterns/ApprovalTimeline';

// Token resolver passed to charts — reads a CSS custom property from
// :root so chart internals can stay token-driven without importing any
// global. Memoized at module scope so every card shares the same fn
// identity and doesn't retrigger chart re-renders.
const tk = (name) =>
  typeof window !== 'undefined'
    ? getComputedStyle(document.documentElement).getPropertyValue(name).trim() || name
    : name;

/**
 * Slide 06 · Case 01 · CHALLENGE — spine + stacked cards.
 *
 * Redesign (v2):
 *   · Three full-width cards stacked vertically (no Z-pattern).
 *   · A single coral SPINE runs down the left edge, connecting the
 *     three numbered nodes → the focal question at the bottom.
 *     One clear line of flow · no more three-Bézier "wires crossing"
 *     noise.
 *   · Cards are ~2× larger → charts breathe, text is readable.
 *   · Focal question still has amber emphasis on "regulatory-grade
 *     evidence."
 *
 * Layout (CSS grid inside the viz cell — no absolute positioning
 * except the spine overlay):
 *   ┌────────────────────────────────────────────────┐
 *   │ spine │ ┌────────────────────────────────────┐ │
 *   │   ●   │ │ 01 · THE DISEASE                   │ │
 *   │   │   │ │ Title + body                chart  │ │
 *   │   │   │ └────────────────────────────────────┘ │
 *   │   ●   │ ┌────────────────────────────────────┐ │
 *   │   │   │ │ 02 · THE GAP                       │ │
 *   │   │   │ │ Title + body                chart  │ │
 *   │   │   │ └────────────────────────────────────┘ │
 *   │   ●   │ ┌────────────────────────────────────┐ │
 *   │   │   │ │ 03 · THE CONSTRAINT                │ │
 *   │   │   │ │ Title + body                chart  │ │
 *   │   │   │ └────────────────────────────────────┘ │
 *   │   ◆   │ ┌────────────────────────────────────┐ │
 *   │       │ │ Focal question (amber glow)        │ │
 *   │       │ └────────────────────────────────────┘ │
 *   └────────────────────────────────────────────────┘
 *
 * Grid: `grid-template-columns: 56px 1fr` · `grid-template-rows: 1fr 1fr 1fr auto`
 * Cards get equal flex. Spine is absolute-positioned inside col-1.
 */
export default function Slide11() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Challenge — pediatric PAH demanded a dose"
      headline={
        <>
          Pediatric PAH demanded a dose —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            with no viable trial path.
          </span>
        </>
      }
      headlineMaxChars={28}
      footerKicker="Case 01 · The challenge"
      footerTagline="Source · AMB112529 · NCT01332331 · ambrisentan pediatric PAH"
    >
      <ChallengeStack />
    </SlideFrame>
  );
}

/* ================================================================
   ChallengeStack — the viz-cell content.
   Two-column grid: narrow spine column (56px) + content column (1fr).
   Content column is itself a vertical flex stack: 3 cards + focal.
   ================================================================ */
function ChallengeStack() {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '56px 1fr',
        columnGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      {/* ─── COL 1 · spine ─── */}
      <SpineRail />

      {/* ─── COL 2 · stack of 3 cards + approval-timeline footer + focal ───
          The ApprovalTimeline footer-strip shows the 19-year pediatric
          silence. Shared layoutId with slide 13 (impact) — when the
          user navigates 11 → ... → 13, the silence visually 'closes up'
          as the dashed pediatric section fills in. User confirmed
          hybrid C approach (2026-04-23). */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto auto',
          rowGap: 'var(--space-3)',
          minHeight: 0,
        }}
      >
        <ChallengeCard
          number="01"
          eyebrow="The disease"
          title="Pulmonary arterial hypertension"
          body={
            <>
              Progressive · fatal if untreated · right-ventricular failure. Pediatric
              prevalence 2–16 per million —{' '}
              <Highlight>median untreated survival ~2.8 years</Highlight>.
            </>
          }
          caption="Survival · untreated PAH"
          chart={<SurvivalMiniChart tk={tk} delay={2.0} />}
          cardDelay={1.8}
        />

        <ChallengeCard
          number="02"
          eyebrow="The gap"
          title="Ambrisentan — adults only"
          body={
            <>
              Selective endothelin type-A antagonist · adult approval at 5 / 10 mg QD.
              Label states{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                safety and efficacy not established in pediatrics
              </em>{' '}
              — <Highlight>a pediatric dose was needed but never translated</Highlight>.
            </>
          }
          caption="Label coverage · 2007 → 2026"
          chart={<LabelCoverageChart tk={tk} delay={2.25} />}
          cardDelay={2.05}
        />

        <ChallengeCard
          number="03"
          eyebrow="The constraint"
          title="Study AMB112529 — sparse pediatric PK"
          body={
            <>
              The <Strong>only</Strong> pediatric PK dataset · N = 39 (of 41 randomized)
              · ages 8 → &lt; 18 yr · <Strong>~5 samples per patient</Strong> across{' '}
              <Strong>24 weeks</Strong>.{' '}
              <Highlight>Sparse pediatric PK had to do regulatory work alone</Highlight>.
            </>
          }
          caption="Sampling density · adult vs pediatric"
          chart={<SparsePKChart tk={tk} delay={2.5} />}
          cardDelay={2.3}
        />

        {/* Approval-timeline footer-strip — pediatric silence (2007→2021).
            Shared layoutId morphs into slide 13's closed-up state. */}
        <motion.div
          style={{
            padding: 'var(--space-3) var(--space-4)',
            borderTop: '1px solid var(--cream-hairline)',
            borderBottom: '1px solid var(--cream-hairline)',
            background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 2.8 }}
        >
          <ApprovalTimeline variant="silence" delay={3.0} />
        </motion.div>

        <FocalQuestion />
      </div>
    </div>
  );
}

/* ================================================================
   SpineRail — mirrors the card-stack grid so dots track card centers
   automatically. Previously used fixed percentages (13/41/69) that
   drifted when the timeline-strip row was added to the parent grid.
   Now the rail is itself a CSS grid with the SAME row template as
   the card stack:
     minmax(0, 1fr)   row 1 · card 01
     minmax(0, 1fr)   row 2 · card 02
     minmax(0, 1fr)   row 3 · card 03
     auto             row 4 · ApprovalTimeline strip
     auto             row 5 · FocalQuestion

   Dots placed into rows 1-3 with alignSelf:center → they sit exactly
   at each card's vertical midpoint. Diamond placed into row 5. Spine
   line is an absolute-positioned overlay spanning the dot zone.
   ================================================================ */
function SpineRail() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto auto',
        rowGap: 'var(--space-3)',
        justifyItems: 'center',
      }}
    >
      {/* Vertical spine line — spans grid rows 1 → 5 so it starts
          inside the first card row and reaches the focal row. The
          scaleY entrance grows it from the first dot downward. */}
      <motion.div
        aria-hidden
        style={{
          gridRow: '1 / 6',
          gridColumn: 1,
          width: 1.5,
          background: 'var(--case, var(--coral))',
          opacity: 0.55,
          transformOrigin: 'top center',
          marginTop: 11,   // stop at top of dot 01 (22px dot / 2)
          marginBottom: 8, // stop at top of diamond
          height: 'calc(100% - 19px)',
        }}
        initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : 1.6 }}
      />

      {/* Three numbered dots — one per card row, centered vertically
          so they track the card number/title regardless of how tall
          the auto rows become. */}
      {['01', '02', '03'].map((n, i) => (
        <motion.div
          key={n}
          aria-hidden
          style={{
            gridRow: i + 1,
            gridColumn: 1,
            alignSelf: 'center',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: 'var(--bg)',
            border: '1.5px solid var(--case, var(--coral))',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.55rem',
            letterSpacing: '0.08em',
            color: 'var(--case, var(--coral))',
            fontWeight: 600,
            zIndex: 1,
          }}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 0.3,
            ease: [0.34, 1.56, 0.64, 1],
            delay: reduce ? 0 : 1.8 + i * 0.25,
          }}
        >
          {n}
        </motion.div>
      ))}

      {/* Focal diamond — row 5, centered. Framer Motion animates
          `scale` via transform which would clobber a rotate(45deg),
          so the rotated wrapper stays non-motion and only the inner
          child animates. */}
      <div
        aria-hidden
        style={{
          gridRow: 5,
          gridColumn: 1,
          alignSelf: 'center',
          transform: 'rotate(45deg)',
          width: 14,
          height: 14,
          zIndex: 1,
        }}
      >
        <motion.div
          style={{
            width: '100%',
            height: '100%',
            background: 'var(--amber)',
            boxShadow: '0 0 12px color-mix(in srgb, var(--amber) 60%, transparent)',
          }}
          initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: reduce ? 0 : 0.4,
            ease: [0.34, 1.56, 0.64, 1],
            delay: reduce ? 0 : 3.0,
          }}
        />
      </div>
    </div>
  );
}

/* ================================================================
   ChallengeCard — one row in the stack.
   Two-col grid inside: text (1.1fr) · chart (1fr). Fills its row
   height so the chart gets real vertical room.
   ================================================================ */
function ChallengeCard({ number, eyebrow, title, body, caption, chart, cardDelay = 1.8 }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1.15fr 1fr',
        columnGap: 'var(--space-5)',
        padding: 'var(--space-4) var(--space-5)',
        paddingLeft: 'calc(var(--space-5) + 6px)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-md)',
        minHeight: 0,
        overflow: 'hidden',
      }}
      initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : cardDelay }}
    >
      {/* Coral left accent */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          bottom: 0,
          width: 3,
          background: 'var(--case, var(--coral))',
          transformOrigin: 'top center',
        }}
        initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: reduce ? 0 : 0.3, ease, delay: reduce ? 0 : cardDelay }}
      />

      {/* ─── LEFT · text ─── */}
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
            fontSize: '0.66rem',
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
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.25vw, 1.4rem)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>

        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(0.78rem, 0.92vw, 0.98rem)',
            lineHeight: 1.5,
            color: 'var(--cream-muted)',
          }}
        >
          {body}
        </div>
      </div>

      {/* ─── RIGHT · chart ─── */}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {chart}
        </div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.58rem',
            letterSpacing: '0.14em',
            color: 'var(--cream-faint)',
            textAlign: 'right',
            marginTop: 4,
          }}
        >
          {caption}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   FocalQuestion — bottom strip of the stack.
   Same two-col grid feel as cards (for visual rhyme) but with amber
   glow + diamond on the spine side. "Regulatory-grade evidence"
   flips cream → amber.
   ================================================================ */
function FocalQuestion() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        padding: 'var(--space-3) var(--space-5)',
        background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
        borderRadius: 'var(--radius-md)',
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 3.1 }}
    >
      <motion.div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(1.1rem, 1.4vw, 1.65rem)',
          fontWeight: 400,
          lineHeight: 1.35,
          color: 'var(--cream)',
          flex: 1,
          letterSpacing: '-0.005em',
        }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 3.3 }}
      >
        Could an integrated adult + pediatric PopPK model deliver{' '}
        <motion.span
          style={{ fontStyle: 'italic', fontWeight: 500 }}
          initial={reduce ? { color: 'var(--amber)' } : { color: 'var(--cream)' }}
          animate={{ color: 'var(--amber)' }}
          transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : 3.9 }}
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