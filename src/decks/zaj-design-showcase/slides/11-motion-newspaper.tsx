import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide11() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>Signature Motion 1</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The Newspaper Reveal.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        A document slides down while scaling to 100%, creating the feeling of being "placed" rather than flying.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          
          <motion.div
            initial={{ opacity: 0, y: -200, scale: 1.1, filter: 'blur(4px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            transition={{ 
              duration: 0.8, 
              ease: EDITORIAL_EASE,
              delay: 1.0,
              repeat: Infinity,
              repeatDelay: 2.5
            }}
            style={{ 
              width: '60%', 
              height: '70%', 
              background: 'var(--cream)', 
              borderRadius: 'var(--radius-sm)',
              padding: 'var(--space-6)',
              boxShadow: '0 20px 40px rgba(0,0,0,0.3)'
            }}
          >
            {/* Mock newspaper content */}
            <div style={{ borderBottom: '2px solid var(--panel)', paddingBottom: 'var(--space-2)', marginBottom: 'var(--space-4)' }}>
              <div className="deck-display" style={{ fontSize: '48px', color: 'var(--panel)', textAlign: 'center', lineHeight: 1 }}>THE CLINICAL RECORD</div>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 'var(--space-4)' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '100%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '90%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '95%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '80%' }} />
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
                <div className="deck-display" style={{ fontSize: '24px', color: 'var(--panel)', lineHeight: 1.1, marginBottom: 'var(--space-2)' }}>BREAKING: Pharmacometric Analysis Yields Unprecedented Insight</div>
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '100%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '95%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '98%' }} />
                <div style={{ height: '12px', background: 'var(--cream-muted)', opacity: 0.3, width: '40%' }} />
              </div>
            </div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={0.6} kicker="Signature Techniques" source="Source: zaj-editorial-motion/references/motion-language.md" />
    </SlideGrid>
  );
}
