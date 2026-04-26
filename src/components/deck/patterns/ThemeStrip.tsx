import React from 'react';
import { motion } from 'framer-motion';
import { revealUp } from '@/lib/motion';

/**
 * ThemeStrip — renders the 5-theme glyph language as a horizontal strip.
 * Active themes are full-color; inactive themes are dimmed. Use on case-study
 * divider slides to signal which themes the case exercises.
 *
 * Props:
 *  - themes: Array of theme objects (num, key, color, glyph, title, short)
 *  - activeKeys: array of theme keys that are "exercised" in this case
 */
export default function ThemeStrip({ themes = [], activeKeys = null }) {
  return (
    <div className="flex flex-wrap gap-3 md:gap-4">
      {themes.map((t, i) => {
        const active = activeKeys ? activeKeys.includes(t.key) : true;
        return (
          <motion.div
            key={t.key}
            variants={revealUp}
            className="flex items-center gap-3 border deck-rule rounded-md px-3 py-2 bg-deck-surface/60"
            style={{ opacity: active ? 1 : 0.28 }}
          >
            <span
              className="deck-display text-2xl leading-none"
              style={{ color: active ? t.color : 'hsl(var(--deck-ink-subtle))' }}
              aria-hidden
            >
              {t.glyph}
            </span>
            <div className="flex flex-col">
              <span className="deck-mono text-[10px] tracking-[0.2em] uppercase deck-ink-subtle">
                {t.num}
              </span>
              <span className="text-sm text-deck-ink leading-tight">{t.title}</span>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}