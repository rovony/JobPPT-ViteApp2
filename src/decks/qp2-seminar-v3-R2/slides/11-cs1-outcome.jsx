import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 5b (Outcome — clinical numbers + honest framing).
 *
 * MIN-DESIGN. The numbers slide. Surfaces the 7/38 LTE deaths
 * proactively — Director-level move per R2R-01 §C probe 6.
 *
 * Verified facts:
 *   - n=41 randomized; 39 evaluable for PK
 *   - 17% mean 6MWD improvement at end of LTE (n=29 evaluable)
 *   - 7 of 38 LTE deaths — attributed to underlying PAH / RV failure /
 *     COVID-19 / failure to thrive, NOT ambrisentan
 *   - 2024 Eur J Pediatr LTE long-term safety publication confirms
 *
 * v2 design pass: candidate for ImpactNumerals 3-stat composition.
 */

const NUMBERS = [
  { value: '41',  unit: 'randomized',         label: 'AMB112529 enrollment',     tone: 'cream' },
  { value: '17%', unit: 'mean Δ 6MWD · LTE',  label: 'n=29 evaluable at LTE end', tone: 'coral' },
  { value: '7/38', unit: 'LTE deaths',        label: 'attributed to underlying PAH, RV failure, COVID-19, failure to thrive — not ambrisentan', tone: 'cream' },
];

export default function Cs1Outcome() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Outcome — the numbers
      </Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        17% mean 6MWD improvement.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          Seven deaths I'm naming first.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        Mortality is high in pediatric PAH regardless of treatment. The Director
        move is to surface that number before the panel does.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(15rem, 100%), 1fr))',
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          alignItems: 'stretch',
          paddingTop: 'clamp(var(--space-4), 4vh, var(--space-8))',
        }}>
          {NUMBERS.map((s, i) => {
            const accent = s.tone === 'coral' ? 'var(--coral)' : 'var(--cream)';
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 16 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.9 + i * 0.16, ease: [0.2, 0.7, 0.3, 1] }}
                style={{ minWidth: 0, display: 'flex', flexDirection: 'column' }}
              >
                <div aria-hidden style={{
                  width: 'clamp(48px, 8vw, 80px)',
                  height: 'var(--stroke-hair)',
                  background: accent,
                  opacity: s.tone === 'coral' ? 0.75 : 0.45,
                }} />
                <div className="deck-display" style={{
                  fontSize: 'clamp(2.4rem, 5vw, 4.5rem)',
                  color: accent,
                  lineHeight: 0.95,
                  fontWeight: 600,
                  letterSpacing: '-0.025em',
                  marginTop: 'var(--space-2)',
                  fontVariantNumeric: 'tabular-nums',
                }}>
                  {s.value}
                </div>
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cream-faint)',
                  letterSpacing: '0.1em',
                  marginTop: 'var(--space-1)',
                }}>
                  {s.unit}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.84,
                  lineHeight: 1.4,
                  marginTop: 'var(--space-3)',
                  maxWidth: '32ch',
                }}>
                  {s.label}
                </div>
              </motion.div>
            );
          })}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.9}
        kicker="Case 01 · Outcome (clinical) — surface the hard number first"
        tagline="Long-term safety holds; the 2024 EurJPed paper is the post-marketing receipt."
        source="Source · Ivy DD et al. Eur J Pediatr 2024 · DOI 10.1007/s00431-024-05446-1"
      />
    </SlideGrid>
  );
}
