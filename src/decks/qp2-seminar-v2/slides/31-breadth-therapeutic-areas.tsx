// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import ThemesConstellation from './closing-divider/ThemesConstellation';

/**
 * Slide 31 · Breadth — Pharmacometric leadership across six clinical
 * domains.
 *
 * Editorial directory composition replacing the prior 3×2 card grid.
 * Six therapeutic-area entries are each anchored by a small monoline
 * SVG glyph (≤48px) sitting on hairline columns/rows; no panel
 * backgrounds, no rounded chrome — the typography and the rules ARE
 * the structure. The ThemesConstellation morphs in from slide 30 as
 * a faint watermark behind the directory, completing the cinematic
 * continuity that links the closing-divider to its content slide.
 *
 * The bottom stat strip (Programs · Submissions · Labels · Agencies ·
 * Domains) carries the same vocabulary the audience saw on slide 04
 * and will see again on slide 32 — one figure per regulatory unit.
 */

const DOMAINS = [
  {
    key: 'rare-disease',
    domain: 'Rare disease',
    /* CS1 callback — coral is the deck's CS1 case-identity color and
       this domain entry IS the CS1 program (ambrisentan). The cite
       chip echoes the case marker so the audience reads "Act IV scope
       includes the CS1 lineage" on first scan. */
    token: 'coral',
    program: 'Pediatric PAH · Ambrisentan',
    detail: 'EMA approval · pediatric extrapolation template',
    cite: 'JCP 2023 · CS1',
    badge: 'flagship',
    glyph: GlyphRareDisease,
  },
  {
    key: 'oncology',
    domain: 'Oncology',
    /* CS3 callback — violet is the deck's CS3 case-identity color and
       this row references the SPARK-ALL combination program. */
    token: 'violet',
    program: 'BCL-2 · S65487 · Adult ALL asparaginase',
    detail: 'Combination PK/PD · CS3 (SPARK-ALL)',
    cite: 'NCT01195194 · CS3',
    badge: null,
    glyph: GlyphOncology,
  },
  {
    key: 'cardiometabolic',
    domain: 'Cardiometabolic',
    /* Sage (deck-neutral). Cardiometabolic is unaffiliated with any
       case, so a non-case token avoids reading as a CS callback. */
    token: 'sage',
    program: 'DGAT1 inhibitor · GSK3008356',
    detail: 'PK/PD turnover model · triglycerides',
    cite: 'CPT 2019',
    badge: null,
    glyph: GlyphCardiometabolic,
  },
  {
    key: 'antiviral',
    domain: 'Antiviral',
    token: 'sage',
    program: 'IV zanamivir · Dectova',
    detail: 'PopPK/PD in pediatrics',
    cite: 'CTS 2020',
    badge: null,
    glyph: GlyphAntiviral,
  },
  {
    key: 'global-regulatory',
    domain: 'Global regulatory',
    /* CS2 callback — cyan is the deck's CS2 case-identity color; the
       Tibsovo · India waiver pathway IS the CS2 program. */
    token: 'cyan',
    program: 'Tibsovo · India waiver pathway',
    detail: 'CDSCO precedent · clin-pharm package',
    cite: '2025 · CS2',
    badge: 'flagship',
    glyph: GlyphRegulatory,
  },
  {
    key: 'ai-ml',
    domain: 'AI / ML',
    /* Amber (theme token). DeepPK + PharmAgent live in the active-
       research band, not in any closed case study, so this carries
       the closing-arc's amber accent. */
    token: 'amber',
    program: 'Neural ODE + multi-agent LLM',
    detail: 'DeepPK · PharmAgent · pharmacometric automation',
    cite: '2024 → present',
    badge: 'active',
    glyph: GlyphAiMl,
  },
];

const STAT_TILES = [
  { value: '15+', label: 'Programs' },
  { value: '8',   label: 'Submissions' },
  { value: '4',   label: 'Approved labels' },
  { value: '6',   label: 'Agencies' },
  { value: '6',   label: 'Domains' },
];

