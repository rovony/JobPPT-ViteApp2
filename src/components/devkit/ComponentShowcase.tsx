import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';

/**
 * ComponentShowcase — a single entry in the dev-kit catalog.
 *
 * Displays:
 *   · Component name (the exact identifier you'd import)
 *   · Import path (copy-ready)
 *   · One-line description
 *   · A live preview rendered in a framed panel
 *   · Optional props table
 *   · Optional example code snippet (copy-ready)
 *
 * Everything here is token-driven: no hardcoded colors or sizes.
 */
export default function ComponentShowcase({
  name,
  importPath,
  description,
  props: propsList,
  example,
  children,
  previewHeight = 260,
  previewBg = 'var(--bg)',
}) {
  return (
    <section
      id={name}
      style={{
        borderBottom: '1px solid var(--cream-hairline)',
        paddingBottom: 'var(--space-10)',
        marginBottom: 'var(--space-10)',
      }}
    >
      {/* Header */}
      <header style={{ marginBottom: 'var(--space-5)' }}>
        <div className="flex items-baseline gap-3 flex-wrap mb-2">
          <h2
            className="deck-display"
            style={{
              fontSize: 'clamp(1.25rem, 2vw, 1.75rem)',
              color: 'var(--cream)',
              fontWeight: 600,
              margin: 0,
              letterSpacing: 'var(--ls-headline)',
            }}
          >
            {name}
          </h2>
          {importPath && <CopyablePath path={importPath} />}
        </div>
        {description && (
          <p
            className="deck-body"
            style={{
              fontSize: 'var(--fs-body)',
              color: 'var(--cream-muted)',
              margin: 0,
              maxWidth: '72ch',
              lineHeight: 1.5,
            }}
          >
            {description}
          </p>
        )}
      </header>

      {/* Preview frame — only rendered when children are provided */}
      {children && (
        <div
          style={{
            height: previewHeight,
            border: '1px solid var(--cream-hairline)',
            borderRadius: 'var(--radius-md)',
            background: previewBg,
            padding: 'var(--space-6)',
            position: 'relative',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {children}
        </div>
      )}

      {/* Props table */}
      {propsList?.length > 0 && (
        <div style={{ marginTop: 'var(--space-5)' }}>
          <SectionLabel>Props</SectionLabel>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(120px, auto) minmax(120px, auto) 1fr',
              gap: 'var(--space-2) var(--space-6)',
              fontSize: 'var(--fs-body-sm)',
              alignItems: 'start',
            }}
          >
            {propsList.map((p) => (
              <React.Fragment key={p.name}>
                <code
                  className="deck-mono"
                  style={{
                    color: 'var(--case, var(--amber))',
                    fontSize: '0.85em',
                  }}
                >
                  {p.name}
                  {p.required && <span style={{ color: 'var(--coral)' }}>*</span>}
                </code>
                <code
                  className="deck-mono"
                  style={{
                    color: 'var(--cream-muted)',
                    fontSize: '0.8em',
                  }}
                >
                  {p.type}
                </code>
                <span style={{ color: 'var(--cream-muted)' }}>{p.desc}</span>
              </React.Fragment>
            ))}
          </div>
        </div>
      )}

      {/* Example code */}
      {example && (
        <div style={{ marginTop: 'var(--space-5)' }}>
          <SectionLabel>Example</SectionLabel>
          <CodeBlock code={example} />
        </div>
      )}
    </section>
  );
}

function CopyablePath({ path }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(path);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <button
      onClick={copy}
      className="deck-mono"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        padding: '3px 10px',
        borderRadius: 'var(--radius-pill)',
        border: '1px solid var(--cream-hairline)',
        background: 'var(--panel)',
        color: 'var(--cream-muted)',
        fontSize: '0.7rem',
        letterSpacing: 'var(--ls-mono)',
        cursor: 'pointer',
      }}
      title="Copy import path"
    >
      {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
      {path}
    </button>
  );
}

function CodeBlock({ code }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div style={{ position: 'relative' }}>
      <pre
        className="deck-mono"
        style={{
          margin: 0,
          padding: 'var(--space-4)',
          background: 'var(--panel)',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-md)',
          fontSize: 'var(--fs-body-sm)',
          color: 'var(--cream)',
          overflowX: 'auto',
          lineHeight: 1.55,
          whiteSpace: 'pre',
        }}
      >
        {code}
      </pre>
      <button
        onClick={copy}
        className="deck-mono"
        style={{
          position: 'absolute',
          top: 'var(--space-2)',
          right: 'var(--space-2)',
          display: 'inline-flex',
          alignItems: 'center',
          gap: 4,
          padding: '3px 8px',
          borderRadius: 'var(--radius-sm)',
          border: '1px solid var(--cream-hairline)',
          background: 'var(--bg)',
          color: 'var(--cream-muted)',
          fontSize: '0.65rem',
          letterSpacing: 'var(--ls-mono)',
          cursor: 'pointer',
        }}
      >
        {copied ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
        {copied ? 'Copied' : 'Copy'}
      </button>
    </div>
  );
}

export function SectionLabel({ children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'var(--fs-nano)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: 'var(--cream-faint)',
        marginBottom: 'var(--space-2)',
      }}
    >
      {children}
    </div>
  );
}