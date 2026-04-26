// @ts-nocheck
import React, { useCallback, useEffect, useState } from 'react';
import { X, Eye, EyeOff, RotateCcw, GripVertical, LayoutGrid, Bookmark } from 'lucide-react';
import {
  SECTION_LABEL,
  COLUMN_LABEL,
  COLUMN_KEYS,
  SECTION_KEYS,
  PRESENTER_LAYOUT_PRESETS,
} from '@/lib/usePresenterLayout';

const DRAG_MIME = 'application/x-merck-presenter-section';

const COLUMN_QUICK = [
  { id: 'left', short: 'Left' },
  { id: 'center', short: 'Center' },
  { id: 'right', short: 'Right' },
];

/**
 * Presenter layout as a 3-column “bento”: drag cards between columns and
 * within a column (drop on a card = insert above). Eye toggles visibility.
 * A small column picker on each card moves that panel to the end of a
 * column without arrow nudges. No ←↑↓→ — spatial drag + explicit column.
 */
function layoutMatchesCurrent(presetLayout, visibility, columns) {
  for (const k of SECTION_KEYS) {
    if (!!presetLayout.visibility[k] !== !!visibility[k]) return false;
  }
  for (const col of COLUMN_KEYS) {
    const a = presetLayout.columns[col];
    const b = columns[col];
    if (!a || !b || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) return false;
    }
  }
  return true;
}

