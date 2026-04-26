// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import CaseBodyCard, { CardHighlight } from '@/components/deck/patterns/CaseBodyCard';
import LungsShared from './cs1-background/LungsShared';
import AgencyApprovalTimeline from './cs1-background/AgencyApprovalTimeline';

/**
 * Slide 06b · CS1 · BACKGROUND — The disease and the drug.
 *
 * This slide is deliberately CALM. It orients the panel on:
 *   (1) what Pulmonary Arterial Hypertension is — mechanism + prognosis
 *   (2) what ambrisentan is — target, selectivity, clearance, approvals,
 *       territorial commercial split
 *
 * It earns the audience's right to care when slide 07 introduces the
 * nineteen-year pediatric gap. No crisis, no urgency — grounding.
 *
 * Layout (inside SlideFrame's viz cell):
 *   ┌──────────────────────────┬──────────────────────────┐
 *   │   CARD 01 · THE DISEASE  │   CARD 02 · THE DRUG     │
 *   │   ────────────────────   │   ────────────────────   │
 *   │   body text  │  lungs    │   body text  │  timeline │
 *   └──────────────────────────┴──────────────────────────┘
 *   ──── transition line: "Approved for adults..." ─────────
 *
 * Two columns stacked in parallel (not vertical) — better real-estate
 * use at 16:9 than 2× 280px horizontal cards. Both cards same weight.
 */
export default function Slide06bCaseBackground() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Background — the disease and the drug"
      headline={
        <>
          Pulmonary arterial hypertension,{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            and the drug that treats it.
          </span>
        </>
      }
      headlineMaxChars={32}
      footerKicker="Case 01 · Background"
      footerSource="Source · EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024"
    >
      <BackgroundLayout reduce={reduce} ease={ease} />
    </SlideFrame>
  );
}

/* ==============================================================
   2026-04-24 redesign — three-column "lung-as-hero" layout.

   Per user ask: "make the lung bigger, maybe most of the slide ·
   smaller right and left cards, and the timeline below maybe have
   it as small inside the ambrisentan right card · but then it
   expands cross slides cinematic to next slide similar to how the
   lung came from previous slide."

   Layout:
   ┌──────────┬───────────────────────┬─────────────────┐
   │ CARD 01  │                       │  CARD 02        │
   │ DISEASE  │       LUNG (hero,     │  DRUG           │
   │ (narrow) │     ~30% canvas wide) │  (narrow)       │
   │          │                       │  ┌───────────┐  │
   │          │                       │  │ mini      │  │
   │          │                       │  │ timeline  │  │
   │          │                       │  └───────────┘  │
   └──────────┴───────────────────────┴─────────────────┘
   ───── transition line: "Approved for adults..." ─────

   The mini-timeline inside CARD 02 carries layoutId
   "adult-approval-timeline" — slide 07 wraps its full-width
   timeline strip with the SAME layoutId, so framer-motion's FLIP
   morphs the small embedded box → wide stripe on slide transition.
   Same cinematic mechanism as the lung itself (slides 5 → 6).

   The previous full-width TimelineRow has been deleted: the
   timeline now lives ONLY inside the right card here, and the
   morph hands it off to slide 07.
   ============================================================== */
function BackgroundLayout({ reduce, ease }) {
  return (
    <div
      className="cs1-bg-layout"
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        // Two rows now: cards-with-lung row (1fr) + transition line (auto).
        // The middle timeline row is gone — timeline lives inside Card 02.
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-5, 40px)',
        minHeight: 0,
      }}
    >
      {/* Responsive overrides.
          ≤1100px : tighten card column widths so the lung still has air.
          ≤900px  : drop the lung column; cards stretch to fill 50/50.
          ≤640px  : stack cards vertically; hide lung. */}
      <style>{`
        @media (max-width: 1100px) {
          .cs1-bg-layout .cs1-bg-cards {
            grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.1fr) minmax(0, 0.85fr) !important;
            column-gap: var(--space-4) !important;
          }
        }
        @media (max-width: 900px) {
          .cs1-bg-layout .cs1-bg-cards {
            grid-template-columns: 1fr 1fr !important;
            column-gap: var(--space-4) !important;
          }
          .cs1-bg-layout .cs1-bg-lung-cell { display: none !important; }
        }
        @media (max-width: 640px) {
          .cs1-bg-layout .cs1-bg-cards {
            grid-template-columns: 1fr !important;
            row-gap: var(--space-3) !important;
            align-items: start !important;
            height: auto !important;
          }
          .cs1-bg-layout .cs1-bg-cards article {
            height: auto !important;
            align-self: start;
          }
        }
      `}</style>

      {/* ─── ROW 1 · Three-column cards-with-lung row ───
          The lung sits in the CENTER grid cell (not absolute) so the
          row's intrinsic height + grid alignment do all the centering
          work — no overflow:hidden clip needed. The two card columns
          are narrow (0.7fr each) vs the lung column (1.4fr) so the
          lung visually dominates. */}
      <div
        className="cs1-bg-cards"
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.7fr) minmax(0, 1.4fr) minmax(0, 0.7fr)',
          columnGap: 'clamp(24px, 2.5vw, 56px)',
          alignItems: 'stretch',
          justifyContent: 'center',
          minHeight: 0,
          height: '100%',
        }}
      >
        {/* CARD 01 · THE DISEASE — narrow text panel */}
        <CaseBodyCard
          number="01"
          eyebrow="THE DISEASE"
          title="Pulmonary arterial hypertension"
          delay={1.7}
          body={
            <>
              <p style={{ margin: 0 }}>
                WHO Group 1 pulmonary hypertension —{' '}
                <CardHighlight>endothelin-1-mediated vasoconstriction</CardHighlight>{' '}
                plus progressive vascular remodeling. Fatal if untreated.
              </p>
              <p style={{ margin: 'var(--space-1) 0 0 0' }}>
                Adult untreated survival ~2.8 years. Pediatric prevalence{' '}
                <CardHighlight>14–20 per million children</CardHighlight> in Europe.
              </p>
            </>
          }
        />

        {/* CENTER · LUNG HERO
            Lung sits directly in the grid center column (not absolute
            overlay). The flex centering inside the cell handles vertical
            placement; the lung's own clamp() width controls horizontal
            scale. layoutId="lung-lynch" still pairs with slide 05's hero
            variant for the camera-pullback morph. */}
        <div
          className="cs1-bg-lung-cell"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
            minHeight: 0,
            pointerEvents: 'none',
          }}
        >
          <LungsShared layoutId="lung-lynch" variant="context" />
        </div>

        {/* CARD 02 · THE DRUG — narrow text panel + embedded mini-timeline */}
        <CaseBodyCard
          number="02"
          eyebrow="THE DRUG"
          title="Ambrisentan"
          delay={1.95}
          body={
            <>
              <p style={{ margin: 0 }}>
                Selective endothelin type-A (ET<sub>A</sub>) receptor antagonist —{' '}
                <CardHighlight>~4,000× selectivity</CardHighlight> over ET<sub>B</sub>.
              </p>
              <p style={{ margin: 'var(--space-1) 0 0 0' }}>
                Clearance: hepatic glucuronidation via{' '}
                <CardHighlight>UGT1A9 / UGT2B7</CardHighlight>, mature by age 2–3.
                Adult dosing: <CardHighlight>5 mg / 10 mg once daily</CardHighlight>.
              </p>
            </>
          }
          footer={<EmbeddedTimeline reduce={reduce} ease={ease} />}
        />
      </div>

      {/* ─── ROW 2 · Transition line ─── */}
      <TransitionLine reduce={reduce} ease={ease} />
    </div>
  );
}

