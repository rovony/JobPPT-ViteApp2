// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import WorkflowStrip from '../components/cs4/WorkflowStrip';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S3 · The Problem — "80% scaffolding, 20% science."
 *
 * Two-panel layout per spec:
 *   LEFT  — stat block (5 rows, JetBrains Mono, IntegerTicker on digits)
 *           80%  scaffolding         (amber)
 *           20%  science             (amber)
 *           ─────
 *           4–8  weeks per analysis  (cream)
 *           5–10 software tools      (cream)
 *           0    shared state        (cream)
 *
 *   RIGHT — WorkflowStrip (SAS → Phoenix → NONMEM → PsN → mrgsolve →
 *           Word) with durations under each box and a dotted amber line
 *           above labelled "the pharmacometrician carries every transition".
 */

const EASE = [0.2, 0.7, 0.3, 1];

const STATS_AMBER = [
  { value: 80, suffix: '%', label: 'scaffolding' },
  { value: 20, suffix: '%', label: 'science' },
];

const STATS_CREAM = [
  { display: '4–8',  label: 'weeks per analysis' },
  { display: '5–10', label: 'software tools' },
  { display: '0',    label: 'shared state' },
];

export default function CS4Problem() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · The problem</Eyebrow>

      <Headline delay={0.25} maxChars={68}>
        Pharmacometric workflows in 2026 are{' '}
        <span style={{ color: 'var(--amber)' }}>80% scaffolding</span>{' '}
        and 20% science.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={108}>
        The science is fast. The handoffs aren't. Every transition between
        tools is carried by the pharmacometrician — by hand.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.6fr)',
            gap: 'clamp(var(--space-5), 3vw, var(--space-8))',
            alignItems: 'stretch',
            paddingTop: 'var(--space-2)',
            minHeight: 0,
          }}
        >
          {/* LEFT — stat block */}
          <motion.div
            initial={{ opacity: 0, x: -16 }}
            animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.55, delay: 0.7, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'flex-start',
              gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
              paddingTop: 'clamp(var(--space-3), 2vh, var(--space-5))',
              paddingRight: 'var(--space-4)',
              borderRight: '1px solid color-mix(in srgb, var(--cream-faint) 25%, transparent)',
            }}
          >
            {STATS_AMBER.map((s, i) => (
              <StatRow
                key={s.label}
                go={go}
                delay={0.8 + i * 0.15}
                color="var(--amber)"
                value={
                  <>
                    <IntegerTicker from={0} to={s.value} duration={1.0} delay={0.9 + i * 0.15} go={go} />
                    {s.suffix}
                  </>
                }
                label={s.label}
              />
            ))}
            {/* Hairline */}
            <span
              aria-hidden
              style={{
                height: 1,
                background: 'color-mix(in srgb, var(--cream-hairline) 80%, transparent)',
                width: '100%',
              }}
            />
            {STATS_CREAM.map((s, i) => (
              <StatRow
                key={s.label}
                go={go}
                delay={1.2 + i * 0.12}
                color="var(--cream)"
                value={s.display}
                label={s.label}
              />
            ))}
          </motion.div>

          {/* RIGHT — WorkflowStrip */}
          <div style={{ display: 'flex', alignItems: 'center', minHeight: 0 }}>
            <WorkflowStrip go={go} reduced={reduce} delay={1.2} />
          </div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="The pharmacometrician is the integration layer — until the platform absorbs it."
        delay={2.6}
      />

      <TracingBeam progress={cs4Progress(2)} go={!reduce} />
    </SlideGrid>
  );
}

function StatRow({ go, delay, color, value, label }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.45, delay, ease: EASE }}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-1)' }}
    >
      <span
        className="deck-mono"
        style={{
          fontSize: 'clamp(2rem, min(3.6vw, 5.6vh), 3.6rem)',
          fontWeight: 800,
          color,
          lineHeight: 0.95,
          letterSpacing: '-0.01em',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {value}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.82rem)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 700,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
