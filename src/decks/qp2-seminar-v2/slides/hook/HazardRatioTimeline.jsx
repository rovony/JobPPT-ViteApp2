import React from 'react';
import { useTokens } from '@/lib/token';

/**
 * HazardRatioTimeline — hero viz for Slide 02 (v2 hook · the Sildenafil trauma).
 *
 * One dominant visual carrying ONE argument: between 2007 and 2012, a
 * pediatric pulmonary-hypertension trial discovered a dose-dependent
 * mortality signal — hazard ratio ≈ 3.95 — and the FDA closed the
 * trial-design space.
 *
 * Composition (top → bottom inside one shared time axis 2007 → 2014):
 *   · TOP — coral hazard-ratio fever curve. Flat at HR=1 (unity)
 *     2007 → 2010, then climbs sharply to HR≈3.95 by Aug 2012. The
 *     apex carries a callout with the "HR 3.95" stat in display type.
 *     A dashed unity line anchors HR=1 across the full width.
 *   · MIDDLE — the year axis with three event markers (STARTS-2
 *     enrolled, mortality signal, FDA Drug Safety Communication) and
 *     short labels.
 *   · RIGHT — a coral wedge fill from Aug 2012 onward, labeled
 *     "TRIAL DESIGN SPACE CLOSED" — the editorial "door slams" that
 *     sets up "the model becomes the evidence."
 *
 * No competing curves, no second color. Coral is the danger color and
 * carries the argument from start to finish. Tabular numerals, one
 * stat callout, no decoration.
 *
 * GSAP entrance is choreographed by the parent (02-hook.jsx) via
 * data-el selectors — keeps motion logic adjacent to slide rhythm.
 */

const VB_W = 1728;
const VB_H = 540;

// ─── X axis: years 2007 → 2014 ──────────────────────────────
const X_LEFT = 80;
const X_RIGHT = 1648;
const Y2007 = 2007;
const Y2014 = 2014;

const xAt = (year) =>
  X_LEFT + ((year - Y2007) / (Y2014 - Y2007)) * (X_RIGHT - X_LEFT);

// Event year anchors (decimal years for sub-year precision).
const X_2007 = xAt(2007);
const X_2010 = xAt(2010);
const X_2012 = xAt(2012.66); // late Aug 2012 ≈ 2012 + 8/12
const X_2014 = xAt(2014);

// ─── Y axis: hazard ratio, 0 → 4.4 (headroom above 3.95 apex) ──
const Y_BASELINE = 320;     // HR = 0 (chart bottom)
const Y_APEX = 60;          // HR = 4.4 (chart top headroom)
const HR_MIN = 0;
const HR_MAX = 4.4;
const yAtHR = (hr) =>
  Y_BASELINE - ((hr - HR_MIN) / (HR_MAX - HR_MIN)) * (Y_BASELINE - Y_APEX);

const Y_HR_1 = yAtHR(1.0);     // unity line
const Y_HR_3_95 = yAtHR(3.95); // STARTS-2 apex

// ─── Bottom axis + beat label rows ──────────────────────────
const Y_AXIS = 380;       // year axis line
const Y_TICK_END = 392;   // axis tick bottom
const Y_YEAR_TXT = 416;   // year numerals
const Y_BEAT_LINE_1 = 452; // beat label line 1
const Y_BEAT_LINE_2 = 478; // beat label line 2

const YEARS = [
  { year: 2007, x: X_2007 },
  { year: 2010, x: X_2010 },
  { year: 2012, x: X_2012, emphasized: true },
  { year: 2014, x: X_2014 },
];

// HR climb path (cubic Bézier). Flat through 2010, steepens to apex.
const HR_PATH = (() => {
  const p0 = `${X_2007},${Y_HR_1}`;
  const p1 = `${X_2010},${Y_HR_1}`;
  // Control points pull the climb sharp between 2010-2012.
  const c1x = X_2010 + (X_2012 - X_2010) * 0.55;
  const c1y = Y_HR_1;
  const c2x = X_2012 - (X_2012 - X_2010) * 0.20;
  const c2y = Y_HR_3_95 + 30;
  const p2 = `${X_2012},${Y_HR_3_95}`;
  return `M ${p0} L ${p1} C ${c1x},${c1y} ${c2x},${c2y} ${p2}`;
})();

