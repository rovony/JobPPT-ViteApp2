import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export type AuditEntry = {
  timestamp: string;
  action: string;
  hash: string;
  prevHash: string;
};

interface LiveAuditChainProps {
  initialEntries: AuditEntry[];
  caseColor: string;
}

export function LiveAuditChain({ initialEntries, caseColor }: LiveAuditChainProps) {
  const [entries, setEntries] = useState(initialEntries);
  const [verified, setVerified] = useState(false);
  const [verifying, setVerifying] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setEntries(prev => {
        if (prev.length >= 23) return prev;
        const newEntry = {
           timestamp: new Date().toISOString().split('T')[1].slice(0, 12),
           action: 'ROUTING_QC',
           hash: '0x' + Math.random().toString(16).slice(2, 10),
           prevHash: prev[prev.length - 1]?.hash || '0x00000000'
        };
        return [...prev, newEntry];
      });
      setVerified(false);
    }, 4500);
    return () => clearInterval(timer);
  }, []);

  const handleVerify = () => {
    setVerifying(true);
    setTimeout(() => {
      setVerifying(false);
      setVerified(true);
    }, 600);
  };

  return (
    <div className="w-full h-full flex flex-col relative overflow-hidden">
      <div className="flex-1 overflow-hidden flex flex-col justify-end pb-12 relative">
         <AnimatePresence initial={false}>
            {entries.slice(-8).map((entry, i) => (
               <motion.div
                  key={entry.hash}
                  layout
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-2 p-2 border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg-elevated)_50%,transparent)] group hover:bg-[color-mix(in_srgb,var(--case)_10%,transparent)] transition-colors rounded"
                  style={{ '--case': `var(--case-${caseColor})` } as any}
               >
                  <div className="deck-mono text-[9px] text-[color:var(--cream-muted)] flex justify-between">
                     <span>{entry.timestamp}</span>
                     <span className="text-[color:var(--cream)]">{entry.action}</span>
                  </div>
                  <div className="deck-mono text-[8px] text-[color:var(--cream-muted)] mt-1 opacity-60">
                     prev: {entry.prevHash}
                  </div>
                  <div className="deck-mono text-[8px] mt-1" style={{ color: `var(--case-${caseColor})` }}>
                     hash: {entry.hash}
                  </div>
               </motion.div>
            ))}
         </AnimatePresence>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-12 bg-[color:var(--bg)] border-t border-[color:var(--cream-hairline)] flex items-center justify-between px-2">
         <button onClick={handleVerify} className="deck-mono text-[10px] px-3 py-1 border hover:bg-[color-mix(in_srgb,var(--case)_20%,transparent)] transition-colors" style={{ '--case': `var(--case-${caseColor})`, borderColor: `var(--case-${caseColor})`, color: `var(--case-${caseColor})` } as any}>
            {verifying ? 'VERIFYING...' : 'VERIFY CHAIN'}
         </button>
         {verified && !verifying && (
            <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} className="deck-mono text-[10px]" style={{ color: `var(--case-${caseColor})` }}>
               → True · 0 mutations · {entries.length} entries
            </motion.div>
         )}
      </div>
    </div>
  );
}
