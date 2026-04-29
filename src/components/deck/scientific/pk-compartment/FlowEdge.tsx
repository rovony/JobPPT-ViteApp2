// @ts-nocheck
import React from 'react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath } from '@xyflow/react';

/**
 * FlowEdge — custom edge representing drug flux between PK compartments.
 *
 * Features:
 *   · Bezier path (smooth curves between compartments)
 *   · Animated particle (an SVG circle) riding the path — the "flux"
 *     metaphor. Timing represents relative rate constants visually.
 *   · Rate-constant label (e.g. "k_a", "CL/V_c") rendered in the
 *     center of the edge, with deck mono typography.
 *   · Color + speed derived from edge.data so slides can encode
 *     fast/slow pathways or absorption vs elimination.
 *
 * Speed convention:
 *   · fast   → 1.5s particle loop (absorption, rapid distribution)
 *   · medium → 3s (standard rate constant)
 *   · slow   → 5s (elimination, slow redistribution)
 */
const SPEED_DURATION = { fast: '1.5s', medium: '3s', slow: '5s' };

export default function FlowEdge({
  id, sourceX, sourceY, targetX, targetY,
  sourcePosition, targetPosition, markerEnd, data, selected,
}) {
  const [path, labelX, labelY] = getBezierPath({
    sourceX, sourceY, sourcePosition, targetX, targetY, targetPosition,
  });

  const color = data?.color || 'var(--case, var(--amber))';
  const speed = data?.speed || 'medium';
  const duration = SPEED_DURATION[speed] || SPEED_DURATION.medium;
  const rate = data?.rate;

  return (
    <>
      <BaseEdge
        id={id}
        path={path}
        markerEnd={markerEnd}
        style={{
          stroke: color,
          strokeWidth: selected ? 2.5 : 1.75,
          strokeOpacity: selected ? 1 : 0.7,
        }}
      />

      {/* Particle riding the path — animated via SMIL <animateMotion>.
          SMIL works reliably in Chrome/Safari/Firefox and pauses with
          prefers-reduced-motion when we externally kill the animation
          via the data attribute below. */}
      <g data-flow-particle>
        <circle r={4} fill={color} style={{ filter: `drop-shadow(0 0 4px ${color})` }}>
          <animateMotion
            dur={duration}
            repeatCount="indefinite"
            path={path}
            rotate="auto"
          />
        </circle>
      </g>

      {rate && (
        <EdgeLabelRenderer>
          <div
            className="deck-mono nodrag nopan"
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: 'var(--panel)',
              color,
              fontSize: 'var(--fs-meta)',
              letterSpacing: 'var(--ls-mono)',
              padding: '2px 8px',
              borderRadius: 'var(--radius-sm)',
              border: `1px solid ${color}`,
              pointerEvents: 'all',
              whiteSpace: 'nowrap',
            }}
          >
            {rate}
          </div>
        </EdgeLabelRenderer>
      )}

      {/* Kill the particle animation under reduced-motion */}
      <style>{`
        @media (prefers-reduced-motion: reduce) {
          [data-flow-particle] animateMotion { display: none; }
          [data-flow-particle] circle { opacity: 0.4; }
        }
      `}</style>
    </>
  );
}
