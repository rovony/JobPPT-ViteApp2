// @ts-nocheck
import React from 'react';
import { useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Panel, PanelTitle, PanelBody, Row, Payoff, Hi } from './_parts';

/**
 * CS1 · 01 — Beat 1: decision and stakes.
 *
 * Reading order (left → right) IS the argument order:
 *   what had to be decided → what the options were → what being wrong cost.
 * The note speaks it in exactly that sequence; see notes.ts.
 *
 * Density target: 3 viz elements · ~48 visible words · 1 claim · 1 path
 * · 70 s ÷ 3 = 23 s/element → OK.
 */
export default function Cs1Decision() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · The decision</Eyebrow>

      <Headline delay={0.3} maxChars={62}>
        The team still had to defend a pediatric dose{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          after the efficacy path stopped carrying the answer.
        </span>
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={104}>
        Ambrisentan in pediatric pulmonary arterial hypertension — a progressive disease, a terminated
        Phase IIb, and a dose that still had to be justified to two agencies.
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
          <Row min="16rem">
            <Panel kicker="The decision" delay={0.85} reduced={reduced}>
              <PanelTitle>At what dose — if any — could ambrisentan be labeled in children?</PanelTitle>
              <PanelBody>
                Ages 8 to under 18, weight-banded, defensible to EMA and PMDA review.
              </PanelBody>
            </Panel>

            <Panel kicker="The options" delay={1.0} reduced={reduced} tone="var(--amber)">
              <PanelTitle>Three, and only one was deliverable.</PanelTitle>
              <PanelBody>
                Force another efficacy design · accept a modeling and simulation bridge · abandon the
                pediatric path entirely.
              </PanelBody>
            </Panel>

            <Panel kicker="Cost of being wrong" delay={1.15} reduced={reduced} tone="var(--sage)">
              <PanelTitle>Under-treat a progressive disease, or expose children without a defence.</PanelTitle>
              <PanelBody>
                A rare population, an ethical constraint on re-randomisation, and no second chance at the
                filing.
              </PanelBody>
            </Panel>
          </Row>

          <Payoff delay={1.5} reduced={reduced}>
            The question was never whether the model was elegant. It was whether{' '}
            <Hi>an exposure argument could carry a label</Hi> that an efficacy trial no longer could.
          </Payoff>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.9}
        kicker="01 · CS1 · DECISION"
        tagline="Open on the decision and its consequence — the method comes later."
        source="Source · Okour et al. J Clin Pharmacol 2023 · EMA Volibris pediatric indication"
      />
    </SlideGrid>
  );
}
