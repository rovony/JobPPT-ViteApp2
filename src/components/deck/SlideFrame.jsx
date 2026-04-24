import React from 'react';
import SlideGrid, { STANDARD_AREAS } from './SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from './SlideParts';

/**
 * SlideFrame — the one-and-only chrome wrapper every slide should use.
 *
 * Enforces the inviolable structural contract of the deck:
 *   • 12-col grid with named areas (no overlaps possible)
 *   • chrome row · eyebrow · headline · subhead · viz · footer
 *   • Uniform gutters, spacing, and rail positions from --deck-* tokens
 *   • Page N/total rendered inside Footer, sourced from deck context
 *
 * Per-deck themes may change colors/fonts/mood via --bg, --cream, --case
 * — but they CANNOT change this structure. That's the point.
 *
 * Usage:
 *   <SlideFrame
 *     dataCase="coral"
 *     eyebrow="CS1 · The challenge"
 *     headline={<>Pediatric PAH demanded a dose — <em>with no viable trial path.</em></>}
 *     subhead="One sentence context line."
 *     footerKicker="Four countries · three sponsors · one discipline"
 *     footerTagline="Model-informed decisions, end-to-end."
 *     footerSource="Source · Okour 2023 · ICH-E11A 2024"
 *   >
 *
 * Footer convention (matches `<Footer>` in SlideParts.jsx):
 *   • footerKicker  — short context cue (e.g. "Case 01 · Background")
 *   • footerTagline — one-line editorial flavor (drop in this slot only
 *     if you actually have a tagline). NEVER put a "Source · …" string
 *     here — it crowds the row at small viewports and steals visual
 *     weight from the kicker.
 *   • footerSource  — the citation/provenance string. Renders as a
 *     smaller mono caption on a second row, so long citations no
 *     longer squeeze page numbers off-screen.
 *     {vizChildren}
 *   </SlideFrame>
 *
 * Any of the named-slot props may be omitted; the corresponding grid
 * area simply stays empty (no ghost row is created because the grid
 * uses `auto` row sizing — empty areas collapse).
 *
 * If a slide needs custom chrome/headline markup (e.g. multi-line
 * colored spans), pass a React node instead of a string — the frame
 * just drops it into the correct area.
 */
export default function SlideFrame({
  dataCase,
  eyebrow,
  eyebrowColor,
  headline,
  headlineMaxChars,
  subhead,
  subheadMaxChars,
  footerKicker,
  footerTagline,
  footerSource,
  delays = {},
  areas = STANDARD_AREAS,
  rowSizes,
  colSizes,
  className,
  children,
}) {
  const D = {
    eyebrow:  delays.eyebrow  ?? 0.15,
    headline: delays.headline ?? 0.30,
    subhead:  delays.subhead  ?? 0.55,
    footer:   delays.footer   ?? 2.6,
  };

  return (
    <SlideGrid
      dataCase={dataCase}
      areas={areas}
      rowSizes={rowSizes}
      colSizes={colSizes}
      className={className}
    >
      {eyebrow != null && (
        <Eyebrow color={eyebrowColor} delay={D.eyebrow}>
          {eyebrow}
        </Eyebrow>
      )}

      {headline != null && (
        <Headline delay={D.headline} maxChars={headlineMaxChars}>
          {headline}
        </Headline>
      )}

      {subhead != null && (
        <Subhead delay={D.subhead} maxChars={subheadMaxChars}>
          {subhead}
        </Subhead>
      )}

      <Viz>{children}</Viz>

      {(footerKicker != null || footerTagline != null || footerSource != null) && (
        <Footer
          kicker={footerKicker}
          tagline={footerTagline}
          source={footerSource}
          delay={D.footer}
        />
      )}
    </SlideGrid>
  );
}