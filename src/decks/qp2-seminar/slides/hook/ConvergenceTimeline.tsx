import React from 'react';
import { useTokens } from '@/lib/token';

/**
 * ConvergenceTimeline — hero viz for Slide 02 (redesign).
 *
 * Concept: ONE horizontal time axis (2007 → 2026). For 19 years
 * (2007→2021) a DASHED muted line represents "pediatric label silence"
 * with an inline "NOT ESTABLISHED" caption. At 2021 a single vertical
 * column holds a STACKED EMA + PMDA event block — one moment, two
 * agencies — anchored by the 2021 marker. Post-2021 the line becomes
 * solid amber: "ESTABLISHED".
 *
 * No pill badge, no crossing connectors, no competing spikes. Just a
 * calm, high-contrast reading: silence → event → resolution.
 *
 * GSAP drives entrance via data-el selectors (see 02-hook.jsx).
 * Tokens only — no hardcoded colors. SVG uses xMidYMid meet with a
 * compact viewBox aspect so it fills the Viz cell cleanly.
 */

const VB_W = 1728;
const VB_H = 360;

// Single shared axis line — chart reads as one horizontal beat.
const Y_AXIS = 240;

// 2021 event column — stacked agency rows ABOVE the axis.
const Y_PMDA_ROW = 150;
const Y_EMA_ROW  = 96;
const Y_LEGEND   = 42;  // "TWO AGENCIES · ONE MODEL" overline

// 19-year bracket BELOW the axis.
const Y_BRACKET = 298;
const Y_YEAR_TXT = 328;

// X positions.
const X_LEFT = 80;
const X_RIGHT = 1648;
const X_2021 = 1160;
const X_COL_LEFT = X_2021 - 220;  // left edge of event column
const X_COL_RIGHT = X_2021 + 220; // right edge

const YEARS = [
  { year: 2007, x: X_LEFT },
  { year: 2010, x: 300 },
  { year: 2014, x: 600 },
  { year: 2018, x: 900 },
  { year: 2021, x: X_2021 },
  { year: 2026, x: 1500 },
];

