import React from 'react';
import DeckLayout from './DeckLayout';

/**
 * TitleLayout — preset over DeckLayout for hero / opener / closer slides.
 *
 * Defaults: all chrome OFF (eyebrow, headline, footer text, footer line,
 * page number) — the cover is its own visual moment.
 *
 * The slide can override any individual slot if needed (e.g. show the
 * page number on the closer slide). Pass:
 *   pageNumber={true}  → show NN / TT
 *   footerLine={true}  → show hairline
 *   footerText="..."   → show specific footer text
 *   eyebrow="..."      → show eyebrow above your hero content
 *   headline={null}    → already null by default
 */
export default function TitleLayout({ deck, children, ...overrides }) {
  return (
    <DeckLayout
      deck={deck}
      eyebrow={null}
      headline={null}
      footerText={null}
      footerLine={false}
      pageNumber={false}
      {...overrides}
    >
      {children}
    </DeckLayout>
  );
}
