// @ts-nocheck
import { useEffect, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * useAudienceQuestions — live list of AudienceQuestion records for a deck,
 * kept up-to-date via entity real-time subscription. Returns the current
 * questions plus stable action callbacks for moderation and voting.
 *
 * Visibility:
 *   - Presenter (includeHidden=true) sees every question regardless of status.
 *   - Audience (includeHidden=false) sees everything except hidden.
 *
 * Sort order is intentionally NOT applied here — callers decide (top-voted
 * for the presenter, newest-first for the audience feed, etc.).
 */
export function useAudienceQuestions(deckId, { includeHidden = false } = {}) {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    if (!deckId) return;
    const rows = await base44.entities.AudienceQuestion.filter({ deck_id: deckId }, '-created_date', 500);
    setQuestions(includeHidden ? rows : rows.filter((q) => q.status !== 'hidden'));
    setLoading(false);
  }, [deckId, includeHidden]);

  useEffect(() => {
    refresh();
    const unsub = base44.entities.AudienceQuestion.subscribe(() => { refresh(); });
    return unsub;
  }, [refresh]);

  const submit = useCallback(async ({ question, slideId, slideIndex, authorName }) => {
    return base44.entities.AudienceQuestion.create({
      deck_id: deckId,
      slide_id: slideId || 'general',
      slide_index: typeof slideIndex === 'number' ? slideIndex : null,
      question: question.trim(),
      author_name: (authorName || '').trim() || 'Anonymous',
      votes: 0,
      status: 'new',
    });
  }, [deckId]);

  const upvote = useCallback(async (q) => {
    return base44.entities.AudienceQuestion.update(q.id, { votes: (q.votes || 0) + 1 });
  }, []);

  const setStatus = useCallback(async (q, status) => {
    return base44.entities.AudienceQuestion.update(q.id, { status });
  }, []);

  const remove = useCallback(async (q) => {
    return base44.entities.AudienceQuestion.delete(q.id);
  }, []);

  return { questions, loading, submit, upvote, setStatus, remove, refresh };
}
