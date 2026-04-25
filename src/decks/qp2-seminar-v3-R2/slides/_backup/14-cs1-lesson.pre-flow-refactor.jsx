import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 7 (What this case proves) — three Director-level lessons.
 *
 * MIN-DESIGN. R16-compliant: portable principle, NO company-specific
 * bridging on slide. (MOONBEAM / sotatercept bridge held as a Q&A
 * pivot per R2R-06 item 10.)
 *
 * v2 design pass: candidate for v2's recap-card pattern (RecapCard
 * with theme-numbered eyebrow + payoff italic + proof body) — already
 * fully specified in CLAUDE.md "Card patterns → A. RecapCard".
 */

const LESSONS = [
  {
    n: '01',
    payoff: 'Exposure-matching beats underpowered efficacy.',
    proof: 'When the indication will not let you run the adult trial, do not over-claim efficacy. Match exposure honestly and let the regulatory framework do the rest.',
  },
  {
    n: '02',
    payoff: 'Allometric PopPK earns its keep when the prerequisites hold.',
    proof: 'It works when the adult exposure-response is mature AND the pediatric PK is honestly modeled. Either pillar missing and the bridge collapses.',
  },
  {
    n: '03',
    payoff: 'Regulatory ownership structure can stop a package from shipping.',
    proof: 'The FDA gap was not a Clin Pharm result — it was a commercial-rights split. Name that honestly. Do not let the org chart get blamed on the dataset.',
  },
];

export default function Cs1Lesson() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · What this case proves
      </Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Three Director-level lessons —{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          portable beyond ambrisentan.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        The principle outlives the molecule. These three rules generalize to any
        rare-pediatric extrapolation Clin Pharm is asked to defend.
      </Subhead>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
          gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
          alignItems: 'stretch',
        }}>
          {LESSONS.map((l, i) => (
            <motion.div
              key={l.n}
              initial={{ opacity: 0, y: 12 }}
              animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85 + i * 0.14, ease: [0.2, 0.7, 0.3, 1] }}
              style={{
                position: 'relative',
                minWidth: 0,
                border: '1px solid var(--cream-hairline)',
                background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
                borderRadius: 'var(--radius-lg)',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                paddingLeft: 'calc(clamp(var(--space-4), 2vw, var(--space-6)) + 4px)',
                overflow: 'hidden',
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              {/* 4px coral left rail */}
              <div aria-hidden style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 4,
                background: 'var(--coral)',
              }} />
              <div className="deck-mono" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--coral)',
                letterSpacing: '0.12em',
                fontWeight: 700,
                fontVariantNumeric: 'tabular-nums',
              }}>
                LESSON {l.n}
              </div>
              <div className="deck-display italic" style={{
                fontSize: 'clamp(1.15rem, 2vw, 1.5rem)',
                color: 'var(--coral)',
                fontWeight: 600,
                lineHeight: 1.2,
                letterSpacing: '-0.005em',
              }}>
                {l.payoff}
              </div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream)',
                opacity: 0.86,
                lineHeight: 1.5,
                marginTop: 'var(--space-1)',
              }}>
                {l.proof}
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Lessons that travel beyond ambrisentan"
        tagline="The principle outlives the molecule — that is what 'Director-level' means."
      />
    </SlideGrid>
  );
}
