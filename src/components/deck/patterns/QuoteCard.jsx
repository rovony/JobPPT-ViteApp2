import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

export default function QuoteCard({ quote, attribution, role }) {
  return (
    <Slide align="center">
      <Reveal>
        <blockquote className="deck-display text-3xl md:text-5xl lg:text-6xl leading-[1.1] max-w-5xl text-deck-ink">
          <span className="text-deck-accent">“</span>{quote}<span className="text-deck-accent">”</span>
        </blockquote>
      </Reveal>
      {(attribution || role) && (
        <Reveal>
          <div className="mt-10 deck-mono text-xs uppercase tracking-[0.2em] deck-ink-muted">
            {attribution}{role && <> · <span className="deck-ink-subtle">{role}</span></>}
          </div>
        </Reveal>
      )}
    </Slide>
  );
}