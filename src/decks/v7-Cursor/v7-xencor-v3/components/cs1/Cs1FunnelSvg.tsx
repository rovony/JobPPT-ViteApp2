import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/** Strategy funnel — adults build · fixed allometry · parsimony · kids confirm. */

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Cs1FunnelSvg() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: { duration: 0.35, delay, ease: EASE },
  });

  return (
    <svg
      ref={ref}
      viewBox="0 0 1000 480"
      className="cs1-funnel"
      aria-hidden
    >
      <motion.g {...enter(0.05)}>
        <rect x="10" y="10" width="980" height="96" className="cs1-funnel__panel" />
        <text x="34" y="40" className="cs1-funnel__an">THE ANCHOR</text>
        <text x="34" y="72" className="cs1-funnel__lb">
          380 adults build the two-compartment structural model
        </text>
        <text x="34" y="94" className="cs1-funnel__ls">
          first-order absorption with lag time
        </text>
      </motion.g>

      <motion.path
        d="M120 106 L880 106 L830 126 L170 126 Z"
        className="cs1-funnel__wedge"
        {...enter(0.12)}
      />

      <motion.g {...enter(0.18)}>
        <rect x="80" y="130" width="840" height="112" className="cs1-funnel__panel" />
        <text x="104" y="160" className="cs1-funnel__an">THE CONSTRAINT</text>
        <text x="104" y="192" className="cs1-funnel__lb">
          Fixed biological allometry, applied a priori
        </text>
        <text x="104" y="218" className="cs1-funnel__lx">
          CLEARANCE EXPONENT 0.75 · VOLUME EXPONENT 1.0
        </text>
        <text x="104" y="238" className="cs1-funnel__warn">
          deliberately NOT estimated from 39 children
        </text>
      </motion.g>

      <motion.path
        d="M180 242 L820 242 L770 262 L230 262 Z"
        className="cs1-funnel__wedge"
        {...enter(0.24)}
      />

      <motion.g {...enter(0.3)}>
        <rect x="140" y="266" width="720" height="112" className="cs1-funnel__panel" />
        <text x="164" y="296" className="cs1-funnel__an">THE FILTER</text>
        <text x="164" y="328" className="cs1-funnel__lb">Strict parsimony</text>
        <text x="164" y="352" className="cs1-funnel__ls">
          12 covariates enter · deletion gate p &lt; 0.001
        </text>
        <text x="164" y="374" className="cs1-funnel__accent">
          only weight survives
        </text>
      </motion.g>

      <motion.path
        d="M240 378 L760 378 L710 398 L290 398 Z"
        className="cs1-funnel__wedge cs1-funnel__wedge--cyan"
        {...enter(0.36)}
      />

      <motion.g {...enter(0.42)}>
        <rect x="200" y="402" width="600" height="72" className="cs1-funnel__out" />
        <text x="500" y="434" textAnchor="middle" className="cs1-funnel__out-t">
          OUTPUT — 39 children confirm the structure
        </text>
        <text x="500" y="458" textAnchor="middle" className="cs1-funnel__out-s">
          prediction-corrected VPC · no structural misfit
        </text>
      </motion.g>
    </svg>
  );
}
