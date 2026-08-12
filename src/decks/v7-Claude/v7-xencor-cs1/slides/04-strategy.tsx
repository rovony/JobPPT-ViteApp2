// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Panel, PanelTitle, PanelBody, Row, Payoff, Hi, EASE } from './_parts';

/**
 * CS1 · 04 — Beat 4: quantitative strategy, in decision language.
 *
 * Reading order: the decision the model has to serve (left, wide) → the three
 * structural choices that follow from it (right). The decision sits left
 * because every choice on the right is justified by it; reading right-first
 * would present architecture with no reason attached.
 *
 * Density target: 4 viz elements · ~58 words · 1 claim · 100 s ÷ 4 = 25 s/el → OK.
 */

function Choice({ n, title, body, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, x: 10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : delay, ease: EASE }}
      style={{ display: 'flex', gap: 'var(--space-3)', minWidth: 0 }}
    >
      <div
        className="deck-mono"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          color: 'var(--case)',
          fontWeight: 700,
          paddingTop: '0.15em',
          flexShrink: 0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {n}
      </div>
      <div style={{ minWidth: 0 }}>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(0.95rem, min(1.35vw, 2.1vh), 1.15rem)',
            lineHeight: 1.25,
            color: 'var(--cream)',
            fontWeight: 600,
            marginBottom: 'var(--space-1)',
          }}
        >
          {title}
        </div>
        <PanelBody>{body}</PanelBody>
      </div>
    </motion.div>
  );
}

export default function Cs1Strategy() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Quantitative strategy</Eyebrow>

      <Headline delay={0.3} maxChars={66}>
        Weight-aware population PK was chosen because the decision was{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          exposure matching, not endpoint power.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={108}>
        The architecture follows the decision. Every structural choice below exists to make one comparison
        defensible.
      </Subhead>

      <Viz style={{ justifyContent: 'center', overflowY: 'auto', overflowX: 'hidden' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(19rem, 100%), 1fr))',
            gap: 'var(--space-5)',
            alignItems: 'start',
            minHeight: 0,
          }}
        >
          <Panel kicker="The decision the model serves" delay={0.85} reduced={reduced}>
            <PanelTitle>
              Do pediatric exposures at a weight-based dose land inside the adult therapeutic range?
            </PanelTitle>
            <PanelBody>
              That is a question about steady-state exposure, not about an endpoint. Once it is stated that
              way, the model that answers it is not a matter of preference — and neither is the model that
              cannot.
            </PanelBody>
          </Panel>

          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--space-4)',
              minWidth: 0,
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                fontWeight: 700,
              }}
            >
              What that forced
            </div>

            <Choice
              n="01"
              title="Compartmental PopPK with body-weight scaling"
              body="Weight is the covariate the dose is actually delivered on, so it belongs in the structural model rather than in a post-hoc adjustment."
              delay={1.0}
              reduced={reduced}
            />
            <Choice
              n="02"
              title="Steady-state exposure against the adult reference range"
              body="The comparison the agencies would run is the comparison the model should output — AUC at steady state, weight band by weight band."
              delay={1.15}
              reduced={reduced}
            />
            <Choice
              n="03"
              title="Exposure–response explored, but not overclaimed"
              body="With a narrow achieved dose range, an E-R slope was never going to be identifiable. Reporting one would have been the weakest part of the package."
              delay={1.3}
              reduced={reduced}
            />
          </div>
        </div>

        <Payoff delay={1.7} reduced={reduced} style={{ marginTop: 'var(--space-4)' }}>
          The restraint matters as much as the build: <Hi>no clear exposure–response is not the same as no
          dose rationale</Hi>, and conflating the two is how a bridge loses a reviewer.
        </Payoff>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="04 · CS1 · STRATEGY"
        tagline="Architecture in decision language — software is secondary."
        source="Source · Okour et al. J Clin Pharmacol 2023 · allometric scaling detail in backup"
      />
    </SlideGrid>
  );
}
