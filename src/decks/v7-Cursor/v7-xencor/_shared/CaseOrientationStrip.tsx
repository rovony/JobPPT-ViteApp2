// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CaseOrientationStrip — three-chip case setup row for the first content
 * slide after a CaseHeroDivider. Gives the audience drug / program /
 * decision context before numbers or regulatory quotes land.
 */
export default function CaseOrientationStrip({
  items,
  accent = 'var(--case)',
  delay = 0.22,
  reduced: reducedProp,
  className = '',
}) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedProp ?? reducedMotion;
  const baseDelay = Math.min(delay, 0.28);

  return (
    <motion.div
      className={`case-orientation-strip ${className}`.trim()}
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.28, delay: reduced ? 0 : baseDelay, ease: EASE }}
      style={{
        width: '100%',
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.kicker}
          initial={reduced ? false : { opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.25,
            delay: reduced ? 0 : Math.min(baseDelay + 0.04 * i, 0.35),
            ease: EASE,
          }}
          style={{
            border: '1px solid var(--cream-hairline)',
            borderTop: `3px solid ${accent}`,
            borderRadius: 'var(--radius-md)',
            background: 'var(--panel)',
            padding: 'var(--space-3) var(--space-4)',
            minWidth: 0,
          }}
        >
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono)',
              color: accent,
              fontWeight: 700,
              marginBottom: 'var(--space-2)',
            }}
          >
            {item.kicker}
          </div>
          <div
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.45,
              color: 'var(--cream)',
            }}
          >
            {item.body}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
