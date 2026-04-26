// @ts-nocheck
/**
 * TEMPLATE: Hero Stat (big numbers + supporting context)
 *
 * USE FOR: Verdict slides, impact numbers, key results, exposure match.
 * Examples: −3% / +0.3% exposure match, 42 countries approved, 95% overlap.
 *
 * HOW TO ADAPT:
 * 1. Change dataCase to coral/cyan/violet
 * 2. Update STATS array with your hero numbers
 * 3. Mark the primary stat with `primary: true`
 * 4. Optional: add a bottom conclusion callout
 * 5. The primary stat gets a larger font and accent emphasis
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

const STATS = [
  {
    hero: '−3%',
    label: 'Low dose AUC vs adult',
    qualifier: '2.5 mg (≤35 kg)',
    primary: true,
  },
  {
    hero: '+0.3%',
    label: 'High dose AUC vs adult',
    qualifier: '5 mg (>35 kg)',
    primary: true,
  },
  {
    hero: '39',
    label: 'Pediatric PK patients',
    qualifier: 'AMB112529 · ages 8 to <18 yr',
    primary: false,
  },
];

const CONCLUSION = 'Pediatric exposure matched adult target within ±3% — the model-based dose was confirmed.';

const panelStyle = {
  border: '1px solid var(--cream-hairline)',
  borderRadius: 'var(--radius-lg)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  padding: 'var(--space-4) var(--space-5)',
  minWidth: 0,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  textAlign: 'center',
  gap: 'var(--space-2)',
};

export default function TplHeroStat() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 01 · Verdict</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        The headline that frames what the numbers mean.
      </Headline>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-3)',
            height: '100%',
            minWidth: 0,
            paddingTop: 'var(--space-2)',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              alignContent: 'start',
            }}
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                style={{
                  ...panelStyle,
                  ...(stat.primary
                    ? {
                        borderLeft: '4px solid var(--case)',
                        background: 'color-mix(in srgb, var(--case) 8%, var(--bg))',
                      }
                    : {}),
                }}
                initial={reduced ? false : { opacity: 0, y: 8 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{
                  duration: reduced ? 0 : 0.5,
                  delay: reduced ? 0 : 0.6 + i * 0.18,
                  ease: EASE,
                }}
              >
                <div
                  className="deck-display"
                  style={{
                    fontSize: stat.primary ? 'var(--fs-card-hero-num)' : 'var(--fs-card-numeral)',
                    lineHeight: 1,
                    color: stat.primary ? 'var(--case)' : 'var(--cream)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {stat.hero}
                </div>

                <div
                  className="deck-body"
                  style={{
                    fontSize: 'var(--fs-slide-subhead)',
                    color: 'var(--cream)',
                    fontWeight: 500,
                  }}
                >
                  {stat.label}
                </div>

                {stat.qualifier && (
                  <div
                    className="deck-mono"
                    style={{
                      fontSize: 'var(--fs-card-meta)',
                      color: 'var(--cream-faint)',
                      letterSpacing: 'var(--ls-mono)',
                    }}
                  >
                    {stat.qualifier}
                  </div>
                )}
              </motion.div>
            ))}
          </div>

          {CONCLUSION && (
            <motion.div
              style={{
                padding: 'var(--space-3) var(--space-5)',
                background: 'color-mix(in srgb, var(--case) 10%, transparent)',
                border: '1px solid color-mix(in srgb, var(--case) 35%, transparent)',
                borderLeft: '4px solid var(--case)',
                borderRadius: 'var(--radius-lg)',
                marginTop: 'auto',
                flex: '0 0 auto',
              }}
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{
                duration: reduced ? 0 : 0.5,
                delay: reduced ? 0 : 1.2,
                ease: EASE,
              }}
            >
              <div
                className="deck-body"
                style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: 'var(--cream)',
                  lineHeight: 1.55,
                }}
              >
                {CONCLUSION}
              </div>
            </motion.div>
          )}
        </div>
      </Viz>

      <Footer
        kicker="01 · HERO STAT"
        tagline="Model-confirmed exposure match."
        source="Source · Replace with actual citation"
      />
    </SlideGrid>
  );
}