export default function Slide31BreadthTherapeuticAreas() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    backdrop: 0.30,
    grid: 0.95,
    stats: 2.40,
    source: 2.95,
  };

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Breadth · Six domains</Eyebrow>
      <Headline delay={D.headline} maxChars={48}>
        Pharmacometric leadership across{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          six clinical domains.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Dose, label, and strategy decisions across rare disease,
        oncology, cardiometabolic, antiviral, regulatory, and AI/ML.
      </Subhead>

      <Viz>
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: '1fr auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* Constellation watermark — morphs IN from slide 30 hero
              illustration via the shared layoutId and dims to a faint
              center-right backdrop. mix-blend screen keeps it readable
              through the directory; pointer-events disabled so it
              never intercepts hover on the TA glyphs. Hidden under
              1100px so the directory takes the full width on narrow
              decks. */}
          <div
            aria-hidden
            className="closing-breadth-constellation-bg"
            style={{
              position: 'absolute',
              top: '50%',
              right: '-6%',
              transform: 'translateY(-50%)',
              zIndex: 0,
              opacity: 0.22,
              mixBlendMode: 'screen',
              pointerEvents: 'none',
            }}
          >
            <ThemesConstellation
              layoutId="themes-constellation"
              variant="context"
            />
          </div>
          <style>{`
            @media (max-width: 1100px) {
              .closing-breadth-constellation-bg { display: none !important; }
            }
            .ta-entry .ta-glyph-svg { color: var(--cream-faint); transition: color 240ms ease; }
            .ta-entry:hover .ta-glyph-svg,
            .ta-entry:focus-within .ta-glyph-svg { color: var(--amber); }
            .ta-entry:hover .ta-glyph-svg .ta-accent,
            .ta-entry:focus-within .ta-glyph-svg .ta-accent { stroke: var(--amber); opacity: 1; }
          `}</style>

          {/* Directory grid — 3 cols × 2 rows. Hairlines between cols
              and the inner row provide the structure; no panel chrome.
              CSS grid `gap` doubles as the rule canvas via inline
              border-* on each cell. */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gridTemplateRows: 'repeat(2, 1fr)',
              minHeight: 0,
            }}
          >
            {DOMAINS.map((d, i) => {
              const col = i % 3;
              const row = Math.floor(i / 3);
              return (
                <DomainEntry
                  key={d.key}
                  domain={d}
                  delay={D.grid + i * 0.10}
                  isFirstCol={col === 0}
                  isFirstRow={row === 0}
                />
              );
            })}
          </div>

          {/* Bottom stat strip — 5 tiles */}
          <motion.div
            style={{
              position: 'relative',
              zIndex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(5, 1fr)',
              gap: 'var(--space-3)',
              paddingTop: 'var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.stats }}
          >
            {STAT_TILES.map((s, i) => (
              <StatTile key={s.label} value={s.value} label={s.label} delay={D.stats + i * 0.07} />
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Closing · 31 of 35"
        source="Source · Peer-reviewed publications · CS1 · CS2 · CS3 · author's pharmacometrics record"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ============================================================
   DomainEntry — one editorial row in the 3×2 directory.
   No card chrome. Hairlines on the inside edges only so the
   outer slide gutter stays uninterrupted by a visible frame.
   ============================================================ */
function DomainEntry({ domain, delay, isFirstCol, isFirstRow }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const Glyph = domain.glyph;
  const color = `var(--${domain.token})`;
  const isFlagship = domain.badge === 'flagship';
  const isActive = domain.badge === 'active';

  return (
    <motion.div
      className="ta-entry"
      style={{
        position: 'relative',
        padding: 'var(--space-4) var(--space-5)',
        paddingLeft: isFirstCol ? 'var(--space-3)' : 'var(--space-5)',
        paddingTop: isFirstRow ? 'var(--space-3)' : 'var(--space-5)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-4)',
        alignContent: 'start',
        rowGap: 6,
        minHeight: 0,
        minWidth: 0,
        borderLeft: isFirstCol ? 'none' : '1px solid var(--cream-hairline)',
        borderTop: isFirstRow ? 'none' : '1px solid var(--cream-hairline)',
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Glyph column — spans both text rows */}
      <div
        style={{
          gridRow: '1 / span 4',
          alignSelf: 'start',
          paddingTop: 2,
        }}
      >
        <Glyph size={42} />
      </div>

      {/* Row 1 · domain label + badge */}
      <div
        style={{
          display: 'flex',
          alignItems: 'baseline',
          justifyContent: 'space-between',
          gap: 'var(--space-2)',
          minWidth: 0,
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 700,
          }}
        >
          {domain.domain}
        </span>
        {(isFlagship || isActive) && (
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-card-meta)',
              letterSpacing: 'var(--ls-mono)',
              color: isFlagship ? color : 'var(--amber)',
              fontWeight: 700,
              flexShrink: 0,
              borderLeft: `2px solid ${isFlagship ? color : 'var(--amber)'}`,
              paddingLeft: 8,
            }}
          >
            {isFlagship ? 'Flagship' : 'Active'}
          </span>
        )}
      </div>

      {/* Row 2 · program */}
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1.3,
          minWidth: 0,
        }}
      >
        {domain.program}
      </div>

      {/* Row 3 · one-line detail */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
          minWidth: 0,
        }}
      >
        {domain.detail}
      </div>

      {/* Row 4 · cite chip */}
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: 'var(--ls-mono)',
          color,
          fontWeight: 700,
          paddingTop: 6,
          marginTop: 4,
          borderTop: '1px dashed var(--cream-hairline)',
        }}
      >
        {domain.cite}
      </div>
    </motion.div>
  );
}

