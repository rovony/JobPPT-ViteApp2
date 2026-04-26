import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Home, BarChart3, FolderOpen, FileText, Presentation, Loader2, Wrench, Layers, BookOpen, Sun, Moon, Share2 } from 'lucide-react';
import { exportDeckToPDF, exportDeckToPPTX, exportDeckToPDFAndPPTX, summaryLine } from '@/lib/deck-export';
import { useAuth } from '@/lib/AuthContext';
import { toast } from '@/components/ui/use-toast';

/**
 * TopRightMenu — a compact icon button in the top-right corner that
 * reveals a settings / secondary-actions menu on hover (desktop) or
 * click (touch). Houses the "less-frequent" actions — home, export,
 * theme, share link, analytics, sources — so the bottom-right chrome can stay
 * focused on presentation navigation (mode switcher, prev/next).
 *
 * Styling is fully token-driven (no hardcoded colors).
 */
export default function TopRightMenu({
  deck,
  themeMode,
  onToggleTheme,
  onOpenSources,
  onOpenShare,
}) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [busy, setBusy] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const abortRef = useRef(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Hover intent: open on hover-in with zero delay, close on hover-out
  // after a short grace period. Export progress lives in a toast, so the
  // menu can close as soon as you start an export.
  const onEnter = () => {
    clearTimeout(closeTimer.current);
    setHovering(true);
    setOpen(true);
  };
  const onLeave = () => {
    setHovering(false);
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  // Click / escape to close (for touch + accessibility).
  // Escape on an open menu: cancel in-flight export if any, else close menu.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && wrapRef.current.contains(e.target)) return;
      setOpen(false);
    };
    const onKey = (e) => {
      if (e.key === 'Escape') {
        if (busy && abortRef.current) {
          e.preventDefault();
          e.stopPropagation();
          abortRef.current.abort();
        } else {
          setOpen(false);
        }
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, busy]);

  // Global Esc-to-cancel even when the menu is closed: an export can
  // run for several minutes and the user may have moved away from the
  // top-right hover zone in the meantime.
  useEffect(() => {
    if (!busy) return;
    const onKey = (e) => {
      if (e.key === 'Escape' && abortRef.current) {
        e.preventDefault();
        abortRef.current.abort();
      }
    };
    window.addEventListener('keydown', onKey, { capture: true });
    return () => window.removeEventListener('keydown', onKey, { capture: true });
  }, [busy]);

  useEffect(() => () => {
    clearTimeout(closeTimer.current);
  }, []);

  const runExport = async (kind) => {
    if (busy || !deck) return;
    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(true);
    setOpen(false);

    const kindLabel = kind === 'both' ? 'PDF + PowerPoint' : kind === 'pdf' ? 'PDF' : 'PowerPoint';
    const t = toast({
      title: `Exporting ${kindLabel}`,
      description:
        'Starting… Large decks can take several minutes. You can keep working — the file downloads when ready. Press Esc to cancel.',
      duration: 1_200_000,
    });

    try {
      const opts = {
        themeMode,
        signal: controller.signal,
        onProgress: (p) => {
          const msg = p?.message?.trim();
          if (msg) t.update({ description: msg });
        },
      };
      const summary = kind === 'pdf'
        ? await exportDeckToPDF(deck, opts)
        : kind === 'pptx'
          ? await exportDeckToPPTX(deck, opts)
          : (await exportDeckToPDFAndPPTX(deck, opts)).combined;
      t.update({
        title: 'Export complete',
        description: summaryLine(summary),
        duration: 12_000,
      });
    } catch (err) {
      const aborted = err?.name === 'AbortError';
      if (!aborted) console.error('[TopRightMenu] export failed:', err);
      t.update({
        title: aborted ? 'Export cancelled' : 'Export failed',
        description: aborted
          ? 'No file was saved.'
          : (err?.message || 'See the browser console for details.'),
        variant: aborted ? undefined : 'destructive',
        duration: 10_000,
      });
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed top-3 right-3 md:top-5 md:right-5 z-deck-chrome"
    >
      {/* Trigger — circular icon button, fades to full opacity on hover.
          Click pins the menu open (hover already opens; toggling on click
          would just close after hover-open and feels broken). To dismiss,
          click outside, press Esc, or hover away. */}
      <button
        onClick={() => setOpen(true)}
        title="Menu — share, export, theme, home"
        aria-label="Menu — share, export, theme, home"
        aria-expanded={open}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full backdrop-blur border transition-all duration-deck-fast ease-deck-out focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent"
        style={{
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          borderColor: 'var(--cream-hairline)',
          color: 'var(--cream)',
          opacity: hovering || open || busy ? 1 : 0.72,
        }}
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <MoreHorizontal className="w-4 h-4" />}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute top-full right-0 mt-2 rounded-deck-lg border shadow-deck-lg"
          style={{
            background: 'var(--panel)',
            borderColor: 'var(--cream-hairline)',
            minWidth: 240,
            padding: 'var(--space-2)',
          }}
        >
          <SectionLabel>Navigate</SectionLabel>
          <MenuLink to="/" icon={Home} title="Back to studio" />
          {deck && onOpenShare && (
            <MenuItem
              icon={Share2}
              onClick={() => { onOpenShare(); setOpen(false); }}
              title="Share this deck"
              subtitle="Viewer link · optional password"
            />
          )}
          {deck && (
            <MenuLink
              to={`/decks/${deck.id}/analytics`}
              icon={BarChart3}
              title="Analytics"
              subtitle="Viewer engagement"
            />
          )}
          {isAdmin && (
            <MenuLink
              to="/dev"
              icon={Wrench}
              title="Dev Kit"
              subtitle="Component catalog · admin"
            />
          )}

          {(deck?.reading?.length || onOpenSources) && (
            <>
              <Divider />
              <SectionLabel>Deck</SectionLabel>
              {deck?.reading?.length ? (
                <MenuLink
                  to={`/decks/${deck.id}/reading`}
                  icon={BookOpen}
                  title="Reading material"
                  subtitle={`${deck.reading.length} item${deck.reading.length === 1 ? '' : 's'} · pre-talk prep`}
                />
              ) : null}
              {onOpenSources && (
                <MenuItem
                  icon={FolderOpen}
                  onClick={() => { onOpenSources(); setOpen(false); }}
                  title="Sources"
                  subtitle="AI-grounding library"
                />
              )}
            </>
          )}

          <Divider />
          <SectionLabel>Appearance</SectionLabel>
          {onToggleTheme && (
            <MenuItem
              icon={themeMode === 'light' ? Moon : Sun}
              onClick={() => { onToggleTheme(); }}
              title={themeMode === 'light' ? 'Switch to dark' : 'Switch to light'}
              subtitle="Deck theme"
            />
          )}

          {deck && (
            <>
              <Divider />
              <SectionLabel>Export</SectionLabel>
              <MenuItem
                icon={FileText}
                onClick={() => runExport('pdf')}
                disabled={busy}
                title="Export PDF"
                subtitle="16:9 · one page per slide"
              />
              <MenuItem
                icon={Presentation}
                onClick={() => runExport('pptx')}
                disabled={busy}
                title="Export PowerPoint"
                subtitle="16:9 · editable .pptx"
              />
              <MenuItem
                icon={Layers}
                onClick={() => runExport('both')}
                disabled={busy}
                title="Export PDF and PowerPoint"
                subtitle="One capture run · two downloads"
              />
            </>
          )}
        </div>
      )}
    </div>
  );
}

