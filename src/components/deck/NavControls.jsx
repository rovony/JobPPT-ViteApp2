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
    // Opens audience in a second tab — stays in sync with this tab via
    // BroadcastChannel (Next/Prev mirror across windows). This tab flips
    // to presenter. Most dual-screen setups mirror the browser window,
    // so we no longer force fullscreen — press F on the audience tab if
    // you want that. `audience=1` enables the cross-tab navigation listener.
    const deckId = new URLSearchParams(window.location.search).get('id') || window.location.pathname.split('/').pop();
    const url = `${window.location.origin}/Deck?id=${deckId}&audience=1&slide=${index}`;
    window.open(url, `deck-audience-${deckId}`, 'noopener,noreferrer');
    if (!presenter) togglePresenter();
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