import React from 'react';

/**
 * FloatingAnnotation — translucent dark backdrop with a case-colored left rule.
 * Sits *over* charts/visuals so the chart stays visible through the backdrop.
 * Pattern borrowed from the QP2-CMD v3.3 vanilla deck.
 */
export default function FloatingAnnotation({
  children,
  color = 'hsl(var(--deck-accent))',
  className = '',
  style,
}) {
  return (
    <div
      className={`px-4 py-3 text-sm leading-snug ${className}`}
      style={{
        borderLeft: `2px solid ${color}`,
        background: 'hsla(var(--deck-bg), 0.65)',
        backdropFilter: 'blur(8px)',
        WebkitBackdropFilter: 'blur(8px)',
        color: 'hsl(var(--deck-ink))',
        ...style,
      }}
    >
      {children}
    </div>
  );
}