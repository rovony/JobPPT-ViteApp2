import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const FAILURES = [
  { id: 'F-001', title: 'Generative AI destroys geometry', desc: 'Bidirectional arrows in architecture diagrams degrade across frames in AI motion tools. Use deterministic tools (Framer, Manim) instead.' },
  { id: 'F-002', title: 'Hash string drift', desc: 'AI tools regenerate text each frame. Render text as static images or use deterministic code.' },
  { id: 'F-003', title: 'Character appearance drifts', desc: 'Characters change pose/face when generated. Render once and use as a persistent asset.' },
];

export default function Slide06() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.1}>Process · Failure Modes</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Visual & Motion Failures
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Successful work is interchangeable; failure documentation is uniquely yours. Generative AI tools are dangerous for technical diagrams.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-6)', height: '100%', justifyContent: 'center' }}>
          {FAILURES.map((f, i) => (
            <motion.div 
              key={f.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 + (i * 0.15) }}
              style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)', background: 'var(--panel)', borderRadius: 'var(--radius-md)' }}
            >
              <div className="deck-mono" style={{ color: 'var(--coral)', width: '80px', flexShrink: 0 }}>{f.id}</div>
              <div>
                <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px', marginBottom: 'var(--space-2)' }}>{f.title}</div>
                <div className="deck-body" style={{ color: 'var(--cream-muted)' }}>{f.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>
      <Footer delay={1.2} kicker="Failures" source="Source: Zaj-Design/files/failure-modes.md" />
    </SlideGrid>
  );
}
