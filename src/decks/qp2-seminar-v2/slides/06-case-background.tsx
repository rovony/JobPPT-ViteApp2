// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import LungMoaScene from './cs1-background/LungMoaScene';
// CaseBodyCard / CardHighlight + LungsShared direct import dropped
// 2026-04-25 (lung-moa rewire) — the static disease/drug body cards were
// replaced by LungMoaScene, which renders LungsShared internally and
// flanks it with two animated receptor pucks (pathway / antagonist).
// import CaseBodyCard, { CardHighlight } from '@/components/deck/patterns/CaseBodyCard';
// import LungsShared from './cs1-background/LungsShared';
// AgencyApprovalTimeline import dropped 2026-04-25 (T1) — embedded
// mini-timeline + S07's hero timeline strip both retired together.
// import AgencyApprovalTimeline from './cs1-background/AgencyApprovalTimeline';

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
      eyebrow="CS1 · The intellectual foundation"
      headline={
        <>
          The endothelin pathway drives PAH —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            and runs the same way in children.
          </span>
        </>
      }
      headlineMaxChars={64}
      subhead="ET-1 · ETA receptor · vasoconstriction + remodeling. Pathway conserved adult ↔ pediatric — the basis for exposure-matched extrapolation."
      subheadMaxChars={120}
      footerKicker="Case 01 · The pathway is conserved"
      footerSource="Source · EMA SmPC · Galiè 2013 · ICH E11 extrapolation principles"
    >
      <BackgroundLayout reduce={reduce} ease={ease} />
    </SlideFrame>
  );
}

/* ==============================================================
   2026-04-25 redesign — "lung as instrument" layout.

   The static disease/drug body cards were replaced by LungMoaScene,
   which encloses the lung hero and flanks it with two animated SVG
   receptor pucks. The pucks zoom the receptor-level mechanism to
   ~200 px so the audience can decode it at presentation distance:

     LEFT  · PATHWAY    — ET-1 dots travel in, dock at ETA receptors,
                          vessel wall thickens (vasoconstriction). Loops 6 s.
     RIGHT · ANTAGONIST — Ambrisentan blockers cover ETA receptors,
                          ET-1 dots bounce off, vessel stays at rest
                          thickness (dilation preserved). Loops 6 s.

   Layout (delegated to LungMoaScene):
   ┌──────────┬───────────────────────┬──────────┐
   │ 01·PATH  │                       │ 02·ANTAG │
   │ Endothel.│      LUNG (hero)      │ Ambrisen.│
   │ ┌──────┐ │    layoutId morph     │ ┌──────┐ │
   │ │puck  │ │      from S05         │ │puck  │ │
   │ └──────┘ │                       │ └──────┘ │
   │ caption  │                       │ caption  │
   └──────────┴───────────────────────┴──────────┘
   ───── transition line: "Approved for adults..." ─────

   T1 (2026-04-25): EmbeddedTimeline already retired. Lung morph
   (layoutId="lung-lynch") still owned by LungsShared inside the scene.
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
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-5, 40px)',
        minHeight: 0,
      }}
    >
      <LungMoaScene delay={1.7} reduce={reduce} />
      <TransitionLine reduce={reduce} ease={ease} />
    </div>
  );
}

/* EmbeddedTimeline removed 2026-04-25 (T1).
   Pre-T1 this component was rendered inside Card 02's footer. It
   carried layoutId="adult-approval-timeline" — paired with S07's
   hero timeline strip via framer-motion's FLIP morph (camera-pullback
   from mini → full-width). Both ends were retired together because:
     • S07b precedents slide already covers the prior pediatric
       pathway (Sildenafil 2009, Bosentan 2017).
     • Keeping the destination without the source would orphan the
       morph; keeping the source without the destination would render
       the mini-timeline as visual filler with no payoff.
   The cs1-background/AgencyApprovalTimeline.jsx component file is
   kept in place for potential future re-use. */

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
        Conserved pathway, conserved response —{' '}
        <span style={{ fontStyle: 'italic', color: 'var(--coral)', fontWeight: 500 }}>
          the adult exposure becomes the pediatric target.
        </span>
      </div>
    </motion.div>
  );
}
