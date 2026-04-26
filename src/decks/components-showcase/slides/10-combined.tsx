// @ts-nocheck
import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import { AnimatedBeam } from '@/components/magicui/animated-beam';
import { BorderBeam } from '@/components/magicui/border-beam';
import { NumberTicker } from '@/components/magicui/number-ticker';
import { Particles } from '@/components/magicui/particles';

const NARROW = 'M 40 110 Q 200 90, 360 110 L 360 130 Q 200 105, 40 130 Z M 40 190 Q 200 215, 360 190 L 360 170 Q 200 195, 40 170 Z';
const WIDE   = 'M 40 60 Q 200 40, 360 60 L 360 130 Q 200 110, 40 130 Z M 40 240 Q 200 260, 360 240 L 360 170 Q 200 190, 40 170 Z';

export default function CombinedDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const ambRef = useRef<HTMLDivElement>(null);
  const etaRef = useRef<HTMLDivElement>(null);
  const vesselRef = useRef<HTMLDivElement>(null);

  return (
    <section className="relative h-[100dvh] w-full overflow-hidden" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      {/* Atmospheric particles */}
      <Particles className="absolute inset-0 pointer-events-none" quantity={60} color="#7dd3fc" ease={120} size={0.6} />

      <div style={{ position: 'relative', padding: 'var(--space-6)', height: '100%', display: 'flex', flexDirection: 'column' }}>
        <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
          Case 01 · Mechanism · combined demo
        </div>
        <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-4)', maxWidth: '32ch' }}>
          Three pathways drive PAH.{' '}
          <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>Ambrisentan blocks one — selectively.</span>
        </h2>

        <div ref={containerRef} style={{ position: 'relative', flex: 1, display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-5)', alignItems: 'center' }}>
          {/* LEFT — drug + receptor */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', alignItems: 'center' }}>
            <div ref={ambRef} style={{ position: 'relative', padding: 'var(--space-3) var(--space-5)', background: 'color-mix(in srgb, var(--amber) 14%, var(--panel))', border: '1.5px solid var(--amber)', borderRadius: 'var(--radius-md)', overflow: 'hidden' }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--amber)', letterSpacing: 'var(--ls-mono-wide)' }}>AMBRISENTAN</div>
              <div className="deck-display" style={{ fontSize: 'clamp(1.2rem, 2.4vw, 1.8rem)', fontWeight: 700, color: 'var(--cream)' }}>
                <NumberTicker value={4147} />:1
              </div>
              <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', opacity: 0.78 }}>ETA selectivity</div>
              <BorderBeam size={120} duration={6} colorFrom="var(--amber)" colorTo="var(--cyan)" />
            </div>

            <div ref={etaRef} style={{ padding: 'var(--space-2) var(--space-4)', background: 'color-mix(in srgb, var(--coral) 14%, var(--panel))', border: '1.5px solid var(--coral)', borderRadius: 'var(--radius-md)' }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)' }}>ETA receptor</div>
              <div className="deck-display" style={{ fontSize: 'clamp(1rem, 1.8vw, 1.3rem)', fontWeight: 600, color: 'var(--cream)' }}>blocked</div>
            </div>

            <div style={{ padding: 'var(--space-2) var(--space-4)', background: 'color-mix(in srgb, var(--sage) 8%, var(--panel))', border: '1px solid color-mix(in srgb, var(--sage) 30%, transparent)', borderRadius: 'var(--radius-md)', opacity: 0.85 }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--sage)' }}>ETB receptor</div>
              <div className="deck-display" style={{ fontSize: 'clamp(0.95rem, 1.6vw, 1.2rem)', fontWeight: 600, color: 'var(--cream)' }}>preserved</div>
            </div>
          </div>

          {/* RIGHT — vessel narrow→wide morph */}
          <div ref={vesselRef} style={{ border: '1.5px solid var(--cyan)', borderLeft: '4px solid var(--cyan)', background: 'color-mix(in srgb, var(--cyan) 6%, var(--panel))', borderRadius: 'var(--radius-lg)', padding: 'var(--space-4)', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cyan)' }}>Vessel · narrow → open</div>
            <svg viewBox="0 0 400 300" style={{ width: '100%', height: 'auto' }}>
              <motion.path
                initial={{ d: NARROW, fillOpacity: 0.18, stroke: '#ff8c6b' }}
                animate={{ d: WIDE, fillOpacity: 0.22, stroke: '#7dd3fc' }}
                transition={{ duration: 2.4, ease: [0.4, 0, 0.2, 1], delay: 0.6, repeat: Infinity, repeatType: 'reverse', repeatDelay: 1 }}
                fill="#7dd3fc"
                strokeWidth={1.5}
              />
              {[80, 160, 240, 320].map((cx, i) => (
                <motion.circle
                  key={i}
                  cy={150}
                  r={6}
                  fill="#7dd3fc"
                  fillOpacity={0.85}
                  initial={{ cx }}
                  animate={{ cx: [cx, cx + 80, cx] }}
                  transition={{ duration: 5, ease: 'linear', delay: i * 0.3, repeat: Infinity }}
                />
              ))}
            </svg>
          </div>

          {/* Beams: AMB → ETA, AMB → vessel */}
          <AnimatedBeam containerRef={containerRef} fromRef={ambRef} toRef={etaRef} curvature={-30} duration={4} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
          <AnimatedBeam containerRef={containerRef} fromRef={etaRef} toRef={vesselRef} curvature={20} duration={4} delay={0.6} pathColor="var(--cream-hairline)" gradientStartColor="var(--coral)" gradientStopColor="var(--cyan)" />
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginTop: 'var(--space-3)', paddingTop: 'var(--space-3)', borderTop: '1px solid var(--cream-hairline)' }}>
          <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>07b · CS1 · MECHANISM (rebuilt)</div>
          <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>Sources · ESC/ERS 2022 · Letairis PI · Humbert NEJM 2023</div>
        </div>
      </div>
    </section>
  );
}
