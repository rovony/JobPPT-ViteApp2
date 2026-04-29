import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

export default function Principle3Slide() {
  return (
    <SlideFrame slideId="09" dataCase="cyan" footerKicker="09 · THE ARCHITECTURE">
       {/* Ambient Hash String Flow */}
       <div className="absolute bottom-[20%] left-0 right-0 h-10 overflow-hidden opacity-10 pointer-events-none z-0">
          <motion.div 
             animate={{ x: ["0%", "-100%"] }} 
             transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
             className="whitespace-nowrap deck-mono text-sm text-[color:var(--cream)]"
          >
             {Array(15).fill("e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855 ").join("")}
          </motion.div>
       </div>

       <PrincipleTitleBlock
         counter="PRINCIPLE 3 OF 5 · AUDIT"
         name="Cryptographic Audit"
         definition="Every state mutation, every routing decision, every approval — bound into one verifiable hash chain."
       />

       <div className="w-full flex-1 relative flex items-center justify-center gap-6 xl:gap-8 z-10 px-8 pb-4 pt-4">
          
          {[1, 2, 3].map((node, i) => (
             <React.Fragment key={node}>
                <motion.div 
                  initial={{ opacity: 0, x: -40 }} 
                  animate={{ opacity: 1, x: 0 }} 
                  transition={{ delay: 0.5 + (i * 0.8), duration: 0.8, ease: EASE }}
                  className="w-[280px] xl:w-[320px] border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] backdrop-blur-xl p-5 xl:p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                >
                   <div className="deck-mono text-[10px] xl:text-[11px] tracking-widest uppercase text-[color:var(--cream-muted)] mb-3 border-b border-[color:var(--cream-hairline)] pb-2">
                      Entry n-{3-node}
                   </div>
                   <div className="flex flex-col gap-2 deck-mono text-[10px] xl:text-[12px] text-[color:var(--cream)]">
                      <div className="flex justify-between"><span className="text-[color:var(--case)]">timestamp:</span><span>2026-04-29T14:32</span></div>
                      <div className="flex justify-between"><span className="text-[color:var(--case)]">action:</span><span>ROUTE_TO_EXPERT</span></div>
                      <div className="flex justify-between"><span className="text-[color:var(--case)]">details_hash:</span><span>7f83b165...</span></div>
                      <div className="flex justify-between text-[color:var(--cream-muted)]"><span>prev_hash:</span><span>{i === 0 ? '00000000...' : 'e3b0c442...'}</span></div>
                   </div>
                   <div className="mt-4 pt-3 border-t border-[color:var(--case)] deck-mono text-[10px] xl:text-[11px] text-[color:var(--case)] overflow-hidden text-ellipsis whitespace-nowrap">
                      hash = SHA256(...)
                   </div>
                </motion.div>

                {i !== 2 && (
                   <motion.div 
                     initial={{ scaleX: 0 }} 
                     animate={{ scaleX: 1 }} 
                     transition={{ delay: 0.8 + (i * 0.8), duration: 0.5, ease: EASE }}
                     className="w-[40px] xl:w-[60px] h-[2px] bg-[color:var(--case)] origin-left"
                   />
                )}
             </React.Fragment>
          ))}
       </div>

       <WithWithoutPair
         withoutText="Audit logs are append-but-unverifiable. A regulator in 2034 cannot confirm 2026 integrity."
         withText="One verification call answers True or False. Mutations reveal which entry, when."
         delay={3.5}
       />

       <TakeHomeStrip 
          text="Every decision binds into one chain. Verify integrity in two function calls." 
          subLine="21 CFR Part 11 §11.10(c) and ICH M15 reproducibility — foundation-level."
          caseColor="cyan" 
       />
    </SlideFrame>
  );
}
