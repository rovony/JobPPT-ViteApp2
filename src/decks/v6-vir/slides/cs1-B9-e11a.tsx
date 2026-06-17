// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const CONTINUUM = [
  {
    level: 'HIGH',
    color: 'var(--case)',
    desc: 'Exposure matching alone may suffice',
    opacity: 1.0,
  },
  {
    level: 'PARTIAL',
    color: 'var(--amber)',
    desc: 'Exposure matching + limited efficacy / PD',
    opacity: 0.85,
  },
  {
    level: 'LIMITED',
    color: 'var(--cream-faint)',
    desc: 'Full pediatric trial may be required',
    opacity: 0.7,
  },
];

const TIMELINE = [
  { year: '2000', label: 'ICH E11' },
  { year: '2017', label: 'E11(R1)' },
  { year: 'Dec 2024', label: 'E11A Step 4' },
];

export default function Cs1BackupB9E11a() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B9 · Regulatory framework</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        The case prefigured ICH E11A —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          exposure matching codified.
        </span>
      </Headline>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            padding: 'var(--space-3) 0',
            minWidth: 0,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          {/* Similarity continuum — three columns */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.5, ease: EASE }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
              gap: 'var(--space-3)',
            }}
          >
            {CONTINUUM.map((c, i) => (
              <motion.div
                key={c.level}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduced ? 0 : 0.45,
                  delay: reduced ? 0 : 0.6 + i * 0.12,
                  ease: EASE,
                }}
                style={{
                  padding: 'var(--space-4) var(--space-5)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                  border: `1px solid ${i === 0 ? 'color-mix(in srgb, var(--case) 45%, transparent)' : 'var(--cream-hairline)'}`,
                  borderRadius: 'var(--radius-lg)',
                  position: 'relative',
                  minWidth: 0,
                  opacity: c.opacity,
                }}
              >
                <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: c.color, borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)' }} />

                <div
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    color: c.color,
                    letterSpacing: 'var(--ls-mono-wide)',
                    textTransform: 'uppercase',
                    fontWeight: 700,
                    marginBottom: 'var(--space-2)',
                  }}
                >
                  {c.level} similarity
                </div>

                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.5,
                  }}
                >
                  {c.desc}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* Where ambrisentan sits */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.05, ease: EASE }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--case) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--case)',
                letterSpacing: 'var(--ls-mono-wide)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 'var(--space-2)',
              }}
            >
              Where ambrisentan sits
            </div>
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                lineHeight: 1.5,
              }}
            >
              <strong style={{ color: 'var(--case)' }}>HIGH</strong> for
              disease similarity, pharmacology similarity, and response
              similarity — exposure matching was defensible as the primary
              pediatric evidence.
            </div>
          </motion.div>

          {/* Regulatory timeline */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.3, ease: EASE }}
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              alignItems: 'center',
              gap: 'var(--space-4)',
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
            }}
          >
            {TIMELINE.map((t, i) => (
              <React.Fragment key={t.year}>
                {i > 0 && (
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: 'var(--cream-faint)',
                    }}
                  >
                    →
                  </span>
                )}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}>
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-subhead)',
                      color: i === TIMELINE.length - 1 ? 'var(--case)' : 'var(--cream)',
                      fontWeight: i === TIMELINE.length - 1 ? 700 : 500,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {t.year}
                  </span>
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream-muted)',
                      letterSpacing: 'var(--ls-mono)',
                    }}
                  >
                    {t.label}
                  </span>
                </div>
              </React.Fragment>
            ))}
          </motion.div>

          {/* Key insight */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.6, ease: EASE }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.82,
              lineHeight: 1.5,
              textAlign: 'center',
            }}
          >
            The ambrisentan case prefigured E11A.{' '}
            <span style={{ color: 'var(--case)', fontWeight: 600 }}>
              Framework applied 2010–2021; codified 2024.
            </span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="B9 · CS1 · ICH E11A"
        source="Source · ICH E11A Step 4, December 2024"
      />
    </SlideGrid>
  );
}
