// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, GridSlot } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 · Setup — decision + no local anchor (beats 1–2).
 * Conclusion H1; decision/cost panels; existed/missing bars; full-width callout.
 * Big entrance, minimal stagger (CS1 craft).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const MISSING = [
  'No Indian PK/PD dataset',
  'No Indian pivotal site',
  'No India-specific PK publication',
];

const HELD = [
  'Pooled PopPK · n = 253 · race not significant',
  'Flat exposure–response at 500 mg QD',
  'PBPK-supported DDI labeling',
];

export default function CS2Setup() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.25 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="2" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.08}>Case 02 · Decision</Eyebrow>

      <GridSlot
        area="headline"
        as="h1"
        className="deck-display xc-hook self-center cs1-decision-h1"
      >
        The regulator asked for local data, and there was no local anchor of any kind
      </GridSlot>

      <Subhead delay={0.12} size="lead" maxChars={78}>
        December 2024 SEC request — 12–18 months of delay for a rare IDH1-mutant AML
        population if the default path held.
      </Subhead>

      <Viz>
        <div ref={ref} className="cs3-decision-viz">
          <div className="cs1-decision-panels">
            <motion.div
              className="cs1-decision-panel"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: reduced ? 0 : 0.2 }}
            >
              <div className="cs1-decision-panel__kick xc-mono">The decision</div>
              <p>
                Run a local PK/PD study, abandon the filing, or justify why the global
                clinical pharmacology package is sufficient — and name what it does not cover.
              </p>
            </motion.div>
            <motion.div
              className="cs1-decision-panel"
              initial={reduced ? false : { opacity: 0, y: 10 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE, delay: reduced ? 0 : 0.32 }}
            >
              <div className="cs1-decision-panel__kick xc-mono">Cost of being wrong</div>
              <p>
                Delay access for patients who already wait on a rare mutation — or overclaim
                transport and lose credibility with CDSCO.
              </p>
            </motion.div>
          </div>

          <div className="cs3-exist-row">
            <motion.div
              className="cs3-exist-card cs3-exist-card--missing"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : 0.45 }}
            >
              <div className="cs3-exist-card__kick">What did not exist</div>
              <ul>
                {MISSING.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
            <motion.div
              className="cs3-exist-card cs3-exist-card--held"
              initial={reduced ? false : { opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE, delay: reduced ? 0 : 0.55 }}
            >
              <div className="cs3-exist-card__kick">What did exist</div>
              <ul>
                {HELD.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          </div>

          <aside className="xc-callout cs1-callout-full">
            Case 01 had an adult anchor the regulator could see. Here there was nothing on
            the far side to point at — the job was not interpolation, it was{' '}
            <strong className="xc-case">justifying that the whole package transports</strong>.
          </aside>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Setup"
        tagline=""
        source="CDSCO SEC public minutes · Dec 2024 · Jiang CTS 2021 · Bolleddula CPT:PSP 2021"
      />
    </SlideGrid>
  );
}
