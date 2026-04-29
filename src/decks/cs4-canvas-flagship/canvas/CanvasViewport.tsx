// @ts-nocheck
/**
 * CanvasViewport — the visible "frame".
 *
 * The canvas is designed in a 1920×1080 logical viewport (every camera
 * frame, every overlay coordinate, every zone position assumes this).
 * The deck-studio shell renders us at WHATEVER size the user's window
 * happens to be (could be 960×540 in normal-view, full-screen at
 * 1920×1080+, or letterboxed inside a 16:9 export iframe).
 *
 * Responsive letterbox-fit pattern:
 *
 *   <outer (full parent, flex-center, overflow:hidden)>
 *     <fit-box (visually sized: 1920·s × 1080·s)>
 *       <stage (logical 1920×1080, transform: scale(s) origin top-left)>
 *         CanvasStage + overlays
 *       </stage>
 *     </fit-box>
 *   </outer>
 *
 * Why two layers (fit-box + stage)?
 *   - The FIT-BOX has the SCALED dimensions, so flex centering
 *     letterboxes correctly without any overflow drama.
 *   - The STAGE has the LOGICAL dimensions (1920×1080) so all the
 *     pixel coords inside zones / overlays stay in the design system.
 *   - `transformOrigin: top-left` means the scaled stage fits
 *     exactly inside the fit-box (top-left aligned with no gap).
 *
 * scale = min(parentW / 1920, parentH / 1080) — preserves 16:9.
 *
 * This is the same letterbox-fit pattern that `FitStage` applies to
 * traditional slides — replicated here because we set
 * `standardLayout.enabled: false` to bypass DeckRunner's wrapping.
 */

import React, { useEffect, useRef, useState } from 'react';
import CanvasStage from './CanvasStage';
import { VIEWPORT_W, VIEWPORT_H } from '../themes';

interface Props {
  children?: React.ReactNode;  // overlays that mount above the stage
}

export default function CanvasViewport({ children }: Props) {
  const outerRef = useRef<HTMLDivElement | null>(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    const node = outerRef.current;
    if (!node) return;

    const measure = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width < 8 || rect.height < 8) return;
      const sx = rect.width  / VIEWPORT_W;
      const sy = rect.height / VIEWPORT_H;
      const next = Math.min(sx, sy);
      setScale((prev) => (Math.abs(prev - next) > 0.0005 ? next : prev));
    };

    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(node);
    window.addEventListener('resize', measure);

    return () => {
      ro.disconnect();
      window.removeEventListener('resize', measure);
    };
  }, []);

  return (
    <div
      ref={outerRef}
      data-cs4-canvas-outer="true"
      style={{
        position: 'absolute',
        inset: 0,
        background: 'var(--bg, #0D1B2A)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      {/* fit-box: visually sized to 1920·s × 1080·s; flex centers it. */}
      <div
        data-cs4-canvas-fit="true"
        style={{
          width:  VIEWPORT_W * scale,
          height: VIEWPORT_H * scale,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg, #0D1B2A)',
          flexShrink: 0,
        }}
      >
        {/* stage: logical 1920×1080, scaled to fit the fit-box exactly. */}
        <div
          data-cs4-canvas-viewport="true"
          data-case="sage"
          className="cs4-canvas-typography"
          style={{
            width: VIEWPORT_W,
            height: VIEWPORT_H,
            position: 'absolute',
            top: 0,
            left: 0,
            transform: `scale(${scale})`,
            transformOrigin: '0 0',
            // Fonts scoped to this subtree only.
            fontFamily: '"IBM Plex Sans", system-ui, -apple-system, sans-serif',
            color: 'var(--cream, #F5F0E8)',
          }}
        >
          <CanvasStage />
          {children}
        </div>
      </div>
    </div>
  );
}
