import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import TenantPanel from '@/components/showcase/TenantPanel';

export default function ConcurrentUseSlide() {
  const EASE = [0.16, 1, 0.3, 1];

  const D = {
    tenantA_frame:     0.80,
    tenantB_frame:     1.00,
    tenantC_frame:     1.20,
    sharedBand:        2.00,
    sharedBand_glow:   2.50,
  };

  return (
    <SlideFrame
      slideId="19-5b"
      dataCase="violet"
      eyebrow="MOVEMENT 3 · CLIMAX"
      headline={<>Foundation <span className="italic text-[color:var(--case)]">in concurrent use.</span></>}
      subhead="Three programs. Three tenants. One reference architecture."
      footerKicker="19.5b · THE FOUNDATION"
    >
       <div className="w-full flex-1 relative flex flex-col justify-end z-10 px-12 pb-24 pt-4">
          
          <div className="flex-1 w-full flex justify-between gap-6 mb-8">
             <div className="w-1/3">
               <TenantPanel
                 id="tenant-acme"
                 name="Acme Pharma"
                 type="PopPK"
                 stage="delivered"
                 delay={D.tenantA_frame}
                 auditCount={412}
                 liveAudit={false}
               />
             </div>
             <div className="w-1/3">
               <TenantPanel
                 id="tenant-merck"
                 name="Merck"
                 type="FIH Dose Escalation"
                 stage="running"
                 delay={D.tenantB_frame}
                 auditCount={1128}
                 liveAudit={true}
               />
             </div>
             <div className="w-1/3">
               <TenantPanel
                 id="tenant-cro"
                 name="Contract CRO"
                 type="RWE Extraction"
                 stage="qc"
                 delay={D.tenantC_frame}
                 auditCount={89}
                 liveAudit={false}
               />
             </div>
          </div>

          {/* SHARED INFRASTRUCTURE BAND (from Slide 11) */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: D.sharedBand, duration: 1.0, ease: EASE }}
             className="w-full h-[120px] border border-[color:var(--cream-hairline)] bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden shadow-[0_-10px_30px_rgba(0,0,0,0.5)] z-0 shrink-0"
          >
             <motion.div 
                initial={{ opacity: 0 }} animate={{ opacity: [0, 1, 0] }} transition={{ delay: D.sharedBand_glow, duration: 2.0, ease: "easeInOut" }}
                className="absolute inset-0 bg-[color-mix(in_srgb,var(--case)_20%,transparent)] shadow-[inset_0_0_50px_var(--case)]"
             />
             <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay pointer-events-none" />
             <div className="deck-display text-2xl tracking-[0.2em] text-[color:var(--cream)] relative z-10 flex items-center gap-4">
                THE PHARAZI FOUNDATION
             </div>
             <div className="deck-mono text-[10px] text-[color:var(--cream-muted)] mt-3 relative z-10 uppercase tracking-widest flex gap-8">
                <span>Multi-agent orchestration</span>
                <span>Typed state</span>
                <span>Cryptographic audit</span>
                <span>Org-scoped boundaries</span>
             </div>
          </motion.div>

       </div>

       <TakeHomeStrip 
          text="Three programs. Three companies. One foundation. Provably isolated." 
          subLine="org_id-scoped at every query, every audit entry, every artifact."
          caseColor="violet" 
       />
    </SlideFrame>
  );
}
