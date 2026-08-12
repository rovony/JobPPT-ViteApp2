import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';

/** Adult therapeutic band + pediatric dose markers (−3% / +0.3%). */

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Cs1ExposureBand() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <svg
      ref={ref}
      viewBox="0 0 900 320"
      className="cs1-band"
      aria-label="Pediatric AUCss inside adult therapeutic band"
    >
      <text x="450" y="36" textAnchor="middle" className="cs1-band__label">
        ADULT THERAPEUTIC AUCss BAND
      </text>

      <motion.rect
        x="80"
        y="70"
        width="740"
        height="100"
        className="cs1-band__zone"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4 }}
      />

      <text x="100" y="128" className="cs1-band__zone-t">
        Adult reference range
      </text>

      {/* Pediatric markers */}
      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25, ease: EASE }}
      >
        <line x1="320" y1="70" x2="320" y2="200" className="cs1-band__mark" />
        <circle cx="320" cy="120" r="10" className="cs1-band__dot" />
        <text x="320" y="230" textAnchor="middle" className="cs1-band__mark-t">
          −3%
        </text>
        <text x="320" y="252" textAnchor="middle" className="cs1-band__mark-s">
          lower band edge
        </text>
      </motion.g>

      <motion.g
        initial={{ opacity: 0, y: 8 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.4, ease: EASE }}
      >
        <line x1="580" y1="70" x2="580" y2="200" className="cs1-band__mark" />
        <circle cx="580" cy="120" r="10" className="cs1-band__dot" />
        <text x="580" y="230" textAnchor="middle" className="cs1-band__mark-t">
          +0.3%
        </text>
        <text x="580" y="252" textAnchor="middle" className="cs1-band__mark-s">
          upper band edge
        </text>
      </motion.g>

      <motion.text
        x="450"
        y="300"
        textAnchor="middle"
        className="cs1-band__foot"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.35, delay: 0.55 }}
      >
        Cmax safety check held · E-R for efficacy not identifiable at N = 39
      </motion.text>
    </svg>
  );
}
