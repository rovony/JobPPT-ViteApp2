import { useCallback, useEffect, useMemo, useState } from 'react';

/**
 * useDeckOverrides — local-only, per-deck UI overrides that live in
 * localStorage. Currently tracks two things:
 *
 *   · hidden  : Set<slideId>  — slides the user has "hidden" in overview
 *   · order   : string[]      — custom slide-id ordering (drag-reorder)
 *
 * `order` is the presentation order. As of Phase 11 (drag-and-drop
 * reorder), DeckRunner wraps its deck through `useOrderedDeck`, which
 * consumes this hook and feeds the reordered slide array into the
 * navigation flow. That means: drag a slide in the Overview panel and
 * the live deck's arrow-key navigation, transitions, and dynamic
 * NN/TT footer numbering all follow the new order. The manifest is
 * still the *content* source of truth (slide identity, layout opts,
 * notes/qa keys), but presentation sequencing is now user-overridable.
 *
 * `hidden` remains presentation-layer-only and does NOT skip slides
 * during arrow-key navigation — it only dims them in the Overview
 * grid. Skipping slides mid-talk would be a footgun.
 *
 * Persistence keys are scoped per deck so multiple decks coexist:
 *   deck-overrides:<deckId>:hidden
 *   deck-overrides:<deckId>:order
 *
 * The hook returns:
 *   ordered            — slides re-ordered per saved `order`, with any
 *                        manifest-only slides appended at the end
 *   isHidden(id)       — quick lookup
 *   toggleHidden(id)   — flip visibility (Overview only)
 *   moveUp/moveDown    — bump a slide one step within `ordered`
 *   reorder(from,to)   — drop-style move (used by drag-and-drop)
 *   reset              — clear all overrides for this deck
 */
const KEY = (deckId, kind) => `deck-overrides:${deckId}:${kind}`;

function loadJSON(key, fallback) {
  if (typeof window === 'undefined') return fallback;
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    return parsed ?? fallback;
  } catch {
    return fallback;
  }
}

function saveJSON(key, value) {
  if (typeof window === 'undefined') return;
  try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* quota — ignore */ }
}

export function useDeckOverrides(deckId, slides) {
  const [hidden, setHidden] = useState(() => new Set(loadJSON(KEY(deckId, 'hidden'), [])));
  const [order, setOrder]   = useState(() => loadJSON(KEY(deckId, 'order'), []));

  // Persist on change.
  useEffect(() => { saveJSON(KEY(deckId, 'hidden'), Array.from(hidden)); }, [deckId, hidden]);
  useEffect(() => { saveJSON(KEY(deckId, 'order'), order); }, [deckId, order]);

  // Reconcile saved `order` with current slides: keep saved positions
  // for slides that still exist, append any new slides at the end.
  const ordered = useMemo(() => {
    const byId = new Map(slides.map((s) => [s.id, s]));
    const seen = new Set();
    const out = [];
    for (const id of order) {
      if (byId.has(id) && !seen.has(id)) { out.push(byId.get(id)); seen.add(id); }
    }
    for (const s of slides) {
      if (!seen.has(s.id)) out.push(s);
    }
    return out;
  }, [slides, order]);

  const isHidden = useCallback((id) => hidden.has(id), [hidden]);

  const toggleHidden = useCallback((id) => {
    setHidden((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  }, []);

  const reorder = useCallback((from, to) => {
    if (from === to) return;
    setOrder(() => {
      const next = ordered.map((s) => s.id);
      const [moved] = next.splice(from, 1);
      next.splice(to, 0, moved);
      return next;
    });
  }, [ordered]);

  const moveUp = useCallback((idxInOrdered) => {
    if (idxInOrdered <= 0) return;
    reorder(idxInOrdered, idxInOrdered - 1);
  }, [reorder]);

  const moveDown = useCallback((idxInOrdered) => {
    if (idxInOrdered >= ordered.length - 1) return;
    reorder(idxInOrdered, idxInOrdered + 1);
  }, [reorder, ordered.length]);

  const reset = useCallback(() => {
    setHidden(new Set());
    setOrder([]);
  }, []);

  const hasOverrides = hidden.size > 0 || order.length > 0;

  return { ordered, isHidden, toggleHidden, moveUp, moveDown, reorder, reset, hasOverrides };
}