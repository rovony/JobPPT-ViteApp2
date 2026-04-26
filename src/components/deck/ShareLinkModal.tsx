// @ts-nocheck
import React, { useCallback, useMemo, useState } from 'react';
import { X, Link2, Copy, Share2, Lock, MessageSquare, Eye, Ban, Download, Calendar } from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import {
  createShare,
  listSharesForDeck,
  revokeShare,
  getShareUrl,
  getActivity,
  importShareState,
  downloadShareBackupFile,
} from '@/lib/shareService';

/**
 * Create and manage unlisted share links for a deck. Settings persist in
 * localStorage (standalone); a backend can map the same API later.
 */
export default function ShareLinkModal({ open, onClose, deckId, deckTitle }) {
  const [password, setPassword] = useState('');
  const [permission, setPermission] = useState('view');
  const [allowDownload, setAllowDownload] = useState(false);
  const [expires, setExpires] = useState(''); // empty = no expiry, or 'YYYY-MM-DD'
  const [busy, setBusy] = useState(false);
  const [listVersion, setListVersion] = useState(0);

  const existing = useMemo(
    () => (deckId ? listSharesForDeck(deckId) : []),
    [deckId, open, listVersion]
  );

  const onCreate = useCallback(async () => {
    if (!deckId) return;
    setBusy(true);
    try {
      let expiresAt = null;
      if (expires) {
        const t = new Date(`${expires}T23:59:59`).getTime();
        if (Number.isFinite(t)) expiresAt = t;
      }
      const rec = await createShare({
        deckId,
        label: deckTitle || deckId,
        permission,
        password: password.trim() || undefined,
        expiresAt,
        allowDownload,
      });
      const url = getShareUrl(rec.token);
      await copyText(url);
      toast({ title: 'Share link created', description: 'Copied to clipboard' });
      setPassword('');
      setListVersion((v) => v + 1);
    } catch (e) {
      console.error(e);
      toast({ title: 'Could not create share', variant: 'destructive' });
    } finally {
      setBusy(false);
    }
  }, [deckId, deckTitle, permission, password, expires, allowDownload]);

  const onCopy = (token) => {
    copyText(getShareUrl(token));
    toast({ title: 'Link copied' });
  };

  const onNativeShare = async (token) => {
    const url = getShareUrl(token);
    if (navigator.share) {
      try {
        await navigator.share({ title: deckTitle, text: 'View this deck', url });
      } catch (e) {
        if (e.name !== 'AbortError') onCopy(token);
      }
    } else {
      onCopy(token);
    }
  };

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-deck-presenter flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(2px)' }}
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="share-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg rounded-lg shadow-xl flex flex-col max-h-[min(90vh,720px)] overflow-hidden"
        style={{ background: 'var(--panel)', border: '1px solid var(--cream-hairline)', color: 'var(--cream)' }}
      >
        <div className="flex items-center justify-between px-4 py-3 border-b" style={{ borderColor: 'var(--cream-hairline)' }}>
          <div>
            <div className="deck-mono text-[0.6rem] uppercase" style={{ color: 'var(--case, var(--amber))' }}>Share</div>
            <h2 id="share-modal-title" className="text-sm font-medium truncate pr-2">{deckTitle || deckId}</h2>
          </div>
          <button type="button" onClick={onClose} className="h-8 w-8 flex items-center justify-center rounded" aria-label="Close">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="p-4 overflow-y-auto space-y-4 text-sm" style={{ color: 'var(--cream-muted)' }}>
          <p>
            Unlisted view-only experience: no speaker notes, dual-screen, or presenter mode. Open <code className="text-xs">/v/…</code> links only
            in this app build so viewers see slides with the same controls as a regular audience view.
          </p>

          <div className="space-y-2">
            <label className="flex items-center gap-2 text-xs deck-mono uppercase" style={{ color: 'var(--cream-faint)' }}>
              <MessageSquare className="w-3.5 h-3.5" />
              Permission
            </label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setPermission('view')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded border text-xs"
                style={{
                  borderColor: permission === 'view' ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                  color: 'var(--cream)',
                }}
              >
                <Eye className="w-3.5 h-3.5" />
                View only
              </button>
              <button
                type="button"
                onClick={() => setPermission('comment')}
                className="flex-1 flex items-center justify-center gap-1.5 py-2 rounded border text-xs"
                style={{
                  borderColor: permission === 'comment' ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
                  color: 'var(--cream)',
                }}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                Can comment
              </button>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-1 text-xs deck-mono uppercase mb-1" style={{ color: 'var(--cream-faint)' }}>
              <Lock className="w-3.5 h-3.5" />
              Preset password (optional)
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded border px-3 py-2 text-sm"
              style={{ borderColor: 'var(--cream-hairline)', background: 'var(--bg)', color: 'var(--cream)' }}
              placeholder="Leave empty for link-only access"
            />
            <p className="text-[0.65rem] mt-1 opacity-70">Send the password in a separate channel. We never re-display it after creation in standalone mode.</p>
          </div>

          <div className="flex items-end gap-3">
            <div className="flex-1">
              <label className="flex items-center gap-1 text-xs deck-mono uppercase mb-1" style={{ color: 'var(--cream-faint)' }}>
                <Calendar className="w-3.5 h-3.5" />
                Expires
              </label>
              <input
                type="date"
                value={expires}
                onChange={(e) => setExpires(e.target.value)}
                className="w-full rounded border px-2 py-1.5 text-sm"
                style={{ borderColor: 'var(--cream-hairline)', background: 'var(--bg)', color: 'var(--cream)' }}
              />
            </div>
            <label className="flex items-center gap-2 text-xs cursor-pointer">
              <input
                type="checkbox"
                checked={allowDownload}
                onChange={(e) => setAllowDownload(e.target.checked)}
                className="rounded"
              />
              <Download className="w-3.5 h-3.5" />
              Allow PDF export
            </label>
          </div>

          <button
            type="button"
            disabled={busy}
            onClick={onCreate}
            className="w-full flex items-center justify-center gap-2 py-2.5 rounded text-sm font-medium"
            style={{ background: 'var(--case, var(--amber))', color: '#111' }}
          >
            <Link2 className="w-4 h-4" />
            {busy ? 'Working…' : 'Create & copy link'}
          </button>

          {existing.length > 0 && (
            <div className="pt-2 border-t space-y-2" style={{ borderColor: 'var(--cream-hairline)' }}>
              <div className="deck-mono text-[0.6rem] uppercase" style={{ color: 'var(--case, var(--amber))' }}>Active links (this device)</div>
              {existing.map((s) => (
                <div
                  key={s.token}
                  className="flex flex-col gap-1 p-2 rounded border text-xs"
                  style={{ borderColor: 'var(--cream-hairline)' }}
                >
                  <code className="text-[0.7rem] break-all opacity-80">{getShareUrl(s.token)}</code>
                  <div className="flex flex-wrap items-center gap-1">
                    <span className="opacity-70">{(s.viewCount || 0)} views</span>
                    {s.permission === 'comment' && <span className="px-1 rounded bg-amber-500/20">comments</span>}
                    {s.password && <span className="px-1 rounded bg-white/10">password</span>}
                    <div className="ml-auto flex gap-1">
                      <button
                        type="button"
                        onClick={() => onCopy(s.token)}
                        className="p-1.5 rounded border"
                        style={{ borderColor: 'var(--cream-hairline)' }}
                        title="Copy"
                      >
                        <Copy className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => onNativeShare(s.token)}
                        className="p-1.5 rounded border"
                        style={{ borderColor: 'var(--cream-hairline)' }}
                        title="Share…"
                      >
                        <Share2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          if (window.confirm('Revoke this link?')) {
                            revokeShare(s.token);
                            toast({ title: 'Link revoked' });
                            setListVersion((v) => v + 1);
                          }
                        }}
                        className="p-1.5 rounded border text-red-400/90"
                        style={{ borderColor: 'var(--cream-hairline)' }}
                        title="Revoke"
                      >
                        <Ban className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                  <ActivityLine token={s.token} />
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-2 text-xs border-t pt-3" style={{ borderColor: 'var(--cream-hairline)' }}>
            <button
              type="button"
              onClick={() => {
                downloadShareBackupFile();
                toast({ title: 'Backup downloaded' });
              }}
              className="underline opacity-90"
            >
              Download all share data (backup)
            </button>
          </div>
          <label className="block text-xs pt-2 cursor-pointer">
            <span className="opacity-80">Import share backup (JSON) for another device</span>
            <input
              type="file"
              accept="application/json"
              className="mt-1 text-[0.65rem]"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (!f) return;
                const r = new FileReader();
                r.onload = () => {
                  try {
                    importShareState(JSON.parse(r.result));
                    toast({ title: 'Share data imported' });
                    setListVersion((v) => v + 1);
                  } catch {
                    toast({ title: 'Invalid file', variant: 'destructive' });
                  }
                };
                r.readAsText(f);
                e.target.value = '';
              }}
            />
          </label>
        </div>
      </div>
    </div>
  );
}

function ActivityLine({ token }) {
  const log = getActivity(token, 5);
  if (!log.length) return null;
  return (
    <div className="text-[0.6rem] opacity-60">
      Recent: {log.map((a) => a.type).join(', ')}
    </div>
  );
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    window.prompt('Copy this link', text);
  }
}
