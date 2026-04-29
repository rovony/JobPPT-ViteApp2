// @ts-nocheck
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ComponentCard from '../components/ComponentCard';
import PhaseChip from '../components/PhaseChip';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * Slide 17 — Component 5 / 5 · Marketplace SOP.
 *
 * Elevation pass (Apr 2026):
 *   - useStory() drives the entire commit-graph reveal off one rAF clock
 *   - Each merge node carries diff stats (+lines / -lines) in mono
 *   - Lane labels include the REVIEWER who approved that lane
 *   - Floating commit-message strip cycles through real-feeling messages
 *     ("v1.0 → v1.1 · adjusted weight curve for pediatric pop")
 *   - Bottom stat strip uses IntegerTicker so the numbers land
 *
 * Case color: amber (links to P4 SOPs as versioned execution plans).
 */

type Node = {
  id: string;
  x: number;
  y: number;
  version: string;
  hash: string;
  isMerge?: boolean;
  diff?: { add: number; remove: number };
  delay: number;
};

const NODES: Node[] = [
  // main trunk
  { id: 'm1', x: 100,  y: 168, version: 'v1.0',          hash: 'sha:f8a2', delay: 0.10 },
  { id: 'm2', x: 230,  y: 168, version: 'v1.1',          hash: 'sha:9c1d', delay: 0.20 },
  // branch A diverges
  { id: 'a1', x: 320,  y: 282, version: 'v1.0-pilot',    hash: 'sha:71ba', delay: 0.34 },
  { id: 'a2', x: 410,  y: 282, version: 'v1.0-iter',     hash: 'sha:3e0a', delay: 0.46 },
  { id: 'a3', x: 500,  y: 282, version: 'v1.0-final',    hash: 'sha:0a44', delay: 0.58 },
  // merges back into main
  { id: 'm3', x: 600,  y: 168, version: 'v1.2-merged',   hash: 'sha:5d2c', isMerge: true, diff: { add: 128, remove: 24 }, delay: 0.72 },
  { id: 'm4', x: 720,  y: 168, version: 'v1.3',          hash: 'sha:b1c4', delay: 0.84 },
  // branch B diverges
  { id: 'b1', x: 800,  y: 400, version: 'v1.3-pilot',    hash: 'sha:d3a1', delay: 0.96 },
  { id: 'b2', x: 880,  y: 400, version: 'v1.3-iter',     hash: 'sha:e229', delay: 1.08 },
  // merges back
  { id: 'm5', x: 970,  y: 168, version: 'v1.4-merged',   hash: 'sha:7e1f', isMerge: true, diff: { add: 64, remove: 12 }, delay: 1.20 },
  { id: 'm6', x: 1060, y: 168, version: 'v1.5',          hash: 'sha:c082', delay: 1.32 },
];

const NODE_BY_ID: Record<string, Node> = Object.fromEntries(NODES.map((n) => [n.id, n]));

type Edge = { from: string; to: string; type?: 'main' | 'branch'; delay: number };

const EDGES: Edge[] = [
  { from: 'm1', to: 'm2', type: 'main',   delay: 0.28 },
  { from: 'm2', to: 'a1', type: 'branch', delay: 0.40 },
  { from: 'a1', to: 'a2', type: 'branch', delay: 0.52 },
  { from: 'a2', to: 'a3', type: 'branch', delay: 0.64 },
  { from: 'm2', to: 'm3', type: 'main',   delay: 0.76 },
  { from: 'a3', to: 'm3', type: 'branch', delay: 0.80 },
  { from: 'm3', to: 'm4', type: 'main',   delay: 0.90 },
  { from: 'm4', to: 'b1', type: 'branch', delay: 1.02 },
  { from: 'b1', to: 'b2', type: 'branch', delay: 1.14 },
  { from: 'm4', to: 'm5', type: 'main',   delay: 1.24 },
  { from: 'b2', to: 'm5', type: 'branch', delay: 1.28 },
  { from: 'm5', to: 'm6', type: 'main',   delay: 1.38 },
];

