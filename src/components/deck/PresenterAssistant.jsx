import React, { useState, useRef, useEffect, useCallback } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Send, Loader2, Lightbulb, Mic, Square, FolderOpen, BookOpen, Globe, StickyNote, Settings, Cpu, AlertTriangle, Database, RefreshCw, ChevronDown, ChevronRight, Zap, GraduationCap } from 'lucide-react';
import { useAmbientListen } from '@/lib/useAmbientListen';
import { useDictation } from '@/lib/useDictation';
import {
  isStubResponse,
  hasOpenAIKey,
  getKeySource,
  localAskPresenter,
  localTranscribeAudio,
  LocalAIError,
} from '@/lib/aiLocalClient';
import { isQdrantConfigured } from '@/lib/qdrantClient';
import { indexDeck, getIndexStatus } from '@/lib/aiRagIndex';
import AmbientListenPanel from './AmbientListenPanel';
import AIKeySettings from './AIKeySettings';

/**
 * PresenterAssistant — live co-pilot for the person presenting.
 *
 * Features:
 *   • RAG: questions hit /askPresenter which retrieves from this deck's
 *     uploaded sources (via embeddings) and falls back to web search when
 *     retrieval is weak. Citations rendered inline.
 *   • Push-to-talk: hold the mic button (or hold Space) to record, release
 *     to transcribe via Whisper and send. Clean, no always-on noise.
 *   • Sources shortcut: opens the DeckSourcesDialog via a parent callback.
 *
 * Props:
 *   deck          — { id, title, subtitle }
 *   currentSlide  — { id, title, component }
 *   currentNote   — speaker notes string for the current slide
 *   onOpenSources — () => void  (opens the sources dialog)
 */
