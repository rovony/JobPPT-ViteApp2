import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Cs1RejectedAltCompare() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <div ref={ref} className="cs1-reject-pair">
      <motion.article
        className="cs1-reject-card cs1-reject-card--chosen"
        initial={{ opacity: 0, x: -10 }}
        animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.1, ease: EASE }}
      >
        <div className="cs1-reject-card__kick xc-mono">Chosen route</div>
        <h3 className="cs1-reject-card__title">Exposure matching · FUTURE-1 architecture</h3>
        <p className="cs1-reject-card__body">
          Adults build structure; children confirm transportability against adult
          steady-state exposure bands. Precedent: bosentan FUTURE-1 showed EMA
          could accept the shape of the argument.
        </p>
      </motion.article>

      <motion.article
        className="cs1-reject-card cs1-reject-card--reject"
        initial={{ opacity: 0, x: 10 }}
        animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.4, delay: 0.2, ease: EASE }}
      >
        <div className="cs1-reject-card__kick xc-mono">Rejected here</div>
        <h3 className="cs1-reject-card__title">Hemodynamic quantitative bridge</h3>
        <p className="cs1-reject-card__body">
          Garnett–Florian-style PVR-to-function bridging needs paired hemodynamics.
          Our substudy was <strong>N = 5</strong> — not enough to carry that bridge.
        </p>
      </motion.article>
    </div>
  );
}
