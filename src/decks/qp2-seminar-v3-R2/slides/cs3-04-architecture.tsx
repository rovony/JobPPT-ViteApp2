// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

// 14 Total Agents (1 Supervisor + 10 L1 + 3 L2) + 1 PharmState Bus
const NODES = [
  // L0
  { id: 'l0_sup', label: 'SUPERVISOR', sub: 'Classifies · Routes', cx: 42, cy: 15, tone: 'var(--sage)', level: 0, w: 14, h: 10 },

  // L1 - Row A
  { id: 'l1_data', label: 'Data Mgr', sub: 'profiling', cx: 14, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_nca', label: 'NCA', sub: 'AUC · Cmax', cx: 28, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_pbpk', label: 'PBPK', sub: 'whole-body', cx: 42, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_stat', label: 'Statistical', sub: 'XGBoost', cx: 56, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_sim', label: 'Simulator', sub: 'Monte Carlo', cx: 70, cy: 38, tone: 'var(--cream)', level: 1, w: 11, h: 9 },

  // L1 - Row B
  { id: 'l1_qc', label: 'QC Agent', sub: 'diagnostics', cx: 14, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_rep', label: 'Report', sub: 'FDA docs', cx: 28, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_mod', label: 'Model Mgr', sub: 'Routes to L2', cx: 42, cy: 58, tone: 'var(--amber)', level: 1, w: 11, h: 9, glow: true },
  { id: 'l1_reg', label: 'Reg Intel', sub: 'guidances', cx: 56, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },
  { id: 'l1_gen', label: 'General', sub: 'education', cx: 70, cy: 58, tone: 'var(--cream)', level: 1, w: 11, h: 9 },

  // L2
  { id: 'l2_pop', label: 'PopPK Expert', sub: 'structural', cx: 24, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
  { id: 'l2_pkpd', label: 'PKPD Expert', sub: 'Emax · TGI', cx: 42, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
  { id: 'l2_er', label: 'E-R Expert', sub: 'survival', cx: 60, cy: 86, tone: 'var(--amber)', level: 2, w: 14, h: 10 },
];

const NODE_MAP = Object.fromEntries(NODES.map(n => [n.id, n]));

// Generate Links based on Kim et al 2025 Architecture (L0 -> L1, L1_Mod -> L2)
const ORCH_LINKS = NODES.filter(n => n.level === 1).map(n => ({
  from: NODE_MAP.l0_sup, to: n, color: 'var(--sage)'
}));
const SPEC_LINKS = NODES.filter(n => n.level === 2).map(n => ({
  from: NODE_MAP.l1_mod, to: n, color: 'var(--amber)'
}));
const ALL_LINKS = [...ORCH_LINKS, ...SPEC_LINKS];

// The Decision Tiles based on the CS4 Script
const DECISIONS = [
  {
    kicker: 'Why Centralized',
    title: 'Multi-agent error limits',
    body: 'Independent systems amplify errors 17.2×. Centralized contains it to 4.4× (Kim et al. 2025).',
    tone: 'var(--sage)',
  },
  {
    kicker: 'Why Three Levels',
    title: 'Modeler depth boundary',
    body: 'Level 1 manages data and reporting. Level 2 (PopPK, PKPD) protects deep mathematical reasoning.',
    tone: 'var(--amber)',
  },
  {
    kicker: 'Why Heterogeneous',
    title: 'Sonnet routes, Opus reasons',
    body: 'Matches Anthropic\'s empirically optimal vendor profile: small orchestrator + highly capable specialist workers.',
    tone: 'var(--cyan)',
  },
];

export default function CS3Architecture() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduce = useReducedMotion();
  const go = inView && !reduce;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 04 · Architecture · PharmAgent platform</Eyebrow>

      <Headline delay={0.25} maxChars={65}>
        A three-level hierarchy with centralized topology.
        <span style={{ color: 'var(--sage)', fontStyle: 'italic', display: 'block' }}>Grounded in scaling laws for safety-critical systems.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Topology choice is not aesthetic. Wrong topology is the difference between a working scientific tool and 17× error amplification.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'clamp(var(--space-4), 4vw, var(--space-6))',
            minHeight: 0,
          }}
        >
          {/* Column 1: Massive Hero Stats */}
          <SpecColumn go={go} />

          {/* Column 2: Schematic Graph */}
          <div style={{
            flex: '1 1 32rem',
            minHeight: '26rem',
            position: 'relative',
            background: 'radial-gradient(ellipse at 42% 50%, color-mix(in srgb, var(--panel) 5%, transparent) 0%, transparent 80%)',
            border: '1px solid color-mix(in srgb, var(--sage) 12%, transparent)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
          }}>
            <RoutedWorkflow go={go} />
          </div>

          {/* Column 3: Glassmorphism Decision Tiles */}
          <div style={{
            flex: '0 1 20rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            gap: 'var(--space-3)',
            minHeight: 0,
          }}>
            {DECISIONS.map((d, i) => (
              <DecisionTile key={d.kicker} {...d} go={go} delay={0.95 + i * 0.16} />
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        kicker="Case 04 · Architecture"
        tagline="The platform was designed M15-native — privacy and audit are not features, they are architecture."
        source="Source · pharmAgent.md (Okour, internal v1.0 Feb 2026) · Kim et al. 2025 (arXiv:2512.08296)"
        delay={2.1}
      />
    </SlideGrid>
  );
}

/* ───────────── SUB-COMPONENTS ───────────── */

function SpecColumn({ go = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay: 0.65, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'clamp(var(--space-4), 4vh, var(--space-8))',
        paddingRight: 'clamp(var(--space-4), 4vw, var(--space-6))',
        borderRight: '1px solid color-mix(in srgb, var(--cream) 12%, transparent)',
        flex: '0 0 auto',
      }}
    >
      {[
        { n: '13', l: 'Specialized Agents', t: 'var(--sage)' },
        { n: '151', l: 'Determin. Tools', t: 'var(--cyan)' },
        { n: '76', l: 'Workflow Templates', t: 'var(--amber)' },
        { n: '34', l: 'PharmState Fields', t: 'var(--coral)' },
      ].map((s, i) => (
        <motion.div
          key={s.l}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.8 + i * 0.1, ease: EASE }}
          style={{ display: 'flex', flexDirection: 'column' }}
        >
          <div className="deck-display" style={{
            fontSize: 'clamp(2.5rem, 5vh, 4rem)',
            fontWeight: 700,
            color: s.t,
            lineHeight: 0.9,
            letterSpacing: '-0.03em',
            fontVariantNumeric: 'tabular-nums'
          }}>{s.n}</div>
          <div className="deck-mono uppercase" style={{
            fontSize: '10px',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
            marginTop: 'var(--space-2)',
            fontWeight: 700,
          }}>{s.l}</div>
        </motion.div>
      ))}
    </motion.div>
  );
}

