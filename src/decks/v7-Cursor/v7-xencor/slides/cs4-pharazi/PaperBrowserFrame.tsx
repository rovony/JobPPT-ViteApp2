// @ts-nocheck
import React, { useEffect, useRef, useState } from 'react';

/**
 * Local paper-editorial browser chrome for CS4 publication close.
 * Soft hairline frame — no theater drop shadow / glass.
 */
export default function PaperBrowserFrame({
  src,
  title = 'Pharazi',
  mode = 'iframe',
  height = '100%',
}: {
  src: string;
  title?: string;
  mode?: 'iframe' | 'poster';
  height?: number | string;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    if (mode !== 'iframe') return;
    const t = setTimeout(() => {
      if (!loaded) setErrored(true);
    }, 5000);
    return () => clearTimeout(t);
  }, [loaded, mode]);

  const showPoster = mode === 'poster' || errored;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height,
        display: 'flex',
        flexDirection: 'column',
        background: 'var(--panel)',
        border: '1px solid var(--cream-hairline)',
        borderTop: '3px solid var(--case)',
        borderRadius: 'var(--radius-sm)',
        overflow: 'hidden',
        boxShadow: 'var(--shadow-sm, 0 2px 8px rgba(0,0,0,0.06))',
      }}
      aria-label={`${title} · live preview`}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          background: 'var(--panel)',
          borderBottom: '1px solid var(--cream-hairline)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {['var(--coral)', 'var(--amber)', 'var(--sage)'].map((c) => (
            <span
              key={c}
              style={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                background: c,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
        <div
          className="deck-mono"
          style={{
            flex: 1,
            minWidth: 0,
            padding: '4px 10px',
            background: 'var(--bg)',
            border: '1px solid var(--cream-hairline)',
            borderRadius: 4,
            fontSize: 11,
            color: 'var(--cream-muted)',
            letterSpacing: '0.04em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
          }}
        >
          {src}
        </div>
        {errored && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="deck-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.06em',
              color: 'var(--case)',
              textDecoration: 'none',
              border: '1px solid var(--case)',
              padding: '4px 8px',
              borderRadius: 4,
            }}
          >
            Open ↗
          </a>
        )}
      </div>

      <div style={{ position: 'relative', flex: 1, minHeight: 0, background: 'var(--bg)' }}>
        {!loaded && !showPoster && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'var(--bg)',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                color: 'var(--cream-muted)',
                fontSize: 11,
                letterSpacing: '0.06em',
                background: 'var(--panel)',
                padding: '6px 14px',
                border: '1px solid var(--cream-hairline)',
              }}
            >
              loading {title.toLowerCase()}…
            </span>
          </div>
        )}

        {!showPoster && (
          <iframe
            ref={iframeRef}
            src={src}
            title={title}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
            onLoad={() => setLoaded(true)}
            onError={() => setErrored(true)}
            style={{
              width: '100%',
              height: '100%',
              border: 0,
              background: 'var(--bg)',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.35s ease',
            }}
          />
        )}

        {showPoster && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: 'var(--bg)',
            }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                color: 'var(--cream-muted)',
                fontSize: 11,
                letterSpacing: '0.06em',
                textAlign: 'center',
              }}
            >
              live at <span style={{ color: 'var(--case)' }}>pharazi.ai</span>
              <br />
              <span style={{ fontSize: 9, opacity: 0.7 }}>
                (preview unavailable in this view)
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
