// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 08 — Field-level context · ambrisentan adult & pediatric
 * journey within the broader pediatric PAH approval landscape.
 *
 * 2026-04-26 user pass — full rebuild per direction:
 *   "timeline looks bad.. fix.." +
 *   "we would benefit by adding or highlighting Ambrisentan adult and
 *    pediatric timelines see backup slides...extract what could
 *    support the story and enhance clarity about any potential
 *    question to avoid why stopped, when did it start..etc" +
 *   memory rule (visuals must pre-empt foreseeable Q&A probes AND
 *   serve as memory aid; include competitors).
 *
 * Layout (top → bottom):
 *   1. Adult track header — "Field · adult PAH approvals"
 *   2. Adult markers above axis — bosentan/sildenafil/ambrisentan/
 *      macitentan/selexipag/sotatercept. Ambrisentan = coral; others
 *      = cream-faint ambient.
 *   3. Year axis — every 5 years labeled, 2000–2025
 *   4. Pediatric markers below axis — bosentan FUTURE-1 (the precedent),
 *      sildenafil peds, AMB HOLD (✕ coral), bosentan FDA peds, AMB
 *      TERMINATED (✕ coral), AMB APPROVED (✓ amber), sildenafil FDA peds,
 *      ICH E11A codification
 *   5. Pediatric track header below — "Pediatric arms + ambrisentan journey"
 *   6. Journey arc — dashed coral connector AMB 2013 HOLD → 2019 TERMINATED
 *      → 2021 APPROVED so the rebound story reads at a glance
 *   7. Annotation strip — methodology beat ("the precedent")
 *
 * Ambrisentan markers carry exact dates (Mar 2013, Feb 2019, etc.) so
 * panelists' "when did that happen?" probes are answered on the slide.
 * Field-context drug markers are smaller + cream-faint to recede.
 *
 * Lung continues the cs1-lung layoutId chain — trachea-axis variant
 * rotated 90° as horizontal anatomical backdrop behind the timeline.
 *
 * Sources verified: Letairis FDA approval Jun 15, 2007 · EMA Volibris
 * EPAR 2008 · GSK Japan press 2021-03-23 · EMA Volibris pediatric Apr
 * 2021 · Beghetti BJCP 2009 · Ivy J Pediatr X 2020 · Okour J Clin
 * Pharmacol 2023 · ICH E11A Step 4 (Dec 2024).
 */

const EASE = [0.2, 0.7, 0.3, 1];

// Adult PAH approvals — the field. AMB highlighted, others ambient.
const ADULT = [
  { year: 2001, label: 'Bosentan',     kind: 'field' },
  { year: 2005, label: 'Sildenafil',   kind: 'field' },
  { year: 2007, label: 'Ambrisentan',  kind: 'amb', sub: 'Jun 2007 FDA' },
  { year: 2013, label: 'Macitentan',   kind: 'field' },
  { year: 2015, label: 'Selexipag',    kind: 'field' },
  { year: 2024, label: 'Sotatercept',  kind: 'field' },
];

// Pediatric milestones — field markers + AMB-specific events.
const PEDIATRIC = [
  { year: 2009,    label: 'Bosentan EMA peds',    sub: 'FUTURE-1', kind: 'precedent' },
  { year: 2011,    label: 'Sildenafil EMA peds',  kind: 'field' },
  { year: 2013.20, label: 'AMB HOLD',             sub: 'Mar 2013 · juvenile rat', kind: 'amb-hold' },
  { year: 2017,    label: 'Bosentan FDA peds',    kind: 'field' },
  { year: 2019.12, label: 'AMB TERMINATED',       sub: 'Feb 2019 · 41/66 enrolled', kind: 'amb-term' },
  { year: 2021.25, label: 'AMB APPROVED',         sub: 'EMA + PMDA peds', kind: 'amb-approved' },
  { year: 2023,    label: 'Sildenafil FDA peds',  kind: 'field' },
  { year: 2024,    label: 'ICH E11A',             sub: 'codified', kind: 'codification' },
];

const YEAR_MIN = 2000;
const YEAR_MAX = 2026;
const yearToPct = (y) => ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100;

// Visual config per kind — drives color, dot style, label weight.
const KIND = {
  field:        { accent: 'var(--cream-faint)', dotR: 4,  filled: false, glyph: null,  weight: 500, opacity: 0.65 },
  precedent:    { accent: 'var(--case)',        dotR: 5,  filled: false, glyph: null,  weight: 600, opacity: 0.92 },
  codification: { accent: 'var(--amber)',       dotR: 5,  filled: false, glyph: null,  weight: 600, opacity: 0.92 },
  amb:          { accent: 'var(--case)',        dotR: 6,  filled: true,  glyph: null,  weight: 700, opacity: 1 },
  'amb-hold':   { accent: 'var(--case)',        dotR: 7,  filled: true,  glyph: '✕',   weight: 700, opacity: 1 },
  'amb-term':   { accent: 'var(--case)',        dotR: 7,  filled: true,  glyph: '✕',   weight: 700, opacity: 1 },
  'amb-approved': { accent: 'var(--amber)',     dotR: 8,  filled: true,  glyph: '✓',   weight: 700, opacity: 1 },
};

