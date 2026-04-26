// @ts-nocheck
import React, { useState } from 'react';
import useEmblaCarousel from 'embla-carousel-react';
import { useDrag } from '@use-gesture/react';
import { motion, useMotionValue, useTransform } from 'framer-motion';
import { ChevronLeft, ChevronRight, Hand } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const CARDS = [
  { title: 'Selectivity', value: '4147:1', tone: 'var(--coral)' },
  { title: 'Sample size', value: '253', tone: 'var(--cyan)' },
  { title: 'Bioequivalence', value: '0.98', tone: 'var(--violet)' },
  { title: 'Approval lag', value: '16 yrs', tone: 'var(--amber)' },
];

export default function EmblaGestureShowcase() {
  const [emblaRef, embla] = useEmblaCarousel({ loop: true, align: 'center' });

  const x = useMotionValue(0);
  const rot = useTransform(x, [-200, 0, 200], [-12, 0, 12]);
  const bind = useDrag(({ down, movement: [mx] }) => {
    x.set(down ? mx : 0);
  });

  return (
    <LibraryShowcase
      category="§5A · Carousel + gestures"
      library="embla-carousel-react + @use-gesture/react"
      npmInstall="npm install embla-carousel-react @use-gesture/react"
      url="embla-carousel.com · use-gesture.netlify.app"
      headline={<>Carousel + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>drag-to-tilt</span> gestures.</>}
      subhead="Embla: lightweight performant carousel (used by shadcn). Use-gesture: unified drag/pinch/wheel/scroll handlers — pairs natively with Motion."
      tone="var(--cyan)"
      noteBelow="Click ◂ ▸ to scroll the carousel · drag the right card horizontally to tilt"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Embla carousel" tone="var(--cyan)">
          <div style={{ width: '100%', position: 'relative' }}>
            <div ref={emblaRef} style={{ overflow: 'hidden' }}>
              <div style={{ display: 'flex', gap: 'var(--space-3)' }}>
                {CARDS.map((c, i) => (
                  <div key={i} style={{
                    flex: '0 0 60%', minWidth: 0,
                    padding: 'var(--space-4)',
                    border: `1.5px solid ${c.tone}`,
                    borderLeft: `4px solid ${c.tone}`,
                    borderRadius: 'var(--radius-md)',
                    background: `color-mix(in srgb, ${c.tone} 10%, var(--panel))`,
                  }}>
                    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: c.tone, letterSpacing: '.08em' }}>{c.title}</div>
                    <div className="deck-display" style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 700, color: c.tone, lineHeight: 1, fontVariantNumeric: 'tabular-nums', marginTop: 4 }}>
                      {c.value}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', gap: 8, marginTop: 12, justifyContent: 'center' }}>
              <button onClick={() => embla?.scrollPrev()} style={navBtn}><ChevronLeft size={18} /></button>
              <button onClick={() => embla?.scrollNext()} style={navBtn}><ChevronRight size={18} /></button>
            </div>
          </div>
        </Frame>

        <Frame title="Variant B · Drag-to-tilt gesture" tone="var(--violet)">
          <motion.div
            {...bind()}
            style={{
              x, rotate: rot,
              padding: 'var(--space-5)',
              border: '1.5px solid var(--violet)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--violet) 12%, var(--panel))',
              touchAction: 'none', cursor: 'grab',
              userSelect: 'none',
              width: 220, textAlign: 'center',
            }}
          >
            <Hand size={28} color="var(--violet)" />
            <div className="deck-display" style={{ fontSize: 'var(--fs-slide-tagline)', fontWeight: 700, color: 'var(--violet)', marginTop: 8 }}>
              Drag me horizontally
            </div>
            <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 4 }}>
              x→rotate(-12° → +12°)
            </div>
          </motion.div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}

const navBtn: React.CSSProperties = {
  width: 36, height: 36,
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
  borderRadius: 6,
  color: 'var(--cream)',
  cursor: 'pointer',
  display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
};
