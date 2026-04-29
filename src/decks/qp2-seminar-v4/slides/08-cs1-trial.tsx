// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, Target, Wind, Dna } from 'lucide-react';
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
  { year: 2001, label: 'Bosentan',     kind: 'field', tone: 'var(--coral)', pin: '2rem' },     // ET
  { year: 2005, label: 'Sildenafil',   kind: 'field', tone: 'var(--violet)', pin: '7rem' },    // NO
  { year: 2007, label: 'Ambrisentan',  kind: 'amb',   tone: 'var(--coral)', sub: 'Jun 2007\nFDA', pin: '2rem' }, // ET
  { year: 2013, label: 'Macitentan',   kind: 'field', tone: 'var(--coral)', pin: '7rem' },     // ET
  { year: 2015, label: 'Selexipag',    kind: 'field', tone: 'var(--amber)', pin: '2rem' },     // PGI2
  { year: 2024, label: 'Sotatercept',  kind: 'field', tone: 'var(--sage)', pin: '7rem' },      // ACTIVIN
];

// Pediatric milestones
const PEDIATRIC = [
  // Field track (axis at 1rem)
  { year: 2009,    label: 'Bosentan\npeds',       sub: 'FUTURE-1', kind: 'precedent', tone: 'var(--coral)', track: 'field', pin: '2rem' },
  { year: 2011,    label: 'Sildenafil\nEMA peds', kind: 'field', tone: 'var(--violet)', track: 'field', pin: '9rem' },
  { year: 2017,    label: 'Bosentan\nFDA peds',   kind: 'field', tone: 'var(--coral)', track: 'field', pin: '2rem' },
  { year: 2023,    label: 'Sildenafil\nFDA peds', kind: 'field', tone: 'var(--violet)', track: 'field', pin: '9rem' },
  { year: 2024,    label: 'ICH E11A',             sub: 'codified', kind: 'codification', tone: 'var(--cream)', track: 'field', pin: '2rem' },

  // Ambrisentan Case track (axis at 9.5rem)
  { year: 2013.20, label: 'Ambrisentan\nHOLD',       sub: 'rat finding', kind: 'amb-hold', tone: 'var(--coral)', track: 'amb', pin: '15rem' },
  { year: 2019.12, label: 'Ambrisentan\nTERMINATED', sub: '', kind: 'amb-term', tone: 'var(--coral)', track: 'amb', pin: '15rem' },
  { year: 2021.25, label: 'Ambrisentan\nAPPROVED',   sub: 'EMA + PMDA', kind: 'amb-approved', tone: 'var(--case)', track: 'amb', pin: '15rem' },
];

