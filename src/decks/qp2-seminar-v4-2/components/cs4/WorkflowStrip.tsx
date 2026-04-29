// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import HandoffCarrierGlyph from './HandoffCarrierGlyph';

/**
 * WorkflowStrip — used by S3 (cs4-03-problem).
 *
 * A horizontal strip of six pharmacometric tools (SAS → Phoenix → NONMEM
 * → PsN → mrgsolve → Word) with durations under each box. The handoff
 * line above the strip is now a HandoffCarrierGlyph — a tiny silhouette
 * that walks left-to-right carrying a clipboard, with the dotted arc
 * trace beneath it. Each box also carries a micro-bar duration fill so
 * the visual proves "2–4 wk" feels longer than "2–4 d".
 *
 * Strip not grid: intentionally one row of equally-weighted boxes, with
 * labels, micro-bar fills, and durations beneath each box. Read as a
 * pipeline with friction at every joint.
 */

const EASE = [0.2, 0.7, 0.3, 1];

// duration fraction encodes calendar weight: 1.0 == longest stage (~2 wk).
const STAGES = [
  { name: 'SAS',       sub: 'data assembly',  time: '1–2 wk', frac: 1.00 },
  { name: 'Phoenix',   sub: 'NCA',            time: '2–4 d',  frac: 0.30 },
  { name: 'NONMEM',    sub: 'PopPK fit',      time: '2–4 wk', frac: 1.00 },
  { name: 'PsN',       sub: 'diagnostics',    time: '3–5 d',  frac: 0.40 },
  { name: 'mrgsolve',  sub: 'simulation',     time: '2–3 d',  frac: 0.25 },
  { name: 'Word',      sub: 'report + TFLs',  time: '1–2 wk', frac: 1.00 },
];

export default function WorkflowStrip({ go = true, reduced = false, delay = 0.9 }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        gap: 'clamp(var(--space-3), 2vh, var(--space-5))',
        justifyContent: 'center',
        padding: 'var(--space-4) 0',
      }}
    >
      {/* Top floating annotation — HandoffCarrierGlyph walks across the
          strip with the dotted amber arc traced underneath. */}
      <HandoffCarrierGlyph
        go={go}
        delay={delay + 0.05}
        stops={[1, 3, 5, 7, 9, 11].map((n) => n / 12)}
      />

      {/* Strip · 6 boxes joined by arrows */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          alignItems: 'stretch',
          gap: 0,
          position: 'relative',
        }}
      >
        {STAGES.map((s, i) => (
          <React.Fragment key={s.name}>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: delay + 0.3 + i * 0.08, ease: EASE }}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 'var(--space-1)',
                padding: 'clamp(var(--space-3), 1.8vh, var(--space-5)) var(--space-2)',
                background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
                border: '1px solid color-mix(in srgb, var(--cream-faint) 28%, transparent)',
                borderRadius: 'var(--radius-md)',
                position: 'relative',
                minHeight: 'clamp(60px, 8vh, 100px)',
              }}
            >
              <span
                className="deck-display"
                style={{
                  fontSize: 'clamp(0.95rem, min(1.25vw, 2vh), 1.4rem)',
                  fontWeight: 700,
                  color: 'var(--cream)',
                  lineHeight: 1.1,
                }}
              >
                {s.name}
              </span>
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'clamp(0.55rem, min(0.7vw, 1.15vh), 0.7rem)',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-faint)',
                  fontWeight: 600,
                  textAlign: 'center',
                }}
              >
                {s.sub}
              </span>
              {/* Micro-bar duration fill — visualizes calendar weight
                  per stage. Long stages (1–2 wk, 2–4 wk) fill the whole
                  bar; short ones fill a fraction. */}
              <div
                style={{
                  width: '85%',
                  height: 4,
                  marginTop: 6,
                  background: 'color-mix(in srgb, var(--cream-faint) 18%, transparent)',
                  borderRadius: 1,
                  overflow: 'hidden',
                }}
              >
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={go ? { scaleX: s.frac } : { scaleX: s.frac }}
                  transition={{ duration: 0.7, delay: delay + 0.5 + i * 0.07, ease: EASE }}
                  style={{
                    display: 'block',
                    width: '100%',
                    height: '100%',
                    background: s.frac >= 0.8 ? 'var(--amber)' : 'color-mix(in srgb, var(--amber) 55%, transparent)',
                    transformOrigin: 'left center',
                    borderRadius: 1,
                  }}
                />
              </div>
            </motion.div>

            {/* Inter-stage chevron · the "joint" */}
            {i < STAGES.length - 1 && (
              <span
                aria-hidden
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: `${((i + 1) / STAGES.length) * 100}%`,
                  transform: 'translate(-50%, -50%)',
                  width: 14,
                  height: 14,
                  background: 'var(--bg)',
                  border: '1px solid color-mix(in srgb, var(--amber) 50%, transparent)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  zIndex: 2,
                }}
              >
                <span
                  className="deck-mono"
                  style={{
                    fontSize: 8,
                    color: 'var(--amber)',
                    fontWeight: 700,
                    lineHeight: 1,
                  }}
                >
                  →
                </span>
              </span>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Duration row beneath the strip */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, minmax(0, 1fr))',
          gap: 0,
        }}
      >
        {STAGES.map((s, i) => (
          <motion.div
            key={`t-${s.name}`}
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : { opacity: 1 }}
            transition={{ duration: 0.4, delay: delay + 0.6 + i * 0.06, ease: EASE }}
            style={{
              display: 'flex',
              justifyContent: 'center',
              padding: '0 var(--space-2)',
            }}
          >
            <span
              className="deck-mono"
              style={{
                fontSize: 'clamp(0.6rem, min(0.78vw, 1.25vh), 0.8rem)',
                letterSpacing: 'var(--ls-mono)',
                color: 'var(--cream-muted)',
                fontWeight: 600,
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              {s.time}
            </span>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
