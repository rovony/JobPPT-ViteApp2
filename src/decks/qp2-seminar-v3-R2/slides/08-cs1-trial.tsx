// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · Slide 08 — Field-level context · ambrisentan adult & pediatric
 *
 * Redesigned as a Premium Swimlane Dossier to eliminate vertical empty voids
 * and create a structured, high-density timeline visualization.
 */

// Adult PAH approvals
const ADULT = [
  { year: 2001, label: 'Bosentan',     kind: 'field' },
  { year: 2005, label: 'Sildenafil',   kind: 'field' },
  { year: 2007, label: 'Ambrisentan',  kind: 'amb', sub: 'Jun 2007 FDA' },
  { year: 2013, label: 'Macitentan',   kind: 'field' },
  { year: 2015, label: 'Selexipag',    kind: 'field' },
  { year: 2024, label: 'Sotatercept',  kind: 'field' },
];

// Pediatric milestones
const PEDIATRIC = [
  { year: 2009,    label: 'Bosentan peds',        sub: 'FUTURE-1', kind: 'precedent' },
  { year: 2011,    label: 'Sildenafil EMA peds',  kind: 'field' },
  { year: 2013.20, label: 'AMB HOLD',             sub: 'Mar 2013 · rat finding', kind: 'amb-hold' },
  { year: 2017,    label: 'Bosentan FDA peds',    kind: 'field' },
  { year: 2019.12, label: 'AMB TERMINATED',       sub: 'Feb 2019', kind: 'amb-term' },
  { year: 2021.25, label: 'AMB APPROVED',         sub: 'EMA + PMDA', kind: 'amb-approved' },
  { year: 2023,    label: 'Sildenafil FDA peds',  kind: 'field' },
  { year: 2024,    label: 'ICH E11A',             sub: 'codified', kind: 'codification' },
];

const YEAR_MIN = 2000;
const YEAR_MAX = 2025; // Adjusted to spread the timeline better
const yearToPct = (y) => Math.max(0, Math.min(100, ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100));

// Styling configuration for each event type
const KIND = {
  field:        { bg: 'color-mix(in srgb, var(--cream-muted) 10%, transparent)', border: 'var(--cream-hairline)', color: 'var(--cream-muted)' },
  precedent:    { bg: 'color-mix(in srgb, var(--case) 15%, transparent)',        border: 'var(--case)',           color: 'var(--case)' },
  codification: { bg: 'color-mix(in srgb, var(--amber) 15%, transparent)',       border: 'var(--amber)',          color: 'var(--amber)' },
  amb:          { bg: 'var(--case)',                                             border: 'var(--case)',           color: 'var(--bg)' },
  'amb-hold':   { bg: 'var(--case)',                                             border: 'var(--case)',           color: 'var(--bg)' },
  'amb-term':   { bg: 'var(--case)',                                             border: 'var(--case)',           color: 'var(--bg)' },
  'amb-approved': { bg: 'var(--amber)',                                          border: 'var(--amber)',          color: 'var(--bg)' },
};

function SwimlaneEvent({ entry, delay, reduced }) {
  const pct = yearToPct(entry.year);
  const cfg = KIND[entry.kind] || KIND.field;
  
  // Stagger overlapping events by adjusting their vertical alignment inside the flex container
  const isHold = entry.kind === 'amb-hold';
  const isPrecedent = entry.kind === 'precedent';
  const isApproved = entry.kind === 'amb-approved';

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'absolute',
        left: `${pct}%`,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '4px',
        zIndex: entry.kind.includes('amb') ? 10 : 1,
        // Push hold slightly down, precedent slightly up if needed for visual rhythm
        marginTop: isHold ? '2rem' : (isApproved ? '-1rem' : '0'),
      }}
    >
      {/* The Pin Line */}
      <div style={{
        width: '2px',
        height: '1rem',
        background: cfg.border,
        opacity: entry.kind === 'field' ? 0.3 : 0.8,
      }} />
      
      {/* The Dossier Tag */}
      <div style={{
        background: cfg.bg,
        border: `1px solid ${cfg.border}`,
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-1) var(--space-2)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        boxShadow: entry.kind.includes('amb') ? '0 4px 12px rgba(0,0,0,0.15)' : 'none',
        minWidth: 'max-content',
      }}>
        <span className="deck-mono" style={{
          fontSize: 'calc(var(--fs-slide-pageno) * 0.85)',
          fontWeight: 700,
          color: cfg.color,
          fontVariantNumeric: 'tabular-nums',
        }}>
          {entry.year === 2013.2 ? 'Mar 2013' : (entry.year === 2019.12 ? 'Feb 2019' : (entry.year === 2021.25 ? '2021' : Math.floor(entry.year)))}
        </span>
        <span className="deck-display" style={{
          fontSize: 'var(--fs-slide-pageno)',
          fontWeight: 600,
          color: cfg.color,
          marginTop: '2px',
        }}>
          {entry.label}
        </span>
        {entry.sub && (
          <span className="deck-mono" style={{
            fontSize: 'calc(var(--fs-slide-pageno) * 0.75)',
            color: cfg.color,
            opacity: 0.8,
            marginTop: '2px',
          }}>
            {entry.sub}
          </span>
        )}
      </div>
    </motion.div>
  );
}

