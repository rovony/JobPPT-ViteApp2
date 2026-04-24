import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate, useSearchParams, Navigate } from 'react-router-dom';
import { AnimatePresence, LayoutGroup } from 'framer-motion';
import { DeckProvider, useDeck, useKeyboardNav } from '@/lib/deck-store';
import { useFullscreen } from '@/lib/useFullscreen';
import { useSlideTracker } from '@/lib/useSlideTracker';
import { getDeck } from '@/decks/registry';
import { makeChannel, subscribe, broadcast } from '@/lib/presenter-sync';
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
  const [searchParams, setSearchParams] = useSearchParams();
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
    if (q.get('audience') === '1' || q.get('fullscreen') === '1') setIsAudience(true);
    const s = parseInt(q.get('slide') || '', 10);
    if (Number.isFinite(s)) goto(s);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ───────────────── Presenter ⇄ URL sync ─────────────────
  // The presenter flag is encoded as ?presenter=1 so it survives a full
  // page reload (a hard requirement — live demos can't afford to lose
  // the presenter view mid-talk). Two directions:
  //   A) URL → store: on mount AND whenever the search string changes
  //      (e.g. back/forward, paste of a deep link), mirror ?presenter=1
  //      into the store's `presenter` boolean.
  //   B) Store → URL: whenever `presenter` flips in the store (toggle
  //      button, `P` key, Escape), write/remove the param with `replace`
  //      so we don't balloon the history stack on every toggle.
  // The two effects guard against feedback loops by comparing the
  // current URL value before writing.
  const presenterParam = searchParams.get('presenter') === '1';
  useEffect(() => {
    if (presenterParam !== presenter) setPresenter(presenterParam);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenterParam]);
  useEffect(() => {
    const current = searchParams.get('presenter') === '1';
    if (current === presenter) return;
    const next = new URLSearchParams(searchParams);
    if (presenter) next.set('presenter', '1');
    else next.delete('presenter');
    setSearchParams(next, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [presenter]);

  // Audience tab: bidirectional cross-tab navigation sync.
  //   · Subscribe to presenter broadcasts → apply goto().
  //   · When this tab's `index` changes locally (arrow keys on the
  //     audience display), broadcast it back so the presenter tab also
  //     advances. Prevents drift when someone clicks on the audience
  //     monitor out of habit.
  //   · `suppressRef` breaks the echo loop: when we APPLY an incoming
  //     goto, we set suppress so the very next index-change effect
  //     doesn't re-broadcast the same move.
  // PresenterView has its own matching broadcast effect, so we're
  // careful NOT to also broadcast here when the tab is presenter-side
  // (presenter && !isAudience) — otherwise every navigation would
  // fire twice.
  const audienceChannelRef = useRef(null);
  const audienceSuppressRef = useRef(false);
  useEffect(() => {
    if (!isAudience) return;
    audienceChannelRef.current = makeChannel();
    const unsub = subscribe(audienceChannelRef.current, deck.id, (msg) => {
      if (msg?.type === 'goto' && typeof msg.index === 'number') {
        audienceSuppressRef.current = true;
        goto(msg.index);
      }
    });
    return () => {
      unsub();
      audienceChannelRef.current?.close?.();
      audienceChannelRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAudience, deck.id]);

  useEffect(() => {
    if (!isAudience) return;
    if (audienceSuppressRef.current) { audienceSuppressRef.current = false; return; }
    if (!audienceChannelRef.current) return;
    broadcast(audienceChannelRef.current, deck.id, { type: 'goto', index });
  }, [index, isAudience, deck.id]);

  // ───────────────── URL ⇄ slide state sync ─────────────────
  // The slide id (preferred) or numeric index is the 4th path segment:
  //   /decks/:deckId/s/:slideId
  // Effect A: when `index` changes (user advances, keyboard, overview),
  //   rewrite the URL with navigate(..., { replace: true }) so reloads/
  //   back-links land on the same slide. We replace (not push) so
  //   back/forward don't balloon into one entry per slide; the deck is
  //   a single document.
  // Effect B: when the URL path changes externally (user edits URL, or
  //   pastes a deep link), sync the store to match.
  // Exception: the legacy /Deck?id=X entry is NOT a /decks/... path, so
  //   we leave it alone — rewriting would swap <Route> elements, remount
  //   this component, and swallow the next keypress. That route only
  //   matters for back-compat with old bookmarks.
  const pathSegs = location.pathname.split('/').filter(Boolean);
  const isDecksRoute = pathSegs[0] === 'decks';
  const isDeepLinkRoute = isDecksRoute && pathSegs[2] === 's';
  const slideIdFromPath = isDeepLinkRoute ? pathSegs[3] : undefined;

  // Bootstrap: if the user arrived at /decks/:deckId (no /s/ segment),
  // promote once to /decks/:deckId/s/:id so the per-index URL sync
  // below has a stable deep-link base to rewrite against. Same
  // <DeckRunner> element handles both routes, so this is a param-only
  // change (no component remount), safe for keyboard input.
  useEffect(() => {
    if (!isDecksRoute || isDeepLinkRoute) return;
    const currentId = deck.slides[index]?.id ?? String(index);
    const base = `/decks/${deck.id}/s/${encodeURIComponent(currentId)}`;
    navigate({ pathname: base, search: location.search }, { replace: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDecksRoute, isDeepLinkRoute]);

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
      {/* mode="sync" — both the exiting and entering slides render
          simultaneously during the transition. Combined with
          position:absolute on SlideTransition's motion.div (so they
          stack at the same coordinates), this lets framer-motion match
          layoutId elements between adjacent slides with both endpoints
          actually present on screen at once, producing a real morph
          instead of a fade+disappear. popLayout removed the exiting
          slide from flow, and its parent's opacity fade was consuming
          the shared element before the morph could complete. */}
      {/* LayoutGroup is REQUIRED for cross-slide shared-element
          (layoutId) transitions. Without it, framer-motion only matches
          layoutIds inside the same component subtree — the lung on
          slide 5 and the lung on slide 6 would be treated as unrelated.
          LayoutGroup tells framer-motion to match layoutIds across ALL
          descendants, which is what makes the Lynch lung flight from
          slide 5 → 6 actually happen. Confirmed necessary by the v0
          prototype and independent review. */}
      <LayoutGroup id="qp2-deck-layout">
        <AnimatePresence mode="sync">
          {Slide && (
            <SlideTransition
              key={slideMeta.id || index}
              transition={slideMeta.transition ?? deck.defaultTransition}
            >
              <Slide step={step} deck={deck} />
            </SlideTransition>
          )}
        </AnimatePresence>
      </LayoutGroup>

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