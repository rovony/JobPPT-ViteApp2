// @ts-nocheck
import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

/**
 * TitleCard — opening slide pattern: eyebrow + massive title + subtitle + meta.
 */
export default function TitleCard({ eyebrow, title, subtitle, meta, theme }) {
  return (
    <Slide align="start">
      <div className="max-w-4xl">
        {eyebrow && (
          <Reveal>
            <div className="deck-mono text-xs tracking-[0.22em] uppercase text-deck-accent mb-6">
              {eyebrow}
            </div>
          </Reveal>
        )}
        <Reveal>
          <h1 className="deck-display text-5xl md:text-7xl lg:text-8xl leading-[0.95] text-deck-ink">
            {title}
          </h1>
        </Reveal>
        {subtitle && (
          <Reveal>
            <p className="mt-8 text-lg md:text-xl deck-ink-muted max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          </Reveal>
        )}
        {meta && (
          <Reveal>
            <div className="mt-12 pt-6 border-t deck-rule deck-mono text-xs uppercase tracking-widest deck-ink-subtle">
              {meta}
            </div>
          </Reveal>
        )}
      </div>
    </Slide>
  );
}
