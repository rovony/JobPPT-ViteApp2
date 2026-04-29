import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

interface WithWithoutPairProps {
  withoutText: string;
  withText: string;
  delay?: number;
}

export default function WithWithoutPair({ withoutText, withText, delay = 2.0 }: WithWithoutPairProps) {
  return (
    <motion.div 
       initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay, duration: 0.4, ease: EASE }}
       className="w-full max-w-6xl mx-auto flex gap-6 px-12 mt-4 mb-4 relative z-50 shrink-0"
    >
       <section aria-label={`Without this principle: ${withoutText}`} className="flex-1 bg-[color:var(--bg)] border-l-4 border-[color:var(--case-coral)] px-5 py-4">
          <p className="deck-mono text-[13px] uppercase tracking-widest text-[color:var(--case-coral)] mb-2">WITHOUT THIS PRINCIPLE</p>
          <p className="deck-display text-[19px] italic font-normal leading-[1.4] text-[color:var(--cream-muted)]">{withoutText}</p>
       </section>
       
       <section aria-label={`With: ${withText}`} className="flex-1 bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] border-l-4 border-[color:var(--case)] px-5 py-4">
          <p className="deck-mono text-[13px] uppercase tracking-widest text-[color:var(--case)] mb-2">WITH THIS PRINCIPLE</p>
          <p className="deck-display text-[19px] font-normal leading-[1.4] text-[color:var(--cream)]">{withText}</p>
       </section>
    </motion.div>
  );
}
