import React from 'react';
import { motion } from 'framer-motion';
import LungsDiagram from './LungsDiagram';
import { useReducedMotionPref } from '@/lib/motion';

/**
 * LungsShared — the Lynch lungs wrapped in a motion.div with a shared
 * layoutId. When this component mounts on slide 5 (right-column illustration
 * slot, ~34% width) and then on slide 6 (card-01 visual slot, smaller and
 * to the left), framer-motion morphs the bounding box between the two
 * instances because DeckRunner uses AnimatePresence mode="popLayout".
 *
 * Narrative: slide 5 (divider) introduces the disease-&-drug territory;
 * slide 6 (background) zooms into specifics. The shared lung reinforces
 * continuity — same subject, closer lens — rather than a hard cut.
 *
 * When prefers-reduced-motion is set, we render the lung WITHOUT a
 * layoutId so framer-motion falls back to a plain swap instead of a
 * flight animation. The static image still looks correct on each slide.
 */
const SPRING = { type: 'spring', stiffness: 80, damping: 20, mass: 1 };

export default function LungsShared({ layoutId = 'lung-lynch' }) {
  const reduce = useReducedMotionPref();

  if (reduce) {
    return (
      <div style={{ width: '100%', height: '100%' }}>
        <LungsDiagram />
      </div>
    );
  }

  return (
    <motion.div
      layoutId={layoutId}
      initial={false}
      transition={SPRING}
      style={{ width: '100%', height: '100%' }}
    >
      <LungsDiagram />
    </motion.div>
  );
}
