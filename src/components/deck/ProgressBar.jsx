import React from 'react';
import { useDeck } from '@/lib/deck-store';

export default function ProgressBar() {
  const { index, total } = useDeck();
  const pct = total > 0 ? ((index + 1) / total) * 100 : 0;
  return (
    <div className="fixed top-0 inset-x-0 z-40 h-[2px] bg-transparent">
      <div
        className="h-full bg-deck-accent transition-[width] duration-deck-base ease-deck-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}