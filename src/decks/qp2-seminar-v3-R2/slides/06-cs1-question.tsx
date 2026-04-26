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

      {/* Stage 1 — Hero question (2026-04-26 user pass)
          Earlier wording "If you can't run the pediatric efficacy trial"
          read as a contradiction with the body copy ("the trial you do
          run gets terminated") — readers asked "didn't you run a trial?"
          Fix: name the SPECIFIC kind of trial that wasn't ethical
          (placebo-controlled). The open-label PK/safety trial that was
          run (AMB112529) is a different beast — disambiguated below. */}
      <Headline delay={0.35} maxChars={74}>
        When a placebo-controlled efficacy trial isn&rsquo;t ethical —{' '}
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
          {/* Constraint subtitle — 2026-04-26 user pass.
              Earlier wording "placebo-controlled efficacy trial isn't an
              option — and the trial you do run gets terminated" read as
              a contradiction (no trial / yes trial). After moving the
              ethics premise into the headline, this subtitle now names
              the SECOND, COMPOUNDING constraint: the open-label PK/safety
              trial we did run (AMB112529) terminated at 41 of 66 enrolled
              — so neither path produced a powered efficacy answer. */}
          <motion.p
            initial={reduced ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: reduced ? 0 : 0.6,
              delay: reduced ? 0 : 0.95,
              ease: EASE,
            }}
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 'var(--lh-snug)',
              color: 'var(--cream)',
              opacity: 0.78,
              fontWeight: 400,
              maxWidth: 'min(52ch, 62%)',
              margin: 0,
            }}
          >
            And the open-label PK/safety trial we did run terminated at
            {' '}<strong style={{ fontWeight: 600, color: 'var(--cream)' }}>41 of 66 enrolled</strong>.
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
              The adult dose came from <strong style={{ fontWeight: 600 }}>380 patients</strong> across 6 placebo-controlled studies — a mature exposure-response.
              <br />
              The pediatric trial — <em style={{ fontStyle: 'italic', opacity: 0.85 }}>open-label, PK-anchored</em> — enrolled <strong style={{ fontWeight: 600 }}>41 of 66 planned</strong>.
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
