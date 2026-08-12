// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const panelBase = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-4) var(--space-4)',
  minWidth: 0,
  minHeight: 0,
  display: 'flex',
  flexDirection: 'column',
  gap: 'var(--space-3)',
};

const labelStyle = {
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  marginBottom: 'var(--space-1)',
};

const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.55,
};

const BANDS = [
  {
    label: 'Ages 0–6 · Waiver granted',
    decision: 'PDCO 2010',
    accent: false,
    reasons: [
      {
        head: 'Endpoint feasibility',
        body: '6MWD / WHO FC not reliably measurable below age 6–7.',
      },
      {
        head: 'Disease paradigm',
        body: 'Sub-6 PAH includes PPHN, uncorrected CHD, developmental lung disease — adult ERA pharmacology generalizes less cleanly.',
      },
    ],
    coda: 'Waiver predates the juvenile rat finding by 3 years.',
  },
  {
    label: 'Ages 6–<8 · Deferred',
    decision: 'not waived',
    accent: false,
    reasons: [
      {
        head: 'Regulatory commitment',
        body: 'Study required after 8–<18 program completes.',
      },
      {
        head: 'Practical execution unlikely',
        body: 'Post-2013 juvenile rat finding — at-risk window 0–3 but safety margin uncomfortable for expansion.',
      },
    ],
    coda: 'Deferral technically still on books.',
  },
  {
    label: 'Ages 8–<18 · Studied',
    decision: 'AMB112529',
    accent: true,
    reasons: [
      {
        head: '41 enrolled, 39 PK-evaluable',
        body: 'EMA pediatric label April 2021.',
      },
      {
        head: 'PMDA March 23, 2021',
        body: 'Japanese pediatric approval followed EMA.',
      },
    ],
    coda: 'This is what was studied, approved, and presented.',
  },
];

export default function Cs1BackupB13PipArchitecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B13 · PIP architecture</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Three age bands, three regulatory decisions{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — waiver, deferral, study.
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
          {/* Three-column cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {BANDS.map((band, i) => (
              <motion.div
                key={band.label}
                style={{
                  ...panelBase,
                  ...(band.accent
                    ? { borderLeft: '4px solid var(--case)' }
                    : { borderColor: 'var(--cream-faint)' }),
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 + i * 0.15, ease: EASE }}
              >
                <div>
                  <div className="deck-mono uppercase" style={labelStyle}>
                    {band.label}
                  </div>
                  <div
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream-faint)',
                      letterSpacing: 'var(--ls-mono-wide)',
                    }}
                  >
                    {band.decision}
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {band.reasons.map((r) => (
                    <div key={r.head}>
                      <div
                        className="deck-body"
                        style={{
                          fontSize: 'var(--fs-slide-subhead)',
                          color: 'var(--cream)',
                          fontWeight: 600,
                          lineHeight: 1.45,
                        }}
                      >
                        {r.head}
                      </div>
                      <div className="deck-body" style={bodyStyle}>
                        {r.body}
                      </div>
                    </div>
                  ))}
                </div>

                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: band.accent ? 'var(--case)' : 'var(--cream-faint)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    marginTop: 'auto',
                    paddingTop: 'var(--space-2)',
                    borderTop: '1px solid var(--cream-hairline)',
                  }}
                >
                  "{band.coda}"
                </div>
              </motion.div>
            ))}
          </div>

          {/* Key note */}
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
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.15, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
              }}
            >
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                20 kg weight floor
              </span>{' '}
              excluded most children under 8 regardless of age eligibility.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B13 · CS1 · PIP ARCHITECTURE"
        source="Source · EMEA-000434-PIP01-08-M05 · EMA PDCO 2010"
      />
    </SlideGrid>
  );
}
