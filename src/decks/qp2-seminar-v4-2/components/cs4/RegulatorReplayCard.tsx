// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Lock, Clock } from 'lucide-react';

// `Replay` is not exported by lucide-react — use a sentinel that the
// renderer below detects and swaps for our local circular-arrow SVG.
const Replay = 'replay-sentinel';

/**
 * RegulatorReplayCard — small "FDA 2034 replay" callout for cs4-10.
 *
 * Anchors the "regulator-replayable in 2034" claim from the audit
 * slide. Shows three pinned attributes (tool versions, environment,
 * timestamp) inside a card with a subtle ghosted "2034" backdrop
 * numeral (mono, very faded) so the card visually carries the year.
 *
 * No glow, hairline border, JetBrains mono numerals. Editorial.
 */

const EASE = [0.2, 0.7, 0.3, 1];

const PINNED = [
  { Icon: Lock,   label: 'Tool versions', value: 'scipy@1.13.2 · numpy@1.26.4 · NONMEM@7.5.1' },
  { Icon: Replay, label: 'Replay',        value: 'Deterministic — same inputs, same outputs' },
  { Icon: Clock,  label: 'Audit lifetime', value: 'Indefinite · Part 11 + ICH M15 retention' },
];

export default function RegulatorReplayCard({ go = true, delay = 0.6 }) {
  // Replay icon doesn't exist in lucide; fallback to Repeat-style via custom svg
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay, ease: EASE }}
      style={{
        position: 'relative',
        width: '100%',
        padding: 'var(--space-3) var(--space-4)',
        background: 'color-mix(in srgb, var(--panel) 88%, transparent)',
        border: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
        borderRadius: 'var(--radius-md)',
        backdropFilter: 'blur(6px)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
      }}
    >
      {/* Ghosted 2034 numeral */}
      <span
        aria-hidden
        className="deck-mono"
        style={{
          position: 'absolute',
          right: 'clamp(8px, 1vw, 18px)',
          top: '50%',
          transform: 'translateY(-50%)',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          letterSpacing: '-0.04em',
          fontWeight: 700,
          color: 'color-mix(in srgb, var(--amber) 8%, transparent)',
          fontVariantNumeric: 'tabular-nums',
          pointerEvents: 'none',
          lineHeight: 1,
          userSelect: 'none',
        }}
      >
        2034
      </span>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.78rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--amber)',
            fontWeight: 800,
          }}
        >
          FDA Replay · 2034
        </span>
        <span
          className="deck-body italic"
          style={{
            fontSize: 'clamp(0.7rem, min(0.85vw, 1.4vh), 0.88rem)',
            color: 'var(--cream-muted)',
          }}
        >
          What an inspector pulls eight years from now
        </span>
      </div>

      {/* Pinned attributes */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
          gap: 'var(--space-2) var(--space-3)',
          position: 'relative',
        }}
      >
        {PINNED.map((p, i) => (
          <motion.div
            key={p.label}
            initial={{ opacity: 0, x: -8 }}
            animate={go ? { opacity: 1, x: 0 } : { opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: delay + 0.25 + i * 0.1, ease: EASE }}
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              minWidth: 0,
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
              {p.Icon === Replay ? (
                <ReplayIcon size={12} />
              ) : (
                <p.Icon size={12} strokeWidth={2} style={{ color: 'var(--amber)' }} />
              )}
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'clamp(0.5rem, min(0.65vw, 1.05vh), 0.65rem)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                  fontWeight: 700,
                }}
              >
                {p.label}
              </span>
            </div>
            <span
              className="deck-mono"
              style={{
                fontSize: 'clamp(0.62rem, min(0.78vw, 1.25vh), 0.78rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {p.value}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

// `Replay` doesn't exist in lucide — use a small custom circular-arrow.
function ReplayIcon({ size = 12 }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="var(--amber)"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M21 12a9 9 0 1 1-3.5-7.1" />
      <path d="M21 4v5h-5" />
    </svg>
  );
}
