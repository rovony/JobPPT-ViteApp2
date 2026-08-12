// @ts-nocheck
import React from 'react';
import { GridSlot } from './SlideGrid';
import { useDeck } from '@/lib/deck-store';
import { formatTalkSlideCounter } from '@/lib/slide-counter';
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

/** Pill badge shell for slide eyebrows — case-colored bg for wayfinding. */
export function eyebrowBadgeStyle(color: string) {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: '0.35em',
    padding: '0.42em 0.95em',
    borderRadius: 'var(--radius-sm)',
    background: `color-mix(in srgb, ${color} 16%, transparent)`,
    border: `1px solid color-mix(in srgb, ${color} 42%, transparent)`,
    width: 'fit-content',
    maxWidth: '100%',
    lineHeight: 1.2,
  };
}

export function Eyebrow({ area = 'eyebrow', color = 'var(--case, var(--coral))', children, delay = 0.15, badge = true }: any) {
  return (
    <GridSlot
      area={area}
      motion={{ initial: { opacity: 0, x: -12 }, animate: { opacity: 1, x: 0 }, delay }}
      className="flex items-center deck-mono uppercase self-end"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        fontWeight: 700,
        color,
        ...(badge ? eyebrowBadgeStyle(color) : {}),
      }}
    >
      {!badge && <span className="h-px w-8 sm:w-12 shrink-0" style={{ background: color }} />}
      {children}
    </GridSlot>
  );
}

export function TopRight({ area = 'chrome-r', children, delay = 0.15 }: any) {
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
export function Headline({ area = 'headline', children, delay = 0.3, maxChars = 34 }: any) {
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

export function Subhead({ area = 'subhead', children, delay = 0.55, maxChars = 100, size = 'default' }: any) {
  // `size` lets individual slides bump the subhead when the line is
  // narrative/lead copy rather than a tight caption. 'lead' uses the
  // cover lead token so subtitles stay readable under a display headline.
  // Never start at opacity 0 — same presentation trap as SplitHeadline.
  const fontSize =
    size === 'lead'
      ? 'var(--fs-slide-lead)'
      : 'var(--fs-slide-subhead)';
  const safeDelay = Math.min(delay, 0.35);
  return (
    <GridSlot
      area={area}
      as="p"
      motion={{
        initial: { opacity: 1, y: 8 },
        animate: { opacity: 1, y: 0 },
        delay: safeDelay,
      }}
      className="deck-display italic self-start"
      style={{
        fontSize,
        lineHeight: size === 'lead' ? 1.4 : 'var(--lh-snug)',
        color: 'var(--cream-muted)',
        fontWeight: 400,
        maxWidth: `${maxChars}ch`,
        margin: 0,
        paddingTop: size === 'lead' ? 'var(--space-2)' : 0,
        paddingBottom: size === 'lead' ? 'var(--space-3)' : 0,
      }}
    >
      {children}
    </GridSlot>
  );
}

export function Viz({ area = 'viz', children, className, style }: any) {
  return (
    <GridSlot
      area={area}
      className={`relative flex flex-col ${className || ''}`}
      style={{ width: '100%', height: '100%', minHeight: 0, minWidth: 0, ...style }}
    >
      {children}
    </GridSlot>
  );
}

/**
 * Footer — bottom rail spanning the full slide width.
 *
 * Layout (top row):  kicker (left) · tagline (center-right, flex-grow) · page N/total (right).
 * Layout (optional second row):  source (full-width mono caption, can wrap).
 *
 * Convention:
 *   kicker  = "NN · short label"      (≤25 chars · mono · uppercase)
 *   tagline = italic payoff sentence  (≤16 words · sets up the slide's claim)
 *   source  = citation chain          (mono · 0.62rem · wraps if long)
 *
 * Why source is its own prop: callers were stuffing citation clusters into
 * `tagline` (e.g. "Source · EMA SmPC · FDA Letairis · Galié 2013 · Ivy 2024"),
 * which the rail's `truncate` swallowed below ~1366px. `source` renders on
 * a second row that may wrap, so 4-cite chains stay legible. The page
 * number is sourced from deck context so callers never hardcode "03 / 20".
 */
export function Footer({ area = 'footer', kicker, tagline, source, delay = 0.32 }: any) {
  const { index, slides } = useDeck();
  return (
    <GridSlot
      area={area}
      motion={{ initial: { opacity: 0 }, animate: { opacity: 1 }, delay }}
      className="flex flex-col self-end gap-1"
      style={{
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
    >
      <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-6">
        <span
          className="deck-mono uppercase shrink-0"
          style={{
            fontSize: 'var(--fs-slide-kicker)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          {kicker}
        </span>
        <span
          className="deck-display italic sm:flex-1 min-w-0"
          style={{
            fontSize: 'var(--fs-slide-tagline)',
            color: 'var(--cream)',
            fontWeight: 500,
            lineHeight: 1.35,
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
          {formatTalkSlideCounter(slides, index)}
        </span>
      </div>
      {source && (
        <span
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-card-meta, 0.62rem)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
            lineHeight: 1.45,
          }}
        >
          {source}
        </span>
      )}
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
