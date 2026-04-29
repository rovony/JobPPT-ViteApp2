import React, { useEffect, useRef } from 'react';

/**
 * SwayGroup — rotates its children around a given SVG pivot (px, py)
 * using a requestAnimationFrame loop that writes the `transform`
 * attribute directly. This is the only reliable way to rotate an
 * SVG <g> about a non-origin point across browsers — CSS transform-
 * origin on <g> is inconsistent and framer-motion's rotate on <g>
 * produced no visible motion in this deck.
 *
 * amplitude: peak degrees of sway
 * period:    seconds per full cycle
 * delay:     seconds before the loop starts
 */
export default function SwayGroup({
  px,
  py,
  amplitude = 2.2,
  period = 6,
  delay = 0,
  disabled = false,
  children,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    if (disabled) {
      node.setAttribute('transform', `rotate(0 ${px} ${py})`);
      return;
    }
    const start = performance.now() + delay * 1000;
    const twoPi = Math.PI * 2;
    let raf;
    const tick = (now) => {
      const t = Math.max(0, (now - start) / 1000);
      const angle = Math.sin((t / period) * twoPi) * amplitude;
      node.setAttribute('transform', `rotate(${angle.toFixed(3)} ${px} ${py})`);
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [px, py, amplitude, period, delay, disabled]);

  return <g ref={ref}>{children}</g>;
}