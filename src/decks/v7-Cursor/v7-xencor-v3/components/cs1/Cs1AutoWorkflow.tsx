import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/**
 * Auto-stagger PopPK workflow strip — no click-to-zoom.
 * Inspired by DecisionGate / cs1-poppk WORKFLOW pattern.
 */

const EASE = [0.22, 0.7, 0.2, 1] as const;

const STEPS = [
  { n: '01', title: 'BUILD', body: 'Adult PopPK foundation' },
  { n: '02', title: 'pcVPC', body: 'Adult model predicts peds?' },
  { n: '03', title: 'FIT', body: 'Peds inherit structure' },
  { n: '04', title: 'COMPARE', body: 'AUCss · Cmax vs adults' },
  { n: '05', title: 'PACKAGE', body: 'Integrated report' },
] as const;

export default function Cs1AutoWorkflow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <div ref={ref} className="cs1-auto-flow" role="list">
      {STEPS.map((s, i) => (
        <React.Fragment key={s.n}>
          <motion.div
            role="listitem"
            className="cs1-auto-flow__step"
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: 0.08 + i * 0.09, ease: EASE }}
          >
            <span className="cs1-auto-flow__n xc-mono">
              {s.n} · {s.title}
            </span>
            <span className="cs1-auto-flow__b">{s.body}</span>
          </motion.div>
          {i < STEPS.length - 1 && (
            <motion.div
              className="cs1-auto-flow__join"
              aria-hidden
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : { opacity: 1 }}
              transition={{ duration: 0.25, delay: 0.16 + i * 0.09 }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}
