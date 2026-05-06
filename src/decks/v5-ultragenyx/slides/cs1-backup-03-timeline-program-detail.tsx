// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_ROW_SIZES, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · "Ambrisentan: from adult approval to pediatric label —
 * what the program actually did" — 3rd Q&A backup slide.
 *
 * Two stacked horizontal timelines + right-side callouts:
 *   Upper compact adult lifecycle (2004–2024) — 7 events + summary line.
 *   Lower expanded pediatric program (AMB112529) — three layers:
 *     L1 PIP architecture above the trial axis (PIP discussions opened
 *        2008 + PIP agreed 2010 with WAIVER / DEFERRED / STUDIED card),
 *     L2 trial events on the main axis (first patient → enrollment bar
 *        → 2013 HOLD fracture → mechanistic-investigation bar → 2017
 *        mechanism resolved → 2019 TERMINATED fracture),
 *     L3 regulatory + publication outputs below the axis (Ivy 2020,
 *        PMDA + EMA pediatric approvals 2021, Okour PopPK 2023, LTE 2024).
 *   Right column carries two bordered callouts: weight-banded dosing
 *   matrix (3 weight bands × 2 dose arms) and target-vs-actual program
 *   comparison (8 rows).
 *
 * Both timeline SVGs share the SAME year→x mapping so 2010, 2011, 2014
 * etc. line up vertically across the divider — visually anchors "the
 * pediatric arc starts where the adult lifecycle was already fully
 * established." Pediatric SVG simply renders no events before 2008.
 *
 * BOUNDING-BOX AUDIT (per CLAUDE.md §"Bounding-box discipline"):
 *   Shared x-axis: X_START=80, X_END=1080, YEAR_MIN=2004, YEAR_MAX=2024,
 *     X_PER_YEAR = (1080-80)/20 = 50.
 *   Adult SVG viewBox 0 0 1100 130
 *     Axis y=70 · event labels y=58 (above) · year ticks y=88 + labels y=104
 *     Summary line y=120 (textAnchor="start" at x=X_START)
 *   Pediatric SVG viewBox 0 0 1100 460
 *     PIP card band      y  20 – 100   (annotation block above 2010)
 *     PIP sub-axis       y 105         (small markers for 2008, 2010)
 *     PIP marker labels  y 119         (under sub-axis)
 *     Trial card row B   y 112 – 184   (HOLD + TERM cards)
 *     Trial card row A   y  20 – 104   (PIP card + MECH card share row)
 *     First-pt card      y 192 – 234   (narrow row C just above main axis)
 *     Main trial axis    y 245         (event markers + year ticks)
 *     Year tick labels   y 267
 *     Enrollment bar     y 242 – 248   (Jan 2011 → Mar 2013, coral)
 *     Mech invest. bar   y 243 – 247   (Mar 2013 → mid 2017, dashed grey)
 *     Causal chain lane  y 320 – 340   (4 L-stitches with arrowheads)
 *     Outputs sub-axis   y 360
 *     Output row 0       y 378 (label) + 389 (sub)
 *     Output row 1       y 410 (label) + 421 (sub)
 *   Fracture columns: full-height dashed coral verticals (y 100 → 440),
 *     tombstone label box y 86 – 100 (boxed coral title).
 *   Edge guard: x(2024) = 1080 = X_END · output sub on year 2024 uses
 *     textAnchor="end" so its right edge sits at X_END.
 *
 * Right callouts column = 3/12 of the slide width via custom areas grid:
 *   Dosing matrix (3 weight bands × 2 dose arms with start / wk2+ split)
 *   Target-vs-actual (8 program comparison rows in a 2-col definition list)
 *   Both rendered as bordered HTML cards with rem-fluid type tokens.
 *
 * Design tokens: dataCase="coral" so `var(--case)` is coral
 *   (see index.css; ~#E27D60 in the token system). Steel-blue context
 *   for the 2008 PIP-discussions marker is built from existing tokens
 *   via color-mix — no #6B8AA0 hex literal lands in the slide.
 */

// ─── Custom 12-col grid: timelines own 9 cols, callouts own 3 cols ────────
const CUSTOM_AREAS = [
  'chrome-l chrome-l chrome-l chrome-l chrome-l chrome-l chrome-r chrome-r chrome-r chrome-r chrome-r chrome-r',
  'eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow  eyebrow',
  'headline headline headline headline headline headline headline headline headline headline headline headline',
  'subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead  subhead',
  'tlines   tlines   tlines   tlines   tlines   tlines   tlines   tlines   tlines   callouts callouts callouts',
  'footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer   footer',
];

// ─── Shared year→x mapping (used by both adult + pediatric SVGs) ──────────
const X_START = 80;
const X_END = 1080;
const YEAR_MIN = 2004;
const YEAR_MAX = 2024;
const X_PER_YEAR = (X_END - X_START) / (YEAR_MAX - YEAR_MIN);
const x = (year) => X_START + (year - YEAR_MIN) * X_PER_YEAR;

const ADULT_AXIS_Y = 70;
const PED_PIP_Y = 105;
const PED_AXIS_Y = 245;
const PED_OUT_Y = 360;

const EASE = [0.2, 0.7, 0.3, 1];

// Steel-blue context tone for the lone non-ambrisentan marker
// (2008 PIP discussions opened). Built from tokens — no #6B8AA0 hex.
const STEEL = 'color-mix(in srgb, var(--cyan) 35%, var(--cream-muted) 65%)';

// ─── Adult timeline events (2004–2024, sparse) ────────────────────────────
const ADULT = [
  { year: 2004, label: 'OD US',           kind: 'dot' },
  { year: 2007, label: 'FDA · Letairis',  kind: 'diamond' },
  { year: 2008, label: 'EMA · Volibris',  kind: 'diamond' },
  { year: 2010, label: 'PMDA · Japan',    kind: 'diamond' },
  { year: 2011, label: 'BBW removed',     kind: 'dot' },
  { year: 2014, label: 'AMBITION',        kind: 'dot' },
  { year: 2022, label: 'Generic',         kind: 'dot' },
];

// Sparse axis labels for the adult row (every 5 yrs).
const ADULT_AXIS_YEARS = [2004, 2009, 2014, 2019, 2024];

// ─── Pediatric Layer 1 · PIP architecture markers ─────────────────────────
const PIP_EVENTS = [
  { year: 2008, label: 'PIP discussions opened',  kind: 'context' }, // steel-blue
  { year: 2010, label: 'PIP agreed',              kind: 'diamond' },
];

// ─── Pediatric Layer 2 · Trial-event markers (on main axis) ───────────────
const TRIAL_EVENTS = [
  { year: 2011.0,  label: 'First patient · Jan ’11',  kind: 'diamond' },
  { year: 2013.95, label: 'LPLV · Nov ’13',           kind: 'tiny' },
  { year: 2017.0,  label: 'Mech resolved · 2017',     kind: 'diamond' },
  { year: 2017.85, label: 'CHMP filing · Nov ’17',    kind: 'tiny' },
];

// ─── Pediatric Layer 3 · Regulatory + publication outputs ─────────────────
// row index → which of the two stagger rows the label drops into
//   row 0 (label y=378, sub y=389) · row 1 (label y=410, sub y=421)
const OUTPUTS = [
  { year: 2020.5,  label: 'Ivy 2020',     sub: 'J Pediatr X · clinical',     kind: 'dot',        row: 1 },
  { year: 2021.10, label: 'PMDA peds',    sub: 'Mar ’21 · ages ≥8',          kind: 'resolution', row: 0 },
  { year: 2021.55, label: 'EMA peds',     sub: 'Apr ’21 · 3 weight bands',   kind: 'resolution', row: 1 },
  { year: 2023.0,  label: 'Okour PopPK',  sub: '2023 · AUC −3 % / +0.3 %',   kind: 'dot',        row: 0 },
  { year: 2024.0,  label: 'LTE',          sub: '2024 · 38 / 41 · 6MWD +17 %', kind: 'dot',       row: 1 },
];

// ─── Fracture columns (full-height dashed coral verticals) ────────────────
const FRACTURES = [
  { year: 2013.20, label: 'HOLD',       sub: 'Mar ’13 · N=41 enrolled' },
  { year: 2019.12, label: 'TERMINATED', sub: 'Feb ’19 · 39 PK-evaluable' },
];

// ─── Causal-chain L-stitches in the lower lane ───────────────────────────
// (User spec: 2010 PIP → 2011 first patient · 2013 HOLD → 2017 mech →
//  2019 TERM · 2019 TERM → 2021 dual approvals.)
const CHAINS = [
  { from: 2010.00, to: 2011.00, lane: 320 }, // PIP → first patient
  { from: 2013.20, to: 2017.00, lane: 330 }, // Hold → mech resolved
  { from: 2017.00, to: 2019.12, lane: 330 }, // Mech → terminated
  { from: 2019.12, to: 2021.10, lane: 340 }, // Term → dual approvals
];

// ─── Annotation cards (multi-line bordered text blocks above markers) ────
const PIP_CARD = {
  year: 2010,
  cx: x(2010),
  yTop: 20,
  width: 200,
  height: 80, // title (14) + 3 lines × 14 + padding
  title: 'EMA PIP · 2010 · EMEA-000434',
  lines: [
    '0 –< 6 yrs   WAIVER  endpoint feasibility',
    '6 –< 8 yrs   DEFERRED · post-program',
    '8 –< 18 yrs  STUDIED  AMB112529',
  ],
};

const TRIAL_CARDS = [
  {
    id: 'first-pt',
    cx: x(2011.0),
    yTop: 192,
    width: 180,
    height: 42,
    title: 'AMB112529 · Jan ’11',
    lines: [
      'Phase IIb · open-label · ages 8–<18',
      'Planned N=66 · stratified age × etiology',
    ],
  },
  {
    id: 'hold',
    cx: x(2013.20),
    yTop: 112,
    width: 210,
    height: 72,
    title: 'TRIGGER · juvenile rat (PND7)',
    lines: [
      '20 mg/kg/day · 1.8 – 7× human AUC',
      'Brain weight ↓ 3 – 8 % at high dose',
      'Dose-dependent · postnatal-window only',
    ],
    // The fracture column already provides a visual anchor down to the
    // axis — no leader hairline needed for HOLD / TERM cards.
    skipLeader: true,
  },
  {
    id: 'mech',
    cx: x(2017.0),
    yTop: 20,
    width: 250,
    height: 84,
    title: 'MECH · 2017 · resolved',
    lines: [
      'Sustained intermittent hypoxemia',
      'Edema × soft PND7 larynx → airway narrows',
      'Reversible ~10 d off-dose',
      'Human at-risk: 0 – 3 yrs (below trial pop)',
    ],
  },
  {
    id: 'term',
    cx: x(2019.12),
    yTop: 112,
    width: 200,
    height: 56,
    title: 'TERMINATED · Feb ’19',
    lines: [
      'Re-opening to N=66 not feasible',
      'Interim analysis becomes final',
    ],
    skipLeader: true,
  },
];

export default function Cs1BackupTimelineProgramDetail() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={CUSTOM_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.10}>
        Backup · Case 01 · Q&amp;A program detail
      </Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Adult approval to pediatric label ·{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          what the program actually did.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        Adult lifecycle settled by 2010. Pediatric arc: PIP 2010 → trial → 2013 hold
        → 2017 mechanism → 2019 termination → 2021 dual approval. Framework absorbed
        the disruption.
      </Subhead>

      {/* ═══════════════════════════════════════════════════════════════════
          LEFT COLUMN — stacked timelines (adult on top, pediatric below).
          The inner ref drives the IntersectionObserver for both SVGs so
          the entire dual-timeline animates as one unit on entrance.
          ═══════════════════════════════════════════════════════════════════ */}
      <GridSlot
        area="tlines"
        style={{
          paddingTop: 'clamp(var(--space-2), 1.6vh, var(--space-4))',
          minHeight: 0,
          minWidth: 0,
        }}
      >
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-2)',
            minHeight: 0,
            minWidth: 0,
          }}
        >
          {/* ─── ADULT SVG (compact, ~22%) ─── */}
          <div style={{ flex: '0 0 22%', minHeight: 0 }}>
            <AdultTimeline animate={animate} />
          </div>

          {/* ─── DIVIDER STRIP — labels above + below a hairline rule ─── */}
          <div style={{ flex: '0 0 auto' }}>
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta, 0.62rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
                paddingBottom: 'var(--space-1)',
              }}
            >
              ↑ Adult lifecycle
            </div>
            <div
              style={{
                height: '1px',
                background: 'var(--cream-hairline)',
                width: '100%',
              }}
            />
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta, 0.62rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                paddingTop: 'var(--space-1)',
              }}
            >
              ↓ Pediatric program · AMB112529
            </div>
          </div>

          {/* ─── PEDIATRIC SVG (expanded, fills remaining height) ─── */}
          <div style={{ flex: '1 1 auto', minHeight: 0 }}>
            <PediatricTimeline animate={animate} />
          </div>
        </div>
      </GridSlot>

      {/* ═══════════════════════════════════════════════════════════════════
          RIGHT COLUMN — dosing matrix + target-vs-actual callouts.
          Stacked top-to-bottom inside the 3/12-column slot.
          ═══════════════════════════════════════════════════════════════════ */}
      <GridSlot
        area="callouts"
        motion={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, delay: 1.2 }}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-3)',
          paddingTop: 'clamp(var(--space-2), 1.6vh, var(--space-4))',
          minHeight: 0,
        }}
      >
        <DosingMatrixCard />
        <TargetActualCard />
      </GridSlot>

      <Footer
        kicker="35c · CS1 backup · program detail"
        tagline="Stacked timelines: the anchor on top, the disruption + recovery below."
        source="Sources · Ivy J Pediatr X 2020;5:100055 · Okour J Clin Pharmacol 2023;63(5):593–603 · EMA PIP EMEA-000434-PIP01-08-M05 · Laffan, Teratology Society 2019 · GSK Japan press release 2021-03-23 · EMA Volibris EPAR · PMDA Volibris label · Eur J Pediatr 2024 (LTE)."
        delay={2.6}
      />
    </SlideGrid>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ADULT TIMELINE — single-row, 7 events, 5 axis labels, summary line.
   ViewBox 1100×130. Events render with mono labels above their marker;
   marker on axis (diamond for prom approvals, dot for milestones).
   ════════════════════════════════════════════════════════════════════════ */

