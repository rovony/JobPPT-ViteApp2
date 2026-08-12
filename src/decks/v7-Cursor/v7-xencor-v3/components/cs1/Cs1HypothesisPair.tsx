import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Working vs competing hypothesis cards for CS1 beat 3.
 */

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Cs1HypothesisPair() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <div ref={ref} className="cs1-hyp-pair h-auto self-start">
      <motion.article
        className="cs1-hyp-card cs1-hyp-card--work h-auto self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
      >
        <div className="cs1-hyp-card__kick xc-mono">Working hypothesis</div>
        <p className="cs1-hyp-card__body">
          Disease and exposure–effect are similar enough that matching adult
          therapeutic exposure (weight-aware) is decision-grade for pediatric dose.
        </p>
      </motion.article>

      <motion.article
        className="cs1-hyp-card cs1-hyp-card--compete h-auto self-start"
        initial={{ opacity: 0, y: 12 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.18, ease: EASE }}
      >
        <div className="cs1-hyp-card__kick xc-mono">Competing hypothesis</div>
        <p className="cs1-hyp-card__body">
          Pediatric PAH biology or response differs enough that exposure matching
          is false comfort — the same AUCss does not imply the same benefit.
        </p>
      </motion.article>

      <motion.p
        className="cs1-hyp-assume xc-mono"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.32 }}
      >
        Fragile assumption · disease similarity is written down before the answer —
        not discovered after
      </motion.p>
    </div>
  );
}
