import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import HairlineGrid from '../components/backgrounds/HairlineGrid';
import { EASE } from '../motion';

/**
 * Slide 04 — "The market is moving above it" · Comparator landscape.
 *
 * Patterns: A1 + B1 + D5 Fact-Cell Grid (3×3 = 9 systems) +
 * each cell shows X-of-7 stage coverage as an animated bar +
 * C2 staggered cascade on cells (0.10s stagger).
 */
type System = {
  name: string;
  sponsor: string;
  stages: number; // out of 7
  scope: string;
};

const SYSTEMS: System[] = [
  {
    name: 'Apollo-AI',
    sponsor: 'Pfizer + InsightRX · Shahin et al. CTS 2025',
    stages: 3,
    scope: 'Quantitative clinical pharmacology workflows',
  },
  {
    name: 'PharmAgents',
    sponsor: 'Bran et al. · arXiv 2025',
    stages: 1,
    scope: 'Drug discovery only',
  },
  {
    name: 'Prompt-to-Pill',
    sponsor: 'Vichentijevikj et al. · 2026',
    stages: 2,
    scope: 'Discovery + virtual trial',
  },
  {
    name: 'PharmaSwarm',
    sponsor: 'arXiv · 2025',
    stages: 1,
    scope: 'Hypothesis generation',
  },
  {
    name: 'Pumas Suite',
    sponsor: 'Pumas-AI · commercial',
    stages: 2,
    scope: 'Pumas-bound add-ons (DeepPumas, AskPumas, PumasAide)',
  },
  {
    name: 'pyDarwin',
    sponsor: 'Open source · Certara',
    stages: 1,
    scope: 'PopPK structural search',
  },
  {
    name: 'PEARL',
    sponsor: 'Buffalo group · 2026',
    stages: 1,
    scope: 'Regulatory RAG only',
  },
  {
    name: 'QSP-Copilot',
    sponsor: 'Saini et al. · 2025',
    stages: 1,
    scope: 'QSP modeling assistant',
  },
  {
    name: 'DrugAgent',
    sponsor: 'arXiv · 2024–25',
    stages: 1,
    scope: 'Drug-discovery ML pipeline',
  },
];

export default function MarketMovingSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="FIELD STATE · COMPARATOR LANDSCAPE"
      headline={
        <>
          Each system owns{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>one or two</span> stages
        </>
      }
      subhead="The market is moving above the regulatory floor — fragmented, manual, no end-to-end foundation."
      footerKicker="04 · MOVEMENT 1 · LANDSCAPE"
      footerTagline="Every system stops at the seams."
      footerSource="Source · comparator survey of published systems · Apr 2026"
    >
      <HairlineGrid coarse opacity={0.05} />

      <div className="grid grid-cols-3 grid-rows-3 gap-3 h-full px-2 pt-4 pb-4 relative z-10">
        {SYSTEMS.map((s, i) => (
          <Cell key={s.name} system={s} index={i} />
        ))}
      </div>

      <TakeHomeStrip
        text="Each system addresses one or two MIDD stages. None addresses the foundation."
        caseColor="amber"
        delay={3.2}
      />
    </SlideFrame>
  );
}

function Cell({ system, index }: { system: System; index: number }) {
  const delay = 0.5 + index * 0.1;
  const widthPct = (system.stages / 7) * 100;
  return (
    <motion.div
      initial={{ opacity: 0, y: 18, filter: 'blur(8px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.7, delay, ease: EASE.expoOut }}
      className="relative flex flex-col justify-between p-5"
      style={{
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        minHeight: 0,
      }}
      aria-label={`Comparator system ${index + 1}: ${system.name}, covers ${system.stages} of 7 MIDD stages`}
    >
      {/* Top row: Name + sponsor */}
      <div className="flex flex-col gap-1.5">
        <h4
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
            color: 'var(--cream)',
            fontWeight: 600,
            letterSpacing: '-0.01em',
            lineHeight: 1.05,
          }}
        >
          {system.name}
        </h4>
        <span
          className="deck-mono"
          style={{
            fontSize: '0.62rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          {system.sponsor}
        </span>
      </div>

      {/* Scope */}
      <p
        className="deck-body"
        style={{
          margin: '12px 0 12px',
          fontSize: '0.85rem',
          lineHeight: 1.45,
          color: 'var(--cream-muted)',
        }}
      >
        {system.scope}
      </p>

      {/* Stage bar */}
      <div className="flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            MIDD stages
          </span>
          <span
            className="deck-mono"
            style={{
              fontSize: '0.7rem',
              color: 'var(--case)',
              fontWeight: 600,
            }}
          >
            {system.stages}/7
          </span>
        </div>
        {/* Animated bar */}
        <div
          style={{
            position: 'relative',
            height: '4px',
            width: '100%',
            background: 'color-mix(in srgb, var(--cream) 6%, transparent)',
            borderRadius: '2px',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${widthPct}%` }}
            transition={{ duration: 1.0, delay: delay + 0.4, ease: EASE.expoOut }}
            style={{
              height: '100%',
              background: 'var(--case)',
              borderRadius: '2px',
              boxShadow: '0 0 12px color-mix(in srgb, var(--case) 50%, transparent)',
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
