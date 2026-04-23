import React from 'react';
import { motion } from 'framer-motion';
import LungsDiagram from './LungsDiagram';

/**
 * LungsShared — the Lynch lung with a shared layoutId that morphs across
 * slide 5 (divider, right-column small) and slide 6 (background, center
 * big). Matches the HTML version's camera-pullback feel.
 *
 * Two animations coexist:
 *   1. Opacity fade-in (0 -> 1 over 0.9s) — runs every time this component
 *      mounts. Gives the "slowly appears" look the HTML deck has.
 *   2. Layout morph via layoutId — fires when framer-motion's LayoutGroup
 *      detects a matching layoutId on an adjacent slide. Position + size
 *      interpolate over 1s with cubic-bezier easing.
 *
 * Opacity and layout are independent transforms, so the two animations
 * don't fight each other: during a 5->6 morph, the bbox flies AND the
 * alpha rises, which reads as "the lung drifts in while materializing."
 */
const LAYOUT_TRANSITION = { duration: 1, ease: [0.4, 0, 0.2, 1] };
const ENTRANCE_TRANSITION = { duration: 0.9, ease: [0.4, 0, 0.2, 1] };

export default function LungsShared({ layoutId = 'lung-lynch' }) {
  return (
    <motion.div
      layoutId={layoutId}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{
        opacity: ENTRANCE_TRANSITION,
        layout: LAYOUT_TRANSITION,
      }}
      style={{ width: '100%', height: '100%' }}
    >
      <LungsDiagram />
    </motion.div>
  );
}
