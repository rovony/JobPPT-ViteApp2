// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 18 · CS2 STRATEGY — mechanism-first, six pillars unified.
 *
 * v3 (Apr-26 audit pass — name the framework, fill the canvas):
 *   • Persistent ICH E5(R1) APPENDIX D framework eyebrow added under
 *     the deck eyebrow so the audience reads what the six pillars ARE
 *     (the ethnic-sensitivity assessment framework) before the cards
 *     animate in.
 *   • PillarArchitecture FullGrid is now fluid — the 6 cards FILL the
 *     canvas instead of sitting in a 168×108 island. Each card carries
 *     pillar number + name + tag + outcome.
 *   • Tag-on-the-side summary line ("These 6 → defended convergent
 *     evidence → mechanism > population → CDSCO objection resolved")
 *     was placed below the grid as the closing assertion.
 */
export default function Slide18Case2Strategy() {
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
        rowGap: 'var(--space-4)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* ═══════════ Persistent framework eyebrow ═══════════ */}
      <FrameworkEyebrow />

      {/* ═══════════ The pillar architecture — fluid, fills canvas ═══ */}
      <div style={{ minHeight: 0 }}>
        <PillarArchitecture stage="full" />
      </div>

      {/* ═══════════ Closing assertion (the why-six-pillars line) ═══ */}
      <ClosingAssertion />
    </div>
  );
}

function FrameworkEyebrow() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-4)',
        alignItems: 'baseline',
        paddingLeft: 'var(--space-3)',
        borderLeft: '3px solid var(--cyan)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
          whiteSpace: 'nowrap',
        }}
      >
        ICH E5(R1) Appendix D — six-pillar ethnic-sensitivity framework
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        Six converging lines of evidence — one classification CDSCO accepted.
      </div>
    </motion.div>
  );
}

function ClosingAssertion() {
  return (
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
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 500,
          color: 'var(--cream)',
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        Six pillars · convergent evidence ·{' '}
        <span style={{ color: 'var(--cyan)', fontWeight: 700, fontStyle: 'normal' }}>
          mechanism &gt; population
        </span>{' '}
        · the CDSCO objection cleared.
      </p>
    </motion.div>
  );
}
