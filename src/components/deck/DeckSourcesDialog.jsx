import React, { useEffect, useState, useRef } from 'react';
import { base44 } from '@/api/base44Client';
import { X, Upload, FileText, Loader2, Trash2, CheckCircle2, AlertCircle, Clock } from 'lucide-react';

/**
 * DeckSourcesDialog — manage the per-deck reference library.
 *
 * Upload PDFs / DOCX / TXT. Each upload creates a DeckSource row and
 * triggers ingestDeckSource in the background (extract → chunk → embed →
 * SourceChunk rows). The list polls for status updates until all rows
 * reach "ready" or "failed".
 */
export default function DeckSourcesDialog({ open, onClose, deckId, deckTitle }) {
  const [sources, setSources] = useState([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef(null);
  const pollRef = useRef(null);

  const refresh = async () => {
    if (!deckId) return;
    const rows = await base44.entities.DeckSource.filter({ deck_id: deckId }, '-created_date');
    setSources(rows);
    setLoading(false);
  };

  useEffect(() => {
    if (!open || !deckId) return;
    refresh();
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, deckId]);

  useEffect(() => {
    if (pollRef.current) { clearInterval(pollRef.current); pollRef.current = null; }
    const hasPending = sources.some((s) => s.status === 'pending' || s.status === 'indexing');
    if (!hasPending || !open) return;
    pollRef.current = setInterval(refresh, 2500);
    return () => { if (pollRef.current) clearInterval(pollRef.current); };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sources, open]);

  const onPick = () => fileRef.current?.click();

  const onFiles = async (e) => {
    const files = Array.from(e.target.files || []);
    if (!files.length) return;
    setUploading(true);
    try {
      for (const file of files) {
        const { file_url } = await base44.integrations.Core.UploadFile({ file });
        const row = await base44.entities.DeckSource.create({
          deck_id: deckId,
          title: file.name,
          file_url,
          file_type: file.name.split('.').pop()?.toLowerCase() || 'bin',
          size_bytes: file.size,
          status: 'pending',
        });
        base44.functions.invoke('ingestDeckSource', { source_id: row.id }).catch(() => {});
      }
      await refresh();
    } finally {
      setUploading(false);
      if (fileRef.current) fileRef.current.value = '';
    }
  };

  const onDelete = async (id) => {
    await base44.functions.invoke('deleteDeckSource', { source_id: id });
    await refresh();
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
              Upload PDF, Word, or text files. The AI uses them as its first source, falling back to the web only when needed.
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
            {uploading ? 'Uploading…' : 'Upload files'}
          </button>
          <input
            ref={fileRef}
            type="file"
            multiple
            accept=".pdf,.docx,.doc,.txt,.md,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,text/markdown"
            className="hidden"
            onChange={onFiles}
          />
          <span style={{ color: 'var(--cream-faint)', fontSize: '0.75rem' }}>
            PDF · DOCX · TXT — up to ~25MB each
          </span>
        </div>

        <div className="flex-1 overflow-y-auto p-5 space-y-2">
          {loading ? (
            <Empty text="Loading sources…" />
          ) : sources.length === 0 ? (
            <Empty text="No sources yet. Upload some reference material to ground the AI." />
          ) : (
            sources.map((s) => <SourceRow key={s.id} source={s} onDelete={onDelete} />)
          )}
        </div>
      </div>
    </div>
  );
}

function SourceRow({ source, onDelete }) {
  const status = source.status || 'pending';
  const icon = {
    pending:  <Clock className="w-4 h-4" style={{ color: 'var(--cream-faint)' }} />,
    indexing: <Loader2 className="w-4 h-4 animate-spin" style={{ color: 'var(--amber)' }} />,
    ready:    <CheckCircle2 className="w-4 h-4" style={{ color: 'var(--sage)' }} />,
    failed:   <AlertCircle className="w-4 h-4" style={{ color: 'var(--coral)' }} />,
  }[status];

  const label = {
    pending:  'Queued',
    indexing: 'Indexing…',
    ready:    `${source.chunk_count || 0} chunks · ready`,
    failed:   source.error || 'Failed',
  }[status];

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