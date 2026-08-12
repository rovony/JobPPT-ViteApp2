// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS4 · gap — generation is cheap; trusted review is the bottleneck.
 */
export default function Cs3AiGap() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="4"
      eyebrow="Case 04 · The gap"
      headline={
        <>
          The bottleneck is{' '}
          <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
            trusted review
          </span>
          , not generation.
        </>
      }
      subhead="Agents accelerate assembly. They do not, by default, produce lineage a reviewer can reconstruct."
      footerKicker="Case 04 · Traceability gap"
      footerTagline="Speed without lineage just moves the bottleneck."
      footerSource="Personal research framing"
      delays={{ footer: 1.1 }}
    >
      <div className="cs4-stack">
        <div className="cs4-gap">
          <motion.div
            className="cs4-gap__card cs4-gap__card--fast"
            initial={go ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.45, ease: EASE }}
          >
            <div className="cs4-gap__kick">What accelerates</div>
            <div className="cs4-gap__t">Plans, tables, comparisons</div>
            <div className="cs4-gap__b">
              Agents can draft run plans, route tasks, assemble outputs, and compare results — faster than a
              manual workflow.
            </div>
          </motion.div>
          <motion.div
            className="cs4-gap__card cs4-gap__card--bottleneck"
            initial={go ? { opacity: 0, y: 12 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.55, ease: EASE }}
          >
            <div className="cs4-gap__kick">What does not arrive free</div>
            <div className="cs4-gap__t">Lineage for every number</div>
            <div className="cs4-gap__b">
              Which input, which version, which tool, which assumption — without that chain, the claim is not
              inspectable, even if the answer looks right.
            </div>
          </motion.div>
        </div>

        <motion.div
          className="cs4-note cs4-note--case"
          initial={go ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.85, ease: EASE }}
        >
          <div className="cs4-note__kick">Decision this case serves</div>
          <div className="cs4-note__body">
            Not whether to use these tools — <b>what must be true before an accelerated result may inform a dose.</b>
          </div>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
