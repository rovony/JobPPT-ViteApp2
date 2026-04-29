import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import { BrowserFrame } from '@/components/showcase/BrowserFrame';
import EcosystemGrid from '@/components/showcase/EcosystemGrid';
import { QRCodeSVG } from 'qrcode.react';

const EASE = [0.16, 1, 0.3, 1];

export default function CloseSlide() {
  const D = {
    eyebrow:           0.20,
    manuscriptTitle:   0.40,
    authorByline:      1.00,
    hairlineRow1:      1.30,
    journalBlock:      1.50,
    windowFrame:       0.40,
    iframeLoad:        0.80,
    deployedBadge:     1.20,
    qrPrompt:          1.50,
    statusBlock:       1.80,
    builtInNMarker:    2.20,
    ecosystemGrid_frame: 2.50,
    ecosystemCells:     2.70,
    contributorsBanner: 3.40,
  };

  return (
    <SlideFrame slideId="20" dataCase="amber" footerKicker="20 · THE CLOSE">
       <div className="w-full h-full relative flex flex-col z-10 px-16 pt-4 pb-16 justify-between">
          
          {/* ROW 1: Editorial Publication Banner (~30%) */}
          <div className="flex flex-col border-b border-[color:var(--cream-hairline)] pb-6 mb-6">
             <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D.eyebrow }} className="deck-mono text-[10px] tracking-widest uppercase text-[color:var(--case)] mb-4">
                MANUSCRIPT IN PREPARATION · APR 2026
             </motion.div>
             
             <div className="overflow-hidden mb-4">
                <motion.h1 
                   initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: D.manuscriptTitle, duration: 1.0, ease: EASE }}
                   className="deck-display text-4xl leading-[1.15] text-[color:var(--cream)] font-semibold"
                >
                   Pharazi: A Centralized Multi-Agent Reference Architecture for Pharmaceutical Sciences with Structural Privacy and Cryptographic Audit
                </motion.h1>
             </div>

             <div className="flex justify-between items-end">
                 <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D.authorByline }}>
                    <div className="deck-body text-xl text-[color:var(--cream)]">Malek Okour, PharmD, PhD</div>
                    <div className="deck-mono text-xs text-[color:var(--cream-muted)] mt-1 tracking-widest uppercase">Senior author · corresponding</div>
                 </motion.div>
                 
                 <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D.journalBlock, duration: 0.8 }} className="text-right border-l border-[color:var(--cream-hairline)] pl-6">
                    <div className="deck-body text-lg text-[color:var(--cream)] italic">CPT: Pharmacometrics & Systems Pharmacology</div>
                    <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] uppercase tracking-widest mt-1 max-w-xs ml-auto leading-relaxed">
                       Special Collection: Transformative Approaches in AI for Pharmacometrics<br/>
                       <span className="text-[color:var(--case)]">Submission target: Q3 2026</span>
                    </div>
                 </motion.div>
             </div>
          </div>

          {/* ROW 2: Live Window + Status (~40%) */}
          <div className="flex gap-16 mb-8 flex-1">
             {/* Left 50%: Browser + QR */}
             <div className="w-1/2 flex items-center gap-6">
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: D.windowFrame, duration: 0.8, ease: EASE }} className="w-2/3 h-[240px] relative">
                   <BrowserFrame url="pharazi.ai" />
                   <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: D.deployedBadge }} className="absolute -top-3 -right-3 z-50">
                      <div className="bg-[color:var(--case)] text-[color:var(--bg)] deck-mono text-[10px] font-bold px-3 py-1 rounded shadow-[0_0_15px_rgba(var(--case-rgb),0.6)]">
                         DEPLOYED · LIVE
                      </div>
                   </motion.div>
                </motion.div>
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D.qrPrompt }} className="w-1/3 flex flex-col items-center gap-3">
                   <div className="p-2 bg-white rounded">
                      <QRCodeSVG value="https://pharazi.ai" size={80} />
                   </div>
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] uppercase tracking-widest text-center">
                      Open on your phone now:<br/>
                      <span className="text-[color:var(--case)]">pharazi.ai</span>
                   </div>
                </motion.div>
             </div>

             {/* Right 50%: Status Block */}
             <div className="w-1/2 flex flex-col justify-center gap-4">
                <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: D.statusBlock, duration: 0.6 }} className="flex flex-col gap-3 deck-mono text-sm tracking-widest uppercase">
                   <div className="flex items-center gap-4">
                      <span className="w-28 text-[color:var(--cream-muted)]">MANUSCRIPT</span>
                      <span className="text-[color:var(--case)] tracking-[0.3em]">●●●○○</span>
                      <span className="text-[color:var(--cream)] italic ml-2">drafting</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="w-28 text-[color:var(--cream-muted)]">VALIDATION</span>
                      <span className="text-[color:var(--case)] tracking-[0.3em]">●●○○○</span>
                      <span className="text-[color:var(--cream)] italic ml-2">gates 1-2</span>
                   </div>
                   <div className="flex items-center gap-4">
                      <span className="w-28 text-[color:var(--cream-muted)]">REPRO PKG</span>
                      <span className="text-[color:var(--case)] tracking-[0.3em]">●●●●○</span>
                      <span className="text-[color:var(--cream)] italic ml-2">near complete</span>
                   </div>
                </motion.div>
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: D.builtInNMarker }} className="mt-4 pt-4 border-t border-[color:var(--cream-hairline)] deck-mono text-xs text-[color:var(--ink-secondary)]">
                   First commit: 14 Aug 2025 · Current: 119 tools · 47K+ lines
                </motion.div>
             </div>
          </div>

          {/* ROW 3: Ecosystem Grid (~30%) */}
          <div className="flex flex-col h-auto">
             <EcosystemGrid delay={D.ecosystemCells} />
             
             <motion.div 
                initial={{ opacity: 0, y: 10 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ delay: D.contributorsBanner, duration: 0.8 }} 
                className="mt-8 text-center"
             >
                <div className="deck-display text-2xl italic text-[color:var(--case)] tracking-wide shadow-[0_0_20px_rgba(var(--case-rgb),0.3)] inline-block">
                   OPEN SOURCE · CONTRIBUTORS WELCOME
                </div>
                <div className="deck-mono text-xs text-[color:var(--ink-secondary)] mt-2">
                   github.com/pharazi · clinpharm.ai/contribute
                </div>
             </motion.div>
          </div>

       </div>
    </SlideFrame>
  );
}
