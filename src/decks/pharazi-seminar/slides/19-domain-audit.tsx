import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

import { DashboardGrid } from '@/components/showcase/DashboardGrid';
import { ZoomablePanel } from '@/components/showcase/ZoomablePanel';

export default function Domain6Slide() {
  const [zoomedId, setZoomedId] = useState<string | null>(null);
  const [terminalStep, setTerminalStep] = useState(0);

  const handleZoom = (id: string) => {
    setZoomedId(zoomedId === id ? null : id);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setZoomedId(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    // Faux terminal typing effect
    const timers = [
      setTimeout(() => setTerminalStep(1), 1000),
      setTimeout(() => setTerminalStep(2), 1500),
      setTimeout(() => setTerminalStep(3), 2200),
      setTimeout(() => setTerminalStep(4), 2800),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  const domains = [
    { n: "Data", c: 5 }, { n: "NCA", c: 3 }, { n: "PopPK", c: 7 },
    { n: "E-R", c: 4 }, { n: "Reg", c: 3 }, { n: "Audit", c: 1 }
  ];

  return (
    <SlideFrame slideId="19" dataCase="cyan" footerKicker="19 · THE DOMAINS">
       


       <PrincipleTitleBlock
         counter="DOMAIN 6 OF 6 · AUDIT"
         name="End-to-End Audit"
         definition="One chain across all six domains. One verify call. ICH M15 reproducibility, foundation-level."
       />

       <div className="w-full flex-1 relative flex flex-col z-10 px-12 pb-4">
          
          <DashboardGrid zoomedId={zoomedId}>
             
             {/* TOP-LEFT: Domain Summary Map */}
             <div className={zoomedId && zoomedId !== 'tl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tl" label="DOMAINS LOGGED" metadata="[6 DOMAINS · 23 ENTRIES]" onZoom={handleZoom} isZoomed={zoomedId === 'tl'}>
                   <div className="grid grid-cols-3 grid-rows-2 gap-4 w-full h-full p-4">
                      {domains.map((d, i) => (
                         <div key={d.n} className="border border-[color:var(--cream-hairline)] flex flex-col items-center justify-center p-2 relative bg-[color:var(--bg-elevated)] shadow-md">
                            <div className="deck-mono text-[10px] xl:text-xs text-[color:var(--cream)] mb-2">{d.n}</div>
                            <div className="deck-mono text-[8px] text-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] px-2 py-1 rounded-sm">
                               {d.c} ENTRIES
                            </div>
                         </div>
                      ))}
                   </div>
                </ZoomablePanel>
             </div>

             {/* TOP-RIGHT: Hash Chain Visualization */}
             <div className={zoomedId && zoomedId !== 'tr' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tr" label="CHAIN STRUCTURE" metadata="[SHA-256]" onZoom={handleZoom} isZoomed={zoomedId === 'tr'}>
                   <div className="w-full h-full flex flex-col justify-center px-4">
                      {/* 23 blocks in a serpentine flow */}
                      <div className="flex flex-wrap gap-2">
                         {[...Array(23)].map((_, i) => (
                            <motion.div 
                               key={i}
                               initial={{ opacity: 0, scale: 0.5 }}
                               animate={{ opacity: 1, scale: 1 }}
                               transition={{ delay: 0.5 + i * 0.05, duration: 0.2 }}
                               className="w-12 h-6 border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] flex items-center justify-center deck-mono text-[6px] text-[color:var(--cream)]"
                            >
                               {i < 5 ? 'DAT' : i < 8 ? 'NCA' : i < 15 ? 'PPK' : i < 19 ? 'E-R' : i < 22 ? 'REG' : 'ADT'}
                            </motion.div>
                         ))}
                      </div>
                   </div>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-LEFT: Verification Terminal */}
             <div className={zoomedId && zoomedId !== 'bl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="bl" label="INTEGRITY CHECK" metadata="[verify_chain_integrity]" onZoom={handleZoom} isZoomed={zoomedId === 'bl'}>
                   <div className="w-full h-full bg-[#0a0a0a] border border-[#333] p-4 font-mono text-[10px] xl:text-xs text-[#0f0] flex flex-col gap-1 rounded-sm shadow-inner overflow-hidden">
                      <div>$ verify_chain_integrity(program_X_2026)</div>
                      {terminalStep >= 1 && <div className="text-[#888]">→ Checking 23 entries across 6 domains...</div>}
                      {terminalStep >= 2 && <div className="text-[#888]">→ Validating SHA-256 prev_hash linkages...</div>}
                      {terminalStep >= 3 && <div className="text-[#888]">→ No mutations detected.</div>}
                      {terminalStep >= 4 && (
                         <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className="text-[color:var(--case-sage)] font-bold mt-2 text-sm drop-shadow-[0_0_5px_var(--case-sage)]"
                         >
                            → Result: True
                         </motion.div>
                      )}
                      <motion.div 
                         initial={{ opacity: 1 }}
                         animate={{ opacity: [1, 0] }} transition={{ repeat: Infinity, duration: 0.8 }}
                         className="w-2 h-4 bg-[#0f0] mt-1"
                      />
                   </div>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-RIGHT: Regulator Replay Card */}
             <div className={zoomedId && zoomedId !== 'br' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="br" label="REPLAY CAPABILITY" metadata="[2034 REVIEW]" onZoom={handleZoom} isZoomed={zoomedId === 'br'}>
                   <div className="w-full h-full flex flex-col items-center justify-center bg-[color:var(--bg)] border border-[color:var(--cream-hairline)] p-4 shadow-xl relative">
                      <div className="deck-mono text-xs text-[color:var(--cream)] border-b border-[color:var(--cream-hairline)] pb-2 mb-4 w-full text-center">
                         Reviewing: <span className="text-[color:var(--case)]">program_X_2026</span>
                      </div>
                      
                      <div className="flex gap-2 w-full justify-center mb-6">
                         <div className="deck-mono text-[9px] border border-[color:var(--case)] text-[color:var(--case)] px-3 py-2 cursor-pointer hover:bg-[color-mix(in_srgb,var(--case)_20%,transparent)] transition-colors">Replay Trace</div>
                         <div className="deck-mono text-[9px] border border-[color:var(--case)] text-[color:var(--case)] px-3 py-2 cursor-pointer hover:bg-[color-mix(in_srgb,var(--case)_20%,transparent)] transition-colors">Inspect Hash</div>
                         <div className="deck-mono text-[9px] border border-[color:var(--case)] text-[color:var(--case)] px-3 py-2 cursor-pointer hover:bg-[color-mix(in_srgb,var(--case)_20%,transparent)] transition-colors">Verify Chain</div>
                      </div>

                      <div className="deck-mono text-[9px] text-[color:var(--cream-muted)] mb-1">23 entries · 6 domains · pinned versions</div>
                      <div className="deck-body text-xs text-[color:var(--cream)] font-bold italic">Reproducible to bit-exact output</div>
                   </div>
                </ZoomablePanel>
             </div>
          </DashboardGrid>
       </div>

       <WithWithoutPair
         withoutText="Audit chains exist per-tool, per-domain. End-to-end provenance requires manual reconstruction."
         withText="One chain across all six domains. End-to-end provenance verifiable in two function calls."
         delay={1.0}
       />

       <TakeHomeStrip 
          text="One chain across all six domains. One verify call. One source of truth." 
          subLine="Regulator-replayable. ICH M15 reproducibility, foundation-level."
          caseColor="cyan" 
       />
    </SlideFrame>
  );
}
