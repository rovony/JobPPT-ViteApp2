import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 → CS2 bridge — population shift framing.
 *
 * MIN-DESIGN. The transition slide. Closing-ribbon vocabulary per
 * CLAUDE.md "Patterns Library → Closing / conclusion / next ribbon
 * pattern". The audience reads it as "ending → opening" — one
 * continuous gesture into the cyan cascade of CS2.
 *
 * v2 design pass: candidate for a shared-element morph from this
 * slide's amber rotate-45 square into CS2 divider's accent rule
 * (Motion layoutId).
 */

export default function Cs1Bridge() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.10}>
        Case 01 → Case 02 · the bridge
      </Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        From a population we{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          could not ethically test
        </span>
        {' '}— to a population we{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
          could not geographically reach.
        </span>
      </Headline>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'clamp(var(--space-4), 6vh, var(--space-12)) 0',
        }}>
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            style={{
              maxWidth: 'clamp(28rem, 70vw, 56rem)',
              display: 'flex',
              alignItems: 'center',
              gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
              padding: 'var(--space-4) var(--space-6)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <motion.div
              aria-hidden
              style={{
                flexShrink: 0,
                transform: 'rotate(45deg)',
                width: 'clamp(0.875rem, 1.4vw, 1.25rem)',
                height: 'clamp(0.875rem, 1.4vw, 1.25rem)',
                background: 'var(--amber)',
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={reduced ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 1.0, ease: [0.34, 1.56, 0.64, 1] }}
            />
            <motion.div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                color: 'var(--cream)',
                opacity: 0.88,
                lineHeight: 1.5,
                fontWeight: 400,
                flex: 1,
              }}
              initial={{ opacity: 0 }}
              animate={reduced ? { opacity: 0.88 } : { opacity: 0.88 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              Same Clin Pharm function — different impossibility.{' '}
              <motion.span
                style={{ color: 'var(--cyan)', fontWeight: 600 }}
                initial={{ color: 'var(--cream)' }}
                animate={reduced
                  ? { color: 'var(--cyan)' }
                  : { color: 'var(--cyan)' }}
                transition={{ duration: 0.4, delay: 2.0 }}
              >
                Next: Ivosidenib in India — when the trial cannot reach the patients.
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.4}
        kicker="Case 01 closes · Case 02 opens"
        tagline="One discipline. Two impossibilities. The handoff to CS2."
      />
    </SlideGrid>
  );
}
