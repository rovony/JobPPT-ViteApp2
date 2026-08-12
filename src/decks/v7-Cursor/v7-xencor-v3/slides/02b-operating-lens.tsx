import React, { useId, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { BP } from '../_shared/blueprint';

/**
 * 02b · Operating lens — decision-first method (after hook, before cases).
 *
 * Hook owns Define → Challenge → Test → Act (verbal lock).
 * This slide owns the operational loop: decision → risk → threshold →
 * least model → falsify → action → standard (and the feedback).
 *
 * FitStage 1920×1080; light/dark via --bp-* / `.xc-*` (`styles/xencor-deck.css`).
 * Animation: staggered path reveal on enter (cs1-poppk DecisionGate spirit).
 * No click-to-zoom. No Senior Director on slide. No invented claims.
 */

const EASE = [0.22, 0.7, 0.2, 1] as const;

type Step = {
  n: number;
  title: string;
  body: string;
  kind?: 'decision' | 'break' | 'standard';
  /** CSS grid area name */
  area: string;
};

const STEPS: Step[] = [
  {
    n: 1,
    title: 'The decision',
    body: 'What action changes, and by when?',
    kind: 'decision',
    area: 's1',
  },
  {
    n: 2,
    title: 'Cost of being wrong',
    body: 'Sets how much evidence is enough',
    area: 's2',
  },
  {
    n: 3,
    title: 'Evidence threshold',
    body: 'Written down before the answer',
    area: 's3',
  },
  {
    n: 4,
    title: 'Least complex model',
    body: 'That can clear that threshold',
    area: 's4',
  },
  {
    n: 5,
    title: 'Try to break it',
    body: 'What would falsify the answer?',
    kind: 'break',
    area: 's5',
  },
  {
    n: 6,
    title: 'Align on the action',
    body: 'Not on the model',
    area: 's6',
  },
  {
    n: 7,
    title: 'Leave a standard',
    body: 'Workflow · criteria · record · ownership',
    kind: 'standard',
    area: 's7',
  },
];

const PRINCIPLES = [
  {
    n: '01',
    title: 'Complexity is a cost, not a credential.',
    body: 'A model no reviewer can challenge is worth less than a simpler one they can.',
  },
  {
    n: '02',
    title: 'The threshold goes first.',
    body: 'Deciding what would convince you after seeing the result is rationalization, not analysis.',
  },
  {
    n: '03',
    title: 'Uncertainty is not the enemy.',
    body: 'Find which uncertainty moves the next decision — and bound that one.',
  },
];

/** Connector segments in flow order (viewBox 0 0 1000 520). */
const PATHS = [
  'M165 116 L165 148', // 1→2
  'M165 244 L165 276', // 2→3
  'M310 326 L352 326', // 3→4
  'M503 280 L503 248', // 4→5
  'M503 152 L503 120', // 5→6
  'M648 70 L690 70', // 6→7
  'M836 372 C836 440, 165 440, 165 404', // loop back
] as const;

function StepCard({
  step,
  go,
  reduced,
  delay,
}: {
  step: Step;
  go: boolean;
  reduced: boolean | null;
  delay: number;
}) {
  const kindClass =
    step.kind === 'decision'
      ? 'xc-lens__step--decision'
      : step.kind === 'break'
        ? 'xc-lens__step--break'
        : step.kind === 'standard'
          ? 'xc-lens__step--standard'
          : '';

  return (
    <motion.article
      className={`xc-lens__step ${kindClass}`.trim()}
      style={{ gridArea: step.area }}
      aria-label={`Step ${step.n}: ${step.title}`}
      initial={{ opacity: 0, y: 6 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0 : 0.4,
        delay: reduced ? 0 : delay,
        ease: EASE,
      }}
    >
      <div className="xc-lens__step-n">
        <span>{step.n}</span>
        <span aria-hidden>·</span>
        <span>{step.title}</span>
      </div>
      <p className="xc-lens__step-body">{step.body}</p>
    </motion.article>
  );
}

export default function OperatingLens() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;
  const uid = useId().replace(/:/g, '');
  const markerId = `lens-arrow-${uid}`;

  const enter = (delay: number) => ({
    initial: { opacity: 0, y: 8 },
    animate: go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 },
    transition: {
      duration: reduced ? 0 : 0.42,
      delay: reduced ? 0 : delay,
      ease: EASE,
    },
  });

  // Path draw: start after first step, ~90ms stagger, settle ≤~1.1s
  const pathBase = 0.28;
  const pathStagger = 0.09;

  return (
    <motion.section
      ref={ref}
      data-slide="02b"
      data-operating-lens=""
      aria-labelledby="s02b-lens-title"
      className="xc-blueprint-surface xc-lens relative w-full h-full overflow-hidden"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.2 }}
    >
      <div aria-hidden className="xc-blueprint-frame" />

      <motion.div className="xc-tag xc-lens__kicker" {...enter(0.05)}>
        Operating lens
      </motion.div>

      <motion.h2 id="s02b-lens-title" className="xc-h2 xc-lens__title" {...enter(0.12)}>
        The method follows the decision and the risk —{' '}
        <span className="xc-em">never the reverse</span>
      </motion.h2>

      <div className="xc-lens__body">
        <div className="xc-lens__flow" aria-label="Seven-step decision-first method">
          <svg
            className="xc-lens__connectors"
            viewBox="0 0 1000 520"
            preserveAspectRatio="none"
            aria-hidden
          >
            <defs>
              <marker
                id={markerId}
                viewBox="0 0 10 10"
                refX="9"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 0 L 10 5 L 0 10 z" fill={BP.ink3} />
              </marker>
            </defs>
            {PATHS.map((d, i) => {
              const isLoop = i === PATHS.length - 1;
              return (
                <motion.path
                  key={d}
                  d={d}
                  fill="none"
                  stroke={isLoop ? BP.ink4 : BP.ink}
                  strokeWidth={isLoop ? 1.4 : 2}
                  strokeDasharray={isLoop ? '6 6' : undefined}
                  markerEnd={isLoop ? undefined : `url(#${markerId})`}
                  initial={
                    reduced
                      ? { pathLength: 1, opacity: 1 }
                      : { pathLength: 0, opacity: 0 }
                  }
                  animate={
                    go || reduced
                      ? { pathLength: 1, opacity: isLoop ? 0.7 : 1 }
                      : { pathLength: 1, opacity: isLoop ? 0.7 : 1 }
                  }
                  transition={{
                    duration: reduced ? 0 : 0.35,
                    delay: reduced ? 0 : pathBase + i * pathStagger,
                    ease: EASE,
                  }}
                />
              );
            })}
          </svg>

          <div className="xc-lens__steps">
            {STEPS.map((step, i) => (
              <StepCard
                key={step.n}
                step={step}
                go={!!go}
                reduced={reduced}
                delay={0.2 + i * 0.09}
              />
            ))}
          </div>
        </div>

        <div className="xc-lens__principles" role="list">
          {PRINCIPLES.map((p, i) => (
            <motion.div
              key={p.n}
              role="listitem"
              className="xc-lens__principle"
              initial={{ opacity: 0, y: 8 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.72 + i * 0.09,
                ease: EASE,
              }}
            >
              <div className="xc-lens__principle-kick">Principle {p.n}</div>
              <div className="xc-lens__principle-title">{p.title}</div>
              <p className="xc-lens__principle-body">{p.body}</p>
            </motion.div>
          ))}
        </div>
      </div>

      <motion.div className="xc-lens__loop" {...enter(0.95)}>
        <span className="xc-lens__loop-label">Feedback</span>
        <span className="xc-lens__loop-text">
          The standard changes what the next decision costs
        </span>
      </motion.div>
    </motion.section>
  );
}
