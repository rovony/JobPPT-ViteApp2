// @ts-nocheck
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
};

const SCALING_PARAMS = [
  { param: 'CL', relation: 'WT^0.75', rationale: 'Metabolic rate (Kleiber\'s law)' },
  { param: 'V',  relation: 'WT^1.0',  rationale: 'Volume of distribution (body composition)' },
  { param: 't½', relation: 'WT^0.25', rationale: 'Derived: V / CL' },
];

const REASONS = [
  { num: '1', title: 'Mechanistic basis', body: 'Kleiber\'s law — basal metabolic rate scales as WT^0.75 across species and age' },
  { num: '2', title: 'Sparse pediatric data', body: 'N = 39 PK-evaluable; estimating free exponents risks over-fitting' },
  { num: '3', title: 'Estimation attempted', body: 'Free-exponent model run as sensitivity — OFV drop within noise (Δ < 3.84)' },
  { num: '4', title: 'Convention', body: 'Fixed allometry pre-empts over-parameterization; standard per FDA/EMA pediatric guidance' },
];

const cellBase = {
  padding: 'var(--space-2) var(--space-3)',
  fontSize: 'var(--fs-slide-subhead)',
  lineHeight: 1.4,
  borderBottom: '1px solid var(--cream-hairline)',
};

export default function Cs1BackupAllometry() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B5 · Allometric scaling</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Fixed exponents{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          — mechanistic, not a shortcut.
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
          {/* Anderson-Holford framework table */}
          <motion.div
            style={{
              ...panelStyle,
              overflow: 'hidden',
              flex: '0 0 auto',
            }}
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.6, ease: EASE }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                fontWeight: 700,
                marginBottom: 'var(--space-2)',
              }}
            >
              Anderson–Holford framework
            </div>
            <div style={{ overflowX: 'auto', minWidth: 0 }}>
              <table
                className="deck-mono"
                style={{
                  width: '100%',
                  borderCollapse: 'collapse',
                  minWidth: '24rem',
                }}
              >
                <thead>
                  <tr>
                    <th style={{ ...cellBase, textAlign: 'left', color: 'var(--cream-faint)', fontWeight: 400, width: '15%' }}>
                      Parameter
                    </th>
                    <th style={{ ...cellBase, textAlign: 'center', color: 'var(--cream-faint)', fontWeight: 400, width: '25%' }}>
                      Scaling
                    </th>
                    <th style={{ ...cellBase, textAlign: 'left', color: 'var(--cream-faint)', fontWeight: 400 }}>
                      Rationale
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {SCALING_PARAMS.map((row) => (
                    <tr key={row.param}>
                      <td style={{ ...cellBase, textAlign: 'left', color: 'var(--case)', fontWeight: 700 }}>
                        {row.param}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'center', color: 'var(--cream)', fontWeight: 600 }}>
                        {row.relation}
                      </td>
                      <td style={{ ...cellBase, textAlign: 'left', color: 'var(--cream-muted)' }}>
                        {row.rationale}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>

          {/* Four reasons grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              flex: '1 1 auto',
              minHeight: 0,
            }}
          >
            {REASONS.map((r, i) => (
              <motion.div
                key={r.num}
                style={panelStyle}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.85 + i * 0.12, ease: EASE }}
              >
                <div style={{ display: 'flex', gap: 'var(--space-2)', alignItems: 'baseline', marginBottom: 'var(--space-2)' }}>
                  <span
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-card-numeral)',
                      color: 'var(--case)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {r.num}
                  </span>
                  <span
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      color: 'var(--cream)',
                      fontWeight: 600,
                    }}
                  >
                    {r.title}
                  </span>
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.55,
                  }}
                >
                  {r.body}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom note: maturation */}
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
              <span style={{ fontWeight: 600, color: 'var(--case)' }}>Ages 8–{'<'}18</span>{' '}
              — past organ-maturation window → pure allometric scaling sufficient.
              No maturation function (Hill / sigmoid) needed.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="B5 · CS1 · ALLOMETRIC SCALING"
        source="Source · Anderson & Holford 2008 · Okour et al. JCP 2023"
      />
    </SlideGrid>
  );
}
