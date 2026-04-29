// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../components/ComponentCard';
import PhaseChip from '../components/PhaseChip';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * Slide 14 — Component 2 / 5 · Data Flow.
 *
 * Elevation pass (Apr 2026): adopts the cs3-06 cinematic pattern.
 *   - useStory() drives the entire 7-second loop off one rAF clock
 *   - Two-layer flow lines: a faint base path + a bright dash sprite
 *     with drop-shadow glow, packet arrives by easing along the path
 *   - Each node briefly halos when a packet arrives at it
 *   - Bottom Bucket strip with three stateful sinks (TOKEN CACHE /
 *     AUDIT LOG / OUTPUT) that "fill" as the story progresses
 *   - A final reverse packet shows the review read-back to the user
 *
 * Case color: violet (links to P5 orthogonal layering — orchestration).
 */

const NODES = [
  { id: 'user',   label: 'USER',         sub: 'QUERY' },
  { id: 'orch',   label: 'ORCHESTRATOR', sub: 'DECIDES' },
  { id: 'mgr',    label: 'MANAGER',      sub: 'ROUTES · REVIEWS' },
  { id: 'expert', label: 'EXPERT',       sub: 'BOUNDED · DOMAIN' },
  { id: 'out',    label: 'OUTPUT',       sub: 'STAMPED' },
];

const NODE_W = 168;
const NODE_H = 96;
const NODE_Y = 188;
const CENTERS = [144, 348, 552, 756, 960];
const NODE_X = CENTERS.map((cx) => cx - NODE_W / 2);
const CONN_Y = NODE_Y + NODE_H / 2;
const CONN_GAPS = CENTERS.slice(0, -1).map((cx, i) => ({
  x1: cx + NODE_W / 2,
  x2: CENTERS[i + 1] - NODE_W / 2,
}));

// Story sequence (seconds, 8s loop)
const SEQ = {
  start:    0.00,
  nodes:    0.10,   // nodes appear (cascade)
  arrows:   0.55,   // connector arrows draw left-to-right
  packetA:  1.30,   // first downstream packet enters → traverses
  packetB:  2.10,   // second downstream packet (continuous flow feel)
  reach:    3.30,   // packet reaches OUTPUT
  metrics:  3.90,   // bottom bucket strip activates
  review:   5.00,   // reverse "REVIEW" packet returns to user
  final:    6.40,
};

const PHASE_LABEL: Record<keyof typeof SEQ, string> = {
  start:   'priming',
  nodes:   'spawning nodes',
  arrows:  'wiring routes',
  packetA: 'routing query',
  packetB: 'routing in flight',
  reach:   'output stamped',
  metrics: 'committing to log',
  review:  'review returns',
  final:   'idle · bounded',
};

const TOTAL_SPAN_X = CENTERS[CENTERS.length - 1] - CENTERS[0];

