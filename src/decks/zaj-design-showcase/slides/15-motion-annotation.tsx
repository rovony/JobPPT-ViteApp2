import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide15() {
  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={0.1}>Signature Motion 5</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The Annotation Arrow.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        A thin curved arrow draws on, ending at a specific data point with a label. The label fades in 100ms after the arrowhead lands.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          {/* Mock Chart Area */}
          <div style={{ width: '80%', height: '60%', borderBottom: '2px solid var(--cream-hairline)', borderLeft: '2px solid var(--cream-hairline)', position: 'relative' }}>
            
            {/* The line chart path */}
            <svg style={{ width: '100%', height: '100%', overflow: 'visible' }}>
              <path d="M 0 300 Q 200 280 400 250 T 800 50" fill="none" stroke="var(--sage)" strokeWidth="3" />
              
              {/* The annotation arrow */}
              <motion.path 
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ 
                  duration: 0.8, 
                  ease: EDITORIAL_EASE,
                  delay: 1.0,
                  repeat: Infinity,
                  repeatDelay: 3.0
                }}
                d="M 500 150 Q 600 50 780 40" 
                fill="none" 
                stroke="var(--amber)" 
                strokeWidth="2" 
                strokeDasharray="4 4"
              />
              
              {/* The arrowhead */}
              <motion.polygon 
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  duration: 0.2, 
                  delay: 1.8,
                  repeat: Infinity,
                  repeatDelay: 3.6
                }}
                points="780,35 800,50 780,65" 
                fill="var(--amber)" 
                style={{ transformOrigin: '800px 50px' }}
              />
            </svg>

            {/* The Label */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.4, 
                delay: 1.9,
                repeat: Infinity,
                repeatDelay: 3.5
              }}
              style={{ position: 'absolute', top: '100px', left: '420px', background: 'var(--panel)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-sm)', border: '1px solid var(--amber)' }}
            >
              <div className="deck-mono" style={{ color: 'var(--amber)', fontSize: '14px' }}>↓ 47% DROP OBSERVED</div>
            </motion.div>

          </div>

        </div>
      </Viz>
      <Footer delay={0.6} kicker="Signature Techniques" source="Source: zaj-editorial-motion/references/motion-language.md" />
    </SlideGrid>
  );
}
