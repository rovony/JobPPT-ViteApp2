import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 18 (manifest position) · CS2 STRATEGY — mechanism-first.
 *
 * Per cs2-design.md beat 4: "Mechanism-first. 'IDH1 R132 is somatic,
 * not germline.' All six pillars present, none yet hero. This is where
 * the architecture locks in. The panel sees that the answer isn't one
 * pillar — it's a structure."
 *
 * Cinematic role:
 *   • T6 midpoint — the pillar architecture, seeded as tiny tiles on
 *     slide 17, MORPHS to full size here (PillarArchitecture
 *     stage="full"). Each pillar carries a stable layoutId so framer
 *     handles the morph automatically. Equal weight — no hero yet.
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────────────┐
 *   │  BANNER · "IDH1 R132 is somatic, not germline."          │
 *   │  subhead · drug target is inside the tumor               │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  [P1] [P2] [P3]                                          │
 *   │  [P4] [P5] [P6]                                          │
 *   ├──────────────────────────────────────────────────────────┤
 *   │  Six pillars. One mechanism. One ICH E5 classification.  │
 *   └──────────────────────────────────────────────────────────┘
 */
export default function Slide16Case2Strategy() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · Strategy — the mechanism-first reframe"
      headline={
        <>
          IDH1 R132 is{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            somatic, not germline.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="The drug target is inside the tumor. Inherited ethnic variation does not modulate drug-target engagement."
      subheadMaxChars={120}
      footerKicker="Case 02 · The architecture"
      footerSource="Source · Dang Nature 2009 · Figueroa Cancer Cell 2010 · Ward Cancer Cell 2010 · ICH E5(R1) 2006"
    >
      <StrategyLayout />
    </SlideFrame>
  );
}

function StrategyLayout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        rowGap: 'var(--space-5)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Section header */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 }}
        style={{
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-3)',
          paddingLeft: 'var(--space-3)',
          borderLeft: '3px solid var(--cyan)',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-kicker)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cyan)',
            fontWeight: 700,
          }}
        >
          The reframe ·
        </div>
        <div
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-slide-body)',
            color: 'var(--cream)',
            lineHeight: 1.4,
          }}
        >
          Six converging pillars · one unifying mechanism · the structure CDSCO accepted.
        </div>
      </motion.div>

      {/* The pillar architecture — full size, equal weight */}
      <div style={{ minHeight: 0 }}>
        <PillarArchitecture stage="full" />
      </div>

      {/* Bottom assertion */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 2.4 }}
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '1px solid var(--cream-hairline)',
          textAlign: 'center',
        }}
      >
        <p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'var(--fs-slide-tagline)',
            fontWeight: 500,
            color: 'var(--cream)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          Six pillars. One mechanism.{' '}
          <span style={{ color: 'var(--cyan)', fontWeight: 700, fontStyle: 'normal' }}>
            One ICH E5 classification.
          </span>
        </p>
      </motion.div>
    </div>
  );
}
