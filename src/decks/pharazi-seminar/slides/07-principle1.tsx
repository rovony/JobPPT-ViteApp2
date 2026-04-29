import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

export default function Principle1Slide() {
  return (
    <SlideFrame slideId="07" dataCase="amber" footerKicker="07 · THE ARCHITECTURE">
       {/* Background Hairline Grid */}
       <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBoOHYxSDBWMHptMCA0aDh2MUgwVjR6IiBmaWxsPSJyZ2JhLDI1NSwyNTUsMjU1LDAuMDQpIi8+PC9zdmc+')" }} />
       
       <PrincipleTitleBlock
         counter="PRINCIPLE 1 OF 5 · ARCHITECTURE"
         name="Centralized Hierarchy"
         definition="Independent agents amplify errors 17× as scope grows; centralized hierarchies contain that to 4×."
       />

       <div className="w-full flex-1 relative flex z-10 px-12 pb-4">
          {/* Phase 2: The Server Rack Hierarchy */}
          <div className="flex-1 flex flex-col items-center justify-center">
             {/* L0: Orchestrator */}
             <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 0.8 }} className="flex flex-col items-center">
                <div className="w-16 h-16 rounded-full border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_20%,transparent)] shadow-[0_0_30px_var(--case)] flex items-center justify-center deck-mono text-lg text-[color:var(--case)]">L0</div>
                <div className="mt-2 deck-display text-xl text-[color:var(--cream)] tracking-tight">Orchestrator</div>
             </motion.div>
             
             {/* Plumb line */}
             <motion.div initial={{ height: 0 }} animate={{ height: 30 }} transition={{ delay: 2.5, duration: 0.5 }} className="w-[2px] bg-[color:var(--cream-hairline)]" />

             {/* L1: Managers */}
             <motion.div layoutId="hierarchy-l1" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 3.0, duration: 0.8 }} className="w-[500px] xl:w-[600px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md p-4 text-center shadow-xl">
                <div className="deck-mono text-xs tracking-widest text-[color:var(--cream-muted)] mb-1">L1: DEPARTMENT MANAGERS</div>
                <div className="deck-body text-lg text-[color:var(--cream)]">Route & Review at configurable levels</div>
             </motion.div>

             {/* Plumb line */}
             <motion.div initial={{ height: 0 }} animate={{ height: 30 }} transition={{ delay: 3.5, duration: 0.5 }} className="w-[2px] bg-[color:var(--cream-hairline)]" />

             {/* L2: Experts */}
             <motion.div layoutId="hierarchy-l2" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.0, duration: 0.8 }} className="w-[700px] xl:w-[800px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md p-4 text-center shadow-xl">
                <div className="deck-mono text-xs tracking-widest text-[color:var(--cream-muted)] mb-1">L2: DOMAIN EXPERTS</div>
                <div className="deck-body text-lg text-[color:var(--cream)] flex justify-center gap-6">
                   <span>NCA</span>·<span>PopPK</span>·<span>PKPD</span>·<span>QC</span>·<span>Regulatory</span>
                </div>
             </motion.div>
             
             {/* Plumb line */}
             <motion.div initial={{ height: 0 }} animate={{ height: 30 }} transition={{ delay: 4.5, duration: 0.5 }} className="w-[2px] bg-[color:var(--cream-hairline)]" />

             {/* L3: Utilities */}
             <motion.div layoutId="hierarchy-l3" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 5.0, duration: 0.8 }} className="w-[900px] xl:w-[1000px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md p-4 text-center shadow-xl">
                <div className="deck-mono text-xs tracking-widest text-[color:var(--cream-muted)] mb-1">L3: CODE-ONLY UTILITIES</div>
                <div className="deck-body text-lg text-[color:var(--cream-muted)] flex justify-center gap-6">
                   <span>Schema Extractor</span>·<span>Audit Chain</span>·<span>Self-Healer</span>
                </div>
             </motion.div>
          </div>

          {/* Phase 3: Callouts & Phase 1 Sidebar */}
          <div className="w-[300px] xl:w-[350px] flex flex-col justify-center gap-8 border-l border-[color:var(--cream-hairline)] pl-8 py-4">
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }} className="mb-4">
                <div className="deck-display text-3xl text-[color:var(--case)] mb-1">17.2×</div>
                <div className="deck-body text-base text-[color:var(--cream-muted)] leading-tight mb-4">Independent error amplification</div>
                
                <div className="deck-display text-3xl text-[color:var(--cream)] mb-1">4.4×</div>
                <div className="deck-body text-base text-[color:var(--cream-muted)] leading-tight">Centralized error amplification</div>
                
                <div className="deck-mono text-[10px] uppercase text-[color:var(--cream-muted)] mt-4 opacity-50">Kim et al. 2025 · arXiv:2512.08296</div>
             </motion.div>

             <div className="flex flex-col gap-2">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 6.5 }} className="deck-mono text-[10px] xl:text-xs tracking-widest text-[color:var(--case)]">1. Orchestrator decides — never executes</motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 7.5 }} className="deck-mono text-[10px] xl:text-xs tracking-widest text-[color:var(--case)]">2. Managers route, review, escalate</motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 8.5 }} className="deck-mono text-[10px] xl:text-xs tracking-widest text-[color:var(--case)]">3. Experts execute — bounded tools</motion.div>
             </div>
          </div>
       </div>

       <WithWithoutPair
         withoutText="Independent agents amplify errors 17× as scope grows. The system fails silently as it scales."
         withText="Centralized hierarchy contains errors to 4×. Failure modes are explicit and bounded."
         delay={9.5}
       />

       <TakeHomeStrip 
          text="Centralized hierarchy contains errors 4× better. Direct application of Kim et al." 
          subLine="Orchestrator never executes. Managers review. Experts run bounded tools."
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
