// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · "Ambrisentan: parallel adult and pediatric development
 * tracks (2004–2024)" — Q&A backup slide.
 *
 * Source: 2-Slides_Dev/.../V2/inputs/Mariam/timeline.md  (Gamma prompt #2,
 * the ambrisentan-only zoom). Strips out bosentan/sildenafil/macitentan/
 * selexipag/sotatercept context — all events are coral, all are
 * ambrisentan-specific. Adult track = linear 12-year approval cascade;
 * pediatric track = single trial that was started, held, terminated, then
 * resolved into dual approval based on a model-informed framework.
 *
 * Distinguishing visual choices vs. backup-01:
 *   – every-year tick markers (denser axis, since the window is narrower)
 *   – heavier fracture columns with vertical "tombstone" labels
 *   – emphasised causal chains (4 chains: PIP→enroll, HOLD→Mech→TERM,
 *     TERM→Ivy→dual approval, and an UPWARD arc 2021→2023 PopPK to make
 *     the sequencing of the methodological paper after the labels visible)
 *   – no context-dot vocabulary at all; one accent color
 *
 * BOUNDING-BOX AUDIT (per CLAUDE.md §"Bounding-box discipline"):
 *   viewBox = 0 0 1280 460  (preserveAspectRatio="xMidYMid meet")
 *   xStart=80, xEnd=1230  → axisWidth = 1150
 *   year window: 2004..2024 (20 intervals) → xPerYear = 1150 / 20 = 57.5
 *   axisY = 230  (vertical centerline)
 *   Adult label rows:     y 80, 115, 150, 185
 *   Pediatric label rows: y 280, 315, 350, 390
 *   Fracture columns: full-height (y 30 → y 430) dashed verticals.
 *   Resolution diamond ring extends ±11 from x.
 *   Edge-aware textAnchor: events ≤2005 use "start", events ≥2023.5 use
 *   "end", everything else "middle".
 *   Upward methodological arc (2021→2023): rendered as a quadratic
 *   bezier from PopPK marker UP to a control point at (xMid, y=120),
 *   then back down to the EMA approval — visible *above* the adult track.
 */

const X_START = 80;
const X_END = 1230;
const YEAR_MIN = 2004;
const YEAR_MAX = 2024;
const X_PER_YEAR = (X_END - X_START) / (YEAR_MAX - YEAR_MIN);
const AXIS_Y = 230;
const x = (year, frac = 0) => X_START + (year - YEAR_MIN + frac) * X_PER_YEAR;

const anchorFor = (year) => {
  if (year - YEAR_MIN <= 1.0) return 'start';
  if (YEAR_MAX - year <= 1.0) return 'end';
  return 'middle';
};

// Major axis years that get heavier ticks + labels.
const MAJOR_YEARS = new Set([2004, 2007, 2011, 2013, 2019, 2021, 2024]);

// Adult-track events. All ambrisentan, all coral.
const ADULT = [
  { year: 2004.5,  kind: 'amb',         row: 0, label: 'OD US · ’04' },
  { year: 2005.5,  kind: 'amb',         row: 1, label: 'OD EU · ’05' },
  { year: 2006.5,  kind: 'amb',         row: 2, label: 'ARIES start · ’06' },
  { year: 2007.45, kind: 'amb-prom',    row: 3, label: 'FDA · Jun ’07' },
  { year: 2008.30, kind: 'amb-prom',    row: 0, label: 'EMA · Apr ’08' },
  { year: 2008.90, kind: 'amb',         row: 1, label: 'Galié 2008' },
  { year: 2009.50, kind: 'amb',         row: 2, label: 'Oudiz LTE · ’09' },
  { year: 2010.55, kind: 'amb-prom',    row: 3, label: 'PMDA · Jul ’10' },
  { year: 2011.50, kind: 'amb-prom',    row: 0, label: 'BBW removed · ’11' },
  { year: 2014.0,  kind: 'amb',         row: 1, label: 'AMBITION · ’14' },
  { year: 2015.0,  kind: 'amb',         row: 2, label: 'EMA combo · ’15' },
  { year: 2022.0,  kind: 'amb',         row: 3, label: 'Generic · ’22' },
];

