import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 06 — The Clin Pharm question (lung morph destination).
 *
 * Per CS1 STRUCTURAL FLOW REBUILD spec:
 *   - Front-loads the Clin Pharm question to slide 06 (was 08).
 *   - Lung morphs in from slide 05 (CaseHeroDivider hero variant) via
 *     shared layoutId="cs1-lung". Editorial backdrop only — opacity 0.18,
 *     bleeds slightly off the right edge. Question is the foreground.
 *   - LEFT 60%: italic display pull-quote, italic only on the
 *     "exposure-matching grounds" span.
 *   - RIGHT 40%: three constraint cards (RecapCard pattern).
 *
 * Section mounts opaque (initial: { opacity: 1 }) per CLAUDE.md
 * cross-slide morph rule — the slide-level fade is owned by
 * SlideTransition.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CONSTRAINTS = [
  {
    n: '01',
    head: '~40 patients',
    body: 'global trial pool — most on background therapy that cannot ethically be changed',
  },
  {
    n: '02',
    head: 'no placebo arm',
    body: 'ethically untestable in a fatal pediatric disease',
  },
  {
    n: '03',
    head: 'adult ER known',
    body: 'ARIES-1/2 already characterized adult exposure–response — that is the anchor we have',
  },
];

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Lung morph layer — absolute, outside grid placement; section is
          relative-positioned so this anchors to the slide bounds. Stays
          BEHIND foreground content (zIndex 0). The question wins.
          layoutId="cs1-lung" pairs with slide 05 CaseHeroDivider's hero
          lung; framer-motion FLIPs from divider's illustration column to
          this background overlay. opacity 0.18 is set statically (NOT
          animated) so the FLIP doesn't fight an opacity ramp. */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-8%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(20rem, 38vw, 30rem)',
          opacity: 0.18,
          pointerEvents: 'none',
          zIndex: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lungs
          layoutId="cs1-lung"
          variant="context"
          widthOverride="clamp(20rem, 38vw, 30rem)"
        />
      </motion.div>

      <Eyebrow color="var(--coral)" delay={0.25}>
        Case 01 · The question
      </Eyebrow>

      <Headline delay={0.45} maxChars={42}>
        You can't run the adult trial.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          So what evidence carries the dose?
        </span>
      </Headline>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.5fr) minmax(0, 1fr)',
          gap: 'clamp(var(--space-4), 4vw, var(--space-10))',
          alignItems: 'center',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
          position: 'relative',
          zIndex: 1,
        }}>
          {/* LEFT — pull-quote (the canonical Clin Pharm question) */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              maxWidth: 'min(52ch, 100%)',
              minWidth: 0,
            }}
          >
            Can we defend a body-weight–based pediatric dosing scheme on{' '}
            <span style={{
              color: 'var(--cream)',
              fontStyle: 'italic',
              fontWeight: 500,
            }}>
              exposure-matching grounds
            </span>
            , against an adult exposure–response benchmark, in a population we
            will never adequately power for efficacy?
          </motion.div>

          {/* RIGHT — three constraint cards (RecapCard pattern, condensed) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.6vw, var(--space-4))',
            minWidth: 0,
          }}>
            {CONSTRAINTS.map((c, i) => (
              <motion.div
                key={c.n}
                initial={{ opacity: 0, y: 10 }}
                animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  delay: 1.10 + i * 0.15,
                  ease: EASE,
                }}
                style={{
                  position: 'relative',
                  minWidth: 0,
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '3px solid var(--coral)',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                  padding: 'clamp(var(--space-3), 1.4vw, var(--space-4)) clamp(var(--space-3), 1.6vw, var(--space-5))',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 'var(--space-1)',
                }}
              >
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-name)',
                  color: 'var(--cream)',
                  fontWeight: 600,
                  letterSpacing: '-0.01em',
                  lineHeight: 1.1,
                }}>
                  {c.head}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  opacity: 0.82,
                  lineHeight: 1.4,
                }}>
                  {c.body}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.85}
        kicker="06 · CS1 · QUESTION"
        tagline="The decision before the model."
      />
    </SlideGrid>
  );
}
