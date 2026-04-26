import React, { useEffect, useRef, useState } from 'react';
import { Copy, Link2, MoreHorizontal, HelpCircle, X } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

/**
 * Top-right "⋯" for shared deck viewers: copy this-page link, help (viewer-safe),
 * not the author TopRightMenu (export, analytics, sources, …).
 */
export default function ShareViewerMenu({ sharePathBase, currentSlideId, deckTitle, hasComments }) {
  const [open, setOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e) => {
      if (ref.current?.contains(e.target)) return;
      setOpen(false);
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  const copyThisPage = async () => {
    if (!sharePathBase || currentSlideId == null) return;
    const u = `${window.location.origin}${sharePathBase}/s/${encodeURIComponent(currentSlideId)}`;
    try {
      await navigator.clipboard.writeText(u);
      toast({ title: 'Link copied', description: 'This slide, viewer URL' });
    } catch {
      window.prompt('Copy this link', u);
    }
    setOpen(false);
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <button
          type="button"
          onClick={() => setOpen((o) => !o)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border backdrop-blur"
          style={{
            background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream)',
          }}
          title="Page options"
          aria-expanded={open}
        >
          <MoreHorizontal className="w-4 h-4" />
        </button>
        {open && (
          <div
            className="absolute right-0 top-full mt-1 min-w-[15rem] rounded-lg border py-1 shadow-lg z-deck-dialog"
            style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)' }}
          >
            <MenuRow icon={<Link2 className="w-3.5 h-3.5" />} label="Copy link to this slide" onClick={copyThisPage} />
            <MenuRow
              icon={<Copy className="w-3.5 h-3.5" />}
              label="Copy home link to deck"
              onClick={async () => {
                if (!sharePathBase) return;
                const u = `${window.location.origin}${sharePathBase}`;
                try {
                  await navigator.clipboard.writeText(u);
                  toast({ title: 'Link copied' });
                } catch {
                  window.prompt('Copy', u);
                }
                setOpen(false);
              }}
            />
            <div className="my-1 h-px" style={{ background: 'var(--cream-hairline)' }} />
            <MenuRow
              icon={<HelpCircle className="w-3.5 h-3.5" />}
              label="Viewer help"
              onClick={() => { setOpen(false); setHelpOpen(true); }}
            />
            {hasComments && (
              <p className="px-3 py-1.5 text-[0.65rem] opacity-70" style={{ color: 'var(--cream-muted)' }}>
                You can add comments with the “Comments” control on the left when enabled by the author.
              </p>
            )}
            <p className="px-3 py-1.5 text-[0.65rem] opacity-60 border-t" style={{ borderColor: 'var(--cream-hairline)', color: 'var(--cream-faint)' }}>
              {deckTitle ? `${deckTitle} · ` : ''}View only — no speaker or presenter tools.
            </p>
          </div>
        )}
      </div>
      {helpOpen && <ShareViewerHelpModal onClose={() => setHelpOpen(false)} />}
    </>
  );
}

function ShareViewerHelpModal({ onClose }) {
  useEffect(() => {
    const onK = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onK);
    return () => window.removeEventListener('keydown', onK);
  }, [onClose]);
  return (
    <div
      className="fixed inset-0 z-deck-dialog flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-viewer-help-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-sm rounded-lg border p-4 shadow-xl"
        style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)', color: 'var(--cream)' }}
      >
        <div className="flex items-center justify-between mb-3">
          <h2 id="share-viewer-help-title" className="text-sm font-medium">Shared view</h2>
          <button type="button" onClick={onClose} className="p-1 rounded" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>
        <p className="text-xs opacity-80 mb-3" style={{ color: 'var(--cream-muted)' }}>
          This is a read-only, audience-style player. You won’t see speaker notes, dual-screen, or export tools
          the author has on the full deck.
        </p>
        <ul className="text-xs space-y-1.5 deck-mono" style={{ color: 'var(--cream-muted)' }}>
          <li><kbd className="px-1 rounded border opacity-80" style={{ borderColor: 'var(--cream-hairline)' }}>←</kbd> <kbd className="px-1 rounded border opacity-80" style={{ borderColor: 'var(--cream-hairline)' }}>→</kbd> <span className="opacity-70"> / Space — previous & next slide</span></li>
          <li><kbd className="px-1 rounded border opacity-80" style={{ borderColor: 'var(--cream-hairline)' }}>O</kbd> <span className="opacity-70">— slide index (overview)</span></li>
          <li><kbd className="px-1 rounded border opacity-80" style={{ borderColor: 'var(--cream-hairline)' }}>F</kbd> <span className="opacity-70">— fullscreen</span></li>
          <li><kbd className="px-1 rounded border opacity-80" style={{ borderColor: 'var(--cream-hairline)' }}>Esc</kbd> <span className="opacity-70">— close overview, or exit fullscreen</span></li>
        </ul>
        <p className="text-[0.65rem] mt-3 opacity-60">Presenter, dual-screen, and P key are not available in this link by design.</p>
      </div>
    </div>
  );
}

function MenuRow({ icon, label, onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="w-full flex items-center gap-2 px-3 py-2 text-left text-sm transition-colors hover:bg-[var(--cream-ghost)]"
      style={{ color: 'var(--cream)' }}
    >
      {icon}
      {label}
    </button>
  );
}
