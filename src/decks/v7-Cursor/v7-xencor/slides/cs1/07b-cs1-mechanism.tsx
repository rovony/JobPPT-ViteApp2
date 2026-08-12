// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS_NO_SUBHEAD, STANDARD_ROW_SIZES_NO_SUBHEAD } from '@/components/deck/SlideGrid';
import { Eyebrow, Viz, Footer } from '@/components/deck/SlideParts';
import MechanismVisual from '../../components/MechanismVisual';
import Lungs from '../../components/Lungs';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import ConclusionBar from '../../components/cs1/ConclusionBar';
import { STAGE, SPACE, TYPE, INK } from '../../_shared/deck-ui';

/**
 * CS1 · Slide 07b — Mechanism · endothelin pathway · ambrisentan MOA.
 * Backup: SolidHeadline + unlabeled ConclusionBar (no Subhead stack).
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
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS_NO_SUBHEAD} rowSizes={STANDARD_ROW_SIZES_NO_SUBHEAD}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Mechanism — endothelin pathway</Eyebrow>

      <SolidHeadline delay={STAGE.headline} maxChars={64}>
        Three pathways drive PAH.{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>
          Ambrisentan selectively blocks the endothelin arm.
        </span>
      </SolidHeadline>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            gap: SPACE.gap,
            minHeight: 0,
            minWidth: 0,
            position: 'relative',
          }}
        >
          <div
            aria-hidden
            style={{
              position: 'absolute',
              top: '8%',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 0,
              pointerEvents: 'none',
              opacity: 0.1,
            }}
          >
            <Lungs layoutId="cs1-lung" variant="ambient" widthOverride="100%" opacity={1} bodyOpacity={0.15} />
          </div>

          <div
            style={{
              minHeight: 0,
              minWidth: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'relative',
              zIndex: 1,
            }}
          >
            <MechanismVisual delay={reduced ? 0 : 0.3} />
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', maxWidth: '30rem', margin: '0 auto', width: '100%', position: 'relative', zIndex: 1 }}>
            <SelectivityCard />
          </div>

          <ConclusionBar accent="var(--coral)">
            Selectivity matters: ETA blocked (vasoconstriction) · ETB preserved (NO vasodilation).
          </ConclusionBar>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 0.35}
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
      initial={reduced ? false : { opacity: 1, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: reduced ? 0 : 0.28, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '0.75rem',
        width: '100%',
        padding: SPACE.pad,
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
        border: '1px solid var(--cream-hairline)',
        borderTop: '3px solid var(--amber)',
        minWidth: '240px',
      }}
    >
      <div
        className="deck-body"
        style={{
          fontSize: TYPE.label,
          color: 'var(--amber)',
          letterSpacing: '0.06em',
          textTransform: 'uppercase',
          fontWeight: 700,
        }}
      >
        ETA selectivity
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
        {ERA_SELECTIVITY.map((era) => (
          <div key={era.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem' }}>
            <span
              className="deck-display"
              style={{
                fontSize: TYPE.title,
                color: era.isThisCase ? 'var(--case)' : INK.primary,
                fontWeight: era.isThisCase ? 700 : 500,
              }}
            >
              {era.name}
            </span>
            <span
              className="deck-body"
              style={{
                fontSize: TYPE.body,
                color: era.isThisCase ? 'var(--case)' : INK.meta,
                fontVariantNumeric: 'tabular-nums',
                fontWeight: 700,
              }}
            >
              {era.ratio}
            </span>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
