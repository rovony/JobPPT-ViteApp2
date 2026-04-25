import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import cs2MarrowUrl from '../assets/cs2-marrow-niche.svg?url';
import cs2IdhGateUrl from '../assets/cs2-idh-gate.svg?url';
import cs2BiliaryUrl from '../assets/cs2-biliary-strip.svg?url';

/**
 * CS2 BG-1 — Disease & drug background.
 *
 * MIN-DESIGN PASS. Assertion: IDH1-mutant AML and CCA are rare,
 * targetable, and had no targeted option before ivosidenib.
 */

const FACTS = [
  { label: 'AML', stat: '6–10%', desc: 'carry IDH1 mutations' },
  { label: 'CCA', stat: '~13%', desc: 'intrahepatic CCA with IDH1' },
  { label: 'MOA', stat: '2-HG ↓', desc: 'reduces oncometabolite, restores differentiation' },
];

const CYAN_IMG = {
  filter: 'grayscale(1) sepia(1) hue-rotate(155deg) saturate(0.45) brightness(0.72)',
  opacity: 0.55,
};
const CYAN_CARD = {
  position: 'relative',
  borderRadius: 'var(--radius-md)',
  border: '1px solid color-mix(in srgb, var(--cyan) 25%, transparent)',
  background: 'color-mix(in srgb, var(--cyan) 6%, transparent)',
  padding: 'var(--space-3)',
  boxShadow: '0 0 12px color-mix(in srgb, var(--cyan) 10%, transparent)',
  overflow: 'hidden',
};

export default function CS2BackgroundDisease() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Background</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        IDH1-mutant cancers are rare, targetable, and had{' '}
        <span style={{ color: 'var(--cyan)' }}>no precision option before 2018.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        Mutant IDH1 produces the oncometabolite 2-HG, blocking myeloid differentiation.
        Ivosidenib reverses it.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', flexDirection: 'column', alignItems: 'stretch', justifyContent: 'center',
            paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
            gap: 'clamp(var(--space-4), 2vh, var(--space-6))',
          }}
        >
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
              gap: 'clamp(var(--space-3), 2vw, var(--space-6))',
              alignItems: 'end',
            }}
            aria-hidden
          >
            {[
              { src: cs2MarrowUrl, label: 'Bone marrow' },
              { src: cs2IdhGateUrl, label: 'IDH1 gate' },
              { src: cs2BiliaryUrl, label: 'Biliary tract' },
            ].map((img, i) => (
              <motion.div
                key={img.label}
                style={CYAN_CARD}
                initial={{ opacity: 0, scale: 0.92 }}
                animate={go ? { opacity: 1, scale: 1 } : { opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <img
                  src={img.src}
                  alt=""
                  style={{
                    width: '100%', height: 'auto',
                    maxHeight: 'min(20vh, 220px)',
                    objectFit: 'contain',
                    objectPosition: 'center bottom',
                    ...CYAN_IMG,
                  }}
                />
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)',
                  color: 'var(--cyan)',
                  letterSpacing: '0.1em',
                  textAlign: 'center',
                  marginTop: 'var(--space-2)',
                  opacity: 0.7,
                }}>{img.label}</div>
              </motion.div>
            ))}</div>
          <div
            style={{
              width: '100%',
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(14rem, 100%), 1fr))',
              gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
            }}
          >
            {FACTS.map((f, i) => (
              <motion.div
                key={f.label}
                style={{
                  position: 'relative', minWidth: 0,
                  border: '1px solid var(--cream-hairline)',
                  borderLeft: '4px solid var(--cyan)',
                  borderRadius: 'var(--radius-md)',
                  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                  padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-2)',
                }}
                initial={{ opacity: 0, y: 16 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.85 + i * 0.15, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <div className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                  letterSpacing: '0.1em', fontWeight: 700,
                }}>{f.label}</div>
                <div className="deck-display" style={{
                  fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', color: 'var(--cream)',
                  fontWeight: 600, lineHeight: 1.05,
                  fontVariantNumeric: 'tabular-nums',
                }}>{f.stat}</div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)',
                  lineHeight: 1.4,
                }}>{f.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="BG-1 · Disease context"
        tagline="Small populations, high unmet need — the case for a targeted approach."
        source="Norsworthy et al., Clin Cancer Res 2019 · Tibsovo USPI 2021"
      />
    </SlideGrid>
  );
}
