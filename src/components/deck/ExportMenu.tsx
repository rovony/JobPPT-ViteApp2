import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Presentation, Loader2, Check, X, Layers } from 'lucide-react';
import { exportDeckToPDF, exportDeckToPPTX, exportDeckToPDFAndPPTX, summaryLine } from '@/lib/deck-export';

/**
 * ExportMenu — compact dropdown button that exports the current deck
 * to PDF or PPTX. Shows a live per-slide progress line while working
 * and surfaces a final summary ("Saved · 35 slides · 4.2 MB") on
 * completion. Esc cancels an in-flight export.
 *
 * Slots into NavControls. Tokens-only styling, keyboard + click-out
 * close. Never starts two exports in parallel.
 */
export default function ExportMenu({ deck, themeMode }) {
  const [open, setOpen] = useState(false);
  const [busy, setBusy] = useState(false);
  const [status, setStatus] = useState('');
  const [done, setDone] = useState(false);
  const [failed, setFailed] = useState(false);
  const ref = useRef(null);
  const abortRef = useRef(null);
  const resetTimerRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      // While a capture run is in flight, Escape cancels rather than
      // closing the menu — closing would hide the progress line at the
      // worst possible moment.
      if (busy && abortRef.current) {
        e.preventDefault();
        e.stopPropagation();
        abortRef.current.abort();
      } else {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open, busy]);

  // Esc-to-cancel applies even when the menu has been closed mid-run.
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

  useEffect(() => () => clearTimeout(resetTimerRef.current), []);

  const run = async (kind) => {
    if (busy) return;
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
      const lingerMs = summary?.failures?.length ? 5000 : 2400;
      resetTimerRef.current = setTimeout(() => {
        setOpen(false);
        setStatus('');
        setDone(false);
      }, lingerMs);
    } catch (err) {
      const aborted = err?.name === 'AbortError';
      if (!aborted) console.error('Export failed:', err);
      setFailed(true);
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
          <MenuItem
            icon={Layers}
            onClick={() => run('both')}
            disabled={busy}
            title="PDF and PowerPoint"
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
              ) : null}
              <span
                className="deck-mono truncate flex-1"
                style={{ fontSize: '0.65rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
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

          <div
            className="px-3 pt-2 pb-1 deck-mono"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}
          >
            {busy
              ? `${deck.slides.length} slides · esc to cancel`
              : `Renders ${deck.slides.length} slides at 1920×1080`}
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