import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * useDeckOrder — runtime override for the order of slides in a deck.
 *
 * Why this exists (separate from manifest.slides[]):
 *   • The manifest is build-time. Slide files import their components,
 *     manifest assembles them in an array, that array IS the canonical
 *     order. Re-ordering the manifest needs a code change + redeploy.
 *   • This hook gives a RUNTIME override stored in localStorage, so a
 *     user can drag-and-drop reorder slides (Phase 11) without editing
 *     the manifest. The override is per-device and per-deck.
 *
 * Resolution:
 *   • If no override is stored, returns the manifest order verbatim.
 *   • If an override exists, resolves each id back to its manifest entry.
 *     Slide ids in the override that no longer exist in the manifest are
 *     dropped silently. Slide ids in the manifest that aren't in the
 *     override (added since last reorder) are APPENDED to the end so
 *     they're not lost.
 *
 * API:
 *   slides       — ordered array of slide manifest entries
 *   orderIds     — current array of slide ids (override > manifest)
 *   hasOverride  — true if a localStorage override is active
 *   reorder(from, to) — move slide at index `from` to index `to`
 *   setOrder(ids)     — replace the entire order
 *   resetOrder()      — drop the override; revert to manifest
 */
export function useDeckOrder(deck) {
  const storageKey = deck?.id ? `presenter:order:${deck.id}` : null;

  const [overrideIds, setOverrideIds] = useState(() => readStored(storageKey));

  // Persist on every change. null/empty = clear key.
  useEffect(() => {
    if (!storageKey) return;
    try {
      if (!overrideIds || overrideIds.length === 0) {
        localStorage.removeItem(storageKey);
      } else {
        localStorage.setItem(storageKey, JSON.stringify(overrideIds));
      }
    } catch {}
  }, [overrideIds, storageKey]);

  // Resolve override → ordered slides. If the deck mutates (build-time
  // slide added or removed), reconcile gracefully.
  const slides = useMemo(() => {
    const manifestSlides = deck?.slides || [];
    if (!overrideIds || overrideIds.length === 0) return manifestSlides;

    const byId = new Map(manifestSlides.map((s) => [s.id, s]));
    const ordered = [];
    const placed = new Set();

    for (const id of overrideIds) {
      const slide = byId.get(id);
      if (slide) {
        ordered.push(slide);
        placed.add(id);
      }
    }
    // Append any manifest slides not in the override (newly added).
    for (const slide of manifestSlides) {
      if (!placed.has(slide.id)) ordered.push(slide);
    }
    return ordered;
  }, [overrideIds, deck?.slides]);

  const orderIds = useMemo(() => slides.map((s) => s.id), [slides]);

  const reorder = useCallback((fromIdx, toIdx) => {
    setOverrideIds((prev) => {
      const base = prev && prev.length ? prev : (deck?.slides || []).map((s) => s.id);
      if (fromIdx < 0 || fromIdx >= base.length || toIdx < 0 || toIdx >= base.length) return prev;
      if (fromIdx === toIdx) return prev;
      const next = [...base];
      const [moved] = next.splice(fromIdx, 1);
      next.splice(toIdx, 0, moved);
      return next;
    });
  }, [deck?.slides]);

  const setOrder = useCallback((ids) => {
    setOverrideIds(Array.isArray(ids) ? [...ids] : null);
  }, []);

  const resetOrder = useCallback(() => setOverrideIds(null), []);

  return {
    slides,
    orderIds,
    hasOverride: !!(overrideIds && overrideIds.length),
    reorder,
    setOrder,
    resetOrder,
  };
}

function readStored(storageKey) {
  if (!storageKey || typeof window === 'undefined') return null;
  try {
    const raw = localStorage.getItem(storageKey);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}