export default function ConvergenceTimeline() {
  const T = useTokens(['--amber', '--coral', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline', '--bg', '--panel']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="block"
      style={{ width: '100%', height: '100%', maxHeight: '100%' }}
      aria-label="Timeline 2007 to 2026 — 19 years of pediatric label silence, resolved in 2021 by simultaneous EMA and PMDA approvals on one PopPK model"
    >
      {/* ═══════════ PRE-2021 · THE SILENCE ═══════════ */}

      {/* Dashed silent line 2007 → 2021 */}
      <line
        data-el="silent-line"
        x1={X_LEFT} y1={Y_AXIS}
        x2={X_COL_LEFT - 8} y2={Y_AXIS}
        stroke={tk('--cream-faint')}
        strokeWidth={1.5}
        strokeDasharray="4 7"
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />

      {/* Inline silence caption — sits above the dashed line */}
      <text
        data-el="silence-caption"
        x={(X_LEFT + X_COL_LEFT) / 2}
        y={Y_AXIS - 24}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize="24"
        fontStyle="italic"
        fontWeight="400"
        fill={tk('--cream-muted')}
        opacity={0}
      >
        "Safety and effectiveness have not been established."
      </text>

      {/* ═══════════ 2021 · THE EVENT COLUMN ═══════════ */}

      {/* Legend overline */}
      <text
        data-el="event-legend"
        x={X_2021}
        y={Y_LEGEND}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="17"
        fontWeight="600"
        letterSpacing="0.26em"
        fill={tk('--amber')}
        opacity={0}
      >
        TWO AGENCIES · ONE POPPK MODEL
      </text>

      {/* Vertical spine connecting the stacked rows to the axis */}
      <line
        data-el="event-spine"
        x1={X_2021} y1={Y_LEGEND + 14}
        x2={X_2021} y2={Y_AXIS}
        stroke={tk('--amber')}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />

      {/* EMA row (amber, top) */}
      <g data-el="row-ema" opacity={0} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <rect
          x={X_COL_LEFT}
          y={Y_EMA_ROW - 26}
          width={X_COL_RIGHT - X_COL_LEFT}
          height={52}
          rx={2}
          fill={tk('--panel')}
          stroke={tk('--cream-hairline')}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={X_COL_LEFT + 26} cy={Y_EMA_ROW} r={7} fill={tk('--amber')} />
        <text
          x={X_COL_LEFT + 46}
          y={Y_EMA_ROW + 6}
          fontFamily="var(--font-mono)"
          fontSize="19"
          fontWeight="700"
          letterSpacing="0.18em"
          fill={tk('--amber')}
        >
          EMA
        </text>
        <text
          x={X_COL_LEFT + 120}
          y={Y_EMA_ROW + 6}
          fontFamily="var(--font-mono)"
          fontSize="17"
          fontWeight="500"
          letterSpacing="0.16em"
          fill={tk('--cream')}
        >
          SEP 2021 · AGES 8–17
        </text>
      </g>

      {/* PMDA row (coral, bottom) */}
      <g data-el="row-pmda" opacity={0} style={{ transformBox: 'fill-box', transformOrigin: 'center' }}>
        <rect
          x={X_COL_LEFT}
          y={Y_PMDA_ROW - 26}
          width={X_COL_RIGHT - X_COL_LEFT}
          height={52}
          rx={2}
          fill={tk('--panel')}
          stroke={tk('--cream-hairline')}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <circle cx={X_COL_LEFT + 26} cy={Y_PMDA_ROW} r={7} fill={tk('--coral')} />
        <text
          x={X_COL_LEFT + 46}
          y={Y_PMDA_ROW + 6}
          fontFamily="var(--font-mono)"
          fontSize="19"
          fontWeight="700"
          letterSpacing="0.18em"
          fill={tk('--coral')}
        >
          PMDA
        </text>
        <text
          x={X_COL_LEFT + 120}
          y={Y_PMDA_ROW + 6}
          fontFamily="var(--font-mono)"
          fontSize="17"
          fontWeight="500"
          letterSpacing="0.16em"
          fill={tk('--cream')}
        >
          APR 2021 · AGES 8–17
        </text>
      </g>

      {/* 2021 axis node — sits ON the axis */}
      <circle
        data-el="axis-node"
        cx={X_2021}
        cy={Y_AXIS}
        r={8}
        fill={tk('--amber')}
        opacity={0}
      />

      {/* ═══════════ POST-2021 · RESOLVED ═══════════ */}

      <line
        data-el="resolved-line"
        x1={X_COL_RIGHT + 8} y1={Y_AXIS}
        x2={X_RIGHT - 24} y2={Y_AXIS}
        stroke={tk('--amber')}
        strokeWidth={2}
        strokeLinecap="round"
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />
      {/* Forward-arrow cap — line continues into the future */}
      <polyline
        data-el="resolved-arrow"
        points={`${X_RIGHT - 24},${Y_AXIS - 6} ${X_RIGHT - 4},${Y_AXIS} ${X_RIGHT - 24},${Y_AXIS + 6}`}
        fill="none"
        stroke={tk('--amber')}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />
      {/* Inline caption — sits ABOVE the resolved line (parallel to the
          silence caption above the dashed line). Avoids the knockout
          fragility of stroking through letter spacing and gives the
          composition a clean above-axis editorial cadence on both
          halves of the timeline. */}
      <g data-el="resolved-caption" opacity={0}>
        <text
          x={(X_COL_RIGHT + X_RIGHT) / 2 + 30}
          y={Y_AXIS - 24}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="17"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={tk('--amber')}
        >
          PEDIATRIC USE ESTABLISHED
        </text>
      </g>

      {/* ═══════════ AXIS · YEAR TICKS ═══════════ */}

      {YEARS.map(({ year, x }) => {
        const is2021 = year === 2021;
        return (
          <g key={year} data-el="year-tick" opacity={0}>
            <line
              x1={x} y1={Y_AXIS + 6}
              x2={x} y2={Y_AXIS + 14}
              stroke={is2021 ? tk('--amber') : tk('--cream-faint')}
              strokeWidth={1}
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={x}
              y={Y_YEAR_TXT}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="17"
              fontWeight={is2021 ? 700 : 500}
              letterSpacing="0.22em"
              fill={is2021 ? tk('--amber') : tk('--cream-faint')}
            >
              {year}
            </text>
          </g>
        );
      })}

      {/* ═══════════ 19-YEAR BRACKET (below axis) ═══════════ */}

      <g data-el="year-bracket" opacity={0}>
        <line
          x1={X_LEFT} y1={Y_BRACKET}
          x2={X_2021} y2={Y_BRACKET}
          stroke={tk('--cream-faint')}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={X_LEFT} y1={Y_BRACKET - 6}
          x2={X_LEFT} y2={Y_BRACKET + 6}
          stroke={tk('--cream-faint')}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <line
          x1={X_2021} y1={Y_BRACKET - 6}
          x2={X_2021} y2={Y_BRACKET + 6}
          stroke={tk('--cream-faint')}
          strokeWidth={1}
          vectorEffect="non-scaling-stroke"
        />
        <rect
          x={(X_LEFT + X_2021) / 2 - 130}
          y={Y_BRACKET - 12}
          width={260}
          height={24}
          fill={tk('--bg')}
        />
        <text
          x={(X_LEFT + X_2021) / 2}
          y={Y_BRACKET + 6}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="16"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={tk('--coral')}
        >
          19 YEARS OF SILENCE
        </text>
      </g>
    </svg>
  );
}