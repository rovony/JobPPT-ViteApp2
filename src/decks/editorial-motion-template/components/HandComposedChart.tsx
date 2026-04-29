import { motion, useReducedMotion } from "framer-motion";
import { useMemo } from "react";
import * as d3 from "d3";
import { EASE } from "../assets/easings";

/**
 * D1 — Hand-Composed Chart (D3 + React/SVG).
 *
 * A pcVPC-style chart: percentile prediction bands (5th, 50th, 95th) with
 * observed points overlaid. NOT a chart library — every element is JSX so
 * each axis tick, gridline, and percentile fill is independently styleable
 * and animatable.
 *
 * Demonstrates D1 + C2 (cascade for entrance) + C3 (delay table).
 */
export function HandComposedChart({
  width = 720,
  height = 360,
  margin = { top: 20, right: 30, bottom: 40, left: 50 },
  delay = 0,
}: {
  width?: number;
  height?: number;
  margin?: { top: number; right: number; bottom: number; left: number };
  delay?: number;
}) {
  const reduced = useReducedMotion();
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;

  // Synthetic pharmacokinetic concentration-time data
  const data = useMemo(() => generatePcVpcData(), []);

  const xScale = useMemo(
    () =>
      d3
        .scaleLinear()
        .domain([0, 24])
        .range([0, innerWidth]),
    [innerWidth]
  );
  const yScale = useMemo(
    () =>
      d3
        .scaleLog()
        .domain([0.05, 50])
        .range([innerHeight, 0])
        .nice(),
    [innerHeight]
  );

  // Area generator for the 5–95th percentile band
  const areaGen = useMemo(
    () =>
      d3
        .area<{ time: number; p05: number; p95: number }>()
        .x((d) => xScale(d.time))
        .y0((d) => yScale(d.p05))
        .y1((d) => yScale(d.p95))
        .curve(d3.curveMonotoneX),
    [xScale, yScale]
  );

  // Line generator for median
  const lineGen = useMemo(
    () =>
      d3
        .line<{ time: number; p50: number }>()
        .x((d) => xScale(d.time))
        .y((d) => yScale(d.p50))
        .curve(d3.curveMonotoneX),
    [xScale, yScale]
  );

  const xTicks = xScale.ticks(6);
  const yTicks = yScale.ticks(5);

  // Choreography table (C3)
  const D = {
    axes: delay + 0.0,
    band: delay + 0.3,
    line: delay + 0.7,
    points: delay + 1.1,
  };

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width="100%"
      style={{ maxWidth: width, height: "auto" }}
      aria-label="Population PK concentration vs time, with 5–95th percentile prediction band, median line, and observed points"
    >
      <defs>
        <linearGradient id="band-gradient" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="var(--case)" stopOpacity="0.18" />
          <stop offset="100%" stopColor="var(--case)" stopOpacity="0.08" />
        </linearGradient>
      </defs>

      <g transform={`translate(${margin.left},${margin.top})`}>
        {/* Y gridlines */}
        {yTicks.map((t, i) => (
          <motion.line
            key={`yg-${t}`}
            x1={0}
            x2={innerWidth}
            y1={yScale(t)}
            y2={yScale(t)}
            stroke="var(--hairline)"
            strokeWidth="0.5"
            initial={reduced ? false : { opacity: 0, scaleX: 0 }}
            animate={{ opacity: 1, scaleX: 1 }}
            style={{ transformOrigin: "left center" }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : D.axes + i * 0.04,
              ease: EASE.expoOut,
            }}
          />
        ))}

        {/* Y axis */}
        <motion.line
          x1={0}
          x2={0}
          y1={0}
          y2={innerHeight}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : D.axes,
            ease: EASE.expoOut,
          }}
        />
        {yTicks.map((t) => (
          <g key={`yt-${t}`}>
            <line
              x1={-4}
              x2={0}
              y1={yScale(t)}
              y2={yScale(t)}
              stroke="var(--hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={-8}
              y={yScale(t)}
              textAnchor="end"
              dominantBaseline="middle"
              fill="var(--ink-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {t < 1 ? t.toFixed(1) : t}
            </text>
          </g>
        ))}

        {/* X axis */}
        <motion.line
          x1={0}
          x2={innerWidth}
          y1={innerHeight}
          y2={innerHeight}
          stroke="var(--hairline-strong)"
          strokeWidth="1"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0 : 0.5,
            delay: reduced ? 0 : D.axes + 0.1,
            ease: EASE.expoOut,
          }}
        />
        {xTicks.map((t) => (
          <g key={`xt-${t}`}>
            <line
              x1={xScale(t)}
              x2={xScale(t)}
              y1={innerHeight}
              y2={innerHeight + 4}
              stroke="var(--hairline-strong)"
              strokeWidth="1"
            />
            <text
              x={xScale(t)}
              y={innerHeight + 18}
              textAnchor="middle"
              fill="var(--ink-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              {t}
            </text>
          </g>
        ))}

        {/* Axis labels */}
        <text
          x={innerWidth / 2}
          y={innerHeight + 35}
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.08em"
        >
          TIME (h)
        </text>
        <text
          x={-innerHeight / 2}
          y={-38}
          textAnchor="middle"
          fill="var(--ink-muted)"
          fontFamily="var(--font-mono)"
          fontSize="10"
          letterSpacing="0.08em"
          transform="rotate(-90)"
        >
          CONCENTRATION (mg/L)
        </text>

        {/* Prediction band (5–95th percentile) */}
        <motion.path
          d={areaGen(data) ?? undefined}
          fill="url(#band-gradient)"
          stroke="none"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            duration: reduced ? 0 : 0.8,
            delay: reduced ? 0 : D.band,
            ease: EASE.expoOut,
          }}
        />

        {/* Median line — C6 path-drawing */}
        <motion.path
          d={lineGen(data) ?? undefined}
          fill="none"
          stroke="var(--case)"
          strokeWidth="2"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{
            duration: reduced ? 0 : 1.2,
            delay: reduced ? 0 : D.line,
            ease: EASE.expoOut,
          }}
        />

        {/* Observed points (cascade in) */}
        {data
          .filter((_, i) => i % 2 === 0)
          .map((d, i, arr) => {
            const jitter = (Math.sin(i * 1.7) - 0.5) * 0.12;
            const obs = d.p50 * (1 + jitter);
            return (
              <motion.circle
                key={`obs-${i}`}
                cx={xScale(d.time)}
                cy={yScale(obs)}
                r="3"
                fill="var(--bg)"
                stroke="var(--ink)"
                strokeWidth="1.25"
                initial={reduced ? false : { opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.3,
                  delay: reduced ? 0 : D.points + (i / arr.length) * 0.6,
                  ease: EASE.expoOut,
                }}
              />
            );
          })}

        {/* Legend (top-right inside chart) */}
        <g transform={`translate(${innerWidth - 130}, 8)`}>
          <motion.g
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.4,
              delay: reduced ? 0 : D.points + 0.6,
            }}
          >
            <rect width="12" height="8" y="-4" fill="url(#band-gradient)" />
            <text
              x="18"
              y="2"
              fill="var(--ink-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              5–95% PI
            </text>
            <line
              x1={0}
              x2={12}
              y1={14}
              y2={14}
              stroke="var(--case)"
              strokeWidth="2"
            />
            <text
              x="18"
              y="18"
              fill="var(--ink-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              MEDIAN
            </text>
            <circle
              cx={6}
              cy={30}
              r="3"
              fill="var(--bg)"
              stroke="var(--ink)"
              strokeWidth="1"
            />
            <text
              x="18"
              y="34"
              fill="var(--ink-muted)"
              fontFamily="var(--font-mono)"
              fontSize="10"
            >
              OBSERVED
            </text>
          </motion.g>
        </g>
      </g>
    </svg>
  );
}

/* ============================================================
 * Synthetic data generator — concentration-time curve with
 * percentile bands. Roughly mimics a 1-compartment PK profile.
 * ============================================================ */
function generatePcVpcData() {
  const points: { time: number; p05: number; p50: number; p95: number }[] = [];
  const dose = 100;
  const ka = 1.5;
  const ke = 0.18;
  const v = 50;

  for (let t = 0; t <= 24; t += 0.5) {
    const base =
      ((dose * ka) / (v * (ka - ke))) * (Math.exp(-ke * t) - Math.exp(-ka * t));
    const c = Math.max(base, 0.01);
    points.push({
      time: t,
      p50: c,
      p05: c * 0.4,
      p95: c * 2.0,
    });
  }
  return points;
}
