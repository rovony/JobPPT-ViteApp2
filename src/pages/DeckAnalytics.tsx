import React, { useState } from 'react';
import { useParams, Navigate, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, RefreshCw } from 'lucide-react';
import { getDeck } from '@/decks/registry';
import { useDeckAnalytics } from '@/lib/useDeckAnalytics';
import MetricCard from '@/components/analytics/MetricCard';
import TimePerSlideChart from '@/components/analytics/TimePerSlideChart';
import NavigationFlow from '@/components/analytics/NavigationFlow';

/**
 * DeckAnalytics — owner-facing engagement dashboard for a single deck.
 *
 * URL: /decks/:deckId/analytics
 *
 * Shows:
 *   · KPI row: total sessions, total views, avg session length, total time
 *   · Time per slide (median, with view counts + return flag)
 *   · Navigation patterns (backward & large-jump edges)
 *   · Filters: audience-only toggle, time window
 *
 * Layout uses page-level grid blocks; each chart component owns its
 * internal layout (all grid-based → no overlap by construction).
 */
function fmtMs(ms) {
  if (!ms) return '—';
  const s = Math.round(ms / 1000);
  if (s < 60) return `${s}s`;
  const m = Math.floor(s / 60);
  const r = s % 60;
  if (m < 60) return `${m}m ${String(r).padStart(2, '0')}s`;
  const h = Math.floor(m / 60);
  const mm = m % 60;
  return `${h}h ${String(mm).padStart(2, '0')}m`;
}

export default function DeckAnalytics() {
  const { deckId } = useParams();
  const deck = deckId ? getDeck(deckId) : null;

  const [audienceOnly, setAudienceOnly] = useState(true);
  const [sinceDays, setSinceDays] = useState(null); // null = all time

  const { perSlide, edges, totals, loading, refresh } = useDeckAnalytics(deck?.id, {
    audienceOnly,
    sinceDays,
  });

  if (!deck) return <Navigate to="/" replace />;

  return (
    <div className="deck-root min-h-[100dvh]" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div
        className="max-w-[var(--deck-max-w)] mx-auto"
        style={{ padding: 'var(--space-10) var(--deck-gutter)' }}
      >
        {/* Header */}
        <header className="flex items-start justify-between gap-4" style={{ marginBottom: 'var(--space-10)' }}>
          <div className="min-w-0">
            <Link
              to="/"
              className="deck-mono uppercase inline-flex items-center gap-1.5 mb-3 transition-colors hover:text-[var(--cream)]"
              style={{
                fontSize: '0.62rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              <ArrowLeft className="w-3 h-3" /> Back to decks
            </Link>
            <div
              className="deck-mono uppercase flex items-center gap-2"
              style={{
                fontSize: '0.62rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case, var(--amber))',
                marginBottom: 'var(--space-2)',
              }}
            >
              <BarChart3 className="w-3 h-3" /> Analytics
            </div>
            <h1
              className="deck-display"
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                lineHeight: 1.1,
                letterSpacing: 'var(--ls-headline)',
                color: 'var(--cream)',
                fontWeight: 600,
                margin: 0,
              }}
            >
              {deck.title}
            </h1>
            {deck.subtitle && (
              <div style={{ color: 'var(--cream-muted)', marginTop: 'var(--space-2)' }}>{deck.subtitle}</div>
            )}
          </div>
          <button
            onClick={refresh}
            title="Refresh"
            aria-label="Refresh analytics"
            className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
            style={{
              borderColor: 'var(--cream-hairline)',
              color: 'var(--cream-muted)',
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <RefreshCw className={`w-3 h-3 ${loading ? 'animate-spin' : ''}`} /> Refresh
          </button>
        </header>

        {/* Filter bar */}
        <div
          className="flex flex-wrap items-center gap-2 rounded-deck-lg"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--cream-hairline)',
            padding: 'var(--space-3) var(--space-4)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <FilterPill active={audienceOnly} onClick={() => setAudienceOnly(true)}>Audience only</FilterPill>
          <FilterPill active={!audienceOnly} onClick={() => setAudienceOnly(false)}>All views</FilterPill>
          <span style={{ width: 1, height: 18, background: 'var(--cream-hairline)', margin: '0 var(--space-2)' }} />
          <FilterPill active={sinceDays === null} onClick={() => setSinceDays(null)}>All time</FilterPill>
          <FilterPill active={sinceDays === 30} onClick={() => setSinceDays(30)}>30 days</FilterPill>
          <FilterPill active={sinceDays === 7} onClick={() => setSinceDays(7)}>7 days</FilterPill>
          <FilterPill active={sinceDays === 1} onClick={() => setSinceDays(1)}>24 hrs</FilterPill>
        </div>

        {/* KPI row */}
        <div
          className="grid grid-cols-2 lg:grid-cols-4"
          style={{ gap: 'var(--space-4)', marginBottom: 'var(--space-6)' }}
        >
          <MetricCard label="Sessions" value={totals.sessions} sublabel="Unique viewing sessions" />
          <MetricCard label="Slide views" value={totals.views} sublabel="Individual slide visits" />
          <MetricCard label="Avg session" value={fmtMs(totals.avgSessionMs)} sublabel="Time per session" />
          <MetricCard label="Total watch" value={fmtMs(totals.totalMs)} sublabel="Cumulative time on deck" />
        </div>

        {/* Time per slide */}
        <div style={{ marginBottom: 'var(--space-6)' }}>
          <TimePerSlideChart deck={deck} perSlide={perSlide} />
        </div>

        {/* Navigation flow */}
        <div style={{ marginBottom: 'var(--space-10)' }}>
          <NavigationFlow deck={deck} edges={edges} />
        </div>

        {totals.views === 0 && !loading && (
          <div
            className="rounded-deck-lg text-center"
            style={{
              border: '1px dashed var(--cream-hairline)',
              padding: 'var(--space-10)',
              color: 'var(--cream-muted)',
            }}
          >
            <div className="deck-display" style={{ fontSize: '1.2rem', color: 'var(--cream)', marginBottom: 'var(--space-2)' }}>
              No view data yet
            </div>
            <div style={{ fontSize: '0.88rem' }}>
              Open the deck and navigate through some slides — analytics populates automatically.
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, children }) {
  return (
    <button
      onClick={onClick}
      className="deck-mono uppercase px-2.5 py-1 rounded-full border transition-colors"
      style={{
        borderColor: active ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
        background: active ? 'var(--case, var(--amber))' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--cream-muted)',
        fontSize: '0.58rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      {children}
    </button>
  );
}