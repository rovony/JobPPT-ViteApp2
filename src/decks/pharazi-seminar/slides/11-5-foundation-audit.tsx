import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';

export default function FoundationAudit() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="WORKING SYSTEM · AUDIT LAYER"
      headline={<>The workflow completes. <span className="italic text-[color:var(--case)]">The chain persists.</span></>}
      subhead="Cryptographic verification of the NCA trace."
      footerKicker="11.5 · THE ARCHITECTURE"
    >
       <div className="w-full h-full relative flex flex-col items-center justify-center px-16 z-10">
          <div className="w-full max-w-4xl bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
             <div className="bg-[color:var(--bg-deep)] px-6 py-4 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                <div className="deck-mono text-xs text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">AUDIT VERIFICATION</div>
                <div className="deck-mono text-[10px] text-[color:var(--case)]">[SHA-256]</div>
             </div>
             <div className="flex flex-col p-8 gap-4 deck-mono text-sm lg:text-base text-[color:var(--cream)]">
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }} className="flex justify-between border-b border-[color:var(--cream-hairline)] pb-2">
                   <span className="opacity-50">Entry 001 · Request</span>
                   <span className="text-[color:var(--case)]">a7f9...3b21</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }} className="flex justify-between border-b border-[color:var(--cream-hairline)] pb-2">
                   <span className="opacity-50">Entry 002 · Data Sanitized</span>
                   <span className="text-[color:var(--case)]">8c4e...1f9a</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.1 }} className="flex justify-between border-b border-[color:var(--cream-hairline)] pb-2">
                   <span className="opacity-50">Entry 003 · Route NCA</span>
                   <span className="text-[color:var(--case)]">d21b...7c4f</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4 }} className="flex justify-between border-b border-[color:var(--cream-hairline)] pb-2">
                   <span className="opacity-50">Entry 004 · Execute calculate_nca</span>
                   <span className="text-[color:var(--case)]">9f3a...e8b2</span>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }} className="flex justify-between border-b border-[color:var(--cream-hairline)] pb-2">
                   <span className="opacity-50">Entry 005 · Execute plot_pk_profile</span>
                   <span className="text-[color:var(--case)]">5e1d...a3c9</span>
                </motion.div>
                
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.2 }} className="mt-8 p-4 bg-[color-mix(in_srgb,var(--case)_10%,transparent)] border border-[color:var(--case)] rounded-md flex justify-between items-center">
                   <span>verify_chain_integrity(run_id="8c4e1f")</span>
                   <span className="text-[color:var(--bg)] bg-[color:var(--case)] px-3 py-1 rounded font-bold">TRUE</span>
                </motion.div>
             </div>
          </div>
       </div>

       <TakeHomeStrip 
          text="Audit chain is live. Verifies in two function calls. Reachable from any device." 
          subLine="Pharazi.ai is the foundation's reference deployment."
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
