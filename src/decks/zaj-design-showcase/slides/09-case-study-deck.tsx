import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

export default function Slide09() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={0.1}>Patterns · Multi-Case Decks</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The Case-Color Contract
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        When presenting multiple case studies side-by-side, each case gets a unique semantic color.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--space-4)', height: '100%', alignItems: 'center' }}>
          
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.6 }} style={{ height: '300px', background: 'var(--panel)', borderTop: '6px solid var(--coral)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--coral)', marginBottom: 'var(--space-2)' }}>CS1</div>
            <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px' }}>Pediatric PAH</div>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--coral)', color: 'var(--coral)', fontSize: '12px' }} className="deck-mono">Coral #E07856</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.8 }} style={{ height: '300px', background: 'var(--panel)', borderTop: '6px solid var(--cyan)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--cyan)', marginBottom: 'var(--space-2)' }}>CS2</div>
            <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px' }}>Adult Oncology</div>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--cyan)', color: 'var(--cyan)', fontSize: '12px' }} className="deck-mono">Cyan #4FB3C9</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.0 }} style={{ height: '300px', background: 'var(--panel)', borderTop: '6px solid var(--violet)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--violet)', marginBottom: 'var(--space-2)' }}>CS3</div>
            <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px' }}>Enzyme Replacement</div>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--violet)', color: 'var(--violet)', fontSize: '12px' }} className="deck-mono">Violet #8B6FB5</div>
          </motion.div>

          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 1.2 }} style={{ height: '300px', background: 'var(--panel)', borderTop: '6px solid var(--sage)', borderRadius: 'var(--radius-md)', padding: 'var(--space-4)' }}>
            <div className="deck-mono" style={{ color: 'var(--sage)', marginBottom: 'var(--space-2)' }}>CS4</div>
            <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '20px' }}>AI/ML Platform</div>
            <div style={{ marginTop: 'auto', paddingTop: 'var(--space-8)', borderTop: '1px solid var(--sage)', color: 'var(--sage)', fontSize: '12px' }} className="deck-mono">Sage #7BAE7F</div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={1.4} kicker="Multi-case decks" source="Source: Zaj-Design/files/color.md" />
    </SlideGrid>
  );
}
