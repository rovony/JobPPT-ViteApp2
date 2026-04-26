import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { useParams, Navigate, useLocation } from 'react-router-dom';
import { MessageSquare, Download, Lock, AlertTriangle } from 'lucide-react';
import { DeckProvider } from '@/lib/deck-store';
import { DeckStage, useOrderedDeck } from '@/components/deck/DeckRunner';
import { getDeck } from '@/decks/registry';
import { exportDeckToPDF, summaryLine } from '@/lib/deck-export';
import { toast } from '@/components/ui/use-toast';
import { useTheme } from '@/lib/ThemeContext';
import {
  getShare,
  isShareUsable,
  isShareUnlockedInSession,
  validateSharePassword,
  recordView,
  listComments,
  addComment,
  getActivity,
} from '@/lib/shareService';

const NAME_KEY = 'merck_share_viewer_name';

const PLACEHOLDER_DECK = { id: '_share_placeholder', title: '', slides: [] };

function ShareShell({ title = '', detail = '', children = null }: any) {
  return (
    <div
      className="min-h-[100dvh] flex flex-col items-center justify-center p-6"
      style={{ background: 'var(--bg)', color: 'var(--cream)' }}
    >
      <div className="max-w-md text-center space-y-3">
        {children}
        {title && <h1 className="text-lg font-semibold">{title}</h1>}
        {detail && <p className="text-sm opacity-80">{detail}</p>}
      </div>
    </div>
  );
}

