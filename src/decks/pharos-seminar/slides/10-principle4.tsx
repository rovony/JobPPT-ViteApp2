import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import { EASE, SPRING } from '../motion';

/**
 * Slide 10 — Principle 4 · SOPs as versioned execution plans (amber).
 *
 * Patterns: A1 + B1 + D3 Choreographed Flowchart + B5 + B6.
 * 11-node horizontal flow with debate-gate (cyan diamond) and human-review
 * (amber circle) badges at specified steps. C2 cascade on nodes,
 * C6 path-drawing on connectors, badges pulse-in with cushiony spring.
 */
type StepKind = 'plain' | 'debate' | 'human';

const STEPS: { name: string; kind: StepKind }[] = [
  { name: 'Data Validation', kind: 'plain' },
  { name: 'Profile + EDA', kind: 'plain' },
  { name: 'Base Model Selection', kind: 'debate' },
  { name: 'Base Model Fit', kind: 'plain' },
  { name: 'IIV Testing', kind: 'plain' },
  { name: 'Residual Model', kind: 'debate' },
  { name: 'Covariate Screening', kind: 'plain' },
  { name: 'Forward Selection', kind: 'human' },
  { name: 'Final Model', kind: 'plain' },
  { name: 'Bootstrap', kind: 'debate' },
  { name: 'Diagnostics + Report', kind: 'human' },
];

export default function Principle4Slide() {
  return (
    <SlideFrame
      dataCase="amber"
      footerKicker="10 · MOVEMENT 2 · PRINCIPLE 4"
      footerSource="MetaGPT (Hong et al. 2023) SOP terminology · ICH M15 §3"
    >
      <PrincipleTitleBlock
        counter="PRINCIPLE 4 OF 5 · WORKFLOW + COORDINATION"
        name="Versioned Workflow + Coordination Discipline"
        definition="Workflows are hash-anchored execution plans; coordination cost is bounded by deliberate constraints."
      />

      <div className="grid grid-cols-12 gap-6 flex-1 pb-2 min-h-0">
        {/* Flowchart (col-span 9) */}
        <div className="col-span-9 flex flex-col gap-4 justify-between">
          <div className="flex items-center justify-between">
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              EXAMPLE · STANDARD POPPK SOP · v2.1
            </span>
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.7rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
              }}
            >
              <IntegerTicker from={0} to={11} duration={0.9} delay={0.5} /> STEPS
            </span>
          </div>

          {/* Nodes */}
          <div className="relative flex-1 flex items-center">
            <div className="grid grid-cols-11 gap-0 w-full items-center">
              {STEPS.map((s, i) => (
                <Node key={s.name} step={s} index={i} total={STEPS.length} />
              ))}
            </div>

            {/* Hairline arrows between nodes via SVG */}
            <svg
              aria-hidden
              className="pointer-events-none absolute inset-0 w-full h-full"
              style={{ overflow: 'visible' }}
            >
              {STEPS.slice(0, -1).map((_, i) => {
                const cellPct = 100 / STEPS.length;
                const x1 = `${(i + 1) * cellPct}%`;
                const x2 = `${(i + 1) * cellPct + 0.6}%`;
                return (
                  <motion.line
                    key={i}
                    x1={x1}
                    x2={x2}
                    y1="50%"
                    y2="50%"
                    stroke="var(--cream-hairline)"
                    strokeWidth={1}
                    initial={{ pathLength: 0, opacity: 0 }}
                    animate={{ pathLength: 1, opacity: 1 }}
                    transition={{
                      duration: 0.4,
                      delay: 0.7 + i * 0.1,
                      ease: EASE.expoOut,
                    }}
                  />
                );
              })}
            </svg>
          </div>

          {/* Legend */}
          <div className="flex items-center gap-6 mt-2">
            <Legend
              icon={<DebateGateIcon />}
              label="Debate gate · QC consensus"
              tone="cyan"
            />
            <Legend
              icon={<HumanReviewIcon />}
              label="Human review · approval point"
              tone="amber"
            />
            <Legend icon={<span style={{ color: 'var(--cream-faint)' }}>—</span>} label="Hairline arrow · ordered transition" tone="muted" />
          </div>
        </div>

        {/* Sidebar facts (col-span 3) */}
        <div className="col-span-3 flex flex-col gap-3 justify-center">
          <FactBox
            big={
              <>
                <IntegerTicker from={0} to={8} duration={1.0} delay={2.0} />
                <span style={{ color: 'var(--cream-faint)' }}> · </span>
                <IntegerTicker from={0} to={60} duration={1.0} delay={2.1} />
              </>
            }
            label="BUILT-IN SOPs · 60 TOTAL STEPS"
            delay={1.95}
          />
          <FactBox
            big={
              <>
                <IntegerTicker from={0} to={11} duration={1.0} delay={2.15} />
                <span style={{ color: 'var(--cream-faint)' }}> · </span>
                <IntegerTicker from={0} to={16} duration={1.0} delay={2.25} />
              </>
            }
            label="DEBATE GATES · HUMAN-REVIEW POINTS"
            delay={2.1}
          />
          <FactBox
            big={<span style={{ fontSize: '1.4rem' }}>marketplace</span>}
            label="EXTENSIBLE · COMMUNITY-CONTRIBUTED"
            delay={2.25}
          />
        </div>
      </div>

      <WithWithoutPair
        withoutText="Workflows are improvisational. Coordination cost grows quadratically. QC depends on agent goodwill."
        withText="Workflows are git commits. Coordination cost bounded by design. Quality independently challenged at every step."
        delay={3.0}
      />

      <TakeHomeStrip
        text="SOPs are versioned execution plans. Git commits for analytical decisions."
        subLine="Marketplace-extensible. Hash-anchored. Reproducible by design."
        caseColor="amber"
        delay={3.4}
      />
    </SlideFrame>
  );
}

