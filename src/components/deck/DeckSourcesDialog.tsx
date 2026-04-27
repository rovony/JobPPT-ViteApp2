// @ts-nocheck
import React, { useRef } from 'react';
import { X, Upload, FileText, Loader2, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';
import { useLocalDeckSources } from '@/lib/useLocalDeckSources';

/**
 * DeckSourcesDialog — manage the per-deck reference library.
 *
 * Upload text-based files (.txt, .md, .csv, etc.). Content is read
 * client-side via FileReader and stored in localStorage. The AI
 * assistant uses these as grounding context alongside the deck's
 * built-in reading material.
 *
 * No server required — everything runs in the browser.
 */
export default function DeckSourcesDialog({ open, onClose, deckId, deckTitle }) {
  const { sources, loading, uploading, uploadFiles, deleteSource } = useLocalDeckSources(deckId);
  const fileRef = useRef(null);

  const onPick = () => fileRef.current?.click();

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    await uploadFiles(files);
    if (fileRef.current) fileRef.current.value = '';
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-deck-dialog flex items-center justify-center p-6"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <div
        className="w-full max-w-2xl rounded-xl border shadow-2xl flex flex-col max-h-[85vh]"
        style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Deck sources"
      >
        <div className="flex items-start justify-between p-5 border-b"
             style={{ borderColor: 'var(--cream-hairline)' }}>
          <div>
            <div className="deck-mono uppercase"
                 style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}>
              Deck sources
            </div>
            <h2 className="deck-display mt-1" style={{ color: 'var(--cream)', fontSize: '1.4rem', fontWeight: 600 }}>
              {deckTitle || 'Source library'}
            </h2>
            <p className="mt-1" style={{ color: 'var(--cream-muted)', fontSize: '0.8rem' }}>
              Upload text or markdown files. The AI uses them as its first source, falling back to the web only when needed.
            </p>
          </div>
          <button onClick={onClose} aria-label="Close"
                  className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-[var(--cream-ghost)]"
                  style={{ color: 'var(--cream-muted)' }}>
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="px-5 py-4 border-b flex items-center gap-3"
             style={{ borderColor: 'var(--cream-hairline)' }}>
          <button
            onClick={onPick}
            disabled={uploading}
            className="flex items-center gap-2 h-9 px-4 rounded-full transition-colors disabled:opacity-40"
            style={{ background: 'var(--case, var(--amber))', color: 'var(--bg)', fontWeight: 600, fontSize: '0.85rem' }}
          >
            {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
            {uploading ? 'Reading…' : 'Upload files'}
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".txt,.md,.csv,.tsv,.json,.xml,.html,.htm,text/plain,text/markdown,text/csv,application/json"
            className="hidden"
            onChange={onFiles}
          />
          <span style={{ color: 'var(--cream-faint)', fontSize: '0.75rem' }}>
            TXT · MD · CSV · JSON — read client-side, stored in browser
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {loading ? (
            <Empty text="Loading sources…" />
          ) : sources.length === 0 ? (
            <Empty text="No sources yet. Upload some reference material to ground the AI." />
          ) : (
            sources.map((s) => <SourceRow key={s.id} source={s} onDelete={deleteSource} />)
          )}
        </div>
      </div>
    </div>
  );
}

function SourceRow({ source, onDelete }) {
  const status = source.status || 'pending';
  const icon = {
    ready:  <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--sage)' }} />,
    failed: <AlertCircle className="w-4 h-4" style={{ color: 'var(--coral)' }} />,
  }[status] || <AlertCircle className="w-4 h-4" style={{ color: 'var(--cream-faint)' }} />;

  const label = status === 'ready'
    ? `${source.chunk_count || 0} chunks · ready`
    : source.error || 'Failed';

  return (
    <div
      className="flex items-center gap-3 p-3 rounded-md border"
      style={{ borderColor: 'var(--cream-hairline)', background: 'var(--cream-ghost)' }}
    >
      <FileText className="w-4 h-4 shrink-0" style={{ color: 'var(--cream-muted)' }} />
      <div className="flex-1 min-w-0">
        <div className="truncate" style={{ color: 'var(--cream)', fontSize: '0.9rem' }}>
          {source.title}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5 deck-mono uppercase"
             style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
          {icon}
          <span>{label}</span>
          {source.size_bytes ? <span>· {(source.size_bytes / 1024).toFixed(0)} KB</span> : null}
        </div>
      </div>
      <button
        onClick={() => onDelete(source.id)}
        aria-label="Delete source"
        className="h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
        style={{ color: 'var(--cream-muted)' }}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </button>
    </div>
  );
}

function Empty({ text }) {
  return (
    <div className="py-12 text-center" style={{ color: 'var(--cream-faint)', fontSize: '0.85rem' }}>
      {text}
    </div>
  );
}
