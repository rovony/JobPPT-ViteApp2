// @ts-nocheck
/**
 * CitationChip — always-visible bottom-left source line per the
 * editorial-restraint contract (every body slide footer cites the
 * source). Visible from C2 onwards (hidden on C1 + finale stage 1
 * zoom-out where it would clutter the wide shot).
 *
 * Reads from DECK_META.source so the citation matches what the
 * cs4-flagship-v1 deck shows.
 */

import React from 'react';
import { useCanvasCamera } from '../canvas/CameraController';
import { DECK_META } from '../data';

export default function CitationChip() {
  const { cameraIndex, finaleStage } = useCanvasCamera();

  // Hide on C1 (title) and on finale stage 1 (full-canvas zoom-out where
  // viewport-anchored chrome competes with the wide shot).
  if (cameraIndex < 2) return null;
  if (cameraIndex === 10 && finaleStage === 1) return null;

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        left: 24,
        bottom: 18,
        maxWidth: 720,
        pointerEvents: 'none',
        zIndex: 4,
        fontFamily: '"IBM Plex Mono", monospace',
        fontSize: 10,
        letterSpacing: '0.08em',
        color: 'color-mix(in srgb, var(--cream, #F5F0E8) 38%, transparent)',
        lineHeight: 1.6,
      }}
    >
      {DECK_META.source}
    </div>
  );
}
