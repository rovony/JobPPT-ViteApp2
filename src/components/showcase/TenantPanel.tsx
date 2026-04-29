import React from 'react';
import { motion } from 'framer-motion';
import LiveCounter from './LiveCounter';

interface TenantPanelProps {
  id: string;
  name: string;
  type: string;
  stage: 'qc' | 'running' | 'delivered';
  delay: number;
  auditCount: number;
  liveAudit?: boolean;
}

export default function TenantPanel({ id, name, type, stage, delay, auditCount, liveAudit }: TenantPanelProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      className="flex flex-col h-full bg-[color:var(--bg-elevated)] border border-[color:var(--cream-hairline)] rounded-xl overflow-hidden shadow-2xl relative"
    >
      <div className="absolute top-0 right-0 p-3 flex flex-col items-end gap-1">
        {stage === 'qc' && <div className="px-2 py-0.5 rounded bg-[color:var(--case-amber)]/20 text-[color:var(--case-amber)] deck-mono text-[9px] uppercase">QC REVIEW</div>}
        {stage === 'running' && <div className="px-2 py-0.5 rounded bg-[color:var(--case-cyan)]/20 text-[color:var(--case-cyan)] deck-mono text-[9px] uppercase">RUNNING</div>}
        {stage === 'delivered' && <div className="px-2 py-0.5 rounded bg-[color:var(--case-sage)]/20 text-[color:var(--case-sage)] deck-mono text-[9px] uppercase">DELIVERED</div>}
      </div>

      {/* Avatar / Context */}
      <div className="p-6 border-b border-[color:var(--cream-hairline)] flex items-center gap-4">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={
            stage === 'running' 
              ? { scale: [1, 1.05, 1], rotate: [0, -2, 2, 0], opacity: 1, transition: { repeat: Infinity, duration: 2, ease: "easeInOut" } }
              : stage === 'qc'
                ? { scale: [1, 1.02, 1], opacity: [0.8, 1, 0.8], transition: { repeat: Infinity, duration: 3, ease: "easeInOut" } }
                : { scale: 1, opacity: 1, transition: { duration: 0.4, delay: delay + 0.2 } }
          }
          className={`w-12 h-12 rounded-full border-2 flex items-center justify-center shrink-0 ${
            stage === 'running' ? 'bg-[color:var(--case-cyan)]/20 border-[color:var(--case-cyan)]' :
            stage === 'qc' ? 'bg-[color:var(--case-amber)]/20 border-[color:var(--case-amber)]' :
            'bg-[color:var(--case-sage)]/20 border-[color:var(--case-sage)]'
          }`}
        >
          {/* Schematic Avatar */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`
            ${stage === 'running' ? 'text-[color:var(--case-cyan)]' : stage === 'qc' ? 'text-[color:var(--case-amber)]' : 'text-[color:var(--case-sage)]'}
          `}>
            <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
            <circle cx="12" cy="7" r="4" />
          </svg>
        </motion.div>
        
        <div className="flex flex-col">
          <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] uppercase tracking-widest">{id}</div>
          <div className="deck-display text-lg text-[color:var(--cream)]">{name}</div>
          <div className="deck-mono text-xs text-[color:var(--case)] mt-1">{type}</div>
        </div>
      </div>

      {/* Workflow / Data */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.4, delay: delay + 0.4 }}
        className="p-6 flex-1 flex flex-col gap-4"
      >
        <div className="flex justify-between items-center pb-2 border-b border-[color:var(--cream-hairline)]">
          <span className="deck-mono text-xs text-[color:var(--cream-muted)]">Data isolation</span>
          <span className="deck-mono text-xs text-[color:var(--cream)] border border-[color:var(--case)]/50 px-2 py-0.5 rounded text-[color:var(--case)]">org_id: {id.split('-')[1]}</span>
        </div>
        
        <div className="flex justify-between items-center pb-2 border-b border-[color:var(--cream-hairline)]">
          <span className="deck-mono text-xs text-[color:var(--cream-muted)]">Audit entries</span>
          <span className="deck-mono text-xs text-[color:var(--cream)] tabular-nums">
            {liveAudit ? <LiveCounter initialValue={auditCount} intervalMs={3200} /> : auditCount}
          </span>
        </div>

        {stage === 'running' && (
           <div className="mt-auto">
             <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] mb-2">Compute Allocation</div>
             <div className="w-full h-1 bg-[color:var(--bg-deep)] rounded overflow-hidden">
               <motion.div 
                 initial={{ width: '40%' }}
                 animate={{ width: ['40%', '60%', '45%', '55%'] }}
                 transition={{ repeat: Infinity, duration: 4, ease: "linear" }}
                 className="h-full bg-[color:var(--case-cyan)]" 
               />
             </div>
           </div>
        )}
      </motion.div>
    </motion.div>
  );
}
