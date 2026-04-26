import React from 'react';

/**
 * Epidemiology / hero stat. Fluid type: display-scale number, kicker, body qualifier.
 * All text uses tabular numerals where numbers appear.
 */
export default function StatPanel({ number, label, qualifier, style = {} }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
        minWidth: 0,
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 2,
        background: 'color-mix(in srgb, var(--ink) 35%, transparent)',
        ...style,
      }}
    >
      <div
        className="deck-display"
        style={{
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          alignItems: 'baseline',
          gap: '0.08em',
          fontSize:
            'clamp(1.5rem, min(2.6vw, 3.6vh), 2.5rem) /* h2-class scale; fluid, not --fs-h2 */',
          fontWeight: 700,
          lineHeight: 1.1,
          color: 'var(--cream)',
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {number}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        {label}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-subhead)',
          lineHeight: 1.35,
          color: 'var(--cream-muted)',
        }}
      >
        {qualifier}
      </div>
    </div>
  );
}
