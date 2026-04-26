// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const DOSE_DATA = [
  { band: '≥20 – <35 kg', lowStart: '2.5 mg', lowMaint: '2.5 mg', highStart: '2.5 mg', highMaint: '5 mg' },
  { band: '≥35 – <50 kg', lowStart: '5 mg',   lowMaint: '5 mg',   highStart: '5 mg',   highMaint: '7.5 mg' },
  { band: '≥50 kg',       lowStart: '5 mg',   lowMaint: '5 mg',   highStart: '5 mg',   highMaint: '10 mg' },
];

const cellBase = {
  padding: 'var(--space-2) var(--space-3)',
  fontSize: 'var(--fs-slide-subhead)',
  lineHeight: 1.4,
  fontVariantNumeric: 'tabular-nums',
  borderBottom: '1px solid var(--cream-hairline)',
};

export default function Cs1BackupDosingScheme() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B3 · Dosing</Eyebrow>

      <Headline delay={0.25} maxChars={58}>
        Three weight bands × two dose levels{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — six regimens, all matching adult AUC.
        </span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            paddingTop: 'var(--space-3)',
          }}
        >
          {/* Dosing table */}
          <motion.div
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              overflow: 'hidden',
              minWidth: 0,
              flex: '1 1 auto',
              minHeight: 0,
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
          >
            <div style={{ overflowX: 'auto', minWidth: 0 }}>
              <table
                className="deck-mono"
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '28rem',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...cellBase, textAlign: 'left', color: 'var(--cream-faint)', fontWeight: 400, width: '22%' }}></th>
                    <th
                      colSpan={2}
                      style={{
                        ...cellBase,
                        textAlign: 'center',
                        color: 'var(--cream-muted)',
                        fontWeight: 600,
                        borderLeft: '1px solid var(--cream-hairline)',
                        letterSpacing: 'var(--ls-mono-wide)',
                      }}
                    >
                      LOW DOSE ARM
                    </th>
                    <th
                      colSpan={2}
                      style={{
                        ...cellBase,
                        textAlign: 'center',
                        color: 'var(--case)',
                        fontWeight: 600,
                        borderLeft: '1px solid var(--cream-hairline)',
                        letterSpacing: 'var(--ls-mono-wide)',
                      }}
                    >
                      HIGH DOSE ARM
                    </th>
                  </tr>
                  <tr>
                    <th style={{ ...cellBase, textAlign: 'left', color: 'var(--cream-faint)', fontWeight: 400 }}>
                      Weight band
                    </th>
                    <th style={{ ...cellBase, textAlign: 'center', color: 'var(--cream-faint)', fontWeight: 400, borderLeft: '1px solid var(--cream-hairline)' }}>
                      Start
                    </th>
                    <th style={{ ...cellBase, textAlign: 'center', color: 'var(--cream-faint)', fontWeight: 400 }}>
                      Wk 2+
                    </th>
                    <th style={{ ...cellBase, textAlign: 'center', color: 'var(--cream-faint)', fontWeight: 400, borderLeft: '1px solid var(--cream-hairline)' }}>
                      Start
                    </th>
                    <th style={{ ...cellBase, textAlign: 'center', color: 'var(--cream-faint)', fontWeight: 400 }}>
                      Wk 2+
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {DOSE_DATA.map((row) => (
                    <tr key={row.band}>
                      <td style={{ ...cellBase, textAlign: 'left', color: 'var(--cream)', fontWeight: 600 }}>
                        {row.band}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'center', color: 'var(--cream)', borderLeft: '1px solid var(--cream-hairline)' }}>
                        {row.lowStart}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'center', color: 'var(--cream)' }}>
                        {row.lowMaint}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'center', color: 'var(--cream)', fontWeight: 600, borderLeft: '1px solid var(--cream-hairline)' }}>
                        {row.highStart}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'center', color: 'var(--cream)', fontWeight: 600 }}>
                        {row.highMaint}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Comparator + AUC match strip */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.0, ease: EASE }}
          >
            {/* Adult comparator */}
            <div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-lg)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'var(--space-3) var(--space-4)',
                minWidth: 0,
              }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-faint)',
                  fontWeight: 600,
                  marginBottom: 'var(--space-1)',
                }}
              >
                Adult comparator
              </div>
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.5 }}>
                Fixed dose: <span style={{ fontWeight: 600 }}>5 mg or 10 mg QD</span> · no weight banding
              </div>
            </div>

            {/* AUC match */}
            <div
              style={{
                border: '1px solid var(--cream-hairline)',
                borderLeft: '4px solid var(--case)',
                borderRadius: 'var(--radius-lg)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'var(--space-3) var(--space-4)',
                minWidth: 0,
              }}
            >
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  marginBottom: 'var(--space-1)',
                }}
              >
                AUC parity
              </div>
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.5 }}>
                Pediatric AUC matches adult within{' '}
                <span style={{ fontWeight: 700, color: 'var(--case)' }}>−3%</span> (low) and{' '}
                <span style={{ fontWeight: 700, color: 'var(--case)' }}>+0.3%</span> (high)
              </div>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B3 · CS1 · DOSING SCHEME"
        source="Source · AMB112529 protocol · Okour et al. JCP 2023"
      />
    </SlideGrid>
  );
}
