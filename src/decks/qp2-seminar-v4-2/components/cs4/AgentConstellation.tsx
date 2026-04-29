// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';

/**
 * AgentConstellation — editorial dot-cloud SVG modeled on CS1 AnchorViz.
 *
 * 13 dots laid out as a brain-silhouette point cloud (two lobes, central
 * brainstem). Each dot reveals via stagger (i*0.06). After all dots land,
 * faint hairline connectors animate (pathLength 0→1) to suggest the
 * network. Mono label "13 AGENTS · ONE WORKFLOW" centered.
 *
 * Used on cs4-07 (at-a-glance reveal) and optionally on cs4-01 (static
 * seed).
 *
 * Aesthetic register: Bloomberg / Economist editorial — hairline borders,
 * mono labels with letterSpacing, NO gradient halos, NO glow blobs.
 */

const EASE = [0.2, 0.7, 0.3, 1];

/* 13 deterministic positions sampled along a brain silhouette in a
   280×260 viewBox. Two lobes (left / right hemispheres) plus a small
   brainstem cluster. Each entry: [x, y, label, abbr]. The (x,y) values
   were hand-picked to read as a brain at small size; positions are
   deterministic so the layout is identical across renders. */
const AGENTS = [
  // Left hemisphere
  [ 78,  88, 'Data Manager',     'DATA'],
  [ 60, 124, 'NCA',              'NCA'],
  [ 92, 152, 'Statistical',      'STAT'],
  [ 70, 184, 'PBPK',             'PBPK'],
  // Center / supervisor / modeler
  [140,  72, 'Supervisor',       'SUPV'],
  [140, 116, 'Modeler Manager',  'MOD'],
  [140, 170, 'Simulator',        'SIM'],
  [140, 214, 'PopPK Expert',     'POPPK'],
  // Right hemisphere
  [202,  88, 'QC',               'QC'],
  [220, 124, 'Report',           'REPT'],
  [188, 152, 'Reg Intel',        'REG'],
  [210, 184, 'PKPD Expert',      'PKPD'],
  // Brainstem
  [170, 220, 'E-R Expert',       'ER'],
];

/* Faint hairline edges that connect into a brain-network silhouette.
   Indices into AGENTS[]. Drawn AFTER all dots have landed. */
const EDGES = [
  // Supervisor → all L1 (light fan-out)
  [4, 0], [4, 1], [4, 5], [4, 8], [4, 9],
  // Modeler Manager → 3 L2 specialists
  [5, 7], [5, 11], [5, 12],
  // Lateral hairlines — the "brain network" texture
  [0, 1], [1, 2], [2, 3], [8, 9], [9, 10], [10, 11], [3, 12], [11, 12],
];

export default function AgentConstellation({
  go = true,
  delay = 0,
  showLabel = true,
  staticMode = false,
}) {
  const reduce = useReducedMotion();
  const motionGo = go && !reduce && !staticMode;

  return (
    <motion.svg
      viewBox="0 0 280 260"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      initial={reduce || staticMode ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, ease: EASE, delay }}
      aria-label="13-agent brain-silhouette point cloud"
    >
      {/* Faint hairline connectors — drawn after dots land. */}
      {EDGES.map(([a, b], i) => {
        const [x1, y1] = AGENTS[a];
        const [x2, y2] = AGENTS[b];
        return (
          <motion.line
            key={`e${i}`}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="var(--amber, #d4a373)"
            strokeWidth={0.6}
            strokeOpacity={0.35}
            initial={reduce || staticMode ? false : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.35 }}
            transition={{
              duration: 0.7,
              ease: EASE,
              delay: motionGo ? delay + 1.4 + i * 0.04 : 0,
            }}
          />
        );
      })}

      {/* Hairline ring framing the silhouette — the "skull" outline. */}
      <motion.ellipse
        cx={140}
        cy={140}
        rx={108}
        ry={102}
        fill="none"
        stroke="var(--cream-hairline, rgba(255,232,189,0.12))"
        strokeWidth={1}
        strokeDasharray="2 4"
        initial={reduce || staticMode ? false : { opacity: 0 }}
        animate={{ opacity: 0.7 }}
        transition={{ duration: 0.6, ease: EASE, delay: delay + 0.1 }}
      />

      {/* 13 agent dots */}
      {AGENTS.map(([x, y, label, abbr], i) => (
        <g key={`a${i}`}>
          <motion.circle
            cx={x}
            cy={y}
            r={5}
            fill="var(--amber, #d4a373)"
            initial={reduce || staticMode ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.32,
              ease: EASE,
              delay: motionGo ? delay + 0.4 + i * 0.07 : 0,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          {/* Inner pip — a tiny darker mark inside each dot for editorial detail. */}
          <motion.circle
            cx={x}
            cy={y}
            r={1.4}
            fill="var(--bg, #1a1612)"
            initial={reduce || staticMode ? false : { scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{
              duration: 0.32,
              ease: EASE,
              delay: motionGo ? delay + 0.5 + i * 0.07 : 0,
            }}
            style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
          />
          {/* Mono abbreviation tag below each dot. */}
          <motion.text
            x={x}
            y={y + 14}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="6"
            letterSpacing="0.8"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
            initial={reduce || staticMode ? false : { opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{
              duration: 0.5,
              ease: EASE,
              delay: motionGo ? delay + 0.8 + i * 0.07 : 0,
            }}
          >
            {abbr}
          </motion.text>
        </g>
      ))}

      {/* Centered "13 AGENTS" mono label — landed last. */}
      {showLabel && (
        <>
          <motion.text
            x={140}
            y={140}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="14"
            letterSpacing="2"
            fill="var(--amber, #d4a373)"
            fontWeight={700}
            initial={reduce || staticMode ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: motionGo ? delay + 2.0 : 0,
            }}
          >
            13 AGENTS
          </motion.text>
          <motion.text
            x={140}
            y={154}
            textAnchor="middle"
            fontFamily="var(--font-mono)"
            fontSize="7"
            letterSpacing="1.2"
            fill="var(--cream-faint, rgba(255,232,189,0.45))"
            initial={reduce || staticMode ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              duration: 0.55,
              ease: EASE,
              delay: motionGo ? delay + 2.15 : 0,
            }}
          >
            ONE WORKFLOW · CENTRALIZED
          </motion.text>
        </>
      )}
    </motion.svg>
  );
}
