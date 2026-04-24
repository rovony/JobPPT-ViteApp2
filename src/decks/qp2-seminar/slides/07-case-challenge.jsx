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
        // Each card row caps at 1fr so the timeline + focal stay inside
        // the Viz cell. To keep the body text from VISUALLY overlapping
        // the next card when 1fr happens to be shorter than the card's
        // content (Highlight pill on a wrapped second line), each card
        // panel below sets `overflow: hidden` and the rowGap is bumped
        // from space-2 → space-3 to add a clean breathing band between
        // adjacent card rows.
        //
        // Default rows are minmax(0,1fr) so the slide stays viable at
        // shorter viewports (1366×768). At ≥1500px the .cs1-large-rows
        // CSS rule below adds a row floor so cards can host bigger
        // chart panels — the timeline strip is also capped to free the
        // needed vertical space at that breakpoint.
        gridTemplateRows: 'minmax(0, 1fr) minmax(0, 1fr) minmax(0, 1fr) auto auto',
        columnGap: 'var(--space-4)',
        rowGap: 'var(--space-3)',
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
        /* Chart SVGs inside the panel must fit BOTH dimensions of the
           container (the panel is height-limited by its grid row, but
           the SVGs declare only width="100%" so the browser computes
           intrinsic height from the 2:1 viewBox → SVG overflows
           vertically and gets clipped by the panel's overflow:hidden).
           Forcing width:100% + height:100% with the SVG's own
           preserveAspectRatio="xMidYMid meet" makes them scale-to-fit
           cleanly with no clipping. */
        .cs1-challenge-stack .cs1-card-chart svg {
          width: 100% !important;
          height: 100% !important;
          display: block;
        }
        /* Card-row floor at large viewports — pairs with the timeline
           strip's 1300px maxWidth so cards land at ~136px each, chart
           panels get a 320×~136 frame, SVG content renders ~272×136
           (vs original 220×110, ≈+54% area). At <1500px we leave the
           rows on plain 1fr so the slide stays viable at 1366×768
           where vertical space is too tight for any floor. */
        @media (min-width: 1500px) {
          .cs1-challenge-stack {
            grid-template-rows: minmax(135px, 1fr) minmax(135px, 1fr) minmax(135px, 1fr) auto auto !important;
          }
        }
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
          the spine).

          layoutId="adult-approval-timeline" pairs with the small
          embedded mini-timeline inside slide 06's Card 02 (THE DRUG).
          On forward navigation 6 → 7, framer-motion FLIPs this
          wrapper's bbox from the small card-corner box → the wide
          stripe — same camera-pullback cinematic as the lung 5 → 6
          (LungsShared layoutId="lung-lynch"). The internals fade-cross
          (different chart components, but same conceptual subject:
          adult-approval timeline). */}
      <motion.div
        layoutId="adult-approval-timeline"
        layout
        className="cs1-timeline"
        style={{
          gridColumn: '1 / 3',
          gridRow: 4,
          padding: 'var(--space-1) var(--space-4)',
          borderTop: '1px solid var(--cream-hairline)',
          borderBottom: '1px solid var(--cream-hairline)',
          background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
          // This timeline strip is THE cinematic payoff of the 06 → 07
          // morph (mini-timeline in slide 06 Card 02 → expands to this
          // hero strip on slide 07 — same FLIP pattern as the lung
          // 5 → 6 morph). It earns its dominance: max-width 1300 keeps
          // it as the visually largest element on the slide, ~73% of
          // canvas width, with the amber "19 YEARS OF PEDIATRIC
          // SILENCE" label as the editorial center of gravity.
          //
          // The cap (vs full 1776) trades ~60px of vertical strip
          // height for taller card rows above, so the staircase chart
          // panels can host a 320×~136 frame (chart art ~272×136 —
          // ~+54% area vs the previous 220×110 squeezed render).
          display: 'flex',
          justifyContent: 'center',
        }}
        // initial={false} — same pattern as LungsShared.context. The
        // layoutId match from slide 06's mini-timeline IS the entrance,
        // so we must NOT hide this element behind opacity:0 / y:offset
        // (that would race the morph and the destination would render
        // empty during the FLIP). When landing on slide 07 fresh (no
        // morph available — direct link / reload), the wrapper just
        // appears at full opacity, which is fine.
        initial={false}
        animate={{ opacity: 1 }}
        transition={{
          layout: { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
        }}
      >
        <div style={{ width: '100%', maxWidth: 1300 }}>
          <ApprovalTimeline variant="silence" delay={3.0} />
        </div>
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
          // Clip body content to the card's bounds so wrapped text or
          // future copy edits cannot bleed visually into the adjacent
          // card row underneath.
          overflow: 'hidden',
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
      {/* Chart panel: fixed 320px wide (was 220). The SVG charts have a
          native 2:1 (360×180) viewBox; rendered with `xMidYMid meet`
          inside this container they're now height-limited at the natural
          card row height (~140–150px) so the SVG renders at ~280–300×140
          — vs the previous 220×110 letterboxed render, that's ~+75%
          chart art area. The staircase silhouette is unchanged: widthPct
          (62/78/94%) lives on the wrap, so each card's text panel still
          steps wider down the stack while the chart panel rides the
          right edge. marginLeft:-14px preserves the "overlap" notch
          where the chart attaches to the text panel. */}
      <motion.div
        className="cs1-card-chart"
        style={{
          position: 'relative',
          width: 320,
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
          padding: '6px 8px 4px',
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