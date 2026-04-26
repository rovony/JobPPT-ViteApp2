import React, { useEffect } from 'react';
import { X } from 'lucide-react';

/**
 * ShortcutsOverlay — keyboard reference shown when the presenter presses ? or clicks Help.
 * Full-screen modal with a two-column list so nothing gets lost on stage.
 */
const GROUPS = [
  {
    title: 'Navigation',
    items: [
      ['→ / Space / PgDn', 'Next slide or step'],
      ['← / PgUp',         'Previous'],
      ['O',                'Overview grid'],
      ['Esc',              'Close overlay / exit presenter'],
    ],
  },
  {
    title: 'Display mode',
    items: [
      ['F',  'Toggle fullscreen (Slide Show)'],
      ['P',  'Toggle presenter view'],
    ],
  },
  {
    title: 'Notes (in presenter)',
    items: [
      ['Click Edit',     'Edit notes for this slide'],
      ['**bold**',       'Bold text'],
      ['*italic*',       'Italic text'],
      ['==highlight==',  'Highlight with case color'],
      ['A− / A+',        'Smaller / larger reading type'],
    ],
  },
  {
    title: 'On-stage tools',
    items: [
      ['Assistant panel',       'Always visible on the left — ask anything'],
      ['Dual screen button',    'Open audience tab fullscreen'],
      ['Sources button',        'Upload reference docs for the AI'],
      ['?  /  Esc',             'Open / close this help'],
    ],
  },
];

export default function ShortcutsOverlay({ open, onClose }) {
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') { e.preventDefault(); onClose?.(); } };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  return (
    <div
      className="fixed inset-0 z-deck-overlay flex items-center justify-center p-8"
      style={{ background: 'var(--scrim)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-3xl rounded-xl border shadow-2xl p-8"
        style={{ background: 'var(--panel)', borderColor: 'var(--cream-hairline)' }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-label="Keyboard shortcuts"
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 h-8 w-8 rounded-full flex items-center justify-center transition-colors hover:bg-[var(--cream-ghost)]"
          style={{ color: 'var(--cream-muted)' }}
        >
          <X className="w-4 h-4" />
        </button>

        <div
          className="deck-mono uppercase mb-1"
          style={{ fontSize: '0.65rem', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--case, var(--amber))' }}
        >
          Keyboard & on-stage tools
        </div>
        <h2 className="deck-display mb-8" style={{ color: 'var(--cream)', fontSize: '1.8rem', fontWeight: 600 }}>
          Everything at your fingertips
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {GROUPS.map((g) => (
            <div key={g.title}>
              <div
                className="deck-mono uppercase mb-3 pb-2 border-b"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: 'var(--ls-mono)',
                  color: 'var(--cream-faint)',
                  borderColor: 'var(--cream-hairline)',
                }}
              >
                {g.title}
              </div>
              <dl className="space-y-2">
                {g.items.map(([key, desc]) => (
                  <div key={key} className="flex items-baseline gap-3">
                    <dt
                      className="deck-mono shrink-0"
                      style={{
                        fontSize: '0.72rem',
                        color: 'var(--cream)',
                        minWidth: 120,
                        letterSpacing: '0.04em',
                      }}
                    >
                      {key}
                    </dt>
                    <dd style={{ color: 'var(--cream-muted)', fontSize: '0.85rem', lineHeight: 1.4 }}>
                      {desc}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          ))}
        </div>

        <div
          className="deck-mono uppercase mt-8 pt-4 border-t text-center"
          style={{
            borderColor: 'var(--cream-hairline)',
            color: 'var(--cream-faint)',
            fontSize: '0.62rem',
            letterSpacing: 'var(--ls-mono)',
          }}
        >
          Press ? anytime to show this help
        </div>
      </div>
    </div>
  );
}