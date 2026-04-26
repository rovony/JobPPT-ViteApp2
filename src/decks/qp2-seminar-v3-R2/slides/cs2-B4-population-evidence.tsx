// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 BACKUP · B4 · Population Evidence
 *
 * V6 Type 3 — Data Cuts lane.
 *
 * Source · Tsilimigras D et al. Ann Surg Oncol 2024 · Suryavanshi M et al. 2025 ·
 * Dai D et al. Eur J Clin Pharmacol 2019 · Jiang B et al. CTS 2021 ·
 * Yue Y et al. EJCP 2024.
 *
 * Defends ethnic-evidence base for the CDSCO waiver — IDH1 prevalence
 * across populations + DME polymorphism frequencies.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const cellHeader = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--cream-faint)',
  textTransform: 'uppercase',
  fontWeight: 700,
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'right',
  borderBottom: '1px solid var(--cream-hairline)',
};
const cellHeaderL = { ...cellHeader, textAlign: 'left' };
const cellNum = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-subhead)',
  fontVariantNumeric: 'tabular-nums',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'right',
  borderBottom: '1px solid var(--cream-hairline)',
  color: 'var(--case)',
};
const cellLabel = {
  ...cellNum,
  textAlign: 'left',
  color: 'var(--cream)',
  fontFamily: 'var(--font-body)',
};

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
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
const noteBody = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.5,
};

export default function Cs2BackupB4PopulationEvidence() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B4 · Data Cuts · Population evidence</Eyebrow>

      <Headline delay={0.25} maxChars={60}>
        IDH1 prevalence and DME polymorphisms —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          the ethnic-evidence base.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Cross-regional prevalence + Indian-specific cohort + UGT1A1 / CYP3A4 frequencies — defends Pillar 3.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: '1fr auto',
            gap: 'var(--space-3)',
            height: '100%',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              minHeight: 0,
            }}
          >
            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
            >
              <div style={titleStyle}>Cross-regional IDH1 in iCCA · Tsilimigras ASO 2024 · n = 1,068</div>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={cellHeaderL}>Population</th>
                    <th style={cellHeader}>IDH1 mutation prevalence</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={cellLabel}>White</td><td style={cellNum}>20.8%</td></tr>
                  <tr><td style={cellLabel}>Black</td><td style={cellNum}>5.6%</td></tr>
                </tbody>
              </table>
              <div style={{ ...titleStyle, marginTop: 'var(--space-3)' }}>Indian-specific · Suryavanshi 2025 · n = 147</div>
              <div style={noteBody}>
                Indian cholangiocarcinoma cohort: IDH1 prevalence{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)' }}>~9.5%</span>.
                Supports unmet need characterization for the Indian patient population.
              </div>
            </motion.div>

            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
            >
              <div style={titleStyle}>UGT1A1 + CYP3A4 · Dai EJCP 2019</div>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={cellHeaderL}>Variant</th>
                    <th style={cellHeader}>East Asian</th>
                    <th style={cellHeader}>Caucasian</th>
                  </tr>
                </thead>
                <tbody>
                  <tr><td style={cellLabel}>UGT1A1 *6 (reduced function)</td><td style={cellNum}>14.6%</td><td style={cellNum}>0.8%</td></tr>
                  <tr><td style={cellLabel}>UGT1A1 *28</td><td style={{ ...cellNum, color: 'var(--cream-muted)' }}>lower</td><td style={{ ...cellNum, color: 'var(--cream-muted)' }}>higher</td></tr>
                  <tr><td style={cellLabel}>CYP3A4 poor metabolizer</td><td style={cellNum}>~1%</td><td style={cellNum}>~0%</td></tr>
                  <tr><td style={cellLabel}>CYP3A4 *1G (Chinese/Japanese)</td><td style={{ ...cellNum, color: 'var(--cream-muted)' }}>common</td><td style={{ ...cellNum, color: 'var(--cream-muted)' }}>rare</td></tr>
                </tbody>
              </table>
            </motion.div>
          </div>

          <motion.div
            style={{
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'var(--space-3)',
            }}
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE, delay: 0.95 }}
          >
            <div style={titleStyle}>Interpretation for ivosidenib</div>
            <div style={{ ...noteBody, maxWidth: '90ch' }}>
              Ivosidenib is primarily CYP3A4-metabolized. DME polymorphism frequencies differ
              modestly between populations; the clinical impact on ivosidenib disposition is bounded.{' '}
              <strong style={{ color: 'var(--cream)' }}>No population-specific dose adjustment is indicated by the evidence</strong>{' '}
              — confirmed by PopPK analyses on Jiang 2021 and Yue 2024 cohorts.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS2 · Backup · Data Cuts"
        tagline="Modest population differences. Bounded clinical impact. No dose change."
        source="Source · Tsilimigras ASO 2024 · Suryavanshi 2025 · Dai EJCP 2019 · Jiang CTS 2021 · Yue EJCP 2024"
      />
    </SlideGrid>
  );
}
