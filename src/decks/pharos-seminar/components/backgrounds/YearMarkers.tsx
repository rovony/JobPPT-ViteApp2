// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../../motion';

/**
 * YearMarkers — faint year badges across the slide background.
 * Per Amendment 1 §5 row "Hook": 2014 · 2018 · 2022 · 2026 at ~6% opacity.
 *
 * Each year fades in with a small cascade, so the strip reads as a
 * timeline rather than a label. Years are positioned at evenly-spaced
 * vertical bands across the slide.
 */

type Props = {
  years?: number[];
  opacity?: number;
};

const DEFAULT_YEARS = [2014, 2018, 2022, 2026];

export default function YearMarkers({
  years = DEFAULT_YEARS,
  opacity = 0.06,
}: Props) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around',
        padding: '0 12vw',
      }}
    >
      {years.map((y, i) => (
        <motion.span
          key={y}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 + i * 0.15, duration: 0.7, ease: EASE.expoOut }}
          className="deck-display"
          style={{
            fontSize: 'clamp(80px, 11vw, 180px)',
            fontWeight: 200,
            color: 'var(--cream)',
            letterSpacing: '-0.04em',
            lineHeight: 1,
          }}
        >
          {y}
        </motion.span>
      ))}
    </div>
  );
}
