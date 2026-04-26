import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · "Ambrisentan: parallel development tracks across adult and
 * pediatric PAH (1995–2026)" — Q&A backup slide.
 *
 * Source: 2-Slides_Dev/.../V2/inputs/Mariam/timeline.md  (full Gamma prompt #1).
 *
 * Two parallel tracks (adult above the axis, pediatric below) with three
 * marker classes: AMB (coral), PAH context (cream-faint), and AMB-resolution
 * (larger diamond) plus two full-height dashed coral *fracture* columns at
 * Mar-2013 enrollment hold and Feb-2019 formal termination. Causal-chain
 * hairlines connect 2010 PIP → 2011 first patient, 2013 HOLD → 2017 Mech →
 * 2019 TERM, and 2019 TERM → 2021 dual approval.
 *
 * BOUNDING-BOX AUDIT (per CLAUDE.md §"Bounding-box discipline"):
 *   viewBox = 0 0 1280 460  (preserveAspectRatio="xMidYMid meet" — scales
 *   uniformly inside Viz; SVG text font-size is in viewBox units, so it
 *   tracks the SVG's parent fluidly without needing extra clamp() math).
 *   xStart=70, xEnd=1230  → axisWidth = 1160
 *   year window: 1995..2026 (31 years) → xPerYear = 1160 / 31 ≈ 37.4194
 *   axisY = 230  (vertical centerline)
 *   Adult label band:  y 60..200  (4 stagger rows: 80, 110, 145, 180)
 *   Pediatric label band: y 260..430 (4 stagger rows: 280, 315, 350, 395)
 *   Fracture columns: full-height (y 20 → y 440) dashed verticals, span
 *     both tracks. Resolution diamond ring extends ±10 from x.
 *   Edge-aware label placement: events at year ≤1996 use textAnchor=start,
 *   events at year ≥2025 use textAnchor=end, all others textAnchor=middle.
 */

// Year-axis math kept as a self-contained helper. fractional months via
// 0..1 (e.g. June ≈ 0.45). Placement function is pure: given year+offset
// it returns viewBox x — used identically by markers, leaders, and chain
// strokes so a single source of truth controls horizontal alignment.
const X_START = 70;
const X_END = 1230;
const YEAR_MIN = 1995;
const YEAR_MAX = 2026;
const X_PER_YEAR = (X_END - X_START) / (YEAR_MAX - YEAR_MIN);
const AXIS_Y = 230;
const x = (year, frac = 0) => X_START + (year - YEAR_MIN + frac) * X_PER_YEAR;

// Label edge-awareness: keep text inside the SVG drawable region by
// nudging text-anchor for events near either edge of the year window.
const anchorFor = (year) => {
  if (year - YEAR_MIN <= 1.5) return 'start';
  if (YEAR_MAX - year <= 1.5) return 'end';
  return 'middle';
};

// Adult-track events. `kind` drives marker shape; `row` is one of 0..3
// (top→bottom stagger above the axis). All event labels stay ≤22 chars
// to fit a typical inter-event slot (~140 viewBox units at 6 units/char).
const ADULT = [
  { year: 1995.5, kind: 'context',     row: 0, label: 'Flolan · ’95' },
  { year: 2001.5, kind: 'context',     row: 1, label: 'Bosentan · ’01' },
  { year: 2006.0, kind: 'amb',         row: 2, label: 'ARIES start · ’06' },
  { year: 2007.45, kind: 'amb-prom',   row: 0, label: 'FDA · Jun ’07' },
  { year: 2008.30, kind: 'amb-prom',   row: 1, label: 'EMA · Apr ’08' },
  { year: 2010.55, kind: 'amb-prom',   row: 2, label: 'PMDA · Jul ’10' },
  { year: 2011.5,  kind: 'amb',        row: 3, label: 'BBW removed · ’11' },
  { year: 2014.0,  kind: 'amb',        row: 0, label: 'AMBITION · ’14' },
  { year: 2024.2,  kind: 'context',    row: 1, label: 'Sotatercept · ’24' },
];

// Pediatric-track events. Resolution markers (Apr 2021 EMA + Mar 23 2021
// PMDA) are paired and rendered with a slight ring + larger diamond. The
// two fracture-column events (Mar 2013 hold, Feb 2019 termination) are
// rendered separately as full-height dashed verticals (FRACTURES below).
const PED = [
  { year: 2009.0,  kind: 'context-imp', row: 0, label: 'FUTURE-1 · ’09' },
  { year: 2010.5,  kind: 'amb',         row: 1, label: 'EMA PIP · ’10' },
  { year: 2011.0,  kind: 'amb-prom',    row: 0, label: 'AMB112529 first pt · Jan ’11' },
  { year: 2013.95, kind: 'amb',         row: 1, label: 'LPLV · Nov ’13' },
  { year: 2017.0,  kind: 'amb-prom',    row: 0, label: 'Mech complete · ’17' },
  { year: 2017.7,  kind: 'context-imp', row: 1, label: 'Bosentan FDA peds · ’17' },
  { year: 2020.5,  kind: 'amb',         row: 2, label: 'Ivy 2020 · J Pediatr X' },
  { year: 2021.25, kind: 'amb-resolution', row: 0, label: 'EMA peds · Apr ’21' },
  { year: 2021.22, kind: 'amb-resolution', row: 1, label: 'PMDA peds · Mar ’21' },
  { year: 2023.0,  kind: 'amb',         row: 2, label: 'Okour PopPK · ’23' },
  { year: 2024.95, kind: 'context-imp', row: 3, label: 'ICH E11A · Dec ’24' },
];

const FRACTURES = [
  { year: 2013.20, label: 'HOLD',       sub: 'Mar ’13' },
  { year: 2019.12, label: 'TERMINATED', sub: 'Feb ’19' },
];

// Causal-chain segments expressed as (yearA, yearB) pairs — rendered as
// hairline arcs hugging a "causal lane" below the pediatric markers so
// they don't compete with the leader lines above. Lane y = 415.
const CHAINS = [
  { from: 2010.5,  to: 2011.0,  lane: 415 },
  { from: 2013.20, to: 2017.0,  lane: 420 },
  { from: 2017.0,  to: 2019.12, lane: 420 },
  { from: 2019.12, to: 2021.22, lane: 425 },
];

// Adult stagger rows (y of label baseline) above the axis.
const ADULT_ROW_Y  = [80, 115, 150, 185];
// Pediatric stagger rows (y of label baseline) below the axis.
const PED_ROW_Y    = [280, 315, 350, 395];

const EASE = [0.2, 0.7, 0.3, 1];

export default function Cs1BackupTimelineContext() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Backup · Case 01 · Q&amp;A timeline
      </Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Ambrisentan in PAH ·{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          adult and pediatric tracks, 1995–2026.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        Adult lifecycle reads as a linear approval cascade.
        Pediatric track absorbs two disruptions and resolves into a
        framework — codified four years later by ICH E11A.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            paddingTop: 'clamp(var(--space-2), 2vh, var(--space-5))',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <svg
            viewBox="0 0 1280 460"
            preserveAspectRatio="xMidYMid meet"
            role="img"
            aria-label="Parallel adult and pediatric ambrisentan development timeline 1995 to 2026"
            style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}
          >
            <defs>
              <radialGradient id="cs1bk1-resGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  stopColor="var(--case)" stopOpacity="0.45" />
                <stop offset="100%" stopColor="var(--case)" stopOpacity="0" />
              </radialGradient>
              <marker id="cs1bk1-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--case)" opacity="0.55" />
              </marker>
            </defs>

            {/* Track-zone wash — subtle, helps adult-vs-ped separability */}
            <rect x={X_START - 8} y={36}  width={X_END - X_START + 16} height={188}
                  fill="color-mix(in srgb, var(--case) 4%, transparent)" />
            <rect x={X_START - 8} y={236} width={X_END - X_START + 16} height={210}
                  fill="color-mix(in srgb, var(--cream) 3%, transparent)" />

            {/* Axis hairline */}
            <line x1={X_START} y1={AXIS_Y} x2={X_END} y2={AXIS_Y}
                  stroke="var(--cream-hairline)" strokeWidth="1" />

            {/* Year ticks: every year (micro), labelled every 5 years */}
            {Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i).map((yr) => {
              const isMajor = yr % 5 === 0;
              const tx = x(yr);
              return (
                <g key={`yt-${yr}`}>
                  <line
                    x1={tx} x2={tx}
                    y1={AXIS_Y - (isMajor ? 6 : 3)}
                    y2={AXIS_Y + (isMajor ? 6 : 3)}
                    stroke={isMajor ? 'var(--cream-faint)' : 'var(--cream-hairline)'}
                    strokeWidth={isMajor ? 1.25 : 0.75}
                  />
                  {isMajor && (
                    <text x={tx} y={AXIS_Y + 22}
                          textAnchor="middle"
                          className="deck-mono"
                          style={{ fontSize: 11, fill: 'var(--cream-faint)', letterSpacing: '0.06em', fontVariantNumeric: 'tabular-nums' }}>
                      {yr}
                    </text>
                  )}
                </g>
              );
            })}

            {/* Fracture columns — span both tracks; rendered before markers
                so dots draw on top of the dashed line rather than under it. */}
            {FRACTURES.map((f, i) => {
              const fx = x(f.year);
              return (
                <motion.g
                  key={`frac-${i}`}
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 0.85 } : { opacity: 0 }}
                  transition={{ duration: 0.45, delay: 1.0 + i * 0.12, ease: EASE }}
                >
                  <line
                    x1={fx} x2={fx} y1={32} y2={428}
                    stroke="var(--case)" strokeWidth="1.1"
                    strokeDasharray="3 4" opacity="0.55"
                  />
                  <rect
                    x={fx - 30} y={20} width={60} height={14} rx={2}
                    fill="color-mix(in srgb, var(--case) 14%, var(--bg))"
                    stroke="color-mix(in srgb, var(--case) 45%, transparent)"
                    strokeWidth="0.75"
                  />
                  <text x={fx} y={30}
                        textAnchor="middle"
                        className="deck-mono uppercase"
                        style={{ fontSize: 9, fill: 'var(--case)', letterSpacing: '0.12em', fontWeight: 600 }}>
                    {f.label} · {f.sub}
                  </text>
                </motion.g>
              );
            })}

            {/* Causal-chain hairlines along the bottom causal lane */}
            {CHAINS.map((c, i) => {
              const x1 = x(c.from), x2 = x(c.to);
              return (
                <motion.path
                  key={`chain-${i}`}
                  d={`M ${x1} ${AXIS_Y + 16} V ${c.lane} H ${x2} V ${AXIS_Y + 16}`}
                  fill="none"
                  stroke="color-mix(in srgb, var(--case) 55%, transparent)"
                  strokeWidth="0.9"
                  markerEnd="url(#cs1bk1-arrow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 0.85, delay: 1.6 + i * 0.18, ease: EASE }}
                />
              );
            })}

            {/* ───── ADULT TRACK markers + leader lines + labels ───── */}
            {ADULT.map((e, i) => {
              const ex = x(e.year);
              const labelY = ADULT_ROW_Y[e.row];
              const isProm = e.kind === 'amb-prom';
              const isCtx = e.kind.startsWith('context');
              const dotR = isProm ? 5.5 : 3.75;
              const dotFill = isCtx ? 'var(--bg)' : 'var(--case)';
              const dotStroke = isCtx ? 'var(--cream-faint)' : 'var(--case)';
              const labelColor = isCtx ? 'var(--cream-muted)' : 'var(--case)';
              const weight = isProm ? 600 : 500;
              return (
                <motion.g
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.9 + i * 0.05, ease: EASE }}
                >
                  <line
                    x1={ex} x2={ex}
                    y1={AXIS_Y - 6} y2={labelY + 6}
                    stroke={isCtx ? 'var(--cream-hairline)' : 'color-mix(in srgb, var(--case) 55%, transparent)'}
                    strokeWidth="0.75"
                  />
                  <circle cx={ex} cy={AXIS_Y} r={dotR}
                          fill={dotFill} stroke={dotStroke} strokeWidth={isCtx ? 1.1 : 0} />
                  <text
                    x={ex} y={labelY}
                    textAnchor={anchorFor(e.year)}
                    className="deck-mono"
                    style={{
                      fontSize: 11,
                      fill: labelColor,
                      fontWeight: weight,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {e.label}
                  </text>
                </motion.g>
              );
            })}

            {/* ───── PEDIATRIC TRACK markers + leader lines + labels ───── */}
            {PED.map((e, i) => {
              const ex = x(e.year);
              const labelY = PED_ROW_Y[e.row];
              const isProm = e.kind === 'amb-prom';
              const isRes  = e.kind === 'amb-resolution';
              const isCtx  = e.kind.startsWith('context');
              const isImp  = e.kind === 'context-imp';
              const dotR = isRes ? 7 : isProm ? 5.5 : 3.75;
              const dotFill = isCtx ? 'var(--bg)' : 'var(--case)';
              const dotStroke = isCtx ? 'var(--cream-faint)' : 'var(--case)';
              const labelColor = isCtx ? 'var(--cream-muted)' : 'var(--case)';
              const weight = (isProm || isRes) ? 600 : isImp ? 500 : 500;
              return (
                <motion.g
                  key={`p-${i}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.05 + i * 0.05, ease: EASE }}
                >
                  <line
                    x1={ex} x2={ex}
                    y1={AXIS_Y + 6} y2={labelY - 8}
                    stroke={isCtx ? 'var(--cream-hairline)' : 'color-mix(in srgb, var(--case) 55%, transparent)'}
                    strokeWidth="0.75"
                  />
                  {isRes && (
                    <circle cx={ex} cy={AXIS_Y} r={11} fill="url(#cs1bk1-resGlow)" />
                  )}
                  {isRes ? (
                    // Diamond resolution marker (rotated square at 45°)
                    <rect x={ex - dotR} y={AXIS_Y - dotR} width={dotR * 2} height={dotR * 2}
                          transform={`rotate(45 ${ex} ${AXIS_Y})`}
                          fill="var(--case)" stroke="var(--cream)" strokeWidth="0.6" />
                  ) : (
                    <circle cx={ex} cy={AXIS_Y} r={dotR}
                            fill={dotFill} stroke={dotStroke} strokeWidth={isCtx ? 1.1 : 0} />
                  )}
                  {isImp && (
                    <circle cx={ex} cy={AXIS_Y} r={dotR + 3}
                            fill="none" stroke="var(--cream-faint)" strokeWidth="0.6" />
                  )}
                  <text
                    x={ex} y={labelY}
                    textAnchor={anchorFor(e.year)}
                    className="deck-mono"
                    style={{
                      fontSize: 11,
                      fill: labelColor,
                      fontWeight: weight,
                      letterSpacing: '0.04em',
                    }}
                  >
                    {e.label}
                  </text>
                </motion.g>
              );
            })}

            {/* Track labels — left rail */}
            <text x={X_START - 14} y={AXIS_Y - 8} textAnchor="end"
                  className="deck-mono uppercase"
                  style={{ fontSize: 10, fill: 'var(--cream-faint)', letterSpacing: '0.14em', fontWeight: 600 }}>
              ADULT
            </text>
            <text x={X_START - 14} y={AXIS_Y + 16} textAnchor="end"
                  className="deck-mono uppercase"
                  style={{ fontSize: 10, fill: 'var(--cream-faint)', letterSpacing: '0.14em', fontWeight: 600 }}>
              PEDIATRIC
            </text>
          </svg>

          {/* Legend — HTML, fluid tokens, edge-aware via flex-wrap */}
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
              paddingTop: 'var(--space-2)',
              paddingBottom: 'var(--space-1)',
              borderTop: '1px solid var(--cream-hairline)',
              marginTop: 'var(--space-2)',
              minWidth: 0,
            }}
          >
            <LegendDot fill="var(--case)"     label="Ambrisentan event" />
            <LegendDot fill="var(--case)" big label="Approval / pivotal" />
            <LegendDiamond label="Pediatric approval (resolution)" />
            <LegendHollow  label="PAH context (non-amb)" />
            <LegendFracture label="Fracture column · trial disruption" />
            <LegendChain    label="Causal chain" />
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="Backup · CS1 · 1995 → 2026"
        tagline="Two precedent frameworks bracket the case · framework absorbed disruption · ICH E11A codified it."
        source="Sources · Galié Circulation 2008 · Ivy J Pediatr X 2020 · Okour J Clin Pharmacol 2023 · NDA 209279 · Eur J Pediatr 2024 · ICH E11A 2024"
      />
    </SlideGrid>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Legend chips — HTML, fluid tokens, no fixed-px widths.
   width tokens use rem (2.4rem swatch column) per CLAUDE.md rule
   "Card / label widths use REM, not raw PX".
   ────────────────────────────────────────────────────────────────────────── */
function LegendShell({ children }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-2)', minWidth: 0 }}>
      {children}
    </div>
  );
}

function LegendLabel({ children }) {
  return (
    <span
      className="deck-mono"
      style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--cream-muted)',
        letterSpacing: '0.06em',
      }}
    >
      {children}
    </span>
  );
}

function LegendDot({ fill, label, big }) {
  const r = big ? '0.55rem' : '0.4rem';
  return (
    <LegendShell>
      <span style={{
        width: r, height: r, borderRadius: '50%',
        background: fill, display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}

function LegendHollow({ label }) {
  return (
    <LegendShell>
      <span style={{
        width: '0.5rem', height: '0.5rem', borderRadius: '50%',
        background: 'transparent',
        border: '1px solid var(--cream-faint)',
        display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}

function LegendDiamond({ label }) {
  return (
    <LegendShell>
      <span style={{
        width: '0.65rem', height: '0.65rem',
        background: 'var(--case)',
        transform: 'rotate(45deg)',
        display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}

function LegendFracture({ label }) {
  return (
    <LegendShell>
      <span style={{
        width: '1px', height: '0.9rem',
        borderLeft: '1.5px dashed var(--case)',
        display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}

function LegendChain({ label }) {
  return (
    <LegendShell>
      <span style={{
        width: '1.2rem', height: '0.5rem',
        borderBottom: '1px solid color-mix(in srgb, var(--case) 55%, transparent)',
        borderLeft:   '1px solid color-mix(in srgb, var(--case) 55%, transparent)',
        borderRight:  '1px solid color-mix(in srgb, var(--case) 55%, transparent)',
        display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}
