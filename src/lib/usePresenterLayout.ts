import { useEffect, useState, useCallback } from 'react';

/**
 * usePresenterLayout — per-device presenter view layout preferences.
 *
 * THREE dimensions:
 *   • visibility — which sections render at all
 *   • column assignment — which column (left/center/right) each section
 *     lives in. Sections can move freely between columns via the Layout
 *     settings dialog and drag-and-drop.
 *   • order within column — drag-and-drop or `moveSectionToPosition`
 *   • named presets — `PRESENTER_LAYOUT_PRESETS` + `applyLayoutPreset`
 *
 * Storage shape v2 (current):
 *   { visibility: {...}, columns: { left: [...], center: [...], right: [...] } }
 *
 * Storage shape v1 (legacy, migrated automatically):
 *   { visibility: {...}, centerOrder: [...], rightOrder: [...] }
 *   The migration assumes 'assistant' was always in left, which it was.
 *
 * Persisted under `presenter:layout`.
 */

export const SECTION_KEYS = ['assistant', 'notes', 'anticipatedQA', 'nowTile', 'nextTile', 'audienceQA'];
export const COLUMN_KEYS = ['left', 'center', 'right'];

export const SECTION_LABEL = {
  assistant:     'Presenter assistant',
  notes:         'Speaker notes',
  anticipatedQA: 'Anticipated Q&A',
  nowTile:       'Now slide tile',
  nextTile:      'Next slide tile',
  audienceQA:    'Audience Q&A (live)',
};

export const COLUMN_LABEL = {
  left:   'Left column',
  center: 'Center column',
  right:  'Right column',
};

const DEFAULT_LAYOUT = {
  visibility: {
    assistant: true,
    notes: true,
    anticipatedQA: true,
    nowTile: true,
    nextTile: true,
    audienceQA: true,
  },
  columns: {
    left:   ['assistant'],
    center: ['notes', 'anticipatedQA'],
    right:  ['nowTile', 'nextTile', 'audienceQA'],
  },
};

/**
 * One-click layout snapshots. `layout` is a full { visibility, columns } v2
 * object; `applyLayoutPreset` merges with defaults so future section keys
 * are still handled safely.
 */
export const PRESENTER_LAYOUT_PRESETS = [
  {
    id: 'balanced',
    label: 'Balanced',
    description: 'All panels on; assistant left, notes + anticipated Q&A center, slides + live Q&A right.',
    layout: {
      visibility: {
        assistant: true,
        notes: true,
        anticipatedQA: true,
        nowTile: true,
        nextTile: true,
        audienceQA: true,
      },
      columns: {
        left: ['assistant'],
        center: ['notes', 'anticipatedQA'],
        right: ['nowTile', 'nextTile', 'audienceQA'],
      },
    },
  },
  {
    id: 'no_live_audience',
    label: 'No live Q&A',
    description: 'Hides the audience moderation strip. Everything else matches Balanced.',
    layout: {
      visibility: {
        assistant: true,
        notes: true,
        anticipatedQA: true,
        nowTile: true,
        nextTile: true,
        audienceQA: false,
      },
      columns: {
        left: ['assistant'],
        center: ['notes', 'anticipatedQA'],
        right: ['nowTile', 'nextTile', 'audienceQA'],
      },
    },
  },
  {
    id: 'speaker_centric',
    label: 'Speaker + AI',
    description: 'Notes in the center; anticipated Q&A left; now/next, live Q&A, then assistant at the bottom of the right column.',
    layout: {
      visibility: {
        assistant: true,
        notes: true,
        anticipatedQA: true,
        nowTile: true,
        nextTile: true,
        audienceQA: true,
      },
      columns: {
        left: ['anticipatedQA'],
        center: ['notes'],
        right: ['nowTile', 'nextTile', 'audienceQA', 'assistant'],
      },
    },
  },
  {
    id: 'speaker_no_ai',
    label: 'Speaker (no AI)',
    description: 'Same regions as Speaker + AI, but the presenter assistant is off. Notes center, Q&A left, slides and live Q&A on the right.',
    layout: {
      visibility: {
        assistant: false,
        notes: true,
        anticipatedQA: true,
        nowTile: true,
        nextTile: true,
        audienceQA: true,
      },
      columns: {
        left: ['anticipatedQA'],
        center: ['notes'],
        right: ['nowTile', 'nextTile', 'audienceQA', 'assistant'],
      },
    },
  },
  {
    id: 'rehearsal',
    label: 'Rehearsal',
    description: 'Like Speaker + AI, but live audience is off. Notes center, Q&A left, now/next/AI on the right.',
    layout: {
      visibility: {
        assistant: true,
        notes: true,
        anticipatedQA: true,
        nowTile: true,
        nextTile: true,
        audienceQA: false,
      },
      columns: {
        left: ['anticipatedQA'],
        center: ['notes'],
        right: ['nowTile', 'nextTile', 'audienceQA', 'assistant'],
      },
    },
  },
];

const STORAGE_KEY = 'presenter:layout';

function readStored() {
  if (typeof window === 'undefined') return DEFAULT_LAYOUT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_LAYOUT;
    return mergeWithDefaults(JSON.parse(raw));
  } catch {
    return DEFAULT_LAYOUT;
  }
}

/** Defensive merge — handles both legacy v1 (centerOrder/rightOrder) and
 *  v2 (columns) shapes. New sections that didn't exist when the user's
 *  preferences were saved appear in their default column. */
