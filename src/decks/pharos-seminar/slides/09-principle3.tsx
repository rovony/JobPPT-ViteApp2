import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import HashScroller from '../components/backgrounds/HashScroller';
import { EASE, SPRING } from '../motion';

/**
 * Slide 09 — Principle 3 · Cryptographic audit (cyan).
 *
 * D4 Schematic — 4 hash-chain blocks with curved arrows linking each
 * block's hash to the next block's prev_hash. C6 path-drawing reveal +
 * typewriter hash strings + B8-style verification widget at the bottom
 * (which appears with a cushiony spring).
 */

const ENTRIES = [
  { n: 'n-3', action: 'STATE WRITE',     details: 'sop.poppk_v2_1::step3' , hash: '0x4f3a8e…' },
  { n: 'n-2', action: 'ROUTING',         details: 'mgr.modeling → exp.poppk', hash: '0x9b2c1d…' },
  { n: 'n-1', action: 'QC VERDICT',      details: 'debate.pass · 3/3 vote',   hash: '0x71fa05…' },
  { n: 'n',   action: 'HUMAN APPROVAL',  details: 'reviewer.A · approve',     hash: '0xa28f63…' },
];

export default function Principle3Slide() {
  return (
    <SlideFrame
      dataCase="cyan"
      footerKicker="09 · MOVEMENT 2 · PRINCIPLE 3"
      footerSource="21 CFR Part 11 §11.10(c) · ICH M15 §3 · GDPR Art. 32"
    >
      <HashScroller bottomPx={56} />

      <PrincipleTitleBlock
        counter="PRINCIPLE 3 OF 5 · AUDIT"
        name="Cryptographic Audit"
        definition="Every state mutation, every routing decision, every approval — bound into one verifiable hash chain."
      />

      <div className="flex flex-col gap-6 flex-1 px-2 pb-2 min-h-0">
        {/* Hash chain row */}
        <div className="relative grid grid-cols-4 gap-3">
          {ENTRIES.map((e, i) => (
            <Block key={e.n} entry={e} index={i} />
          ))}

          {/* Connectors between blocks */}
          <svg
            aria-hidden
            className="pointer-events-none absolute inset-0 w-full h-full"
            style={{ overflow: 'visible' }}
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {[0, 1, 2].map((i) => {
              const startX = (i + 1) * 25 - 0.5;
              const endX = (i + 1) * 25 + 0.5;
              const ctrlX = (i + 1) * 25;
              return (
                <motion.path
                  key={i}
                  d={`M ${startX} 50 C ${ctrlX} 30, ${ctrlX} 30, ${endX} 50`}
                  fill="none"
                  stroke="var(--case)"
                  strokeWidth={0.3}
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 0.7 }}
                  transition={{ duration: 0.7, delay: 0.7 + i * 0.2, ease: EASE.expoOut }}
                />
              );
            })}
          </svg>
        </div>

        {/* Verification widget */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.8, ...SPRING.cushiony }}
          className="grid grid-cols-12 gap-4 mt-auto"
        >
          <div
            className="col-span-7 px-5 py-4 deck-mono"
            style={{
              background: 'color-mix(in srgb, var(--bg-elevated, var(--panel)) 100%, transparent)',
              border: '1px solid color-mix(in srgb, var(--case) 25%, transparent)',
              borderRadius: 'var(--radius-md)',
              fontSize: '0.85rem',
              color: 'var(--cream)',
            }}
          >
            <span style={{ color: 'var(--cream-faint)' }}>$ </span>
            <span style={{ color: 'var(--case)' }}>verify_chain_integrity</span>
            <span style={{ color: 'var(--cream-muted)' }}>(org_id, run_id)</span>
            <br />
            <span
              style={{
                color: 'var(--sage)',
                fontWeight: 700,
                fontSize: '1rem',
                marginTop: 4,
                display: 'inline-block',
              }}
            >
              → True
            </span>
            <span
              className="deck-mono"
              style={{ color: 'var(--cream-faint)', marginLeft: 12, fontSize: '0.72rem' }}
            >
              · 1,284 entries · 0 alterations
            </span>
          </div>
          <div
            className="col-span-5 px-5 py-4 flex flex-col gap-1"
            style={{
              background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-md)',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                fontSize: '0.65rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              IF FALSE
            </span>
            <span
              className="deck-body"
              style={{ fontSize: '0.95rem', color: 'var(--cream)', lineHeight: 1.45 }}
            >
              The verifier returns the{' '}
              <span style={{ color: 'var(--case)' }}>exact entry</span> that broke and the{' '}
              <span style={{ color: 'var(--case)' }}>timestamp</span> at which it broke.
            </span>
          </div>
        </motion.div>
      </div>

      <WithWithoutPair
        withoutText="Audit logs are append-but-unverifiable. A regulator in 2034 cannot confirm 2026 integrity."
        withText="One verification call answers True or False. Mutations reveal which entry, when."
        delay={3.0}
      />

      <TakeHomeStrip
        text="Every decision binds into one chain. Verify integrity in two function calls."
        subLine="21 CFR Part 11 §11.10(c) and ICH M15 reproducibility — foundation-level."
        caseColor="cyan"
        delay={3.4}
      />
    </SlideFrame>
  );
}

function Block({ entry, index }: { entry: typeof ENTRIES[number]; index: number }) {
  const delay = 0.5 + index * 0.2;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.6, delay, ease: EASE.expoOut }}
      className="flex flex-col gap-2 p-4"
      style={{
        background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
        border: '1px solid color-mix(in srgb, var(--case) 25%, transparent)',
        borderRadius: 'var(--radius-md)',
      }}
    >
      <div className="flex items-center justify-between">
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          ENTRY {entry.n}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.6rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--case)',
            opacity: 0.85,
          }}
        >
          {entry.action}
        </span>
      </div>
      <div
        className="deck-body"
        style={{
          fontSize: '0.85rem',
          color: 'var(--cream)',
          lineHeight: 1.4,
          minHeight: '2.6em',
        }}
      >
        {entry.details}
      </div>
      <div className="flex flex-col gap-1 mt-1">
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: '0.55rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          hash = SHA-256(prev || details)
        </span>
        <motion.span
          className="deck-mono"
          style={{
            fontSize: '0.78rem',
            color: 'var(--case)',
            background: 'color-mix(in srgb, var(--case) 8%, transparent)',
            padding: '4px 8px',
            borderRadius: 'var(--radius-sm)',
            display: 'inline-block',
            width: 'max-content',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: delay + 0.3 }}
        >
          {entry.hash}
        </motion.span>
      </div>
    </motion.div>
  );
}
