// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

export default function CS3Architecture() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Architecture</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        When multi-agent AI{' '}
        <span style={{ color: 'var(--sage)' }}>helps vs. hurts.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        From 180 experiments — Google Research &amp; DeepMind, 2025.
        PharmAgent's architecture is built on these findings.
      </Subhead>

      <Viz>
        <div
          style={{
            width: '100%', height: '100%',
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr auto',
            gap: 'var(--space-3)',
          }}
        >
          {/* Q1: Coordinator Effect */}
          <QuadrantCard
            accent="var(--coral)"
            title="The Coordinator Effect"
            tag="PharmAgent → Supervisor agent"
            delay={0.8}
            go={go}
          >
            <CoordinatorEffectViz go={go} reduce={reduce} />
          </QuadrantCard>

          {/* Q2: 45% Ceiling */}
          <QuadrantCard
            accent="var(--cyan)"
            title="The 45% Ceiling"
            tag="PharmAgent → Specialist agents"
            delay={0.95}
            go={go}
          >
            <CapabilityCeilingViz go={go} reduce={reduce} />
          </QuadrantCard>

          {/* Q3: Sequential Tasks Break */}
          <QuadrantCard
            accent="var(--amber)"
            title="Sequential Tasks Break Apart"
            tag="PharmAgent → Three-level hierarchy"
            delay={1.1}
            go={go}
          >
            <SequentialBreakViz go={go} reduce={reduce} />
          </QuadrantCard>

          {/* Q4: Parallel Tasks Thrive */}
          <QuadrantCard
            accent="var(--sage)"
            title="Parallel Tasks Thrive"
            tag="PharmAgent → Parallel workflows"
            delay={1.25}
            go={go}
          >
            <ParallelThriveViz go={go} reduce={reduce} />
          </QuadrantCard>

          {/* Platform specs bar */}
          <motion.div
            style={{
              gridColumn: '1 / -1',
              display: 'flex', justifyContent: 'center',
              gap: 'clamp(var(--space-6), 5vw, var(--space-12))',
              padding: 'var(--space-2) var(--space-4)',
              background: 'color-mix(in srgb, var(--sage) 6%, transparent)',
              border: '1px solid color-mix(in srgb, var(--sage) 25%, transparent)',
            }}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.5, delay: 1.6, ease: EASE }}
          >
            {[
              { n: '13', l: 'agents' },
              { n: '151', l: 'tools' },
              { n: '76', l: 'templates' },
              { n: '34', l: 'state fields' },
            ].map((s) => (
              <div key={s.l} style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-1)' }}>
                <span className="deck-display" style={{
                  fontSize: 'var(--fs-card-numeral)',
                  fontWeight: 700, color: 'var(--sage)',
                  fontVariantNumeric: 'tabular-nums',
                }}>{s.n}</span>
                <span className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-card-meta)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono)', fontWeight: 600,
                }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>

      <Footer
        delay={reduce ? 0 : 1.8}
        kicker="Act 3 · Platform"
        tagline="Architecture-task alignment determines success — not number of agents."
        source="Kim et al. arXiv:2512.08296 (Google Research & DeepMind, 2025) · ICH M15"
      />
    </SlideGrid>
  );
}

/* ================================================================
   QuadrantCard — shared wrapper for each 2×2 panel
   ================================================================ */
