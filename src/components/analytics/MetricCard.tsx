import React from 'react';

/**
 * MetricCard — single KPI tile used in the analytics overview row.
 * Tokens-only styling. Numbers use tabular-nums so the row aligns.
 */
export default function MetricCard({ label, value, sublabel, accent = 'var(--case, var(--amber))' }) {
  return (
    <div
      className="rounded-deck-lg"
      style={{
        background: 'var(--panel)',
        border: '1px solid var(--cream-hairline)',
        padding: 'var(--space-5)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.58rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: accent,
          marginBottom: 'var(--space-2)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display tabular-nums"
        style={{
          fontSize: 'clamp(1.6rem, 3vw, 2.2rem)',
          lineHeight: 1.05,
          color: 'var(--cream)',
          fontWeight: 600,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        {value}
      </div>
      {sublabel && (
        <div style={{ color: 'var(--cream-faint)', fontSize: '0.78rem', marginTop: 'var(--space-1)' }}>
          {sublabel}
        </div>
      )}
    </div>
  );
}