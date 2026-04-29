import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

export default function Domain4Slide() {
  return (
    <SlideFrame slideId="17" dataCase="violet" footerKicker="17 · THE DOMAINS">
       <PrincipleTitleBlock
         counter="DOMAIN 4 OF 6 · EXPOSURE-RESPONSE"
         name="Exposure–Response"
         definition="PK posterior in, dose recommendation out. Typed shared state across domains. Zero re-extraction."
       />

       <div className="w-full flex-1 relative flex items-center justify-center pt-2 pb-4 z-10 px-12">
          <div className="w-full max-w-6xl h-[480px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] backdrop-blur-xl relative overflow-hidden flex items-center justify-center rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
             <div className="flex gap-12 items-center">
                <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 1.0 }} className="flex flex-col items-center">
                   <div className="w-36 h-36 rounded-full border border-[color:var(--case)] flex items-center justify-center deck-mono text-base bg-[color-mix(in_srgb,var(--case)_20%,transparent)] text-center px-4">PopPK POSTERIOR</div>
                   <div className="deck-mono text-[12px] mt-6 text-[color:var(--cream-muted)] tracking-widest uppercase">PharmState</div>
                </motion.div>
                
                <div className="flex flex-col items-center justify-center">
                   <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 1.5, duration: 1.0 }} className="w-32 h-[2px] bg-[color:var(--cream-hairline)] origin-left" />
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.0 }} className="deck-mono text-[11px] text-[color:var(--case)] mt-3">Zero Re-extraction</motion.div>
                </div>

                <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.0 }} className="flex flex-col items-center">
                   <div className="w-48 h-48 border border-[color:var(--case-cyan)] flex items-center justify-center deck-mono text-2xl bg-[color-mix(in_srgb,var(--case-cyan)_20%,transparent)] shadow-[0_0_30px_rgba(0,255,255,0.1)]">E-R MODEL</div>
                   <div className="deck-mono text-[12px] mt-6 text-[color:var(--cream-muted)] tracking-widest uppercase">Logistic Regression</div>
                </motion.div>
                
                <div className="flex flex-col items-center justify-center">
                   <motion.div initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 2.5, duration: 1.0 }} className="w-32 h-[2px] bg-[color:var(--cream-hairline)] origin-left" />
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.0 }} className="deck-mono text-[11px] text-[color:var(--case)] mt-3">Optimize Dose</motion.div>
                </div>

                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 3.0 }} className="flex flex-col items-center">
                   <div className="w-36 h-36 rounded-full border border-[color:var(--case-amber)] flex items-center justify-center deck-mono text-base bg-[color-mix(in_srgb,var(--case-amber)_20%,transparent)] text-center px-4">RECOMMENDATION</div>
                   <div className="deck-mono text-[12px] mt-6 text-[color:var(--cream-muted)] tracking-widest uppercase">Target Exposure</div>
                </motion.div>
             </div>
          </div>
       </div>

       <WithWithoutPair
         withoutText="PK posteriors re-extract for every downstream analysis. Information loss at every handoff."
         withText="Typed shared state preserves the posterior across domains. Zero re-extraction, zero information loss."
         delay={4.0}
       />

       <TakeHomeStrip text="Typed shared state prevents data drift between domains." caseColor="violet" />
    </SlideFrame>
  );
}
