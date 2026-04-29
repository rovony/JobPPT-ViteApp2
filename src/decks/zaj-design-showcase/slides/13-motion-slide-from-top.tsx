import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide13() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={0.1}>Signature Motion 3</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Slide-from-top label.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        A short text label slides into frame from above its target position, often accompanied by an underlining stroke.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                ease: EDITORIAL_EASE,
                delay: 1.0,
                repeat: Infinity,
                repeatDelay: 2.5
              }}
              className="deck-mono uppercase"
              style={{ color: 'var(--cyan)', fontSize: '24px', letterSpacing: '0.1em' }}
            >
              Pharmacometric Model Prediction
            </motion.div>
            
            <motion.div
              initial={{ width: '0%' }}
              animate={{ width: '100%' }}
              transition={{ 
                duration: 0.6, 
                ease: EDITORIAL_EASE,
                delay: 1.2,
                repeat: Infinity,
                repeatDelay: 2.3
              }}
              style={{ height: '2px', background: 'var(--cyan)' }}
            />
          </div>

        </div>
      </Viz>
      <Footer delay={0.6} kicker="Signature Techniques" source="Source: zaj-editorial-motion/references/motion-language.md" />
    </SlideGrid>
  );
}
