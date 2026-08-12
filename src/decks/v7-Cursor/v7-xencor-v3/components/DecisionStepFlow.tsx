// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * DecisionStepFlow — horizontal 4-step decision sequence.
 *
 * Visual DNA: blueprint STEP 01… boxes + arrows + subtext, adapted with
 * cs1-poppk rounded bordered mono panels. Theme via --cream / --panel
 * tokens (light + dark). Type + box size live in xencor-deck.css
 * (.bp-step-*).
 */

export const DECISION_STEPS = [
  {
    n: '01',
    verb: 'Define',
    body: 'Name the decision and the cost of being wrong.',
    caseId: 1,
  },
  {
    n: '02',
    verb: 'Challenge',
    body: 'State the competing explanation and failure condition.',
    caseId: 2,
  },
  {
    n: '03',
    verb: 'Test',
    body: 'Choose the evidence architecture that the data can support.',
    caseId: 3,
  },
  {
    n: '04',
    verb: 'Act',
    body: 'Take the pre-agreed branch—and retain the limitation.',
    caseId: 4,
  },
];

function StepArrow({ delay, go }) {
  return (
    <motion.div
      aria-hidden
      className="bp-step-arrow"
      initial={{ opacity: 0 }}
      animate={{ opacity: go ? 1 : 1 }}
      transition={{ duration: 0.4, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <svg width="18" height="12" viewBox="0 0 18 12" fill="none">
        <path
          d="M1 6h14M11 1.5 16.5 6 11 10.5"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.div>
  );
}

function StepCard({ step, delay, go }) {
  return (
    <motion.div
      className="bp-step-card"
      data-case={step.caseId}
      initial={{ opacity: 0, y: 6 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <div className="bp-step-eyebrow">Step {step.n}</div>

      <div className="bp-step-box">
        <div className="bp-step-label">
          <span className="bp-step-label__n">{step.n}</span>
          <span className="bp-step-label__sep">·</span>
          <span className="bp-step-label__verb">{step.verb}</span>
        </div>
        <div className="bp-step-body">{step.body}</div>
      </div>
    </motion.div>
  );
}

/**
 * @param {{ go?: boolean, className?: string, style?: React.CSSProperties }} props
 */
export default function DecisionStepFlow({ go = true, className, style }) {
  return (
    <div
      className={['bp-step-flow', className].filter(Boolean).join(' ')}
      role="list"
      aria-label="Decision sequence: Define, Challenge, Test, Act"
      style={style}
    >
      {DECISION_STEPS.map((step, i) => (
        <React.Fragment key={step.n}>
          <div role="listitem" className="bp-step-flow__item">
            <StepCard step={step} delay={1.05 + i * 0.12} go={go} />
          </div>
          {i < DECISION_STEPS.length - 1 ? (
            <StepArrow delay={1.15 + i * 0.12} go={go} />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}
