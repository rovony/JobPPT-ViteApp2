// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · BG-1 — Pediatric PAH disease burden + unmet need.
 *
 * v0.3 — 3-column composition:
 *   LEFT   (~26%) — Facts 01 + 02 stacked vertically
 *   CENTER (~38%) — Big lung (cross-slide morph destination, layoutId="cs1-lung")
 *   RIGHT  (~26%) — Facts 03 + 04 stacked vertically
 *
 * Per CLAUDE.md "Cross-slide patterns → A": this is the destination of
 * the divider→disease lung morph. Layout transition 1.8s; section mounts
 * opaque per SlideGrid; element-level fades on the fact-cards stagger
 * after the lung lands.
 *
 * Facts source-aligned to R2R-05 verified-facts:
 *   - 14–20 per million prevalence (Ivy 2020)
 *   - <1y untreated median survival (class history, pre-modern era)
 *   - ~90% 5-yr on therapy (Ivy 2020 modern multi-modal)
 *   - Few pediatric labels across 4 PAH drug classes (ICH E11A 2024)
 */

const FACTS = [
  {
    n: '01',
    value: '14–20',
    unit: 'cases per million children',
    label: 'Pediatric PAH prevalence in Europe — at most a few hundred patients per country.',
    source: 'Ivy 2020',
  },
  {
    n: '02',
    value: '<1 yr',
    unit: 'untreated · median survival',
    label: 'From diagnosis, pre-modern era. Pulmonary arterial hypertension is fatal without treatment.',
    source: 'Class history',
  },
  {
    n: '03',
    value: '~90%',
    unit: '5-year survival · on therapy',
    label: 'On modern multi-modal regimens — anticoagulation, diuretics, ERA, PDE5, prostacyclin.',
    source: 'Ivy 2020',
  },
  {
    n: '04',
    value: 'Few',
    unit: 'pediatric labels · 4 drug classes',
    label: 'Drug-poor by construction. Most agents used off-label until ICH E11A (2024) formalized extrapolation across regulators.',
    source: 'ICH E11A · 2024',
  },
];

function FactCard({ fact, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: '1px solid color-mix(in srgb, var(--coral) 28%, transparent)',
        borderLeft: '3px solid var(--coral)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--coral) 5%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-4)) clamp(var(--space-3), 1.8vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
      }}
    >
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--coral)',
        letterSpacing: '0.12em',
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}>
        FACT {fact.n}
      </div>
      <div className="deck-display" style={{
        fontSize: 'clamp(1.4rem, 2.6vw, 2.2rem)',
        color: 'var(--cream)',
        lineHeight: 1.0,
        fontWeight: 600,
        letterSpacing: '-0.02em',
        fontVariantNumeric: 'tabular-nums',
        marginTop: 'var(--space-1)',
      }}>
        {fact.value}
      </div>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        color: 'var(--cream-faint)',
        letterSpacing: '0.1em',
      }}>
        {fact.unit}
      </div>
      <div aria-hidden style={{
        width: '100%',
        height: 'var(--stroke-hair)',
        background: 'var(--cream-hairline)',
        marginTop: 'var(--space-2)',
        marginBottom: 'var(--space-1)',
      }} />
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.84,
        lineHeight: 1.4,
      }}>
        {fact.label}
      </div>
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--cream-faint)',
        letterSpacing: '0.08em',
        marginTop: 'var(--space-1)',
      }}>
        {fact.source}
      </div>
    </motion.div>
  );
}

export default function Cs1Disease() {
  const reduced = useReducedMotion();
  const baseDelay = reduced ? 0 : 1.2;
  const stagger = reduced ? 0 : 0.12;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Pediatric PAH
      </Eyebrow>

      <Headline delay={0.25} maxChars={42}>
        Small population.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          Lethal without treatment.
        </span>{' '}
        Drug-poor.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The audience for the next 10 minutes is a discipline that ships dosing
        for a few hundred children at a time — globally.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1.15fr) minmax(0, 1fr)',
          gap: 'clamp(var(--space-3), 2.4vw, var(--space-6))',
          alignItems: 'center',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* LEFT — Facts 01 + 02 stacked */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignSelf: 'center',
            minWidth: 0,
          }}>
            <FactCard fact={FACTS[0]} delay={baseDelay} reduced={reduced} />
            <FactCard fact={FACTS[1]} delay={baseDelay + stagger} reduced={reduced} />
          </div>

          {/* CENTER — Big lung (cross-slide morph destination) */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '100%',
            height: '100%',
            minWidth: 0,
          }}>
            <Lungs layoutId="cs1-lung" variant="context" />
          </div>

          {/* RIGHT — Facts 03 + 04 stacked */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
            alignSelf: 'center',
            minWidth: 0,
          }}>
            <FactCard fact={FACTS[2]} delay={baseDelay + stagger * 2} reduced={reduced} />
            <FactCard fact={FACTS[3]} delay={baseDelay + stagger * 3} reduced={reduced} />
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.9}
        kicker="Case 01 · Background — disease burden"
        tagline="Few patients, fatal trajectory, even fewer approved drugs — that is the operating context."
        source="Source · Ivy DD et al. J Pediatr X 2020 · PMC10236545 · ICH E11A · 2024"
      />
    </SlideGrid>
  );
}
