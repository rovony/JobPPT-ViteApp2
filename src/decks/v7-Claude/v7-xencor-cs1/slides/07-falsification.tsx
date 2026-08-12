// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { Payoff, Hi, EASE } from './_parts';

/**
 * CS1 · 07 — Beat 5b: what would have killed confidence.
 *
 * NEW slide. Splitting Beat 5 lets the concordance slide show the fit and
 * this slide answer the question a technical panel is actually asking:
 * what would have changed your mind?
 *
 * Reading order is a table read left → right, row by row: the check, what a
 * failure would have looked like, what we saw. Rows stack on narrow viewports,
 * which preserves the sequence as top → bottom.
 *
 * Density target: 4 viz elements (rows) · ~62 words · 1 claim
 * · 80 s ÷ 4 = 20 s/element → OK.
 */

const CHECKS = [
  {
    check: 'Predictive check against observed pediatric exposures',
    fail: 'Systematic bias in a weight band — the model predicting one thing, children doing another',
    saw: 'No structural misfit across the observed range',
  },
  {
    check: 'Weight / allometric assumption',
    fail: 'Exposures drifting with size after scaling, meaning weight was not the operative covariate',
    saw: 'Weight-based dosing held across the banded scheme',
  },
  {
    check: 'Concordance with the adult therapeutic range',
    fail: 'Pediatric exposure sitting materially above or below the adult band',
    saw: 'Overlap close enough that the bridge was arguable',
  },
  {
    check: 'Safety signal across the achieved exposures',
    fail: 'A dose-related signal that the adult experience had not predicted',
    saw: 'Nothing that contradicted the adult profile',
  },
];

function CheckRow({ row, delay, reduced, i }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
        gap: 'var(--space-3)',
        padding: 'var(--space-3) 0',
        borderTop: i === 0 ? 'none' : '1px solid var(--cream-hairline)',
        minWidth: 0,
      }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(0.9rem, min(1.25vw, 2vh), 1.05rem)',
          lineHeight: 1.3,
          color: 'var(--cream)',
          fontWeight: 600,
          minWidth: 0,
        }}
      >
        {row.check}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          lineHeight: 1.45,
          color: 'var(--cream-muted)',
          minWidth: 0,
        }}
      >
        {row.fail}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          lineHeight: 1.45,
          color: 'var(--case)',
          fontWeight: 500,
          minWidth: 0,
        }}
      >
        {row.saw}
      </div>
    </motion.div>
  );
}

function HeadCell({ children, color = 'var(--cream-faint)' }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
        minWidth: 0,
      }}
    >
      {children}
    </div>
  );
}

export default function Cs1Falsification() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.15}>Case 01 · Credibility</Eyebrow>

      <Headline delay={0.3} maxChars={58}>
        What would have killed our confidence —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 500 }}>
          and why it did not.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={106}>
        Each row is a test the package could have failed. Stating the failure mode first is what makes the
        result mean something.
      </Subhead>

      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, justifyContent: 'center', flex: 1, overflowY: 'auto', overflowX: 'hidden' }}>
          <motion.div
            initial={reduced ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : 0.8 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(13rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              paddingBottom: 'var(--space-2)',
              minWidth: 0,
            }}
          >
            <HeadCell>The check</HeadCell>
            <HeadCell color="var(--amber)">What failure would have looked like</HeadCell>
            <HeadCell color="var(--case)">What we saw</HeadCell>
          </motion.div>

          {CHECKS.map((row, i) => (
            <CheckRow key={row.check} row={row} i={i} delay={0.95 + i * 0.12} reduced={reduced} />
          ))}

          <Payoff delay={1.65} reduced={reduced} style={{ marginTop: 'var(--space-4)' }}>
            None of these were guaranteed in advance. <Hi>If the concordance had failed, the honest answer was
            to redesign the dose</Hi> — not to soften the claim until the package survived.
          </Payoff>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 2.0}
        kicker="07 · CS1 · CREDIBILITY"
        tagline="Diagnostics earn their place by what they let the team believe."
        source="Full diagnostic pack, covariate strategy, and sensitivity analyses in backup"
      />
    </SlideGrid>
  );
}
