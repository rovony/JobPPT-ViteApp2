import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

/**
 * StatGrid — a grid of large numeric stats, each revealed in sequence.
 * stats: [{ value, label, note? }]
 */
export default function StatGrid({ title, eyebrow, stats = [] }) {
  return (
    <Slide title={title} eyebrow={eyebrow}>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {stats.map((s, i) => (
          <Reveal key={i}>
            <div className="rounded-lg border deck-rule bg-deck-surface p-8">
              <div className="deck-display text-5xl md:text-6xl text-deck-accent leading-none">
                {s.value}
              </div>
              <div className="mt-4 text-base text-deck-ink">{s.label}</div>
              {s.note && <div className="mt-2 text-sm deck-ink-muted">{s.note}</div>}
            </div>
          </Reveal>
        ))}
      </div>
    </Slide>
  );
}