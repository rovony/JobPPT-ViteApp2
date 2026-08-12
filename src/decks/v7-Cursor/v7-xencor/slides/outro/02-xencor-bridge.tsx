// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.22, 0.68, 0.28, 1];

const PATTERNS = [
  {
    from: 'Ambrisentan',
    to: 'Masked engagers',
    line: 'When the efficacy experiment cannot carry the answer, name the exposure metric that must be defensible.',
    color: 'var(--coral)',
  },
  {
    from: 'India dossier',
    to: 'Cross-functional dose defense',
    line: 'Convergent evidence + a named residual gap — not authority by volume of slides.',
    color: 'var(--cyan)',
  },
  {
    from: 'Asparlas design',
    to: 'Sparse / step-up learning',
    line: 'Precision and pre-agreed design replace impossible endpoint power.',
    color: 'var(--teal)',
  },
  {
    from: 'Pharazi floor',
    to: 'AI in clin pharm',
    line: 'Context of use, comparator, validation, failure modes — before adoption pressure.',
    color: 'var(--sage)',
  },
];

/**
 * Xencor bridge — public pipeline decision patterns only.
 * No TCE ownership claim; no internal program access.
 */
export default function XencorBridge() {
  const reduced = useReducedMotion();

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={0.1}>Why Xencor · public pipeline patterns</Eyebrow>
      <Headline delay={0.2} maxChars={70}>
        Same decision discipline —{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 500 }}>different biology.</span>
      </Headline>
      <Subhead delay={0.28}>
        Public information only. Transferable patterns — not “your program should use my model.” No claim of TCE ownership.
      </Subhead>
      <Viz>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
            gap: 'var(--space-3)',
            height: '100%',
            alignContent: 'center',
            minHeight: 0,
          }}
        >
          {PATTERNS.map((p, i) => (
            <motion.div
              key={p.from}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: reduced ? 0 : 0.28, delay: reduced ? 0 : 0.14 + i * 0.05, ease: EASE }}
              style={{
                border: '1px solid var(--cream-hairline)',
                borderTop: `3px solid ${p.color}`,
                borderRadius: 'var(--radius-md)',
                padding: 'clamp(0.85rem, 1.8vh, 1.25rem)',
                background: 'var(--panel)',
                minWidth: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--space-2)',
              }}
            >
              <div className="deck-mono uppercase" style={{ fontSize: 'clamp(0.65rem, 0.95vw, 0.8rem)', letterSpacing: '0.06em', color: p.color, fontWeight: 700 }}>
                {p.from} → {p.to}
              </div>
              <div className="deck-body" style={{ fontSize: 'clamp(0.85rem, 1.2vw, 1.05rem)', color: 'var(--cream)', lineHeight: 1.45 }}>
                {p.line}
              </div>
            </motion.div>
          ))}
        </div>
      </Viz>
      <Footer
        kicker="Bridge"
        tagline="Assay → model → dose · name the decision-bearing exposure metric"
        source="Public pipeline · XmAb / PRO-XTEN framing"
      />
    </SlideGrid>
  );
}