export default function ShareViewPage() {
  const { token, slideId: paramSlideId } = useParams();
  const location = useLocation();
  const { mode: themeMode } = useTheme();
  const recordedRef = useRef(false);
  const [pwField, setPwField] = useState('');
  const [pwError, setPwError] = useState('');
  const [unlocked, setUnlocked] = useState(() => (token ? isShareUnlockedInSession(token) : false));
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [author, setAuthor] = useState(() => {
    try {
      return localStorage.getItem(NAME_KEY) || '';
    } catch {
      return '';
    }
  });
  const [body, setBody] = useState('');
  const [exporting, setExporting] = useState(false);

  const rec = useMemo(() => (token ? getShare(token) : null), [token]);
  const usable = useMemo(
    () => (rec ? isShareUsable(rec) : { ok: false, reason: 'missing' }),
    [rec]
  );
  const deck = useMemo(
    () => (rec?.deckId ? getDeck(rec.deckId) : null),
    [rec]
  );
  const orderedDeck = useOrderedDeck(deck || PLACEHOLDER_DECK);
  const needsPassword = !!(rec?.password) && !unlocked;

  useEffect(() => {
    if (token) setUnlocked(isShareUnlockedInSession(token));
  }, [token]);

  const initialIndex = useMemo(() => {
    if (!orderedDeck?.slides?.length) return 0;
    if (paramSlideId == null) return 0;
    const byId = orderedDeck.slides.findIndex((s) => s.id === paramSlideId);
    if (byId >= 0) return byId;
    const n = parseInt(paramSlideId, 10);
    if (Number.isFinite(n)) return Math.max(0, Math.min(n, orderedDeck.slides.length - 1));
    return 0;
  }, [orderedDeck, paramSlideId]);

  const comments = useMemo(() => (token ? listComments(token) : []), [token, commentsOpen, body]);
  const activity = useMemo(() => (token ? getActivity(token, 30) : []), [token, commentsOpen]);

  useEffect(() => {
    if (!rec || !usable.ok || needsPassword || recordedRef.current) return;
    recordedRef.current = true;
    recordView(token, { path: location.pathname });
  }, [rec, usable.ok, needsPassword, token, location.pathname]);

  const onSubmitPassword = async (e) => {
    e.preventDefault();
    setPwError('');
    const ok = await validateSharePassword(token, pwField);
    if (ok) setUnlocked(true);
    else setPwError('Incorrect password.');
  };

  const onSendComment = () => {
    if (rec?.permission !== 'comment' || !token) return;
    const a = author.trim() || 'Viewer';
    try {
      localStorage.setItem(NAME_KEY, a);
    } catch { /* no-op */ }
    setAuthor(a);
    addComment(token, body, a);
    setBody('');
  };

  const runExport = useCallback(async () => {
    if (!deck || !rec?.allowDownload || exporting) return;
    setExporting(true);
    const t = toast({
      title: 'Exporting PDF',
      description: 'Starting… Large decks can take several minutes. The file downloads when ready.',
      duration: 1_200_000,
    });
    try {
      const summary = await exportDeckToPDF(orderedDeck, {
        themeMode,
        onProgress: (p) => {
          const msg = p?.message?.trim();
          if (msg) t.update({ description: msg });
        },
      });
      t.update({
        title: 'Export complete',
        description: summaryLine(summary),
        duration: 12_000,
      });
    } catch (e) {
      console.error(e);
      t.update({
        title: 'Export failed',
        description: e?.message || 'See the browser console.',
        variant: 'destructive',
        duration: 10_000,
      });
    } finally {
      setExporting(false);
    }
  }, [deck, rec, orderedDeck, themeMode, exporting]);

  if (!token) {
    return <Navigate to="/" replace />;
  }

  if (!rec) {
    return (
      <ShareShell title="Link not found" detail="This share may have been created on another device, or the URL is wrong. Ask the owner for a new link or import a share backup.">
        <AlertTriangle className="w-10 h-10 mx-auto opacity-60" style={{ color: 'var(--case, var(--amber))' }} />
      </ShareShell>
    );
  }

  if (!usable.ok) {
    const msg =
      usable.reason === 'expired'
        ? 'This link has expired. Request a new one from the deck owner.'
        : 'This link is no longer active.';
    return (
      <ShareShell title="Unavailable" detail={msg}>
        <Lock className="w-10 h-10 mx-auto opacity-60" />
      </ShareShell>
    );
  }

  if (!deck) {
    return (
      <ShareShell title="Deck missing" detail="The shared deck id is not in this build." />
    );
  }

  if (needsPassword) {
    return (
      <ShareShell>
        <Lock className="w-10 h-10 mx-auto mb-2 opacity-80" style={{ color: 'var(--case, var(--amber))' }} />
        <h1 className="text-lg font-semibold">Password required</h1>
        <p className="text-sm opacity-80">Enter the password provided by the sender (not part of the URL).</p>
        <form onSubmit={onSubmitPassword} className="mt-4 flex flex-col gap-2 text-left max-w-xs mx-auto w-full">
          <input
            type="password"
            value={pwField}
            onChange={(e) => setPwField(e.target.value)}
            className="rounded border px-3 py-2 text-sm w-full"
            style={{ borderColor: 'var(--cream-hairline)', background: 'var(--panel)', color: 'var(--cream)' }}
            placeholder="Password"
            autoComplete="off"
          />
          {pwError && <p className="text-sm text-red-400">{pwError}</p>}
          <button
            type="submit"
            className="rounded py-2 text-sm font-medium"
            style={{ background: 'var(--case, var(--amber))', color: '#111' }}
          >
            Unlock
          </button>
        </form>
      </ShareShell>
    );
  }

  const sharePathBase = `/v/${encodeURIComponent(token)}`;
  const canComment = rec.permission === 'comment';

  return (
    <DeckProvider total={orderedDeck.slides.length} initialIndex={initialIndex} initialPresenter={false}>
      <DeckStage
        deck={orderedDeck}
        viewMode="share"
        sharePathBase={sharePathBase}
        shareHasComments={canComment}
      />

      {rec.allowDownload && (
        <div className="fixed bottom-20 right-3 z-deck-chrome md:bottom-24">
          <button
            type="button"
            onClick={runExport}
            disabled={exporting}
            className="flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs deck-mono uppercase"
            style={{
              background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
              borderColor: 'var(--cream-hairline)',
              color: 'var(--cream-muted)',
            }}
          >
            <Download className="w-3.5 h-3.5" />
            {exporting ? 'Exporting…' : 'PDF'}
          </button>
        </div>
      )}

      {canComment && (
        <>
          <button
            type="button"
            onClick={() => setCommentsOpen((v) => !v)}
            className="fixed bottom-3 left-3 z-deck-chrome flex items-center gap-1.5 rounded-full border px-3 py-2 text-xs"
            style={{
              background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
              borderColor: 'var(--cream-hairline)',
              color: 'var(--cream)',
            }}
          >
            <MessageSquare className="w-4 h-4" />
            Comments ({comments.length})
          </button>

          {commentsOpen && (
            <div
              className="fixed inset-y-0 right-0 z-deck-dialog w-full max-w-md border-l flex flex-col shadow-xl"
              style={{
                background: 'var(--panel)',
                borderColor: 'var(--cream-hairline)',
              }}
            >
              <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: 'var(--cream-hairline)' }}>
                <span className="deck-mono text-xs uppercase" style={{ color: 'var(--case, var(--amber))' }}>
                  Comments
                </span>
                <button type="button" onClick={() => setCommentsOpen(false)} className="text-sm opacity-80">
                  Close
                </button>
              </div>
              <div className="flex-1 overflow-y-auto p-3 space-y-3 text-sm" style={{ color: 'var(--cream-muted)' }}>
                {comments.length === 0 && <p className="opacity-70">No comments yet.</p>}
                {comments.map((c) => (
                  <div key={c.id} className="border-b pb-2" style={{ borderColor: 'var(--cream-hairline)' }}>
                    <div className="text-xs opacity-70">
                      {c.author} · {new Date(c.t).toLocaleString()}
                    </div>
                    <div style={{ color: 'var(--cream)' }}>{c.text}</div>
                  </div>
                ))}
              </div>
              <div className="p-3 border-t space-y-2" style={{ borderColor: 'var(--cream-hairline)' }}>
                <input
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  placeholder="Your name"
                  className="w-full rounded border px-2 py-1.5 text-sm"
                  style={{ borderColor: 'var(--cream-hairline)', background: 'var(--bg)', color: 'var(--cream)' }}
                />
                <textarea
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Add a comment…"
                  rows={3}
                  className="w-full rounded border px-2 py-1.5 text-sm resize-none"
                  style={{ borderColor: 'var(--cream-hairline)', background: 'var(--bg)', color: 'var(--cream)' }}
                />
                <button
                  type="button"
                  onClick={onSendComment}
                  disabled={!body.trim()}
                  className="w-full rounded py-2 text-sm font-medium"
                  style={{ background: 'var(--case, var(--amber))', color: '#111' }}
                >
                  Post
                </button>
                <p className="text-[0.65rem] opacity-60">
                  In standalone mode, comments stay in this browser. Connect a backend to sync for all viewers.
                </p>
              </div>
            </div>
          )}
        </>
      )}

      {import.meta.env.DEV && (
        <details className="fixed top-20 left-3 z-deck-chrome text-[0.6rem] opacity-40 max-w-xs hidden md:block">
          <summary>Activity (dev)</summary>
          <pre className="whitespace-pre-wrap">{JSON.stringify(activity.slice(-5), null, 0)}</pre>
        </details>
      )}
    </DeckProvider>
  );
}
