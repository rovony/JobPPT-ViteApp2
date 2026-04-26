import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 07b · Case 01 · PRECEDENTS — what shaped FDA's pediatric stance.
 *
 * NEW slide (added 2026-04-25 per V3 inspiration · Prompt 2).
 *
 * Editorial purpose:
 *   The audience just heard "no viable trial path" on slide 07. Before
 *   we present OUR strategy on slide 08, we frame the regulatory
 *   landscape that constrained that strategy. Two precedents — one
 *   negative, one positive — defined the corridor we had to walk.
 *
 * Distinct from slide 02 (Hook):
 *   Slide 02 is the EMOTIONAL cold-open: dramatic GSAP timeline, the
 *   STARTS-2 trauma as the moral stake. THIS slide is the ANALYTICAL
 *   architecture: two precedents side-by-side, treated as regulatory
 *   evidence — not as drama. Same datapoint (HR 3.95) appears in both,
 *   but framed differently. The repetition is intentional and serves
 *   different rhetorical purposes (the first earned the audience's
 *   attention; this one earns their understanding of the strategy).
 *
 * Layout (inside SlideFrame's viz cell):
 *   ┌─────────────────────────────────────────────────────────────┐
 *   │  ⊘ TRAUMA · 2012             │  ✓ TEMPLATE · 2009           │
 *   │  SILDENAFIL                  │  BOSENTAN                    │
 *   │  STARTS-2 mortality signal   │  FUTURE-1 PK matching        │
 *   │                              │                              │
 *   │  HR 3.95                     │  PK BRIDGE                   │
 *   │  (high vs low dose)          │  (adult AUC envelope)        │
 *   │                              │                              │
 *   │  FDA → 2012 boxed warning    │  EMA → pediatric label       │
 *   │  "empirical dosing unsafe"   │  "PK matching is the bridge" │
 *   └─────────────────────────────────────────────────────────────┘
 *   ─── ◆ Synthesis: Our strategy followed both signals.  ────────
 */
export default function Slide07bCasePrecedents() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Precedents — what shaped the pediatric corridor"
      headline={
        <>
          The regulatory landscape was shaped by{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            two precedents.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="The number from the cold open returns — this time as architecture, not alarm. One trauma, one template, and the corridor our strategy had to walk."
      footerKicker="Case 01 · Regulatory precedents"
      footerSource="Source · STARTS-2 · NCT00159913 · FDA Drug Safety Communication 2012 · FUTURE-1 · Beghetti 2009"
    >
      <PrecedentsLayout />
    </SlideFrame>
  );
}

/* ================================================================
   PrecedentsLayout — two columns + synthesis ribbon at the bottom.
   Same idiom as slide 07's FocalQuestion ribbon (amber diamond +
   editorial sentence) so the closing beat reads consistently across
   the case.
   ================================================================ */
function PrecedentsLayout() {
  return (
    <div
      className="cs1-precedents"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      {/* Responsive overrides — at <900px the two columns stack
          vertically so each precedent gets full width to breathe. */}
      <style>{`
        @media (max-width: 900px) {
          .cs1-precedents .cs1-prec-cols {
            grid-template-columns: 1fr !important;
            row-gap: var(--space-3) !important;
          }
        }
        @media (max-width: 640px) {
          .cs1-precedents .cs1-prec-divider { display: none !important; }
        }
      `}</style>

      {/* ─── ROW 1 · Two precedent columns ───
          Cards stretch to fill the row; the card itself distributes
          its 4 rows with alignContent: 'space-between' so the kicker
          stays at top, outcome stays at bottom, and the drug/signal
          rows breathe in between — no empty filler, no floating cards. */}
      <div
        className="cs1-prec-cols"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          columnGap: 'var(--space-5)',
          alignItems: 'stretch',
          minHeight: 0,
          height: '100%',
        }}
      >
        {/* LEFT · Sildenafil (TRAUMA) */}
        <PrecedentCard
          variant="trauma"
          marker="⊘"
          kicker="Trauma · 2012"
          drug="Sildenafil"
          trial="STARTS-2 · pediatric extension"
          signalLabel="Mortality signal"
          signalValue="HR 3.95"
          signalCaption="high dose vs low dose"
          signalTone="coral"
          outcomeLabel="FDA · Drug Safety Comm. · 2012"
          outcomeBody={
            <>
              Boxed-warning equivalent against high-dose pediatric use —
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}> empirical pediatric dosing was no longer defensible</em>.
            </>
          }
          delay={1.6}
        />

        {/* CENTER · vertical hairline divider */}
        <div
          className="cs1-prec-divider"
          aria-hidden
          style={{
            width: 1,
            background: 'var(--cream-hairline)',
            alignSelf: 'stretch',
            justifySelf: 'center',
          }}
        />

        {/* RIGHT · Bosentan (TEMPLATE) */}
        <PrecedentCard
          variant="template"
          marker="✓"
          kicker="Template · 2009"
          drug="Bosentan"
          trial="FUTURE-1 · pediatric program"
          signalLabel="Regulatory bridge"
          signalValue="PK matching"
          signalCaption="adult AUC / Cmax envelope"
          signalTone="amber"
          outcomeLabel="EMA → pediatric label"
          outcomeBody={
            <>
              Agencies accepted{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                pharmacokinetic matching to adult exposure
              </em>{' '}
              as the bridge to efficacy — provided the safety profile held.
            </>
          }
          delay={1.85}
        />
      </div>

      {/* ─── ROW 2 · Synthesis ribbon ─── */}
      <SynthesisRibbon />
    </div>
  );
}

