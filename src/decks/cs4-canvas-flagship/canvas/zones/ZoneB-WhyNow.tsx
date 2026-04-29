// @ts-nocheck
/**
 * Zone B — Camera 3 · Why now · ICH M15
 *
 * Layout (1920×1080 inside ZONE_BOUNDS.B):
 *
 *   Eyebrow:        AI/ML now in regulatory scope
 *
 *   Headline:       23 July 2026
 *                   ───── (sage hairline draws on after date settles)
 *
 *   Body:           ICH M15 was adopted at Step 4 on 29 January 2026
 *                   and is effective in the EU on 23 July 2026.
 *
 *                   The integration layer we just looked at is no
 *                   longer just a productivity problem — it's a
 *                   compliance problem in twelve weeks.
 *
 *   Citation:       ICH M15 · Step 4 · CHMP adopted · effective EU 2026-07-23
 *
 * Cinematic on arrival:
 *   1. Eyebrow fades in (200ms)
 *   2. "23" ticks 22 → 23 over 800ms (NumberTicker on the day)
 *      "July 2026" fades in alongside
 *   3. Sage hairline width animates 0 → 240px (400ms)
 *   4. Body copy fades in (400ms after hairline)
 *   5. Citation footer fades in (200ms after body)
 */

import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ZONE_BOUNDS, M15_DATE } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import NumberTicker from '../../primitives/NumberTicker';
import { useCanvasCamera } from '../CameraController';

const Z = ZONE_BOUNDS.B;

export default function ZoneBWhyNow() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 3;

  return (
    <div
      data-zone="B"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        padding: '120px 140px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.3 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 0.1 : 0 }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 14,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 32,
        }}
      >
        AI / ML now in regulatory scope
      </motion.div>

      {/* Date display — the headline */}
      <div
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 132,
          lineHeight: 1.0,
          color: 'var(--cream, #F5F0E8)',
          letterSpacing: '-0.015em',
          marginBottom: 28,
          display: 'flex',
          alignItems: 'baseline',
          gap: 24,
        }}
      >
        <NumberTicker
          from={22}
          to={M15_DATE.day}
          duration={0.8}
          delay={0.4}
          go={active}
          color="var(--case, #7BAE7F)"
          fontSize={132}
          style={{ minWidth: '2ch' }}
        />
        <motion.span
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: active ? 1 : 0.3 }}
          transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: 0.4 }}
          style={{ color: 'var(--cream, #F5F0E8)' }}
        >
          {M15_DATE.month} {M15_DATE.year}
        </motion.span>
      </div>

      {/* Sage hairline — draws on after the date settles */}
      <motion.div
        initial={reduce ? false : { width: 0 }}
        animate={{ width: active ? 240 : 0 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 1.4 : 0 }}
        style={{
          height: 2,
          background: 'var(--case, #7BAE7F)',
          marginBottom: 56,
        }}
      />

      {/* Body copy */}
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: active ? 1 : 0.3, y: 0 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 1.8 : 0 }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontSize: 32,
          lineHeight: 1.45,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 92%, transparent)',
          maxWidth: '38ch',
          marginBottom: 32,
        }}
      >
        ICH M15 was adopted at Step 4 on 29&nbsp;January&nbsp;2026 and is
        effective in the EU on{' '}
        <span style={{ color: 'var(--case, #7BAE7F)' }}>{M15_DATE.fullText}</span>.
      </motion.div>

      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 0.85 : 0.25 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 2.2 : 0 }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontSize: 24,
          lineHeight: 1.45,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 70%, transparent)',
          maxWidth: '46ch',
          fontStyle: 'italic',
          marginBottom: 56,
        }}
      >
        The integration layer we just looked at is no longer just a
        productivity problem — it&apos;s a compliance problem in
        twelve weeks.
      </motion.div>

      {/* Citation */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 0.6 : 0.15 }}
        transition={{ duration: DUR.standard, ease: EASE_EDITORIAL, delay: active ? 2.6 : 0 }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12,
          letterSpacing: '0.06em',
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)',
        }}
      >
        {M15_DATE.citation}
      </motion.div>
    </div>
  );
}
