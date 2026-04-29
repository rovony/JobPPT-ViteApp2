import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import { BorderBeam } from '@/components/magicui/border-beam';
import { AnimatedBeam } from '@/components/magicui/animated-beam';

const EASE = [0.16, 1, 0.3, 1];

export default function Domain1Slide() {
  const containerRef = useRef<HTMLDivElement>(null);
  const jsonRef = useRef<HTMLDivElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const schemaRef = useRef<HTMLDivElement>(null);

  return (
    <SlideFrame slideId="14" dataCase="violet" footerKicker="14 · THE DOMAINS">
       <PrincipleTitleBlock
         counter="DOMAIN 1 OF 6 · DATA"
         name="Data Ingestion"
         definition="Datasets enter; patient records stay local; sanitized schema crosses to the LLM context."
       />

       <div className="w-full flex-1 relative flex items-center justify-center pt-2 pb-4 z-10 px-24">
          
          {/* Chaos JSON -> Filter Wall -> TypeSchema */}
          <div ref={containerRef} className="w-full h-[320px] flex items-center justify-between relative">
             
             {/* 1. Chaos JSON */}
             <motion.div 
               ref={jsonRef}
               initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, ease: EASE }}
               className="w-[280px] h-[280px] bg-[color-mix(in_srgb,var(--case-coral)_10%,transparent)] border border-[color:var(--case-coral)] p-6 font-mono text-[9px] text-[color:var(--cream-muted)] overflow-hidden shadow-[0_0_30px_rgba(255,100,100,0.1)] rounded-xl relative z-10"
             >
                <div className="text-[color:var(--case-coral)] mb-4 font-bold tracking-widest uppercase text-xs">Raw Payload (Contaminated)</div>
                <div className="opacity-50">
                   {`{
  "subject_id": "SUBJ-9941",
  "pii_name": "John Doe",
  "dob": "1984-03-12",
  "site": "MassGen",
  "time": [0, 1, 2, 4, 8, 12, 24],
  "conc": [0, 12.4, 9.1, 4.2, 1.1, 0.4, 0],
  "notes": "Patient reported headache."
}`}
                </div>
             </motion.div>

             {/* 2. Filter Wall */}
             <motion.div 
                ref={filterRef}
                initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.8, duration: 1.0, ease: EASE }}
                className="w-[100px] h-[320px] border-x border-[color:var(--case)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl flex flex-col items-center justify-center gap-4 relative z-10 shadow-[0_0_40px_var(--case)] rounded-md overflow-hidden"
             >
                <BorderBeam size={150} duration={4} delay={1} colorFrom="var(--case-violet)" colorTo="transparent" />
                <div className="deck-mono text-xs text-[color:var(--case)] tracking-widest [writing-mode:vertical-rl] rotate-180">ZOD SCHEMA GATE</div>
             </motion.div>

             {/* 3. TypeSchema Output */}
             <motion.div 
               ref={schemaRef}
               initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.8, duration: 0.8, ease: EASE }}
               className="w-[280px] h-[280px] bg-[color-mix(in_srgb,var(--case-sage)_10%,transparent)] border border-[color:var(--case-sage)] p-6 font-mono text-[9px] text-[color:var(--cream)] overflow-hidden shadow-[0_0_30px_rgba(100,255,100,0.1)] rounded-xl relative z-10"
             >
                <div className="text-[color:var(--case-sage)] mb-4 font-bold tracking-widest uppercase text-xs">Safe Vector (Extracted)</div>
                <div>
                   {`{
  "time": Float32Array(7),
  "conc": Float32Array(7)
}`}
                </div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.5 }} className="mt-8 text-[color:var(--case-sage)] border-t border-[color:var(--case-sage)] pt-4 uppercase tracking-widest font-bold">
                   LLM Context Safe.
                </motion.div>
             </motion.div>

             {/* Animated Beams connecting them */}
             <AnimatedBeam
                containerRef={containerRef}
                fromRef={jsonRef}
                toRef={filterRef}
                curvature={0}
                pathColor="var(--cream-hairline)"
                gradientStartColor="var(--case-coral)"
                gradientStopColor="var(--case)"
                delay={0}
             />
             <AnimatedBeam
                containerRef={containerRef}
                fromRef={filterRef}
                toRef={schemaRef}
                curvature={0}
                pathColor="var(--cream-hairline)"
                gradientStartColor="var(--case)"
                gradientStopColor="var(--case-sage)"
                delay={1}
             />
          </div>

       </div>

       <WithWithoutPair
         withoutText="Patient data flows to the LLM context as a side effect of analysis routing."
         withText="Patient data never crosses the wall. Schema and aggregates only."
         delay={3.5}
       />

       <TakeHomeStrip 
          text="The schema extractor is an immutable gate. It cannot be bypassed by prompt injection." 
          caseColor="violet" 
       />
    </SlideFrame>
  );
}
