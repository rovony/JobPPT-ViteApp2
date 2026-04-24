import { useEffect, useState, useCallback, useRef } from 'react';

/**
 * useSpeakerNotes — load + upsert speaker notes for a deck, keyed by (deck_id, slide_id).
 *
 * Storage model (3 layers, highest precedence wins):
 *   1. Live override  — per-device localStorage, written on every edit
 *   2. Static note    — canonical markdown from src/decks/<deck>/notes.js
 *   3. Empty          — placeholder shown in the editor
 *
 * The base44 backend is currently a no-op stub (see api/base44Client.js),
 * so this hook persists edits to localStorage instead. When/if base44 is
 * reconnected, swap this implementation back to entity reads/writes.
 *
 * API:
 *   getNote(slideId)             — string (override > static > '')
 *   saveNote(slideId, idx, text) — debounced write to localStorage
 *   clearNote(slideId)           — drop override, revert to static
 *   hasOverride(slideId)         — true if a live edit exists for this slide
 *   saving                       — true while a debounced write is pending
 *   loaded                       — initial localStorage read finished
 */
export function useSpeakerNotes(deckId, staticNotes = null) {
  const [overrides, setOverrides] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef({});

  const storageKey = deckId ? `presenter:notes:${deckId}` : null;

  // Initial read from localStorage.
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

  // Atomic write of the current override map.
  const persist = useCallback(
    (next) => {
      if (!storageKey) return;
      try {
        localStorage.setItem(storageKey, JSON.stringify(next));
      } catch {
        // Quota exceeded or storage disabled — fail silently; in-memory state still wins for the session.
      }
    },
    [storageKey],
  );

  const getNote = useCallback(
    (slideId) => {
      const live = overrides[slideId]?.content;
      if (typeof live === 'string' && live.trim().length) return live;
      return staticNotes?.[slideId] || '';
    },
    [overrides, staticNotes],
  );

  const hasOverride = useCallback(
    (slideId) => {
      const live = overrides[slideId]?.content;
      return typeof live === 'string' && live.trim().length > 0;
    },
    [overrides],
  );

  const saveNote = useCallback(
    (slideId, slideIndex, content) => {
      if (!slideId) return;
      // Debounce per-slide so rapid keystrokes don't thrash localStorage.
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

  const clearNote = useCallback(
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

  return { getNote, saveNote, clearNote, hasOverride, saving, loaded };
}