/* ========================================================
   StatTile — one tile in the bottom 5-tile stat strip
   ======================================================== */
function StatTile({ value, label, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{ textAlign: 'center', padding: 'var(--space-3) var(--space-2)' }}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          color: 'var(--cream)',
          fontWeight: 700,
          lineHeight: 1,
          marginBottom: 6,
        }}
      >
        {value}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 600,
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

/* ============================================================
   Therapeutic-area glyphs.
   Inline monoline SVGs at 56×56 viewBox. `currentColor` so the
   .ta-entry hover swap to var(--amber) cascades through. The
   `.ta-accent` class marks the per-glyph "spark" stroke that
   intensifies on hover (slightly thicker / fully opaque).
   ============================================================ */
function GlyphFrame({ size, children, label }) {
  return (
    <svg
      className="ta-glyph-svg"
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      role="img"
      aria-label={label}
    >
      {children}
    </svg>
  );
}

/* Rare disease — single-patient figure threaded through a stylized
   double-helix arc. Reads as "the lone patient + the molecular cause
   we found a way to characterize." */
function GlyphRareDisease({ size = 42 }) {
  return (
    <GlyphFrame size={size} label="Rare disease">
      <circle cx="28" cy="14" r="3.6" />
      <path d="M28 18 v9" />
      <path d="M21 30 L28 27 L35 30" />
      <path d="M28 27 v8" />
      <path d="M22 50 L28 35 L34 50" />
      <path
        className="ta-accent"
        d="M14 16 q14 6 28 0 M14 24 q14 6 28 0 M14 32 q14 6 28 0 M14 40 q14 6 28 0"
        strokeOpacity={0.55}
        strokeDasharray="3 4"
      />
    </GlyphFrame>
  );
}

/* Oncology — clustered tumor cells (six-point cellular rosette). */
function GlyphOncology({ size = 42 }) {
  const ring = [0, 60, 120, 180, 240, 300].map((d) => {
    const r = 12;
    const a = (d * Math.PI) / 180;
    return { x: 28 + r * Math.cos(a), y: 28 + r * Math.sin(a) };
  });
  return (
    <GlyphFrame size={size} label="Oncology">
      <circle cx="28" cy="28" r="5" className="ta-accent" />
      {ring.map((p, i) => (
        <circle key={i} cx={p.x} cy={p.y} r={4} />
      ))}
      {ring.map((p, i) => (
        <line key={`l-${i}`} x1="28" y1="28" x2={p.x} y2={p.y} strokeOpacity={0.45} />
      ))}
    </GlyphFrame>
  );
}

