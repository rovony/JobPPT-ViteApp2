import { useEffect, useState } from 'react';
import { animate } from 'framer-motion';

/**
 * Counts from `from` to `to` when `go` is true.
 * Eases with a fast-start deceleration curve — visually punchy without
 * overshooting past `to` (which would display a wrong number).
 * Width is locked to the final digit count so surrounding text never shifts.
 */
export default function IntegerTicker({
  from = 0,
  to,
  duration = 1.2,
  delay = 0,
  go = true,
  className = '',
  style = {},
}) {
  const [value, setValue] = useState(() => (go ? from : to));
  const digitCount = String(to).length;

  useEffect(() => {
    if (!go) {
      setValue(to);
      return;
    }
    setValue(from);
    const controls = animate(from, to, {
      duration,
      delay,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => setValue(Math.min(Math.round(latest), to)),
    });
    return () => controls.stop();
  }, [from, to, duration, delay, go]);

  return (
    <span
      className={className}
      style={{
        display: 'inline-block',
        minWidth: `${digitCount}ch`,
        textAlign: 'right',
        fontVariantNumeric: 'tabular-nums',
        ...style,
      }}
    >
      {value}
    </span>
  );
}
