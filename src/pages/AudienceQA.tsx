import React, { useMemo, useState } from 'react';
import { useParams, Navigate } from 'react-router-dom';
import { MessageSquare, Send, ArrowUp, Check } from 'lucide-react';
import { getDeck } from '@/decks/registry';
import { useAudienceQuestions } from '@/lib/useAudienceQuestions';
import { useLocalVotes } from '@/lib/useLocalVotes';

/**
 * AudienceQA — mobile-first public page for audience Q&A.
 *
 * URL: /qa/:deckId
 *
 * No login required. An audience member:
 *   1. Picks which slide their question relates to (or "General")
 *   2. Types the question (+ optional display name)
 *   3. Hits send — it shows up live in the presenter's moderation pane
 *   4. Can browse + upvote other questions; local dedup per browser
 *
 * Layout is a single-column, phone-optimized stack. Uses central tokens
 * only (no hardcoded colors).
 */
export default function AudienceQA() {
  const { deckId } = useParams();
  const deck = deckId ? getDeck(deckId) : null;

  const { questions, submit, upvote } = useAudienceQuestions(deck?.id, { includeHidden: false });
  const { hasVoted, markVoted } = useLocalVotes(deck?.id || '');

  const [slideId, setSlideId] = useState('general');
  const [text, setText] = useState('');
  const [authorName, setAuthorName] = useState('');
  const [sending, setSending] = useState(false);
  const [justSent, setJustSent] = useState(false);

  const slideIndexById = useMemo(() => {
    const m = new Map();
    (deck?.slides || []).forEach((s, i) => m.set(s.id, i));
    return m;
  }, [deck]);

  if (!deck) return <Navigate to="/" replace />;

  const onSubmit = async (e) => {
    e.preventDefault();
    const trimmed = text.trim();
    if (!trimmed || sending) return;
    setSending(true);
    try {
      await submit({
        question: trimmed,
        slideId,
        slideIndex: slideId === 'general' ? null : slideIndexById.get(slideId),
        authorName,
      });
      setText('');
      setJustSent(true);
      setTimeout(() => setJustSent(false), 1600);
    } finally {
      setSending(false);
    }
  };

  const onUpvote = async (q) => {
    if (hasVoted(q.id)) return;
    markVoted(q.id);
    try { await upvote(q); } catch {}
  };

  // Sort visible feed: most upvoted first, then newest.
  const feed = [...questions]
    .filter((q) => q.status !== 'hidden')
    .sort((a, b) => (b.votes || 0) - (a.votes || 0) || new Date(b.created_date).getTime() - new Date(a.created_date).getTime());

  return (
    <div className="deck-root min-h-[100dvh]" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="max-w-xl mx-auto" style={{ padding: 'var(--space-6) var(--space-5)' }}>

        {/* Header */}
        <header className="flex items-start gap-3" style={{ marginBottom: 'var(--space-6)' }}>
          <div
            className="shrink-0 rounded-full flex items-center justify-center"
            style={{
              width: 40, height: 40,
              background: 'var(--case, var(--amber))',
              color: 'var(--bg)',
            }}
          >
            <MessageSquare className="w-5 h-5" />
          </div>
          <div className="min-w-0">
            <div
              className="deck-mono uppercase"
              style={{ fontSize: '0.62rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
            >
              Audience Q&A
            </div>
            <h1
              className="deck-display"
              style={{
                fontSize: 'clamp(1.35rem, 4vw, 1.75rem)',
                lineHeight: 1.15, fontWeight: 600,
                letterSpacing: 'var(--ls-headline)',
                margin: 0, color: 'var(--cream)',
              }}
            >
              {deck.title}
            </h1>
            {deck.subtitle && (
              <div style={{ color: 'var(--cream-muted)', fontSize: '0.9rem', marginTop: 2 }}>{deck.subtitle}</div>
            )}
          </div>
        </header>

        {/* Submission form */}
        <form
          onSubmit={onSubmit}
          className="rounded-deck-lg"
          style={{
            background: 'var(--panel)',
            border: '1px solid var(--cream-hairline)',
            padding: 'var(--space-5)',
            marginBottom: 'var(--space-6)',
          }}
        >
          <label
            className="deck-mono uppercase block"
            style={{
              fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)', marginBottom: 'var(--space-2)',
            }}
          >
            About which slide?
          </label>
          <select
            value={slideId}
            onChange={(e) => setSlideId(e.target.value)}
            className="w-full rounded-deck-md outline-none"
            style={{
              background: 'var(--bg)',
              color: 'var(--cream)',
              border: '1px solid var(--cream-hairline)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: '0.9rem',
              marginBottom: 'var(--space-4)',
            }}
          >
            <option value="general">General (not slide-specific)</option>
            {deck.slides.map((s, i) => (
              <option key={s.id} value={s.id}>
                {String(i + 1).padStart(2, '0')} · {s.title}
              </option>
            ))}
          </select>

          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Type your question…"
            rows={3}
            maxLength={500}
            className="w-full rounded-deck-md outline-none resize-none"
            style={{
              background: 'var(--bg)',
              color: 'var(--cream)',
              border: '1px solid var(--cream-hairline)',
              padding: 'var(--space-3) var(--space-4)',
              fontSize: '0.95rem',
              lineHeight: 1.4,
              marginBottom: 'var(--space-3)',
            }}
          />

          <div className="flex items-center gap-2" style={{ marginBottom: 'var(--space-4)' }}>
            <input
              type="text"
              value={authorName}
              onChange={(e) => setAuthorName(e.target.value)}
              placeholder="Name (optional)"
              maxLength={40}
              className="flex-1 rounded-deck-md outline-none"
              style={{
                background: 'var(--bg)',
                color: 'var(--cream)',
                border: '1px solid var(--cream-hairline)',
                padding: 'var(--space-2) var(--space-3)',
                fontSize: '0.85rem',
              }}
            />
            <span
              className="deck-mono shrink-0"
              style={{ color: 'var(--cream-faint)', fontSize: '0.68rem', letterSpacing: 'var(--ls-mono)' }}
            >
              {text.length}/500
            </span>
          </div>

          <button
            type="submit"
            disabled={!text.trim() || sending}
            className="w-full rounded-deck-md flex items-center justify-center gap-2 transition-colors disabled:opacity-40"
            style={{
              background: justSent ? 'var(--success)' : 'var(--case, var(--amber))',
              color: 'var(--bg)',
              padding: 'var(--space-3)',
              fontWeight: 600,
              fontSize: '0.95rem',
            }}
          >
            {justSent ? (<><Check className="w-4 h-4" /> Sent</>) : (<><Send className="w-4 h-4" /> Send question</>)}
          </button>
        </form>

        {/* Live feed of questions from the audience */}
        <section>
          <div
            className="deck-mono uppercase flex items-center justify-between"
            style={{
              fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)', marginBottom: 'var(--space-3)',
            }}
          >
            <span>Questions · {feed.length}</span>
            <span>Tap ↑ to upvote</span>
          </div>

          {feed.length === 0 && (
            <div
              className="rounded-deck-md text-center"
              style={{
                border: '1px dashed var(--cream-hairline)',
                padding: 'var(--space-6)',
                color: 'var(--cream-muted)',
                fontSize: '0.9rem',
              }}
            >
              No questions yet — be the first to ask.
            </div>
          )}

          <ul className="space-y-2">
            {feed.map((q) => (
              <QuestionRow
                key={q.id}
                q={q}
                deck={deck}
                voted={hasVoted(q.id)}
                onUpvote={() => onUpvote(q)}
              />
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}

function QuestionRow({ q, deck, voted, onUpvote }) {
  const surfaced = q.status === 'surfaced';
  const answered = q.status === 'answered';
  const slideIdx = q.slide_id === 'general' ? -1 : deck.slides.findIndex((s) => s.id === q.slide_id);
  const slide = slideIdx >= 0 ? deck.slides[slideIdx] : null;

  return (
    <li
      className="rounded-deck-md flex items-start gap-3"
      style={{
        background: surfaced ? 'color-mix(in srgb, var(--case, var(--amber)) 10%, var(--panel))' : 'var(--panel)',
        border: `1px solid ${surfaced ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
        padding: 'var(--space-3) var(--space-4)',
        opacity: answered ? 0.55 : 1,
      }}
    >
      <button
        onClick={onUpvote}
        disabled={voted || answered}
        aria-label={voted ? 'Already upvoted' : 'Upvote this question'}
        className="shrink-0 rounded-deck-md flex flex-col items-center justify-center transition-colors disabled:opacity-50"
        style={{
          width: 44, minHeight: 44,
          border: `1px solid ${voted ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
          background: voted ? 'var(--case, var(--amber))' : 'transparent',
          color: voted ? 'var(--bg)' : 'var(--cream)',
        }}
      >
        <ArrowUp className="w-4 h-4" />
        <span className="deck-mono tabular-nums" style={{ fontSize: '0.72rem' }}>{q.votes || 0}</span>
      </button>

      <div className="min-w-0 flex-1">
        <div style={{ color: 'var(--cream)', fontSize: '0.95rem', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
          {q.question}
        </div>
        <div
          className="deck-mono uppercase flex items-center gap-2 flex-wrap"
          style={{
            marginTop: 'var(--space-2)',
            fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          <span>{q.author_name || 'Anonymous'}</span>
          <span>·</span>
          <span>{slide ? `Slide ${String(slideIdx + 1).padStart(2, '0')} · ${slide.title}` : 'General'}</span>
          {surfaced && (<><span>·</span><span style={{ color: 'var(--case, var(--amber))' }}>Surfaced</span></>)}
          {answered && (<><span>·</span><span style={{ color: 'var(--success)' }}>Answered</span></>)}
        </div>
      </div>
    </li>
  );
}