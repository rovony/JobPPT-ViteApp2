import React from 'react';
import { Eye, EyeOff, ArrowUp, ArrowDown, GripVertical } from 'lucide-react';
import { cn } from '@/lib/utils';

/**
 * OverviewSlideTile — a single tile in the overview grid OR a row in
 * the overview list. Render mode is driven by `view` ('grid' | 'list').
 *
 * Owns no state. All toggles + reorders are delegated up to DeckOverview
 * via callbacks so the tile stays purely presentational.
 *
 * The "manifest #" (immutable) is shown as the small mono number;
 * the "current order #" (post-reorder, 1-based) is the larger badge,
 * matching how the deck would present after applying overrides.
 */
export default function OverviewSlideTile({
  slide,
  manifestIndex,   // original index in deck.slides (immutable)
  orderIndex,      // index in the post-reorder list (1-based after +1)
  isCurrent,
  isHidden,
  view,            // 'grid' | 'list'
  dragHandleProps, // optional, supplied by drag wrapper
  onOpen,
  onToggleHidden,
  onMoveUp,
  onMoveDown,
}) {
  const dim = isHidden;

  if (view === 'list') {
    return (
      <div
        className={cn(
          'flex items-center gap-3 rounded-deck-md border px-3 py-2 transition-all',
          'hover:border-[var(--cream-faint)]'
        )}
        style={{
          background: isCurrent ? 'var(--panel-elevated)' : 'var(--panel)',
          borderColor: isCurrent ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
          opacity: dim ? 0.5 : 1,
        }}
      >
        {/* Drag handle */}
        <span
          {...(dragHandleProps || {})}
          className="shrink-0 cursor-grab active:cursor-grabbing text-[var(--cream-faint)] hover:text-[var(--cream-muted)]"
          title="Drag to reorder"
          aria-label="Drag to reorder"
        >
          <GripVertical className="w-4 h-4" />
        </span>

        {/* Order # (after overrides) */}
        <span
          className="deck-mono shrink-0 tabular-nums w-8 text-right"
          style={{
            fontSize: '0.78rem',
            letterSpacing: 'var(--ls-mono)',
            color: isCurrent ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
          }}
        >
          {String(orderIndex + 1).padStart(2, '0')}
        </span>

        {/* Title (clickable — opens slide) */}
        <button
          onClick={onOpen}
          className="flex-1 min-w-0 text-left flex items-baseline gap-2"
        >
          <span
            className="deck-display truncate"
            style={{ fontSize: '0.95rem', color: 'var(--cream)', fontWeight: 500 }}
          >
            {slide.title || 'Untitled slide'}
          </span>
          {slide.id && (
            <span
              className="deck-mono shrink-0 truncate"
              style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
            >
              · {slide.id}
            </span>
          )}
        </button>

        {/* Manifest # (immutable, small) */}
        <span
          className="deck-mono shrink-0 tabular-nums hidden sm:inline"
          title="Manifest position (unchanged)"
          style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
        >
          M·{String(manifestIndex + 1).padStart(2, '0')}
        </span>

        {/* Actions */}
        <RowAction onClick={onMoveUp}        title="Move up"   ><ArrowUp className="w-3.5 h-3.5" /></RowAction>
        <RowAction onClick={onMoveDown}      title="Move down" ><ArrowDown className="w-3.5 h-3.5" /></RowAction>
        <RowAction
          onClick={onToggleHidden}
          title={isHidden ? 'Show in overview' : 'Hide in overview'}
        >
          {isHidden ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
        </RowAction>
      </div>
    );
  }

  // ── Grid view ─────────────────────────────────────────────────
  return (
    <div
      className={cn(
        'group relative rounded-deck-lg border transition-all',
        'hover:-translate-y-0.5'
      )}
      style={{
        background: isCurrent ? 'var(--panel-elevated)' : 'var(--panel)',
        borderColor: isCurrent ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
        boxShadow: isCurrent
          ? '0 0 0 2px var(--case, var(--amber)), var(--shadow-md)'
          : 'var(--shadow-sm)',
        opacity: dim ? 0.45 : 1,
      }}
    >
      <button
        onClick={onOpen}
        className="w-full text-left p-3 aspect-[16/10] flex flex-col"
      >
        <div className="flex items-center justify-between mb-2">
          <span
            className="deck-mono tabular-nums"
            style={{
              fontSize: '0.6rem',
              letterSpacing: 'var(--ls-mono)',
              color: isCurrent ? 'var(--case, var(--amber))' : 'var(--cream-faint)',
            }}
          >
            {String(orderIndex + 1).padStart(2, '0')}
          </span>
          <span
            className="deck-mono"
            title="Manifest position"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
          >
            M·{String(manifestIndex + 1).padStart(2, '0')}
          </span>
        </div>
        <div
          className="deck-display flex-1 min-h-0"
          style={{
            fontSize: '0.92rem',
            lineHeight: 1.2,
            color: 'var(--cream)',
            fontWeight: 500,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {slide.title || 'Untitled slide'}
        </div>
        {isHidden && (
          <span
            className="deck-mono mt-1"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
          >
            HIDDEN
          </span>
        )}
      </button>

      {/* Hover actions — top-right floating */}
      <div
        className="absolute top-1.5 right-1.5 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 focus-within:opacity-100 transition-opacity"
      >
        <RowAction onClick={onMoveUp}   title="Move up"  ><ArrowUp className="w-3 h-3" /></RowAction>
        <RowAction onClick={onMoveDown} title="Move down"><ArrowDown className="w-3 h-3" /></RowAction>
        <RowAction
          onClick={onToggleHidden}
          title={isHidden ? 'Show' : 'Hide'}
        >
          {isHidden ? <EyeOff className="w-3 h-3" /> : <Eye className="w-3 h-3" />}
        </RowAction>
      </div>
    </div>
  );
}

function RowAction({ children, onClick, title }) {
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick?.(); }}
      title={title}
      aria-label={title}
      className="h-6 w-6 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
      style={{ color: 'var(--cream-muted)' }}
    >
      {children}
    </button>
  );
}