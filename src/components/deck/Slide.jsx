import React from 'react';
import { motion } from 'framer-motion';
import { slideVariants, narrativeStagger } from '@/lib/motion';
import { cn } from '@/lib/utils';

/**
 * Slide — unit container for a single slide. Handles entrance motion
 * and optional narrative staggering for its direct motion children.
 *
 * Props:
 *  - id: string (anchor/slug)
 *  - title, eyebrow: optional header content
 *  - align: 'start' | 'center'
 *  - background: React node layered behind content
 *  - children: slide body
 */
export default function Slide({
  id,
  title,
  eyebrow,
  align = 'start',
  background,
  className,
  children,
}) {
  return (
    <motion.section
      id={id}
      aria-label={typeof title === 'string' ? title : undefined}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.64, ease: [0.2, 0.8, 0.2, 1] }}
      className={cn(
        'relative w-full h-[100dvh] overflow-hidden flex flex-col',
        'px-[var(--deck-slide-pad)] py-[var(--deck-slide-pad)]',
        align === 'center' ? 'justify-center items-center text-center' : 'justify-center items-start',
        className
      )}
    >
      {background && (
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          {background}
        </div>
      )}
      <div className={cn('relative w-full max-w-[var(--deck-max-w)] mx-auto', align === 'center' && 'text-center')}>
        {(eyebrow || title) && (
          <header className="mb-10">
            {eyebrow && (
              <div className="deck-mono text-xs tracking-[0.18em] uppercase deck-ink-subtle mb-3">
                {eyebrow}
              </div>
            )}
            {title && (
              <h2 className="deck-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] text-deck-ink">
                {title}
              </h2>
            )}
          </header>
        )}
        {children}
      </div>
    </motion.section>
  );
}