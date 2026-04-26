import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Act 1 (Setup) — The Clin Pharm question.
 *
 * MIN-DESIGN. The question slide. Single typographic statement
 * occupying the viz; left vertical accent rail in coral; below the
 * question, the operating constraints ("what we cannot do").
 *
 * v2 design pass: candidate for a quote-card pattern with hand-drawn
 * underline accent on the load-bearing phrase ("exposure-matching
 * grounds"). No SVG yet.
 */

const CONSTRAINTS = [
  '~40 patients globally — most on background therapy that cannot be changed',
  'Placebo-controlled efficacy trial is unethical (no untreated arm acceptable)',
  '6MWD is the least-bad endpoint; 7-yr-olds are out of scope',
  'EMA PIP commitment (EMEA-000434-PIP01-08) signed in 2008 — the clock is running',
];

export default function Cs1Question() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 · The Clin Pharm question
      </Eyebrow>

      <Headline delay={0.25} maxChars={42}>
        You cannot run the adult trial.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          So what evidence carries the dose?
        </span>
      </Headline>

      <Viz>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.1fr) minmax(0, 1fr)',
          gap: 'clamp(var(--space-6), 5vw, var(--space-12))',
          alignItems: 'start',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* LEFT: the question, large + serif italic emphasis on the spine phrase */}
          <motion.div
            initial={{ opacity: 0, x: -8 }}
            animate={reduced ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              borderLeft: '3px solid var(--coral)',
              paddingLeft: 'clamp(var(--space-4), 2.5vw, var(--space-6))',
            }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--coral)',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}>
              The question we had to answer
            </div>
            <div className="deck-display" style={{
              marginTop: 'var(--space-3)',
              fontSize: 'clamp(1.4rem, 2.7vw, 2.1rem)',
              lineHeight: 1.25,
              color: 'var(--cream)',
              fontWeight: 500,
              letterSpacing: '-0.01em',
              maxWidth: '32ch',
            }}>
              Can we defend a body-weight–based pediatric dosing scheme on{' '}
              <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 600 }}>
                exposure-matching grounds
              </span>
              , against an adult exposure-response benchmark, in a population we will never adequately power for efficacy?
            </div>
          </motion.div>

          {/* RIGHT: the constraints — what makes the question hard */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.1, ease: [0.2, 0.7, 0.3, 1] }}
            style={{ minWidth: 0 }}
          >
            <div className="deck-mono uppercase" style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              color: 'var(--cream-faint)',
              letterSpacing: '0.12em',
              fontWeight: 600,
            }}>
              What we cannot do
            </div>
            <ul style={{
              listStyle: 'none',
              padding: 0,
              margin: 'var(--space-3) 0 0 0',
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
            }}>
              {CONSTRAINTS.map((c, i) => (
                <li key={i} className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.86,
                  lineHeight: 1.4,
                  paddingLeft: 'var(--space-4)',
                  position: 'relative',
                }}>
                  <span aria-hidden style={{
                    position: 'absolute',
                    left: 0,
                    top: '0.5em',
                    width: 'var(--space-3)',
                    height: 'var(--stroke-hair)',
                    background: 'var(--coral)',
                    opacity: 0.65,
                  }} />
                  {c}
                </li>
              ))}
            </ul>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Case 01 · Setup — the question we had to answer"
        tagline="Frame the question precisely; the rest of the case writes itself."
      />
    </SlideGrid>
  );
}
