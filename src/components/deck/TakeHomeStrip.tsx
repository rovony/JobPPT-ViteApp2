import React from 'react';
import { motion } from 'framer-motion';

interface TakeHomeStripProps {
  text: string;
  caseColor?: 'amber' | 'cyan' | 'violet' | 'sage';
  subLine?: string;
  delay?: number;
  glow?: boolean;
}

export default function TakeHomeStrip({ 
  text, 
  caseColor = 'amber', 
  subLine, 
  delay = 2.0,
  glow = false
}: TakeHomeStripProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className={`relative w-full max-w-[calc(100%-192px)] mx-auto border-t border-[color:var(--cream-hairline)] border-l-4 rounded-r-md px-8 py-6 bg-[color:var(--bg-elevated)] z-50 shrink-0 mt-8 mb-4`}
      style={{
        borderLeftColor: `var(--case-${caseColor}, var(--case))`,
        boxShadow: glow ? `0 0 40px var(--case-${caseColor}, var(--case))` : 'none'
      }}
      aria-label={`Slide take-home: ${text}`}
    >
      <div className="deck-mono text-[13px] tracking-[0.12em] uppercase mb-2" style={{ color: `var(--case-${caseColor}, var(--case))` }}>
        TAKE HOME
      </div>
      <div className="deck-display text-[36px] font-medium leading-[1.3] text-[color:var(--cream)] truncate">
        {text}
      </div>
      {subLine && (
        <div className="deck-body text-[19px] text-[color:var(--cream-muted)] mt-1 truncate">
          {subLine}
        </div>
      )}
    </motion.div>
  );
}
