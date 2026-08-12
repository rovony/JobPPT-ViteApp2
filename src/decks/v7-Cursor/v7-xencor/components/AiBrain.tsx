import React from 'react';
import { motion } from 'framer-motion';
import AiBrainSvg from '../assets/ai-brain.svg?react';

/**
 * AiBrain — illustration component for the CS3 (PharmAgent) anchor system.
 *
 * Follows the same pattern as CS1's Lungs component. A single shared
 * `layoutId` enables FLIP morphs across CS3 slides that render it.
 *
 * Variants:
 *   hero    — divider slot, right-anchored, full opacity
 *   ambient — background echo, scaled up, very low opacity
 */

const LAYOUT_TRANSITION = { duration: 1.8, ease: [0.4, 0, 0.2, 1] };

const DIMENSIONS = {
  hero:    { width: 'clamp(240px, 24vw, 420px)', aspectRatio: '1 / 1' },
  ambient: { width: 'clamp(22rem, 38vw, 34rem)', aspectRatio: '1 / 1' },
};

/** Soften ambient — light paper, no theater blur bloom */
const VARIANT_STYLES = {
  hero:    { opacity: 0.9, filter: 'none' },
  ambient: { opacity: 0.14, filter: 'none' },
};

export default function AiBrain({
  layoutId = 'cs3-ai-brain',
  variant = 'hero',
}) {
  const dims = DIMENSIONS[variant] || DIMENSIONS.hero;
  const vs = VARIANT_STYLES[variant] || VARIANT_STYLES.hero;

  return (
    <motion.div
      layoutId={layoutId}
      layout
      transition={LAYOUT_TRANSITION}
      style={{
        ...dims,
        ...vs,
        color: 'var(--case, var(--sage))',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <AiBrainSvg
        style={{ width: '100%', height: '100%' }}
        aria-hidden="true"
      />
    </motion.div>
  );
}