function edgePath(e: Edge): string {
  const a = NODE_BY_ID[e.from];
  const b = NODE_BY_ID[e.to];
  if (a.y === b.y) return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
  const midX = (a.x + b.x) / 2;
  return `M ${a.x} ${a.y} C ${midX} ${a.y}, ${midX} ${b.y}, ${b.x} ${b.y}`;
}

const COMMITS = [
  'v1.0  →  v1.1   adjusted clearance for renal-impaired population',
  'v1.0  →  v1.0-pilot   forked SOP for pediatric pilot study',
  'v1.0-pilot  →  v1.0-iter   reviewer feedback · weights adjusted',
  'v1.0-final  →  v1.2-merged   merged after Garnett-Florian sign-off',
  'v1.3  →  v1.3-pilot   forked for solid-tumor sub-population',
  'v1.3-pilot  →  v1.4-merged   merged · QC diagnostics passed',
  'v1.5   re-tagged · marketplace canonical · reviewers: 2',
];

const SEQ = {
  start:    0.00,
  trunk:    0.10,
  branchA:  0.45,
  merge1:   0.85,
  trunk2:   1.05,
  branchB:  1.25,
  merge2:   1.55,
  stats:    2.00,
  commits:  2.50,
  final:    4.20,
};

const PHASE_LABEL: Record<keyof typeof SEQ, string> = {
  start:    'priming',
  trunk:    'main trunk',
  branchA:  'pilot-A diverges',
  merge1:   'merging back · v1.2',
  trunk2:   'main · v1.3',
  branchB:  'pilot-B diverges',
  merge2:   'merging back · v1.4',
  stats:    'reading stats',
  commits:  'cycling commits',
  final:    'marketplace canonical',
};

