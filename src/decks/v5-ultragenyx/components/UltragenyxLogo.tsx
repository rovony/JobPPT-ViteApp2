// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import LogoSvg from '../assets/ultragenyx-logo.svg?react';

/**
 * UltragenyxLogo — wordmark + ring symbol for the V5-Ultragenyx cover.
 *
 * Theme-aware: SVG fills are all currentColor, driven by the parent's
 * `color` style. Background rectangle stripped from source SVG; letter
 * inner cutouts kept as fill="none" so the dark deck background reads
 * through them naturally.
 *
 * Motion grammar borrowed from `Lungs.tsx` and `IndiaMap.tsx`:
 *   - Single one-shot entry (scale 0.96 → 1, opacity 0 → target) over ~1.0s
 *   - Gentle idle "breath" — opacity oscillation that respects
 *     prefers-reduced-motion
 *   - All animation gated behind useReducedMotion(); reduced-motion users
 *     see only the resting state.
 *
 * Cross-slide FLIP morph (lung-pattern):
 *   Pass the same `layoutId` on multiple slides — framer-motion will
 *   FLIP-animate from the source bounding box to the destination box
 *   across the slide transition. The destination slide MUST pass
 *   `persistent={true}` to skip the entry scale/opacity animation so
 *   the morph isn't compounded with a fade-in (per merck-deck CLAUDE.md
 *   "Cross-Slide Layout Morphing — Persistent Components").
 *
 * Color: defaults to var(--cream-faint) so the wordmark sits as
 * editorial chrome — present but not competing with the title for
 * attention. Override via the `color` prop.
 */

const ENTRY_EASE = [0.4, 0, 0.2, 1] as const;
const LAYOUT_TRANSITION = { duration: 1.4, ease: [0.4, 0, 0.2, 1] };

export type UltragenyxLogoProps = {
  /** CSS color (token or value) used for the entire logo. Default cream-faint. */
  color?: string;
  /** Width clamp string. Default scales 92px → 160px. */
  width?: string;
  /** Resting opacity (after entry settles). Default 0.85. */
  restOpacity?: number;
  /** Show idle breathing pulse. Default true. */
  idle?: boolean;
  /** Gate motion to in-view trigger from parent. Default true. */
  go?: boolean;
  /** Shared layout ID for cross-slide FLIP morph. Optional. */
  layoutId?: string;
  /**
   * When true: this is a DESTINATION slide for a layoutId morph — skip
   * entry scale/opacity so framer-motion's FLIP isn't compounded with
   * a fade-in (would flicker). Source slides leave this false.
   */
  persistent?: boolean;
};

export default function UltragenyxLogo({
  color = 'var(--cream-faint)',
  width = 'clamp(92px, 11vw, 160px)',
  restOpacity = 0.85,
  idle = true,
  go = true,
  layoutId,
  persistent = false,
}: UltragenyxLogoProps) {
  const prefersReduced = useReducedMotion();
  const animateMotion = go && !prefersReduced;
  const idleMotion = animateMotion && idle;

  // Persistent destination: start at final state, no entry tween.
  // Source / standalone: gentle scale+fade entry.
  const initial = persistent
    ? { opacity: restOpacity, scale: 1 }
    : { opacity: 0, scale: 0.96 };

  // Build the animate object — idle pulse only when not persistent OR
  // when we want the destination to also breathe.
  const animate = idleMotion
    ? {
        opacity: [restOpacity * 0.82, restOpacity, restOpacity * 0.82],
        scale: 1,
      }
    : { opacity: restOpacity, scale: 1 };

  const transition = idleMotion
    ? {
        opacity: {
          duration: 6.5,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: persistent ? 0.2 : 1.0,
        },
        scale: { duration: persistent ? 0 : 1.0, ease: ENTRY_EASE, delay: persistent ? 0 : 0.4 },
      }
    : { duration: persistent ? 0 : 1.0, ease: ENTRY_EASE, delay: persistent ? 0 : 0.4 };

  return (
    <motion.div
      aria-label="Ultragenyx"
      role="img"
      layoutId={layoutId}
      layout={layoutId ? true : undefined}
      style={{
        color,
        width,
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        lineHeight: 0,
      }}
      initial={initial}
      animate={animate}
      transition={transition}
      /* layout transition controls the FLIP morph (size + position).
         Separate from the opacity/scale tween above. */
      {...(layoutId ? { transitionLayout: LAYOUT_TRANSITION } : {})}
    >
      <LogoSvg
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
          /* SVG inherits currentColor from the wrapper's `color` style */
          fill: 'currentColor',
        }}
      />
    </motion.div>
  );
}
