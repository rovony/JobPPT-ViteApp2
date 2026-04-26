// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { LayoutGrid, List, Search, RotateCcw, X } from 'lucide-react';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { useDeck } from '@/lib/deck-store';
import { useDeckOverrides } from '@/lib/useDeckOverrides';
import { cn } from '@/lib/utils';
import OverviewSlideTile from './OverviewSlideTile';

/**
 * DeckOverview — dense, productive overview of every slide in the deck.
 *
 * Compared to the previous version, this adds:
 *   · Two view modes: a denser Grid (5–6 cols at desktop) and a tight List.
 *   · Live search by slide title.
 *   · Per-slide actions: hide/show, move up/down (+ drag in list mode).
 *   · Persistent overrides via useDeckOverrides — local-only, per deck.
 *
 * What it does NOT change:
 *   · The deck's underlying navigation order (manifest is the SoT).
 *   · The slide content, footer page-numbers, eyebrows etc. — all
 *     of that still comes from the manifest at presentation time.
 *
 * Reorder/hide are housekeeping in the overview; clicking a tile
 * still navigates to the manifest's slide. This keeps "live present"
 * behavior identical and avoids any silent skips during a talk.
 */
export default function DeckOverview({ deck, readOnly = false }) {
  const { goto, index: current, toggleMode } = useDeck();
  const [view, setView] = useState(() => {
    try { return localStorage.getItem('deck-overview:view') === 'list' ? 'list' : 'grid'; }
    catch { return 'grid'; }
  });
  const [query, setQuery] = useState('');

  const setViewPersist = (v) => {
    setView(v);
    try { localStorage.setItem('deck-overview:view', v); } catch {}
  };

  const {
    ordered, isHidden, toggleHidden,
    moveUp, moveDown, reorder, reset, hasOverrides,
  } = useDeckOverrides(deck.id, deck.slides);

  // Map slide -> manifest index (for the immutable "M·NN" badge).
  const manifestIdx = useMemo(() => {
    const m = new Map();
    deck.slides.forEach((s, i) => m.set(s.id, i));
    return m;
  }, [deck.slides]);

  // Apply search filter on top of overrides ordering.
  const visible = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return ordered;
    return ordered.filter((s) => (s.title || '').toLowerCase().includes(q));
  }, [ordered, query]);

  const hiddenCount = ordered.filter((s) => isHidden(s.id)).length;

  const onOpen = (slideId) => {
    const target = deck.slides.findIndex((s) => s.id === slideId);
    if (target >= 0) { goto(target); toggleMode(); }
  };

  return (
    <div
      className={cn(
        'fixed left-0 right-0 bottom-0 z-deck-overview overflow-y-auto backdrop-blur-sm',
        /* Share overview sits below the fixed viewer top bar (z below overview). */
        readOnly ? 'top-14' : 'top-0'
      )}
      style={{ background: 'color-mix(in srgb, var(--bg) 96%, transparent)' }}
    >
      <div className="max-w-[1400px] mx-auto px-[var(--deck-gutter)] py-10">
        {/* ═══════ Header ═══════ */}
        <div className="flex items-start justify-between gap-6 mb-6">
          <div className="min-w-0">
            <div
              className="deck-mono uppercase mb-2"
              style={{
                fontSize: '0.68rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              {readOnly ? 'Slide index' : 'Overview'} · {deck.slides.length} slides
              {!readOnly && hiddenCount > 0 && (
                <span style={{ marginLeft: '0.6em', color: 'var(--cream-muted)' }}>
                  · {hiddenCount} hidden
                </span>
              )}
              {!readOnly && hasOverrides && (
                <span style={{ marginLeft: '0.6em', color: 'var(--case, var(--amber))' }}>
                  · custom order
                </span>
              )}
              {readOnly && (
                <span style={{ marginLeft: '0.6em', color: 'var(--cream-faint)' }}>
                  · read-only
                </span>
              )}
            </div>
            <h1
              className="deck-display truncate"
              style={{
                fontSize: 'clamp(1.5rem, 2.6vw, 2rem)',
                color: 'var(--cream)',
                fontWeight: 600,
                letterSpacing: 'var(--ls-headline)',
                margin: 0,
              }}
            >
              {deck.title}
            </h1>
            {deck.subtitle && (
              <p style={{ color: 'var(--cream-muted)', marginTop: 'var(--space-1)', fontSize: '0.9rem' }}>
                {deck.subtitle}
              </p>
            )}
          </div>

          <button
            onClick={toggleMode}
            className="deck-mono uppercase transition-colors shrink-0 hover:text-[var(--cream)]"
            style={{
              fontSize: '0.7rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
            }}
          >
            Close · Esc
          </button>
        </div>

        {/* ═══════ Toolbar ═══════ */}
        <div className="flex items-center justify-between flex-wrap gap-3 mb-4">
          {/* Search */}
          <div
            className="flex items-center gap-2 px-3 h-9 rounded-deck-md border flex-1 min-w-[200px] max-w-md"
            style={{ borderColor: 'var(--cream-hairline)', background: 'var(--panel)' }}
          >
            <Search className="w-3.5 h-3.5" style={{ color: 'var(--cream-faint)' }} />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search slides…"
              className="bg-transparent flex-1 outline-none deck-body"
              style={{ fontSize: '0.85rem', color: 'var(--cream)' }}
            />
            {query && (
              <button
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="text-[var(--cream-faint)] hover:text-[var(--cream-muted)]"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            {!readOnly && hasOverrides && (
              <button
                onClick={reset}
                title="Reset to manifest order, show all slides"
                className="deck-mono uppercase flex items-center gap-1.5 h-9 px-3 rounded-deck-md border transition-colors hover:bg-[var(--cream-ghost)]"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono)',
                  borderColor: 'var(--cream-hairline)',
                  color: 'var(--cream-muted)',
                }}
              >
                <RotateCcw className="w-3 h-3" /> Reset
              </button>
            )}

            {/* View toggle */}
            <div
              className="flex items-center rounded-deck-md border overflow-hidden"
              style={{ borderColor: 'var(--cream-hairline)', background: 'var(--panel)' }}
            >
              <ViewBtn active={view === 'grid'} onClick={() => setViewPersist('grid')} title="Grid view">
                <LayoutGrid className="w-3.5 h-3.5" /> Grid
              </ViewBtn>
              <ViewBtn active={view === 'list'} onClick={() => setViewPersist('list')} title="List view">
                <List className="w-3.5 h-3.5" /> List
              </ViewBtn>
            </div>
          </div>
        </div>

        {/* ═══════ Body ═══════ */}
        {visible.length === 0 ? (
          <div
            className="text-center py-20 deck-body"
            style={{ color: 'var(--cream-faint)', fontSize: '0.9rem' }}
          >
            No slides match “{query}”.
          </div>
        ) : view === 'grid' ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {visible.map((s) => {
              const oIndex = ordered.findIndex((x) => x.id === s.id);
              const mIndex = manifestIdx.get(s.id) ?? 0;
              return (
                <OverviewSlideTile
                  key={s.id}
                  slide={s}
                  view="grid"
                  manifestIndex={mIndex}
                  orderIndex={oIndex}
                  isCurrent={mIndex === current}
                  isHidden={isHidden(s.id)}
                  readOnly={readOnly}
                  onOpen={() => onOpen(s.id)}
                  onToggleHidden={() => toggleHidden(s.id)}
                  onMoveUp={() => moveUp(oIndex)}
                  onMoveDown={() => moveDown(oIndex)}
                />
              );
            })}
          </div>
        ) : readOnly ? (
          <div className="flex flex-col gap-1.5">
            {visible.map((s) => {
              const oIndex = ordered.findIndex((x) => x.id === s.id);
              const mIndex = manifestIdx.get(s.id) ?? 0;
              return (
                <OverviewSlideTile
                  key={s.id}
                  slide={s}
                  view="list"
                  manifestIndex={mIndex}
                  orderIndex={oIndex}
                  isCurrent={mIndex === current}
                  isHidden={isHidden(s.id)}
                  readOnly
                  onOpen={() => onOpen(s.id)}
                  onToggleHidden={() => toggleHidden(s.id)}
                  onMoveUp={() => moveUp(oIndex)}
                  onMoveDown={() => moveDown(oIndex)}
                />
              );
            })}
          </div>
        ) : (
          <DragDropContext
            onDragEnd={(result) => {
              if (!result.destination) return;
              reorder(result.source.index, result.destination.index);
            }}
          >
            <Droppable droppableId="overview-list">
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-1.5"
                >
                  {visible.map((s) => {
                    const oIndex = ordered.findIndex((x) => x.id === s.id);
                    const mIndex = manifestIdx.get(s.id) ?? 0;
                    return (
                      <Draggable key={s.id} draggableId={s.id} index={oIndex} isDragDisabled={!!query}>
                        {(prov, snapshot) => (
                          <div
                            ref={prov.innerRef}
                            {...prov.draggableProps}
                            style={{
                              ...prov.draggableProps.style,
                              boxShadow: snapshot.isDragging ? 'var(--shadow-lg)' : undefined,
                            }}
                          >
                            <OverviewSlideTile
                              slide={s}
                              view="list"
                              manifestIndex={mIndex}
                              orderIndex={oIndex}
                              isCurrent={mIndex === current}
                              isHidden={isHidden(s.id)}
                              dragHandleProps={prov.dragHandleProps}
                              onOpen={() => onOpen(s.id)}
                              onToggleHidden={() => toggleHidden(s.id)}
                              onMoveUp={() => moveUp(oIndex)}
                              onMoveDown={() => moveDown(oIndex)}
                            />
                          </div>
                        )}
                      </Draggable>
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
            {query && (
              <p
                className="deck-mono mt-3 text-center"
                style={{
                  fontSize: '0.6rem',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-faint)',
                }}
              >
                Drag-to-reorder is disabled while filtering. Clear the search to drag.
              </p>
            )}
          </DragDropContext>
        )}

        {/* ═══════ Footnote ═══════ */}
        <p
          className="deck-mono mt-8 text-center"
          style={{
            fontSize: '0.58rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          {readOnly
            ? 'Choose a slide to return to the deck. Editor-only tools are not available in a shared link.'
            : 'Reorder + hide are local view preferences for this overview · Live navigation still uses the manifest order'}
        </p>
      </div>
    </div>
  );
}

function ViewBtn({ active, onClick, title, children }) {
  return (
    <button
      onClick={onClick}
      title={title}
      className="deck-mono uppercase flex items-center gap-1.5 h-9 px-3 transition-colors"
      style={{
        fontSize: '0.62rem',
        letterSpacing: 'var(--ls-mono)',
        background: active ? 'var(--panel-elevated)' : 'transparent',
        color: active ? 'var(--cream)' : 'var(--cream-muted)',
      }}
    >
      {children}
    </button>
  );
}
