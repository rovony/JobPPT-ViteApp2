import React from 'react';
import { motion } from 'framer-motion';

export function Hierarchy3D({ step = 0 }: { step?: number }) {
  const EASE = [0.16, 1, 0.3, 1];
  
  return (
    <div 
      className="w-full h-full relative perspective-[1200px] flex items-center justify-center pointer-events-none"
    >
      <motion.div 
        className="relative w-full max-w-3xl h-full flex flex-col items-center justify-center"
        initial={{ rotateX: 60, rotateZ: -10, y: 80 }}
        animate={{ rotateX: 60, rotateZ: -10, y: 80 }}
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Base Layer: Infrastructure */}
        <motion.div 
          className="absolute w-[800px] h-[400px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl flex flex-col items-center justify-center shadow-[0_20px_50px_rgba(0,0,0,0.8)]"
          style={{ transform: 'translateZ(0px)' }}
        >
          <div className="deck-mono text-xl tracking-[0.2em] uppercase text-[color:var(--case)] mb-4">
            SHARED INFRASTRUCTURE
          </div>
          <div className="deck-body text-2xl text-[color:var(--cream-muted)] text-center max-w-2xl">
            Schema Extractor · Audit Chain · QC Debate · Manager Review
          </div>
        </motion.div>

        {/* Act 1 Layer */}
        <motion.div 
          className="absolute w-[800px] h-[400px] flex items-center justify-between px-8 pointer-events-none"
          initial={{ opacity: 0, translateZ: 0 }}
          animate={{ opacity: step >= 0 ? 1 : 0, translateZ: step >= 0 ? 120 : 0 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {['NCA', 'PopPK', 'PKPD', 'E-R', 'QC'].map((b, i) => (
            <div key={b} className="w-28 h-28 border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_90%,transparent)] flex items-center justify-center deck-mono text-lg text-[color:var(--cream)] shadow-xl backdrop-blur-md">
              {b}
            </div>
          ))}
        </motion.div>

        {/* Act 2 Layer */}
        <motion.div 
          className="absolute w-[800px] h-[400px] flex items-center justify-around px-16 pointer-events-none"
          initial={{ opacity: 0, translateZ: 120 }}
          animate={{ opacity: step >= 1 ? 1 : 0, translateZ: step >= 1 ? 240 : 120 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {['Signal Detect', 'Biomarker', 'MIPD', 'PGx'].map((b, i) => (
            <div key={b} className="w-32 h-32 border border-[color:var(--case)] bg-[color-mix(in_srgb,var(--case)_10%,transparent)] flex items-center justify-center deck-mono text-xl text-[color:var(--case)] shadow-2xl backdrop-blur-md">
              {b}
            </div>
          ))}
        </motion.div>

        {/* Act 3 Layer */}
        <motion.div 
          className="absolute w-[800px] h-[400px] flex items-center justify-around px-8 pointer-events-none"
          initial={{ opacity: 0, translateZ: 240 }}
          animate={{ opacity: step >= 2 ? 1 : 0, translateZ: step >= 2 ? 360 : 240 }}
          transition={{ duration: 1.2, ease: EASE }}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {['Trial Design', 'RWE', 'Reg-Author', 'Lifecycle'].map((b, i) => (
            <div key={b} className="w-40 h-32 border border-[color:var(--case)] bg-[color:var(--case)] flex items-center justify-center deck-mono text-[1.1rem] text-[color:var(--bg)] shadow-[0_30px_60px_rgba(0,0,0,0.9)] backdrop-blur-md font-bold text-center px-2">
              {b}
            </div>
          ))}
        </motion.div>

      </motion.div>
    </div>
  );
}
