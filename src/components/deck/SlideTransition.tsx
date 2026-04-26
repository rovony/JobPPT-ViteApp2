// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { resolveTransition, THREE_D_PRESETS } from '@/lib/slide-transitions';

/**
 * SlideTransition — literal port of v0's TransitionWrapper pattern
 * (4-Apps/1_Inbox/V0/.../transitions/TransitionWrapper.tsx) which is the
 * known-working implementation of cross-slide shared-element transitions
 * via framer-motion layoutId.
 *
 * Key rules we adopted from v0 and must NOT drift away from:
 *   1. Each slide is absolutely positioned (inset:0) so consecutive slides
 *      stack at the same coordinates under AnimatePresence mode="sync".
 *   2. The slide wrapper uses a PURE FADE by default — no x/y translate —
 *      so the shared-element (layoutId) morph inside it isn't mis-measured
 *      by an additional transform on the wrapper.
 *   3. The wrapper has the `layout` prop so framer-motion tracks layout
 *      changes in its subtree; otherwise nested layoutId morphs can render
 *      but not animate.
 *   4. Layout animations get their own duration (0.8s cubic-bezier),
 *      separate from the slide fade (0.4s).
 *
 * 3D presets (canvas-pan/cube/flip/depth) still opt into their perspective
 * containers — they don't use layoutId so the extra transforms are fine.
 */
// Incoming slides appear at full opacity immediately. The flicker of
// the lung during 5->6 was coming from slide 6's wrapper fading in
// from opacity:0 — while its own layoutId-morphing lung inherited the
// low opacity for the first ~150ms, reading as "disappear briefly."
// Only the EXIT fades. The entering slide is visible the moment it
// mounts, so the shared lung's layoutId morph is never hidden.
const DEFAULT_FADE = {
  initial: { opacity: 1 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  transition: { duration: 0.4, ease: [0.4, 0, 0.2, 1] },
};

const LAYOUT_TRANSITION = { duration: 0.8, ease: [0.4, 0, 0.2, 1] };

const SlideTransition = React.forwardRef(function SlideTransition(
  { transition, children },
  forwardedRef,
) {
  const is3D = typeof transition === 'string' && THREE_D_PRESETS.has(transition);

  // 3D presets keep their full perspective/transform machinery. They
  // explicitly do NOT participate in layoutId morphs, so the extra
  // wrapper layers are fine.
  if (is3D) {
    const variants = resolveTransition(transition);
    return (
      <div
        ref={forwardedRef}
        style={{
          position: 'absolute',
          inset: 0,
          perspective: 'clamp(1400px, 180vw, 2600px)',
          perspectiveOrigin: '50% 50%',
          transformStyle: 'preserve-3d',
        }}
      >
        <motion.div
          initial={variants.initial}
          animate={variants.animate}
          exit={variants.exit}
          transition={variants.transition}
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transformPerspective: 2400,
            willChange: 'transform, opacity',
          }}
        >
          {children}
        </motion.div>
      </div>
    );
  }

  // Non-3D path: pure fade + absolute stacking + layout prop.
  return (
    <motion.div
      ref={forwardedRef}
      layout
      initial={DEFAULT_FADE.initial}
      animate={DEFAULT_FADE.animate}
      exit={DEFAULT_FADE.exit}
      transition={{ ...DEFAULT_FADE.transition, layout: LAYOUT_TRANSITION }}
      style={{ position: 'absolute', inset: 0 }}
    >
      {children}
    </motion.div>
  );
});

export default SlideTransition;
