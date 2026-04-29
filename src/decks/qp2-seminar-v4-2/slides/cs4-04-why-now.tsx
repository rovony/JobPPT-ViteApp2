// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import M15Anchor from '../components/cs4/M15Anchor';
import ICHM15Timeline from '../components/cs4/ICHM15Timeline';
import AiBrainAmbient from '../components/cs4/AiBrainAmbient';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S4 · Why Now — "ICH M15 makes AI/ML a regulatory category."
 *
 * Layout:
 *   1. Top anchor band — full-width amber mono uppercase, hairlines
 *      top + bottom. IntegerTickers on the date digits.
 *   2. Pull-quote card — cream italic, large, with M15 §2 attribution.
 *   3. Three implication cards in a row (DOCUMENTATION · AUDIT ·
 *      QUALIFICATION) with mono numerals 01 / 02 / 03.
 *
 * Motion: anchor band → quote → cards stagger (200ms each).
 */

const EASE = [0.2, 0.7, 0.3, 1];

const IMPLICATIONS = [
  {
    num: '01',
    label: 'Documentation',
    body: 'Structured assessment-table content',
    note: 'M15 §3 expects assessment-ready submission tables, not free-form narrative.',
  },
  {
    num: '02',
    label: 'Audit',
    body: 'Reproducible computational workflows',
    note: 'Every model output traceable to inputs, code version, and analyst — by construction.',
  },
  {
    num: '03',
    label: 'Qualification',
    body: 'Model evaluation commensurate with use',
    note: 'Risk-tiered evidence requirements; AI/ML treated as one of the M&S methods.',
  },
];

export default function CS4WhyNow() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <AiBrainAmbient variant="ambient" position="bottom-right" delay={0.5} />

      <Eyebrow delay={0.1}>Case 04 · Why now</Eyebrow>

      <Headline delay={0.25} maxChars={66}>
        ICH M15 makes AI/ML a{' '}
        <span style={{ color: 'var(--amber)' }}>regulatory category</span>,
        not a research direction.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={104}>
        The framework that classifies population PK, PBPK and exposure-response
        now classifies AI/ML alongside them. The bar moves from "interesting" to
        "documented, audited, qualified."
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* Top anchor */}
          <M15Anchor go={go} delay={0.7} />

          {/* Milestone timeline (2023 → 2027+) */}
          <ICHM15Timeline go={go} delay={1.0} />

          {/* Pull-quote */}
          <motion.blockquote
            initial={{ opacity: 0, y: 10 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 1.2, ease: EASE }}
            style={{
              margin: 0,
              padding: 'clamp(var(--space-3), 1.8vh, var(--space-5)) clamp(var(--space-4), 2.2vw, var(--space-7))',
              background: 'color-mix(in srgb, var(--cream-faint) 7%, transparent)',
              border: '1px solid color-mix(in srgb, var(--cream-faint) 28%, transparent)',
              borderLeft: '3px solid var(--amber)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <p
              className="deck-display italic"
              style={{
                margin: 0,
                color: 'var(--cream)',
                fontSize: 'clamp(1rem, min(1.35vw, 2.15vh), 1.5rem)',
                lineHeight: 1.4,
                fontWeight: 500,
              }}
            >
              &ldquo;M&amp;S methods… include population PK/PD, PBPK, exposure-response… and{' '}
              <strong style={{ color: 'var(--amber)' }}>artificial intelligence / machine learning</strong>.&rdquo;
            </p>
            <cite
              className="deck-mono uppercase"
              style={{
                display: 'block',
                marginTop: 'var(--space-2)',
                fontSize: 'clamp(0.55rem, min(0.7vw, 1.1vh), 0.7rem)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
                fontStyle: 'normal',
                fontWeight: 700,
              }}
            >
              — ICH M15 §2
            </cite>
          </motion.blockquote>

          {/* Three implication cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
              alignItems: 'stretch',
              flex: '0 0 auto',
            }}
          >
            {IMPLICATIONS.map((imp, i) => (
              <ImplicationCard key={imp.num} imp={imp} go={go} delay={1.5 + i * 0.2} />
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="M15 raises the bar; AI/ML is now in the assessment table."
        source="Source · ICH M15 Step 4, 29 Jan 2026 · §2 (M&S methods)"
        delay={2.4}
      />

      <TracingBeam progress={cs4Progress(3)} go={!reduce} />
    </SlideGrid>
  );
}

function ImplicationCard({ imp, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        padding:
          'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-3), 1.6vw, var(--space-5))',
        background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
        backdropFilter: 'blur(8px)',
        border: '1px solid color-mix(in srgb, var(--amber) 30%, transparent)',
        borderRadius: 'var(--radius-md)',
        boxShadow: '0 8px 24px color-mix(in srgb, var(--amber) 6%, transparent)',
      }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.65rem, min(0.85vw, 1.4vh), 0.88rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {imp.num} · {imp.label.toUpperCase()}
      </span>
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(1rem, min(1.3vw, 2.1vh), 1.5rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1.25,
        }}
      >
        {imp.body}
      </span>
      <span
        className="deck-body"
        style={{
          fontSize: 'clamp(0.7rem, min(0.92vw, 1.5vh), 0.95rem)',
          color: 'color-mix(in srgb, var(--cream) 75%, transparent)',
          lineHeight: 1.4,
        }}
      >
        {imp.note}
      </span>
    </motion.div>
  );
}
