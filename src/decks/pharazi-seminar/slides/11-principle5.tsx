import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import { Hierarchy3D } from '@/components/showcase/Hierarchy3D';

export default function Principle5Slide() {
  const EASE = [0.16, 1, 0.3, 1];
  const SPRING = { type: 'spring', bounce: 0.4, duration: 0.8 };

  const act1Boxes = ['NCA', 'PopPK', 'PKPD', 'E-R', 'QC'];
  const act2Boxes = ['Signal Detection', 'Biomarker', 'MIPD', 'Pharmacogenomics'];
  const act3Boxes = ['Trial Design', 'RWE', 'Reg-Author', 'Lifecycle'];

  const prefersReducedMotion = useReducedMotion();
  const [step, setStep] = React.useState(0);

  // Auto-advance step for 3D demo
  React.useEffect(() => {
    const timer1 = setTimeout(() => setStep(1), 8000);
    const timer2 = setTimeout(() => setStep(2), 16000);
    return () => { clearTimeout(timer1); clearTimeout(timer2); };
  }, []);

  return (
    <SlideFrame slideId="11" dataCase="violet" footerKicker="11 · THE ARCHITECTURE">
       <PrincipleTitleBlock
         counter="PRINCIPLE 5 OF 5 · SCALABILITY"
         name="Orthogonal Layering"
         definition="Domain experts multiply; shared infrastructure does not. The system scales by registering, not by rebuilding."
       />

       <div className="w-full flex-1 relative flex flex-col justify-end z-10">
          
          <div className="flex-1 relative flex flex-col items-center justify-end w-full max-w-6xl mx-auto px-12">
             
             {/* EXPERT BOXES CONTAINER */}
             {/* ESCALATION: Pure CSS 3D Hierarchy chosen to represent the Z-axis stack of domain experts. Fallback is the original Framer Motion 2D layout. */}
             <div className="relative w-full h-[320px] mb-8">
                
                {!prefersReducedMotion ? (
                  <div className="absolute inset-0 z-20" style={{ transform: 'scale(0.8)', transformOrigin: 'bottom center' }}>
                     <Hierarchy3D step={step} />
                  </div>
                ) : (
                  <>
                  {/* ACT 1: Built today */}
                  <div className="absolute bottom-0 w-full flex justify-between px-4 z-10">
                   {act1Boxes.map((b, i) => (
                      <motion.div 
                         key={b}
                         initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.12, duration: 0.8, ease: EASE }}
                         className="relative w-36 h-20 border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-md flex items-center justify-center deck-mono text-sm text-[color:var(--cream)] text-center px-2"
                      >
                         {b}
                         <motion.div initial={{ height: 0 }} animate={{ height: 32 }} transition={{ delay: 1.8, duration: 0.8, ease: EASE }} className="absolute -bottom-8 left-1/2 w-[2px] bg-[color:var(--cream-hairline)]" />
                      </motion.div>
                   ))}
                </div>

                {/* ACT 2: Additive 1 */}
                <div className="absolute bottom-[104px] w-full flex justify-around px-16 z-20 pointer-events-none">
                   {act2Boxes.map((b, i) => (
                      <motion.div 
                         key={b}
                         initial={{ opacity: 0, scale: 0.8, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 8.0 + i * 0.15, ...SPRING }}
                         className="relative w-36 h-20 border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] backdrop-blur-md flex items-center justify-center deck-mono text-sm text-[color:var(--case)] text-center px-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      >
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 9.0 }} className="absolute -top-3 -right-3 bg-[color:var(--case)] text-[color:var(--bg)] deck-mono text-[9px] font-bold px-2 py-1 rounded-sm">+ NEW</motion.div>
                         {b}
                         <motion.div initial={{ height: 0 }} animate={{ height: 104 }} transition={{ delay: 8.7, duration: 0.8, ease: EASE }} className="absolute -bottom-[104px] left-1/2 w-[1px] bg-[color:var(--case)] origin-top z-[-1]" />
                      </motion.div>
                   ))}
                </div>

                {/* ACT 3: Additive 2 */}
                <div className="absolute bottom-[208px] w-full flex justify-around px-8 z-30 pointer-events-none">
                   {act3Boxes.map((b, i) => (
                      <motion.div 
                         key={b}
                         initial={{ opacity: 0, scale: 0.8, y: 40 }} animate={{ opacity: 1, scale: 1, y: 0 }} transition={{ delay: 16.0 + i * 0.15, ...SPRING }}
                         className="relative w-36 h-20 border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] backdrop-blur-md flex items-center justify-center deck-mono text-sm text-[color:var(--case)] text-center px-2 shadow-[0_10px_30px_rgba(0,0,0,0.5)]"
                      >
                         <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 17.0 }} className="absolute -top-3 -right-3 bg-[color:var(--case)] text-[color:var(--bg)] deck-mono text-[9px] font-bold px-2 py-1 rounded-sm">+ NEW</motion.div>
                         {b}
                         <motion.div initial={{ height: 0 }} animate={{ height: 208 }} transition={{ delay: 16.7, duration: 0.8, ease: EASE }} className="absolute -bottom-[208px] left-1/2 w-[1px] bg-[color:var(--case)] origin-top z-[-1]" />
                      </motion.div>
                   ))}
                </div>

                {/* THE BIG REVEAL OVERLAY */}
                <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 24.0, duration: 0.8 }}
                   className="absolute inset-[-40px] bg-[color-mix(in_srgb,var(--bg)_85%,transparent)] backdrop-blur-md z-40 flex flex-col items-center justify-center pointer-events-none"
                >
                   <div className="overflow-hidden mb-4">
                      <motion.div initial={{ y: '100%' }} animate={{ y: 0 }} transition={{ delay: 24.5, duration: 1.0, type: 'spring', bounce: 0.3 }} className="deck-display text-[64px] italic text-[color:var(--cream)] font-medium">
                         THE SHARED LAYER NEVER CHANGES.
                      </motion.div>
                   </div>
                   <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 26.0, duration: 0.8, ease: EASE }} className="deck-display text-[42px] text-[color:var(--cream-muted)]">
                      ONLY THE DOMAIN EXPERTS MULTIPLY.
                   </motion.div>
                </motion.div>
                </>
              )}
             </div>

             {/* SHARED INFRASTRUCTURE BAND */}
             <motion.div 
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 2.0, duration: 1.0, ease: EASE }}
                className="w-full h-[120px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-0"
             >
                {/* B8 Glow triggered at 165.5s (simulated here at 27.5s) */}
                <motion.div 
                   initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: 27.5, duration: 2.0, ease: "easeInOut" }}
                   className="absolute inset-0 bg-[color-mix(in_srgb,var(--case)_20%,transparent)] shadow-[inset_0_0_50px_var(--case)]"
                />

                <div className="deck-mono text-sm tracking-[0.2em] uppercase text-[color:var(--case)] mb-3 relative z-10">
                   SHARED INFRASTRUCTURE
                </div>
                <div className="deck-body text-base xl:text-lg text-[color:var(--cream-muted)] max-w-5xl text-center leading-relaxed relative z-10">
                   Schema Extractor · Audit Chain · QC Debate · Manager Review · Regulatory RAG · Report Generator · HITL Gate · State Bus
                </div>
             </motion.div>
          </div>
       </div>

       <WithWithoutPair
         withoutText="Each new domain rebuilds infrastructure from scratch. Six to eighteen months per domain."
         withText="New domains register; shared utilities apply automatically. Days, not months."
         delay={28.0}
       />

       <TakeHomeStrip 
          text="Pharazi does not scale by rebuilding. It scales by registering." 
          subLine="Phase 1 → 2 → 3, additive only. Same hierarchy, same privacy, same audit."
          caseColor="violet" 
       />
    </SlideFrame>
  );
}
