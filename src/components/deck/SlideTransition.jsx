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
// forwardRef is required because DeckRunner wraps this in
// <AnimatePresence mode="popLayout">, which internally wraps each child in
// a PopChild component that needs to forward a ref to the underlying DOM
// node so it can measure and position the exiting slide out-of-flow.
// Without forwardRef, React logs "Function components cannot be given refs"
// and popLayout can't synthesize the shared-element (layoutId) morph.
const SlideTransition = React.forwardRef(function SlideTransition(
  { transition, children },
  forwardedRef,
) {
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
  // position:absolute + inset:0 means consecutive slides (exiting and
  // entering under AnimatePresence mode="sync") stack at the same
  // coordinates instead of flowing vertically. That stacking is what
  // makes cross-slide layoutId morphs actually work — both endpoints
  // are on screen simultaneously while framer-motion animates the
  // shared element between them.
  const stackStyle = { position: 'absolute', inset: 0 };

  const outerStyle = is3D && !prefersReduced
    ? {
        ...stackStyle,
        perspective: 'clamp(1400px, 180vw, 2600px)',
        perspectiveOrigin: '50% 50%',
        transformStyle: 'preserve-3d',
      }
    : stackStyle;

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

  // Pass the forwarded ref to the OUTER element so framer-motion can
  // measure it for AnimatePresence bookkeeping. For 3D presets the outer
  // is a plain div (perspective container); for simple presets the outer
  // IS the motion.div.
  //
  // `layout` prop: tells framer-motion to track layout changes on this
  // wrapper AND its descendants. Required so that shared-element layoutId
  // morphs (e.g. the Lynch lung between slides 5 and 6) have correct
  // old/new bbox measurements even when nested inside multiple motion
  // layers. Without it, the shared element renders but doesn't morph.
  //
  // `transition.layout` gives layout animations their own timing window
  // separate from the slide's fade/slide-in exit — so the shared-element
  // morph can run longer (0.8s smooth) than the slide fade.
  const layoutTransition = prefersReduced
    ? { duration: 0 }
    : { duration: 0.8, ease: [0.4, 0, 0.2, 1] };

  const motionLayer = (
    <motion.div
      ref={is3D ? undefined : forwardedRef}
      layout
      initial={applied.initial}
      animate={applied.animate}
      exit={applied.exit}
      transition={{ ...applied.transition, layout: layoutTransition }}
      style={innerStyle}
    >
      {children}
    </motion.div>
  );

  if (!is3D || prefersReduced) return motionLayer;

  return <div ref={forwardedRef} style={outerStyle}>{motionLayer}</div>;
});

export default SlideTransition;