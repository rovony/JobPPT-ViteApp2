import { useCallback, useEffect, useState } from 'react';

/**
 * useNotesSectionVisibility — per-device toggles for structured speaker
 * notes (## Spoken / ## Cues / ## Bridge). Mirrors the Q&A "density"
 * pattern in useQADensity: presets + persistence in localStorage.
 *
 * Cues, when shown, still open collapsed until the presenter expands
 * them (StructuredNotesView). Turning "Cues" off here removes the block
 * entirely.
 */

const STORAGE_KEY = 'presenter:notes:sections';

const PRESETS = {
  all: {
    showSpoken: true,
    showCues: true,
    showBridge: true,
  },
  /** Script only — big reading area, no stage directions or segue. */
  script: { showSpoken: true, showCues: false, showBridge: false },
  /** Spoken + segue, no stage directions. */
  scriptAndSegue: { showSpoken: true, showCues: false, showBridge: true },
  /** Hide the Bridge block (some decks only use Spoken + Cues). */
  noSegue: { showSpoken: true, showCues: true, showBridge: false },
};

const DEFAULT = { ...PRESETS.all };

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

export function useNotesSectionVisibility() {
  const [visibility, setVisibility] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(visibility));
    } catch {
      /* ignore */
    }
  }, [visibility]);

  const toggle = useCallback((field) => {
    setVisibility((prev) => ({ ...prev, [field]: !prev[field] }));
  }, []);

  const setPreset = useCallback((name) => {
    if (PRESETS[name]) setVisibility({ ...PRESETS[name] });
  }, []);

  const matchedPreset = (() => {
    for (const [name, fields] of Object.entries(PRESETS)) {
      if (Object.keys(fields).every((k) => visibility[k] === fields[k])) return name;
    }
    return 'custom';
  })();

  return { visibility, toggle, setPreset, matchedPreset };
}

export const NOTES_SECTION_FIELDS = [
  {
    key: 'showSpoken',
    label: 'Spoken',
    hint: 'Numbered script (## Spoken)',
  },
  {
    key: 'showCues',
    label: 'Cues',
    hint: 'Stage directions (## Cues) — collapsible list when on',
  },
  {
    key: 'showBridge',
    label: 'Bridge',
    hint: 'Segue / advance line (## Bridge)',
  },
];

/** Preset id list for UI — order matters */
export const NOTES_VIEW_PRESETS = ['all', 'script', 'scriptAndSegue', 'noSegue'];

export const NOTES_PRESET_LABEL = {
  all: 'All',
  script: 'Script',
  scriptAndSegue: 'Script+Segue',
  noSegue: 'No segue',
};
