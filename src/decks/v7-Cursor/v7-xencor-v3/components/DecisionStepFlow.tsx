// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * DecisionStepFlow — horizontal 4-step decision sequence.
 *
 * Visual DNA: blueprint STEP 01… boxes + arrows + subtext, adapted with
 * cs1-poppk rounded bordered mono panels. Theme via --cream / --panel
 * tokens (light + dark).
 */

export const DECISION_STEPS = [
  {
    n: '01',
    verb: 'Define',
    body: 'Name the decision and the cost of being wrong.',
    accent: 'var(--coral)',
  },
  {
    n: '02',
    verb: 'Challenge',
    body: 'State the competing explanation and failure condition.',
    accent: 'var(--amber)',
  },
  {
    n: '03',
    verb: 'Test',
    body: 'Choose the evidence architecture that the data can support.',
    accent: 'var(--cyan)',
  },
  {
    n: '04',
    verb: 'Act',
    body: 'Take the pre-agreed branch—and retain the limitation.',
    accent: 'var(--sage)',
  },
];

function StepArrow({ delay, go }) {
  return (
    <motion.div
      aria-hidden
      style={{
        flex: '0 0 auto',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 'clamp(18px, 2.2vw, 36px)',
        color: 'var(--cream-faint)',
        paddingTop: 'clamp(1.1rem, 2.2vh, 1.6rem)',
      }}
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
      style={{
        flex: '1 1 0',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(0.35rem, 0.8vh, 0.55rem)',
      }}
      initial={{ opacity: 0, y: 6 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: [0.2, 0.7, 0.3, 1] }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: '0.12em',
          color: step.accent,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        Step {step.n}
      </div>

      <div
        className="bp-step-box"
        style={{
          border: `1.5px solid color-mix(in srgb, ${step.accent} 55%, var(--cream-hairline))`,
          background: `color-mix(in srgb, ${step.accent} 7%, var(--panel, transparent))`,
          minHeight: 'clamp(4.5rem, 9vh, 5.75rem)',
        }}
      >
        <div
          className="bp-step-label"
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: '0.4rem',
            flexWrap: 'wrap',
          }}
        >
          <span style={{ color: step.accent, fontWeight: 600 }}>{step.n}</span>
          <span style={{ color: 'var(--cream-muted)' }}>·</span>
          <span style={{ color: 'var(--cream)', fontWeight: 600 }}>{step.verb}</span>
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
      className={className}
      role="list"
      aria-label="Decision sequence: Define, Challenge, Test, Act"
      style={{
        display: 'flex',
        alignItems: 'stretch',
        gap: 0,
        width: '100%',
        maxWidth: 'min(100%, 1180px)',
        ...style,
      }}
    >
      {DECISION_STEPS.map((step, i) => (
        <React.Fragment key={step.n}>
          <div role="listitem" style={{ flex: '1 1 0', minWidth: 0 }}>
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
