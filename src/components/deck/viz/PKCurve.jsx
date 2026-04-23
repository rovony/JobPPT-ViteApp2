import React, { useMemo } from 'react';

/**
 * PKCurve — lightweight pharmacokinetic concentration-vs-time curve.
 * Stub implementation: pure SVG path computed from a 1-compartment model.
 * Architectural hook: replace internals with D3 scales + axes when full-fidelity
 * plotting is needed. Props API is stable.
 *
 * Props:
 *  - dose, ka, ke, V: model parameters
 *  - tMax: time horizon (hours)
 *  - highlight: optional object { t, label } marker
 */
export default function PKCurve({
  dose = 100,
  ka = 1.2,
  ke = 0.25,
  V = 20,
  tMax = 24,
  highlight,
  width = 720,
  height = 360,
  className,
}) {
  const pad = { top: 20, right: 20, bottom: 36, left: 44 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  const { pts, cMax } = useMemo(() => {
    const steps = 120;
    const arr = [];
    let cMaxLocal = 0;
    for (let i = 0; i <= steps; i++) {
      const t = (i / steps) * tMax;
      const c = (dose * ka) / (V * (ka - ke)) * (Math.exp(-ke * t) - Math.exp(-ka * t));
      arr.push({ t, c });
      if (c > cMaxLocal) cMaxLocal = c;
    }
    return { pts: arr, cMax: cMaxLocal };
  }, [dose, ka, ke, V, tMax]);

  const x = (t) => pad.left + (t / tMax) * w;
  const y = (c) => pad.top + h - (c / cMax) * h;
  const d = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${x(p.t).toFixed(2)},${y(p.c).toFixed(2)}`).join(' ');

  const ticksX = [0, tMax / 4, tMax / 2, (3 * tMax) / 4, tMax];
  const ticksY = [0, cMax / 2, cMax];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Pharmacokinetic concentration-time curve">
      {/* axes */}
      <line x1={pad.left} y1={pad.top + h} x2={pad.left + w} y2={pad.top + h} stroke="hsl(var(--deck-rule))" />
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + h} stroke="hsl(var(--deck-rule))" />
      {ticksX.map((t) => (
        <g key={`x${t}`}>
          <line x1={x(t)} y1={pad.top + h} x2={x(t)} y2={pad.top + h + 4} stroke="hsl(var(--deck-rule))" />
          <text x={x(t)} y={pad.top + h + 18} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)">
            {t.toFixed(0)}h
          </text>
        </g>
      ))}
      {ticksY.map((c) => (
        <g key={`y${c}`}>
          <line x1={pad.left - 4} y1={y(c)} x2={pad.left} y2={y(c)} stroke="hsl(var(--deck-rule))" />
          <text x={pad.left - 8} y={y(c) + 3} textAnchor="end" fontSize="10" fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)">
            {c.toFixed(1)}
          </text>
        </g>
      ))}
      {/* curve */}
      <path d={d} fill="none" stroke="hsl(var(--deck-accent))" strokeWidth="2.5" />
      {/* highlight */}
      {highlight && (() => {
        const match = pts.reduce((best, p) => Math.abs(p.t - highlight.t) < Math.abs(best.t - highlight.t) ? p : best, pts[0]);
        return (
          <g>
            <circle cx={x(match.t)} cy={y(match.c)} r="5" fill="hsl(var(--deck-accent-2))" />
            <line x1={x(match.t)} y1={y(match.c)} x2={x(match.t)} y2={pad.top + h} stroke="hsl(var(--deck-accent-2))" strokeDasharray="3 3" opacity="0.5" />
            {highlight.label && (
              <text x={x(match.t) + 8} y={y(match.c) - 8} fontSize="11" fill="hsl(var(--deck-ink))" fontFamily="var(--deck-font-mono)">
                {highlight.label}
              </text>
            )}
          </g>
        );
      })()}
      {/* labels */}
      <text x={pad.left + w / 2} y={height - 6} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-subtle))" fontFamily="var(--deck-font-mono)">
        TIME (HOURS)
      </text>
      <text x={12} y={pad.top + h / 2} transform={`rotate(-90 12 ${pad.top + h / 2})`} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-subtle))" fontFamily="var(--deck-font-mono)">
        CONCENTRATION (mg/L)
      </text>
    </svg>
  );
}