function RoutedWorkflow({ go = true }) {
  return (
    <div style={{ position: 'absolute', inset: 'var(--space-2)' }}>
      {/* ── PharmState Glowing Rail (Right Side) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 1.0, delay: 1.2, ease: EASE }}
        style={{
          position: 'absolute',
          top: '10%',
          bottom: '10%',
          right: '8%',
          width: '6px',
          background: 'var(--amber)',
          borderRadius: '99px',
          boxShadow: '0 0 30px var(--amber), 0 0 10px var(--amber)',
        }}
      >
        <div className="deck-mono uppercase" style={{
          position: 'absolute',
          top: '-24px',
          left: '50%',
          transform: 'translateX(-50%)',
          color: 'var(--amber)',
          fontSize: '11px',
          fontWeight: 700,
          letterSpacing: '0.1em',
        }}>PharmState</div>
      </motion.div>

      <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', overflow: 'visible', zIndex: 0 }}>
        {/* State Bus Dashed Links (PharmState) */}
        {NODES.map((node, i) => {
          // Drop down from the node to a clean horizontal channel
          // L0 (cy=15) drops to 22. L1A (cy=38) drops to 46. L1B (cy=58) drops to 66. L2 (cy=86) drops to 94.
          let busY = node.cy;
          if (node.level === 0) busY = 22;
          else if (node.level === 1 && node.cy < 50) busY = 46;
          else if (node.level === 1 && node.cy > 50) busY = 66;
          else if (node.level === 2) busY = 94;

          const d = `M ${node.cx} ${node.cy} L ${node.cx} ${busY} L 92 ${busY}`;

          return (
            <motion.path
              key={`bus-${node.id}`}
              d={d}
              fill="none"
              stroke="var(--amber)"
              strokeWidth={1}
              strokeDasharray="2 4"
              opacity={0.25}
              initial={{ pathLength: 0 }}
              animate={go ? { pathLength: 1 } : { pathLength: 1 }}
              transition={{ duration: 1.2, delay: 1.2 + i * 0.05, ease: EASE }}
            />
          );
        })}

        {/* Hierarchical Routing Links */}
        {ALL_LINKS.map(({ from, to, color }, i) => {
          // Orthogonal (stair-step) routing
          const midY = (from.cy + to.cy) / 2;
          const d = `M ${from.cx} ${from.cy} L ${from.cx} ${midY} L ${to.cx} ${midY} L ${to.cx} ${to.cy}`;

          return (
            <g key={`link-${from.id}-${to.id}`}>
              {/* Core Line - Thin and Sharp */}
              <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={1}
                opacity={0.3}
                initial={{ pathLength: 0 }}
                animate={go ? { pathLength: 1 } : { pathLength: 1 }}
                transition={{ duration: 1.0, delay: 0.8 + i * 0.05, ease: EASE }}
              />
              {/* Subtle Data Flow - Faint dots moving */}
              <motion.path
                d={d}
                fill="none"
                stroke={color}
                strokeWidth={1.5}
                strokeDasharray="2 24"
                pathLength={100}
                opacity={0.8}
                initial={{ strokeDashoffset: 100, opacity: 0 }}
                animate={go ? { strokeDashoffset: 0, opacity: 0.8 } : { opacity: 0 }}
                transition={{
                  strokeDashoffset: { duration: 3, repeat: Infinity, ease: "linear" },
                  opacity: { duration: 0.5, delay: 1.5 + i * 0.05 }
                }}
              />
            </g>
          );
        })}
      </svg>

      {/* Level Labels */}
      <div className="deck-mono" style={{ position: 'absolute', top: '15%', left: '4%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>LEVEL 0</div>
      <div className="deck-mono" style={{ position: 'absolute', top: '48%', left: '4%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>LEVEL 1</div>
      <div className="deck-mono" style={{ position: 'absolute', top: '86%', left: '4%', color: 'var(--cream-faint)', fontSize: '10px', transform: 'translateY(-50%)' }}>LEVEL 2</div>

      {NODES.map((node, i) => (
        <FlowNode key={node.id} node={node} go={go} delay={1.1 + i * 0.05} />
      ))}
    </div>
  );
}

function FlowNode({ node, go = true, delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 5 }}
      animate={go ? { opacity: 1, scale: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        position: 'absolute',
        left: `${node.cx}%`,
        top: `${node.cy}%`,
        translate: '-50% -50%',
        zIndex: 2,
        width: `${node.w}%`,
        height: `${node.h}%`,
        background: node.glow || node.level === 0 || node.level === 2
          ? `color-mix(in srgb, ${node.tone} 18%, transparent)`
          : `color-mix(in srgb, var(--panel) 70%, transparent)`,
        backdropFilter: 'blur(8px)',
        border: `1px solid color-mix(in srgb, ${node.tone} ${node.glow ? 80 : 35}%, transparent)`,
        borderRadius: node.level === 0 ? '999px' : 'var(--radius-sm)',
        boxShadow: node.glow 
          ? `0 0 20px color-mix(in srgb, ${node.tone} 25%, transparent), inset 0 0 10px color-mix(in srgb, ${node.tone} 15%, transparent)`
          : node.level === 0 || node.level === 2
            ? `0 4px 12px color-mix(in srgb, #000 40%, transparent)`
            : 'none',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '2px',
      }}
    >
      <span className="deck-display" style={{
        fontSize: node.level === 0 ? '14px' : '12px',
        color: node.tone,
        fontWeight: 700,
        lineHeight: 1.1,
      }}>{node.label}</span>
      <div className="deck-body" style={{
        fontSize: '9px',
        color: 'var(--cream)',
        opacity: 0.7,
        marginTop: '2px',
        lineHeight: 1.1,
      }}>{node.sub}</div>
    </motion.div>
  );
}

function DecisionTile({ kicker, title, body, tone, delay = 0, go = true }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        padding: 'var(--space-3) var(--space-4)',
        background: `color-mix(in srgb, ${tone} 6%, transparent)`,
        backdropFilter: 'blur(16px)',
        border: `1px solid color-mix(in srgb, ${tone} 25%, transparent)`,
        borderLeft: `3px solid ${tone}`,
        borderRadius: 'var(--radius-md)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-1)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="deck-mono uppercase" style={{
        fontSize: '10px',
        letterSpacing: 'var(--ls-mono-wide)',
        color: tone,
        fontWeight: 700,
      }}>{kicker}</div>
      <div className="deck-display" style={{
        fontSize: '16px',
        color: 'var(--cream)',
        lineHeight: 1.2,
        fontWeight: 650,
      }}>{title}</div>
      <div className="deck-body" style={{
        fontSize: '12px',
        color: 'color-mix(in srgb, var(--cream) 78%, transparent)',
        lineHeight: 1.35,
      }}>{body}</div>
    </motion.div>
  );
}
