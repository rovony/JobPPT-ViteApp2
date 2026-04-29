// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const ROWS = [
  {
    era: 'Bosentan',
    cyp: 'Strong (3A4 + 2C9)',
    sildenafil: '↓ 63–73%',
    tadalafil: '↓ ~42%',
    highlight: false,
  },
  {
    era: 'Macitentan',
    cyp: 'Minimal',
    sildenafil: 'Negligible',
    tadalafil: 'Negligible',
    highlight: false,
  },
  {
    era: 'Ambrisentan',
    cyp: 'None',
    sildenafil: 'None',
    tadalafil: 'None',
    highlight: true,
  },
];

const HEADERS = ['ERA', 'CYP3A4 induction', 'Sildenafil AUC', 'Tadalafil AUC'];

export default function Cs1BackupB8Ddi() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B8 · Drug-drug interactions</Eyebrow>

      <Headline delay={0.25} maxChars={62}>
        Ambrisentan doesn't induce CYP3A4 —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          no PDE-5i interaction.
        </span>
      </Headline>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-5)',
            padding: 'var(--space-3) 0',
            minWidth: 0,
            minHeight: 0,
            overflow: 'auto',
          }}
        >
          {/* Comparison table */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 0.5, ease: EASE }}
            style={{
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              overflow: 'hidden',
              minWidth: 0,
            }}
          >
            {/* Header row */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(4, 1fr)',
                gap: 0,
                borderBottom: '1px solid var(--cream-hairline)',
                padding: 'var(--space-3) var(--space-4)',
                background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
              }}
            >
              {HEADERS.map((h) => (
                <div
                  key={h}
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-eyebrow)',
                    color: 'var(--cream-faint)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    textTransform: 'uppercase',
                    fontWeight: 600,
                    whiteSpace: 'nowrap',
                  }}
                >
                  {h}
                </div>
              ))}
            </div>

            {/* Data rows */}
            {ROWS.map((row, i) => (
              <motion.div
                key={row.era}
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{
                  duration: reduced ? 0 : 0.4,
                  delay: reduced ? 0 : 0.7 + i * 0.12,
                  ease: EASE,
                }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(4, 1fr)',
                  gap: 0,
                  padding: 'var(--space-3) var(--space-4)',
                  borderBottom: i < ROWS.length - 1 ? '1px solid var(--cream-hairline)' : 'none',
                  background: row.highlight
                    ? 'color-mix(in srgb, var(--case) 8%, transparent)'
                    : 'transparent',
                }}
              >
                <div
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: row.highlight ? 'var(--case)' : 'var(--cream)',
                    fontWeight: row.highlight ? 700 : 500,
                  }}
                >
                  {row.era}
                </div>
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream-muted)',
                  }}
                >
                  {row.cyp}
                </div>
                <div
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: row.highlight ? 'var(--cream)' : 'var(--cream-muted)',
                    fontWeight: row.highlight ? 600 : 400,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.sildenafil}
                </div>
                <div
                  className="deck-mono"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: row.highlight ? 'var(--cream)' : 'var(--cream-muted)',
                    fontWeight: row.highlight ? 600 : 400,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {row.tadalafil}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* AMB112529 context block */}
          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.15, ease: EASE }}
            style={{
              padding: 'var(--space-4) var(--space-5)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              position: 'relative',
              minWidth: 0,
            }}
          >
            <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 4, background: 'var(--case)', borderRadius: 'var(--radius-lg) 0 0 var(--radius-lg)' }} />

            <div
              className="deck-mono"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--case)',
                letterSpacing: 'var(--ls-mono-wide)',
                textTransform: 'uppercase',
                fontWeight: 600,
                marginBottom: 'var(--space-2)',
              }}
            >
              AMB112529 context
            </div>

            <div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.55,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <span>
                <strong style={{ color: 'var(--cream)' }}>44%</strong> of patients
                on PDE-5i background therapy at enrollment.
              </span>
              <span>
                PDE-5i not formally tested as a covariate in the PopPK model —
                mechanistic defense:{' '}
                <strong style={{ color: 'var(--cream)' }}>
                  ambrisentan does not induce CYP3A4
                </strong>
                , so no pharmacokinetic interaction is expected.
              </span>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.5}
        kicker="B8 · CS1 · DDI"
        source="Source · Burgess et al. Eur J Clin Pharmacol 2008 · Okour et al. JCP 2023"
      />
    </SlideGrid>
  );
}
