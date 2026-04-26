// @ts-nocheck
import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

export default function ClosingCard({ eyebrow = 'Thank you', title, subtitle, contact }) {
  return (
    <Slide align="center">
      <Reveal>
        <div className="deck-mono text-xs tracking-[0.22em] uppercase text-deck-accent mb-6">
          {eyebrow}
        </div>
      </Reveal>
      <Reveal>
        <h1 className="deck-display text-5xl md:text-7xl leading-[1.0] text-deck-ink max-w-5xl">
          {title}
        </h1>
      </Reveal>
      {subtitle && (
        <Reveal>
          <p className="mt-8 text-lg md:text-xl deck-ink-muted max-w-2xl mx-auto">{subtitle}</p>
        </Reveal>
      )}
      {contact && (
        <Reveal>
          <div className="mt-10 deck-mono text-sm deck-ink-muted">{contact}</div>
        </Reveal>
      )}
    </Slide>
  );
}
