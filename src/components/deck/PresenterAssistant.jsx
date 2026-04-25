import React, { useState, useRef, useEffect } from 'react';
import { base44 } from '@/api/base44Client';
import { Sparkles, Send, Loader2, Lightbulb, Mic, Square, FolderOpen, BookOpen, Globe, StickyNote, Settings, Cpu, AlertTriangle } from 'lucide-react';
import { useAmbientListen } from '@/lib/useAmbientListen';
import {
  isStubResponse,
  hasOpenAIKey,
  localAskPresenter,
  localTranscribeAudio,
  LocalAIError,
} from '@/lib/aiLocalClient';
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
  const [recording, setRecording] = useState(false);
  const [recStatus, setRecStatus] = useState(''); // '', 'listening', 'transcribing'
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [localKeyPresent, setLocalKeyPresent] = useState(hasOpenAIKey());
  const listRef = useRef(null);
  const mediaRef = useRef(null); // { recorder, stream, chunks }

  /* Re-check the localStorage key when the settings modal closes — if
     the user pasted a new one, the assistant header should pick up the
     "Local mode (key set)" indicator without a reload. */
  useEffect(() => {
    if (!settingsOpen) setLocalKeyPresent(hasOpenAIKey());
  }, [settingsOpen]);

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
  }, [messages, loading, recStatus]);

  /* Space-bar push-to-talk. Held = record; release = send. */
  useEffect(() => {
    const isTyping = () => {
      const el = document.activeElement;
      if (!el) return false;
      const tag = el.tagName;
      return tag === 'INPUT' || tag === 'TEXTAREA' || el.isContentEditable;
    };
    const onDown = (e) => {
      if (e.code !== 'Space' || e.repeat || isTyping()) return;
      e.preventDefault();
      startRecording();
    };
    const onUp = (e) => {
      if (e.code !== 'Space' || isTyping()) return;
      e.preventDefault();
      stopRecording();
    };
    window.addEventListener('keydown', onDown);
    window.addEventListener('keyup', onUp);
    return () => {
      window.removeEventListener('keydown', onDown);
      window.removeEventListener('keyup', onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
      });
      return {
        role: 'assistant',
        content: result.answer,
        mode: 'local',
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

  /* ---------- Push-to-talk ---------- */
  const startRecording = async () => {
    if (recording || loading) return;
    if (!navigator.mediaDevices?.getUserMedia) {
      alert('Microphone not supported in this browser.');
      return;
    }
    try {
      // If ambient listen is on, pause it while the presenter talks
      // so the recognition engine doesn't hear push-to-talk audio as
      // audience questions. Resumes automatically ~1.5s after release.
      ambient.pauseBriefly(30_000); // long ceiling; stopRecording clears it sooner

      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mime = pickAudioMime();
      const recorder = new MediaRecorder(stream, mime ? { mimeType: mime } : undefined);
      const chunks = [];
      recorder.ondataavailable = (e) => { if (e.data.size) chunks.push(e.data); };
      recorder.onstop = () => finishRecording(chunks, recorder.mimeType, stream);
      recorder.start();
      mediaRef.current = { recorder, stream, chunks };
      setRecording(true);
      setRecStatus('listening');
    } catch (err) {
      console.warn('Mic permission denied:', err);
      setRecStatus('');
      alert('Microphone permission is needed for push-to-talk.');
    }
  };

  const stopRecording = () => {
    const m = mediaRef.current;
    if (!m || !recording) return;
    setRecording(false);
    setRecStatus('transcribing');
    try { m.recorder.stop(); } catch (_) { /* ignore */ }
    // Give the tail of speech a moment to settle, then let ambient
    // listen resume (its pauseBriefly internal timer fires naturally;
    // we just shorten it here).
    ambient.pauseBriefly(1500);
  };

  const finishRecording = async (chunks, mime, stream) => {
    // Stop all tracks so the browser's mic indicator goes away
    stream.getTracks().forEach((t) => t.stop());
    try {
      if (!chunks.length) { setRecStatus(''); return; }
      const ext = (mime || 'audio/webm').includes('ogg') ? 'ogg'
                : (mime || 'audio/webm').includes('mp4') ? 'm4a'
                : 'webm';
      const blob = new Blob(chunks, { type: mime || 'audio/webm' });

      // Try base44 first (real backend); fall back to local Whisper if stubbed.
      let text = '';
      let baseFailed = false;
      try {
        const file = new File([blob], `ptt.${ext}`, { type: blob.type });
        const upload = await base44.integrations.Core.UploadFile({ file });
        // Stub mode returns { file_url: '' } — treat empty as a stub signal.
        if (!upload?.file_url) {
          baseFailed = true;
        } else {
          const res = await base44.functions.invoke('transcribeAudio', {
            file_url: upload.file_url,
          });
          if (isStubResponse(res)) baseFailed = true;
          else text = (res?.data?.text || '').trim();
        }
      } catch (_) {
        baseFailed = true;
      }

      if (baseFailed) {
        if (!hasOpenAIKey()) {
          setRecStatus('');
          alert(
            'AI backend is offline-stubbed and no local OpenAI key is set.\n' +
            'Open the assistant settings (gear icon) to add your API key.'
          );
          return;
        }
        text = await localTranscribeAudio(blob);
      }

      setRecStatus('');
      if (text) send(text);
    } catch (err) {
      console.warn('Transcription failed:', err);
      setRecStatus('');
      // Surface the actual error so the presenter knows how to retry —
      // includes both server-side base44 errors and LocalAIError messages.
      const friendly = err instanceof LocalAIError ? err.message
        : (err?.response?.data?.error || err?.message || 'Could not transcribe the recording.');
      alert(friendly);
    }
  };

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
        {localKeyPresent && (
          <span
            title="Using local OpenAI key (offline-stub backend)"
            className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded-full border"
            style={{
              borderColor: 'var(--sage)',
              color: 'var(--sage)',
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono)',
            }}
          >
            <Cpu className="w-3 h-3" /> Local
          </span>
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
              <Mic className="w-3 h-3" /> Hold Space or the mic button to talk
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

        {recStatus && (
          <div className="flex items-center gap-2" style={{ color: 'var(--case, var(--amber))' }}>
            {recStatus === 'listening'
              ? <PulseDot />
              : <Loader2 className="w-3.5 h-3.5 animate-spin" />}
            <span style={{ fontSize: '0.8rem' }} className="deck-mono uppercase" >
              {recStatus === 'listening' ? 'Listening — release to send' : 'Transcribing…'}
            </span>
          </div>
        )}
      </div>

      {/* Input row — text field + mic push-to-talk + send */}
      <form
        onSubmit={(e) => { e.preventDefault(); send(); }}
        className="flex items-center gap-2 px-3 py-3 border-t"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask anything… or hold Space to talk"
          className="flex-1 bg-transparent outline-none px-2 py-2"
          style={{ color: 'var(--cream)', fontFamily: 'var(--font-body)', fontSize: '0.9rem' }}
        />

        {/* Push-to-talk button — press-and-hold mouse or touch */}
        <button
          type="button"
          onMouseDown={startRecording}
          onMouseUp={stopRecording}
          onMouseLeave={() => recording && stopRecording()}
          onTouchStart={(e) => { e.preventDefault(); startRecording(); }}
          onTouchEnd={(e) => { e.preventDefault(); stopRecording(); }}
          aria-label={recording ? 'Release to send' : 'Hold to talk'}
          title={recording ? 'Release to send' : 'Hold to talk (or hold Space)'}
          className="h-9 w-9 rounded-full flex items-center justify-center transition-colors"
          style={{
            background: recording ? 'var(--coral)' : 'transparent',
            color: recording ? 'var(--bg)' : 'var(--cream-muted)',
            border: `1px solid ${recording ? 'var(--coral)' : 'var(--cream-hairline)'}`,
          }}
        >
          {recording ? <Square className="w-4 h-4" fill="currentColor" /> : <Mic className="w-4 h-4" />}
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

      <AIKeySettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />
    </div>
  );
}

/* ========================================================
   Message row — renders mode badge + inline citations.
   ======================================================== */
function Message({ msg }) {
  const isUser = msg.role === 'user';
  return (
    <div className={isUser ? 'flex justify-end' : 'flex flex-col items-start gap-1.5'}>
      <div
        className="max-w-[88%] rounded-lg px-3 py-2"
        style={{
          background: isUser ? 'var(--case, var(--amber))' : 'var(--cream-ghost)',
          color: isUser ? 'var(--bg)' : 'var(--cream)',
          fontSize: '0.88rem',
          lineHeight: 1.5,
          whiteSpace: 'pre-wrap',
        }}
      >
        {msg.content}
      </div>
      {!isUser && (msg.mode || msg.citations?.length > 0) && (
        <ModeAndCitations mode={msg.mode} citations={msg.citations} />
      )}
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

function pickAudioMime() {
  if (typeof MediaRecorder === 'undefined') return '';
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/ogg;codecs=opus', 'audio/mp4'];
  for (const c of candidates) {
    if (MediaRecorder.isTypeSupported && MediaRecorder.isTypeSupported(c)) return c;
  }
  return '';
}