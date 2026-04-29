// @ts-nocheck
/**
 * TitleCard — Camera 1 content. The TITLE region of the canvas (per
 * ZONE_BOUNDS.TITLE in data.ts).
 *
 * Visual (per build-brief storyboard):
 *
 *   AI/ML in clinical
 *     pharmacology
 *
 *   ────────                ← sage hairline (carries to C2 as canvas spine)
 *
 *   a working architecture —
 *   and what we learned building it
 *
 *                           CS4 · Flagship   ← mono micro-text
 *
 * Editorial restraint:
 *   • Source Serif Pro 600 weight on the display title (no bold 700+)
 *   • Sentence case
 *   • Single sage hairline accent
 *   • No bounce, no overshoot
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_EDITORIAL, DUR } from '../../themes';
import { ZONE_BOUNDS } from '../../data';

const Z = ZONE_BOUNDS.TITLE;

export default function TitleCard() {
  const reduce = useReducedMotion();

  return (
    <div
      data-zone="TITLE"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        // Center stack, left-aligned text inside a centered column
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '0 220px',
      }}
    >
      <motion.h1
        initial={reduce ? false : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : DUR.slow, ease: EASE_EDITORIAL, delay: 0.3 }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 88,
          lineHeight: 1.05,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          marginBottom: 56,
          letterSpacing: '-0.01em',
        }}
      >
        AI/ML in clinical<br />pharmacology
      </motion.h1>

      {/* Sage hairline — the spine seed. Will visually extend into C2
          as the canvas pans right; right now it's just a static
          hairline. We don't use a layoutId here because the spine
          isn't a physically-shared DOM node across cameras — it's
          rendered fresh per zone. The continuity is conceptual. */}
      <motion.div
        initial={reduce ? false : { width: 0 }}
        animate={{ width: 200 }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 1.0 }}
        style={{
          height: 2,
          background: 'var(--case, #7BAE7F)',
          marginBottom: 36,
        }}
      />

      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 1.4 }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 400,
          fontSize: 32,
          lineHeight: 1.4,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)',
          maxWidth: '52ch',
          fontStyle: 'italic',
        }}
      >
        a working architecture —<br />
        and what we learned building it
      </motion.div>

      {/* Bottom-right mono micro-text */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 1.8 }}
        style={{
          position: 'absolute',
          right: 220,
          bottom: 80,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 14,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
          color: 'color-mix(in srgb, var(--case, #7BAE7F) 80%, transparent)',
        }}
      >
        CS4 · Flagship
      </motion.div>
    </div>
  );
}