function mergeWithDefaults(stored) {
  const visibility = { ...DEFAULT_LAYOUT.visibility, ...(stored?.visibility || {}) };
  let columns;
  if (stored?.columns) {
    // v2 shape — sanitize against current SECTION_KEYS list
    columns = {
      left:   sanitizeColumn(stored.columns.left,   DEFAULT_LAYOUT.columns.left),
      center: sanitizeColumn(stored.columns.center, DEFAULT_LAYOUT.columns.center),
      right:  sanitizeColumn(stored.columns.right,  DEFAULT_LAYOUT.columns.right),
    };
    // Re-place any section missing from all columns (newly added) into
    // its default column at the end.
    const placed = new Set([...columns.left, ...columns.center, ...columns.right]);
    for (const k of SECTION_KEYS) {
      if (!placed.has(k)) {
        const defaultCol = findDefaultColumn(k);
        columns[defaultCol].push(k);
      }
    }
  } else if (stored?.centerOrder || stored?.rightOrder) {
    // v1 → v2 migration. Assistant always lived in left.
    columns = {
      left:   ['assistant'],
      center: sanitizeColumn(stored.centerOrder, DEFAULT_LAYOUT.columns.center),
      right:  sanitizeColumn(stored.rightOrder,  DEFAULT_LAYOUT.columns.right),
    };
  } else {
    columns = DEFAULT_LAYOUT.columns;
  }
  return { visibility, columns };
}

function sanitizeColumn(stored, fallback) {
  if (!Array.isArray(stored)) return [...fallback];
  // Keep only keys that are still valid section keys; drop unknown ones.
  return stored.filter((k) => SECTION_KEYS.includes(k));
}

function findDefaultColumn(key) {
  for (const col of COLUMN_KEYS) {
    if (DEFAULT_LAYOUT.columns[col].includes(key)) return col;
  }
  return 'center';
}

export function usePresenterLayout() {
  const [layout, setLayout] = useState(readStored);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(layout)); } catch {}
  }, [layout]);

  const setVisibility = useCallback((key, visible) => {
    setLayout((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: !!visible } }));
  }, []);

  const toggleVisibility = useCallback((key) => {
    setLayout((prev) => ({ ...prev, visibility: { ...prev.visibility, [key]: !prev.visibility[key] } }));
  }, []);

  /** Find which column a section currently lives in. */
  const findColumn = useCallback((key, currentLayout) => {
    const target = currentLayout || layout;
    for (const col of COLUMN_KEYS) {
      if (target.columns[col].includes(key)) return col;
    }
    return null;
  }, [layout]);

  /** Move section up/down WITHIN its current column. */
  const moveSection = useCallback((key, direction) => {
    setLayout((prev) => {
      const col = COLUMN_KEYS.find((c) => prev.columns[c].includes(key));
      if (!col) return prev;
      const arr = [...prev.columns[col]];
      const idx = arr.indexOf(key);
      const next = idx + (direction === 'up' ? -1 : 1);
      if (next < 0 || next >= arr.length) return prev;
      [arr[idx], arr[next]] = [arr[next], arr[idx]];
      return { ...prev, columns: { ...prev.columns, [col]: arr } };
    });
  }, []);

  /** Move section to an adjacent column (left/right). Appends to the end
   *  of the destination column so the user can then reorder within it. */
  const moveSectionToColumn = useCallback((key, direction) => {
    setLayout((prev) => {
      const fromCol = COLUMN_KEYS.find((c) => prev.columns[c].includes(key));
      if (!fromCol) return prev;
      const fromIdx = COLUMN_KEYS.indexOf(fromCol);
      const toIdx = fromIdx + (direction === 'left' ? -1 : 1);
      if (toIdx < 0 || toIdx >= COLUMN_KEYS.length) return prev;
      const toCol = COLUMN_KEYS[toIdx];
      const fromArr = prev.columns[fromCol].filter((k) => k !== key);
      const toArr = [...prev.columns[toCol], key];
      return { ...prev, columns: { ...prev.columns, [fromCol]: fromArr, [toCol]: toArr } };
    });
  }, []);

  /**
   * Move `key` into `targetCol` at `targetIndex` (0 = first). Works across
   * columns and for reordering within a column. Hidden sections are still
   * listed in the column arrays — this only changes order/assignment.
   */
  const moveSectionToPosition = useCallback((key, targetCol, targetIndex) => {
    if (!COLUMN_KEYS.includes(targetCol) || !SECTION_KEYS.includes(key)) return;
    setLayout((prev) => {
      const sourceCol = COLUMN_KEYS.find((c) => prev.columns[c].includes(key));
      if (!sourceCol) return prev;
      const oldIdx = prev.columns[sourceCol].indexOf(key);
      const cols = {
        left: [...prev.columns.left],
        center: [...prev.columns.center],
        right: [...prev.columns.right],
      };
      cols[sourceCol] = cols[sourceCol].filter((k) => k !== key);
      let insert = targetIndex;
      if (sourceCol === targetCol) {
        if (oldIdx < insert) insert -= 1;
      }
      insert = Math.max(0, Math.min(insert, cols[targetCol].length));
      const d = cols[targetCol];
      cols[targetCol] = [...d.slice(0, insert), key, ...d.slice(insert)];
      return { ...prev, columns: cols };
    });
  }, []);

  const resetLayout = useCallback(() => setLayout(DEFAULT_LAYOUT), []);

  const applyLayoutPreset = useCallback((presetId) => {
    const preset = PRESENTER_LAYOUT_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    setLayout(mergeWithDefaults(preset.layout));
  }, []);

  // Convenience derived getters — visible sections per column, in order.
  const visibleIn = useCallback(
    (col) => layout.columns[col].filter((k) => layout.visibility[k]),
    [layout],
  );

  return {
    visibility: layout.visibility,
    columns: layout.columns,
    setVisibility,
    toggleVisibility,
    moveSection,
    moveSectionToColumn,
    moveSectionToPosition,
    findColumn,
    visibleIn,
    resetLayout,
    applyLayoutPreset,
  };
}
