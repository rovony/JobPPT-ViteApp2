import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide19() {
  const chain = [
    { tool: 'compute_lambda_z', hash: '0x7a3f…' },
    { tool: 'compute_auc', hash: '0xb29d…' },
    { tool: 'fit_2cmt_model', hash: '0xf41c…' },
    { tool: 'screen_covariates', hash: '0x3a82…' },
    { tool: 'run_qc_15pt', hash: '0xd61e…' },
  ];

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>PharmAgent Beat 5</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The audit chain.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        SHA-256 hash chain · tamper-evident · 47 tool calls total.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'center', gap: 'var(--space-12)' }}>
          
          {/* The Block Chain */}
          <div style={{ display: 'flex', alignItems: 'center', width: '100%', overflow: 'hidden', padding: 'var(--space-4) 0' }}>
            {chain.map((block, i) => (
              <React.Fragment key={block.tool}>
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, ease: EDITORIAL_EASE, delay: 0.8 + (i * 0.4) }}
                  style={{ 
                    background: 'color-mix(in srgb, var(--sage) 15%, var(--panel))', 
                    border: '1px solid var(--cream)', 
                    padding: 'var(--space-3)', 
                    borderRadius: 'var(--radius-sm)',
                    minWidth: '160px',
                    flexShrink: 0,
                    zIndex: 2
                  }}
                >
                  <div className="deck-body" style={{ color: 'var(--cream)', fontSize: '14px', marginBottom: 'var(--space-1)' }}>[{block.tool}]</div>
                  <div className="deck-mono" style={{ color: 'var(--sage)', fontSize: '14px' }}>[{block.hash}]</div>
                </motion.div>

                {i < chain.length - 1 && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 1.0 + (i * 0.4) }}
                    style={{ margin: '0 var(--space-2)', color: 'var(--cream-muted)', zIndex: 1 }}
                  >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path>
                      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path>
                    </svg>
                  </motion.div>
                )}
              </React.Fragment>
            ))}
          </div>

          {/* Scrolling Ticker */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.0, delay: 3.0 }}
            style={{ 
              width: '100%', 
              overflow: 'hidden', 
              background: 'var(--panel)', 
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
              padding: 'var(--space-2) 0',
              display: 'flex',
              whiteSpace: 'nowrap'
            }}
          >
             <motion.div
                animate={{ x: [0, -1000] }}
                transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                style={{ display: 'flex', gap: 'var(--space-8)' }}
             >
                {/* Repeat the chain a few times to simulate scrolling ticker */}
                {[...chain, ...chain, ...chain].map((b, i) => (
                  <span key={i} className="deck-mono" style={{ color: 'var(--cream-muted)', fontSize: '12px' }}>
                    {b.tool} → <span style={{ color: 'var(--sage)' }}>{b.hash}</span>
                  </span>
                ))}
             </motion.div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 4.0 }}
            style={{ alignSelf: 'flex-end', border: '1px solid var(--sage)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', background: 'color-mix(in srgb, var(--sage) 10%, transparent)' }}
          >
            <span className="deck-mono" style={{ color: 'var(--sage)', fontSize: '12px' }}>ICH M15-aligned ✓ · regulator-replayable</span>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={4.5} kicker="PharmAgent Explainer" source="case-pharmagent.md" />
    </SlideGrid>
  );
}
