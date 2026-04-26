import React from 'react';

/**
 * Bordered step box for disease-mechanism flowcharts.
 * `highlight` adds a left cyan accent rail (CS2 / case token).
 */
export default function MechanismStep({
  label,
  variant = 'default',
  className = '',
  style = {},
  ...rest
}) {
  const highlight = variant === 'highlight';
  return (
    <div
      className={className}
      style={{
        width: '100%',
        minWidth: 0,
        padding: 'var(--space-2) var(--space-3)',
        borderRadius: 2,
        border: '1px solid var(--cream-hairline)',
        borderLeft: highlight ? '3px solid var(--cyan)' : undefined,
        background: highlight
          ? 'color-mix(in srgb, var(--cyan) 4%, transparent)'
          : 'color-mix(in srgb, var(--ink) 40%, transparent)',
        boxShadow: highlight
          ? 'inset 0 0 0 1px color-mix(in srgb, var(--cyan) 12%, transparent)'
          : 'none',
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-slide-subhead)',
        lineHeight: 1.3,
        color: 'var(--cream)',
        fontWeight: 500,
        ...style,
      }}
      {...rest}
    >
      {label}
    </div>
  );
}
