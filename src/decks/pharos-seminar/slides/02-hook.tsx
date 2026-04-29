import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import TakeHomeStrip from '@/components/deck/TakeHomeStrip';
import YearMarkers from '../components/backgrounds/YearMarkers';
import IntegerTicker from '@/components/deck/patterns/IntegerTicker';
import { EASE } from '../motion';

/**
 * Slide 02 — Hook · "Twelve years of pharmacometrics → one substrate"
 *
 * Patterns: A1 + B1 + C7 IntegerTicker + B7 Glassmorphism on substrate node
 * + C6 path-drawing reveal on connectors + C8 continuous-loop particles
 * + C9 pulsing outcome node on the substrate.
 */
export default function HookSlide() {
  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="WHO I AM · WHY THIS WORK"
      headline={
        <>
          Twelve years of pharmacometrics →{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>one</span>{' '}
          foundation
        </>
      }
      subhead="Every program needed the same workflow infrastructure. Every program rebuilt it from scratch. That's the gap."
      footerKicker="02 · CONTEXT"
      footerTagline="The problem space, defined."
      footerSource="Servier (2021–2026) · GSK (2016–2021) · University of Minnesota PhD"
    >
      <YearMarkers opacity={0.05} />

      <div className="w-full h-full flex items-center justify-center pt-8 pb-12 relative z-10">
        <div className="flex items-center justify-center gap-10 relative w-full max-w-[1200px]">
          {/* Leftmost: 12 Years (C7 ticker) */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.2, delay: 0.4, ease: EASE.expoOut }}
            className="flex flex-col items-end border-r border-[color:var(--cream-hairline)] pr-10 py-2 shrink-0"
          >
            <div className="deck-display text-[8rem] xl:text-[9rem] leading-[0.8] text-[color:var(--cream)] tracking-tighter">
              <IntegerTicker from={0} to={12} duration={1.5} delay={0.6} />
            </div>
            <div className="deck-mono text-[0.65rem] uppercase tracking-[0.2em] text-[color:var(--cream-muted)] mt-6">
              Years in Clinic
            </div>
          </motion.div>

          {/* Middle: 3 Fragmented program nodes */}
          <div className="flex flex-col gap-6 relative z-10 shrink-0">
            <ProgramNode title="PopPK Models" count={65} delay={0.8} />
            <ProgramNode title="PKPD Frameworks" count={82} delay={1.0} />
            <ProgramNode title="E-R Submissions" count={33} delay={1.2} />

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.0, delay: 1.6 }}
              className="absolute -bottom-8 right-0 text-right"
            >
              <span className="deck-mono text-[10px] uppercase text-[color:var(--cream-muted)] tracking-widest">
                180+ Total Models
              </span>
            </motion.div>
          </div>

          {/* SVG connectors with path-drawing + particles */}
          <div className="w-[180px] h-[288px] relative shrink-0">
            <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.4, ease: EASE.expoOut }}
                d="M 0 40 C 90 40, 90 144, 180 144"
                fill="none"
                stroke="var(--cream-hairline)"
                strokeWidth="1.5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.5, ease: EASE.expoOut }}
                d="M 0 144 L 180 144"
                fill="none"
                stroke="var(--cream-hairline)"
                strokeWidth="1.5"
              />
              <motion.path
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.5, delay: 1.6, ease: EASE.expoOut }}
                d="M 0 248 C 90 248, 90 144, 180 144"
                fill="none"
                stroke="var(--cream-hairline)"
                strokeWidth="1.5"
              />

              {/* Terminal Point Glow */}
              <motion.circle 
                r={0} 
                initial={{ opacity: 0, r: 0 }} 
                animate={{ opacity: 1, r: 4 }} 
                transition={{ delay: 1.8 }} 
                cx="180" 
                cy="144" 
                fill="var(--case)" 
              />

            </svg>

            {/* C8 continuous-loop particles */}
            <style>{`
              @keyframes particleFloatPharos {
                0% { offset-distance: 0%; opacity: 0; }
                20% { opacity: 1; }
                80% { opacity: 1; }
                100% { offset-distance: 100%; opacity: 0; }
              }
            `}</style>
            <div
              className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
              style={{
                offsetPath: 'path("M 0 40 C 90 40, 90 144, 180 144")',
                animation: 'particleFloatPharos 3.0s linear 2.0s infinite both'
              }}
            />
            <div
              className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
              style={{
                offsetPath: 'path("M 0 144 L 180 144")',
                animation: 'particleFloatPharos 3.0s linear 2.8s infinite both'
              }}
            />
            <div
              className="absolute w-[6px] h-[6px] -ml-[3px] -mt-[3px] rounded-full bg-[color:var(--case)] pointer-events-none"
              style={{
                offsetPath: 'path("M 0 248 C 90 248, 90 144, 180 144")',
                animation: 'particleFloatPharos 3.0s linear 2.4s infinite both'
              }}
            />
          </div>

          {/* Right: 1 Substrate (C9 + B7) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, filter: 'blur(10px)', x: 20 }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', x: 0 }}
            transition={{ duration: 1.2, delay: 2.0, ease: EASE.expoOut }}
            className="w-[340px] flex flex-col justify-center p-12 border border-[color:var(--case)] backdrop-blur-xl relative overflow-hidden shrink-0"
            style={{
              background: 'color-mix(in srgb, var(--case) 8%, transparent)',
              boxShadow: '0 0 60px color-mix(in srgb, var(--case) 15%, transparent)',
            }}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-[color-mix(in_srgb,var(--case)_15%,transparent)] to-transparent" />
            <div className="relative z-10 flex flex-col gap-6">
              <div className="deck-display text-[9rem] text-[color:var(--case)] leading-none tracking-tighter drop-shadow-xl">
                <IntegerTicker from={0} to={1} duration={1.0} delay={2.2} />
              </div>
              <div>
                <div className="deck-mono text-xs tracking-widest uppercase text-[color:var(--case)] mb-4">
                  The Foundation
                </div>
                <div className="deck-body text-[1.05rem] text-[color:var(--cream)] font-medium leading-[1.65]">
                  A centralized, deterministic orchestration engine. 21 CFR Part 11 compliant.
                  Hash-anchored execution.
                </div>
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.5, 0] }}
              transition={{ duration: 3.0, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,color-mix(in_srgb,var(--case)_40%,transparent),transparent_70%)] pointer-events-none"
            />
            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: '300%' }}
              transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 h-[30px] bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--case)_40%,transparent)] to-transparent pointer-events-none"
            />
          </motion.div>
        </div>
      </div>

      <TakeHomeStrip
        text="Twelve years of pharmacometrics. One question keeps repeating."
        subLine="Every program needed the same workflow infrastructure. Every program rebuilt it from scratch."
        caseColor="amber"
        delay={3.4}
      />
    </SlideFrame>
  );
}

function ProgramNode({ title, count, delay }: { title: string; count: number; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20, filter: 'blur(10px)' }}
      animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
      transition={{ duration: 0.8, delay, ease: EASE.expoOut }}
      className="w-[260px] h-[80px] px-6 border border-[color:var(--cream-hairline)] border-l-4 border-l-[color:var(--cream-muted)] backdrop-blur-md bg-[color-mix(in_srgb,var(--bg)_80%,transparent)] flex items-center justify-between shadow-lg"
    >
      <div className="deck-mono text-[0.7rem] uppercase tracking-widest text-[color:var(--cream-muted)]">
        {title}
      </div>
      <div className="deck-display text-[2.5rem] font-medium text-[color:var(--cream)] leading-none pt-1">
        <IntegerTicker from={0} to={count} duration={1.5} delay={delay + 0.2} />
      </div>
    </motion.div>
  );
}
