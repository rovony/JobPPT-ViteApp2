// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../components/ComponentCard';
import PhaseChip from '../components/PhaseChip';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * Slide 15 — Component 3 / 5 · Audit Chain.
 *
 * Elevation pass (Apr 2026): adopts the cs3-06 cinematic pattern.
 *   - useStory() drives a 5-act story off one rAF clock
 *   - VERIFY sweep cursor lights each block as it crosses
 *   - Tamper demo escalates: hash-mismatch → coral block → ROLLBACK
 *     wedge → restored verified state (the recovery is the point)
 *   - verify() code panel under the chain shows the actual JS the
 *     audience would call to reproduce the integrity check
 *   - When the chain settles to verified, a BorderBeam sweeps the
 *     wrapper to convey "this is the proof, not just a diagram"
 *   - Live "blocks added today" ticker derived from elapsed clock
 *
 * Case color: cyan (links to P3 cryptographic audit).
 */

const BLOCKS = [
  { ts: '14:02:18Z', action: 'NCA-RUN',     prev: '0x4f8a',  this: '0x9c1d' },
  { ts: '14:02:21Z', action: 'SOP-COMMIT',  prev: '0x9c1d',  this: '0x71ba' },
  { ts: '14:02:24Z', action: 'EXPERT-CALL', prev: '0x71ba',  this: '0x3e0a' },
  { ts: '14:02:30Z', action: 'REVIEW-OK',   prev: '0x3e0a',  this: '0xa44f' },
  { ts: '14:02:36Z', action: 'EXPORT',      prev: '0xa44f',  this: '0x5d2c' },
];

const BLOCK_W = 184;
const BLOCK_H = 132;
const ROW_Y = 92;
const SIDE_PAD = 38;
const GAP = (1100 - 2 * SIDE_PAD - BLOCKS.length * BLOCK_W) / (BLOCKS.length - 1);
const BLOCK_X = (i: number) => SIDE_PAD + i * (BLOCK_W + GAP);
const ROW_MID_Y = ROW_Y + BLOCK_H / 2;
const SWEEP_X_START = SIDE_PAD - 12;
const SWEEP_X_END = 1100 - SIDE_PAD + 12;

const SEQ = {
  start:    0.00,
  blocks:   0.10,   // blocks cascade in
  arrows:   1.20,   // hash-link arrows draw
  sweep:    2.00,   // VERIFY cursor begins moving L → R
  verified: 3.50,   // sweep completes, all checks lit
  tamper:   4.20,   // tamper demo on block 3
  rollback: 5.20,   // ROLLBACK wedge restores
  restored: 6.00,   // chain returns to verified state
  beam:     6.20,   // BorderBeam sweeps the chain wrapper
  final:    7.40,
};

const PHASE_LABEL: Record<keyof typeof SEQ, string> = {
  start:    'priming',
  blocks:   'binding entries',
  arrows:   'linking hashes',
  sweep:    'verifying',
  verified: 'chain ok',
  tamper:   'tamper detected',
  rollback: 'rolling back',
  restored: 'restored',
  beam:     'replay verified',
  final:    'idle',
};

