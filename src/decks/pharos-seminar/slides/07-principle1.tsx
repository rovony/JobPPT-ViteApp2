import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import { EASE } from '../motion';

/**
 * Slide 07 — Principle 1 · Centralized hierarchical orchestration.
 *
 * Patterns: A1 + B1 + D4 Schematic with Labels (4-level hierarchy diagram)
 * + right sidebar D5 fact-cells with two C7 IntegerTickers (17.2× and 4.4×)
 * + C6 path-drawing reveal layer-by-layer.
 *
 * The schematic group has layoutId="pharos-hierarchy" so slide 11 can
 * Magic-Move (C5) into it as additive layers.
 */

const L1 = ['Data', 'Non-Model', 'Modeling', 'Simulation', 'Quality', 'Regulatory', 'Reporting', 'Statistics'];
const L2 = ['NCA', 'PopPK', 'PKPD', 'E-R', 'Sim', 'QC', 'Reg', 'Report', 'Stat', 'PBPK'];
const L3 = ['Schema Extractor', 'Audit Chain', 'Cost Tracker', 'Self-Healer', 'State Writer'];

export default function Principle1Slide() {
  return (
    <SlideFrame
      dataCase="amber"
      footerKicker="07 · MOVEMENT 2 · PRINCIPLE 1"
      footerSource="Source · Kim, Gu, Park et al. · arXiv:2512.08296 · Dec 2025 · 'Towards a Science of Scaling Agent Systems'"
    >
      <PrincipleTitleBlock
        counter="PRINCIPLE 1 OF 5 · ARCHITECTURE"
        name="Centralized Hierarchy"
        definition="Independent agents amplify errors 17× as scope grows; centralized hierarchies contain that to 4×."
      />

      <div className="grid grid-cols-12 gap-6 flex-1 px-2 pb-2 min-h-0">
        {/* Left: schematic (col-span 8) */}
        <motion.div
          layoutId="pharos-hierarchy"
          className="col-span-8 relative flex flex-col justify-between gap-4 p-4"
          style={{
            background: 'color-mix(in srgb, var(--panel) 35%, transparent)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-md)',
          }}
        >
          {/* L0 — Orchestrator */}
          <Layer label="L0 · ORCHESTRATOR" delay={0.5}>
            <Box
              accent
              wide
              title="Orchestrator"
              meta="routing-only · zero tools"
              delay={0.55}
            />
          </Layer>

          {/* L1 — Managers */}
          <Layer label="L1 · MANAGERS · routing + review" delay={0.85}>
            <div className="flex gap-2 flex-wrap">
              {L1.map((m, i) => (
                <Box key={m} title={m} delay={0.95 + i * 0.05} />
              ))}
            </div>
          </Layer>

          {/* L2 — Experts */}
          <Layer label="L2 · EXPERTS · execute domain tools" delay={1.25}>
            <div className="flex gap-2 flex-wrap">
              {L2.map((e, i) => (
                <Box key={e} title={e} small delay={1.35 + i * 0.04} />
              ))}
            </div>
          </Layer>

          {/* L3 — Utilities band */}
          <Layer label="L3 · UTILITIES · shared infrastructure" delay={1.6}>
            <motion.div
              initial={{ opacity: 0, scaleY: 0.7 }}
              animate={{ opacity: 1, scaleY: 1 }}
              transition={{ duration: 0.6, delay: 1.7, ease: EASE.expoOut }}
              className="flex items-center justify-around gap-2 flex-wrap py-2 px-3"
              style={{
                background: 'color-mix(in srgb, var(--case) 10%, transparent)',
                border: '1px dashed color-mix(in srgb, var(--case) 30%, transparent)',
                borderRadius: 'var(--radius-sm)',
              }}
            >
              {L3.map((u) => (
                <span
                  key={u}
                  className="deck-mono uppercase"
                  style={{
                    fontSize: '0.65rem',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--case)',
                  }}
                >
                  {u}
                </span>
              ))}
            </motion.div>
          </Layer>

          {/* SVG layer connectors (very faint hairlines) */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{ opacity: 0.18 }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 50 18 V 32"
              stroke="var(--cream)"
              strokeWidth={0.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.0, ease: EASE.expoOut }}
            />
            <motion.path
              d="M 50 50 V 64"
              stroke="var(--cream)"
              strokeWidth={0.2}
              fill="none"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 1.4, ease: EASE.expoOut }}
            />
          </svg>
        </motion.div>

        {/* Right: fact sidebar (col-span 4) */}
        <div className="col-span-4 flex flex-col gap-3 justify-center">
          <FactCell
            big={<IntegerTickerDecimal to={17.2} delay={1.9} />}
            label="× independent error amplification"
            tone="muted"
            delay={1.85}
          />
          <FactCell
            big={<IntegerTickerDecimal to={4.4} delay={2.1} />}
            label="× centralized error amplification"
            tone="case"
            delay={2.05}
          />
          <motion.div
            initial={{ opacity: 0, x: 12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 2.3, ease: EASE.expoOut }}
            className="px-5 py-4 deck-mono"
            style={{
              fontSize: '0.7rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-muted)',
              borderLeft: '2px solid var(--case)',
              background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
              lineHeight: 1.5,
            }}
          >
            Kim et al. 2025 · arXiv:2512.08296
            <br />
            <span style={{ color: 'var(--cream-faint)' }}>
              Topology effect across 7 multi-agent benchmarks.
            </span>
          </motion.div>
        </div>
      </div>

      <WithWithoutPair
        withoutText="Independent agents amplify errors 17× as scope grows. The system fails silently as it scales."
        withText="Centralized hierarchy contains errors to 4×. Failure modes are explicit and bounded."
        delay={3.4}
      />

      <TakeHomeStrip
        text="Centralized hierarchy contains errors 4× better. Direct application of Kim et al."
        subLine="Orchestrator never executes. Managers review. Experts run bounded tools."
        caseColor="amber"
        delay={3.8}
      />
    </SlideFrame>
  );
}

