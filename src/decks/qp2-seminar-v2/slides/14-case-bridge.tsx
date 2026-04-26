// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 14 · CS1 Bridge — Sotatercept · MOONBEAM · ICH E11A.
 *
 * V4 (2026-04-25 · CS1 Inspiration-aligned refactor):
 *   The previous V3 stuffed the bridge slide with a 5-bullet template
 *   list, a pipeline card, a payoff line, an ICH E11A coda, AND a
 *   Framework themes ribbon. Per Option B (CS1 Inspiration-aligned),
 *   this slide refocuses entirely on the forward-looking timeline:
 *     2021 EMA + PMDA pediatric Volibris  →  ambrisentan precedent set
 *     2022 EMA PIP P/0414/2022           →  Sotatercept pediatric trigger
 *     2025 ICH E11A · final              →  framework codified
 *     MOONBEAM NCT05587712 ongoing       →  pediatric Sotatercept PK study
 *     ~2027 readout                      →  MIPE applied next-gen molecule
 *
 *   The 5-bullet template was implicit in slides 9-13 (build → pcVPC →
 *   exposure match → safety E-R → impact). The framework themes ribbon
 *   belongs to the seminar wrap-up at the deck level, not to CS1's
 *   exit beat. This V4 lets the timeline carry the editorial weight,
 *   with one italic verdict line above and one ICH E11A coda below.
 *
 * Editorial purpose:
 *   This is the exit beat of CS1 — the last sentence the panel hears
 *   before the case study divider for CS2. It reframes ambrisentan
 *   from "we did it once" to "we set the precedent" by showing the
 *   methodology on its way to a next-gen molecule (Sotatercept) under
 *   a now-codified regulatory framework (ICH E11A · Jan 2025).
 *
 *   Confidentiality (zaj-slides): MOONBEAM (NCT05587712) and the EMA
 *   PIP P/0414/2022 are matters of public record · clinicaltrials.gov
 *   and EMA PIP register. ICH E11A is a published guideline. Nothing
 *   on this slide is internal data.
 */
export default function Slide14CaseBridge() {
  const ease = [0.2, 0.7, 0.3, 1];
  const reduce = useReducedMotion();
  const D = {
    chrome: 0.10, headline: 0.30, subhead: 0.55,
    timeline: 0.80,
    nodes: 1.10,
    payoff: 2.40,
    coda: 2.80,
    source: 3.10,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={D.chrome}>
        CS1 · Bridge — the methodology travels to Sotatercept
      </Eyebrow>
      <Headline delay={D.headline} maxChars={36}>
        The 2021 approval set the{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          blueprint for the ICH E11A era.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={78}>
        The methodology travels. Ambrisentan prefigured the ICH E11A guidance
        codified three years later — and the same model-informed pediatric
        extrapolation blueprint now carries Sotatercept into MOONBEAM.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1fr) auto auto',
            rowGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          {/* ─── BAND 1 · timeline (5 nodes, horizontal) ─── */}
          <BridgeTimeline tk={tk} D={D} ease={ease} reduce={reduce} />

          {/* ─── BAND 2 · italic payoff (single line) ─── */}
          <motion.div
            style={{
              paddingTop: 'var(--space-3)',
              paddingBottom: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              textAlign: 'center',
            }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.6, ease, delay: reduce ? 0 : D.payoff }}
          >
            <p
              className="deck-display italic"
              style={{
                fontSize: 'var(--fs-card-quote)',
                lineHeight: 'var(--lh-snug)',
                color: 'var(--cream)',
                fontWeight: 500,
                margin: 0,
              }}
            >
              The value isn't one dose —{' '}
              <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 700 }}>
                it's a reusable template
              </span>{' '}
              for any drug where shared mechanism and flat exposure–response hold true.
            </p>
          </motion.div>

          {/* ─── BAND 3 · ICH E11A coda + MOONBEAM meta ─── */}
          <motion.div
            style={{
              display: 'grid',
              gridTemplateColumns: 'auto 1fr auto',
              columnGap: 'var(--space-5)',
              alignItems: 'baseline',
            }}
            initial={reduce ? { opacity: 1 } : { opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduce ? 0 : 0.5, ease, delay: reduce ? 0 : D.coda }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              ICH E11A · Jan 2025
            </div>
            <div
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.4,
              }}
            >
              Formalizes model-informed pediatric extrapolation built on{' '}
              exposure matching and PK/PD similarity.{' '}
              <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                The 2021 ambrisentan approval prefigured this framework — four
                years before it was codified.
              </span>
            </div>
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-meta)',
                letterSpacing: '0.18em',
                color: 'var(--cyan)',
                whiteSpace: 'nowrap',
              }}
            >
              MOONBEAM · NCT05587712
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 01 · Bridge"
        source="Source · EMA PIP P/0414/2022 · MOONBEAM (NCT05587712) · ICH E11A · Jan 2025"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ================================================================
   BridgeTimeline — 5-node horizontal timeline (pure SVG).
   Same idiom as slide 13's ConvergenceDiagram (SVG axis + text labels)
   so the case-closing pair (impact → bridge) reads as one paired
   visual register: convergence to the present, then propagation
   to the future.

   Layout (1920×440 viewBox):
     • Axis line          · y = 220, x = 110 → 1810
     • 5 nodes (◆) at ~25% intervals across axis
     • Each node has: date label above · milestone caption below
     • The middle node ("ICH E11A · 2025") is the amber anchor —
       the "framework codified" beat that links past precedent to
       future applications.
   ================================================================ */
