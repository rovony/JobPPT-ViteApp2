// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

const CONDITIONS = [
  {
    n: '01',
    title: 'Traceable inputs',
    body: 'Which dataset, which version — fixed at the time of use.',
  },
  {
    n: '02',
    title: 'Deterministic computation',
    body: 'Same inputs return the same numbers, every time.',
  },
  {
    n: '03',
    title: 'Explicit assumptions',
    body: 'Surfaced into the record — not left implicit in a prompt.',
  },
  {
    n: '04',
    title: 'A named human owner',
    body: 'Of the final decision — a person, not a process.',
  },
];

/**
 * CS4 · regulatory floor — four bordered conditions + competing hypothesis.
 */
export default function Cs3AiRegulatoryFloor() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="4"
      eyebrow="Case 04 · The floor"
      headline={
        <>
          Acceptable only when four conditions hold —{' '}
          <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
            not when the model looks explainable.
          </span>
        </>
      }
      subhead="After three drug decisions, the constraint shifts to the evidence system itself."
      footerKicker="Case 04 · Regulatory floor"
      footerTagline="Set the floor before adoption pressure arrives."
      footerSource="Personal research · not a sponsor deployment"
      delays={{ footer: 1.35 }}
    >
      <div className="cs4-stack">
        <motion.div
          className="cs4-honesty"
          initial={go ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.35, ease: EASE }}
        >
          <span className="cs4-honesty__kick">Standing disclosure</span>
          <span className="cs4-honesty__body">
            Personal research. <b>Not a sponsor deployment, not a validated system, not a product.</b>
          </span>
        </motion.div>

        <div className="cs4-floor">
          {CONDITIONS.map((c, i) => (
            <motion.div
              key={c.n}
              className="cs4-floor__card"
              initial={go ? { opacity: 0, y: 14 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 + i * 0.08, ease: EASE }}
            >
              <div className="cs4-floor__n">Condition {c.n}</div>
              <div className="cs4-floor__t">{c.title}</div>
              <div className="cs4-floor__b">{c.body}</div>
            </motion.div>
          ))}
        </div>

        <div className="cs4-pair">
          <motion.div
            className="cs4-note cs4-note--rose"
            initial={go ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 0.95, ease: EASE }}
          >
            <div className="cs4-note__kick">Competing view</div>
            <div className="cs4-note__body">
              That model-level explainability is enough. For this context of use it is not —{' '}
              <b>explaining a prediction is not reconstructing an analysis.</b>
            </div>
          </motion.div>
          <motion.div
            className="cs4-note cs4-note--case"
            initial={go ? { opacity: 0, y: 10 } : false}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, delay: 1.05, ease: EASE }}
          >
            <div className="cs4-note__kick">Why the floor comes first</div>
            <div className="cs4-note__body">
              Same move as pre-agreeing an evidence threshold with an agency — applied internally,{' '}
              <b>before adoption pressure arrives.</b>
            </div>
          </motion.div>
        </div>
      </div>
    </SlideFrame>
  );
}
