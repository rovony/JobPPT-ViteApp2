import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const ANTI_PATTERNS = [
  'Mascots, cartoon characters, AI illustrators',
  '"Revolutionary," "game-changing," "next-generation"',
  'Exclamation points (anywhere, ever)',
  'Bouncy / elastic animation easings',
  'Whip pans, crash zooms, lens flares',
  '3D charts',
  'Pie charts with more than 3 slices',
  'Saturated colors that "pop"',
  'Gradient meshes or gradient text',
  'Title Case in headlines (use sentence case)',
];

export default function Slide10() {
  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.1}>Doctrine · Explicit Rejections</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        What we explicitly reject.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        These are the temptations Zaj-Design is built to resist. If a tool's default output includes any of these, override the default.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', height: '100%', alignItems: 'center' }}>
          {ANTI_PATTERNS.map((pattern, i) => (
            <motion.div 
              key={pattern}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.05) }}
              style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)', padding: 'var(--space-3)', borderBottom: '1px solid var(--cream-hairline)' }}
            >
              <div className="deck-mono" style={{ color: 'var(--amber)', fontSize: '20px' }}>×</div>
              <div className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '18px' }}>{pattern}</div>
            </motion.div>
          ))}
        </div>
      </Viz>
      <Footer delay={1.4} kicker="Anti-patterns" source="Source: Zaj-Design/files/PRINCIPLES.md" />
    </SlideGrid>
  );
}
