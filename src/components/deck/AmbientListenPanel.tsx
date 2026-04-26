import React, { useState } from 'react';
import { Ear, EarOff, ChevronDown, ChevronRight, Loader2, Sparkles, AlertTriangle } from 'lucide-react';

/**
 * AmbientListenPanel — the presenter-side ambient Q&A surface.
 *
 * Collapsible panel that sits above the assistant's chat log.
 *   · Toggle turns continuous listening on/off (Web Speech API).
 *   · While listening: the mic-indicator pulses; interim transcript
 *     shows as a typing-style line so the presenter knows the
 *     engine is actually picking them up.
 *   · Detected questions appear as clickable chips. One tap →
 *     fetches a ≤15-word headline answer via the caller's
 *     `onAnswer(text)` handler. Tap again to expand for a longer
 *     answer with citations (caller provides that via expanded text).
 *
 * Content:
 *   ambient      — the useAmbientListen() return value
 *   answers      — { [questionId]: { short, long, loading, error } }
 *   onAnswer(q)  — called when the presenter taps "Answer this"
 *
 * Uses only CSS-variable tokens. No hex. Collapses when empty so it
 * doesn't eat notes space when inactive.
 */
export default function AmbientListenPanel({
  ambient,
  answers,
  onAnswer,
}) {
  const { supported, listening, interim, questions, error, start, stop, clear } = ambient;
  const [expandedId, setExpandedId] = useState(null); // id of question whose long answer is expanded

  // Not supported → render a one-line notice instead of hiding, so
  // the presenter understands why the feature is unavailable.
  if (!supported) {
    return (
      <div
        className="px-4 py-2.5 border-b flex items-center gap-2"
        style={{ borderColor: 'var(--cream-hairline)' }}
      >
        <AlertTriangle className="w-3.5 h-3.5 shrink-0" style={{ color: 'var(--warn)' }} />
        <span
          className="deck-mono uppercase"
          style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-muted)' }}
        >
          Ambient listen needs Chrome or Edge
        </span>
      </div>
    );
  }

  const toggle = () => (listening ? stop() : start());

  return (
    <div
      className="px-3 py-2.5 border-b"
      style={{ borderColor: 'var(--cream-hairline)' }}
    >
      {/* ─── Toggle row ─── */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggle}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-full border transition-colors"
          style={{
            borderColor: listening ? 'var(--case, var(--amber))' : 'var(--cream-hairline)',
            background: listening ? 'color-mix(in srgb, var(--case, var(--amber)) 16%, transparent)' : 'transparent',
            color: listening ? 'var(--case, var(--amber))' : 'var(--cream-muted)',
          }}
          aria-pressed={listening}
          title={listening ? 'Stop ambient listening' : 'Start ambient listening'}
        >
          {listening ? <Ear className="w-3.5 h-3.5" /> : <EarOff className="w-3.5 h-3.5" />}
          <span
            className="deck-mono uppercase"
            style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)' }}
          >
            {listening ? 'Listening' : 'Ambient listen'}
          </span>
          {listening && <PulseDot />}
        </button>

        {questions.length > 0 && (
          <button
            onClick={clear}
            title="Clear detected questions"
            className="deck-mono uppercase ml-auto"
            style={{
              fontSize: '0.55rem',
              letterSpacing: 'var(--ls-mono)',
              color: 'var(--cream-faint)',
              padding: '4px 8px',
            }}
          >
            Clear
          </button>
        )}
      </div>

      {/* ─── Interim transcript ─── */}
      {listening && interim && (
        <div
          className="mt-2 px-2 py-1.5 rounded-md"
          style={{
            background: 'var(--cream-ghost)',
            color: 'var(--cream-muted)',
            fontSize: '0.75rem',
            fontStyle: 'italic',
            lineHeight: 1.4,
            maxHeight: '3em',
            overflow: 'hidden',
          }}
        >
          {interim}…
        </div>
      )}

      {/* ─── Empty-state hint ─── */}
      {listening && questions.length === 0 && !interim && (
        <div
          className="mt-2 deck-mono"
          style={{
            fontSize: '0.58rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          Listening for audience questions…
        </div>
      )}

      {/* ─── Question queue ─── */}
      {questions.length > 0 && (
        <div className="mt-2 space-y-1.5">
          {questions.map((q) => (
            <QuestionRow
              key={q.id}
              q={q}
              answer={answers?.[q.id]}
              expanded={expandedId === q.id}
              onAnswer={() => onAnswer(q)}
              onToggleExpand={() =>
                setExpandedId((cur) => (cur === q.id ? null : q.id))
              }
            />
          ))}
        </div>
      )}

      {/* ─── Error row ─── */}
      {error && (
        <div className="mt-2 flex items-center gap-2">
          <AlertTriangle className="w-3 h-3 shrink-0" style={{ color: 'var(--warn)' }} />
          <span
            className="deck-mono"
            style={{ fontSize: '0.58rem', letterSpacing: 'var(--ls-mono)', color: 'var(--warn)' }}
          >
            {error === 'not-allowed' ? 'Mic permission denied' : error}
          </span>
        </div>
      )}
    </div>
  );
}

