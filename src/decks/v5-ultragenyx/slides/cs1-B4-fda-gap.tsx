// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
};

const GSK_STEPS = [
  { year: '2008', text: 'EMA approves Volibris (adult)' },
  { year: '2010', text: 'EMA PIP agreed · EMEA-000434' },
  { year: '2011', text: 'AMB112529 first patient enrolled' },
  { year: '2021', text: 'EMA pediatric approval (Volibris)' },
  { year: '2021', text: 'PMDA pediatric approval (Japan)' },
];

const GILEAD_STEPS = [
  { year: '2007', text: 'FDA approves Letairis (adult)' },
  { year: '2022', text: 'Letairis goes generic (US)' },
  { year: '—',    text: 'No pediatric sNDA filed to FDA' },
  { year: '—',    text: 'No PREA / PSP requirement triggered' },
];

const stepMono = {
  fontSize: 'var(--fs-slide-pageno)',
  color: 'var(--cream-faint)',
  letterSpacing: 'var(--ls-mono)',
  fontVariantNumeric: 'tabular-nums',
  whiteSpace: 'nowrap',
  flexShrink: 0,
};

const stepBody = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  lineHeight: 1.5,
  minWidth: 0,
};

export default function Cs1BackupFdaGap() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B4 · FDA gap</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        FDA never received the package{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — a commercial structure, not a scientific rejection.
        </span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* Two-track layout */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {/* GSK / Volibris path */}
            <motion.div
              style={{ ...panelStyle, borderLeft: '4px solid var(--case)' }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-3)',
                }}
              >
                GSK / Volibris → EMA + PMDA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {GSK_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                    <span className="deck-mono" style={stepMono}>{s.year}</span>
                    <span className="deck-body" style={stepBody}>{s.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Gilead / Letairis path */}
            <motion.div
              style={{ ...panelStyle, borderLeft: '4px solid var(--cream-faint)' }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85, ease: EASE }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-faint)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-3)',
                }}
              >
                Gilead / Letairis → FDA
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                {GILEAD_STEPS.map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 'var(--space-3)', alignItems: 'baseline' }}>
                    <span className="deck-mono" style={stepMono}>{s.year}</span>
                    <span className="deck-body" style={{ ...stepBody, color: s.year === '—' ? 'var(--cream-muted)' : 'var(--cream)' }}>{s.text}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Quote box */}
          <motion.div
            style={{
              ...panelStyle,
              borderLeft: '4px solid var(--case)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.1, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                lineHeight: 1.6,
                fontStyle: 'italic',
              }}
            >
              FDA label states:{' '}
              <span style={{ fontWeight: 600, color: 'var(--case)', fontStyle: 'normal' }}>
                "Safety and effectiveness in pediatric patients have not been established"
              </span>{' '}
              — never evaluated, not rejected.
            </div>
          </motion.div>

          {/* Comparator note */}
          <motion.div
            style={{
              display: 'flex',
              gap: 'var(--space-3)',
              alignItems: 'baseline',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.3, ease: EASE }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-faint)',
                letterSpacing: 'var(--ls-mono-wide)',
                flexShrink: 0,
              }}
            >
              Comparator
            </span>
            <span
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
                minWidth: 0,
              }}
            >
              Bosentan (Tracleer) took 8 years from EMA to FDA pediatric approval — structural lag is the norm, not the exception.
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B4 · CS1 · FDA GAP"
        source="Source · FDA Letairis label (verified 2024) · Tracleer timeline comparison"
      />
    </SlideGrid>
  );
}
