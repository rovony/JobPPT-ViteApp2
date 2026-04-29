// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 BACKUP · B3 · Trial Status
 *
 * V6 Type 4 — Risk Mitigation lane.
 *
 * Source · ClinicalTrials.gov NCT04817761 (last updated Feb 2026) ·
 * FDA Type A meeting record.
 *
 * Defends "your trial terminated, doesn't that invalidate it?" with
 * the public-record framing: terminated on a sponsor decision —
 * NOT a scientific failure, NOT a regulatory rejection, NOT a
 * safety signal. The methodological precedent is durable.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const STATUS = [
  ['Trial status',          'Terminated'],
  ['Actual enrollment',     '42 patients (vs. planned 60)'],
  ['Reason for termination','Sponsor decision'],
  ['Source',                'ClinicalTrials.gov · last updated Feb 2026'],
];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const durableCard = {
  ...cardStyle,
  borderLeft: '3px solid var(--case)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
};
const titleStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};
const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  lineHeight: 1.55,
};
const monoSpan = { fontFamily: 'var(--font-mono)', color: 'var(--case)' };
const hot = { color: 'var(--case)', fontWeight: 700 };

export default function Cs3BackupB3TrialStatus() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B3 · Risk Mitigation · Trial status</Eyebrow>

      <Headline delay={0.25} maxChars={70}>
        SPARK-ALL ended early.{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          The methodological precedent didn't.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        NCT04817761 · Phase 2/3 · adult Philadelphia-negative ALL · status as of Feb 2026.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto auto',
            gap: 'var(--space-3)',
            height: '100%',
          }}
        >
          {/* Trial registration + status */}
          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <div style={titleStyle}>Trial registration</div>
            <div style={{ ...bodyStyle, marginBottom: 'var(--space-3)' }}>
              <span style={monoSpan}>SPARK-ALL</span> · <span style={monoSpan}>NCT04817761</span> ·
              Phase 2/3 · adult Philadelphia-negative ALL
            </div>

            <div style={titleStyle}>Status as of Feb 2026</div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <tbody>
                {STATUS.map(([k, v]) => (
                  <tr key={k}>
                    <td
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderBottom: '1px solid var(--cream-hairline)',
                        color: 'var(--cream-muted)',
                        fontSize: 'var(--fs-slide-subhead)',
                        width: '38%',
                      }}
                    >
                      {k}
                    </td>
                    <td
                      style={{
                        padding: 'var(--space-2) var(--space-3)',
                        borderBottom: '1px solid var(--cream-hairline)',
                        color: 'var(--cream)',
                        fontFamily: 'var(--font-mono)',
                        fontSize: 'var(--fs-slide-subhead)',
                        fontVariantNumeric: 'tabular-nums',
                      }}
                    >
                      {v}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* What this is and isn't */}
          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
          >
            <div style={titleStyle}>What this is — and isn't</div>
            <div style={bodyStyle}>
              This is <strong style={{ color: 'var(--cream)' }}>not a scientific-failure termination.</strong>
              {' '}This is <strong style={{ color: 'var(--cream)' }}>not a regulatory-rejection termination.</strong>
              {' '}This is <strong style={{ color: 'var(--cream)' }}>not a safety-signal termination.</strong>
              {' '}The public record describes the termination as a{' '}
              <strong style={hot}>sponsor decision</strong> — a portfolio-level choice independent
              of design quality or regulatory trajectory.
            </div>
          </motion.div>

          {/* Durable artifact */}
          <motion.div
            style={durableCard}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
          >
            <div style={titleStyle}>The durable artifact</div>
            <ul style={{ ...bodyStyle, paddingLeft: 'var(--space-4)', margin: 0 }}>
              <li>FDA's agreement to the <strong style={hot}>optimal-design + simulated-endpoint methodology</strong> is documented in the Type A meeting record</li>
              <li>That agreement is <strong style={hot}>not contingent on trial completion or outcome</strong></li>
              <li>The methodology transfers to programs meeting the same structural conditions, independent of any single program's fate</li>
            </ul>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS3 · Backup · Risk Mitigation"
        tagline="On SPARK-ALL specifics: clin-pharm strategy + FDA engagement in scope; trial-operational decisions appropriately out of scope."
        source="Source · ClinicalTrials.gov NCT04817761 (Feb 2026) · FDA Type A meeting record"
      />
    </SlideGrid>
  );
}
