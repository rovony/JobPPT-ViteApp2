import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PlainEnglishCardProps {
  whatThisIs: string;
  whyItMatters: string;
  whatCouldGoWrong: string;
}

export default function PlainEnglishCard({ whatThisIs, whyItMatters, whatCouldGoWrong }: PlainEnglishCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'i' || e.key === 'I') {
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  const toggleOpen = () => setIsOpen(!isOpen);

  const EASE = [0.16, 1, 0.3, 1];

  return (
    <div className="absolute top-6 right-6 z-50 flex items-start justify-end pointer-events-auto">
      {/* Expanded Card */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.25, ease: EASE }}
            className="w-[380px] bg-[color:var(--bg-elevated)]/80 backdrop-blur-md border border-[color:var(--case)]/60 rounded-lg p-5 shadow-[0_8px_32px_rgba(10,10,12,0.4)] relative"
            role="dialog"
            aria-modal="true"
          >
            <button 
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 text-[color:var(--ink-secondary)] hover:text-[color:var(--case)] transition-colors"
            >
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 1L1 11M1 1L11 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="deck-mono text-[10px] text-[color:var(--case)] uppercase tracking-widest mb-3">
              PLAIN ENGLISH
            </div>
            
            <div className="w-full h-[1px] bg-[color:var(--case)]/40 mb-4" />

            <div className="flex flex-col gap-3">
              <div className="flex flex-col gap-1">
                <div className="deck-mono text-[10px] text-[color:var(--ink-secondary)] uppercase">WHAT THIS IS</div>
                <div className="deck-display text-sm text-[color:var(--ink-primary)] leading-snug">{whatThisIs}</div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="deck-mono text-[10px] text-[color:var(--ink-secondary)] uppercase">WHY IT MATTERS</div>
                <div className="deck-display text-sm text-[color:var(--ink-primary)] leading-snug">{whyItMatters}</div>
              </div>
              
              <div className="flex flex-col gap-1">
                <div className="deck-mono text-[10px] text-[color:var(--ink-secondary)] uppercase">WHAT COULD GO WRONG</div>
                <div className="deck-display text-sm text-[color:var(--ink-primary)] leading-snug">{whatCouldGoWrong}</div>
              </div>
            </div>

            <div className="mt-4 deck-mono text-[10px] text-[color:var(--ink-faint)]">
              Esc to close
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Collapsed Button */}
      {!isOpen && (
        <motion.button
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.7, opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={toggleOpen}
          aria-expanded={isOpen}
          className="w-9 h-9 rounded-full bg-[color:var(--bg-elevated)]/80 backdrop-blur-md border border-[color:var(--case)]/40 flex items-center justify-center text-[color:var(--case)] hover:bg-[color:var(--case)] hover:text-[color:var(--bg-deep)] transition-colors"
        >
          <span className="font-mono text-sm font-semibold">i</span>
        </motion.button>
      )}
    </div>
  );
}
