import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * ApprovalTimeline — shared-element timeline that morphs between two
 * narrative states across slides 11 (challenge) and 13 (impact):
 *
 *   state="silence-emphasized" (slide 11)
 *     Adult track: FDA 2007 · EMA 2008 · PMDA 2010 — solid approvals.
 *     Pediatric track: dashed coral line from 2007 → 2021, with an
 *     amber "19 YEARS" label — the pediatric silence is visible.
 *
 *   state="closed-up" (slide 13)
 *     Adult track: same as above.
 *     Pediatric track: solid coral line from 2007 → 2025, with an
 *     amber "PMDA APR 2021 · EMA SEP 2021" label at 2021 — the silence
 *     has CLOSED. This is the editorial payoff.
 *
 * Both states share the same layoutId, so framer-motion's FLIP engine
 * animates the transition when the user navigates 11 → ... → 13. The
 * dashed segment fills in; the silence label morphs into the approval
 * label. That's the emotional beat of the case.
 *
 * Props:
 *   state      — "silence-emphasized" | "closed-up"   (required)
 *   layoutId   — defaults to "approval-timeline"      (overridable)
 *   compact    — shorter viewBox, used as a footer-strip on slide 11
 *
 * Motion gates:
 *   useReducedMotion() — bypasses layoutId when OS preference set.
 *
 * ViewBox: 900 × 140 (compact) or 900 × 180 (full). Wide aspect so
 * the SVG uses full-width rows cleanly. Y-axis layout:
 *   y=32  adult marker labels
 *   y=52  adult track dots + connector
 *   y=96  pediatric track (dashed or solid depending on state)
 *   y=120 amber label band (silence / approvals)
 */

const YEAR_MIN = 2005;
const YEAR_MAX = 2026;

const APPROVALS_ADULT = [
  { agency: 'FDA', year: 2007 },
  { agency: 'EMA', year: 2008 },
  { agency: 'PMDA', year: 2010 },
];

const APPROVALS_PEDS = [
  { agency: 'PMDA', year: 2021, labelMonth: 'APR' },
  { agency: 'EMA', year: 2021, labelMonth: 'SEP' },
];

const LAYOUT_TRANSITION = { duration: 1.1, ease: [0.4, 0, 0.2, 1] };

