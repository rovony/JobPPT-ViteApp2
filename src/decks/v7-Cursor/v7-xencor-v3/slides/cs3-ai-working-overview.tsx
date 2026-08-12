// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.2, 0.7, 0.3, 1];

const STEPS = [
  {
    label: 'Plan',
    title: 'Write intent first',
    body: 'Analysis purpose before any computation runs.',
  },
  {
    label: 'Run',
    title: 'Deterministic tools',
    body: 'Agent orchestrates; tools compute — replayable, versioned.',
  },
  {
    label: 'Check',
    title: 'Compare before synthesis',
    body: 'A failed step must not be smoothed over.',
  },
  {
    label: 'Record',
    title: 'Audit trail',
    body: 'A reviewer can follow it without asking what happened off-screen.',
    record: true,
  },
];

const LEDGER = [
  {
    k: 'Context of use',
    v: (
      <>
        Assisted review and assembly of clin pharm analyses.{' '}
        <b>Not autonomous dose recommendation.</b>
      </>
    ),
  },
  {
    k: 'Comparator',
    v: (
      <>
        Manual workflow on the same inputs — deterministic tools produce the{' '}
        <b>identical numbers</b>; assembly and review time change.
      </>
    ),
  },
  {
    k: 'Validation',
    v: (
      <>
        Replayability: same plan + inputs → same outputs, every step inspectable.{' '}
        <b>Prototype-level. Not a validated GxP deployment.</b>
      </>
    ),
  },
];

/**
 * CS4 · architecture — PLAN→RUN→CHECK→RECORD + Ying Ding ledger (ex-pharos stub).
 */
export default function Cs3AiWorkingOverview() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="4"
      eyebrow="Case 04 · Architecture"
      headline={
        <>
          Agents orchestrate;{' '}
          <span className="italic" style={{ color: 'var(--xc-case-accent)' }}>
            deterministic tools compute.
          </span>
        </>
      }
      subhead="Plan → run → check → record. Separating orchestration from computation is the design."
      footerKicker="Case 04 · Working pattern"
      footerTagline="Rejected: end-to-end LLM producing the analysis directly."
      footerSource="Personal research · prototype · not GxP validated"
      delays={{ footer: 1.4 }}
    >
      <div className="cs4-stack">
        <div className="cs4-plan">
          {STEPS.map((s, i) => (
            <motion.div
              key={s.label}
              className={`cs4-plan__step${s.record ? ' cs4-plan__step--record' : ''}`}
              initial={go ? { opacity: 0, y: 12 } : false}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: 0.4 + i * 0.08, ease: EASE }}
            >
              <div className="cs4-plan__label">{s.label}</div>
              <div className="cs4-plan__title">{s.title}</div>
              <div className="cs4-plan__body">{s.body}</div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className="cs4-note cs4-note--rose"
          initial={go ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.85, ease: EASE }}
        >
          <div className="cs4-note__kick">Rejected — end-to-end language model</div>
          <div className="cs4-note__body">
            Faster to build. Impossible to review. Fails the first three floor conditions.
          </div>
        </motion.div>

        <motion.div
          initial={go ? { opacity: 0, y: 8 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 1.0, ease: EASE }}
          style={{
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-md, 6px)',
            overflow: 'hidden',
            background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
          }}
        >
          <table className="cs4-ledger">
            <thead>
              <tr>
                <th style={{ width: '22%' }}>Panel question</th>
                <th>Answer, stated before it is asked</th>
              </tr>
            </thead>
            <tbody>
              {LEDGER.map((row) => (
                <tr key={row.k}>
                  <td className="k">{row.k}</td>
                  <td>{row.v}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </SlideFrame>
  );
}
