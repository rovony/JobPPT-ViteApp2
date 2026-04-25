import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 12 — Bracket Method (leadership ownership).
 *
 * Per CS1 STRUCTURAL FLOW REBUILD spec: this slide POSITIONS the
 * leadership ownership BEFORE the verdict. The audience reads it as
 * "results landed → here's how the work was distributed → therefore the
 * agencies acted." Leadership earns the verdict instead of trailing as
 * gratitude.
 *
 * Bracket-shape composition: two columns separated by a vertical hairline
 * rule. Left = "I OWNED"; right = "THE TEAM OWNED". Bottom thesis line
 * names what the bracket actually does — both sides have to hold.
 *
 * Subhead is rendered as a custom GridSlot at --fs-slide-lead in upright
 * deck-body per the spec's explicit "upright" instruction.
 *
 * All collaborator names are public co-authors of Ivy 2020 (J Pediatr X)
 * and Okour 2023 (J Clin Pharmacol).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const I_OWNED = [
  'The pediatric population PK model',
  'The exposure–response analysis',
  'The regulatory narrative for the EMA PIP',
];

const TEAM_OWNED = [
  'Pediatric trial conduct — Beghetti, Berger, Lukas, Ivy',
  'Long-term extension retention — site investigators across 4 continents',
  'Pharmacokinetic sample collection — clinical operations',
  'Regulatory submissions — Beerahee + filing teams',
  'The trust of the field — clinicians and families',
];

function ColumnHeader({ label, color, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={reduced ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: '0.10em',
        color,
        fontWeight: 700,
      }}
    >
      {label}
    </motion.div>
  );
}

function BodyLine({ children, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      className="deck-body"
      style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream-muted)',
        lineHeight: 1.45,
        fontWeight: 400,
      }}
    >
      {children}
    </motion.div>
  );
}

export default function Cs1Bracket() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.25}>
        Case 01 · Ownership
      </Eyebrow>

      <Headline delay={0.45} maxChars={56}>
        Owned the model.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          Credited the team that owned the trial.
        </span>
      </Headline>

      {/* Custom subhead slot: lead size, UPRIGHT deck-body per spec. */}
      <GridSlot
        area="subhead"
        motion={{
          initial: { opacity: 0, y: 10 },
          animate: { opacity: 1, y: 0 },
          delay: 0.65,
        }}
        className="deck-body self-start"
        style={{
          fontSize: 'var(--fs-slide-lead)',
          color: 'var(--cream)',
          opacity: 0.78,
          fontWeight: 400,
          lineHeight: 1.4,
          maxWidth: '78ch',
          margin: 0,
        }}
      >
        The 3% AUC match was modeling and analysis. Everything around
        it — the trial, the long-term follow-up, the regulatory craft —
        was the team.
      </GridSlot>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* Bracket — two columns separated by a vertical hairline rule.
              auto-fit ensures graceful reflow on narrow viewports (the
              vertical rule is hidden when columns stack). */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'clamp(var(--space-6), 5vw, var(--space-10))',
            alignItems: 'start',
            position: 'relative',
          }}>
            {/* Vertical hairline rule. scaleY entrance from top.
                Hidden on narrow viewports where columns stack. */}
            <motion.div
              aria-hidden
              initial={{ scaleY: 0, opacity: 0 }}
              animate={reduced ? { scaleY: 1, opacity: 1 } : { scaleY: 1, opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85, ease: EASE }}
              className="hidden md:block"
              style={{
                position: 'absolute',
                left: '50%',
                top: '10%',
                bottom: '10%',
                width: 1,
                background: 'var(--cream-faint)',
                transformOrigin: 'top center',
                pointerEvents: 'none',
              }}
            />

            {/* LEFT — what I owned */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: 0,
              borderLeft: '3px solid var(--coral)',
              paddingLeft: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
            }}>
              <ColumnHeader
                label="I owned"
                color="var(--coral)"
                delay={1.00}
                reduced={reduced}
              />
              {I_OWNED.map((line, i) => (
                <BodyLine key={line} delay={1.15 + i * 0.10} reduced={reduced}>
                  {line}
                </BodyLine>
              ))}
            </div>

            {/* RIGHT — what the team owned */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-3)',
              minWidth: 0,
              borderLeft: '3px solid var(--cream-faint)',
              paddingLeft: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
            }}>
              <ColumnHeader
                label="The team owned"
                color="var(--cream-faint)"
                delay={1.00}
                reduced={reduced}
              />
              {TEAM_OWNED.map((line, i) => (
                <BodyLine key={line} delay={1.20 + i * 0.10} reduced={reduced}>
                  {line}
                </BodyLine>
              ))}
            </div>
          </div>

          {/* Bottom thesis line — the bracket-method payoff */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.95, ease: EASE }}
            className="deck-body"
            style={{
              marginTop: 'var(--space-6)',
              fontSize: 'var(--fs-slide-tagline)',
              color: 'var(--cream)',
              lineHeight: 1.5,
              fontWeight: 500,
              textAlign: 'center',
              maxWidth: '60ch',
              marginLeft: 'auto',
              marginRight: 'auto',
            }}
          >
            Both sides of that bracket had to hold for the agencies to act.
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.20}
        kicker="12 · CS1 · OWNERSHIP"
        tagline="What every Director-level case has and most case studies hide."
      />
    </SlideGrid>
  );
}
