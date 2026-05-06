/**
 * /decks  — Dedicated deck browser using git-derived metadata.
 *
 * Reads catalogGit.{kind,versionFamily,versionLabel,isLatestInFamily,
 * firstCommittedAt,lastUpdatedAt,commitCount,lastCommitSubject} from each
 * registered deck (regenerate via `npm run gen:deck-catalog-git`).
 *
 * Features: search, sort (last-updated / first-committed / name / commit-count
 * / family), filter by kind, optional group-by-kind, "Latest" badge for the
 * most-recently-updated deck per family.
 *
 * This page is a separate browser surface from `Home.tsx`. Home.tsx still
 * shows folders/favorites/archive — this page is for "show me everything,
 * surface what's latest, group by type."
 */
import { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import {
  ArrowUpRight,
  Calendar,
  GitCommit,
  LayoutGrid,
  List,
  Search,
  Sparkles,
  X,
} from 'lucide-react';
import { DECKS, type DeckCatalogGitEntry } from '@/decks/registry';

type Kind = DeckCatalogGitEntry['kind'];
type SortKey = 'lastUpdated' | 'firstCommitted' | 'name' | 'commitCount' | 'family';

const KIND_ORDER: Kind[] = ['presentation', 'case-study', 'template', 'showcase'];
const KIND_LABEL: Record<Kind, string> = {
  presentation: 'Presentations',
  'case-study': 'Case Studies',
  template: 'Templates',
  showcase: 'Showcases',
};
// Semantic tokens from the deck design system; never raw hex.
const KIND_TONE: Record<Kind, { bg: string; fg: string; border: string }> = {
  presentation: {
    bg: 'color-mix(in srgb, var(--cyan) 10%, transparent)',
    fg: 'var(--cyan)',
    border: 'color-mix(in srgb, var(--cyan) 28%, transparent)',
  },
  'case-study': {
    bg: 'color-mix(in srgb, var(--coral) 10%, transparent)',
    fg: 'var(--coral)',
    border: 'color-mix(in srgb, var(--coral) 28%, transparent)',
  },
  template: {
    bg: 'color-mix(in srgb, var(--sage) 10%, transparent)',
    fg: 'var(--sage)',
    border: 'color-mix(in srgb, var(--sage) 28%, transparent)',
  },
  showcase: {
    bg: 'color-mix(in srgb, var(--violet) 10%, transparent)',
    fg: 'var(--violet)',
    border: 'color-mix(in srgb, var(--violet) 28%, transparent)',
  },
};

function formatDate(iso: string | null | undefined): string {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.valueOf())) return '—';
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
}

function relativeTime(iso: string | null | undefined): string {
  if (!iso) return '';
  const then = new Date(iso).valueOf();
  if (Number.isNaN(then)) return '';
  const diffMs = Date.now() - then;
  const diffDays = Math.floor(diffMs / 86_400_000);
  if (diffDays < 1) return 'today';
  if (diffDays === 1) return 'yesterday';
  if (diffDays < 7) return `${diffDays}d ago`;
  if (diffDays < 30) return `${Math.floor(diffDays / 7)}w ago`;
  if (diffDays < 365) return `${Math.floor(diffDays / 30)}mo ago`;
  return `${Math.floor(diffDays / 365)}y ago`;
}

function compare<T>(a: T, b: T): number {
  if (a == null && b == null) return 0;
  if (a == null) return 1;
  if (b == null) return -1;
  return a < b ? -1 : a > b ? 1 : 0;
}

