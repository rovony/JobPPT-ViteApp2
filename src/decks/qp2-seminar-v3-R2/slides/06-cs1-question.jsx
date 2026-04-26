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

      {/* Stage 1 — Hero question */}
      <Headline delay={0.35} maxChars={30}>
        What carries the dose{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          when the trial can't?
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
          {/* Constraint subtitle (Fraunces italic) */}
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
              maxWidth: 'min(44ch, 58%)',
              margin: 0,
            }}
          >
            When a placebo-controlled efficacy trial isn't feasible
            {' — '}and the trial that runs is held, contested, and short
            {' — '}the dose has to come from somewhere else.
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
              The adult dose came from a placebo-controlled trial.
              <br />
              That trial wasn't possible in children.
              <br />
              The trial we did run was held, contested, and short.
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
