// @ts-nocheck
/**
 * AgentNode — outlined node used for L1 Managers and L2 Specialists in
 * the architecture diagram. Carries an optional layoutId so workflow
 * trace overlays (Zone H) can reference its on-screen position.
 *
 * Variants:
 *   - tier='L1': larger, sage-tinted, used for the 5 manager families
 *   - tier='L2': smaller, cream-tinted, used for the 3 visible specialists
 *
 * `lit` prop — when true, draws a sage glow + slightly brighter text
 * (used by Zone H's bucket-light cascade and review-gate flash).
 */

import React from 'react';
import { motion } from 'framer-motion';
import { EASE_EDITORIAL, DUR } from '../themes';

interface Props {
  tier: 'L1' | 'L2';
  name: string;       // e.g. "DataAgent"
  role: string;       // 1-line role
  layoutId?: string;
  lit?: boolean;
  alert?: boolean;    // amber accent (review-gate)
  delay?: number;
  go?: boolean;
}

export default function AgentNode({
  tier,
  name,
  role,
  layoutId,
  lit = false,
  alert = false,
  delay = 0,
  go = true,
}: Props) {
  const isL1 = tier === 'L1';
  const accent = alert ? 'var(--alert, #E8B547)' : 'var(--case, #7BAE7F)';
  const padding = isL1 ? '10px 14px' : '8px 12px';
  const titleSize = isL1 ? 13 : 11;
  const roleSize = isL1 ? 10 : 9;

  return (
    <motion.div
      layoutId={layoutId}
      initial={go ? { opacity: 0, y: -6 } : false}
      animate={{
        opacity: 1,
        y: 0,
        boxShadow: lit
          ? `0 0 0 1px ${accent}, 0 0 24px color-mix(in srgb, ${accent} 50%, transparent)`
          : 'none',
      }}
      transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay }}
      style={{
        width: '100%',
        height: '100%',
        boxSizing: 'border-box',
        border: `1.5px solid ${alert ? accent : (lit ? accent : 'color-mix(in srgb, var(--case, #7BAE7F) 45%, transparent)')}`,
        borderRadius: 6,
        background: lit
          ? `color-mix(in srgb, ${accent} 14%, var(--bg, #0D1B2A))`
          : 'color-mix(in srgb, var(--bg, #0D1B2A) 92%, transparent)',
        padding,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: titleSize,
          fontWeight: 600,
          color: lit ? 'var(--cream, #F5F0E8)' : 'color-mix(in srgb, var(--cream, #F5F0E8) 88%, transparent)',
          letterSpacing: '0.02em',
          marginBottom: 2,
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: '"IBM Plex Sans", sans-serif',
          fontSize: roleSize,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 55%, transparent)',
          letterSpacing: '0.04em',
          lineHeight: 1.3,
        }}
      >
        {role}
      </div>
    </motion.div>
  );
}
