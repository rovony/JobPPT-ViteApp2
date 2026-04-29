// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import WorkflowStageBand, { WORKFLOW_STAGES } from './WorkflowStageBand';

/**
 * LandscapeSlices — used by S5 (cs4-05-landscape).
 *
 * Five published systems addressing slices of the MIDD workflow.
 *
 * Layout: a thin card row (name + org + 1-line scope, no inline bar)
 * stacked above five SHARED WorkflowStageBand rows, one per system.
 * Each row has the system name on the left and shows the same 7-stage
 * pipeline with that system's coverage filled amber. Reading the rows
 * top-to-bottom, the empty stages dominate — "slices, not substrate"
 * is one shape across all five systems.
 *
 * S7 will reuse the same WorkflowStageBand primitive in
 * `coverage = [true × 7]` mode — the visual contrast vs S5 is the
 * payoff.
 */

const EASE = [0.2, 0.7, 0.3, 1];

export const STAGE_LABELS = WORKFLOW_STAGES;
const STAGE_COUNT = STAGE_LABELS.length;

// Coverage encoded as boolean[7] in stage order:
// [Data, NCA, PopPK, PKPD, ER, QC, Reporting].
const SYSTEMS = [
  {
    name: 'Apollo-AI',
    org: 'Pfizer / InsightRX',
    anchor: 'Shahin et al. 2025',
    scope: '~5 agents · QCP-focused',
    cover: [false, false, true, true, true, false, false],
  },
  {
    name: 'pyDarwin',
    org: 'AstraZeneca',
    anchor: 'Open-source 2023+',
    scope: 'PopPK structural search only',
    cover: [false, false, true, false, false, false, false],
  },
  {
    name: 'DeepPumas',
    org: 'PumasAI',
    anchor: 'Pumas-AI commercial',
    scope: 'Model substrate (not workflow)',
    cover: [false, false, true, false, false, false, false],
  },
  {
    name: 'PEARL',
    org: 'Buffalo',
    anchor: 'Waikar & Bhat 2026',
    scope: 'Regulatory RAG only',
    cover: [false, false, false, false, false, false, true],
  },
  {
    name: 'QSP-Copilot',
    org: 'Saini et al.',
    anchor: '2025',
    scope: 'QSP modeling only',
    cover: [false, false, false, true, false, false, false],
  },
];

export { SYSTEMS as CS4_LANDSCAPE_SYSTEMS };

export default function LandscapeSlices({ go = true, delay = 0.7 }) {
  const cardStagger = 0.18;
  const lastCardDelay = delay + (SYSTEMS.length - 1) * cardStagger;
  const bandDelay = lastCardDelay + 0.4;

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-3), 1.6vh, var(--space-4))',
        minHeight: 0,
      }}
    >
      {/* Compact card row — 5 columns, no inline coverage bars. */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(5, minmax(0, 1fr))',
          gap: 'clamp(var(--space-2), 1.2vw, var(--space-4))',
          alignItems: 'stretch',
        }}
      >
        {SYSTEMS.map((s, i) => (
          <SliceCard key={s.name} system={s} index={i} go={go} delay={delay + i * cardStagger} />
        ))}
      </div>

      {/* Stacked WorkflowStageBand — 5 rows, one per system. */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: bandDelay, ease: EASE }}
        style={{
          flex: '1 1 auto',
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(2px, 0.4vh, 6px)',
          padding:
            'clamp(var(--space-2), 1.2vh, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-4))',
          borderTop: '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
          background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
          borderRadius: 'var(--radius-md)',
          minHeight: 0,
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.7rem, min(0.85vw, 1.35vh), 0.86rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 700,
            marginBottom: 'var(--space-1)',
          }}
        >
          Coverage projected onto the MIDD pipeline · 5 systems
        </div>
        {SYSTEMS.map((s, i) => (
          <WorkflowStageBand
            key={s.name}
            label={s.name}
            coverage={s.cover}
            compact
            showStageLabels={i === 0}
            go={go}
            delay={bandDelay + 0.18 + i * 0.18}
          />
        ))}
      </motion.div>
    </div>
  );
}

function SliceCard({ system, index, go, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: EASE }}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        padding:
          'clamp(var(--space-2), 1.2vh, var(--space-3)) clamp(var(--space-2), 1.2vw, var(--space-3))',
        background: 'color-mix(in srgb, var(--panel) 75%, transparent)',
        border: '1px solid color-mix(in srgb, var(--cream-faint) 28%, transparent)',
        borderRadius: 'var(--radius-md)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.72rem, min(0.85vw, 1.35vh), 0.88rem)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--amber)',
          fontWeight: 800,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(0.95rem, min(1.15vw, 1.85vh), 1.25rem)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.15,
        }}
      >
        {system.name}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'clamp(0.66rem, min(0.78vw, 1.25vh), 0.78rem)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          fontWeight: 600,
        }}
      >
        {system.org}
      </div>
      <div
        className="deck-body italic"
        style={{
          fontSize: 'clamp(0.74rem, min(0.9vw, 1.45vh), 0.9rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.32,
        }}
      >
        {system.anchor}
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: 'clamp(0.78rem, min(0.95vw, 1.5vh), 0.96rem)',
          color: 'var(--cream)',
          lineHeight: 1.32,
        }}
      >
        {system.scope}
      </div>
      <div
        className="deck-mono"
        style={{
          fontSize: 'clamp(0.72rem, min(0.88vw, 1.4vh), 0.88rem)',
          color: 'var(--amber)',
          fontWeight: 700,
          marginTop: 'auto',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {system.cover.filter(Boolean).length} / {STAGE_COUNT} stages
      </div>
    </motion.div>
  );
}
