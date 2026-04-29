import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import PrincipleTitleBlock from '@/components/deck/PrincipleTitleBlock';
import WithWithoutPair from '@/components/deck/WithWithoutPair';
import { BorderBeam } from '@/components/magicui/border-beam';
import { NumberTicker } from '@/components/magicui/number-ticker';

const EASE = [0.16, 1, 0.3, 1];

export default function Domain2Slide() {
  return (
    <SlideFrame slideId="15" dataCase="violet" footerKicker="15 · THE DOMAINS">
       <PrincipleTitleBlock
         counter="DOMAIN 2 OF 6 · NON-COMPARTMENTAL"
         name="NCA"
         definition="Routing, calculation, light QC, audit — under one second of human time per analysis."
       />

       <div className="w-full flex-1 relative flex items-center justify-center pt-2 pb-4 z-10 px-24">
          
          <div className="w-full max-w-5xl h-[360px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_60%,transparent)] backdrop-blur-xl relative overflow-hidden flex items-end rounded-xl shadow-[0_20px_60px_rgba(0,0,0,0.5)]">
             <BorderBeam size={300} duration={8} colorFrom="var(--case-violet)" colorTo="transparent" />
             
             {/* Data Flow SVG */}
             <svg className="w-full h-full" viewBox="0 0 1000 360">
                {/* Axes */}
                <motion.line initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ delay: 0.5, duration: 1 }} x1="100" y1="280" x2="900" y2="280" stroke="var(--cream-hairline)" strokeWidth="2" style={{ originX: 0 }} />
                <motion.line initial={{ scaleY: 0 }} animate={{ scaleY: 1 }} transition={{ delay: 0.5, duration: 1 }} x1="100" y1="280" x2="100" y2="60" stroke="var(--cream-hairline)" strokeWidth="2" style={{ originY: 1 }} />
                
                {/* The PK Curve */}
                <motion.path 
                   initial={{ pathLength: 0 }} 
                   animate={{ pathLength: 1 }} 
                   transition={{ delay: 1.5, duration: 2.0, ease: "easeOut" }}
                   d="M 100 280 C 150 280, 200 90, 300 90 C 400 90, 500 200, 800 260" 
                   fill="none" stroke="var(--case)" strokeWidth="4" 
                   style={{ filter: 'drop-shadow(0 0 10px var(--case))' }}
                />

                {/* Simulated Raw Data Points */}
                {[
                   {x: 120, y: 275}, {x: 160, y: 230}, {x: 210, y: 140}, {x: 250, y: 100},
                   {x: 300, y: 85}, {x: 350, y: 95}, {x: 420, y: 130}, {x: 550, y: 210},
                   {x: 700, y: 245}, {x: 820, y: 265}
                ].map((pt, i) => (
                   <motion.circle 
                      key={i} cx={pt.x} cy={pt.y} r={4} fill="var(--case-amber)"
                      initial={{ scale: 0, opacity: 0, r: 4 }}
                      animate={{ scale: 1, opacity: 1, r: 4 }}
                      transition={{ delay: 1.0 + (i * 0.1), type: 'spring' }}
                   />
                ))}

                {/* Cmax crosshair */}
                <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} x1="100" y1="85" x2="300" y2="85" stroke="var(--cream-muted)" strokeDasharray="4,4" />
                <motion.line initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.8 }} x1="300" y1="85" x2="300" y2="280" stroke="var(--cream-muted)" strokeDasharray="4,4" />
             </svg>

             {/* Dynamic Metrics */}
             <motion.div 
               initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 4.2 }}
               className="absolute top-8 right-8 bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] border border-[color:var(--cream-hairline)] p-4 rounded-lg deck-mono text-xs shadow-2xl backdrop-blur-md"
             >
                <div className="text-[color:var(--case)] mb-3 font-bold tracking-widest border-b border-[color:var(--cream-hairline)] pb-2 text-sm">NCA AGENT OUTPUT</div>
                <div className="flex justify-between w-40 mb-2">
                   <span className="text-[color:var(--cream-muted)]">Cmax</span>
                   <span className="text-[color:var(--cream)]"><NumberTicker value={24.5} decimalPlaces={1} delay={4.2} /> mg/L</span>
                </div>
                <div className="flex justify-between w-40 mb-2">
                   <span className="text-[color:var(--cream-muted)]">Tmax</span>
                   <span className="text-[color:var(--cream)]"><NumberTicker value={2.0} decimalPlaces={1} delay={4.2} /> h</span>
                </div>
                <div className="flex justify-between w-40 mb-2">
                   <span className="text-[color:var(--cream-muted)]">AUC</span>
                   <span className="text-[color:var(--cream)]"><NumberTicker value={184.2} decimalPlaces={1} delay={4.2} /></span>
                </div>
                <div className="flex justify-between w-40 text-[color:var(--case-cyan)] mt-3 border-t border-[color:var(--cream-hairline)] pt-2">
                   <span>SIGNATURE</span>
                   <span>VALID</span>
                </div>
             </motion.div>
          </div>

       </div>

       <WithWithoutPair
         withoutText="NCA executions are unverified against gold-standard. Drift compounds across analyses."
         withText="Every NCA validates within 0.1% of PKNCA. Audit-trail confirms each run."
         delay={5.0}
       />

       <TakeHomeStrip 
          text="Zero human intervention from raw file to validated parameter set." 
          caseColor="violet" 
       />
    </SlideFrame>
  );
}
