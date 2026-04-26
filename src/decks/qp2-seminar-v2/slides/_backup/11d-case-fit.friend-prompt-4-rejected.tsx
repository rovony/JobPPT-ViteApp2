// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import HighlightWord from '@/components/deck/patterns/HighlightWord';
import AnalysisPlot from '@/components/slides/AnalysisPlot';

/**
 * Slide 11d · CS1 · Model Fit — "No systematic bias".
 *
 * Implemented per friend's Prompt 4 (2026-04-23). Uses the Recharts
 * AnalysisPlot reference (src/components/slides/AnalysisPlot.tsx) so
 * the chart frame shares a layoutId with slides 11e (exposure match)
 * and 11f (E-R) when those adopt the same wrapper — the 10→11→12
 * morph then reads as "chart frame travels across slides, contents
 * evolve inside."
 *
 * Prior custom-SVG pcVPC implementation (real Okour et al. 2023 data)
 * is preserved at slides/_backup/11d-case-fit.pre-friend-prompt-4.jsx.
 * Restore via git mv if the Recharts placeholder path turns out worse.
 *
 * Content (friend's spec verbatim):
 *   Title L1: 'The pcVPC passed.'
 *   Title L2: 'No systematic bias.' (italic coral)
 *   Subtitle: '500 replicates · 39 pts · 211 observations.'
 *   Left 60%: 6-row parameter table at 70-kg reference + 12-covariate
 *             strip (all muted/crossed) + 'None retained' caption
 *   Right 40%: <AnalysisPlot variant="pcvpc" />
 *
 * Amber highlight on the two payoff anchors only: '1.17' + 'None retained'.
 */

const PARAMS = [
  { name: 'CL/F',  estimate: '1.17',  unit: 'L/hr',  rse: '6.3',  iiv: '24%', shrink: '19%', hero: true },
  { name: 'Vc/F',  estimate: '12.3',  unit: 'L',     rse: '18',   iiv: '46%', shrink: '22%' },
  { name: 'Q/F',   estimate: '0.457', unit: 'L/hr',  rse: '14',   iiv: '—',   shrink: '—'   },
  { name: 'Vp/F',  estimate: '81.3',  unit: 'L',     rse: '22',   iiv: '52%', shrink: '86%' },
  { name: 'Ka',    estimate: '2.46',  unit: '/hr',   rse: '11',   iiv: '38%', shrink: '41%' },
  { name: 'tlag',  estimate: '0.525', unit: 'hr',    rse: 'FIXED', iiv: '—',  shrink: '—'   },
];

const COVARIATES = [
  { group: 'HEPATIC',      items: ['ALT', 'AST', 'ALP', 'GGT', 'BILI'] },
  { group: 'RENAL',        items: ['CRCL'] },
  { group: 'DEMOGRAPHIC',  items: ['AGE', 'SEX', 'RACE', 'BMI'] },
  { group: 'DOSING',       items: ['DOSE', 'CYCLE'] },
];

export default function Slide11dCaseFit() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    subhead: 0.5,
    table: 0.8,
    covariates: 1.6,
    caption: 2.0,
    plot: 0.9,
  };

  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="10 · Results — Model Fit"
      headline={
        <>
          The pcVPC passed.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            No systematic bias.
          </span>
        </>
      }
      headlineMaxChars={32}
      subhead={
        <>
          <HighlightWord color="var(--coral)" delay={D.subhead}>500 replicates</HighlightWord>
          {' · 39 pts · 211 observations.'}
        </>
      }
      footerKicker="Case 01 · Model fit"
      footerTagline="Source · Okour et al. JCP 2023 (Table 2, Figure 2)"
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
      {/* LEFT · Parameter table + covariate strip + caption */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', minWidth: 0 }}>
        <ParamTable reduce={reduce} ease={ease} delay={D.table} />
        <CovariateStrip reduce={reduce} ease={ease} delay={D.covariates} />
        <Caption reduce={reduce} ease={ease} delay={D.caption} />
      </div>

      {/* RIGHT · Shared-element pcVPC plot */}
      <motion.div
        style={{ minWidth: 0, minHeight: 0, display: 'flex' }}
        initial={reduce ? { opacity: 1 } : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : D.plot }}
      >
        <AnalysisPlot variant="pcvpc" />
      </motion.div>
    </div>
  );
}

