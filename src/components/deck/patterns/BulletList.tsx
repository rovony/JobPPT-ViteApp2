// @ts-nocheck
import React from 'react';
import Slide from '../Slide';
import Reveal from '../Reveal';

/**
 * BulletList — narrative bullet reveal pattern. Each bullet has an optional
 * `at` step index. If `step` prop is passed, bullets animate step-driven.
 */
export default function BulletList({ title, eyebrow, bullets = [], step }) {
  return (
    <Slide title={title} eyebrow={eyebrow}>
      <ul className="space-y-6 max-w-3xl">
        {bullets.map((b, i) => (
          <Reveal key={i} at={typeof b === 'object' ? b.at : i + 1} step={step}>
            <li className="flex gap-4">
              <span className="deck-mono text-xs deck-ink-subtle pt-2 w-8 shrink-0">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div>
                <div className="text-xl md:text-2xl text-deck-ink leading-snug">
                  {typeof b === 'string' ? b : b.text}
                </div>
                {typeof b === 'object' && b.note && (
                  <div className="mt-1 text-sm deck-ink-muted">{b.note}</div>
                )}
              </div>
            </li>
          </Reveal>
        ))}
      </ul>
    </Slide>
  );
}
