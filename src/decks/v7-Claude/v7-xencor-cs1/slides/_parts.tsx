// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * Shared furniture for the CS1 case deck (v7-Claude).
 *
 * Everything here follows the app slide contracts in JobPPT-ViteApp2/CLAUDE.md:
 * fluid --fs-slide-* tokens only, no hex literals, the four-weight border
 * vocabulary, and the standard EASE / entrance grammar. Cards are the
 * RecapCard / HeroTile vocabulary — no fourth card type is invented here.
 */

export const EASE = [0.2, 0.7, 0.3, 1];

/** Accent-colored mono section label. Every panel opens with one. */
export function Kicker({ children, color = 'var(--case, var(--coral))', style }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
        marginBottom: 'var(--space-2)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/**
 * Panel — the deck's RecapCard vocabulary: hairline border, panel-mix
 * background, optional left accent rail. `tone` drives the rail + kicker
 * color; `muted` drops the rail for supporting content.
 */
export function Panel({
  kicker,
  tone = 'var(--case, var(--coral))',
  muted = false,
  delay = 0,
  reduced,
  children,
  style,
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.55, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        border: '1px solid var(--cream-hairline)',
        borderLeft: muted ? '1px solid var(--cream-hairline)' : `4px solid ${tone}`,
        borderRadius: 'var(--radius-lg)',
        background: muted
          ? 'color-mix(in srgb, var(--panel) 55%, transparent)'
          : `linear-gradient(180deg, color-mix(in srgb, ${tone} 10%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)`,
        padding: 'clamp(var(--space-3), 1.5vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        ...style,
      }}
    >
      {kicker && <Kicker color={muted ? 'var(--cream-faint)' : tone}>{kicker}</Kicker>}
      {children}
    </motion.div>
  );
}

/** Panel title — the claim the panel makes. */
export function PanelTitle({ children, color = 'var(--cream)' }) {
  return (
    <div
      className="deck-display"
      style={{
        fontSize: 'clamp(1rem, min(1.5vw, 2.4vh), 1.35rem)',
        lineHeight: 1.2,
        color,
        fontWeight: 600,
      }}
    >
      {children}
    </div>
  );
}

/** Panel body copy — upright sans, never italic serif at this size. */
export function PanelBody({ children, style }) {
  return (
    <div
      className="deck-body"
      style={{
        fontSize: 'var(--fs-slide-tagline)',
        lineHeight: 1.5,
        color: 'var(--cream-muted)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Big tabular numeral for a hero stat. */
export function Numeral({ children, color = 'var(--case, var(--coral))' }) {
  return (
    <div
      className="deck-display"
      style={{
        fontSize: 'clamp(1.6rem, min(3vw, 4.6vh), 2.8rem)',
        lineHeight: 1,
        color,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Row — responsive equal-weight grid. Reflows to one column on narrow
 * viewports via auto-fit, so reading order degrades left→right into
 * top→bottom rather than clipping.
 */
export function Row({ min = '15rem', gap = 'var(--space-4)', children, style }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}, 100%), 1fr))`,
        gap,
        alignItems: 'stretch',
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Closing payoff line — upright sans, one amber phrase carries the point. */
export function Payoff({ children, delay = 1.6, reduced, style }) {
  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.45, delay: reduced ? 0 : delay, ease: EASE }}
      className="deck-body"
      style={{
        fontSize: 'var(--fs-slide-tagline)',
        lineHeight: 1.5,
        color: 'var(--cream)',
        opacity: 0.82,
        margin: 0,
        maxWidth: '66ch',
        ...style,
      }}
    >
      {children}
    </motion.p>
  );
}

/** Inline emphasis inside Payoff / PanelBody. */
export function Hi({ children, color = 'var(--amber)' }) {
  return <span style={{ fontWeight: 600, color }}>{children}</span>;
}
