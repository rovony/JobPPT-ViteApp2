// Lightweight deck navigation store (no Zustand dep needed for this scope).
// Uses React context + reducer. Keeps the API surface small and swappable later.
import React, { createContext, useContext, useReducer, useEffect, useMemo } from 'react';

const DeckCtx = createContext(null);

const initial = { index: 0, total: 0, step: 0, steps: 0, mode: 'present', presenter: false };

function reducer(state, action) {
  switch (action.type) {
    case 'init':
      return { ...state, index: action.index ?? 0, total: action.total, step: 0, steps: action.steps ?? 0 };
    case 'setSteps':
      return { ...state, steps: action.steps, step: Math.min(state.step, action.steps) };
    case 'next': {
      if (state.step < state.steps) return { ...state, step: state.step + 1 };
      if (state.index < state.total - 1) return { ...state, index: state.index + 1, step: 0, steps: 0 };
      return state;
    }
    case 'prev': {
      if (state.step > 0) return { ...state, step: state.step - 1 };
      if (state.index > 0) return { ...state, index: state.index - 1, step: 0, steps: 0 };
      return state;
    }
    case 'goto':
      return { ...state, index: Math.max(0, Math.min(action.index, state.total - 1)), step: 0, steps: 0 };
    case 'toggleMode':
      return { ...state, mode: state.mode === 'present' ? 'overview' : 'present' };
    case 'togglePresenter':
      return { ...state, presenter: !state.presenter };
    case 'setPresenter':
      return { ...state, presenter: !!action.value };
    default:
      return state;
  }
}

export function DeckProvider({ total, initialIndex = 0, initialPresenter = false, children }) {
  // initialPresenter is derived from the URL path segment (/speaker) at
  // mount, so the store starts in lock-step with the URL. This is what
  // kills the URL↔store race that previously stripped ?presenter=1 on
  // every full page reload — there's no first-render mismatch to resolve.
  const [state, dispatch] = useReducer(reducer, {
    ...initial,
    total,
    index: initialIndex,
    presenter: !!initialPresenter,
  });

  useEffect(() => {
    dispatch({ type: 'init', total, index: initialIndex });
  }, [total, initialIndex]);

  // Actions are stable — their identities never change. This is essential
  // so consumers like DeckStage can put `setSteps` in a useEffect dep list
  // without triggering an infinite update loop on every state change.
  const actions = useMemo(() => ({
    next: () => dispatch({ type: 'next' }),
    prev: () => dispatch({ type: 'prev' }),
    goto: (index) => dispatch({ type: 'goto', index }),
    setSteps: (steps) => dispatch({ type: 'setSteps', steps }),
    toggleMode: () => dispatch({ type: 'toggleMode' }),
    togglePresenter: () => dispatch({ type: 'togglePresenter' }),
    setPresenter: (value) => dispatch({ type: 'setPresenter', value }),
  }), []);

  const api = useMemo(() => ({ ...state, ...actions }), [state, actions]);

  return <DeckCtx.Provider value={api}>{children}</DeckCtx.Provider>;
}

export function useDeck() {
  const ctx = useContext(DeckCtx);
  if (!ctx) throw new Error('useDeck must be used inside <DeckProvider>');
  return ctx;
}

export function useKeyboardNav({ onToggleFullscreen } = {}) {
  const { next, prev, toggleMode, togglePresenter, presenter, setPresenter } = useDeck();
  useEffect(() => {
    const onKey = (e) => {
      const tag = e.target?.tagName;
      const isEditable = tag === 'INPUT' || tag === 'TEXTAREA' || e.target?.isContentEditable;
      if (isEditable) return;
      // If a modal/dialog is open, defer to its own Escape/close logic.
      // Escape on a modal must NOT also close presenter view — otherwise
      // closing the Reading panel ejects the presenter mid-talk.
      const dialogOpen = document.querySelector('[role="dialog"][aria-modal="true"]');
      if (dialogOpen && e.key === 'Escape') return;
      if (e.key === 'ArrowRight' || e.key === ' ' || e.key === 'PageDown') { e.preventDefault(); next(); }
      else if (e.key === 'ArrowLeft' || e.key === 'PageUp') { e.preventDefault(); prev(); }
      else if (e.key === 'Escape') {
        e.preventDefault();
        if (presenter) setPresenter(false);
        else toggleMode();
      }
      else if (e.key.toLowerCase() === 'o') { e.preventDefault(); toggleMode(); }
      else if (e.key.toLowerCase() === 'p') { e.preventDefault(); togglePresenter(); }
      else if (e.key.toLowerCase() === 'f') { e.preventDefault(); onToggleFullscreen?.(); }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [next, prev, toggleMode, togglePresenter, presenter, setPresenter, onToggleFullscreen]);
}