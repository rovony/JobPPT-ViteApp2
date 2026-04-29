import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASINGS = [
  { name: 'Editorial / Out-Expo', curve: [0.22, 1, 0.36, 1], desc: 'Things "settle" rather than "land".', color: 'var(--coral)' },
  { name: 'Data Reveal', curve: [0.16, 1, 0.3, 1], desc: 'Smoother out for bars/lines.', color: 'var(--cyan)' },
  { name: 'Forbidden / Linear', curve: 'linear', desc: 'Mechanical, lifeless.', color: 'var(--cream-muted)' },
];

const DURATIONS = [
  { name: 'Quick', ms: 0.4, label: '400ms' },
  { name: 'Standard', ms: 0.8, label: '800ms' },
  { name: 'Slow', ms: 1.5, label: '1500ms' },
];

export default function Slide04() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.1}>Foundations · Motion</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Motion reveals content.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Editorial motion relies on the out-expo easing curve. Bounce and elastic animations are strictly forbidden. Let the viewer absorb the beat.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-8)', height: '100%', alignItems: 'center' }}>
          
          {/* Easing Demonstration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cream-muted)', letterSpacing: '0.1em' }}>Easing Curves (1000ms duration)</div>
            {EASINGS.map((e, i) => (
              <div key={e.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="deck-display" style={{ color: 'var(--cream)', fontSize: '18px' }}>{e.name}</span>
                  <span className="deck-mono" style={{ color: 'var(--cream-muted)', fontSize: '12px' }}>{e.desc}</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'var(--cream-hairline)', borderRadius: '2px', position: 'relative' }}>
                  <motion.div
                    initial={{ width: '0%' }}
                    animate={{ width: '100%' }}
                    transition={{ 
                      duration: 1, 
                      ease: e.curve,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                    style={{ height: '100%', background: e.color, borderRadius: '2px' }}
                  />
                  <motion.div
                    initial={{ x: '0%' }}
                    animate={{ x: '100%' }}
                    transition={{ 
                      duration: 1, 
                      ease: e.curve,
                      repeat: Infinity,
                      repeatDelay: 1.5
                    }}
                    style={{ position: 'absolute', top: '-6px', left: '-8px', width: '16px', height: '16px', borderRadius: '50%', background: e.color, boxShadow: '0 0 10px rgba(0,0,0,0.5)' }}
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Duration Demonstration */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cream-muted)', letterSpacing: '0.1em' }}>Duration Tiers (Out-Expo easing)</div>
            {DURATIONS.map((d, i) => (
              <div key={d.name}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 'var(--space-2)' }}>
                  <span className="deck-display" style={{ color: 'var(--cream)', fontSize: '18px' }}>{d.name}</span>
                  <span className="deck-mono" style={{ color: 'var(--sage)', fontSize: '12px' }}>{d.label}</span>
                </div>
                <div style={{ width: '100%', height: '40px', background: 'color-mix(in srgb, var(--sage) 10%, transparent)', borderRadius: '4px', position: 'relative', overflow: 'hidden', border: '1px solid color-mix(in srgb, var(--sage) 30%, transparent)' }}>
                  <motion.div
                    initial={{ x: '-100%' }}
                    animate={{ x: '0%' }}
                    transition={{ 
                      duration: d.ms, 
                      ease: [0.22, 1, 0.36, 1],
                      repeat: Infinity,
                      repeatDelay: 2
                    }}
                    style={{ width: '100%', height: '100%', background: 'color-mix(in srgb, var(--sage) 40%, transparent)' }}
                  />
                </div>
              </div>
            ))}
          </div>

        </div>
      </Viz>
      <Footer delay={1.2} kicker="Motion" source="Source: Zaj-Design/files/motion.md" />
    </SlideGrid>
  );
}
