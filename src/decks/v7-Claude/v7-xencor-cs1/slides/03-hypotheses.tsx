// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Panel, PanelTitle, PanelBody, Row, Payoff, Hi, EASE } from './_parts';

/**
 * CS1 · 03 — Beat 3: the working hypothesis and its live competitor.
 *
 * NEW slide. Beat 3 had no surface in v7-xencor, which made the case read as
 * a method applied to data rather than a hypothesis that could have failed.
 * This is where the disease-similarity assumption becomes visible — the
 * assumption the entire bridge rests on.
 *
 * Reading order: working hypothesis (left) → competing hypothesis (right) →
 * the test that separates them (below, spanning). The separator sits last
 * because it is the sentence the audience should leave with.
 *
 * Density target: 3 viz elements · ~52 words · 1 claim · 80 s ÷ 3 = 27 s/el → OK.
 */
export default function Cs1Hypotheses() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Hypothesis</Eyebrow>

      <Headline delay={0.3} maxChars={60}>
        Two readings of the same data —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          and the one test that separates them.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={112}>
        Exposure matching is only decision-grade if the disease and the exposure–effect relationship
        genuinely transfer from adults.
      </Subhead>

      <Viz>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-4)',
            minHeight: 0,
            justifyContent: 'center',
            flex: 1,
            overflowY: 'auto',
            overflowX: 'hidden',
          }}
        >
          <Row min="17rem">
            <Panel kicker="Working hypothesis" delay={0.85} reduced={reduced}>
              <PanelTitle>The biology transfers; the dose question is an exposure question.</PanelTitle>
              <PanelBody>
                Pediatric PAH and adult PAH share enough disease and exposure–effect structure that matching
                the adult therapeutic range, with weight accounted for, answers the dose.
              </PanelBody>
            </Panel>

            <Panel kicker="Competing hypothesis" delay={1.0} reduced={reduced} tone="var(--amber)">
              <PanelTitle>The biology diverges; exposure matching is false comfort.</PanelTitle>
              <PanelBody>
                Pediatric disease course or receptor-level response differs enough that identical exposure
                does not buy identical benefit — and the bridge quietly fails.
              </PanelBody>
            </Panel>
          </Row>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.25, ease: EASE }}
            style={{
              border: '1px solid color-mix(in srgb, var(--sage) 34%, transparent)',
              borderLeft: '4px solid var(--sage)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--sage) 7%, transparent)',
              padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
              minWidth: 0,
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--sage)',
                fontWeight: 700,
                marginBottom: 'var(--space-2)',
              }}
            >
              What would distinguish them
            </div>
            <PanelBody style={{ color: 'var(--cream)', opacity: 0.85 }}>
              Predictive performance against the adult model · whether weight alone explains the pediatric
              exposures · consistency of the safety profile across the achieved range · and whether the
              agencies accepted disease similarity as a premise rather than a conclusion.
            </PanelBody>
          </motion.div>

          <Payoff delay={1.6} reduced={reduced}>
            I want to be explicit that <Hi>disease similarity was an assumption, not a finding</Hi> — it is the
            single assumption that, if wrong, invalidates the recommendation.
          </Payoff>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.95}
        kicker="03 · CS1 · HYPOTHESIS"
        tagline="State the fragile assumption before anyone has to ask for it."
        source="Framing · ICH E11A extrapolation concepts · assumption stated, not claimed as established"
      />
    </SlideGrid>
  );
}
