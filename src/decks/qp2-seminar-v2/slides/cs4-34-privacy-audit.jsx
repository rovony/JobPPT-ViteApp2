import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PrivacyAuditSvg from './cs4-shared/privacy-audit.svg?react';

/**
 * CS4 · S34 PRIVACY + AUDIT — architectural and cryptographic.
 *
 * Privacy: SchemaExtractor strips datasets to metadata before any LLM
 *          interaction — patient data physically cannot reach the model.
 *          Structural, not contractual.
 * Audit:   Hash chain. Each entry includes hash of previous. Modification
 *          of any past entry breaks all subsequent hashes. Tamper-evident
 *          by construction. Replayable in 2034 from 2026.
 *
 * Compliance band maps each architectural feature to standards the
 * pharma audience already operates under (21 CFR Part 11, ICH E6 R2,
 * ICH M15, HIPAA / GDPR).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const COMPLIANCE = [
  { standard: '21 CFR Part 11', requirement: 'Audit trail for electronic records', satisfied: 'Hash-chain audit · immutable · replayable' },
  { standard: 'ICH E6(R2) GCP',  requirement: 'Data integrity (ALCOA+)',          satisfied: 'Schema-only privacy + deterministic tools' },
  { standard: 'ICH M15',         requirement: 'MIDD documentation standards',    satisfied: 'Native generation of M15-aligned packages' },
  { standard: 'HIPAA / GDPR',    requirement: 'No PHI to third parties',         satisfied: 'Schema-only privacy boundary' },
];

export default function Slide34Cs4PrivacyAudit() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrowColor="var(--sage)"
      eyebrow="CS4 · Privacy + audit — by construction"
      headline={
        <>
          Privacy is{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            architectural, not contractual.
          </span>{' '}
          Audit is{' '}
          <span style={{ color: 'var(--sage)', fontStyle: 'italic', fontWeight: 700 }}>
            cryptographic, not documentary.
          </span>
        </>
      }
      headlineMaxChars={160}
      subhead="SchemaExtractor strips datasets to metadata before LLM context · hash chain makes every analysis replayable from 2026 in 2034."
      subheadMaxChars={140}
      footerKicker="Case 04 · Privacy + audit"
      footerSource="Source · PharmAgent architecture overview · 21 CFR Part 11 · ICH E6(R2) ALCOA+ · ICH M15"
    >
      <PrivacyAuditLayout compliance={COMPLIANCE} />
    </SlideFrame>
  );
}

function PrivacyAuditLayout({ compliance }) {
  const reduced = useReducedMotion();
  const initial = reduced ? false : undefined;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateRows: '1fr auto',
        rowGap: 'var(--space-4)',
        minHeight: 0,
      }}
    >
      {/* Diagram */}
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
        <PrivacyAuditSvg
          style={{ width: '100%', height: '100%', maxHeight: 480 }}
          preserveAspectRatio="xMidYMid meet"
          aria-label="Privacy: SchemaExtractor strips datasets to metadata before LLM. Audit: hash chain links every tool call."
        />
      </motion.div>

      {/* Compliance band */}
      <motion.div
        initial={initial ?? { opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, ease: EASE, delay: 0.95 }}
        style={{
          padding: 'var(--space-3) var(--space-4)',
          borderTop: '2px solid var(--sage)',
          background: 'rgba(107, 142, 115, 0.04)',
        }}
      >
        <span
          className="deck-mono uppercase"
          style={{
            display: 'block',
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--sage)',
            fontWeight: 800,
            marginBottom: 'var(--space-2)',
          }}
        >
          The architecture aligns with — and goes beyond — typical pharma compliance asks
        </span>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'auto auto 1fr',
            columnGap: 'var(--space-5)',
            rowGap: 6,
            fontFamily: 'var(--font-body)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream)',
            alignItems: 'baseline',
          }}
        >
          {compliance.map((c) => (
            <React.Fragment key={c.standard}>
              <span
                className="deck-mono"
                style={{
                  fontSize: 'var(--fs-card-meta)',
                  color: 'var(--sage)',
                  fontWeight: 700,
                  letterSpacing: '0.06em',
                }}
              >
                {c.standard}
              </span>
              <span style={{ color: 'var(--cream-muted)' }}>{c.requirement}</span>
              <span style={{ color: 'var(--cream)' }}>→ {c.satisfied}</span>
            </React.Fragment>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
