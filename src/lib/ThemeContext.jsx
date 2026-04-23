import React, { createContext, useContext, useEffect, useState, useCallback } from 'react';

/**
 * Global app-level theme. Values: 'light' | 'dark'.
 * Writes `data-theme-mode` on <html> so every :root token flips.
 * Persists to localStorage under 'deck-theme-mode'.
 *
 * Per-deck overrides are handled separately in DeckRunner — they
 * set `data-theme-mode` on the deck-root only, which wins over
 * the <html> attribute via CSS specificity.
 */
const ThemeCtx = createContext(null);
const STORAGE_KEY = 'deck-theme-mode';

function getInitial() {
  if (typeof window === 'undefined') return 'dark';
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === 'light' || saved === 'dark') return saved;
  return window.matchMedia?.('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
}

export function ThemeProvider({ children }) {
  const [mode, setModeState] = useState(getInitial);

  useEffect(() => {
    const html = document.documentElement;
    if (mode === 'light') html.setAttribute('data-theme-mode', 'light');
    else html.removeAttribute('data-theme-mode');
    try { localStorage.setItem(STORAGE_KEY, mode); } catch {}
  }, [mode]);

  const setMode = useCallback((next) => setModeState(next), []);
  const toggle = useCallback(() => setModeState((m) => (m === 'light' ? 'dark' : 'light')), []);

  return <ThemeCtx.Provider value={{ mode, setMode, toggle }}>{children}</ThemeCtx.Provider>;
}

export function useTheme() {
  const ctx = useContext(ThemeCtx);
  if (!ctx) throw new Error('useTheme must be used inside <ThemeProvider>');
  return ctx;
}