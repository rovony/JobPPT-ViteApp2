import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 09 (slot) — V2-S5 · Drug + constraint.
 *
 * 2026-04-25 v2-final pass — content replaced wholesale per
 * 2-Slides_Dev/2-Slides-Plan-V2/_Results/2-SlidesPlan/V2/2A-Slides-CS1-Slides01-06-v2.md.
 * Slide ID `cs1-architecture` retained for manifest stability; the V2
 * spec places the drug-profile + pediatric-constraint two-column here.
 * The "three pillars" architecture content has been folded into slide
 * 12 (cs1-bracket) PopPK framework architecture.
 *
 * v2-final amendments:
 *   - A1.6 Etiologic distribution explicit (66% IPAH, 20% post-repair
 *     CHD, 10% CTD, 5% familial) per Ivy 2020 Table IV.
 *   - A1.7 Background therapy explicit (80% on baseline PAH therapy at
 *     entry; 66% ongoing; PDE-5i mono 44%, prostanoid mono 2%, combo 20%).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const DRUG_FACTS = [
  { label: 'Mechanism', value: 'Selective ETA antagonist · >4,000-fold selectivity vs ETB' },
  { label: 'Indication', value: 'Adult PAH (WHO Group 1) · FDA 2007 · EMA 2008' },
  { label: 'Pivotal program', value: 'ARIES-1 + ARIES-2 · N≈380 combined · 6MWD primary' },
  { label: 'Adult dose', value: '5 mg or 10 mg once daily · fixed dose' },
  { label: 'Distinctive feature', value: 'Hepatotoxicity black-box removed 2011 — distinguishes from bosentan' },
];

const CONSTRAINTS = [
  { label: 'Rarity', value: 'Pediatric PAH prevalence 2–16 per million children — patient pool barely exists' },
  { label: 'Heterogeneity', value: 'AMB112529 mix · 66% IPAH · 20% post-repair CHD · 10% CTD · 5% familial' },
  { label: 'Ethics', value: '80% on baseline PAH therapy at entry · 66% ongoing → placebo arms untenable' },
  { label: 'Endpoint', value: '6MWD doesn\'t transfer — children <7–8 can\'t perform reliably; growth confounds longer trials' },
  { label: 'Empirical record', value: 'No pediatric PAH trial has hit a 6MWD primary at α=0.05 (incl. STARTS-1 N=235, p=0.056)' },
];

function FactCard({ items, headerKicker, headerColor, delay, reduced, isHero }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.6, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: `1px solid ${isHero ? 'color-mix(in srgb, var(--case) 32%, transparent)' : 'var(--cream-hairline)'}`,
        borderLeft: `4px solid ${headerColor}`,
        borderRadius: 'var(--radius-lg)',
        background: isHero
          ? 'color-mix(in srgb, var(--case) 6%, transparent)'
          : 'color-mix(in srgb, var(--panel) 60%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-kicker)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: headerColor,
        fontWeight: 700,
      }}>
        {headerKicker}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {items.map((it) => (
          <div key={it.label} style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
            <span className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-pageno)',
              color: 'var(--cream-faint)',
              letterSpacing: 'var(--ls-mono-wide)',
              fontWeight: 700,
            }}>
              {it.label}
            </span>
            <span className="deck-body" style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream)',
              opacity: 0.86,
              lineHeight: 1.4,
            }}>
              {it.value}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

export default function Cs1Architecture() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* V2-S5 lung-anchor treatment · ambient · barely-visible
          decorative ghost in the right margin behind the constraint
          column — a quiet reminder of the disease while the slide
          focuses on the trial-design constraints. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          right: '4%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(18rem, 32vw, 28rem)',
          opacity: 0.32,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="ambient"
        />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The drug and the constraint
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Ambrisentan was approved in adults in 2007 —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          but the trial path that defined the adult dose was not viable for children.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The drug profile on the left; the five constraints on a pediatric
        efficacy trial on the right.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-5))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
          alignItems: 'stretch',
          height: '100%',
        }}>
          <FactCard
            items={DRUG_FACTS}
            headerKicker="The drug"
            headerColor="var(--case)"
            delay={0.85}
            reduced={reduced}
            isHero
          />
          <FactCard
            items={CONSTRAINTS}
            headerKicker="Why no pediatric efficacy trial"
            headerColor="var(--cream-muted)"
            delay={1.00}
            reduced={reduced}
          />
        </div>

        {/* Closing reframe — the question shifted */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.45, ease: EASE }}
          className="deck-display italic"
          style={{
            marginTop: 'clamp(var(--space-3), 3vh, var(--space-5))',
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream-muted)',
            lineHeight: 1.5,
            fontWeight: 400,
            maxWidth: '78ch',
            paddingLeft: 'var(--space-3)',
            borderLeft: '1px solid var(--case)',
          }}
        >
          The clinical question wasn&rsquo;t &ldquo;does it work in children?&rdquo; &mdash; mechanism is conserved. The question was: <strong style={{ color: 'var(--cream)', fontStyle: 'normal' }}>how do you defend a pediatric dose under these constraints?</strong>
        </motion.div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.85}
        kicker="09 · CS1 · DRUG + CONSTRAINT"
        tagline="Mechanism is conserved. The trial path is closed. The question shifts to the framework."
        source="Source · FDA Letairis label · Ivy DD et al. J Pediatr X 2020 Table IV · ESC/ERS 2022 PAH guideline"
      />
    </SlideGrid>
  );
}
