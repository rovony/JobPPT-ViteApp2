import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

export default function Movement2BeginsSlide() {
  return (
    <SlideFrame layout="title">
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        
        {/* Progress Strip (Bottom 1/3) */}
        <div className="absolute bottom-[20%] left-[15%] right-[15%] flex flex-col gap-4">
           <div className="flex gap-4 h-[6px]">
              {/* Movement 1 - Dimmed */}
              <div className="w-[15%] h-full bg-[color:var(--cream-hairline)] opacity-30" />
              {/* Movement 2 - Pulsing Amber */}
              <motion.div 
                 initial={{ opacity: 0.4 }}
                 animate={{ opacity: 1 }}
                 transition={{ repeat: Infinity, duration: 2, ease: "easeInOut", repeatType: "reverse" }}
                 className="flex-1 h-full bg-[color:var(--case-amber)] shadow-[0_0_20px_var(--case-amber)]" 
              />
              {/* Movement 3 - Dimmed */}
              <div className="w-[25%] h-full bg-[color:var(--cream-hairline)] opacity-30" />
           </div>
        </div>

        {/* Center Text (Newspaper Reveal) */}
        <div className="flex flex-col items-center z-10">
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
             className="deck-mono text-[14px] tracking-[0.2em] uppercase text-[color:var(--case-amber)] mb-6"
           >
             MOVEMENT 2 OF 3 · 18 MINUTES
           </motion.div>

           <motion.div 
             initial={{ opacity: 0, y: 40 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 1.0, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
             className="deck-display text-[8rem] text-[color:var(--cream)] italic tracking-tight leading-none mb-8"
           >
             The Architecture
           </motion.div>

           <motion.div 
             initial={{ opacity: 0 }}
             animate={{ opacity: 1 }}
             transition={{ duration: 1.0, delay: 1.0 }}
             className="deck-body text-[2rem] text-[color:var(--cream-muted)] font-light"
           >
             Five principles. One working system. One scalability claim.
           </motion.div>
        </div>

      </div>
    </SlideFrame>
  );
}
