import React from 'react';
import { motion } from 'framer-motion';

const ecosystemData = [
  { surface: 'pharazi.ai', role: 'FOUNDATION', status: 'live', color: 'case-amber', dots: [1, 1, 1, 1, 1] },
  { surface: 'tools.pharazi.ai', role: '119 TOOLS', status: 'live', color: 'case-cyan', dots: [1, 1, 1, 1, 1] },
  { surface: 'github.com/pharazi', role: 'SOURCE', status: 'preparing', color: 'case-violet', dots: [1, 1, 1, 1, 0] },
  { surface: 'clinpharm.ai', role: 'COMMUNITY', status: 'growing', color: 'case-sage', dots: [1, 1, 1, 0, 0] },
  { surface: 'R package', role: 'ROADMAP', status: 'in design', color: 'case-amber', dots: [1, 1, 0, 0, 0] },
  { surface: 'Python pkg', role: 'ROADMAP', status: 'in design', color: 'case-violet', dots: [1, 1, 0, 0, 0] }
];

export default function EcosystemGrid({ delay = 0 }) {
  return (
    <div className="w-full flex justify-between gap-4">
      {ecosystemData.map((item, i) => (
        <motion.div
          key={item.surface}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: delay + i * 0.1 }}
          className="flex-1 bg-[color:var(--bg-elevated)]/80 backdrop-blur-md border border-[color:var(--cream-hairline)] rounded p-4 relative overflow-hidden"
        >
          {/* Left Stripe */}
          <div className={`absolute top-0 left-0 w-1 h-full bg-[color:var(--${item.color})]`} />
          
          <div className="deck-mono text-sm text-[color:var(--cream)] mb-1">
            {item.surface}
          </div>
          <div className={`deck-mono text-[10px] text-[color:var(--${item.color})] uppercase tracking-widest mb-3`}>
            {item.role}
          </div>
          
          <div className="flex items-center gap-2">
            <div className="flex gap-[2px]">
              {item.dots.map((filled, idx) => (
                <div 
                  key={idx} 
                  className={`w-1.5 h-1.5 rounded-full ${filled ? `bg-[color:var(--${item.color})]` : 'bg-[color:var(--ink-faint)]'}`} 
                />
              ))}
            </div>
            <div className="deck-display text-xs italic text-[color:var(--cream-muted)]">
              {item.status}
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  );
}
