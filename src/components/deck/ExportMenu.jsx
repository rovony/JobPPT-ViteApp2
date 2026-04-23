import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Presentation, Loader2, Check } from 'lucide-react';
import { exportDeckToPDF, exportDeckToPPTX } from '@/lib/deck-export';

/**
 * ExportMenu — compact dropdown button that exports the current deck
 * to PDF or PPTX. Shows a live progress line while working.
 *
 * Slots into NavControls. Tokens-only styling, keyboard + click-out
 * close. Never starts two exports in parallel.
 */
export default function ExportMenu({ deck, themeMode }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const run = async (kind) => {
    if (busy) return;
    setBusy(true);
    setDone(false);
    setStatus(`Preparing ${kind.toUpperCase()}…`);
    try {
      const opts = { themeMode, onProgress: (m) => setStatus(m) };
      if (kind === 'pdf') await exportDeckToPDF(deck, opts);
      else await exportDeckToPPTX(deck, opts);
      setStatus('Done — file saved');
      setDone(true);
      setTimeout(() => { setOpen(false); setStatus(''); setDone(false); }, 1600);
    } catch (err) {
      console.error('Export failed:', err);
      setStatus('Export failed — see console');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-label="Export deck"
        aria-expanded={open}
        className="inline-flex items-center justify-center h-9 w-9 rounded-full backdrop-blur border transition-colors duration-deck-fast ease-deck-out focus:outline-none focus-visible:ring-2 focus-visible:ring-deck-accent"
        style={{
          background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
          borderColor: 'var(--cream-hairline)',
          color: 'var(--cream)',
        }}
        title="Export · PDF or PowerPoint"
      >
        {busy ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
      </button>

      {open && (
        <div
          role="menu"
          className="absolute bottom-full right-0 mb-2 rounded-deck-lg border shadow-deck-lg"
          style={{
            background: 'var(--panel)',
            borderColor: 'var(--cream-hairline)',
            minWidth: 220,
            padding: 'var(--space-2)',
          }}
        >
          <div
            className="deck-mono uppercase px-3 pt-1 pb-2"
            style={{
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
            }}
          >
            Export deck
          </div>

          <MenuItem
            icon={FileText}
            onClick={() => run('pdf')}
            disabled={busy}
            title="PDF"
            subtitle="16:9 landscape · one page/slide"
          />
          <MenuItem
            icon={Presentation}
            onClick={() => run('pptx')}
            disabled={busy}
            title="PowerPoint (.pptx)"
            subtitle="16:9 widescreen · editable in Keynote/PPT"
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
              ) : null}
              <span
                className="deck-mono truncate"
                style={{ fontSize: '0.65rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
              >
                {status}
              </span>
            </div>
          )}

          <div
            className="px-3 pt-2 pb-1 deck-mono"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
          >
            Renders {deck.slides.length} slides at 1920×1080.
          </div>
        </div>
      )}
    </div>
  );
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
        <div style={{ color: 'var(--cream)', fontSize: '0.82rem', fontWeight: 500 }}>{title}</div>
        <div
          className="deck-mono"
          style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)', marginTop: 2 }}
        >
          {subtitle}
        </div>
      </div>
    </button>
  );
}