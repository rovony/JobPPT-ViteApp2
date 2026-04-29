import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';

const EASE = [0.16, 1, 0.3, 1];

export default function AgendaSlide() {
  const movements = [
    { num: "M1", title: "The Vision", time: "4m", desc: "Regulatory floor · Field state · The gap", color: "amber" },
    { num: "M2", title: "The Architecture", time: "18m", desc: "5 principles · Working system · Scalability", color: "cyan" },
    { num: "M3", title: "The Primitives", time: "8m", desc: "NCA · Schema · QC Gate", color: "violet" }
  ];

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="30 MINUTES · 3 MOVEMENTS"
      headline="Here is what we'll cover"
      subhead="Then fifteen minutes for questions."
      footerKicker="02.5 · AGENDA"
    >
       <div className="w-full h-full relative flex flex-col justify-center px-24 pb-40 z-10">
          <div className="flex flex-col gap-12 max-w-5xl pt-12">
            {movements.map((m, i) => (
               <motion.div 
                 key={m.num}
                 initial={{ opacity: 0, x: -40 }}
                 animate={{ opacity: 1, x: 0 }}
                 transition={{ duration: 0.8, delay: 0.4 + i * 0.2, ease: EASE }}
                 className="flex items-center gap-12 border-l-[4px] pl-10 py-4"
                 style={{ borderColor: `var(--case-${m.color})` }}
               >
                  <div className="w-32 deck-display text-5xl xl:text-6xl text-[color:var(--cream-muted)]">{m.time}</div>
                  <div className="flex flex-col gap-2">
                     <div className="deck-mono text-xs xl:text-sm tracking-[0.2em] uppercase text-[color:var(--cream-muted)]">Movement {i+1}</div>
                     <div className="deck-display text-4xl xl:text-5xl text-[color:var(--cream)]">{m.title}</div>
                     <div className="deck-body text-xl xl:text-2xl text-[color:var(--cream-muted)] mt-2">{m.desc}</div>
                  </div>
               </motion.div>
            ))}
          </div>
       </div>

       <TakeHomeStrip 
          text="Vision (4) · Architecture (18) · Primitives (8) · Q&A (15)." 
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
