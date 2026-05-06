import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUpRight, Layers, Sparkles, FolderOpen, BarChart3, FlaskConical,
  Search, ChevronDown, Star, Archive, FolderPlus, Tag, X, Check,
  LayoutGrid, LayoutList, ArrowUpDown, Plus, Trash2, Pencil, ArchiveRestore, Folder, ChevronRight,
  SlidersHorizontal, Hash, Share2, LogOut, User,
} from 'lucide-react';
import { DECKS } from '@/decks/registry';
import DeckSourcesDialog from '@/components/deck/DeckSourcesDialog';
import ShareLinkModal from '@/components/deck/ShareLinkModal';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from '@/lib/ThemeContext';
import { useAuth } from '@/lib/AuthContext';
import { useOrganizer, useFilteredDecks, useDeckDisplay, formatDeckStudioCreatedLine } from '@/lib/deck-organizer';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';

/* ================================================================
   MonoChip — reusable uppercase pill (kept for backward compat)
   ================================================================ */
export function MonoChip({ as: As = 'span' as any, size = 'md', className = '', children, ...props }: any) {
  const sizeClass =
    size === 'sm'
      ? 'text-[0.58rem] px-2.5 py-1'
      : 'text-[0.62rem] px-3 py-1.5';
  return (
    <As
      className={`deck-mono uppercase inline-flex items-center gap-1.5 rounded-full border transition-colors hover:bg-[var(--cream-ghost)] ${sizeClass} ${className}`}
      style={{
        borderColor: 'var(--cream-hairline)',
        color: 'var(--cream-muted)',
        letterSpacing: 'var(--ls-mono)',
      }}
      {...props}
    >
      {children}
    </As>
  );
}

/* ================================================================
   Icon map for folder icons
   ================================================================ */
const FOLDER_ICONS = {
  layers: Layers,
  star: Star,
  archive: Archive,
  folder: Folder,
  tag: Tag,
  flask: FlaskConical,
};

/* ================================================================
   Tag color presets
   ================================================================ */
const TAG_COLORS = [
  { id: 'coral', value: '#f87171', label: 'Coral' },
  { id: 'amber', value: '#fbbf24', label: 'Amber' },
  { id: 'emerald', value: '#34d399', label: 'Emerald' },
  { id: 'cyan', value: '#22d3ee', label: 'Cyan' },
  { id: 'violet', value: '#a78bfa', label: 'Violet' },
  { id: 'pink', value: '#f472b6', label: 'Pink' },
  { id: 'slate', value: '#94a3b8', label: 'Slate' },
];

/* ================================================================
   SORT OPTIONS
   ================================================================ */
const SORT_OPTIONS = [
  { value: 'lastUpdated', label: 'Last updated (git)' },
  { value: 'commitCount', label: 'Commit activity' },
  { value: 'title', label: 'Name' },
  { value: 'created', label: 'Date created' },
  { value: 'slides', label: 'Slide count' },
  { value: 'theme', label: 'Theme' },
];

/* ================================================================
   Sidebar – Folder navigation
   ================================================================ */
