// @ts-nocheck
/**
 * TracingBeamHost — the right-edge progress hairline.
 *
 * Self-contained (no external TracingBeam component exists in
 * merck-deck). Renders:
 *   - a 2px cream-30% rail running viewport-top to viewport-bottom
 *   - a sage fill that grows top-down as cameraIndex advances
 *   - a small mono "C{n} / 10" label at the bottom of the rail
 *
 * The fill morphs smoothly when cameraIndex changes (Framer Motion
 * animates the height transition with EASE_EDITORIAL).
 *
 * Hidden on camera 1 (the title divider) per brief — the spine
 * begins at C2.
 */

import React from 'react';
import { motion } from 'framer-motion';
import { useCanvasCamera } from '../canvas/CameraController';
import { EASE_EDITORIAL, DUR } from '../themes';

export default function TracingBeamHost() {
  const { cameraIndex, finaleStage } = useCanvasCamera();

  if (cameraIndex < 2) return null;

  // Progress: 0..1 across the 10 cameras. Finale stages count as
  // fractional advances inside camera 10.
  const baseProgress = (cameraIndex - 1) / 9; // 0 at C1 → 1 at C10
  const finaleBoost = cameraIndex === 10 ? ((finaleStage - 1) / 4) * (1 / 9) : 0;
  const progress = Math.min(1, baseProgress + finaleBoost);

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: 60,
        right: 28,
        bottom: 60,
        width: 32,
        pointerEvents: 'none',
        zIndex: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {/* The rail */}
      <div
        style={{
          position: 'relative',
          width: 2,
          flex: 1,
          background: 'color-mix(in srgb, var(--cream, #F5F0E8) 18%, transparent)',
          borderRadius: 1,
          overflow: 'hidden',
        }}
      >
        {/* Sage fill — animates between camera positions */}
        <motion.div
          animate={{ height: `${progress * 100}%` }}
          transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            background: 'var(--case, #7BAE7F)',
            borderRadius: 1,
          }}
        />
      </div>

      {/* Mono progress label */}
      <div
        style={{
          marginTop: 12,
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 10,
          letterSpacing: '0.12em',
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 60%, transparent)',
          textTransform: 'uppercase',
          whiteSpace: 'nowrap',
        }}
      >
        C{cameraIndex}
        {cameraIndex === 10 && finaleStage > 1 ? `·S${finaleStage}` : ''}
        <span style={{ opacity: 0.5 }}> / 10</span>
      </div>
    </div>
  );
}
