import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export function DashboardGrid({ children, zoomedId }: { children: React.ReactNode, zoomedId?: string | null }) {
  return (
    <>
      <AnimatePresence>
         {zoomedId && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 0.92 }} exit={{ opacity: 0 }} 
              className="fixed inset-0 bg-[color:var(--bg-deep)] z-40 pointer-events-none" 
            />
         )}
      </AnimatePresence>
      <motion.div layoutId="working-system-grid" className="w-full max-w-6xl flex-1 grid grid-cols-2 grid-rows-2 gap-6 min-h-0 relative z-10">
         {children}
      </motion.div>
    </>
  );
}
