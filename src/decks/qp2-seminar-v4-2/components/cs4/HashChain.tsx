// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

/**
 * HashChain — used by S10 (cs4-10-audit).
 *
 * Top half: horizontal ribbon of 8 audit entries connected by chain-link
 * arrows. Each box renders [mono timestamp · agent + tool · truncated
 * hash like "a3f2…7b1c"].
 *
 * Mid-ribbon callout (mono, italic):
 *   entry_hash = sha256(prev_hash || timestamp || agent || tool || io_hash)
 *
 * Cinematic moment 4:
 *   1. Audit ribbon stagger-reveals left→right (200ms each).
 *   2. ~1s pause.
 *   3. ONE entry's content silently changes (mid-ribbon, index 4).
 *      Its hash recomputes (mono characters scramble + resettle).
 *   4. All downstream hashes flash red and chain-link arrows visibly
 *      break. Tamper-evidence lands without narration.
 *
 * The bottom 3 numbered claims live in the slide file, not here.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const ENTRIES = [
  { ts: '14:02:11.012', agent: 'NCA',         tool: 'detect_pk_columns',     hash: 'a3f2…7b1c' },
  { ts: '14:02:11.045', agent: 'NCA',         tool: 'compute_lambda_z',      hash: '9d4e…2a08' },
  { ts: '14:02:11.099', agent: 'NCA',         tool: 'compute_auc_lin_log',   hash: 'c1ab…f04d' },
  { ts: '14:02:11.158', agent: 'NCA',         tool: 'compute_cmax_tmax',     hash: 'e7c0…51bf' },
  { ts: '14:02:11.221', agent: 'NCA',         tool: 'dose_proportionality',  hash: '0fa9…8e23' },
  { ts: '14:02:11.290', agent: 'NCA',         tool: 'assemble_summary',      hash: 'b842…1d77' },
  { ts: '14:02:11.351', agent: 'NCA',         tool: 'spaghetti_plot',        hash: '4e1d…ac90' },
  { ts: '14:02:11.418', agent: 'QC',          tool: 'verdict_pass',          hash: '7c33…22f6' },
];

const HEX = 'abcdef0123456789';

function scrambleHash(orig) {
  // Replace mid-section chars with random hex chars while preserving
  // length — used during the recompute scramble step.
  const split = orig.split('…');
  const left = split[0]
    .split('')
    .map(() => HEX[Math.floor(Math.random() * HEX.length)])
    .join('');
  const right = split[1]
    .split('')
    .map(() => HEX[Math.floor(Math.random() * HEX.length)])
    .join('');
  return `${left}…${right}`;
}

const TAMPERED_INDEX = 4; // zero-based; the silent-change entry

export default function HashChain({ go = true, delay = 0.6 }) {
  const [phase, setPhase] = useState('reveal'); // 'reveal' → 'tamper' → 'broken'
  const [hashes, setHashes] = useState(ENTRIES.map((e) => e.hash));

  useEffect(() => {
    if (!go) return;
    // Trigger tamper choreography ~ (8 * 0.2s reveal + 1s pause) after delay.
    const tamperDelayMs = (delay + 0.6 + ENTRIES.length * 0.2 + 1.0) * 1000;
    const t1 = setTimeout(() => setPhase('tamper'), tamperDelayMs);
    return () => clearTimeout(t1);
  }, [go, delay]);

  useEffect(() => {
    if (phase !== 'tamper') return;
    let frame = 0;
    const total = 24;
    // Scramble all downstream hashes (TAMPERED_INDEX onward) for a few frames
    // then settle on a deterministic "new" set so the chain reads as broken.
    const interval = setInterval(() => {
      frame += 1;
      if (frame >= total) {
        clearInterval(interval);
        // Final settled hashes: keep entries [0..TAMPERED_INDEX-1] intact;
        // entries [TAMPERED_INDEX..end] all get a "new" hash that visibly
        // differs from the original (signaling chain break).
        const settled = ENTRIES.map((e, i) =>
          i < TAMPERED_INDEX ? e.hash : `${e.hash[0]}${e.hash[1]}!!…!!${e.hash[e.hash.length - 2]}${e.hash[e.hash.length - 1]}`
        );
        setHashes(settled);
        setPhase('broken');
        return;
      }
      setHashes(
        ENTRIES.map((e, i) => (i < TAMPERED_INDEX ? e.hash : scrambleHash(e.hash)))
      );
    }, 40);
    return () => clearInterval(interval);
  }, [phase]);

  return (
    <div
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-3), 1.6vh, var(--space-5))',
        minHeight: 0,
      }}
    >
      {/* Ribbon */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(8, minmax(0, 1fr))',
          gap: 0,
          position: 'relative',
          minHeight: 0,
        }}
      >
        {ENTRIES.map((e, i) => {
          const isTampered = phase !== 'reveal' && i === TAMPERED_INDEX;
          const isDownstream = phase === 'broken' && i > TAMPERED_INDEX;
          const broken = phase === 'broken' && i >= TAMPERED_INDEX;
          return (
            <React.Fragment key={`${e.ts}-${i}`}>
              <motion.div
                initial={{ opacity: 0, y: 14 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: delay + 0.4 + i * 0.2, ease: EASE }}
                style={{
                  position: 'relative',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: 'var(--space-2) var(--space-2)',
                  background:
                    broken
                      ? 'color-mix(in srgb, var(--coral) 12%, transparent)'
                      : 'color-mix(in srgb, var(--panel) 75%, transparent)',
                  border: broken
                    ? '1px solid color-mix(in srgb, var(--coral) 70%, transparent)'
                    : '1px solid color-mix(in srgb, var(--amber) 35%, transparent)',
                  borderRadius: 'var(--radius-sm)',
                  zIndex: 1,
                  transition: 'background 0.4s, border 0.4s',
                }}
              >
                <span
                  className="deck-mono"
                  style={{
                    fontSize: 'clamp(0.7rem, min(0.85vw, 1.35vh), 0.86rem)',
                    color: 'var(--cream-faint)',
                    letterSpacing: 'var(--ls-mono)',
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {e.ts}
                </span>
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'clamp(0.66rem, min(0.78vw, 1.25vh), 0.78rem)',
                    color: broken ? 'var(--coral)' : 'var(--cream)',
                    letterSpacing: '0.04em',
                    fontWeight: 700,
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere',
                    lineHeight: 1.2,
                  }}
                >
                  {e.agent} · {e.tool}
                </span>
                <span
                  className="deck-mono"
                  style={{
                    fontSize: 'clamp(0.78rem, min(0.92vw, 1.5vh), 0.96rem)',
                    color: broken ? 'var(--coral)' : 'var(--amber)',
                    letterSpacing: 'var(--ls-mono)',
                    fontWeight: 700,
                    fontVariantNumeric: 'tabular-nums',
                  }}
                >
                  {hashes[i]}
                </span>
                {isTampered && phase !== 'reveal' && (
                  <span
                    className="deck-mono uppercase"
                    style={{
                      position: 'absolute',
                      top: -16,
                      left: 0,
                      right: 0,
                      textAlign: 'center',
                      fontSize: 11,
                      color: 'var(--coral)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      fontWeight: 800,
                    }}
                  >
                    tampered
                  </span>
                )}
              </motion.div>

              {/* Chain-link between cells */}
              {i < ENTRIES.length - 1 && (
                <ChainLink
                  index={i}
                  go={go}
                  delay={delay + 0.55 + i * 0.2}
                  broken={phase === 'broken' && i >= TAMPERED_INDEX}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* sha256 callout */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.5, delay: delay + 1.4, ease: EASE }}
        style={{
          padding:
            'clamp(var(--space-2), 1.2vh, var(--space-3)) clamp(var(--space-3), 1.6vw, var(--space-5))',
          border: '1px dashed color-mix(in srgb, var(--amber) 55%, transparent)',
          borderRadius: 'var(--radius-sm)',
          background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        }}
      >
        <span
          className="deck-mono italic"
          style={{
            fontSize: 'clamp(0.78rem, min(1vw, 1.6vh), 1.05rem)',
            color: 'var(--cream)',
            letterSpacing: 'var(--ls-mono)',
            lineHeight: 1.4,
            wordBreak: 'break-word',
          }}
        >
          entry_hash = sha256(prev_hash || timestamp || agent || tool || io_hash)
        </span>
      </motion.div>
    </div>
  );
}

/* Chain-link — two short segments with a small circle at the join.
   Goes red and breaks (segments slide apart) when broken=true. */
function ChainLink({ index, go, delay, broken }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        top: '50%',
        left: `${((index + 1) / 8) * 100}%`,
        transform: 'translate(-50%, -50%)',
        width: 18,
        height: 18,
        zIndex: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <motion.svg
        viewBox="0 0 18 18"
        width={18}
        height={18}
        initial={{ opacity: 0 }}
        animate={go ? { opacity: 1 } : { opacity: 1 }}
        transition={{ duration: 0.4, delay, ease: EASE }}
      >
        <motion.line
          x1={2}
          y1={9}
          y2={9}
          stroke={broken ? 'var(--coral)' : 'var(--amber)'}
          strokeWidth={1.5}
          initial={{ x2: 9 }}
          animate={{ x2: broken ? 6 : 9 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        <motion.line
          y1={9}
          x2={16}
          y2={9}
          stroke={broken ? 'var(--coral)' : 'var(--amber)'}
          strokeWidth={1.5}
          initial={{ x1: 9 }}
          animate={{ x1: broken ? 12 : 9 }}
          transition={{ duration: 0.35, ease: EASE }}
        />
        <circle
          cx={9}
          cy={9}
          r={2}
          fill="var(--bg)"
          stroke={broken ? 'var(--coral)' : 'var(--amber)'}
          strokeWidth={1.4}
        />
      </motion.svg>
    </div>
  );
}
