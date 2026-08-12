// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { PanelBody, Payoff, Hi, EASE } from './_parts';

/**
 * CS1 · 08 — Beat 6: the decision boundary.
 *
 * NEW slide. The playbook calls this "often the most important slide" (§12),
 * and CS1 had no surface showing A versus B. Without it the case ends on a
 * result rather than on a decision.
 *
 * Reading order: condition (left) → action (right), for both branches, then
 * the assumption that flips the whole thing (below, spanning). The flipping
 * assumption is last because it is what the panel will interrogate.
 *
 * Density target: 3 viz elements · ~56 words · 1 claim
 * · 90 s ÷ 3 = 30 s/element → OK.
 */

function Branch({ tone, verdict, condition, action, delay, reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        border: `1.5px solid ${tone}`,
        borderLeft: `4px solid ${tone}`,
        borderRadius: 'var(--radius-lg)',
        background: `linear-gradient(180deg, color-mix(in srgb, ${tone} 12%, transparent), color-mix(in srgb, var(--panel) 72%, transparent) 70%)`,
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        minWidth: 0,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone,
          fontWeight: 700,
        }}
      >
        {verdict}
      </div>

      <div
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          lineHeight: 1.45,
          color: 'var(--cream-muted)',
        }}
      >
        <span className="deck-mono uppercase" style={{ color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono)' }}>
          If&nbsp;
        </span>
        {condition}
      </div>

      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1rem, min(1.5vw, 2.4vh), 1.3rem)',
          lineHeight: 1.25,
          color: 'var(--cream)',
          fontWeight: 600,
        }}
      >
        {action}
      </div>
    </motion.div>
  );
}

export default function Cs1Boundary() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Decision boundary</Eyebrow>

      <Headline delay={0.3} maxChars={62}>
        Inside the adult band we recommend the dose;{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          outside it we redesign.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={106}>
        The boundary was agreed before the result was in — which is what made the recommendation a decision
        rather than an interpretation.
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
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(18rem, 100%), 1fr))',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            <Branch
              tone="var(--case)"
              verdict="Action A · proceed"
              condition="pediatric exposures land within the adult therapeutic range once weight is accounted for, with a safety narrative that holds"
              action="Recommend weight-based dosing in the agency package."
              delay={0.85}
              reduced={reduced}
            />
            <Branch
              tone="var(--amber)"
              verdict="Action B · do not bridge"
              condition="exposures sit systematically above or below the band, or a safety signal appears that adult experience does not explain"
              action="Redesign the dose, add data, or decline to claim the bridge."
              delay={1.0}
              reduced={reduced}
            />
          </div>

          <motion.div
            initial={reduced ? false : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduced ? 0 : 0.5, delay: reduced ? 0 : 1.3, ease: EASE }}
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
              background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
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
              The assumption that flips the recommendation
            </div>
            <PanelBody style={{ color: 'var(--cream)', opacity: 0.85 }}>
              Disease similarity — that matching adult exposure buys pediatric benefit. Every other input
              could move within its uncertainty without changing the action. If that one is wrong, Action A
              is wrong regardless of how well the model fits.
            </PanelBody>
          </motion.div>

          <Payoff delay={1.7} reduced={reduced}>
            Agreeing the threshold in advance is the part that transfers: <Hi>decide what result would change
            the action before you have the result.</Hi>
          </Payoff>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.05}
        kicker="08 · CS1 · DECISION BOUNDARY"
        tagline="The uncertainty interval, not the point estimate, is what selects the action."
        source="Weight-band exposure matching detail in backup · scenario grid available on request"
      />
    </SlideGrid>
  );
}
