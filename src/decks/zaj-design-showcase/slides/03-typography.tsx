import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

export default function Slide03() {
  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={0.1}>Foundations · Typography</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Strict 3-font triplet.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Three typefaces maximum per deliverable: a serif for credibility, a sans for clarity, a mono for data.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-8)', height: '100%', justifyContent: 'center' }}>
          
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6 }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cyan)', marginBottom: 'var(--space-2)' }}>Display / Serif · Source Serif Pro</div>
            <div className="deck-display" style={{ fontSize: '48px', color: 'var(--cream)', lineHeight: 1.1 }}>
              Used for headlines and section headers. Sentence case only.
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cyan)', marginBottom: 'var(--space-2)' }}>Body / Sans · Inter</div>
            <div className="deck-body" style={{ fontSize: '24px', color: 'var(--cream)', lineHeight: 1.4 }}>
              Used for body, labels, and captions. Semibold for emphasis. Never rely on color-only emphasis.
            </div>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.0 }}>
            <div className="deck-mono uppercase" style={{ color: 'var(--cyan)', marginBottom: 'var(--space-2)' }}>Data / Mono · JetBrains Mono</div>
            <div className="deck-mono" style={{ fontSize: '18px', color: 'var(--cream)', opacity: 0.8, letterSpacing: '0.1em' }}>
              ALWAYS TABULAR FIGURES. USED FOR HASH STRINGS, TICKERS, AND TECHNICAL CODES: 0x4B9A2
            </div>
          </motion.div>

        </div>
      </Viz>
      <Footer delay={1.2} kicker="Typography" source="Source: Zaj-Design/files/typography.md" />
    </SlideGrid>
  );
}
