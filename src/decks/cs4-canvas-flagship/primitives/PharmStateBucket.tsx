// @ts-nocheck
/**
 * PharmStateBucket — one tile in the typed-shared-state bus at the
 * bottom of the architecture diagram. Six instances total (Context,
 * Dataset, NCA, Modeling, QC, Audit).
 *
 * `lit` — when true, sage glow + bright label, used by Zone H's
 * cascade of bucket lights as the workflow trace progresses.
 *
 * The 34 individual fields inside each bucket stay internal to the
 * manuscript — IP firewall enforced.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { EASE_EDITORIAL, DUR } from '../themes';

interface Props {
  label: string;
  lit?: boolean;
  delay?: number;
  go?: boolean;
}

export default function PharmStateBucket({
  label,
  lit = false,
  delay = 0,
  go = true,
}: Props) {
  return (
    <motion.div
      initial={go ? { opacity: 0, y: 6 } : false}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: lit
          ? '0 0 0 1px var(--case, #7BAE7F), 0 0 28px color-mix(in srgb, var(--case, #7BAE7F) 55%, transparent)'
          : 'none',
        background: lit
          ? 'color-mix(in srgb, var(--case, #7BAE7F) 18%, var(--bg, #0D1B2A))'
          : 'color-mix(in srgb, var(--bg, #0D1B2A) 88%, transparent)',
      }}
      transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay }}
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `1.5px solid ${lit ? 'var(--case, #7BAE7F)' : 'color-mix(in srgb, var(--case, #7BAE7F) 35%, transparent)'}`,
        borderRadius: 4,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: lit ? 'var(--cream, #F5F0E8)' : 'color-mix(in srgb, var(--case, #7BAE7F) 80%, transparent)',
        }}
      >
        bucket
      </div>
      <div
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontSize: 18,
          fontWeight: 600,
          color: lit ? 'var(--cream, #F5F0E8)' : 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)',
          letterSpacing: '0.02em',
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
