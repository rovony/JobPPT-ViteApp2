// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Asparlas · Strategy — MOVE1 / MOVE2 stacked (blueprint composition).
 * Novelty = composition of two FDA-precedented moves + rejected alts.
 */

const MOVES = [
  {
    n: '01',
    kick: 'Move 1 · Optimal design',
    title: 'Anchor sample size on PK parameter precision — not endpoint power.',
    body: 'D-optimal design under an informative prior. The pediatric PopPK (N = 124) already carries most of the model; adults augment a characterised model rather than rebuild one from zero.',
  },
  {
    n: '02',
    kick: 'Move 2 · PopPK-simulated primary endpoint',
    title: 'Simulate NPAA across virtual patients at the pediatric-label threshold.',
    body: 'Same FDA-agreed NSAA threshold (0.1 U/mL). The trial validates the model; the model answers the clinical question.',
  },
];

export default function Cs2AspStrategy() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.15,
    headline: 0.25,
    subhead: 0.45,
    move1: 0.75,
    move2: 1.05,
    cap: 1.35,
    reject: 1.55,
    source: 1.9,
  };

  return (
    <SlideGrid dataCase="3" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>
        Case 03 · Strategy
      </Eyebrow>
      <Headline delay={D.headline} maxChars={52}>
        Two precedented moves, stacked —{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          the novelty was composition
        </span>
        .
      </Headline>
      <Subhead delay={D.subhead} maxChars={110}>
        Neither move is novel alone. Both are{' '}
        <span style={{ color: 'var(--xc-case-3)', fontWeight: 600 }}>FDA-precedented</span>
        {' '}— combined here for the first time in this adult oncology context.
      </Subhead>

      <Viz>
        <div className="asp-viz-stack">
          <div className="asp-move-stack">
            {MOVES.map((m, i) => (
              <motion.div
                key={m.n}
                className="asp-move-slab"
                initial={reduce ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.5,
                  ease,
                  delay: i === 0 ? D.move1 : D.move2,
                }}
              >
                <span className="asp-move-slab__n">{m.n}</span>
                <div>
                  <div className="asp-move-slab__kick">{m.kick}</div>
                  <div className="asp-move-slab__title">{m.title}</div>
                  <div className="asp-move-slab__body">{m.body}</div>
                </div>
              </motion.div>
            ))}

            <motion.div
              className="asp-move-cap"
              initial={reduce ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: D.cap }}
            >
              Neither move is novel alone — both are FDA-precedented
            </motion.div>
          </div>

          <motion.div
            className="asp-reject-row"
            initial={reduce ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.reject }}
          >
            <div className="asp-reject-card asp-reject-card--hyp">
              <div className="asp-reject-card__kick">Hypothesis this rests on</div>
              <p className="asp-reject-card__body">
                Adult PK is a <strong style={{ color: 'var(--cream)' }}>bounded extension</strong> of
                a well-characterised pediatric model. Competing hypothesis: adult disposition breaks
                prior transportability — that ends the design.
              </p>
            </div>
            <div className="asp-reject-card asp-reject-card--alt">
              <div className="asp-reject-card__kick">What I chose not to do</div>
              <p className="asp-reject-card__body">
                <strong style={{ color: 'var(--cream)' }}>Run 94 as designed</strong> — correct
                arithmetic, wrong decision.{' '}
                <strong style={{ color: 'var(--cream)' }}>Fixed-fraction Bayesian borrowing</strong>{' '}
                — harder to pre-specify at a Type A.{' '}
                <strong style={{ color: 'var(--cream)' }}>Drop the surrogate</strong> — re-opens a
                settled regulatory question.
              </p>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Strategy"
        source="Source · PopED / PFIM · Mentré et al. · NCT04817761 · Asparlas / Rylaze label precedent"
        delay={D.source}
      />
    </SlideGrid>
  );
}
