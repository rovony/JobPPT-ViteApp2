import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 BG-2 — India regulatory reform: before and after 7 Aug 2024.
 *
 * MIN-DESIGN PASS. Assertion: Rule 101 opened the waiver pathway,
 * but the science still had to defend the filing.
 */
export default function CS2BackgroundRegulatory() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 02 · Regulatory landscape</Eyebrow>

      <Headline delay={0.25} maxChars={48}>
        India required local Phase III trials —{' '}
        <span style={{ color: 'var(--cyan)' }}>until August 7, 2024.</span>
      </Headline>

      <Subhead delay={0.55} maxChars={88} size="lead">
        The DCGI order under Rule 101 opened a waiver pathway for drugs approved
        by six reference agencies — but the SEC still demanded scientific proof.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'flex', alignItems: 'center',
            paddingTop: 'clamp(var(--space-4), 3vh, var(--space-8))',
          }}
        >
          <div style={{
            width: '100%',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
            gap: 'clamp(var(--space-4), 3vw, var(--space-8))',
          }}>
            {/* BEFORE */}
            <motion.div
              style={{
                minWidth: 0,
                border: '1px solid var(--cream-hairline)',
                borderLeft: '4px solid var(--cream-faint)',
                borderRadius: 'var(--radius-md)',
                background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 0.85, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cream-faint)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>Before · NDCTR 2019</div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)', lineHeight: 1.45,
              }}>
                Local Phase III required for most new drugs. Orphan oncology drugs delayed
                18–36 months waiting for local efficacy data India's small disease populations
                could not realistically generate.
              </div>
            </motion.div>

            {/* AFTER */}
            <motion.div
              style={{
                minWidth: 0,
                border: '1.5px solid var(--cyan)',
                borderLeft: '4px solid var(--cyan)',
                borderRadius: 'var(--radius-md)',
                background: `linear-gradient(180deg,
                  color-mix(in srgb, var(--cyan) 12%, transparent),
                  color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
                padding: 'clamp(var(--space-4), 2vw, var(--space-6))',
                display: 'flex', flexDirection: 'column', gap: 'var(--space-3)',
              }}
              initial={{ opacity: 0, y: 16 }}
              animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
              transition={{ duration: 0.55, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <div className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-eyebrow)', color: 'var(--cyan)',
                letterSpacing: '0.1em', fontWeight: 700,
              }}>After · Rule 101 · 7 Aug 2024</div>
              <div className="deck-body" style={{
                fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream)', lineHeight: 1.45,
              }}>
                DCGI order specifies six reference agencies (FDA, EMA, PMDA, MHRA, TGA, HC).
                Five eligible categories: orphan drugs, gene/cell therapies, pandemic, defense,
                significant therapeutic advancement. Ivosidenib qualifies on two.
              </div>
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="BG-2 · Rule 101"
        tagline="The pathway opened — but the Clin Pharm dossier still had to close it."
        source="ClinRegs / NIAID · DIA Global Forum Dec 2024 · Lancet RH SE Asia Oct 2024"
      />
    </SlideGrid>
  );
}
