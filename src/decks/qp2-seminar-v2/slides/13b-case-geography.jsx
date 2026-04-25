import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 13b · Case 01 · COMMERCIAL GEOGRAPHY — why FDA wasn't on the dial.
 *
 * NEW slide (added 2026-04-25 per V3 inspiration · Prompt 7).
 *
 * Editorial purpose:
 *   The audience just heard "EMA + PMDA accepted the same model." The next
 *   question — and the highest-probability panel probe — is "then why
 *   didn't FDA?" This slide pre-empts that probe by surfacing the
 *   territorial split: ambrisentan is marketed as TWO products (Letairis
 *   in the US, Volibris in EU/Japan/RoW), with two different sponsors
 *   and two different post-STARTS-2 commercial stances toward
 *   pediatric label expansion.
 *
 *   Public, on-label information only — Gilead and GSK names are
 *   matters of public record (FDA Orange Book / EMA SmPC). Per
 *   zaj-slides confidentiality rules, public commercial affiliations
 *   are permitted; only internal data and unreleased assessments are not.
 *
 * Layout (inside SlideFrame's viz cell):
 *   ┌────────────────────────────────────┬─────────────────────────────────────┐
 *   │  US TERRITORY · LETAIRIS           │  EU + JAPAN + RoW · VOLIBRIS        │
 *   │  Gilead Sciences                   │  GSK (now Janssen / J&J in JP)      │
 *   │  Adult-only label (post-STARTS-2)  │  Pediatric label · Sep 2021 / Apr   │
 *   │                                    │                                     │
 *   │  Sildenafil trauma → defensive     │  Distinct sponsor → independent     │
 *   │  pediatric stance · no peds NDA    │  pediatric extrapolation submission │
 *   └────────────────────────────────────┴─────────────────────────────────────┘
 *   ─── ◆ Synthesis: One molecule, two regulatory geographies. ────────────────
 *
 * NOT a redundancy with slide 13:
 *   Slide 13 says "two regulators converged on one model" → cinematic.
 *   This slide says "and here's why a third regulator didn't" → defensive.
 *   The two beats together close the regulatory geography of CS1
 *   without leaving the FDA gap unexplained.
 */
export default function Slide13bCaseGeography() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="CS1 · Commercial geography — why FDA wasn't on the dial"
      headline={
        <>
          One molecule. Two products.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
            Two regulatory geographies.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="Then why didn't FDA? The model never reached US filing — not because the data failed, but because the territorial sponsor never opened the door."
      footerKicker="Case 01 · Commercial geography"
      footerSource="Source · FDA Orange Book · EMA SmPC · PMDA Volibris label (Apr 2021)"
    >
      <GeographyLayout />
    </SlideFrame>
  );
}

/* ================================================================
   GeographyLayout — two columns + synthesis ribbon.
   Same idiom as slide 07b PrecedentsLayout so the case study reads
   one consistent two-column-plus-ribbon pattern across the trio
   of analytical-context slides (07b precedents · 13b geography).
   ================================================================ */
function GeographyLayout() {
  return (
    <div
      className="cs1-geography"
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      <style>{`
        @media (max-width: 900px) {
          .cs1-geography .cs1-geo-cols {
            grid-template-columns: 1fr !important;
            row-gap: var(--space-3) !important;
          }
        }
        @media (max-width: 640px) {
          .cs1-geography .cs1-geo-divider { display: none !important; }
        }
      `}</style>

      {/* Same alignment philosophy as S07b cs1-prec-cols: cards stretch
          to fill the row; alignContent: 'space-between' on the card
          itself distributes rows evenly with kicker pinned at top,
          rationale pinned at bottom — no floating cards, no filler. */}
      <div
        className="cs1-geo-cols"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          columnGap: 'var(--space-5)',
          alignItems: 'stretch',
          minHeight: 0,
          height: '100%',
        }}
      >
        {/* LEFT · US territory · Letairis */}
        <TerritoryCard
          tone="cyan"
          marker="US"
          territory="UNITED STATES"
          product="Letairis"
          sponsor="Gilead Sciences"
          labelStatus="Adult-only label"
          labelMeta="No pediatric NDA filed post-STARTS-2"
          rationaleLabel="Sponsor stance"
          rationaleBody={
            <>
              Sildenafil's pediatric trauma shaped a defensive US posture across
              the PAH category —{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                no sponsor moved a pediatric ETRA submission through FDA
              </em>{' '}
              for years.
            </>
          }
          delay={1.6}
        />

        {/* CENTER · vertical hairline divider */}
        <div
          className="cs1-geo-divider"
          aria-hidden
          style={{
            width: 1,
            background: 'var(--cream-hairline)',
            alignSelf: 'stretch',
            justifySelf: 'center',
          }}
        />

        {/* RIGHT · EU + Japan + RoW · Volibris */}
        <TerritoryCard
          tone="amber"
          marker="EU+JP"
          territory="EU · JAPAN · ROW"
          product="Volibris"
          sponsor="GSK (Janssen in Japan)"
          labelStatus="Pediatric label · 2021"
          labelMeta="EMA · Sep 2021 · PMDA · Apr 2021"
          rationaleLabel="Sponsor stance"
          rationaleBody={
            <>
              Distinct sponsor, distinct regulatory dialogue —{' '}
              <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>
                pediatric extrapolation moved the moment the data and the
                appetite aligned
              </em>
              , independent of the US posture.
            </>
          }
          delay={1.85}
        />
      </div>

      <SynthesisRibbon />
    </div>
  );
}

