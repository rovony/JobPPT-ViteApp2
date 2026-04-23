import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MoreHorizontal, Home, Download, Sun, Moon, BarChart3, FolderOpen, FileText, Presentation, Loader2, Check, Wrench } from 'lucide-react';
import { exportDeckToPDF, exportDeckToPPTX } from '@/lib/deck-export';
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
  const wrapRef = useRef(null);
  const closeTimer = useRef(null);
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  // Hover intent: open on hover-in with zero delay, close on hover-out
  // after a short grace period (so moving the mouse between the trigger
  // and the menu doesn't dismiss it).
  const onEnter = () => {
    clearTimeout(closeTimer.current);
    setHovering(true);
    setOpen(true);
  };
  const onLeave = () => {
    setHovering(false);
    closeTimer.current = setTimeout(() => setOpen(false), 220);
  };

  // Click / escape to close (for touch + accessibility)
  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  useEffect(() => () => clearTimeout(closeTimer.current), []);

  const runExport = async (kind) => {
    if (busy || !deck) return;
    setBusy(true);
    setDone(false);
    setStatus(`Preparing ${kind.toUpperCase()}…`);
    try {
      const opts = { themeMode, onProgress: (m) => setStatus(m) };
      if (kind === 'pdf') await exportDeckToPDF(deck, opts);
      else await exportDeckToPPTX(deck, opts);
      setStatus('Saved');
      setDone(true);
      setTimeout(() => { setStatus(''); setDone(false); }, 1800);
    } catch (err) {
      console.error('[TopRightMenu] export failed:', err);
      setStatus(`Failed: ${err?.message || 'see console'}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      ref={wrapRef}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      className="fixed top-3 right-3 md:top-5 md:right-5 z-deck-chrome"
    >
      {/* Trigger — circular icon button, fades to full opacity on hover */}
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Settings and actions"
        aria-expanded={open}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full backdrop-blur border transition-all duration-deck-fast ease-deck-out focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent"
        style={{
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          borderColor: 'var(--cream-hairline)',
          color: 'var(--cream)',
          opacity: hovering || open ? 1 : 0.55,
        }}
      >
        <MoreHorizontal className="w-4 h-4" />
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

          {onOpenSources && (
            <>
              <Divider />
              <SectionLabel>Deck</SectionLabel>
              <MenuItem icon={FolderOpen} onClick={() => { onOpenSources(); setOpen(false); }} title="Sources" subtitle="AI-grounding library" />
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
              {(busy || status) && (
                <div
                  className="flex items-center gap-2 mt-1 px-3 py-2 rounded-deck-md"
                  style={{ background: 'var(--cream-ghost)' }}
                >
                  {busy ? (
                    <Loader2 className="w-3 h-3 animate-spin shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
                  ) : done ? (
                    <Check className="w-3 h-3 shrink-0" style={{ color: 'var(--success)' }} />
                  ) : (
                    <Download className="w-3 h-3 shrink-0" style={{ color: 'var(--cream-faint)' }} />
                  )}
                  <span
                    className="deck-mono truncate"
                    style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
                  >
                    {status}
                  </span>
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