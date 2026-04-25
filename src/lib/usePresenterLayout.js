import { useEffect, useState, useCallback } from 'react';

/**
 * usePresenterLayout — per-device presenter view layout preferences.
 *
 * Two dimensions:
 *   • visibility — which sections render at all (some talks don't need
 *                  the audience Q&A panel; some don't need the AI assistant)
 *   • order      — within-column ordering. Center column has notes +
 *                  anticipated Q&A stacked; right column has now/next
 *                  tiles + audience Q&A. Order arrays let users move
 *                  these up/down within their column.
 *
 * Cross-column reorder isn't supported here — moving Audience Q&A from
 * the right column to the center is a deeper restructuring than the
 * resizable-panel layout supports cleanly. If that becomes a real need,
 * we'd need a different layout primitive than react-resizable-panels.
 *
 * Persisted under `presenter:layout` so the user's preference survives
 * reloads. Defaults restore via resetLayout().
 */

export const SECTION_KEYS = ['assistant', 'notes', 'anticipatedQA', 'nowTile', 'nextTile', 'audienceQA'];

export const SECTION_LABEL = {
  assistant:     'Presenter assistant',
  notes:         'Speaker notes',
  anticipatedQA: 'Anticipated Q&A',
  nowTile:       'Now slide tile',
  nextTile:      'Next slide tile',
  audienceQA:    'Audience Q&A (live)',
};

export const SECTION_GROUP = {
  assistant:     'left',
  notes:         'center',
  anticipatedQA: 'center',
  nowTile:       'right',
  nextTile:      'right',
  audienceQA:    'right',
};

const DEFAULT_LAYOUT = {
  visibility: {
    assistant: true,
    notes: true,
    anticipatedQA: true,
    nowTile: true,
    nextTile: true,
    audienceQA: true,
  },
  centerOrder: ['notes', 'anticipatedQA'],
  rightOrder:  ['nowTile', 'nextTile', 'audienceQA'],
};

const STORAGE_KEY = 'presenter:layout';

function readStored() {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LAYOUT;
    const parsed = JSON.parse(raw);
    return mergeWithDefaults(parsed);
  } catch {
    return DEFAULT_LAYOUT;
  }
}

/** Defensive merge — if the user's stored layout pre-dates a newer
 *  section being added, fall back to the default for that key. */
function mergeWithDefaults(stored) {
  const visibility = { ...DEFAULT_LAYOUT.visibility, ...(stored?.visibility || {}) };
  const centerOrder = sanitizeOrder(stored?.centerOrder, DEFAULT_LAYOUT.centerOrder);
  const rightOrder  = sanitizeOrder(stored?.rightOrder,  DEFAULT_LAYOUT.rightOrder);
  return { visibility, centerOrder, rightOrder };
}

function sanitizeOrder(stored, fallback) {
  if (!Array.isArray(stored)) return fallback;
  // Keep only valid keys, append any missing keys from fallback (so a
  // newly-added section appears at the bottom rather than disappearing).
  const valid = stored.filter((k) => fallback.includes(k));
  for (const k of fallback) if (!valid.includes(k)) valid.push(k);
  return valid;
}

export function usePresenterLayout() {
  const [layout, setLayout] = useState(readStored);

  // Persist on every change.
  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch {}
  }, [layout]);

  const setVisibility = useCallback((key, visible) => {
    setLayout((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: !!visible } }));
  }, []);

  const toggleVisibility = useCallback((key) => {
    setLayout((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: !prev.visibility[key] } }));
  }, []);

  const moveSection = useCallback((key, direction) => {
    setLayout((prev) => {
      const groupKey = SECTION_GROUP[key];
      const orderKey = groupKey === 'center' ? 'centerOrder' : groupKey === 'right' ? 'rightOrder' : null;
      if (!orderKey) return prev; // 'left' (assistant) has only one item — no order
      const order = [...prev[orderKey]];
      const idx = order.indexOf(key);
      if (idx < 0) return prev;
      const next = idx + (direction === 'up' ? -1 : 1);
      if (next < 0 || next >= order.length) return prev;
      [order[idx], order[next]] = [order[next], order[idx]];
      return { ...prev, [orderKey]: order };
    });
  }, []);

  const resetLayout = useCallback(() => setLayout(DEFAULT_LAYOUT), []);

  return {
    visibility: layout.visibility,
    centerOrder: layout.centerOrder,
    rightOrder: layout.rightOrder,
    setVisibility,
    toggleVisibility,
    moveSection,
    resetLayout,
  };
}