export default function DataFlowComponent() {
  const story = useStory(SEQ, { loop: 8.0 });

  // Compute packet position along the trunk, given a `start` beat and 2.4s travel.
  const packetX = (startBeat: number, durationS = 2.4) => {
    const t = story.time;
    const elapsed = t - startBeat;
    if (elapsed <= 0) return null;
    if (elapsed >= durationS) return null;
    const u = elapsed / durationS;
    const xStart = CENTERS[0] + NODE_W / 2 + 4;
    const xEnd = CENTERS[CENTERS.length - 1] - NODE_W / 2 - 4;
    return xStart + u * (xEnd - xStart);
  };

  // Reverse packet (review): runs from output → user.
  const reviewX = () => {
    const t = story.time;
    const elapsed = t - SEQ.review;
    const dur = 1.2;
    if (elapsed <= 0) return null;
    if (elapsed >= dur) return null;
    const u = elapsed / dur;
    const xStart = CENTERS[CENTERS.length - 1] - NODE_W / 2 - 4;
    const xEnd = CENTERS[0] + NODE_W / 2 + 4;
    return xStart + u * (xEnd - xStart);
  };

  // Returns 1 if any packet is arriving at the node within ±0.18s of arrival.
  const nodePulseStrength = (idx: number): number => {
    if (story.reduced) return 0;
    const xCenter = CENTERS[idx];
    const xStart = CENTERS[0] + NODE_W / 2 + 4;
    const xEnd = CENTERS[CENTERS.length - 1] - NODE_W / 2 - 4;
    const u = (xCenter - xStart) / (xEnd - xStart);
    const dur = 2.4;
    let max = 0;
    [SEQ.packetA, SEQ.packetB].forEach((bStart) => {
      const arrive = bStart + u * dur;
      const delta = Math.abs(story.time - arrive);
      if (delta < 0.18) {
        const v = 1 - delta / 0.18;
        if (v > max) max = v;
      }
    });
    return max;
  };

  const pxA = packetX(SEQ.packetA);
  const pxB = packetX(SEQ.packetB);
  const pxRev = reviewX();

  // Bucket fills (0..1) — they fill once each downstream packet completes.
  const bucketFill = (k: 'cache' | 'log' | 'output'): number => {
    if (story.reduced) return 1;
    const t = story.time;
    if (k === 'cache') return t > SEQ.reach ? 1 : Math.max(0, (t - SEQ.packetA) / 2.0);
    if (k === 'log')   return t > SEQ.reach + 0.2 ? 1 : 0;
    if (k === 'output') return t > SEQ.metrics ? 1 : 0;
    return 0;
  };

  return (
    <ComponentCard
      dataCase="violet"
      componentNumber={2}
      domainEyebrow="ORCHESTRATION"
      headline={
        <>
          Data{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>Flow.</span>
        </>
      }
      subhead="Every query routes top-down. No expert acts unbounded."
      takeHomeText="Five nodes. One direction. Bounded execution by construction."
      activeId="dataflow"
      withoutText="Patient data flows to the LLM context as a side effect of analysis routing."
      withText="Patient data never crosses the wall. Schema and aggregates only."
      footerSource="Topology · Kim et al. 2025 · arXiv:2512.08296 · centralized-hierarchy class"
    >
      <div className="relative w-full h-full flex flex-col" style={{ minHeight: 0 }}>
        <PhaseChip label={story.phase ? PHASE_LABEL[story.phase] : null} />

        <svg
          viewBox="0 0 1100 540"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          role="img"
          aria-label="Five-node data flow with downstream packets and a returning review packet."
          style={{ minHeight: 0 }}
        >
          <defs>
            <marker
              id="arrow-violet" markerWidth="10" markerHeight="10"
              refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse"
            >
              <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--case)" opacity="0.9" />
            </marker>
            <filter id="packet-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="3" />
            </filter>
            <filter id="node-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <linearGradient id="trunk-base" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="var(--case)" stopOpacity="0.18" />
              <stop offset="100%" stopColor="var(--case)" stopOpacity="0.32" />
            </linearGradient>
          </defs>

          {/* === Faint base path (always visible after arrows draw) === */}
          {CONN_GAPS.map((g, i) => (
            <motion.line
              key={`base-${i}`}
              x1={g.x1} y1={CONN_Y}
              x2={g.x2 - 4} y2={CONN_Y}
              stroke="url(#trunk-base)" strokeWidth="3"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: story.isAfter('arrows') ? 1 : 0 }}
              transition={{ duration: 0.4, delay: i * 0.10, ease: EASE.expoOut }}
            />
          ))}

          {/* Sharper top-line arrows on top of base */}
          {CONN_GAPS.map((g, i) => (
            <motion.line
              key={`arr-${i}`}
              x1={g.x1} y1={CONN_Y}
              x2={g.x2 - 4} y2={CONN_Y}
              stroke="var(--case)" strokeWidth="1.6"
              strokeOpacity="0.7"
              markerEnd="url(#arrow-violet)"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: story.isAfter('arrows') ? 1 : 0 }}
              transition={{ duration: 0.45, delay: 0.05 + i * 0.12, ease: EASE.expoOut }}
            />
          ))}

          {/* === Nodes === */}
          {NODES.map((n, i) => {
            const pulse = nodePulseStrength(i);
            return (
              <motion.g
                key={n.id}
                initial={{ opacity: 0, y: 12 }}
                animate={{
                  opacity: story.isAfter('nodes') ? 1 : 0,
                  y: story.isAfter('nodes') ? 0 : 12,
                }}
                transition={{
                  duration: 0.5, delay: i * 0.08, ease: EASE.expoOut,
                }}
              >
                {/* Pulsing halo when packet arrives at this node */}
                {pulse > 0 && (
                  <rect
                    x={NODE_X[i] - 6} y={NODE_Y - 6}
                    width={NODE_W + 12} height={NODE_H + 12}
                    rx={14}
                    fill="none"
                    stroke="var(--case)"
                    strokeWidth={2 + pulse * 2}
                    opacity={pulse * 0.85}
                    filter="url(#node-glow)"
                  />
                )}
                <rect
                  x={NODE_X[i]} y={NODE_Y}
                  width={NODE_W} height={NODE_H} rx={10}
                  fill="color-mix(in srgb, var(--panel) 32%, transparent)"
                  stroke="var(--case)"
                  strokeOpacity={0.55 + pulse * 0.45}
                  strokeWidth={1.2 + pulse * 1.0}
                />
                {/* Node index pill */}
                <circle
                  cx={NODE_X[i] + 18} cy={NODE_Y + 18} r={9}
                  fill="color-mix(in srgb, var(--case) 18%, transparent)"
                  stroke="var(--case)" strokeWidth="1"
                />
                <text
                  x={NODE_X[i] + 18} y={NODE_Y + 21} textAnchor="middle"
                  className="deck-mono"
                  style={{ fontSize: 9, fill: 'var(--case)', letterSpacing: '0.04em', fontWeight: 600 }}
                >
                  {String(i).padStart(2, '0')}
                </text>
                <text
                  x={NODE_X[i] + NODE_W / 2} y={NODE_Y + 50} textAnchor="middle"
                  className="deck-mono uppercase"
                  style={{ fontSize: 12, fill: 'var(--cream)', letterSpacing: '0.16em', fontWeight: 600 }}
                >
                  {n.label}
                </text>
                <text
                  x={NODE_X[i] + NODE_W / 2} y={NODE_Y + 74} textAnchor="middle"
                  className="deck-mono uppercase"
                  style={{ fontSize: 9, fill: 'var(--cream-muted)', letterSpacing: '0.14em' }}
                >
                  {n.sub}
                </text>
              </motion.g>
            );
          })}

          {/* === Downstream packets (two staggered, continuous feel) === */}
          {pxA != null && (
            <g>
              <circle cx={pxA} cy={CONN_Y} r={6}
                fill="var(--case)" filter="url(#packet-glow)" opacity={0.9} />
              <circle cx={pxA} cy={CONN_Y} r={2.5}
                fill="var(--cream)" />
            </g>
          )}
          {pxB != null && (
            <g>
              <circle cx={pxB} cy={CONN_Y} r={6}
                fill="var(--case)" filter="url(#packet-glow)" opacity={0.9} />
              <circle cx={pxB} cy={CONN_Y} r={2.5}
                fill="var(--cream)" />
            </g>
          )}

          {/* === Reverse REVIEW packet (returns to user) === */}
          {pxRev != null && (
            <g>
              <circle cx={pxRev} cy={CONN_Y - 18} r={5}
                fill="var(--cream)" stroke="var(--case)" strokeWidth="1.4"
                filter="url(#packet-glow)" opacity={0.9} />
              <text
                x={pxRev} y={CONN_Y - 28} textAnchor="middle"
                className="deck-mono uppercase"
                style={{ fontSize: 8, fill: 'var(--case)', letterSpacing: '0.18em', fontWeight: 600 }}
              >
                REVIEW
              </text>
            </g>
          )}

          {/* === Bottom bucket strip — three stateful sinks === */}
          <Bucket
            x={70} y={360} fill={bucketFill('cache')}
            label="TOKEN CACHE" sub="hot context · 14 keys"
            show={story.isAfter('metrics') || (pxA != null && pxA > CENTERS[2])}
          />
          <Bucket
            x={400} y={360} fill={bucketFill('log')}
            label="AUDIT LOG" sub="hash-chain · sha-256"
            show={story.isAfter('reach')}
          />
          <Bucket
            x={730} y={360} fill={bucketFill('output')}
            label="OUTPUT" sub="stamped · v1.0"
            show={story.isAfter('metrics')}
          />

          {/* === Bottom metrics row === */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: story.isAfter('metrics') ? 1 : 0,
              y: story.isAfter('metrics') ? 0 : 10,
            }}
            transition={{ duration: 0.5, ease: EASE.expoOut }}
          >
            <line
              x1={60} y1={490} x2={1040} y2={490}
              stroke="var(--cream)" strokeWidth="0.5" opacity="0.15"
            />
            <text
              x={60} y={518}
              className="deck-mono uppercase"
              style={{ fontSize: 10, fill: 'var(--case)', letterSpacing: '0.18em' }}
            >
              FIVE NODES · ONE DIRECTION
            </text>
            <text
              x={1040} y={518} textAnchor="end"
              className="deck-mono uppercase"
              style={{ fontSize: 10, fill: 'var(--cream-muted)', letterSpacing: '0.18em' }}
            >
              UNBOUNDED CALLS · 0 (BY CONSTRUCTION)
            </text>
          </motion.g>
        </svg>
      </div>
    </ComponentCard>
  );
}

