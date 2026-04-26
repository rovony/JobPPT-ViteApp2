// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import AnalysisPlot from '@/components/slides/AnalysisPlot';

/**
 * Slide 11e · CS1 · Exposure Match — AUCss within 3 %.
 *
 * Implemented per friend's Prompt 5 (2026-04-23). Continues the
 * shared-element AnalysisPlot frame from slide 11d — the outer
 * layoutId persists across 11d → 11e → 11f, and the inner
 * AnimatePresence keyed on `variant` crossfades the chart contents
 * so switching feels like the frame is locked while its contents
 * evolve.
 *
 * Prior custom-SVG (AUCss × body-weight + Cmax box plots with real
 * Okour Table S5 data) preserved at
 *   slides/_backup/11e-case-exposure-match.pre-friend-prompt-5.jsx
 * for rewind.
 *
 * Content (friend's spec):
 *   Eyebrow:  '11 · Results — Exposure match'
 *   Title L1: 'Pediatric AUCss matched adult —'
 *   Title L2: 'within 3 %.' (italic coral)
 *   Left 60%: 4-cell comparison table (Ped/Adult × Low/High dose)
 *             + Cmax delta callout + 35-<50 kg subgroup flag
 *             + ICH E11(R1) close line
 *   Right 40%: <AnalysisPlot variant="exposure-match" />
 */

const AUC_ROWS = [
  { label: 'Pediatric · AUCss',  low: '4.82',  high: '9.15'  },
  { label: 'Adult · AUCss',       low: '4.98',  high: '9.12'  },
];

const AUC_DELTA = { low: '−3 %', high: 'identical' };

export default function Slide11eCaseExposureMatch() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    table: 0.6,
    cmax: 1.1,
    subgroup: 1.5,
    close: 1.9,
    plot: 0.8,
  };

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="11 · Results — Exposure match"
      headline={
        <>
          Pediatric AUC<sub>ss</sub> matched adult —{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            within 3 %.
          </span>
        </>
      }
      headlineMaxChars={36}
      footerKicker="Case 01 · Exposure match"
      footerTagline="Source · Okour et al. JCP 2023 (Table 3, Figure 3)"
    >
      <FriendSpecLayout reduce={reduce} ease={ease} D={D} />
    </SlideFrame>
  );
}

function FriendSpecLayout({ reduce, ease, D }) {
  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 3fr) minmax(0, 2fr)',
        columnGap: 'var(--space-6)',
        minHeight: 0,
      }}
    >
      {/* LEFT · Table + Cmax delta + subgroup flag + ICH close */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
        <ComparisonTable reduce={reduce} ease={ease} delay={D.table} />
        <CmaxCallout reduce={reduce} ease={ease} delay={D.cmax} />
        <SubgroupFlag reduce={reduce} ease={ease} delay={D.subgroup} />
        <IchClose reduce={reduce} ease={ease} delay={D.close} />
      </div>

      {/* RIGHT · Shared-element exposure-match scatter */}
      <motion.div
        style={{ minWidth: 0, minHeight: 0, display: 'flex' }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : D.plot }}
      >
        <AnalysisPlot variant="exposure-match" />
      </motion.div>
    </div>
  );
}

/* ==============================================================
   ComparisonTable — 4-cell AUCss grid (Ped/Adult × Low/High dose)
   + delta row with amber highlight on '−3 %' and 'identical'.
   ============================================================== */
