import React from 'react';
import { motion } from 'framer-motion';
import { resolveTransition, THREE_D_PRESETS } from '@/lib/slide-transitions';

/**
 * SlideTransition — wraps a slide in a motion container that runs the
 * configured enter/exit animation. The preset (or custom variants) is
 * resolved from the slide manifest's `transition` field.
 *
 * 3D presets ('canvas-pan', 'canvas-cube', 'canvas-flip', 'canvas-depth')
 * additionally get:
 *   • a perspective container (outer div) — so rotateX/rotateY/translateZ
 *     actually render as depth instead of collapsing flat.
 *   • `transform-style: preserve-3d` and `backface-visibility: hidden` on
 *     the moving layer — keeps compositing on the GPU and prevents the
 *     back of a rotated panel from flashing through.
 *
 * Perspective scales with viewport so the effect feels right on phones
 * and on big projection screens. No hardcoded pixels.
 *
 * Respects prefers-reduced-motion: if the user prefers reduced motion,
 * we collapse to a zero-duration fade so nothing slides, zooms, or rotates.
 */
export default function SlideTransition({ transition, children }) {
  const variants = resolveTransition(transition);
  const is3D = typeof transition === 'string' && THREE_D_PRESETS.has(transition);

  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

  const applied = prefersReduced
    ? {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.15 },
      }
    : variants;

  // Perspective container — only created for 3D presets so the simple
  // fade/slide presets don't pay the cost of a stacking-context change.
  // 2400px is the sweet spot for a 1920×1080 canvas: enough depth that
  // translateZ reads as real distance, not so aggressive that text
  // distorts when a slide rotates 90° (cube). Below ~1800px text gets
  // keystoned at large rotations; above ~3000px the depth flattens out.
  // We clamp the lower bound for narrow viewports (phones) where 2400px
  // would feel too "telescoped" relative to the ~360px stage width.
  const outerStyle = is3D && !prefersReduced
    ? {
        width: '100%',
        height: '100%',
        perspective: 'clamp(1400px, 180vw, 2600px)',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }
    : { width: '100%', height: '100%' };

  const innerStyle = is3D && !prefersReduced
    ? {
        width: '100%',
        height: '100%',
        transformStyle: 'preserve-3d',
        backfaceVisibility: 'hidden',
        WebkitBackfaceVisibility: 'hidden',
        // transformPerspective on the moving layer ensures the perspective
        // applies even if a parent stacking context (e.g. the AnimatePresence
        // wrapper, or a fixed-position deck stage) flattens the parent's
        // perspective. Belt + suspenders so the 3D never collapses.
        transformPerspective: 2400,
        willChange: 'transform, opacity',
      }
    : { width: '100%', height: '100%' };

  const motionLayer = (
    <motion.div
      initial={applied.initial}
      animate={applied.animate}
      exit={applied.exit}
      transition={applied.transition}
      style={innerStyle}
    >
      {children}
    </motion.div>
  );

  if (!is3D || prefersReduced) return motionLayer;

  return <div style={outerStyle}>{motionLayer}</div>;
}