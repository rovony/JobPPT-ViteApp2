// @ts-nocheck
/**
 * NumberTicker — thin wrapper over the deck-native IntegerTicker
 * (src/components/deck/patterns/IntegerTicker.tsx). Adds default
 * styling (mono, sage, tabular) suited to the CS4 canvas.
 *
 * Brief explicitly says "no Magic UI dep needed" — the existing
 * IntegerTicker is the implementation we use.
 */

import React from 'react';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';

interface Props {
  from?: number;
  to: number;
  duration?: number;
  delay?: number;
  go?: boolean;
  /** Color override; defaults to var(--case) (sage). */
  color?: string;
  /** Font size in px or any CSS unit; defaults to inherit. */
  fontSize?: string | number;
  /** Font family; defaults to Source Serif Pro. */
  fontFamily?: string;
  /** Inline style passthrough. */
  style?: React.CSSProperties;
  className?: string;
}

export default function NumberTicker({
  from = 0,
  to,
  duration = 1.5,
  delay = 0,
  go = true,
  color = 'var(--case, #7BAE7F)',
  fontSize,
  fontFamily = '"Source Serif Pro", serif',
  style = {},
  className,
}: Props) {
  return (
    <IntegerTicker
      from={from}
      to={to}
      duration={duration}
      delay={delay}
      go={go}
      className={className}
      style={{
        color,
        fontFamily,
        fontWeight: 600,
        fontVariantNumeric: 'tabular-nums',
        ...(fontSize !== undefined && { fontSize }),
        ...style,
      }}
    />
  );
}
