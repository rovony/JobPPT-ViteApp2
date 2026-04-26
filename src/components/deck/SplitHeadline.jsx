import React, { useRef, useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { SplitText } from 'gsap/SplitText';

// Register once. Safe to call repeatedly; GSAP no-ops duplicates.
gsap.registerPlugin(useGSAP, SplitText);

/**
 * SplitHeadline — char-by-char staggered reveal for slide headlines.
 *
 * WHY THIS EXISTS
 *   Framer-motion fades the whole headline as one block. For presentation-
 *   grade slides we want a premium flourish: each character drops in with
 *   a small Y translate + opacity fade, staggered ~18ms apart. This is
 *   the signature "editorial headline" feel seen on Apple/Stripe/Linear.
 *
 * WHY GSAP, NOT FRAMER-MOTION
 *   Framer-motion can stagger children, but you'd have to pre-split every
 *   headline into individual <span> nodes by hand. SplitText does it at
 *   runtime without touching the JSX — it walks the DOM, wraps each char
 *   in a span, and exposes arrays (`chars`, `words`, `lines`) that GSAP
 *   animates. Critical: it preserves existing nested elements (colored
 *   <span>s, <br/> breaks) so headlines like "The <span style='color:cyan'>
 *   decision</span> is the product" keep their styling while each char
 *   animates individually.
 *
 * RESPECTS:
 *   · prefers-reduced-motion — falls back to a single opacity fade
 *   · useGSAP cleanup        — the hook auto-reverts SplitText & tweens
 *   · delay prop             — matches old Headline's timing contract
 *   · children typing        — accepts JSX (br, nested spans), not just strings
 *
 * The component is purely presentational; it does NOT position itself in
 * the grid — that's still the caller's job (SlideParts.Headline places it
 * in the "headline" grid area).
 */
export default function SplitHeadline({
  children,
  delay = 0.15,
  className,
  style,
  // Tuned for snappy presentation-grade reveals:
  // whole line rises in ~0.35s with a tiny per-line stagger. Previous
  // defaults (charDuration 0.7s + 0.018s per char) made long headlines
  // take 1.5–2s to fully appear, which felt sluggish when advancing
  // slides live. Now even a two-line headline lands in under 0.5s.
  lineDuration = 0.35,
  lineStagger = 0.06,
}) {
  const containerRef = useRef(null);
  const reduced = useReducedMotion();

  useGSAP(
    () => {
      if (reduced || !containerRef.current) return;

      const split = new SplitText(containerRef.current, {
        type: 'lines',
        linesClass: 'split-line',
        reduceWhiteSpace: false,
      });

      gsap.set(split.lines, {
        yPercent: 110,
        opacity: 0,
        display: 'block',
        overflow: 'hidden',
      });

      const tween = gsap.to(split.lines, {
        yPercent: 0,
        opacity: 1,
        duration: lineDuration,
        ease: 'power3.out',
        stagger: lineStagger,
        delay,
      });

      return () => {
        tween.kill();
        split.revert();
      };
    },
    { scope: containerRef, dependencies: [reduced, delay, lineDuration, lineStagger] },
  );

  // Safety net: if GSAP tween doesn't complete (stale context during
  // slide transitions), force all split-line children visible after the
  // animation window closes. Without this, headlines stay at opacity: 0.
  useEffect(() => {
    if (reduced) return;
    const safetyMs = (delay + lineDuration + lineStagger * 6) * 1000 + 500;
    const id = setTimeout(() => {
      if (!containerRef.current) return;
      const lines = containerRef.current.querySelectorAll('.split-line');
      lines.forEach((el) => {
        if (parseFloat(getComputedStyle(el).opacity) < 0.5) {
          el.style.opacity = '1';
          el.style.transform = 'none';
        }
      });
    }, safetyMs);
    return () => clearTimeout(id);
  }, [reduced, delay, lineDuration, lineStagger]);

  // Reduced-motion fallback — simple fade via framer-motion so we keep
  // a single timing source of truth with the rest of the deck chrome.
  if (reduced) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3, delay }}
        className={className}
        style={style}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
}