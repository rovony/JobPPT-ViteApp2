// @ts-nocheck
import React from 'react';

/**
 * NavigationFlow — renders the top audience navigation edges.
 *
 * Two sections:
 *   1. "Backward jumps" — edges where users stepped back (signal of confusion / re-reading)
 *   2. "Large jumps" — edges that skip > 1 slide (overview-click or URL jump)
 *
 * A list is more useful than a sankey for a 20-slide deck; sankeys
 * become unreadable at this scale and overlap risk is high. The list
 * format is overlap-proof by construction (CSS grid rows).
 */
export default function NavigationFlow({ deck, edges }) {
  const indexById = new Map(deck.slides.map((s, i) => [s.id, i]));
  const titleById = new Map(deck.slides.map((s) => [s.id, s.title]));

  const classified = [];
  for (const [key, count] of edges) {
    const [from, to] = key.split('→');
    const fi = indexById.get(from);
    const ti = indexById.get(to);
    if (fi == null || ti == null) continue;
    const delta = ti - fi;
    let type = 'forward';
    if (delta < 0) type = 'backward';
    else if (delta > 1) type = 'jump';
    classified.push({ from, to, fi, ti, delta, count, type });
  }

  const backs = classified
    .filter((e) => e.type === 'backward')
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);
  const jumps = classified
    .filter((e) => e.type === 'jump')
    .sort((a, b) => b.count - a.count)
    .slice(0, 8);

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
        Navigation patterns
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2" style={{ gap: 'var(--space-5)' }}>
        <EdgeList title="Returns / re-reads" edges={backs} titleById={titleById} color="var(--coral)" empty="No backward navigation recorded." />
        <EdgeList title="Skips / deep jumps" edges={jumps} titleById={titleById} color="var(--cyan)" empty="No large jumps recorded." />
      </div>
    </div>
  );
}

function EdgeList({ title, edges, titleById, color, empty }) {
  return (
    <div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.58rem',
          letterSpacing: 'var(--ls-mono)',
          color,
          marginBottom: 'var(--space-3)',
        }}
      >
        {title}
      </div>
      {edges.length === 0 ? (
        <div style={{ color: 'var(--cream-faint)', fontSize: '0.82rem' }}>{empty}</div>
      ) : (
        <ul className="flex flex-col" style={{ gap: 'var(--space-2)' }}>
          {edges.map((e) => (
            <li
              key={`${e.from}→${e.to}`}
              className="grid items-center"
              style={{
                gridTemplateColumns: 'minmax(0, 1fr) auto',
                gap: 'var(--space-3)',
                fontSize: '0.82rem',
              }}
            >
              <span className="truncate" style={{ color: 'var(--cream)' }}>
                <span className="deck-mono tabular-nums" style={{ color: 'var(--cream-faint)' }}>
                  {String(e.fi + 1).padStart(2, '0')}
                </span>
                <span style={{ color: 'var(--cream-faint)', margin: '0 0.4em' }}>→</span>
                <span className="deck-mono tabular-nums" style={{ color: 'var(--cream-faint)' }}>
                  {String(e.ti + 1).padStart(2, '0')}
                </span>
                <span style={{ margin: '0 0.5em', color: 'var(--cream-faint)' }}>·</span>
                <span>{titleById.get(e.to)}</span>
              </span>
              <span
                className="deck-mono tabular-nums text-right shrink-0"
                style={{ color, fontSize: '0.78rem', minWidth: '3ch' }}
              >
                {e.count}×
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
