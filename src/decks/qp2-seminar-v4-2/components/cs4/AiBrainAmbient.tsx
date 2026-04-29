// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import AiBrainSvg from '../../assets/ai-brain.svg?react';

/**
 * AiBrainAmbient — quiet, watermark-grade variants of the CS4 cortex.
 *
 * Mirrors the CS1 Lungs `ambient / foundation / closure` variants:
 *   • hero       — divider scale, full opacity (re-export of AiBrain hero
 *                  geometry; mostly used by S1)
 *   • ambient    — backdrop watermark, low opacity, soft blur, no halo
 *   • foundation — slightly bigger, higher contrast than ambient; for
 *                  primitive / on-ramp slides where the brain reads as the
 *                  conceptual foundation under the visual
 *   • closure    — corner-anchored fade, dimmed; for S13 where the brain
 *                  closes the visual loop opened on S1
 *
 * Default uses a neutral div (no layoutId) so it doesn't fight the
 * actual hero brain on S1 / S7. Pass `layoutId` explicitly to opt in.
 */

const VARIANT_DIMS = {
  hero:       { width: 'clamp(260px, 26vw, 460px)', aspectRatio: '1 / 1' },
  ambient:    { width: 'clamp(28rem, 50vw, 48rem)', aspectRatio: '1 / 1' },
  foundation: { width: 'clamp(22rem, 36vw, 36rem)', aspectRatio: '1 / 1' },
  closure:    { width: 'clamp(14rem, 22vw, 22rem)', aspectRatio: '1 / 1' },
};

const VARIANT_OPACITY = {
  hero:       0.85,
  ambient:    0.06,
  foundation: 0.04,
  closure:    0.04,
};

const VARIANT_FILTER = {
  hero:       'none',
  ambient:    'blur(2px)',
  foundation: 'blur(1.2px)',
  closure:    'blur(1px)',
};

export default function AiBrainAmbient({
  variant = 'ambient',
  layoutId = null,
  position = 'center',
  go = true,
  delay = 0.4,
}) {
  const dims = VARIANT_DIMS[variant] || VARIANT_DIMS.ambient;
  const targetOpacity = VARIANT_OPACITY[variant] ?? VARIANT_OPACITY.ambient;
  const filter = VARIANT_FILTER[variant] || VARIANT_FILTER.ambient;

  // Position presets — used by slides that want the brain anchored
  // somewhere other than dead-center (e.g. S13 closer-corner).
  const positionStyle = {
    center: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
    },
    'bottom-right': {
      position: 'absolute',
      right: 'clamp(2rem, 5vw, 6rem)',
      bottom: 'clamp(2rem, 5vh, 6rem)',
    },
    'top-right': {
      position: 'absolute',
      right: 'clamp(2rem, 5vw, 6rem)',
      top: 'clamp(2rem, 5vh, 6rem)',
    },
    'top-left': {
      position: 'absolute',
      left: 'clamp(2rem, 5vw, 6rem)',
      top: 'clamp(2rem, 5vh, 6rem)',
    },
  }[position] || {};

  const layoutProps = layoutId
    ? { layoutId, layout: true, transition: { duration: 1.6, ease: [0.4, 0, 0.2, 1] } }
    : {};

  return (
    <motion.div
      aria-hidden
      {...layoutProps}
      initial={{ opacity: 0 }}
      animate={{ opacity: targetOpacity }}
      transition={{ duration: 1.2, delay, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        ...positionStyle,
        ...dims,
        filter,
        color: 'var(--amber)',
        pointerEvents: 'none',
        zIndex: -1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <AiBrainSvg style={{ width: '100%', height: '100%' }} aria-hidden="true" />
    </motion.div>
  );
}
