import React from 'react';
import { Handle, Position } from '@xyflow/react';

/**
 * CompartmentNode — a single PK compartment rendered as a ring (central
 * volume) with optional secondary ring (peripheral), the compartment's
 * label, and volume-of-distribution text.
 *
 * Visual grammar:
 *   · Central compartment  — solid ring, case-color accent
 *   · Peripheral           — dashed ring, cyan/violet accent
 *   · Depot (absorption)   — filled disk, sage accent
 *   · Elimination sink     — open square, cream-faint (terminal)
 *
 * All colors come from data.kind → CSS tokens; never hardcoded.
 * Connection handles live on all four sides so edges can route naturally.
 */
const KIND_STYLES = {
  central:     { fill: 'var(--cream-ghost)',  stroke: 'var(--case, var(--amber))', dash: '0',     shape: 'circle' },
  peripheral:  { fill: 'transparent',          stroke: 'var(--cyan)',               dash: '6 4',   shape: 'circle' },
  depot:       { fill: 'var(--sage)',          stroke: 'var(--sage)',               dash: '0',     shape: 'circle' },
  effect:      { fill: 'transparent',          stroke: 'var(--violet)',             dash: '2 3',   shape: 'circle' },
  elimination: { fill: 'transparent',          stroke: 'var(--cream-faint)',        dash: '0',     shape: 'square' },
};

export default function CompartmentNode({ data, selected }) {
  const kind = data.kind || 'central';
  const s = KIND_STYLES[kind] || KIND_STYLES.central;
  const size = data.size || 110;

  return (
    <div
      style={{
        width: size,
        height: size,
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Handles — one per side. Transparent unless connecting. */}
      <Handle type="target" position={Position.Left}   style={handleStyle} />
      <Handle type="target" position={Position.Top}    style={handleStyle} />
      <Handle type="source" position={Position.Right}  style={handleStyle} />
      <Handle type="source" position={Position.Bottom} style={handleStyle} />

      {/* Compartment glyph */}
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ position: 'absolute', inset: 0 }}>
        {s.shape === 'circle' ? (
          <circle
            cx={size / 2}
            cy={size / 2}
            r={size / 2 - 4}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth={selected ? 3 : 2}
            strokeDasharray={s.dash}
          />
        ) : (
          <rect
            x={6}
            y={6}
            width={size - 12}
            height={size - 12}
            fill={s.fill}
            stroke={s.stroke}
            strokeWidth={selected ? 3 : 2}
            strokeDasharray={s.dash}
            rx={4}
          />
        )}
      </svg>

      {/* Label stack — positioned absolutely so the glyph stays circular */}
      <div style={{ position: 'relative', textAlign: 'center', pointerEvents: 'none' }}>
        <div
          className="deck-display"
          style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--cream)',
            fontWeight: 600,
            lineHeight: 1,
          }}
        >
          {data.label}
        </div>
        {data.volume && (
          <div
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-meta)',
              color: 'var(--cream-muted)',
              letterSpacing: 'var(--ls-mono)',
              marginTop: 2,
            }}
          >
            {data.volume}
          </div>
        )}
      </div>

      {/* Kind label below the glyph */}
      <div
        className="deck-mono uppercase"
        style={{
          position: 'absolute',
          bottom: -22,
          left: 0,
          right: 0,
          textAlign: 'center',
          fontSize: 'var(--fs-nano)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: s.stroke,
          pointerEvents: 'none',
        }}
      >
        {kind}
      </div>
    </div>
  );
}

const handleStyle = {
  width: 8,
  height: 8,
  background: 'var(--case, var(--amber))',
  border: '1.5px solid var(--bg)',
  opacity: 0.6,
};