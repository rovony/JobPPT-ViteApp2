// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * DomainTitleBlock — the Movement-3 component-card variant of
 * PrincipleTitleBlock. Same C4 Newspaper-Reveal cadence, but no
 * `OF 5` counter and a more compact vertical footprint so it can
 * sit above a 70/30 SVG + SubstrateMap layout without crowding.
 *
 * Per Amendment 3 §4.2 — every Movement-3 card gets this header
 * contract: TAG · NAME · italic definition · hairline rule.
 *
 *   <DomainTitleBlock
 *     tag="COMPONENT 1 / 5 · NCA"
 *     name="Non-Compartmental Analysis"
 *     definition="Auditable AUC, Cmax, half-life from sparse data."
 *   />
 */

type Props = {
  tag: string;
  name: string;
  definition: string;
  caseColor?: 'amber' | 'cyan' | 'sage' | 'violet' | 'coral';
};

export default function DomainTitleBlock({ tag, name, definition }: Props) {
  return (
    <div className="w-full flex flex-col items-center text-center px-12 pt-2 pb-4 z-50 relative">
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.10, duration: 0.5, ease: EASE.expoOut }}
        className="deck-mono uppercase"
        style={{
          fontSize: 12,
          letterSpacing: '0.18em',
          color: 'var(--case)',
          marginBottom: 12,
        }}
      >
        {tag}
      </motion.p>

      <div style={{ overflow: 'hidden', marginBottom: 12 }}>
        <motion.h1
          initial={{ y: '100%' }}
          animate={{ y: 0 }}
          transition={{ delay: 0.25, duration: 0.7, ease: EASE.expoOut }}
          className="deck-display"
          style={{
            fontSize: 38,
            fontWeight: 600,
            color: 'var(--cream)',
            lineHeight: 1.1,
            margin: 0,
          }}
        >
          {name}
        </motion.h1>
      </div>

      <motion.h2
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.45, duration: 0.55, ease: EASE.expoOut }}
        className="deck-display"
        style={{
          fontSize: 19,
          fontStyle: 'italic',
          color: 'var(--cream-muted)',
          maxWidth: '60ch',
          margin: 0,
        }}
      >
        {definition}
      </motion.h2>

      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay: 0.65, duration: 0.9, ease: EASE.expoOut }}
        style={{
          width: '100%',
          maxWidth: 720,
          height: 1,
          background: 'var(--cream-hairline)',
          marginTop: 18,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
