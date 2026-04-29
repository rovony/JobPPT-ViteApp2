import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.16, 1, 0.3, 1];

interface PrincipleTitleBlockProps {
  counter: string;
  name: string;
  definition: string;
}

export default function PrincipleTitleBlock({ counter, name, definition }: PrincipleTitleBlockProps) {
  return (
    <div className="w-full flex flex-col items-center justify-center text-center px-12 pb-8 pt-4 z-50 relative">
       <motion.p 
         initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.1, duration: 0.5, ease: EASE }}
         className="deck-mono text-[13px] uppercase tracking-widest text-[color:var(--case)] mb-4"
       >
          {counter}
       </motion.p>
       
       <div className="overflow-hidden mb-6">
          <motion.h1 
            initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 0.25, duration: 0.8, ease: EASE }}
            className="deck-display text-[60px] font-semibold text-[color:var(--cream)] leading-[1.1]"
          >
             {name}
          </motion.h1>
       </div>
       
       <motion.h2 
         initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.6, ease: EASE }}
         className="deck-display text-[36px] italic text-[color:var(--cream-muted)] max-w-4xl"
       >
          {definition}
       </motion.h2>

       <motion.div 
         initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.75, duration: 1.0, ease: EASE }}
         className="w-full max-w-5xl h-[1px] bg-[color:var(--cream-hairline)] mt-8 origin-left"
       />
    </div>
  );
}
