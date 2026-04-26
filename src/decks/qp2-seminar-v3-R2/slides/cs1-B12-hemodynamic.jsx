import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-3) var(--space-4)',
  minWidth: 0,
  minHeight: 0,
};

const labelStyle = {
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  marginBottom: 'var(--space-2)',
};

const HEMO_DATA = [
  {
    param: 'Cardiac index',
    baseline: '3.42 [0.50]',
    unit: 'L/min/m²',
    change: '+0.94 [0.66]',
    direction: 'Improved',
  },
  {
    param: 'Mean PAP',
    baseline: '47.40 [18.96]',
    unit: 'mmHg',
    change: '−2.20 [6.06]',
    direction: 'Improved',
  },
  {
    param: 'PVR',
    baseline: '11.88 [8.30]',
    unit: 'WU',
    change: '−3.46 [1.90]',
    direction: 'Improved',
  },
];

const thStyle = {
  padding: 'var(--space-2) var(--space-3)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  fontWeight: 700,
  textAlign: 'left',
  borderBottom: '2px solid var(--cream-hairline)',
  whiteSpace: 'nowrap',
};

const tdStyle = {
  padding: 'var(--space-2) var(--space-3)',
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream)',
  lineHeight: 1.55,
  borderBottom: '1px solid var(--cream-hairline)',
  fontVariantNumeric: 'tabular-nums',
};

export default function Cs1BackupB12Hemodynamic() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B12 · Hemodynamic substudy</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        N=5 paired low-dose{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — small but directionally consistent with adult ERA effect.
        </span>
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minHeight: 0,
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* Summary card */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(10rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
          >
            {[
              { num: '7', label: 'patients with baseline RHC' },
              { num: '5', label: 'paired (all low-dose)', accent: true },
              { num: '0', label: 'high-dose paired', muted: true },
            ].map((s) => (
              <div key={s.label} style={panelStyle}>
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-lead)',
                    fontWeight: 700,
                    color: s.accent ? 'var(--case)' : s.muted ? 'var(--cream-faint)' : 'var(--cream)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: s.muted ? 'var(--cream-faint)' : 'var(--cream-muted)',
                    lineHeight: 1.4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* Results table */}
          <motion.div
            style={{
              ...panelStyle,
              padding: 0,
              overflow: 'hidden',
              flex: '1 1 auto',
              minHeight: 0,
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85, ease: EASE }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                ...labelStyle,
                padding: 'var(--space-3) var(--space-4)',
                paddingBottom: 0,
              }}
            >
              Low-dose week 24 changes (n = 5)
            </div>
            <div style={{ overflowX: 'auto', minWidth: 0 }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr>
                    <th className="deck-mono uppercase" style={thStyle}>Parameter</th>
                    <th className="deck-mono uppercase" style={thStyle}>Baseline mean [SD]</th>
                    <th className="deck-mono uppercase" style={thStyle}>Week 24 Δ [SD]</th>
                    <th className="deck-mono uppercase" style={thStyle}>Direction</th>
                  </tr>
                </thead>
                <tbody>
                  {HEMO_DATA.map((row, i) => (
                    <motion.tr
                      key={row.param}
                      initial={reduced ? false : { opacity: 0 }}
                      animate={inView ? { opacity: 1 } : undefined}
                      transition={{ duration: reduced ? 0 : 0.3, delay: reduced ? 0 : 1.0 + i * 0.1, ease: EASE }}
                    >
                      <td className="deck-body" style={{ ...tdStyle, fontWeight: 600 }}>
                        {row.param}
                      </td>
                      <td className="deck-mono" style={tdStyle}>
                        {row.baseline}{' '}
                        <span style={{ color: 'var(--cream-faint)' }}>{row.unit}</span>
                      </td>
                      <td className="deck-mono" style={{ ...tdStyle, fontWeight: 600, color: 'var(--case)' }}>
                        {row.change}
                      </td>
                      <td className="deck-body" style={{ ...tdStyle, color: 'var(--cream-muted)' }}>
                        ↑ {row.direction}
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Conversion callout */}
          <motion.div
            style={{
              ...panelStyle,
              borderLeft: '4px solid var(--case)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.4, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                lineHeight: 1.55,
              }}
            >
              <span style={{ fontWeight: 600, color: 'var(--case)' }}>−3.46 WU ≈ −276 dyne·sec/cm⁵</span>,
              comparable to adult bosentan PVR effect (~−200 dyne·sec/cm⁵).
            </div>
          </motion.div>

          {/* Bottom annotation */}
          <motion.div
            style={{
              ...panelStyle,
              background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.7, ease: EASE }}
          >
            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
                fontStyle: 'italic',
              }}
            >
              N=5 is too small for inference, but magnitude is consistent with
              adult ERA literature and was cited supportively by PMDA in Japanese label.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B12 · CS1 · HEMODYNAMIC SUBSTUDY"
        source="Source · Ivy et al. 2020 · PMDA review (Japanese label)"
      />
    </SlideGrid>
  );
}
