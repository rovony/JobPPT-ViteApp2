import React from 'react';

/**
 * TimelineTrack — horizontal timeline with labeled milestones.
 * milestones: [{ t: 0..1, label, sub? }]
 */
export default function TimelineTrack({ milestones = [], className }) {
  return (
    <div className={`relative w-full py-10 ${className || ''}`}>
      <div className="absolute left-0 right-0 top-1/2 h-px bg-deck-rule" />
      <div className="relative flex justify-between">
        {milestones.map((m, i) => (
          <div key={i} className="flex flex-col items-center" style={{ width: `${100 / milestones.length}%` }}>
            <div className="deck-mono text-[10px] uppercase tracking-widest deck-ink-subtle mb-2">{m.sub}</div>
            <div className="w-3 h-3 rounded-full bg-deck-accent ring-4 ring-deck-bg" />
            <div className="mt-3 text-sm text-deck-ink text-center px-2">{m.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
}