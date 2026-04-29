import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

export default function Principle4Slide() {
  const steps = [
    { num: "01", title: "Data Ingestion", type: "system" },
    { num: "02", title: "Schema extraction", type: "system" },
    { num: "03", title: "QC Debate Gate", type: "debate" },
    { num: "04", title: "Manager Review", type: "review" },
    { num: "05", title: "NCA Execution", type: "system" },
    { num: "06", title: "HITL Approval", type: "human" }
  ];

  return (
    <SlideFrame slideId="10" dataCase="amber" footerKicker="10 · THE ARCHITECTURE">
       <PrincipleTitleBlock
         counter="PRINCIPLE 4 OF 5 · WORKFLOW + COORDINATION"
         name="Versioned Workflow + Coordination Discipline"
         definition="Workflows are hash-anchored execution plans; coordination cost is bounded by deliberate constraints."
       />

       <div className="w-full flex-1 relative flex flex-col z-10 px-12 pb-4">
          
          {/* ROW 1 — Workflow as versioned plan */}
          <div className="flex-1 flex flex-col justify-center items-center border-b border-[color:var(--cream-hairline)] relative pb-8 mb-8">
             <div className="absolute top-0 left-0 deck-mono text-xs uppercase tracking-widest text-[color:var(--cream-muted)]">WORKFLOW AS VERSIONED PLAN</div>
             
             <div className="w-full max-w-5xl flex items-center justify-between relative mt-6">
                {/* The Master Timeline Hairline */}
                <motion.div 
                   initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.0, delay: 1.1, ease: EASE }}
                   className="absolute left-0 right-0 h-[2px] bg-[color:var(--cream-hairline)] origin-left z-0"
                />

                {steps.map((step, i) => (
                   <div key={i} className="relative z-10 flex flex-col items-center">
                      <motion.div 
                         initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.3 + i * 0.1 }}
                         className="absolute bottom-8 deck-mono text-xs tracking-widest text-[color:var(--cream-muted)]"
                      >
                         {step.num}
                      </motion.div>

                      <motion.div 
                         initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 1.4 + i * 0.1, type: 'spring', bounce: 0.4 }}
                         className={`w-4 h-4 rounded-full border-2 border-[color:var(--bg)] shadow-[0_0_0_2px_var(--cream-hairline)] ${step.type !== 'system' ? 'bg-[color:var(--case)]' : 'bg-[color:var(--bg-elevated)]'}`}
                         style={{ boxShadow: step.type !== 'system' ? '0 0 15px var(--case)' : '0 0 0 2px var(--cream-hairline)' }}
                      />

                      <motion.div 
                         initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.5 + i * 0.1 }}
                         className={`absolute top-8 whitespace-nowrap deck-body text-sm ${step.type !== 'system' ? 'text-[color:var(--case)]' : 'text-[color:var(--cream)]'}`}
                      >
                         {step.title}
                      </motion.div>
                   </div>
                ))}
             </div>
             <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="deck-mono text-xs text-[color:var(--cream-muted)] opacity-70 mt-12">
                Each SOP versioned · hash-anchored · marketplace-extensible
             </motion.div>
          </div>

          {/* ROW 2 — Coordination bound at three points */}
          <div className="flex-[0.8] flex gap-12">
             <div className="absolute top-0 left-0 deck-mono text-xs uppercase tracking-widest text-[color:var(--cream-muted)]">COORDINATION BOUND AT 3 POINTS</div>
             
             {/* Col A */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2 }} className="flex-1 border-r border-[color:var(--cream-hairline)] pr-12 pt-6">
                <div className="deck-mono text-xs tracking-widest uppercase text-[color:var(--case)] mb-4">BOUND 1 · BOUNDED EXPERT SURFACE</div>
                <div className="flex items-center gap-4 mb-4">
                   <div className="h-2 flex-1 bg-[color:var(--bg-elevated)] rounded-full overflow-hidden flex">
                      <div className="h-full w-full bg-[color:var(--case)]" />
                   </div>
                   <div className="deck-mono text-xs">10 MAX</div>
                </div>
                <div className="deck-body text-sm leading-relaxed text-[color:var(--cream-muted)]">
                   Each expert capped at ten tools. Need more? Split into two experts. Bounded coordination cost.
                </div>
             </motion.div>

             {/* Col B */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.4 }} className="flex-1 border-r border-[color:var(--cream-hairline)] pr-12 pt-6">
                <div className="deck-mono text-xs tracking-widest uppercase text-[color:var(--case)] mb-4">BOUND 2 · TYPED STATE BUS</div>
                <div className="flex items-center gap-2 mb-4">
                   <span className="deck-mono text-xs text-[color:var(--cream)] border border-[color:var(--cream-hairline)] px-2 py-1">PharmState</span>
                   <span className="text-[color:var(--case)]">→</span>
                   <span className="deck-mono text-[10px] bg-[color-mix(in_srgb,var(--case)_20%,transparent)] px-1 rounded">APPEND-ONLY</span>
                </div>
                <div className="deck-body text-sm leading-relaxed text-[color:var(--cream-muted)]">
                   Type-checked at every boundary. Analyses append, never overwrite. Provenance is structural.
                </div>
             </motion.div>

             {/* Col C */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.6 }} className="flex-1 pt-6 relative">
                <div className="deck-mono text-xs tracking-widest uppercase text-[color:var(--case)] mb-4">BOUND 3 · LAYERED QUALITY</div>
                <div className="flex flex-col gap-1 mb-3">
                   <div className="deck-mono text-[10px] text-[color:var(--cream)] bg-[color:var(--bg-elevated)] px-2 py-1 border-l-2 border-[color:var(--cream-hairline)]">Manager Review [Configurable]</div>
                   <div className="deck-mono text-[10px] text-[color:var(--cream)] bg-[color:var(--bg-elevated)] px-2 py-1 border-l-2 border-[color:var(--case-amber)]">Cross-Dept QC Challenge</div>
                   <div className="deck-mono text-[10px] text-[color:var(--cream)] bg-[color:var(--bg-elevated)] px-2 py-1 border-l-2 border-[color:var(--case-cyan)]">Human-in-the-loop Gate</div>
                </div>
                <div className="deck-body text-sm leading-relaxed text-[color:var(--cream-muted)]">
                   Manager reviews own-department. QC challenges across. HITL blocks.
                </div>
                <div className="absolute bottom-0 right-0 deck-mono text-[9px] text-[color:var(--cream-muted)] opacity-40">
                   MetaGPT · Kim et al. · ICH M15
                </div>
             </motion.div>

          </div>
       </div>

       <WithWithoutPair
         withoutText="Workflows are improvisational. Coordination cost grows quadratically. QC depends on agent goodwill."
         withText="Workflows are git commits. Coordination cost bounded by design. Quality independently challenged at every step."
         delay={3.2}
       />

       <TakeHomeStrip 
          text="Versioned workflows + bounded coordination — git commits for analysis." 
          subLine="SOPs · 10-tool cap · PharmState · two-tier QC + HITL."
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
