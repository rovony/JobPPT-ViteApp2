import React from 'react';
import { motion } from 'framer-motion';
import LungsDiagram from './LungsDiagram';

/**
 * LungsShared — Lynch lung with shared layoutId that morphs across slide 5
 * (divider, right-column small) and slide 6 (background, center big).
 * Literal port of v0's LungContextSlide pattern.
 *
 * CRITICAL: NO initial/animate prop. Adding `initial={{opacity:0}}` makes
 * the element invisible for the first N ms — framer-motion still runs the
 * layoutId morph in that window, but since the lung is invisible the user
 * sees nothing until opacity reaches 1, at which point the lung is already
 * at its new position. The result looks exactly like a jump-cut.
 *
 * The layoutId morph itself (1s cubic-bezier) is the animation. That's
 * how v0 does it; that's how the friend's minimal repro does it; that's
 * the only way it works.
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
