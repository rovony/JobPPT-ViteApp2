import React from 'react';
import { motion } from 'framer-motion';

export function BrowserFrame({ url, liveBadge = true }: { url: string, liveBadge?: boolean }) {
  return (
    <div className="w-full h-full border border-[color:var(--cream-hairline)] bg-[color:var(--bg-elevated)] rounded-xl shadow-2xl relative overflow-hidden group">
      <div className="absolute top-0 left-0 right-0 h-10 border-b border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] flex items-center px-4 gap-2 z-10 backdrop-blur-md">
         <div className="w-3 h-3 rounded-full bg-red-500/50" />
         <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
         <div className="w-3 h-3 rounded-full bg-green-500/50" />
         <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] mx-auto opacity-50 bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)] px-8 py-1 rounded-sm">{url}</div>
      </div>
      <div className="w-full h-full pt-10 flex flex-col relative bg-[color:var(--bg)]">
         {/* Faux landing page scroll */}
         <div className="flex-1 overflow-hidden relative">
            <motion.div 
               animate={{ y: ["0%", "-50%", "0%"] }} 
               transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
               className="w-full flex flex-col gap-8 p-8 opacity-40"
            >
               <div className="h-32 rounded-lg bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
               <div className="grid grid-cols-3 gap-4">
                  <div className="h-24 rounded bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
                  <div className="h-24 rounded bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
                  <div className="h-24 rounded bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
               </div>
               <div className="h-64 rounded-lg bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
               <div className="h-32 rounded-lg bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
               <div className="grid grid-cols-2 gap-4">
                  <div className="h-48 rounded bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
                  <div className="h-48 rounded bg-[color-mix(in_srgb,var(--cream-hairline)_50%,transparent)]" />
               </div>
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[color:var(--bg)] pointer-events-none" />
            <div className="absolute inset-0 flex flex-col items-center justify-center z-10 pointer-events-none">
               <div className="deck-display text-2xl text-[color:var(--cream)] font-medium">pharazi.ai</div>
               <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] mt-2 uppercase tracking-widest">Regulatory Intelligence Substrate</div>
            </div>
         </div>
      </div>
      
      {liveBadge && (
         <div className="absolute top-12 right-4 bg-[color-mix(in_srgb,var(--case-sage)_20%,transparent)] border border-[color:var(--case-sage)] text-[color:var(--case-sage)] deck-mono text-[9px] px-2 py-1 flex items-center gap-2 rounded shadow-[0_0_10px_rgba(255,0,0,0.2)]">
            <div className="w-1.5 h-1.5 bg-[color:var(--case-sage)] rounded-full animate-pulse" /> LIVE
         </div>
      )}
    </div>
  );
}
