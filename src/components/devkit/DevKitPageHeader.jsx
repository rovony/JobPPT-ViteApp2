import React from 'react';

/**
 * DevKitPageHeader — consistent heading for each dev-kit sub-page.
 */
export default function DevKitPageHeader({ eyebrow, title, description }) {
  return (
    <header
      style={{
        marginBottom: 'var(--space-10)',
        paddingBottom: 'var(--space-6)',
        borderBottom: '1px solid var(--cream-hairline)',
      }}
    >
      {eyebrow && (
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-nano)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--case, var(--amber))',
            marginBottom: 'var(--space-2)',
          }}
        >
          {eyebrow}
        </div>
      )}
      <h1
        className="deck-display"
        style={{
          fontSize: 'clamp(1.75rem, 3vw, 2.5rem)',
          color: 'var(--cream)',
          fontWeight: 600,
          letterSpacing: 'var(--ls-headline)',
          margin: 0,
          lineHeight: 1.1,
        }}
      >
        {title}
      </h1>
      {description && (
        <p
          className="deck-body"
          style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--cream-muted)',
            marginTop: 'var(--space-3)',
            maxWidth: '68ch',
            lineHeight: 1.55,
          }}
        >
          {description}
        </p>
      )}
    </header>
  );
}