// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { BorderBeam } from '@/components/magicui/border-beam';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * LiveAuditChain — reusable hash-chain visualization for slide 12b
 * (working-system audit row) and slide 19 (E2E audit dashboard).
 *
 * Adapted from the elevated 15-component-audit slide but extracted as
 * a standalone component so the same chain can render in two contexts.
 *
 * Modes:
 *   - 'static' — no animation, end-state only (for reduced-motion or
 *      when used as a small inline diagram)
 *   - 'verify' — cascade in → arrows draw → VERIFY sweep → final
 *   - 'tamper' — verify mode + tamper escalation + ROLLBACK recovery
 *
 * Layout: horizontal row of N blocks separated by gap, each ~140×100,
 * arrows connect prev_hash → this_hash. Bottom strip shows live tally.
 */

const DEFAULT_BLOCKS = [
  { ts: '14:02:18Z', action: 'NCA-RUN',     prev: '0x4f8a', this: '0x9c1d' },
  { ts: '14:02:21Z', action: 'SOP-COMMIT',  prev: '0x9c1d', this: '0x71ba' },
  { ts: '14:02:24Z', action: 'EXPERT-CALL', prev: '0x71ba', this: '0x3e0a' },
  { ts: '14:02:30Z', action: 'REVIEW-OK',   prev: '0x3e0a', this: '0xa44f' },
  { ts: '14:02:36Z', action: 'EXPORT',      prev: '0xa44f', this: '0x5d2c' },
];

type Block = (typeof DEFAULT_BLOCKS)[number];

type Props = {
  mode?: 'static' | 'verify' | 'tamper';
  blocks?: Block[];
  width?: number;
  height?: number;
  showCounter?: boolean;
  /** Multiplier on the loop period (default 7s for verify, 9s for tamper). */
  loopMs?: number;
};

const SEQ_VERIFY = {
  start:    0.0,
  blocks:   0.10,
  arrows:   1.20,
  sweep:    2.00,
  verified: 3.50,
  beam:     3.80,
  final:    7.00,
} as const;

const SEQ_TAMPER = {
  ...SEQ_VERIFY,
  tamper:   4.20,
  rollback: 5.20,
  restored: 6.00,
  beam:     6.20,
  final:    9.00,
} as const;

