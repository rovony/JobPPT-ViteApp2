// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CS2SomaticGermlineViz from './cs2-shared/CS2SomaticGermlineViz';

/**
 * CS3 live · Credibility / falsifiers (promoted from backup B4).
 * Conclusion H1; tests that would have broken the case; somatic vs germline.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CHECKS = [
  {
    break: 'Race as a significant covariate on clearance',
    held: 'N=253 · not significant',
  },
  {
    break: 'A steep exposure–response at 500 mg QD',
    held: 'Flat across range',
  },
  {
    break: 'DME polymorphism frequency large enough to shift exposure',
    held: 'Impact bounded',
  },
  {
    break: 'A germline rather than somatic driver',
    held: 'Confirmed somatic',
  },
];

export default function Cs2BackupB4PopulationEvidence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="2" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 02 · Credibility</Eyebrow>

      <Headline delay={0.18} maxChars={56}>
        Every pillar was a test we could have{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>failed</span>
      </Headline>

      <Subhead delay={0.28} size="lead" maxChars={90}>
        If any one returned true, the honest answer was to run the local study and accept the delay.
      </Subhead>

      <Viz>
        <div ref={ref} className="cs3-b4-layout">
          <div className="cs3-b4-checks">
            {CHECKS.map((row, i) => (
              <motion.div
                key={row.break}
                className="cs3-b4-row"
                initial={reduced ? false : { opacity: 0, x: -10 }}
                animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
                transition={{ duration: 0.4, ease: EASE, delay: reduced ? 0 : 0.25 + i * 0.08 }}
              >
                <div className="cs3-b4-break">
                  <div className="cs3-b4-break__t">IF {row.break}</div>
                  <div className="cs3-b4-break__s">THEN the argument collapses</div>
                </div>
                <div className="cs3-b4-arrow" aria-hidden>
                  →
                </div>
                <div className="cs3-b4-held">HELD · {row.held}</div>
              </motion.div>
            ))}

            <motion.aside
              className="xc-callout cs1-callout-full"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: reduced ? 0 : 0.7 }}
              style={{ marginTop: 'auto' }}
            >
              Nothing in this package substitutes for observed Indian PK — that is why a{' '}
              <strong className="xc-case">Phase 4 commitment</strong> is a pillar, not an afterthought.
            </motion.aside>
          </div>

          <motion.div
            className="cs3-b4-viz"
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : 0.4 }}
          >
            <CS2SomaticGermlineViz delay={reduced ? 0 : 0.55} />
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Credibility"
        tagline="Tests we could have failed — checked, not assumed"
        source="Jiang CTS 2021 · Dai EJCP 2019 · Dang Cancer Cell 2009 · Yue EJCP 2024"
      />
    </SlideGrid>
  );
}
