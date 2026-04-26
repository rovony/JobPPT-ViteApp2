import React from 'react';
import { ChevronLeft, ChevronRight, LayoutGrid, Maximize, Minimize } from 'lucide-react';
import { useDeck } from '@/lib/deck-store';
import { cn } from '@/lib/utils';
import ModeSwitcher from './ModeSwitcher';
import TopRightMenu from './TopRightMenu';

function Btn({ onClick, children, label }) {
  const cls = cn(
    'inline-flex items-center justify-center h-9 w-9 rounded-full',
    'backdrop-blur border transition-colors duration-deck-fast ease-deck-out',
    'focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent'
  );
  const style = {
    background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
    borderColor: 'var(--cream-hairline)',
    color: 'var(--cream)',
  };
  return <button onClick={onClick} aria-label={label} className={cls} style={style}>{children}</button>;
}

/**
 * Current display mode — derived purely from flags so the switcher
 * accurately reflects reality (PowerPoint-style).
 */
function currentMode({ presenter, isFullscreen }) {
  if (presenter) return 'presenter';
  if (isFullscreen) return 'slideshow';
  return 'normal';
}

export default function NavControls({ isFullscreen, onToggleFullscreen, themeMode, onToggleTheme, deck }) {
  const { prev, next, toggleMode, togglePresenter, setPresenter, presenter, index, total } = useDeck();
  const mode = currentMode({ presenter, isFullscreen });

  // Mode switcher handlers — each transitions cleanly between modes.
  const goNormal     = () => { if (presenter) setPresenter(false); if (isFullscreen) onToggleFullscreen?.(); };
  const goSlideShow  = () => { if (presenter) setPresenter(false); if (!isFullscreen) onToggleFullscreen?.(); };
  const goPresenter  = () => { if (isFullscreen) onToggleFullscreen?.(); if (!presenter) togglePresenter(); };
  const goDualScreen = () => {
    // Opens audience in a second TAB (not a popup window) so the
    // browser is much less likely to block it. Uses the canonical
    // /audience path segment that DeckRunner reads on mount — the
    // legacy ?audience=1 query is also accepted but the path form
    // survives reload reliably.
    //
    // Anchor-click pattern (vs window.open): browsers consistently
    // treat <a target="_blank" rel="noopener"> as a "new tab" with
    // popup-blocker passes preserved through the user gesture, while
    // window.open with a features string ("noopener,noreferrer") is
    // often heuristically classified as a popup and silently blocked
    // in the foreground tab — which manifested as "Dual Screen does
    // nothing visible".
    const deckId = deck?.id
      || new URLSearchParams(window.location.search).get('id')
      || window.location.pathname.split('/').filter(Boolean)[1];
    const slideId = deck?.slides?.[index]?.id ?? String(index);
    const url = `${window.location.origin}/decks/${encodeURIComponent(deckId)}/s/${encodeURIComponent(slideId)}/audience`;

    // Switch the current tab to presenter view BEFORE opening the
    // audience tab. Doing it after would race with the new-tab open
    // and the user briefly sees the audience URL replace the current
    // tab on some browsers.
    if (!presenter) togglePresenter();

    const a = document.createElement('a');
    a.href = url;
    a.target = '_blank';
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    a.remove();

    // Best-effort popup-block fallback: if the new tab didn't actually
    // open (rare for anchor-click but possible with strict browsers /
    // extensions), copy the URL and tell the user.
    setTimeout(() => {
      // We can't reliably detect anchor-click failures; instead, give
      // the user a clipboard escape hatch via a window.open probe.
      // If THIS open returns null, the browser is definitely blocking.
      const probe = window.open('', '_blank');
      if (probe && !probe.closed) {
        probe.close();
        return;
      }
      navigator.clipboard?.writeText(url).catch(() => {});
      alert(
        'Audience tab couldn\'t open automatically (popup blocked).\n\n' +
        'The URL has been copied to your clipboard — open a new browser ' +
        'tab and paste:\n\n' + url
      );
    }, 250);
  };

  return (
    <>
      {/* Top-right hover/click menu — home, export, theme, analytics, sources */}
      <TopRightMenu
        deck={deck}
        themeMode={themeMode}
        onToggleTheme={onToggleTheme}
      />

      {/* Bottom-right presentation chrome — modes, page no., overview, fullscreen, nav */}
      <div className="fixed bottom-3 right-3 md:bottom-5 md:right-5 z-deck-chrome flex items-center gap-1.5 md:gap-2 flex-wrap justify-end max-w-[calc(100vw-1.5rem)]">
        <ModeSwitcher
          mode={mode}
          onNormal={goNormal}
          onSlideShow={goSlideShow}
          onPresenter={goPresenter}
          onDualScreen={goDualScreen}
        />
        <div
          className="deck-mono text-xs px-3 py-1 rounded-full border whitespace-nowrap"
          style={{
            background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream-muted)',
          }}
        >
          {String(index + 1).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
        <div className="hidden md:flex items-center gap-2">
          <Btn onClick={onToggleFullscreen} label={isFullscreen ? 'Exit fullscreen · F' : 'Fullscreen · F'}>
            {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
          </Btn>
          <Btn onClick={toggleMode} label="Overview · O"><LayoutGrid className="w-4 h-4" /></Btn>
        </div>
        <Btn onClick={prev} label="Previous"><ChevronLeft className="w-4 h-4" /></Btn>
        <Btn onClick={next} label="Next"><ChevronRight className="w-4 h-4" /></Btn>
      </div>
    </>
  );
}