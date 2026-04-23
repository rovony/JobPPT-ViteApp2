import { useEffect, useState, useCallback, useRef } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * useSpeakerNotes — load + upsert speaker notes for a deck, keyed by (deck_id, slide_id).
 *
 * Returns:
 *   notes          — map of slide_id → SpeakerNote record
 *   getNote(sid)   — content string for a given slide_id ('' if none)
 *   saveNote(sid, idx, content) — debounced upsert
 *   saving         — boolean, true while a save is in flight
 *   loaded         — initial fetch finished
 */
export function useSpeakerNotes(deckId) {
  const [notes, setNotes] = useState({});
  const [loaded, setLoaded] = useState(false);
  const [saving, setSaving] = useState(false);
  const debounceRef = useRef({});

  // Initial fetch — all notes for this deck.
  useEffect(() => {
    if (!deckId) return;
    let cancelled = false;
    (async () => {
      const rows = await base44.entities.SpeakerNote.filter({ deck_id: deckId });
      if (cancelled) return;
      const map = {};
      for (const r of rows) map[r.slide_id] = r;
      setNotes(map);
      setLoaded(true);
    })();
    return () => { cancelled = true; };
  }, [deckId]);

  const getNote = useCallback((slideId) => notes[slideId]?.content || '', [notes]);

  const saveNote = useCallback((slideId, slideIndex, content) => {
    // Debounce per slide so we don't thrash the API on every keystroke.
    clearTimeout(debounceRef.current[slideId]);
    debounceRef.current[slideId] = setTimeout(async () => {
      setSaving(true);
      const existing = notes[slideId];
      if (existing?.id) {
        const updated = await base44.entities.SpeakerNote.update(existing.id, { content });
        setNotes((prev) => ({ ...prev, [slideId]: { ...existing, ...updated } }));
      } else {
        const created = await base44.entities.SpeakerNote.create({
          deck_id: deckId,
          slide_id: slideId,
          slide_index: slideIndex,
          content,
        });
        setNotes((prev) => ({ ...prev, [slideId]: created }));
      }
      setSaving(false);
    }, 500);
  }, [deckId, notes]);

  return { notes, getNote, saveNote, saving, loaded };
}