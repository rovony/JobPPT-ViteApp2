import React from 'react';

/**
 * TimePerSlideChart — horizontal bar chart of median time per slide.
 * One row per slide in deck order, two-line label (index + title),
 * bar width = median duration scaled to the max in the set.
 *
 * Pure CSS-grid layout (no overlap risk) and tokens only.
 */
function fmtMs(ms) {
  if (!ms) return '—';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  return `${m}m ${String(r).padStart(2, '0')}s`;
}

export default function TimePerSlideChart({ deck, perSlide }) {
  const rows = deck.slides.map((s, i) => {
    const slot = perSlide.get(s.id);
    return {
      id: s.id,
      index: i,
      title: s.title,
      views: slot?.views || 0,
      medianMs: slot?.medianMs || 0,
      avgMs: slot?.avgMs || 0,
      totalMs: slot?.totalMs || 0,
      backCount: slot?.backCount || 0,
    };
  });
  const maxMedian = Math.max(1, ...rows.map((r) => r.medianMs));

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
          fontSize: '0.62rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--case, var(--amber))',
          marginBottom: 'var(--space-4)',
        }}
      >
        Median time per slide
      </div>

      <div className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
        {rows.map((r) => {
          const pct = (r.medianMs / maxMedian) * 100;
          return (
            <div
              key={r.id}
              className="grid items-center"
              style={{
                gridTemplateColumns: '3rem minmax(0, 1fr) minmax(0, 2fr) 5rem 3.5rem',
                gap: 'var(--space-3)',
                fontSize: '0.82rem',
              }}
            >
              <span
                className="deck-mono tabular-nums"
                style={{ color: 'var(--cream-faint)', fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)' }}
              >
                {String(r.index + 1).padStart(2, '0')}
              </span>
              <span className="truncate" style={{ color: 'var(--cream)' }} title={r.title}>
                {r.title}
              </span>
              <div
                className="relative rounded-deck-sm overflow-hidden"
                style={{ background: 'var(--cream-ghost)', height: 10 }}
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-deck-sm"
                  style={{ width: `${pct}%`, background: 'var(--case, var(--amber))' }}
                />
              </div>
              <span
                className="deck-mono tabular-nums text-right"
                style={{ color: 'var(--cream)', fontSize: '0.75rem' }}
                title={`Avg ${fmtMs(r.avgMs)} · Total ${fmtMs(r.totalMs)}`}
              >
                {fmtMs(r.medianMs)}
              </span>
              <span
                className="deck-mono tabular-nums text-right"
                style={{ color: r.backCount > 0 ? 'var(--coral)' : 'var(--cream-faint)', fontSize: '0.7rem' }}
                title={`${r.views} views · ${r.backCount} returned`}
              >
                {r.views}×
              </span>
            </div>
          );
        })}
      </div>

      <div
        className="flex items-center justify-between mt-4 pt-3 deck-mono uppercase"
        style={{
          borderTop: '1px solid var(--cream-hairline)',
          fontSize: '0.58rem',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
      >
        <span>Bar: median time · Right: visit count</span>
        <span style={{ color: 'var(--coral)' }}>Orange count = had returns</span>
      </div>
    </div>
  );
}