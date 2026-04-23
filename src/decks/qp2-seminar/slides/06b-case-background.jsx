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
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      {/* ─── Cards row ─── 3 columns: text card · centered lung · text card.
          The lung is a free-floating free-flying element in the middle
          column. Both flanking cards are text-only (no visual slot) so
          the lung reads as the shared subject between them.
          This matches the HTML version's camera-pullback layout. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1fr)',
          columnGap: 'var(--space-5)',
          alignItems: 'stretch',
          alignContent: 'center',
          minHeight: 0,
        }}
      >
        {/* CARD 01 · THE DISEASE */}
        <CaseBodyCard
          number="01"
          eyebrow="THE DISEASE"
          title="Pulmonary arterial hypertension"
          delay={1.7}
          body={
            <>
              <p style={{ margin: 0 }}>
                WHO Group 1 pulmonary hypertension.{' '}
                <CardHighlight>endothelin-1-mediated vasoconstriction</CardHighlight>{' '}
                plus progressive vascular remodeling in small pulmonary arteries.
                Progressive · fatal if untreated · right-ventricular failure.
              </p>
              <p style={{ margin: 'var(--space-2) 0 0 0' }}>
                Adult untreated survival{' '}
                <strong style={{ color: 'var(--cream)', fontWeight: 600 }}>~2.8 years</strong>.
                Pediatric prevalence{' '}
                <CardHighlight>14–20 per million children</CardHighlight> in Europe.
              </p>
              <PathwayChips />
            </>
          }
        />

        {/* CENTER · shared Lynch lung (free-floating, layoutId morph from slide 5) */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            minWidth: 0,
            minHeight: 0,
            padding: 'var(--space-3)',
          }}
        >
          <LungsShared layoutId="lung-lynch" />
        </div>

        {/* CARD 02 · THE DRUG */}
        <CaseBodyCard
          number="02"
          eyebrow="THE DRUG"
          title="Ambrisentan"
          delay={1.95}
          body={
            <>
              <p style={{ margin: 0 }}>
                Selective endothelin type-A (ETA) receptor antagonist —{' '}
                <CardHighlight>~4,000× selectivity</CardHighlight> over ETB.
                Clearance: hepatic glucuronidation via{' '}
                <CardHighlight>UGT1A9 / UGT2B7</CardHighlight>, mature by age 2–3.
              </p>
              <p style={{ margin: 'var(--space-2) 0 0 0' }}>
                Adult dosing:{' '}
                <CardHighlight>5 mg / 10 mg once daily</CardHighlight>.
              </p>
              <CommercialSplit />
            </>
          }
          visual={<AgencyApprovalTimeline delay={2.5} />}
        />
      </div>

      {/* ─── Transition line ─── */}
      <TransitionLine reduce={reduce} ease={ease} />
    </div>
  );
}

/* ==============================================================
   PathwayChips — "Three targetable pharmacologic pathways" strip.
   Endothelin is the highlighted pathway (coral chip); NO-cGMP and
   Prostacyclin are ghosted (no background, cream-muted).
   ============================================================== */
function PathwayChips() {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-3)',
        marginTop: 'var(--space-3)',
        flexWrap: 'wrap',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.58rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        Targetable pathways ·
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono)',
          padding: '3px 8px',
          borderRadius: 'var(--radius-pill)',
          background: 'color-mix(in srgb, var(--coral) 22%, transparent)',
          color: 'var(--cream)',
          fontWeight: 600,
        }}
      >
        Endothelin
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-muted)',
        }}
      >
        NO-cGMP
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-muted)',
        }}
      >
        Prostacyclin
      </span>
    </div>
  );
}

/* ==============================================================
   CommercialSplit — "Letairis · US — Volibris · ex-US"
   ============================================================== */
function CommercialSplit() {
  return (
    <div
      className="deck-mono"
      style={{
        marginTop: 'var(--space-3)',
        fontSize: '0.68rem',
        letterSpacing: 'var(--ls-mono)',
        color: 'var(--cream-muted)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--space-2)',
        flexWrap: 'wrap',
      }}
    >
      <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Letairis®</span>
      <span style={{ color: 'var(--cream-faint)' }}>·</span>
      <span>Gilead · US</span>
      <span style={{ color: 'var(--cream-faint)', margin: '0 var(--space-1)' }}>—</span>
      <span style={{ color: 'var(--cream)', fontWeight: 600 }}>Volibris®</span>
      <span style={{ color: 'var(--cream-faint)' }}>·</span>
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