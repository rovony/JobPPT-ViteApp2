// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Panel, PanelTitle, PanelBody, Numeral, Row, Payoff, Hi, EASE } from './_parts';

/**
 * CS1 · 02 — Beat 2: data reality.
 *
 * Reading order: the asymmetry (left = adult anchor, right = pediatric cohort)
 * lands first, then the three constraints that closed off the efficacy route.
 * Adult sits left because it is the thing being bridged FROM.
 *
 * Density target: 5 viz elements · ~55 words · 1 claim · 90 s ÷ 5 = 18 s/el → OK.
 */

function Stat({ label, value, detail, accent, delay, reduced }) {
  return (
    <Panel kicker={label} tone={accent} delay={delay} reduced={reduced}>
      <Numeral color={accent}>{value}</Numeral>
      <PanelBody>{detail}</PanelBody>
    </Panel>
  );
}

function Constraint({ children, delay, reduced }) {
  return (
    <motion.li
      initial={reduced ? false : { opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
      className="deck-body"
      style={{
        fontSize: 'var(--fs-slide-tagline)',
        lineHeight: 1.5,
        color: 'var(--cream-muted)',
        paddingLeft: 'var(--space-4)',
        position: 'relative',
        minWidth: 0,
      }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: '0.55em',
          width: 'var(--space-3)',
          height: 'var(--stroke-hair, 1px)',
          background: 'var(--case)',
        }}
      />
      {children}
    </motion.li>
  );
}

export default function Cs1DataReality() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Data reality</Eyebrow>

      <Headline delay={0.3} maxChars={64}>
        Thirty-nine PK-evaluable children could not answer efficacy —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          but they could answer exposure.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={110}>
        The asymmetry between the adult evidence base and the pediatric cohort is what set the strategy.
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
          <Row min="14rem">
            <Stat
              label="Adult anchor"
              value="380"
              detail="Adults across six studies — mature PK, safety, and an established therapeutic exposure range."
              accent="var(--case)"
              delay={0.8}
              reduced={reduced}
            />
            <Stat
              label="Pediatric cohort"
              value="39"
              detail="PK-evaluable children, open-label, no placebo comparator, narrow dose range."
              accent="var(--amber)"
              delay={0.95}
              reduced={reduced}
            />
          </Row>

          <Panel kicker="Why the raw data could not decide" muted delay={1.15} reduced={reduced}>
            <ul style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)', margin: 0, padding: 0, listStyle: 'none' }}>
              <Constraint delay={1.3} reduced={reduced}>
                The Phase IIb efficacy path was <strong style={{ fontWeight: 600 }}>terminated mid-study</strong> —
                endpoint-powered pediatric efficacy was never going to exist.
              </Constraint>
              <Constraint delay={1.42} reduced={reduced}>
                Too few dose levels to identify an exposure–response relationship for efficacy or safety.
              </Constraint>
              <Constraint delay={1.54} reduced={reduced}>
                Re-randomising children onto a comparator in a progressive disease was not an ethical option.
              </Constraint>
            </ul>
          </Panel>

          <Payoff delay={1.8} reduced={reduced}>
            This is <Hi>untrialable efficacy, not missing diligence</Hi> — and it is the reason the exposure
            question became the decision question.
          </Payoff>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.1}
        kicker="02 · CS1 · DATA REALITY"
        tagline="Name the constraint once, then move to what the data can answer."
        source="Source · Okour et al. J Clin Pharmacol 2023 · AMB112529 · Ivy et al. J Pediatr X 2020"
      />
    </SlideGrid>
  );
}
