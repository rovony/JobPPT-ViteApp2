import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

export default function TransitionArchitectureSlide() {
  return (
    <SlideFrame layout="title">
      <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none overflow-hidden">
        
        {/* Background Roman Numeral */}
        <div className="absolute inset-0 flex items-center justify-center opacity-[0.04]">
          <div className="deck-display text-[50vw] leading-none text-[color:var(--cream)]">II</div>
        </div>
        
        {/* Faint Gantt Strip at the bottom */}
        <div className="absolute bottom-[10%] left-[10%] right-[10%] h-[4px] flex gap-4 opacity-20">
           <div className="w-[15%] h-full bg-[color:var(--cream-hairline)]" />
           <div className="flex-1 h-full bg-[color:var(--cream-hairline)]" />
           <div className="w-[25%] h-full bg-[color:var(--cream-hairline)]" />
        </div>

        {/* Magic Move Anchor */}
        <div className="flex items-end gap-12 relative z-10">
           <motion.div 
             initial={{ opacity: 0, x: -20 }}
             animate={{ opacity: 1, x: 0 }}
             transition={{ duration: 1.0, delay: 0.6 }}
             className="deck-display text-[7rem] text-[color:var(--cream-muted)] mb-[2rem]"
           >
             Pharazi is
           </motion.div>
           
           <motion.div 
             layoutId="magic-word"
             className="deck-display text-[18rem] leading-none tracking-tighter text-[color:var(--cream)] drop-shadow-[0_0_100px_rgba(255,255,255,0.4)]"
           >
             built.
           </motion.div>
        </div>

      </div>
    </SlideFrame>
  );
}
