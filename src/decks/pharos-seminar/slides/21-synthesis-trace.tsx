// @ts-nocheck
import React, { useRef } from 'react';
import { motion, AnimatePresence, useInView, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PhaseChip from '../components/PhaseChip';
import { useStory } from '../lib/useStory';
import { D_SYNTHESIS_TRACE } from '../lib/timing';
import { EASE } from '../motion';

/**
 * Slide 21 — Synthesis · WORKFLOW TRACE (sage).
 *
 * Inspired by qp2-seminar-v4 cs3-06-pilot but distilled to ~120 s and
 * focused on the Pharos foundation: one user request flows through all
 * five components, lighting the matching design principle as it passes.
 *
 *   s1 (4s):   Human emits "Run NCA on dataset 0–24h"
 *   s2 (18s):  Privacy Wall scrubs PHI → schema-only payload
 *   s3 (32s):  Data Flow routes to NCA expert via the router
 *   s4 (50s):  NCA Computation runs (PK curve draws + AUC fills)
 *   s5 (70s):  Result hands to PopPK modeler (lit transient pulse)
 *   s6 (88s):  Marketplace SOP registers the operation against sop.nca_v1_2
 *   s7 (102s): Audit Chain anchors final block
 *   s8 (116s): Verify sweep across chain (every block ✓)
 *   s9 (120s): Tally overlay — "5 / 5 components · 5 / 5 principles"
 *
 * Each component card lights with its case color when its phase fires.
 * The active principle prints in the bottom-right principle ribbon.
 *
 * Voice: third-person. Vocabulary: "foundation", "Pharazi". A5-aligned.
 */

const CANVAS_W = 1600;
const CANVAS_H = 900;

type CaseColor = 'amber' | 'cyan' | 'sage' | 'violet' | 'coral';

type ComponentNode = {
  id: string;
  num: string;
  title: string;
  cx: number;
  cy: number;
  caseColor: CaseColor;
  litAt: keyof typeof D_SYNTHESIS_TRACE;
  principle: string;
};

const COMPONENTS: ComponentNode[] = [
  { id: 'hier',    num: '01', title: 'HIERARCHY',      cx: 220,  cy: 320, caseColor: 'amber',  litAt: 's1_human',   principle: 'P1 · Centralized hierarchy' },
  { id: 'privacy', num: '02', title: 'PRIVACY WALL',   cx: 480,  cy: 320, caseColor: 'cyan',   litAt: 's2_privacy', principle: 'P2 · Structural privacy' },
  { id: 'data',    num: '03', title: 'DATA FLOW',      cx: 740,  cy: 320, caseColor: 'sage',   litAt: 's3_data',    principle: 'P1 · Centralized hierarchy' },
  { id: 'nca',     num: '04', title: 'NCA COMPUTE',    cx: 1000, cy: 320, caseColor: 'sage',   litAt: 's4_nca',     principle: 'P5 · Orthogonal layering' },
  { id: 'sop',     num: '05', title: 'MARKETPLACE',    cx: 1260, cy: 320, caseColor: 'coral',  litAt: 's6_review',  principle: 'P4 · SOPs as versioned plans' },
];

const HUMAN = { cx: 100, cy: 320 };
const AUDIT_BAR = { x1: 80, x2: 1520, y: 720 };

const LABELS: Record<keyof typeof D_SYNTHESIS_TRACE, string> = {
  bg: 'BOOT',
  nodes: 'COMPONENTS LOAD',
  s1_human: 'HUMAN REQUEST',
  s2_privacy: 'PHI SCRUBBED',
  s3_data: 'ROUTING TO NCA',
  s4_nca: 'NCA COMPUTING',
  s5_modeler: 'POPPK CONFER',
  s6_review: 'SOP REGISTER',
  s7_final: 'CHAIN ANCHORED',
  s8_audit: 'VERIFY SWEEP',
  s9_done: '5 / 5 · COMPLETE',
  final: 'IDLE',
};

export default function SynthesisTraceSlide() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.1 });
  const reduced = useReducedMotion();
  const story = useStory(D_SYNTHESIS_TRACE, { go: inView && !reduced });

  // Active component: most recent `litAt` whose phase has fired
  const activeComponent = COMPONENTS.reduce<ComponentNode | null>((acc, c) => {
    return story.isAfter(c.litAt) ? c : acc;
  }, null);

  return (
    <SlideFrame
      dataCase="sage"
      eyebrow="SYNTHESIS · WORKFLOW TRACE · ALL 5 COMPONENTS"
      headline={
        <>
          One request becomes{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>a replayable evidence trail.</span>
        </>
      }
      subhead="Five components · five principles · one chain. Time bar at the bottom narrates each beat."
      footerKicker="21 · MOVEMENT 3 · SYNTHESIS TRACE"
      footerTagline="The same chain that anchors the audit anchors every regulatory paragraph."
      footerSource="Pharazi reference architecture · cinematic trace · April 2026"
    >
      <div ref={ref} className="relative h-full w-full px-2 pt-1 pb-2 min-h-0">
        <PhaseChip label={story.phase ? LABELS[story.phase] : null} />

        <svg
          viewBox={`0 0 ${CANVAS_W} ${CANVAS_H}`}
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
        >
          <defs>
            <linearGradient id="rail-grad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--case)" stopOpacity={0.12} />
              <stop offset="50%" stopColor="var(--case)" stopOpacity={0.45} />
              <stop offset="100%" stopColor="var(--case)" stopOpacity={0.12} />
            </linearGradient>
            <radialGradient id="lit-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="currentColor" stopOpacity={0.6} />
              <stop offset="100%" stopColor="currentColor" stopOpacity={0} />
            </radialGradient>
          </defs>

          {/* Background grid hairlines */}
          <g opacity={0.08}>
            {Array.from({ length: 16 }).map((_, i) => (
              <line
                key={i}
                x1={(i + 1) * 100}
                y1={120}
                x2={(i + 1) * 100}
                y2={780}
                stroke="var(--cream-faint)"
                strokeWidth={0.5}
              />
            ))}
          </g>

          {/* Top horizontal rail across all components */}
          <motion.line
            x1={HUMAN.cx + 40}
            y1={HUMAN.cy}
            x2={1320}
            y2={HUMAN.cy}
            stroke="url(#rail-grad)"
            strokeWidth={2}
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{
              pathLength: story.isAfter('nodes') ? 1 : 0,
              opacity: story.isAfter('nodes') ? 1 : 0,
            }}
            transition={{ duration: 1.4, ease: EASE.expoOut }}
          />

          {/* Human node */}
          <motion.g
            initial={{ opacity: 0, scale: 0.7 }}
            animate={{ opacity: story.isAfter('nodes') ? 1 : 0, scale: story.isAfter('nodes') ? 1 : 0.7 }}
            transition={{ duration: 0.6, ease: EASE.expoOut }}
          >
            <circle
              cx={HUMAN.cx}
              cy={HUMAN.cy}
              r={48}
              fill="color-mix(in srgb, var(--cream) 8%, transparent)"
              stroke="var(--cream-hairline)"
              strokeWidth={1.5}
            />
            <text
              x={HUMAN.cx}
              y={HUMAN.cy + 4}
              textAnchor="middle"
              className="deck-mono"
              fontSize={11}
              fill="var(--cream)"
              style={{ letterSpacing: '0.12em' }}
            >
              HUMAN
            </text>
            <text
              x={HUMAN.cx}
              y={HUMAN.cy + 78}
              textAnchor="middle"
              className="deck-mono"
              fontSize={9}
              fill="var(--cream-faint)"
              style={{ letterSpacing: '0.18em' }}
            >
              user@org · 14:02
            </text>
          </motion.g>

          {/* Component nodes */}
          {COMPONENTS.map((c, i) => {
            const lit = story.isAfter(c.litAt);
            const settled = story.isAfter(
              i === COMPONENTS.length - 1 ? 's7_final' : (COMPONENTS[i + 1].litAt as any),
            );
            return (
              <ComponentNodeViz
                key={c.id}
                node={c}
                lit={lit}
                settled={settled}
                appearAt={story.isAfter('nodes')}
              />
            );
          })}

          {/* PHI scrub effect at Privacy Wall (s2 → s3 transition) */}
          <AnimatePresence>
            {story.isAfter('s2_privacy') && story.isBefore('s3_data') && (
              <motion.g
                key="scrub"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.circle
                    key={i}
                    cx={480 + (i - 2.5) * 18}
                    cy={320 + 90 + i * 4}
                    r={3}
                    fill="var(--cyan, #67e8f9)"
                    initial={{ opacity: 0, y: 0 }}
                    animate={{ opacity: [0, 1, 0], y: 60 }}
                    transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.18, ease: 'easeInOut' }}
                  />
                ))}
              </motion.g>
            )}
          </AnimatePresence>

          {/* PK curve drawing inside NCA node when s4 fires */}
          <AnimatePresence>
            {story.isAfter('s4_nca') && (
              <motion.g
                key="pkcurve"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
              >
                <motion.path
                  d="M 920 380 Q 970 290 1000 320 T 1080 380"
                  stroke="var(--sage, #86efac)"
                  strokeWidth={2}
                  fill="none"
                  initial={{ pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  transition={{ duration: 2.5, ease: EASE.expoOut }}
                />
                {/* AUC fill */}
                <motion.path
                  d="M 920 380 Q 970 290 1000 320 T 1080 380 L 1080 410 L 920 410 Z"
                  fill="var(--sage, #86efac)"
                  fillOpacity={0.18}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 1.0, delay: 1.2 }}
                />
              </motion.g>
            )}
          </AnimatePresence>

          {/* Audit chain bar at bottom */}
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('s7_final') ? 1 : 0 }}
            transition={{ duration: 0.8, ease: EASE.expoOut }}
          >
            <line
              x1={AUDIT_BAR.x1}
              y1={AUDIT_BAR.y}
              x2={AUDIT_BAR.x2}
              y2={AUDIT_BAR.y}
              stroke="var(--cream-hairline)"
              strokeWidth={1}
            />
            <text
              x={AUDIT_BAR.x1}
              y={AUDIT_BAR.y - 24}
              className="deck-mono"
              fontSize={11}
              fill="var(--cream-faint)"
              style={{ letterSpacing: '0.18em' }}
            >
              AUDIT CHAIN · 7 BLOCKS · ROOT 0x4f3a8e91
            </text>
            {/* 7 hash blocks */}
            {Array.from({ length: 7 }).map((_, i) => {
              const x = AUDIT_BAR.x1 + 60 + i * 200;
              const verified = story.isAfter('s8_audit');
              return (
                <motion.g
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{
                    opacity: story.isAfter('s7_final') ? 1 : 0,
                    y: story.isAfter('s7_final') ? 0 : 10,
                  }}
                  transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE.expoOut }}
                >
                  <rect
                    x={x - 50}
                    y={AUDIT_BAR.y + 14}
                    width={100}
                    height={36}
                    fill={verified
                      ? 'color-mix(in srgb, var(--sage, #86efac) 16%, transparent)'
                      : 'color-mix(in srgb, var(--cream) 4%, transparent)'}
                    stroke={verified ? 'var(--sage, #86efac)' : 'var(--cream-hairline)'}
                    strokeWidth={1}
                    rx={4}
                  />
                  <text
                    x={x}
                    y={AUDIT_BAR.y + 36}
                    textAnchor="middle"
                    className="deck-mono"
                    fontSize={9}
                    fill={verified ? 'var(--sage, #86efac)' : 'var(--cream)'}
                    style={{ letterSpacing: '0.10em' }}
                  >
                    0x{(i * 7 + 23).toString(16).padStart(2, '0')}…
                  </text>
                  {verified && (
                    <motion.text
                      x={x}
                      y={AUDIT_BAR.y - 4}
                      textAnchor="middle"
                      className="deck-mono"
                      fontSize={11}
                      fill="var(--sage, #86efac)"
                      style={{ letterSpacing: '0.16em', fontWeight: 700 }}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.4, delay: 0.4 + i * 0.05 }}
                    >
                      ✓
                    </motion.text>
                  )}
                </motion.g>
              );
            })}
          </motion.g>

          {/* Tally overlay at s9_done */}
          <AnimatePresence>
            {story.isAfter('s9_done') && (
              <motion.g
                key="tally"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, ease: EASE.expoOut }}
              >
                <rect
                  x={CANVAS_W / 2 - 320}
                  y={CANVAS_H / 2 - 100}
                  width={640}
                  height={180}
                  fill="color-mix(in srgb, var(--bg) 88%, transparent)"
                  stroke="var(--case)"
                  strokeWidth={1.5}
                  rx={8}
                  style={{ filter: 'drop-shadow(0 0 32px color-mix(in srgb, var(--case) 35%, transparent))' }}
                />
                <text
                  x={CANVAS_W / 2}
                  y={CANVAS_H / 2 - 32}
                  textAnchor="middle"
                  className="deck-display"
                  fontSize={48}
                  fill="var(--cream)"
                  fontWeight={600}
                  style={{ letterSpacing: '-0.02em', fontStyle: 'italic' }}
                >
                  5 / 5 components · 5 / 5 principles
                </text>
                <text
                  x={CANVAS_W / 2}
                  y={CANVAS_H / 2 + 18}
                  textAnchor="middle"
                  className="deck-mono"
                  fontSize={14}
                  fill="var(--case)"
                  style={{ letterSpacing: '0.18em' }}
                >
                  ALL ANCHORED · ALL VERIFIED · ALL REPLAYABLE
                </text>
                <text
                  x={CANVAS_W / 2}
                  y={CANVAS_H / 2 + 52}
                  textAnchor="middle"
                  className="deck-mono"
                  fontSize={11}
                  fill="var(--cream-faint)"
                  style={{ letterSpacing: '0.20em' }}
                >
                  THE FOUNDATION HOLDS · THE CHAIN STAYS WHOLE
                </text>
              </motion.g>
            )}
          </AnimatePresence>
        </svg>

        {/* Bottom-right principle ribbon */}
        <div
          className="absolute right-4 deck-mono uppercase"
          style={{
            bottom: 76,
            fontSize: '0.62rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          PRINCIPLE NOW LIT ·{' '}
          <AnimatePresence mode="wait">
            <motion.span
              key={activeComponent?.principle ?? 'idle'}
              initial={{ opacity: 0, x: 6 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -6 }}
              transition={{ duration: 0.3 }}
              style={{ color: 'var(--case)', fontWeight: 700 }}
            >
              {activeComponent?.principle ?? '—'}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>
    </SlideFrame>
  );
}

