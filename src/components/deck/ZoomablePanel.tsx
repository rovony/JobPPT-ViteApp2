// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { motion, useReducedMotion } from 'framer-motion';

const EASE = [0.2, 0.7, 0.3, 1];

export default function ZoomablePanel({
  title,
  right,
  children,
  modalChildren,
  panelStyle,
  modalBodyStyle,
  accent = 'var(--case, var(--coral))',
}) {
  const [open, setOpen] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  return (
    <>
      <button
        type="button"
        onClick={(event) => {
          event.stopPropagation();
          setOpen(true);
        }}
        aria-label={`Zoom ${plainText(title) || 'panel'}`}
        style={{
          all: 'unset',
          boxSizing: 'border-box',
          position: 'relative',
          cursor: 'zoom-in',
          ...panelStyle,
        }}
      >
        {children}
        <span
          className="deck-mono uppercase"
          style={{
            position: 'absolute',
            right: 'var(--space-2)',
            bottom: 'var(--space-2)',
            padding: 'var(--space-1) var(--space-2)',
            border: '1px solid color-mix(in srgb, var(--cream) 18%, transparent)',
            background: 'color-mix(in srgb, var(--bg) 82%, transparent)',
            color: 'var(--cream-faint)',
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: '0.12em',
            pointerEvents: 'none',
          }}
        >
          Click to zoom
        </span>
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          role="dialog"
          aria-modal="true"
          aria-label={plainText(title) || 'Zoomed slide panel'}
          onClick={() => setOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 9999,
            display: 'grid',
            placeItems: 'center',
            padding: 'min(3vh, 28px) min(3vw, 42px)',
            background: 'rgba(0, 0, 0, 0.82)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            cursor: 'zoom-out',
          }}
        >
          <motion.div
            initial={reduced ? false : { opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0 : 0.22, ease: EASE }}
            onClick={(event) => event.stopPropagation()}
            style={{
              width: 'min(94vw, 1560px)',
              height: 'min(88vh, 920px)',
              maxHeight: '88vh',
              display: 'grid',
              gridTemplateRows: 'auto minmax(0, 1fr)',
              gap: 'var(--space-3)',
              padding: 'clamp(14px, 2vw, 28px)',
              background: 'var(--bg)',
              border: '1px solid color-mix(in srgb, var(--cream) 22%, transparent)',
              boxShadow: '0 24px 80px rgba(0, 0, 0, 0.56)',
              cursor: 'default',
              overflow: 'hidden',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 'var(--space-4)', minWidth: 0 }}>
              <div className="deck-mono uppercase" style={{ minWidth: 0, color: accent, fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', fontWeight: 800 }}>
                {title}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)', flexShrink: 0 }}>
                {right}
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="deck-mono uppercase"
                  style={{
                    border: '1px solid var(--cream-hairline)',
                    background: 'transparent',
                    color: 'var(--cream-muted)',
                    padding: 'var(--space-1) var(--space-3)',
                    fontSize: 'var(--fs-slide-pageno)',
                    letterSpacing: '0.12em',
                    cursor: 'pointer',
                  }}
                >
                  Esc
                </button>
              </div>
            </div>

            <div
              style={{
                minHeight: 0,
                overflow: 'auto',
                display: 'flex',
                alignItems: 'stretch',
                justifyContent: 'center',
                ...modalBodyStyle,
              }}
            >
              {modalChildren || children}
            </div>
          </motion.div>
        </div>,
        document.body,
      )}
    </>
  );
}

function plainText(value) {
  if (typeof value === 'string') return value;
  if (typeof value === 'number') return String(value);
  if (Array.isArray(value)) return value.map(plainText).join(' ');
  if (React.isValidElement(value)) return plainText(value.props?.children);
  return '';
}
