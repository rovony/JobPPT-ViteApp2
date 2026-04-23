import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { DeckProvider, useDeck, useKeyboardNav } from '@/lib/deck-store';
import { useFullscreen } from '@/lib/useFullscreen';
import { useSlideTracker } from '@/lib/useSlideTracker';
import { getDeck } from '@/decks/registry';
import { makeChannel, subscribe } from '@/lib/presenter-sync';
import ProgressBar from './ProgressBar';
import NavControls from './NavControls';
import DeckOverview from './DeckOverview';
import PresenterView from './PresenterView';
import SlideTransition from './SlideTransition';
import LaserController from './LaserController';
import LaserListener from './LaserListener';
import { useTheme } from '@/lib/ThemeContext';

// Per-deck theme override. `null` = follow deck default (+ global app theme
// as a further fallback). 'light' | 'dark' = scoped override for this deck.
const DECK_OVERRIDE_KEY = (deckId) => `deck-theme-override:${deckId}`;
function loadOverride(deckId) {
  try {
    const v = localStorage.getItem(DECK_OVERRIDE_KEY(deckId));
    return v === 'light' || v === 'dark' ? v : null;
  } catch { return null; }
}
function saveOverride(deckId, value) {
  try {
    if (value == null) localStorage.removeItem(DECK_OVERRIDE_KEY(deckId));
    else localStorage.setItem(DECK_OVERRIDE_KEY(deckId), value);
  } catch {}
}

