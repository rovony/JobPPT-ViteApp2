// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B18 · Weight-band Exposure Matching
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Okour et al. J Clin Pharmacol 2023 · Table S5, Figure 5 ·
 * EMA CHMP positive opinion 22 Jul 2021 (EMA/CHMP/398036/2021) ·
 * EC marketing-authorisation variation Sept 2021 (Assessment Report
 * EMA/CHMP/476747/2021, published 28 Sept 2021).
 *
 * Defends the headline "within ~3% of adult AUC" with the actual
 * weight-banded geometric-mean AUC_ss / Cmax,ss values from Table S5,
 * the outlier explanation for the 35–<50 kg low-dose subgroup
 * (n=8, +29% vs adult — sampling artifact), and the regulatory
 * outcome that closed the loop.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const ROWS = [
  { kind: 'adult',   group: 'Adult',     dose: '5 mg (low)',  band: '—',                auc: '4.98 (4.68–5.29)',  cmax: '469 (447–493)' },
  { kind: 'adult',   group: 'Adult',     dose: '10 mg (high)',band: '—',                auc: '9.12 (8.30–10.0)',  cmax: '830 (757–909)' },
  { kind: 'pedall',  group: 'Pediatric', dose: 'Low (all)',   band: 'all bands',        auc: '4.82 (4.14–5.61)',  cmax: '519 (458–589)' },
  { kind: 'pedall',  group: 'Pediatric', dose: 'High (all)',  band: 'all bands',        auc: '9.15 (8.41–9.96)',  cmax: '981 (894–1080)' },
  { kind: 'ped',     group: 'Pediatric', dose: 'Low',         band: '≥20 to <35 kg',   auc: '4.03 (3.48–4.68)',  cmax: '478 (401–568)' },
  { kind: 'flag',    group: 'Pediatric', dose: 'Low',         band: '≥35 to <50 kg',   auc: '6.42 (5.09–8.11)',  cmax: '516 (408–651)' },
  { kind: 'ped',     group: 'Pediatric', dose: 'Low',         band: '≥50 kg',           auc: '3.87 (2.73–5.48)',  cmax: '624 (369–1060)' },
  { kind: 'ped',     group: 'Pediatric', dose: 'High',        band: '≥20 to <35 kg',   auc: '8.73 (7.75–9.83)',  cmax: '953 (850–1070)' },
  { kind: 'ped',     group: 'Pediatric', dose: 'High',        band: '≥35 to <50 kg',   auc: '8.70 (7.62–9.92)',  cmax: '1100 (679–1790)' },
  { kind: 'ped',     group: 'Pediatric', dose: 'High',        band: '≥50 kg',           auc: '10.2 (8.04–12.8)',  cmax: '948 (791–1140)' },
];

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
const baseCell = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-subhead)',
  fontVariantNumeric: 'tabular-nums',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'right',
  borderBottom: '1px solid var(--cream-hairline)',
  color: 'var(--cream)',
};
const cellLabel = { ...baseCell, textAlign: 'left', fontFamily: 'var(--font-body)', fontWeight: 500 };

const rowBg = (kind) => {
  if (kind === 'adult') return 'color-mix(in srgb, var(--cream) 4%, transparent)';
  if (kind === 'pedall') return 'color-mix(in srgb, var(--case) 8%, transparent)';
  if (kind === 'flag') return 'color-mix(in srgb, var(--amber) 14%, transparent)';
  return 'transparent';
};

const noteCardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
};
const noteCardKey = {
  ...noteCardStyle,
  border: '1.5px solid var(--case)',
  borderLeft: '4px solid var(--case)',
  background: 'color-mix(in srgb, var(--case) 6%, transparent)',
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

export default function Cs1BackupB18ExposureMatching() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B18 · Methodology · Exposure matching</Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Pediatric AUC<sub>ss</sub> matched adult target{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          within ~3% at weight-based doses.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Table S5 · model-derived steady-state exposures (geometric mean, 95% CI).
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
            gap: 'var(--space-5)',
            height: '100%',
          }}
        >
          {/* Left · exposure table */}
          <motion.div
            style={{ ...noteCardStyle, overflow: 'auto' }}
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 0.55 }}
          >
            <div style={noteTitle}>Table S5 · AUC<sub>ss</sub> (μg·hr/mL) · C<sub>max,ss</sub> (ng/mL)</div>
            <table style={{ borderCollapse: 'collapse', width: '100%' }}>
              <thead>
                <tr>
                  <th style={cellHeaderL}>Group</th>
                  <th style={cellHeaderL}>Dose</th>
                  <th style={cellHeaderL}>Weight band</th>
                  <th style={cellHeader}>AUC<sub>ss</sub> (95% CI)</th>
                  <th style={cellHeader}>C<sub>max,ss</sub> (95% CI)</th>
                </tr>
              </thead>
              <tbody>
                {ROWS.map((r, i) => (
                  <tr key={i} style={{ background: rowBg(r.kind) }}>
                    <td style={cellLabel}>{r.group}</td>
                    <td style={{ ...cellLabel, fontFamily: 'var(--font-mono)', color: 'var(--cream-muted)' }}>{r.dose}</td>
                    <td style={{ ...cellLabel, fontFamily: 'var(--font-mono)', color: 'var(--cream-muted)' }}>{r.band}</td>
                    <td style={r.kind === 'flag' ? { ...baseCell, color: 'var(--amber)', fontWeight: 700 } : baseCell}>{r.auc}</td>
                    <td style={baseCell}>{r.cmax}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div
              style={{
                marginTop: 'var(--space-2)',
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
              }}
            >
              Pediatric = aged 8 to {'<'}18 years. 95% CI based on percentiles of the sampling distribution.
            </div>
          </motion.div>

          {/* Right · key finding + outlier note + outcome */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <motion.div
              style={noteCardKey}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
            >
              <div style={noteTitle}>Key finding</div>
              <div style={{ ...noteBody, color: 'var(--cream)' }}>
                AUC<sub>ss</sub> bridging confirmed: pediatric low-dose{' '}
                <strong>~3% lower</strong> than adult 5 mg QD; pediatric high-dose{' '}
                <strong>essentially identical</strong> to adult 10 mg QD. Geometric-mean
                C<sub>max,ss</sub> was <strong>11% higher</strong> (low dose) and{' '}
                <strong>18% higher</strong> (high dose) vs adults — not considered clinically
                relevant; no association between predicted AUC<sub>ss</sub> and incidence of
                ambrisentan-related AEs (Figure 5).
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.85 }}
            >
              <div style={noteTitle}>Outlier · ≥35 to {'<'}50 kg low-dose</div>
              <div style={noteBody}>
                Geometric-mean AUC<sub>ss</sub>{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)' }}>29% higher</span>{' '}
                than adult 5 mg QD. Explanation: patients in both ≥35–{'<'}50 kg and ≥50 kg bands
                received the same 5 mg dose — relatively higher exposure in the lighter subgroup.{' '}
                <strong style={{ color: 'var(--cream)' }}>N = 8</strong>; interpret with caution.
                Individual AUC<sub>ss</sub> values remained within the adult model-predicted range.
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 1.00 }}
            >
              <div style={noteTitle}>Regulatory outcome</div>
              <div style={noteBody}>
                <strong style={{ color: 'var(--cream)' }}>EMA (Volibris variation X-0061-G):</strong>{' '}
                pediatric indication approved ages 8–17 with weight-based dosing.{' '}
                <strong style={{ color: 'var(--cream)' }}>CHMP positive opinion 22 Jul 2021</strong>{' '}
                (EMA/CHMP/398036/2021);{' '}
                <strong style={{ color: 'var(--cream)' }}>EC variation Sept 2021</strong>{' '}
                (EMA/CHMP/476747/2021). Independent cohort{' '}
                <strong style={{ color: 'var(--cream)' }}>Takatsuki et al. N=38</strong>{' '}
                (ages 3–15) confirmed similar PK to adults — external validation.
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CS1 · Backup · Methodology"
        tagline="The number that closed the loop: ~3%."
        source="Source · Okour et al. J Clin Pharmacol 2023 · Table S5, Figure 5 · EMA/CHMP/398036/2021 · EMA/CHMP/476747/2021"
      />
    </SlideGrid>
  );
}