export default function HazardRatioTimeline() {
  const T = useTokens([
    '--coral', '--cream', '--cream-muted', '--cream-faint',
    '--cream-hairline', '--bg', '--panel',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <svg
      viewBox={`0 0 ${VB_W} ${VB_H}`}
      preserveAspectRatio="xMidYMid meet"
      className="block"
      style={{ width: '100%', height: '100%', maxHeight: '100%' }}
      aria-label="Hazard-ratio timeline 2007–2014. Mortality hazard ratio for high-dose pediatric sildenafil climbs from unity in 2007 to 3.95 by August 2012, when the FDA Drug Safety Communication closes the pediatric trial design space."
    >
      {/* ═══════════ TRIAL DESIGN SPACE CLOSED · coral wedge ═══════════ */}
      {/* Sits BEHIND everything else so the curve and apex marker read on
          top. Spans Aug 2012 → 2014 across the full chart height. */}
      <g data-el="closed-wedge" opacity={0}>
        <rect
          x={X_2012}
          y={Y_APEX - 20}
          width={X_RIGHT - X_2012}
          height={Y_AXIS - (Y_APEX - 20)}
          fill={tk('--coral')}
          fillOpacity={0.06}
        />
        <line
          x1={X_2012}
          y1={Y_APEX - 20}
          x2={X_2012}
          y2={Y_AXIS}
          stroke={tk('--coral')}
          strokeWidth={1}
          strokeDasharray="3 5"
          strokeLinecap="round"
          opacity={0.45}
          vectorEffect="non-scaling-stroke"
        />
        {/* Label hugs the RIGHT edge of the wedge so it doesn't collide
            with the apex stat ("HR 3.95") sitting just left of X_2012. */}
        <text
          x={X_RIGHT - 28}
          y={Y_APEX + 4}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={tk('--coral')}
        >
          TRIAL DESIGN SPACE CLOSED
        </text>
        <text
          x={X_RIGHT - 28}
          y={Y_APEX + 26}
          textAnchor="end"
          fontFamily="var(--font-display)"
          fontSize="15"
          fontStyle="italic"
          fontWeight="400"
          fill={tk('--cream-muted')}
        >
          ethically and statistically impossible
        </text>
      </g>

      {/* ═══════════ Y AXIS · HR scale labels (left margin) ═══════════ */}
      <g data-el="hr-scale" opacity={0}>
        {[0, 1, 2, 3, 4].map((hr) => (
          <g key={hr}>
            <text
              x={X_LEFT - 14}
              y={yAtHR(hr) + 5}
              textAnchor="end"
              fontFamily="var(--font-mono)"
              fontSize="14"
              fontWeight="500"
              letterSpacing="0.16em"
              fill={hr === 1 ? tk('--cream-muted') : tk('--cream-faint')}
              style={{ fontFeatureSettings: '"tnum"' }}
            >
              {hr.toFixed(1)}
            </text>
          </g>
        ))}
        <text
          x={X_LEFT - 14}
          y={Y_APEX - 14}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="12"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={tk('--cream-faint')}
        >
          HAZARD RATIO
        </text>
      </g>

      {/* ═══════════ HR = 1 unity reference line (dashed) ═══════════ */}
      <g data-el="unity-line" opacity={0}>
        <line
          x1={X_LEFT}
          y1={Y_HR_1}
          x2={X_RIGHT}
          y2={Y_HR_1}
          stroke={tk('--cream-faint')}
          strokeWidth={1}
          strokeDasharray="4 6"
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
        />
        <text
          x={X_LEFT + 12}
          y={Y_HR_1 - 8}
          fontFamily="var(--font-mono)"
          fontSize="12"
          fontWeight="600"
          letterSpacing="0.22em"
          fill={tk('--cream-faint')}
        >
          UNITY · NO EXCESS RISK
        </text>
      </g>

      {/* ═══════════ HR climb curve (the dominant beat) ═══════════ */}
      <path
        data-el="hr-curve"
        d={HR_PATH}
        fill="none"
        stroke={tk('--coral')}
        strokeWidth={3}
        strokeLinecap="round"
        strokeLinejoin="round"
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />

      {/* ═══════════ Apex marker · HR 3.95 callout ═══════════ */}
      <g data-el="apex-stat" opacity={0}>
        <circle
          cx={X_2012}
          cy={Y_HR_3_95}
          r={9}
          fill={tk('--coral')}
        />
        <circle
          cx={X_2012}
          cy={Y_HR_3_95}
          r={18}
          fill="none"
          stroke={tk('--coral')}
          strokeWidth={1}
          opacity={0.5}
        />
        {/* Callout label sits to the LEFT of the apex with generous
            horizontal clearance so it doesn't collide with the
            closed-wedge text on the right. */}
        <text
          x={X_2012 - 60}
          y={Y_HR_3_95 - 12}
          textAnchor="end"
          fontFamily="var(--font-display)"
          fontSize="56"
          fontWeight="600"
          letterSpacing="-0.04em"
          style={{ fontFeatureSettings: '"tnum" 1, "lnum" 1' }}
          fill={tk('--coral')}
        >
          HR 3.95
        </text>
        <text
          x={X_2012 - 60}
          y={Y_HR_3_95 + 18}
          textAnchor="end"
          fontFamily="var(--font-mono)"
          fontSize="14"
          fontWeight="600"
          letterSpacing="0.22em"
          fill={tk('--cream-muted')}
        >
          STARTS-2 · HIGH vs LOW DOSE
        </text>
      </g>

      {/* ═══════════ X AXIS line ═══════════ */}
      <line
        data-el="x-axis"
        x1={X_LEFT}
        y1={Y_AXIS}
        x2={X_RIGHT}
        y2={Y_AXIS}
        stroke={tk('--cream-hairline')}
        strokeWidth={1}
        vectorEffect="non-scaling-stroke"
        opacity={0}
      />

      {/* ═══════════ Year ticks + labels ═══════════ */}
      {YEARS.map(({ year, x, emphasized }) => (
        <g key={year} data-el="year-tick" opacity={0}>
          <line
            x1={x}
            y1={Y_AXIS}
            x2={x}
            y2={Y_TICK_END}
            stroke={emphasized ? tk('--coral') : tk('--cream-faint')}
            strokeWidth={emphasized ? 1.5 : 1}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={x}
            y={Y_YEAR_TXT}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="16"
            fontWeight={emphasized ? 700 : 500}
            letterSpacing="0.22em"
            fill={emphasized ? tk('--coral') : tk('--cream-faint')}
            style={{ fontFeatureSettings: '"tnum"' }}
          >
            {emphasized ? 'AUG 2012' : String(year)}
          </text>
        </g>
      ))}

      {/* ═══════════ Beat markers + labels ═══════════ */}
      {/* Three beats anchored at the trial-event years. Aug 2012 is the
          fulcrum and gets a triangular FDA-warning marker. The 2007/2010
          beats get filled coral dots that snap to the curve y-position. */}
      {[
        {
          x: X_2007,
          y: Y_HR_1,
          line1: 'STARTS-2 enrolled',
          line2: 'Long-term extension',
        },
        {
          x: X_2010,
          y: Y_HR_1,
          line1: 'Mortality signal',
          line2: 'Dose-dependent',
        },
      ].map((b, i) => (
        <g key={i} data-el="beat" opacity={0}>
          <circle
            cx={b.x}
            cy={b.y}
            r={5}
            fill={tk('--coral')}
            opacity={0.85}
          />
          <line
            x1={b.x}
            y1={b.y + 6}
            x2={b.x}
            y2={Y_AXIS - 4}
            stroke={tk('--cream-hairline')}
            strokeWidth={1}
            strokeDasharray="2 4"
            opacity={0.6}
            vectorEffect="non-scaling-stroke"
          />
          <text
            x={b.x}
            y={Y_BEAT_LINE_1}
            textAnchor="middle"
            fontFamily="var(--font-display)"
            fontSize="18"
            fontWeight="500"
            fill={tk('--cream')}
          >
            {b.line1}
          </text>
          <text
            x={b.x}
            y={Y_BEAT_LINE_2}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="13"
            fontWeight="500"
            letterSpacing="0.18em"
            fill={tk('--cream-faint')}
          >
            {b.line2.toUpperCase()}
          </text>
        </g>
      ))}

      {/* Aug 2012 — FDA warning beat (triangle marker, raised emphasis). */}
      <g data-el="fda-beat" opacity={0}>
        <polygon
          points={`${X_2012 - 9},${Y_AXIS - 8} ${X_2012 + 9},${Y_AXIS - 8} ${X_2012},${Y_AXIS - 22}`}
          fill={tk('--coral')}
        />
        <text
          x={X_2012}
          y={Y_BEAT_LINE_1}
          textAnchor="middle"
          fontFamily="var(--font-display)"
          fontSize="20"
          fontWeight="600"
          fill={tk('--coral')}
        >
          FDA Drug Safety Comm.
        </text>
        <text
          x={X_2012}
          y={Y_BEAT_LINE_2}
          textAnchor="middle"
          fontFamily="var(--font-mono)"
          fontSize="13"
          fontWeight="700"
          letterSpacing="0.22em"
          fill={tk('--cream-muted')}
        >
          HIGH-DOSE WARNING ISSUED
        </text>
      </g>
    </svg>
  );
}
