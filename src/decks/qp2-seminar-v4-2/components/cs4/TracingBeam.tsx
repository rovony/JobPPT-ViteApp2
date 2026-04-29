// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * TracingBeam — right-edge progress ribbon shared across the CS4 arc.
 *
 * Decision (parent, 2026-04-29): rather than lifting the beam into the
 * deck shell (`Slide.tsx` / `DeckRunner.tsx`), we keep it inside CS4 by
 * having every CS4 body slide render its OWN `<TracingBeam progress=…/>`
 * with a shared `layoutId="cs4-deck-beam"` on the inner element.
 *
 * Framer Motion's shared-layout system then morphs the beam between
 * slides — same DOM identity, growing fill — so the user perceives one
 * continuous beam tracing as the speaker advances. The beam STARTS on
 * cs4-objective (S2 · arc index 1) and COMPLETES on cs4-closer (S13 ·
 * arc index 12). On cs4-divider (S1) we render nothing.
 *
 * Each instance has:
 *   • A shared track (1px hairline)
 *   • A shared progress fill (gradient amber, layoutId='cs4-deck-beam')
 *   • A shared end-cap dot (layoutId='cs4-deck-beam-tip')
 *
 * The fill's height % maps to progress * 100, so when the beam mounts
 * on the next slide it morphs from the previous height into the new
 * one — that's the "continuity" illusion.
 */

export default function TracingBeam({ progress = 0, go = true }) {
  const reduce = useReducedMotion();
  const target = Math.max(0, Math.min(1, progress));
  if (target <= 0) return null;

  const transition = reduce
    ? { duration: 0 }
    : { duration: 0.9, ease: [0.2, 0.7, 0.3, 1] };

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 'var(--deck-pad-top, 4vh)',
        bottom: 'var(--deck-pad-bottom, 6vh)',
        right: 'clamp(8px, 1vw, 16px)',
        width: 2,
        zIndex: 1,
        pointerEvents: 'none',
      }}
    >
      {/* Shared track — non-morphing background. */}
      <span
        style={{
          position: 'absolute',
          inset: 0,
          width: 1,
          left: '50%',
          transform: 'translateX(-50%)',
          background: 'color-mix(in srgb, var(--cream-faint) 35%, transparent)',
        }}
      />
      {/* Shared fill — layoutId continuity → morph between slides. */}
      <motion.span
        layoutId="cs4-deck-beam"
        layout
        transition={transition}
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 2,
          height: `${target * 100}%`,
          background:
            'linear-gradient(to bottom, color-mix(in srgb, var(--amber) 90%, transparent), color-mix(in srgb, var(--amber) 40%, transparent))',
          boxShadow: '0 0 8px color-mix(in srgb, var(--amber) 35%, transparent)',
        }}
      />
      {/* Shared tip — same layoutId family so it travels too. */}
      <motion.span
        layoutId="cs4-deck-beam-tip"
        layout
        transition={transition}
        style={{
          position: 'absolute',
          left: '50%',
          top: `calc(${target * 100}% - 5px)`,
          transform: 'translateX(-50%)',
          width: 8,
          height: 8,
          borderRadius: '50%',
          background: 'var(--amber)',
          boxShadow: '0 0 12px color-mix(in srgb, var(--amber) 60%, transparent)',
        }}
      />
    </div>
  );
}

/**
 * Helper: per-slide progress fraction for the 13-slide CS4 arc.
 *   index 0  (divider)   → 0      (don't render)
 *   index 1  (objective) → 1/12   (start drawing)
 *   index 12 (closer)    → 1      (complete)
 */
export function cs4Progress(arcIndex: number): number {
  if (arcIndex <= 0) return 0;
  return Math.max(0, Math.min(1, arcIndex / 12));
}
