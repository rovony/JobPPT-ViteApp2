import React from 'react';
import TitleLayout from '@/components/deck/layouts/TitleLayout';

/**
 * 01-title — V5 cover slide.
 *
 * Locked talk identity (committed to Merck — do NOT rewrite the title or
 * subtitle without an explicit authoring decision):
 *   Title:    "Quantitative Pharmacology in Action"
 *   Subtitle: "Strategies for Dose Selection and Regulatory Impact
 *              Across Therapeutic Areas"
 *
 * Editorial asymmetric composition (no grids, single dominant element):
 *   • Top-left zone: 96px amber hairline → mono eyebrow → display title
 *     (2 lines, italic pivot on "in Action") → lead subtitle
 *   • Bottom-left zone: speaker name + role
 *   • TitleLayout chrome is OFF (the cover is its own visual moment).
 *
 * Token-only styling — every size, color, and rhythm value pulls from
 * src/index.css. No raw px / pt / hex / clamp on this slide.
 *
 * Case-color note: the title slide is deck-neutral. `--case` resolves to
 * `--amber` here (deck default); CS1 / CS2 / CS3 slides flip it via a
 * data-case wrapper at the case-divider level, not on the cover.
 */
export default function TitleSlide({ deck }) {
  return (
    <TitleLayout deck={deck}>
      <div
        className="h-full flex flex-col justify-between"
        style={{
          // Bottom safe-zone — TitleLayout uses small --deck-pad, but the
          // app's NORMAL-view chrome (NavControls) overlays the slide's
          // bottom strip. Lift the speaker block above it. Hidden chrome
          // in SLIDE SHOW mode → no visual change there.
          paddingBottom: 'var(--space-16)',
        }}
      >
        {/* TOP ZONE — hairline · eyebrow · title · subtitle */}
        <div>
          <div
            aria-hidden
            style={{
              width: '96px',
              height: '1px',
              background: 'var(--amber)',
              marginBottom: 'var(--stack-md)',
            }}
          />

          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--amber)',
            }}
          >
            Candidate Seminar · Merck QP2-CMD · Spring 2026
          </div>

          <h1
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-display)',
              lineHeight: 1.04,
              fontWeight: 500,
              color: 'var(--cream)',
              marginTop: 'var(--stack-lg)',
              letterSpacing: 'var(--ls-headline)',
            }}
          >
            <span style={{ display: 'block' }}>Quantitative Pharmacology</span>
            <span style={{ display: 'block', fontStyle: 'italic' }}>
              in Action
            </span>
          </h1>

          <p
            className="deck-body"
            style={{
              fontSize: 'var(--fs-slide-lead)',
              lineHeight: 1.35,
              color: 'var(--cream-muted)',
              marginTop: 'var(--stack-lg)',
              maxWidth: '52ch',
            }}
          >
            Strategies for Dose Selection and Regulatory Impact Across Therapeutic Areas
          </p>
        </div>

        {/* BOTTOM ZONE — speaker block */}
        <div>
          <div
            className="deck-display"
            style={{
              fontSize: 'var(--fs-slide-name)',
              fontWeight: 500,
              color: 'var(--cream)',
              lineHeight: 1.2,
            }}
          >
            Malek Okour, Ph.D.
          </div>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-tight)',
              color: 'var(--cream-muted)',
              marginTop: 'var(--space-2)',
            }}
          >
            Candidate · Senior Director, Clinical Pharmacology &amp; Pharmacometrics
          </div>
        </div>
      </div>
    </TitleLayout>
  );
}
