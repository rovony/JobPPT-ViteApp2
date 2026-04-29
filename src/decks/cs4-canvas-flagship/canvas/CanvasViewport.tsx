// @ts-nocheck
/**
 * CanvasViewport — the visible "frame".
 *
 * Fills 100% of its parent (the merck-deck slide root, which fills
 * 100dvh). Clips overflow so the off-camera parts of the 8000×4500
 * stage don't leak.
 *
 * Sets the typography scope via the `cs4-canvas-typography` class so
 * Source Serif Pro / IBM Plex Sans / IBM Plex Mono apply to this
 * subtree only — the rest of the merck-deck app continues to use
 * Fraunces/Inter/JetBrains.
 *
 * Sets `data-case="sage"` so the merck-deck case-color CSS variables
 * resolve `var(--case)` to sage `#7BAE7F` for everything inside.
 */

import React from 'react';
import CanvasStage from './CanvasStage';

interface Props {
  children?: React.ReactNode;  // for overlays that mount above the stage
}

export default function CanvasViewport({ children }: Props) {
  return (
    <div
      data-cs4-canvas-viewport="true"
      data-case="sage"
      className="cs4-canvas-typography"
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
        background: 'var(--bg, #0D1B2A)',
        // Fonts scoped to this subtree only
        fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
        color: 'var(--cream, #F5F0E8)',
        // Establishes positioning context for absolutely-positioned stage + overlays
      }}
    >
      <CanvasStage />
      {children}
    </div>
  );
}
