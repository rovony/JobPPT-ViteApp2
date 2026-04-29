// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import * as d3 from 'd3';

/**
 * ICHM15Timeline — editorial horizontal milestone axis (2023→2026 Q4).
 *
 * Five M15-related events plotted as motion.circle nodes along a single
 * horizontal axis. Year ticks (2023/2024/2025/2026), one drawn-on
 * baseline (motion.line with pathLength). Each node has a date label
 * BELOW (mono, tabular-nums) and a one-line title ABOVE. Adopted /
 * effective milestones are amber-filled; earlier ones are cream-faint.
 *
 * Used on cs4-04 (why-now), above the 3 implication cards.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const MILESTONES = [
  { date: '2023-Q4', t: new Date(2023, 9, 1),  title: 'ICH M15 working group',   live: false },
  { date: '2024-Q3', t: new Date(2024, 6, 15), title: 'Concept paper',           live: false },
  { date: '2025-Q4', t: new Date(2025, 9, 1),  title: 'Step 2 draft',            live: false },
  { date: '2026-01-29', t: new Date(2026, 0, 29), title: 'Step 4 adopted',       live: true },
  { date: '2026-07-23', t: new Date(2026, 6, 23), title: 'EU effective',         live: true },
];

const TODAY = new Date(2026, 3, 29); // Apr 29, 2026 (talk date)

export default function ICHM15Timeline({ go = true, delay = 0 }) {
  const reduce = useReducedMotion();
  const motionGo = go && !reduce;

  const W = 920;
  const H = 140;
  const m = { top: 30, right: 36, bottom: 56, left: 36 };
  const iw = W - m.left - m.right;
  const ih = H - m.top - m.bottom;

  const xMin = new Date(2023, 0, 1);
  const xMax = new Date(2026, 11, 31);
  const x = d3.scaleTime().domain([xMin, xMax]).range([0, iw]);

  const yearTicks = [
    new Date(2023, 0, 1),
    new Date(2024, 0, 1),
    new Date(2025, 0, 1),
    new Date(2026, 0, 1),
  ];

  const baselineY = m.top + ih * 0.55;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: 'auto', display: 'block' }}
      aria-label="ICH M15 milestone timeline 2023–2026"
    >
      <g transform={`translate(${m.left},0)`}>
        {/* Baseline — single hairline drawn left-to-right */}
        <motion.line
          x1={0}
          x2={iw}
          y1={baselineY}
          y2={baselineY}
          stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
          strokeWidth={1}
          initial={reduce ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.1, ease: EASE, delay }}
        />

        {/* Year ticks */}
        {yearTicks.map((d, i) => (
          <g key={`yr${i}`}>
            <line
              x1={x(d)}
              x2={x(d)}
              y1={baselineY - 4}
              y2={baselineY + 4}
              stroke="var(--cream-hairline, rgba(255,232,189,0.18))"
              strokeWidth={1}
            />
            <text
              x={x(d)}
              y={baselineY + 16}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              letterSpacing="1.2"
              fill="var(--cream-faint, rgba(255,232,189,0.35))"
              fontWeight={600}
            >
              {d.getFullYear()}
            </text>
          </g>
        ))}

        {/* "TODAY" mark — hairline + label */}
        <motion.line
          x1={x(TODAY)}
          x2={x(TODAY)}
          y1={m.top - 4}
          y2={baselineY + 6}
          stroke="var(--cream-muted, rgba(255,232,189,0.65))"
          strokeWidth={1}
          strokeDasharray="2 3"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.8 }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 1.2 }}
        />
        <motion.text
          x={x(TODAY)}
          y={m.top - 8}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="8"
          letterSpacing="1.4"
          fill="var(--cream-muted, rgba(255,232,189,0.65))"
          initial={reduce ? false : { opacity: 0 }}
          animate={{ opacity: 0.85 }}
          transition={{ duration: 0.5, ease: EASE, delay: delay + 1.4 }}
        >
          TODAY
        </motion.text>

        {/* Milestone nodes */}
        {MILESTONES.map((mlt, i) => {
          const cx = x(mlt.t);
          const fill = mlt.live ? 'var(--amber, #d4a373)' : 'var(--bg, #1a1612)';
          const stroke = mlt.live ? 'var(--amber, #d4a373)' : 'var(--cream-faint, rgba(255,232,189,0.45))';
          const titleY = baselineY - 16;
          const dateY = baselineY + 38;
          /* Stagger title alternation above/below to avoid label overlap. */
          const offsetTitle = i % 2 === 0 ? 0 : -18;
          return (
            <g key={`m${i}`}>
              {/* Connector hairline from node up to title */}
              <motion.line
                x1={cx}
                x2={cx}
                y1={baselineY - 6}
                y2={titleY + offsetTitle - 4}
                stroke={mlt.live ? 'var(--amber, #d4a373)' : 'var(--cream-hairline, rgba(255,232,189,0.18))'}
                strokeOpacity={mlt.live ? 0.7 : 0.5}
                strokeWidth={1}
                initial={reduce ? false : { pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.45, ease: EASE, delay: delay + 0.6 + i * 0.18 }}
              />
              {/* Node ring + (if live) inner pulse */}
              <motion.circle
                cx={cx}
                cy={baselineY}
                r={mlt.live ? 6.5 : 4.5}
                fill={fill}
                stroke={stroke}
                strokeWidth={mlt.live ? 2 : 1}
                initial={reduce ? false : { scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.45, ease: EASE, delay: delay + 0.7 + i * 0.18 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              />
              {mlt.live && (
                <motion.circle
                  cx={cx}
                  cy={baselineY}
                  r={6.5}
                  fill="none"
                  stroke="var(--amber, #d4a373)"
                  strokeWidth={1}
                  strokeOpacity={0.4}
                  initial={reduce ? false : { scale: 0.6, opacity: 0 }}
                  animate={
                    reduce
                      ? { scale: 1, opacity: 0.4 }
                      : { scale: [0.7, 1.5, 0.7], opacity: [0.6, 0, 0.6] }
                  }
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { duration: 2.4, ease: EASE, delay: delay + 1.0 + i * 0.18, repeat: Infinity }
                  }
                  style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                />
              )}
              {/* Title above */}
              <motion.text
                x={cx}
                y={titleY + offsetTitle}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="1"
                fill={mlt.live ? 'var(--amber, #d4a373)' : 'var(--cream-muted, rgba(255,232,189,0.65))'}
                fontWeight={mlt.live ? 700 : 500}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 0.9 + i * 0.18 }}
              >
                {mlt.title}
              </motion.text>
              {/* Date below */}
              <motion.text
                x={cx}
                y={dateY}
                textAnchor="middle"
                fontFamily="var(--font-mono)"
                fontSize="10"
                letterSpacing="0.8"
                fill={mlt.live ? 'var(--amber, #d4a373)' : 'var(--cream-faint, rgba(255,232,189,0.45))'}
                initial={reduce ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, ease: EASE, delay: delay + 1.0 + i * 0.18 }}
                style={{ fontVariantNumeric: 'tabular-nums' }}
              >
                {mlt.date}
              </motion.text>
            </g>
          );
        })}
      </g>
      {/* Caption — bottom center */}
      <text
        x={W / 2}
        y={H - 6}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="9"
        letterSpacing="1.4"
        fill="var(--cream-faint, rgba(255,232,189,0.45))"
      >
        ICH M15 · MULTI-AGENT SYSTEMS IN GxP · STEP 2 DRAFT → STEP 4 ADOPTION
      </text>
    </svg>
  );
}
