// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const APPROVALS = [
  { year: '1995', drug: 'Epoprostenol',  endpoint: '6MWD',       composite: false },
  { year: '2001', drug: 'Bosentan',      endpoint: '6MWD',       composite: false },
  { year: '2002', drug: 'Treprostinil IV', endpoint: '6MWD',     composite: false },
  { year: '2003', drug: 'Tadalafil',     endpoint: '6MWD',       composite: false },
  { year: '2004', drug: 'Iloprost',      endpoint: 'Composite',  composite: true, note: 'first' },
  { year: '2005', drug: 'Sildenafil',    endpoint: '6MWD',       composite: false },
  { year: '2007', drug: 'Ambrisentan',   endpoint: '6MWD',       composite: false, highlight: true },
  { year: '2013', drug: 'Macitentan',    endpoint: 'Composite',  composite: true, note: 'SERAPHIN' },
  { year: '2013', drug: 'Riociguat',     endpoint: '6MWD',       composite: false, note: 'PATENT-1' },
  { year: '2015', drug: 'Selexipag',     endpoint: 'Composite',  composite: true, note: 'GRIPHON' },
  { year: '2024', drug: 'Sotatercept',   endpoint: '6MWD',       composite: false, note: 'STELLAR' },
];

const cellBase = {
  padding: 'var(--space-2) var(--space-3)',
  fontSize: 'var(--fs-slide-subhead)',
  lineHeight: 1.5,
  borderBottom: '1px solid var(--cream-hairline)',
  minWidth: 0,
};

export default function Cs1BackupB10EndpointHistory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B10 · Endpoint evolution</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        From 6MWD primaries to composites{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — the field shifted in 2013.
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
          {/* Table */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              overflow: 'hidden',
              flex: '1 1 auto',
              minHeight: 0,
              overflowY: 'auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'clamp(4rem, 10vw, 6rem) 1fr 1fr',
                borderBottom: '2px solid var(--cream-hairline)',
                position: 'sticky',
                top: 0,
                zIndex: 1,
                background: 'color-mix(in srgb, var(--panel) 85%, transparent)',
              }}
            >
              {['Year', 'Drug', 'Primary endpoint'].map((h) => (
                <div
                  key={h}
                  className="deck-mono uppercase"
                  style={{
                    ...cellBase,
                    fontSize: 'var(--fs-slide-eyebrow)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--case)',
                    fontWeight: 700,
                    borderBottom: 'none',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {APPROVALS.map((row, i) => {
              const isHighlight = row.highlight;
              const rowBg = isHighlight
                ? 'color-mix(in srgb, var(--case) 12%, transparent)'
                : 'transparent';
              return (
                <motion.div
                  key={`${row.year}-${row.drug}`}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'clamp(4rem, 10vw, 6rem) 1fr 1fr',
                    background: rowBg,
                  }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={inView ? { opacity: 1 } : undefined}
                  transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 0.7 + i * 0.04, ease: EASE }}
                >
                  <div
                    className="deck-mono"
                    style={{
                      ...cellBase,
                      fontVariantNumeric: 'tabular-nums',
                      fontWeight: 600,
                      color: isHighlight ? 'var(--case)' : 'var(--cream)',
                    }}
                  >
                    {row.year}
                  </div>
                  <div
                    className="deck-body"
                    style={{
                      ...cellBase,
                      fontWeight: isHighlight ? 700 : 500,
                      color: isHighlight ? 'var(--case)' : 'var(--cream)',
                    }}
                  >
                    {row.drug}
                    {isHighlight && (
                      <span
                        className="deck-mono uppercase"
                        style={{
                          marginLeft: 'var(--space-2)',
                          fontSize: 'var(--fs-slide-pageno)',
                          letterSpacing: 'var(--ls-mono-wide)',
                          color: 'var(--case)',
                          fontWeight: 700,
                          background: 'color-mix(in srgb, var(--case) 18%, transparent)',
                          padding: '0.1em 0.5em',
                          borderRadius: '0.25em',
                        }}
                      >
                        This case
                      </span>
                    )}
                  </div>
                  <div
                    className="deck-body"
                    style={{
                      ...cellBase,
                      fontWeight: row.composite ? 600 : 400,
                      color: row.composite ? 'var(--cream)' : 'var(--cream-muted)',
                    }}
                  >
                    {row.composite && <span style={{ color: 'var(--case)' }}>● </span>}
                    {row.endpoint}
                    {row.note && (
                      <span style={{ color: 'var(--cream-faint)', marginLeft: 'var(--space-2)' }}>
                        ({row.note})
                      </span>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>

          {/* Annotation strip */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--case)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              padding: 'var(--space-3) var(--space-4)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.2, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
              }}
            >
              The 2013 shift was driven by{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                Gabler et al. (Circulation 2012)
              </span>{' '}
              meta-analysis showing 6MWD alone was insufficient as a surrogate for
              clinical outcomes. Pediatric programs cannot practically use composite
              endpoints (too few events, too long to accrue){' '}
              <span style={{ color: 'var(--case)', fontWeight: 600 }}>
                → exposure-matching becomes the practical anchor
              </span>{' '}
              for extrapolation.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B10 · CS1 · ENDPOINT HISTORY"
        source="Source · Gabler et al. Circulation 2012 · FDA approval history"
      />
    </SlideGrid>
  );
}