/* ================================================================
   TerritoryCard — one column.
   Mirrors PrecedentCard's anatomy from slide 07b: tone-tinted
   kicker chip, product/sponsor block, label status hero, then
   rationale body with hairline-top separator. Tone is cyan vs amber
   so the geographic split visually distinguishes from 07b's
   coral-trauma vs amber-template pairing.
   ================================================================ */
function TerritoryCard({
  tone, // 'cyan' | 'amber'
  marker,
  territory,
  product,
  sponsor,
  labelStatus,
  labelMeta,
  rationaleLabel,
  rationaleBody,
  delay,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const accent = tone === 'amber' ? 'var(--amber)' : 'var(--cyan)';

  return (
    <motion.div
      style={{
        display: 'grid',
        // Mirrors S07b PrecedentCard: 4 auto rows + alignContent
        // 'space-between'. Card stretches to fill the row, but the
        // 4 rows distribute themselves with kicker pinned at top
        // and rationale pinned at bottom — no clumped empty filler.
        gridTemplateRows: 'auto auto auto auto',
        alignContent: 'space-between',
        rowGap: 'var(--space-3)',
        padding: 'var(--space-4)',
        background: `color-mix(in srgb, ${accent} 5%, transparent)`,
        border: `1px solid color-mix(in srgb, ${accent} 22%, transparent)`,
        borderRadius: 'var(--radius-md)',
        minHeight: 0,
      }}
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
    >
      {/* ── Kicker chip (territory marker + territory name) ── */}
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
            minWidth: 38,
            height: 22,
            padding: '0 8px',
            borderRadius: 11,
            background: accent,
            color: 'var(--bg)',
            fontFamily: 'var(--font-mono)',
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: '0.12em',
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
            color: accent,
            fontWeight: 700,
          }}
        >
          {territory}
        </span>
      </div>

      {/* ── Product + sponsor.
            Bumped from --fs-card-title to a clamp range matching
            S07b PrecedentCard's drug-name treatment — Letairis /
            Volibris are the actors of this slide and need to read
            with the same weight as Sildenafil / Bosentan did on S07b. ── */}
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
          {product}
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
          {sponsor}
        </div>
      </div>

      {/* ── Label status block · the headline data point ── */}
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
          Pediatric label
        </div>
        <div
          className="deck-display"
          style={{
            // Tightened to match S07b signalValue clamp range so the
            // analytical-context slide pair (S07b precedents · S13b
            // geography) reads as one consistent type system.
            fontSize: 'clamp(1.9rem, 3.4vw, 2.8rem)',
            fontWeight: 600,
            color: accent,
            lineHeight: 1.05,
            letterSpacing: '-0.025em',
            fontFeatureSettings: '"tnum" 1, "lnum" 1',
            marginTop: 6,
          }}
        >
          {labelStatus}
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
          {labelMeta}
        </div>
      </div>

      {/* ── Rationale block · why the territory looked the way it did.
            alignSelf: 'end' removed (mirrors S07b outcome block) — with
            auto-rows above, the rationale lands flush under the label
            block separated only by its hairline-top divider. ── */}
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
            color: accent,
            fontWeight: 600,
          }}
        >
          {rationaleLabel}
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            lineHeight: 1.45,
            color: 'var(--cream-muted)',
          }}
        >
          {rationaleBody}
        </div>
      </div>
    </motion.div>
  );
}

/* ================================================================
   SynthesisRibbon — closing beat.
   Same amber-diamond + italic sentence convention as slide 07b's
   SynthesisRibbon, so the case reads one consistent rhetorical
   pattern. The sentence here lands the actual Q&A pre-empt:
   one molecule, two geographies — the model's reach was shaped
   by who was willing to file.
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
          background: 'var(--amber)',
          borderRadius: 2,
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          lineHeight: 1.3,
          fontWeight: 500,
        }}
      >
        One molecule, two geographies — the model's regulatory reach was
        shaped by{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 700 }}>
          who was willing to file
        </span>
        , not by what the model could prove.
      </div>
    </motion.div>
  );
}
