import React from 'react';
import Slide from '@/components/deck/Slide';
import Reveal from '@/components/deck/Reveal';

export default function Slide02() {
  return (
    <Slide eyebrow="Section" title="A blank canvas">
      <Reveal>
        <p className="max-w-2xl text-lg deck-ink-muted">
          Use the deck patterns (TitleCard, BulletList, QuoteCard, StatGrid, TwoColumn, ClosingCard)
          or compose freely with <code className="deck-mono text-deck-accent">&lt;Slide&gt;</code> and <code className="deck-mono text-deck-accent">&lt;Reveal&gt;</code>.
        </p>
      </Reveal>
    </Slide>
  );
}