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
      footerTagline="Source · EMA SmPC · FDA Letairis label · Galiè 2013 · Ivy 2024"
    >
      <BackgroundLayout reduce={reduce} ease={ease} />
    </SlideFrame>
  );
}

/* ==============================================================
   Two cards side-by-side + transition line at the bottom.
   ============================================================== */
function BackgroundLayout({ reduce, ease }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'grid',
        // Grid rows (per user ask 2026-04-23):
        //   row 1 — cards row with lung overlay between them
        //   row 2 — full-width timeline chart
        //   row 3 — auto transition line
        //
        // Updated 2026-04-23 pm: 1.6fr/1fr leaves visible breather
        // between cards and timeline; the extra row-gap adds the
        // explicit whitespace the user asked for.
        gridTemplateRows: '1.75fr 1fr auto',
        // Large row-gap gives explicit breathing between the cards
        // row and the timeline row (user ask: 'space between lung
        // and bottom card'). 1.75/1 ratio keeps cards shorter than
        // default while still fitting both body paragraphs + footer.
        rowGap: 'var(--space-7, 56px)',
        minHeight: 0,
      }}
    >
      {/* ─── ROW 1 · Cards row + lung overlay between them ───
          Cards use the nested grid for predictable positioning. The lung
          is an absolute overlay (position decoupled from grid resolution
          — see tech-debt note about flicker). */}
      <div style={{ position: 'relative', minHeight: 0 }}>
        <div
          style={{
            display: 'grid',
            // Narrower cards (0.85fr each) + wider gap (32vw) — user
            // ask: 'reduce width and increase lung size'. The wider
            // gap both shrinks the cards AND gives the lung more room.
            gridTemplateColumns: 'minmax(0, 0.8fr) minmax(0, 0.8fr)',
            // Wider gap (36vw) than lung width (30vw) so each card has
            // ~3vw of clear air between its edge and the lung — user
            // ask: 'increase space between 2 cards and lung'.
            columnGap: 'clamp(340px, 36vw, 640px)',
            alignItems: 'stretch',
            justifyContent: 'center',
            minHeight: 0,
            height: '100%',
            position: 'relative',
            zIndex: 2,
          }}
        >
          {/* CARD 01 · THE DISEASE — footer prop pins pathway chips to bottom */}
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
                  plus progressive vascular remodeling. Fatal if untreated; right-ventricular failure.
                </p>
                <p style={{ margin: 'var(--space-2) 0 0 0' }}>
                  Adult untreated survival ~2.8 years. Pediatric prevalence{' '}
                  <CardHighlight>14–20 per million children</CardHighlight> in Europe.
                </p>
              </>
            }
            footer={<PathwayChips />}
          />

          {/* CARD 02 · THE DRUG — footer prop pins commercial split to bottom */}
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
                <p style={{ margin: 'var(--space-2) 0 0 0' }}>
                  Clearance: hepatic glucuronidation via{' '}
                  <CardHighlight>UGT1A9 / UGT2B7</CardHighlight>, mature by age 2–3.
                  Adult dosing: <CardHighlight>5 mg / 10 mg once daily</CardHighlight>.
                </p>
              </>
            }
            footer={<CommercialSplit />}
          />
        </div>

        {/* Lung overlay pinned to the cards row only. overflow:hidden
            clips the lung vertically if its aspect-ratio-derived height
            exceeds the (now shorter) cards row — keeps the breather
            gap to the timeline row clean. */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 0,
            overflow: 'hidden',
          }}
        >
          <LungsShared layoutId="lung-lynch" variant="context" />
        </div>
      </div>

      {/* ─── ROW 2 · Full-width timeline ─── */}
      <TimelineRow reduce={reduce} ease={ease} />

      {/* ─── ROW 3 · Transition line ─── */}
      <TransitionLine reduce={reduce} ease={ease} />
    </div>
  );
}

/* ==============================================================
   TimelineRow — full-width adult-approval timeline for slide 06.
   Lives in its own grid row below the two cards (user ask
   2026-04-23: "2nd row maybe the timeline"). Keeps cards compact
   and avoids Card 02 overflow.
   ============================================================== */
function TimelineRow({ reduce, ease }) {
  return (
    <motion.div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        padding: 'var(--space-4) var(--space-6)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-md)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 'var(--space-2)',
        minHeight: 0,
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.2 }}
    >
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          letterSpacing: '0.22em',
          textTransform: 'uppercase',
          color: 'var(--cream-faint)',
        }}
      >
        Adult label coverage · 2005 → 2025
      </span>
      <div style={{ minHeight: 0, width: '100%' }}>
        <AgencyApprovalTimeline delay={2.5} compact />
      </div>
    </motion.div>
  );
}

/* ==============================================================
   PathwayChips — "Three targetable pharmacologic pathways" strip.
   Endothelin is the highlighted pathway (coral chip); NO-cGMP and
   Prostacyclin are ghosted (no background, cream-muted).
   ============================================================== */
/* Ports HTML .cbc-footer — label row on top, chips below.
   Outlined chips + filled active chip (coral-wash). */
function PathwayChips() {
  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--cream-faint)',
    display: 'block',
    width: '100%',
    marginBottom: 2,
  };
  const chipBase = {
    fontFamily: 'var(--font-mono)',
    fontSize: '0.68rem',
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

/* ==============================================================
   CommercialSplit — "Letairis · US — Volibris · ex-US"
   ============================================================== */
function CommercialSplit() {
  return (
    <div
      style={{
        paddingTop: 4,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.68rem',
        letterSpacing: '0.22em',
        textTransform: 'uppercase',
        color: 'var(--cream-muted)',
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <span style={{ color: 'var(--cream-faint)', width: '100%', marginBottom: 4, letterSpacing: '0.22em' }}>
        Commercial split
      </span>
      <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Letairis®</span>
      <span style={{ color: 'var(--cream-dim)' }}>·</span>
      <span>Gilead · US</span>
      <span style={{ color: 'var(--cream-dim)', margin: '0 4px' }}>—</span>
      <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Volibris®</span>
      <span style={{ color: 'var(--cream-dim)' }}>·</span>
      <span>GSK · ex-US</span>
    </div>
  );
}

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
          fontSize: 'clamp(0.95rem, 1.2vw, 1.35rem)',
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