import React from 'react';
import { motion } from 'framer-motion';
import LungsDiagram from './LungsDiagram';

/**
 * LungsShared — literal port of v0's shared lung pattern
 * (4-Apps/1_Inbox/V0/.../slides/CaseDividerSlide.tsx + LungContextSlide.tsx).
 *
 * Both slide 5 (divider) and slide 6 (background) render this component
 * with the same layoutId. framer-motion matches the two instances across
 * AnimatePresence mode="sync" and morphs the bounding box between them.
 *
 * No initial/animate on the motion.div itself — the layoutId match is the
 * entrance animation. Adding initial/animate would produce a competing
 * opacity/scale animation that fights the morph and manifests as
 * "the lung disappears / pops in" artifacts.
 *
 * Spring config matches v0 exactly (1s cubic-bezier) so feel is identical.
 */
const LAYOUT_TRANSITION = { duration: 1, ease: [0.4, 0, 0.2, 1] };

export default function LungsShared({ layoutId = 'lung-lynch' }) {
  return (
    <motion.div
      layoutId={layoutId}
      transition={{ layout: LAYOUT_TRANSITION }}
      style={{ width: '100%', height: '100%' }}
    >
      <LungsDiagram />
    </motion.div>
  );
}
