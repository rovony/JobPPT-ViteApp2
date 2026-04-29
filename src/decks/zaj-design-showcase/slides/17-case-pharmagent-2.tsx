import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide17() {
  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>PharmAgent Beat 2</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The privacy boundary.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Structural privacy over policy privacy. Zero patient rows cross the boundary.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 2px 1fr', height: '100%', alignItems: 'center', position: 'relative' }}>
          
          {/* Left Panel: Faded Data */}
          <div style={{ padding: 'var(--space-8)', opacity: 0.3, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cream)', letterSpacing: '0.1em' }}>247 subjects · raw concentrations</div>
            
            <table style={{ width: '100%', color: 'var(--cream)', fontSize: '14px', fontFamily: 'var(--font-mono)' }}>
              <thead style={{ borderBottom: '1px solid var(--cream-hairline)' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '8px 0' }}>SUBJID</th>
                  <th style={{ textAlign: 'left' }}>TIME</th>
                  <th style={{ textAlign: 'left' }}>DV</th>
                  <th style={{ textAlign: 'left' }}>AMT</th>
                </tr>
              </thead>
              <tbody>
                <tr><td style={{ padding: '8px 0' }}>1001</td><td>0.0</td><td>.</td><td>100</td></tr>
                <tr><td style={{ padding: '8px 0' }}>1001</td><td>0.5</td><td>12.4</td><td>.</td></tr>
                <tr><td style={{ padding: '8px 0' }}>1001</td><td>1.0</td><td>18.2</td><td>.</td></tr>
                <tr><td style={{ padding: '8px 0' }}>1002</td><td>0.0</td><td>.</td><td>200</td></tr>
              </tbody>
            </table>
          </div>

          {/* Divider */}
          <div style={{ height: '80%', borderLeft: '2px dashed var(--sage)', position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ position: 'absolute', background: 'var(--panel)', padding: 'var(--space-2)', borderRadius: '50%', border: '2px solid var(--sage)' }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
            </div>
            
            {/* The particle */}
            <motion.div
              initial={{ left: '-100px', opacity: 0 }}
              animate={{ left: '0px', opacity: 1 }}
              transition={{ duration: 1.5, ease: EDITORIAL_EASE, delay: 1.0, repeat: Infinity, repeatDelay: 3 }}
              style={{ position: 'absolute', width: '8px', height: '8px', background: 'var(--sage)', borderRadius: '50%', boxShadow: '0 0 10px var(--sage)' }}
            />
          </div>

          {/* Right Panel: Metadata */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 2.0, repeat: Infinity, repeatDelay: 4 }}
            style={{ padding: 'var(--space-8)', display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}
          >
            <div className="deck-mono uppercase" style={{ color: 'var(--sage)', letterSpacing: '0.1em' }}>METADATA TO LLM</div>
            
            <div style={{ background: 'color-mix(in srgb, var(--sage) 10%, transparent)', border: '1px solid var(--sage)', padding: 'var(--space-6)', borderRadius: 'var(--radius-lg)' }}>
              <div className="deck-display" style={{ color: 'var(--cream)', fontSize: '24px', lineHeight: 1.6 }}>
                <div>247 subjects</div>
                <div>4,812 obs</div>
                <div>BLQ 8.3%</div>
                <div>doses [100/200/400] mg</div>
              </div>
            </div>
            
            <div className="deck-mono" style={{ color: 'var(--cream-muted)', fontSize: '12px' }}>0 patient rows cross this boundary</div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={1.8} kicker="PharmAgent Explainer" source="case-pharmagent.md" />
    </SlideGrid>
  );
}