export default function LiveAuditChain({
  mode = 'verify',
  blocks = DEFAULT_BLOCKS,
  width = 1100,
  height = 280,
  showCounter = true,
  loopMs,
}: Props) {
  const seq = mode === 'tamper' ? SEQ_TAMPER : SEQ_VERIFY;
  const story = useStory(seq, {
    loop: mode === 'static' ? undefined : (loopMs ?? seq.final) / 1,
    go: mode !== 'static',
  });

  const SIDE_PAD = 32;
  const BLOCK_W = 140;
  const BLOCK_H = 102;
  const ROW_Y = 60;
  const GAP =
    (width - 2 * SIDE_PAD - blocks.length * BLOCK_W) / Math.max(1, blocks.length - 1);
  const X = (i: number) => SIDE_PAD + i * (BLOCK_W + GAP);

  const sweepX = story.progress('sweep', 'verified');
  const sweepCursor = SIDE_PAD - 12 + sweepX * (width - 2 * SIDE_PAD + 24);

  const TAMPER_IDX = 2;
  const tamperedBlock = mode === 'tamper' && story.isAfter('tamper') && story.isBefore('restored');

  return (
    <div style={{ position: 'relative', width: '100%', height }} aria-label="Audit chain visualization">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', display: 'block' }}
      >
        {/* Hairline rule above */}
        <line
          x1={SIDE_PAD}
          x2={width - SIDE_PAD}
          y1={ROW_Y - 18}
          y2={ROW_Y - 18}
          stroke="var(--cream-hairline)"
          opacity={0.5}
        />

        {/* Hash arrows */}
        {blocks.slice(0, -1).map((_, i) => (
          <motion.line
            key={`arrow-${i}`}
            x1={X(i) + BLOCK_W}
            x2={X(i + 1)}
            y1={ROW_Y + BLOCK_H / 2}
            y2={ROW_Y + BLOCK_H / 2}
            stroke="var(--case)"
            strokeWidth={1.6}
            strokeDasharray="4 4"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: story.isAfter('arrows') ? 1 : 0 }}
            transition={{ duration: 0.5, ease: EASE.expoOut, delay: i * 0.12 }}
          />
        ))}

        {/* Blocks */}
        {blocks.map((b, i) => {
          const isTampered = tamperedBlock && i === TAMPER_IDX;
          const restored = mode === 'tamper' && story.isAfter('restored') && i === TAMPER_IDX;
          const verified = story.isAfter('verified') && !isTampered;

          return (
            <motion.g
              key={`block-${i}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: story.isAfter('blocks') ? 1 : 0, y: 0 }}
              transition={{
                duration: 0.45,
                ease: EASE.expoOut,
                delay: 0.05 + i * 0.10,
              }}
            >
              <rect
                x={X(i)}
                y={ROW_Y}
                width={BLOCK_W}
                height={BLOCK_H}
                rx={4}
                fill={
                  isTampered
                    ? 'color-mix(in srgb, var(--case-coral) 18%, var(--panel))'
                    : verified
                    ? 'color-mix(in srgb, var(--case) 12%, var(--panel))'
                    : 'var(--panel)'
                }
                stroke={
                  isTampered
                    ? 'var(--case-coral)'
                    : verified
                    ? 'var(--case)'
                    : 'var(--cream-hairline)'
                }
                strokeWidth={isTampered || verified ? 1.6 : 1}
              />
              <text
                x={X(i) + 12}
                y={ROW_Y + 22}
                fontFamily="var(--font-mono)"
                fontSize={10}
                letterSpacing={1.2}
                fill="var(--cream-faint)"
              >
                {b.ts}
              </text>
              <text
                x={X(i) + 12}
                y={ROW_Y + 44}
                fontFamily="var(--font-mono)"
                fontSize={11}
                letterSpacing={0.8}
                fill={isTampered ? 'var(--case-coral)' : 'var(--cream)'}
                fontWeight={700}
              >
                {b.action}
              </text>
              <text
                x={X(i) + 12}
                y={ROW_Y + 70}
                fontFamily="var(--font-mono)"
                fontSize={10}
                fill="var(--cream-muted)"
              >
                prev: {b.prev}
              </text>
              <text
                x={X(i) + 12}
                y={ROW_Y + 88}
                fontFamily="var(--font-mono)"
                fontSize={10}
                fill={
                  isTampered
                    ? 'var(--case-coral)'
                    : verified
                    ? 'var(--case)'
                    : 'var(--cream-muted)'
                }
              >
                this: {restored ? b.this : isTampered ? '0xDEAD!' : b.this}
              </text>

              {verified && (
                <text
                  x={X(i) + BLOCK_W - 14}
                  y={ROW_Y + 22}
                  fontFamily="var(--font-mono)"
                  fontSize={11}
                  fontWeight={700}
                  fill="var(--case)"
                  textAnchor="end"
                >
                  ✓
                </text>
              )}
            </motion.g>
          );
        })}

        {/* VERIFY sweep cursor */}
        {story.isAfter('sweep') && story.isBefore('verified') && (
          <motion.line
            x1={sweepCursor}
            x2={sweepCursor}
            y1={ROW_Y - 6}
            y2={ROW_Y + BLOCK_H + 6}
            stroke="var(--case)"
            strokeWidth={2}
            opacity={0.6}
          />
        )}

        {/* ROLLBACK wedge */}
        {mode === 'tamper' && story.isAfter('rollback') && story.isBefore('restored') && (
          <motion.g
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4 }}
          >
            <text
              x={X(TAMPER_IDX) + BLOCK_W / 2}
              y={ROW_Y - 28}
              textAnchor="middle"
              fontFamily="var(--font-mono)"
              fontSize={11}
              letterSpacing={1.4}
              fontWeight={700}
              fill="var(--case)"
            >
              ROLLBACK
            </text>
            <polygon
              points={`${X(TAMPER_IDX) + BLOCK_W / 2 - 6},${ROW_Y - 18} ${X(TAMPER_IDX) + BLOCK_W / 2 + 6},${ROW_Y - 18} ${X(TAMPER_IDX) + BLOCK_W / 2},${ROW_Y - 8}`}
              fill="var(--case)"
            />
          </motion.g>
        )}
      </svg>

      {/* BorderBeam halo on verified */}
      {story.isAfter('beam') && !tamperedBlock && (
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 6, overflow: 'hidden' }}>
          <BorderBeam size={120} duration={5} colorFrom="var(--case)" colorTo="transparent" />
        </div>
      )}

      {/* Bottom counter */}
      {showCounter && (
        <div
          className="deck-mono uppercase"
          style={{
            position: 'absolute',
            bottom: 0,
            left: SIDE_PAD,
            right: SIDE_PAD,
            display: 'flex',
            justifyContent: 'space-between',
            fontSize: 10,
            letterSpacing: '0.18em',
            color: 'var(--cream-faint)',
            paddingTop: 8,
            borderTop: '1px solid var(--cream-hairline)',
          }}
        >
          <span>{blocks.length} blocks · SHA-256 chained</span>
          <span style={{ color: story.isAfter('verified') ? 'var(--case)' : 'var(--cream-faint)' }}>
            {story.isAfter('verified') ? 'VERIFIED' : 'pending'}
          </span>
        </div>
      )}
    </div>
  );
}
