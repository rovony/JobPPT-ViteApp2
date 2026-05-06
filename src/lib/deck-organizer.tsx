import { createContext, useContext, useReducer, useEffect, useCallback, useMemo } from 'react';

const STORAGE_KEY = 'deck-studio-organizer';

/**
 * Parse deck creation time: Postgres row (`createdAt` / `created_at`) wins for dossiers;
 * built-in manifests use `catalogGitFirstCommittedAt` from git history (see deck-catalog-git.json).
 */
export function getDeckCreatedMs(deck: {
  createdAt?: string | Date | null;
  created_at?: string | null;
  catalogGitFirstCommittedAt?: string | null;
}) {
  const raw = deck?.createdAt ?? deck?.created_at ?? deck?.catalogGitFirstCommittedAt;
  if (raw == null || raw === '') return null;
  const ms = new Date(raw as string | Date).getTime();
  return Number.isFinite(ms) ? ms : null;
}

/** Locale date+time for studio list, or null when unknown (e.g. built-in manifests with no stamp). */
export function formatDeckCreatedLabel(deck: Parameters<typeof getDeckCreatedMs>[0]) {
  const ms = getDeckCreatedMs(deck);
  if (ms == null) return null;
  try {
    return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(new Date(ms));
  } catch {
    return null;
  }
}

/** One line for cards/list: Postgres dossiers → "Created …"; manifests → "Repo since …" (git catalog). */
export function formatDeckStudioCreatedLine(deck: Parameters<typeof getDeckCreatedMs>[0]) {
  const when = formatDeckCreatedLabel(deck);
  if (!when) return null;
  const fromPg = !!(deck && (deck.createdAt ?? deck.created_at));
  return `${fromPg ? 'Created' : 'Repo since'} ${when}`;
}

/* ================================================================
   Default folders — always present, cannot be deleted
   ================================================================ */
const SYSTEM_FOLDERS = [
  // 'delivered' = decks that were actually delivered live to an audience
  { id: 'delivered', label: 'Delivered',   icon: 'check',       system: true, order: 0 },
  // 'live' = my talks (presentations + sections), delivered or not
  { id: 'live',     label: 'Talks',        icon: 'mic',         system: true, order: 1 },
  { id: 'templates', label: 'Templates & Showcases', icon: 'layoutGrid', system: true, order: 2 },
  { id: 'all',      label: 'All',          icon: 'layers',      system: true, order: 3 },
  { id: 'favorites', label: 'Favorites',   icon: 'star',        system: true, order: 4 },
  { id: 'archive',  label: 'Archive',      icon: 'archive',     system: true, order: 5 },
];

/* ================================================================
   Initial state factory
   ================================================================ */
function createInitialState() {
  return {
    folders: [...SYSTEM_FOLDERS],
    tags: [],
    deckMeta: {},
    activeFolder: 'delivered',
    activeTags: [],
    sortBy: 'lastUpdated',
    sortDir: 'desc',
    searchQuery: '',
    viewMode: 'grid',
  };
}

/* ================================================================
   Reducer
   ================================================================ */
