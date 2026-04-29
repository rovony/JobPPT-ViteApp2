import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';

const EASE = [0.16, 1, 0.3, 1];

export default function RegulatoryFloorSlide() {
  return (
    <SlideFrame slideId="03"
      dataCase="amber"
      eyebrow="MOVEMENT 1 · THE VISION"
      headline={
        <>
          The regulatory <span className="italic text-[color:var(--case)]">floor</span> is set.
        </>
      }
      subhead="In the next five years, every major pharmaceutical sciences workflow will run on AI multi-agent infrastructure. The regulators have already decided this."
      footerKicker="03 · THE VISION"
      footerTagline="The regulatory floor."
    >
      {/* Background World Map Pattern (Simulated via grid for now) */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHY0MEgwVjB6bTIwIDIwYTEgMSAwIDAgMSAwLTJoMTZhMSAxIDAgMCAxIDAgMkgMjB6IiBmaWxsPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMDQpIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiLz48L3N2Zz4=')" }} />

      <div className="w-full h-full relative" style={{ perspective: '1200px' }}>
        {/* The Hairline Axis (Floor) */}
        <motion.div 
           initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.5, ease: EASE }}
           className="absolute bottom-[25%] left-[5%] right-[5%] h-[2px] bg-[color:var(--cream-hairline)] origin-left"
        />

        {/* Node 1: FDA 2025 */}
        <div className="absolute bottom-[25%] left-[15%] w-0 h-0 flex items-end justify-center">
           <DossierNode 
              delay={0.5} 
              height={300}
              agency="FDA" date="Jan 2025" title="7-step framework"
              body="Establishes a rigorous seven-step risk-based framework for AI models in regulatory submissions."
           />
        </div>

        {/* Node 2: FDA/EMA 2026 */}
        <div className="absolute bottom-[25%] left-[50%] w-0 h-0 flex items-end justify-center">
           <DossierNode 
              delay={0.8} 
              height={450}
              agency="FDA · EMA" date="14 Jan 2026" title="10 Guiding Principles"
              body="The foundational ten principles that will underpin every future AI-related guidance in both major global jurisdictions."
           />
        </div>

        {/* Node 3: ICH M15 */}
        <div className="absolute bottom-[25%] left-[85%] w-0 h-0 flex items-end justify-center">
           <DossierNode 
              delay={1.1} 
              height={600}
              agency="ICH M15" date="23 Jul 2026" title="AI/ML recognized"
              body="Explicitly covers AI/ML alongside PopPK, PBPK, and QSP as legitimate MIDD methodologies."
              active
           />
        </div>

      </div>
      
      <TakeHomeStrip 
         text="Three regulators. Three jurisdictions. Eighteen-month enforcement window." 
         caseColor="amber" 
         delay={2.5} 
      />
    </SlideFrame>
  );
}

function DossierNode({ delay, height, agency, date, title, body, active = false }) {
  return (
    <div className="relative flex flex-col items-center">
       {/* Plumb Line */}
       <motion.div 
         initial={{ height: 0 }} animate={{ height }} transition={{ duration: 1.0, delay, ease: EASE }}
         className="w-[2px] bg-[color:var(--cream-hairline)] origin-bottom mb-[12px]"
       />
       {/* Anchor Dot */}
       <motion.div 
         initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5, delay }}
         className={`absolute bottom-[-6px] w-3 h-3 rounded-full ${active ? 'bg-[color:var(--case)]' : 'bg-[color:var(--cream-muted)]'}`}
         style={{ boxShadow: active ? '0 0 20px var(--case)' : 'none' }}
       />

       {/* Dossier Card (Glassmorphism) */}
       <motion.div 
         initial={{ opacity: 0, y: 20, filter: 'blur(10px)' }} animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }} transition={{ duration: 1.0, delay: delay + 0.4, ease: EASE }}
         className={`absolute bottom-[calc(${height}px+20px)] w-[400px] xl:w-[480px] p-10 border border-[color:var(--cream-hairline)] backdrop-blur-xl -translate-x-1/2 left-1/2`}
         style={{
            background: active ? 'color-mix(in srgb, var(--case) 12%, transparent)' : 'color-mix(in srgb, var(--bg) 60%, transparent)',
            boxShadow: active ? '0 30px 60px color-mix(in srgb, var(--case) 15%, transparent)' : '0 20px 40px rgba(0,0,0,0.5)',
         }}
       >
          <div className="flex justify-between items-center mb-6">
             <div className="deck-mono text-xs tracking-widest uppercase border border-[color:var(--cream-hairline)] px-3 py-1 rounded text-[color:var(--cream)]">{agency}</div>
             <div className="deck-mono text-[10px] tracking-widest uppercase text-[color:var(--cream-muted)]">{date}</div>
          </div>
          <div className="deck-display text-[2.5rem] leading-[1.1] text-[color:var(--cream)] tracking-tight mb-4">{title}</div>
          <div className="deck-body text-[1.1rem] leading-[1.6] text-[color:var(--cream-muted)] font-light">{body}</div>
       </motion.div>
    </div>
  );
}
