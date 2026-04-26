import React from 'react';

/**
 * SlidePreview — renders a slide component at reduced scale for the
 * "next slide" preview in presenter mode.
 *
 * We clone the slide JSX into a container that has a transform:scale()
 * applied, and we set pointer-events:none so it's visually inert.
 */
export default function SlidePreview({ SlideComponent, deck, label, scale = 0.28 }) {
  if (!SlideComponent) {
    return (
      <div
        className="relative rounded-md border overflow-hidden flex items-center justify-center"
        style={{
          borderColor: 'var(--cream-hairline)',
          background: 'var(--panel)',
          aspectRatio: '16/9',
          color: 'var(--cream-faint)',
        }}
      >
        <span className="deck-mono text-xs uppercase tracking-widest">End of deck</span>
      </div>
    );
  }

  // Render the slide at an authoring size of 1920x1080 and scale that
  // fixed box down. Using explicit pixel dimensions (not % of parent)
  // is critical because slides use `100dvh` internally — without a
  // real pixel height the content measures against the viewport and
  // renders way outside the clip region (the "empty tile" bug).
  const W = 1920;
  const H = 1080;

  return (
    <div
      className="relative rounded-md border overflow-hidden"
      style={{
        borderColor: 'var(--cream-hairline)',
        background: 'var(--bg)',
        width: W * scale,
        height: H * scale,
      }}
    >
      <div
        className="absolute top-0 left-0 pointer-events-none origin-top-left"
        style={{
          width: W,
          height: H,
          transform: `scale(${scale})`,
        }}
      >
        <SlideComponent step={0} deck={deck} />
      </div>
      {label && (
        <div
          className="absolute top-2 left-2 deck-mono uppercase"
          style={{
            fontSize: '0.6rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          {label}
        </div>
      )}
    </div>
  );
}