export default function ApprovalTimeline({
  state = 'silence-emphasized',
  layoutId = 'approval-timeline',
  compact = false,
  delay = 0,
}) {
  const reduce = useReducedMotion();

  const W = 900;
  const H = compact ? 140 : 180;
  const m = { t: 20, r: 60, b: 20, l: 60 };
  const iw = W - m.l - m.r;

  const x = (yr) => m.l + ((yr - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * iw;

  const yAdultLabels = m.t + 12;
  const yAdultTrack = m.t + 32;
  const yAxis = m.t + 60;
  const yPediTrack = m.t + 80;
  const yAmberLabel = m.t + 104;

  const TICKS = [2005, 2010, 2015, 2020, 2025];

  const coral = 'var(--coral, #FB923C)';
  const amber = 'var(--amber, #FFE14D)';
  const cream = 'var(--cream, #D7D4CC)';
  const creamMuted = 'var(--cream-muted, rgba(215,212,204,0.62))';
  const creamFaint = 'var(--cream-faint, rgba(215,212,204,0.38))';
  const hairline = 'var(--cream-hairline, rgba(215,212,204,0.14))';

  const isClosed = state === 'closed-up';

  // Pediatric track endpoints. In silence state, the dashed part runs
  // 2007 → 2021 then transitions to a short solid segment 2021 → 2025.
  // In closed state, the entire 2007 → 2025 track is solid coral.
  const pediStart = x(2007);
  const pediSilenceEnd = x(2021);
  const pediTrackEnd = x(YEAR_MAX);

  return (
    <motion.div
      {...(reduce ? {} : { layoutId })}
      layout
      transition={{ layout: LAYOUT_TRANSITION }}
      style={{ width: '100%', height: '100%', position: 'relative' }}
      aria-label={`Ambrisentan approval timeline — ${state}`}
    >
      <svg
        viewBox={`0 0 ${W} ${H}`}
        width="100%"
        preserveAspectRatio="xMidYMid meet"
        role="img"
        style={{ display: 'block', width: '100%', height: 'auto', maxHeight: '100%' }}
      >
        {/* Axis line (year baseline) */}
        <motion.line
          x1={m.l}
          y1={yAxis}
          x2={W - m.r}
          y2={yAxis}
          stroke={hairline}
          strokeWidth={1}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay + 0.1 }}
        />

        {/* Year ticks */}
        {TICKS.map((yr, i) => (
          <g key={yr}>
            <line
              x1={x(yr)}
              y1={yAxis - 3}
              x2={x(yr)}
              y2={yAxis + 3}
              stroke={hairline}
              strokeWidth={1}
            />
            <text
              x={x(yr)}
              y={yAxis + 14}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="10"
              fill={creamFaint}
            >
              {yr}
            </text>
          </g>
        ))}

        {/* ─── ADULT TRACK ─── labels + dots + leader lines ─── */}
        {APPROVALS_ADULT.map((a, i) => (
          <g key={`adult-${a.agency}`}>
            <motion.line
              x1={x(a.year)}
              y1={yAdultTrack + 5}
              x2={x(a.year)}
              y2={yAxis}
              stroke={coral}
              strokeWidth={1}
              opacity={0.5}
              initial={reduce ? { opacity: 0.5 } : { opacity: 0 }}
              animate={{ opacity: 0.5 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.45 + i * 0.1 }}
            />
            <motion.circle
              cx={x(a.year)}
              cy={yAdultTrack + 5}
              r={4}
              fill={coral}
              initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: reduce ? 0 : 0.3,
                ease: [0.34, 1.56, 0.64, 1],
                delay: reduce ? 0 : delay + 0.45 + i * 0.1,
              }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            />
            <motion.text
              x={x(a.year)}
              y={yAdultLabels}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight={600}
              letterSpacing="0.06em"
              fill={cream}
              initial={reduce ? { opacity: 1 } : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduce ? 0 : 0.3, delay: reduce ? 0 : delay + 0.5 + i * 0.1 }}
            >
              {a.agency} · {a.year}
            </motion.text>
          </g>
        ))}

        {/* ─── PEDIATRIC TRACK ───
            Morphs between dashed (silence) and solid (closed-up) based
            on state. Implemented as two overlaid lines so framer-motion
            can interpolate opacity between them during layoutId morph. */}

        {/* DASHED segment — only visible in silence state */}
        <motion.line
          x1={pediStart}
          y1={yPediTrack}
          x2={pediSilenceEnd}
          y2={yPediTrack}
          stroke={coral}
          strokeWidth={2.5}
          strokeDasharray="6 6"
          opacity={isClosed ? 0 : 0.85}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: isClosed ? 0 : 0.85,
          }}
          transition={{
            pathLength: { duration: reduce ? 0 : 0.9, delay: reduce ? 0 : delay + 0.8 },
            opacity: { duration: reduce ? 0 : 0.6 },
          }}
        />

        {/* SOLID segment — full from 2007→2025 in closed state,
            ghost-hidden in silence state. */}
        <motion.line
          x1={pediStart}
          y1={yPediTrack}
          x2={pediTrackEnd}
          y2={yPediTrack}
          stroke={coral}
          strokeWidth={2.5}
          opacity={isClosed ? 1 : 0}
          initial={reduce ? false : { pathLength: 0, opacity: 0 }}
          animate={{
            pathLength: 1,
            opacity: isClosed ? 1 : 0,
          }}
          transition={{
            pathLength: { duration: reduce ? 0 : 1.2, delay: reduce ? 0 : delay + 0.8 },
            opacity: { duration: reduce ? 0 : 0.6 },
          }}
        />

        {/* Pediatric 2021 marker — always rendered so the morph has
            a stable element to anchor. Small coral dot on the peds track. */}
        {APPROVALS_PEDS.map((p, i) => (
          <motion.circle
            key={`peds-${p.agency}`}
            cx={x(p.year)}
            cy={yPediTrack}
            r={4}
            fill={coral}
            stroke={cream}
            strokeWidth={0.6}
            initial={reduce ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{
              duration: reduce ? 0 : 0.3,
              ease: [0.34, 1.56, 0.64, 1],
              delay: reduce ? 0 : delay + 1.4 + i * 0.1,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
        ))}

        {/* ─── AMBER NARRATIVE LABEL ─── morphs between states ─── */}
        {!isClosed && (
          <motion.g
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay + 1.6 }}
          >
            <text
              x={(pediStart + pediSilenceEnd) / 2}
              y={yAmberLabel}
              textAnchor="middle"
              fontFamily="var(--font-display, var(--font-body))"
              fontSize="13"
              fontWeight={600}
              fontStyle="italic"
              fill={amber}
            >
              19 YEARS OF PEDIATRIC SILENCE
            </text>
          </motion.g>
        )}
        {isClosed && (
          <motion.g
            initial={reduce ? { opacity: 1 } : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduce ? 0 : 0.5, delay: reduce ? 0 : delay + 1.6 }}
          >
            <text
              x={x(2021)}
              y={yAmberLabel}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="11"
              fontWeight={600}
              letterSpacing="0.06em"
              fill={amber}
            >
              PMDA APR 2021 · EMA SEP 2021
            </text>
          </motion.g>
        )}

        {/* Track labels (ADULT / PEDIATRIC) on the left side */}
        <text
          x={m.l - 8}
          y={yAdultTrack + 5}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.22em"
          fill={creamMuted}
        >
          ADULT
        </text>
        <text
          x={m.l - 8}
          y={yPediTrack + 4}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="9.5"
          letterSpacing="0.22em"
          fill={creamMuted}
        >
          PEDIATRIC
        </text>
      </svg>
    </motion.div>
  );
}
