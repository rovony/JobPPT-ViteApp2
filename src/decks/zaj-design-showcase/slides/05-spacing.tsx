import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const RULES = [
  { title: 'The 8-point scale', desc: 'Every dimension (padding, margin, gap) derives from a multiple of 8.' },
  { title: 'One focal point', desc: 'Editorial composition has one thing the eye is meant to focus on.' },
  { title: 'Lead with whitespace', desc: 'A composition that feels "empty" in the first 2 seconds is correctly editorial.' },
  { title: 'Edge-to-edge data', desc: 'Charts and data visualizations should bleed close to the frame edges.' },
];

export default function Slide05() {
  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.1}>Foundations · Layout</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Spacing & Grid System.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Marketing fills space; editorial earns space. Asymmetric layouts are preferred.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', height: '100%', alignItems: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {RULES.map((rule, i) => (
              <motion.div 
                key={rule.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 + (i * 0.1) }}
                style={{ padding: 'var(--space-4)', borderLeft: '2px solid var(--amber)', background: 'color-mix(in srgb, var(--amber) 5%, transparent)' }}
              >
                <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '18px', marginBottom: 'var(--space-1)' }}>{rule.title}</div>
                <div className="deck-body" style={{ color: 'var(--cream-muted)' }}>{rule.desc}</div>
              </motion.div>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.0 }}
            style={{ 
              height: '80%', 
              border: '1px dashed color-mix(in srgb, var(--amber) 30%, transparent)',
              position: 'relative',
              display: 'flex',
              padding: 'var(--space-8)'
            }}
          >
            <div style={{ width: '38%', height: '100%', background: 'color-mix(in srgb, var(--amber) 15%, transparent)', border: '1px solid var(--amber)', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }}>
              <span className="deck-mono" style={{ color: 'var(--amber)' }}>38% weight</span>
            </div>
            <div style={{ flex: 1 }} />
            <div style={{ position: 'absolute', bottom: 'var(--space-2)', right: 'var(--space-2)', color: 'var(--cream-muted)', fontSize: '12px' }} className="deck-mono">
              ~38/62 golden ratio asymmetry
            </div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={1.2} kicker="Layout" source="Source: Zaj-Design/files/spacing-grid.md" />
    </SlideGrid>
  );
}
