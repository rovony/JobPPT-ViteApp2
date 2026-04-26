/**
 * TEMPLATE: Editorial Hook (asymmetric thesis / opener)
 *
 * USE FOR: Opening hooks, thesis statements, section openers, closers.
 * NOT for body content — no SlideGrid, no SlideParts.
 *
 * Uses TitleLayout (all chrome OFF). Bespoke absolute positioning.
 * Reference: v3-R2/02-hook-A-trial-not-answer.jsx
 *
 * HOW TO ADAPT:
 * 1. Replace HEADLINE_L1, HEADLINE_L2 with your two-line thesis
 * 2. Replace SUBTITLE with your framing line
 * 3. Replace MARKS with your structural promise pills (or remove)
 * 4. Adjust zone positioning if your headline is longer/shorter
 */

import { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import TitleLayout from '@/components/deck/layouts/TitleLayout';

const EASE = [0.2, 0.7, 0.3, 1];

const EYEBROW = 'OPEN · 02';
const HEADLINE_L1 = 'When the trial';
const HEADLINE_L2 = "isn't the answer.";
const SUBTITLE =
  'Three case studies where the evidence had to come from the model, not the clinic.';

const MARKS = [
  { label: 'UNTRIALABLE' },
  { label: 'UNAVAILABLE' },
  { label: 'UNBUILT' },
];

export default function TplEditorialHook({ deck }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  const fade = (delay) => ({
    initial: reduced ? false : { opacity: 0 },
    animate: go ? { opacity: 1 } : undefined,
    transition: { duration: 0.6, delay, ease: EASE },
  });

  return (
    <TitleLayout deck={deck}>
      <div ref={ref} className="relative h-full w-full" style={{ overflow: 'hidden' }}>
        {/* Zone 1 — Chapter mark (top-left) */}
        <motion.div style={{ position: 'absolute', top: 0, left: 0 }} {...fade(0.1)}>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: '0.08em',
              color: 'var(--cream-muted)',
              fontVariantNumeric: 'tabular-nums',
            }}
          >
            {EYEBROW}
          </div>
          <div
            aria-hidden
            style={{
              width: 64,
              height: 'var(--stroke-hair)',
              background: 'var(--cream-faint)',
              marginTop: 'var(--space-2)',
            }}
          />
        </motion.div>

        {/* Zone 2 — Headline (centered vertical band) */}
        <div
          style={{
            position: 'absolute',
            top: '55%',
            left: 'clamp(var(--space-4), 12%, 12%)',
            right: 'var(--space-4)',
            transform: 'translateY(-50%)',
          }}
        >
          <h1
            className="deck-display"
            style={{
              fontSize: 'clamp(2rem, min(4.4vw, 7vh), 4.5rem)',
              lineHeight: 0.95,
              fontWeight: 'var(--fw-display-md)',
              color: 'var(--cream)',
              letterSpacing: '-0.015em',
              margin: 0,
            }}
          >
            <motion.span style={{ display: 'block' }} {...fade(0.45)}>
              {HEADLINE_L1}
            </motion.span>
            <motion.span
              style={{
                display: 'block',
                paddingLeft: 'clamp(0px, 3em, 12vw)',
              }}
              {...fade(0.65)}
            >
              {HEADLINE_L2}
            </motion.span>
          </h1>

          {/* Subtitle */}
          <motion.p
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
              lineHeight: 1.35,
              margin: 0,
              marginTop: 'var(--space-4)',
              maxWidth: '52ch',
            }}
            {...fade(0.8)}
          >
            {SUBTITLE}
          </motion.p>

          {/* Zone 3 — Structural marks (pills) */}
          {MARKS.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 'clamp(var(--space-3), 4vw, var(--space-10))',
                marginTop: 'var(--space-7)',
              }}
            >
              {MARKS.map((m, i) => (
                <motion.div
                  key={m.label}
                  style={{
                    minWidth: 0,
                    position: 'relative',
                    overflow: 'hidden',
                    border: '1px solid color-mix(in srgb, var(--amber) 36%, transparent)',
                    borderRadius: 'var(--radius-md)',
                    background: 'color-mix(in srgb, var(--amber) 6%, transparent)',
                    padding: 'var(--space-2) var(--space-4)',
                  }}
                  {...fade(1.1 + i * 0.15)}
                >
                  <div
                    aria-hidden
                    style={{
                      position: 'absolute',
                      left: 0,
                      top: 0,
                      bottom: 0,
                      width: 3,
                      background: 'var(--amber)',
                    }}
                  />
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-slide-eyebrow)',
                      letterSpacing: '0.12em',
                      whiteSpace: 'nowrap',
                      color: 'var(--cream)',
                    }}
                  >
                    {m.label}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </TitleLayout>
  );
}
