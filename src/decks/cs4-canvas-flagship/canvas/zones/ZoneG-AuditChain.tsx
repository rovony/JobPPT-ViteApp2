// @ts-nocheck
/**
 * Zone G — Camera 8 · Audit chain · CINEMATIC 3
 *
 * 6 hash blocks left-to-right, connected by sage chain links.
 * Each block: action + agent + prev/this hash (illustrative, NEVER
 * real SHA-256 outputs).
 *
 * Cinematic 3 timeline (Framer Motion — no GSAP needed; the timing
 * orchestration is straightforward and Framer's `delay` chains it):
 *
 *   Phase A (0–3s):  6 blocks slide in left-to-right (350ms stagger)
 *   Phase B (3–4s):  hold; "chain integrity OK" badge pulses once
 *   Phase C (4–7s):  block 3 hash mutates → blocks 4, 5, 6 flash amber
 *                    (downstream blocks broken because chain doesn't
 *                    verify any more)
 *   Phase D (7–10s): caption "If anything in the chain has changed,
 *                    it's visible." holds, then chain resets.
 *
 * IP firewall:
 *   - hash strings are illustrative (PHash short notation)
 *   - the actual SHA-256 input concatenation order stays internal
 */

import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion, AnimatePresence } from 'framer-motion';
import { ZONE_BOUNDS, AUDIT_CHAIN } from '../../data';
import { EASE_EDITORIAL, DUR } from '../../themes';
import { useCanvasCamera } from '../CameraController';
import HashBlock from '../../primitives/HashBlock';

const Z = ZONE_BOUNDS.G;

// Extend AUDIT_CHAIN (4 entries) to the 6 named in the brief: λ-z, AUC,
// 2-cmt fit, covariate, QC, report. The first four come from
// AUDIT_CHAIN; the last two are added here with illustrative hashes.
const CHAIN_BLOCKS = [
  { idx: 1, action: 'λ-z',          agent: 'NCAAgent',     prev: '0x00000000', hash: '0x1f3a48c2' },
  { idx: 2, action: 'AUC₀₋∞',       agent: 'NCAAgent',     prev: '0x1f3a48c2', hash: '0x7c3a91f2' },
  { idx: 3, action: '2-cmt + Vmax', agent: 'PopPKAgent',   prev: '0x7c3a91f2', hash: '0xb84d2071' },
  { idx: 4, action: 'covariate',    agent: 'CovariateAgent', prev: '0xb84d2071', hash: '0xa1f9c308' },
  { idx: 5, action: 'pcVPC + QC',   agent: 'VPCAgent',     prev: '0xa1f9c308', hash: '0xd07e4b15' },
  { idx: 6, action: 'report',       agent: 'ReviewAgent',  prev: '0xd07e4b15', hash: '0xe92a55c1' },
];

const MUTATED_BLOCK_3_HASH = '0xb84d20F9'; // 1-byte flip from 0xb84d2071

type Phase = 'A' | 'B' | 'C' | 'D' | 'idle';

