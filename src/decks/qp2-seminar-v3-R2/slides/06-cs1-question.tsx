// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 06 — The Clin Pharm question.
 *
 * Hero question + italic constraint subtitle + single story card.
 * The card replaces the three-word preview trio with a ~50-word
 * narrative compression of the entire case — what it is, what makes
 * it hard, what the audience is about to learn. "Bridge" saved for
 * where it pays off later in the deck.
 *
 * Three-stage reveal: question → subtitle → story card (with
 * internal hairline rule drawing left-to-right).
 * Lung at 12% opacity, right-side ambient.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export default function Cs1Question() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      {/* Lung — ambient right, 12% opacity */}
      <motion.div
        aria-hidden
        style={{
          position: 'absolute',
          right: '-6%',
          top: '50%',
          transform: 'translateY(-50%)',
          width: 'clamp(22rem, 40vw, 32rem)',
          opacity: 0.12,
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
          widthOverride="clamp(22rem, 40vw, 32rem)"
        />
      </motion.div>

      <Eyebrow delay={0.2}>
        Case 01 · The question
      </Eyebrow>

      {/* Stage 1 — Hero question (Mariam Option A wording, 2026-04-26)
          Replaces ambiguous "what carries the dose when the trial can't?"
          which read as if the ADULT trial wasn't an option. Concrete now:
          names the pediatric efficacy trial + the 39/66 termination. */}
      <Headline delay={0.35} maxChars={70}>
        If you can&rsquo;t run the pediatric efficacy trial —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          what carries the dose?
        </span>
      </Headline>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          gap: 'clamp(var(--space-6), 5vh, var(--space-10))',
          paddingTop: 'clamp(var(--space-2), 2vh, var(--space-4))',
        }}>
          {/* Constraint subtitle (Fraunces italic) — 2026-04-26 Mariam pass.
              Concrete numbers (39 of 66) replace the soft "held, contested,
              and short" phrasing. Names the disruption explicitly so the
              audience reads slide 11 (three disruptions) as proof, not surprise. */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 0.95,
              ease: EASE,
            }}
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-snug)',
              fontStyle: 'italic',
              color: 'var(--cream-muted)',
              fontWeight: 400,
              maxWidth: 'min(48ch, 60%)',
              margin: 0,
            }}
          >
            A placebo-controlled pediatric efficacy trial isn&rsquo;t an option
            {' — '}and the trial you do run gets terminated at 39 of 66 planned patients.
            {' '}The dose has to come from somewhere else.
          </motion.p>

          {/* Story card — the case in one breath */}
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: reduced ? 0 : 0.5,
              delay: reduced ? 0 : 1.70,
              ease: EASE,
            }}
            style={{
              maxWidth: 'min(45rem, 55%)',
              borderLeft: '3px solid var(--case)',
              borderRadius: 2,
              background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
              padding: 'clamp(var(--space-5), 2vw, var(--space-7))',
            }}
          >
            <div
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 400,
              }}
            >
              The adult dose came from <strong style={{ fontWeight: 600 }}>380 patients</strong> across 6 studies — a mature exposure-response.
              <br />
              The pediatric trial enrolled <strong style={{ fontWeight: 600 }}>41 of 66 planned</strong>. No placebo arm possible.
              <br />
              Held by a juvenile rat finding. Reframed by a sildenafil mortality signal. Constrained by split commercial rights.
            </div>

            <motion.div
              aria-hidden
              initial={reduced ? false : { scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: reduced ? 0 : 0.4,
                delay: reduced ? 0 : 1.90,
                ease: EASE,
              }}
              style={{
                width: 'clamp(40px, 5vw, 60px)',
                height: 1,
                background: 'var(--case)',
                opacity: 0.4,
                transformOrigin: 'left',
                margin: 'var(--space-5) 0',
              }}
            />

            <div
              className="deck-display"
              style={{
                fontSize: 'var(--fs-slide-lead)',
                lineHeight: 1.5,
                color: 'var(--cream)',
                fontWeight: 500,
                fontStyle: 'italic',
              }}
            >
              A defensible pediatric dose came out anyway.
              <br />
              This case is how.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.2}
        kicker="06 · CS1 · QUESTION"
        tagline="The decision before the model."
      />
    </SlideGrid>
  );
}
