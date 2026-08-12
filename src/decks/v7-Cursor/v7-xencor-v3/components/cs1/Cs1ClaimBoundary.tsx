import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Cs1ClaimBoundary() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <div ref={ref} className="cs1-claim">
      <motion.div
        className="cs1-claim__col cs1-claim__col--yes"
        initial={{ opacity: 0, y: 10 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
      >
        <div className="cs1-claim__kick xc-mono">Supported</div>
        <p className="cs1-claim__body">
          Pediatric <strong>dose labeling</strong> via exposure matching to the
          adult therapeutic band.
        </p>
      </motion.div>

      <motion.div
        className="cs1-claim__col cs1-claim__col--no"
        initial={{ opacity: 0, y: 10 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
      >
        <div className="cs1-claim__kick xc-mono">Not claimed</div>
        <p className="cs1-claim__body">
          Demonstrated pediatric <strong>efficacy</strong> — the trial that would
          have carried that claim was structurally closed.
        </p>
      </motion.div>

      <motion.div
        className="cs1-claim__agencies"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4, delay: 0.32 }}
      >
        <div className="cs1-claim__agency cs1-claim__agency--ok">
          <span className="xc-mono">EMA</span>
          <span>2021 · accepted</span>
        </div>
        <div className="cs1-claim__agency cs1-claim__agency--ok">
          <span className="xc-mono">PMDA</span>
          <span>2021 · accepted</span>
        </div>
        <div className="cs1-claim__agency cs1-claim__agency--gap">
          <span className="xc-mono">FDA</span>
          <span>package never submitted</span>
        </div>
      </motion.div>
    </div>
  );
}