const YEAR_MIN = 1999;
const YEAR_MAX = 2026; // Adjusted to spread the timeline better
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
  
  const isAdult = !entry.track;
  const isTop = isAdult; // All Adult items point UP. All Pediatric point DOWN.
  const axisY = '14rem';

  // Extract base label for layoutId matching
  const baseLabel = entry.label.split('\n')[0].split(' ')[0].toLowerCase();
  
  // Only apply layoutId to Adult track events to morph from History slide
  // Framer motion collapses duplicate layoutIds, so we strictly isolate this to the Adult track.
  const shouldMorph = isAdult; 
  const layoutId = shouldMorph && ['bosentan', 'sildenafil', 'macitentan', 'selexipag', 'sotatercept', 'ambrisentan'].includes(baseLabel) 
    ? `history-row-${baseLabel}` 
    : undefined;

  const pinLength = entry.pin || '1.2rem';
  const isShort = pinLength === '2rem';
  const zLayer = entry.kind.includes('amb') ? 20 : (isShort ? 10 : 1);

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pct}%`,
        top: axisY,
        transform: isTop ? 'translate(-50%, -100%)' : 'translate(-50%, 0)',
        zIndex: zLayer,
      }}
    >
      <motion.div
        layoutId={layoutId}
        layout
        initial={reduced ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE, layout: { duration: 1.2, ease: "easeInOut" } }}
        style={{
          display: 'flex',
          flexDirection: isTop ? 'column-reverse' : 'column',
          alignItems: 'center',
          gap: '6px',
        }}
      >
        {/* The Pin Line */}
        <div style={{
          width: '2px',
          height: pinLength,
          background: entry.tone,
          opacity: entry.kind === 'field' ? 0.3 : 0.8,
        }} />
        
        {/* The Dossier Tag */}
        <div style={{
          background: (entry.kind === 'amb-hold' || entry.kind === 'amb-term') 
            ? 'var(--panel)' 
            : (entry.kind === 'amb-approved' ? 'var(--case)' : `color-mix(in srgb, ${entry.tone} ${entry.kind === 'field' ? '10%' : '15%'}, var(--panel))`),
          border: entry.kind.includes('amb')
            ? `3px ${entry.kind.includes('hold') || entry.kind.includes('term') ? 'dashed' : 'solid'} var(--amber)`
            : `1.5px solid ${entry.kind === 'field' ? 'color-mix(in srgb, var(--cream-hairline) 50%, transparent)' : entry.tone}`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2) var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          boxShadow: entry.kind.includes('amb') ? '0 4px 16px rgba(0,0,0,0.2)' : 'none',
          minWidth: 'max-content',
          color: entry.kind === 'amb-approved' ? 'var(--bg)' : entry.tone,
        }}>
          <span className="deck-mono" style={{
            fontSize: 'var(--fs-slide-tagline)',
            fontWeight: 700,
            color: 'inherit',
            fontVariantNumeric: 'tabular-nums',
          }}>
            {entry.year === 2013.2 ? 'Mar 2013' : (entry.year === 2019.12 ? 'Feb 2019' : (entry.year === 2021.25 ? '2021' : Math.floor(entry.year)))}
          </span>
          <span 
            className="deck-display" 
            style={{
              fontSize: 'var(--fs-slide-subhead)',
              fontWeight: 600,
              color: 'inherit',
              marginTop: '4px',
              display: 'inline-block',
              textAlign: 'center',
            }}
          >
            {entry.label.split('\n').map((l, i) => <div key={i}>{l}</div>)}
          </span>
          {entry.sub && (
            <span className="deck-mono" style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'inherit',
              opacity: 0.8,
              marginTop: '4px',
              textAlign: 'center',
              display: 'inline-block',
            }}>
              {entry.sub.split('\n').map((l, i) => <div key={i}>{l}</div>)}
            </span>
          )}
        </div>
      </motion.div>
    </div>
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
        Adult landmarks moved faster; pediatric arms stalled. The 2009 FUTURE-1 framework (PK matching) made ambrisentan's 2021 approval possible.
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
            initial={{ opacity: 1, y: 0 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
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

            <div style={{ position: 'relative', zIndex: 1, height: '38rem' }}>
              {/* ADULT BG */}
              <div style={{ position: 'absolute', top: 0, height: '14rem', left: 0, right: 0, background: 'color-mix(in srgb, var(--cream-muted) 3%, transparent)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }} />
              {/* PEDIATRIC BG */}
              <div style={{ position: 'absolute', top: '14rem', bottom: 0, left: 0, right: 0, background: 'color-mix(in srgb, var(--cyan) 6%, transparent)', borderTop: '2px solid color-mix(in srgb, var(--cyan) 20%, transparent)', borderRadius: '0 0 var(--radius-md) var(--radius-md)' }} />

              <div className="deck-mono uppercase" style={{
                position: 'absolute', left: 'var(--space-4)', top: 'var(--space-2)',
                fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, opacity: 0.8,
              }}>
                Adult landmarks
              </div>
              <div className="deck-mono uppercase" style={{
                position: 'absolute', left: 'var(--space-4)', bottom: 'var(--space-2)',
                fontSize: 'var(--fs-slide-tagline)', color: 'var(--cyan)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700, opacity: 0.8,
              }}>
                Pediatric Pathway
              </div>

              {/* UNIFIED X-AXIS */}
              <div style={{
                position: 'absolute', left: 'var(--space-6)', right: 'var(--space-6)', top: '14rem',
                height: '2px', background: 'linear-gradient(90deg, transparent, var(--cream-muted) 20%, var(--cream-muted) 80%, transparent)', zIndex: 0,
              }} />
              
              <div style={{ position: 'absolute', left: 'var(--space-6)', right: 'var(--space-6)', top: '14rem', zIndex: 5 }}>
                {[2000, 2005, 2010, 2015, 2020, 2025].map((y) => (
                  <div key={y} style={{
                    position: 'absolute', left: `${yearToPct(y)}%`,
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                    transform: 'translate(-50%, -50%)',
                    background: 'var(--panel)', padding: '4px 8px', borderRadius: '4px'
                  }}>
                    <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.6 }}>{y}</span>
                  </div>
                ))}
              </div>

              {/* EVENTS CONTAINER (Z-Index 10 ensures they are strictly FORWARD of timeline axis) */}
              <div style={{ position: 'absolute', top: 0, left: 'var(--space-6)', right: 'var(--space-6)', bottom: 0, zIndex: 10 }}>
                <JourneyArc reduced={reduced} />
                {ADULT.map((e, i) => <SwimlaneEvent key={`a-${i}`} entry={e} delay={0.8 + i * 0.05} reduced={reduced} />)}
                {PEDIATRIC.map((e, i) => <SwimlaneEvent key={`p-${i}`} entry={e} delay={1.2 + i * 0.05} reduced={reduced} />)}
              </div>
            </div>
          </motion.div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            {/* Pathway Legend */}
            <motion.div
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.5, ease: EASE }}
              style={{
                display: 'flex', gap: 'var(--space-4)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-full)',
                width: 'max-content',
              }}
            >
              {[
                { label: 'PGI2', Icon: Activity, tone: 'var(--amber)' },
                { label: 'ET', Icon: Target, tone: 'var(--coral)' },
                { label: 'NO', Icon: Wind, tone: 'var(--violet)' },
                { label: 'ACTIVIN', Icon: Dna, tone: 'var(--sage)' },
              ].map(({ label, Icon, tone }, i) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <Icon size={14} color={tone} strokeWidth={2} />
                  <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-eyebrow)', color: tone, fontWeight: 700, letterSpacing: '0.05em' }}>{label}</span>
                </div>
              ))}
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
        top: 0,
        height: '100%',
        width: 'calc(100% - var(--space-6) * 2)',
        overflow: 'visible',
        pointerEvents: 'none',
      }}
    >
      {/* HOLD → TERMINATED (dashed coral) */}
      <motion.line
        x1={`${xHold}%`} y1="30.5rem"
        x2={`${xTerm}%`} y2="30.5rem"
        stroke="var(--case)"
        strokeWidth="3"
        strokeDasharray="6 6"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 1.8 }}
      />
      {/* Label for Journey Arc */}
      <motion.text
        x={`${(xHold + xTerm) / 2}%`} y="29.7rem"
        textAnchor="middle"
        fill="var(--case)"
        className="deck-mono uppercase"
        style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: '0.05em', fontWeight: 600 }}
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ delay: 1.9 }}
      >
        Program disruptions (Hold → Terminated)
      </motion.text>
      {/* TERMINATED → APPROVED (solid coral) */}
      <motion.line
        x1={`${xTerm}%`} y1="30.5rem"
        x2={`${xAppr}%`} y2="30.5rem"
        stroke="var(--case)"
        strokeWidth="3.5"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 2.0 }}
      />
    </svg>
  );
}