function ComponentNodeViz({
  node,
  lit,
  settled,
  appearAt,
}: {
  node: ComponentNode;
  lit: boolean;
  settled: boolean;
  appearAt: boolean;
}) {
  return (
    <motion.g
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: appearAt ? 1 : 0, scale: appearAt ? 1 : 0.7 }}
      transition={{ duration: 0.6, ease: EASE.expoOut }}
    >
      {/* Glow ring when lit */}
      <AnimatePresence>
        {lit && !settled && (
          <motion.circle
            key="ring"
            cx={node.cx}
            cy={node.cy}
            initial={{ r: 56, opacity: 0.5 }}
            animate={{ r: 110, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: 'easeOut' }}
            fill="none"
            stroke={`var(--${node.caseColor}, var(--case))`}
            strokeWidth={1.5}
          />
        )}
      </AnimatePresence>

      {/* Body */}
      <rect
        x={node.cx - 70}
        y={node.cy - 50}
        width={140}
        height={100}
        rx={10}
        fill={lit
          ? `color-mix(in srgb, var(--${node.caseColor}, var(--case)) 18%, transparent)`
          : 'color-mix(in srgb, var(--cream) 4%, transparent)'}
        stroke={lit
          ? `var(--${node.caseColor}, var(--case))`
          : 'var(--cream-hairline)'}
        strokeWidth={lit ? 1.5 : 1}
        style={{
          filter: lit
            ? `drop-shadow(0 0 18px color-mix(in srgb, var(--${node.caseColor}, var(--case)) 50%, transparent))`
            : 'none',
        }}
      />

      {/* Number */}
      <text
        x={node.cx}
        y={node.cy - 14}
        textAnchor="middle"
        className="deck-mono"
        fontSize={20}
        fill={lit ? `var(--${node.caseColor}, var(--case))` : 'var(--cream-muted)'}
        style={{ fontWeight: 700, letterSpacing: 0 }}
      >
        {node.num}
      </text>

      {/* Title */}
      <text
        x={node.cx}
        y={node.cy + 16}
        textAnchor="middle"
        className="deck-mono"
        fontSize={11}
        fill={lit ? 'var(--cream)' : 'var(--cream-muted)'}
        style={{ letterSpacing: '0.12em' }}
      >
        {node.title}
      </text>

      {/* Status: lit / settled */}
      <text
        x={node.cx}
        y={node.cy + 36}
        textAnchor="middle"
        className="deck-mono"
        fontSize={9}
        fill={settled
          ? 'var(--sage, #86efac)'
          : lit
          ? `var(--${node.caseColor}, var(--case))`
          : 'var(--cream-faint)'}
        style={{ letterSpacing: '0.14em' }}
      >
        {settled ? '✓ DONE' : lit ? 'ACTIVE' : 'IDLE'}
      </text>
    </motion.g>
  );
}
