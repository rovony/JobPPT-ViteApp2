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

const PATHWAYS = [
  { n: '01', name: 'Endothelin', state: '↑ ET-1 OVERACTIVE', drugs: 'Ambrisentan · Bosentan · Macitentan', isThisCase: true },
  { n: '02', name: 'NO / cGMP', state: '↓ NO UNDERACTIVE', drugs: 'Sildenafil · Tadalafil · Riociguat', isThisCase: false },
  { n: '03', name: 'Prostacyclin', state: '↓ PGI2 UNDERACTIVE', drugs: 'Epoprostenol · Treprostinil · Selexipag', isThisCase: false },
];

export default function Cs1Mechanism() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Case 01 · Mechanism — endothelin pathway
      </Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Three pathways drive PAH.{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 700 }}>
          Ambrisentan selectively blocks the endothelin arm.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={110} size="lead">
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
            <MechanismVisual delay={reduced ? 0 : 0.6} />
          </div>

          {/* Cards Zone */}
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(260px, auto) 1fr', gap: 'var(--space-4)', alignItems: 'stretch' }}>
            <SelectivityCard />
            <PathwayBand />
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.2}
        kicker="07b · CS1 · Mechanism"
        source="Sources · ESC/ERS 2022 · Letairis PI · Tracleer PI · Opsumit PI · Humbert NEJM 2023"
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
      transition={{ duration: 0.5, delay: 1.0, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        padding: 'var(--space-4)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--amber) 5%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 20%, transparent)',
        minWidth: '240px',
      }}
    >
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
        ETA Selectivity
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
        {ERA_SELECTIVITY.map((era) => (
          <div key={era.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 'var(--space-4)' }}>
            <span className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', color: era.isThisCase ? 'var(--case)' : 'var(--cream)', fontWeight: era.isThisCase ? 700 : 500 }}>
              {era.name}
            </span>
            <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: era.isThisCase ? 'var(--case)' : 'var(--cream-faint)', fontVariantNumeric: 'tabular-nums', fontWeight: 700 }}>
              {era.ratio}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}

function PathwayBand() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 1.2, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--space-4)',
      }}
    >
      {PATHWAYS.map((p) => (
        <div key={p.n} style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-1)',
          padding: 'var(--space-4)',
          borderRadius: 'var(--radius-lg)',
          background: p.isThisCase ? 'color-mix(in srgb, var(--case) 8%, transparent)' : 'color-mix(in srgb, var(--panel) 40%, transparent)',
          borderLeft: `3px solid ${p.isThisCase ? 'var(--case)' : 'var(--cream-hairline)'}`,
        }}>
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', color: p.isThisCase ? 'var(--case)' : 'var(--cream-muted)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
            {p.isThisCase ? '★ ' : ''}Pathway {p.n}
          </div>
          <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', fontWeight: 600 }}>
            {p.name}
          </div>
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: p.isThisCase ? 'var(--case)' : 'var(--cream-faint)', letterSpacing: 'var(--ls-mono-wide)', marginTop: 'var(--space-2)' }}>
            {p.state}
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-muted)' }}>
            {p.drugs}
          </div>
        </div>
      ))}
    </motion.div>
  );
}
