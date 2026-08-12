// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

export default function XencorWordmark({
  layoutId = 'xencor-wordmark',
  color = 'var(--cream-muted)',
  width = 'clamp(160px, 16vw, 260px)',
  restOpacity = 0.9,
  persistent = false,
  go = true,
}: any) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={persistent ? false : { opacity: 0, y: -6 }}
      animate={go ? { opacity: restOpacity, y: 0 } : { opacity: restOpacity, y: 0 }}
      transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1] }}
      className="deck-display"
      style={{
        width,
        color,
        fontWeight: 700,
        letterSpacing: '0.02em',
        lineHeight: 1,
        textAlign: 'right',
      }}
      aria-label="Xencor"
    >
      <span style={{ display: 'block', fontSize: 'clamp(1.6rem, 2.4vw, 3.1rem)' }}>
        Xencor
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          display: 'block',
          marginTop: '0.25rem',
          fontSize: 'clamp(0.48rem, 0.58vw, 0.72rem)',
          letterSpacing: '0.18em',
          color: 'color-mix(in srgb, currentColor 76%, transparent)',
        }}
      >
        Biopharmaceuticals
      </span>
    </motion.div>
  );
}
