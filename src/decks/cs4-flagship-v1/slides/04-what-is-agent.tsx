// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const ANCHORS = [
  {
    yr: 'Plan',
    label: 'Reasoning Engine',
    sub: 'Analyze objective, formulate a multi-step execution strategy.',
    accent: 'cream',
  },
  {
    yr: 'Act',
    label: 'Tool Invocation',
    sub: 'Execute deterministic code, query databases, or call APIs.',
    accent: 'cream',
  },
  {
    yr: 'Observe',
    label: 'Context Update',
    sub: 'Read the output, update internal memory, and decide next steps.',
    accent: 'cream',
  },
];

const CONSTRAINTS = [
  { label: 'Autonomous loops', value: 'Agent controls its own flow until completion or escalation' },
  { label: 'Deterministic boundaries', value: 'Action space is strictly constrained by provided tools' },
  { label: 'Human-in-the-loop', value: 'Can halt execution and request approval for sensitive operations' },
];

const META_TAGS = [
  { k: 'Core concept', v: 'ReAct (Reason + Act) Pattern' },
  { k: 'LLM Role', v: 'Orchestrator, not just a generator' },
  { k: 'State', v: 'Persistent memory across steps' },
];

export default function CS4WhatIsAgent() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.65,
    anchorsLabel: 0.95,
    anchors: 1.10,
    constraintLabel: 1.95,
    constraints: 2.10,
    question: 2.85,
    body: 3.10,
    meta: 3.45,
    source: 2.80,
  };

  const T = useTokens(['--violet', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="violet" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--violet)" delay={D.eyebrow}>CS4 · What an agent is</Eyebrow>
      <Headline delay={D.headline} maxChars={50}>
        A single loop ·{' '}
        <span style={{ color: 'var(--violet)', fontStyle: 'italic', fontWeight: 700 }}>
          plan, call a tool, observe, iterate.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={120}>
        An agent is an LLM wrapped in a control loop that grants it agency. It doesn't just generate text; it{' '}
        <span style={{ color: 'var(--violet)', fontWeight: 600 }}>executes actions</span>
        {' '}against external systems and observes the results.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'auto auto auto 1fr',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ─── Three vertical anchor tiles ─── */}
          <div>
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-muted)',
                marginBottom: 12,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.anchorsLabel }}
            >
              The ReAct Loop — foundation of agentic behavior
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-5)',
              }}
            >
              {ANCHORS.map((a, i) => (
                <AnchorTile
                  key={a.yr}
                  yr={a.yr}
                  label={a.label}
                  sub={a.sub}
                  delay={D.anchors + i * 0.15}
                />
              ))}
            </div>
          </div>

          {/* ─── Constraint callout ─── */}
          <div
            style={{
              borderLeft: '3px solid var(--violet)',
              paddingLeft: 16,
              paddingTop: 4,
              paddingBottom: 4,
            }}
          >
            <motion.div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--violet)',
                fontWeight: 700,
                marginBottom: 8,
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.constraintLabel }}
            >
              System guardrails · keeping the agent deterministic
            </motion.div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 1fr)',
                gap: 'var(--space-5)',
              }}
            >
              {CONSTRAINTS.map((c, i) => (
                <motion.div
                  key={c.label}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease, delay: D.constraints + i * 0.10 }}
                >
                  <div
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 'var(--fs-card-meta)',
                      letterSpacing: '0.18em',
                      color: 'var(--cream-muted)',
                      marginBottom: 4,
                    }}
                  >
                    {c.label}
                  </div>
                  <div
                    style={{
                      fontFamily: 'var(--font-body)',
                      fontSize: 'var(--fs-card-body)',
                      color: 'var(--cream)',
                      lineHeight: 1.4,
                    }}
                  >
                    {c.value}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ─── Closing question + body ─── */}
          <motion.div
            style={{
              padding: 'var(--space-4) var(--space-5)',
              borderRadius: 6,
              background: 'color-mix(in srgb, var(--violet) 10%, transparent)',
              border: '1px solid color-mix(in srgb, var(--violet) 35%, transparent)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.question }}
          >
            <div
              className="deck-display italic"
              style={{
                fontSize: 'clamp(1.05rem, 1.4vw, 1.55rem)',
                lineHeight: 1.25,
                color: 'var(--cream)',
                fontWeight: 500,
                marginBottom: 10,
              }}
            >
              How do we ensure{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 700, fontStyle: 'normal' }}>
                clinical-grade reliability
              </span>{' '}
              in a probabilistic system?
            </div>
            <motion.div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
                maxWidth: '88ch',
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, ease, delay: D.body }}
            >
              LLMs hallucinate. Traditional software doesn't. An agentic architecture resolves this tension by strictly defining boundaries. The LLM handles the semantic reasoning, but the actual execution happens through{' '}
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>deterministic, auditable, and type-safe tools</span>.
              The agent is the conductor, not the orchestra.
            </motion.div>
          </motion.div>

          {/* ─── Bottom meta tags ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              alignSelf: 'end',
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
            }}
          >
            {META_TAGS.map((m, i) => (
              <motion.div
                key={m.k}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease, delay: D.meta + i * 0.08 }}
              >
                <div
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-meta)',
                    letterSpacing: '0.22em',
                    color: 'var(--violet)',
                    fontWeight: 700,
                    marginBottom: 3,
                  }}
                >
                  {m.k}
                </div>
                <div
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream-muted)',
                    lineHeight: 1.35,
                  }}
                >
                  {m.v}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Case 04 · What an agent is"
        source="Source · PharmAgent Architecture Specification"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   AnchorTile — single big-numeral anchor card
   ======================================================== */
function AnchorTile({ yr, label, sub, delay, numeralLayoutId }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '20px 22px 22px 22px',
        borderRadius: 6,
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        position: 'relative',
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {/* Top accent rule */}
      <span
        aria-hidden
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: 2,
          background: 'linear-gradient(to right, var(--violet), color-mix(in srgb, var(--violet) 30%, transparent))',
        }}
      />

      <motion.div
        layoutId={numeralLayoutId}
        className="deck-display"
        style={{
          fontSize: 'clamp(2.0rem, min(2.8vw, 3.8vh), 3.2rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1,
          marginBottom: 10,
        }}
      >
        {yr}
      </motion.div>

      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-meta)',
          letterSpacing: '0.22em',
          color: 'var(--violet)',
          fontWeight: 700,
          marginBottom: 6,
        }}
      >
        {label}
      </div>

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          lineHeight: 1.4,
          color: 'var(--cream-muted)',
        }}
      >
        {sub}
      </div>
    </motion.div>
  );
}