function reducer(state, action) {
  switch (action.type) {
    /* ── Folders ── */
    case 'ADD_FOLDER': {
      const id = `folder-${Date.now()}`;
      const order = state.folders.length;
      return {
        ...state,
        folders: [...state.folders, { id, label: action.label, icon: action.icon || 'folder', system: false, order, parentId: action.parentId || null }],
      };
    }
    case 'RENAME_FOLDER': {
      return {
        ...state,
        folders: state.folders.map((f) =>
          f.id === action.id && !f.system ? { ...f, label: action.label } : f
        ),
      };
    }
    case 'DELETE_FOLDER': {
      if (state.folders.find((f) => f.id === action.id)?.system) return state;
      const updated = { ...state.deckMeta };
      for (const key of Object.keys(updated)) {
        if (updated[key].folderId === action.id) {
          updated[key] = { ...updated[key], folderId: null };
        }
      }
      return {
        ...state,
        folders: state.folders.filter((f) => f.id !== action.id),
        deckMeta: updated,
        activeFolder: state.activeFolder === action.id ? 'all' : state.activeFolder,
      };
    }
    case 'REORDER_FOLDERS': {
      return { ...state, folders: action.folders };
    }

    /* ── Tags ── */
    case 'CREATE_TAG': {
      if (state.tags.some((t) => t.label.toLowerCase() === action.label.toLowerCase())) return state;
      return {
        ...state,
        tags: [...state.tags, { id: `tag-${Date.now()}`, label: action.label, color: action.color || 'var(--cream-muted)' }],
      };
    }
    case 'DELETE_TAG': {
      const updated = { ...state.deckMeta };
      for (const key of Object.keys(updated)) {
        if (updated[key].tagIds?.includes(action.id)) {
          updated[key] = { ...updated[key], tagIds: updated[key].tagIds.filter((t) => t !== action.id) };
        }
      }
      return {
        ...state,
        tags: state.tags.filter((t) => t.id !== action.id),
        activeTags: state.activeTags.filter((t) => t !== action.id),
        deckMeta: updated,
      };
    }
    case 'RENAME_TAG': {
      return {
        ...state,
        tags: state.tags.map((t) => (t.id === action.id ? { ...t, label: action.label } : t)),
      };
    }

    /* ── Deck display overrides (title, subtitle, description) ── */
    case 'UPDATE_DECK_INFO': {
      const prev = state.deckMeta[action.deckId] || {};
      const overrides = { ...prev.overrides };
      if (action.title !== undefined) overrides.title = action.title || null;
      if (action.subtitle !== undefined) overrides.subtitle = action.subtitle || null;
      if (action.description !== undefined) overrides.description = action.description || null;
      return {
        ...state,
        deckMeta: {
          ...state.deckMeta,
          [action.deckId]: { ...prev, overrides },
        },
      };
    }
    case 'RESET_DECK_INFO': {
      const prev = state.deckMeta[action.deckId] || {};
      const { overrides, ...rest } = prev;
      return {
        ...state,
        deckMeta: { ...state.deckMeta, [action.deckId]: rest },
      };
    }

    /* ── Deck metadata (folder assignment, tags, favorite, archive) ── */
    case 'SET_DECK_FOLDER': {
      return {
        ...state,
        deckMeta: {
          ...state.deckMeta,
          [action.deckId]: { ...state.deckMeta[action.deckId], folderId: action.folderId },
        },
      };
    }
    case 'TOGGLE_DECK_TAG': {
      const existing = state.deckMeta[action.deckId]?.tagIds || [];
      const tagIds = existing.includes(action.tagId)
        ? existing.filter((t) => t !== action.tagId)
        : [...existing, action.tagId];
      return {
        ...state,
        deckMeta: {
          ...state.deckMeta,
          [action.deckId]: { ...state.deckMeta[action.deckId], tagIds },
        },
      };
    }
    case 'TOGGLE_FAVORITE': {
      const current = state.deckMeta[action.deckId]?.favorite || false;
      return {
        ...state,
        deckMeta: {
          ...state.deckMeta,
          [action.deckId]: { ...state.deckMeta[action.deckId], favorite: !current },
        },
      };
    }
    case 'TOGGLE_ARCHIVE': {
      const current = state.deckMeta[action.deckId]?.archived || false;
      return {
        ...state,
        deckMeta: {
          ...state.deckMeta,
          [action.deckId]: {
            ...state.deckMeta[action.deckId],
            archived: !current,
            archivedAt: !current ? Date.now() : null,
          },
        },
      };
    }

    /* ── View state ── */
    case 'SET_ACTIVE_FOLDER':
      return { ...state, activeFolder: action.id };
    case 'TOGGLE_ACTIVE_TAG': {
      const active = state.activeTags.includes(action.id)
        ? state.activeTags.filter((t) => t !== action.id)
        : [...state.activeTags, action.id];
      return { ...state, activeTags: active };
    }
    case 'CLEAR_ACTIVE_TAGS':
      return { ...state, activeTags: [] };
    case 'SET_SORT':
      return { ...state, sortBy: action.sortBy, sortDir: action.sortDir || state.sortDir };
    case 'TOGGLE_SORT_DIR':
      return { ...state, sortDir: state.sortDir === 'asc' ? 'desc' : 'asc' };
    case 'SET_SEARCH':
      return { ...state, searchQuery: action.query };
    case 'SET_VIEW_MODE':
      return { ...state, viewMode: action.mode };

    /* ── Hydrate from storage ── */
    case 'HYDRATE':
      return { ...state, ...action.payload };

    default:
      return state;
  }
}

/* ================================================================
   Context + Provider
   ================================================================ */
const OrganizerContext = createContext<any>(null);

export function OrganizerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, null, createInitialState);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        const merged = {
          ...saved,
          folders: [
            ...SYSTEM_FOLDERS,
            ...(saved.folders || []).filter((f) => !f.system),
          ],
        };
        dispatch({ type: 'HYDRATE', payload: merged });
      }
    } catch { /* ignore corrupt storage */ }
  }, []);

  useEffect(() => {
    try {
      const { folders, tags, deckMeta, activeFolder, activeTags, sortBy, sortDir, searchQuery, viewMode } = state;
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        folders: folders.filter((f) => !f.system),
        tags, deckMeta, activeFolder, activeTags, sortBy, sortDir, searchQuery, viewMode,
      }));
    } catch { /* storage full */ }
  }, [state]);

  return (
    <OrganizerContext.Provider value={{ state, dispatch }}>
      {children}
    </OrganizerContext.Provider>
  );
}

export function useOrganizer() {
  const ctx = useContext(OrganizerContext);
  if (!ctx) throw new Error('useOrganizer must be used within OrganizerProvider');
  return ctx;
}

/* ================================================================
   Derived data hook — filtered + sorted deck list
   ================================================================ */
