import React from 'react';
import TitleLayout from '@/components/deck/layouts/TitleLayout';

/**
 * Placeholder slide for the v3-R2 deck.
 *
 * Demonstrates the standard layout system — wrapped with <TitleLayout>
 * so the deck title stamp appears at the bottom-left automatically.
 * Replace this file with your real title slide; for body slides, wrap
 * with <BodyLayout> instead (which adds the footer line + dynamic
 * NN / TT slide numbering on the bottom-right).
 */
export default function PlaceholderSlide({ deck }) {
  return (
    <TitleLayout deck={deck}>
      <div className="max-w-2xl">
        <div
          className="deck-mono uppercase mb-3"
          style={{
            fontSize: '0.7rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case, var(--amber))',
          }}
        >
          qp2-seminar-v3-R2 · placeholder
        </div>
        <h1
          className="deck-display"
          style={{
            fontSize: 'clamp(28px, 4vw, 52px)',
            fontWeight: 500,
            lineHeight: 1.15,
            color: 'var(--cream)',
          }}
        >
          New deck — your first slide goes here.
        </h1>
        <p
          className="mt-4"
          style={{
            color: 'var(--cream-muted)',
            lineHeight: 1.55,
            maxWidth: '60ch',
          }}
        >
          Replace this file with the actual title slide. For body slides,
          wrap content with{' '}
          <code style={{ color: 'var(--case, var(--amber))' }}>
            &lt;BodyLayout&gt;
          </code>{' '}
          so footer text, slide numbering, spacing, and fonts stay
          consistent across the deck without each slide reimplementing
          its own chrome.
        </p>
      </div>
    </TitleLayout>
  );
}
