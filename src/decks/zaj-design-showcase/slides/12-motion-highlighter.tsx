import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide12() {
  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.1}>Signature Motion 2</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The Highlighter.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        A specific word or phrase gets a yellow rectangle drawn behind it as if highlighted with a marker.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          
          <div className="deck-display" style={{ fontSize: '48px', color: 'var(--cream)', lineHeight: 1.4, maxWidth: '80%' }}>
            <span>When analyzing the trial outcomes, we observed a </span>
            
            {/* The highlighted text block */}
            <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
              <motion.span
                initial={{ width: '0%' }}
                animate={{ width: '100%' }}
                transition={{ 
                  duration: 0.5, 
                  ease: EDITORIAL_EASE,
                  delay: 1.0,
                  repeat: Infinity,
                  repeatDelay: 2.5
                }}
                style={{ 
                  position: 'absolute', 
                  top: '10%', 
                  bottom: '10%', 
                  left: '-2%', 
                  background: 'var(--amber)', 
                  opacity: 0.8,
                  zIndex: -1,
                  borderRadius: '2px'
                }}
              />
              <span style={{ position: 'relative', zIndex: 1 }}>statistically significant reduction</span>
            </span>
            
            <span> in baseline biomarkers.</span>
          </div>

        </div>
      </Viz>
      <Footer delay={0.6} kicker="Signature Techniques" source="Source: zaj-editorial-motion/references/motion-language.md" />
    </SlideGrid>
  );
}