/* ==============================================================
   EmbeddedTimeline — the mini approval-timeline pinned inside
   Card 02's footer. Carries layoutId="adult-approval-timeline"
   so framer-motion morphs its bbox into slide 07's full-width
   timeline strip on slide-forward navigation (same FLIP mechanism
   as the lung 5 → 6 morph).

   Important: the wrapper is a `motion.div` with `layout` enabled.
   Internals (the SVG) re-render at the new size at the END of the
   morph — framer animates the OUTER bbox between source and
   destination, content fades-cross. This is exactly what the lung
   does; we don't need both sides to render the same component.
   ============================================================== */
function EmbeddedTimeline({ reduce, ease }) {
  return (
    <motion.div
      layoutId="adult-approval-timeline"
      layout
      // Entrance fade for initial mount; the layoutId match takes over
      // on cross-slide transition (1.4s camera pullback to slide 07's
      // wide timeline strip).
      transition={{
        opacity: { duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.2 },
        y:       { duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.2 },
        layout:  { duration: 1.4, ease: [0.4, 0, 0.2, 1] },
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      style={{
        marginTop: 'var(--space-3)',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 4,
        minHeight: 0,
      }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-card-label)',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--cream-faint)',
        }}
      >
        Adult approvals · 2007 → 2010
      </span>
      <div style={{ width: '100%', minHeight: 0 }}>
        <AgencyApprovalTimeline delay={2.5} compact />
      </div>
    </motion.div>
  );
}

/* ==============================================================
   PathwayChips — DEPRECATED. Removed from the slide because it
   crowded the disease card on standard 1366×768 viewports and the
   "endothelin highlighted" message is already carried by the body
   text's "endothelin-1-mediated vasoconstriction" highlight.
   Kept here as reference until the next major slide redesign.
   ============================================================== */
// eslint-disable-next-line no-unused-vars
function PathwayChips_DEPRECATED() {
  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-card-label)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--cream-faint)',
    display: 'block',
    width: '100%',
    marginBottom: 2,
  };
  const chipBase = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-card-meta)',
    letterSpacing: '0.18em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: 12,
    border: '1px solid var(--cream-hairline)',
    color: 'var(--cream-muted)',
    whiteSpace: 'nowrap',
  };
  const chipActive = {
    ...chipBase,
    background: 'var(--coral-wash, rgba(251,146,60,0.14))',
    borderColor: 'transparent',
    color: 'var(--coral-highlight)',
  };
  const sep = { color: 'var(--cream-dim)', margin: '0 4px' };
  return (
    <div
      style={{
        paddingTop: 4,
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <span style={labelStyle}>Three targetable pathways</span>
      <span style={chipActive}>Endothelin</span>
      <span style={sep}>·</span>
      <span style={chipBase}>NO &ndash; cGMP</span>
      <span style={sep}>·</span>
      <span style={chipBase}>Prostacyclin</span>
    </div>
  );
}

/* CommercialSplit was removed — territorial licensing details
   (brand-by-region marketing rights) aren't material to the
   pharmacology argument and dragged unrelated company names
   onto the slide. */

/* ==============================================================
   TransitionLine — the calm handoff into slide 07.
   "Approved for adults across four reference agencies.
    Pediatric dosing — the unfinished question."
   ============================================================== */
function TransitionLine({ reduce, ease }) {
  return (
    <motion.div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-4)',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 3.3 }}
    >
      <span
        aria-hidden
        style={{
          width: 48,
          height: 2,
          background: 'var(--coral)',
          flexShrink: 0,
        }}
      />
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          lineHeight: 1.4,
          color: 'var(--cream)',
          fontWeight: 400,
        }}
      >
        Approved for adults across four reference agencies.{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--coral)', fontWeight: 500 }}>
          Pediatric dosing — the unfinished question.
        </span>
      </div>
    </motion.div>
  );
}
