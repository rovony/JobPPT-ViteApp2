import { useCallback, useState } from 'react';

/**
 * useLocalVotes — per-browser memory of which question ids this audience
 * member has already upvoted, so the UI can disable the upvote button
 * after a vote and guard against trivial double-clicks.
 *
 * Persisted in localStorage under one key per deck. This is NOT server-
 * side dedup — a determined user can clear storage — but that's fine
 * for live seminar Q&A, and avoids requiring audience login.
 */
export function useLocalVotes(deckId) {
  const key = `audience-votes:${deckId}`;

  const [voted, setVoted] = useState(() => {
    try {
      const raw = typeof window !== 'undefined' ? window.localStorage.getItem(key) : null;
      return new Set(raw ? JSON.parse(raw) : []);
    } catch { return new Set(); }
  });

  const persist = (next) => {
    try { window.localStorage.setItem(key, JSON.stringify([...next])); } catch {}
  };

  const markVoted = useCallback((id) => {
    setVoted((prev) => {
      if (prev.has(id)) return prev;
      const next = new Set(prev);
      next.add(id);
      persist(next);
      return next;
    });
  }, []);

  const hasVoted = useCallback((id) => voted.has(id), [voted]);

  return { hasVoted, markVoted };
}