function QuadrantCard({ accent, title, tag, delay, go, children }) {
  return (
    <motion.div
      style={{
        display: 'flex', flexDirection: 'column',
        border: `1px solid color-mix(in srgb, ${accent} 35%, transparent)`,
        borderLeft: `4px solid ${accent}`,
        background: `linear-gradient(135deg,
          color-mix(in srgb, ${accent} 8%, transparent),
          color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
        padding: 'var(--space-3)',
        gap: 'var(--space-2)',
        minHeight: 0,
        overflow: 'hidden',
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={go ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay, ease: EASE }}
    >
      <span className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-card-label)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: accent, fontWeight: 700,
      }}>{title}</span>

      <div style={{ flex: 1, minHeight: 0, display: 'flex', alignItems: 'center' }}>
        {children}
      </div>

      <span className="deck-mono" style={{
        fontSize: 'var(--fs-card-meta)',
        color: `color-mix(in srgb, ${accent} 80%, var(--cream))`,
        fontWeight: 600, letterSpacing: '0.04em',
      }}>{tag}</span>
    </motion.div>
  );
}

/* ================================================================
   Q1 — Coordinator Effect: 17× → 4× error reduction
   Concentric rings (no supervisor = loose, with supervisor = tight)
   ================================================================ */
function CoordinatorEffectViz({ go, reduce }) {
  const ringR = [38, 28, 18];
  return (
    <svg viewBox="0 0 360 120" style={{ width: '100%', height: 'auto' }} aria-label="Coordinator effect: 17× to 4× error reduction">
      {/* LEFT: No supervisor — scattered, large error rings */}
      <text x={90} y={12} textAnchor="middle" fill="var(--cream-faint)" style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>NO SUPERVISOR</text>
      {ringR.map((r, i) => (
        <motion.circle
          key={`no-${i}`}
          cx={90} cy={65} r={r}
          fill="none" stroke="var(--coral)" strokeWidth={1}
          strokeDasharray={i === 0 ? '4 3' : 'none'}
          opacity={0.3 + i * 0.2}
          initial={{ scale: 0 }}
          animate={go ? { scale: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.9 + i * 0.1, ease: EASE }}
        />
      ))}
      {/* Scattered agent dots — random positions */}
      {[[60, 40], [120, 45], [75, 85], [110, 80], [90, 55], [95, 75]].map(([cx, cy], i) => (
        <motion.circle
          key={`a-${i}`}
          cx={cx} cy={cy} r={4}
          fill="var(--coral)" opacity={0.7}
          initial={{ opacity: 0 }}
          animate={go ? { opacity: 0.7 } : {}}
          transition={{ duration: 0.3, delay: 1.1 + i * 0.05 }}
        />
      ))}
      <motion.text
        x={90} y={108} textAnchor="middle"
        fill="var(--coral)" style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.3 }}
      >17× errors</motion.text>

      {/* Arrow between */}
      <motion.path
        d="M 155 65 L 195 65" stroke="var(--cream-faint)" strokeWidth={1.5}
        markerEnd="url(#arrowhead)"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={go ? { pathLength: 1, opacity: 0.6 } : {}}
        transition={{ duration: 0.4, delay: 1.4 }}
      />
      <defs>
        <marker id="arrowhead" markerWidth="6" markerHeight="4" refX="5" refY="2" orient="auto">
          <polygon points="0 0, 6 2, 0 4" fill="var(--cream-faint)" />
        </marker>
      </defs>

      {/* RIGHT: With supervisor — organized, small error rings */}
      <text x={270} y={12} textAnchor="middle" fill="var(--cream-faint)" style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 600 }}>WITH SUPERVISOR</text>
      {/* Central supervisor node */}
      <motion.circle
        cx={270} cy={55} r={10}
        fill="var(--sage)" opacity={0.9}
        initial={{ scale: 0 }}
        animate={go ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.5, ease: EASE }}
      />
      <motion.text
        x={270} y={58} textAnchor="middle"
        fill="var(--bg)" style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.6 }}
      >S</motion.text>
      {/* Organized worker nodes around supervisor */}
      {[0, 60, 120, 180, 240, 300].map((angle, i) => {
        const rad = (angle * Math.PI) / 180;
        const cx = 270 + Math.cos(rad) * 28;
        const cy = 55 + Math.sin(rad) * 28;
        return (
          <React.Fragment key={`w-${i}`}>
            <motion.line
              x1={270} y1={55} x2={cx} y2={cy}
              stroke="var(--sage)" strokeWidth={0.8} opacity={0.4}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 0.4 } : {}}
              transition={{ duration: 0.3, delay: 1.6 + i * 0.04 }}
            />
            <motion.circle
              cx={cx} cy={cy} r={4}
              fill="var(--sage)" opacity={0.6}
              initial={{ scale: 0 }}
              animate={go ? { scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.65 + i * 0.04, ease: EASE }}
            />
          </React.Fragment>
        );
      })}
      {/* Tight error ring */}
      <motion.circle
        cx={270} cy={55} r={14}
        fill="none" stroke="var(--sage)" strokeWidth={1.5}
        strokeDasharray="3 2" opacity={0.5}
        initial={{ scale: 0 }}
        animate={go ? { scale: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.8 }}
      />
      <motion.text
        x={270} y={108} textAnchor="middle"
        fill="var(--sage)" style={{ fontSize: 18, fontFamily: 'var(--font-display)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 1.9 }}
      >4× errors</motion.text>
    </svg>
  );
}

/* ================================================================
   Q2 — The 45% Ceiling: negative returns past 45% baseline
   Progress bar with threshold marker
   ================================================================ */
function CapabilityCeilingViz({ go, reduce }) {
  const barY = 40;
  const barH = 20;
  const barW = 300;
  const threshold = 0.45;
  return (
    <svg viewBox="0 0 360 110" style={{ width: '100%', height: 'auto' }} aria-label="45% capability ceiling">
      {/* Background bar */}
      <rect x={30} y={barY} width={barW} height={barH} rx={2}
        fill="color-mix(in srgb, var(--panel) 80%, transparent)"
        stroke="var(--cream-hairline)" strokeWidth={0.5} />

      {/* Positive zone (left of threshold) */}
      <motion.rect
        x={30} y={barY} height={barH} rx={2}
        fill="var(--cyan)" opacity={0.5}
        initial={{ width: 0 }}
        animate={go ? { width: barW * threshold } : {}}
        transition={{ duration: 0.7, delay: 1.1, ease: EASE }}
      />

      {/* Negative zone (right of threshold) */}
      <motion.rect
        x={30 + barW * threshold} y={barY} height={barH}
        fill="var(--coral)" opacity={0.2}
        initial={{ width: 0 }}
        animate={go ? { width: barW * (1 - threshold) } : {}}
        transition={{ duration: 0.7, delay: 1.4, ease: EASE }}
      />

      {/* Threshold line */}
      <motion.line
        x1={30 + barW * threshold} y1={barY - 8}
        x2={30 + barW * threshold} y2={barY + barH + 8}
        stroke="var(--cream)" strokeWidth={2} strokeDasharray="4 2"
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.5 }}
      />
      <motion.text
        x={30 + barW * threshold} y={barY - 12}
        textAnchor="middle" fill="var(--cyan)"
        style={{ fontSize: 12, fontFamily: 'var(--font-display)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 1.6 }}
      >45%</motion.text>

      {/* Labels */}
      <text x={30 + (barW * threshold) / 2} y={barY + barH + 20}
        textAnchor="middle" fill="var(--cyan)"
        style={{ fontSize: 7, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase' }}>
        Positive returns
      </text>
      <text x={30 + barW * threshold + (barW * (1 - threshold)) / 2} y={barY + barH + 20}
        textAnchor="middle" fill="var(--coral)"
        style={{ fontSize: 7, fontFamily: 'var(--font-mono)', fontWeight: 600, textTransform: 'uppercase' }}>
        Negative returns
      </text>

      {/* Single agent icon (left) */}
      <motion.circle cx={45} cy={barY - 18} r={6} fill="var(--cyan)" opacity={0.6}
        initial={{ opacity: 0 }} animate={go ? { opacity: 0.6 } : {}} transition={{ delay: 1.2 }} />
      <text x={45} y={barY - 15} textAnchor="middle" fill="var(--bg)"
        style={{ fontSize: 6, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>1</text>

      {/* Multi agent icons (right) */}
      {[0, 10, 20].map((dx, i) => (
        <motion.circle key={i} cx={310 + dx} cy={barY - 18} r={4.5}
          fill="var(--coral)" opacity={0.5}
          initial={{ opacity: 0 }} animate={go ? { opacity: 0.5 } : {}}
          transition={{ delay: 1.5 + i * 0.05 }} />
      ))}

      {/* Bottom annotation */}
      <motion.text
        x={180} y={95} textAnchor="middle" fill="var(--cream-muted)"
        style={{ fontSize: 7, fontFamily: 'var(--font-body)', fontStyle: 'italic' }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >AUC, Cmax, λz — one focused agent outperforms a committee.</motion.text>
    </svg>
  );
}

/* ================================================================
   Q3 — Sequential Tasks Break Apart: chain degradation
   Shows intact chain vs broken chain with error propagation
   ================================================================ */
function SequentialBreakViz({ go, reduce }) {
  const steps = ['Base\nModel', 'Covar-\niates', 'Eval-\nuation', 'Report'];
  const y1 = 25; // intact chain
  const y2 = 75; // broken chain
  const xStart = 30;
  const xGap = 80;

  return (
    <svg viewBox="0 0 360 120" style={{ width: '100%', height: 'auto' }} aria-label="Sequential task degradation">
      {/* Row label */}
      <text x={10} y={y1 + 5} fill="var(--cream-faint)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)' }}>INTACT</text>
      <text x={10} y={y2 + 5} fill="var(--cream-faint)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)' }}>SPLIT</text>

      {/* INTACT CHAIN — green connected nodes */}
      {steps.map((label, i) => {
        const x = xStart + i * xGap;
        return (
          <React.Fragment key={`intact-${i}`}>
            {/* Connector */}
            {i > 0 && (
              <motion.line
                x1={x - xGap + 30} y1={y1} x2={x - 10} y2={y1}
                stroke="var(--sage)" strokeWidth={2} opacity={0.6}
                initial={{ pathLength: 0 }}
                animate={go ? { pathLength: 1 } : {}}
                transition={{ duration: 0.3, delay: 1.0 + i * 0.1 }}
              />
            )}
            <motion.rect
              x={x - 10} y={y1 - 12} width={40} height={24} rx={4}
              fill="color-mix(in srgb, var(--sage) 20%, transparent)"
              stroke="var(--sage)" strokeWidth={1}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={go ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.9 + i * 0.1, ease: EASE }}
            />
            {label.split('\n').map((line, li) => (
              <motion.text key={li}
                x={x + 10} y={y1 - 2 + li * 9} textAnchor="middle"
                fill="var(--cream)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)', fontWeight: 600 }}
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 1 } : {}}
                transition={{ delay: 0.95 + i * 0.1 }}
              >{line}</motion.text>
            ))}
          </React.Fragment>
        );
      })}

      {/* BROKEN CHAIN — amber with breaks */}
      {steps.map((label, i) => {
        const x = xStart + i * xGap;
        return (
          <React.Fragment key={`broken-${i}`}>
            {/* Broken connector */}
            {i > 0 && (
              <>
                <motion.line
                  x1={x - xGap + 30} y1={y2} x2={x - xGap + 42} y2={y2}
                  stroke="var(--amber)" strokeWidth={2} opacity={0.5}
                  strokeDasharray="3 2"
                  initial={{ opacity: 0 }}
                  animate={go ? { opacity: 0.5 } : {}}
                  transition={{ delay: 1.3 + i * 0.1 }}
                />
                {/* Break symbol */}
                <motion.text
                  x={x - 25} y={y2 + 4} textAnchor="middle"
                  fill="var(--coral)" style={{ fontSize: 10, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
                  initial={{ opacity: 0 }}
                  animate={go ? { opacity: 0.8 } : {}}
                  transition={{ delay: 1.4 + i * 0.1 }}
                >✕</motion.text>
                <motion.line
                  x1={x - 18} y1={y2} x2={x - 10} y2={y2}
                  stroke="var(--amber)" strokeWidth={2} opacity={0.5}
                  strokeDasharray="3 2"
                  initial={{ opacity: 0 }}
                  animate={go ? { opacity: 0.5 } : {}}
                  transition={{ delay: 1.3 + i * 0.1 }}
                />
              </>
            )}
            <motion.rect
              x={x - 10} y={y2 - 12} width={40} height={24} rx={4}
              fill="color-mix(in srgb, var(--amber) 15%, transparent)"
              stroke="var(--amber)" strokeWidth={1} opacity={0.7}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={go ? { opacity: 0.7, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.2 + i * 0.1, ease: EASE }}
            />
            {label.split('\n').map((line, li) => (
              <motion.text key={li}
                x={x + 10} y={y2 - 2 + li * 9} textAnchor="middle"
                fill="var(--cream-muted)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)', fontWeight: 500 }}
                initial={{ opacity: 0 }}
                animate={go ? { opacity: 0.7 } : {}}
                transition={{ delay: 1.25 + i * 0.1 }}
              >{line}</motion.text>
            ))}
          </React.Fragment>
        );
      })}

      {/* Degradation stat */}
      <motion.text
        x={180} y={112} textAnchor="middle"
        fill="var(--amber)" style={{ fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ delay: 1.8 }}
      >39–70% degradation</motion.text>
    </svg>
  );
}

/* ================================================================
   Q4 — Parallel Tasks Thrive: swim lanes converging to result
   Four parallel lanes running simultaneously, merging at output
   ================================================================ */
function ParallelThriveViz({ go, reduce }) {
  const lanes = [
    { label: 'NCA — Dose Grp 1', color: 'var(--sage)' },
    { label: 'NCA — Dose Grp 2', color: 'var(--sage)' },
    { label: 'DDI Assessment',   color: 'var(--sage)' },
    { label: 'BE Evaluation',    color: 'var(--sage)' },
  ];
  const laneH = 18;
  const laneGap = 4;
  const startX = 30;
  const laneW = 220;
  const mergeX = startX + laneW + 20;
  const startY = 12;

  return (
    <svg viewBox="0 0 360 110" style={{ width: '100%', height: 'auto' }} aria-label="Parallel tasks: +80.9% improvement">
      {lanes.map((lane, i) => {
        const y = startY + i * (laneH + laneGap);
        const midY = startY + ((lanes.length - 1) * (laneH + laneGap)) / 2 + laneH / 2;
        return (
          <React.Fragment key={lane.label}>
            {/* Start marker */}
            <motion.circle
              cx={startX} cy={y + laneH / 2} r={4}
              fill={lane.color} opacity={0.6}
              initial={{ scale: 0 }}
              animate={go ? { scale: 1 } : {}}
              transition={{ delay: 1.3 + i * 0.08, ease: EASE }}
            />

            {/* Lane bar */}
            <motion.rect
              x={startX + 8} y={y + 2} height={laneH - 4} rx={2}
              fill={`color-mix(in srgb, ${lane.color} 25%, transparent)`}
              stroke={lane.color} strokeWidth={0.8} opacity={0.8}
              initial={{ width: 0 }}
              animate={go ? { width: laneW - 8 } : {}}
              transition={{ duration: 0.6, delay: 1.35 + i * 0.08, ease: EASE }}
            />

            {/* Lane label */}
            <motion.text
              x={startX + 14} y={y + laneH / 2 + 3}
              fill="var(--cream)" style={{ fontSize: 7, fontFamily: 'var(--font-mono)', fontWeight: 600 }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : {}}
              transition={{ delay: 1.5 + i * 0.08 }}
            >{lane.label}</motion.text>

            {/* End check */}
            <motion.circle
              cx={startX + laneW + 2} cy={y + laneH / 2} r={4}
              fill={lane.color} opacity={0.7}
              initial={{ scale: 0 }}
              animate={go ? { scale: 1 } : {}}
              transition={{ delay: 1.7 + i * 0.06, ease: EASE }}
            />
            <motion.text
              x={startX + laneW + 2} y={y + laneH / 2 + 3}
              textAnchor="middle" fill="var(--bg)"
              style={{ fontSize: 6, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
              initial={{ opacity: 0 }}
              animate={go ? { opacity: 1 } : {}}
              transition={{ delay: 1.75 + i * 0.06 }}
            >✓</motion.text>

            {/* Merge line to central point */}
            <motion.line
              x1={startX + laneW + 6} y1={y + laneH / 2}
              x2={mergeX + 10} y2={midY}
              stroke={lane.color} strokeWidth={1} opacity={0.4}
              initial={{ pathLength: 0 }}
              animate={go ? { pathLength: 1 } : {}}
              transition={{ duration: 0.3, delay: 1.8 + i * 0.06 }}
            />
          </React.Fragment>
        );
      })}

      {/* Merge node */}
      <motion.circle
        cx={mergeX + 10} cy={startY + ((lanes.length - 1) * (laneH + laneGap)) / 2 + laneH / 2}
        r={10} fill="var(--sage)" opacity={0.85}
        initial={{ scale: 0 }}
        animate={go ? { scale: 1 } : {}}
        transition={{ delay: 2.0, ease: EASE }}
      />
      <motion.text
        x={mergeX + 10}
        y={startY + ((lanes.length - 1) * (laneH + laneGap)) / 2 + laneH / 2 + 3}
        textAnchor="middle" fill="var(--bg)"
        style={{ fontSize: 8, fontFamily: 'var(--font-mono)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ delay: 2.1 }}
      >✓</motion.text>

      {/* Result stat */}
      <motion.text
        x={180} y={105} textAnchor="middle"
        fill="var(--sage)" style={{ fontSize: 14, fontFamily: 'var(--font-display)', fontWeight: 700 }}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : {}}
        transition={{ delay: 2.2 }}
      >+80.9% improvement</motion.text>
    </svg>
  );
}
