import React, { useEffect } from 'react';
import { motion, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 32 · Record at scale — Twelve years. The record at scale.
 *
 * Editorial timeline composition replacing the prior 4×2 numeral grid.
 * The 12-year span (2014 → 2026) is the hero: a horizontal hairline
 * armature with year ticks, an "expanding scope" area beneath it, and
 * milestone diamonds anchored to the years they happened. Together
 * they read as a single sentence — "the scope grew, here is when."
 *
 * Below the timeline, an 8-tile stat strip (Years · Domains ·
 * Submissions · Agencies · Labels · Pubs · Tools · Patent) carries the
 * count-up numerals from the previous design. Every tile is now a
 * lightweight typographic unit (no card chrome, hairline columns) so
 * the timeline keeps the visual weight.
 *
 * Type-scale exemption: the year-axis labels use the mono caption
 * tier (--fs-card-meta) so the seven year markers don't compete with
 * the eight stat numerals below them.
 */

// ─── Timeline span and milestone schedule ────────────────────
const YEAR_START = 2014;
const YEAR_END = 2026;
const YEAR_STEP = 2;

// `lane` controls vertical placement of the milestone label above the
// timeline. Adjacent-year clusters (2019+2020, 2023+2024, 2025+2026)
// alternate between 'high' and 'low' so the labels stack vertically
// instead of colliding horizontally at narrow viewports (1366px). The
// diamond connector hairline drops from whichever lane the label uses
// down to the year tick, so the visual association stays intact.
const MILESTONES = [
  {
    year: 2014,
    title: 'Field entry',
    detail: 'PopPK · first sponsored programs',
    token: 'cream-muted',
    lane: 'high',
  },
  {
    year: 2019,
    title: 'CPT publication',
    detail: 'DGAT1 cardiometabolic PK/PD',
    token: 'sage',
    lane: 'high',
  },
  {
    year: 2020,
    title: 'JCP · CTS',
    detail: 'DosePredict · Dectova pediatrics',
    token: 'amber',
    lane: 'low',
  },
  {
    year: 2023,
    title: 'Patent · EMA',
    detail: 'AU2023213173A1 · Ambrisentan',
    token: 'coral',
    lane: 'high',
  },
  {
    year: 2024,
    title: 'AI/ML front',
    detail: 'DeepPK · PharmAgent',
    token: 'amber',
    lane: 'low',
  },
  {
    year: 2025,
    title: 'CDSCO precedent',
    detail: 'Tibsovo · India waiver · CS2',
    token: 'cyan',
    lane: 'high',
  },
  {
    year: 2026,
    title: 'ICH M15',
    detail: 'Step 4 · MIDD guideline',
    token: 'amber',
    lane: 'low',
  },
];

// Eight-cell stat strip — same vocabulary as the prior 4×2 grid but
// rendered as lightweight typographic units beneath the timeline.
const STATS = [
  { id: 'years',       value: 12,  suffix: '',  label: 'Years at scale',     token: 'cream' },
  { id: 'domains',     value: 6,   suffix: '',  label: 'Domains',            token: 'amber' },
  { id: 'submissions', value: 8,   suffix: '',  label: 'Submissions',        token: 'cyan'  },
  { id: 'agencies',    value: 6,   suffix: '',  label: 'Agencies',           token: 'sage'  },
  { id: 'labels',      value: 4,   suffix: '',  label: 'Approved labels',    token: 'coral' },
  { id: 'pubs',        value: 20,  suffix: '+', label: 'Publications',       token: 'violet'},
  { id: 'tools',       value: 3,   suffix: '',  label: 'Tools built',        token: 'amber' },
  { id: 'patent',      value: null, static: 'AU2023213173A1', label: 'Patent', token: 'cream' },
];

export default function Slide32RecordAtScale() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    timelineLine: 1.00,
    timelineArea: 1.40,
    timelineTicks: 1.50,
    milestones: 1.95,
    stats: 2.95,
    ribbon: 3.55,
    source: 3.30,
  };

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Record at scale</Eyebrow>
      <Headline delay={D.headline} maxChars={42}>
        Twelve years.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          The record at scale.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        2014 → 2026 — across two pharmaceutical sponsors, six domains,
        and a methodology record that extends beyond it.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1.35fr) auto auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <Timeline D={D} ease={ease} />
          <StatStrip D={D} ease={ease} />
          <PayoffRibbon D={D} ease={ease} />
        </div>
      </Viz>

      <Footer
        kicker="Closing · 32 of 35"
        source="Source · CPT 2019 · JCP 2020 · CTS 2020 · JCP 2023 · IP Australia 2023 · CDSCO 2025 · ICH M15 2026"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ============================================================
   Timeline — horizontal hairline armature with year ticks,
   expanding-scope area, milestone diamonds, and per-milestone
   labels. SVG viewBox 1000×500, preserveAspectRatio="none" so
   the armature stretches to fill the timeline row regardless of
   container ratio; non-scaling-stroke keeps every line at 1px.
   ============================================================ */
