// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../motion';

/**
 * CentralHairline — a single horizontal hairline that draws across the
 * slide on entrance, then sits as a quiet divider behind the content.
 * Per Amendment 1 §5 row "Gap": slide 05 background.
 *
 * Used by the A4 Decisive-Move slide-05 to separate the three-line
 * sparse hero into a "before / after" optical register.
 */

type Props = {
  delay?: number;
  durationS?: number;
  /** 0..1 vertical position. Default 0.55 (slightly below mid). */
  y?: number;
  opacity?: number;
};

export default function CentralHairline({
  delay = 0.15,
  durationS = 1.1,
  y = 0.55,
  opacity = 0.42,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
      }}
    >
      <motion.div
        initial={{ scaleX: 0 }}
        animate={{ scaleX: 1 }}
        transition={{ delay, duration: durationS, ease: EASE.expoOut }}
        style={{
          position: 'absolute',
          left: '8%',
          right: '8%',
          top: `${y * 100}%`,
          height: 1,
          background: 'var(--cream-hairline)',
          opacity,
          transformOrigin: 'left',
        }}
      />
    </div>
  );
}
