import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const COLORS = [
  { name: 'Background', hex: '#0D1B2A', desc: 'The canvas. Constant across deliverable.', text: '#F5F0E8' },
  { name: 'Text', hex: '#F5F0E8', desc: 'Body, labels, captions.', text: '#0D1B2A' },
  { name: 'System Accent', hex: '#7BAE7F', desc: 'Structure, active states (Sage Green).', text: '#0D1B2A' },
  { name: 'Human Accent', hex: '#C4847A', desc: 'Narrative or warm elements (Muted Rose).', text: '#0D1B2A' },
  { name: 'Alert', hex: '#E8B547', desc: 'Critical numbers, gates (Amber). Max 2/page.', text: '#0D1B2A' },
];

export default function Slide02() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>Foundations · Color</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The five-slot color system.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Every palette has exactly five slots. Editorial colors are 20–40% less saturated than marketing colors. Never use color decoratively.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', justifyContent: 'center' }}>
          {COLORS.map((c, i) => (
            <motion.div 
              key={c.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.1) }}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-6)', padding: 'var(--space-3)' }}
            >
              <div style={{ width: '120px', height: '60px', backgroundColor: c.hex, borderRadius: 'var(--radius-md)', border: '1px solid var(--cream-hairline)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span className="deck-mono" style={{ color: c.text, fontSize: '12px', fontWeight: 'bold' }}>{c.hex}</span>
              </div>
              <div>
                <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px' }}>{c.name}</div>
                <div className="deck-body" style={{ color: 'var(--cream-muted)' }}>{c.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>
      <Footer delay={1.2} kicker="Color" source="Source: Zaj-Design/files/color.md" />
    </SlideGrid>
  );
}