/* ================================================================
   PrecedentCard — one column.
   Variant tints the kicker chip + the signal value: coral for the
   trauma side, amber for the template side. The body copy stays
   consistently cream/cream-muted so the rhetorical contrast is
   carried by the headline pair (HR 3.95 / PK matching), not by
   competing color floors across the whole panel.
   ================================================================ */
function PrecedentCard({
  variant,
  marker,
  kicker,
  drug,
  trial,
  signalLabel,
  signalValue,
  signalCaption,
  signalTone, // 'coral' | 'amber'
  outcomeLabel,
  outcomeBody,
  delay,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const tone =
    signalTone === 'amber' ? 'var(--amber)' : 'var(--coral)';

  return (
    <motion.div
      style={{
        display: 'grid',
        // 4 auto rows + alignContent: 'space-between'. Card stretches
        // to fill its grid cell, then distributes its 4 rows with
        // even gaps. Kicker locks to top, outcome locks to bottom,
        // drug name + signal value breathe in the middle — no 1fr
        // filler row, no empty mid-card whitespace.
        gridTemplateRows: 'auto auto auto auto',
        alignContent: 'space-between',
        rowGap: 'var(--space-3)',
        padding: 'var(--space-4)',
        background:
          variant === 'trauma'
            ? 'color-mix(in srgb, var(--coral) 5%, transparent)'
            : 'color-mix(in srgb, var(--amber) 5%, transparent)',
        border: `1px solid color-mix(in srgb, ${tone} 22%, transparent)`,
        borderRadius: 'var(--radius-md)',
        minHeight: 0,
      }}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
    >
      {/* ── Kicker chip (variant marker + kicker text) ── */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        <span
          aria-hidden
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 22,
            height: 22,
            borderRadius: '50%',
            background: tone,
            color: 'var(--bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: 13,
            fontWeight: 700,
            lineHeight: 1,
          }}
        >
          {marker}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: '0.22em',
            color: tone,
            fontWeight: 700,
          }}
        >
          {kicker}
        </span>
      </div>

      {/* ── Drug name + trial.
            Drug name bumped from --fs-card-title (~26 px) to a clamp
            range that floors at 1.7 rem and tops at 2.1 rem. The
            previous size lost the editorial fight with the signal-value
            display row below it; the slide read "HR 3.95 / PK matching"
            without anchoring on Sildenafil/Bosentan as the actors. ── */}
      <div>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.7rem, 2.6vw, 2.1rem)',
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.1,
            letterSpacing: '-0.015em',
          }}
        >
          {drug}
        </div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.18em',
            color: 'var(--cream-faint)',
            marginTop: 6,
          }}
        >
          {trial}
        </div>
      </div>

      {/* ── Signal block · the headline data point ── */}
      <div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.18em',
            color: 'var(--cream-muted)',
            fontWeight: 500,
          }}
        >
          {signalLabel}
        </div>
        <div
          className="deck-display"
          style={{
            // Reduced from clamp(2.2, 4.2, 3.4) → clamp(1.9, 3.4, 2.8).
            // Signal value used to overpower the drug name 2:1; now
            // they sit at roughly equal weight with the signal still
            // taking the editorial peak via tone color, not just size.
            fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)',
            fontWeight: 600,
            color: tone,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontFeatureSettings: '"tnum" 1, "lnum" 1',
            marginTop: 6,
          }}
        >
          {signalValue}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-meta)',
            color: 'var(--cream-faint)',
            fontStyle: 'italic',
            marginTop: 4,
          }}
        >
          {signalCaption}
        </div>
      </div>

      {/* ── Outcome block · what the regulator actually did.
            alignSelf: 'end' was removed — with the parent grid now on
            auto-rows, every row sits flush in source order and the
            outcome block lands directly under the signal block with
            its hairline-top divider, no empty filler in between. ── */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: '0.18em',
            color: tone,
            fontWeight: 600,
          }}
        >
          {outcomeLabel}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
          }}
        >
          {outcomeBody}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   SynthesisRibbon — closing beat.
   Same amber-diamond + italic sentence convention as slide 07's
   FocalQuestion and slide 08's anchor ribbon, so the deck reads one
   consistent rhetorical pattern across the case study.
   ================================================================ */
function SynthesisRibbon() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  return (
    <motion.div
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
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : 2.4 }}
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
            delay: reduce ? 0 : 2.3,
          }}
        />
      </div>

      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-title)',
          fontWeight: 400,
          lineHeight: 1.35,
          color: 'var(--cream)',
          flex: 1,
          letterSpacing: '-0.005em',
        }}
      >
        Our strategy followed both signals —{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 500 }}>
          exposure matching, never empirical dosing.
        </span>
      </div>
    </motion.div>
  );
}