// Pediatric-track events. All coral. Two events also drive the fracture
// columns (2013-03 hold + 2019-02 termination) and are therefore *also*
// rendered as full-height verticals separately (FRACTURES below) without
// duplicating the dot here.
const PED = [
  { year: 2010.50, kind: 'amb',            row: 0, label: 'EMA PIP · ’10' },
  { year: 2011.0,  kind: 'amb-prom',       row: 1, label: 'First patient · Jan ’11' },
  { year: 2013.95, kind: 'amb',            row: 2, label: 'LPLV · Nov ’13' },
  { year: 2017.0,  kind: 'amb-prom',       row: 0, label: 'Mech complete · ’17' },
  { year: 2017.85, kind: 'amb',            row: 1, label: 'EMA CHMP · Nov ’17' },
  { year: 2020.5,  kind: 'amb',            row: 2, label: 'Ivy 2020 · J Pediatr X' },
  { year: 2021.25, kind: 'amb-resolution', row: 0, label: 'EMA peds · Apr ’21' },
  { year: 2021.22, kind: 'amb-resolution', row: 1, label: 'PMDA peds · Mar ’21' },
  { year: 2023.0,  kind: 'amb',            row: 2, label: 'Okour PopPK · ’23' },
  { year: 2024.5,  kind: 'amb',            row: 3, label: 'LTE · Eur J Pediatr ’24' },
];

const FRACTURES = [
  { year: 2013.20, label: 'HOLD',       sub: 'Mar ’13' },
  { year: 2019.12, label: 'TERMINATED', sub: 'Feb ’19' },
];

// Causal-chain stitches.
// Lane 1 = primary chain along the bottom causal lane (y ~ 415-425).
// Lane 2 = upward methodological arc (PopPK 2023 ↑ over to 2021 EMA),
//   rendered as a quadratic bezier above the adult-track stagger band.
const CHAINS = [
  { from: 2010.50, to: 2011.0,  lane: 415 },
  { from: 2013.20, to: 2017.0,  lane: 420 },
  { from: 2017.0,  to: 2019.12, lane: 420 },
  { from: 2019.12, to: 2020.5,  lane: 425 },
  { from: 2020.5,  to: 2021.22, lane: 425 },
];

const ADULT_ROW_Y = [80, 115, 150, 185];
const PED_ROW_Y   = [280, 315, 350, 390];

const EASE = [0.2, 0.7, 0.3, 1];

