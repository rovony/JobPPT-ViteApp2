// @ts-nocheck
import React from 'react';

/**
 * HairlineGrid — fixed CSS grid pattern for slide backgrounds.
 *
 * Per Amendment 1 §5: 8px hairline grid at ~4% opacity for slide 01,
 * 3×3 hairline grid for slide 04. Renders as an absolute-positioned
 * div stretched to its parent; parent must be `position: relative`.
 */

type Props = {
  cellPx?: number;
  opacity?: number;
  /** When true, renders 3 large cells per axis instead of fine grid. */
  coarse?: boolean;
};

export default function HairlineGrid({ cellPx = 8, opacity = 0.04, coarse = false }: Props) {
  if (coarse) {
    return (
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(3, 1fr)',
          opacity,
        }}
      >
        {Array.from({ length: 9 }).map((_, i) => (
          <div
            key={i}
            style={{
              border: '1px solid var(--cream-hairline)',
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        opacity,
        backgroundImage:
          `repeating-linear-gradient(0deg, transparent, transparent ${cellPx - 1}px, var(--cream-hairline) ${cellPx - 1}px, var(--cream-hairline) ${cellPx}px), ` +
          `repeating-linear-gradient(90deg, transparent, transparent ${cellPx - 1}px, var(--cream-hairline) ${cellPx - 1}px, var(--cream-hairline) ${cellPx}px)`,
      }}
    />
  );
}
