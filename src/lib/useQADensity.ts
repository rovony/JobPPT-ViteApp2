import { useEffect, useState, useCallback } from 'react';

/**
 * useQADensity — per-device toggles controlling which fields render in
 * each Q&A row's COLLAPSED header (when the accordion is shut).
 *
 * The expanded body always shows everything the entry has — these
 * toggles only affect the collapsed-row density. Five fields:
 *
 *   showNumber      Q01, Q02, …
 *   showStars       difficulty stars (★★★)
 *   showTopic       topic pill (STRUCTURE)
 *   showAsker       "from chair" line
 *   showAnswerPreview  first ~120 chars of the answer body when collapsed
 *
 * Three quick presets:
 *   minimal  — only the question text (and number for orientation)
 *   compact  — number + stars + question (default)
 *   full     — everything turned on
 *
 * Settings persist in localStorage so the user's choice carries
 * across reloads (per-device, not per-deck — this is presenter-pane
 * preference, not deck content).
 */

const STORAGE_KEY = 'presenter:qa:density';

const PRESETS = {
  minimal: { showNumber: true,  showStars: false, showTopic: false, showAsker: false, showAnswerPreview: false },
  compact: { showNumber: true,  showStars: true,  showTopic: false, showAsker: false, showAnswerPreview: false },
  full:    { showNumber: true,  showStars: true,  showTopic: true,  showAsker: true,  showAnswerPreview: true  },
};

const DEFAULT = PRESETS.compact;

function readStored() {
  if (typeof window === 'undefined') return DEFAULT;
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT;
    const parsed = JSON.parse(raw);
    return { ...DEFAULT, ...parsed };
  } catch {
    return DEFAULT;
  }
}

export function useQADensity() {
  const [density, setDensity] = useState(readStored);

  useEffect(() => {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(density)); } catch {}
  }, [density]);

  const toggle = useCallback((field) => {
    setDensity((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const setPreset = useCallback((name) => {
    if (PRESETS[name]) setDensity(PRESETS[name]);
  }, []);

  /** Inferred preset label for the current state, for the UI badge.
   *  Returns 'minimal' | 'compact' | 'full' | 'custom'. */
  const matchedPreset = (() => {
    for (const [name, fields] of Object.entries(PRESETS)) {
      if (Object.keys(fields).every((k) => density[k] === fields[k])) return name;
    }
    return 'custom';
  })();

  return { density, toggle, setPreset, matchedPreset };
}

export const QA_DENSITY_FIELDS = [
  { key: 'showNumber',         label: 'Question number',  hint: 'Q01, Q02 …' },
  { key: 'showStars',          label: 'Difficulty stars', hint: '★★★ on a 1–5 scale' },
  { key: 'showTopic',          label: 'Topic chip',       hint: 'STRUCTURE, METHOD, …' },
  { key: 'showAsker',          label: 'Asker line',       hint: '"from chair (likely opener)"' },
  { key: 'showAnswerPreview',  label: 'Answer preview',   hint: 'First line of the answer when collapsed' },
];

export const QA_DENSITY_PRESETS = ['minimal', 'compact', 'full'];
