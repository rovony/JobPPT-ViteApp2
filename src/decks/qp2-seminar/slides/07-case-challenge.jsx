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
      footerSource="Source · AMB112529 · NCT01332331 · ambrisentan pediatric PAH"
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
  // Single unified 2-col × 5-row grid. Previously the spine and the
  // card stack lived in two separate grids so their auto rows had
  // different heights and the 1fr card rows couldn't share y-coords
  // with the spine's rows. Now everything lives on ONE grid:
  //   col 1 = spine (56px), col 2 = content (1fr)
  //   rows 1-3 = cards (1fr each, matched across columns)
  //   row 4   = timeline strip (spans BOTH columns — full width)
  //   row 5   = focal question + diamond
  // Dots placed via gridColumn:1; gridRow:N align exactly with card
  // midpoints because both share the same row height. Timeline gets
  // gridColumn:'1 / 3' so it extends left under the spine column too.
  return (
    <div
      className="cs1-challenge-stack"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: '56px 1fr',
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto auto',
        columnGap: 'var(--space-4)',
        rowGap: 'var(--space-2)',
        minHeight: 0,
        position: 'relative',
      }}
    >
      {/* Responsive overrides — scoped to this slide's stack.
          • ≤1024px: tighten card padding + typography further
          • ≤900px : stack text & chart vertically inside each card
                     (chart drops to short strip below text); shrink spine
          • ≤640px : drop chart entirely, text goes full-width; hide spine
                     column so cards use the full viewport width
          See ~/.claude/rules/frontend.md "Chart, SVG & Absolute-Layout
          Discipline" — cards always have min-content floor so text is
          never clipped. */}
      <style>{`
        @media (max-width: 1024px) {
          .cs1-challenge-stack .cs1-card { padding: var(--space-2) var(--space-3); padding-left: calc(var(--space-3) + 6px); column-gap: var(--space-3); }
          .cs1-challenge-stack .cs1-card-title { font-size: clamp(0.9rem, 1.6vw, 1.15rem) !important; }
          .cs1-challenge-stack .cs1-card-body  { font-size: clamp(0.68rem, 1.15vw, 0.85rem) !important; line-height: 1.4 !important; }
        }
        @media (max-width: 900px) {
          .cs1-challenge-stack { grid-template-columns: 40px 1fr !important; row-gap: var(--space-2) !important; }
          .cs1-challenge-stack .cs1-card { grid-template-columns: 1fr !important; }
          /* Charts lose their legibility below ~180px width — the SVG
             viewBox label text overlaps chart geometry. Hide them on
             tablet/mobile; text + timeline carries the message. */
          .cs1-challenge-stack .cs1-card-chart { display: none !important; }
        }
        @media (max-width: 640px) {
          .cs1-challenge-stack { grid-template-columns: 1fr !important; }
          .cs1-challenge-stack .cs1-spine,
          .cs1-challenge-stack .cs1-dot,
          .cs1-challenge-stack .cs1-diamond { display: none !important; }
          .cs1-challenge-stack .cs1-card { grid-column: 1 !important; padding-left: var(--space-3) !important; }
          .cs1-challenge-stack .cs1-focal { grid-column: 1 !important; }
          .cs1-challenge-stack .cs1-timeline { grid-column: 1 !important; }
        }
      `}</style>
      {/* ─── Spine column 1 — line + dots + diamond ─── */}
      <SpineLine />
      <SpineDot number="01" row={1} delay={1.8} />
      <SpineDot number="02" row={2} delay={2.05} />
      <SpineDot number="03" row={3} delay={2.3} />
      <SpineDiamond row={5} delay={3.0} />

      {/* ─── Content column 2 — three cards ─── */}
      <ChallengeCard
        row={1}
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
        widthPct={62}
      />

      <ChallengeCard
        row={2}
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
        widthPct={78}
      />

      <ChallengeCard
        row={3}
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
        widthPct={94}
      />

      {/* Approval-timeline strip — spans BOTH columns (full width under
          the spine), shared layoutId with slide 13. */}
      <motion.div
        className="cs1-timeline"
        style={{
          gridColumn: '1 / 3',
          gridRow: 4,
          padding: 'var(--space-2) var(--space-4)',
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

      {/* Focal question — col 2 of row 5 (diamond sits in col 1) */}
      <div className="cs1-focal" style={{ gridColumn: 2, gridRow: 5 }}>
        <FocalQuestion />
      </div>
    </div>
  );
}

/* ================================================================
   Spine pieces — each is a grid child of the unified ChallengeStack
   grid, placed into col 1 with gridRow targeting. Because all pieces
   share rows with the cards in col 2, the dots automatically sit at
   the vertical center of their partner card regardless of row height
   (which shifts as cards render or the timeline strip grows/shrinks).
   ================================================================ */
function SpineLine() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  // Spans rows 1 → 3 (just the three card rows). Stops at the bottom
  // of row 3 — a bit past dot 03 — rather than continuing through the
  // timeline row down to the diamond. Keeps the spine visually
  // associated with the three numbered cards only; timeline and focal
  // read as separate beats.
  return (
    <motion.div
      aria-hidden
      className="cs1-spine"
      style={{
        gridColumn: 1,
        gridRow: '1 / 4',
        justifySelf: 'center',
        alignSelf: 'stretch',
        width: 1.5,
        background: 'var(--case, var(--coral))',
        opacity: 0.55,
        transformOrigin: 'top center',
        marginTop: 11, // start at top of dot 01 (22px dot / 2)
      }}
      initial={reduce ? { scaleY: 1 } : { scaleY: 0 }}
      animate={{ scaleY: 1 }}
      transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : 1.6 }}
    />
  );
}

