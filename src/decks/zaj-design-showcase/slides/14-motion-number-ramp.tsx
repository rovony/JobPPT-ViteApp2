import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const NumberCounter = ({ from = 0, to, duration = 1.5 }) => {
  const [value, setValue] = useState(from);
  
  useEffect(() => {
    let start = Date.now();
    let frame;
    const tick = () => {
      const elapsed = (Date.now() - start) / 1000;
      const t = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - t, 4);  // out-quart, close to out-expo
      setValue(from + (to - from) * eased);
      if (t < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        // Reset and loop for the showcase
        setTimeout(() => {
          start = Date.now();
          frame = requestAnimationFrame(tick);
        }, 2500);
      }
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [from, to, duration]);
  
  return <span className="deck-mono tabular-nums">{value.toFixed(0)}</span>;
};

export default function Slide14() {
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--coral)" delay={0.1}>Signature Motion 4</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        Number ramp-up.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        Big numbers count from 0 to their final value. Used for single-stat callouts where the final number is the punchline.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
          
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 'var(--space-2)' }}>
            <div style={{ fontSize: '140px', color: 'var(--cream)', lineHeight: 1 }}>
              <NumberCounter from={0} to={247} duration={1.5} />
            </div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ 
                duration: 0.3,
                delay: 1.5,
                repeat: Infinity,
                repeatDelay: 2.7
              }}
              className="deck-body"
              style={{ color: 'var(--cream-muted)', fontSize: '24px' }}
            >
              subjects enrolled
            </motion.div>
          </div>

        </div>
      </Viz>
      <Footer delay={0.6} kicker="Signature Techniques" source="Source: zaj-editorial-motion/references/motion-language.md" />
    </SlideGrid>
  );
}
