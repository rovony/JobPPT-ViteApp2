// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

const REVIEW = [
  {
    kick: 'On one surface',
    open: false,
    items: [
      <>Assumptions and <b>diagnostics</b></>,
      <>Covariate logic and <b>simulation scenarios</b></>,
      <><b>What changed</b> between versions</>,
    ],
  },
  {
    kick: 'Still needs expert review',
    open: true,
    items: [
      <>Unresolved questions — <b>named, not smoothed</b></>,
      <>Any step without a human owner</>,
      <>Anything non-deterministic stays out of the accelerated path</>,
    ],
  },
];

const FAILURES = [
  { n: '01', title: 'Silent input-version drift' },
  { n: '02', title: 'Confident synthesis over a failed step' },
  { n: '03', title: 'Reviewer automation bias' },
  { n: '04', title: 'Assumptions never enter the record' },
];

/**
 * CS4 · PopPK review surface — the interface is the review contract (ex-pharos stub).
 * Failure modes at equal weight + accelerate-vs-manual boundary.
 */
export default function Cs3AiPoppkDashboard() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="4"
      eyebrow="Case 04 · Review contract"
      headline={
        <>
          The interface{' '}
          <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
            is
          </span>{' '}
          the review contract — including what still needs expert review.
        </>
      }
      subhead="PopPK review surface as proof: assumptions, diagnostics, changes, and open questions on one screen."
      footerKicker="Case 04 · Credibility"
      footerTagline="Acceleration is not the goal — defensible speed is."
      footerSource="Reference workflow · prototype · not a validated deployment"
      delays={{ footer: 1.45 }}
    >
      <div className="cs4-stack">
        <div className="cs4-review">
          {REVIEW.map((panel, i) => (
            <motion.div
              key={panel.kick}
              className={`cs4-review__panel${panel.open ? ' cs4-review__panel--open' : ''}`}
              initial={go ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.1, ease: EASE }}
            >
              <div className="cs4-review__kick">{panel.kick}</div>
              <ul className="cs4-review__list">
                {panel.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="xc-card-label xc-ink-muted"
          initial={go ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.35, delay: 0.7, ease: EASE }}
        >
          Failure modes — equal weight
        </motion.div>

        <div className="cs4-fail">
          {FAILURES.map((f, i) => (
            <motion.div
              key={f.n}
              className="cs4-fail__item"
              initial={go ? { opacity: 0, y: 10 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.75 + i * 0.06, ease: EASE }}
            >
              <div className="cs4-fail__n">{f.n}</div>
              <div className="cs4-fail__t">{f.title}</div>
            </motion.div>
          ))}
        </div>

        <div className="cs4-boundary">
          <motion.div
            className="cs4-boundary__ok"
            initial={go ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.05, ease: EASE }}
          >
            <div className="cs4-boundary__if">If</div>
            <div className="cs4-boundary__cond">
              A step is deterministic, replayable, and has a named human owner
            </div>
            <div className="cs4-boundary__then">Then — it can be accelerated</div>
          </motion.div>
          <div className="cs4-boundary__or">OR</div>
          <motion.div
            className="cs4-boundary__no"
            initial={go ? { opacity: 0, y: 8 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.15, ease: EASE }}
          >
            <div className="cs4-boundary__if">If</div>
            <div className="cs4-boundary__cond">
              A step is non-deterministic, unreviewable, or unowned
            </div>
            <div className="cs4-boundary__then">Then — it stays manual</div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}
