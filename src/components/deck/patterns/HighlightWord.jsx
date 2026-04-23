import React from 'react';
import { motion } from 'framer-motion';

/**
 * HighlightWord — animated highlight-pen swipe for key phrases.
 *
 * Renders an inline span where a soft colored wash sweeps L→R behind the
 * text, settles, and optionally re-pulses. Used to draw the audience's
 * eye to the 1–2 operative phrases in a paragraph — not every noun.
 *
 * Props:
 *   children — the text to highlight
 *   color    — CSS var ref, e.g. 'var(--coral)' (default: 'var(--case)')
 *   delay    — seconds before the wash starts (default: 0)
 *   pulse    — if true, re-fades once after settle (default: false)
 *   bold     — apply bold weight to the text (default: true)
 */
export default function HighlightWord({
  children,
  color = 'var(--case, var(--amber))',
  delay = 0,
  pulse = false,
  bold = true,
}) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <span
      className="relative inline-block"
      style={{
        padding: '0 0.18em',
        color: 'var(--cream)',
        fontWeight: bold ? 700 : 'inherit',
      }}
    >
      {/* Wash — animates width from 0% → 100% L→R */}
      <motion.span
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `color-mix(in srgb, ${color} 32%, transparent)`,
          transformOrigin: 'left center',
          borderRadius: 2,
          zIndex: 0,
        }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={
          pulse
            ? { scaleX: [0, 1, 1, 1], opacity: [0, 1, 0.55, 0.85] }
            : { scaleX: 1, opacity: 1 }
        }
        transition={{
          duration: pulse ? 2.8 : 0.55,
          ease,
          delay,
          times: pulse ? [0, 0.22, 0.6, 1] : undefined,
        }}
      />
      <span className="relative" style={{ zIndex: 1 }}>
        {children}
      </span>
    </span>
  );
}