function Sidebar({ collapsed }) {
  const { state, dispatch } = useOrganizer();
  const [adding, setAdding] = useState(false);
  const [newName, setNewName] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editName, setEditName] = useState('');
  const inputRef = useRef(null);
  const editRef = useRef(null);

  useEffect(() => { if (adding && inputRef.current) inputRef.current.focus(); }, [adding]);
  useEffect(() => { if (editingId && editRef.current) editRef.current.focus(); }, [editingId]);

  const handleAdd = () => {
    const label = newName.trim();
    if (!label) { setAdding(false); return; }
    dispatch({ type: 'CREATE_TAG', label: `_folder_${label}` }); // just use ADD_FOLDER
    dispatch({ type: 'ADD_FOLDER', label });
    setNewName('');
    setAdding(false);
  };

  const handleRename = (id) => {
    const label = editName.trim();
    if (label) dispatch({ type: 'RENAME_FOLDER', id, label });
    setEditingId(null);
    setEditName('');
  };

  const userFolders = state.folders.filter((f) => !f.system);

  return (
    <nav
      className="flex flex-col gap-1 min-w-0"
      style={{ opacity: collapsed ? 0 : 1, transition: 'opacity 0.2s' }}
    >
      <div className="deck-mono text-[0.58rem] uppercase tracking-[0.22em] deck-ink-subtle mb-2 px-2">
        Folders
      </div>

      {state.folders.filter((f) => f.system).map((f) => {
        const Icon = FOLDER_ICONS[f.icon] || Folder;
        const isActive = state.activeFolder === f.id;
        return (
          <button
            key={f.id}
            onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', id: f.id })}
            className={`flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-sm transition-colors w-full ${
              isActive
                ? 'bg-deck-accent/15 text-deck-accent'
                : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
            }`}
          >
            <Icon className="w-3.5 h-3.5 shrink-0" />
            <span className="truncate">{f.label}</span>
            {f.id === 'all' && (
              <span className="ml-auto deck-mono text-[0.55rem] deck-ink-subtle">{DECKS.filter(d => {
                const meta = state.deckMeta[d.id];
                return !meta?.archived;
              }).length}</span>
            )}
            {f.id === 'archive' && (
              <span className="ml-auto deck-mono text-[0.55rem] deck-ink-subtle">{DECKS.filter(d => state.deckMeta[d.id]?.archived).length}</span>
            )}
            {f.id === 'favorites' && (
              <span className="ml-auto deck-mono text-[0.55rem] deck-ink-subtle">{DECKS.filter(d => state.deckMeta[d.id]?.favorite).length}</span>
            )}
          </button>
        );
      })}

      {/* Discoverability link to the dedicated git-aware deck browser */}
      <Link
        to="/decks"
        className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-sm deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink transition-colors w-full mt-1"
        title="Sort, filter, and group decks by git-derived metadata"
      >
        <Sparkles className="w-3.5 h-3.5 shrink-0" />
        <span className="truncate">Browse · sort · group</span>
        <span className="ml-auto deck-mono text-[0.55rem] deck-ink-subtle">→</span>
      </Link>

      {userFolders.length > 0 && (
        <div className="mt-3 mb-1 deck-mono text-[0.58rem] uppercase tracking-[0.22em] deck-ink-subtle px-2 flex items-center justify-between">
          Custom
        </div>
      )}

      {userFolders.map((f) => {
        const Icon = FOLDER_ICONS[f.icon] || Folder;
        const isActive = state.activeFolder === f.id;
        const count = DECKS.filter(d => state.deckMeta[d.id]?.folderId === f.id && !state.deckMeta[d.id]?.archived).length;

        if (editingId === f.id) {
          return (
            <div key={f.id} className="flex items-center gap-1 px-1">
              <input
                ref={editRef}
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleRename(f.id);
                  if (e.key === 'Escape') setEditingId(null);
                }}
                onBlur={() => handleRename(f.id)}
                className="flex-1 px-2 py-1 rounded bg-transparent border text-sm deck-ink"
                style={{ borderColor: 'var(--cream-hairline)' }}
              />
            </div>
          );
        }

        return (
          <div key={f.id} className="group flex items-center">
            <button
              onClick={() => dispatch({ type: 'SET_ACTIVE_FOLDER', id: f.id })}
              className={`flex-1 flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-left text-sm transition-colors ${
                isActive
                  ? 'bg-deck-accent/15 text-deck-accent'
                  : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
              }`}
            >
              <Icon className="w-3.5 h-3.5 shrink-0" />
              <span className="truncate">{f.label}</span>
              <span className="ml-auto deck-mono text-[0.55rem] deck-ink-subtle">{count}</span>
            </button>
            <div className="hidden group-hover:flex items-center gap-0.5 pr-1">
              <button
                onClick={() => { setEditingId(f.id); setEditName(f.label); }}
                className="p-0.5 rounded deck-ink-subtle hover:text-deck-ink"
                title="Rename"
              >
                <Pencil className="w-3 h-3" />
              </button>
              <button
                onClick={() => dispatch({ type: 'DELETE_FOLDER', id: f.id })}
                className="p-0.5 rounded deck-ink-subtle hover:text-red-400"
                title="Delete"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          </div>
        );
      })}

      {adding ? (
        <div className="flex items-center gap-1 px-1 mt-1">
          <input
            ref={inputRef}
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleAdd();
              if (e.key === 'Escape') { setAdding(false); setNewName(''); }
            }}
            onBlur={handleAdd}
            placeholder="Folder name…"
            className="flex-1 px-2 py-1 rounded bg-transparent border text-sm deck-ink placeholder:deck-ink-subtle"
            style={{ borderColor: 'var(--cream-hairline)' }}
          />
        </div>
      ) : (
        <button
          onClick={() => setAdding(true)}
          className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm deck-ink-subtle hover:text-deck-ink hover:bg-[var(--cream-ghost)] transition-colors mt-1"
        >
          <FolderPlus className="w-3.5 h-3.5" />
          <span>New folder</span>
        </button>
      )}
    </nav>
  );
}

/* ================================================================
   Tag manager / chips bar
   ================================================================ */