function SpineDot({ number, row, delay }) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      aria-hidden
      className="cs1-dot"
      style={{
        gridColumn: 1,
        gridRow: row,
        alignSelf: 'center',
        justifySelf: 'center',
        width: 22,
        height: 22,
        borderRadius: '50%',
        background: 'var(--bg)',
        border: '1.5px solid var(--case, var(--coral))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-card-meta)',
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
        delay: reduce ? 0 : delay,
      }}
    >
      {number}
    </motion.div>
  );
}

function SpineDiamond({ row, delay }) {
  const reduce = useReducedMotion();
  // Framer Motion animates `scale` via transform, which would clobber
  // a rotate(45deg) on the same element. Rotated wrapper stays static;
  // only the inner child animates.
  return (
    <div
      aria-hidden
      className="cs1-diamond"
      style={{
        gridColumn: 1,
        gridRow: row,
        alignSelf: 'center',
        justifySelf: 'center',
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
          /* boxShadow removed (Brief §10 — no decorative glows). */
        }}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{
          duration: reduce ? 0 : 0.4,
          ease: [0.34, 1.56, 0.64, 1],
          delay: reduce ? 0 : delay,
        }}
      />
    </div>
  );
}

/* ================================================================
   ChallengeCard — one row in the stack.
   Two-col grid inside: text (1.1fr) · chart (1fr). Fills its row
   height so the chart gets real vertical room.
   ================================================================ */
function ChallengeCard({ row, number, eyebrow, title, body, caption, chart, cardDelay = 1.8, widthPct = 100 }) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  // Card layout: rectangular text panel + square chart panel attached
  // to its right edge, protruding by 14px (negative margin). This gives
  // each card a "staircase" silhouette where the square reads as a
  // distinct anchor. `widthPct` makes each of the 3 cards a different
  // width (62% / 78% / 94%) — progressive reveal down the stack.
  return (
    <motion.div
      className="cs1-card-wrap"
      style={{
        gridColumn: 2,
        gridRow: row,
        width: `${widthPct}%`,
        minHeight: 0,
        position: 'relative',
        display: 'grid',
        gridTemplateColumns: '1fr auto',
        columnGap: 'var(--space-3)',
        alignItems: 'stretch',
      }}
      initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : cardDelay }}
    >
      {/* ─── RECTANGULAR TEXT PANEL ─── */}
      <div
        className="cs1-card"
        style={{
          position: 'relative',
          padding: 'var(--space-3) var(--space-4)',
          paddingLeft: 'calc(var(--space-4) + 6px)',
          background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
          borderRadius: 'var(--radius-md)',
          minHeight: 0,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
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
          className="cs1-card-title"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-title)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.15,
            letterSpacing: '-0.01em',
          }}
        >
          {title}
        </div>

        <div
          className="cs1-card-body"
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
          }}
        >
          {body}
        </div>
      </div>
      </div>
      {/* END rectangular text panel */}

      {/* ─── SQUARE CHART PANEL ───
          aspect-ratio 1/1 + height 100% = card-height square.
          marginLeft negative so square's left edge overlaps the text
          rectangle's right edge by 14px (the "overlap" the user asked
          for). Its own darker panel fill + rounded corners visually
          anchors it as a distinct element attached to the rectangle.
          Caption sits inside the square at the bottom, out of the
          chart's SVG so it never gets clipped by the chart's own
          label margins. */}
      {/* Chart panel: fixed 220×180 frame (instead of aspectRatio-linked
          to card height). The SVG charts have a native 2:1 (360×180)
          viewBox; a portrait aspect was starving them of horizontal
          space and letterboxing axes to ~70px tall, rendering labels
          unreadable. Fixed 220px wide + ~180px min-height lets each
          chart render its full width with labels at legible size.
          Chart extends above/below card via `top:-6px; bottom:-6px`
          for ~12px of extra vertical room without breaking the card
          row layout. */}
      <motion.div
        className="cs1-card-chart"
        style={{
          position: 'relative',
          width: 220,
          alignSelf: 'stretch',
          marginLeft: '-14px',
          // Removed -6/-6 vertical margins — when combined with the
          // uniform card widths they caused chart panels to clip into
          // the row-gap above/below, overlapping neighbour cards'
          // content visually. Chart now stays strictly within its
          // card row's vertical bounds.
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          background: 'color-mix(in srgb, var(--panel) 88%, transparent)',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2)',
          overflow: 'hidden',
          /* chart-panel boxShadow removed (Brief §10 — chartjunk). The
             1px hairline border carries the panel boundary cleanly. */
        }}
        initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : cardDelay + 0.15 }}
      >
        <div
          style={{
            flex: 1,
            minHeight: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
          }}
        >
          {chart}
        </div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.12em',
            color: 'var(--cream-faint)',
            textAlign: 'center',
            marginTop: 2,
          }}
        >
          {caption}
        </div>
      </motion.div>
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
          fontSize: 'var(--fs-card-title)',
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