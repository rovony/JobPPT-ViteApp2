// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

const EASE = [0.2, 0.7, 0.3, 1];

export default function ShowcaseIntro() {
  return (
    <section
      className="relative h-[100dvh] w-full overflow-hidden flex flex-col items-center justify-center"
      style={{ background: 'var(--bg)', color: 'var(--cream)' }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-eyebrow)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--amber)',
          marginBottom: 'var(--space-3)',
        }}
      >
        Components · Showcase · v1
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: EASE, delay: 0.15 }}
        className="deck-display text-center"
        style={{
          fontSize: 'var(--fs-slide-display)',
          lineHeight: 'var(--lh-tight)',
          letterSpacing: 'var(--ls-display)',
          fontWeight: 500,
          margin: 0,
          maxWidth: '24ch',
        }}
      >
        Pick the component.{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>Various designs.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE, delay: 0.35 }}
        className="deck-body text-center"
        style={{
          fontSize: 'var(--fs-slide-lead)',
          color: 'var(--cream)',
          opacity: 0.78,
          marginTop: 'var(--space-4)',
          maxWidth: '52ch',
        }}
      >
        Magic UI primitives + framer-motion patterns. Multiple design variants per
        component. Use this deck as a reference to compose mechanism, hook, and
        recap slides.
      </motion.p>

      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cream-faint)',
          position: 'absolute',
          bottom: 'var(--space-5)',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        AnimatedBeam · BorderBeam · NumberTicker · Particles · MagicCard · BentoGrid · smiles-drawer · Vessel-morph
      </div>
    </section>
  );
}
