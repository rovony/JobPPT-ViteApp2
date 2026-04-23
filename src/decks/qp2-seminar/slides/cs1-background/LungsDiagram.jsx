import React from 'react';

/**
 * LungsDiagram — editorial anatomical lungs illustration.
 *
 * HOW TO PASTE YOUR OWN SVG:
 *   1. Delete the two marker lines below (the ones that say DELETE THIS LINE).
 *   2. Delete everything between them (the placeholder <svg>…</svg>).
 *   3. Paste your full SVG markup — must start with <svg and end with </svg>.
 *   4. In your pasted <svg>, remove width="…" and height="…" attrs
 *      (keep viewBox). The wrapper controls size.
 *   5. Convert kebab-case attrs to camelCase for JSX:
 *        stroke-width    → strokeWidth
 *        stroke-linecap  → strokeLinecap
 *        stroke-linejoin → strokeLinejoin
 *        fill-rule       → fillRule
 *        clip-path       → clipPath
 *        xml:space       → remove
 *        xmlns:xx="…"    → remove (keep only xmlns="http://www.w3.org/2000/svg")
 */
export default function LungsDiagram({
  alt = 'Anatomical illustration of lungs',
}) {
  return (
    <div
      role="img"
      aria-label={alt}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'var(--cream-muted)',
      }}
    >
      {/* ▼▼▼ DELETE THIS LINE — and everything down to the next DELETE LINE — then paste your <svg>…</svg> here ▼▼▼ */}
      <svg
        viewBox="0 0 482.519 581.189"
        xmlns="http://www.w3.org/2000/svg"
        style={{ width: '100%', height: '100%', maxHeight: '100%', display: 'block' }}
      >
        <rect width="100%" height="100%" fill="none" />
      </svg>
      {/* ▲▲▲ DELETE THIS LINE — paste ends above this marker ▲▲▲ */}
    </div>
  );
}