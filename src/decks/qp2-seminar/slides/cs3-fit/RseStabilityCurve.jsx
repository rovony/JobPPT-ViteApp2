import React from 'react';
import { motion } from 'framer-motion';

/**
 * RseStabilityCurve — illustrative SVG showing parameter %RSE plateauing
 * as adult sample size N grows beyond ≈ 50–60.
 *
 * The curve is illustrative — the *shape* (steep drop from N≈20, knee at
 * N≈50–60, flat plateau through N=100) is the message. The y-axis
 * labels are intentionally relative (%RSE down arrow) and the slide
 * caption explicitly notes the curve is illustrative.
 *
 * Marker emphasis: N = 60 sits on the plateau in violet; N = 20 and
 * N = 100 are faint reference markers.
 */
export default function RseStabilityCurve({
  stroke = 'var(--violet)',
  delay = 0,
  className,
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];

  // viewBox 600 × 320 · plot area 90,40 → 540,260
  const x0 = 90;
  const x1 = 540;
  const y0 = 40;
  const y1 = 260;

  // Parametric points across N from 20 to 100, exponential-decay-ish.
  // %RSE drops from a high at small N to a plateau beyond N≈50–60.
  // SVG y grows DOWNWARD, so HIGH %RSE = SMALL y (near top y0), LOW %RSE
  // = LARGE y (near bottom y1). The previous version had the points
  // inverted — the plotted curve rose with N (visually "RSE getting
  // worse"), which contradicted the y-axis labels (high/low) and the
  // surrounding caption (plateau beyond N≈50–60). Fixed here.
  const ns = [20, 30, 40, 50, 60, 70, 80, 90, 100];
  const yHigh = y0 + 24;        // small N → near the top of the plot
  const yPlateau = y1 - 28;     // large N → near the bottom (low %RSE)
  const points = ns.map((n) => {
    const x = x0 + ((n - 20) / 80) * (x1 - x0);
    const t = (n - 20) / 80;
    const decay = Math.exp(-3.4 * t); // 1 at N=20, ~0.03 at N=100
    const y = yPlateau - decay * (yPlateau - yHigh);
    return { n, x, y };
  });

  // Build smooth path via cubic spline approximation (segment control points)
  const pathD = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      return `C ${cx1} ${prev.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(' ');

  // Find marker positions
  const m20 = points.find((p) => p.n === 20);
  const m60 = points.find((p) => p.n === 60);
  const m100 = points.find((p) => p.n === 100);

  return (
    <svg
      viewBox="0 0 600 320"
      preserveAspectRatio="xMidYMid meet"
      className={className}
      aria-label="Illustrative parameter RSE stability vs adult sample size — plateau beyond N=50–60"
      role="img"
    >
      {/* Plot frame */}
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke="var(--cream-hairline)" strokeWidth={1} />
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke="var(--cream-hairline)" strokeWidth={1} />

      {/* Y-axis label (left, rotated) */}
      <text
        x={28}
        y={(y0 + y1) / 2}
        textAnchor="middle"
        transform={`rotate(-90, 28, ${(y0 + y1) / 2})`}
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.18em"
        fontWeight={700}
        fill="var(--cream-muted)"
      >
        PARAMETER %RSE
      </text>
      <text
        x={50}
        y={y0 + 14}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={9}
        fill="var(--cream-faint)"
      >
        high
      </text>
      <text
        x={50}
        y={y1 - 4}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={9}
        fill="var(--cream-faint)"
      >
        low
      </text>

      {/* X-axis labels */}
      {[20, 40, 60, 80, 100].map((n) => {
        const x = x0 + ((n - 20) / 80) * (x1 - x0);
        return (
          <g key={n}>
            <line x1={x} y1={y1} x2={x} y2={y1 + 4} stroke="var(--cream-hairline)" />
            <text
              x={x}
              y={y1 + 18}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={10}
              fill={n === 60 ? stroke : 'var(--cream-muted)'}
              fontWeight={n === 60 ? 700 : 400}
            >
              {n}
            </text>
          </g>
        );
      })}
      <text
        x={(x0 + x1) / 2}
        y={y1 + 38}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.18em"
        fontWeight={700}
        fill="var(--cream-muted)"
      >
        ADULT SAMPLE SIZE · N
      </text>

      {/* Plateau zone shading */}
      <motion.rect
        x={x0 + ((50 - 20) / 80) * (x1 - x0)}
        y={y0}
        width={((100 - 50) / 80) * (x1 - x0)}
        height={y1 - y0}
        fill="color-mix(in srgb, var(--violet) 8%, transparent)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease, delay: delay + 1.4 }}
      />

      {/* Curve */}
      <motion.path
        d={pathD}
        fill="none"
        stroke={stroke}
        strokeWidth={2.4}
        strokeLinecap="round"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1.4, ease, delay }}
      />

      {/* Faint reference markers */}
      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.55 }}
        transition={{ duration: 0.4, ease, delay: delay + 1.5 }}
      >
        <circle cx={m20.x} cy={m20.y} r={4} fill="var(--cream-faint)" />
        <text
          x={m20.x + 8}
          y={m20.y - 6}
          fontFamily="var(--font-mono)"
          fontSize={9}
          fill="var(--cream-faint)"
        >
          N=20
        </text>
        <circle cx={m100.x} cy={m100.y} r={4} fill="var(--cream-faint)" />
        <text
          x={m100.x - 36}
          y={m100.y - 6}
          fontFamily="var(--font-mono)"
          fontSize={9}
          fill="var(--cream-faint)"
        >
          N=100
        </text>
      </motion.g>

      {/* HERO marker — N = 60 */}
      <motion.g
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.55, ease: overshoot, delay: delay + 1.7 }}
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
      >
        <circle cx={m60.x} cy={m60.y} r={9} fill={stroke} stroke="var(--bg)" strokeWidth={2} />
        <line
          x1={m60.x}
          y1={m60.y - 12}
          x2={m60.x}
          y2={y0 + 8}
          stroke={stroke}
          strokeWidth={1}
          strokeDasharray="3 3"
          opacity={0.65}
        />
        <rect
          x={m60.x - 38}
          y={y0 - 22}
          width={76}
          height={28}
          rx={0}
          fill="color-mix(in srgb, var(--violet) 18%, transparent)"
          stroke={stroke}
          strokeWidth={1}
        />
        <text
          x={m60.x}
          y={y0 - 4}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize={11}
          letterSpacing="0.06em"
          fontWeight={700}
          fill={stroke}
        >
          N = 60 · plateau
        </text>
      </motion.g>

      {/* Caption */}
      <motion.text
        x={x1}
        y={y1 + 56}
        textAnchor="end"
        fontFamily="var(--font-body)"
        fontSize={10}
        fontStyle="italic"
        fill="var(--cream-faint)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease, delay: delay + 2.0 }}
      >
        illustrative · not a specific parameter
      </motion.text>
    </svg>
  );
}
