// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS1 · Slide 08 — Pediatric program timeline (live-flow reduction).
 * One lane: precedent → hold → terminated → approved → E11A codification.
 */

const MILESTONES = [
  { year: 2009, label: 'FUTURE-1', sub: 'PK-matching precedent', kind: 'precedent', tone: 'var(--cream-muted)' },
  { year: 2013.2, label: 'HOLD', sub: 'rat finding', kind: 'amb-hold', tone: 'var(--coral)' },
  { year: 2019.12, label: 'TERMINATED', sub: '41 / 66 enrolled', kind: 'amb-term', tone: 'var(--coral)' },
  { year: 2021.25, label: 'APPROVED', sub: 'EMA + PMDA', kind: 'amb-approved', tone: 'var(--case)' },
  { year: 2024, label: 'ICH E11A', sub: 'codified', kind: 'codification', tone: 'var(--amber)' },
];

const YEAR_MIN = 2008;
const YEAR_MAX = 2025;
const yearToPct = (y) => Math.max(0, Math.min(100, ((y - YEAR_MIN) / (YEAR_MAX - YEAR_MIN)) * 100));

function yearLabel(year) {
  if (year === 2013.2) return '2013';
  if (year === 2019.12) return '2019';
  if (year === 2021.25) return '2021';
  return String(Math.floor(year));
}

function TimelineEvent({ entry, delay, reduced }) {
  const pct = yearToPct(entry.year);
  const isAmb = entry.kind.includes('amb');
  const isApproved = entry.kind === 'amb-approved';

  return (
    <div
      style={{
        position: 'absolute',
        left: `${pct}%`,
        top: '50%',
        transform: 'translate(-50%, 0)',
        zIndex: isAmb ? 20 : 10,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '6px',
      }}
    >
      <motion.div
        initial={reduced ? false : { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
        style={{
          width: '2px',
          height: '2.5rem',
          background: entry.tone,
          opacity: isAmb ? 0.9 : 0.45,
        }}
      />
      <div
        style={{
          background: entry.kind === 'amb-hold' || entry.kind === 'amb-term'
            ? 'var(--panel)'
            : isApproved
              ? 'var(--case)'
              : `color-mix(in srgb, ${entry.tone} 12%, var(--panel))`,
          border: isAmb
            ? `3px ${entry.kind.includes('hold') || entry.kind.includes('term') ? 'dashed' : 'solid'} var(--amber)`
            : `1.5px solid ${entry.tone}`,
          borderRadius: 'var(--radius-md)',
          padding: 'var(--space-2) var(--space-3)',
          textAlign: 'center',
          minWidth: 'max-content',
          color: isApproved ? 'var(--bg)' : entry.tone,
          boxShadow: isAmb ? '0 4px 16px rgba(0,0,0,0.18)' : 'none',
        }}
      >
        <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-tagline)', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>
          {yearLabel(entry.year)}
        </span>
        <div className="deck-display" style={{ fontSize: 'var(--fs-slide-subhead)', fontWeight: 600, marginTop: '4px' }}>
          {entry.label}
        </div>
        {entry.sub && (
          <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-tagline)', opacity: 0.85, marginTop: '4px' }}>
            {entry.sub}
          </div>
        )}
      </div>
    </div>
  );
}

function JourneyArc({ reduced }) {
  const xHold = yearToPct(2013.2);
  const xTerm = yearToPct(2019.12);
  const xAppr = yearToPct(2021.25);

  return (
    <svg
      aria-hidden
      style={{
        position: 'absolute',
        left: 'var(--space-6)',
        right: 'var(--space-6)',
        top: '50%',
        height: '4px',
        width: 'calc(100% - var(--space-6) * 2)',
        overflow: 'visible',
        pointerEvents: 'none',
        transform: 'translateY(-50%)',
      }}
    >
      <motion.line
        x1={`${xHold}%`} y1="2"
        x2={`${xTerm}%`} y2="2"
        stroke="var(--case)"
        strokeWidth="3"
        strokeDasharray="6 6"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.65 }}
        transition={{ delay: 1.4 }}
      />
      <motion.line
        x1={`${xTerm}%`} y1="2"
        x2={`${xAppr}%`} y2="2"
        stroke="var(--case)"
        strokeWidth="3.5"
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 0.9 }}
        transition={{ delay: 1.55 }}
      />
    </svg>
  );
}

export default function Cs1Trial() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Pediatric program arc</Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        Pediatric PAH moves slowly —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 600 }}>
          held, terminated, then approved.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108} size="lead">
        FUTURE-1 set the PK-matching precedent in 2009. Ambrisentan&rsquo;s arc: eight years, three disruptions, EMA + PMDA in 2021 — ICH E11A codified the logic in 2024.
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
          <motion.div
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            style={{
              background: 'color-mix(in srgb, var(--panel) 40%, transparent)',
              backdropFilter: 'blur(12px)',
              WebkitBackdropFilter: 'blur(12px)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              padding: 'var(--space-6) 0',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.12)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute',
              right: '-4%',
              top: '50%',
              transform: 'translateY(-50%)',
              opacity: 0.1,
              pointerEvents: 'none',
              width: 'clamp(280px, 26vw, 420px)',
            }}>
              <Lungs layoutId="cs1-lung" variant="trachea-axis" rotation={90} widthOverride="400px" />
            </div>

            <div style={{ position: 'relative', zIndex: 1, height: 'clamp(14rem, 28vh, 18rem)', margin: '0 var(--space-6)' }}>
              <div style={{
                position: 'absolute',
                left: 0,
                right: 0,
                top: '50%',
                height: '2px',
                background: 'linear-gradient(90deg, transparent, var(--cream-muted) 15%, var(--cream-muted) 85%, transparent)',
                transform: 'translateY(-50%)',
              }} />

              <div style={{ position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)' }}>
                {[2010, 2015, 2020, 2025].map((y) => (
                  <div
                    key={y}
                    style={{
                      position: 'absolute',
                      left: `${yearToPct(y)}%`,
                      transform: 'translate(-50%, -140%)',
                    }}
                  >
                    <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', opacity: 0.55 }}>
                      {y}
                    </span>
                  </div>
                ))}
              </div>

              <JourneyArc reduced={reduced} />
              {MILESTONES.map((e, i) => (
                <TimelineEvent key={e.label} entry={e} delay={0.7 + i * 0.08} reduced={reduced} />
              ))}
            </div>
          </motion.div>

          <motion.p
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : 1.6, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              margin: 0,
              maxWidth: '52rem',
              lineHeight: 1.5,
            }}
          >
            <strong style={{ color: 'var(--case)' }}>Dashed arc:</strong> program hold → termination.
            {' '}<strong style={{ color: 'var(--case)' }}>Solid arc:</strong> exposure bridge → EMA + PMDA approval.
          </motion.p>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="08 · CS1 · TIMELINE"
        source="Sources · Beghetti BJCP 2009 · Ivy J Pediatr X 2020 · Okour J Clin Pharmacol 2023 · ICH E11A Step 4 (Dec 2024)"
      />
    </SlideGrid>
  );
}