function Layer({
  label,
  delay,
  children,
}: {
  label: string;
  delay: number;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: EASE.expoOut }}
      className="flex flex-col gap-2"
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.6rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        {label}
      </span>
      {children}
    </motion.div>
  );
}

function Box({
  title,
  meta,
  small,
  wide,
  accent,
  delay,
}: {
  title: string;
  meta?: string;
  small?: boolean;
  wide?: boolean;
  accent?: boolean;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.5, delay, ease: EASE.expoOut }}
      className="flex items-center justify-center px-3 py-2 text-center"
      style={{
        background: accent
          ? 'color-mix(in srgb, var(--case) 14%, transparent)'
          : 'color-mix(in srgb, var(--cream) 4%, transparent)',
        border: accent
          ? '1px solid var(--case)'
          : '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        minWidth: wide ? '60%' : small ? '60px' : '92px',
        margin: wide ? '0 auto' : 0,
        flex: wide ? 'none' : '1 0 auto',
      }}
    >
      <div className="flex flex-col items-center gap-0.5">
        <span
          className={accent ? 'deck-display' : 'deck-mono uppercase'}
          style={{
            fontSize: accent ? '1.2rem' : small ? '0.65rem' : '0.72rem',
            letterSpacing: accent ? '-0.01em' : 'var(--ls-mono-wide)',
            color: accent ? 'var(--cream)' : 'var(--cream)',
            fontWeight: accent ? 600 : 500,
            lineHeight: 1.1,
          }}
        >
          {title}
        </span>
        {meta && (
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--case)',
            }}
          >
            {meta}
          </span>
        )}
      </div>
    </motion.div>
  );
}

function FactCell({
  big,
  label,
  tone,
  delay,
}: {
  big: React.ReactNode;
  label: string;
  tone: 'muted' | 'case';
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE.expoOut }}
      className="flex items-baseline gap-3 px-5 py-4"
      style={{
        background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <span
        className="deck-display"
        style={{
          fontSize: 'clamp(2.6rem, 4vw, 4rem)',
          color: tone === 'case' ? 'var(--case)' : 'var(--cream)',
          fontWeight: 600,
          letterSpacing: '-0.03em',
          lineHeight: 1,
        }}
      >
        {big}
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.65rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          lineHeight: 1.3,
        }}
      >
        {label}
      </span>
    </motion.div>
  );
}

/** Small helper — animates an integer-portion ticker, then snaps the decimal in. */
function IntegerTickerDecimal({ to, delay }: { to: number; delay: number }) {
  const intPart = Math.floor(to);
  const decPart = Math.round((to - intPart) * 10);
  return (
    <span style={{ display: 'inline-flex', alignItems: 'baseline' }}>
      <IntegerTicker from={0} to={intPart} duration={1.0} delay={delay} />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay: delay + 1.0 }}
      >
        .{decPart}
      </motion.span>
    </span>
  );
}
