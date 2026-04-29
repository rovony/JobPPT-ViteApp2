// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import NoveltyCompareInline from '../components/cs4/NoveltyCompareInline';
import TracingBeam, { cs4Progress } from '../components/cs4/TracingBeam';

/**
 * CS4 · S12 · What's Novel Here — Z-pattern 2×2.
 *
 * Four cards. Each card carries a mono numeral (amber), a bold Fraunces
 * assertion, an Inter rationale, and a smaller mono comparator note
 * (cream-faint) anchored to "vs. standard practice."
 *
 * Z-pattern reveal order: 01 (top-left) → 02 (top-right) → 03 (bottom-left)
 * → 04 (bottom-right) at 300ms stagger. Bottom italic band fades after
 * all four land.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const CARDS = [
  {
    num: '01',
    label: 'Hierarchy at scope',
    assertion: '13 specialized agents in three levels',
    rationale:
      'Centralized topology with explicit L0/L1/L2 separation — picked because the published 3–7 agent range cannot cover MIDD end-to-end.',
    comparator: 'vs DruGagent · Apollo-AI · QSP-Copilot (3–7 agents)',
    chart: 'hierarchy',
  },
  {
    num: '02',
    label: 'Typed shared state',
    assertion: 'PharmState bus — agents never message directly',
    rationale:
      'Schema-validated reads/writes; no chat-history accumulation; no agent-to-agent DMs. The bus IS the protocol.',
    comparator: 'vs shared scratchpads + free-form chat history',
    chart: 'state',
  },
  {
    num: '03',
    label: 'Architectural privacy',
    assertion: 'SchemaExtractor as single allow-listed boundary',
    rationale:
      'Privacy is a structural property of the wiring, not a policy promise or a per-prompt redaction rule.',
    comparator: 'vs prompt-level redaction · contractual data-handling',
    chart: 'privacy',
  },
  {
    num: '04',
    label: 'Cryptographic audit',
    assertion: 'Hash-chain — tamper-evident by construction',
    rationale:
      'The right primitive for 21 CFR Part 11 + ICH M15. Replayable, deterministic, defensible to a 2034 inspection.',
    comparator: 'vs post-hoc logging + sign-off checklists',
    chart: 'audit',
  },
];

const BOTTOM_BAND = "Not the only way to build. The way I'd defend in front of a regulator.";

export default function CS4Novelty() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.1}>Case 04 · What's novel</Eyebrow>

      <Headline delay={0.25} maxChars={86}>
        Four design decisions that are{' '}
        <span style={{ color: 'var(--amber)' }}>not standard practice</span>{' '}
        in published pharma AI.
      </Headline>

      <Subhead delay={0.55} size="lead" maxChars={108}>
        Each one is the smaller of two design choices that fit the
        regulatory primitive — not the bigger one that fits the demo.
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
          {/* 2×2 grid · 24px gutters · 1px amber hairlines between */}
          <div
            style={{
              flex: '1 1 auto',
              display: 'grid',
              gridTemplateColumns: '1fr 1px 1fr',
              gridTemplateRows: '1fr 1px 1fr',
              gap: '24px',
              minHeight: 0,
            }}
          >
            <NoveltyCard card={CARDS[0]} go={go} delay={0.7}  pos="tl" />
            <Hairline orient="v" />
            <NoveltyCard card={CARDS[1]} go={go} delay={1.0}  pos="tr" />

            <Hairline orient="h" col="span 1" />
            <Hairline orient="cross" />
            <Hairline orient="h" col="span 1" />

            <NoveltyCard card={CARDS[2]} go={go} delay={1.3}  pos="bl" />
            <Hairline orient="v" />
            <NoveltyCard card={CARDS[3]} go={go} delay={1.6}  pos="br" />
          </div>

          {/* Bottom band */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, delay: 2.1, ease: EASE }}
            style={{
              padding:
                'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-4), 2vw, var(--space-6))',
              borderTop: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
            }}
          >
            <p
              className="deck-display italic"
              style={{
                margin: 0,
                color: 'var(--cream-muted)',
                fontSize: 'clamp(1rem, min(1.3vw, 2.1vh), 1.45rem)',
                lineHeight: 1.4,
                fontWeight: 500,
                textAlign: 'center',
              }}
            >
              {BOTTOM_BAND}
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CASE 04 · AI/ML · PHARMAGENT"
        tagline="Four decisions. Each smaller. Each closer to the regulatory primitive."
        delay={2.6}
      />

      <TracingBeam progress={cs4Progress(11)} go={!reduce} />
    </SlideGrid>
  );
}

function NoveltyCard({ card, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 1.4fr) minmax(120px, 1fr)',
        gap: 'var(--space-3)',
        padding: 'clamp(var(--space-3), 1.6vh, var(--space-5)) clamp(var(--space-3), 1.6vw, var(--space-5))',
        background: 'color-mix(in srgb, var(--panel) 75%, transparent)',
        backdropFilter: 'blur(8px)',
        border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
        borderRadius: 'var(--radius-md)',
        minHeight: 0,
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
          minWidth: 0,
        }}
      >
        <span
          className="deck-mono"
          style={{
            fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {card.num} · {card.label.toUpperCase()}
        </span>
        <span
          className="deck-display"
          style={{
            fontSize: 'clamp(1rem, min(1.3vw, 2vh), 1.4rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {card.assertion}
        </span>
        <span
          className="deck-body"
          style={{
            fontSize: 'clamp(0.7rem, min(0.88vw, 1.45vh), 0.9rem)',
            color: 'color-mix(in srgb, var(--cream) 75%, transparent)',
            lineHeight: 1.42,
          }}
        >
          {card.rationale}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            marginTop: 'auto',
            fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.7rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 700,
          }}
        >
          {card.comparator}
        </span>
      </div>
      {/* Inline editorial chart — one per card. */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          minWidth: 0,
          minHeight: 0,
        }}
      >
        <NoveltyCompareInline variant={card.chart} go={go} delay={delay + 0.25} />
      </div>
    </motion.div>
  );
}

function Hairline({ orient }) {
  if (orient === 'cross') {
    return (
      <span
        aria-hidden
        style={{
          background: 'color-mix(in srgb, var(--amber) 40%, transparent)',
          width: '100%',
          height: '100%',
        }}
      />
    );
  }
  if (orient === 'v') {
    return (
      <span
        aria-hidden
        style={{
          background: 'color-mix(in srgb, var(--amber) 40%, transparent)',
          width: 1,
          alignSelf: 'stretch',
          justifySelf: 'center',
        }}
      />
    );
  }
  return (
    <span
      aria-hidden
      style={{
        background: 'color-mix(in srgb, var(--amber) 40%, transparent)',
        height: 1,
        alignSelf: 'center',
        width: '100%',
      }}
    />
  );
}
