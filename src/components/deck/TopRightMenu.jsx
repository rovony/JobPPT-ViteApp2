import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Home, Download, Sun, Moon, BarChart3, FolderOpen, FileText, Presentation, Loader2, Check, Wrench, X, Layers, BookOpen } from 'lucide-react';
import { exportDeckToPDF, exportDeckToPPTX, exportDeckToPDFAndPPTX, summaryLine } from '@/lib/deck-export';
import { useAuth } from '@/lib/AuthContext';

/**
 * TopRightMenu — a compact icon button in the top-right corner that
 * reveals a settings / secondary-actions menu on hover (desktop) or
 * click (touch). Houses the "less-frequent" actions — home, export,
 * theme, analytics, sources — so the bottom-right chrome can stay
 * focused on presentation navigation (mode switcher, prev/next).
 *
 * Styling is fully token-driven (no hardcoded colors).
 */
export default function TopRightMenu({
  deck,
  themeMode,
  onToggleTheme,
  onOpenSources,
}) {
  const [open, setOpen] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const abortRef = useRef(null);
  const resetTimerRef = useRef(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Hover intent: open on hover-in with zero delay, close on hover-out
  // after a short grace period (so moving the mouse between the trigger
  // and the menu doesn't dismiss it). While an export is running we
  // refuse to auto-close — the progress line lives inside the menu, and
  // dropping it mid-run leaves the user staring at a spinner with no
  // context.
  const onEnter = () => {
    clearTimeout(closeTimer.current);
    setHovering(true);
    setOpen(true);
  };
  const onLeave = () => {
    setHovering(false);
    if (busy) return;
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  // If the user starts an export while hovered, force the menu to stay
  // pinned open — even if the mouse drifted off in the meantime — until
  // the run completes.
  useEffect(() => {
    if (busy) {
      clearTimeout(closeTimer.current);
      setOpen(true);
    }
  }, [busy]);

  // Click / escape to close (for touch + accessibility).
  // While an export is running we hijack Escape to mean "cancel"
  // instead of "close menu" — losing the menu mid-export drops the
  // progress UI which is exactly when the user needs it most.
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (wrapRef.current && wrapRef.current.contains(e.target)) return;
      // Click-outside while exporting shouldn't dismiss the progress UI.
      if (busy) return;
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
    clearTimeout(resetTimerRef.current);
  }, []);

  const runExport = async (kind) => {
    if (busy || !deck) return;
    clearTimeout(resetTimerRef.current);
    const controller = new AbortController();
    abortRef.current = controller;
    setBusy(true);
    setDone(false);
    setFailed(false);
    setStatus(
      kind === 'both'
        ? 'Preparing PDF and PowerPoint'
        : `Preparing ${kind.toUpperCase()}`,
    );
    try {
      const opts = {
        themeMode,
        signal: controller.signal,
        onProgress: (p) => setStatus(p?.message || ''),
      };
      const summary = kind === 'pdf'
        ? await exportDeckToPDF(deck, opts)
        : kind === 'pptx'
          ? await exportDeckToPPTX(deck, opts)
          : (await exportDeckToPDFAndPPTX(deck, opts)).combined;
      setStatus(summaryLine(summary));
      setDone(true);
      // Linger the success line a beat longer when there were failures
      // so the operator sees the warning before it clears.
      const lingerMs = summary?.failures?.length ? 5000 : 2400;
      resetTimerRef.current = setTimeout(() => {
        setStatus('');
        setDone(false);
      }, lingerMs);
    } catch (err) {
      const aborted = err?.name === 'AbortError';
      if (!aborted) console.error('[TopRightMenu] export failed:', err);
      setFailed(true);
      setDone(false);
      setStatus(aborted ? 'Cancelled' : `Failed · ${err?.message || 'see console'}`);
      resetTimerRef.current = setTimeout(() => {
        setStatus('');
        setFailed(false);
      }, 3200);
    } finally {
      setBusy(false);
      abortRef.current = null;
    }
  };

  const cancelExport = () => abortRef.current?.abort();

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
        aria-label="Settings and actions"
        aria-expanded={open}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full backdrop-blur border transition-all duration-deck-fast ease-deck-out focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent"
        style={{
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          borderColor: 'var(--cream-hairline)',
          color: 'var(--cream)',
          opacity: hovering || open || busy ? 1 : 0.55,
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
              {(busy || status) && (
                <div
                  className="flex items-center gap-2 mt-1 px-3 py-2 rounded-deck-md"
                  style={{ background: 'var(--cream-ghost)' }}
                >
                  {busy ? (
                    <Loader2 className="w-3 h-3 animate-spin shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
                  ) : failed ? (
                    <X className="w-3 h-3 shrink-0" style={{ color: 'var(--danger, var(--coral))' }} />
                  ) : done ? (
                    <Check className="w-3 h-3 shrink-0" style={{ color: 'var(--success, var(--sage))' }} />
                  ) : (
                    <Download className="w-3 h-3 shrink-0" style={{ color: 'var(--cream-faint)' }} />
                  )}
                  <span
                    className="deck-mono truncate flex-1"
                    style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
                  >
                    {status}
                  </span>
                  {busy && (
                    <button
                      onClick={cancelExport}
                      aria-label="Cancel export"
                      className="ml-1 inline-flex items-center justify-center h-4 w-4 rounded-sm focus:outline-none focus-visible:ring-1 focus-visible:ring-deck-accent"
                      style={{ color: 'var(--cream-faint)' }}
                    >
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>
              )}
              {busy && (
                <div
                  className="deck-mono px-3 pt-1 pb-0"
                  style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
                >
                  esc to cancel
                </div>
              )}
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

function MenuItem({ icon: Icon, onClick, disabled, title, subtitle }) {
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

function MenuLink({ to, icon: Icon, title, subtitle }) {
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
