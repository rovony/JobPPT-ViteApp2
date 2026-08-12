// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/** Neutral seminar mark — no company branding. */
export default function VirWordmark({
  layoutId = 'vir-wordmark',
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
      aria-label="Clinical Pharmacology seminar"
    >
      <span style={{ display: 'block', fontSize: 'clamp(1.1rem, 1.6vw, 1.85rem)' }}>
        Clinical
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
        Pharmacology
      </span>
    </motion.div>
  );
}