function Marker({ entry, side, delay, reduced }) {
  const pct = yearToPct(entry.year);
  const cfg = KIND[entry.kind] || KIND.field;
  const anchorRight = pct > 82;
  const anchorMiddle = pct > 25 && pct <= 82;

  const transform = anchorRight ? 'translateX(-100%)' : (anchorMiddle ? 'translateX(-50%)' : 'translateX(0)');
  const textAlign = anchorRight ? 'right' : (anchorMiddle ? 'center' : 'left');

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: side === 'above' ? -4 : 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'absolute',
        left: `${pct}%`,
        ...(side === 'above' ? { bottom: '50%', marginBottom: 10 } : { top: '50%', marginTop: 10 }),
        display: 'flex',
        flexDirection: 'column',
        alignItems: anchorRight ? 'flex-end' : (anchorMiddle ? 'center' : 'flex-start'),
        gap: 3,
        transform,
        opacity: cfg.opacity,
      }}
    >
      {side === 'below' && <Dot cfg={cfg} />}
      <span className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: cfg.accent === 'var(--cream-faint)' ? 'var(--cream-muted)' : cfg.accent,
        fontWeight: cfg.weight,
        letterSpacing: 'var(--ls-mono)',
        whiteSpace: 'nowrap',
        textAlign,
        fontVariantNumeric: 'tabular-nums',
      }}>
        {Math.floor(entry.year)}
      </span>
      <span className="deck-body" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: cfg.accent === 'var(--cream-faint)' ? 'var(--cream-muted)' : 'var(--cream)',
        fontWeight: cfg.weight,
        opacity: cfg.opacity,
        lineHeight: 1.2,
        textAlign,
        whiteSpace: 'nowrap',
      }}>
        {entry.label}
      </span>
      {entry.sub && (
        <span className="deck-mono" style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.92)',
          color: cfg.accent === 'var(--cream-faint)' ? 'var(--cream-muted)' : cfg.accent,
          opacity: 0.8,
          letterSpacing: 'var(--ls-mono)',
          textAlign,
          whiteSpace: 'nowrap',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {entry.sub}
        </span>
      )}
      {side === 'above' && <Dot cfg={cfg} />}
    </motion.div>
  );
}

function Dot({ cfg }) {
  const r = cfg.dotR;
  return (
    <span aria-hidden style={{
      width: r * 2,
      height: r * 2,
      borderRadius: '50%',
      background: cfg.filled ? cfg.accent : 'transparent',
      border: `1.5px solid ${cfg.accent}`,
      boxShadow: cfg.filled ? `0 0 6px color-mix(in srgb, ${cfg.accent} 50%, transparent)` : 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: cfg.filled ? 'var(--bg)' : cfg.accent,
      fontSize: r * 1.2,
      fontWeight: 800,
      lineHeight: 1,
    }}>
      {cfg.glyph}
    </span>
  );
}