export default function Cs1Trial() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · The field-level context</Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH moves slowly —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          and ambrisentan&rsquo;s pediatric path took eight years.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        Adult approvals moved quickly; pediatric arms stalled. The 2009 FUTURE-1 framework (PK matching) made ambrisentan's 2021 approval possible.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: 'var(--space-5)',
        }}>
          {/* SWIMLANE DOSSIER */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE, delay: 0.6 }}
            style={{
              background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-4) 0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Background Lung Watermark inside the Dossier */}
            <div style={{
              position: 'absolute',
              right: '-10%',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.15,
              pointerEvents: 'none',
              zIndex: 0,
            }}>
              <Lungs layoutId="cs1-lung" variant="trachea-axis" rotation={90} widthOverride="600px" />
            </div>

            <div style={{ position: 'relative', zIndex: 1 }}>
              {/* ADULT SWIMLANE */}
              <div style={{ position: 'relative', height: '6rem', padding: '0 var(--space-6)' }}>
                <div className="deck-mono uppercase" style={{
                  position: 'absolute', left: 'var(--space-4)', top: 0,
                  fontSize: 'calc(var(--fs-slide-pageno) * 0.9)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  fontWeight: 700,
                  opacity: 0.8,
                }}>
                  Adult Pathway
                </div>
                {/* Horizontal Lane Guide */}
                <div style={{
                  position: 'absolute', left: 'var(--space-6)', right: 'var(--space-6)', top: '1rem',
                  height: '1px', background: 'var(--cream-hairline)',
                }} />
                
                {ADULT.map((e, i) => (
                  <SwimlaneEvent key={`a-${i}`} entry={e} delay={0.8 + i * 0.05} reduced={reduced} />
                ))}
              </div>

              {/* PEDIATRIC SWIMLANE */}
              <div style={{ 
                position: 'relative', 
                height: '9rem', 
                padding: '0 var(--space-6)',
                background: 'color-mix(in srgb, var(--case) 3%, transparent)',
                borderTop: '1px solid color-mix(in srgb, var(--case) 15%, transparent)',
                borderBottom: '1px solid color-mix(in srgb, var(--case) 15%, transparent)',
                marginTop: 'var(--space-2)',
              }}>
                <div className="deck-mono uppercase" style={{
                  position: 'absolute', left: 'var(--space-4)', top: 'var(--space-2)',
                  fontSize: 'calc(var(--fs-slide-pageno) * 0.9)',
                  color: 'var(--case)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  fontWeight: 700,
                }}>
                  Pediatric Pathway
                </div>
                {/* Horizontal Lane Guide */}
                <div style={{
                  position: 'absolute', left: 'var(--space-6)', right: 'var(--space-6)', top: '1.5rem',
                  height: '1px', background: 'color-mix(in srgb, var(--case) 20%, transparent)',
                }} />

                {/* The Journey Arc SVG */}
                <JourneyArc reduced={reduced} />

                {PEDIATRIC.map((e, i) => (
                  <SwimlaneEvent key={`p-${i}`} entry={e} delay={1.2 + i * 0.05} reduced={reduced} />
                ))}
              </div>

              {/* X-AXIS */}
              <div style={{
                position: 'relative',
                height: '2rem',
                marginTop: 'var(--space-4)',
                padding: '0 var(--space-6)',
              }}>
                <div style={{
                  height: '2px',
                  background: 'linear-gradient(90deg, transparent, var(--cream-muted) 10%, var(--cream-muted) 90%, transparent)',
                  width: '100%',
                }} />
                {[2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
                  <div key={y} style={{
                    position: 'absolute',
                    left: `${yearToPct(y)}%`,
                    marginLeft: 'var(--space-6)',
                    top: '2px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    transform: 'translateX(-50%)',
                  }}>
                    <div style={{ width: '2px', height: '6px', background: 'var(--cream-muted)' }} />
                    <span className="deck-mono" style={{
                      fontSize: 'calc(var(--fs-slide-pageno) * 0.9)',
                      color: 'var(--cream)',
                      opacity: 0.6,
                      marginTop: '4px',
                    }}>{y}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Bottom Annotation Fact */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 2.0, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.9,
              borderLeft: '3px solid var(--case)',
              paddingLeft: 'var(--space-3)',
              alignSelf: 'center',
            }}
          >
            <strong style={{ color: 'var(--case)' }}>2009 FUTURE-1 (bosentan)</strong> set the framework: PK matching as the regulatory bridge.
            {' '}Ambrisentan applied it under three simultaneous program disruptions.
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.2}
        kicker="08 · CS1 · TIMELINE"
        source="Sources · FDA / EMA approval records · Beghetti BJCP 2009 · Ivy J Pediatr X 2020 · Okour J Clin Pharmacol 2023 · ICH E11A Step 4 (Dec 2024)"
      />
    </SlideGrid>
  );
}

function JourneyArc({ reduced }) {
  const xHold = yearToPct(2013.20);
  const xTerm = yearToPct(2019.12);
  const xAppr = yearToPct(2021.25);

  return (
    <svg
      aria-hidden
      style={{
        position: 'absolute',
        left: 'var(--space-6)',
        right: 'var(--space-6)',
        top: '1.5rem',
        height: '100%',
        width: 'calc(100% - var(--space-6) * 2)',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {/* HOLD → TERMINATED (dashed coral) */}
      <motion.line
        x1={`${xHold}%`} y1="2rem"
        x2={`${xTerm}%`} y2="0"
        stroke="var(--case)"
        strokeWidth="2"
        strokeDasharray="4 4"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.8 }}
      />
      {/* TERMINATED → APPROVED (solid amber) */}
      <motion.line
        x1={`${xTerm}%`} y1="0"
        x2={`${xAppr}%`} y2="-1rem"
        stroke="var(--amber)"
        strokeWidth="2"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 2.0 }}
      />
    </svg>
  );
}
