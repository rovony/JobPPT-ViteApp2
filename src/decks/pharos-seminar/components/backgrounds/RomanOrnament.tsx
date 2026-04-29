// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../motion';

/**
 * RomanOrnament — oversized faint Roman numeral behind slide content.
 * Per Amendment 1 §5: "II" for slide 06 (Movement 2 transition), "III"
 * for slide 12.5 (Movement 3 marker).
 *
 * Renders centered, anchored to the lower-left third so it does not
 * compete with headlines. Default opacity 4% — barely there.
 */

type Numeral = 'I' | 'II' | 'III' | 'IV' | 'V';

type Props = {
  numeral: Numeral;
  opacity?: number;
  /** Fraction of slide height occupied by the numeral. Default 0.85. */
  scale?: number;
};

export default function RomanOrnament({
  numeral,
  opacity = 0.04,
  scale = 0.85,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingRight: '6vw',
      }}
    >
      <motion.span
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity, scale: 1 }}
        transition={{ delay: 0.30, duration: 1.2, ease: EASE.expoOut }}
        className="deck-display"
        style={{
          fontSize: `${scale * 100}vh`,
          fontWeight: 200,
          color: 'var(--cream)',
          letterSpacing: '-0.06em',
          lineHeight: 0.85,
          fontStyle: 'italic',
          fontFamily: 'var(--font-display, serif)',
        }}
      >
        {numeral}
      </motion.span>
    </div>
  );
}
