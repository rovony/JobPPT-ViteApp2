import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const PRINCIPLES = [
  { n: '1', title: 'Credibility-first', desc: 'Would this survive scrutiny by the most expert person in the room? We build trust, not excitement.' },
  { n: '2', title: 'Restraint is a feature', desc: 'Whitespace, muted color, and deliberate motion are the system. Resist the urge to add "one more thing".' },
  { n: '3', title: 'Numbers are sacred', desc: 'Never present invented data. Use [TBD] for placeholders. Lack of citations reads as overclaim.' },
  { n: '4', title: 'Audience defines register', desc: 'Senior pharma gets Bloomberg. Lay audience gets Vox. Pick one register and stick to it.' },
];

export default function Slide01() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.1}>Zaj-Design Doctrine</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Editorial aesthetics build trust.
      </Headline>
      <Subhead delay={0.4} maxChars={90} size="lead">
        The system rejects marketing register and embraces restraint, sober color, and evidence-led composition.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-6)', height: '100%', alignItems: 'center', padding: 'var(--space-8) 0' }}>
          {PRINCIPLES.map((p, i) => (
            <motion.div 
              key={p.n}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.15) }}
              style={{ padding: 'var(--space-4)', borderLeft: '4px solid var(--coral)', background: 'color-mix(in srgb, var(--coral) 8%, transparent)' }}
            >
              <div className="deck-mono" style={{ color: 'var(--coral)', marginBottom: 'var(--space-2)' }}>{p.n}</div>
              <div className="deck-display" style={{ fontSize: 'var(--fs-slide-card)', color: 'var(--cream)', marginBottom: 'var(--space-2)' }}>{p.title}</div>
              <div className="deck-body" style={{ color: 'var(--cream-muted)' }}>{p.desc}</div>
            </motion.div>
          ))}
        </div>
      </Viz>
      
      <Footer delay={1.2} kicker="Principles" source="Source: Zaj-Design/files/PRINCIPLES.md" />
    </SlideGrid>
  );
}