export default function AuditChainComponent() {
  const story = useStory(SEQ, { loop: 8.5 });

  // Derived values
  const sweepProgress = story.progress('sweep', 'verified'); // 0..1
  const sweepX = SWEEP_X_START + sweepProgress * (SWEEP_X_END - SWEEP_X_START);
  const sweepActive = story.isAfter('sweep') && !story.isAfter('verified');

  // Per-block verified status: lit once the sweep crosses its right edge.
  const blockVerified = (i: number) => {
    if (story.reduced) return true;
    if (story.isAfter('verified')) {
      // During tamper, block 3 reverts to "not verified" until rollback completes.
      if (i === 2 && story.isAfter('tamper') && !story.isAfter('restored')) return false;
      return true;
    }
    return sweepX > BLOCK_X(i) + BLOCK_W;
  };

  // Tampered block 3 visible state
  const tamperVisible = story.isAfter('tamper') && !story.isAfter('rollback');
  const rollbackVisible = story.isAfter('rollback') && !story.isAfter('restored');
  // Chain "verified" border-beam visible after the recovery beat
  const beamVisible = story.isAfter('beam');

  // Live block counter — fictional but derived from clock so it ticks visibly
  const blocksToday = 5 + Math.floor(story.time * 1.2);

  return (
    <ComponentCard
      dataCase="cyan"
      componentNumber={3}
      domainEyebrow="INTEGRITY"
      headline={
        <>
          Audit{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>Chain.</span>
        </>
      }
      subhead="Every decision binds into one hash chain. Tampering is observable."
      takeHomeText="One chain. Two function calls to verify. Tamper-detected, then rolled back."
      activeId="audit"
      withoutText="Audit chains exist per-tool, per-domain, per-database. End-to-end provenance requires manual reconstruction."
      withText="One chain across all six domains. End-to-end provenance verifiable in two function calls."
      footerSource="Hash-chain pattern · 21 CFR Part 11 §11.10(c) · ICH M15 reproducibility"
    >
      <div className="relative w-full h-full flex flex-col" style={{ minHeight: 0 }}>
        <PhaseChip label={story.phase ? PHASE_LABEL[story.phase] : null} />

        {/* === Wrapper around the chain to host the BorderBeam halo === */}
        <div
          className="relative"
          style={{
            margin: '36px 24px 0',
            borderRadius: 12,
            border: '1px solid color-mix(in srgb, var(--case) 24%, transparent)',
            background: 'color-mix(in srgb, var(--panel) 12%, transparent)',
            overflow: 'hidden',
            paddingBottom: 8,
          }}
        >
          {beamVisible && (
            <BorderBeam
              size={260}
              duration={6}
              colorFrom="var(--case)"
              colorTo="color-mix(in srgb, var(--case) 30%, transparent)"
              borderWidth={2}
            />
          )}

          <svg
            viewBox="0 0 1100 320"
            preserveAspectRatio="xMidYMid meet"
            className="block w-full"
            style={{ height: 280 }}
            role="img"
            aria-label="Five-block hash chain. Verify sweep confirms integrity. Tamper demo on block 3, then rollback restores the chain."
          >
            <defs>
              <marker id="audit-arrow" markerWidth="10" markerHeight="10"
                      refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--case)" opacity="0.7" />
              </marker>
              <marker id="audit-arrow-coral" markerWidth="10" markerHeight="10"
                      refX="9" refY="5" orient="auto" markerUnits="userSpaceOnUse">
                <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--coral)" opacity="0.95" />
              </marker>
              <linearGradient id="hash-link" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%"  stopColor="var(--case)" stopOpacity="0.85" />
                <stop offset="100%" stopColor="var(--case)" stopOpacity="0.55" />
              </linearGradient>
            </defs>

            {/* === connector arrows between blocks === */}
            {BLOCKS.slice(0, -1).map((_, i) => {
              const x1 = BLOCK_X(i) + BLOCK_W;
              const x2 = BLOCK_X(i + 1) - 4;
              const isTamperLink = i === 1; // arrow between block 2 and 3
              const linkBroken = isTamperLink && tamperVisible;
              return (
                <motion.g key={`conn-${i}`}>
                  <motion.line
                    x1={x1} y1={ROW_MID_Y - ROW_Y + 24} // shift y in this svg coord space
                    x2={x2} y2={ROW_MID_Y - ROW_Y + 24}
                    stroke={linkBroken ? 'var(--coral)' : 'url(#hash-link)'}
                    strokeOpacity={linkBroken ? 1 : 0.85}
                    strokeWidth={linkBroken ? 2 : 1.6}
                    markerEnd={linkBroken ? 'url(#audit-arrow-coral)' : 'url(#audit-arrow)'}
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: story.isAfter('arrows') ? 1 : 0 }}
                    transition={{
                      duration: 0.4,
                      delay: i * 0.12,
                      ease: EASE.expoOut,
                    }}
                  />
                  <motion.text
                    x={(x1 + x2) / 2}
                    y={ROW_MID_Y - ROW_Y + 14}
                    textAnchor="middle"
                    className="deck-mono"
                    style={{
                      fontSize: 9,
                      fill: linkBroken ? 'var(--coral)' : 'var(--cream-faint)',
                      letterSpacing: '0.04em',
                      fontWeight: linkBroken ? 600 : 400,
                    }}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: story.isAfter('arrows') ? 1 : 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + i * 0.12 }}
                  >
                    {linkBroken ? '✗ MISMATCH' : BLOCKS[i + 1].prev}
                  </motion.text>
                </motion.g>
              );
            })}

            {/* === blocks === */}
            {BLOCKS.map((b, i) => {
              const x = BLOCK_X(i);
              const isTamperBlock = i === 2;
              const verified = blockVerified(i);
              const broken = isTamperBlock && tamperVisible;
              const rolling = isTamperBlock && rollbackVisible;

              return (
                <motion.g
                  key={`block-${i}`}
                  initial={{ opacity: 0, y: -8 }}
                  animate={{
                    opacity: story.isAfter('blocks') ? 1 : 0,
                    y: story.isAfter('blocks') ? 0 : -8,
                  }}
                  transition={{
                    duration: 0.5, delay: i * 0.16, ease: EASE.expoOut,
                  }}
                >
                  <rect
                    x={x} y={24}
                    width={BLOCK_W} height={BLOCK_H} rx={8}
                    fill={broken
                      ? 'color-mix(in srgb, var(--coral) 12%, transparent)'
                      : 'color-mix(in srgb, var(--panel) 38%, transparent)'}
                    stroke={broken ? 'var(--coral)' : 'var(--case)'}
                    strokeOpacity={broken ? 0.9 : (verified ? 0.7 : 0.5)}
                    strokeWidth={broken ? 2 : (verified ? 1.4 : 1)}
                  />
                  <text
                    x={x + 12} y={42}
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 9, fill: broken ? 'var(--coral)' : 'var(--case)',
                      letterSpacing: '0.18em', fontWeight: 600,
                    }}
                  >
                    BLOCK {String(i + 1).padStart(2, '0')}
                  </text>
                  <text
                    x={x + BLOCK_W - 12} y={42} textAnchor="end"
                    className="deck-mono"
                    style={{ fontSize: 9, fill: 'var(--cream-faint)', letterSpacing: '0.04em' }}
                  >
                    {b.ts}
                  </text>
                  <text
                    x={x + BLOCK_W / 2} y={80} textAnchor="middle"
                    className="deck-mono uppercase"
                    style={{
                      fontSize: 14, fill: 'var(--cream)',
                      letterSpacing: '0.10em', fontWeight: 600,
                    }}
                  >
                    {b.action}
                  </text>
                  <text
                    x={x + 12} y={112}
                    className="deck-mono"
                    style={{ fontSize: 10, fill: 'var(--cream-muted)', letterSpacing: '0.04em' }}
                  >
                    prev: {b.prev}
                  </text>
                  <text
                    x={x + 12} y={132}
                    className="deck-mono"
                    style={{
                      fontSize: 10,
                      fill: broken ? 'var(--coral)' : 'var(--case)',
                      letterSpacing: '0.04em',
                      fontWeight: broken ? 600 : 500,
                    }}
                  >
                    this: {broken ? '0x##TAMPERED##' : b.this}
                  </text>

                  {/* VERIFY check — appears once block is verified */}
                  {verified && (
                    <motion.g
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.32,
                        ease: EASE.settle,
                      }}
                      style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                    >
                      <circle
                        cx={x + BLOCK_W - 22} cy={24 + BLOCK_H - 22} r={11}
                        fill="color-mix(in srgb, var(--case) 28%, transparent)"
                        stroke="var(--case)"
                        strokeWidth="1.4"
                      />
                      <path
                        d={`M ${x + BLOCK_W - 27} ${24 + BLOCK_H - 22} l 4 4 l 7 -8`}
                        fill="none" stroke="var(--case)" strokeWidth="2"
                        strokeLinecap="round" strokeLinejoin="round"
                      />
                    </motion.g>
                  )}

                  {/* TAMPER label above broken block */}
                  {broken && (
                    <motion.g
                      initial={{ opacity: 0, y: -4 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <text
                        x={x + BLOCK_W / 2} y={16}
                        textAnchor="middle"
                        className="deck-mono uppercase"
                        style={{
                          fontSize: 10, fill: 'var(--coral)',
                          letterSpacing: '0.18em', fontWeight: 700,
                        }}
                      >
                        ✗ HASH MISMATCH · DETECTED
                      </text>
                    </motion.g>
                  )}

                  {/* ROLLBACK wedge that sweeps over the broken block */}
                  {rolling && (
                    <motion.g
                      initial={{ opacity: 0, x: -BLOCK_W }}
                      animate={{ opacity: [0, 1, 1, 0], x: [-BLOCK_W, 0, 0, BLOCK_W] }}
                      transition={{
                        duration: 0.8,
                        ease: 'easeInOut',
                        times: [0, 0.2, 0.8, 1],
                      }}
                    >
                      <rect
                        x={x} y={24}
                        width={BLOCK_W} height={BLOCK_H} rx={8}
                        fill="color-mix(in srgb, var(--case) 35%, transparent)"
                      />
                      <text
                        x={x + BLOCK_W / 2} y={24 + BLOCK_H / 2 + 6}
                        textAnchor="middle"
                        className="deck-mono uppercase"
                        style={{
                          fontSize: 14, fill: 'var(--cream)',
                          letterSpacing: '0.20em', fontWeight: 700,
                        }}
                      >
                        ↺ ROLLBACK
                      </text>
                    </motion.g>
                  )}
                </motion.g>
              );
            })}

            {/* === VERIFY sweep cursor === */}
            {sweepActive && (
              <g>
                <line
                  x1={sweepX} y1={14}
                  x2={sweepX} y2={24 + BLOCK_H + 8}
                  stroke="var(--case)" strokeWidth="2"
                  opacity={0.85}
                />
                <text
                  x={sweepX + 6} y={10}
                  className="deck-mono uppercase"
                  style={{ fontSize: 10, fill: 'var(--case)', letterSpacing: '0.20em', fontWeight: 700 }}
                >
                  VERIFY ▸
                </text>
              </g>
            )}
          </svg>
        </div>

        {/* === verify() code panel below the chain === */}
        <motion.div
          className="mx-6 mt-3 grid grid-cols-12 gap-4"
          initial={{ opacity: 0, y: 8 }}
          animate={{
            opacity: story.isAfter('verified') ? 1 : 0,
            y: story.isAfter('verified') ? 0 : 8,
          }}
          transition={{ duration: 0.5, ease: EASE.expoOut }}
        >
          <div
            className="col-span-7"
            style={{
              padding: '14px 16px',
              borderRadius: 6,
              background: 'color-mix(in srgb, var(--bg) 55%, transparent)',
              border: '1px solid color-mix(in srgb, var(--cream) 12%, transparent)',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.20em',
                color: 'var(--case)',
                marginBottom: 6,
                fontWeight: 600,
              }}
            >
              VERIFY · TWO FUNCTION CALLS
            </div>
            <pre
              className="deck-mono"
              style={{
                fontSize: '0.78rem',
                lineHeight: 1.55,
                color: 'var(--cream)',
                margin: 0,
                whiteSpace: 'pre',
              }}
            >
{`audit.verify(chain)   → { ok: ${tamperVisible ? 'false' : 'true'},  blocks: 5,  depth: 5 }
audit.replay(chain)   → reproduces NCA · v1.0 · sha:f8a29c41`}
            </pre>
          </div>

          {/* Live ticker stat panel */}
          <div
            className="col-span-5"
            style={{
              padding: '14px 16px',
              borderRadius: 6,
              borderLeft: '3px solid var(--case)',
              background: 'color-mix(in srgb, var(--panel) 38%, transparent)',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.20em',
                color: 'var(--case)',
                marginBottom: 4,
                fontWeight: 600,
              }}
            >
              CHAIN STATE
            </div>
            <div
              className="deck-display"
              style={{
                fontSize: '1.55rem',
                color: 'var(--cream)',
                lineHeight: 1.05,
                fontWeight: 500,
              }}
            >
              <span style={{
                color: tamperVisible ? 'var(--coral)' : 'var(--case)',
                fontStyle: 'italic',
              }}>
                {tamperVisible ? 'compromised' : 'verified'}
              </span>
              {' · '}<span style={{ fontVariantNumeric: 'tabular-nums' }}>{blocksToday}</span> blocks
            </div>
            <div
              className="deck-mono"
              style={{
                fontSize: '0.7rem',
                color: 'var(--cream-muted)',
                letterSpacing: '0.04em',
                marginTop: 4,
              }}
            >
              sha-256 · M15-aligned · 21 CFR 11
            </div>
          </div>
        </motion.div>
      </div>
    </ComponentCard>
  );
}
