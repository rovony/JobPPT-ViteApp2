// @ts-nocheck
/**
 * TEMPLATE: Backup Slide (dense panel-based Q&A defense)
 *
 * USE FOR: Backup / appendix slides shown only when asked.
 * Denser than main slides — more text, more detail, same design language.
 * Examples: model diagnostics, covariate tables, study timelines, DDI details.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update sections array with your content panels
 * 3. Main content goes in auto-reflow grid (top)
 * 4. Summary callout goes at bottom with accent rail
 * 5. Backup slides use "B{NN}" numbering in kicker and manifest
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const SECTIONS = [
  {
    kicker: 'First Section · Detail',
    items: [
      { label: 'Parameter', value: 'CL = 2.36 L/h (RSE 4.2%)' },
      { label: 'Covariate', value: 'Body weight on CL and V (allometric, fixed)' },
      { label: 'Observation', value: 'N = 3,126 PK observations from 380 subjects' },
    ],
    accent: false,
  },
  {
    kicker: 'Second Section · Detail',
    items: [
      { label: 'Method', value: 'Bootstrap (n = 1,000 replicates), pcVPC' },
      { label: 'Result', value: '95% of observations within prediction interval' },
      { label: 'Conclusion', value: 'Model adequate for simulation and dose selection' },
    ],
    accent: false,
  },
];

const SUMMARY = {
  kicker: 'Bottom Line',
  text: 'The model passes qualification. Allometric scaling is mechanistic, not estimated — the exponents are fixed at 0.75 (CL) and 1.0 (V), consistent with physiological priors.',
};

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
};

const labelStyle = {
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

export default function TplBackup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B01 · Topic Area</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The detailed evidence behind the claim{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — pull up if asked.
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
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              alignContent: 'start',
            }}
          >
            {SECTIONS.map((section, si) => (
              <motion.div
                key={section.kicker}
                style={panelStyle}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.6 + si * 0.2,
                  ease: EASE,
                }}
              >
                <div className="deck-mono uppercase" style={labelStyle}>
                  {section.kicker}
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                  {section.items.map((item) => (
                    <div key={item.label}>
                      <div
                        className="deck-mono uppercase"
                        style={{
                          fontSize: 'var(--fs-card-meta)',
                          letterSpacing: 'var(--ls-mono-wide)',
                          color: 'var(--cream-faint)',
                          marginBottom: 'var(--space-1)',
                        }}
                      >
                        {item.label}
                      </div>
                      <div
                        className="deck-body"
                        style={{
                          fontSize: 'var(--fs-slide-subhead)',
                          color: 'var(--cream)',
                          lineHeight: 1.55,
                        }}
                      >
                        {item.value}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          {SUMMARY && (
            <motion.div
              style={{
                ...panelStyle,
                borderLeft: '4px solid var(--case)',
                marginTop: 'auto',
                flex: '0 0 auto',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 1.1,
                ease: EASE,
              }}
            >
              <div className="deck-mono uppercase" style={labelStyle}>
                {SUMMARY.kicker}
              </div>
              <div
                className="deck-body"
                style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream-muted)',
                  lineHeight: 1.55,
                }}
              >
                {SUMMARY.text}
              </div>
            </motion.div>
          )}
        </div>
      </Viz>

      <Footer
        kicker="B01 · CS1 · TOPIC AREA"
        source="Source · Replace with actual citation chain"
      />
    </SlideGrid>
  );
}
