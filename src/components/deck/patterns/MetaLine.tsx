import React from 'react';

/**
 * MetaLine — single typographic line of key·value pairs separated by ·.
 * Replaces pill/chip rows. Example:
 *   <MetaLine items={[['Compound', 'Ambrisentan'], ['Population', 'Pediatric 8–18']]} />
 */
export default function MetaLine({ items = [], verdict }) {
  return (
    <div className="deck-mono text-xs uppercase tracking-[0.22em] deck-ink-muted flex flex-wrap items-baseline gap-x-3 gap-y-2 leading-loose">
      {items.map(([k, v], i) => (
        <React.Fragment key={i}>
          <span className="deck-ink-subtle">{k}</span>
          <span className="text-deck-ink">{v}</span>
          {(i < items.length - 1 || verdict) && <span className="deck-ink-subtle">·</span>}
        </React.Fragment>
      ))}
      {verdict && (
        <span className="text-deck-accent">{verdict}</span>
      )}
    </div>
  );
}