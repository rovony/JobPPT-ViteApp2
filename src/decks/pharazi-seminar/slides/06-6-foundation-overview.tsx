import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import { Particles } from '@/components/magicui/particles';
import { DashboardGrid } from '@/components/showcase/DashboardGrid';

export default function FoundationOverview() {
  return (
    <SlideFrame
      dataCase="sage"
      eyebrow="WORKING SYSTEM · DEPLOYED · LIVE"
      headline={<>It runs. <span className="italic text-[color:var(--case)]">At pharazi.ai.</span> Right now.</>}
      subhead="Vercel · Railway · Supabase · representative end-to-end trace, sanitized."
      footerKicker="06.6 · THE ARCHITECTURE"
    >
       <div className="absolute inset-0 z-0 opacity-20 pointer-events-none overflow-hidden">
         <Particles quantity={150} color="#ffffff" className="w-full h-full" />
       </div>

       <div className="w-full h-full relative flex flex-col items-center justify-center px-16 pb-24 pt-8 z-10">
          <DashboardGrid>
             
             {/* Top Left: User Input */}
             <div className="flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">USER REQUEST</div>
                   <div className="deck-mono text-[9px] text-[color:var(--case)]">[CHAT INPUT]</div>
                </div>
                <div className="flex-1 flex flex-col justify-end p-6">
                   <div className="bg-[color-mix(in_srgb,var(--case)_10%,transparent)] border border-[color:var(--case)] p-6 rounded-lg rounded-br-none max-w-[90%] self-end relative overflow-hidden mb-4">
                      <div className="deck-body text-xl text-[color:var(--cream)] relative z-10">
                         Run NCA on this dataset, 0–24h, linear-up/log-down
                      </div>
                      <div className="absolute top-0 left-0 w-1 h-full bg-[color:var(--case)]" />
                   </div>
                </div>
             </div>

             {/* Top Right: Orchestration Log */}
             <div className="flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">ORCHESTRATION TRACE</div>
                   <div className="deck-mono text-[9px] text-[color:var(--case)]">[STREAMING]</div>
                </div>
                <div className="flex-1 deck-mono text-sm leading-relaxed text-[color:var(--cream-muted)] overflow-hidden flex flex-col justify-end p-6">
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}>→ Complexity: MODERATE</motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.6 }}>→ Routing: non_model_manager</motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.7 }}>→ Delegating: nca_expert</motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.8 }}>→ Tools: calculate_nca, plot_pk_profile</motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.9 }}>→ Waiting on QC review (LIGHT)</motion.div>
                   <motion.div initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-2 h-4 bg-[color:var(--case)] mt-2" />
                </div>
             </div>

             {/* Bottom Left: Result Card */}
             <div className="flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">RESULT</div>
                   <div className="deck-mono text-[9px] text-[color:var(--case)]">[NCA · LINEAR-UP/LOG-DOWN]</div>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center p-6">
                   <table className="w-full deck-mono text-sm lg:text-base text-[color:var(--cream)] border border-[color:var(--cream-hairline)]">
                      <tbody>
                         <tr className="border-b border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)]">
                            <td className="py-2 px-4 opacity-70">AUC</td>
                            <td className="text-right py-2 px-4 text-[color:var(--case)] font-mono tabular-nums">145.2</td>
                         </tr>
                         <tr className="border-b border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)]">
                            <td className="py-2 px-4 opacity-70">Cmax</td>
                            <td className="text-right py-2 px-4 text-[color:var(--case)] font-mono tabular-nums">12.4</td>
                         </tr>
                         <tr className="border-b border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)]">
                            <td className="py-2 px-4 opacity-70">Tmax</td>
                            <td className="text-right py-2 px-4 text-[color:var(--case)] font-mono tabular-nums">2.0</td>
                         </tr>
                      </tbody>
                   </table>
                </div>
             </div>

             {/* Bottom Right: Live Indicator */}
             <div className="flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl">
                <div className="bg-[color:var(--bg-deep)] px-4 py-2 border-b border-[color:var(--cream-hairline)] flex justify-between items-center">
                   <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] font-bold tracking-widest uppercase">DEPLOYMENT</div>
                   <div className="deck-mono text-[9px] text-[color:var(--case)]">[LIVE]</div>
                </div>
                <div className="flex-1 flex flex-col justify-center gap-4 p-6">
                   <div className="flex items-center gap-3">
                      <div className="relative">
                         <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0 left-0 animate-ping opacity-50" />
                         <div className="w-2 h-2 rounded-full bg-green-500 relative" />
                      </div>
                      <div className="deck-mono text-sm text-[color:var(--cream)]">Vercel · operational</div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="relative">
                         <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0 left-0 animate-ping opacity-50" />
                         <div className="w-2 h-2 rounded-full bg-green-500 relative" />
                      </div>
                      <div className="deck-mono text-sm text-[color:var(--cream)]">Supabase · operational</div>
                   </div>
                   <div className="flex items-center gap-3">
                      <div className="relative">
                         <div className="w-2 h-2 rounded-full bg-green-500 absolute top-0 left-0 animate-ping opacity-50" />
                         <div className="w-2 h-2 rounded-full bg-green-500 relative" />
                      </div>
                      <div className="deck-mono text-sm text-[color:var(--cream)]">Audit chain · synced</div>
                   </div>
                </div>
             </div>

          </DashboardGrid>
       </div>

       <TakeHomeStrip 
          text="Vercel + Railway + Supabase. Live audit chain. Open at pharazi.ai right now." 
          caseColor="sage" 
       />
    </SlideFrame>
  );
}
