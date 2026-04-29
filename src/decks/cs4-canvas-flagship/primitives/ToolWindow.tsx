// @ts-nocheck
/**
 * ToolWindow — outlined tool-name tile used in the C2 hook
 * constellation. Six instances (NONMEM, PsN, R, Excel, Python, NCA)
 * surround the analyst silhouette with broken dashed sage lines
 * suggesting failed automation.
 *
 * Visual: cream-stroke outlined rect with cream label inside, mono.
 * 70% opacity per brief — the tools aren't the point; the broken
 * connections between them are.
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_EDITORIAL, DUR } from '../themes';

interface Props {
  label: string;
  /** Position inside the parent (Zone A). */
  x: number;
  y: number;
  /** Stagger index for fade-in (0..5 expected). */
  index?: number;
  width?: number;
  height?: number;
}

export default function ToolWindow({
  label,
  x,
  y,
  index = 0,
  width = 180,
  height = 72,
}: Props) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      initial={reduce ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 0.7, y: 0 }}
      transition={{
        duration: reduce ? 0 : DUR.standard,
        delay: reduce ? 0 : 0.4 + index * 0.25,
        ease: EASE_EDITORIAL,
      }}
      style={{
        position: 'absolute',
        left: x,
        top: y,
        width,
        height,
        border: '1px solid color-mix(in srgb, var(--cream, #F5F0E8) 50%, transparent)',
        borderRadius: 4,
        background: 'color-mix(in srgb, var(--bg, #0D1B2A) 60%, transparent)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        // The window-chrome bar at top
      }}
    >
      {/* Faux window controls — 3 tiny dots */}
      <div
        style={{
          position: 'absolute',
          top: 8,
          left: 10,
          display: 'flex',
          gap: 4,
        }}
      >
        {[0, 1, 2].map((i) => (
          <div
            key={i}
            style={{
              width: 6,
              height: 6,
              borderRadius: '50%',
              background: 'color-mix(in srgb, var(--cream, #F5F0E8) 40%, transparent)',
            }}
          />
        ))}
      </div>

      <div
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 22,
          color: 'var(--cream, #F5F0E8)',
          letterSpacing: '0.04em',
          marginTop: 8,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}
