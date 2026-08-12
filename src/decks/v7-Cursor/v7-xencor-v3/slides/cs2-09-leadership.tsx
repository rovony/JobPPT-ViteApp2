// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 · Leadership — two independent conditions, both required.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const SCIENCE = [
  'Translate ICH E5 into PopPK · E-R · PBPK evidence',
  'Integrate intrinsic / extrinsic factors for the dossier',
  'Define Phase 4 PK/PD as the residual-uncertainty plan',
];

const PATHWAY = [
  { who: 'Regulatory affairs', what: 'Rule 101 pathway and agency responses' },
  { who: 'Medical / PV', what: 'Post-marketing follow-up' },
  { who: 'India affiliate', what: 'In-country execution with SEC and CDSCO' },
];

export default function CS2Leadership() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const delay = (d) => (reduced || !go ? 0 : d);

  return (
    <SlideGrid dataCase="2" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 02 · Leadership</Eyebrow>

      <Headline delay={0.18} maxChars={52}>
        Both conditions had to hold:{' '}
        <span style={{ color: 'var(--xc-case-accent)' }}>the science and the pathway</span>
      </Headline>

      <Subhead delay={0.28} maxChars={100} size="lead">
        Quantitative pharmacology answered whether global evidence could extrapolate. Partners answered whether the route could hold.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
            minHeight: 0,
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
              gap: 'clamp(var(--space-4), 2.5vw, var(--space-6))',
            }}
          >
            <motion.div
              style={{
                border: '1.5px solid var(--xc-case-accent)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--xc-case-accent)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--xc-case-accent) 10%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: delay(0.3) }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-cyan" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>
                Condition 1 · The science
              </div>
              <div className="deck-body xc-slide-subhead xc-muted" style={{ marginBottom: 'var(--space-1)' }}>
                Can the global evidence extrapolate?
              </div>
              {SCIENCE.map((item) => (
                <div
                  key={item}
                  className="deck-body xc-slide-subhead xc-ink"
                  style={{
                    lineHeight: 1.4,
                    paddingLeft: 'var(--space-3)',
                    borderLeft: '2px solid var(--xc-case-accent)',
                  }}
                >
                  {item}
                </div>
              ))}
            </motion.div>

            <motion.div
              style={{
                border: '1.5px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-md)',
                borderLeft: '4px solid var(--cream-faint)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: delay(0.42) }}
            >
              <div className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={{ letterSpacing: '0.1em', fontWeight: 700 }}>
                Condition 2 · The pathway
              </div>
              <div className="deck-body xc-slide-subhead xc-muted" style={{ marginBottom: 'var(--space-1)' }}>
                Can the regulatory route hold?
              </div>
              {PATHWAY.map((item) => (
                <div
                  key={item.who}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '2px',
                    paddingLeft: 'var(--space-3)',
                    borderLeft: '2px solid var(--cream-hairline)',
                  }}
                >
                  <span className="deck-mono xc-slide-eyebrow xc-muted" style={{ fontWeight: 600 }}>
                    {item.who}
                  </span>
                  <span className="deck-body xc-slide-subhead xc-ink" style={{ lineHeight: 1.4 }}>
                    {item.what}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            className="cs3-and-band"
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE, delay: delay(0.65) }}
          >
            <strong>AND — not OR</strong>
            <span>Either condition failing meant running the local study.</span>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.0}
        kicker="Case 02 · Leadership"
        tagline="Evidence bridge on one side; agency execution on the other."
      />
    </SlideGrid>
  );
}
