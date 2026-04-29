import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

export default function QASlide() {
  return (
    <SlideFrame layout="title">
      <div className="absolute inset-0 flex flex-col items-center justify-center overflow-hidden">
        
        {/* Background Ornament */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04] pointer-events-none">
          <div className="deck-display text-[50vw] leading-none text-[color:var(--cream)]">?</div>
        </div>
        
        {/* Progress Strip (Bottom) - All Complete */}
        <div className="absolute bottom-[10%] left-[10%] right-[10%] flex flex-col gap-4">
           <div className="flex gap-4 h-[4px]">
              <div className="w-[15%] h-full bg-[color:var(--cream-hairline)] opacity-30" />
              <div className="flex-1 h-full bg-[color:var(--cream-hairline)] opacity-30" />
              <div className="w-[25%] h-full bg-[color:var(--cream-hairline)] opacity-30" />
           </div>
           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.0 }}
             className="absolute right-0 bottom-6 deck-mono text-xs tracking-widest text-[color:var(--case-amber)] border border-[color:var(--case-amber)] px-4 py-2 bg-[color-mix(in_srgb,var(--case-amber)_20%,transparent)] shadow-[0_0_20px_var(--case-amber)]"
           >
             Q&A · 15:00
           </motion.div>
        </div>

        {/* Center Text */}
        <div className="flex flex-col items-center z-10 relative">
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="deck-display text-[8rem] xl:text-[10rem] text-[color:var(--cream)] italic tracking-tight leading-none mb-12 drop-shadow-[0_0_50px_rgba(255,255,255,0.2)]"
           >
             Questions.
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.0, delay: 0.8 }}
             className="deck-mono text-xl xl:text-2xl text-[color:var(--cream-muted)] tracking-[0.2em] uppercase flex gap-8 items-center"
           >
             <span>github.com/pharazi-ai</span>
             <span className="w-2 h-2 rounded-full bg-[color:var(--cream-muted)] opacity-50" />
             <span>clinpharm.ai</span>
           </motion.div>
        </div>

      </div>
    </SlideFrame>
  );
}
