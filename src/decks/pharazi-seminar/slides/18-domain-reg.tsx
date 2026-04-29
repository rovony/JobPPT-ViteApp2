import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

import { DashboardGrid } from '@/components/showcase/DashboardGrid';
import { ZoomablePanel } from '@/components/showcase/ZoomablePanel';

export default function Domain5Slide() {
  const [zoomedId, setZoomedId] = useState<string | null>(null);

  const handleZoom = (id: string) => {
    setZoomedId(zoomedId === id ? null : id);
  };

  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <SlideFrame slideId="18" dataCase="amber" footerKicker="18 · THE DOMAINS">
       


       <PrincipleTitleBlock
         counter="DOMAIN 5 OF 6 · REGULATORY"
         name="Regulatory Authoring"
         definition="M15-aligned documents, RAG-grounded, HITL-gated, every clause traceable to a hash-chained source."
       />

       <div className="w-full flex-1 relative flex flex-col z-10 px-12 pb-4">
          
          <DashboardGrid zoomedId={zoomedId}>
             
             {/* TOP-LEFT: Document Structure */}
             <div className={zoomedId && zoomedId !== 'tl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tl" label="DOCUMENT TEMPLATE" metadata="[ICH M15 · §2.7.2]" onZoom={handleZoom} isZoomed={zoomedId === 'tl'}>
                   <div className="flex flex-col w-full h-full gap-2 px-4 justify-center">
                      {[
                        "2.7.2 Summary of Clinical Pharmacology",
                        "2.7.2.1 Background",
                        "2.7.2.2 Summary of Results from Studies",
                        "2.7.2.3 Summary of Results Across Studies",
                        "2.7.2.4 Special Studies"
                      ].map((s, i) => (
                         <div key={i} className={`flex items-center gap-2 deck-mono ${i===0 ? 'text-[11px] text-[color:var(--cream)] mb-2 font-bold' : 'text-[10px] text-[color:var(--cream-muted)] ml-4'}`}>
                            <span className="text-[color:var(--case)] opacity-50">🔗</span>
                            <span>{s}</span>
                         </div>
                      ))}
                   </div>
                </ZoomablePanel>
             </div>

             {/* TOP-RIGHT: Source Trace */}
             <div className={zoomedId && zoomedId !== 'tr' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tr" label="AUDIT CITATION" metadata="[§2.7.2.2 · PARA 3]" onZoom={handleZoom} isZoomed={zoomedId === 'tr'}>
                   <div className="w-full h-full p-4 deck-display text-sm xl:text-base leading-relaxed text-[color:var(--cream)]">
                      The drug demonstrated dose-proportional pharmacokinetics across <span className="bg-[color-mix(in_srgb,var(--case-cyan)_20%,transparent)] border-b border-[color:var(--case-cyan)] relative group">the studied range<sup className="deck-mono text-[8px] text-[color:var(--case-cyan)] ml-1 cursor-pointer">NCA:0x4f3a</sup></span> with a clearance of <span className="bg-[color-mix(in_srgb,var(--case-amber)_20%,transparent)] border-b border-[color:var(--case-amber)] relative group">12.1 L/h<sup className="deck-mono text-[8px] text-[color:var(--case-amber)] ml-1 cursor-pointer">PopPK:0x9b1c</sup></span> and an exposure-response relationship indicating <span className="bg-[color-mix(in_srgb,var(--case-violet)_20%,transparent)] border-b border-[color:var(--case-violet)] relative group">linear improvement in 6MWD<sup className="deck-mono text-[8px] text-[color:var(--case-violet)] ml-1 cursor-pointer">ER:0x2a8f</sup></span>.
                   </div>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-LEFT: Workflow */}
             <div className={zoomedId && zoomedId !== 'bl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="bl" label="AUTHORING WORKFLOW" metadata="[6 STEPS]" onZoom={handleZoom} isZoomed={zoomedId === 'bl'}>
                   <div className="w-full h-full flex items-center justify-center gap-2 px-2">
                      <div className="deck-mono text-[8px] text-center border border-[color:var(--cream-hairline)] px-2 py-1 w-16">Manager</div>
                      <div className="text-[color:var(--cream-muted)] text-[8px]">→</div>
                      <div className="deck-mono text-[8px] text-center border border-[color:var(--cream-hairline)] px-2 py-1 w-16">State Pull</div>
                      <div className="text-[color:var(--cream-muted)] text-[8px]">→</div>
                      <div className="deck-mono text-[8px] text-center border border-[color:var(--cream-hairline)] px-2 py-1 w-16">RAG Embed</div>
                      <div className="text-[color:var(--cream-muted)] text-[8px]">→</div>
                      <div className="deck-mono text-[8px] text-center border border-[color:var(--case-cyan)] px-2 py-1 w-16 bg-[color-mix(in_srgb,var(--case-cyan)_10%,transparent)]">DEEP QC</div>
                      <div className="text-[color:var(--cream-muted)] text-[8px]">→</div>
                      <div className="deck-mono text-[8px] text-center border border-[color:var(--case-amber)] px-2 py-1 w-16 bg-[color-mix(in_srgb,var(--case-amber)_20%,transparent)] shadow-[0_0_15px_var(--case-amber)] relative">
                         HITL
                         <div className="absolute -top-3 -right-2 text-[10px]">👤</div>
                      </div>
                   </div>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-RIGHT: Output Document */}
             <div className={zoomedId && zoomedId !== 'br' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="br" label="GENERATED DRAFT" metadata="[M15-ALIGNED]" onZoom={handleZoom} isZoomed={zoomedId === 'br'}>
                   <div className="w-[200px] h-full bg-[color:var(--bg)] border border-[color:var(--cream-hairline)] p-4 flex flex-col shadow-xl">
                      <div className="deck-mono text-[8px] text-[color:var(--cream)] mb-2 font-bold border-b border-[color:var(--cream-hairline)] pb-1">Section 2.7.2 Summary</div>
                      <div className="flex flex-col gap-1 flex-1">
                         <div className="h-1 bg-[color:var(--bg-elevated)] w-full" />
                         <div className="h-1 bg-[color:var(--bg-elevated)] w-[90%]" />
                         <div className="h-1 bg-[color:var(--bg-elevated)] w-[80%]" />
                         <div className="h-1 bg-[color:var(--bg-elevated)] w-[95%] mt-2" />
                         <div className="h-1 bg-[color:var(--bg-elevated)] w-[85%]" />
                      </div>
                      <div className="flex flex-wrap gap-1 mt-2">
                         <div className="deck-mono text-[6px] border border-[color:var(--case-sage)] text-[color:var(--case-sage)] px-1 rounded-sm">M15 ✓</div>
                         <div className="deck-mono text-[6px] border border-[color:var(--case-sage)] text-[color:var(--case-sage)] px-1 rounded-sm">Part 11 ✓</div>
                         <div className="deck-mono text-[6px] border border-[color:var(--case-amber)] text-[color:var(--case-amber)] px-1 rounded-sm">HITL ✓</div>
                      </div>
                      <div className="deck-mono text-[6px] text-[color:var(--cream-muted)] mt-2 text-center">
                         Audit chain · 47 entries · verify_chain → True
                      </div>
                   </div>
                </ZoomablePanel>
             </div>
          </DashboardGrid>
       </div>

       <WithWithoutPair
         withoutText="Regulatory drafts cite analyses with no verification path. Reviewers cannot replay the decisions."
         withText="Every clause traces to a hash-chained source. Reviewers can replay every decision in 2034."
         delay={1.5}
       />

       <TakeHomeStrip 
          text="M15-aligned, RAG-grounded, HITL-gated, audit-cited." 
          subLine="Every clause traces to source. Reviewers can replay in 2034."
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
