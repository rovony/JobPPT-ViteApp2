// @ts-nocheck
/**
 * LibraryShowcase — uniform slide chrome for the components-showcase deck.
 * Built per user ask 2026-04-26 — every showcase slide names the library,
 * the npm install command, and the directory category in a consistent
 * header so the deck reads as a working tour of _Docs/React-Stack-Directory.md.
 *
 * Tokens only — works in light AND dark modes via the deck's theme system.
 */
import React from 'react';

export const Frame: React.FC<{ title: string; children: React.ReactNode; tone?: string }> = ({ title, children, tone = 'var(--amber)' }) => (
  <div style={{
    border: '1px solid var(--cream-hairline)',
    background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
    minWidth: 0,
    overflow: 'hidden',
  }}>
    <div className="deck-mono uppercase" style={{
      fontSize: 'var(--fs-slide-eyebrow)',
      letterSpacing: 'var(--ls-mono-wide)',
      color: tone,
      marginBottom: 'var(--space-3)',
      flexShrink: 0,
    }}>
      {title}
    </div>
    <div style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
      {children}
    </div>
  </div>
);

interface LibraryShowcaseProps {
  category: string;          // e.g. "§5A · Presentation decks"
  library: string;           // e.g. "recharts"
  npmInstall: string;        // e.g. "npm install recharts"
  url?: string;              // e.g. "recharts.org"
  headline: React.ReactNode; // the slide title (with optional accent <span>)
  subhead?: React.ReactNode; // one-liner under the title
  tone?: string;             // accent color token
  children: React.ReactNode; // the demo body (occupies remaining space)
  noteBelow?: React.ReactNode; // optional short caption above the footer
}

export default function LibraryShowcase({
  category,
  library,
  npmInstall,
  url,
  headline,
  subhead,
  tone = 'var(--amber)',
  children,
  noteBelow,
}: LibraryShowcaseProps) {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      {/* HEADER ROW — library + category */}
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-3)', flexWrap: 'wrap', marginBottom: 'var(--space-2)' }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: tone,
          fontWeight: 700,
        }}>
          {library}
        </div>
        <div style={{
          width: 'clamp(32px, 4vw, 48px)',
          height: 1,
          background: 'var(--cream-hairline)',
        }} />
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-faint)',
        }}>
          {category}
        </div>
      </div>

      {/* HEADLINE */}
      <h2 className="deck-display" style={{
        fontSize: 'var(--fs-slide-headline)',
        lineHeight: 'var(--lh-tight)',
        fontWeight: 500,
        margin: 0,
        marginBottom: subhead ? 'var(--space-2)' : 'var(--space-4)',
      }}>
        {headline}
      </h2>

      {/* SUBHEAD */}
      {subhead && (
        <p className="deck-body" style={{
          fontSize: 'var(--fs-slide-tagline)',
          color: 'var(--cream)',
          opacity: 0.78,
          margin: 0,
          marginBottom: 'var(--space-4)',
          maxWidth: '72ch',
          lineHeight: 1.5,
        }}>
          {subhead}
        </p>
      )}

      {/* BODY — demo */}
      <div style={{
        height: 'calc(100% - 220px)',
        display: 'flex',
        flexDirection: 'column',
        minHeight: 0,
      }}>
        <div style={{ flex: 1, minHeight: 0, display: 'flex' }}>
          {children}
        </div>

        {noteBelow && (
          <div className="deck-body" style={{
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream-faint)',
            marginTop: 'var(--space-3)',
            fontStyle: 'italic',
          }}>
            {noteBelow}
          </div>
        )}
      </div>

      {/* FOOTER — npm install + URL */}
      <div style={{
        position: 'absolute',
        left: 'var(--space-8)',
        right: 'var(--space-8)',
        bottom: 'var(--space-6)',
        borderTop: '1px solid var(--cream-hairline)',
        paddingTop: 'var(--space-2)',
        display: 'flex',
        alignItems: 'baseline',
        justifyContent: 'space-between',
        gap: 'var(--space-3)',
        flexWrap: 'wrap',
      }}>
        <code className="deck-mono" style={{
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream)',
          opacity: 0.85,
          background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
          padding: '4px 10px',
          border: '1px solid var(--cream-hairline)',
          borderRadius: 'var(--radius-sm)',
        }}>
          $ {npmInstall}
        </code>
        {url && (
          <span className="deck-mono" style={{
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono-wide)',
          }}>
            {url}
          </span>
        )}
      </div>
    </section>
  );
}
