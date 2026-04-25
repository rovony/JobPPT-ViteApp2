import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import WorkflowSvg from './cs4-shared/workflow.svg?react';

/**
 * CS4 · S35 WORKFLOW IN ACTION — end-to-end PopPK with review gates.
 *
 * Concrete worked example: PopPK build runs on the platform, with four
 * mandatory review gates protecting human scientific authority.
 *
 *   Gate 1 · Base model selection — analyst confirms structural model
 *   Gate 2 · Covariate finalization — analyst reviews retained covariates
 *   Gate 3 · Final model designation — locks parameter estimates
 *   Gate 4 · Report approval — nothing leaves without explicit sign-off
 *
 * Outcome: 4–8 weeks of analysis becomes 1–2 weeks WITH every regulatory
 * artifact intact. The audit trail is the deliverable, not a side effect.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const GATES = [
  { num: '01', name: 'Base model selection', desc: 'analyst confirms structural model before covariate work' },
  { num: '02', name: 'Covariate finalization', desc: 'analyst reviews retained covariates and inclusion criteria' },
  { num: '03', name: 'Final model designation', desc: 'locks parameter estimates · triggers diagnostics' },
  { num: '04', name: 'Report approval', desc: 'nothing leaves the platform without explicit sign-off' },
];

export default function Slide35Cs4Workflow() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · Workflow in action — end-to-end PopPK"
      headline={
        <>
          A PopPK analysis runs end-to-end with{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            four mandatory review gates protecting human scientific authority.
          </span>
        </>
      }
      headlineMaxChars={150}
      subhead="Eight tool calls · four review gates · one hash-chain entry per call · 4–8 weeks → 1–2 weeks with every regulatory artifact intact."
      subheadMaxChars={140}
      footerKicker="Case 04 · Workflow in action"
      footerSource="Source · PharmAgent workflow templates (76) · QC Agent 15-check diagnostics · ICH M15 package draft"
    >
      <WorkflowLayout />
    </SlideFrame>
  );
}

function WorkflowLayout() {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto auto',
        rowGap: 'var(--space-3)',
        minHeight: 0,
      }}
    >
      {/* Swimlane diagram */}
      <motion.div
        initial={initial ?? { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.4 }}
        style={{
          minHeight: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <WorkflowSvg
          style={{ width: '100%', height: '100%', maxHeight: 460 }}
          preserveAspectRatio="xMidYMid meet"
          aria-label="PopPK swimlane: analyst → supervisor → domain agents → tools → audit, with four review gates"
        />
      </motion.div>

      {/* Gate key */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.85 }}
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
          columnGap: 'var(--space-3)',
          padding: 'var(--space-3) 0',
          borderTop: '1px solid var(--cream-hairline)',
          borderBottom: '1px solid var(--cream-hairline)',
        }}
      >
        {GATES.map((g) => (
          <div
            key={g.num}
            style={{ display: 'flex', flexDirection: 'column', gap: 4 }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--sage)',
                fontWeight: 800,
              }}
            >
              Gate {g.num} · {g.name}
            </span>
            <span
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-meta)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              {g.desc}
            </span>
          </div>
        ))}
      </motion.div>

      {/* Bottom assertion */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 1.2 }}
        style={{ textAlign: 'center' }}
      >
        <p
          className="deck-display italic"
          style={{
            margin: 0,
            fontSize: 'var(--fs-card-quote)',
            fontWeight: 500,
            color: 'var(--cream)',
            lineHeight: 1.3,
          }}
        >
          4–8 weeks → 1–2 weeks. Every gate produces a record.{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'normal', fontWeight: 700 }}>
            The audit trail is the deliverable, not a side effect.
          </span>
        </p>
      </motion.div>
    </div>
  );
}
