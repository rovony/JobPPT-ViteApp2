// @ts-nocheck
/**
 * Token resolver — reads a CSS custom property from an element and
 * returns the literal value (hex, rgba, whatever). Use in SVG
 * attributes and anywhere `var(--x)` is not accepted.
 *
 * The optional `element` argument lets callers resolve scoped tokens
 * (e.g. a deck-root with its own `data-theme-mode="light"`). Defaults
 * to `document.documentElement` so existing callsites keep working.
 *
 * Safe during SSR — returns empty string if `document` is undefined.
 */
export function cssVar(name, element) {
  if (typeof window === 'undefined') return '';
  const el = element || document.documentElement;
  const raw = getComputedStyle(el).getPropertyValue(name);
  return raw ? raw.trim() : '';
}

/**
 * Parse a `--delay-*` token (e.g. "0.60s") as a number of seconds.
 * Falls back to the provided default if the token isn't set.
 */
export function cssDelay(name, fallback = 0) {
  const v = cssVar(name);
  if (!v) return fallback;
  const n = parseFloat(v);
  return Number.isFinite(n) ? (v.endsWith('ms') ? n / 1000 : n) : fallback;
}

/**
 * Hook that returns a frozen map of resolved tokens after mount,
 * so SVG attributes can read real hex values. Call with an array of
 * CSS-var names. Returns `null` on first render, then the map.
 *
 * Resolves from the nearest `.deck-root` ancestor if one exists —
 * this makes deck-scoped `data-theme-mode="light"` (and per-deck
 * theme overrides) actually affect the colors used in SVG.
 * Also re-resolves whenever the deck-root's theme attributes change
 * (via MutationObserver) so the light/dark toggle propagates to SVG.
 */
import { useEffect, useState } from 'react';
export function useTokens(names) {
  const [tokens, setTokens] = useState(null);

  useEffect(() => {
    // Resolve from the first deck-root on the page so scoped theme
    // overrides (data-theme-mode, data-deck-theme, data-case) apply.
    // Falls back to <html> when no deck-root is mounted.
    const el = document.querySelector('.deck-root') || document.documentElement;

    const resolve = () => {
      const map = {};
      for (const n of names) map[n] = cssVar(n, el);
      setTokens(map);
    };
    resolve();

    const mo = new MutationObserver(resolve);
    mo.observe(el, { attributes: true, attributeFilter: ['data-theme-mode', 'data-deck-theme', 'data-case'] });
    if (el !== document.documentElement) {
      mo.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme-mode'] });
    }
    return () => mo.disconnect();
  }, [names.join('|')]); // eslint-disable-line react-hooks/exhaustive-deps

  return tokens;
}
