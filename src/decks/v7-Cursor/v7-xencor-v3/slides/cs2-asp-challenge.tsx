// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 Asparlas · Challenge — 94 clean / undeliverable.
 * Conclusion title · bordered 94-vs-60 · inbound seam named.
 */

export default function Cs2AspChallenge() {
  const reduce = useReducedMotion();
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.15,
    headline: 0.25,
    subhead: 0.45,
    seam: 0.7,
    compare: 0.95,
    question: 1.35,
    source: 1.7,
  };

  return (
    <SlideGrid dataCase="3" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--xc-case-3)" delay={D.eyebrow}>
        Case 03 · Challenge
      </Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        Ninety-four patients was mathematically clean and{' '}
        <span style={{ color: 'var(--xc-case-3)', fontStyle: 'italic', fontWeight: 700 }}>
          operationally undeliverable
        </span>
        .
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Adult Ph− ALL · pediatric label already approved (2018) · NSAA surrogate settled.
        Not scientific doubt —{' '}
        <span style={{ color: 'var(--xc-case-3)', fontWeight: 600 }}>operational feasibility</span>.
        At the observed enrollment rate, the endpoint-powered plan pushed the answer to ~2028.
      </Subhead>

      <Viz>
        <div className="asp-viz-stack">
          <motion.div
            className="asp-seam-strip"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease, delay: D.seam }}
          >
            <span className="asp-seam-strip__label">Inbound</span>
            <span>
              <strong>Interpolation</strong> → <strong>transport</strong> →{' '}
              <strong>design</strong> — the first two cases argued from evidence that already
              existed; this one changes the study before it runs.
            </span>
          </motion.div>

          <motion.div
            className="asp-n-compare"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: D.compare }}
          >
            <div className="asp-n-card asp-n-card--muted">
              <div className="asp-n-card__kick">Endpoint-powered protocol</div>
              <div className="asp-n-card__value" style={{ color: 'var(--cream)' }}>
                94
              </div>
              <div className="asp-n-card__body">
                Primary-endpoint-evaluable adults · powered against a 90% NSAA target —
                correct arithmetic, wrong decision if the trial cannot enrol.
              </div>
            </div>

            <div className="asp-n-vs" aria-hidden>
              vs
            </div>

            <div className="asp-n-card asp-n-card--accent">
              <div className="asp-n-card__kick">Precision-anchored redesign</div>
              <div className="asp-n-card__value">60</div>
              <div className="asp-n-card__body">
                Design target under an informative pediatric prior (N = 124) — adults augment
                the model; they do not rebuild it.
              </div>
            </div>
          </motion.div>

          <motion.div
            className="asp-coda"
            initial={reduce ? false : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease, delay: D.question }}
          >
            Could a{' '}
            <strong>smaller, precision-anchored design</strong> still be defensible to FDA —
            when most of the information already existed in children?
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Challenge"
        source="Source · FDA label 761102 (Dec 2018) · NCT04817761 · pediatric PopPK N = 124"
        delay={D.source}
      />
    </SlideGrid>
  );
}
