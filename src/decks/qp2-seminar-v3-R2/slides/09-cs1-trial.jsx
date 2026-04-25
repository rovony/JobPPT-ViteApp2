import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 4 (Velocity) — AMB112529 trial design + LTE.
 *
 * MIN-DESIGN. Two-card structure: parent trial + LTE. Per CLAUDE.md
 * "Card / label widths use REM, not raw PX". v2 design pass: candidate
 * for a horizontal date axis with PIP-signed (2008), randomization
 * (2011), termination (Feb 2019), LTE-completion (June 2022) markers.
 *
 * Verified facts (from R2R-05 primary-source notes):
 *   - AMB112529 = NCT01332331 (parent Phase IIb)
 *   - LTE = NCT01342952 (open-label long-term extension)
 *   - 41 randomized; 39 evaluable for PK
 *   - 8 to <18 years; three weight bands
 *   - 211 pediatric PK observations (NOT 285)
 *   - PIP signed 2008 (EMEA-000434-PIP01-08)
 *   - Termination Feb 2019 (juvenile rat brain weight at 20 mg/kg/day)
 *   - LTE completion 2022-06-09; 3.5y median exposure
 */

const TRIALS = [
  {
    code: 'AMB112529',
    nct: 'NCT01332331',
    role: 'Parent Phase IIb',
    n: '41 randomized · 39 evaluable for PK',
    age: '8 to <18 years · three weight bands',
    obs: '211 pediatric PK observations',
    period: '2008 PIP signed → 2011 randomization → 2019 formal termination',
  },
  {
    code: 'LTE',
    nct: 'NCT01342952',
    role: 'Open-label long-term extension',
    n: '38 enrolled',
    age: 'Same population, durability + safety follow-up',
    obs: '3.5-year median exposure',
    period: 'Completed 2022-06-09 · 2024 EurJPed long-term safety publication',
  },
];

export default function Cs1Trial() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · Trial design
      </Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        Two trials.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          One PIP commitment.
        </span>{' '}
        Fourteen years on the clock.
      </Headline>

      <Subhead delay={0.55} maxChars={92} size="lead">
        AMB112529 carried the dose; the LTE carried the durability. The PIP
        commitment carried the regulatory clock between them.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
          gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {TRIALS.map((t, i) => (
            <motion.div
              key={t.code}
              initial={{ opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              style={{
                minWidth: 0,
                border: '1px solid color-mix(in srgb, var(--coral) 30%, transparent)',
                borderLeft: '3px solid var(--coral)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--coral) 5%, transparent)',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--coral)',
                letterSpacing: '0.1em',
                fontWeight: 600,
              }}>
                {t.role}
              </div>
              <div className="deck-display" style={{
                fontSize: 'clamp(1.4rem, 2.6vw, 2rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                lineHeight: 1.05,
                letterSpacing: '-0.015em',
              }}>
                {t.code}
              </div>
              <div className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream-faint)',
                letterSpacing: '0.06em',
                fontVariantNumeric: 'tabular-nums',
              }}>
                {t.nct}
              </div>
              <div aria-hidden style={{
                width: '100%',
                height: 'var(--stroke-hair)',
                background: 'var(--cream-hairline)',
                marginTop: 'var(--space-2)',
              }} />
              <FactRow label="N / population" value={t.n} />
              <FactRow label="Design" value={t.age} />
              <FactRow label="Observations" value={t.obs} />
              <FactRow label="Timeline" value={t.period} />
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Velocity — fourteen years end-to-end"
        tagline="A trial that ran, terminated, then a long-term extension that finished what the parent could not."
        source="Source · ClinicalTrials.gov NCT01332331 · NCT01342952 · EMEA-000434-PIP01-08"
      />
    </SlideGrid>
  );
}

function FactRow({ label, value }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-0)' }}>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        color: 'var(--cream-faint)',
        letterSpacing: '0.1em',
      }}>
        {label}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.86,
        lineHeight: 1.4,
      }}>
        {value}
      </div>
    </div>
  );
}
