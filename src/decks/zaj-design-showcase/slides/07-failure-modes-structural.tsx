import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const FAILURES = [
  { id: 'F-006', title: 'Cases blur together', desc: 'If the case-color contract is not strictly enforced on every slide header/chart, the audience loses track of which case is being discussed.' },
  { id: 'F-007', title: 'Weak synthesis slide', desc: 'Draft the synthesis first. Cases are evidence to support the synthesis, not the other way around.' },
  { id: 'F-008', title: 'Ran out of time', desc: 'Too many ideas per slide. Aim for one main idea (chart/text) per slide, and establish a "hard cut" skip-plan.' },
  { id: 'F-015', title: 'Placeholder numbers leaked', desc: 'Label illustrative numbers, or strictly enforce a search for [TBD] before any presentation.' },
];

export default function Slide07() {
  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.1}>Process · Failure Modes</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Structural & Content Failures
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        We build systems to avoid repeating these errors. Anticipate hostile reframings and limit first-person claims.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', height: '100%', justifyContent: 'center' }}>
          {FAILURES.map((f, i) => (
            <motion.div 
              key={f.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + (i * 0.15) }}
              style={{ display: 'flex', gap: 'var(--space-4)', padding: 'var(--space-4)', borderLeft: '2px solid var(--amber)', background: 'color-mix(in srgb, var(--amber) 5%, transparent)' }}
            >
              <div className="deck-mono" style={{ color: 'var(--amber)', width: '80px', flexShrink: 0 }}>{f.id}</div>
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