/* ──────────────────────────────────────────────
   One row in the question queue.
   Primary state: detected question text + "Answer" button.
   After answer: headline shows inline; tap to expand long answer.
   ────────────────────────────────────────────── */
function QuestionRow({ q, answer, expanded, onAnswer, onToggleExpand }) {
  const hasAnswer = !!answer?.short;
  const loading = !!answer?.loading;

  return (
    <div
      className="rounded-md px-2.5 py-2"
      style={{
        background: 'var(--panel-elevated)',
        border: '1px solid var(--cream-hairline)',
      }}
    >
      {/* Row 1 — the detected question */}
      <div className="flex items-start gap-2">
        <span
          className="deck-mono shrink-0 mt-0.5"
          style={{
            fontSize: '0.52rem',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
            textTransform: 'uppercase',
          }}
        >
          Q
        </span>
        <div
          className="flex-1 min-w-0"
          style={{ fontSize: '0.78rem', lineHeight: 1.4, color: 'var(--cream)' }}
        >
          {q.text}
        </div>
      </div>

      {/* Row 2 — action or answer */}
      {!hasAnswer && !loading && (
        <button
          onClick={onAnswer}
          className="mt-1.5 deck-mono uppercase flex items-center gap-1.5 px-2 py-1 rounded-full"
          style={{
            fontSize: '0.55rem',
            letterSpacing: 'var(--ls-mono)',
            border: '1px solid var(--case, var(--amber))',
            color: 'var(--case, var(--amber))',
            background: 'transparent',
          }}
        >
          <Sparkles className="w-2.5 h-2.5" /> Answer this
        </button>
      )}

      {loading && (
        <div
          className="mt-1.5 flex items-center gap-1.5"
          style={{ color: 'var(--cream-muted)' }}
        >
          <Loader2 className="w-3 h-3 animate-spin" />
          <span
            className="deck-mono uppercase"
            style={{ fontSize: '0.55rem', letterSpacing: 'var(--ls-mono)' }}
          >
            Thinking…
          </span>
        </div>
      )}

      {hasAnswer && (
        <div className="mt-1.5">
          {/* Headline answer — what you read in 1 second */}
          <button
            onClick={onToggleExpand}
            className="flex items-start gap-1.5 text-left w-full"
            style={{
              fontSize: '0.82rem',
              lineHeight: 1.4,
              color: 'var(--cream)',
              fontWeight: 500,
            }}
          >
            <span
              className="shrink-0 mt-0.5"
              style={{ color: 'var(--case, var(--amber))' }}
            >
              {expanded ? (
                <ChevronDown className="w-3.5 h-3.5" />
              ) : (
                <ChevronRight className="w-3.5 h-3.5" />
              )}
            </span>
            <span className="flex-1">{answer.short}</span>
          </button>

          {expanded && answer.long && (
            <div
              className="mt-1.5 pl-5 pr-1"
              style={{
                fontSize: '0.75rem',
                lineHeight: 1.5,
                color: 'var(--cream-muted)',
                whiteSpace: 'pre-wrap',
              }}
            >
              {answer.long}
            </div>
          )}

          {answer.error && (
            <div
              className="mt-1 pl-5 deck-mono"
              style={{ fontSize: '0.55rem', color: 'var(--warn)', letterSpacing: 'var(--ls-mono)' }}
            >
              {answer.error}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

function PulseDot() {
  return (
    <span
      className="relative inline-flex items-center justify-center"
      style={{ width: 8, height: 8 }}
    >
      <span
        className="absolute inset-0 rounded-full animate-ping"
        style={{ background: 'var(--case, var(--amber))', opacity: 0.4 }}
      />
      <span
        className="relative rounded-full"
        style={{ width: 5, height: 5, background: 'var(--case, var(--amber))' }}
      />
    </span>
  );
}