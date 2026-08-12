// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import MechanismVisual from '../components/MechanismVisual';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07b — Mechanism · endothelin pathway · ambrisentan MOA.
 *
 * Refactored to strictly use SlideGrid / V5 standard slots to prevent
 * arbitrary viewport overflow. The MechanismVisual now relies on a deterministic
 * SVG coordinate system for layout stability.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const ERA_SELECTIVITY = [
  { name: 'Ambrisentan', ratio: '>4000:1', type: 'ETA-selective', isThisCase: true },
  { name: 'Macitentan', ratio: '≈50:1', type: 'ETA-preferring', isThisCase: false },
  { name: 'Bosentan', ratio: '≈20:1', type: 'Dual ETA / ETB', isThisCase: false },
];

export default function Cs1Mechanism() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.50}>
        Case 01 · Mechanism — endothelin pathway
      </Eyebrow>

      <Headline delay={0.65} maxChars={64}>
        Three pathways drive PAH.{' '}
        <span className="xc-em-strong">
          Ambrisentan selectively blocks the endothelin arm.
        </span>
      </Headline>

      <Subhead delay={0.95} maxChars={110} size="lead">
        Selectivity matters: ambrisentan blocks ETA (which drives vasoconstriction) but preserves ETB to allow vasodilation via NO.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'var(--space-5)',
          minHeight: 0, minWidth: 0,
        }}>
          {/* Background Ambient Lung for cinematic FLIP-morph from previous slide */}
          <div style={{
            position: 'absolute',
            top: '10%',
            left: '50%',
            transform: 'translateX(-50%)',
            zIndex: 0,
            pointerEvents: 'none',
            opacity: 0.12, // Dimmed significantly so it doesn't obscure the mechanism text
            mixBlendMode: 'screen', // Blends smoothly into the dark background
          }}>
            <Lungs layoutId="cs1-lung" variant="ambient" />
          </div>

          {/* Main SVG Visual Zone */}
          <div style={{
            flex: 1, minHeight: 0, minWidth: 0,
            display: 'flex', alignItems: 'center', justifyContent: 'center'
          }}>
            <MechanismVisual delay={reduced ? 0 : 1.0} />
          </div>

          {/* Selectivity payoff — one card, not a pathway encyclopedia */}
          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '28rem', margin: '0 auto', width: '100%' }}>
            <SelectivityCard />
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.6}
        kicker="07b · CS1 · Mechanism"
        tagline="Context: three PAH pathways · This case: endothelin dose bridge."
        source="Sources · ESC/ERS 2022 · Letairis PI · Tracleer PI · Opsumit PI"
      />
    </SlideGrid>
  );
}

function SelectivityCard() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.4, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--amber) 5%, var(--panel))',
        border: '1.5px solid var(--amber)',
        boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        minWidth: '240px',
      }}
    >
      <div className="deck-mono uppercase xc-slide-subhead xc-amber" style={{ letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
        ETA Selectivity
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
        {ERA_SELECTIVITY.map((era) => (
          <div key={era.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-4)' }}>
            <span className={`deck-display xc-name ${era.isThisCase ? 'xc-case' : 'xc-ink'}`} style={{ fontWeight: era.isThisCase ? 700 : 500 }}>
              {era.name}
            </span>
            <span className={`deck-mono xc-slide-subhead ${era.isThisCase ? 'xc-case' : 'xc-faint'}`} style={{ fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
              {era.ratio}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

