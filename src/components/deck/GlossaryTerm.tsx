import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { glossaryTerms } from '@/decks/pharazi-seminar/content';

interface GlossaryTermProps {
  term: string;
  children?: React.ReactNode;
}

export default function GlossaryTerm({ term, children }: GlossaryTermProps) {
  const [isHovered, setIsHovered] = useState(false);
  const definition = glossaryTerms[term];

  if (!definition) return <>{children || term}</>;

  return (
    <span 
      className="relative inline-block border-b border-dashed border-[color:var(--ink-secondary)] cursor-help"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      tabIndex={0}
      aria-describedby={`tooltip-${term.replace(/\s+/g, '-')}`}
    >
      {children || term}
      
      <AnimatePresence>
        {isHovered && (
          <motion.div
            id={`tooltip-${term.replace(/\s+/g, '-')}`}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-max max-w-[280px] bg-[color:var(--bg-elevated)]/90 backdrop-blur-md border border-[color:var(--case)]/40 rounded-md p-3 z-50 shadow-xl pointer-events-none text-left whitespace-normal"
          >
            <div className="deck-mono text-[11px] text-[color:var(--case)] mb-1">
              {term}
            </div>
            <div className="deck-display text-xs text-[color:var(--ink-primary)] leading-tight font-normal">
              {definition}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </span>
  );
}