export default function DecksIndex() {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<SortKey>('lastUpdated');
  const [kindFilter, setKindFilter] = useState<Kind | 'all'>('all');
  const [groupByKind, setGroupByKind] = useState(true);
  const [latestOnly, setLatestOnly] = useState(false);

  const filteredSorted = useMemo(() => {
    const q = search.trim().toLowerCase();
    let result = [...DECKS];

    if (q) {
      result = result.filter((d) => {
        const blob = `${d.id} ${d.title || ''} ${(d as any).subtitle || ''} ${
          d.catalogGit?.versionFamily || ''
        } ${d.catalogGit?.lastCommitSubject || ''}`.toLowerCase();
        return blob.includes(q);
      });
    }
    if (kindFilter !== 'all') {
      result = result.filter((d) => d.catalogGit?.kind === kindFilter);
    }
    if (latestOnly) {
      result = result.filter((d) => d.catalogGit?.isLatestInFamily);
    }

    result.sort((a, b) => {
      const A = a.catalogGit;
      const B = b.catalogGit;
      switch (sortKey) {
        case 'lastUpdated':
          return -compare(A?.lastUpdatedAt, B?.lastUpdatedAt);
        case 'firstCommitted':
          return -compare(A?.firstCommittedAt, B?.firstCommittedAt);
        case 'commitCount':
          return -compare(A?.commitCount ?? 0, B?.commitCount ?? 0);
        case 'name':
          return (a.title || a.id).localeCompare(b.title || b.id);
        case 'family': {
          const fam = (A?.versionFamily || a.id).localeCompare(B?.versionFamily || b.id);
          if (fam !== 0) return fam;
          // Within a family: latest first by lastUpdatedAt desc
          return -compare(A?.lastUpdatedAt, B?.lastUpdatedAt);
        }
      }
    });
    return result;
  }, [search, sortKey, kindFilter, latestOnly]);

  const grouped = useMemo(() => {
    if (!groupByKind) return [{ kind: null as Kind | null, decks: filteredSorted }];
    const byKind: Record<string, typeof DECKS> = {};
    for (const d of filteredSorted) {
      const k = d.catalogGit?.kind || 'presentation';
      (byKind[k] ||= []).push(d);
    }
    return KIND_ORDER.filter((k) => byKind[k]?.length).map((k) => ({
      kind: k,
      decks: byKind[k],
    }));
  }, [filteredSorted, groupByKind]);

  const totals = useMemo(() => {
    const t: Record<string, number> = { all: DECKS.length };
    for (const k of KIND_ORDER) t[k] = 0;
    for (const d of DECKS) {
      const k = d.catalogGit?.kind || 'presentation';
      t[k] = (t[k] || 0) + 1;
    }
    return t;
  }, []);

  return (
    <div className="min-h-screen bg-deck-bg text-deck-ink">
      {/* Header */}
      <header
        className="sticky top-0 z-10 backdrop-blur border-b"
        style={{
          background: 'color-mix(in srgb, var(--bg) 88%, transparent)',
          borderColor: 'var(--cream-hairline)',
        }}
      >
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-5">
          <div className="flex flex-wrap items-baseline justify-between gap-3 mb-4">
            <div>
              <h1 className="deck-display text-2xl sm:text-3xl leading-tight">
                Deck browser
              </h1>
              <div className="deck-mono text-[0.65rem] uppercase tracking-[0.2em] deck-ink-subtle mt-1">
                {filteredSorted.length} of {DECKS.length} ·
                regenerate dates: <code className="px-1">npm run gen:deck-catalog-git</code>
              </div>
            </div>
            <Link
              to="/"
              className="deck-mono text-[0.7rem] uppercase tracking-[0.2em] deck-ink-subtle hover:text-deck-accent transition-colors"
            >
              ← Home
            </Link>
          </div>

          {/* Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Search */}
            <div className="relative flex-1 min-w-[12rem] max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 deck-ink-subtle pointer-events-none" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search id, title, family, commit msg…"
                aria-label="Search decks"
                className="w-full pl-9 pr-8 py-2 rounded-md text-sm bg-deck-surface border focus:outline-none focus:ring-1 focus:ring-deck-accent transition-colors"
                style={{ borderColor: 'var(--cream-hairline)' }}
              />
              {search && (
                <button
                  onClick={() => setSearch('')}
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 deck-ink-subtle hover:text-deck-accent"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>

            {/* Sort */}
            <label className="flex items-center gap-1.5 text-[0.7rem]">
              <span className="deck-mono uppercase tracking-[0.18em] deck-ink-subtle">
                Sort
              </span>
              <select
                value={sortKey}
                onChange={(e) => setSortKey(e.target.value as SortKey)}
                className="bg-deck-surface border rounded px-2 py-1.5 text-sm focus:outline-none focus:ring-1 focus:ring-deck-accent"
                style={{ borderColor: 'var(--cream-hairline)' }}
              >
                <option value="lastUpdated">Last updated</option>
                <option value="firstCommitted">First committed</option>
                <option value="name">Name (A–Z)</option>
                <option value="commitCount">Commit count</option>
                <option value="family">Family + version</option>
              </select>
            </label>

            {/* Group + Latest toggles */}
            <button
              onClick={() => setGroupByKind((v) => !v)}
              aria-pressed={groupByKind}
              className={`deck-mono text-[0.65rem] uppercase tracking-[0.2em] inline-flex items-center gap-1 px-2.5 py-1.5 rounded border transition-colors ${
                groupByKind ? 'text-deck-accent' : 'deck-ink-subtle hover:text-deck-ink'
              }`}
              style={{
                borderColor: groupByKind
                  ? 'color-mix(in srgb, var(--cyan) 50%, transparent)'
                  : 'var(--cream-hairline)',
                background: groupByKind
                  ? 'color-mix(in srgb, var(--cyan) 8%, transparent)'
                  : 'transparent',
              }}
            >
              {groupByKind ? <LayoutGrid className="w-3 h-3" /> : <List className="w-3 h-3" />}
              {groupByKind ? 'Grouped' : 'Flat'}
            </button>

            <button
              onClick={() => setLatestOnly((v) => !v)}
              aria-pressed={latestOnly}
              className={`deck-mono text-[0.65rem] uppercase tracking-[0.2em] inline-flex items-center gap-1 px-2.5 py-1.5 rounded border transition-colors ${
                latestOnly ? 'text-deck-accent' : 'deck-ink-subtle hover:text-deck-ink'
              }`}
              style={{
                borderColor: latestOnly
                  ? 'color-mix(in srgb, var(--amber) 50%, transparent)'
                  : 'var(--cream-hairline)',
                background: latestOnly
                  ? 'color-mix(in srgb, var(--amber) 10%, transparent)'
                  : 'transparent',
              }}
            >
              <Sparkles className="w-3 h-3" />
              Latest only
            </button>
          </div>

          {/* Kind filter chips */}
          <div className="flex flex-wrap gap-1.5 mt-3">
            <KindChip
              active={kindFilter === 'all'}
              onClick={() => setKindFilter('all')}
              label={`All · ${totals.all}`}
            />
            {KIND_ORDER.map((k) =>
              totals[k] > 0 ? (
                <KindChip
                  key={k}
                  kind={k}
                  active={kindFilter === k}
                  onClick={() => setKindFilter(k)}
                  label={`${KIND_LABEL[k]} · ${totals[k]}`}
                />
              ) : null,
            )}
          </div>
        </div>
      </header>

      {/* Body */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {filteredSorted.length === 0 ? (
          <div className="text-center py-16">
            <div className="deck-mono text-xs uppercase tracking-[0.22em] deck-ink-subtle mb-2">
              No matches
            </div>
            <p className="text-sm deck-ink-muted">
              Try clearing search, removing the kind filter, or turning off "Latest only".
            </p>
          </div>
        ) : (
          <AnimatePresence mode="popLayout">
            {grouped.map((group, gi) => (
              <motion.section
                key={group.kind || 'flat'}
                layout
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.35, delay: gi * 0.05, ease: [0.2, 0.8, 0.2, 1] }}
                className="mb-8"
              >
                {group.kind && (
                  <h2 className="deck-mono text-[0.7rem] uppercase tracking-[0.22em] deck-ink-subtle mb-3 flex items-baseline gap-2">
                    <span
                      aria-hidden
                      className="inline-block w-2 h-2 rounded-full"
                      style={{ background: KIND_TONE[group.kind].fg }}
                    />
                    {KIND_LABEL[group.kind]}
                    <span className="deck-ink-subtle/60">· {group.decks.length}</span>
                  </h2>
                )}
                <div className="grid gap-3 sm:gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {group.decks.map((deck, i) => (
                    <DeckIndexCard key={deck.id} deck={deck} index={i} />
                  ))}
                </div>
              </motion.section>
            ))}
          </AnimatePresence>
        )}
      </main>
    </div>
  );
}

