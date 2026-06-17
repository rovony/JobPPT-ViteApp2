// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import CaseOrientationStrip from '../_shared/CaseOrientationStrip';

/**
 * Slide 24 · CS2 Challenge — Approved in pediatrics. Adults need a smarter design.
 *
 * v6-vir trim: three anchor tiles + closing question + one meta line.
 * Enrollment curve and screen-fail funnel removed — one primary idea per slide.
 */

const ANCHORS = [
  {
    yr: '2018',
    label: 'FDA Pediatric Approval',
    sub: 'Ages 1 mo – 21 yr · NSAA surrogate · 2,500 U/m² q21d',
  },
  {
    yr: '94',
    label: 'Original sample size',
    sub: 'Endpoint-powered · target lower 95% CI ≥ 90% NSAA achievement',
  },
  {
    yr: '~2028',
    label: 'If design unchanged',
    sub: 'SPARK-ALL projected enrollment under endpoint-powered design',
  },
];

export default function Cs2AspChallenge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    anchorsLabel: 0.95,
    anchors: 1.10,
    question: 1.55,
    body: 1.85,
    meta: 2.25,
    source: 2.80,
  };

  return (
    <SlideGrid dataCase="teal" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--teal)" delay={D.eyebrow}>CS2 · Setup + challenge</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        Approved in pediatrics.{' '}
        <span style={{ color: 'var(--teal)', fontStyle: 'italic', fontWeight: 700 }}>
          Adults needed a smarter design.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        Same drug, same biology, same FDA-validated NSAA surrogate. The constraint wasn't scientific
        doubt — it was{' '}
        <span style={{ color: 'var(--teal)', fontWeight: 600 }}>operational feasibility</span>.
        Ninety-four was deliverable in the protocol and undeliverable in practice.
      </Subhead>

      <Viz>
        <div
          className="deck-viz-stack"
          style={{
            maxWidth: '56rem',
          }}
        >
          <CaseOrientationStrip
            accent="var(--teal)"
            delay={D.anchorsLabel}
            items={[
              {
                kicker: 'Drug · disease',
                body: <>Calaspargase pegol (Asparlas) · pegylated asparaginase · adult Ph-negative ALL</>,
              },
              {
                kicker: 'Pediatric precedent',
                body: <>FDA pediatric label <strong style={{ fontWeight: 600 }}>2018</strong> · NSAA surrogate ≥ 0.1 U/mL already agreed</>,
              },
              {
                kicker: 'Adult constraint',
                body: <>Original protocol needed <strong style={{ fontWeight: 600 }}>94 adults</strong> — endpoint-powered, operationally undeliverable</>,
              },
            ]}
          />

          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-card-label)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.anchorsLabel + 0.25 }}
          >
            Three numbers that frame the problem
          </motion.div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-3)' }}>
            {ANCHORS.map((a, i) => (
              <AnchorTile
                key={a.yr}
                yr={a.yr}
                label={a.label}
                sub={a.sub}
                delay={D.anchors + i * 0.15}
                numeralLayoutId={a.yr === '94' ? 'cs3-n-94' : undefined}
              />
            ))}
          </div>

          <motion.div
            style={{
              padding: 'var(--space-5)',
              border: '1px solid color-mix(in srgb, var(--teal) 35%, transparent)',
              background: 'color-mix(in srgb, var(--teal) 8%, transparent)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.question }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-slide-tagline)',
                lineHeight: 1.25,
                color: 'var(--cream)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              Could a{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 700, fontStyle: 'normal' }}>
                smaller, smarter study
              </span>{' '}
              still be defensible to FDA?
            </div>
            <motion.div
              className="deck-body"
              style={{
                fontSize: 'var(--fs-slide-subhead)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.body }}
            >
              Pediatric PopPK was{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>FDA-reviewed and label-supporting</span>.
              The question was whether the same scientific question could be answered with{' '}
              <span style={{ color: 'var(--teal)', fontWeight: 600 }}>fewer adults and more model</span>.
            </motion.div>
          </motion.div>

          <motion.p
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              margin: 0,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.meta }}
          >
            SPARK-ALL · NCT04817761 · pediatric N = 124 · ~46% screen-fail
          </motion.p>
        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Challenge"
        source="Source · FDA label 761102 (Dec 2018) · NCT04817761"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ================================================================
   AnchorTile
   ================================================================ */
function AnchorTile({ yr, label, sub, delay, numeralLayoutId }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '16px 16px 18px',
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <span
        aria-hidden
        style={{
          position: 'absolute', top: 0, left: 0, width: '100%', height: 2,
          background: 'linear-gradient(to right, var(--teal), color-mix(in srgb, var(--teal) 30%, transparent))',
        }}
      />
      <motion.div
        layoutId={numeralLayoutId}
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-numeral)',
          fontWeight: 700, color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1, marginBottom: 8,
        }}
      >
        {yr}
      </motion.div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-tagline)', letterSpacing: '0.22em',
          color: 'var(--teal)', fontWeight: 700, marginBottom: 4,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)', fontSize: 'var(--fs-card-body)',
          lineHeight: 1.4, color: 'var(--cream-muted)',
        }}
      >
        {sub}
      </div>
    </motion.div>
  );
}
