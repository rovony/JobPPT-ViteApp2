import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * RseStabilityCurve — illustrative %RSE plateau vs adult N.
 *
 * Labels/axes are always solid. Curve + plateau wash may draw.
 * Shape is illustrative — caption says so.
 */
export default function RseStabilityCurve({
  stroke = 'var(--teal)',
  delay = 0,
  className,
}) {
  const reduced = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const d = Math.min(delay, 0.2);

  const x0 = 90;
  const x1 = 540;
  const y0 = 40;
  const y1 = 260;

  const ns = [20, 30, 40, 50, 60, 70, 80, 90, 100];
  const yHigh = y0 + 24;
  const yPlateau = y1 - 28;
  const points = ns.map((n) => {
    const x = x0 + ((n - 20) / 80) * (x1 - x0);
    const t = (n - 20) / 80;
    const decay = Math.exp(-3.4 * t);
    const y = yPlateau - decay * (yPlateau - yHigh);
    return { n, x, y };
  });

  const pathD = points
    .map((p, i, arr) => {
      if (i === 0) return `M ${p.x} ${p.y}`;
      const prev = arr[i - 1];
      const cx1 = prev.x + (p.x - prev.x) / 2;
      const cx2 = prev.x + (p.x - prev.x) / 2;
      return `C ${cx1} ${prev.y}, ${cx2} ${p.y}, ${p.x} ${p.y}`;
    })
    .join(' ');

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
      <line x1={x0} y1={y0} x2={x0} y2={y1} stroke="var(--cream-hairline)" strokeWidth={1} />
      <line x1={x0} y1={y1} x2={x1} y2={y1} stroke="var(--cream-hairline)" strokeWidth={1} />

      <text
        x={28}
        y={(y0 + y1) / 2}
        textAnchor="middle"
        transform={`rotate(-90, 28, ${(y0 + y1) / 2})`}
        fontFamily="var(--font-mono)"
        fontSize={10}
        letterSpacing="0.04em"
        fontWeight={700}
        fill="var(--cream-muted)"
      >
        PARAMETER %RSE
      </text>
      <text x={50} y={y0 + 14} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="var(--cream-faint)">
        high
      </text>
      <text x={50} y={y1 - 4} textAnchor="middle" fontFamily="var(--font-mono)" fontSize={9} fill="var(--cream-faint)">
        low
      </text>

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
        letterSpacing="0.04em"
        fontWeight={700}
        fill="var(--cream-muted)"
      >
        ADULT SAMPLE SIZE · N
      </text>

      {/* Plateau zone */}
      <rect
        x={x0 + ((50 - 20) / 80) * (x1 - x0)}
        y={y0}
        width={((100 - 50) / 80) * (x1 - x0)}
        height={y1 - y0}
        fill="color-mix(in srgb, var(--teal) 6%, var(--panel))"
      />

      {reduced ? (
        <path d={pathD} fill="none" stroke={stroke} strokeWidth={2.4} strokeLinecap="round" />
      ) : (
        <motion.path
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth={2.4}
          strokeLinecap="round"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.55, ease, delay: d }}
        />
      )}

      {/* Reference markers — solid */}
      <g opacity={0.7}>
        <circle cx={m20.x} cy={m20.y} r={4} fill="var(--cream-faint)" />
        <text x={m20.x + 8} y={m20.y - 6} fontFamily="var(--font-mono)" fontSize={9} fill="var(--cream-faint)">
          N=20
        </text>
        <circle cx={m100.x} cy={m100.y} r={4} fill="var(--cream-faint)" />
        <text x={m100.x - 36} y={m100.y - 6} fontFamily="var(--font-mono)" fontSize={9} fill="var(--cream-faint)">
          N=100
        </text>
      </g>

      {/* Hero marker — N = 60 · solid */}
      <g>
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
          x={m60.x - 62}
          y={y0 - 26}
          width={124}
          height={30}
          fill="var(--panel)"
          stroke={stroke}
          strokeWidth={1}
        />
        <line x1={m60.x - 62} y1={y0 - 26} x2={m60.x + 62} y2={y0 - 26} stroke={stroke} strokeWidth={3} />
        <text
          x={m60.x}
          y={y0 - 11}
          textAnchor="middle"
          dominantBaseline="middle"
          fontFamily="var(--font-mono)"
          fontSize={10.5}
          letterSpacing="0.03em"
          fontWeight={700}
          fill={stroke}
        >
          N = 60 · plateau
        </text>
      </g>

      <text
        x={x1}
        y={y1 + 56}
        textAnchor="end"
        fontFamily="var(--font-body)"
        fontSize={10}
        fontStyle="italic"
        fill="var(--cream-faint)"
      >
        illustrative · not a specific parameter
      </text>
    </svg>
  );
}
