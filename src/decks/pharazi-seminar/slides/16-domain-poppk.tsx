import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';

const EASE = [0.16, 1, 0.3, 1];

const parameters = [
  { param: "CL/F", est: "1.17", unit: "L/h", rse: "6.33", highlight: true },
  { param: "Vc/F", est: "12.3", unit: "L", rse: "16.1", highlight: true },
  { param: "Q/F", est: "0.457", unit: "L/h", rse: "21.1", highlight: false },
  { param: "Vp/F", est: "81.3", unit: "L", rse: "24.5", highlight: false },
  { param: "Ka", est: "2.46", unit: "1/h", rse: "25.7", highlight: false },
  { param: "tlag", est: "0.525", unit: "h", rse: "14.7", highlight: false },
  { param: "Allom.", est: "0.75 / 1.0", unit: "fixed", rse: "—", highlight: false }
];

const covariates = [
  "Age", "Sex", "Race", "WHO FC", "Baseline 6MWD", "NT-proBNP", "Hepatic Fn", "Renal Fn"
];

import { DashboardGrid } from '@/components/showcase/DashboardGrid';
import { ZoomablePanel } from '@/components/showcase/ZoomablePanel';

export default function Domain3Slide() {
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
    <SlideFrame slideId="16" dataCase="amber" footerKicker="16 · THE DOMAINS">
       


       <PrincipleTitleBlock
         counter="DOMAIN 3 OF 6 · POPULATION PK"
         name="Population Pharmacokinetics"
         definition="NONMEM-bridged model fitting with cross-department QC debate. Validation gate two: within 5% of NONMEM."
       />

       <div className="w-full flex-1 relative flex flex-col z-10 px-12 pb-4">
          
          <DashboardGrid zoomedId={zoomedId}>
             
             {/* TOP-LEFT: Structural Model */}
             <div className={zoomedId && zoomedId !== 'tl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tl" label="STRUCTURAL MODEL" metadata="[2-CMT]" onZoom={handleZoom} isZoomed={zoomedId === 'tl'}>
                   <div className="flex flex-col items-center justify-center w-full h-full gap-4">
                      <div className="flex items-center gap-8 relative mt-4">
                         {/* Dose -> Ka -> Vc */}
                         <div className="flex flex-col items-center">
                            <div className="deck-mono text-xs text-[color:var(--cream-muted)]">DOSE</div>
                            <div className="h-4 w-[1px] bg-[color:var(--cream-muted)]" />
                            <div className="w-16 h-8 border border-[color:var(--cream-hairline)] flex items-center justify-center deck-mono text-xs">Ka</div>
                            <div className="h-4 w-[1px] bg-[color:var(--cream-muted)]" />
                            <div className="text-[14px]">↓</div>
                         </div>
                         <div className="w-20 h-20 rounded-full border-2 border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] flex items-center justify-center deck-display text-xl">Vc/F</div>
                         <div className="flex items-center">
                            <div className="deck-mono text-xs text-[color:var(--cream-muted)] px-2">↔ Q/F</div>
                         </div>
                         <div className="w-20 h-20 rounded-full border-2 border-[color:var(--cream-hairline)] border-dashed flex items-center justify-center deck-display text-xl text-[color:var(--cream-muted)]">Vp/F</div>
                      </div>
                      <div className="w-[1px] h-6 bg-[color:var(--cream-muted)] relative left-[-20px]" />
                      <div className="deck-mono text-xs text-[color:var(--case-coral)] relative left-[-20px]">↓ CL/F</div>

                      <div className="mt-4 border border-[color:var(--cream-hairline)] bg-[color:var(--bg-elevated)] px-4 py-2 flex gap-4">
                         <div className="deck-mono text-xs uppercase tracking-widest text-[color:var(--case)]">ALLOMETRY · FIXED</div>
                         <div className="deck-mono text-xs">CL, Q ∝ WT^0.75 · Vc, Vp ∝ WT^1.0</div>
                      </div>
                   </div>
                </ZoomablePanel>
             </div>

             {/* TOP-RIGHT: Parameter Estimates */}
             <div className={zoomedId && zoomedId !== 'tr' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="tr" label="PARAMETER ESTIMATES" metadata="[CL/F, Vc/F]" onZoom={handleZoom} isZoomed={zoomedId === 'tr'}>
                   <table className="w-full text-left deck-mono text-xs xl:text-sm">
                      <thead>
                         <tr className="border-b border-[color:var(--cream-hairline)] text-[color:var(--cream-muted)]">
                            <th className="pb-2 font-normal">PARAMETER</th>
                            <th className="pb-2 font-normal">ESTIMATE</th>
                            <th className="pb-2 font-normal">UNIT</th>
                            <th className="pb-2 font-normal">%RSE</th>
                         </tr>
                      </thead>
                      <tbody>
                         {parameters.map((p, i) => (
                            <tr key={i} className={`border-b border-[color:var(--bg-elevated)] ${p.highlight ? 'text-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)]' : 'text-[color:var(--cream)]'}`}>
                               <td className="py-1">{p.param}</td>
                               <td className="py-1">{p.est}</td>
                               <td className="py-1 text-[color:var(--cream-muted)]">{p.unit}</td>
                               <td className="py-1 text-[color:var(--cream-muted)]">{p.rse}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-LEFT: pcVPC */}
             <div className={zoomedId && zoomedId !== 'bl' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="bl" label="pcVPC" metadata="[500 replicates]" onZoom={handleZoom} isZoomed={zoomedId === 'bl'}>
                   <div className="w-full h-full relative p-4 flex flex-col">
                      <div className="flex-1 relative border-l border-b border-[color:var(--cream-hairline)]">
                         {/* Faux VPC Plot */}
                         <div className="absolute inset-y-4 inset-x-2 bg-[color-mix(in_srgb,var(--case-cyan)_10%,transparent)]" />
                         <svg className="w-full h-full absolute inset-0" preserveAspectRatio="none" viewBox="0 0 100 100">
                            {/* Median Line */}
                            <path d="M 0 20 Q 20 40, 40 70 T 100 95" fill="none" stroke="var(--case-cyan)" strokeWidth="2" />
                            {/* Observed dots */}
                            {[...Array(20)].map((_, i) => (
                               <circle key={i} cx={5 + i*4.5 + Math.random()*2} cy={20 + i*3 + Math.random()*20} r="1" fill="var(--cream)" />
                            ))}
                         </svg>
                         <div className="absolute bottom-[-16px] left-0 right-0 flex justify-between deck-mono text-[8px] text-[color:var(--cream-muted)]">
                            <span>2</span><span>10</span><span>20</span><span>30 h</span>
                         </div>
                         <div className="absolute top-0 bottom-0 left-[-24px] flex flex-col justify-between deck-mono text-[8px] text-[color:var(--cream-muted)]">
                            <span>3k</span><span>300</span><span>30</span>
                         </div>
                      </div>
                   </div>
                </ZoomablePanel>
             </div>

             {/* BOTTOM-RIGHT: Workflow Diamond */}
             <div className={zoomedId && zoomedId !== 'br' ? 'opacity-0 pointer-events-none' : ''}>
                <ZoomablePanel id="br" label="WORKFLOW" metadata="[NONMEM]" onZoom={handleZoom} isZoomed={zoomedId === 'br'}>
                   <div className="w-full h-full flex flex-col items-center justify-center gap-2 mt-2">
                      <div className="border border-[color:var(--cream-hairline)] px-4 py-2 deck-mono text-xs bg-[color:var(--bg-elevated)]">01 BUILD (ADULT FOUNDATION)</div>
                      <div className="text-xs text-[color:var(--cream-muted)]">↓</div>
                      
                      <div className="w-16 h-16 border border-[color:var(--case-amber)] rotate-45 flex items-center justify-center bg-[color-mix(in_srgb,var(--case-amber)_10%,transparent)]">
                         <div className="-rotate-45 deck-mono text-xs text-[color:var(--case-amber)]">02 pcVPC</div>
                      </div>

                      <div className="flex w-full justify-center gap-12 mt-2">
                         <div className="flex flex-col items-center">
                            <div className="text-xs text-[color:var(--cream-muted)] mb-1">NO</div>
                            <div className="border border-[color:var(--cream-hairline)] border-dashed px-3 py-1.5 deck-mono text-[10px] text-[color:var(--cream-muted)]">RECONSIDER</div>
                         </div>
                         <div className="flex flex-col items-center">
                            <div className="text-[10px] text-[color:var(--case)] mb-1">YES</div>
                            <div className="border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_20%,transparent)] px-2 py-1 deck-mono text-[9px] text-[color:var(--case)] flex items-center gap-1">
                               <span>03 FIT (PEDIATRIC)</span> <span>✓</span>
                            </div>
                         </div>
                      </div>
                   </div>
                </ZoomablePanel>
             </div>
          </DashboardGrid>

          {/* BOTTOM RIBBON */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.2, duration: 0.8, ease: EASE }}
             className="w-full border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md px-4 py-3 flex items-center justify-between"
          >
             <div className="flex items-center gap-4">
                <div className="deck-mono text-xs uppercase tracking-widest text-[color:var(--cream-muted)]">FULL COVARIATE MODEL · 12 PRESPECIFIED</div>
                <div className="flex gap-2">
                   {covariates.map((c, i) => (
                      <motion.div 
                         key={c}
                         initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 2.5 + i * 0.05 }}
                         className="deck-mono text-[10px] border border-[color:var(--bg-elevated)] px-2 py-1 text-[color:var(--cream-muted)] bg-[color-mix(in_srgb,var(--bg)_50%,transparent)]"
                      >
                         <span className="text-[color:var(--case-coral)] mr-1">×</span>{c}
                      </motion.div>
                   ))}
                </div>
             </div>
             <motion.div 
                initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 3.5, type: 'spring' }}
                className="deck-mono text-xs border border-[color:var(--case)] px-3 py-1 text-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_20%,transparent)] shadow-[0_0_20px_var(--case)]"
             >
                RETAINED: ALLOMETRIC WT
             </motion.div>
          </motion.div>

       </div>

       <WithWithoutPair
         withoutText="PopPK runs reviewed by one person, often after the fact. Errors found late or never."
         withText="Cross-department QC challenges every fit before it lands. Errors caught at the model boundary."
         delay={4.0}
       />

       <TakeHomeStrip 
          text="PopPK · 7 steps, NONMEM-bridged, cross-department QC, audit-recorded." 
          subLine="Validation gate 2: OFV within 3.1% of NONMEM. Allometric WT only."
          caseColor="amber" 
       />
    </SlideFrame>
  );
}