export function useFilteredDecks(allDecks) {
  const { state } = useOrganizer();
  const { activeFolder, activeTags, sortBy, sortDir, searchQuery, deckMeta } = state;

  return useMemo(() => {
    let filtered = [...allDecks];

    // Helper — does a deck represent a real talk (presentation or section) vs. a template/showcase?
    const isTemplateOrShowcase = (d: any) => {
      const k = d.audience?.kind || d.catalogGit?.kind;
      return k === 'template' || k === 'showcase';
    };
    const isLiveTalk = (d: any) => !isTemplateOrShowcase(d);

    if (activeFolder === 'favorites') {
      filtered = filtered.filter((d) => deckMeta[d.id]?.favorite);
    } else if (activeFolder === 'archive') {
      filtered = filtered.filter((d) => deckMeta[d.id]?.archived);
    } else if (activeFolder === 'delivered') {
      filtered = filtered.filter((d: any) => !!d.audience?.deliveredAt);
    } else if (activeFolder === 'live') {
      filtered = filtered.filter(isLiveTalk);
    } else if (activeFolder === 'templates') {
      filtered = filtered.filter(isTemplateOrShowcase);
    } else if (activeFolder !== 'all') {
      filtered = filtered.filter((d) => deckMeta[d.id]?.folderId === activeFolder);
    }

    if (activeFolder !== 'archive') {
      filtered = filtered.filter((d) => !deckMeta[d.id]?.archived);
    }

    if (activeTags.length > 0) {
      filtered = filtered.filter((d) => {
        const dt = deckMeta[d.id]?.tagIds || [];
        return activeTags.every((t) => dt.includes(t));
      });
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      filtered = filtered.filter((d) => {
        const ov = deckMeta[d.id]?.overrides || {};
        const title = (ov.title || d.title).toLowerCase();
        const subtitle = (ov.subtitle || d.subtitle || '').toLowerCase();
        const desc = (ov.description || '').toLowerCase();
        return (
          title.includes(q) ||
          subtitle.includes(q) ||
          desc.includes(q) ||
          d.theme?.toLowerCase().includes(q) ||
          d.id.toLowerCase().includes(q)
        );
      });
    }

    filtered.sort((a, b) => {
      if (sortBy === 'created') {
        const aMs = getDeckCreatedMs(a);
        const bMs = getDeckCreatedMs(b);
        const aUnknown = aMs == null;
        const bUnknown = bMs == null;
        const aTitle = deckMeta[a.id]?.overrides?.title || a.title;
        const bTitle = deckMeta[b.id]?.overrides?.title || b.title;
        if (aUnknown && bUnknown) {
          const t = aTitle.localeCompare(bTitle);
          return sortDir === 'desc' ? -t : t;
        }
        if (aUnknown) return 1;
        if (bUnknown) return -1;
        const diff = aMs - bMs;
        if (diff !== 0) return sortDir === 'desc' ? -diff : diff;
        const t = aTitle.localeCompare(bTitle);
        return sortDir === 'desc' ? -t : t;
      }

      let cmp = 0;
      switch (sortBy) {
        case 'title': {
          const aTitle = deckMeta[a.id]?.overrides?.title || a.title;
          const bTitle = deckMeta[b.id]?.overrides?.title || b.title;
          cmp = aTitle.localeCompare(bTitle);
          break;
        }
        case 'slides': cmp = a.slides.length - b.slides.length; break;
        case 'theme': cmp = (a.theme || '').localeCompare(b.theme || ''); break;
        case 'recent': {
          const aTime = deckMeta[a.id]?.archivedAt || 0;
          const bTime = deckMeta[b.id]?.archivedAt || 0;
          cmp = bTime - aTime;
          break;
        }
        case 'lastUpdated': {
          // Latest-in-family bubbles up first within same date band; missing metadata sinks.
          const aLatest = a.catalogGit?.isLatestInFamily ? 1 : 0;
          const bLatest = b.catalogGit?.isLatestInFamily ? 1 : 0;
          if (aLatest !== bLatest) { cmp = aLatest - bLatest; break; }
          const aIso = a.catalogGit?.lastUpdatedAt || '';
          const bIso = b.catalogGit?.lastUpdatedAt || '';
          if (!aIso && !bIso) { cmp = 0; break; }
          if (!aIso) return 1;
          if (!bIso) return -1;
          cmp = aIso.localeCompare(bIso);
          break;
        }
        case 'commitCount': {
          cmp = (a.catalogGit?.commitCount ?? 0) - (b.catalogGit?.commitCount ?? 0);
          break;
        }
        default: cmp = 0;
      }
      return sortDir === 'desc' ? -cmp : cmp;
    });

    return filtered;
  }, [allDecks, activeFolder, activeTags, sortBy, sortDir, searchQuery, deckMeta]);
}

/* ================================================================
   Merge manifest data with user overrides for display
   ================================================================ */
export function useDeckDisplay(deck) {
  const { state } = useOrganizer();
  const overrides = state.deckMeta[deck.id]?.overrides || {};
  return useMemo(() => ({
    title: overrides.title || deck.title,
    subtitle: overrides.subtitle !== undefined ? (overrides.subtitle || '') : (deck.subtitle || ''),
    description: overrides.description || '',
    hasOverrides: !!(overrides.title || overrides.subtitle || overrides.description),
  }), [deck.id, deck.title, deck.subtitle, overrides.title, overrides.subtitle, overrides.description]);
}
