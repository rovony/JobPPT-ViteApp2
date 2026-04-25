import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

// === HOOK-AWARE BRIDGE TAGLINE TOGGLE ===
// Match this to whichever hook is active in slide 02.
// To swap: comment the active line, uncomment the alternate.
const BRIDGE_TAGLINE = "In CS1, the trial was untrialable. In CS2, the trial was unavailable. Same function, different shape.";
// const BRIDGE_TAGLINE = "In CS1, the model became the dose. In CS2, the dossier becomes the trial.";
// ====================================================

/**
 * CS1 · Slide 15 — CS1 → CS2 bridge (hook-aware tagline).
 *
 * Per CS1 STRUCTURAL FLOW REBUILD spec: the bridge slide visual stays
 * (headline + closing-ribbon vocabulary per CLAUDE.md ribbon pattern),
 * but the load-bearing tagline is now driven by a top-of-file constant
 * that toggles per active hook (Hook A "trial isn't the answer" or
 * Hook G "decision is the product").
 *
 * The BRIDGE_TAGLINE is rendered as upright deck-body (NOT italic
 * Fraunces) per CLAUDE.md italic-Fraunces ban under 24px. Footer
 * carries kicker only — the tagline IS the slide's load-bearing line.
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
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'clamp(var(--space-5), 5vh, var(--space-10))',
          padding: 'clamp(var(--space-3), 4vh, var(--space-8)) 0',
        }}>
          {/* BRIDGE_TAGLINE — load-bearing prose line, hook-aware.
              Upright deck-body per spec; italic-Fraunces banned at this size. */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              opacity: 0.82,
              fontWeight: 400,
              lineHeight: 1.5,
              maxWidth: 'min(60ch, 100%)',
              textAlign: 'center',
            }}
          >
            {BRIDGE_TAGLINE}
          </motion.div>

          {/* Closing-ribbon — rotate-45 amber square + pointer text to CS2.
              Visual unchanged from prior version per spec; inner text
              updated to "Three decisions ahead. Case 02 — the
              regulatory bridge." */}
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.40, ease: [0.2, 0.7, 0.3, 1] }}
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
              transition={{ duration: 0.4, delay: 1.55, ease: [0.34, 1.56, 0.64, 1] }}
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
              transition={{ duration: 0.5, delay: 1.75 }}
            >
              Three decisions ahead.{' '}
              <motion.span
                style={{ color: 'var(--cyan)', fontWeight: 600 }}
                initial={{ color: 'var(--cream)' }}
                animate={reduced
                  ? { color: 'var(--cyan)' }
                  : { color: 'var(--cyan)' }}
                transition={{ duration: 0.4, delay: 2.55 }}
              >
                Case 02 — the regulatory bridge.
              </motion.span>
            </motion.div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.85}
        kicker="15 · CS1 CLOSES · CS2 OPENS"
      />
    </SlideGrid>
  );
}