function Node({
  step,
  index,
  total,
}: {
  step: { name: string; kind: StepKind };
  index: number;
  total: number;
}) {
  const delay = 0.65 + index * 0.1;
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.55, delay, ease: EASE.expoOut }}
      className="relative flex flex-col items-center justify-center gap-3 px-1"
    >
      {/* Step badge */}
      <motion.div
        initial={step.kind !== 'plain' ? { scale: 0, opacity: 0 } : undefined}
        animate={step.kind !== 'plain' ? { scale: 1, opacity: 1 } : undefined}
        transition={
          step.kind !== 'plain'
            ? { delay: delay + 0.2, ...SPRING.cushiony }
            : undefined
        }
      >
        {step.kind === 'debate' ? (
          <DebateGateIcon size={28} />
        ) : step.kind === 'human' ? (
          <HumanReviewIcon size={28} />
        ) : (
          <PlainStepIcon size={28} index={index + 1} />
        )}
      </motion.div>
      {/* Label */}
      <span
        className="deck-mono uppercase text-center"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream)',
          lineHeight: 1.25,
          minHeight: '2.6em',
          maxWidth: '12ch',
        }}
      >
        {step.name}
      </span>
    </motion.div>
  );
}

function PlainStepIcon({ size, index }: { size: number; index: number }) {
  return (
    <div
      className="rounded-full flex items-center justify-center deck-mono"
      style={{
        width: size,
        height: size,
        background: 'color-mix(in srgb, var(--cream) 4%, transparent)',
        border: '1px solid var(--cream-hairline)',
        fontSize: '0.6rem',
        color: 'var(--cream-muted)',
        fontWeight: 600,
      }}
    >
      {index}
    </div>
  );
}

function DebateGateIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <motion.rect
        x={4}
        y={4}
        width={20}
        height={20}
        transform="rotate(45 14 14)"
        fill="color-mix(in srgb, var(--cyan) 18%, transparent)"
        stroke="var(--cyan)"
        strokeWidth={1.4}
      />
    </svg>
  );
}

function HumanReviewIcon({ size = 28 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 28 28">
      <circle
        cx={14}
        cy={14}
        r={10}
        fill="color-mix(in srgb, var(--amber, var(--case)) 18%, transparent)"
        stroke="var(--amber, var(--case))"
        strokeWidth={1.4}
      />
    </svg>
  );
}

function Legend({
  icon,
  label,
  tone,
}: {
  icon: React.ReactNode;
  label: string;
  tone: 'amber' | 'cyan' | 'muted';
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -8 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 1.7, ease: EASE.expoOut }}
      className="flex items-center gap-2"
    >
      {icon}
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

function FactBox({
  big,
  label,
  delay,
}: {
  big: React.ReactNode;
  label: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE.expoOut }}
      className="px-5 py-4 flex flex-col gap-1.5"
      style={{
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        borderLeft: '2px solid var(--case)',
      }}
    >
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(1.6rem, 2.4vw, 2.4rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          letterSpacing: '-0.02em',
          lineHeight: 1,
        }}
      >
        {big}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          lineHeight: 1.35,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}
