import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';

const EASE = [0.16, 1, 0.3, 1];

export default function MarketMovingSlide() {
  const systems = [
    { name: "PharmAgents", scope: "Discovery", type: "MIT / Broad Inst.", stages: [1], top: "15%" },
    { name: "Prompt-to-Pill", scope: "Discovery", type: "ChatMED / Open Source", stages: [1,2], top: "28%" },
    { name: "PharmaSwarm", scope: "Discovery", type: "UAB (Song et al.)", stages: [1], top: "41%" },
    { name: "Apollo-AI", scope: "QCP Workflows", type: "Pfizer", stages: [3,4], top: "54%", active: true },
    { name: "pyDarwin", scope: "PopPK", type: "Certara / FDA", stages: [5], top: "67%" },
    { name: "QSP-Copilot", scope: "RAG / QSP", type: "Academic", stages: [6,7], top: "80%" },
  ];

  return (
    <SlideFrame slideId="04"
      dataCase="amber"
      eyebrow="MOVEMENT 1 · THE VISION"
      headline={
        <>
          The market is moving <span className="italic text-[color:var(--case)]">above</span> it.
        </>
      }
      subhead="Each system owns one or two stages. The end-to-end MIDD foundation is the unfilled slot."
      footerKicker="04 · THE VISION"
      footerTagline="The fragmented market."
    >
      {/* Background Hairline Grid (8px simulated via 40px grid scaling) */}
      <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCI+PHBhdGggZD0iTTAgMGg0MHYxSDBWMHptMCAyMGg0MHYxSDBWMHoiIGZpbGw9InJnYmEoMjU1LDI1NSwyNTUsMC4wNCkiIGZpbGwtcnVsZT0iZXZlbm9kZCIvPjwvc3ZnPg==')" }} />

      <div className="w-full h-[65%] mt-[5%] relative border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_30%,transparent)] backdrop-blur-md overflow-hidden z-10">
        
        {/* The Orthogonal Matrix - 7 Stages (X-Axis) */}
        <div className="absolute inset-0 flex">
           <div className="w-[340px] border-r border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_50%,transparent)] relative" />
           {[
             { num: 1, name: "Target" },
             { num: 2, name: "Preclinical" },
             { num: 3, name: "Phase 1" },
             { num: 4, name: "Phase 2" },
             { num: 5, name: "Phase 3" },
             { num: 6, name: "Regulatory" },
             { num: 7, name: "Lifecycle" }
           ].map(stage => (
              <div key={stage.num} className="flex-1 border-r border-[color:var(--cream-hairline)] relative opacity-50 flex justify-center pt-5">
                 <div className="absolute top-5 flex flex-col items-center gap-1">
                    <span className="deck-mono text-[9px] tracking-[0.2em] text-[color:var(--cream-muted)]">STAGE {stage.num}</span>
                    <span className="deck-mono text-[10px] tracking-widest text-[color:var(--cream)] uppercase text-center opacity-80">{stage.name}</span>
                 </div>
              </div>
           ))}
        </div>

        {/* Systems Plotted */}
        {systems.map((sys, i) => (
           <SystemNode key={sys.name} sys={sys} delay={0.6 + i * 0.15} />
        ))}

      </div>

      <TakeHomeStrip 
         text="Each system addresses one or two MIDD stages. None addresses the foundation." 
         caseColor="amber" 
         delay={2.5} 
      />
    </SlideFrame>
  );
}

function SystemNode({ sys, delay }) {
  const startStage = Math.min(...sys.stages);
  const endStage = Math.max(...sys.stages);
  const span = endStage - startStage + 1;

  return (
    <motion.div 
       initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8, delay, ease: EASE }}
       className="absolute w-full flex items-center px-12"
       style={{ top: sys.top }}
    >
       {/* Y-Axis Label */}
       <div className="w-[300px] flex flex-col pr-8">
          <div className="deck-display text-4xl text-[color:var(--cream)] tracking-tight">{sys.name}</div>
          <div className="flex items-center gap-2 mt-2">
             <span className="deck-mono text-[10px] uppercase tracking-[0.15em] text-[color:var(--cream-muted)]">{sys.scope}</span>
             <span className="text-[color:var(--cream-faint)] text-[10px] opacity-50">|</span>
             <span className="deck-mono text-[10px] uppercase tracking-[0.15em]" style={{ color: sys.active ? 'var(--case)' : 'var(--cream-faint)' }}>{sys.type}</span>
          </div>
       </div>

       {/* Horizontal Plot Line */}
       <div className="flex-1 relative h-12 flex items-center">
          <motion.div 
             initial={{ scaleX: 0 }} animate={{ scaleX: 1 }} transition={{ duration: 1.2, delay: delay + 0.3, ease: EASE }}
             className={`absolute h-[3px] ${sys.active ? 'bg-[color:var(--case)]' : 'bg-[color:var(--cream)]'}`}
             style={{ 
                left: `calc(${((startStage - 1) / 7) * 100}% + 10px)`, 
                width: `calc(${(span / 7) * 100}% - 20px)`,
                transformOrigin: 'left',
                boxShadow: sys.active ? '0 0 15px var(--case)' : 'none'
             }}
          />
       </div>
    </motion.div>
  );
}
