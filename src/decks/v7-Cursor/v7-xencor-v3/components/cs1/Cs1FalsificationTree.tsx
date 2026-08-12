import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.7, 0.2, 1] as const;

const BREAKS = [
  {
    title: 'Systematic bias in predictive checks',
    sub: 'the model predicts one thing and the children do another',
  },
  {
    title: 'Exposures drift with body size after allometry',
    sub: 'weight is not the operative covariate after all',
  },
  {
    title: 'Pediatric exposure sits outside the adult band',
    sub: 'the premise of the entire package fails',
  },
  {
    title: 'An unpredicted dose-related safety signal',
    sub: 'contradicting the adult profile',
  },
] as const;

export default function Cs1FalsificationTree() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <div ref={ref} className="cs1-falsify">
      <motion.div
        className="cs1-falsify__root"
        initial={{ opacity: 0, scale: 0.96 }}
        animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: EASE }}
      >
        <span className="cs1-falsify__root-t">What breaks the bridge?</span>
        <span className="cs1-falsify__root-s">Agreed before analysis</span>
      </motion.div>

      <div className="cs1-falsify__rows">
        {BREAKS.map((b, i) => (
          <motion.div
            key={b.title}
            className="cs1-falsify__row"
            initial={{ opacity: 0, x: -12 }}
            animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.35, delay: 0.12 + i * 0.08, ease: EASE }}
          >
            <div className="cs1-falsify__break">
              <div className="cs1-falsify__break-t">{b.title}</div>
              <div className="cs1-falsify__break-s">{b.sub}</div>
            </div>
            <div className="cs1-falsify__arrow" aria-hidden>
              →
            </div>
            <div className="cs1-falsify__decline">REDESIGN — OR DECLINE</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
