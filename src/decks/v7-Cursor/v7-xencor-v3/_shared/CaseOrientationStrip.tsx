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
  delay = 0.85,
  reduced: reducedProp,
  className = '',
}) {
  const reducedMotion = useReducedMotion();
  const reduced = reducedProp ?? reducedMotion;

  return (
    <motion.div
      className={`case-orientation-strip ${className}`.trim()}
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        width: '100%',
      }}
    >
      {items.map((item, i) => (
        <motion.div
          key={item.kicker}
          initial={reduced ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: delay + 0.08 * i, ease: EASE }}
          style={{
            border: '1px solid var(--cream-hairline)',
            borderTop: `3px solid ${accent}`,
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
            padding: 'var(--space-3) var(--space-4)',
            minWidth: 0,
          }}
        >
          <div
            className="xc-eyebrow"
            style={{
              color: accent,
              marginBottom: 'var(--space-2)',
            }}
          >
            {item.kicker}
          </div>
          <div
            className="xc-tagline xc-ink"
            style={{ opacity: 0.9 }}
          >
            {item.body}
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
}