export default function MarketplaceSOPComponent() {
  const story = useStory(SEQ, { loop: 9.5 });

  // Cycle commit messages once 'commits' beat is reached
  const [commitIdx, setCommitIdx] = React.useState(0);
  React.useEffect(() => {
    if (story.reduced) return;
    if (!story.isAfter('commits')) return;
    const id = setInterval(() => setCommitIdx((i) => (i + 1) % COMMITS.length), 1800);
    return () => clearInterval(id);
  }, [story.reduced, story.isAfter('commits')]);

  return (
    <ComponentCard
      dataCase="amber"
      componentNumber={5}
      domainEyebrow="OPERATIONS"
      headline={
        <>
          Marketplace{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>SOP.</span>
        </>
      }
      subhead="Versioned execution plans. Git commits for analytical decisions."
      takeHomeText="Hash-anchored. Marketplace-extensible. Reproducible by design."
      activeId="sop"
      withoutText="SOPs are file copies on shared drives. Every team installs updates separately. Drift is silent."
      withText="SOPs are versioned in a marketplace. New versions propagate by reference. Every run pins one."
      footerSource="SOP marketplace pattern · ISO 9001 §7.5 · 21 CFR Part 11 §11.10(d)"
    >
      <div className="relative w-full h-full flex flex-col" style={{ minHeight: 0 }}>
        <PhaseChip label={story.phase ? PHASE_LABEL[story.phase] : null} />

        <svg
          viewBox="0 0 1140 540"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full"
          role="img"
          aria-label="Git-style commit graph showing SOP versioning, branching for pilots, and merging on review."
          style={{ minHeight: 0 }}
        >
          <defs>
            <filter id="merge-glow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" />
              <feMerge>
                <feMergeNode />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* === lane labels (with reviewer tags) === */}
          <LaneLabel x={20} y={172} title="MAIN" reviewer="REV: 2 sign-off" emphasis />
          <LaneLabel x={20} y={286} title="PILOT-A" reviewer="REVIEWER: KLG" />
          <LaneLabel x={20} y={404} title="PILOT-B" reviewer="REVIEWER: AHR" />

          {/* lane hairlines for orientation */}
          <line x1={120} y1={168} x2={1100} y2={168}
                stroke="var(--cream)" strokeOpacity="0.06" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1={120} y1={282} x2={1100} y2={282}
                stroke="var(--cream)" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 4" />
          <line x1={120} y1={400} x2={1100} y2={400}
                stroke="var(--cream)" strokeOpacity="0.05" strokeWidth="0.5" strokeDasharray="2 4" />

          {/* === edges === */}
          {EDGES.map((e) => (
            <motion.path
              key={`edge-${e.from}-${e.to}`}
              d={edgePath(e)}
              fill="none"
              stroke="var(--case)"
              strokeOpacity={e.type === 'main' ? 0.85 : 0.55}
              strokeWidth={e.type === 'main' ? 2 : 1.4}
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: story.time >= e.delay ? 1 : 0 }}
              transition={{ duration: 0.45, ease: EASE.expoOut }}
            />
          ))}

          {/* === nodes === */}
          {NODES.map((n) => (
            <motion.g
              key={n.id}
              initial={{ opacity: 0, scale: 0 }}
              animate={{
                opacity: story.time >= n.delay ? 1 : 0,
                scale: story.time >= n.delay ? 1 : 0,
              }}
              transition={{ duration: 0.4, ease: EASE.settle }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
            >
              {n.isMerge ? (
                <>
                  {/* glow halo on merges */}
                  <motion.rect
                    x={n.x - 12} y={n.y - 12}
                    width={24} height={24}
                    transform={`rotate(45 ${n.x} ${n.y})`}
                    fill="var(--case)"
                    opacity={0.35}
                    filter="url(#merge-glow)"
                    animate={{ opacity: [0.25, 0.55, 0.25] }}
                    transition={{
                      duration: 1.6,
                      delay: n.delay,
                      repeat: Infinity,
                      ease: 'easeInOut',
                    }}
                  />
                  {/* diamond shape for merge */}
                  <rect
                    x={n.x - 8} y={n.y - 8}
                    width={16} height={16}
                    transform={`rotate(45 ${n.x} ${n.y})`}
                    fill="var(--cream)"
                    stroke="var(--case)" strokeWidth="1.6"
                  />
                  {/* diff stats on the right of merge nodes */}
                  {n.diff && (
                    <motion.g
                      initial={{ opacity: 0, x: -4 }}
                      animate={{
                        opacity: story.time >= n.delay + 0.3 ? 1 : 0,
                        x: 0,
                      }}
                      transition={{ duration: 0.4, ease: EASE.expoOut }}
                    >
                      <text
                        x={n.x + 18} y={n.y - 4}
                        className="deck-mono"
                        style={{ fontSize: 10, fill: 'var(--case)', fontWeight: 700, letterSpacing: '0.04em' }}
                      >
                        +{n.diff.add}
                      </text>
                      <text
                        x={n.x + 18} y={n.y + 9}
                        className="deck-mono"
                        style={{ fontSize: 10, fill: 'var(--coral)', fontWeight: 700, letterSpacing: '0.04em' }}
                      >
                        −{n.diff.remove}
                      </text>
                    </motion.g>
                  )}
                </>
              ) : (
                <circle
                  cx={n.x} cy={n.y} r={7}
                  fill="color-mix(in srgb, var(--bg) 55%, transparent)"
                  stroke="var(--case)" strokeWidth="1.8"
                />
              )}
              {/* version label above */}
              <text
                x={n.x} y={n.y - 18} textAnchor="middle"
                className="deck-mono"
                style={{
                  fontSize: 9.5,
                  fill: n.isMerge ? 'var(--cream)' : 'var(--cream-muted)',
                  letterSpacing: '0.04em',
                  fontWeight: n.isMerge ? 600 : 400,
                }}
              >
                {n.version}
              </text>
              {/* hash label below */}
              <text
                x={n.x} y={n.y + 22} textAnchor="middle"
                className="deck-mono"
                style={{ fontSize: 8, fill: 'var(--cream-faint)', letterSpacing: '0.04em' }}
              >
                {n.hash}
              </text>
            </motion.g>
          ))}

          {/* === Bottom: stat strip with IntegerTicker numbers === */}
          <motion.g
            initial={{ opacity: 0, y: 12 }}
            animate={{
              opacity: story.isAfter('stats') ? 1 : 0,
              y: story.isAfter('stats') ? 0 : 12,
            }}
            transition={{ duration: 0.5, ease: EASE.expoOut }}
          >
            <line
              x1={60} y1={460} x2={1100} y2={460}
              stroke="var(--cream)" strokeWidth="0.5" opacity="0.15"
            />
            <text
              x={60} y={488}
              className="deck-mono uppercase"
              style={{ fontSize: 10, fill: 'var(--case)', letterSpacing: '0.18em' }}
            >
              SOP MARKETPLACE · THIS QUARTER
            </text>
          </motion.g>
        </svg>

        {/* === Numeric stat strip with IntegerTicker (rendered as DOM, not SVG, so the ticker animates) === */}
        <motion.div
          className="absolute"
          style={{
            left: '2%',
            right: '2%',
            bottom: '2%',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: 16,
            pointerEvents: 'none',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: story.isAfter('stats') ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <StatCell to={12} unit="SOPs" sub="versioned" />
          <StatCell to={3}  unit="branches" sub="active pilots" />
          <StatCell to={8}  unit="merges" sub="reviewer-approved" />
          <StatCell to={0}  unit="conflicts" sub="by construction" italic />
        </motion.div>

        {/* === Floating commit message strip (top) === */}
        <div
          className="absolute"
          style={{
            top: 8,
            left: '8%',
            right: '8%',
            display: 'flex',
            justifyContent: 'center',
            pointerEvents: 'none',
            zIndex: 4,
          }}
        >
          <AnimatePresence mode="wait">
            {story.isAfter('commits') && (
              <motion.div
                key={commitIdx}
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.32, ease: EASE.expoOut }}
                className="deck-mono"
                style={{
                  padding: '6px 14px',
                  borderRadius: 999,
                  background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
                  border: '1px solid color-mix(in srgb, var(--case) 32%, transparent)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.04em',
                  color: 'var(--cream)',
                  backdropFilter: 'blur(6px)',
                  WebkitBackdropFilter: 'blur(6px)',
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  maxWidth: '100%',
                }}
              >
                <span style={{ color: 'var(--case)', fontWeight: 700, marginRight: 8 }}>
                  COMMIT
                </span>
                {COMMITS[commitIdx]}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </ComponentCard>
  );
}

/* ────────── helpers ────────── */

function LaneLabel({
  x, y, title, reviewer, emphasis = false,
}: { x: number; y: number; title: string; reviewer: string; emphasis?: boolean }) {
  return (
    <g>
      <text
        x={x} y={y}
        className="deck-mono uppercase"
        style={{
          fontSize: 9.5,
          fill: emphasis ? 'var(--case)' : 'var(--cream-faint)',
          letterSpacing: '0.18em',
          fontWeight: emphasis ? 700 : 600,
        }}
      >
        {title}
      </text>
      <text
        x={x} y={y + 14}
        className="deck-mono"
        style={{
          fontSize: 7.5,
          fill: 'var(--cream-faint)',
          letterSpacing: '0.16em',
        }}
      >
        {reviewer}
      </text>
    </g>
  );
}

function StatCell({
  to, unit, sub, italic = false,
}: {
  to: number; unit: string; sub: string; italic?: boolean;
}) {
  return (
    <div
      style={{
        padding: '10px 14px',
        borderRadius: 6,
        background: 'color-mix(in srgb, var(--panel) 36%, transparent)',
        borderLeft: '3px solid var(--case)',
      }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: '1.6rem',
          color: italic ? 'var(--case)' : 'var(--cream)',
          fontStyle: italic ? 'italic' : 'normal',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          lineHeight: 1.0,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        <IntegerTicker from={0} to={to} duration={1.0} delay={0} />
        {' '}
        <span
          style={{
            fontSize: '0.85rem',
            color: 'var(--cream-muted)',
            fontStyle: 'normal',
            fontWeight: 400,
            marginLeft: 4,
          }}
        >
          {unit}
        </span>
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          color: 'var(--cream-faint)',
          letterSpacing: '0.16em',
          marginTop: 4,
        }}
      >
        {sub}
      </div>
    </div>
  );
}
