import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PharmStateBar from '@/components/showcase/PharmStateBar';

gsap.registerPlugin(useGSAP);

export default function EndToEndSlide() {
  const container = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = React.useState(0);

  // We keep a React state for the PharmStateBar component to update it 
  // via GSAP's onUpdate loop since it relies on a prop.
  
  useGSAP(() => {
    // Initial State Setup
    gsap.set('.tl-node', { opacity: 0, x: -10 });
    gsap.set('.tl-msg', { opacity: 0, scale: 0.95 });
    gsap.set('.audit-node', { opacity: 0.3, borderColor: 'var(--cream-hairline)', color: 'var(--cream-muted)' });
    gsap.set('.audit-arrow', { opacity: 0.1 });
    
    // Main Timeline (53-second simulation compressed to ~20s for demo purposes)
    const tl = gsap.timeline({
      onUpdate: function() {
        setProgress(this.progress() * 100);
      }
    });

    // 0s: Base elements slide in
    tl.fromTo('.base-panel', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power3.out" }, 0);

    // T+2s: Orchestrator receives request
    tl.to('.tl-msg-1', { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 2);
    tl.to('.audit-node-req', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)' }, 2.2);

    // T+4s: L1 Model Manager dispatch
    tl.to('.tl-node-1', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 4);
    tl.to('.audit-arrow-1', { opacity: 1, color: 'var(--case)' }, 4.2);

    // T+6s: L2 Data Specialist
    tl.to('.tl-node-2', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 6);
    tl.to('.audit-node-data', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)' }, 6.5);

    // T+8s: L1 base model dispatch
    tl.to('.tl-node-3', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 8);
    tl.to('.audit-arrow-2', { opacity: 1, color: 'var(--case)' }, 8.2);

    // T+10s: L2 NONMEM Executor
    tl.to('.tl-node-4', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 10);
    tl.to('.audit-node-base', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)' }, 10.5);

    // T+12s: Covariates & QC
    tl.to('.tl-node-5', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 12);
    tl.to('.audit-arrow-3', { opacity: 1, color: 'var(--case)' }, 12.2);
    tl.to('.audit-node-cov', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)' }, 12.5);

    // T+14s: Authoring Agent
    tl.to('.tl-node-6', { opacity: 1, x: 0, duration: 0.5, ease: "power2.out" }, 14);
    tl.to('.audit-arrow-4', { opacity: 1, color: 'var(--case)' }, 14.2);
    tl.to('.audit-node-doc', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)' }, 14.5);

    // T+16s: Orchestrator completes
    tl.to('.tl-msg-2', { opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.7)" }, 16);
    tl.to('.audit-arrow-5', { opacity: 1, color: 'var(--case)' }, 16.2);
    tl.to('.audit-node-sync', { opacity: 1, borderColor: 'var(--case)', color: 'var(--case)', backgroundColor: 'color-mix(in srgb, var(--case) 20%, transparent)', boxShadow: '0 0 15px rgba(139, 92, 246, 0.5)' }, 16.5);

  }, { scope: container });

  return (
    <SlideFrame
      slideId="19-5a"
      dataCase="violet"
      eyebrow="MOVEMENT 3 · CLIMAX"
      headline={<>End-to-end. <span className="italic text-[color:var(--case)]">In one frame.</span></>}
      subhead="From conversational intent to regulator-ready artifact."
      footerKicker="19.5a · THE FOUNDATION"
    >
       <div ref={container} className="w-full h-full relative flex flex-col gap-4 px-12 pb-24 pt-4 z-10">
          
          {/* Top Row */}
          <div className="flex-1 flex gap-4 min-h-0">
             {/* Left 30%: User Request */}
             <div className="base-panel w-[30%] flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">L0 · HUMAN INTENT</div>
                </div>
                <div className="flex-1 flex flex-col p-6 gap-4 overflow-y-auto">
                   <div className="bg-[color-mix(in_srgb,var(--case)_10%,transparent)] border border-[color:var(--case)] p-4 rounded-lg rounded-br-none max-w-[90%] self-end">
                      <div className="deck-body text-sm lg:text-base text-[color:var(--cream)]">
                         Build a PopPK model for the Phase 2 dataset. Run standard covariates, check WT effect on CL. Generate the CSR module.
                      </div>
                   </div>
                   
                   <div className="tl-msg tl-msg-1 bg-[color:var(--bg-deep)] border border-[color:var(--cream-hairline)] p-4 rounded-lg rounded-bl-none max-w-[90%] self-start mt-4">
                      <div className="deck-mono text-[10px] text-[color:var(--case)] mb-2">PHARAZI_ORCHESTRATOR</div>
                      <div className="deck-body text-sm text-[color:var(--cream-muted)]">
                         Understood. Initiating 4-tier PopPK workflow. Delegating to Model Manager...
                      </div>
                   </div>

                   <div className="tl-msg tl-msg-2 bg-[color:var(--bg-deep)] border border-[color:var(--cream-hairline)] p-4 rounded-lg rounded-bl-none max-w-[90%] self-start">
                      <div className="deck-mono text-[10px] text-[color:var(--case)] mb-2">PHARAZI_ORCHESTRATOR</div>
                      <div className="deck-body text-sm text-[color:var(--cream-muted)]">
                         Workflow complete. M15-compliant artifacts generated. Ready for HITL QC review.
                      </div>
                   </div>
                </div>
             </div>

             {/* Right 70%: Agent Hierarchy Trace */}
             <div className="base-panel w-[70%] flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">L1–L4 · AGENT HIERARCHY TRACE</div>
                </div>
                <div className="flex-1 p-6 flex flex-col gap-2 overflow-y-auto deck-mono text-sm">
                   
                   <div className="tl-node tl-node-1 flex gap-4 items-center">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case)] px-2 py-1 bg-[color:var(--case)]/10 rounded">Model_Manager</span>
                      <span className="text-[color:var(--cream)]">Dispatching schema_extractor for cohort_ph2.xpt</span>
                   </div>
                   
                   <div className="tl-node tl-node-2 flex gap-4 items-center ml-8 border-l-2 border-[color:var(--cream-hairline)] pl-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L2</span>
                      <span className="text-[color:var(--case-cyan)] px-2 py-1 bg-[color:var(--case-cyan)]/10 rounded">Data_Specialist</span>
                      <span className="text-[color:var(--cream)]">Sanitizing covariates... PII removed.</span>
                   </div>

                   <div className="tl-node tl-node-3 flex gap-4 items-center mt-2">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case)] px-2 py-1 bg-[color:var(--case)]/10 rounded">Model_Manager</span>
                      <span className="text-[color:var(--cream)]">Building base model. Dispatching to NONMEM cluster.</span>
                   </div>

                   <div className="tl-node tl-node-4 flex gap-4 items-center ml-8 border-l-2 border-[color:var(--cream-hairline)] pl-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L2</span>
                      <span className="text-[color:var(--case-amber)] px-2 py-1 bg-[color:var(--case-amber)]/10 rounded">NONMEM_Executor</span>
                      <span className="text-[color:var(--cream)]">Base model converged. OFV = 1452.4.</span>
                   </div>

                   <div className="tl-node tl-node-5 flex gap-4 items-center ml-16 border-l-2 border-[color:var(--cream-hairline)] pl-4 mt-2">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L3</span>
                      <span className="text-[color:var(--case-coral)] px-2 py-1 bg-[color:var(--case-coral)]/10 rounded">QC_Validator</span>
                      <span className="text-[color:var(--cream)]">Checking pcVPC. Plot matches observed data.</span>
                   </div>

                   <div className="tl-node tl-node-6 flex gap-4 items-center mt-4 border-t border-[color:var(--cream-hairline)] pt-4">
                      <span className="text-[color:var(--cream-muted)] w-8 text-right">L1</span>
                      <span className="text-[color:var(--case-sage)] px-2 py-1 bg-[color:var(--case-sage)]/10 rounded">Authoring_Agent</span>
                      <span className="text-[color:var(--cream)]">Compiling Module 2.7.2. Source hashes verified.</span>
                   </div>

                </div>
             </div>
          </div>

          {/* Bottom Row */}
          <div className="h-[25%] flex gap-4 min-h-0">
             {/* Left 30%: PharmState */}
             <div className="base-panel w-[30%]">
                <PharmStateBar progressPercentage={progress} />
             </div>

             {/* Right 70%: Horizontal Audit Chain */}
             <div className="base-panel w-[70%] bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded p-4 flex flex-col justify-center overflow-hidden">
                <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase mb-3">
                   CRYPTOGRAPHIC AUDIT CHAIN
                </div>
                <div className="flex items-center gap-2 overflow-x-hidden">
                   <AuditNode classMarker="audit-node-req" label="Req" />
                   <AuditArrow classMarker="audit-arrow-1" />
                   <AuditNode classMarker="audit-node-data" label="Data" />
                   <AuditArrow classMarker="audit-arrow-2" />
                   <AuditNode classMarker="audit-node-base" label="Base" />
                   <AuditArrow classMarker="audit-arrow-3" />
                   <AuditNode classMarker="audit-node-cov" label="Cov" />
                   <AuditArrow classMarker="audit-arrow-4" />
                   <AuditNode classMarker="audit-node-doc" label="Doc" />
                   <AuditArrow classMarker="audit-arrow-5" />
                   <AuditNode classMarker="audit-node-sync" label="Sync" />
                </div>
             </div>
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

function AuditNode({ classMarker, label }: { classMarker: string, label: string }) {
  return (
    <div className={`audit-node ${classMarker} px-3 py-1.5 rounded border border-[color:var(--cream-hairline)] text-[10px] deck-mono whitespace-nowrap bg-[color:var(--bg-deep)]`}>
      {label} ✓
    </div>
  );
}

function AuditArrow({ classMarker }: { classMarker: string }) {
  return (
    <div className={`audit-arrow ${classMarker} text-[10px] text-[color:var(--cream-muted)]`}>
      →
    </div>
  );
}