/* ==============================================================
   ParamTable — 6 rows at 70-kg reference.
   Mono font, right-aligned numbers, thin 1px hairline dividers.
   Amber highlight on CL/F "1.17" value only (payoff anchor).
   ============================================================== */
function ParamTable({ reduce, ease, delay }) {
  const col = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.78rem, 0.95vw, 0.95rem)',
    color: 'var(--cream-muted)',
  };
  const headStyle = {
    ...col,
    fontSize: 'clamp(0.62rem, 0.7vw, 0.72rem)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--cream-faint)',
    padding: '8px 12px',
    borderBottom: '1px solid var(--cream-hairline)',
    textAlign: 'right',
  };
  const cellStyle = {
    ...col,
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
        Pediatric PopPK · final estimates · 70-kg reference
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse', tableLayout: 'fixed' }}>
        <thead>
          <tr>
            <th style={{ ...headStyle, textAlign: 'left' }}>Param</th>
            <th style={headStyle}>Estimate</th>
            <th style={headStyle}>%RSE</th>
            <th style={headStyle}>IIV</th>
            <th style={headStyle}>Shrink</th>
          </tr>
        </thead>
        <tbody>
          {PARAMS.map((p) => (
            <tr key={p.name}>
              <td style={nameCellStyle}>{p.name}</td>
              <td style={cellStyle}>
                {p.hero ? (
                  <span
                    style={{
                      background: 'color-mix(in srgb, var(--amber) 22%, transparent)',
                      color: 'var(--amber)',
                      padding: '2px 6px',
                      borderRadius: 3,
                      fontWeight: 700,
                    }}
                  >
                    {p.estimate}
                  </span>
                ) : (
                  p.estimate
                )}
                <span style={{ color: 'var(--cream-faint)', marginLeft: 6 }}>{p.unit}</span>
              </td>
              <td style={cellStyle}>{p.rse}</td>
              <td style={cellStyle}>{p.iiv}</td>
              <td style={cellStyle}>{p.shrink}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}

/* ==============================================================
   CovariateStrip — 12 tested covariates, all muted/strikethrough
   to convey 'none retained' at a glance.
   ============================================================== */
function CovariateStrip({ reduce, ease, delay }) {
  const chipStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.6rem, 0.7vw, 0.72rem)',
    letterSpacing: '0.16em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: 3,
    border: '1px solid var(--cream-hairline)',
    color: 'var(--cream-faint)',
    textDecoration: 'line-through',
    textDecorationColor: 'var(--cream-dim)',
    textDecorationThickness: '1px',
    whiteSpace: 'nowrap',
  };
  const labelStyle = {
    fontFamily: 'var(--font-mono)',
    fontSize: 'clamp(0.58rem, 0.65vw, 0.68rem)',
    letterSpacing: '0.22em',
    textTransform: 'uppercase',
    color: 'var(--cream-dim)',
    marginRight: 6,
  };

  return (
    <motion.div
      style={{
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
        display: 'flex',
        flexDirection: 'column',
        gap: 8,
      }}
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: '0.22em',
          color: 'var(--cream-faint)',
        }}
      >
        12 covariates tested · 5 hepatic · 1 renal · 4 demographic · 2 dosing
      </div>
      {COVARIATES.map((g) => (
        <div key={g.group} style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 6 }}>
          <span style={labelStyle}>{g.group}</span>
          {g.items.map((c) => (
            <span key={c} style={chipStyle}>{c}</span>
          ))}
        </div>
      ))}
    </motion.div>
  );
}

/* ==============================================================
   Caption — 'None retained' amber payoff line.
   ============================================================== */
function Caption({ reduce, ease, delay }) {
  return (
    <motion.div
      initial={reduce ? { opacity: 1 } : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : delay }}
      style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.82rem, 0.95vw, 0.98rem)',
        lineHeight: 1.5,
        color: 'var(--cream-muted)',
      }}
    >
      <span
        style={{
          background: 'color-mix(in srgb, var(--amber) 22%, transparent)',
          color: 'var(--amber)',
          padding: '2px 8px',
          borderRadius: 4,
          fontWeight: 600,
          whiteSpace: 'nowrap',
        }}
      >
        None retained
      </span>
      {' at p < 0.001. Parsimony confirmed in the data.'}
    </motion.div>
  );
}