function ComparisonTable({ reduce, ease, delay }) {
  const headStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--cream-faint)',
    padding: '8px 12px',
    borderBottom: '1px solid var(--cream-hairline)',
    textAlign: 'right',
  };
  const cellStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.85rem, 1.05vw, 1.05rem)',
    color: 'var(--cream-muted)',
    padding: '10px 12px',
    borderBottom: '1px solid var(--cream-hairline)',
    textAlign: 'right',
  };
  const nameCellStyle = {
    ...cellStyle,
    color: 'var(--cream)',
    fontWeight: 600,
    textAlign: 'left',
    letterSpacing: '0.04em',
  };
  const deltaCellStyle = {
    ...cellStyle,
    borderBottom: 'none',
    paddingTop: 14,
  };
  const amberPill = {
    background: 'color-mix(in srgb, var(--amber) 22%, transparent)',
    color: 'var(--amber)',
    padding: '2px 8px',
    borderRadius: 3,
    fontWeight: 700,
  };

  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : delay }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.68rem',
          letterSpacing: '0.22em',
          color: 'var(--coral)',
          marginBottom: 10,
        }}
      >
        AUCss · μg·h/mL · model-derived geometric means
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ ...headStyle, textAlign: 'left' }}>Population</th>
            <th style={headStyle}>Low dose</th>
            <th style={headStyle}>High dose</th>
          </tr>
        </thead>
        <tbody>
          {AUC_ROWS.map((r) => (
            <tr key={r.label}>
              <td style={nameCellStyle}>{r.label}</td>
              <td style={cellStyle}>{r.low}</td>
              <td style={cellStyle}>{r.high}</td>
            </tr>
          ))}
          <tr>
            <td style={{ ...nameCellStyle, borderBottom: 'none', paddingTop: 14, color: 'var(--cream-faint)', fontWeight: 500 }}>
              Δ vs adult
            </td>
            <td style={deltaCellStyle}>
              <span style={amberPill}>{AUC_DELTA.low}</span>
            </td>
            <td style={deltaCellStyle}>
              <span style={amberPill}>{AUC_DELTA.high}</span>
            </td>
          </tr>
        </tbody>
      </table>
    </motion.div>
  );
}

/* ==============================================================
   CmaxCallout — one-line delta for the secondary exposure metric.
   ============================================================== */
function CmaxCallout({ reduce, ease, delay }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
      style={{
        display: 'flex',
        alignItems: 'baseline',
        gap: 'var(--space-4)',
        flexWrap: 'wrap',
        paddingTop: 'var(--space-2)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'var(--cream-faint)',
        }}
      >
        C<sub style={{ fontSize: '0.7em' }}>max,ss</sub> · pediatric vs adult
      </span>
      <span
        style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'clamp(1rem, 1.3vw, 1.25rem)',
          color: 'var(--coral)',
          fontWeight: 700,
          letterSpacing: '0.04em',
        }}
      >
        +11 % <span style={{ color: 'var(--cream-faint)', fontWeight: 400 }}>low</span>{' '}
        · +18 % <span style={{ color: 'var(--cream-faint)', fontWeight: 400 }}>high</span>
      </span>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.78rem, 0.9vw, 0.92rem)',
          color: 'var(--cream-muted)',
          fontStyle: 'italic',
        }}
      >
        — still inside adult distribution.
      </span>
    </motion.div>
  );
}

/* ==============================================================
   SubgroupFlag — 35-<50 kg low-dose subgroup callout.
   Left coral accent · mono label · body rationale.
   ============================================================== */
function SubgroupFlag({ reduce, ease, delay }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1, x: 0 } : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
      style={{
        borderLeft: '2px solid var(--coral)',
        paddingLeft: 'var(--space-3)',
        paddingTop: 'var(--space-1)',
        paddingBottom: 'var(--space-1)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          color: 'var(--coral)',
          marginBottom: 4,
        }}
      >
        Subgroup · 35-&lt;50 kg low-dose · n = 8
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.82rem, 0.92vw, 0.95rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        AUCss <span style={{ color: 'var(--cream)', fontWeight: 600 }}>29 % higher</span> than
        adult geometric mean — still inside adult envelope. Flat E-R →{' '}
        <span style={{ color: 'var(--cream)', fontWeight: 600 }}>not clinically meaningful.</span>
      </div>
    </motion.div>
  );
}

/* ==============================================================
   IchClose — regulatory-framework close line.
   ============================================================== */
function IchClose({ reduce, ease, delay }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
      className="deck-mono uppercase"
      style={{
        fontSize: '0.6rem',
        letterSpacing: '0.2em',
        color: 'var(--coral)',
        paddingTop: 'var(--space-2)',
        borderTop: '1px solid var(--cream-hairline)',
        marginTop: 'var(--space-2)',
      }}
    >
      ICH E11(R1) · exposure match + conserved mechanism → clinical extrapolation
    </motion.div>
  );
}