export default function PresenterAssistant({ deck, currentSlide, currentNote, onOpenSources }) {
  const [messages, setMessages] = useState([]);   // { role, content, mode?, citations? }
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [localKeyPresent, setLocalKeyPresent] = useState(hasOpenAIKey());
  const [keySource, setKeySource] = useState(getKeySource()); // 'env' | 'localStorage' | null  (no longer surfaced in header — kept for settings UI)
  const [ragStatus, setRagStatus] = useState(() =>
    deck?.id ? getIndexStatus(deck.id) : { state: 'unknown' }
  );
  /* presenterMode persists across sessions so the user doesn't have to
     re-toggle when they reopen the deck mid-rehearsal. Default is 'live'
     because that's the more demanding context — better to be too terse
     and re-ask than too verbose and lose the room. */
  const [presenterMode, setPresenterMode] = useState(() => {
    try {
      return localStorage.getItem('presenter-assistant:mode') || 'live';
    } catch {
      return 'live';
    }
  });
  useEffect(() => {
    try { localStorage.setItem('presenter-assistant:mode', presenterMode); } catch {}
  }, [presenterMode]);
  const listRef = useRef(null);
  const inputRef = useRef(null);

  /* Dictation — click-to-toggle, live interim transcript, auto-send
     on silence pause. The recognizer is the browser's Web Speech API
     (free, real-time). On final, we feed the transcript directly into
     send() and clear the input — no manual "click to send" step. */
  const dictation = useDictation({
    onInterim: (text) => {
      // Mirror the live transcript into the input so the user can SEE
      // what's being heard. This is the single most important piece of
      // voice-UI feedback — without it dictation feels broken even when
      // it's working.
      setInput(text);
    },
    onFinal: (text) => {
      const trimmed = (text || '').trim();
      if (!trimmed) return;
      setInput('');
      send(trimmed);
    },
  });

  /* Re-check the localStorage key when the settings modal closes — if
     the user pasted a new one, the assistant header should pick up the
     "Local mode (key set)" indicator without a reload. */
  useEffect(() => {
    if (!settingsOpen) {
      setLocalKeyPresent(hasOpenAIKey());
      setKeySource(getKeySource());
    }
  }, [settingsOpen]);

  /* Auto-index the deck on mount when Qdrant + OpenAI are configured.
     `indexDeck` is idempotent — unchanged chunks are skipped via content
     hash, so this is cheap on warm starts. Failures are surfaced via
     ragStatus but never block the UI. */
  useEffect(() => {
    if (!deck?.id) return;
    if (!isQdrantConfigured() || !hasOpenAIKey()) return;
    let cancelled = false;
    setRagStatus({ state: 'indexing', at: Date.now() });
    indexDeck(deck).then((result) => {
      if (cancelled) return;
      setRagStatus(getIndexStatus(deck.id));
      if (result?.upserted) {
        console.info(
          `[RAG] indexed ${result.upserted} new chunks (skipped ${result.skipped}/${result.total}) for ${deck.id}`,
        );
      }
    });
    return () => { cancelled = true; };
  }, [deck?.id]);

  /** Manual reindex (called from settings modal) — bypasses content
   *  hashing so the user can force a full re-embed if they suspect
   *  drift. */
  const reindexNow = useCallback(async () => {
    if (!deck?.id) return;
    setRagStatus({ state: 'indexing', at: Date.now() });
    // Drop hashes so every chunk is re-embedded.
    const prefix = `rag-index:${deck.id}:`;
    for (let i = localStorage.length - 1; i >= 0; i--) {
      const k = localStorage.key(i);
      if (k && k.startsWith(prefix) && !k.endsWith('_status')) {
        localStorage.removeItem(k);
      }
    }
    await indexDeck(deck);
    setRagStatus(getIndexStatus(deck.id));
  }, [deck]);

  // ─── Ambient listen (audience Q detection via Web Speech API) ───
  const ambient = useAmbientListen();
  const [ambientAnswers, setAmbientAnswers] = useState({}); // { [questionId]: { short, long, loading, error } }

  /* Tap "Answer this" on a detected question → fetch a compact
     headline answer via askPresenter. We prompt-engineer the short
     form in-place by prefixing the question; the backend's RAG
     pipeline still handles retrieval + citations under the hood. */
  const answerAmbientQuestion = async (q) => {
    setAmbientAnswers((prev) => ({ ...prev, [q.id]: { loading: true } }));
    try {
      const res = await base44.functions.invoke('askPresenter', {
        deck_id: deck.id,
        deck_title: deck.title,
        slide_id: currentSlide?.id || '',
        slide_title: currentSlide?.title || '',
        slide_note: currentNote || '',
        question:
          `Audience asked: "${q.text}"\n\nRespond in two parts, each on its own line:\n` +
          `HEADLINE: <=15 words, plain-spoken, the core answer.\n` +
          `DETAIL: 2-3 short sentences with the specific number or fact to cite if pressed.`,
        history: [],
      });
      const full = (res.data?.answer || '').trim();
      const { short, long } = splitHeadline(full);
      setAmbientAnswers((prev) => ({
        ...prev,
        [q.id]: { short, long, loading: false },
      }));
    } catch (err) {
      setAmbientAnswers((prev) => ({
        ...prev,
        [q.id]: { loading: false, error: 'Could not fetch answer.' },
      }));
    }
  };

  /* Scroll to bottom on new messages */
  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages, loading, dictation.listening]);

  /* Keyboard model — single tap to toggle dictation, no holding.
     'M' starts/stops dictation. 'Esc' cancels (drops the buffer
     instead of sending). Both ignored while typing in a real input. */
  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement;
      if (!el) return false;
      // Allow Esc to cancel even from the assistant's own input.
      if (el === inputRef.current) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
    };
    const onKey = (e) => {
      if (e.repeat) return;
      if (e.key === 'Escape' && dictation.listening) {
        e.preventDefault();
        e.stopImmediatePropagation();
        dictation.stop({ finalize: false });
        setInput('');
        return;
      }
      if ((e.key === 'm' || e.key === 'M') && !isTyping()) {
        e.preventDefault();
        dictation.toggle();
      }
    };
    window.addEventListener('keydown', onKey, true);
    return () => window.removeEventListener('keydown', onKey, true);
  }, [dictation]);

  const suggestions = [
    'Give me a 15-second recap of this slide.',
    'What question is an expert likely to ask here?',
    'What are the 3 strongest numbers to cite?',
    'Rephrase my opening sentence more tightly.',
  ];

  /* ---------- Send (text or transcribed) ----------
     Try base44 first; if it's stubbed (offline-mock client) or throws,
     fall back to the local OpenAI path with the user's API key. The
     local path injects deck.reading + the full slide map as context
     (Phase 14 scope expansion). */
  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || loading) return;
    const nextMsgs = [...messages, { role: 'user', content: q }];
    setMessages(nextMsgs);
    setInput('');
    setLoading(true);

    const reply = await getReply(q, nextMsgs);
    setMessages([...nextMsgs, reply]);
    setLoading(false);
  };

  const getReply = async (question, nextMsgs) => {
    // 1. Try base44 (real backend if connected; stub returns sentinel).
    try {
      const res = await base44.functions.invoke('askPresenter', {
        deck_id: deck.id,
        deck_title: deck.title,
        slide_id: currentSlide?.id || '',
        slide_title: currentSlide?.title || '',
        slide_note: currentNote || '',
        question,
        history: nextMsgs.slice(-6),
      });
      if (!isStubResponse(res)) {
        const { answer, mode, citations } = res.data || {};
        return {
          role: 'assistant',
          content: answer || '(no response)',
          mode: mode || 'notes-only',
          citations: citations || [],
        };
      }
      // base44 is in offline-stub mode → fall through to local.
    } catch (_) {
      // base44 threw → fall through to local.
    }

    // 2. Local fallback — needs an OpenAI key.
    if (!hasOpenAIKey()) {
      return {
        role: 'assistant',
        content:
          'AI backend is offline-stubbed and no local OpenAI key is set. ' +
          'Click the gear icon in the assistant header to add your API key, ' +
          'then ask again.',
        mode: 'no-key',
        citations: [],
      };
    }

    try {
      const result = await localAskPresenter({
        deck,
        currentSlide,
        currentNote,
        question,
        history: nextMsgs.slice(-6),
        presenterMode,
      });
      return {
        role: 'assistant',
        content: result.answer,
        // Structured shape for the renderer:
        quick: result.quick,
        details: result.details,
        tags: result.tags,
        mode: result.mode,           // 'rag' | 'local'
        presenterMode: result.presenterMode,
        citations: result.citations,
      };
    } catch (err) {
      const friendly = err instanceof LocalAIError ? err.message
        : (err?.message || 'Could not reach the model.');
      return {
        role: 'assistant',
        content: `⚠️ ${friendly}`,
        mode: 'error',
        citations: [],
      };
    }
  };

  /* Push-to-talk + MediaRecorder + Whisper helpers were removed when
     dictation switched to the click-to-toggle Web Speech API model
     (see useDictation). The browser native recognizer is real-time,
     free, and shows interim results — much better fit for live use. */

  /* ---------- Render ---------- */
  return (
    <div
      className="h-full w-full flex flex-col rounded-md border"
      style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)' }}
      role="region"
      aria-label="Presenter assistant"
    >
      {/* Header */}
      <div className="flex items-center gap-2 px-4 py-3 border-b"
           style={{ borderColor: 'var(--cream-hairline)' }}>
        <Sparkles className="w-4 h-4" style={{ color: 'var(--case, var(--amber))' }} />
        <div className="flex-1 min-w-0">
          <div className="deck-mono uppercase" style={{
            fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)',
          }}>
            Presenter assistant
          </div>
          <div className="deck-display truncate" style={{ color: 'var(--cream)', fontSize: '0.95rem', fontWeight: 500 }}>
            Ask about this slide
          </div>
        </div>
        <ModeToggle value={presenterMode} onChange={setPresenterMode} />
        {isQdrantConfigured() && (
          <RagStatusBadge status={ragStatus} />
        )}
        {onOpenSources && (
          <button
            onClick={onOpenSources}
            title="Manage deck sources"
            aria-label="Manage deck sources"
            className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
            style={{
              borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)',
              fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)',
            }}
          >
            <FolderOpen className="w-3 h-3" /> Sources
          </button>
        )}
        <button
          onClick={() => setSettingsOpen(true)}
          title={localKeyPresent ? 'AI assistant settings' : 'Set up local OpenAI key'}
          aria-label="AI assistant settings"
          className="h-7 w-7 rounded flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
          style={{ color: localKeyPresent ? 'var(--cream-muted)' : 'var(--case, var(--amber))' }}
        >
          {localKeyPresent ? <Settings className="w-3.5 h-3.5" /> : <AlertTriangle className="w-3.5 h-3.5" />}
        </button>
      </div>

      {/* Ambient listen — sits above the chat so detected questions
          are the first thing the presenter sees. Collapses to a
          one-line toggle when inactive. */}
      <AmbientListenPanel
        ambient={ambient}
        answers={ambientAnswers}
        onAnswer={answerAmbientQuestion}
      />

      {/* Messages */}
      <div ref={listRef} className="flex-1 overflow-y-auto px-4 py-4 space-y-4">
        {messages.length === 0 && (
          <div className="space-y-3">
            <div className="flex items-center gap-2" style={{ color: 'var(--cream-faint)' }}>
              <Lightbulb className="w-3.5 h-3.5" />
              <span className="deck-mono uppercase" style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono)' }}>
                Try asking
              </span>
            </div>
            {suggestions.map((s) => (
              <button
                key={s}
                onClick={() => send(s)}
                className="block w-full text-left px-3 py-2 rounded-md border transition-colors hover:bg-[var(--cream-ghost)]"
                style={{
                  borderColor: 'var(--cream-hairline)',
                  color: 'var(--cream-muted)',
                  fontSize: '0.85rem',
                  lineHeight: 1.4,
                }}
              >
                {s}
              </button>
            ))}
            <div className="pt-2 deck-mono uppercase flex items-center gap-1.5"
                 style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
              <Mic className="w-3 h-3" /> Tap mic or press M — auto-sends when you pause
            </div>
          </div>
        )}

        {messages.map((m, i) => (
          <Message key={i} msg={m} />
        ))}

        {loading && (
          <div className="flex items-center gap-2" style={{ color: 'var(--cream-muted)' }}>
            <Loader2 className="w-3.5 h-3.5 animate-spin" />
            <span style={{ fontSize: '0.8rem' }}>Thinking…</span>
          </div>
        )}

        {dictation.listening && (
          <div className="flex items-center gap-2" style={{ color: 'var(--case, var(--amber))' }}>
            <PulseDot />
            <span style={{ fontSize: '0.8rem' }} className="deck-mono uppercase" >
              Listening · pause to send · Esc to cancel
            </span>
          </div>
        )}
        {dictation.error && !dictation.listening && (
          <div className="flex items-center gap-2" style={{ color: 'var(--coral)' }}>
            <AlertTriangle className="w-3.5 h-3.5" />
            <span style={{ fontSize: '0.8rem' }} className="deck-mono uppercase">
              Mic · {dictation.error}
            </span>
          </div>
        )}
      </div>

      {/* Input row — text field + tap-once dictation + send */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-center gap-2 px-3 py-3 border-t"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={
            dictation.listening
              ? 'Listening… (will auto-send)'
              : dictation.supported
                ? 'Ask anything… or tap mic / press M'
                : 'Ask anything…'
          }
          className="flex-1 bg-transparent outline-none px-2 py-2"
          style={{
            color: dictation.listening ? 'var(--case, var(--amber))' : 'var(--cream)',
            fontFamily: 'var(--font-body)',
            fontSize: '0.9rem',
            fontStyle: dictation.listening ? 'italic' : 'normal',
          }}
        />

        {/* Click-to-toggle dictation. No more press-and-hold — single tap
            starts the recognizer; user speaks freely; auto-stops + sends
            after ~1.5s of silence. Tap again to manually finalize. */}
        <button
          type="button"
          onClick={() => {
            if (!dictation.supported) {
              alert('Voice input needs a Chromium-based browser (Chrome, Edge, Brave). Firefox doesn\'t implement Web Speech yet.');
              return;
            }
            dictation.toggle();
          }}
          aria-label={dictation.listening ? 'Stop listening (auto-sends)' : 'Start dictation'}
          aria-pressed={dictation.listening}
          title={
            dictation.listening
              ? 'Listening — pause to auto-send · click to send now · Esc to cancel'
              : 'Tap to dictate (auto-sends when you pause) · M'
          }
          className="h-9 w-9 rounded-full flex items-center justify-center transition-colors relative"
          style={{
            background: dictation.listening ? 'var(--case, var(--amber))' : 'transparent',
            color: dictation.listening ? 'var(--bg)' : 'var(--cream-muted)',
            border: `1px solid ${dictation.listening ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
          }}
        >
          {dictation.listening ? (
            <>
              <Square className="w-3.5 h-3.5" fill="currentColor" />
              {/* pulsing ring indicator so the user sees "I'm hot" at a glance */}
              <span
                className="absolute inset-0 rounded-full animate-ping pointer-events-none"
                style={{ background: 'var(--case, var(--amber))', opacity: 0.35 }}
              />
            </>
          ) : (
            <Mic className="w-4 h-4" />
          )}
        </button>

        <button
          type="submit"
          disabled={!input.trim() || loading}
          aria-label="Send"
          className="h-9 w-9 rounded-full flex items-center justify-center transition-colors disabled:opacity-30"
          style={{ background: 'var(--case, var(--amber))', color: 'var(--bg)' }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
        </button>
      </form>

      <AIKeySettings
        open={settingsOpen}
        onClose={() => setSettingsOpen(false)}
        ragStatus={ragStatus}
        onReindex={reindexNow}
      />
    </div>
  );
}

function RagStatusBadge({ status }) {
  const map = {
    indexing: { label: 'RAG · indexing', color: 'var(--case, var(--amber))', icon: Loader2, spin: true },
    ready:    { label: 'RAG · ready',    color: 'var(--sage)',                icon: Database, spin: false },
    error:    { label: 'RAG · error',    color: 'var(--coral)',               icon: AlertTriangle, spin: false },
    unknown:  { label: 'RAG · idle',     color: 'var(--cream-faint)',         icon: Database, spin: false },
  };
  const meta = map[status?.state] || map.unknown;
  const Icon = meta.icon;
  return (
    <span
      title={status?.error || (status?.upserted != null
        ? `Indexed ${status.upserted}, skipped ${status.skipped}/${status.total}`
        : meta.label)}
      className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded-full border"
      style={{
        borderColor: meta.color,
        color: meta.color,
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      <Icon className={`w-3 h-3 ${meta.spin ? 'animate-spin' : ''}`} />
      {meta.label}
    </span>
  );
}

/* ========================================================
   Message row — structured-answer renderer.
   User messages: amber pill, right-aligned.
   Assistant messages:
     · QUICK headline in big readable type (the line to SAY)
     · DETAILS bullets — collapsed by default in 'live' mode,
       open by default in 'rehearse' mode (matches the two
       use cases: stage-quick vs prep-deep)
     · TAGS as compact chips
     · Citations as bracketed chips when RAG fired
   ======================================================== */
function Message({ msg }) {
  const isUser = msg.role === 'user';

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div
          className="max-w-[88%] rounded-lg px-3 py-2"
          style={{
            background: 'var(--case, var(--amber))',
            color: 'var(--bg)',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
            fontWeight: 500,
          }}
        >
          {msg.content}
        </div>
      </div>
    );
  }

  // Assistant — structured if available, else plain text fallback.
  const hasStructured = !!(msg.quick || msg.details?.length);
  if (!hasStructured) {
    return (
      <div className="flex flex-col items-start gap-1.5">
        <div
          className="max-w-[92%] rounded-lg px-3 py-2"
          style={{
            background: 'var(--cream-ghost)',
            color: 'var(--cream)',
            fontSize: '0.88rem',
            lineHeight: 1.5,
            whiteSpace: 'pre-wrap',
          }}
        >
          {msg.content}
        </div>
        {(msg.mode || msg.citations?.length > 0) && (
          <ModeAndCitations mode={msg.mode} citations={msg.citations} />
        )}
      </div>
    );
  }
  return <StructuredMessage msg={msg} />;
}

function StructuredMessage({ msg }) {
  // In rehearse mode, default to expanded; in live mode, default to
  // collapsed. The user can click to toggle either way.
  const [open, setOpen] = useState(msg.presenterMode !== 'live');
  const hasDetails = !!msg.details?.length;
  const isLive = msg.presenterMode === 'live';

  return (
    <div className="flex flex-col items-start gap-2 w-full">
      {/* QUICK — the headline answer, the line the presenter says.
          Tags now sit IN the eyebrow (right-aligned) so they describe
          the answer rather than orphaning at the bottom of the card. */}
      <div
        className="rounded-lg px-3 py-2.5 w-full"
        style={{
          background: 'var(--cream-ghost)',
          border: `1px solid ${isLive ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
          borderLeftWidth: 3,
        }}
      >
        <div className="mb-1 flex items-center justify-between gap-2 flex-wrap">
          <div
            className="deck-mono uppercase flex items-center gap-1.5"
            style={{
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: isLive ? 'var(--case, var(--amber))' : 'var(--cream-faint)',
            }}
          >
            {isLive ? <Zap className="w-3 h-3" /> : <GraduationCap className="w-3 h-3" />}
            {isLive ? 'Say this' : 'Headline'}
          </div>
          {msg.tags?.length > 0 && (
            <div className="flex flex-wrap items-center gap-1">
              {msg.tags.map((t) => (
                <span
                  key={t}
                  className="deck-mono uppercase px-1.5 py-0.5 rounded"
                  style={{
                    fontSize: '0.5rem',
                    letterSpacing: 'var(--ls-mono)',
                    color: 'var(--cream-faint)',
                    background: 'transparent',
                    border: '1px solid var(--cream-hairline)',
                  }}
                >
                  #{t}
                </span>
              ))}
            </div>
          )}
        </div>
        <div
          style={{
            color: 'var(--cream)',
            fontSize: isLive ? '1rem' : '0.95rem',
            lineHeight: 1.45,
            fontWeight: isLive ? 500 : 400,
          }}
        >
          {msg.quick || msg.content}
        </div>
      </div>

      {/* DETAILS — own card with distinct background so it reads as a
          separate surface, not blending into the panel. Indented and
          slightly muted so the QUICK card stays primary. */}
      {hasDetails && (
        <div className="w-full">
          <button
            onClick={() => setOpen((v) => !v)}
            className="deck-mono uppercase flex items-center gap-1.5 px-1 py-1 transition-colors hover:text-[var(--cream)]"
            style={{
              fontSize: '0.58rem',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
            }}
          >
            {open ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
            {open ? 'Hide details' : `Details · ${msg.details.length}`}
          </button>
          {open && (
            <div
              className="rounded-lg px-3 py-2.5"
              style={{
                background: 'color-mix(in srgb, var(--cream-ghost) 60%, var(--bg) 40%)',
                border: '1px solid var(--cream-hairline)',
                borderLeft: '2px solid var(--cream-faint)',
              }}
            >
              <ul className="flex flex-col gap-1.5 m-0 p-0 list-none">
                {msg.details.map((d, i) => (
                  <li
                    key={i}
                    className="flex gap-2"
                    style={{ color: 'var(--cream)', fontSize: '0.83rem', lineHeight: 1.5 }}
                  >
                    <span
                      aria-hidden
                      className="deck-mono shrink-0 tabular-nums"
                      style={{
                        minWidth: '1rem',
                        paddingTop: '0.15em',
                        fontSize: '0.62rem',
                        color: 'var(--cream-faint)',
                      }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span style={{ color: 'var(--cream-muted)' }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {/* MODE + CITATIONS row (tags moved up into the eyebrow) */}
      {(msg.citations?.length || msg.mode) && (
        <div className="flex flex-wrap items-center gap-1.5">
          {msg.mode && <ModeChip mode={msg.mode} />}
          {msg.citations?.map((c) => (
            <span
              key={`${c.source_title}-${c.n}`}
              title={`${c.source_title} · score ${c.score}`}
              className="deck-mono px-1.5 py-0.5 rounded"
              style={{
                color: 'var(--cream-muted)',
                fontSize: '0.55rem',
                letterSpacing: 'var(--ls-mono)',
                border: '1px solid var(--cream-hairline)',
                background: 'var(--cream-ghost)',
              }}
            >
              [R{c.n}] {truncate(c.source_title, 22)}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}

function ModeChip({ mode }) {
  const meta = ({
    rag:    { label: 'RAG', color: 'var(--sage)', Icon: Database },
    local:  { label: 'AI',  color: 'var(--cream-faint)', Icon: Cpu },
    error:  { label: 'err', color: 'var(--coral)', Icon: AlertTriangle },
    'no-key':{ label: 'set up key', color: 'var(--case, var(--amber))', Icon: AlertTriangle },
  })[mode];
  if (!meta) return null;
  const Icon = meta.Icon;
  return (
    <span
      className="deck-mono uppercase flex items-center gap-1 px-1.5 py-0.5 rounded"
      style={{
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono)',
        color: meta.color,
        border: `1px solid ${meta.color}`,
      }}
    >
      <Icon className="w-2.5 h-2.5" /> {meta.label}
    </span>
  );
}

function ModeToggle({ value, onChange }) {
  const Btn = ({ which, label, Icon }) => {
    const active = value === which;
    return (
      <button
        onClick={() => onChange(which)}
        title={which === 'live' ? 'Live mode — terse, stage-ready' : 'Rehearse mode — fuller reasoning'}
        className="deck-mono uppercase flex items-center gap-1 px-2 py-1 rounded-full transition-colors"
        style={{
          background: active ? 'var(--case, var(--amber))' : 'transparent',
          color: active ? 'var(--bg)' : 'var(--cream-muted)',
          border: `1px solid ${active ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono)',
          fontWeight: active ? 600 : 400,
        }}
      >
        <Icon className="w-3 h-3" /> {label}
      </button>
    );
  };
  return (
    <div className="flex items-center gap-1">
      <Btn which="live" label="Live" Icon={Zap} />
      <Btn which="rehearse" label="Rehearse" Icon={GraduationCap} />
    </div>
  );
}

function ModeAndCitations({ mode, citations }) {
  const badge = {
    rag:          { icon: BookOpen,   label: 'From sources',   color: 'var(--sage)' },
    web:          { icon: Globe,      label: 'Web fallback',   color: 'var(--cyan)' },
    'notes-only': { icon: StickyNote, label: 'Notes only',     color: 'var(--cream-faint)' },
    local:        { icon: Cpu,        label: 'Local · OpenAI', color: 'var(--sage)' },
    'no-key':     { icon: AlertTriangle, label: 'Set up key',  color: 'var(--case, var(--amber))' },
    error:        { icon: AlertTriangle, label: 'Error',       color: 'var(--coral)' },
  }[mode] || null;

  return (
    <div className="flex flex-wrap items-center gap-2 max-w-[88%]">
      {badge && (
        <span
          className="deck-mono uppercase flex items-center gap-1 px-1.5 py-0.5 rounded"
          style={{
            color: badge.color,
            fontSize: '0.55rem',
            letterSpacing: 'var(--ls-mono)',
            border: `1px solid ${badge.color}`,
            opacity: 0.9,
          }}
        >
          <badge.icon className="w-2.5 h-2.5" /> {badge.label}
        </span>
      )}
      {citations?.map((c) => (
        <span
          key={`${c.source_title}-${c.chunk_index}`}
          title={`${c.source_title} · chunk ${c.chunk_index} · score ${c.score}`}
          className="deck-mono px-1.5 py-0.5 rounded"
          style={{
            color: 'var(--cream-muted)',
            fontSize: '0.55rem',
            letterSpacing: 'var(--ls-mono)',
            border: '1px solid var(--cream-hairline)',
            background: 'var(--cream-ghost)',
          }}
        >
          [{c.n}] {truncate(c.source_title, 22)}
        </span>
      ))}
    </div>
  );
}

function PulseDot() {
  return (
    <span className="relative inline-flex items-center justify-center" style={{ width: 14, height: 14 }}>
      <span className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'var(--case, var(--amber))', opacity: 0.4 }} />
      <span className="relative rounded-full"
            style={{ width: 8, height: 8, background: 'var(--case, var(--amber))' }} />
    </span>
  );
}

function truncate(s, n) { return s && s.length > n ? s.slice(0, n - 1) + '…' : s; }

/* Split an LLM reply formatted as "HEADLINE: …\nDETAIL: …" into
   { short, long }. Falls back to a word-boundary split at ~15 words
   if the model ignored the format. */
function splitHeadline(text) {
  if (!text) return { short: '', long: '' };
  const headMatch = text.match(/headline\s*:\s*([^\n]+)/i);
  const detailMatch = text.match(/detail\s*:\s*([\s\S]+)/i);
  if (headMatch) {
    return {
      short: headMatch[1].trim(),
      long: detailMatch ? detailMatch[1].trim() : '',
    };
  }
  // Fallback — first sentence (or first ~15 words) as headline.
  const firstSentence = text.split(/(?<=[.!?])\s/)[0];
  const words = firstSentence.split(/\s+/);
  if (words.length <= 18) {
    return { short: firstSentence.trim(), long: text.slice(firstSentence.length).trim() };
  }
  const shortWords = words.slice(0, 15).join(' ');
  return { short: shortWords + '…', long: text.trim() };
}

