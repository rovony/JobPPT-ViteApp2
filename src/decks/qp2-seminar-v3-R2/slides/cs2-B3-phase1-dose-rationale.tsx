// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 BACKUP · B3 · Phase 1 Dose Rationale
 *
 * V6 Type 2 — Methodology lane.
 *
 * Source · AG120-C-001 (AML) and AG120-C-002 (CCA) Clinical Study Reports
 * (Servier Tibsovo oncology regulatory package, public SEC presentation
 * materials). Numbers verbatim from CSR data tables.
 *
 * Defends 500 mg QD as the optimal clinical dose · AUC plateau,
 * MTD not reached in either Phase 1 study.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const AML = [
  { dose: '100 mg BID',     auc: '22,761',  cmax: '2,743'  },
  { dose: '300 mg QD',      auc: '52,063',  cmax: '6,633'  },
  { dose: '500 mg QD',      auc: '56,212',  cmax: '6,710',  approved: true },
  { dose: '800 mg QD',      auc: '59,275',  cmax: '7,280'  },
  { dose: '1200 mg QD',     auc: '96,865',  cmax: '11,810' },
];

const CCA = [
  { dose: '100 mg BID',     auc: '20,818',  cmax: '3,220'  },
  { dose: '300 mg QD',      auc: '19,840',  cmax: '3,157'  },
  { dose: '400 mg QD',      auc: '28,862',  cmax: '4,880'  },
  { dose: '500 mg QD',      auc: '28,877',  cmax: '4,547',  approved: true },
  { dose: '800 mg QD',      auc: '26,775',  cmax: '4,709'  },
  { dose: '1200 mg QD',     auc: '57,666',  cmax: '9,310'  },
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
  fontVariantNumeric: 'tabular-nums',
  padding: 'var(--space-2) var(--space-3)',
  textAlign: 'right',
  borderBottom: '1px solid var(--cream-hairline)',
  color: 'var(--cream-muted)',
};
const cellLabel = {
  ...cellData,
  textAlign: 'left',
  color: 'var(--cream)',
  fontFamily: 'var(--font-body)',
};
const approvedRowBg = 'color-mix(in srgb, var(--case) 12%, transparent)';
const approvedFg = { color: 'var(--case)', fontWeight: 700 };

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
const designListStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.5,
  marginBottom: 'var(--space-3)',
};

function StudyTable({ rows }) {
  return (
    <table style={{ borderCollapse: 'collapse', width: '100%' }}>
      <thead>
        <tr>
          <th style={cellHeaderL}>Cohort</th>
          <th style={cellHeader}>AUC<sub>0–8</sub> (h·ng/mL)</th>
          <th style={cellHeader}>C<sub>max</sub> (ng/mL)</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r) => (
          <tr key={r.dose} style={{ background: r.approved ? approvedRowBg : 'transparent' }}>
            <td style={r.approved ? { ...cellLabel, ...approvedFg } : cellLabel}>
              {r.dose}{r.approved ? ' ← APPROVED' : ''}
            </td>
            <td style={r.approved ? { ...cellData, ...approvedFg } : cellData}>{r.auc}</td>
            <td style={r.approved ? { ...cellData, ...approvedFg } : cellData}>{r.cmax}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default function Cs2BackupB3Phase1DoseRationale() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B3 · Methodology · Phase 1 dose rationale</Eyebrow>

      <Headline delay={0.25} maxChars={70}>
        500 mg QD established across two Phase 1 studies —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          AUC plateau, MTD not reached.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        AG120-C-001 (AML) + AG120-C-002 (CCA) · the same dose anchored both indications.
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
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))',
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
              <div style={titleStyle}>Study design — AG120-C-001 (AML)</div>
              <ul style={{ ...designListStyle, paddingLeft: 'var(--space-4)' }}>
                <li>Phase 1, multicenter, open-label, dose escalation + expansion</li>
                <li><strong style={{ color: 'var(--cream)' }}>5 dose cohorts</strong>: 100 mg BID, 300 mg QD, 500 mg QD, 800 mg QD, 1200 mg QD</li>
                <li>Dose escalation n = 67</li>
                <li>Dose expansion n = 173</li>
              </ul>
              <div style={titleStyle}>PK at dose</div>
              <StudyTable rows={AML} />
            </motion.div>

            <motion.div
              style={cardStyle}
              initial={{ opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.70 }}
            >
              <div style={titleStyle}>Study design — AG120-C-002 (CCA)</div>
              <ul style={{ ...designListStyle, paddingLeft: 'var(--space-4)' }}>
                <li>Phase 1, multicenter, open-label, dose escalation + expansion</li>
                <li><strong style={{ color: 'var(--cream)' }}>6 dose cohorts</strong> (including 400 mg QD arm specific to CCA)</li>
                <li>Dose escalation n = 24</li>
                <li>Dose expansion n = 49</li>
              </ul>
              <div style={titleStyle}>PK at dose</div>
              <StudyTable rows={CCA} />
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
            <div style={titleStyle}>Dose rationale</div>
            <div style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)', lineHeight: 1.5, maxWidth: '70ch' }}>
              Exposure increased less proportionally with dose above 500 mg QD in both indications.
              MTD was not reached in either study. The 500 mg QD dose was selected based on the
              combination of AUC/C<sub>max</sub> plateau behavior, favorable safety profile, and
              target engagement evidence. Both studies support 500 mg QD as the optimal clinical dose.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS2 · Backup · Methodology"
        tagline="One dose. Two indications. Plateau-anchored."
        source="Source · AG120-C-001 + AG120-C-002 CSRs · Servier Tibsovo oncology regulatory package"
      />
    </SlideGrid>
  );
}
