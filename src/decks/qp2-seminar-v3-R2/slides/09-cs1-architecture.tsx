// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · Slide 09 — Drug + constraint.
 *
 * Redesigned as a Premium Dossier to balance the columns, center the visual
 * weight, and eliminate vertical layout voids.
 */

const DRUG_FACTS = [
  { label: 'Mechanism', value: 'Selective ETA antagonist · >4,000:1 vs ETB (bosentan ≈20:1, macitentan ≈50:1)' },
  { label: 'Indication', value: 'Adult PAH (WHO Group 1) · FDA Jun 2007 · EMA Apr 2008' },
  { label: 'Pivotal program', value: 'ARIES-1 + ARIES-2 · N≈380 · 6MWD primary · placebo-controlled' },
  { label: 'Adult dose', value: '5 mg or 10 mg once daily · fixed (no titration · no TDM)' },
  { label: 'Distinctive feature', value: 'Hepatotox black-box removed 2011 — distinguishes from bosentan' },
];

const CONSTRAINTS = [
  { n: '01', label: 'Rarity',         value: 'Pediatric PAH prevalence 2–16 / million — patient pool barely exists' },
  { n: '02', label: 'Heterogeneity',  value: 'AMB112529 mix · 66% IPAH · 20% post-repair CHD · 10% CTD · 5% familial' },
  { n: '03', label: 'Ethics',         value: '80% on baseline PAH therapy at entry · 66% ongoing — placebo arms untenable' },
  { n: '04', label: 'Endpoint',       value: '6MWD doesn’t transfer — children <7–8 can’t perform reliably; growth confounds longer trials' },
  { n: '05', label: 'Empirical record', value: 'STARTS-1 (N=235): prespecified CPET peak VO₂ primary p=0.056 vs placebo' },
];

export default function Cs1Architecture() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* PERFECTLY CENTERED BACKGROUND WATERMARK */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(28rem, 50vw, 40rem)',
          opacity: 0.12,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'screen',
        }}
      >
        <Lungs layoutId="cs1-lung" variant="ambient" />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The drug and the constraint
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Ambrisentan was approved in adults in 2007 —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          but the adult trial path was not viable for children.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        The drug profile on the left; the five constraints on a pediatric efficacy trial on the right.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'var(--space-6)',
        }}>
          {/* TWO-COLUMN DOSSIER GRID */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.9fr) minmax(0, 1.1fr)',
            gap: 'clamp(var(--space-4), 3vw, var(--space-6))',
            alignItems: 'stretch',
            zIndex: 1,
            position: 'relative',
          }}>
            {/* LEFT COLUMN: THE DRUG */}
            <FactCard
              items={DRUG_FACTS}
              headerKicker="The drug · ambrisentan"
              headerColor="var(--case)"
              delay={0.7}
              go={go}
              isHero
            />
            {/* RIGHT COLUMN: THE CONSTRAINTS */}
            <FactCard
              items={CONSTRAINTS}
              headerKicker="Why no pediatric efficacy trial · 5 constraints"
              headerColor="var(--cream-muted)"
              delay={0.9}
              go={go}
              numbered
            />
          </div>

          {/* CLOSING REFRAME — Centered, bold callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 1.3, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'calc(var(--fs-slide-tagline) * 1.1)',
              color: 'var(--cream)',
              lineHeight: 1.5,
              fontWeight: 400,
              maxWidth: '90ch',
              padding: 'var(--space-4) var(--space-6)',
              borderLeft: '4px solid var(--case)',
              background: 'color-mix(in srgb, var(--case) 8%, transparent)',
              borderRadius: 'var(--radius-md)',
              alignSelf: 'center',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            }}
          >
            The clinical question wasn&rsquo;t <em style={{ fontStyle: 'italic', opacity: 0.8 }}>does it work in children?</em> &mdash; mechanism is conserved. The question was:{' '}
            <strong style={{ color: 'var(--case)', fontWeight: 700 }}>how do you defend a pediatric dose under these constraints?</strong>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="09 · CS1 · DRUG + CONSTRAINT"
        tagline="Mechanism is conserved. The trial path is closed. The question shifts to the framework."
        source="Source · FDA Letairis label · Ivy DD et al. J Pediatr X 2020 Table IV · ESC/ERS 2022 PAH guideline"
      />
    </SlideGrid>
  );
}

function FactCard({ items, headerKicker, headerColor, delay, go, isHero, numbered }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: `1px solid ${isHero ? 'color-mix(in srgb, var(--case) 40%, transparent)' : 'color-mix(in srgb, var(--cream-muted) 30%, transparent)'}`,
        borderLeft: `4px solid ${headerColor}`,
        borderRadius: 'var(--radius-lg)',
        background: isHero
          ? 'color-mix(in srgb, var(--case) 8%, var(--panel))'
          : 'color-mix(in srgb, var(--panel) 70%, transparent)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-4)',
        boxShadow: isHero ? '0 8px 32px rgba(0,0,0,0.15)' : '0 8px 32px rgba(0,0,0,0.1)',
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: headerColor,
        fontWeight: 700,
        paddingBottom: 'var(--space-2)',
        borderBottom: `1px solid color-mix(in srgb, ${headerColor} 20%, transparent)`,
      }}>
        {headerKicker}
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)', flex: 1 }}>
        {items.map((it) => (
          <div
            key={it.label}
            style={{
              display: 'grid',
              gridTemplateColumns: numbered ? 'auto 1fr' : '1fr',
              columnGap: 'var(--space-3)',
              alignItems: 'baseline',
            }}
          >
            {numbered && (
              <span className="deck-mono" style={{
                fontSize: 'calc(var(--fs-slide-pageno) * 0.9)',
                color: headerColor,
                fontWeight: 700,
                background: 'color-mix(in srgb, var(--cream-muted) 15%, transparent)',
                padding: '2px 6px',
                borderRadius: '4px',
              }}>
                {it.n}
              </span>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0 }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'calc(var(--fs-slide-pageno) * 0.9)',
                color: numbered ? headerColor : 'var(--cream-muted)',
                letterSpacing: 'var(--ls-mono-wide)',
                fontWeight: 700,
              }}>
                {it.label}
              </span>
              <span className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                opacity: 0.9,
                lineHeight: 1.35,
              }}>
                {it.value}
              </span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
