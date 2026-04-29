// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 BACKUP · B1 · Optimal Design (D-optimality)
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · PopED workflow (Tessier / Riglet, Paris) · Mentré /
 * Bornkamp / Pinheiro methodology · FDA Type A briefing package.
 * RSE values are illustrative of the pattern; the underlying
 * quantitative analysis lives in the FDA Type A briefing materials.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const RSE_ROWS = [
  { n: 'N = 50', rse: '7.1%' },
  { n: 'N = 60', rse: '6.5%' },
  { n: 'N = 70', rse: '6.2%' },
  { n: 'N = 94', rse: '6.0%' },
];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const fdaCard = {
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
  color: 'var(--cream-muted)',
  lineHeight: 1.5,
};
const monoSpan = { fontFamily: 'var(--font-mono)', color: 'var(--case)' };
const hot = { color: 'var(--case)', fontWeight: 700 };

const cellHead = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--cream-faint)',
  textTransform: 'uppercase',
  fontWeight: 700,
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'left',
  borderBottom: '1px solid var(--cream-hairline)',
};
const cellData = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-subhead)',
  fontVariantNumeric: 'tabular-nums',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'left',
  borderBottom: '1px solid var(--cream-hairline)',
  color: 'var(--cream)',
};

export default function Cs3BackupB1OptimalDesign() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B1 · Methodology · Optimal design</Eyebrow>

      <Headline delay={0.25} maxChars={70}>
        Sample size anchored to{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>information</span>, not event count.
      </Headline>

      <Subhead delay={0.40}>
        D-optimality on PopED · pediatric informative prior carries the statistical weight.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            height: '100%',
            alignContent: 'start',
          }}
        >
          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <div style={titleStyle}>Framework</div>
            <ul style={{ ...bodyStyle, paddingLeft: 'var(--space-4)', margin: 0 }}>
              <li><strong style={hot}>D-optimality criterion</strong> · maximize det(Fisher Information Matrix)</li>
              <li>Tool · <span style={monoSpan}>PopED</span> (R package)</li>
              <li>Informative prior · pediatric PopPK (<span style={monoSpan}>AALL07P4 + DFCI 11-001</span>)</li>
              <li>Design variables · adult N, sampling schedule, cohort balance</li>
            </ul>
          </motion.div>

          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
          >
            <div style={titleStyle}>Target</div>
            <div style={bodyStyle}>
              Detect <strong style={hot}>±20% difference in CL/F</strong> between adult and pediatric
              populations — the scientifically meaningful threshold for dose decisions.
            </div>
          </motion.div>

          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
          >
            <div style={titleStyle}>Why D-optimality</div>
            <div style={bodyStyle}>
              Minimizes the joint confidence ellipsoid volume across all parameters simultaneously.
              Under an informative prior, D-optimality identifies designs where the marginal
              information gain from additional sampling is small — exactly the question driving
              sample-size reduction. Published methodology:{' '}
              <strong style={hot}>Mentré, Bornkamp, Pinheiro</strong> — ~2 decades of pharmacometrics literature.
            </div>
          </motion.div>

          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 1.00 }}
          >
            <div style={titleStyle}>Sample-size sensitivity (illustrative)</div>
            <div style={{ ...bodyStyle, fontStyle: 'italic', marginBottom: 'var(--space-2)' }}>
              RSE(CL/F) as a function of adult N given the pediatric informative prior. Curve
              flattens from approximately N = 50 upward — the pediatric prior carries the
              statistical weight.
            </div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={cellHead}>Adult N</th>
                  <th style={cellHead}>RSE (CL/F)</th>
                </tr>
              </thead>
              <tbody>
                {RSE_ROWS.map((r) => (
                  <tr key={r.n}>
                    <td style={cellData}>{r.n}</td>
                    <td style={cellData}>{r.rse}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div style={{ ...bodyStyle, fontStyle: 'italic', marginTop: 'var(--space-2)' }}>
              Marginal gain from N = 60 → N = 94: <strong style={hot}>0.5% RSE</strong>.
              Operationally indefensible cost for 34 additional patients.
            </div>
          </motion.div>

          <motion.div
            style={fdaCard}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 1.15 }}
          >
            <div style={titleStyle}>What FDA agreed to</div>
            <ul style={{ ...bodyStyle, color: 'var(--cream)', paddingLeft: 'var(--space-4)', margin: 0 }}>
              <li><strong style={hot}>N = 60</strong> adult sample size</li>
              <li>Optimal-design-based sample-size justification accepted</li>
              <li>Sensitivity analyses sufficient for methodology defense</li>
              <li>M&S required for Cohort 1/2 dose confirmation pre-Part 2</li>
            </ul>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS3 · Backup · Methodology"
        tagline="Specific RSE values illustrate the pattern; the quantitative analysis lives in the FDA Type A package."
        source="Source · PopED · Mentré / Bornkamp / Pinheiro · FDA Type A briefing package"
      />
    </SlideGrid>
  );
}
