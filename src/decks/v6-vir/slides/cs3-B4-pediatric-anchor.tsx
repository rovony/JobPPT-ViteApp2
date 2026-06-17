// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 BACKUP · B4 · Pediatric Anchor
 *
 * V6 Type 5 — Regulatory Precedent lane.
 *
 * Source · Calaspargase pegol (Asparlas) FDA approval 20 Dec 2018 ·
 * AALL07P4 (COG) and DFCI 11-001 (DFCI) pediatric ALL trial data.
 *
 * Defends "what gives you the right to use pediatric data as the prior
 * for adults?" with the FDA-reviewed, label-supporting Asparlas
 * pediatric PopPK as the regulatory anchor.
 *
 * Critical do-not-conflate note preserved verbatim: N=124 is the
 * pooled PopPK dataset; N=13 is the DFCI-only evaluable subset.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  borderLeft: '3px solid var(--case)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
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
  lineHeight: 1.5,
};
const monoSpan = { fontFamily: 'var(--font-mono)', color: 'var(--case)' };
const hot = { color: 'var(--case)', fontWeight: 700 };

export default function Cs3BackupB4PediatricAnchor() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B4 · Regulatory Precedent · Pediatric anchor</Eyebrow>

      <Headline delay={0.25} maxChars={80}>
        The pediatric PopPK carries the{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>statistical weight</span>.
        Adult data tests whether it transfers.
      </Headline>

      <Subhead delay={0.40}>
        Asparlas FDA approval Dec 2018 · AALL07P4 + DFCI 11-001 trial basis · n ≈ 124 pediatric.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto 1fr auto',
            gap: 'var(--space-3)',
            height: '100%',
          }}
        >
          {/* Trial basis */}
          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <div style={titleStyle}>Trial basis</div>
            <ul
              style={{
                ...bodyStyle,
                color: 'var(--cream-muted)',
                listStyle: 'none',
                padding: 0,
                margin: 0,
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'var(--space-3)',
              }}
            >
              <li><strong style={hot}>AALL07P4</strong> — Children's Oncology Group pediatric ALL study</li>
              <li><strong style={hot}>DFCI 11-001</strong> — Dana-Farber Cancer Institute pediatric ALL study</li>
              <li>Combined <span style={monoSpan}>n ≈ 124</span> pediatric patients · ages 1 month to 21 years</li>
            </ul>
          </motion.div>

          {/* Regulatory basis */}
          <motion.div
            style={cardStyle}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
          >
            <div style={titleStyle}>Regulatory basis</div>
            <div style={{ ...bodyStyle, color: 'var(--cream-muted)' }}>
              The pediatric PopPK model derived from these studies was the basis for the FDA pediatric
              approval of calaspargase pegol (<strong style={hot}>Asparlas</strong>) on{' '}
              <span style={monoSpan}>20 December 2018</span>. The model is FDA-reviewed,
              label-supporting, peer-validated. Dose:{' '}
              <span style={monoSpan}>2,500 U/m² IV q21d</span>. Pediatric evidence:{' '}
              <span style={monoSpan}>99% (123/124, 95% CI 96–100%)</span> maintained NSAA ≥ 0.1 U/mL
              at weeks 6–30 after last dose.
            </div>
          </motion.div>

          {/* Three-column: what transfers / adult tests / what would break */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              minHeight: 0,
            }}
          >
            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
            >
              <div style={titleStyle}>What transfers</div>
              <ul style={{ ...bodyStyle, color: 'var(--cream-muted)', paddingLeft: 'var(--space-4)', margin: 0 }}>
                <li>Model structure (one- or two-compartment choice, elimination form)</li>
                <li>IIV structure (which parameters vary across individuals)</li>
                <li>Residual variability pattern</li>
                <li>Covariate selection framework</li>
              </ul>
            </motion.div>

            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.00 }}
            >
              <div style={titleStyle}>What the adult data test</div>
              <ul style={{ ...bodyStyle, color: 'var(--cream-muted)', paddingLeft: 'var(--space-4)', margin: 0 }}>
                <li>Whether adult PAA observations fall within the pediatric model's prediction intervals (external VPC)</li>
                <li>Whether any adult-specific covariate effects emerge</li>
                <li>Whether structural parameters need adult-specific values</li>
                <li>Part-1 run-in data showed <strong style={hot}>no structural extrapolation failure</strong></li>
              </ul>
            </motion.div>

            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.15 }}
            >
              <div style={titleStyle}>What would break the transfer</div>
              <div style={{ ...bodyStyle, color: 'var(--cream-muted)' }}>
                A structural extrapolation failure — adult PAA observations systematically falling
                outside the pediatric model's prediction intervals — would have required
                re-estimation or design revision.
              </div>
              <div
                style={{
                  marginTop: 'var(--space-2)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case)',
                  textTransform: 'uppercase',
                  fontWeight: 700,
                }}
              >
                Falsifiable test · It did not fail.
              </div>
            </motion.div>
          </div>

          {/* Critical note */}
          <motion.div
            style={{
              padding: 'var(--space-3) var(--space-4)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontSize: 'var(--fs-slide-subhead)',
              color: 'var(--cream-muted)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 1.30 }}
          >
            <strong style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>
              Do not conflate:
            </strong>{' '}
            <span style={monoSpan}>N = 124</span> is the pooled PopPK dataset ·{' '}
            <span style={monoSpan}>N = 13</span> is the DFCI-only evaluable subset for the pediatric primary endpoint.
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS3 · Backup · Regulatory Precedent"
        tagline="The pediatric model is the prior. The adult data is the falsifiable test."
        source="Source · Asparlas FDA approval 20 Dec 2018 · AALL07P4 (COG) · DFCI 11-001 (DFCI)"
      />
    </SlideGrid>
  );
}
