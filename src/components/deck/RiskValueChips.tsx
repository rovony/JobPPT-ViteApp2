import React from 'react';
import { motion } from 'framer-motion';

interface RiskValueChipsProps {
  value: string;
  risk: string;
}

export default function RiskValueChips({ value, risk }: RiskValueChipsProps) {
  // Reveal at 0.4s after slide enter, 0.05s stagger
  return (
    <div className="absolute top-6 right-20 z-40 flex flex-col items-end gap-2 pointer-events-none" aria-label={`Value: ${value}. Risk: ${risk}.`}>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.4 }}
        className="px-2 py-1 rounded-full bg-[color:var(--case)]/10 border border-[color:var(--case)]/60 backdrop-blur-sm"
      >
        <span className="deck-mono text-[10px] text-[color:var(--case)] font-semibold uppercase tracking-wider">
          VALUE: {value}
        </span>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 4 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, delay: 0.45 }}
        className="px-2 py-1 rounded-full bg-[color:var(--case-coral)]/10 border border-[color:var(--case-coral)]/60 backdrop-blur-sm"
      >
        <span className="deck-mono text-[10px] text-[color:var(--case-coral)] font-semibold uppercase tracking-wider">
          RISK: {risk}
        </span>
      </motion.div>
    </div>
  );
}
