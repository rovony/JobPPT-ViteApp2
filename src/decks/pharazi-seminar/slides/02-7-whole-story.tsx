import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';

const EASE = [0.16, 1, 0.3, 1];

export default function WholeStorySlide() {
  const panelAnimation = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 }
  };

  return (
    <SlideFrame dataCase="amber" footerKicker="02.7 · THE WHOLE STORY">
      {/* Background Hairline Grid */}
      <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: "url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwYXRoIGQ9Ik0wIDBoOHYxSDBWMHptMCA0aDh2MUgwVjR6IiBmaWxsPSJyZ2JhLDI1NSwyNTUsMjU1LDAuMDQpIi8+PC9zdmc+')" }} />
      
      <div className="w-full flex-1 relative flex flex-col z-10 px-12 pb-4 justify-center">
        {/* The 4 Panels */}
        <div className="flex w-full justify-between gap-6 px-4">
          
          {/* Panel 1 */}
          <motion.div 
            initial="initial" animate="animate" variants={panelAnimation} transition={{ duration: 0.8, delay: 0.65, ease: EASE }}
            className="w-[22%] h-[620px] bg-[color:var(--bg-elevated)] border-l-4 border-[color:var(--case-amber)] rounded-md px-6 py-8 flex flex-col relative"
          >
            <div className="flex items-end gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[color:var(--case-amber)] text-[color:var(--bg-deep)] font-semibold flex items-center justify-center font-display">1</div>
              <div className="deck-mono text-[10px] uppercase tracking-widest text-[color:var(--case-amber)] pb-1">THE PROBLEM</div>
            </div>
            <h3 className="deck-display text-3xl leading-tight text-[color:var(--cream)] mt-2">
              Fragmentation<br/><span className="italic">under pressure</span>
            </h3>
            <div className="w-full h-[1px] bg-[color:var(--case-amber)] opacity-50 mt-6 mb-6" />
            <div className="flex flex-col flex-1">
              <p className="deck-display text-2xl italic text-[color:var(--cream)] leading-snug mb-8">
                Pharma programs rebuild workflow infrastructure every time.
              </p>
              <ul className="flex flex-col gap-3 deck-body text-base text-[color:var(--cream-muted)]">
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-amber)]">│</span> ICH M15 — EU effective 23 Jul 2026</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-amber)]">│</span> FDA AI Guidance — Jan 2025</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-amber)]">│</span> FDA-EMA Joint Principles — Jan 2026</li>
              </ul>
              <div className="mt-auto self-center deck-mono text-[10px] text-[color:var(--cream-muted)] opacity-50">
                Movement 1 →
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[color:var(--case-amber)]" />
          </motion.div>

          {/* Panel 2 */}
          <motion.div 
            initial="initial" animate="animate" variants={panelAnimation} transition={{ duration: 0.8, delay: 1.00, ease: EASE }}
            className="w-[22%] h-[620px] bg-[color:var(--bg-elevated)] border-l-4 border-[color:var(--case-amber)] rounded-md px-6 py-8 flex flex-col relative"
          >
            <div className="flex items-end gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[color:var(--case-amber)] text-[color:var(--bg-deep)] font-semibold flex items-center justify-center font-display">2</div>
              <div className="deck-mono text-[10px] uppercase tracking-widest text-[color:var(--case-amber)] pb-1">THE FIELD STATE</div>
            </div>
            <h3 className="deck-display text-3xl leading-tight text-[color:var(--cream)] mt-2">
              Point solutions<br/><span className="italic">one gap</span>
            </h3>
            <div className="w-full h-[1px] bg-[color:var(--case-amber)] opacity-50 mt-6 mb-6" />
            <div className="flex flex-col flex-1">
              <p className="deck-display text-2xl italic text-[color:var(--cream)] leading-snug mb-8">
                Twelve systems address one or two stages each.
              </p>
              <div className="grid grid-cols-2 gap-x-2 gap-y-3 deck-mono text-xs text-[color:var(--cream-muted)]">
                <div>Apollo-AI</div><div>PharmAgents</div>
                <div>Prompt-2-Pill</div><div>PharmaSwarm</div>
                <div>DrugAgent</div><div>PEARL</div>
                <div>pyDarwin</div><div>Pumas suite</div>
                <div className="col-span-2">QSP-Copilot</div>
              </div>
              <div className="mt-8 deck-display text-2xl italic text-[color:var(--case-coral)]">
                MIDD substrate: <motion.span 
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2, duration: 1.5 }}
                >──── unbuilt</motion.span>
              </div>
              <div className="mt-auto self-center deck-mono text-[10px] text-[color:var(--cream-muted)] opacity-50">
                Movement 1 cont. →
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[color:var(--case-amber)]" />
          </motion.div>

          {/* Panel 3 (Focal) */}
          <motion.div 
            initial="initial" animate="animate" variants={panelAnimation} transition={{ duration: 0.8, delay: 1.35, ease: EASE }}
            className="w-[22%] h-[620px] bg-[color:var(--bg-elevated)] border-l-4 border-[color:var(--case-violet)] rounded-md px-6 py-8 flex flex-col relative"
          >
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5, delay: 2.3 }}
              className="absolute inset-0 rounded-md shadow-[inset_0_0_60px_rgba(139,92,246,0.15)] pointer-events-none"
            />
            <div className="flex items-end gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[color:var(--case-violet)] text-[color:var(--bg-deep)] font-semibold flex items-center justify-center font-display">3</div>
              <div className="deck-mono text-[10px] uppercase tracking-widest text-[color:var(--case-violet)] pb-1">WHAT'S BUILT</div>
            </div>
            <h3 className="deck-display text-3xl leading-tight text-[color:var(--cream)] mt-2">
              Pharazi:<br/><span className="italic">the foundation</span>
            </h3>
            <div className="w-full h-[1px] bg-[color:var(--case-violet)] opacity-50 mt-6 mb-6" />
            <div className="flex flex-col flex-1 relative z-10">
              <p className="deck-display text-2xl italic text-[color:var(--cream)] leading-snug mb-6">
                Pharazi: a 4-level hierarchy spanning six MIDD domains.
              </p>
              <ul className="flex flex-col gap-3 deck-body text-[14px] text-[color:var(--cream-muted)]">
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-violet)]">│</span> Centralized hierarchy (Kim et al., 4×)</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-violet)]">│</span> Privacy by code, not policy</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-violet)]">│</span> Cryptographic hash-chain audit</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-violet)]">│</span> Versioned SOPs · bounded coordination</li>
                <li className="flex items-start gap-2"><span className="text-[color:var(--case-violet)]">│</span> Orthogonal layering — additive only</li>
              </ul>
              <div className="mt-8 deck-mono text-[10px] text-[color:var(--cream-muted)]">
                Validated: PKNCA · NONMEM · M15-aligned
              </div>
              <div className="mt-auto self-center deck-mono text-[10px] text-[color:var(--cream-muted)] opacity-50">
                Movement 2 →
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[color:var(--case-violet)]" />
          </motion.div>

          {/* Panel 4 */}
          <motion.div 
            initial="initial" animate="animate" variants={panelAnimation} transition={{ duration: 0.8, delay: 1.70, ease: EASE }}
            className="w-[22%] h-[620px] bg-[color:var(--bg-elevated)] border-l-4 border-[color:var(--case-sage)] rounded-md px-6 py-8 flex flex-col relative"
          >
            <div className="flex items-end gap-3 mb-2">
              <div className="w-8 h-8 rounded-full bg-[color:var(--case-sage)] text-[color:var(--bg-deep)] font-semibold flex items-center justify-center font-display">4</div>
              <div className="deck-mono text-[10px] uppercase tracking-widest text-[color:var(--case-sage)] pb-1">WHAT'S COMING</div>
            </div>
            <h3 className="deck-display text-3xl leading-tight text-[color:var(--cream)] mt-2">
              Publication<br/><span className="italic">at scale</span>
            </h3>
            <div className="w-full h-[1px] bg-[color:var(--case-sage)] opacity-50 mt-6 mb-6" />
            <div className="flex flex-col flex-1">
              <p className="deck-display text-2xl italic text-[color:var(--cream)] leading-snug mb-8">
                Manuscript in prep. Foundation deployed.
              </p>
              <div className="flex flex-col gap-2 deck-mono text-xs mb-8">
                <div className="flex justify-between text-[color:var(--cream-muted)]">
                  <span>MANUSCRIPT</span>
                  <span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-[color:var(--case-sage)]">●●●</motion.span>○○
                  </span>
                </div>
                <div className="flex justify-between text-[color:var(--cream-muted)]">
                  <span>DEPLOYMENT</span>
                  <span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-[color:var(--case-sage)]">●●●●●</motion.span>
                  </span>
                </div>
                <div className="flex justify-between text-[color:var(--cream-muted)]">
                  <span>OPEN-SOURCE</span>
                  <span>
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.2 }} className="text-[color:var(--case-sage)]">●●●</motion.span>○○
                  </span>
                </div>
              </div>
              <div className="flex flex-col gap-1 deck-mono text-xs text-[color:var(--cream-muted)]">
                <div>→ pharazi.ai</div>
                <div>→ github.com/pharazi</div>
                <div>→ clinpharm.ai</div>
              </div>
              <div className="mt-auto self-center deck-mono text-[10px] text-[color:var(--cream-muted)] opacity-50">
                Movement 3 →
              </div>
            </div>
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-[color:var(--case-sage)]" />
          </motion.div>

        </div>

        {/* Bottom Ribbon */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 2.5, ease: EASE }}
          className="w-[calc(100%-32px)] mx-auto mt-8 border-t border-[color:var(--cream-hairline)] bg-[color:var(--bg-elevated)] px-12 py-5 flex items-center justify-between shrink-0"
        >
          <div className="deck-mono text-[13px] flex items-center gap-6 tracking-[0.12em]">
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.65 }} className="text-[color:var(--case-amber)]">FRAGMENTATION</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.05 }} className="text-[color:var(--cream-muted)]">→</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.75 }} className="text-[color:var(--case-coral)]">GAP</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.10 }} className="text-[color:var(--cream-muted)]">→</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.85 }} className="text-[color:var(--case-violet)]">FOUNDATION</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 3.15 }} className="text-[color:var(--cream-muted)]">→</motion.span>
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.95 }} className="text-[color:var(--case-sage)]">SCALE</motion.span>
          </div>
          <div className="deck-mono text-xs text-[color:var(--cream-muted)] opacity-60">
            the next twenty-eight minutes
          </div>
        </motion.div>
      </div>

      <TakeHomeStrip 
         text="Fragmentation under pressure → twelve point solutions → Pharazi → publication." 
         subLine="The whole story in one frame. Movements 1–3 unfold each panel."
         caseColor="amber" 
         delay={3.5}
      />
    </SlideFrame>
  );
}