function SectionLabel({ children }) {
  return (
    <div
      className="deck-mono uppercase px-3 pt-1 pb-1.5"
      style={{
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
      }}
    >
      {children}
    </div>
  );
}

function Divider() {
  return <div style={{ height: 1, background: 'var(--cream-hairline)', margin: 'var(--space-1) var(--space-2)' }} />;
}

function MenuItem({ icon: Icon, onClick, disabled = false, title, subtitle = '' }) {
  return (
    <button
      role="menuitem"
      onClick={onClick}
      disabled={disabled}
      className="w-full flex items-start gap-3 text-left rounded-deck-md transition-colors disabled:opacity-50 hover:bg-[var(--cream-ghost)]"
      style={{ padding: 'var(--space-2) var(--space-3)' }}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
      <div className="min-w-0">
        <div style={{ color: 'var(--cream)', fontSize: '0.8rem', fontWeight: 500 }}>{title}</div>
        {subtitle && (
          <div
            className="deck-mono"
            style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', marginTop: 1 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </button>
  );
}

function MenuLink({ to, icon: Icon, title, subtitle = '' }) {
  return (
    <Link
      role="menuitem"
      to={to}
      className="w-full flex items-start gap-3 text-left rounded-deck-md transition-colors hover:bg-[var(--cream-ghost)]"
      style={{ padding: 'var(--space-2) var(--space-3)' }}
    >
      <Icon className="w-4 h-4 mt-0.5 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
      <div className="min-w-0">
        <div style={{ color: 'var(--cream)', fontSize: '0.8rem', fontWeight: 500 }}>{title}</div>
        {subtitle && (
          <div
            className="deck-mono"
            style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', marginTop: 1 }}
          >
            {subtitle}
          </div>
        )}
      </div>
    </Link>
  );
}
