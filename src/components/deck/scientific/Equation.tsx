import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { BlockMath, InlineMath as RKInlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';

/**
 * Equation — global component for rendering scientific formulas in slides.
 *
 * Usage:
 *   <Equation latex="C(t) = \\frac{D}{V_d} e^{-k_e t}"
 *             caption="Plasma concentration decay · one-compartment model"
 *             number="Eq. 1" />
 *
 *   <InlineMath>{`V_d = \\frac{D}{C_0}`}</InlineMath>   ← for mid-sentence math
 *
 * Why this wrapper (vs. using react-katex directly everywhere):
 *   · Themes KaTeX output to the deck's cream/case tokens (KaTeX defaults
 *     to black-on-white, which fights our dark canvas).
 *   · Adds a caption + equation-number rail — the conventions scientific
 *     audiences expect when a formula is cited in body copy.
 *   · Normalizes type scale to the slide's --fs-body-lg / --fs-lead
 *     tokens so equations align visually with surrounding prose.
 *   · Runs an entrance fade-in via framer-motion that matches the
 *     header/subhead timing contract used by SlideParts.
 *   · Fails gracefully on malformed LaTeX instead of throwing.
 *
 * All styling reads from CSS tokens — no hardcoded colors or sizes.
 */
export default function Equation({
  latex,
  caption,
  number,
  align = 'center',     // 'left' | 'center'
  size = 'display',     // 'display' | 'lead' | 'body'
  delay = 0.3,
  className,
  style,
}) {
  const reduced = useReducedMotion();
  const [errored, setErrored] = useState(false);

  // Reset error state when the formula changes (e.g. slide re-mount).
  useEffect(() => { setErrored(false); }, [latex]);

  const mathFontSize =
    size === 'display' ? 'clamp(1.5rem, min(2.8vw, 4.5vh), 2.8rem)'
    : size === 'lead'  ? 'clamp(1.15rem, min(1.8vw, 3vh), 1.75rem)'
    :                    'var(--fs-body-lg)';

  return (
    <motion.figure
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: reduced ? 0.2 : 0.55,
        delay: reduced ? 0 : delay,
        ease: [0.2, 0.7, 0.3, 1],
      }}
      className={className}
      style={{
        margin: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: align === 'center' ? 'center' : 'flex-start',
        gap: 'var(--space-3)',
        ...style,
      }}
    >
      {/* Equation row: number (optional) · math · spacer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-6)',
          width: '100%',
          justifyContent: align === 'center' ? 'center' : 'flex-start',
        }}
      >
        {number && (
          <span
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-kicker)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case, var(--amber))',
              flexShrink: 0,
            }}
          >
            {number}
          </span>
        )}

        <div
          className="deck-equation"
          style={{
            // Scoped overrides — KaTeX default inherits color now.
            fontSize: mathFontSize,
            color: 'var(--cream)',
            lineHeight: 1.2,
            // Allow horizontal scroll if a very long equation overflows
            // rather than breaking the slide layout.
            maxWidth: '100%',
            overflowX: 'auto',
            overflowY: 'hidden',
            padding: '0.1em 0',
          }}
        >
          {errored ? (
            <ErrorFallback latex={latex} />
          ) : (
            <SafeBlockMath latex={latex} onError={() => setErrored(true)} />
          )}
        </div>
      </div>

      {caption && (
        <figcaption
          className="deck-body"
          style={{
            fontSize: 'var(--fs-body-sm)',
            color: 'var(--cream-muted)',
            fontStyle: 'italic',
            textAlign: align === 'center' ? 'center' : 'left',
            maxWidth: '72ch',
          }}
        >
          {caption}
        </figcaption>
      )}

      {/* KaTeX inherits color from its container; these rules scope the
          override to our wrapper only, so any KaTeX rendered elsewhere
          (e.g. third-party libraries) is unaffected. */}
      <style>{`
        .deck-equation .katex { color: inherit; font-size: inherit; }
        .deck-equation .katex .mord,
        .deck-equation .katex .mop,
        .deck-equation .katex .mbin,
        .deck-equation .katex .mrel,
        .deck-equation .katex .mopen,
        .deck-equation .katex .mclose,
        .deck-equation .katex .mpunct,
        .deck-equation .katex .minner { color: inherit; }
        .deck-equation .katex .frac-line,
        .deck-equation .katex .overline-line,
        .deck-equation .katex .underline-line,
        .deck-equation .katex .sqrt > .root { border-color: currentColor; }
        .deck-equation .katex-display { margin: 0; }
      `}</style>
    </motion.figure>
  );
}

/**
 * InlineMath — thin wrapper for mid-sentence equations.
 * Picks up color from the surrounding text via `color: inherit`.
 */
export function InlineMath({ children, className, style }) {
  const latex = typeof children === 'string' ? children : '';
  return (
    <span
      className={`deck-equation ${className || ''}`}
      style={{ color: 'inherit', ...style }}
    >
      <RKInlineMath math={latex} />
    </span>
  );
}

/* ─── Internal helpers ────────────────────────────────────────── */

function SafeBlockMath({ latex, onError }) {
  try {
    return (
      <BlockMath
        math={latex}
        errorColor="var(--danger)"
        renderError={(err) => {
          // react-katex catches the KaTeX error and calls this — we
          // bubble up so the parent can swap in a styled fallback.
          Promise.resolve().then(onError);
          return null;
        }}
      />
    );
  } catch {
    Promise.resolve().then(onError);
    return null;
  }
}

function ErrorFallback({ latex }) {
  return (
    <pre
      className="deck-mono"
      style={{
        fontSize: 'var(--fs-body-sm)',
        color: 'var(--danger)',
        background: 'var(--cream-ghost)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-sm)',
        padding: 'var(--space-3) var(--space-4)',
        whiteSpace: 'pre-wrap',
        margin: 0,
      }}
      title="LaTeX failed to parse"
    >
      {latex}
    </pre>
  );
}