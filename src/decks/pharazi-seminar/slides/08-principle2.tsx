import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

export default function Principle2Slide() {
  return (
    <SlideFrame slideId="08" dataCase="cyan" footerKicker="08 · THE ARCHITECTURE">
       <PrincipleTitleBlock
         counter="PRINCIPLE 2 OF 5 · PRIVACY"
         name="Structural Privacy"
         definition="Privacy is a property of the code, not a runtime policy. Raw data has no callable path to the LLM."
       />

       <div className="w-full flex-1 relative flex pb-4 pt-4">
          
          {/* Left Side: Local Computation */}
          <div className="flex-1 flex flex-col justify-center pl-16 pr-8 relative z-10">
             <div className="deck-mono text-lg xl:text-xl tracking-[0.2em] uppercase text-[color:var(--cream)] mb-8">Computation Engine (Local)</div>
             
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <span className="w-3 h-3 bg-[color:var(--cream)] rounded-full" />
                   <span className="deck-body text-lg xl:text-xl text-[color:var(--cream-muted)]">Actual patient data (in memory)</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="w-3 h-3 bg-[color:var(--cream)] rounded-full" />
                   <span className="deck-body text-lg xl:text-xl text-[color:var(--cream-muted)]">R / Python scripts on real data</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="w-3 h-3 bg-[color:var(--cream)] rounded-full" />
                   <span className="deck-body text-lg xl:text-xl text-[color:var(--cream-muted)]">AES-256 encrypted sandbox</span>
                </div>
             </motion.div>
          </div>

          {/* The Firewall */}
          <div className="w-[4px] bg-[color:var(--case)] relative flex justify-center h-[90%] my-auto shadow-[0_0_50px_var(--case)] z-20">
             <div className="absolute top-1/2 -translate-y-1/2 bg-[color:var(--bg)] px-4 py-8 border border-[color:var(--case)]">
                <div className="deck-mono text-sm tracking-[0.3em] uppercase text-[color:var(--case)]" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                   THE SCHEMA EXTRACTOR
                </div>
             </div>
          </div>

          {/* Right Side: Cloud Context */}
          <div className="flex-1 flex flex-col justify-center pl-24 pr-16 relative z-10">
             <div className="deck-mono text-lg xl:text-xl tracking-[0.2em] uppercase text-[color:var(--case)] mb-8">LLM Context (Cloud)</div>
             
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex flex-col gap-6">
                <div className="flex items-center gap-4">
                   <span className="deck-mono text-xl text-[color:var(--case)]">✓</span>
                   <span className="deck-body text-lg xl:text-xl text-[color:var(--cream)]">Sanitized schema metadata</span>
                </div>
                <div className="flex items-center gap-4">
                   <span className="deck-mono text-xl text-[color:var(--case)]">✓</span>
                   <span className="deck-body text-lg xl:text-xl text-[color:var(--cream)]">Aggregated statistical results</span>
                </div>
                <div className="flex items-center gap-4 opacity-30 mt-4">
                   <span className="deck-mono text-xl text-red-500">✗</span>
                   <span className="deck-body text-lg xl:text-xl line-through text-[color:var(--cream-muted)]">Raw patient vectors</span>
                </div>
             </motion.div>
          </div>

          {/* Ambient Particles (Cloud Side) */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
             {[...Array(6)].map((_, i) => (
               <motion.div
                 key={i}
                 initial={{ x: '100vw', y: 300 + Math.random() * 300, opacity: 0 }}
                 animate={{ x: '50vw', opacity: [0, 0.5, 0] }}
                 transition={{ duration: 6 + Math.random() * 4, repeat: Infinity, delay: i * 2, ease: "linear" }}
                 className="absolute w-2 h-2 rounded-full bg-[color:var(--case)] shadow-[0_0_10px_var(--case)]"
               />
             ))}
          </div>
       </div>

       <WithWithoutPair
         withoutText="Data privacy depends on every agent following policy correctly, every time."
         withText="Data privacy is a property of the code. Cannot be violated by any agent."
         delay={2.0}
       />

       <TakeHomeStrip 
          text="Privacy is a property of the code, not a runtime policy." 
          subLine="21 CFR Part 11 + HIPAA §164.312 + GDPR Art. 32 — all satisfied structurally."
          caseColor="cyan" 
       />
    </SlideFrame>
  );
}
