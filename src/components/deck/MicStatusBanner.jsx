import React from 'react';
import { AlertTriangle, Bug, Mic } from 'lucide-react';

/**
 * MicStatusBanner — always-visible mic state strip above the input.
 *
 * Four states with distinct color + copy:
 *   IDLE        — neutral, "Mic ready · tap or press M"
 *   LISTENING   — pulsing amber, "Listening — speak now"
 *   ERROR       — coral, click to open debug panel inline with the
 *                 actual error message
 *   UNSUPPORTED — coral, browser doesn't support Web Speech
 *
 * Why this exists: hiding all dictation feedback inside a debug panel
 * the user has to know to open is a UX failure even when diagnostics
 * work. The banner sits in fixed geometry just above the input form
 * so it's impossible to miss.
 */
export default function MicStatusBanner({ dictation, onOpenDebug }) {
  if (!dictation.supported) {
    return (
      <div
        className="px-3 py-2 border-t flex items-start gap-2"
        style={{
          borderTopColor: 'var(--cream-hairline)',
          background: 'color-mix(in srgb, var(--coral) 8%, transparent)',
        }}
      >
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--coral)' }} />
        <div className="flex-1 min-w-0">
          <div className="deck-mono uppercase" style={{
            fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)',
          }}>
            Voice unavailable
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
            This browser doesn't support Web Speech. Use Chrome, Edge, Brave, or Arc.
          </div>
        </div>
      </div>
    );
  }

  if (dictation.error) {
    return (
      <button
        onClick={onOpenDebug}
        className="w-full text-left px-3 py-2 border-t flex items-start gap-2 transition-colors hover:bg-[var(--cream-ghost)]"
        style={{
          borderTopColor: 'var(--cream-hairline)',
          background: 'color-mix(in srgb, var(--coral) 10%, transparent)',
        }}
      >
        <AlertTriangle className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--coral)' }} />
        <div className="flex-1 min-w-0">
          <div className="deck-mono uppercase" style={{
            fontSize: '0.58rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--coral)',
          }}>
            Mic error · click for details
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--cream)', lineHeight: 1.4 }}>
            {dictation.error}
          </div>
        </div>
        <Bug className="w-3.5 h-3.5 mt-0.5 shrink-0" style={{ color: 'var(--coral)' }} />
      </button>
    );
  }

  if (dictation.listening) {
    return (
      <div
        className="px-3 py-2 border-t flex items-center gap-2.5"
        style={{
          borderTopColor: 'var(--case, var(--amber))',
          background: 'color-mix(in srgb, var(--case, var(--amber)) 14%, transparent)',
        }}
      >
        <span className="relative inline-flex shrink-0" style={{ width: 14, height: 14 }}>
          <span
            className="absolute inset-0 rounded-full animate-ping"
            style={{ background: 'var(--case, var(--amber))', opacity: 0.5 }}
          />
          <span
            className="relative rounded-full m-auto"
            style={{ width: 9, height: 9, background: 'var(--case, var(--amber))' }}
          />
        </span>
        <div className="flex-1 min-w-0">
          <div className="deck-mono uppercase" style={{
            fontSize: '0.6rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))',
            fontWeight: 600,
          }}>
            Listening — speak now
          </div>
          <div style={{ fontSize: '0.72rem', color: 'var(--cream-muted)', lineHeight: 1.3 }}>
            Pause for 1.5s to auto-send · Esc to cancel · tap mic again to send now
          </div>
        </div>
      </div>
    );
  }

  // Idle — quiet hint
  return (
    <div
      className="px-3 py-1.5 border-t flex items-center gap-2"
      style={{ borderTopColor: 'var(--cream-hairline)' }}
    >
      <Mic className="w-3 h-3 shrink-0" style={{ color: 'var(--cream-faint)' }} />
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.55rem',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}
      >
        Mic ready · tap or press M
      </span>
    </div>
  );
}