function BridgeTimeline({ tk, D, ease, reduce }) {
  const W = 1920;
  const H = 440;
  const axisY = 220;
  const xs = [180, 580, 960, 1340, 1740];

  const NODES = [
    {
      x: xs[0],
      date: '2021',
      title: 'Ambrisentan',
      sub: 'EMA · Sep · PMDA · Apr',
      kind: 'past',
    },
    {
      x: xs[1],
      date: '2022',
      title: 'EMA PIP',
      sub: 'P/0414/2022 · Sotatercept trigger',
      kind: 'past',
    },
    {
      x: xs[2],
      date: '2025',
      title: 'ICH E11A',
      sub: 'Framework codified',
      kind: 'anchor',
    },
    {
      x: xs[3],
      date: 'Now',
      title: 'MOONBEAM',
      sub: 'Pediatric Sotatercept PK',
      kind: 'present',
    },
    {
      x: xs[4],
      date: '~2027',
      title: 'Readout',
      sub: 'MIPE applied to next-gen',
      kind: 'future',
    },
  ];

  const colorFor = (kind) => {
    if (kind === 'past') return tk('--coral');
    if (kind === 'anchor') return tk('--amber');
    if (kind === 'present') return tk('--cyan');
    return tk('--cream-muted');
  };

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', minHeight: 0 }}>
      <svg
        className="absolute inset-0 w-full h-full"
        viewBox={`0 0 ${W} ${H}`}
        preserveAspectRatio="xMidYMid meet"
      >
        {/* ── Axis line ── */}
        <motion.line
          x1={110} x2={1810} y1={axisY} y2={axisY}
          stroke={tk('--cream-hairline')} strokeWidth={1}
          initial={reduce ? { pathLength: 1 } : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: reduce ? 0 : 1.0, ease, delay: reduce ? 0 : D.timeline }}
          style={{ transformOrigin: `110px ${axisY}px` }}
        />

        {/* ── Tick marks at each node ── */}
        <motion.g
          initial={reduce ? { opacity: 1 } : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: reduce ? 0 : 0.4, ease, delay: reduce ? 0 : D.timeline + 0.6 }}
        >
          {xs.map((x, i) => (
            <line key={i}
              x1={x} x2={x}
              y1={axisY - 8} y2={axisY + 8}
              stroke={tk('--cream-faint')} strokeWidth={1}
            />
          ))}
        </motion.g>

        {/* ── Nodes ── */}
        {NODES.map((node, i) => (
          <TimelineNode
            key={i}
            node={node}
            color={colorFor(node.kind)}
            tk={tk}
            axisY={axisY}
            delay={D.nodes + i * 0.20}
            ease={ease}
            reduce={reduce}
          />
        ))}
      </svg>
    </div>
  );
}

/* ================================================================
   TimelineNode — one milestone on the bridge timeline.

   Each node is a small diamond mark on the axis with three text rows:
     • Date label (above the axis, mono uppercase)
     • Title     (below the axis, display tier)
     • Subtitle  (below the title, body, muted)
   The "anchor" kind (ICH E11A) gets a slightly larger diamond and
   the amber color so the eye lands on the framework-codification beat.
   ================================================================ */
function TimelineNode({ node, color, tk, axisY, delay, ease, reduce }) {
  const isAnchor = node.kind === 'anchor';
  const r = isAnchor ? 11 : 7;

  return (
    <motion.g
      initial={reduce ? { opacity: 1, y: 0 } : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduce ? 0 : 0.55, ease, delay: reduce ? 0 : delay }}
    >
      {/* Diamond mark on axis */}
      <g transform={`translate(${node.x}, ${axisY}) rotate(45)`}>
        <rect
          x={-r} y={-r}
          width={r * 2} height={r * 2}
          fill={color}
          fillOpacity={isAnchor ? 0.22 : 1}
          stroke={color}
          strokeWidth={isAnchor ? 2 : 0}
        />
      </g>

      {/* Date (above axis) */}
      <text
        x={node.x} y={axisY - 38}
        textAnchor="middle"
        fontFamily="var(--font-mono)"
        fontSize="14"
        letterSpacing="0.22em"
        fill={color}
        fontWeight={700}
      >
        {node.date.toUpperCase()}
      </text>

      {/* Title (below axis) */}
      <text
        x={node.x} y={axisY + 50}
        textAnchor="middle"
        fontFamily="var(--font-display)"
        fontSize={isAnchor ? '32' : '26'}
        fontWeight={isAnchor ? 700 : 600}
        letterSpacing="-0.02em"
        fill={tk('--cream')}
      >
        {node.title}
      </text>

      {/* Subtitle (below title) */}
      <text
        x={node.x} y={axisY + 82}
        textAnchor="middle"
        fontFamily="var(--font-body)"
        fontSize="14"
        fill={tk('--cream-muted')}
      >
        {node.sub}
      </text>
    </motion.g>
  );
}
