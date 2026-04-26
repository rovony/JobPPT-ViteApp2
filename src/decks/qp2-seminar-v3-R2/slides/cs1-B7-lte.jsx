import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const STATS = [
  { label: 'LTE enrollment', value: '38 / 41', sub: '93% of trial completers' },
  { label: 'Completed (aged out at 18)', value: '21 / 38', sub: null },
  { label: 'Deaths', value: '7 / 38', sub: '18% · PAH-related, none attributed to ambrisentan' },
  { label: 'Median exposure', value: '~3.5 yr', sub: null },
  { label: '6MWD improvement', value: '~17%', sub: 'mean, n = 29' },
  { label: 'WHO FC maintained or improved', value: '100%', sub: 'over full LTE duration' },
  { label: 'Hepatotoxicity', value: 'None novel', sub: 'distinguishes from bosentan' },
  { label: 'Anemia', value: 'No novel', sub: 'beyond ERA class expectations' },
  { label: 'Pubertal development', value: 'Collected', sub: 'through age-20 follow-ups' },
];

export default function Cs1BackupB7Lte() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B7 · Long-term extension</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        3.5 years median exposure —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          the label held.
        </span>
      </Headline>

      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
            gap: 'var(--space-3)',
            padding: 'var(--space-2) 0',
            minWidth: 0,
            minHeight: 0,
            overflow: 'auto',
            alignContent: 'start',
          }}
        >
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 0.45 + i * 0.07,
                ease: EASE,
              }}
              style={{
                padding: 'var(--space-3) var(--space-4)',
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
                  color: 'var(--cream-faint)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  textTransform: 'uppercase',
                  marginBottom: 'var(--space-1)',
                }}
              >
                {s.label}
              </div>

              <div
                className="deck-display"
                style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--case)',
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {s.value}
              </div>

              {s.sub && (
                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream-muted)',
                    marginTop: 'var(--space-1)',
                    lineHeight: 1.4,
                  }}
                >
                  {s.sub}
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.4}
        kicker="B7 · CS1 · LTE"
        source="Source · Eur J Pediatr 2024 · NCT01342952"
      />
    </SlideGrid>
  );
}