function DeckStage({ deck }) {
  const { index, step, setSteps, mode, presenter, setPresenter, goto } = useDeck();
  const location = useLocation();
  const navigate = useNavigate();
  const stageRef = useRef(null);
  const { isFullscreen, enter, exit, toggle } = useFullscreen();
  const [cursorHidden, setCursorHidden] = useState(false);

  // Per-deck theme override — initialised from localStorage so the
  // choice survives reloads. When `null`, the deck falls back to its
  // manifest `themeMode` (or the global app theme if also unset).
  const { mode: appMode } = useTheme();
  const [deckOverride, setDeckOverride] = useState(() => loadOverride(deck.id));
  const effectiveMode = deckOverride ?? deck.themeMode ?? appMode;
  const toggleDeckMode = () => {
    setDeckOverride((prev) => {
      const current = prev ?? deck.themeMode ?? appMode;
      const next = current === 'light' ? 'dark' : 'light';
      saveOverride(deck.id, next);
      return next;
    });
  };

  useKeyboardNav({ onToggleFullscreen: () => toggle(stageRef.current) });

  // URL params: ?presenter=1 opens presenter view · ?audience=1 marks a
  // dual-screen audience tab (so it subscribes to presenter navigation).
  // Also support ?slide=N as a legacy shortcut.
  // ?fullscreen=1 is kept for back-compat but no longer forces an
  // overlay — the user can press F any time, and most dual-screen
  // setups mirror the browser window anyway.
  const [isAudience, setIsAudience] = useState(false);
  useEffect(() => {
    const q = new URLSearchParams(location.search);
    if (q.get('presenter') === '1') setPresenter(true);
    if (q.get('audience') === '1' || q.get('fullscreen') === '1') setIsAudience(true);
    const s = parseInt(q.get('slide') || '', 10);
    if (Number.isFinite(s)) goto(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Audience tab: subscribe to cross-tab navigation messages from the
  // presenter tab so Next/Prev stays in sync across the two windows.
  useEffect(() => {
    if (!isAudience) return;
    const channel = makeChannel();
    const unsub = subscribe(channel, deck.id, (msg) => {
      if (msg?.type === 'goto' && typeof msg.index === 'number') goto(msg.index);
    });
    return () => { unsub(); channel?.close?.(); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudience, deck.id]);

  // ───────────────── URL ⇄ slide state sync ─────────────────
  // The slide id (preferred) or numeric index is the 4th path segment:
  //   /decks/:deckId/s/:slideId
  // Effect A: when `index` changes (user advances, keyboard, overview),
  //   rewrite the URL with history.replaceState so reloads/back-links
  //   land on the same slide. We replace (not push) so back/forward don't
  //   balloon into one entry per slide; the deck is a single document.
  // Effect B: when the URL path changes externally (user edits URL, or
  //   pastes a deep link), sync the store to match.
  // Only sync the URL ⇄ slide state when we're already on the
  // /decks/:deckId/s/:slideId route. If the user arrived via the
  // legacy /Deck?id=X route, DON'T rewrite the URL — doing so would
  // swap the matched <Route> element and remount DeckRunner, which
  // resets state and can swallow the very next keypress (the reason
  // "the first arrow-key press seems to do nothing").
  const pathSegs = location.pathname.split('/').filter(Boolean);
  const isDeepLinkRoute = pathSegs[0] === 'decks' && pathSegs[2] === 's';
  const slideIdFromPath = isDeepLinkRoute ? pathSegs[3] : undefined;
  useEffect(() => {
    if (!isDeepLinkRoute) return;
    const currentId = deck.slides[index]?.id ?? String(index);
    if (slideIdFromPath === currentId) return;
    const base = `/decks/${deck.id}/s/${encodeURIComponent(currentId)}`;
    navigate({ pathname: base, search: location.search }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index, deck.id, isDeepLinkRoute]);

  useEffect(() => {
    if (!slideIdFromPath) return;
    // Match by slide id first; fall back to numeric index.
    let target = deck.slides.findIndex((s) => s.id === slideIdFromPath);
    if (target < 0) {
      const n = parseInt(slideIdFromPath, 10);
      if (Number.isFinite(n)) target = Math.max(0, Math.min(n, deck.slides.length - 1));
    }
    if (target >= 0 && target !== index) goto(target);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slideIdFromPath]);

  const Slide = deck.slides[index]?.component;
  const slideMeta = deck.slides[index];

  useEffect(() => { setSteps(slideMeta?.steps ?? 0); }, [index, slideMeta, setSteps]);

  // Track slide views for analytics. Presenter sessions are tagged so
  // they can be filtered out of audience-only analytics.
  useSlideTracker({
    deckId: deck.id,
    slideId: slideMeta?.id,
    slideIndex: index,
    isPresenter: presenter,
  });

  useEffect(() => { document.title = `${deck.title} — Deck Studio`; }, [deck.title]);

  // Lock page scroll while a deck is mounted
  useEffect(() => {
    const prevHtml = document.documentElement.style.overflow;
    const prevBody = document.body.style.overflow;
    document.documentElement.style.overflow = 'hidden';
    document.body.style.overflow = 'hidden';
    return () => {
      document.documentElement.style.overflow = prevHtml;
      document.body.style.overflow = prevBody;
    };
  }, []);

  // Auto-hide cursor in fullscreen after idle
  useEffect(() => {
    if (!isFullscreen) { setCursorHidden(false); return; }
    let t;
    const reset = () => {
      setCursorHidden(false);
      clearTimeout(t);
      t = setTimeout(() => setCursorHidden(true), 2500);
    };
    reset();
    window.addEventListener('mousemove', reset);
    window.addEventListener('keydown', reset);
    return () => {
      clearTimeout(t);
      window.removeEventListener('mousemove', reset);
      window.removeEventListener('keydown', reset);
    };
  }, [isFullscreen]);

  return (
    <div
      ref={stageRef}
      data-deck-theme={deck.theme || 'clinical'}
      data-theme-mode={effectiveMode /* 'light' | 'dark' | undefined */}
      className="deck-root relative h-[100dvh] overflow-hidden"
      style={{ cursor: cursorHidden ? 'none' : 'auto' }}
    >
      <ProgressBar />
      {/* popLayout keeps the exiting slide in the DOM (out of flow) while
          the incoming slide mounts, so framer-motion can match layoutId
          between elements on adjacent slides and run shared-element
          transitions (e.g. the Lynch lungs morphing from slide 5 → 6). */}
      <AnimatePresence mode="popLayout">
        {Slide && (
          <SlideTransition
            key={slideMeta.id || index}
            transition={slideMeta.transition ?? deck.defaultTransition}
          >
            <Slide step={step} deck={deck} />
          </SlideTransition>
        )}
      </AnimatePresence>

      {/* Hide chrome while in Slide Show (fullscreen, no presenter) */}
      {!(isFullscreen && !presenter) && (
        <NavControls
          deck={deck}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => toggle(stageRef.current)}
          themeMode={effectiveMode}
          onToggleTheme={toggleDeckMode}
        />
      )}

      {mode === 'overview' && <DeckOverview deck={deck} />}
      {presenter && (
        <PresenterView
          deck={deck}
          onClose={() => setPresenter(false)}
          onToggleFullscreen={() => toggle(stageRef.current)}
          isFullscreen={isFullscreen}
          stageRef={stageRef}
        />
      )}

      {/* Laser pointer + drawing — presenter broadcasts, audience mirrors.
          Neither mounts on a plain (non-presenter, non-audience) tab. */}
      {presenter && !isAudience && <LaserController stageRef={stageRef} deckId={deck.id} />}
      {isAudience && <LaserListener deckId={deck.id} />}
    </div>
  );
}

export default function DeckRunner() {
  const { deckId: paramId, slideIndex: paramSlideIndex } = useParams();
  const location = useLocation();
  const queryId = new URLSearchParams(location.search).get('id');
  const deckId = paramId || queryId;
  const deck = deckId ? getDeck(deckId) : null;
  if (!deck) return <Navigate to="/" replace />;

  // The path segment can be either a slide id (e.g. "title", "hook") or a
  // numeric index. Resolve in that order — ids are the stable, human-friendly
  // identifier; numeric indices are supported for back-compat.
  let initialIndex = 0;
  if (paramSlideIndex != null) {
    const byId = deck.slides.findIndex((s) => s.id === paramSlideIndex);
    if (byId >= 0) {
      initialIndex = byId;
    } else {
      const n = parseInt(paramSlideIndex, 10);
      if (Number.isFinite(n)) initialIndex = Math.max(0, Math.min(n, deck.slides.length - 1));
    }
  }

  return (
    <DeckProvider total={deck.slides.length} initialIndex={initialIndex}>
      <DeckStage deck={deck} />
    </DeckProvider>
  );
}