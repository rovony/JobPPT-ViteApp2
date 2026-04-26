import React, { useMemo } from 'react';

/**
 * MonteCarloScatter — deterministic simulated AUC values across a population,
 * plotted vs. weight. Shows the therapeutic window as a shaded band.
 * Pure SVG, no D3. Seeded PRNG so the pattern is stable between renders.
 */
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export default function MonteCarloScatter({
  n = 500,
  width = 720,
  height = 380,
  seed = 42,
  targetLow = 40,
  targetHigh = 90,
  className,
  highlight,
}) {
  const pad = { top: 24, right: 24, bottom: 40, left: 52 };
  const w = width - pad.left - pad.right;
  const h = height - pad.top - pad.bottom;

  const { pts, inBand, xDomain, yDomain } = useMemo(() => {
    const rng = mulberry32(seed);
    const arr = [];
    let inside = 0;
    for (let i = 0; i < n; i++) {
      // weight distribution: 15–80 kg (pediatric → adult)
      const wt = 15 + rng() * 65;
      // AUC = dose * F / (CL), where CL scales allometrically with weight^0.75
      // base dose 10 mg, CL = 3 * (wt/70)^0.75, add log-normal variability
      const CL = 3 * Math.pow(wt / 70, 0.75) * Math.exp((rng() - 0.5) * 0.8);
      const dose = 10;
      const auc = (dose * 1000) / (CL * 24);
      arr.push({ wt, auc });
      if (auc >= targetLow && auc <= targetHigh) inside++;
    }
    return {
      pts: arr,
      inBand: inside,
      xDomain: [10, 85],
      yDomain: [0, 160],
    };
  }, [n, seed, targetLow, targetHigh]);

  const x = (wt) => pad.left + ((wt - xDomain[0]) / (xDomain[1] - xDomain[0])) * w;
  const y = (auc) => pad.top + h - ((auc - yDomain[0]) / (yDomain[1] - yDomain[0])) * h;

  const ticksX = [20, 35, 50, 65, 80];
  const ticksY = [0, 40, 80, 120, 160];

  return (
    <svg viewBox={`0 0 ${width} ${height}`} className={className} role="img" aria-label="Monte Carlo exposure simulation">
      {/* Target band */}
      <rect
        x={pad.left}
        y={y(targetHigh)}
        width={w}
        height={y(targetLow) - y(targetHigh)}
        fill="hsl(var(--deck-signal))"
        opacity="0.1"
      />
      <line
        x1={pad.left} x2={pad.left + w}
        y1={y(targetLow)} y2={y(targetLow)}
        stroke="hsl(var(--deck-signal))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
      />
      <line
        x1={pad.left} x2={pad.left + w}
        y1={y(targetHigh)} y2={y(targetHigh)}
        stroke="hsl(var(--deck-signal))" strokeWidth="1" strokeDasharray="4 4" opacity="0.5"
      />
      <text
        x={pad.left + w - 8} y={y((targetLow + targetHigh) / 2) + 4}
        textAnchor="end" fontSize="10"
        fill="hsl(var(--deck-signal))" fontFamily="var(--deck-font-mono)"
      >
        TARGET WINDOW · {targetLow}–{targetHigh} mg·h/L
      </text>

      {/* Axes */}
      <line x1={pad.left} y1={pad.top + h} x2={pad.left + w} y2={pad.top + h} stroke="hsl(var(--deck-rule))" />
      <line x1={pad.left} y1={pad.top} x2={pad.left} y2={pad.top + h} stroke="hsl(var(--deck-rule))" />

      {ticksX.map((t) => (
        <g key={`x${t}`}>
          <line x1={x(t)} y1={pad.top + h} x2={x(t)} y2={pad.top + h + 4} stroke="hsl(var(--deck-rule))" />
          <text x={x(t)} y={pad.top + h + 18} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)">
            {t}
          </text>
        </g>
      ))}
      {ticksY.map((t) => (
        <g key={`y${t}`}>
          <line x1={pad.left - 4} y1={y(t)} x2={pad.left} y2={y(t)} stroke="hsl(var(--deck-rule))" />
          <text x={pad.left - 8} y={y(t) + 3} textAnchor="end" fontSize="10" fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)">
            {t}
          </text>
        </g>
      ))}

      {/* Scatter */}
      {pts.map((p, i) => {
        const inRange = p.auc >= targetLow && p.auc <= targetHigh;
        return (
          <circle
            key={i}
            cx={x(p.wt)} cy={y(p.auc)} r="2.2"
            fill={inRange ? 'hsl(var(--deck-accent))' : 'hsl(var(--deck-ink-subtle))'}
            opacity={inRange ? 0.8 : 0.35}
          />
        );
      })}

      {/* Highlight patient */}
      {highlight && (
        <g>
          <circle cx={x(highlight.wt)} cy={y(highlight.auc)} r="7" fill="none" stroke="hsl(var(--deck-accent-2))" strokeWidth="2" />
          <circle cx={x(highlight.wt)} cy={y(highlight.auc)} r="3" fill="hsl(var(--deck-accent-2))" />
          {highlight.label && (
            <text
              x={x(highlight.wt) + 12} y={y(highlight.auc) - 8}
              fontSize="11" fill="hsl(var(--deck-ink))" fontFamily="var(--deck-font-mono)"
            >
              {highlight.label}
            </text>
          )}
        </g>
      )}

      {/* Axis labels */}
      <text x={pad.left + w / 2} y={height - 6} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-subtle))" fontFamily="var(--deck-font-mono)">
        WEIGHT (KG)
      </text>
      <text x={12} y={pad.top + h / 2} transform={`rotate(-90 12 ${pad.top + h / 2})`} textAnchor="middle" fontSize="10" fill="hsl(var(--deck-ink-subtle))" fontFamily="var(--deck-font-mono)">
        AUC₀₋₂₄ (mg·h/L)
      </text>

      {/* Footer stat */}
      <text x={pad.left + w} y={pad.top + 14} textAnchor="end" fontSize="10" fill="hsl(var(--deck-ink-muted))" fontFamily="var(--deck-font-mono)">
        N={n} · IN TARGET {Math.round((inBand / n) * 100)}%
      </text>
    </svg>
  );
}