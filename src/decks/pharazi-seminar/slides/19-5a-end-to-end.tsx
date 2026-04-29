import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PharmStateBar from '@/components/showcase/PharmStateBar';

export default function EndToEndSlide() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simple mock progress for the animation
    const interval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) return 100;
        return p + 1;
      });
    }, 150); // Takes ~15s to complete
    return () => clearInterval(interval);
  }, []);

  return (
    <SlideFrame
      slideId="19-5a"
      dataCase="violet"
      eyebrow="MOVEMENT 3 · CLIMAX"
      headline={<>End-to-end. <span className="italic text-[color:var(--case)]">In one frame.</span></>}
      subhead="From conversational intent to regulator-ready artifact."
      footerKicker="19.5a · THE FOUNDATION"
    >
       <div className="w-full h-full relative flex flex-col gap-4 px-12 pb-24 pt-4 z-10">
          
          {/* Top Row */}
          <div className="flex-1 flex gap-4 min-h-0">
             {/* Left 30%: User Request */}
             <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6 }} className="w-[30%] flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">L0 · HUMAN INTENT</div>
                </div>
                <div className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
                   <div className="bg-[color-mix(in_srgb,var(--case)_10%,transparent)] border border-[color:var(--case)] p-4 rounded-lg rounded-br-none max-w-[90%] self-end">
                      <div className="deck-body text-sm lg:text-base text-[color:var(--cream)]">
                         Build a PopPK model for the Phase 2 dataset. Run standard covariates, check WT effect on CL. Generate the CSR module.
                      </div>
                   </div>
                   
                   {progress > 10 && (
                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[color:var(--bg-deep)] border border-[color:var(--cream-hairline)] p-4 rounded-lg rounded-bl-none max-w-[90%] self-start mt-4">
                        <div className="deck-mono text-[10px] text-[color:var(--case)] mb-2">PHARAZI_ORCHESTRATOR</div>
                        <div className="deck-body text-sm text-[color:var(--cream-muted)]">
                           Understood. Initiating 4-tier PopPK workflow. Delegating to Model Manager...
                        </div>
                     </motion.div>
                   )}
                   {progress > 80 && (
                     <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-[color:var(--bg-deep)] border border-[color:var(--cream-hairline)] p-4 rounded-lg rounded-bl-none max-w-[90%] self-start">
                        <div className="deck-mono text-[10px] text-[color:var(--case)] mb-2">PHARAZI_ORCHESTRATOR</div>
                        <div className="deck-body text-sm text-[color:var(--cream-muted)]">
                           Workflow complete. M15-compliant artifacts generated. Ready for HITL QC review.
                        </div>
                     </motion.div>
                   )}
                </div>
             </motion.div>

             {/* Right 70%: Agent Hierarchy Trace */}
             <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.2 }} className="w-[70%] flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">L1–L4 · AGENT HIERARCHY TRACE</div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto deck-mono text-sm">
                   
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 15 ? 1 : 0 }} className="flex gap-4 items-center">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case)] px-2 py-1 bg-[color:var(--case)]/10 rounded">Model_Manager</span>
                      <span className="text-[color:var(--cream)]">Dispatching schema_extractor for cohort_ph2.xpt</span>
                   </motion.div>
                   
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 30 ? 1 : 0 }} className="flex gap-4 items-center ml-8 border-l-2 border-[color:var(--cream-hairline)] pl-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L2</span>
                      <span className="text-[color:var(--case-cyan)] px-2 py-1 bg-[color:var(--case-cyan)]/10 rounded">Data_Specialist</span>
                      <span className="text-[color:var(--cream)]">Sanitizing covariates... PII removed.</span>
                   </motion.div>

                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 45 ? 1 : 0 }} className="flex gap-4 items-center mt-2">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case)] px-2 py-1 bg-[color:var(--case)]/10 rounded">Model_Manager</span>
                      <span className="text-[color:var(--cream)]">Building base model. Dispatching to NONMEM cluster.</span>
                   </motion.div>

                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 60 ? 1 : 0 }} className="flex gap-4 items-center ml-8 border-l-2 border-[color:var(--cream-hairline)] pl-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L2</span>
                      <span className="text-[color:var(--case-amber)] px-2 py-1 bg-[color:var(--case-amber)]/10 rounded">NONMEM_Executor</span>
                      <span className="text-[color:var(--cream)]">Base model converged. OFV = 1452.4.</span>
                   </motion.div>

                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 75 ? 1 : 0 }} className="flex gap-4 items-center ml-16 border-l-2 border-[color:var(--cream-hairline)] pl-4 mt-2">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L3</span>
                      <span className="text-[color:var(--case-coral)] px-2 py-1 bg-[color:var(--case-coral)]/10 rounded">QC_Validator</span>
                      <span className="text-[color:var(--cream)]">Checking pcVPC. Plot matches observed data.</span>
                   </motion.div>

                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: progress > 90 ? 1 : 0 }} className="flex gap-4 items-center mt-4 border-t border-[color:var(--cream-hairline)] pt-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case-sage)] px-2 py-1 bg-[color:var(--case-sage)]/10 rounded">Authoring_Agent</span>
                      <span className="text-[color:var(--cream)]">Compiling Module 2.7.2. Source hashes verified.</span>
                   </motion.div>

                </div>
             </motion.div>
          </div>

          {/* Bottom Row */}
          <div className="h-[25%] flex gap-4 min-h-0">
             {/* Left 30%: PharmState */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.4 }} className="w-[30%]">
                <PharmStateBar progressPercentage={progress} />
             </motion.div>

             {/* Right 70%: Horizontal Audit Chain */}
             <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.6 }} className="w-[70%] bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded p-4 flex flex-col justify-center overflow-hidden">
                <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase mb-3">
                   CRYPTOGRAPHIC AUDIT CHAIN
                </div>
                <div className="flex items-center gap-2 overflow-x-hidden">
                   <AuditNode active={progress > 10} label="Req" />
                   <AuditArrow active={progress > 20} />
                   <AuditNode active={progress > 30} label="Data" />
                   <AuditArrow active={progress > 40} />
                   <AuditNode active={progress > 50} label="Base" />
                   <AuditArrow active={progress > 60} />
                   <AuditNode active={progress > 70} label="Cov" />
                   <AuditArrow active={progress > 80} />
                   <AuditNode active={progress > 90} label="Doc" />
                   <AuditArrow active={progress > 95} />
                   <AuditNode active={progress >= 100} label="Sync" isTerminal />
                </div>
             </motion.div>
          </div>

       </div>

       <TakeHomeStrip 
          text="Six domains acting as one system. 4-level hierarchy. Cryptographically bound." 
          subLine="This is the reference architecture defined in the upcoming CPT:PSP paper."
          caseColor="violet" 
       />
    </SlideFrame>
  );
}

function AuditNode({ active, label, isTerminal = false }: { active: boolean, label: string, isTerminal?: boolean }) {
  return (
    <div className={`px-3 py-1.5 rounded border text-[10px] deck-mono whitespace-nowrap transition-colors duration-500 ${
      active ? 'bg-[color:var(--case)]/20 border-[color:var(--case)] text-[color:var(--case)]' : 'bg-[color:var(--bg-deep)] border-[color:var(--cream-hairline)] text-[color:var(--cream-muted)]'
    } ${isTerminal && active ? 'shadow-[0_0_15px_rgba(var(--case-rgb),0.5)]' : ''}`}>
      {label} {active ? '✓' : ''}
    </div>
  );
}

function AuditArrow({ active }: { active: boolean }) {
  return (
    <div className={`text-[10px] transition-colors duration-500 ${active ? 'text-[color:var(--case)]' : 'text-[color:var(--cream-muted)] opacity-30'}`}>
      →
    </div>
  );
}