export default function PresenterLayoutSettings({ open, onClose, layout }) {
  const { visibility, columns, toggleVisibility, moveSectionToPosition, resetLayout, applyLayoutPreset } =
    layout;

  const [dragKey, setDragKey] = useState(null);
  const [hoverCol, setHoverCol] = useState(null);

  useEffect(() => {
    if (!open) {
      setDragKey(null);
      setHoverCol(null);
    }
  }, [open]);

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

  const onDragStart = useCallback((e, key) => {
    e.dataTransfer.setData(DRAG_MIME, key);
    e.dataTransfer.effectAllowed = 'move';
    try {
      e.dataTransfer.setData('text/plain', key);
    } catch {
      /* ignore */
    }
    setDragKey(key);
  }, []);

  const onDragEnd = useCallback(() => {
    setDragKey(null);
    setHoverCol(null);
  }, []);

  const onDragOver = useCallback((e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  }, []);

  const readDragKey = useCallback((e) => {
    return e.dataTransfer.getData(DRAG_MIME) || e.dataTransfer.getData('text/plain') || null;
  }, []);

  const moveToColumnEnd = useCallback(
    (key, targetCol) => {
      moveSectionToPosition(key, targetCol, columns[targetCol].length);
    },
    [moveSectionToPosition, columns],
  );

  if (!open) return null;

  const activePresetId = PRESENTER_LAYOUT_PRESETS.find((p) =>
    layoutMatchesCurrent(p.layout, visibility, columns),
  )?.id;

  const groups = COLUMN_KEYS.map((col, colIdx) => ({
    col,
    colIdx,
    name: COLUMN_LABEL[col],
    keys: columns[col],
  }));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Presenter layout settings"
      className="fixed inset-0 z-deck-presenter flex items-center justify-center p-2 sm:p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-xl shadow-xl flex flex-col overflow-hidden w-full"
        style={{
          maxWidth: 'min(96vw, 960px)',
          maxHeight: 'min(90vh, 820px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        <div
          className="flex items-center justify-between gap-3 px-4 py-3 border-b shrink-0"
          style={{ borderBottomColor: 'var(--cream-hairline)' }}
        >
          <div className="flex items-start gap-2 min-w-0">
            <div
              className="h-9 w-9 rounded-lg shrink-0 flex items-center justify-center"
              style={{
                background: 'color-mix(in srgb, var(--case, var(--amber)) 15%, transparent)',
                color: 'var(--case, var(--amber))',
              }}
            >
              <LayoutGrid className="w-4 h-4" aria-hidden />
            </div>
            <div className="flex flex-col min-w-0">
              <span
                className="deck-mono uppercase truncate"
                style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
              >
                Layout
              </span>
              <span className="text-sm font-medium leading-snug" style={{ color: 'var(--cream)' }}>
                Drag panels into place — or pick a column below each card
              </span>
            </div>
          </div>
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={resetLayout}
              title="Reset layout to defaults"
              aria-label="Reset layout"
              className="h-8 px-2 rounded-lg flex items-center gap-1.5 transition-colors hover:bg-[var(--cream-ghost)]"
              style={{ color: 'var(--cream-muted)', fontSize: '0.7rem', letterSpacing: 'var(--ls-mono)' }}
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="deck-mono uppercase hidden sm:inline">Reset</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="h-8 w-8 rounded-lg flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
              aria-label="Close"
              title="Close · Esc"
              style={{ color: 'var(--cream-muted)' }}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-3 sm:p-4 min-h-0">
          <p
            className="text-xs mb-3 px-0.5"
            style={{ color: 'var(--cream-faint)', lineHeight: 1.5 }}
          >
            The presenter screen has three vertical lanes. <strong style={{ color: 'var(--cream-muted)', fontWeight: 600 }}>Drag</strong> a
            panel by the handle to put it in another lane or change stacking order. Drop on a card to place above it, or in the dashed area
            to add to the bottom of that lane.
          </p>

          <div
            className="mb-4 rounded-lg border p-3"
            style={{
              borderColor: 'var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--cream-ghost) 20%, transparent)',
            }}
          >
            <div className="flex items-center gap-2 mb-2">
              <Bookmark className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--case, var(--amber))' }} aria-hidden />
              <span
                className="deck-mono uppercase"
                style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
              >
                Presets
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {PRESENTER_LAYOUT_PRESETS.map((p) => {
                const isActive = activePresetId === p.id;
                return (
                  <button
                    key={p.id}
                    type="button"
                    title={p.description}
                    onClick={() => applyLayoutPreset(p.id)}
                    className="text-left rounded-lg border px-2.5 py-1.5 max-w-full transition-colors hover:bg-[var(--cream-ghost)]"
                    style={{
                      borderColor: isActive ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                      background: isActive ? 'color-mix(in srgb, var(--case, var(--amber)) 10%, transparent)' : 'transparent',
                      boxShadow: isActive
                        ? '0 0 0 1px color-mix(in srgb, var(--case, var(--amber)) 35%, transparent)'
                        : 'none',
                    }}
                  >
                    <div className="deck-mono text-[0.6rem] uppercase" style={{ color: 'var(--cream)', letterSpacing: 'var(--ls-mono)' }}>
                      {p.label}
                    </div>
                    <div className="text-[0.65rem] mt-0.5 leading-snug hidden sm:block" style={{ color: 'var(--cream-faint)' }}>
                      {p.description}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {groups.map((group) => {
              const isColActive = dragKey && hoverCol === group.col;
              return (
                <div
                  key={group.col}
                  className="flex flex-col rounded-xl border min-h-[140px] transition-[box-shadow,border-color] duration-150"
                  style={{
                    borderColor: isColActive ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                    background: 'color-mix(in srgb, var(--cream-ghost) 25%, var(--panel))',
                    boxShadow: isColActive
                      ? '0 0 0 1px color-mix(in srgb, var(--case, var(--amber)) 50%, transparent)'
                      : 'none',
                  }}
                  onDragEnter={() => setHoverCol(group.col)}
                  onDragLeave={(e) => {
                    if (!e.currentTarget.contains(e.relatedTarget)) setHoverCol(null);
                  }}
                >
                  <div
                    className="px-2.5 py-2 border-b shrink-0"
                    style={{ borderColor: 'var(--cream-hairline)' }}
                  >
                    <div
                      className="deck-mono uppercase"
                      style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
                    >
                      {group.name}
                    </div>
                    <div className="text-xs font-medium mt-0.5" style={{ color: 'var(--cream-muted)' }}>
                      {group.col === 'center' ? 'Main stack' : 'Side stack'}
                    </div>
                  </div>

                  <div className="flex-1 p-2 flex flex-col gap-1 min-h-0" onDragOver={onDragOver}>
                    {group.keys.length === 0 ? (
                      <div
                        role="list"
                        onDragOver={onDragOver}
                        onDrop={(e) => {
                          e.preventDefault();
                          const k = readDragKey(e);
                          if (!k) return;
                          moveSectionToPosition(k, group.col, 0);
                          setDragKey(null);
                          setHoverCol(null);
                        }}
                        className="flex-1 flex items-center justify-center rounded-lg border border-dashed px-2 py-6 text-center text-xs"
                        style={{
                          borderColor: dragKey ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                          color: 'var(--cream-faint)',
                          background: dragKey ? 'color-mix(in srgb, var(--cream-ghost) 50%, transparent)' : 'transparent',
                        }}
                      >
                        Drop a panel here
                      </div>
                    ) : (
                      <ul className="flex flex-col gap-1.5 flex-1" role="list">
                        {group.keys.map((key, idx) => {
                          const isVisible = !!visibility[key];
                          const isDragging = dragKey === key;
                          return (
                            <li
                              key={key}
                              onDragOver={onDragOver}
                              onDrop={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                const k = readDragKey(e);
                                if (!k) return;
                                moveSectionToPosition(k, group.col, idx);
                                setDragKey(null);
                                setHoverCol(null);
                              }}
                              className="rounded-lg border p-1.5 flex flex-col gap-2"
                              style={{
                                borderColor: 'var(--cream-hairline)',
                                background: isVisible
                                  ? isDragging
                                    ? 'color-mix(in srgb, var(--case, var(--amber)) 10%, var(--panel))'
                                    : 'var(--panel)'
                                  : 'color-mix(in srgb, var(--cream-ghost) 55%, var(--panel))',
                                opacity: isVisible ? 1 : 0.72,
                              }}
                            >
                              <div className="flex items-center gap-1.5 min-w-0">
                                <span
                                  draggable
                                  onDragStart={(e) => onDragStart(e, key)}
                                  onDragEnd={onDragEnd}
                                  className="shrink-0 flex items-center justify-center w-7 h-7 rounded-md cursor-grab active:cursor-grabbing transition-colors hover:bg-[var(--cream-ghost)]"
                                  style={{ color: 'var(--cream-faint)' }}
                                  title="Drag to move"
                                  aria-label={`Drag to move ${SECTION_LABEL[key]}`}
                                >
                                  <GripVertical className="w-4 h-4" aria-hidden />
                                </span>
                                <button
                                  type="button"
                                  onClick={() => toggleVisibility(key)}
                                  title={isVisible ? 'Hide in presenter' : 'Show in presenter'}
                                  aria-label={`${isVisible ? 'Hide' : 'Show'} ${SECTION_LABEL[key]}`}
                                  className="h-7 w-7 rounded-md flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)] shrink-0"
                                  style={{ color: isVisible ? 'var(--case, var(--amber))' : 'var(--cream-faint)' }}
                                >
                                  {isVisible ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}
                                </button>
                                <span className="flex-1 text-xs sm:text-sm font-medium leading-tight min-w-0" style={{ color: 'var(--cream)' }}>
                                  {SECTION_LABEL[key]}
                                </span>
                              </div>
                              <label
                                className="flex items-center gap-2 pl-0.5"
                                style={{ color: 'var(--cream-faint)', fontSize: '0.65rem' }}
                              >
                                <span className="deck-mono shrink-0">Move to</span>
                                <select
                                  className="flex-1 min-w-0 rounded-md border bg-transparent py-1 px-1.5 text-xs cursor-pointer outline-none focus:ring-1"
                                  style={{
                                    borderColor: 'var(--cream-hairline)',
                                    color: 'var(--cream-muted)',
                                    letterSpacing: 'var(--ls-mono)',
                                  }}
                                  value={group.col}
                                  aria-label={`Move ${SECTION_LABEL[key]} to column`}
                                  onChange={(e) => {
                                    const next = e.target.value;
                                    if (next === group.col) return;
                                    moveToColumnEnd(key, next);
                                  }}
                                >
                                  {COLUMN_QUICK.map((c) => (
                                    <option key={c.id} value={c.id}>
                                      {c.short} column
                                    </option>
                                  ))}
                                </select>
                              </label>
                            </li>
                          );
                        })}
                        <li
                          onDragOver={onDragOver}
                          onDrop={(e) => {
                            e.preventDefault();
                            const k = readDragKey(e);
                            if (!k) return;
                            moveSectionToPosition(k, group.col, group.keys.length);
                            setDragKey(null);
                            setHoverCol(null);
                          }}
                          className="rounded-lg border border-dashed px-2 py-2 text-center transition-colors"
                          style={{
                            fontSize: '0.65rem',
                            color: 'var(--cream-faint)',
                            borderColor: dragKey ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                            background: dragKey
                              ? 'color-mix(in srgb, var(--cream-ghost) 40%, transparent)'
                              : 'color-mix(in srgb, var(--cream-ghost) 12%, transparent)',
                          }}
                        >
                          Drop to add at bottom
                        </li>
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <p className="text-xs mt-3 px-0.5" style={{ color: 'var(--cream-faint)', lineHeight: 1.5 }}>
            Hidden panels stay in their list order. “Move to” places a panel at the <em>bottom</em> of that column — use drag for exact order.
            Saved on this device.
          </p>
        </div>
      </div>
    </div>
  );
}
