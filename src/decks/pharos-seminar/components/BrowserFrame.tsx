// @ts-nocheck
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { EASE } from '../motion';

/**
 * BrowserFrame — chrome window around an iframe slot. Used by the
 * publication-close slide (22) to embed `https://pharazi.ai` live.
 *
 * Behavior:
 *   - Renders a faux Safari/Chrome titlebar with traffic lights and
 *     an address bar showing `src`.
 *   - Iframe lazy-loads; while loading, shows a skeleton with a slow
 *     pulsing hairline grid.
 *   - On load error or X-Frame-Options DENY, falls back to `posterSrc`
 *     (a static screenshot) and surfaces a small "open externally"
 *     button.
 *   - For reduced-motion / panel-format presentations, pass
 *     `mode="poster"` to skip the iframe entirely.
 */

type Mode = 'iframe' | 'poster';

type Props = {
  src: string;
  posterSrc?: string;
  title?: string;
  mode?: Mode;
  height?: number | string;
  showAddressBar?: boolean;
};

export default function BrowserFrame({
  src,
  posterSrc,
  title = 'Pharazi',
  mode = 'iframe',
  height = '100%',
  showAddressBar = true,
}: Props) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  useEffect(() => {
    if (mode !== 'iframe') return;
    const t = setTimeout(() => {
      // X-Frame-Options DENY does not always fire onerror — fall back if
      // the iframe doesn't fire onload within 5s.
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
        background: 'var(--bg)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 8,
        overflow: 'hidden',
        boxShadow: '0 16px 48px rgba(0, 0, 0, 0.32)',
      }}
      aria-label={`${title} · live preview`}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 12,
          padding: '10px 14px',
          background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
          borderBottom: '1px solid var(--cream-hairline)',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 6 }}>
          {['#fc625d', '#fdbc40', '#34c84a'].map((c) => (
            <span
              key={c}
              style={{
                width: 11,
                height: 11,
                borderRadius: '50%',
                background: c,
                opacity: 0.85,
              }}
            />
          ))}
        </div>
        {showAddressBar && (
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
        )}
        {errored && (
          <a
            href={src}
            target="_blank"
            rel="noopener noreferrer"
            className="deck-mono uppercase"
            style={{
              fontSize: 10,
              letterSpacing: '0.16em',
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

      {/* Body */}
      <div style={{ position: 'relative', flex: 1, minHeight: 0, background: 'var(--bg)' }}>
        {/* Skeleton (during load) */}
        {!loaded && !showPoster && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3, ease: EASE.expoOut }}
            style={{
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 11px, var(--cream-hairline) 11px, var(--cream-hairline) 12px), repeating-linear-gradient(90deg, transparent, transparent 11px, var(--cream-hairline) 11px, var(--cream-hairline) 12px)',
              opacity: 0.16,
              display: 'grid',
              placeItems: 'center',
            }}
          >
            <span
              className="deck-mono uppercase"
              style={{
                color: 'var(--cream-muted)',
                fontSize: 11,
                letterSpacing: '0.20em',
                background: 'var(--bg)',
                padding: '6px 14px',
                border: '1px solid var(--cream-hairline)',
              }}
            >
              loading {title.toLowerCase()}…
            </span>
          </motion.div>
        )}

        {/* Iframe */}
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
              display: loaded ? 'block' : 'block',
              opacity: loaded ? 1 : 0,
              transition: 'opacity 0.4s ease',
            }}
          />
        )}

        {/* Poster fallback */}
        {showPoster && (
          <div
            style={{
              position: 'absolute',
              inset: 0,
              display: 'grid',
              placeItems: 'center',
              background: posterSrc
                ? `center / contain no-repeat url(${posterSrc}), var(--bg)`
                : 'var(--bg)',
            }}
          >
            {!posterSrc && (
              <div
                className="deck-mono uppercase"
                style={{
                  color: 'var(--cream-muted)',
                  fontSize: 11,
                  letterSpacing: '0.18em',
                  textAlign: 'center',
                }}
              >
                live at <span style={{ color: 'var(--case)' }}>{title.toLowerCase()}.ai</span>
                <br />
                <span style={{ fontSize: 9, opacity: 0.6 }}>
                  (preview unavailable in this view)
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
