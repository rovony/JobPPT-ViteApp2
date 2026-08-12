// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 BACKUP · B2 · Six-Pillar Package
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Tsilimigras Ann Surg Oncol 2024 · Suryavanshi 2025 ·
 * Jiang CTS 2021 · Yue EJCP 2024.
 *
 * Defends "what was actually in the regulatory architecture?" with the
 * six convergent evidence pillars that anchored the CDSCO Phase 3 +
 * PK-PD waiver.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const PILLARS = [
  { n: '1', title: 'Global PK Equivalence', items: [
    'Cross-region PopPK analyses from pivotal studies',
    'Exposure comparisons across approved populations',
    'No evidence of region-specific PK shifts',
  ]},
  { n: '2', title: 'IDH1 R132 Mutation Biology', items: [
    'Acquired, tumor-localized somatic mutation',
    '~99% at R132 hotspot (exon 4)',
    'Mutation biology independent of ethnicity (Tsilimigras 2024 · Suryavanshi 2025)',
  ]},
  { n: '3', title: 'PopPK Race Insensitivity', items: [
    'Jiang et al. CTS 2021 · race NOT correlated with CL/F (n = 253)',
    'Yue et al. EJCP 2024 · Chinese-specific PK confirms safe/effective dosing',
    'No race covariate retained in either analysis',
  ]},
  { n: '4', title: 'Metabolism + DDI', items: [
    'CYP3A4 primary metabolic pathway',
    'UGT1A1 polymorphism analysis across populations',
    'Indian-population DME allele frequency review',
  ]},
  { n: '5', title: 'Exposure–Response Consistency', items: [
    'E-safety and E-efficacy profiles from pivotal studies',
    'No race covariate in E–R models',
    'Consistent exposure–benefit relationship across regions',
  ]},
  { n: '6', title: 'Regulatory Precedent', items: [
    '42+ international approvals at time of CDSCO submission',
    'FDA, EMA, PMDA label alignment',
    'Rare-disease framework precedents',
  ]},
];

const pillarCard = {
  border: '1px solid var(--cream-hairline)',
  borderLeft: '3px solid var(--case)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0,
};

const labelStyle = {
  display: 'flex',
  alignItems: 'baseline',
  gap: 'var(--space-2)',
  marginBottom: 'var(--space-2)',
};
const numStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-headline)',
  color: 'var(--case)',
  fontWeight: 700,
  lineHeight: 1,
};
const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--fs-slide-subhead)',
  fontWeight: 700,
  color: 'var(--cream)',
  lineHeight: 1.25,
};
const listStyle = {
  listStyle: 'none',
  padding: 0,
  margin: 0,
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.45,
};
const liStyle = {
  position: 'relative',
  paddingLeft: 'var(--space-3)',
  marginBottom: 'var(--space-1)',
};

export default function Cs2BackupB2SixPillarPackage() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B2 · Methodology · Six-Pillar Package</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Tibsovo India —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          the full regulatory architecture.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Each pillar an independent evidence stream. Convergence across all six is what made the waiver defensible.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            height: '100%',
            alignContent: 'start',
          }}
        >
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.n}
              style={pillarCard}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.55 + i * 0.08 }}
            >
              <div style={labelStyle}>
                <span style={numStyle}>{p.n}</span>
                <span style={titleStyle}>{p.title}</span>
              </div>
              <ul style={listStyle}>
                {p.items.map((it, j) => (
                  <li key={j} style={liStyle}>
                    <span style={{ position: 'absolute', left: 0, top: 0, color: 'var(--case)', fontWeight: 700 }}>·</span>
                    {it}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        kicker="CS2 · Backup · Methodology"
        tagline="Six independent evidence streams. Convergence is the architecture."
        source="Source · Tsilimigras ASO 2024 · Suryavanshi 2025 · Jiang CTS 2021 · Yue EJCP 2024"
      />
    </SlideGrid>
  );
}
