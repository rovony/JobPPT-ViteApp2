import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS1 · Slide 07 — Context (merged disease + class precedent).
 *
 * Per CS1 STRUCTURAL FLOW REBUILD spec:
 *   - Compresses BG-1 disease + BG-2 class into ONE editorial slide.
 *   - LEFT: 3 disease facts stacked (rare → fatal-without-treatment →
 *     drug-poor)
 *   - RIGHT: 2 class precedent cards (STARTS-2 cautionary tale,
 *     FUTURE-1/2 methodological inheritance) — coral rail on the
 *     precedent ambrisentan inherits from; cream rail on the closed door.
 *
 * Subhead is rendered as a custom GridSlot at --fs-slide-lead in upright
 * deck-body (NOT the standard <Subhead> which is deck-display italic) —
 * per CLAUDE.md italic-Fraunces ban under 24px and the prompt's explicit
 * "upright" instruction.
 *
 * The lung is NOT on this slide; it lives on slides 05 + 06 only.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const DISEASE = [
  {
    n: '01',
    head: '14–20 / million',
    body: 'pediatric PAH prevalence — at most a few hundred patients per country (Ivy 2020)',
  },
  {
    n: '02',
    head: '<1 yr → ~90%',
    body: 'untreated median survival pre-modern era; 5-year survival on modern multi-modal therapy',
  },
  {
    n: '03',
    head: 'Few peds labels',
    body: 'across the 4 PAH drug classes — drug-poor by construction (ICH E11A 2024)',
  },
];

const CLASS_CARDS = [
  {
    rail: 'cream',
    head: 'STARTS-2 · empirical placebo',
    body: 'Sildenafil pediatric efficacy trial. EMA accepted; FDA didn\'t. The trauma that closed the door on empirical placebo trials in pediatric PAH.',
  },
  {
    rail: 'coral',
    head: 'FUTURE-1/2 · PK-matching',
    body: 'Bosentan pediatric. Exposure-matching as the regulatory bridge. The methodology ambrisentan inherits from.',
  },
];

function ColumnTitle({ children, delay, reduced }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={reduced ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: '0.10em',
        color: 'var(--coral)',
        fontWeight: 700,
      }}
    >
      {children}
    </motion.div>
  );
}

function Card({ rail, head, body, delay, reduced }) {
  const isCoral = rail === 'coral';
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={reduced ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: isCoral
          ? '1px solid color-mix(in srgb, var(--coral) 28%, transparent)'
          : '1px solid var(--cream-hairline)',
        borderLeft: isCoral ? '3px solid var(--coral)' : '3px solid var(--cream-faint)',
        borderRadius: 'var(--radius-md)',
        background: isCoral
          ? 'color-mix(in srgb, var(--coral) 5%, transparent)'
          : 'color-mix(in srgb, var(--panel) 60%, transparent)',
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
        {head}
      </div>
      <div className="deck-body" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: 'var(--cream)',
        opacity: 0.82,
        lineHeight: 1.4,
      }}>
        {body}
      </div>
    </motion.div>
  );
}

export default function Cs1Context() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.25}>
        Case 01 · Why the question is hard
      </Eyebrow>

      <Headline delay={0.45} maxChars={56}>
        A disease too rare to power.{' '}
        <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 500 }}>
          A class history that says empirical dose-finding doesn't work.
        </span>
      </Headline>

      {/* Custom subhead slot: lead size, UPRIGHT deck-body (Inter sans),
          per spec — NOT the standard <Subhead> which is deck-display italic. */}
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
        The case isn't about the molecule. It's about what evidence you can
        build when the trial alone won't be enough.
      </GridSlot>

      <Viz>
        <div style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
          gap: 'clamp(var(--space-4), 3vw, var(--space-6))',
          alignItems: 'start',
          paddingTop: 'clamp(var(--space-3), 3vh, var(--space-6))',
        }}>
          {/* LEFT — disease (3 stacked cards) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
            minWidth: 0,
          }}>
            <ColumnTitle delay={0.78} reduced={reduced}>
              The disease
            </ColumnTitle>
            {DISEASE.map((d, i) => (
              <Card
                key={d.n}
                rail="coral"
                head={d.head}
                body={d.body}
                delay={0.85 + i * 0.10}
                reduced={reduced}
              />
            ))}
          </div>

          {/* RIGHT — class history (2 cards: STARTS-2 cream, FUTURE-1/2 coral) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
            minWidth: 0,
          }}>
            <ColumnTitle delay={1.13} reduced={reduced}>
              The class history
            </ColumnTitle>
            {CLASS_CARDS.map((c, i) => (
              <Card
                key={c.head}
                rail={c.rail}
                head={c.head}
                body={c.body}
                delay={1.20 + i * 0.15}
                reduced={reduced}
              />
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.7}
        kicker="07 · CS1 · CONTEXT"
        tagline="Empirical is closed. PK-matching is the live alternative."
        source="Sources · Ivy et al. 2020 · ICH E11A 2024"
      />
    </SlideGrid>
  );
}