/* Cardiometabolic — heart silhouette enclosing a small EKG/glucose
   waveform. */
function GlyphCardiometabolic({ size = 42 }) {
  return (
    <GlyphFrame size={size} label="Cardiometabolic">
      <path d="M28 46 C 8 32, 8 14, 18 12 C 24 11, 28 16, 28 19 C 28 16, 32 11, 38 12 C 48 14, 48 32, 28 46 Z" />
      <path
        className="ta-accent"
        d="M14 28 H 21 L 24 22 L 27 34 L 30 26 L 33 30 H 42"
        strokeWidth="1.6"
      />
    </GlyphFrame>
  );
}

/* Antiviral — virus capsid hexagon with central protein and
   spike receptors at three vertices. */
function GlyphAntiviral({ size = 42 }) {
  const hex = [];
  for (let i = 0; i < 6; i += 1) {
    const a = (-Math.PI / 2) + (i * Math.PI) / 3;
    hex.push({ x: 28 + 18 * Math.cos(a), y: 28 + 18 * Math.sin(a) });
  }
  const pts = hex.map((p) => `${p.x},${p.y}`).join(' ');
  return (
    <GlyphFrame size={size} label="Antiviral">
      <polygon points={pts} />
      {[0, 2, 4].map((i) => (
        <line key={i} x1="28" y1="28" x2={hex[i].x} y2={hex[i].y} strokeOpacity={0.45} />
      ))}
      <circle cx="28" cy="28" r="4" className="ta-accent" />
      {[0, 2, 4].map((i) => {
        const a = (-Math.PI / 2) + (i * Math.PI) / 3;
        const tip = { x: 28 + 24 * Math.cos(a), y: 28 + 24 * Math.sin(a) };
        return (
          <circle key={`spike-${i}`} cx={tip.x} cy={tip.y} r="2" className="ta-accent" strokeOpacity={0.7} />
        );
      })}
    </GlyphFrame>
  );
}

/* Global regulatory — balance scale with a globe pivot. */
function GlyphRegulatory({ size = 42 }) {
  return (
    <GlyphFrame size={size} label="Global regulatory">
      <line x1="28" y1="10" x2="28" y2="42" />
      <line x1="14" y1="46" x2="42" y2="46" />
      <line x1="10" y1="18" x2="46" y2="18" />
      <path d="M14 18 L 8 28 A 6 6 0 0 0 20 28 L 14 18 Z" />
      <path d="M42 18 L 36 28 A 6 6 0 0 0 48 28 L 42 18 Z" />
      <circle cx="28" cy="14" r="3" className="ta-accent" />
      <path d="M25 14 q 3 -2 6 0 M25 14 q 3 2 6 0" strokeOpacity={0.55} />
    </GlyphFrame>
  );
}

/* AI/ML — three-layer feed-forward net (4-3-2) with the output node
   highlighted as the accent. */
function GlyphAiMl({ size = 42 }) {
  const L1 = [10, 22, 34, 46].map((y) => ({ x: 12, y }));
  const L2 = [16, 28, 40].map((y) => ({ x: 28, y }));
  const L3 = [22, 34].map((y) => ({ x: 44, y }));
  return (
    <GlyphFrame size={size} label="AI / ML">
      {L1.flatMap((a, i) =>
        L2.map((b, j) => (
          <line key={`12-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeOpacity={0.30} />
        ))
      )}
      {L2.flatMap((a, i) =>
        L3.map((b, j) => (
          <line key={`23-${i}-${j}`} x1={a.x} y1={a.y} x2={b.x} y2={b.y} strokeOpacity={0.45} />
        ))
      )}
      {L1.map((p, i) => (
        <circle key={`l1-${i}`} cx={p.x} cy={p.y} r="2.2" />
      ))}
      {L2.map((p, i) => (
        <circle key={`l2-${i}`} cx={p.x} cy={p.y} r="2.2" />
      ))}
      {L3.map((p, i) => (
        <circle key={`l3-${i}`} cx={p.x} cy={p.y} r="2.6" className="ta-accent" />
      ))}
    </GlyphFrame>
  );
}
