import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * useAnticipatedQA — load + upsert anticipated/rehearsed Q&A per slide.
 *
 * Twin of useSpeakerNotes. Same 3-layer model (override > static > empty),
 * same debounce, but namespaced under a separate localStorage key so
 * notes and Q&A don't collide. Keep these parallel — if you change the
 * notes hook's storage shape, change this one too.
 *
 * API:
 *   getQA(slideId)            — string (override > static > '')
 *   saveQA(slideId, idx, txt) — debounced write to localStorage
 *   clearQA(slideId)          — drop override, revert to file
 *   hasOverride(slideId)      — true if a live edit exists
 *   countItems(slideId)       — number of `## Q:` occurrences in the
 *                                 visible content (drives the section
 *                                 header badge: "Q&A · N anticipated")
 *   saving                    — debounce in flight
 *   loaded                    — initial localStorage read finished
 */
export function useAnticipatedQA(deckId, staticQA = null) {
  const [overrides, setOverrides] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef({});

  const storageKey = deckId ? `presenter:qa:${deckId}` : null;

  useEffect(() => {
    if (!storageKey) return;
    try {
      const raw = localStorage.getItem(storageKey);
      setOverrides(raw ? JSON.parse(raw) : {});
    } catch {
      setOverrides({});
    }
    setLoaded(true);
  }, [storageKey]);

  const persist = useCallback(
    (next) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Quota or storage disabled — fail silently; in-memory state still wins.
      }
    },
    [storageKey],
  );

  const getQA = useCallback(
    (slideId) => {
      const live = overrides[slideId]?.content;
      if (typeof live === 'string' && live.trim().length) return live;
      return staticQA?.[slideId] || '';
    },
    [overrides, staticQA],
  );

  const hasOverride = useCallback(
    (slideId) => {
      const live = overrides[slideId]?.content;
      return typeof live === 'string' && live.trim().length > 0;
    },
    [overrides],
  );

  const countItems = useCallback(
    (slideId) => {
      const text = getQA(slideId);
      if (!text) return 0;
      // Count `## Q:`, `## Q1:`, `## Q12:` (case-insensitive) at line start.
      // Matches the spec's `## QN: <question>` heading anchor — see
      // Notes-And-QA-Structure.md §2.
      const matches = text.match(/^\s*##\s+Q\d*:/gim);
      return matches ? matches.length : 0;
    },
    [getQA],
  );

  const saveQA = useCallback(
    (slideId, slideIndex, content) => {
      if (!slideId) return;
      clearTimeout(debounceRef.current[slideId]);
      setSaving(true);
      debounceRef.current[slideId] = setTimeout(() => {
        setOverrides((prev) => {
          const next = {
            ...prev,
            [slideId]: {
              content,
              slide_index: slideIndex,
              updated_at: new Date().toISOString(),
            },
          };
          persist(next);
          return next;
        });
        setSaving(false);
      }, 400);
    },
    [persist],
  );

  const clearQA = useCallback(
    (slideId) => {
      if (!slideId) return;
      clearTimeout(debounceRef.current[slideId]);
      setOverrides((prev) => {
        if (!(slideId in prev)) return prev;
        const next = { ...prev };
        delete next[slideId];
        persist(next);
        return next;
      });
    },
    [persist],
  );

  return { getQA, saveQA, clearQA, hasOverride, countItems, saving, loaded };
}