/* ────────── helpers ────────── */

function Bucket({
  x, y, fill, label, sub, show,
}: {
  x: number; y: number; fill: number;
  label: string; sub: string; show: boolean;
}) {
  const W = 240;
  const H = 70;
  return (
    <motion.g
      initial={{ opacity: 0, y: 8 }}
      animate={{
        opacity: show ? 1 : 0.22,
        y: show ? 0 : 8,
      }}
      transition={{ duration: 0.45, ease: EASE.expoOut }}
    >
      {/* Outer card */}
      <rect
        x={x} y={y} width={W} height={H} rx={6}
        fill="color-mix(in srgb, var(--panel) 36%, transparent)"
        stroke="color-mix(in srgb, var(--case) 35%, transparent)"
        strokeWidth="1"
      />
      {/* Fill bar that grows left-to-right inside the card */}
      <rect
        x={x + 8} y={y + H - 12}
        width={(W - 16) * Math.max(0, Math.min(1, fill))}
        height={4}
        rx={2}
        fill="var(--case)"
        opacity={0.85}
      />
      <text
        x={x + 12} y={y + 22}
        className="deck-mono uppercase"
        style={{ fontSize: 10, fill: 'var(--case)', letterSpacing: '0.18em', fontWeight: 600 }}
      >
        {label}
      </text>
      <text
        x={x + 12} y={y + 44}
        className="deck-mono"
        style={{ fontSize: 11, fill: 'var(--cream-muted)', letterSpacing: '0.04em' }}
      >
        {sub}
      </text>
      {/* Percent readout */}
      <text
        x={x + W - 12} y={y + 22} textAnchor="end"
        className="deck-mono"
        style={{ fontSize: 11, fill: 'var(--cream)', letterSpacing: '0.04em' }}
      >
        {Math.round(Math.max(0, Math.min(1, fill)) * 100)}%
      </text>
    </motion.g>
  );
}