export default function Cs1Trial() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Trachea-as-axis lung anchor — continues cs1-lung layoutId chain */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: '50%',
          top: '54%',
          transform: 'translate(-50%, -50%)',
          width: 'clamp(28rem, 62vw, 50rem)',
          opacity: 0.20,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="trachea-axis"
          rotation={90}
        />
      </div>

      <Eyebrow delay={0.10}>
        Case 01 · The field-level context
      </Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH moves slowly —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          and ambrisentan&rsquo;s pediatric path took eight years.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        Adult approvals above the axis · pediatric arms below · ambrisentan&rsquo;s adult-and-pediatric story stands out in coral; the 2009 FUTURE-1 framework made the 2021 approval possible.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(var(--space-3), 2vh, var(--space-4))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-3))',
          paddingBottom: 'clamp(var(--space-2), 1.5vh, var(--space-3))',
        }}>
          {/* Track header strip */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: 'var(--space-2)' }}>
            <span className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              fontWeight: 700,
            }}>
              Field · adult PAH approvals
            </span>
            <span className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case)',
              fontWeight: 700,
            }}>
              Ambrisentan story · 8-year hold-to-approval
            </span>
          </div>

          {/* Timeline scaffold */}
          <div style={{
            position: 'relative',
            flex: 1,
            minHeight: '14rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            background: 'color-mix(in srgb, var(--panel) 62%, transparent)',
            backdropFilter: 'blur(10px) saturate(1.2)',
            WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-lg)',
            padding: 'clamp(var(--space-3), 2vw, var(--space-5))',
            zIndex: 1,
          }}>
            {/* ABOVE-AXIS — adult markers */}
            <div style={{ position: 'relative', height: '5.5rem', marginBottom: 'var(--space-2)' }}>
              {ADULT.map((e, i) => (
                <Marker key={`a-${i}`} entry={e} side="above" delay={0.85 + i * 0.06} reduced={reduced} />
              ))}
            </div>

            {/* AXIS line + ticks */}
            <motion.div
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: reduced ? 0 : 0.8, delay: reduced ? 0 : 0.85, ease: EASE }}
              style={{
                height: 2,
                background: 'linear-gradient(90deg, var(--cream-faint) 0%, var(--cream-muted) 30%, var(--cream-muted) 70%, var(--cream-faint) 100%)',
                width: '100%',
                transformOrigin: 'left center',
                position: 'relative',
                borderRadius: 1,
              }}
            >
              {[2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
                <span key={y} aria-hidden style={{
                  position: 'absolute',
                  left: `${yearToPct(y)}%`,
                  top: -4,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  transform: 'translateX(-50%)',
                }}>
                  <span style={{
                    width: 1.5,
                    height: 10,
                    background: 'var(--cream-muted)',
                    borderRadius: 1,
                  }} />
                  <span className="deck-mono" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream-faint)',
                    fontWeight: 600,
                    marginTop: 3,
                    fontVariantNumeric: 'tabular-nums',
                  }}>
                    {y}
                  </span>
                </span>
              ))}
            </motion.div>

            {/* BELOW-AXIS — pediatric markers */}
            <div style={{ position: 'relative', height: '7rem', marginTop: 'var(--space-3)' }}>
              {PEDIATRIC.map((e, i) => (
                <Marker key={`p-${i}`} entry={e} side="below" delay={1.25 + i * 0.06} reduced={reduced} />
              ))}

              {/* Journey arc — dashed coral underline connecting HOLD → TERM → APPROVED */}
              <JourneyArc reduced={reduced} />
            </div>
          </div>

          {/* Annotation strip — the methodology beat */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 2.05, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.88,
              lineHeight: 1.5,
              borderLeft: '3px solid var(--case)',
              paddingLeft: 'var(--space-3)',
              maxWidth: '94ch',
            }}
          >
            <strong style={{ color: 'var(--case)' }}>2009 FUTURE-1 (bosentan)</strong> set the framework: PK matching as the regulatory bridge.
            {' '}<strong style={{ color: 'var(--cream)' }}>Ambrisentan applied it under three simultaneous program disruptions</strong> — and 8 years after the 2013 hold, EMA + PMDA approved it for pediatric PAH.
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.25}
        kicker="08 · CS1 · TIMELINE"
        source="Sources · FDA / EMA approval records · Beghetti BJCP 2009 · Ivy J Pediatr X 2020 · Okour J Clin Pharmacol 2023 · GSK Japan press 2021-03-23 · ICH E11A Step 4 (Dec 2024)"
      />
    </SlideGrid>
  );
}

/* ── Journey arc — dashed coral underline below the AMB peds events ── */
function JourneyArc({ reduced }) {
  const xHold = yearToPct(2013.20);
  const xTerm = yearToPct(2019.12);
  const xAppr = yearToPct(2021.25);

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 30"
      preserveAspectRatio="none"
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -8,
        width: '100%',
        height: 30,
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {/* HOLD → TERMINATED arc (coral, dashed) */}
      <motion.path
        d={`M ${xHold} 4 Q ${(xHold + xTerm) / 2} 22, ${xTerm} 4`}
        stroke="var(--case)"
        strokeWidth="0.4"
        fill="none"
        strokeDasharray="1.4 1.2"
        strokeLinecap="round"
        opacity={0.6}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 1.2, delay: reduced ? 0 : 1.95, ease: EASE }}
        vectorEffect="non-scaling-stroke"
      />
      {/* TERMINATED → APPROVED arc (transitions to amber) */}
      <motion.path
        d={`M ${xTerm} 4 Q ${(xTerm + xAppr) / 2} 22, ${xAppr} 4`}
        stroke="var(--amber)"
        strokeWidth="0.5"
        fill="none"
        strokeDasharray="1.4 1.2"
        strokeLinecap="round"
        opacity={0.7}
        initial={reduced ? false : { pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: reduced ? 0 : 0.9, delay: reduced ? 0 : 2.4, ease: EASE }}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}
