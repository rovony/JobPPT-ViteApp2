import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const EASE = [0.16, 1, 0.3, 1];

export default function GapSlide() {
  return (
    <SlideFrame slideId="05"
      dataCase="amber"
      eyebrow=""
      headline={<></>} subhead={<></>}
      footerKicker="" footerTagline=""
    >
      <div className="w-full h-full relative flex flex-col">
         
         <div className="h-[30%]"></div>
         
         <div className="h-[40%] flex flex-col justify-center px-32 relative z-10">
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 0.8, ease: EASE }}
               className="deck-display text-[48px] text-[color:var(--cream-muted)] font-normal"
            >
               Discovery has multi-agent.
            </motion.div>
            
            <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9, duration: 0.8, ease: EASE }}
               className="deck-display text-[48px] text-[color:var(--cream-muted)] font-normal mt-8"
            >
               QCP has Apollo-AI.
            </motion.div>
            
            {/* The decisive pause happens here: 1.40s to 2.10s */}
            
            <div className="mt-16 overflow-hidden relative">
               <motion.div 
                  initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 2.1, duration: 1.0, type: 'spring', bounce: 0.25 }}
                  className="deck-display text-[96px] italic text-[color:var(--cream)] font-medium"
               >
                  The MIDD foundation is unbuilt.
               </motion.div>
               <motion.div 
                  initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 3.2, duration: 0.8, ease: EASE }}
                  className="absolute bottom-0 left-0 w-[240px] h-[1px] bg-[color:var(--case-amber)] origin-left"
               />
            </div>
         </div>

         <div className="h-[30%] px-32 pt-12 relative z-10">
            <motion.div 
               initial={{ clipPath: 'inset(0 100% 0 0)' }} animate={{ clipPath: 'inset(0 0% 0 0)' }} transition={{ delay: 3.5, duration: 1.5, ease: 'linear' }}
               className="deck-mono text-[16px] text-[color:var(--cream-muted)] opacity-60 tracking-[0.08em] whitespace-nowrap"
            >
               End-to-end · structurally private · cryptographically audited · M15-aligned
            </motion.div>
         </div>

         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 4.2, duration: 1.0 }} className="absolute bottom-8 right-12 deck-mono text-xs text-[color:var(--cream-muted)] opacity-50 z-10">
            Authors' literature search · Apr 2026
         </motion.div>
      </div>
    </SlideFrame>
  );
}
