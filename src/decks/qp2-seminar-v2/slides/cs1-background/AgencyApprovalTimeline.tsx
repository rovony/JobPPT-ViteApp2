// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AgencyApprovalTimeline — compact 2-track timeline.
 *
 *   UPPER TRACK (adult approvals · coral dots)
 *      FDA 2007 · EMA 2008 · PMDA 2010
 *   AXIS (hairline, ticks at 2005/10/15/20/25)
 *   LOWER TRACK (pediatric · dashed cream-muted line, "unresolved" label)
 *
 * All tokens via CSS vars — no hex. Thin editorial lines only, no
 * logos, no flags, no gradient bars. Animation: axis draws first,
 * then adult markers stagger in, then pediatric dashed line + label.
 */
export default function AgencyApprovalTimeline({
  color = 'var(--case, var(--coral))',
  delay = 0.8,
  compact = false,
}) {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];

  // Compact mode viewBox is wider (6.9:1 aspect vs 1.9:1 full) so the
  // timeline actually USES the full-width slide 06 row. At 420×110
  // the SVG scaled to fit row height shrank to ~300px wide leaving
  // labels piled at the left. 900×130 scales up to the full 1400+px
  // row width cleanly, with room for staggered agency labels +
  // continuous-coverage bar running 2007→2025.
  const W = compact ? 900 : 420;
  const H = compact ? 130 : 220;
  const m = compact
    ? { t: 36, r: 60, b: 28, l: 60 }
    : { t: 32, r: 24, b: 30, l: 24 };
  const iw = W - m.l - m.r;

  const yAdult = m.t + (compact ? 18 : 48);        // adult marker track
  const yAxis  = m.t + (compact ? 50 : 82);        // axis baseline
  const yPedi  = m.t + 118;                         // pediatric — hidden when compact

  // Year → x-coordinate mapping (2005 → 2025)
  const YEAR_MIN = 2005;
  const YEAR_MAX = 2026;
  const x = (yr) => m.l + ((yr - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * iw;

  const TICKS = [2005, 2010, 2015, 2020, 2025];
  // Label stagger — FDA (2007) and EMA (2008) are only 1 userspace
  // unit apart; with a 900-unit viewBox that's still 43 units between
  // centers which is enough breathing room for 60px labels. Use a
  // stacked 3-row pattern in compact mode: FDA high, EMA higher still
  // with a leader, PMDA mid — every label clears its neighbor.
  const APPROVALS = compact
    ? [
        { agency: 'FDA',  year: 2007, labelYOffset: -6,  labelXAnchor: 'middle' },
        { agency: 'EMA',  year: 2008, labelYOffset: -28, labelXAnchor: 'middle' },
        { agency: 'PMDA', year: 2010, labelYOffset: -6,  labelXAnchor: 'middle' },
      ]
    : [
        { agency: 'FDA',  year: 2007, labelYOffset: 0,   labelXAnchor: 'end'    },
        { agency: 'EMA',  year: 2008, labelYOffset: -14, labelXAnchor: 'start'  },
        { agency: 'PMDA', year: 2010, labelYOffset: 0,   labelXAnchor: 'middle' },
      ];

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      width="100%"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Agency approval timeline showing FDA 2007, EMA 2008, PMDA 2010 adult approvals; pediatric track unresolved."
      style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '100%' }}
    >
      {/* Axis line */}
      <motion.line
        x1={m.l}
        y1={yAxis}
        x2={W - m.r}
        y2={yAxis}
        stroke="var(--cream-hairline)"
        strokeWidth={1}
        initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
      />

      {/* Axis ticks + year labels */}
      {TICKS.map((yr, i) => (
        <g key={yr}>
          <motion.line
            x1={x(yr)}
            y1={yAxis - 3}
            x2={x(yr)}
            y2={yAxis + 3}
            stroke="var(--cream-hairline)"
            strokeWidth={1}
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.35 + i * 0.04 }}
          />
          <motion.text
            x={x(yr)}
            y={yAxis + 14}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            fill="var(--cream-faint)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.35 + i * 0.04 }}
          >
            {yr}
          </motion.text>
        </g>
      ))}

      {/* Track label · adult (full variant only — compact relies on the
          'ADULT LABEL COVERAGE' eyebrow rendered by the host card). */}
      {!compact && (
        <motion.text
          x={m.l}
          y={m.t + 10}
          fontFamily="var(--font-mono)"
          fontSize="11"
          letterSpacing="0.18em"
          fill="var(--cream-muted)"
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.1 }}
        >
          ADULT · APPROVED
        </motion.text>
      )}

      {/* Coverage bar (compact only) — continuous coral stripe from
          FDA 2007 across the full axis, reading 'adult label in force
          through 2025'. Sits just below the axis hairline. */}
      {compact && (
        <>
          <motion.rect
            x={x(2007)}
            y={yAxis + 14}
            width={x(YEAR_MAX) - x(2007)}
            height={4}
            rx={1}
            fill={color}
            opacity={0.35}
            initial={reduce ? { scaleX: 1, opacity: 0.35 } : { scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.35 }}
            transition={{ duration: reduce ? 0 : 0.9, ease, delay: reduce ? 0 : delay + 1.1 }}
            style={{ transformOrigin: `${x(2007)}px ${yAxis + 16}px` }}
          />
          <motion.text
            x={(x(2007) + x(YEAR_MAX)) / 2}
            y={yAxis + 32}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.22em"
            fill="var(--cream-faint)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.4, delay: reduce ? 0 : delay + 1.6 }}
          >
            ADULT LABEL IN FORCE
          </motion.text>
        </>
      )}

      {/* Adult approval markers */}
      {APPROVALS.map((a, i) => (
        <g key={a.agency}>
          {/* Connector — dot to axis */}
          <motion.line
            x1={x(a.year)}
            y1={yAdult + 5}
            x2={x(a.year)}
            y2={yAxis}
            stroke={color}
            strokeWidth={1}
            opacity={0.5}
            initial={reduce ? { pathLength: 1, opacity: 0.5 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.5 }}
            transition={{
              duration: reduce ? 0 : 0.3,
              ease,
              delay: reduce ? 0 : delay + 0.6 + i * 0.15,
            }}
          />
          {/* Dot */}
          <motion.circle
            cx={x(a.year)}
            cy={yAdult + 5}
            r={4}
            fill={color}
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.3,
              ease: [0.34, 1.56, 0.64, 1],
              delay: reduce ? 0 : delay + 0.6 + i * 0.15,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          {/* Leader line if label is offset vertically (EMA case) */}
          {a.labelYOffset < 0 && (
            <motion.line
              x1={x(a.year)}
              y1={yAdult + 1}
              x2={x(a.year) + 4}
              y2={yAdult - 4 + a.labelYOffset + 2}
              stroke={color}
              strokeWidth={0.8}
              opacity={0.5}
              initial={reduce ? { opacity: 0.5 } : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: reduce ? 0 : 0.25, delay: reduce ? 0 : delay + 0.7 + i * 0.15 }}
            />
          )}
          {/* Agency label */}
          <motion.text
            x={x(a.year) + (a.labelXAnchor === 'end' ? -6 : a.labelXAnchor === 'start' ? 6 : 0)}
            y={yAdult - 4 + (a.labelYOffset || 0)}
            textAnchor={a.labelXAnchor}
            fontFamily="var(--font-mono)"
            fontSize={compact ? 13 : 12}
            letterSpacing={compact ? '0.08em' : 'normal'}
            fontWeight={600}
            fill="var(--cream)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.7 + i * 0.15 }}
          >
            {a.agency} · {a.year}
          </motion.text>
        </g>
      ))}

      {/* Pediatric row — full variant only. Compact uses the card's
          own ADULT LABEL COVERAGE eyebrow and a single-track chart. */}
      {!compact && (
        <>
          <motion.text
            x={m.l}
            y={yPedi - 6}
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.18em"
            fill="var(--cream-faint)"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 1.25 }}
          >
            PEDIATRIC
          </motion.text>

          <motion.line
            x1={m.l}
            y1={yPedi + 6}
            x2={W - m.r}
            y2={yPedi + 6}
            stroke="var(--cream-dim)"
            strokeWidth={1.2}
            strokeDasharray="4 5"
            initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: reduce ? 0 : 0.7, ease, delay: reduce ? 0 : delay + 1.35 }}
          />

          <motion.text
            x={W - m.r}
            y={yPedi + 20}
            textAnchor="end"
            fontFamily="var(--font-mono)"
            fontSize="11"
            letterSpacing="0.12em"
            fill="var(--cream-faint)"
            fontStyle="italic"
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 1.7 }}
          >
            unresolved
          </motion.text>
        </>
      )}
    </svg>
  );
}
