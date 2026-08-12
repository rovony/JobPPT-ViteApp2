// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 BACKUP · B15 · PopPK Parameter Estimates
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · Okour et al. J Clin Pharmacol 2023; 63(5): 593–603 ·
 * Table S3 · doi:10.1002/jcph.2199. All numbers verbatim from the
 * primary source (per V6 §🔍 Verification protocol Tier 1).
 *
 * Ported from HTML deck (Slides-Backup/37-cs1-backup-poppk-parameters.html)
 * 2026-04-26 — re-authored against SlideGrid + fluid tokens per
 * merck-deck/CLAUDE.md Slide Responsiveness Contract; structural data
 * (parameter table, IIV, %RSE, shrinkage) preserved verbatim.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const PARAM_ROWS = [
  { p: 'CL/F (L/hr)',          ped: '1.17',         pedRSE: '6.33',  pedIIV: '21.8', pedShr: '19.0%', adult: '1.56',  adultIIV: '32.1' },
  { p: 'Vc/F (L)',             ped: '12.3',         pedRSE: '16.1',  pedIIV: '94.1', pedShr: '16.5%', adult: '9.52',  adultIIV: '20.5' },
  { p: 'Q/F (L/hr)',           ped: '0.457',        pedRSE: '21.1',  pedIIV: '42.5', pedShr: '29.6%', adult: '0.928', adultIIV: '—'    },
  { p: 'Vp/F (L)',             ped: '81.3',         pedRSE: '24.5',  pedIIV: '33.2', pedShr: '86.1%', adult: '8.51',  adultIIV: '25.3' },
  { p: 'Ka (1/hr)',            ped: '2.46',         pedRSE: '25.7',  pedIIV: '133',  pedShr: '25.9%', adult: '1.72',  adultIIV: '82.6' },
  { p: 't_lag (hr)',           ped: '0.525 FIXED',  pedRSE: '14.7',  pedIIV: '31.2', pedShr: '26.4%', adult: '0.423', adultIIV: '0.036'},
  { p: 'CL/F ~ WT exponent',   ped: '0.75 FIXED',   pedRSE: '—',     pedIIV: '—',    pedShr: '—',     adult: '0 FIXED', adultIIV: '—'  },
  { p: 'Vc/F ~ WT exponent',   ped: '1.0 FIXED',    pedRSE: '—',     pedIIV: '—',    pedShr: '—',     adult: '0.740', adultIIV: '—'    },
  { p: 'Prop. residual (CV%)', ped: '0.210',        pedRSE: '14.2',  pedIIV: '45.8', pedShr: '—',     adult: '5.89 (RSE 27.6)', adultIIV: '—' },
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

const cellData = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  fontVariantNumeric: 'tabular-nums',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'right',
  borderBottom: '1px solid var(--cream-hairline)',
};

const cellLabel = {
  ...cellData,
  textAlign: 'left',
  color: 'var(--cream)',
  fontFamily: 'var(--font-body)',
  fontWeight: 500,
};

const noteCardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
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

export default function Cs1BackupB15PopPkParameters() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B15 · Methodology · PopPK parameters</Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        Final integrated adult-pediatric PopPK.{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          Table S3 — side-by-side.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Parameter estimates, %RSE, IIV — pediatric vs adult final models.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 1.6fr) minmax(0, 1fr)',
            gap: 'var(--space-5)',
            height: '100%',
            minHeight: 0,
            alignItems: 'stretch',
          }}
        >
          {/* Parameter table */}
          <motion.div
            style={{ ...noteCardStyle, overflow: 'auto' }}
            initial={{ opacity: 0, y: 12 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.55 }}
          >
            <div style={noteTitle}>Table S3 · Pediatric vs Adult Final Model</div>
            <div style={{ overflowX: 'auto' }}>
              <table style={{ borderCollapse: 'collapse', width: '100%' }}>
                <thead>
                  <tr>
                    <th style={cellHeaderL}>Parameter</th>
                    <th style={cellHeader}>Ped est.</th>
                    <th style={cellHeader}>Ped %RSE</th>
                    <th style={cellHeader}>Ped IIV (CV%)</th>
                    <th style={cellHeader}>Ped shrinkage</th>
                    <th style={cellHeader}>Adult est.</th>
                    <th style={cellHeader}>Adult IIV (CV%)</th>
                  </tr>
                </thead>
                <tbody>
                  {PARAM_ROWS.map((r) => (
                    <tr key={r.p}>
                      <td style={cellLabel}>{r.p}</td>
                      <td style={cellData}>{r.ped}</td>
                      <td style={cellData}>{r.pedRSE}</td>
                      <td style={cellData}>{r.pedIIV}</td>
                      <td style={cellData}>{r.pedShr}</td>
                      <td style={cellData}>{r.adult}</td>
                      <td style={cellData}>{r.adultIIV}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Notes column */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.70 }}
            >
              <div style={noteTitle}>Covariance</div>
              <div style={noteBody}>
                <strong style={{ color: 'var(--cream)' }}>η<sub>CL</sub> ↔ η<sub>Vc</sub>: R = −0.62</strong> —
                negative correlation as expected: higher clearance pairs with lower
                central volume. Adult residual error also carried an IIV term on
                ε: <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)' }}>CV 18.2% (RSE 29.9)</span>.
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 0.85 }}
            >
              <div style={noteTitle}>Structural model · estimation</div>
              <div style={noteBody}>
                Two-compartment, 1st-order absorption with{' '}
                <strong style={{ color: 'var(--cream)' }}>t<sub>lag</sub></strong>.
                Allometric scaling{' '}
                <strong style={{ color: 'var(--cream)' }}>fixed</strong>:{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)' }}>0.75</span>{' '}
                (CL/F, Q/F),{' '}
                <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--case)' }}>1.0</span>{' '}
                (Vc/F, Vp/F) — estimating exponents was attempted but did not
                improve fit. 70-kg reference. NONMEM 7.4.1 · IS-EM / IMPMAP.
              </div>
            </motion.div>

            <motion.div
              style={noteCardStyle}
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: EASE, delay: 1.00 }}
            >
              <div style={noteTitle}>Why Vp/F differs — and why it doesn't matter</div>
              <div style={noteBody}>
                Pediatric Vp/F <strong style={{ color: 'var(--cream)' }}>81.3 L</strong>{' '}
                vs adult <strong style={{ color: 'var(--cream)' }}>8.51 L</strong>:
                driven by (i) sample size (ped 211 obs / 39 subj vs adult 3,126 obs /
                380 subj) and (ii) sparse vs intensive sampling. Model-based
                sensitivity analysis confirmed{' '}
                <strong style={{ color: 'var(--cream)' }}>
                  no clinically relevant difference in systemic exposure
                </strong>{' '}
                — all pediatric AUC<sub>ss</sub> within adult model-predicted range.
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CS1 · Backup · Methodology"
        tagline="The model that bridged adult to pediatric."
        source="Source · Okour et al. J Clin Pharmacol 2023; 63(5): 593–603 · Table S3 · doi:10.1002/jcph.2199"
      />
    </SlideGrid>
  );
}