export default function ZoneGAuditChain() {
  const { cameraIndex } = useCanvasCamera();
  const reduce = useReducedMotion();
  const active = cameraIndex === 8;
  const [phase, setPhase] = useState<Phase>('idle');

  // Run the cinematic timeline when we arrive at C8.
  useEffect(() => {
    if (!active) {
      setPhase('idle');
      return;
    }
    const timers: number[] = [];
    setPhase('A');
    timers.push(window.setTimeout(() => setPhase('B'), 3000));
    timers.push(window.setTimeout(() => setPhase('C'), 4000));
    timers.push(window.setTimeout(() => setPhase('D'), 7000));
    // Loop: reset chain back to phase A after phase D for a 2nd run.
    timers.push(window.setTimeout(() => setPhase('B'), 11000));

    return () => {
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, [active]);

  const showMutation = phase === 'C' || phase === 'D';
  const showBrokenDownstream = phase === 'C' || phase === 'D';

  return (
    <div
      data-zone="G"
      style={{
        position: 'absolute',
        left: Z.left,
        top: Z.top,
        width: Z.width,
        height: Z.height,
        padding: '60px 60px',
      }}
    >
      {/* Eyebrow */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 1 : 0.25 }}
        transition={{ duration: DUR.standard, delay: active ? 0.1 : 0 }}
        style={{
          fontFamily: '"IBM Plex Mono", monospace',
          fontSize: 12,
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color: 'var(--case, #7BAE7F)',
          marginBottom: 8,
        }}
      >
        Audit by cryptographic chain
      </motion.div>

      <motion.h2
        initial={reduce ? false : { opacity: 0, y: 6 }}
        animate={{ opacity: active ? 1 : 0.3, y: 0 }}
        transition={{ duration: DUR.standard, delay: active ? 0.2 : 0, ease: EASE_EDITORIAL }}
        style={{
          fontFamily: '"Source Serif Pro", serif',
          fontWeight: 600,
          fontSize: 36,
          lineHeight: 1.2,
          color: 'var(--cream, #F5F0E8)',
          margin: 0,
          marginBottom: 36,
        }}
      >
        Replayable in 2034. Tamper-evident{' '}
        <span style={{ color: 'var(--case, #7BAE7F)' }}>by construction</span>.
      </motion.h2>

      {/* Chain row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 14,
          flexWrap: 'wrap',
          marginBottom: 40,
        }}
      >
        {CHAIN_BLOCKS.map((b, i) => {
          const isMutated = i === 2 && showMutation;
          const isBroken = i > 2 && showBrokenDownstream;
          const displayHash = isMutated ? MUTATED_BLOCK_3_HASH : b.hash;
          // Downstream blocks' prev shows "MISMATCH" when broken
          const displayPrev = isBroken ? '0xMISMATCH' : b.prev;

          return (
            <React.Fragment key={b.idx}>
              <HashBlock
                index={b.idx}
                action={b.action}
                agent={b.agent}
                hashShort={displayHash}
                prevShort={displayPrev}
                lit={phase === 'B' && !isMutated && !isBroken}
                mutated={isMutated}
                broken={isBroken}
                delay={active && phase === 'A' ? 0.4 + i * 0.35 : 0}
                go={active}
              />

              {/* Chain link between blocks */}
              {i < CHAIN_BLOCKS.length - 1 && (
                <motion.div
                  initial={reduce ? false : { opacity: 0, scaleX: 0 }}
                  animate={{
                    opacity: active ? 1 : 0.3,
                    scaleX: 1,
                  }}
                  transition={{ duration: 0.3, delay: active && phase === 'A' ? 0.7 + i * 0.35 : 0 }}
                  style={{
                    width: 22,
                    height: 2,
                    background: i >= 2 && showBrokenDownstream
                      ? 'var(--alert, #E8B547)'
                      : 'var(--case, #7BAE7F)',
                    transformOrigin: 'left center',
                    opacity: 0.6,
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Status badge */}
      <AnimatePresence mode="wait">
        {active && phase === 'B' && (
          <motion.div
            key="badge-ok"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              border: '1px solid color-mix(in srgb, var(--case, #7BAE7F) 50%, transparent)',
              borderRadius: 999,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--case, #7BAE7F)',
              background: 'color-mix(in srgb, var(--case, #7BAE7F) 8%, transparent)',
            }}
          >
            <motion.span
              animate={{ opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.6, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--case, #7BAE7F)' }}
            />
            chain integrity verified
          </motion.div>
        )}

        {active && (phase === 'C' || phase === 'D') && (
          <motion.div
            key="badge-tamper"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: DUR.standard, ease: EASE_EDITORIAL }}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              padding: '8px 16px',
              border: '1px solid var(--alert, #E8B547)',
              borderRadius: 999,
              fontFamily: '"IBM Plex Mono", monospace',
              fontSize: 12,
              letterSpacing: '0.16em',
              textTransform: 'uppercase',
              color: 'var(--alert, #E8B547)',
              background: 'color-mix(in srgb, var(--alert, #E8B547) 12%, transparent)',
            }}
          >
            <motion.span
              animate={{ opacity: [1, 0.4, 1] }}
              transition={{ duration: 0.8, repeat: Infinity }}
              style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--alert, #E8B547)' }}
            />
            tamper detected · 3 downstream blocks invalid
          </motion.div>
        )}
      </AnimatePresence>

      {/* Caption */}
      <motion.div
        initial={reduce ? false : { opacity: 0 }}
        animate={{ opacity: active ? 0.85 : 0.2 }}
        transition={{ duration: DUR.standard, delay: active ? 0.8 : 0 }}
        style={{
          marginTop: 32,
          fontFamily: '"Source Serif Pro", serif',
          fontStyle: 'italic',
          fontSize: 18,
          lineHeight: 1.55,
          color: 'color-mix(in srgb, var(--cream, #F5F0E8) 80%, transparent)',
          maxWidth: '64ch',
        }}
      >
        A regulator in 2034 can replay any analysis from 2026. If
        anything in the chain has changed, it&apos;s visible. The hash
        inputs themselves stay internal to the manuscript.
      </motion.div>
    </div>
  );
}
