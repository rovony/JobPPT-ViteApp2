import { useCallback, useEffect, useState } from 'react';

/**
 * usePresenterChrome — per-device presenter top-bar preferences.
 * Persisted under `presenter:chrome`.
 */

const STORAGE_KEY = 'presenter:chrome';

const DEFAULT = {
  showTimer: true,
};

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

export function usePresenterChrome() {
  const [chrome, setChrome] = useState(readStored);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(chrome));
    } catch {
      /* ignore */
    }
  }, [chrome]);

  const setShowTimer = useCallback((visible: boolean) => {
    setChrome((prev) => ({ ...prev, showTimer: !!visible }));
  }, []);

  const toggleShowTimer = useCallback(() => {
    setChrome((prev) => ({ ...prev, showTimer: !prev.showTimer }));
  }, []);

  return {
    showTimer: chrome.showTimer,
    setShowTimer,
    toggleShowTimer,
  };
}
