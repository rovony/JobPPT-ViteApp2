// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const panelBase = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-4)',
  minWidth: 0,
  minHeight: 0,
};

const labelStyle = {
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.55,
};

const ROWS = [
  {
    label: 'Hierarchical / Power Priors',
    accent: false,
    body: 'Adult treatment effect becomes an informative prior on pediatric effect, borrowing weight calibrated to adult–pediatric similarity.',
    detail: 'DIA Bayesian Scientific Working Group formalized for pediatric extrapolation.',
  },
  {
    label: 'Propensity-Score-Matched Bayesian Borrowing',
    accent: false,
    body: 'Only the most clinically relevant adult subjects — matched on baseline severity, etiology, prior therapy — contribute to the prior.',
    detail: 'Addresses "adults aren\'t kids" objection directly.',
  },
  {
    label: 'Pharmacometrics-Enhanced Bayesian Borrowing (PEBB)',
    accent: true,
    body: 'Adult PK/PD model builds the prior, updated with pediatric data. DINAMO pediatric T2D trial precedent — FDA input on effective sample size and weight of informative prior.',
    detail: 'Closest to the architecture our case used, formalized.',
  },
];

export default function Cs1BackupB14Bayesian() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B14 · Future framework</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Bayesian borrowing makes the extrapolation argument{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          formal, not narrative.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        AMB112529 was descriptive by design — no statistical testing.
        A future program would benefit from prespecified Bayesian borrowing.
      </Subhead>

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
          {/* Three-row card stack */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {ROWS.map((row, i) => (
              <motion.div
                key={row.label}
                style={{
                  ...panelBase,
                  ...(row.accent
                    ? { borderLeft: '4px solid var(--case)' }
                    : {}),
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6 + i * 0.18, ease: EASE }}
              >
                <div className="deck-mono uppercase" style={labelStyle}>
                  {row.label}
                </div>
                <div className="deck-body" style={bodyStyle}>
                  {row.body}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: row.accent ? 'var(--case)' : 'var(--cream-faint)',
                    fontStyle: 'italic',
                    lineHeight: 1.5,
                    marginTop: 'var(--space-2)',
                  }}
                >
                  {row.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Callout note */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              borderLeft: '4px solid var(--case)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
              padding: 'var(--space-3) var(--space-4)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.25, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
              }}
            >
              The AMB112529 case is the{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                non-Bayesian version
              </span>{' '}
              of the same extrapolation argument. PEBB would make the borrowing{' '}
              <span style={{ color: 'var(--case)', fontWeight: 600 }}>
                explicit and quantifiable
              </span>.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B14 · CS1 · BAYESIAN BORROWING"
        source="Source · DIA Bayesian Working Group · DINAMO trial (FDA guidance on PEBB)"
      />
    </SlideGrid>
  );
}