function AdultTimeline({ animate }) {
  return (
    <svg
      viewBox="0 0 1100 130"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="Adult ambrisentan lifecycle 2004 to 2024"
      style={{ width: '100%', height: '100%' }}
    >
      {/* Axis hairline */}
      <line
        x1={X_START} y1={ADULT_AXIS_Y} x2={X_END} y2={ADULT_AXIS_Y}
        stroke="var(--cream-hairline)" strokeWidth="1"
      />

      {/* Sparse year ticks (every 5 yrs) — labels under axis, faint */}
      {ADULT_AXIS_YEARS.map((yr) => {
        const tx = x(yr);
        return (
          <g key={`ay-${yr}`}>
            <line
              x1={tx} x2={tx}
              y1={ADULT_AXIS_Y - 5} y2={ADULT_AXIS_Y + 5}
              stroke="var(--cream-faint)" strokeWidth="1"
            />
            <text
              x={tx} y={ADULT_AXIS_Y + 22}
              textAnchor="middle"
              className="deck-mono"
              style={{
                fontSize: 11,
                fill: 'var(--cream-muted)',
                letterSpacing: '0.06em',
                fontVariantNumeric: 'tabular-nums',
                fontWeight: 600,
              }}
            >
              {yr}
            </text>
          </g>
        );
      })}

      {/* Adult-event markers + labels (label above marker) */}
      {ADULT.map((e, i) => {
        const ex = x(e.year);
        const isDiamond = e.kind === 'diamond';
        return (
          <motion.g
            key={`ae-${i}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 0.7 + i * 0.06, ease: EASE }}
          >
            {isDiamond ? (
              <rect
                x={ex - 5.5} y={ADULT_AXIS_Y - 5.5}
                width={11} height={11}
                transform={`rotate(45 ${ex} ${ADULT_AXIS_Y})`}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            ) : (
              <circle
                cx={ex} cy={ADULT_AXIS_Y} r={3.5}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            )}
            <text
              x={ex} y={ADULT_AXIS_Y - 14}
              textAnchor="middle"
              className="deck-mono"
              style={{
                fontSize: 10,
                fill: 'var(--cream)',
                letterSpacing: '0.04em',
                fontWeight: isDiamond ? 600 : 400,
              }}
            >
              {e.label}
            </text>
            <text
              x={ex} y={ADULT_AXIS_Y - 3}
              textAnchor="middle"
              className="deck-mono"
              style={{
                fontSize: 8.5,
                fill: 'var(--cream-faint)',
                letterSpacing: '0.06em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {`’${String(e.year).slice(-2)}`}
            </text>
          </motion.g>
        );
      })}

      {/* Summary line beneath the row of events */}
      <text
        x={X_START} y={120}
        textAnchor="start"
        className="deck-mono"
        style={{
          fontSize: 9,
          fill: 'var(--cream-faint)',
          letterSpacing: '0.04em',
        }}
      >
        Adult dose 5 – 10 mg QD · adult anchor for pediatric program: 380 participants
        (41 healthy + 339 PAH) across 6 studies · 3,126 PK observations
      </text>
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   PEDIATRIC TIMELINE — 3 layers, 2 fracture columns, 4 causal stitches,
   5 annotation cards, 5 output labels with leader lines.
   ViewBox 1100×460.
   ════════════════════════════════════════════════════════════════════════ */

function PediatricTimeline({ animate }) {
  return (
    <svg
      viewBox="0 0 1100 460"
      preserveAspectRatio="xMidYMid meet"
      role="img"
      aria-label="AMB112529 pediatric program timeline 2008 to 2024"
      style={{ width: '100%', height: '100%' }}
    >
      <defs>
        <radialGradient id="cs1bk3-resGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--case)" stopOpacity="0.5" />
          <stop offset="100%" stopColor="var(--case)" stopOpacity="0" />
        </radialGradient>
        <marker
          id="cs1bk3-arrow" viewBox="0 0 8 8"
          refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto"
        >
          <path d="M0,0 L8,4 L0,8 Z" fill="var(--case)" opacity="0.65" />
        </marker>
      </defs>

      {/* Subtle pediatric track wash to separate from adult above */}
      <rect
        x={X_START - 8} y={0}
        width={X_END - X_START + 16} height={460}
        fill="color-mix(in srgb, var(--case) 2%, transparent)"
      />

      {/* PIP sub-axis (only spans 2008→2024, faint) */}
      <line
        x1={x(2008)} y1={PED_PIP_Y} x2={X_END} y2={PED_PIP_Y}
        stroke="var(--cream-hairline)" strokeWidth="0.8" opacity="0.55"
      />

      {/* Main trial axis */}
      <line
        x1={X_START} y1={PED_AXIS_Y} x2={X_END} y2={PED_AXIS_Y}
        stroke="var(--cream-hairline)" strokeWidth="1"
      />

      {/* Outputs sub-axis (only spans 2019→2024, faint) */}
      <line
        x1={x(2019)} y1={PED_OUT_Y} x2={X_END} y2={PED_OUT_Y}
        stroke="var(--cream-hairline)" strokeWidth="0.8" opacity="0.55"
      />

      {/* Year ticks (every yr 2008→2024) on the main axis */}
      {Array.from({ length: 17 }, (_, i) => 2008 + i).map((yr) => {
        const tx = x(yr);
        const isMajor = [2010, 2013, 2017, 2019, 2021, 2024].includes(yr);
        return (
          <g key={`pyt-${yr}`}>
            <line
              x1={tx} x2={tx}
              y1={PED_AXIS_Y - (isMajor ? 7 : 4)}
              y2={PED_AXIS_Y + (isMajor ? 7 : 4)}
              stroke={isMajor ? 'var(--cream-faint)' : 'var(--cream-hairline)'}
              strokeWidth={isMajor ? 1.2 : 0.7}
            />
            <text
              x={tx} y={PED_AXIS_Y + 22}
              textAnchor="middle"
              className="deck-mono"
              style={{
                fontSize: isMajor ? 11 : 9.5,
                fill: isMajor ? 'var(--cream)' : 'var(--cream-faint)',
                opacity: isMajor ? 1 : 0.7,
                letterSpacing: '0.06em',
                fontVariantNumeric: 'tabular-nums',
                fontWeight: isMajor ? 600 : 400,
              }}
            >
              {yr}
            </text>
          </g>
        );
      })}

      {/* ═══ Fracture columns (Mar 2013 + Feb 2019) ═══ */}
      {FRACTURES.map((f, i) => {
        const fx = x(f.year);
        return (
          <motion.g
            key={`frac-${i}`}
            initial={{ opacity: 0 }}
            animate={animate ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration: 0.5, delay: 1.4 + i * 0.15, ease: EASE }}
          >
            <line
              x1={fx} x2={fx} y1={100} y2={440}
              stroke="var(--case)" strokeWidth="1.3"
              strokeDasharray="4 5" opacity="0.6"
            />
            {/* Tombstone label box */}
            <rect
              x={fx - 64} y={86} width={128} height={14} rx={2}
              fill="color-mix(in srgb, var(--case) 18%, var(--bg))"
              stroke="color-mix(in srgb, var(--case) 55%, transparent)"
              strokeWidth="0.85"
            />
            <text
              x={fx} y={97}
              textAnchor="middle"
              className="deck-mono uppercase"
              style={{
                fontSize: 9,
                fill: 'var(--case)',
                letterSpacing: '0.10em',
                fontWeight: 700,
              }}
            >
              {f.label} · {f.sub}
            </text>
          </motion.g>
        );
      })}

      {/* Enrollment bar (Jan 2011 → Mar 2013) — coral, on axis */}
      <motion.rect
        x={x(2011.0)}
        y={PED_AXIS_Y - 3}
        width={x(2013.20) - x(2011.0)}
        height={6}
        rx={1}
        fill="color-mix(in srgb, var(--case) 60%, transparent)"
        stroke="var(--case)"
        strokeWidth="0.6"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={animate ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.7, delay: 0.9, ease: EASE }}
        style={{ transformOrigin: `${x(2011.0)}px ${PED_AXIS_Y}px` }}
      />

      {/* Mechanistic-investigation bar (Mar 2013 → mid 2017) — desat dashed */}
      <motion.rect
        x={x(2013.20)}
        y={PED_AXIS_Y - 2}
        width={x(2017.0) - x(2013.20)}
        height={4}
        rx={1}
        fill="color-mix(in srgb, var(--cream-muted) 40%, transparent)"
        stroke="color-mix(in srgb, var(--cream-muted) 70%, transparent)"
        strokeWidth="0.5"
        strokeDasharray="3 2"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={animate ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
        transition={{ duration: 0.9, delay: 1.6, ease: EASE }}
        style={{ transformOrigin: `${x(2013.20)}px ${PED_AXIS_Y}px` }}
      />

      {/* Causal-chain L-stitches with arrowheads (lower causal lane) */}
      {CHAINS.map((c, i) => {
        const x1c = x(c.from), x2c = x(c.to);
        return (
          <motion.path
            key={`chain-${i}`}
            d={`M ${x1c} ${PED_AXIS_Y + 14} V ${c.lane} H ${x2c} V ${PED_AXIS_Y + 14}`}
            fill="none"
            stroke="color-mix(in srgb, var(--case) 50%, transparent)"
            strokeWidth="0.9"
            markerEnd="url(#cs1bk3-arrow)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.85 }}
            transition={{ duration: 0.85, delay: 2.0 + i * 0.18, ease: EASE }}
          />
        );
      })}

      {/* ═══ LAYER 1 · PIP markers (2008 context steel-blue, 2010 coral diamond) ═══ */}
      {PIP_EVENTS.map((e, i) => {
        const ex = x(e.year);
        const isContext = e.kind === 'context';
        const isDiamond = e.kind === 'diamond';
        return (
          <motion.g
            key={`pip-${i}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 0.5 + i * 0.1, ease: EASE }}
          >
            {isDiamond ? (
              <rect
                x={ex - 5} y={PED_PIP_Y - 5} width={10} height={10}
                transform={`rotate(45 ${ex} ${PED_PIP_Y})`}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            ) : (
              <circle
                cx={ex} cy={PED_PIP_Y} r={3.5}
                fill={isContext ? STEEL : 'var(--case)'}
                stroke={isContext ? STEEL : 'var(--case)'}
                strokeWidth="0.8"
              />
            )}
            <text
              x={ex} y={PED_PIP_Y + 16}
              textAnchor="middle"
              className="deck-mono"
              style={{
                fontSize: 9,
                fill: isContext ? STEEL : 'var(--cream-muted)',
                letterSpacing: '0.05em',
                fontStyle: isContext ? 'italic' : 'normal',
              }}
            >
              {e.year} · {e.label}
            </text>
          </motion.g>
        );
      })}

      {/* PIP annotation card (above the 2010 PIP-agreed marker) */}
      <AnnotationCard
        animate={animate}
        delay={1.0}
        cx={PIP_CARD.cx}
        yTop={PIP_CARD.yTop}
        width={PIP_CARD.width}
        height={PIP_CARD.height}
        title={PIP_CARD.title}
        lines={PIP_CARD.lines}
        leaderToY={PED_PIP_Y - 6}
      />

      {/* ═══ LAYER 2 · Trial-event markers (on main axis) ═══ */}
      {TRIAL_EVENTS.map((e, i) => {
        const ex = x(e.year);
        const isDiamond = e.kind === 'diamond';
        const isTiny = e.kind === 'tiny';
        return (
          <motion.g
            key={`tev-${i}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 0.8 + i * 0.1, ease: EASE }}
          >
            {isDiamond ? (
              <rect
                x={ex - 6} y={PED_AXIS_Y - 6} width={12} height={12}
                transform={`rotate(45 ${ex} ${PED_AXIS_Y})`}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            ) : (
              <circle
                cx={ex} cy={PED_AXIS_Y} r={isTiny ? 2.5 : 3.5}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            )}
            {/* Tiny inline labels for LPLV / CHMP — placed below axis between
                year ticks so they don't crowd the cards above. */}
            {isTiny && (
              <text
                x={ex} y={PED_AXIS_Y + 38}
                textAnchor="middle"
                className="deck-mono"
                style={{
                  fontSize: 8.5,
                  fill: 'var(--cream-faint)',
                  letterSpacing: '0.04em',
                  fontStyle: 'italic',
                }}
              >
                {e.label}
              </text>
            )}
          </motion.g>
        );
      })}

      {/* Trial-event annotation cards (rows A + B + C above the axis) */}
      {TRIAL_CARDS.map((card, i) => (
        <AnnotationCard
          key={`tc-${card.id}`}
          animate={animate}
          delay={1.2 + i * 0.12}
          cx={card.cx}
          yTop={card.yTop}
          width={card.width}
          height={card.height}
          title={card.title}
          lines={card.lines}
          leaderToY={card.skipLeader ? null : PED_AXIS_Y - 6}
        />
      ))}

      {/* ═══ LAYER 3 · Outputs markers + labels (below axis) ═══ */}
      {OUTPUTS.map((e, i) => {
        const ex = x(e.year);
        const labelY = e.row === 0 ? 378 : 410;
        const subY = labelY + 11;
        const isResolution = e.kind === 'resolution';
        // Edge-aware anchor: keep the LTE 2024 label inside the SVG.
        const tAnchor = e.year >= 2024 ? 'end' : 'middle';
        const tx = e.year >= 2024 ? X_END : ex;
        return (
          <motion.g
            key={`out-${i}`}
            initial={{ opacity: 0, scale: 0.6 }}
            animate={animate ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 2.6 + i * 0.1, ease: EASE }}
          >
            {/* Glow halo for resolution (dual-approval) markers */}
            {isResolution && (
              <circle cx={ex} cy={PED_OUT_Y} r={14} fill="url(#cs1bk3-resGlow)" />
            )}
            {/* Marker */}
            {isResolution ? (
              <rect
                x={ex - 5.5} y={PED_OUT_Y - 5.5} width={11} height={11}
                transform={`rotate(45 ${ex} ${PED_OUT_Y})`}
                fill="var(--case)" stroke="var(--case)" strokeWidth="1"
              />
            ) : (
              <circle
                cx={ex} cy={PED_OUT_Y} r={3.5}
                fill="var(--case)" stroke="var(--case)" strokeWidth="0.8"
              />
            )}
            {/* Leader hairline from marker down to label */}
            <line
              x1={ex} x2={ex}
              y1={PED_OUT_Y + 6} y2={labelY - 9}
              stroke="color-mix(in srgb, var(--case) 35%, transparent)"
              strokeWidth="0.6"
            />
            <text
              x={tx} y={labelY}
              textAnchor={tAnchor}
              className="deck-mono"
              style={{
                fontSize: 10,
                fill: 'var(--cream)',
                letterSpacing: '0.04em',
                fontWeight: isResolution ? 700 : 600,
              }}
            >
              {e.label}
            </text>
            <text
              x={tx} y={subY}
              textAnchor={tAnchor}
              className="deck-mono"
              style={{
                fontSize: 8.5,
                fill: 'var(--cream-faint)',
                letterSpacing: '0.04em',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {e.sub}
            </text>
          </motion.g>
        );
      })}
    </svg>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   ANNOTATION CARD — bordered SVG box with mono title + body lines.
   Optional leader hairline from card bottom down to marker (skip for
   cards anchored to fracture columns; the column itself is the leader).
   ════════════════════════════════════════════════════════════════════════ */

function AnnotationCard({
  animate,
  delay,
  cx,
  yTop,
  width,
  height,
  title,
  lines,
  leaderToY,
}) {
  const halfW = width / 2;
  // Edge guard: shift card so it doesn't clip the SVG bounds. Most events
  // are mid-timeline so this rarely fires, but the guard keeps the layout
  // safe if event positions move during future copy edits.
  let cardX = cx - halfW;
  if (cardX < X_START - 30) cardX = X_START - 30;
  if (cardX + width > X_END + 30) cardX = X_END + 30 - width;

  return (
    <motion.g
      initial={{ opacity: 0, y: -6 }}
      animate={animate ? { opacity: 1, y: 0 } : { opacity: 0, y: -6 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <rect
        x={cardX} y={yTop} width={width} height={height} rx={2}
        fill="color-mix(in srgb, var(--case) 6%, var(--bg))"
        stroke="color-mix(in srgb, var(--case) 30%, transparent)"
        strokeWidth="0.8"
      />
      {/* Title */}
      <text
        x={cardX + 8} y={yTop + 13}
        textAnchor="start"
        className="deck-mono uppercase"
        style={{
          fontSize: 8.5,
          fill: 'var(--case)',
          letterSpacing: '0.10em',
          fontWeight: 700,
        }}
      >
        {title}
      </text>
      {/* Body lines */}
      {lines.map((line, i) => (
        <text
          key={i}
          x={cardX + 8} y={yTop + 27 + i * 13}
          textAnchor="start"
          className="deck-mono"
          style={{
            fontSize: 9.5,
            fill: 'var(--cream)',
            letterSpacing: '0.03em',
          }}
        >
          {line}
        </text>
      ))}
      {/* Optional leader hairline from card bottom to the marker */}
      {leaderToY != null && (
        <line
          x1={cx} x2={cx}
          y1={yTop + height} y2={leaderToY}
          stroke="color-mix(in srgb, var(--case) 30%, transparent)"
          strokeWidth="0.6"
        />
      )}
    </motion.g>
  );
}

/* ════════════════════════════════════════════════════════════════════════
   RIGHT-COLUMN CALLOUT CARDS (HTML, fluid rem tokens, no fixed-px widths)
   ════════════════════════════════════════════════════════════════════════ */

const cardShellStyle = {
  border: '1px solid color-mix(in srgb, var(--case) 40%, transparent)',
  borderRadius: '2px',
  padding: 'var(--space-2)',
  background: 'color-mix(in srgb, var(--case) 4%, var(--bg))',
  fontSize: 'var(--fs-card-meta, 0.62rem)',
  color: 'var(--cream)',
  letterSpacing: 'var(--ls-mono)',
  lineHeight: 1.45,
};

const cardTitleStyle = {
  fontSize: 'var(--fs-card-label, 0.6rem)',
  color: 'var(--case)',
  letterSpacing: 'var(--ls-mono-wide)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
  paddingBottom: 'var(--space-1)',
  borderBottom: '1px solid color-mix(in srgb, var(--case) 30%, transparent)',
};

function DosingMatrixCard() {
  const cellPad = 'calc(var(--space-1) * 0.55) var(--space-1)';
  const rows = [
    ['20 –< 35 kg', '2.5 / 2.5', '2.5 / 5'],
    ['35 –< 50 kg', '5 / 5',     '5 / 7.5'],
    ['≥ 50 kg',     '5 / 5',     '5 / 10'],
  ];
  return (
    <div className="deck-mono" style={cardShellStyle}>
      <div className="uppercase" style={cardTitleStyle}>
        Weight-banded dosing · AMB112529
      </div>
      <table
        style={{
          width: '100%',
          borderCollapse: 'collapse',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <thead>
          <tr style={{ color: 'var(--cream-faint)' }}>
            <th style={{ padding: cellPad, textAlign: 'left',   fontWeight: 400 }}></th>
            <th style={{ padding: cellPad, textAlign: 'center', fontWeight: 400 }}>Low arm</th>
            <th style={{ padding: cellPad, textAlign: 'center', fontWeight: 400 }}>High arm</th>
          </tr>
          <tr style={{ color: 'var(--cream-faint)' }}>
            <th style={{ padding: cellPad, textAlign: 'left',   fontWeight: 400 }}></th>
            <th style={{ padding: cellPad, textAlign: 'center', fontWeight: 400 }}>start / wk2+</th>
            <th style={{ padding: cellPad, textAlign: 'center', fontWeight: 400 }}>start / wk2+</th>
          </tr>
        </thead>
        <tbody>
          {rows.map(([wt, lo, hi]) => (
            <tr
              key={wt}
              style={{ borderTop: '1px solid color-mix(in srgb, var(--case) 18%, transparent)' }}
            >
              <td style={{ padding: cellPad, textAlign: 'left',   fontWeight: 600 }}>{wt}</td>
              <td style={{ padding: cellPad, textAlign: 'center' }}>{lo}</td>
              <td style={{ padding: cellPad, textAlign: 'center' }}>{hi}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div
        style={{
          marginTop: 'var(--space-2)',
          paddingTop: 'var(--space-1)',
          borderTop: '1px solid color-mix(in srgb, var(--case) 18%, transparent)',
          color: 'var(--cream-faint)',
          fontSize: 'var(--fs-card-meta, 0.6rem)',
        }}
      >
        mg QD · low arm fixed for 24 wks · high arm: 2-wk run-in then up-titration
      </div>
    </div>
  );
}

function TargetActualCard() {
  const rows = [
    ['Planned enrollment',  '66'],
    ['Randomized at hold',  '41'],
    ['PK-evaluable final',  '39'],
    ['Age (eligible)',      '8 to <18'],
    ['Age (actual)',        '8 to 16'],
    ['Weight floor',        '20 kg'],
    ['Weight range',        '20.1 – 77.0 kg'],
    ['Treatment duration',  '24 weeks'],
  ];
  return (
    <div className="deck-mono" style={cardShellStyle}>
      <div className="uppercase" style={cardTitleStyle}>
        Target vs actual · AMB112529
      </div>
      <dl
        style={{
          margin: 0,
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          rowGap: 'calc(var(--space-1) * 0.6)',
          columnGap: 'var(--space-2)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {rows.map(([k, v]) => (
          <React.Fragment key={k}>
            <dt style={{ color: 'var(--cream-faint)' }}>{k}</dt>
            <dd
              style={{
                margin: 0,
                color: 'var(--cream)',
                fontWeight: 600,
                textAlign: 'right',
                whiteSpace: 'nowrap',
              }}
            >
              {v}
            </dd>
          </React.Fragment>
        ))}
      </dl>
    </div>
  );
}
