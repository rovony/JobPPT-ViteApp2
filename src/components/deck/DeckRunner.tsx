// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';
import { useParams, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { AnimatePresence, LayoutGroup, MotionConfig } from 'framer-motion';
import { DeckProvider, useDeck, useKeyboardNav } from '@/lib/deck-store';
import { useDeckOverrides } from '@/lib/useDeckOverrides';
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
import ShareLinkModal from './ShareLinkModal';
import { useTheme } from '@/lib/ThemeContext';
import { cn } from '@/lib/utils';

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

/**
 * FitStage — scales a fixed 1920×1080 slide canvas to fit any viewport
 * via `transform: scale()`. Gated to v3+ decks via `standardLayout.enabled`
 * — legacy v3/v4 decks render unchanged (their slides use viewport-relative
 * sizing already).
 *
 * Why: slides authored for the standard-layout system use fixed pt sizes
 * (e.g. var(--fs-h1-lg) = 72pt) anchored to a 1920×1080 canvas. On smaller
 * viewports the content overflows. FitStage centres a 1920×1080 box
 * inside the deck root and applies a uniform scale that preserves
 * aspect ratio (letterbox / pillarbox as needed).
 *
 * Implementation matches SlidePreview.jsx — fixed pixel inner box with
 * `transformOrigin: center center` so the scaled canvas centres in the
 * outer wrapper at any size. ResizeObserver keeps the scale fresh on
 * window resizes, sidebar toggles, fullscreen enter/exit, etc.
 */
function FitStage({ enabled, children }) {
  const ref = useRef(null);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    if (!enabled || !ref.current) return;
    const el = ref.current;
    const update = () => {
      const { width, height } = el.getBoundingClientRect();
      if (width <= 0 || height <= 0) return;
      setScale(Math.min(width / 1920, height / 1080));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [enabled]);

  if (!enabled) return children;

  return (
    <div
      ref={ref}
      className="absolute inset-0 flex items-center justify-center overflow-hidden"
      data-fit-stage="true"
    >
      <div
        className="relative shrink-0"
        style={{
          width: 1920,
          height: 1080,
          transform: `scale(${scale})`,
          transformOrigin: 'center center',
        }}
      >
        {children}
      </div>
    </div>
  );
}

function DeckStage({ deck, viewMode = 'default', sharePathBase = null, shareHasComments = false, onOpenShare = null }) {
  const isShareView = viewMode === 'share';
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
  const setDeckMode = (next) => {
    if (next !== 'light' && next !== 'dark') return;
    setDeckOverride(next);
    saveOverride(deck.id, next);
  };
  const toggleDeckMode = () => {
    setDeckOverride((prev) => {
      const current = prev ?? deck.themeMode ?? appMode;
      const next = current === 'light' ? 'dark' : 'light';
      saveOverride(deck.id, next);
      return next;
    });
  };

  useKeyboardNav({
    onToggleFullscreen: () => toggle(stageRef.current),
    shareViewer: isShareView,
    isFullscreen,
  });

  // Shared / social links: never allow presenter, dual, or cross-tab role URLs.
  useEffect(() => {
    if (isShareView) setPresenter(false);
  }, [isShareView, setPresenter, deck.id]);

  // ───────────────── Role ⇄ URL (single source of truth) ─────────────────
  // Role lives in the path: /decks/:deckId/s/:slideId/(speaker|audience)?
  // pathSegs[4] is the role token; absence = neutral (audience-default).
  //
  // ?slide=N is preserved as a legacy shortcut. ?fullscreen=1 is gone —
  // press F any time. Share view uses /v/:token/s/:slideId (no role).
  const pathSegsForRole = location.pathname.split('/').filter(Boolean);
  const role = isShareView ? undefined : pathSegsForRole[4]; // 'speaker' | 'audience' | undefined
  const isAudience = isShareView ? false : (role === 'audience');
  const isPresenterRoute = isShareView ? false : (role === 'speaker');

  useEffect(() => {
    const q = new URLSearchParams(location.search);
    const s = parseInt(q.get('slide') || '', 10);
    if (Number.isFinite(s)) goto(s);
     
  }, []);

  // URL → store: when role changes externally (back/forward, manual edit,
  // pasted deep link), mirror into store.presenter. Guarded by equality
  // check so it's a no-op on the very first mount (initialPresenter
  // already matches isPresenterRoute).
  useEffect(() => {
    if (isShareView) return;
    if (isPresenterRoute !== presenter) setPresenter(isPresenterRoute);
     
  }, [isPresenterRoute, isShareView]);

  // Store → URL: when presenter flips locally (P key, Escape, button),
  // navigate to add/remove the /speaker segment. Guarded by equality so
  // the URL→store effect above doesn't echo back into a loop.
  useEffect(() => {
    if (isShareView) return;
    if (presenter === isPresenterRoute) return;
    const slideId = deck.slides[index]?.id ?? String(index);
    const base = `/decks/${deck.id}/s/${encodeURIComponent(slideId)}`;
    const target = presenter ? `${base}/speaker` : (isAudience ? `${base}/audience` : base);
    navigate({ pathname: target, search: location.search }, { replace: true });
     
  }, [presenter, isShareView]);

  // Cross-tab navigation sync for non-presenter tabs (audience AND
  // default/no-role tabs). PresenterView has its own matching
  // broadcast effect, so we gate on `isPresenterRoute` to avoid
  // double-broadcasting from the same tab.
  //   · Subscribe to presenter broadcasts → apply goto().
  //   · When this tab's `index` changes locally (arrow keys on the
  //     audience/presentation display), broadcast it back so the
  //     presenter tab also advances.
  //   · `suppressRef` breaks the echo loop: when we APPLY an incoming
  //     goto, we set suppress so the very next index-change effect
  //     doesn't re-broadcast the same move.
  const audienceChannelRef = useRef(null);
  const audienceSuppressRef = useRef(false);
  useEffect(() => {
    if (isShareView || isPresenterRoute) return;
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
     
  }, [isPresenterRoute, deck.id]);

  useEffect(() => {
    if (isShareView || isPresenterRoute) return;
    if (audienceSuppressRef.current) { audienceSuppressRef.current = false; return; }
    if (!audienceChannelRef.current) return;
    broadcast(audienceChannelRef.current, deck.id, { type: 'goto', index });
  }, [index, isPresenterRoute, deck.id]);

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
  const isDecksDeep = isDecksRoute && pathSegs[2] === 's';
  const isShareDeep = isShareView && pathSegs[0] === 'v' && pathSegs[2] === 's';
  const isDeepLinkRoute = isDecksDeep || isShareDeep;
  const slideIdFromPath = (isDecksDeep || isShareDeep) ? pathSegs[3] : undefined;

  // Bootstrap: if the user arrived at /decks/:deckId (no /s/ segment),
  // promote once to /decks/:deckId/s/:id so the per-index URL sync
  // below has a stable deep-link base to rewrite against. Share links:
  // /v/:token — promote to /v/:token/s/:id.
  // Helper: build deep-link URL preserving the optional /speaker · /audience
  // role suffix (not used for share view).
  const buildDeepLink = (currentId) => {
    if (isShareView && sharePathBase) {
      return `${sharePathBase}/s/${encodeURIComponent(currentId)}`;
    }
    const base = `/decks/${deck.id}/s/${encodeURIComponent(currentId)}`;
    return role ? `${base}/${role}` : base;
  };

  useEffect(() => {
    if (isShareView && sharePathBase) {
      if (pathSegs[0] === 'v' && pathSegs[1] && pathSegs[2] !== 's') {
        const currentId = deck.slides[index]?.id ?? String(index);
        navigate({ pathname: `${sharePathBase}/s/${encodeURIComponent(currentId)}`, search: location.search }, { replace: true });
        return;
      }
    }
    if (!isDecksRoute || isDecksDeep || isShareDeep) return;
    const currentId = deck.slides[index]?.id ?? String(index);
    navigate({ pathname: buildDeepLink(currentId), search: location.search }, { replace: true });
     
  }, [isDecksRoute, isDecksDeep, isShareDeep, isShareView, sharePathBase]);

  useEffect(() => {
    if (!isDeepLinkRoute) return;
    const currentId = deck.slides[index]?.id ?? String(index);
    if (slideIdFromPath === currentId) return;
    navigate({ pathname: buildDeepLink(currentId), search: location.search }, { replace: true });
     
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
     
  }, [slideIdFromPath]);

  const Slide = deck.slides[index]?.component;
  const slideMeta = deck.slides[index];

  useEffect(() => {
    // Prefer manifest.steps; fall back to 0. Runs after index changes /
    // goto. Slides may also call setSteps via useSlideSteps.
    setSteps(slideMeta?.steps ?? 0);
  }, [index, slideMeta?.id, slideMeta?.steps, setSteps]);

  // Track slide views for analytics. Presenter sessions are tagged so
  // they can be filtered out of audience-only analytics.
  useSlideTracker({
    deckId: deck.id,
    slideId: slideMeta?.id,
    slideIndex: index,
    isPresenter: presenter,
    enabled: !isShareView,
  });

  useEffect(() => { document.title = deck.title; }, [deck.title]);

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

  const showShareChrome = isShareView && !isFullscreen;

  return (
    <div
      ref={stageRef}
      data-deck-theme={deck.theme || 'clinical'}
      data-deck-id={deck.id}
      data-theme-mode={effectiveMode /* 'light' | 'dark' | undefined */}
      className={cn(
        'deck-root relative h-[100dvh] overflow-hidden',
        showShareChrome && 'pt-14' /* clear fixed share top bar */
      )}
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
      {/* MotionConfig reducedMotion="user" — single deck-root opt-in
          to honor the OS-level prefers-reduced-motion flag. With this
          set, framer-motion auto-reduces every <motion.*> animation
          in the tree (drops transform/opacity transitions, keeps the
          end state). Closes the deck-wide WCAG 2.3.3 gap that 25+
          slides were leaking individually (slides 03, 10, 13, 15,
          16-22, 23-29, 30-35). GSAP-driven slides (02) still need
          per-slide gating because GSAP runs outside framer-motion. */}
      <MotionConfig reducedMotion="user">
        <LayoutGroup id="qp2-deck-layout">
          <AnimatePresence mode="sync">
            {Slide && (
              <SlideTransition
                key={slideMeta.id || index}
                transition={slideMeta.transition ?? deck.defaultTransition}
              >
                {/* Slides use fluid clamp() tokens (--fs-slide-*) — naturally
                    responsive to viewport. Earlier FitStage wrapper was
                    removed because scale-to-fit + fixed pt sizes produced
                    heavy letterboxing on portrait phones; fluid tokens fill
                    the viewport correctly at any aspect. */}
                <Slide
                  step={step}
                  deck={deck}
                  themeMode={effectiveMode}
                  setThemeMode={setDeckMode}
                />
              </SlideTransition>
            )}
          </AnimatePresence>
        </LayoutGroup>
      </MotionConfig>

      {/* Hide chrome while in Slide Show (fullscreen, no presenter) */}
      {!(isFullscreen && !presenter) && (
        <NavControls
          deck={deck}
          isFullscreen={isFullscreen}
          onToggleFullscreen={() => toggle(stageRef.current)}
          themeMode={effectiveMode}
          onToggleTheme={toggleDeckMode}
          shareViewer={isShareView}
          sharePathBase={isShareView ? sharePathBase : null}
          shareHasComments={isShareView ? shareHasComments : false}
          onOpenShare={!isShareView ? onOpenShare : null}
        />
      )}

      {mode === 'overview' && <DeckOverview deck={deck} readOnly={isShareView} />}
      {!isShareView && presenter && (
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
      {!isShareView && presenter && !isAudience && <LaserController stageRef={stageRef} deckId={deck.id} />}
      {!isShareView && isAudience && <LaserListener deckId={deck.id} />}
    </div>
  );
}

/** Wrap deck with the runtime-ordered slides from useDeckOverrides.
 *  When the user has reordered slides via the Overview's drag-and-drop
 *  (powered by @hello-pangea/dnd), the resulting `ordered` array drives
 *  presentation order — slides advance in the user's order, and the
 *  dynamic NN/TT footer numbering reflects it live. When no overrides
 *  are active, returns deck unchanged (no re-renders). */
function useOrderedDeck(deck) {
  const { ordered } = useDeckOverrides(deck.id, deck.slides);
  // If `ordered` is identity-equal to the manifest (no reorder applied),
  // return the original deck so consumers don't see a new object reference.
  const sameOrder =
    ordered.length === deck.slides.length &&
    ordered.every((s, i) => s.id === deck.slides[i].id);
  if (sameOrder) return deck;
  return { ...deck, slides: ordered };
}

function DeckRunnerInner({ deck, paramSlideIndex }) {
  const orderedDeck = useOrderedDeck(deck);
  const location = useLocation();
  const [shareOpen, setShareOpen] = useState(false);

  let initialIndex = 0;
  if (paramSlideIndex != null) {
    const byId = orderedDeck.slides.findIndex((s) => s.id === paramSlideIndex);
    if (byId >= 0) {
      initialIndex = byId;
    } else {
      const n = parseInt(paramSlideIndex, 10);
      if (Number.isFinite(n)) initialIndex = Math.max(0, Math.min(n, orderedDeck.slides.length - 1));
    }
  }

  const initialRoleSegs = location.pathname.split('/').filter(Boolean);
  const initialRole = initialRoleSegs[4];

  return (
    <DeckProvider
      total={orderedDeck.slides.length}
      slides={orderedDeck.slides}
      initialIndex={initialIndex}
      initialPresenter={initialRole === 'speaker'}
    >
      <DeckStage
        deck={orderedDeck}
        viewMode="default"
        onOpenShare={() => setShareOpen(true)}
      />
      <ShareLinkModal
        open={shareOpen}
        onClose={() => setShareOpen(false)}
        deckId={orderedDeck.id}
        deckTitle={orderedDeck.title}
      />
    </DeckProvider>
  );
}

export default function DeckRunner() {
  const { deckId: paramId, slideIndex: paramSlideIndex } = useParams();
  const location = useLocation();
  const queryId = new URLSearchParams(location.search).get('id');
  const deckId = paramId || queryId;
  const deck = deckId ? getDeck(deckId) : null;

  if (!deck) return <Navigate to="/" replace />;

  // Legacy back-compat: ?presenter=1 / ?audience=1 → promote to path
  // segment (/speaker · /audience). One redirect, then the SPA never
  // sees the query flags again.
  const search = new URLSearchParams(location.search);
  const legacyPresenter = search.get('presenter') === '1';
  const legacyAudience = search.get('audience') === '1' || search.get('fullscreen') === '1';
  if (legacyPresenter || legacyAudience) {
    const targetRole = legacyPresenter ? 'speaker' : 'audience';
    const slidePart = paramSlideIndex ? `/s/${encodeURIComponent(paramSlideIndex)}` : '';
    const cleanQs = new URLSearchParams(location.search);
    cleanQs.delete('presenter');
    cleanQs.delete('audience');
    cleanQs.delete('fullscreen');
    const qs = cleanQs.toString();
    return (
      <Navigate
        to={`/decks/${encodeURIComponent(deckId)}${slidePart}/${targetRole}${qs ? `?${qs}` : ''}`}
        replace
      />
    );
  }

  return <DeckRunnerInner deck={deck} paramSlideIndex={paramSlideIndex} />;
}

export { DeckStage, useOrderedDeck };
