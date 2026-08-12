// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import '../tokens.css';

/**
 * Shared furniture for the CS1 case deck (v7-Claude).
 *
 * Follows the app slide contracts in JobPPT-ViteApp2/CLAUDE.md: fluid
 * --fs-slide-* tokens only, no hex literals, the four-weight border
 * vocabulary. Cards stay in the RecapCard / HeroTile vocabulary.
 *
 * Accent TEXT reads from the ink variants in tokens.css rather than from the
 * raw accent tokens: coral on light paper measures 2.04:1, which fails AA and
 * was the main reason the deck read as visually noisy. Raw accents still carry
 * rails, borders and fills, where the 3:1 non-text rule applies instead.
 */

export const EASE = [0.2, 0.7, 0.3, 1];

/** Accent inks — AA-safe in both themes. Defined in tokens.css. */
export const INK = {
  case: 'var(--case-ink)',
  amber: 'var(--amber-ink)',
  sage: 'var(--sage-ink)',
};

/**
 * Entrance timing.
 *
 * The first pass ran eight staggered entrances out to 1.9 s against an app
 * budget of ≤3 concurrent and ≤3 s total. Compressed to ~1.0 s with 6px of
 * travel instead of 12 — same reveal order, but it stops competing with the
 * speaker. Motion should point the eye, not perform.
 *
 * Order always follows reading order: eyebrow → headline → subhead → viz
 * elements left-to-right / top-to-bottom → payoff → footer.
 */
export const T = {
  eyebrow: 0.08,
  headline: 0.18,
  subhead: 0.34,
  body: 0.46,
  step: 0.09,
  payoff: 0.88,
  footer: 1.0,
};

/** Nth viz element's delay, so slides never hand-tune a stagger. */
export const at = (i = 0) => +(T.body + i * T.step).toFixed(2);

/** Standard entrance for a viz element — 6px lift, reduced-motion safe. */
export const rise = (i = 0, reduced = false) => ({
  initial: reduced ? false : { opacity: 0, y: 6 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: reduced ? 0 : 0.42, delay: reduced ? 0 : at(i), ease: EASE },
});

/**
 * withTokens — wraps a slide so the deck-scoped overrides in tokens.css apply.
 * `display: contents` leaves layout untouched while still giving the custom
 * properties an ancestor to inherit from, which is what lets this cover the
 * slides reused by import from v7-xencor without editing their files.
 */
export function withTokens(Component: any) {
  const Wrapped = (props: any) => (
    <div className="cs1-tokens" style={{ display: 'contents' }}>
      <Component {...props} />
    </div>
  );
  Wrapped.displayName = `withTokens(${Component.displayName || Component.name || 'Slide'})`;
  return Wrapped;
}

/** Accent-colored mono section label. Every panel opens with one. */
export function Kicker({ children, color = INK.case, style }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-slide-kicker)',
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
 * background, left accent rail. `tone` is the RAIL colour (a border, so the
 * bright accent is correct there); `ink` is the KICKER colour and defaults to
 * the AA-safe partner of that tone.
 */
export function Panel({
  kicker,
  tone = 'var(--case, var(--coral))',
  ink = INK.case,
  muted = false,
  delay = 0,
  reduced,
  children,
  style,
}) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.42, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        position: 'relative',
        minWidth: 0,
        minHeight: 0,
        overflow: 'hidden',
        border: '1px solid var(--cream-hairline)',
        borderLeft: muted ? '1px solid var(--cream-hairline)' : `3px solid ${tone}`,
        borderRadius: 'var(--radius-lg)',
        // Flat surface rather than a gradient: the tinted gradient added a
        // second luminance signal per card, which read as visual noise when
        // three sat side by side.
        background: 'color-mix(in srgb, var(--panel) 72%, transparent)',
        padding: 'clamp(var(--space-3), 1.4vw, var(--space-4))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-2)',
        ...style,
      }}
    >
      {kicker && <Kicker color={muted ? 'var(--cream-faint)' : ink}>{kicker}</Kicker>}
      {children}
    </motion.div>
  );
}

/** Panel title — the claim the panel makes. One scale step above body. */
export function PanelTitle({ children, color = 'var(--cream)' }) {
  return (
    <div
      className="deck-display"
      style={{
        fontSize: 'var(--fs-cs1-card-title)',
        lineHeight: 1.25,
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
        lineHeight: 1.55,
        color: 'var(--cream-muted)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

/** Big tabular numeral for a hero stat. */
export function Numeral({ children, color = INK.case }) {
  return (
    <div
      className="deck-display"
      style={{
        fontSize: 'clamp(1.5rem, min(2.6vw, 4vh), 2.35rem)',
        lineHeight: 1,
        color,
        fontWeight: 700,
        fontVariantNumeric: 'tabular-nums',
        letterSpacing: '-0.01em',
      }}
    >
      {children}
    </div>
  );
}

/**
 * Row — responsive equal-weight grid. auto-fit means reading order degrades
 * cleanly from left→right into top→bottom on narrow viewports instead of
 * clipping, and the min is expressed in rem so it scales with root font size.
 */
export function Row({ min = '15rem', gap = 'clamp(var(--space-3), 1.4vw, var(--space-4))', children, style }) {
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

/** Closing payoff line — upright sans, one accent phrase carries the point. */
export function Payoff({ children, delay = T.payoff, reduced, style }) {
  return (
    <motion.p
      initial={reduced ? false : { opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: reduced ? 0 : 0.4, delay: reduced ? 0 : delay, ease: EASE }}
      className="deck-body"
      style={{
        fontSize: 'var(--fs-slide-tagline)',
        lineHeight: 1.55,
        color: 'var(--cream)',
        opacity: 0.88,
        margin: 0,
        maxWidth: '72ch',
        ...style,
      }}
    >
      {children}
    </motion.p>
  );
}

/** Inline emphasis inside Payoff / PanelBody. Amber ink by default. */
export function Hi({ children, color = INK.amber }) {
  return <span style={{ fontWeight: 600, color }}>{children}</span>;
}

/**
 * Stack — the standard viz container.
 *
 * Centralises the three things every slide body needs and that were being
 * repeated (and drifting) per slide: fill the viz cell, keep a consistent
 * vertical rhythm, and contain overflow so tall content scrolls inside the
 * cell rather than painting over the headline and footer at small viewports.
 */
export function Stack({ children, gap = 'clamp(var(--space-3), 1.6vw, var(--space-5))', style }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap,
        flex: 1,
        minHeight: 0,
        justifyContent: 'center',
        overflowY: 'auto',
        overflowX: 'hidden',
        ...style,
      }}
    >
      {children}
    </div>
  );
}
