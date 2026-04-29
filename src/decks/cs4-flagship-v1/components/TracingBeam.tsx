// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { EASE_EDITORIAL, DUR, SHARED_LAYOUT_IDS } from '../themes';

/**
 * TracingBeam — the continuous sage hairline that runs vertically along
 * the left rail of every CS4 slide.
 *
 * The beam tells the audience "we are X of 10 slides into one continuous
 * argument." Implementation follows the Antigravity FLIP protocol:
 *
 *   • Track + fill + head all carry shared `layoutId`s.
 *   • Each slide renders its own instance with its own `segment` index.
 *   • Framer Motion physically interpolates the bbox between instances
 *     during slide transitions — no jump, only continuous motion.
 *
 * Visual grammar (Zaj editorial):
 *   • 1px hairline (no glow, no gradient — editorial restraint)
 *   • Track: case-color at 12% alpha (color-mix)
 *   • Fill: case-color at 100%
 *   • Head: 8px sage dot at the current position, single soft halo
 *   • Position: left rail, between deck-gutter and the headline column
 *
 * Props:
 *   segment       — 1..totalSegments (which slide this is)
 *   totalSegments — total slides in the deck (default 10)
 *   side          — 'left' | 'right' (default 'left')
 */
export default function TracingBeam({
  segment,
  totalSegments = 10,
  side = 'left',
}) {
  const reduce = useReducedMotion();
  const fillRatio = Math.max(0, Math.min(1, segment / totalSegments));

  // Position the rail just inside the deck gutter — close enough to
  // feel attached to the page architecture, far enough that body
  // text never bumps into it.
  const railOffset = 'calc(var(--deck-gutter) - 1.25rem)';
  const sideStyle = side === 'right' ? { right: railOffset } : { left: railOffset };

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 'var(--deck-pad-top, 6vh)',
        bottom: 'var(--deck-pad-bottom, 6vh)',
        ...sideStyle,
        width: 1,
        pointerEvents: 'none',
        zIndex: 1,
      }}
    >
      {/* Track — faint sage backdrop running the full height */}
      <motion.div
        layoutId={`${SHARED_LAYOUT_IDS.beam}-track`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          background: 'color-mix(in srgb, var(--case) 14%, transparent)',
        }}
      />

      {/* Fill — opaque sage from top down to the current segment */}
      <motion.div
        layoutId={`${SHARED_LAYOUT_IDS.beam}-fill`}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          background: 'var(--case)',
          transformOrigin: 'top',
        }}
        initial={reduce ? { height: `${fillRatio * 100}%` } : undefined}
        animate={{ height: `${fillRatio * 100}%` }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 0.15 }}
      />

      {/* Beam head — single sage dot at the current position. Carries
          its own layoutId so it slides smoothly between slides instead
          of jumping. The soft halo is the only "glow" in the editorial
          register — used once, deliberately, to mark "you are here." */}
      <motion.div
        layoutId={`${SHARED_LAYOUT_IDS.beam}-head`}
        style={{
          position: 'absolute',
          top: `${fillRatio * 100}%`,
          left: -3.5,
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--case)',
          boxShadow: '0 0 10px color-mix(in srgb, var(--case) 60%, transparent)',
          marginTop: -4,
        }}
        transition={{ duration: reduce ? 0 : DUR.standard, ease: EASE_EDITORIAL, delay: 0.15 }}
      />

      {/* Mono progress label — 'S{NN} / 10', sits just below the head.
          Tiny, mono, faint — does not compete with the slide content. */}
      <motion.div
        style={{
          position: 'absolute',
          top: `${fillRatio * 100}%`,
          left: 12,
          marginTop: 8,
          fontFamily: 'var(--font-mono)',
          fontSize: '0.65rem',
          letterSpacing: 'var(--ls-mono-wide, 0.12em)',
          color: 'color-mix(in srgb, var(--case) 70%, var(--cream-faint))',
          fontWeight: 500,
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
        initial={reduce ? { opacity: 1 } : { opacity: 0, x: -4 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: DUR.quick, ease: EASE_EDITORIAL, delay: 0.50 }}
      >
        S{String(segment).padStart(2, '0')} / {totalSegments}
      </motion.div>
    </div>
  );
}
