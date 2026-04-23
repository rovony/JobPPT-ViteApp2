import React from 'react';

/**
 * SketchBox — hand-drawn-style callout box. Stub implementation uses SVG
 * with a slight path jitter to emulate Rough.js aesthetic without the dep.
 * Architectural hook: swap the <path> generator with rough.js when desired.
 */
export default function SketchBox({ children, className, color = 'hsl(var(--deck-accent))' }) {
  // A single imperfect rounded rectangle. Ratios keep it responsive.
  const path =
    'M 8 4 Q 4 4 4 10 L 4 90 Q 4 96 10 96 L 92 97 Q 96 96 96 90 L 96 10 Q 96 5 90 4 Z';
  return (
    <div className={`relative inline-block p-5 ${className || ''}`}>
      <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
        <path d={path} fill="none" stroke={color} strokeWidth="0.8" strokeLinejoin="round" />
      </svg>
      <div className="relative">{children}</div>
    </div>
  );
}