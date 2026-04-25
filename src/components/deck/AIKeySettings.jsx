import React, { useEffect, useState } from 'react';
import { Key, Check, X, ExternalLink, Trash2, Cpu, Database, RefreshCw, Loader2, AlertTriangle } from 'lucide-react';
import { getOpenAIKey, setOpenAIKey, getKeySource } from '@/lib/aiLocalClient';
import { isQdrantConfigured, getQdrantConfig } from '@/lib/qdrantClient';

/**
 * AIKeySettings — modal for configuring the local OpenAI API key.
 *
 * Opens from the Presenter assistant header when the assistant detects
 * the base44 backend is in offline-stub mode and needs a local fallback.
 *
 * The key never leaves the browser; it's stored in localStorage under
 *   merck-deck:openai-key
 * and used by aiLocalClient for /chat/completions and /audio/transcriptions.
 *
 * Validation is light — we don't ping OpenAI here. The first real call
 * (chat or whisper) returns a clean 'bad-key' error if the key is wrong,
 * which the assistant surfaces back to the user.
 */
export default function AIKeySettings({ open, onClose, ragStatus, onReindex }) {
  const [value, setValue] = useState('');
  const [saved, setSaved] = useState(false);

  // Load the stored key when the modal opens, mask all but the last 4.
  useEffect(() => {
    if (!open) return;
    const k = getOpenAIKey();
    setValue(k ? maskKey(k) : '');
    setSaved(false);
  }, [open]);

  // Esc to close (capture-phase + stopImmediatePropagation so the deck-store
  // keyboard handler doesn't also close presenter view).
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => {
      if (e.key !== 'Escape') return;
      e.preventDefault();
      e.stopImmediatePropagation();
      onClose?.();
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [open, onClose]);

  if (!open) return null;

  const handleSave = () => {
    const cleaned = value.trim();
    // If the user re-saved without changing the masked value, don't overwrite.
    if (cleaned.includes('•')) {
      onClose?.();
      return;
    }
    setOpenAIKey(cleaned);
    setSaved(true);
    setTimeout(() => onClose?.(), 600);
  };

  const handleClear = () => {
    setOpenAIKey('');
    setValue('');
    setSaved(false);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="AI assistant settings"
      className="fixed inset-0 z-deck-presenter flex items-center justify-center"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="rounded-lg shadow-xl flex flex-col overflow-hidden"
        style={{
          width: 'min(94vw, 480px)',
          background: 'var(--panel)',
          color: 'var(--cream)',
          border: '1px solid var(--cream-hairline)',
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between px-4 py-2 border-b shrink-0"
          style={{ borderBottomColor: 'var(--cream-hairline)' }}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Key className="w-4 h-4 shrink-0" style={{ color: 'var(--case, var(--amber))' }} />
            <div className="flex flex-col min-w-0">
              <span
                className="deck-mono uppercase truncate"
                style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
              >
                AI assistant settings
              </span>
              <span className="text-sm font-medium truncate" style={{ color: 'var(--cream)' }}>
                OpenAI API key
              </span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="h-8 w-8 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
            aria-label="Close"
            title="Close · Esc"
            style={{ color: 'var(--cream-muted)' }}
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-4 flex flex-col gap-4">
          {getKeySource() === 'env' && (
            <div
              className="px-3 py-2 rounded text-xs flex items-start gap-2"
              style={{
                background: 'color-mix(in srgb, var(--sage) 12%, transparent)',
                border: '1px solid var(--sage)',
                color: 'var(--cream)',
                lineHeight: 1.5,
              }}
            >
              <Cpu className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--sage)' }} />
              <div>
                <strong style={{ color: 'var(--sage)' }}>Env key active.</strong>{' '}
                A <code>VITE_OPENAI_API_KEY</code> is set in{' '}
                <code>.env.local</code> and takes priority over anything you paste
                here. To override, clear the env var or unset it in your{' '}
                <code>.env.local</code> file.
              </div>
            </div>
          )}
          <p className="text-sm" style={{ color: 'var(--cream-muted)', lineHeight: 1.5 }}>
            Paste your OpenAI key to enable the presenter assistant locally.
            The key stays in this browser (localStorage) and is sent only to
            OpenAI's API.
          </p>

          <label className="flex flex-col gap-1.5">
            <span
              className="deck-mono uppercase"
              style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
            >
              Key (sk-...)
            </span>
            <input
              type="text"
              value={value}
              onChange={(e) => { setValue(e.target.value); setSaved(false); }}
              placeholder="sk-..."
              spellCheck={false}
              autoComplete="off"
              className="px-3 py-2 rounded-md border bg-transparent outline-none focus:ring-1 font-mono text-sm"
              style={{
                borderColor: 'var(--cream-hairline)',
                color: 'var(--cream)',
                fontFamily: 'var(--font-mono)',
              }}
            />
          </label>

          <div className="flex items-center justify-between gap-2 mt-1">
            <a
              href="https://platform.openai.com/api-keys"
              target="_blank"
              rel="noopener noreferrer"
              className="deck-mono uppercase flex items-center gap-1.5 transition-colors hover:opacity-80"
              style={{
                fontSize: '0.58rem',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--cream-faint)',
              }}
            >
              <ExternalLink className="w-3 h-3" />
              Get a key
            </a>
            <div className="flex items-center gap-2">
              {getOpenAIKey() && (
                <button
                  onClick={handleClear}
                  className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1.5 rounded transition-colors hover:bg-[var(--cream-ghost)]"
                  style={{
                    fontSize: '0.58rem',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--cream-muted)',
                  }}
                >
                  <Trash2 className="w-3 h-3" />
                  Clear
                </button>
              )}
              <button
                onClick={handleSave}
                className="deck-mono uppercase flex items-center gap-1.5 px-3 py-1.5 rounded transition-opacity hover:opacity-90"
                style={{
                  background: saved ? 'var(--sage)' : 'var(--case, var(--amber))',
                  color: 'var(--bg)',
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono)',
                  fontWeight: 600,
                }}
              >
                {saved ? <Check className="w-3 h-3" /> : null}
                {saved ? 'Saved' : 'Save'}
              </button>
            </div>
          </div>

          {/* RAG / Qdrant status — only shown when Qdrant is configured. */}
          {isQdrantConfigured() && (
            <div
              className="px-3 py-2 rounded mt-1"
              style={{
                background: 'var(--cream-ghost)',
                border: '1px solid var(--cream-hairline)',
              }}
            >
              <div className="flex items-center justify-between gap-2 mb-1.5">
                <div className="flex items-center gap-2">
                  <RagBadge status={ragStatus} />
                  <span className="deck-mono uppercase" style={{
                    fontSize: '0.55rem',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--cream-faint)',
                  }}>
                    Qdrant · {getQdrantConfig().collection}
                  </span>
                </div>
                {onReindex && (
                  <button
                    onClick={onReindex}
                    disabled={ragStatus?.state === 'indexing'}
                    title="Force a full re-embed (drops content hashes)"
                    className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded transition-colors hover:bg-[var(--cream-hairline)] disabled:opacity-40"
                    style={{
                      fontSize: '0.55rem',
                      letterSpacing: 'var(--ls-mono)',
                      color: 'var(--cream-muted)',
                      border: '1px solid var(--cream-hairline)',
                    }}
                  >
                    <RefreshCw className={`w-3 h-3 ${ragStatus?.state === 'indexing' ? 'animate-spin' : ''}`} />
                    Reindex
                  </button>
                )}
              </div>
              <div className="text-xs" style={{ color: 'var(--cream-muted)', lineHeight: 1.5 }}>
                {ragStatus?.state === 'ready' && ragStatus?.upserted != null
                  ? `Indexed ${ragStatus.upserted} new, skipped ${ragStatus.skipped}/${ragStatus.total}.`
                  : ragStatus?.state === 'error'
                  ? `Last index attempt failed: ${ragStatus.error}`
                  : ragStatus?.state === 'indexing'
                  ? 'Embedding deck content into the vector store…'
                  : 'Index has not run yet for this deck.'}
              </div>
            </div>
          )}

          <div
            className="px-3 py-2 rounded text-xs mt-1"
            style={{
              background: 'var(--cream-ghost)',
              color: 'var(--cream-faint)',
              lineHeight: 1.5,
              border: '1px solid var(--cream-hairline)',
            }}
          >
            <strong style={{ color: 'var(--cream-muted)' }}>Privacy:</strong>{' '}
            this key is stored in your browser only. It's sent to{' '}
            <code>api.openai.com</code> for chat and Whisper calls and not
            transmitted to any other service.
          </div>
        </div>
      </div>
    </div>
  );
}

function RagBadge({ status }) {
  const meta = ({
    indexing: { label: 'indexing', color: 'var(--case, var(--amber))', Icon: Loader2, spin: true },
    ready:    { label: 'ready',    color: 'var(--sage)',                Icon: Database, spin: false },
    error:    { label: 'error',    color: 'var(--coral)',               Icon: AlertTriangle, spin: false },
  })[status?.state] || { label: 'idle', color: 'var(--cream-faint)', Icon: Database, spin: false };
  const Icon = meta.Icon;
  return (
    <span
      className="deck-mono uppercase flex items-center gap-1.5 px-1.5 py-0.5 rounded"
      style={{
        background: 'transparent',
        border: `1px solid ${meta.color}`,
        color: meta.color,
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      <Icon className={`w-3 h-3 ${meta.spin ? 'animate-spin' : ''}`} />
      RAG · {meta.label}
    </span>
  );
}

function maskKey(k) {
  if (!k) return '';
  if (k.length <= 8) return k;
  return `${k.slice(0, 3)}${'•'.repeat(Math.max(8, k.length - 7))}${k.slice(-4)}`;
}
