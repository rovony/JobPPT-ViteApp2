// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * CS2 IDH-inhibitor competitor strip — one horizontal row of 4 mini-cards
 * showing the IDH-inhibitor landscape. Lives below the 2-col hero on
 * cs2-architecture and preempts the predictable panel probes:
 *   - "Are there other IDH inhibitors?"  → 4 of them, here
 *   - "Why ivosidenib not vorasidenib?"  → vorasidenib is glioma, not AML
 *   - "Why not olutasidenib?"            → ivosidenib was first to AML+CCA
 *   - "What about IDH2?"                 → enasidenib answers that
 *
 * Public sources only: FDA approval years from Drugs@FDA. No internal
 * Servier data. Brand names omitted to avoid trademark clutter.
 */

const C = {
  cyan: 'var(--cyan)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  hairline: 'var(--cream-hairline)',
};

const COMPETITORS = [
  {
    drug: 'Ivosidenib',
    target: 'IDH1',
    indication: 'AML · CCA',
    approval: 'FDA 2018',
    note: 'India 2025 — this case',
    isThisCase: true,
  },
  {
    drug: 'Enasidenib',
    target: 'IDH2',
    indication: 'AML R/R',
    approval: 'FDA 2017',
    note: 'first-in-class IDH',
    isThisCase: false,
  },
  {
    drug: 'Olutasidenib',
    target: 'IDH1',
    indication: 'AML R/R',
    approval: 'FDA 2022',
    note: '2nd IDH1 entrant',
    isThisCase: false,
  },
  {
    drug: 'Vorasidenib',
    target: 'IDH1/2',
    indication: 'Grade 2 glioma',
    approval: 'FDA Aug 2024',
    note: 'brain-penetrant',
    isThisCase: false,
  },
];

export default function CS2CompetitorStrip({ delay = 1.0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.2, 0.7, 0.3, 1] }}
      style={{
        display: 'flex', flexDirection: 'column',
        gap: 'var(--space-2)',
        minWidth: 0, minHeight: 0,
      }}
    >
      {/* Strip kicker — names what this row IS so the audience parses it fast */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.creamFaint,
      }}>
        IDH-inhibitor landscape · public approvals
      </div>

      {/* 4-card row — auto-fit reflows to fewer columns on narrow viewports.
          Floor lowered from 11rem → 9rem 2026-04-26 after Vorasidenib
          card overflowed the right edge at standard slide width. */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(9rem, 100%), 1fr))',
        gap: 'clamp(var(--space-2), 1.4vw, var(--space-3))',
        minWidth: 0,
      }}>
        {COMPETITORS.map((c) => (
          <CompetitorCard key={c.drug} c={c} />
        ))}
      </div>
    </motion.div>
  );
}

function CompetitorCard({ c }) {
  const accent = c.isThisCase ? C.cyan : C.creamFaint;
  return (
    <div style={{
      position: 'relative',
      border: c.isThisCase
        ? `1px solid color-mix(in srgb, var(--cyan) 36%, transparent)`
        : `1px solid ${C.hairline}`,
      borderLeft: `3px solid ${accent}`,
      borderRadius: 'var(--radius-md)',
      background: c.isThisCase
        ? 'color-mix(in srgb, var(--cyan) 10%, transparent)'
        : 'color-mix(in srgb, var(--panel) 60%, transparent)',
      padding: 'var(--space-2) var(--space-3)',
      display: 'flex', flexDirection: 'column',
      gap: '2px',
      minWidth: 0, minHeight: 0,
    }}>
      {/* Drug name + target on one line */}
      <div style={{
        display: 'flex', alignItems: 'baseline', justifyContent: 'space-between',
        gap: 'var(--space-2)',
      }}>
        <span className="deck-display" style={{
          fontStyle: 'italic',
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 600,
          color: c.isThisCase ? C.cyan : C.cream,
          lineHeight: 1.1,
        }}>
          {c.drug}
        </span>
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: '0.06em',
          color: accent,
          fontWeight: 600,
          flex: '0 0 auto',
        }}>
          {c.target}
        </span>
      </div>

      {/* Indication + approval year */}
      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-slide-pageno)',
        color: C.creamMuted,
        lineHeight: 1.3,
      }}>
        {c.indication} · {c.approval}
      </div>

      {/* Note — italicized differentiator phrase */}
      <div className="deck-display" style={{
        fontStyle: 'italic',
        fontSize: 'var(--fs-slide-pageno)',
        color: c.isThisCase ? C.cyan : C.creamFaint,
        lineHeight: 1.3,
        marginTop: '2px',
      }}>
        {c.note}
      </div>
    </div>
  );
}
