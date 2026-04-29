import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

export default function Slide08() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>Voice · Tone & Register</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Audience defines register.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Don't try to satisfy multiple registers in one deliverable — you'll satisfy none. Pick the appropriate tone and stick to it.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-6)', height: '100%', alignItems: 'center' }}>
          
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }} style={{ padding: 'var(--space-6)', background: 'var(--panel)', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--sage)' }}>Executive & Regulatory</div>
            <div className="deck-display" style={{ fontSize: '24px', color: 'var(--cream)', lineHeight: 1.2 }}>
              Bloomberg / Economist Editorial.
            </div>
            <div className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '16px' }}>
              Sober, evidence-led. Add traceability cues like audit chains and version stamps. Heavy data density.
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }} style={{ padding: 'var(--space-6)', background: 'var(--panel)', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--sage)' }}>Scientific Peers</div>
            <div className="deck-display" style={{ fontSize: '24px', color: 'var(--cream)', lineHeight: 1.2 }}>
              Bloomberg with Technical Density.
            </div>
            <div className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '16px' }}>
              Full technical jargon is tolerated. Add tool-specific labels (NONMEM, OFV, GOF) and precise p-values.
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }} style={{ padding: 'var(--space-6)', background: 'var(--panel)', borderRadius: 'var(--radius-lg)', height: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--sage)' }}>Lay Audience / Courses</div>
            <div className="deck-display" style={{ fontSize: '24px', color: 'var(--cream)', lineHeight: 1.2 }}>
              Vox / Harris Kinetic.
            </div>
            <div className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '16px' }}>
              Conversational, illustrated, slower-paced. More narrative, highly animated beats.
            </div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={1.2} kicker="Tone" source="Source: Zaj-Design/files/PRINCIPLES.md" />
    </SlideGrid>
  );
}
