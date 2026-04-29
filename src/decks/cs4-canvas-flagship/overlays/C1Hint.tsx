// @ts-nocheck
/**
 * C1Hint — small "→ to begin" affordance that ONLY appears on Camera 1
 * and disappears the moment the camera advances past C1. Solves the
 * discoverability gap: the user lands on C1 and otherwise has no
 * visual cue that 9 more cameras exist behind →.
 *
 * Animates: fades in 1.6s after the title settles (so it doesn't
 * compete with the title reveal), then exits in 200ms when cameraIndex > 1.
 *
 * Positioned bottom-center of the viewport, NOT the canvas — this is
 * a viewport overlay that sits in CanvasViewport's children slot.
 */

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useCanvasCamera } from '../canvas/CameraController';
import { EASE_EDITORIAL, DUR } from '../themes';

export default function C1Hint() {
  const { cameraIndex } = useCanvasCamera();

  return (
    <AnimatePresence>
      {cameraIndex === 1 && (
        <motion.div
          key="c1-hint"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 4, transition: { duration: 0.2 } }}
          transition={{ duration: DUR.standard, delay: 2.6, ease: EASE_EDITORIAL }}
          aria-hidden
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            bottom: 56,
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 6,
          }}
        >
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 14,
              padding: '10px 22px',
              border: '1px solid color-mix(in srgb, var(--case, #7BAE7F) 35%, transparent)',
              borderRadius: 999,
              background: 'color-mix(in srgb, var(--bg, #0D1B2A) 80%, transparent)',
              backdropFilter: 'blur(12px)',
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              color: 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)',
            }}
          >
            <motion.span
              animate={{ x: [0, 4, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
              style={{ color: 'var(--case, #7BAE7F)', fontSize: 16 }}
            >
              →
            </motion.span>
            <span>10 cameras · press → to begin · N for notes</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