function TagBar() {
  const { state, dispatch } = useOrganizer();
  const [creating, setCreating] = useState(false);
  const [newLabel, setNewLabel] = useState('');
  const [newColor, setNewColor] = useState(TAG_COLORS[0].value);
  const inputRef = useRef(null);

  useEffect(() => { if (creating && inputRef.current) inputRef.current.focus(); }, [creating]);

  const handleCreate = () => {
    const label = newLabel.trim();
    if (!label) { setCreating(false); return; }
    dispatch({ type: 'CREATE_TAG', label, color: newColor });
    setNewLabel('');
    setCreating(false);
  };

  if (state.tags.length === 0 && !creating) {
    return (
      <button
        onClick={() => setCreating(true)}
        className="inline-flex items-center gap-1.5 text-xs deck-ink-subtle hover:text-deck-ink transition-colors"
      >
        <Plus className="w-3 h-3" /> Add tag
      </button>
    );
  }

  return (
    <div className="flex flex-wrap items-center gap-1.5">
      {state.tags.map((tag) => {
        const isActive = state.activeTags.includes(tag.id);
        return (
          <button
            key={tag.id}
            onClick={() => dispatch({ type: 'TOGGLE_ACTIVE_TAG', id: tag.id })}
            className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs transition-all border ${
              isActive
                ? 'border-current shadow-sm'
                : 'border-transparent hover:border-[var(--cream-hairline)]'
            }`}
            style={{ color: tag.color }}
          >
            <Hash className="w-2.5 h-2.5" />
            {tag.label}
            {isActive && (
              <X className="w-2.5 h-2.5 ml-0.5 opacity-60" />
            )}
          </button>
        );
      })}

      {state.activeTags.length > 0 && (
        <button
          onClick={() => dispatch({ type: 'CLEAR_ACTIVE_TAGS' })}
          className="text-[0.6rem] deck-mono uppercase deck-ink-subtle hover:text-deck-ink px-1.5"
        >
          Clear
        </button>
      )}

      {creating ? (
        <div className="inline-flex items-center gap-1.5 border rounded-full px-2 py-0.5" style={{ borderColor: newColor }}>
          <div className="flex items-center gap-1">
            {TAG_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => setNewColor(c.value)}
                className="w-3 h-3 rounded-full border border-transparent transition-transform"
                style={{
                  backgroundColor: c.value,
                  transform: newColor === c.value ? 'scale(1.3)' : 'scale(1)',
                  borderColor: newColor === c.value ? 'var(--cream)' : 'transparent',
                }}
              />
            ))}
          </div>
          <input
            ref={inputRef}
            value={newLabel}
            onChange={(e) => setNewLabel(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleCreate();
              if (e.key === 'Escape') { setCreating(false); setNewLabel(''); }
            }}
            onBlur={handleCreate}
            placeholder="Tag…"
            className="bg-transparent text-xs w-16 outline-none deck-ink"
          />
        </div>
      ) : (
        <button
          onClick={() => setCreating(true)}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs deck-ink-subtle hover:text-deck-ink hover:bg-[var(--cream-ghost)] transition-colors border border-dashed"
          style={{ borderColor: 'var(--cream-hairline)' }}
        >
          <Plus className="w-2.5 h-2.5" />
        </button>
      )}
    </div>
  );
}

/* ================================================================
   Sort + View controls
   ================================================================ */
function SortControls() {
  const { state, dispatch } = useOrganizer();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const currentLabel = SORT_OPTIONS.find((o) => o.value === state.sortBy)?.label || 'Sort';

  return (
    <div className="flex items-center gap-2">
      {/* Sort dropdown */}
      <div ref={ref} className="relative">
        <button
          onClick={() => setOpen(!open)}
          className="inline-flex items-center gap-1.5 text-xs deck-ink-muted hover:text-deck-ink transition-colors deck-mono uppercase"
          style={{ letterSpacing: 'var(--ls-mono)' }}
        >
          <ArrowUpDown className="w-3 h-3" />
          {currentLabel}
          <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="absolute right-0 mt-2 w-36 rounded-lg border bg-deck-surface shadow-lg z-50 overflow-hidden"
              style={{ borderColor: 'var(--cream-hairline)' }}
            >
                  {SORT_OPTIONS.map((opt) => (
                <button
                  key={opt.value}
                  onClick={() => {
                    if (state.sortBy === opt.value) {
                      dispatch({ type: 'TOGGLE_SORT_DIR' });
                    } else {
                      const defaultDir = opt.value === 'created' ? 'desc' : 'asc';
                      dispatch({ type: 'SET_SORT', sortBy: opt.value, sortDir: defaultDir });
                    }
                    setOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs transition-colors flex items-center justify-between ${
                    state.sortBy === opt.value
                      ? 'text-deck-accent bg-deck-accent/10'
                      : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
                  }`}
                >
                  {opt.label}
                  {state.sortBy === opt.value && (
                    <span className="text-[0.55rem] deck-mono">
                      {opt.value === 'created'
                        ? (state.sortDir === 'asc' ? 'Oldest' : 'Newest')
                        : (state.sortDir === 'asc' ? 'A→Z' : 'Z→A')}
                    </span>
                  )}
                </button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* View mode toggle */}
      <div className="flex items-center border rounded-lg overflow-hidden" style={{ borderColor: 'var(--cream-hairline)' }}>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', mode: 'grid' })}
          className={`p-1.5 transition-colors ${state.viewMode === 'grid' ? 'text-deck-accent bg-deck-accent/10' : 'deck-ink-subtle hover:text-deck-ink'}`}
          title="Grid view"
        >
          <LayoutGrid className="w-3.5 h-3.5" />
        </button>
        <button
          onClick={() => dispatch({ type: 'SET_VIEW_MODE', mode: 'list' })}
          className={`p-1.5 transition-colors ${state.viewMode === 'list' ? 'text-deck-accent bg-deck-accent/10' : 'deck-ink-subtle hover:text-deck-ink'}`}
          title="List view"
        >
          <LayoutList className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}

/* ================================================================
   Search bar
   ================================================================ */
function SearchBar() {
  const { state, dispatch } = useOrganizer();
  return (
    <div
      className="flex items-center gap-2 border rounded-lg px-3 py-1.5 transition-colors focus-within:border-deck-accent"
      style={{ borderColor: 'var(--cream-hairline)' }}
    >
      <Search className="w-3.5 h-3.5 deck-ink-subtle shrink-0" />
      <input
        type="text"
        value={state.searchQuery}
        onChange={(e) => dispatch({ type: 'SET_SEARCH', query: e.target.value })}
        placeholder="Search decks…"
        className="bg-transparent text-sm outline-none deck-ink flex-1 min-w-0 placeholder:deck-ink-subtle"
      />
      {state.searchQuery && (
        <button
          onClick={() => dispatch({ type: 'SET_SEARCH', query: '' })}
          className="deck-ink-subtle hover:text-deck-ink"
        >
          <X className="w-3 h-3" />
        </button>
      )}
    </div>
  );
}

/* ================================================================
   Deck context menu (move to folder, tag, fav, archive)
   ================================================================ */
function DeckContextMenu({ deck, position, onClose, onEdit }) {
  const { state, dispatch } = useOrganizer();
  const ref = useRef(null);
  const meta = state.deckMeta[deck.id] || {};

  useEffect(() => {
    const handler = (e) => { if (!ref.current?.contains(e.target)) onClose(); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [onClose]);

  const userFolders = state.folders.filter((f) => !f.system);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="fixed z-[100] w-52 rounded-xl border bg-deck-surface shadow-2xl overflow-hidden"
      style={{
        borderColor: 'var(--cream-hairline)',
        top: position.y,
        left: position.x,
      }}
    >
      {/* Edit */}
      <button
        onClick={() => { onEdit?.(); }}
        className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink transition-colors"
      >
        <Pencil className="w-3.5 h-3.5" />
        Edit title & subtitle
      </button>

      {/* Favorite */}
      <button
        onClick={() => { dispatch({ type: 'TOGGLE_FAVORITE', deckId: deck.id }); onClose(); }}
        className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink transition-colors"
      >
        <Star className={`w-3.5 h-3.5 ${meta.favorite ? 'fill-amber-400 text-amber-400' : ''}`} />
        {meta.favorite ? 'Remove from favorites' : 'Add to favorites'}
      </button>

      {/* Archive */}
      <button
        onClick={() => { dispatch({ type: 'TOGGLE_ARCHIVE', deckId: deck.id }); onClose(); }}
        className="w-full text-left px-3 py-2 text-xs flex items-center gap-2 deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink transition-colors"
      >
        {meta.archived ? <ArchiveRestore className="w-3.5 h-3.5" /> : <Archive className="w-3.5 h-3.5" />}
        {meta.archived ? 'Restore from archive' : 'Move to archive'}
      </button>

      {/* Divider */}
      <div className="border-t my-0.5" style={{ borderColor: 'var(--cream-hairline)' }} />

      {/* Move to folder */}
      <div className="px-3 py-1.5 text-[0.55rem] deck-mono uppercase deck-ink-subtle tracking-wider">
        Move to folder
      </div>
      <button
        onClick={() => { dispatch({ type: 'SET_DECK_FOLDER', deckId: deck.id, folderId: null }); onClose(); }}
        className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors ${
          !meta.folderId ? 'text-deck-accent' : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
        }`}
      >
        <Layers className="w-3 h-3" /> None
        {!meta.folderId && <Check className="w-3 h-3 ml-auto" />}
      </button>
      {userFolders.map((f) => (
        <button
          key={f.id}
          onClick={() => { dispatch({ type: 'SET_DECK_FOLDER', deckId: deck.id, folderId: f.id }); onClose(); }}
          className={`w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 transition-colors ${
            meta.folderId === f.id ? 'text-deck-accent' : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
          }`}
        >
          <Folder className="w-3 h-3" /> {f.label}
          {meta.folderId === f.id && <Check className="w-3 h-3 ml-auto" />}
        </button>
      ))}

      {/* Divider */}
      {state.tags.length > 0 && (
        <>
          <div className="border-t my-0.5" style={{ borderColor: 'var(--cream-hairline)' }} />
          <div className="px-3 py-1.5 text-[0.55rem] deck-mono uppercase deck-ink-subtle tracking-wider">
            Tags
          </div>
          {state.tags.map((tag) => {
            const hasTag = (meta.tagIds || []).includes(tag.id);
            return (
              <button
                key={tag.id}
                onClick={() => dispatch({ type: 'TOGGLE_DECK_TAG', deckId: deck.id, tagId: tag.id })}
                className="w-full text-left px-3 py-1.5 text-xs flex items-center gap-2 deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink transition-colors"
              >
                <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: tag.color }} />
                {tag.label}
                {hasTag && <Check className="w-3 h-3 ml-auto" style={{ color: tag.color }} />}
              </button>
            );
          })}
        </>
      )}
    </motion.div>
  );
}

/* ================================================================
   DeckEditModal — inline CRUD for title, subtitle, description
   ================================================================ */
function DeckEditModal({ deck, onClose }: any) {
  const { dispatch } = useOrganizer();
  const display = useDeckDisplay(deck);
  const [title, setTitle] = useState(display.title);
  const [subtitle, setSubtitle] = useState(display.subtitle);
  const [description, setDescription] = useState(display.description);
  const backdropRef = useRef<any>(null);
  const titleRef = useRef<any>(null);

  const queryClient = useQueryClient();
  const updateDeck = useMutation({
    mutationFn: async (vars: any) => {
      await fetch(`/api/decks/${deck.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vars)
      });
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['dbDecks'] })
  });

  const deleteDeck = useMutation({
    mutationFn: async () => {
      await fetch(`/api/decks/${deck.id}`, { method: 'DELETE' });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbDecks'] });
      onClose();
    }
  });

  useEffect(() => { titleRef.current?.focus(); }, []);

  const handleSave = () => {
    dispatch({
      type: 'UPDATE_DECK_INFO',
      deckId: deck.id,
      title: title !== deck.title ? title : undefined,
      subtitle: subtitle !== (deck.subtitle || '') ? subtitle : undefined,
      description: description || undefined,
    });

    // If it's a UUID, it's from the database
    if (deck.id && deck.id.length > 20) {
      updateDeck.mutate({ title, subtitle, description });
    }
    onClose();
  };

  const handleReset = () => {
    dispatch({ type: 'RESET_DECK_INFO', deckId: deck.id });
    onClose();
  };

  return (
    <motion.div
      ref={backdropRef}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      style={{ backgroundColor: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
      onClick={(e) => { if (e.target === backdropRef.current) onClose(); }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 16 }}
        className="w-full max-w-md rounded-2xl border bg-deck-surface shadow-2xl overflow-hidden"
        style={{ borderColor: 'var(--cream-hairline)' }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-5 pt-5 pb-3 flex items-center justify-between">
          <div className="deck-mono text-[0.6rem] uppercase tracking-[0.22em] deck-ink-subtle">
            Edit deck info
          </div>
          <button onClick={onClose} className="p-1 deck-ink-subtle hover:text-deck-ink">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 pb-5 space-y-4">
          <div>
            <label className="block text-[0.6rem] deck-mono uppercase tracking-wider deck-ink-subtle mb-1.5">
              Title
            </label>
            <input
              ref={titleRef}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onClose(); }}
              className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm deck-ink deck-display focus:border-deck-accent outline-none transition-colors"
              style={{ borderColor: 'var(--cream-hairline)' }}
              placeholder="Deck title…"
            />
            {title !== deck.title && (
              <div className="text-[0.55rem] deck-ink-subtle mt-1 flex items-center gap-1">
                <span>Original:</span>
                <span className="italic truncate">{deck.title}</span>
              </div>
            )}
          </div>

          <div>
            <label className="block text-[0.6rem] deck-mono uppercase tracking-wider deck-ink-subtle mb-1.5">
              Subtitle
            </label>
            <input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') handleSave(); if (e.key === 'Escape') onClose(); }}
              className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm deck-ink focus:border-deck-accent outline-none transition-colors"
              style={{ borderColor: 'var(--cream-hairline)' }}
              placeholder="Subtitle…"
            />
          </div>

          <div>
            <label className="block text-[0.6rem] deck-mono uppercase tracking-wider deck-ink-subtle mb-1.5">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Escape') onClose(); }}
              rows={3}
              className="w-full px-3 py-2 rounded-lg border bg-transparent text-sm deck-ink focus:border-deck-accent outline-none transition-colors resize-none"
              style={{ borderColor: 'var(--cream-hairline)' }}
              placeholder="Optional notes or description…"
            />
          </div>

          <div className="flex items-center justify-between pt-1">
            <div className="flex items-center gap-2">
              {display.hasOverrides && (
                <button
                  onClick={handleReset}
                  className="text-xs deck-ink-subtle hover:text-amber-400 transition-colors flex items-center gap-1"
                >
                  <ArchiveRestore className="w-3 h-3" /> Reset
                </button>
              )}
              {deck.id && deck.id.length > 20 && (
                <button
                  onClick={() => { if (window.confirm('Delete this dossier permanently?')) deleteDeck.mutate(); }}
                  className="text-xs deck-ink-subtle hover:text-red-400 transition-colors flex items-center gap-1"
                >
                  <Trash2 className="w-3 h-3" /> Delete
                </button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={onClose}
                className="px-3 py-1.5 text-xs rounded-lg deck-ink-muted hover:text-deck-ink hover:bg-[var(--cream-ghost)] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="px-4 py-1.5 text-xs rounded-lg bg-deck-accent text-white hover:opacity-90 transition-opacity deck-mono uppercase tracking-wider"
              >
                Save
              </button>
            </div>
          </div>

          <div className="text-[0.55rem] deck-ink-subtle">
            Deck ID: <span className="deck-mono">{deck.id}</span> · {deck.slides.length} slides · {deck.theme}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

/* ================================================================
   DeckCard — enhanced with org features + inline edit
   ================================================================ */
function DeckCard({ deck, index, themeMode, onOpenSources, onOpenShare }) {
  const { state, dispatch } = useOrganizer();
  const meta = state.deckMeta[deck.id] || {};
  const display = useDeckDisplay(deck);
  const createdLine = formatDeckStudioCreatedLine(deck);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [editing, setEditing] = useState(false);

  const deckTags = (meta.tagIds || [])
    .map((id) => state.tags.find((t) => t.id === id))
    .filter(Boolean);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setCtxMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 300),
    });
  }, []);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -12, scale: 0.96 }}
        transition={{ duration: 0.5, delay: 0.05 * index, ease: [0.2, 0.8, 0.2, 1] }}
        data-deck-theme={deck.theme}
        data-theme-mode={themeMode}
        className={`relative group rounded-xl border bg-deck-surface hover:bg-deck-surface-elevated transition-colors duration-deck-base ease-deck-out overflow-hidden flex flex-col ${
          meta.archived ? 'opacity-60' : ''
        }`}
        style={{ borderColor: 'var(--cream-hairline)' }}
        onContextMenu={handleContextMenu}
      >
        <Link to={`/Deck?id=${deck.id}`} className="block">
          <div className="aspect-[16/10] p-5 sm:p-6 flex flex-col justify-between relative">
            <div className="flex items-center justify-between">
              <div className="deck-mono text-[10px] tracking-[0.22em] uppercase deck-ink-subtle space-y-0.5">
                <div className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
                  <span>{deck.slides.length} slides · {deck.theme}</span>
                  {deck.catalogGit?.versionLabel && (
                    <span
                      className="px-1 py-0.5 rounded text-[0.55rem]"
                      style={{
                        background: 'color-mix(in srgb, var(--cream) 8%, transparent)',
                        color: 'var(--cream-muted, var(--cream))',
                      }}
                      title={`Version family: ${deck.catalogGit.versionFamily}`}
                    >
                      {deck.catalogGit.versionLabel}
                    </span>
                  )}
                  {deck.catalogGit?.isLatestInFamily &&
                    deck.catalogGit.versionLabel /* skip badge for solo families (not informative) */ && (
                      <span
                        className="inline-flex items-center gap-0.5 text-[0.55rem] px-1.5 py-0.5 rounded-full"
                        style={{
                          background: 'color-mix(in srgb, var(--amber) 14%, transparent)',
                          border: '1px solid color-mix(in srgb, var(--amber) 40%, transparent)',
                          color: 'var(--amber)',
                        }}
                        title="Most recently updated in this version family"
                      >
                        ✦ Latest
                      </span>
                    )}
                </div>
                {createdLine ? (
                  <div className="normal-case tracking-normal text-[0.65rem] deck-ink-muted">
                    {createdLine}
                  </div>
                ) : deck.catalogGit?.lastUpdatedAt ? (
                  <div
                    className="normal-case tracking-normal text-[0.6rem] deck-ink-subtle/90"
                    title={`Last updated ${new Date(deck.catalogGit.lastUpdatedAt).toLocaleString()} · ${deck.catalogGit.commitCount} commits`}
                  >
                    Updated {(() => {
                      const d = Date.now() - new Date(deck.catalogGit.lastUpdatedAt).valueOf();
                      const days = Math.floor(d / 86_400_000);
                      if (days < 1) return 'today';
                      if (days === 1) return 'yesterday';
                      if (days < 7) return `${days}d ago`;
                      if (days < 30) return `${Math.floor(days / 7)}w ago`;
                      if (days < 365) return `${Math.floor(days / 30)}mo ago`;
                      return `${Math.floor(days / 365)}y ago`;
                    })()} · {deck.catalogGit.commitCount} commits
                  </div>
                ) : (
                  <div className="normal-case tracking-normal text-[0.6rem] deck-ink-subtle/90">
                    Built-in deck
                  </div>
                )}
              </div>
              <div className="flex items-center gap-1">
                {/* Edit pencil */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setEditing(true);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 -m-1"
                  title="Edit deck info"
                >
                  <Pencil className="w-3.5 h-3.5 deck-ink-subtle hover:text-deck-accent" />
                </button>
                {/* Favorite star */}
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    dispatch({ type: 'TOGGLE_FAVORITE', deckId: deck.id });
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity p-1 -m-1"
                >
                  <Star className={`w-4 h-4 transition-colors ${
                    meta.favorite ? 'fill-amber-400 text-amber-400' : 'deck-ink-subtle hover:text-amber-400'
                  }`} />
                </button>
              </div>
            </div>
            <div className="pr-8">
              <div className="deck-display text-xl sm:text-2xl md:text-3xl text-deck-ink leading-tight">
                {display.title}
              </div>
              {display.subtitle && (
                <div className="mt-2 text-xs sm:text-sm deck-ink-muted">{display.subtitle}</div>
              )}
              {display.description && (
                <div className="mt-1 text-[0.65rem] deck-ink-subtle line-clamp-2">{display.description}</div>
              )}
              {display.hasOverrides && (
                <div className="mt-1 inline-flex items-center gap-0.5 text-[0.5rem] px-1.5 py-0.5 rounded-full bg-deck-accent/10 text-deck-accent deck-mono uppercase">
                  edited
                </div>
              )}
              {deckTags.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {deckTags.map((tag) => (
                    <span
                      key={tag.id}
                      className="inline-flex items-center gap-0.5 text-[0.55rem] px-1.5 py-0.5 rounded-full"
                      style={{ backgroundColor: tag.color + '22', color: tag.color }}
                    >
                      <Hash className="w-2 h-2" />{tag.label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div className="absolute top-4 right-4 sm:top-5 sm:right-5 text-deck-ink-subtle group-hover:text-deck-accent transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
          </div>
        </Link>
        <div
          className="flex items-center justify-between gap-1.5 px-3 sm:px-4 py-2.5 border-t"
          style={{ borderColor: 'var(--cream-hairline)' }}
        >
          <div className="flex items-center gap-1">
            {meta.folderId && (
              <span className="text-[0.55rem] deck-mono deck-ink-subtle flex items-center gap-0.5">
                <Folder className="w-2.5 h-2.5" />
                {state.folders.find((f) => f.id === meta.folderId)?.label}
              </span>
            )}
          </div>
          <div className="flex items-center gap-1.5">
            <MonoChip as={Link} to={`/decks/${deck.id}/analytics`} size="sm">
              <BarChart3 className="w-3 h-3" /> Analytics
            </MonoChip>
            <MonoChip as="button" size="sm" onClick={() => onOpenShare?.()}>
              <Share2 className="w-3 h-3" /> Share
            </MonoChip>
            <MonoChip as="button" size="sm" onClick={() => onOpenSources?.()}>
              <FolderOpen className="w-3 h-3" /> Sources
            </MonoChip>
            <MonoChip
              as="button"
              size="sm"
              onClick={handleContextMenu}
              aria-label="Organize"
            >
              <SlidersHorizontal className="w-3 h-3" />
            </MonoChip>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {ctxMenu && (
          <DeckContextMenu
            deck={deck}
            position={ctxMenu}
            onClose={() => setCtxMenu(null)}
            onEdit={() => { setCtxMenu(null); setEditing(true); }}
          />
        )}
        {editing && (
          <DeckEditModal deck={deck} onClose={() => setEditing(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================
   DeckListRow — compact list view
   ================================================================ */
function DeckListRow({ deck, index, themeMode, onOpenSources, onOpenShare }) {
  const { state, dispatch } = useOrganizer();
  const meta = state.deckMeta[deck.id] || {};
  const display = useDeckDisplay(deck);
  const createdLine = formatDeckStudioCreatedLine(deck);
  const [ctxMenu, setCtxMenu] = useState(null);
  const [editing, setEditing] = useState(false);

  const deckTags = (meta.tagIds || [])
    .map((id) => state.tags.find((t) => t.id === id))
    .filter(Boolean);

  const handleContextMenu = useCallback((e) => {
    e.preventDefault();
    setCtxMenu({
      x: Math.min(e.clientX, window.innerWidth - 220),
      y: Math.min(e.clientY, window.innerHeight - 300),
    });
  }, []);

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, x: -12 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 12 }}
        transition={{ duration: 0.35, delay: 0.03 * index }}
        className={`group flex items-center gap-4 px-4 py-3 rounded-xl border transition-colors hover:bg-deck-surface-elevated ${
          meta.archived ? 'opacity-60' : ''
        }`}
        style={{ borderColor: 'var(--cream-hairline)' }}
        data-deck-theme={deck.theme}
        data-theme-mode={themeMode}
        onContextMenu={handleContextMenu}
      >
        {/* Favorite */}
        <button
          onClick={() => dispatch({ type: 'TOGGLE_FAVORITE', deckId: deck.id })}
          className="shrink-0"
        >
          <Star className={`w-4 h-4 transition-colors ${
            meta.favorite ? 'fill-amber-400 text-amber-400' : 'deck-ink-subtle hover:text-amber-400'
          }`} />
        </button>

        {/* Title block */}
        <Link to={`/Deck?id=${deck.id}`} className="flex-1 min-w-0">
          <div className="flex items-center gap-1.5">
            <span className="deck-display text-base text-deck-ink truncate">{display.title}</span>
            {display.hasOverrides && (
              <span className="text-[0.5rem] px-1 py-0.5 rounded bg-deck-accent/10 text-deck-accent deck-mono uppercase shrink-0">edited</span>
            )}
          </div>
          {display.subtitle && <div className="text-xs deck-ink-muted truncate">{display.subtitle}</div>}
        </Link>

        {/* Tags */}
        <div className="hidden sm:flex items-center gap-1 shrink-0">
          {deckTags.slice(0, 3).map((tag) => (
            <span
              key={tag.id}
              className="text-[0.55rem] px-1.5 py-0.5 rounded-full"
              style={{ backgroundColor: tag.color + '22', color: tag.color }}
            >
              {tag.label}
            </span>
          ))}
        </div>

        {/* Metadata */}
        <div className="deck-mono text-[0.55rem] deck-ink-subtle shrink-0 hidden md:block">
          {deck.slides.length} slides
        </div>
        <div className="deck-mono text-[0.55rem] deck-ink-subtle shrink-0 hidden lg:block max-w-[11rem] truncate" title={createdLine || 'Repository manifest (no DB row)'}>
          {createdLine ? (
            <span className="normal-case">{createdLine}</span>
          ) : (
            <span className="uppercase deck-ink-subtle/80">Built-in</span>
          )}
        </div>
        <div className="deck-mono text-[0.55rem] deck-ink-subtle shrink-0 hidden md:block uppercase">
          {deck.theme}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-1 shrink-0 opacity-0 group-hover:opacity-100 transition-opacity">
          <MonoChip as="button" size="sm" onClick={() => setEditing(true)} aria-label="Edit">
            <Pencil className="w-3 h-3" />
          </MonoChip>
          <MonoChip as={Link} to={`/decks/${deck.id}/analytics`} size="sm">
            <BarChart3 className="w-3 h-3" />
          </MonoChip>
          <MonoChip as="button" size="sm" onClick={() => onOpenShare?.()} title="Share link">
            <Share2 className="w-3 h-3" />
          </MonoChip>
          <MonoChip as="button" size="sm" onClick={() => onOpenSources?.()}>
            <FolderOpen className="w-3 h-3" />
          </MonoChip>
          <MonoChip as="button" size="sm" onClick={handleContextMenu}>
            <SlidersHorizontal className="w-3 h-3" />
          </MonoChip>
        </div>

        <Link to={`/Deck?id=${deck.id}`} className="shrink-0 deck-ink-subtle group-hover:text-deck-accent transition-colors">
          <ChevronRight className="w-4 h-4" />
        </Link>
      </motion.div>

      <AnimatePresence>
        {ctxMenu && (
          <DeckContextMenu
            deck={deck}
            position={ctxMenu}
            onClose={() => setCtxMenu(null)}
            onEdit={() => { setCtxMenu(null); setEditing(true); }}
          />
        )}
        {editing && (
          <DeckEditModal deck={deck} onClose={() => setEditing(false)} />
        )}
      </AnimatePresence>
    </>
  );
}

/* ================================================================
   Home — main page
   ================================================================ */
export default function Home() {
  const [sourcesDeck, setSourcesDeck] = useState(null);
  const [shareDeck, setShareDeck] = useState(null);
  const { mode, toggle } = useTheme();
  const { user, logout } = useAuth();
  const { state } = useOrganizer();
  const isAdmin = user?.role === 'admin';
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const queryClient = useQueryClient();
  const { data: dbDecks = [], isLoading: isLoadingDecks } = useQuery({
    queryKey: ['dbDecks'],
    queryFn: async () => {
      try {
        const res = await fetch('/api/decks');
        if (!res.ok) return [];
        const data = await res.json();
        return data.map((d: any) => ({
          ...d,
          slides: [],
          createdAt: d.createdAt ?? d.created_at ?? null,
        }));
      } catch {
        return [];
      }
    }
  });

  const createDeck = useMutation({
    mutationFn: async (deckInfo: any) => {
      const res = await fetch('/api/decks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(deckInfo)
      });
      return res.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['dbDecks'] });
    }
  });

  const combinedDecks = [...DECKS, ...dbDecks];
  const filtered = useFilteredDecks(combinedDecks);
  const folderLabel = state.folders.find((f: any) => f.id === state.activeFolder)?.label || 'All Decks';

  return (
    <div data-deck-theme="clinical" className="deck-root min-h-screen">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-16">
        {/* ── Header ── */}
        <motion.header
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.8, 0.2, 1] }}
          className="mb-8 sm:mb-12"
        >
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-5 gap-3">
            <div className="deck-mono text-xs tracking-[0.22em] uppercase text-deck-accent flex items-center gap-2">
              <Sparkles className="w-3 h-3" /> Deck Studio
            </div>
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap">
              {user && (
                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full border border-[var(--cream-hairline)] bg-[var(--cream-ghost)]">
                  <User className="w-3.5 h-3.5 text-deck-accent" />
                  <span className="deck-mono text-[0.62rem] uppercase tracking-widest text-deck-ink">{user.email.split('@')[0]}</span>
                </div>
              )}
              <MonoChip as={Link} to="/pk-sim">
                <FlaskConical className="w-3 h-3" /> PK Simulator
              </MonoChip>
              {isAdmin && (
                <MonoChip as={Link} to="/dev">Dev Kit</MonoChip>
              )}
              <ThemeToggle mode={mode} onToggle={toggle} />
              {user && (
                <button onClick={logout} className="p-1.5 rounded-full hover:bg-[var(--cream-ghost)] transition-colors text-deck-ink-subtle hover:text-red-400" title="Log out">
                  <LogOut className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
          <h1 className="deck-display text-3xl sm:text-4xl md:text-5xl leading-[0.95] text-deck-ink max-w-3xl">
            Code-driven decks<br />with a shared grammar.
          </h1>
          <p className="mt-4 sm:mt-5 max-w-2xl text-sm sm:text-base deck-ink-muted leading-relaxed">
            A unified design system, motion vocabulary, and composable patterns —
            so every presentation feels like it came from the same studio.
          </p>
        </motion.header>

        {/* ── Main layout: sidebar + content ── */}
        <div className="flex gap-6 lg:gap-8">
          {/* Sidebar */}
          <motion.aside
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="hidden lg:block w-52 shrink-0"
          >
            <div className="sticky top-8">
              <Sidebar collapsed={false} />
            </div>
          </motion.aside>

          {/* Content area */}
          <div className="flex-1 min-w-0">
            {/* Toolbar: search + tags + sort */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="mb-6 space-y-3"
            >
              {/* Top row: folder label, search, sort */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                {/* Mobile folder selector */}
                <div className="lg:hidden">
                  <MobileFolderSelect />
                </div>
                <div className="hidden lg:flex items-center gap-2 min-w-0">
                  <span className="deck-mono text-xs uppercase tracking-[0.22em] deck-ink-subtle flex items-center gap-1.5 shrink-0">
                    <Layers className="w-3 h-3" />
                    {folderLabel} · {filtered.length}
                  </span>
                </div>
                <div className="flex-1 max-w-xs">
                  <SearchBar />
                </div>
                <SortControls />
                <button
                  onClick={() => createDeck.mutate({ title: 'New Data Dossier', subtitle: 'Draft', theme: 'clinical' })}
                  disabled={createDeck.isPending}
                  className="px-4 py-1.5 text-xs rounded-lg bg-deck-accent text-white hover:opacity-90 transition-all active:scale-95 deck-mono uppercase tracking-wider flex items-center gap-2 shadow-lg shadow-deck-accent/20"
                >
                  <Plus className="w-3.5 h-3.5" />
                  {createDeck.isPending ? 'Creating...' : 'Create Dossier'}
                </button>
              </div>
              {/* Tag bar */}
              <TagBar />
            </motion.div>

            {/* Deck grid / list */}
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-center py-20"
                >
                  <Archive className="w-10 h-10 deck-ink-subtle mx-auto mb-4" />
                  <p className="text-sm deck-ink-muted">No decks match your filters.</p>
                  <p className="text-xs deck-ink-subtle mt-1">Try adjusting your folder, tags, or search query.</p>
                </motion.div>
              ) : state.viewMode === 'grid' ? (
                <motion.div
                  key="grid"
                  layout
                  className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5"
                >
                  {filtered.map((d, i) => (
                    <DeckCard
                      key={d.id}
                      deck={d}
                      index={i}
                      themeMode={mode}
                      onOpenSources={() => setSourcesDeck({ id: d.id, title: d.title })}
                      onOpenShare={() => setShareDeck({ id: d.id, title: d.title })}
                    />
                  ))}
                </motion.div>
              ) : (
                <motion.div key="list" layout className="flex flex-col gap-2">
                  {filtered.map((d, i) => (
                    <DeckListRow
                      key={d.id}
                      deck={d}
                      index={i}
                      themeMode={mode}
                      onOpenSources={() => setSourcesDeck({ id: d.id, title: d.title })}
                      onOpenShare={() => setShareDeck({ id: d.id, title: d.title })}
                    />
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        <DeckSourcesDialog
          open={!!sourcesDeck}
          onClose={() => setSourcesDeck(null)}
          deckId={sourcesDeck?.id}
          deckTitle={sourcesDeck?.title}
        />
        <ShareLinkModal
          open={!!shareDeck}
          onClose={() => setShareDeck(null)}
          deckId={shareDeck?.id}
          deckTitle={shareDeck?.title}
        />

        <footer className="mt-20 pt-8 border-t deck-rule deck-mono text-xs deck-ink-subtle flex flex-col md:flex-row gap-3 md:justify-between">
          <div>Deck Studio · internal preview</div>
          <div>Built on a tokens-driven design system · theme-swappable</div>
        </footer>
      </div>
    </div>
  );
}

/* ================================================================
   Mobile folder selector (dropdown for smaller screens)
   ================================================================ */
function MobileFolderSelect() {
  const { state, dispatch } = useOrganizer();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e) => { if (!ref.current?.contains(e.target)) setOpen(false); };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [open]);

  const currentFolder = state.folders.find((f) => f.id === state.activeFolder);
  const CurrentIcon = currentFolder ? (FOLDER_ICONS[currentFolder.icon] || Folder) : Layers;

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 text-sm deck-ink hover:text-deck-accent transition-colors"
      >
        <CurrentIcon className="w-4 h-4" />
        <span className="deck-mono text-xs uppercase tracking-wider">{currentFolder?.label || 'All Decks'}</span>
        <ChevronDown className={`w-3.5 h-3.5 transition-transform ${open ? 'rotate-180' : ''}`} />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="absolute left-0 mt-2 w-48 rounded-lg border bg-deck-surface shadow-lg z-50 overflow-hidden"
            style={{ borderColor: 'var(--cream-hairline)' }}
          >
            {state.folders.map((f) => {
              const Icon = FOLDER_ICONS[f.icon] || Folder;
              return (
                <button
                  key={f.id}
                  onClick={() => { dispatch({ type: 'SET_ACTIVE_FOLDER', id: f.id }); setOpen(false); }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center gap-2 transition-colors ${
                    state.activeFolder === f.id
                      ? 'text-deck-accent bg-deck-accent/10'
                      : 'deck-ink-muted hover:bg-[var(--cream-ghost)] hover:text-deck-ink'
                  }`}
                >
                  <Icon className="w-3.5 h-3.5" />
                  {f.label}
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