function Timeline({ D, ease }) {
  const reduce = useReducedMotion();
  const lineInit = reduce ? false : { pathLength: 0, opacity: 0 };
  const lineEnd = { pathLength: 1, opacity: 1 };

  // X projection — pad 8% each side so the 2014 / 2026 milestone
  // labels (which use translateX(0)/(-100%) anchoring) have room to
  // sit beside their diamonds without clipping the slide gutter.
  const X_PAD = 80;
  const xOf = (year) => X_PAD + ((year - YEAR_START) / (YEAR_END - YEAR_START)) * (1000 - X_PAD * 2);

  // Y anatomy
  const Y_AXIS = 320;        // year-axis hairline
  const Y_MILESTONE = 260;   // milestone diamond row (above axis); pushed
                              // down from 200 so the two-lane label stack
                              // above has room to breathe at 1366px width
  const Y_AREA_BASE = 320;   // bottom of expanding-scope area
  const Y_AREA_PEAK = 360;   // visual peak (below axis — bar grows downward)

  // Year ticks — every YEAR_STEP years across the span
  const tickYears = [];
  for (let y = YEAR_START; y <= YEAR_END; y += YEAR_STEP) tickYears.push(y);

  // Expanding-scope area: a polygon that hugs the year axis and
  // thickens downward as scope expands. Anchor points sketch a
  // monotonically widening profile from 2014 (8u below axis) to 2026
  // (52u below axis), with a small inflection in 2020 (the JCP/CTS
  // double-publication year) and 2025 (CDSCO close).
  const SCOPE_ANCHORS = [
    [2014, 8],
    [2016, 12],
    [2018, 18],
    [2020, 28],
    [2022, 32],
    [2023, 38],
    [2024, 44],
    [2025, 50],
    [2026, 52],
  ];
  const areaTop = `M ${X_PAD} ${Y_AXIS}` +
    SCOPE_ANCHORS.map(([y]) => ` L ${xOf(y).toFixed(1)} ${Y_AXIS}`).join('') +
    ` L ${1000 - X_PAD} ${Y_AXIS} Z`;
  const areaBottom = `M ${X_PAD} ${Y_AXIS}` +
    SCOPE_ANCHORS.map(([y, depth]) => ` L ${xOf(y).toFixed(1)} ${(Y_AXIS + depth).toFixed(1)}`).join('') +
    ` L ${1000 - X_PAD} ${Y_AXIS} Z`;

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      <svg
        aria-hidden
        viewBox="0 0 1000 500"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          overflow: 'visible',
          pointerEvents: 'none',
        }}
      >
        <defs>
          <linearGradient id="timeline-scope-fill" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="var(--amber)" stopOpacity="0.04" />
            <stop offset="60%"  stopColor="var(--amber)" stopOpacity="0.18" />
            <stop offset="100%" stopColor="var(--amber)" stopOpacity="0.32" />
          </linearGradient>
        </defs>

        {/* Expanding-scope area — fades in after axis lands */}
        <motion.path
          d={areaBottom}
          fill="url(#timeline-scope-fill)"
          stroke="none"
          initial={reduce ? false : { opacity: 0, scaleY: 0.4 }}
          animate={{ opacity: 1, scaleY: 1 }}
          transition={{ duration: 0.9, ease, delay: D.timelineArea }}
          style={{ transformBox: 'fill-box', transformOrigin: `${X_PAD}px ${Y_AXIS}px` }}
        />

        {/* Year axis — main horizontal hairline */}
        <motion.line
          x1={X_PAD}
          y1={Y_AXIS}
          x2={1000 - X_PAD}
          y2={Y_AXIS}
          stroke="var(--cream-hairline)"
          strokeWidth="1.2"
          vectorEffect="non-scaling-stroke"
          initial={lineInit}
          animate={lineEnd}
          transition={{ duration: 1.4, ease, delay: D.timelineLine }}
        />

        {/* Year ticks + labels */}
        {tickYears.map((y, i) => (
          <motion.g
            key={`tick-${y}`}
            initial={reduce ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.timelineTicks + i * 0.06 }}
          >
            <line
              x1={xOf(y)}
              y1={Y_AXIS - 5}
              x2={xOf(y)}
              y2={Y_AXIS + 5}
              stroke="var(--cream-faint)"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
            <text
              x={xOf(y)}
              y={Y_AXIS + 24}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize="14"
              letterSpacing="0.18em"
              fontWeight="700"
              fill="var(--cream-faint)"
            >
              {y}
            </text>
          </motion.g>
        ))}

        {/* Connector hairlines — vertical drop from each milestone
            diamond to its year tick. Drawn before the diamond so the
            diamond renders on top. */}
        {MILESTONES.map((m, i) => (
          <motion.line
            key={`drop-${m.year}`}
            x1={xOf(m.year)}
            y1={Y_MILESTONE + 6}
            x2={xOf(m.year)}
            y2={Y_AXIS - 6}
            stroke={`var(--${m.token})`}
            strokeOpacity="0.45"
            strokeWidth="1"
            vectorEffect="non-scaling-stroke"
            initial={lineInit}
            animate={lineEnd}
            transition={{ duration: 0.5, ease, delay: D.milestones + i * 0.10 }}
          />
        ))}

        {/* Milestone diamonds */}
        {MILESTONES.map((m, i) => {
          const x = xOf(m.year);
          const color = `var(--${m.token})`;
          const delay = D.milestones + 0.05 + i * 0.10;
          return (
            <motion.g
              key={`d-${m.year}`}
              initial={reduce ? false : { opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.55, ease, delay }}
              style={{
                transformBox: 'fill-box',
                transformOrigin: `${x}px ${Y_MILESTONE}px`,
              }}
            >
              <rect
                x={x - 6}
                y={Y_MILESTONE - 6}
                width={12}
                height={12}
                fill={color}
                fillOpacity="0.18"
                stroke={color}
                strokeWidth="1.4"
                vectorEffect="non-scaling-stroke"
                transform={`rotate(45 ${x} ${Y_MILESTONE})`}
              />
              <rect
                x={x - 2.5}
                y={Y_MILESTONE - 2.5}
                width={5}
                height={5}
                fill={color}
                transform={`rotate(45 ${x} ${Y_MILESTONE})`}
              />
            </motion.g>
          );
        })}
      </svg>

      {/* HTML overlay — milestone titles + details. Positioned in
          percentages of the same viewBox so labels track the diamonds
          across viewport changes. Labels alternate between two lanes
          (high/low) per the milestone schedule so adjacent-year clusters
          (2019+2020, 2023+2024, 2025+2026) stack vertically rather than
          colliding horizontally at 1366px. */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          pointerEvents: 'none',
        }}
      >
        {MILESTONES.map((m, i) => {
          const xPct = (xOf(m.year) / 1000) * 100;
          /* Slight horizontal shift on the first/last entries so the
             label box doesn't run off the visible canvas at narrow
             viewports. */
          const isFirst = i === 0;
          const isLast = i === MILESTONES.length - 1;
          const align = isFirst ? 'flex-start' : isLast ? 'flex-end' : 'center';
          const transform = isFirst ? 'translateX(0)' : isLast ? 'translateX(-100%)' : 'translateX(-50%)';
          // Two-lane vertical placement: high lane sits at the top of
          // the timeline row, low lane sits roughly half a label-height
          // below it, so a high+low pair on adjacent years reads as
          // staggered annotations rather than overlapping text blocks.
          const top = m.lane === 'low' ? '24%' : '2%';
          return (
            <motion.div
              key={`label-${m.year}`}
              style={{
                position: 'absolute',
                left: `${xPct}%`,
                top,
                width: 'min(126px, 11.5vw)',
                transform,
                display: 'flex',
                flexDirection: 'column',
                alignItems: align,
                textAlign: isFirst ? 'left' : isLast ? 'right' : 'center',
                gap: 2,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: D.milestones + 0.15 + i * 0.10 }}
            >
              <span
                className="deck-display"
                style={{
                  fontSize: 'var(--fs-card-title)',
                  color: 'var(--cream)',
                  fontWeight: 700,
                  lineHeight: 1.15,
                }}
              >
                {m.title}
              </span>
              <span
                className="deck-display italic"
                style={{
                  fontSize: 'var(--fs-card-body)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.3,
                  maxWidth: '100%',
                }}
              >
                {m.detail}
              </span>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

/* ============================================================
   StatStrip — eight lightweight typographic stat units arranged
   on a single row with hairline column dividers. Replaces the
   prior 4×2 panel grid; the timeline now carries the visual
   weight of the slide.
   ============================================================ */
function StatStrip({ D, ease }) {
  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(8, 1fr)',
        gap: 0,
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: D.stats }}
      className="record-stat-strip"
    >
      {STATS.map((s, i) => (
        <StatCell key={s.id} stat={s} delay={D.stats + 0.06 * (i + 1)} isFirst={i === 0} />
      ))}
      <style>{`
        @media (max-width: 1100px) {
          .record-stat-strip {
            grid-template-columns: repeat(4, 1fr) !important;
            row-gap: var(--space-4);
          }
        }
      `}</style>
    </motion.div>
  );
}

function StatCell({ stat, delay, isFirst }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const color = `var(--${stat.token})`;
  return (
    <motion.div
      style={{
        padding: '0 var(--space-3)',
        borderLeft: isFirst ? 'none' : '1px solid var(--cream-hairline)',
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        minWidth: 0,
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* Numeral — count-up if numeric, static otherwise */}
      <div
        className="deck-display"
        style={{
          color,
          fontWeight: 700,
          lineHeight: 1,
          display: 'flex',
          alignItems: 'baseline',
          gap: 2,
          minHeight: 0,
        }}
      >
        {stat.static ? (
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(0.78rem, 0.9vw, 1.0rem)',
              letterSpacing: '0.05em',
              wordBreak: 'break-word',
            }}
          >
            {stat.static}
          </span>
        ) : (
          <>
            <CountUpDigit
              target={stat.value}
              delay={delay + 0.1}
              duration={0.9}
              style={{
                fontSize: 'clamp(1.6rem, min(2.4vw, 3.2vh), 2.6rem)',
                fontWeight: 700,
              }}
            />
            {stat.suffix && (
              <span
                style={{
                  fontSize: 'clamp(1.0rem, min(1.4vw, 1.8vh), 1.4rem)',
                  fontWeight: 600,
                  color: 'var(--cream-faint)',
                }}
              >
                {stat.suffix}
              </span>
            )}
          </>
        )}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 600,
          lineHeight: 1.2,
        }}
      >
        {stat.label}
      </div>
    </motion.div>
  );
}

