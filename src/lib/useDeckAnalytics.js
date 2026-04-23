import { useEffect, useMemo, useState, useCallback } from 'react';
import { base44 } from '@/api/base44Client';

/**
 * useDeckAnalytics — fetches SlideView rows for a deck and aggregates
 * them into per-slide metrics and navigation-edge metrics.
 *
 * Filters:
 *   audienceOnly: if true, excludes rows where is_presenter === true.
 *   sinceDays:    only include rows newer than N days ago (null = all).
 *
 * Returns:
 *   perSlide: { slide_id → { views, totalMs, avgMs, medianMs, backCount, jumpCount } }
 *   edges:    { "fromId→toId" → count }
 *   sessions: Map<session_id, sortedRows[]>
 *   totals:   { views, sessions, totalMs, avgSessionMs }
 */
export function useDeckAnalytics(deckId, { audienceOnly = true, sinceDays = null } = {}) {
  const [rows, setRows] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRows = useCallback(async () => {
    if (!deckId) return;
    setLoading(true);
    const all = await base44.entities.SlideView.filter({ deck_id: deckId }, '-created_date', 5000);
    let filtered = all;
    if (audienceOnly) filtered = filtered.filter((r) => !r.is_presenter);
    if (sinceDays) {
      const cutoff = Date.now() - sinceDays * 24 * 60 * 60 * 1000;
      filtered = filtered.filter((r) => new Date(r.created_date).getTime() >= cutoff);
    }
    setRows(filtered);
    setLoading(false);
  }, [deckId, audienceOnly, sinceDays]);

  useEffect(() => { fetchRows(); }, [fetchRows]);

  const agg = useMemo(() => {
    const perSlide = new Map();
    const edges = new Map();
    const sessions = new Map();

    for (const r of rows) {
      const slot = perSlide.get(r.slide_id) || {
        slide_id: r.slide_id,
        slide_index: r.slide_index,
        views: 0,
        totalMs: 0,
        durations: [],
        backCount: 0,
        jumpCount: 0,
      };
      slot.views += 1;
      slot.totalMs += r.duration_ms || 0;
      slot.durations.push(r.duration_ms || 0);
      if (r.direction === 'backward') slot.backCount += 1;
      if (r.direction === 'jump') slot.jumpCount += 1;
      if (slot.slide_index == null) slot.slide_index = r.slide_index;
      perSlide.set(r.slide_id, slot);

      if (r.entered_from_slide_id) {
        const k = `${r.entered_from_slide_id}→${r.slide_id}`;
        edges.set(k, (edges.get(k) || 0) + 1);
      }

      if (r.session_id) {
        const sess = sessions.get(r.session_id) || [];
        sess.push(r);
        sessions.set(r.session_id, sess);
      }
    }

    // Finalize per-slide: avg + median
    for (const slot of perSlide.values()) {
      slot.avgMs = slot.views ? slot.totalMs / slot.views : 0;
      const sorted = [...slot.durations].sort((a, b) => a - b);
      slot.medianMs = sorted.length ? sorted[Math.floor(sorted.length / 2)] : 0;
      delete slot.durations;
    }

    // Sort sessions chronologically within each session
    for (const [k, arr] of sessions) {
      arr.sort((a, b) => new Date(a.created_date) - new Date(b.created_date));
      sessions.set(k, arr);
    }

    const totalViews = rows.length;
    const totalMs = rows.reduce((a, r) => a + (r.duration_ms || 0), 0);
    const sessionMs = [...sessions.values()].map((arr) => arr.reduce((s, r) => s + (r.duration_ms || 0), 0));
    const avgSessionMs = sessionMs.length ? sessionMs.reduce((a, b) => a + b, 0) / sessionMs.length : 0;

    return {
      perSlide,
      edges,
      sessions,
      totals: {
        views: totalViews,
        sessions: sessions.size,
        totalMs,
        avgSessionMs,
      },
    };
  }, [rows]);

  return { ...agg, rows, loading, refresh: fetchRows };
}