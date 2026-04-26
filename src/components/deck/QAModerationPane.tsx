// @ts-nocheck
import React, { useMemo, useState } from 'react';
import { ArrowUp, Check, EyeOff, Star, Trash2, Link2, Copy } from 'lucide-react';
import { useAudienceQuestions } from '@/lib/useAudienceQuestions';

/**
 * QAModerationPane — presenter-side panel that lists live audience
 * questions for the deck, with moderation controls. Slots into
 * PresenterView's right column.
 *
 * Surface controls per question:
 *   · ★  surface → highlights to audience + pins to top
 *   · ✓  answered → dims the card, moves to bottom
 *   · ⦸  hide → removes from audience feed (still visible to presenter)
 *   · 🗑  delete → permanent
 *
 * Filters: current slide only / all slides / surfaced / answered.
 * Sort: by votes desc, then newest.
 */
export default function QAModerationPane({ deck, currentSlide }) {
  const { questions, setStatus, remove } = useAudienceQuestions(deck.id, { includeHidden: true });
  const [filter, setFilter] = useState('current'); // 'current' | 'all' | 'surfaced' | 'answered'
  const [copied, setCopied] = useState(false);

  const audienceUrl = useMemo(() => {
    if (typeof window === 'undefined') return '';
    return `${window.location.origin}/qa/${deck.id}`;
  }, [deck.id]);

  const copyUrl = async () => {
    try {
      await navigator.clipboard.writeText(audienceUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  const filtered = useMemo(() => {
    let rows = questions;
    if (filter === 'current' && currentSlide?.id) {
      rows = rows.filter((q) => q.slide_id === currentSlide.id && q.status !== 'hidden');
    } else if (filter === 'surfaced') {
      rows = rows.filter((q) => q.status === 'surfaced');
    } else if (filter === 'answered') {
      rows = rows.filter((q) => q.status === 'answered');
    } else {
      rows = rows.filter((q) => q.status !== 'hidden');
    }
    return [...rows].sort((a, b) => {
      // Surfaced first, then answered last, then by votes desc, then newest
      const rank = (q) => (q.status === 'surfaced' ? 0 : q.status === 'answered' ? 2 : 1);
      if (rank(a) !== rank(b)) return rank(a) - rank(b);
      if ((b.votes || 0) !== (a.votes || 0)) return (b.votes || 0) - (a.votes || 0);
      return new Date(b.created_date) - new Date(a.created_date);
    });
  }, [questions, filter, currentSlide]);

  const counts = useMemo(() => ({
    current: questions.filter((q) => q.slide_id === currentSlide?.id && q.status !== 'hidden').length,
    all: questions.filter((q) => q.status !== 'hidden').length,
    surfaced: questions.filter((q) => q.status === 'surfaced').length,
    answered: questions.filter((q) => q.status === 'answered').length,
  }), [questions, currentSlide]);

  return (
    <div
      className="h-full w-full flex flex-col rounded-md border"
      style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)' }}
      role="region"
      aria-label="Audience Q&A moderation"
    >
      {/* Header */}
      <div
        className="flex items-center gap-2 px-4 py-3 border-b shrink-0"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <div className="flex-1 min-w-0">
          <div
            className="deck-mono uppercase"
            style={{ fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}
          >
            Audience Q&A
          </div>
          <div className="deck-display truncate" style={{ color: 'var(--cream)', fontSize: '0.95rem', fontWeight: 500 }}>
            {counts.all} live · {counts.surfaced} surfaced
          </div>
        </div>
        <button
          onClick={copyUrl}
          title="Copy audience Q&A link"
          aria-label="Copy audience Q&A link"
          className="deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
          style={{
            borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)',
            fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)',
          }}
        >
          {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
          {copied ? 'Copied' : 'Share link'}
        </button>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-1 px-3 py-2 border-b shrink-0" style={{ borderColor: 'var(--cream-hairline)' }}>
        <FilterPill active={filter === 'current'} onClick={() => setFilter('current')} count={counts.current}>This slide</FilterPill>
        <FilterPill active={filter === 'all'} onClick={() => setFilter('all')} count={counts.all}>All</FilterPill>
        <FilterPill active={filter === 'surfaced'} onClick={() => setFilter('surfaced')} count={counts.surfaced}>Surfaced</FilterPill>
        <FilterPill active={filter === 'answered'} onClick={() => setFilter('answered')} count={counts.answered}>Answered</FilterPill>
      </div>

      {/* Share link as text for QR code generators / dictation */}
      <div className="px-4 py-2 border-b shrink-0 flex items-center gap-2"
           style={{ borderColor: 'var(--cream-hairline)' }}>
        <Link2 className="w-3 h-3 shrink-0" style={{ color: 'var(--cream-faint)' }} />
        <span
          className="deck-mono truncate"
          style={{ color: 'var(--cream-muted)', fontSize: '0.68rem', letterSpacing: 'var(--ls-mono)' }}
          title={audienceUrl}
        >
          {audienceUrl.replace(/^https?:\/\//, '')}
        </span>
      </div>

      {/* Question list */}
      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-2">
        {filtered.length === 0 && (
          <div
            className="rounded-deck-md text-center"
            style={{
              border: '1px dashed var(--cream-hairline)',
              padding: 'var(--space-5)',
              color: 'var(--cream-faint)',
              fontSize: '0.85rem',
            }}
          >
            No questions {filter === 'current' ? 'for this slide' : 'yet'}.
          </div>
        )}

        {filtered.map((q) => (
          <QuestionCard
            key={q.id}
            q={q}
            deck={deck}
            onSurface={() => setStatus(q, q.status === 'surfaced' ? 'new' : 'surfaced')}
            onAnswer={() => setStatus(q, q.status === 'answered' ? 'new' : 'answered')}
            onHide={() => setStatus(q, 'hidden')}
            onDelete={() => remove(q)}
          />
        ))}
      </div>
    </div>
  );
}

function FilterPill({ active, onClick, count, children }) {
  return (
    <button
      onClick={onClick}
      className="deck-mono uppercase flex items-center gap-1.5 px-2.5 py-1 rounded-full border transition-colors"
      style={{
        borderColor: active ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
        background: active ? 'var(--case, var(--amber))' : 'transparent',
        color: active ? 'var(--bg)' : 'var(--cream-muted)',
        fontSize: '0.58rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      {children}
      <span style={{ opacity: 0.75 }}>{count}</span>
    </button>
  );
}

function QuestionCard({ q, deck, onSurface, onAnswer, onHide, onDelete }) {
  const surfaced = q.status === 'surfaced';
  const answered = q.status === 'answered';
  const hidden = q.status === 'hidden';
  const slide = q.slide_id === 'general' ? null : deck.slides.find((s) => s.id === q.slide_id);
  const slideIdx = slide ? deck.slides.findIndex((s) => s.id === slide.id) : -1;

  return (
    <div
      className="rounded-deck-md"
      style={{
        background: surfaced ? 'color-mix(in srgb, var(--case, var(--amber)) 12%, var(--panel))' : 'var(--cream-ghost)',
        border: `1px solid ${surfaced ? 'var(--case, var(--amber))' : 'var(--cream-hairline)'}`,
        padding: 'var(--space-3)',
        opacity: answered || hidden ? 0.6 : 1,
      }}
    >
      <div className="flex items-start gap-2">
        {/* Vote count badge */}
        <div
          className="shrink-0 rounded-deck-sm flex flex-col items-center justify-center"
          style={{
            width: 36, minHeight: 36,
            background: 'var(--panel)',
            border: '1px solid var(--cream-hairline)',
            color: 'var(--cream)',
          }}
        >
          <ArrowUp className="w-3 h-3" style={{ color: 'var(--cream-faint)' }} />
          <span className="deck-mono tabular-nums" style={{ fontSize: '0.72rem' }}>{q.votes || 0}</span>
        </div>

        <div className="min-w-0 flex-1">
          <div style={{ color: 'var(--cream)', fontSize: '0.88rem', lineHeight: 1.4, whiteSpace: 'pre-wrap' }}>
            {q.question}
          </div>
          <div
            className="deck-mono uppercase flex items-center gap-2 flex-wrap"
            style={{
              marginTop: 'var(--space-2)',
              fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)',
            }}
          >
            <span>{q.author_name || 'Anonymous'}</span>
            <span>·</span>
            <span>{slide ? `Slide ${String(slideIdx + 1).padStart(2, '0')}` : 'General'}</span>
            {hidden && (<><span>·</span><span style={{ color: 'var(--coral)' }}>Hidden</span></>)}
          </div>
        </div>
      </div>

      {/* Action row */}
      <div className="flex items-center gap-1 mt-2 pt-2 border-t" style={{ borderColor: 'var(--cream-hairline)' }}>
        <ModAction
          onClick={onSurface}
          active={surfaced}
          activeColor="var(--case, var(--amber))"
          icon={Star}
          label={surfaced ? 'Unsurface' : 'Surface'}
        />
        <ModAction
          onClick={onAnswer}
          active={answered}
          activeColor="var(--success)"
          icon={Check}
          label={answered ? 'Reopen' : 'Answered'}
        />
        <ModAction onClick={onHide} icon={EyeOff} label="Hide" />
        <div className="flex-1" />
        <ModAction onClick={onDelete} icon={Trash2} label="Delete" danger />
      </div>
    </div>
  );
}

function ModAction({ onClick, active, activeColor, icon: Icon, label, danger }) {
  return (
    <button
      onClick={onClick}
      className="deck-mono uppercase flex items-center gap-1 px-2 py-1 rounded-full border transition-colors hover:bg-[var(--cream-ghost)]"
      style={{
        borderColor: active ? activeColor : 'var(--cream-hairline)',
        background: active ? activeColor : 'transparent',
        color: active ? 'var(--bg)' : (danger ? 'var(--coral)' : 'var(--cream-muted)'),
        fontSize: '0.55rem',
        letterSpacing: 'var(--ls-mono)',
      }}
    >
      <Icon className="w-3 h-3" /> {label}
    </button>
  );
}