/* ───────── Inline subcomponents ───────── */

function KindChip({
  kind,
  active,
  onClick,
  label,
}: {
  kind?: Kind;
  active: boolean;
  onClick: () => void;
  label: string;
}) {
  const tone = kind ? KIND_TONE[kind] : null;
  return (
    <button
      onClick={onClick}
      aria-pressed={active}
      className={`deck-mono text-[0.65rem] uppercase tracking-[0.2em] px-2.5 py-1 rounded-full border transition-colors ${
        active ? '' : 'deck-ink-subtle hover:text-deck-ink'
      }`}
      style={{
        borderColor: active
          ? tone?.border || 'color-mix(in srgb, var(--cream) 35%, transparent)'
          : 'var(--cream-hairline)',
        background: active
          ? tone?.bg || 'color-mix(in srgb, var(--cream) 8%, transparent)'
          : 'transparent',
        color: active ? tone?.fg || 'var(--cream)' : undefined,
      }}
    >
      {label}
    </button>
  );
}

function DeckIndexCard({ deck, index }: { deck: (typeof DECKS)[number]; index: number }) {
  const meta = deck.catalogGit;
  const tone = meta ? KIND_TONE[meta.kind] : KIND_TONE.presentation;
  const isLatest = !!meta?.isLatestInFamily;
  const slideCount = (deck as any).slides?.length ?? 0;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8, scale: 0.98 }}
      transition={{ duration: 0.45, delay: index * 0.04, ease: [0.2, 0.8, 0.2, 1] }}
      className="group relative rounded-xl border bg-deck-surface hover:bg-deck-surface-elevated transition-colors overflow-hidden flex flex-col"
      style={{ borderColor: 'var(--cream-hairline)' }}
    >
      {isLatest && (
        <div
          aria-label="Latest in family"
          title="Most recently updated in this version family"
          className="absolute top-3 right-3 z-10 deck-mono text-[0.55rem] uppercase tracking-[0.22em] px-2 py-0.5 rounded-full border inline-flex items-center gap-1"
          style={{
            background: 'color-mix(in srgb, var(--amber) 14%, transparent)',
            borderColor: 'color-mix(in srgb, var(--amber) 40%, transparent)',
            color: 'var(--amber)',
          }}
        >
          <Sparkles className="w-2.5 h-2.5" />
          Latest
        </div>
      )}

      <Link to={`/decks/${deck.id}`} className="block p-4 sm:p-5 flex-1">
        {/* Eyebrow row: kind + version label */}
        <div className="flex items-center gap-2 mb-3">
          {meta && (
            <span
              className="deck-mono text-[0.55rem] uppercase tracking-[0.22em] px-1.5 py-0.5 rounded"
              style={{ background: tone.bg, color: tone.fg, border: `1px solid ${tone.border}` }}
            >
              {meta.kind}
            </span>
          )}
          {meta?.versionLabel && (
            <span className="deck-mono text-[0.6rem] uppercase tracking-[0.2em] deck-ink-subtle">
              {meta.versionLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="deck-display text-lg sm:text-xl leading-tight pr-12">{deck.title}</h3>

        {(deck as any).subtitle && (
          <p className="mt-1.5 text-xs sm:text-sm deck-ink-muted line-clamp-2">
            {(deck as any).subtitle}
          </p>
        )}

        {/* Last commit subject — gives "what's the latest change" context */}
        {meta?.lastCommitSubject && (
          <p className="mt-2 text-[0.65rem] deck-ink-subtle line-clamp-2 italic">
            {meta.lastCommitSubject}
          </p>
        )}
      </Link>

      {/* Footer meta row */}
      <div
        className="px-4 sm:px-5 py-2.5 border-t flex items-center justify-between gap-3 deck-mono text-[0.6rem] uppercase tracking-[0.18em] deck-ink-subtle"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <div className="flex items-center gap-3 min-w-0">
          <span className="inline-flex items-center gap-1" title={`Last updated ${formatDate(meta?.lastUpdatedAt)}`}>
            <Calendar className="w-2.5 h-2.5" />
            {relativeTime(meta?.lastUpdatedAt) || '—'}
          </span>
          <span className="inline-flex items-center gap-1" title="Commits touching this deck folder">
            <GitCommit className="w-2.5 h-2.5" />
            {meta?.commitCount ?? 0}
          </span>
          {slideCount > 0 && <span>{slideCount} slides</span>}
        </div>
        <ArrowUpRight className="w-3.5 h-3.5 group-hover:text-deck-accent transition-colors shrink-0" />
      </div>
    </motion.div>
  );
}