export default function Cs1BackupTimelineAmbOnly() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const animate = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>
        Backup · Case 01 · Q&amp;A timeline (Amb-only)
      </Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Ambrisentan only ·{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          twelve adult years on top,
        </span>{' '}
        one pediatric trial below.
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        Adult: orphan status → ARIES → three regional approvals → label
        update → lifecycle. Pediatric: one trial, held, then terminated,
        then resolved into dual approval. PopPK paper formalises the
        method afterward.
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
            aria-label="Ambrisentan-only adult and pediatric development timeline 2004 to 2024"
            style={{ width: '100%', height: '100%', flex: 1, minHeight: 0 }}
          >
            <defs>
              <radialGradient id="cs1bk2-resGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%"  stopColor="var(--case)" stopOpacity="0.5" />
                <stop offset="100%" stopColor="var(--case)" stopOpacity="0" />
              </radialGradient>
              <marker id="cs1bk2-arrow" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--case)" opacity="0.6" />
              </marker>
              <marker id="cs1bk2-arrow-up" viewBox="0 0 8 8" refX="6" refY="4" markerWidth="6" markerHeight="6" orient="auto">
                <path d="M0,0 L8,4 L0,8 Z" fill="var(--case)" opacity="0.55" />
              </marker>
            </defs>

            {/* Track-zone wash */}
            <rect x={X_START - 8} y={36}  width={X_END - X_START + 16} height={188}
                  fill="color-mix(in srgb, var(--case) 4%, transparent)" />
            <rect x={X_START - 8} y={236} width={X_END - X_START + 16} height={200}
                  fill="color-mix(in srgb, var(--case) 2%, transparent)" />

            {/* Axis hairline */}
            <line x1={X_START} y1={AXIS_Y} x2={X_END} y2={AXIS_Y}
                  stroke="var(--cream-hairline)" strokeWidth="1" />

            {/* Year ticks: every year, with major years thicker + labelled */}
            {Array.from({ length: YEAR_MAX - YEAR_MIN + 1 }, (_, i) => YEAR_MIN + i).map((yr) => {
              const isMajor = MAJOR_YEARS.has(yr);
              const tx = x(yr);
              return (
                <g key={`yt-${yr}`}>
                  <line
                    x1={tx} x2={tx}
                    y1={AXIS_Y - (isMajor ? 7 : 4)}
                    y2={AXIS_Y + (isMajor ? 7 : 4)}
                    stroke={isMajor ? 'var(--cream-faint)' : 'var(--cream-hairline)'}
                    strokeWidth={isMajor ? 1.4 : 0.8}
                  />
                  <text x={tx} y={AXIS_Y + 22}
                        textAnchor="middle"
                        className="deck-mono"
                        style={{
                          fontSize: isMajor ? 11.5 : 10,
                          fill: isMajor ? 'var(--cream)' : 'var(--cream-faint)',
                          opacity: isMajor ? 1 : 0.7,
                          letterSpacing: '0.06em',
                          fontVariantNumeric: 'tabular-nums',
                          fontWeight: isMajor ? 600 : 400,
                        }}>
                    {yr}
                  </text>
                </g>
              );
            })}

            {/* Fracture columns — full-height dashed coral verticals */}
            {FRACTURES.map((f, i) => {
              const fx = x(f.year);
              return (
                <motion.g
                  key={`frac-${i}`}
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 1 } : { opacity: 0 }}
                  transition={{ duration: 0.5, delay: 1.0 + i * 0.12, ease: EASE }}
                >
                  <line
                    x1={fx} x2={fx} y1={42} y2={418}
                    stroke="var(--case)" strokeWidth="1.3"
                    strokeDasharray="4 5" opacity="0.7"
                  />
                  <rect
                    x={fx - 36} y={28} width={72} height={16} rx={2}
                    fill="color-mix(in srgb, var(--case) 18%, var(--bg))"
                    stroke="color-mix(in srgb, var(--case) 55%, transparent)"
                    strokeWidth="0.85"
                  />
                  <text x={fx} y={40}
                        textAnchor="middle"
                        className="deck-mono uppercase"
                        style={{
                          fontSize: 10,
                          fill: 'var(--case)',
                          letterSpacing: '0.14em',
                          fontWeight: 700,
                        }}>
                    {f.label} · {f.sub}
                  </text>
                </motion.g>
              );
            })}

            {/* Causal-chain hairlines along the causal lane */}
            {CHAINS.map((c, i) => {
              const x1 = x(c.from), x2 = x(c.to);
              return (
                <motion.path
                  key={`chain-${i}`}
                  d={`M ${x1} ${AXIS_Y + 16} V ${c.lane} H ${x2} V ${AXIS_Y + 16}`}
                  fill="none"
                  stroke="color-mix(in srgb, var(--case) 60%, transparent)"
                  strokeWidth="1"
                  markerEnd="url(#cs1bk2-arrow)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.9 }}
                  transition={{ duration: 0.85, delay: 1.6 + i * 0.18, ease: EASE }}
                />
              );
            })}

            {/* Upward methodological arc: 2023 PopPK → 2021 EMA approval.
                Quadratic bezier with control point above the adult band so
                it visibly travels OVER the rest of the timeline — signals
                that the publication is downstream of the regulatory work. */}
            {(() => {
              const xPopPK = x(2023.0);
              const xEMA   = x(2021.25);
              const ctrlX  = (xPopPK + xEMA) / 2;
              const ctrlY  = 50;
              return (
                <motion.path
                  d={`M ${xPopPK} ${AXIS_Y - 8} Q ${ctrlX} ${ctrlY} ${xEMA} ${AXIS_Y - 14}`}
                  fill="none"
                  stroke="color-mix(in srgb, var(--case) 55%, transparent)"
                  strokeWidth="1"
                  strokeDasharray="2 3"
                  markerEnd="url(#cs1bk2-arrow-up)"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={animate ? { pathLength: 1, opacity: 1 } : { pathLength: 1, opacity: 0.85 }}
                  transition={{ duration: 1.1, delay: 2.4, ease: EASE }}
                />
              );
            })()}

            {/* ───── ADULT TRACK markers + leader lines + labels ───── */}
            {ADULT.map((e, i) => {
              const ex = x(e.year);
              const labelY = ADULT_ROW_Y[e.row];
              const isProm = e.kind === 'amb-prom';
              const dotR = isProm ? 5.5 : 3.75;
              return (
                <motion.g
                  key={`a-${i}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.85 + i * 0.05, ease: EASE }}
                >
                  <line
                    x1={ex} x2={ex}
                    y1={AXIS_Y - 6} y2={labelY + 6}
                    stroke="color-mix(in srgb, var(--case) 55%, transparent)"
                    strokeWidth="0.75"
                  />
                  <circle cx={ex} cy={AXIS_Y} r={dotR} fill="var(--case)" />
                  <text
                    x={ex} y={labelY}
                    textAnchor={anchorFor(e.year)}
                    className="deck-mono"
                    style={{
                      fontSize: isProm ? 11.5 : 11,
                      fill: 'var(--case)',
                      fontWeight: isProm ? 600 : 500,
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
              const dotR = isRes ? 7 : isProm ? 5.5 : 3.75;
              return (
                <motion.g
                  key={`p-${i}`}
                  initial={{ opacity: 0, y: -6 }}
                  animate={animate ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 1.0 + i * 0.05, ease: EASE }}
                >
                  <line
                    x1={ex} x2={ex}
                    y1={AXIS_Y + 6} y2={labelY - 8}
                    stroke="color-mix(in srgb, var(--case) 55%, transparent)"
                    strokeWidth="0.75"
                  />
                  {isRes && (
                    <circle cx={ex} cy={AXIS_Y} r={11} fill="url(#cs1bk2-resGlow)" />
                  )}
                  {isRes ? (
                    <rect x={ex - dotR} y={AXIS_Y - dotR} width={dotR * 2} height={dotR * 2}
                          transform={`rotate(45 ${ex} ${AXIS_Y})`}
                          fill="var(--case)" stroke="var(--cream)" strokeWidth="0.7" />
                  ) : (
                    <circle cx={ex} cy={AXIS_Y} r={dotR} fill="var(--case)" />
                  )}
                  <text
                    x={ex} y={labelY}
                    textAnchor={anchorFor(e.year)}
                    className="deck-mono"
                    style={{
                      fontSize: (isProm || isRes) ? 11.5 : 11,
                      fill: 'var(--case)',
                      fontWeight: (isProm || isRes) ? 600 : 500,
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

            {/* Annotation for the upward methodological arc — small,
                edge-aware so it doesn't overlap the EMA label. Placed
                just under the arc apex. */}
            {(() => {
              const xPopPK = x(2023.0);
              const xEMA   = x(2021.25);
              const ctrlX  = (xPopPK + xEMA) / 2;
              return (
                <motion.text
                  x={ctrlX} y={68}
                  textAnchor="middle"
                  className="deck-mono"
                  style={{
                    fontSize: 9.5,
                    fill: 'var(--cream-muted)',
                    fontStyle: 'italic',
                    letterSpacing: '0.04em',
                  }}
                  initial={{ opacity: 0 }}
                  animate={animate ? { opacity: 1 } : { opacity: 0.85 }}
                  transition={{ duration: 0.6, delay: 2.85, ease: EASE }}
                >
                  Methodological paper · published after the labels
                </motion.text>
              );
            })()}
          </svg>

          {/* Legend strip — minimal, matches the single-color scheme. */}
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
            <LegendFracture label="Fracture column · trial disruption" />
            <LegendChain    label="Causal chain" />
            <LegendArc      label="Methodological feedback (post-approval)" />
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="Backup · CS1 · 2004 → 2024"
        tagline="Adult linear · pediatric disrupted · same molecule, two paths · framework absorbed disruption."
        source="Sources · Galié Circulation 2008 · Ivy J Pediatr X 2020 · Okour J Clin Pharmacol 2023 · GSK Japan press release 2021-03-23 · EMA Volibris EPAR · PMDA Volibris label · Eur J Pediatr 2024"
      />
    </SlideGrid>
  );
}

/* ──────────────────────────────────────────────────────────────────────────
   Legend chips — HTML, fluid tokens, no fixed-px widths.
   width tokens use rem per CLAUDE.md "Card / label widths use REM, not px".
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
        width: '1px', height: '0.95rem',
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
        borderBottom: '1px solid color-mix(in srgb, var(--case) 60%, transparent)',
        borderLeft:   '1px solid color-mix(in srgb, var(--case) 60%, transparent)',
        borderRight:  '1px solid color-mix(in srgb, var(--case) 60%, transparent)',
        display: 'inline-block', flexShrink: 0,
      }} />
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}

function LegendArc({ label }) {
  return (
    <LegendShell>
      <svg width="22" height="14" viewBox="0 0 22 14" aria-hidden style={{ flexShrink: 0 }}>
        <path d="M 2 12 Q 11 -2 20 12"
              fill="none"
              stroke="color-mix(in srgb, var(--case) 55%, transparent)"
              strokeWidth="1"
              strokeDasharray="2 3" />
      </svg>
      <LegendLabel>{label}</LegendLabel>
    </LegendShell>
  );
}
