import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide16() {
  const tools = ['NONMEM', 'PKNCA', 'WinNonlin', 'PsN', 'R Markdown', 'Excel'];
  
  return (
    <SlideGrid dataCase="rose" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--rose)" delay={0.1}>PharmAgent Beat 1</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The problem today.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        4–8 weeks · 5–10 disconnected tools · zero shared state.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', height: '100%', alignItems: 'center' }}>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: EDITORIAL_EASE, delay: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-4)' }}
          >
            <div style={{ width: '120px', height: '120px', borderRadius: '50%', background: 'color-mix(in srgb, var(--rose) 20%, transparent)', border: '2px solid var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="deck-display" style={{ color: 'var(--rose)', fontSize: '48px' }}>M</span>
            </div>
            <div className="deck-mono uppercase" style={{ color: 'var(--rose)', letterSpacing: '0.05em' }}>Maya (Analyst)</div>
          </motion.div>

          <div style={{ position: 'relative', height: '100%', display: 'flex', flexWrap: 'wrap', gap: 'var(--space-6)', alignContent: 'center', justifyContent: 'center' }}>
            {tools.map((tool, i) => (
              <motion.div
                key={tool}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: EDITORIAL_EASE, delay: 1.0 + (i * 0.25) }}
                style={{ 
                  background: 'color-mix(in srgb, var(--cream) 5%, transparent)',
                  border: '1px solid var(--cream-hairline)',
                  padding: 'var(--space-4) var(--space-6)',
                  borderRadius: 'var(--radius-md)',
                  backdropFilter: 'blur(4px)',
                  zIndex: 2,
                  position: 'relative'
                }}
              >
                <span className="deck-body" style={{ color: 'var(--cream)', fontSize: '20px' }}>{tool}</span>
              </motion.div>
            ))}
            
            {/* Broken connecting lines background */}
            <svg style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', zIndex: 1, pointerEvents: 'none' }}>
              <motion.path 
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.3 }}
                transition={{ duration: 2.0, delay: 1.5 }}
                d="M 100 150 L 300 100 M 350 150 L 150 250 M 400 200 L 250 300 M 100 300 L 400 100" 
                stroke="var(--sage)" 
                strokeWidth="1.5" 
                strokeDasharray="4 8" 
                fill="none" 
              />
            </svg>
          </div>

        </div>
      </Viz>
      <Footer delay={1.8} kicker="PharmAgent Explainer" source="case-pharmagent.md" />
    </SlideGrid>
  );
}
