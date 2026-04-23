import React from 'react';
import { motion } from 'framer-motion';

/**
 * ImpactNumerals — asymmetric 3-stat composition with deliberate size /
 * position variation + narrative motion.
 *
 * Motion grammar:
 *   • Cascade entrance — each item slides up + fades, staggered 0.18s apart.
 *   • Numeral scale-pop — the big digit overshoots (spring-ish) to draw the eye.
 *   • Label + note fade in after the numeral settles.
 *   • Optional accent rule animates in as a short hairline beneath the numeral.
 *
 * items: [{ value, label, note?, tilt?, size? }]
 *   size: 'xl' | 'lg' | 'md' controls numeral scale
 */
export default function ImpactNumerals({ items = [] }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const pop = [0.34, 1.56, 0.64, 1]; // overshoot

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-4 items-end">
      {items.map((it, i) => {
        const col = i === 0 ? 'md:col-span-5' : i === 1 ? 'md:col-span-4' : 'md:col-span-3';
        const align = i === 0 ? 'items-start' : i === 1 ? 'items-center md:mt-12' : 'items-end md:mt-20';
        const sizeCls =
          it.size === 'xl'
            ? 'text-[9rem] md:text-[11rem]'
            : it.size === 'lg'
            ? 'text-[6.5rem] md:text-[8rem]'
            : 'text-[5rem] md:text-[6rem]';

        // Cascade base — each column starts 0.18s after the previous
        const base = 0.15 + i * 0.18;

        return (
          <motion.div
            key={i}
            className={`flex flex-col ${col} ${align}`}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease, delay: base }}
          >
            {/* Numeral — scale-pop with overshoot */}
            <motion.div
              className="deck-display leading-none text-deck-accent"
              style={{ transform: it.tilt ? `rotate(${it.tilt}deg)` : undefined, transformOrigin: 'center' }}
              initial={{ opacity: 0, scale: 0.4 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7, ease: pop, delay: base + 0.1 }}
            >
              <span className={sizeCls}>{it.value}</span>
            </motion.div>

            {/* Hairline accent rule — draws in L→R */}
            <motion.div
              className="mt-3 h-[2px] bg-deck-accent origin-left"
              style={{ width: '40px' }}
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 0.7 }}
              transition={{ duration: 0.5, ease, delay: base + 0.5 }}
            />

            {/* Label */}
            <motion.div
              className="mt-3 text-base md:text-lg text-deck-ink max-w-[20ch]"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: base + 0.6 }}
            >
              {it.label}
            </motion.div>

            {/* Note */}
            {it.note && (
              <motion.div
                className="mt-1 deck-mono text-xs uppercase tracking-[0.2em] deck-ink-subtle"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: base + 0.75 }}
              >
                {it.note}
              </motion.div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
}