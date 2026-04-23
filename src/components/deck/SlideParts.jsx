import React from 'react';
import { GridSlot } from './SlideGrid';
import { useDeck } from '@/lib/deck-store';
import SplitHeadline from './SplitHeadline';

/**
 * SlideParts — standard furniture components that plug into
 * SlideGrid's named areas. Every typographic size here reads from
 * the central fluid-type token scale defined in index.css
 * (--fs-slide-*). Nothing is hardcoded. The tokens use
 * clamp(min, preferred, max) where the preferred term tracks
 * min(vw, vh) — so text scales down on BOTH narrow and short
 * viewports, which fixes the "title huge, viz tiny" bug on mobile.
 *
 * Areas used (match SlideGrid's `areas` prop):
 *   chrome-l / chrome-r   · top-left eyebrow + top-right page identifier
 *   eyebrow               · colored eyebrow with hairline
 *   headline / subhead    · deck display typography
 *   viz                   · free-form body area (charts, grids)
 *   footer                · bottom italic payoff line
 *   source / pageno       · bottom-row source citation + N/total
 */

const EASE = [0.2, 0.7, 0.3, 1];

export function Eyebrow({ area = 'eyebrow', color = 'var(--case, var(--coral))', children, delay = 0.15 }) {
  return (
    <GridSlot
      area={area}
      motion={{ initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 }, delay }}
      className="flex items-center gap-2 sm:gap-4 deck-mono uppercase self-end"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
      }}
    >
      <span className="h-px w-6 sm:w-10" style={{ background: color }} />
      {children}
    </GridSlot>
  );
}

export function TopRight({ area = 'chrome-r', children, delay = 0.15 }) {
  return (
    <GridSlot
      area={area}
      motion={{ initial: { opacity: 0 }, animate: { opacity: 1 }, delay }}
      className="deck-mono uppercase self-end justify-self-end"
      style={{
        fontSize: 'var(--fs-slide-topright)',
        letterSpacing: 'var(--ls-mono)',
        color: 'var(--cream-faint)',
        textAlign: 'right',
      }}
    >
      {children}
    </GridSlot>
  );
}

/**
 * Headline — char-by-char staggered reveal via GSAP SplitText.
 *
 * The outer GridSlot reserves the "headline" area in the slide grid (no
 * motion here — the slot just positions). The inner SplitHeadline runs
 * the GSAP timeline that splits text into chars and staggers them up
 * into view. This keeps grid geometry + animation cleanly separated.
 *
 * Nested JSX (br, colored spans like "the <span style='color:cyan'>
 * decision</span>") is preserved — SplitText walks the DOM and only
 * wraps text nodes, leaving styled wrappers intact so per-word color
 * overrides still render correctly.
 */
export function Headline({ area = 'headline', children, delay = 0.3, maxChars = 34 }) {
  return (
    <GridSlot
      area={area}
      as="h1"
      className="deck-display self-center"
      style={{
        fontSize: 'var(--fs-slide-headline)',
        lineHeight: 'var(--lh-tight)',
        letterSpacing: 'var(--ls-display)',
        color: 'var(--cream)',
        fontWeight: 500,
        maxWidth: `${maxChars}ch`,
        margin: 0,
      }}
    >
      <SplitHeadline delay={delay}>{children}</SplitHeadline>
    </GridSlot>
  );
}

export function Subhead({ area = 'subhead', children, delay = 0.55, maxChars = 100, size = 'default' }) {
  // `size` lets individual slides bump the subhead when the line is
  // narrative/lead copy rather than a tight caption. 'lead' taps the
  // lead token (~28pt) which scales fluidly across viewports.
  const fontSize =
    size === 'lead'
      ? 'clamp(1rem, min(1.5vw, 2.5vh), 1.5rem)'
      : 'var(--fs-slide-subhead)';
  return (
    <GridSlot
      area={area}
      as="p"
      motion={{ initial: { opacity: 0, y: 12 }, animate: { opacity: 1, y: 0 }, delay }}
      className="deck-display italic self-start"
      style={{
        fontSize,
        lineHeight: 'var(--lh-snug)',
        color: 'var(--cream-muted)',
        fontWeight: 400,
        maxWidth: `${maxChars}ch`,
        margin: 0,
      }}
    >
      {children}
    </GridSlot>
  );
}

export function Viz({ area = 'viz', children, className, style }) {
  return (
    <GridSlot
      area={area}
      className={`relative ${className || ''}`}
      style={{ width: '100%', height: '100%', minHeight: 0, minWidth: 0, ...style }}
    >
      {children}
    </GridSlot>
  );
}

/**
 * Footer — bottom rail spanning the full slide width.
 * Layout: kicker (left) · tagline (center-right, flex-grow) · page N/total (right).
 * The page number is sourced from deck context so it's always correct — callers
 * no longer hardcode "03 / 20".
 */
export function Footer({ area = 'footer', kicker, tagline, delay = 2.6 }) {
  const { index, total } = useDeck();
  return (
    <GridSlot
      area={area}
      motion={{ initial: { opacity: 0 }, animate: { opacity: 1 }, delay }}
      className="flex flex-col sm:flex-row sm:items-baseline self-end gap-1 sm:gap-6"
      style={{
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
    >
      <span
        className="deck-mono uppercase shrink-0"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        {kicker}
      </span>
      <span
        className="deck-display italic sm:flex-1 sm:text-right min-w-0 truncate"
        style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: 'var(--cream-muted)',
          fontWeight: 500,
        }}
      >
        {tagline}
      </span>
      <span
        className="hidden sm:inline deck-mono uppercase shrink-0 whitespace-nowrap"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
        }}
      >
        {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
      </span>
    </GridSlot>
  );
}

/**
 * PageNo — deprecated. The page N/total is now rendered inside <Footer/>
 * so the rail layout is consistent and the number always comes from deck
 * context. Kept as a no-op for back-compat with existing slide calls.
 */
export function PageNo() {
  return null;
}