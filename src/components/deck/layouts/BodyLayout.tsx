// @ts-nocheck
import React from 'react';
import DeckLayout from './DeckLayout';

/**
 * BodyLayout — preset over DeckLayout for the typical body slide.
 *
 * Defaults: all chrome ON (deck-default footer text + line + page number).
 * Eyebrow / headline default to null — pass per-slide values to show them.
 *
 * Per-slot override pattern (applies to BodyLayout AND TitleLayout):
 *   • Pass nothing  → use deck defaults
 *   • Pass a value  → override deck default for this slide
 *   • Pass `null`   → HIDE this slot for this slide
 *
 * Examples:
 *   <BodyLayout eyebrow="Case 01" headline="The dose came from the model.">
 *     ...
 *   </BodyLayout>
 *
 *   // Slide that wants to suppress page numbering for this beat:
 *   <BodyLayout pageNumber={false}>...</BodyLayout>
 *
 *   // Slide that overrides the deck-wide footer text:
 *   <BodyLayout footerText="Confidential · do not distribute">...</BodyLayout>
 *
 *   // Slide that hides EVERY footer slot (still shows header if eyebrow/
 *   // headline are present):
 *   <BodyLayout footerText={null} footerLine={false} pageNumber={false}>...</BodyLayout>
 */
export default function BodyLayout({ deck, children, ...overrides }) {
  return (
    <DeckLayout deck={deck} {...overrides}>
      {children}
    </DeckLayout>
  );
}
