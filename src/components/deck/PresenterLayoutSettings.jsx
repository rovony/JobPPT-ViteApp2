import React, { useEffect } from 'react';
import { X, ArrowUp, ArrowDown, Eye, EyeOff, RotateCcw } from 'lucide-react';
import { SECTION_LABEL, SECTION_GROUP } from '@/lib/usePresenterLayout';

/**
 * PresenterLayoutSettings — modal for toggling section visibility and
 * reordering sections within their column.
 *
 * Sections grouped by column (left / center / right). Within each
 * column, ↑↓ buttons swap adjacent items. Visibility is independent of
 * order — hidden sections still occupy a slot in the order array, so
 * showing them again restores their previous position.
 *
 * Cross-column reorder is intentionally NOT supported (see
 * usePresenterLayout for the rationale).
 */
export default function PresenterLayoutSettings({ open, onClose, layout }) {
  const {
    visibility,
    centerOrder,
    rightOrder,
    toggleVisibility,
    moveSection,
    resetLayout,
  } = layout;

  // Esc to close — capture-phase + stopImmediatePropagation so the
  // deck-store keyboard handler doesn't also close presenter view
  // (same pattern as ReadingMaterialPane).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      onClose?.();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;

  const groups = [
    { name: 'Left column',   keys: ['assistant'],   order: null },
    { name: 'Center column', keys: centerOrder,     order: centerOrder },
    { name: 'Right column',  keys: rightOrder,      order: rightOrder },
  ];

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Presenter layout settings"
      className="fixed inset-0 z-deck-presenter flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          width: 'min(94vw, 560px)',
          maxHeight: 'min(90vh, 720px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b shrink-0"
          style={{ borderBottomColor: 'var(--cream-hairline)' }}
        >
          <div className="flex flex-col min-w-0">
            <span
              className="deck-mono uppercase truncate"
              style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
            >
              Layout
            </span>
            <span className="text-sm font-medium" style={{ color: 'var(--cream)' }}>
              Show, hide, and reorder sections
            </span>
          </div>
          <div className="flex items-center gap-1">
            <button
              onClick={resetLayout}
              title="Reset layout to defaults"
              aria-label="Reset layout"
              className="h-8 px-2 rounded flex items-center gap-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-muted)', fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="deck-mono uppercase">Reset</span>
            </button>
            <button
              onClick={onClose}
              className="h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              aria-label="Close"
              title="Close · Esc"
              style={{ color: 'var(--cream-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
          {groups.map((group) => (
            <section key={group.name}>
              <div
                className="deck-mono uppercase mb-2"
                style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
              >
                {group.name}
              </div>
              <ul className="flex flex-col gap-1">
                {group.keys.map((key, idx) => {
                  const isVisible = !!visibility[key];
                  const canReorder = !!group.order;
                  const canMoveUp = canReorder && idx > 0;
                  const canMoveDown = canReorder && idx < group.keys.length - 1;
                  return (
                    <li
                      key={key}
                      className="flex items-center gap-1 px-2 py-1.5 rounded border"
                      style={{
                        borderColor: 'var(--cream-hairline)',
                        background: isVisible ? 'transparent' : 'color-mix(in srgb, var(--cream-ghost) 50%, transparent)',
                        opacity: isVisible ? 1 : 0.65,
                      }}
                    >
                      <button
                        onClick={() => toggleVisibility(key)}
                        title={isVisible ? 'Hide this section' : 'Show this section'}
                        aria-label={`${isVisible ? 'Hide' : 'Show'} ${SECTION_LABEL[key]}`}
                        className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
                        style={{ color: isVisible ? 'var(--case, var(--amber))' : 'var(--cream-faint)' }}
                      >
                        {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                      </button>
                      <span className="flex-1 text-sm" style={{ color: 'var(--cream)' }}>
                        {SECTION_LABEL[key]}
                      </span>
                      <button
                        onClick={() => moveSection(key, 'up')}
                        disabled={!canMoveUp}
                        title={canReorder ? 'Move up' : 'Single-item column'}
                        aria-label="Move up"
                        className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] disabled:opacity-25 shrink-0"
                        style={{ color: 'var(--cream-muted)' }}
                      >
                        <ArrowUp className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => moveSection(key, 'down')}
                        disabled={!canMoveDown}
                        title={canReorder ? 'Move down' : 'Single-item column'}
                        aria-label="Move down"
                        className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] disabled:opacity-25 shrink-0"
                        style={{ color: 'var(--cream-muted)' }}
                      >
                        <ArrowDown className="w-3.5 h-3.5" />
                      </button>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}

          <div
            className="text-xs px-2 pt-2"
            style={{ color: 'var(--cream-faint)', lineHeight: 1.45 }}
          >
            Visibility and order are saved per-device. Cross-column reorder
            (e.g. moving Audience Q&A to the center column) isn't supported —
            sections stay within their column.
          </div>
        </div>
      </div>
    </div>
  );
}
