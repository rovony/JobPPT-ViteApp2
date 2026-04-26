// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B17 · Covariate Analysis
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Okour et al. J Clin Pharmacol 2023 · doi:10.1002/jcph.2199.
 *
 * Defends "what about covariate X?" — full-model with backward
 * deletion at ΔOFV > 10.83 (χ², df=1, p<0.001). Final model = base
 * + allometric body-weight scaling only. Parsimony, not omission.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const COV_ROWS_CL = [
  'Bilirubin', 'ALT', 'AST', 'Alkaline phosphatase', 'GGT',
  'Creatinine clearance', 'Age', 'Sex', 'Race (White / E. Asian / Other)',
  'Ethnicity', 'Dose group (categorical)',
];
const COV_ROWS_VC = ['Bilirubin', 'Alkaline phosphatase', 'Creatinine clearance'];
const COV_ROWS_TLAG = ['Dose (low / high)'];

const cellHead = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--cream-faint)',
  textTransform: 'uppercase',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'left',
  borderBottom: '1px solid var(--cream-hairline)',
  fontWeight: 700,
};
const sectRow = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  padding: 'var(--space-2) var(--space-3)',
  borderBottom: '1px solid color-mix(in srgb, var(--case) 28%, transparent)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
  fontWeight: 700,
};
const cellLabel = {
  fontFamily: 'var(--font-body)',
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  padding: 'var(--space-2) var(--space-3)',
  borderBottom: '1px solid var(--cream-hairline)',
};
const cellOut = {
  ...cellLabel,
  color: 'var(--cream-muted)',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  textTransform: 'uppercase',
  letterSpacing: 'var(--ls-mono-wide)',
};

const noteCardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const noteTitle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};
const noteBody = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.55,
};
const monoSpan = { fontFamily: 'var(--font-mono)', color: 'var(--case)' };

export default function Cs1BackupB17CovariateAnalysis() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B17 · Methodology · Covariate analysis</Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        Covariates tested — none retained.{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          Parsimony, not omission.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Final covariate model = base model with allometric body-weight scaling only.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)',
            gap: 'var(--space-5)',
            height: '100%',
          }}
        >
          {/* Left · covariate table */}
          <motion.div
            style={{ ...noteCardStyle, overflow: 'auto' }}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <div style={noteTitle}>Covariates tested · outcomes</div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={cellHead}>Covariate</th>
                  <th style={cellHead}>Parameter</th>
                  <th style={cellHead}>Outcome</th>
                </tr>
              </thead>
              <tbody>
                <tr><td colSpan={3} style={sectRow}>Tested on CL/F</td></tr>
                {COV_ROWS_CL.map((c) => (
                  <tr key={c}>
                    <td style={cellLabel}>{c}</td>
                    <td style={{ ...cellLabel, fontFamily: 'var(--font-mono)' }}>CL/F</td>
                    <td style={cellOut}>Not significant</td>
                  </tr>
                ))}
                <tr><td colSpan={3} style={sectRow}>Tested on Vc/F</td></tr>
                {COV_ROWS_VC.map((c) => (
                  <tr key={c}>
                    <td style={cellLabel}>{c}</td>
                    <td style={{ ...cellLabel, fontFamily: 'var(--font-mono)' }}>Vc/F</td>
                    <td style={cellOut}>Not significant</td>
                  </tr>
                ))}
                <tr><td colSpan={3} style={sectRow}>Tested on t_lag</td></tr>
                {COV_ROWS_TLAG.map((c) => (
                  <tr key={c}>
                    <td style={cellLabel}>{c}</td>
                    <td style={{ ...cellLabel, fontFamily: 'var(--font-mono)' }}>t_lag</td>
                    <td style={cellOut}>Not significant</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </motion.div>

          {/* Right · methodology + parsimony notes */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
            >
              <div style={noteTitle}>Method</div>
              <div style={noteBody}>
                <strong style={{ color: 'var(--cream)' }}>Full-model approach</strong> with{' '}
                <strong style={{ color: 'var(--cream)' }}>backward deletion</strong> — all
                covariates entered simultaneously, then removed one at a time.<br />
                Retention threshold: <span style={monoSpan}>ΔOFV {'>'} 10.83</span> (χ², df=1,{' '}
                <strong style={{ color: 'var(--cream)' }}>p {'<'} 0.001</strong>).<br />
                <strong style={{ color: 'var(--cream)' }}>Why p {'<'} 0.001?</strong> Stringent
                threshold controls{' '}
                <strong style={{ color: 'var(--cream)' }}>type-I error inflation</strong> and{' '}
                <strong style={{ color: 'var(--cream)' }}>winner's-curse</strong> effects in a
                39-patient dataset.
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
            >
              <div style={noteTitle}>Why parsimony strengthens the model</div>
              <div style={noteBody}>
                In a <strong style={{ color: 'var(--cream)' }}>39-patient</strong> pediatric dataset
                where <strong style={{ color: 'var(--cream)' }}>body weight dominates</strong>{' '}
                between-subject variability, allometric scaling absorbs variance that would
                otherwise be attributed to age, organ function, or demographics. Retaining weak
                covariates would have{' '}
                <strong style={{ color: 'var(--cream)' }}>added parameter uncertainty without improving exposure inference.</strong>
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.00 }}
            >
              <div style={noteTitle}>Age range supports this</div>
              <div style={noteBody}>
                Enrolled <strong style={{ color: 'var(--cream)' }}>ages 8–17</strong>. Metabolic
                pathway maturation:
                <ul style={{ margin: 'var(--space-2) 0 0 var(--space-4)', padding: 0 }}>
                  <li>UGT1A9, UGT2B7 — near-adult activity by <strong style={{ color: 'var(--cream)' }}>~2–3 years</strong></li>
                  <li>CYP3A4 — adult activity by <strong style={{ color: 'var(--cream)' }}>~1 year</strong></li>
                </ul>
                All metabolic pathways at or near adult maturity in this age band →{' '}
                <strong style={{ color: 'var(--cream)' }}>weight-based allometric scaling is mechanistically sufficient.</strong>
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CS1 · Backup · Methodology"
        tagline="The covariates that didn't make the cut — and why that's the right answer."
        source="Source · Okour et al. J Clin Pharmacol 2023 · doi:10.1002/jcph.2199"
      />
    </SlideGrid>
  );
}
