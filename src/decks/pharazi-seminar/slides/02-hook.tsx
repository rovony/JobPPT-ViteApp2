import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';

const EASE = [0.16, 1, 0.3, 1];

export default function HookSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="CONTEXT · THE 50-WORD FRAME"
      headline={
        <>
          Twelve years of pharmacometrics → <span className="italic" style={{ color: 'var(--case)' }}>one</span> substrate
        </>
      }
      subhead="This isn't just about building models faster. It's about containing the 17x error amplification trap inherent in multi-agent systems."
      footerKicker="02 · CONTEXT"
      footerTagline="The problem space defined."
      footerSource="Source · DeepMind 'Towards a Science of Scaling Agent Systems' 2025"
    >
      <div className="w-full h-full flex items-center justify-center pt-8 pb-12">
         {/* Container for choreographed flowchart */}
         <div className="flex items-center justify-center gap-10 relative w-full max-w-[1200px]">
            
            {/* Leftmost: 12 Years */}
            <motion.div 
               initial={{ opacity: 0, x: -30 }} 
               animate={{ opacity: 1, x: 0 }} 
               transition={{ duration: 1.2, delay: 0.4, ease: EASE }} 
               className="flex flex-col items-end border-r border-[color:var(--cream-hairline)] pr-10 py-2 shrink-0"
            >
               <div className="deck-display text-[8rem] xl:text-[9rem] leading-[0.8] text-[color:var(--cream)] tracking-tighter">
                  <IntegerTicker from={0} to={12} duration={1.5} delay={0.6} />
               </div>
               <div className="deck-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--cream-muted)] mt-6">Years in Clinic</div>
            </motion.div>

            {/* Middle: 3 Fragmented Nodes */}
            <div className="flex flex-col gap-6 relative z-10 shrink-0">
               <Node title="PopPK Models" count={65} delay={0.8} />
               <Node title="PKPD Frameworks" count={82} delay={1.0} />
               <Node title="E-R Submissions" count={33} delay={1.2} />
               
               {/* 180+ label underneath */}
               <motion.div 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  transition={{ duration: 1.0, delay: 1.6 }} 
                  className="absolute -bottom-8 right-0 text-right"
               >
                  <span className="deck-mono text-[10px] uppercase text-[color:var(--cream-muted)] tracking-widest">180+ Total Models</span>
               </motion.div>
            </div>

            {/* SVG Connecting Lines spanning gap */}
            <div className="w-[180px] h-[288px] relative shrink-0">
               <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
                  {/* C6 Path-Drawing Reveal (Solid Lines to avoid dasharray conflict) */}
                  <motion.path 
                     initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                     transition={{ duration: 1.5, delay: 1.4, ease: EASE }}
                     d="M 0 40 C 90 40, 90 144, 180 144" 
                     fill="none" stroke="var(--cream-hairline)" strokeWidth="1.5"
                  />
                  <motion.path 
                     initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                     transition={{ duration: 1.5, delay: 1.5, ease: EASE }}
                     d="M 0 144 L 180 144" 
                     fill="none" stroke="var(--cream-hairline)" strokeWidth="1.5"
                  />
                  <motion.path 
                     initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} 
                     transition={{ duration: 1.5, delay: 1.6, ease: EASE }}
                     d="M 0 248 C 90 248, 90 144, 180 144" 
                     fill="none" stroke="var(--cream-hairline)" strokeWidth="1.5"
                  />

                  {/* Terminal Point Glow */}
                  <motion.circle r={0} initial={{ opacity: 0, r: 0 }} animate={{ opacity: 1, r: 4 }} transition={{ delay: 1.8 }} cx="180" cy="144" fill="var(--case)" />
               </svg>

               {/* C8 Continuous-Loop Particles (Moved outside SVG to avoid offsetDistance warning) */}
               <style>{`
                 @keyframes particleFloat {
                   0% { offset-distance: 0%; opacity: 0; }
                   20% { opacity: 1; }
                   80% { opacity: 1; }
                   100% { offset-distance: 100%; opacity: 0; }
                 }
               `}</style>
               <div 
                  className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
                  style={{ 
                    offsetPath: 'path("M 0 40 C 90 40, 90 144, 180 144")',
                    animation: 'particleFloat 3.0s linear 2.0s infinite both'
                  }}
               />
               <div 
                  className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
                  style={{ 
                    offsetPath: 'path("M 0 144 L 180 144")',
                    animation: 'particleFloat 3.0s linear 2.8s infinite both'
                  }}
               />
               <div 
                  className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
                  style={{ 
                    offsetPath: 'path("M 0 248 C 90 248, 90 144, 180 144")',
                    animation: 'particleFloat 3.0s linear 2.4s infinite both'
                  }}
               />
            </div>

            {/* Right: 1 Substrate (C9 Pulsing Outcome Node + B7 Glassmorphism) */}
            <motion.div 
               initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', x: 20 }}
               animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
               transition={{ duration: 1.2, delay: 2.0, ease: EASE }}
               className="w-[340px] flex flex-col justify-center p-12 border border-[color:var(--case)] backdrop-blur-xl relative overflow-hidden shrink-0"
               style={{ 
                  background: 'color-mix(in srgb, var(--case) 8%, transparent)',
                  boxShadow: '0 0 60px color-mix(in srgb, var(--case) 15%, transparent)'
               }}
            >
               <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--case)_15%,transparent)] to-transparent" />
               <div className="relative z-10 flex flex-col gap-6">
                  <div className="deck-display text-[9rem] text-[color:var(--case)] leading-none tracking-tighter drop-shadow-xl">
                     <IntegerTicker from={0} to={1} duration={1.0} delay={2.2} />
                  </div>
                  <div>
                     <div className="deck-mono text-xs tracking-widest uppercase text-[color:var(--case)] mb-4">The Substrate</div>
                     <div className="deck-body text-[1.05rem] text-[color:var(--cream)] font-medium leading-[1.65]">
                        A centralized, deterministic orchestration engine. 21 CFR Part 11 compliant. Hash-anchored execution.
                     </div>
                  </div>
               </div>
               
               {/* C9 Pulsing Outcome Node (Breathing Box-Shadow/Radial Glow) */}
               <motion.div 
                 initial={{ opacity: 0 }} animate={{ opacity: [0, 0.5, 0] }} transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
                 className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--case)_40%,transparent),transparent_70%)] pointer-events-none"
               />
               <motion.div 
                 initial={{ y: '-100%' }} animate={{ y: '300%' }} transition={{ duration: 3, repeat: Infinity, ease: 'linear' }} 
                 className="absolute inset-0 h-[30px] bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--case)_40%,transparent)] to-transparent pointer-events-none" 
               />
            </motion.div>

         </div>
      </div>
    </SlideFrame>
  );
}

function Node({ title, count, delay }) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: EASE }}
      className="w-[260px] h-[80px] px-6 border border-[color:var(--cream-hairline)] border-l-4 border-l-[color:var(--cream-muted)] backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] flex items-center justify-between shadow-lg"
    >
       <div className="deck-mono text-[0.7rem] uppercase tracking-widest text-[color:var(--cream-muted)]">{title}</div>
       <div className="deck-display text-[2.5rem] font-medium text-[color:var(--cream)] leading-none pt-1">
          <IntegerTicker from={0} to={count} duration={1.5} delay={delay + 0.2} />
       </div>
    </motion.div>
  );
}