/* ============================================================
   PayoffRibbon — italic payoff sentence that closes the slide.
   Single hairline above; no panel chrome. Same line as the
   prior design.
   ============================================================ */
function PayoffRibbon({ D, ease }) {
  return (
    <motion.div
      style={{
        padding: 'var(--space-4) 0 0 0',
        borderTop: '1px solid color-mix(in srgb, var(--amber) 35%, var(--cream-hairline))',
      }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: D.ribbon }}
    >
      <p
        className="deck-display italic"
        style={{
          margin: 0,
          fontSize: 'clamp(1rem, min(1.35vw, 2vh), 1.4rem)',
          lineHeight: 1.5,
          color: 'var(--cream)',
          textAlign: 'center',
          fontWeight: 400,
        }}
      >
        Breadth that maps to every part of the mission —{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 700 }}>
          and a methodology record that extends beyond it.
        </span>
      </p>
    </motion.div>
  );
}

/* ============================================================
   CountUpDigit — animates 0 → target. Reduced-motion: jumps to
   target. Same primitive used on slides 13 and 34.
   ============================================================ */
function CountUpDigit({ target, delay = 0, duration = 0.9, style }) {
  const reduce = useReducedMotion();
  const count = useMotionValue(reduce ? target : 0);
  const rounded = useTransform(count, (v) => Math.round(v));

  useEffect(() => {
    if (reduce) {
      count.set(target);
      return undefined;
    }
    const controls = animate(count, target, {
      duration,
      delay,
      ease: [0.2, 0.7, 0.3, 1],
    });
    return controls.stop;
  }, [count, target, duration, delay, reduce]);

  return (
    <motion.span className="deck-display tabular-nums" style={style}>
      {rounded}
    </motion.span>
  );
}
