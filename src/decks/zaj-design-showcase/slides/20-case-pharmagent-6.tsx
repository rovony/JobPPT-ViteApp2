import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide20() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      {/* We skip normal Eyebrow/Headline to create a cinematic centered close */}
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'center', position: 'relative' }}>
          
          {/* Ghost Architecture Background */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 0.15, scale: 1 }}
            transition={{ duration: 2.0, delay: 0.5, ease: EDITORIAL_EASE }}
            style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 0, pointerEvents: 'none' }}
          >
            <div style={{ width: '80%', height: '80%', border: '4px solid var(--sage)', borderRadius: 'var(--radius-lg)', display: 'grid', gridTemplateRows: '1fr 1fr 1fr', gap: '20px', padding: '40px' }}>
               <div style={{ border: '2px solid var(--sage)' }}></div>
               <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '20px' }}>
                  <div style={{ border: '2px solid var(--sage)' }}></div>
                  <div style={{ border: '2px solid var(--sage)' }}></div>
                  <div style={{ border: '2px solid var(--sage)' }}></div>
               </div>
               <div style={{ border: '2px solid var(--sage)' }}></div>
            </div>
          </motion.div>

          {/* Primary Text */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 1.5, ease: EDITORIAL_EASE }}
            style={{ zIndex: 1, textAlign: 'center', maxWidth: '800px', marginBottom: 'var(--space-6)' }}
          >
            <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '48px', lineHeight: 1.2 }}>
              PharmAgent · 13 agents · 151 tools · architectural privacy · regulator-replayable audit
            </div>
          </motion.div>

          {/* Secondary Citation */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 2.5 }}
            style={{ zIndex: 1, textAlign: 'center' }}
          >
            <div className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '20px', fontStyle: 'italic' }}>
              Architecture grounded in Kim et al. arXiv:2512.08296 · ICH M15-aligned
            </div>
          </motion.div>

        </div>
      </Viz>
      {/* We hide the standard footer to keep it cinematic */}
    </SlideGrid>
  );
}
