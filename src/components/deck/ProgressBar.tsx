import React from 'react';
import { useDeck } from '@/lib/deck-store';
import { getTalkSlideCounter } from '@/lib/slide-counter';

export default function ProgressBar() {
  const { index, total, slides } = useDeck();
  const talk = getTalkSlideCounter(slides, index);
  // Talk-path progress: fill to 100% at the last main slide. In backup,
  // hold at 100% so the bar does not jump backward after the close.
  const pct = talk.isBackup
    ? 100
    : talk.displayTotal > 0
      ? (talk.displayIndex / talk.displayTotal) * 100
      : total > 0
        ? ((index + 1) / total) * 100
        : 0;
  return (
    <div className="fixed top-0 inset-x-0 z-40 h-[2px] bg-transparent">
      <div
        className="h-full bg-deck-accent transition-[width] duration-deck-base ease-deck-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
