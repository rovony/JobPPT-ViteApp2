import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import RomanOrnament from '../components/backgrounds/RomanOrnament';
import MovementProgressStrip from '../components/MovementProgressStrip';
import { EASE } from '../motion';

/**
 * Slide 12.5 — Where we are · entering Movement 3 (NEW per Amendment 1 §2.3).
 *
 * 20 seconds on screen. Same A2 + progress-strip pattern as 06.5, but
 * "III" Roman numeral and activeMovement=3.
 */
export default function MovementThreeBeginsSlide() {
  return (
    <SlideFrame
      dataCase="violet"
      footerKicker="12.5 · MOVEMENT 3 BEGINS"
    >
      <RomanOrnament numeral="III" opacity={0.05} scale={0.92} />

      <div className="w-full h-full flex flex-col items-center justify-center pb-24 relative z-10">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.45, delay: 0.2, ease: EASE.expoOut }}
          className="deck-mono uppercase mb-6"
          style={{
            fontSize: 12,
            letterSpacing: '0.22em',
            color: 'var(--case)',
          }}
        >
          MOVEMENT 3 OF 3 · 8 MINUTES
        </motion.div>

        <div style={{ overflow: 'hidden', marginBottom: 16 }}>
          <motion.h1
            initial={{ y: '105%' }}
            animate={{ y: 0 }}
            transition={{ duration: 0.85, delay: 0.5, ease: EASE.expoOut }}
            className="deck-display"
            style={{
              fontSize: 'clamp(72px, 9vw, 132px)',
              fontWeight: 600,
              fontStyle: 'italic',
              color: 'var(--cream)',
              letterSpacing: '-0.03em',
              lineHeight: 1,
              margin: 0,
            }}
          >
            The Future
          </motion.h1>
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 0.9, delay: 1.05, ease: EASE.expoOut }}
          className="origin-left h-px mb-8"
          style={{
            width: 'min(48vw, 620px)',
            background: 'var(--case)',
          }}
        />

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.25, ease: EASE.expoOut }}
          className="deck-display"
          style={{
            fontSize: 'clamp(20px, 1.85vw, 28px)',
            color: 'var(--cream-muted)',
            fontStyle: 'italic',
            margin: 0,
          }}
        >
          Five components. Two synthesis views. The publication close.
        </motion.p>
      </div>

      <div
        style={{
          position: 'absolute',
          bottom: 96,
          left: 96,
          right: 96,
          opacity: 0.78,
        }}
      >
        <MovementProgressStrip
          mode="marker"
          activeMovement={3}
          delayBase={0.15}
          caption="entering Movement 3 · the future"
        />
      </div>
    </SlideFrame>
  );
}
