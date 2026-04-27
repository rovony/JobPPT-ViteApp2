// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS3 · Landscape — where PharmAgent sits.
 *
 * Story: avoid competitive superiority claims. This slide positions
 * PharmAgent as a personal research orchestration layer around validated
 * pharmacometric tools, not a replacement for existing platforms.
 *
 * Data source: pharmAgent.md "The Current Landscape" + Theme D research.
 */

const LAYERS = [
  {
    label: 'Human scientific authority',
    examples: 'Clinical pharmacologist · pharmacometrician · reviewer',
    role: 'Frames question, approves assumptions, owns interpretation',
    accent: 'var(--cream)',
  },
  {
    label: 'PharmAgent research layer',
    examples: 'Supervisor · domain agents · typed state · workflow trace',
    role: 'Routes work, records provenance, assembles review-ready artifacts',
    accent: 'var(--sage)',
    hero: true,
  },
  {
    label: 'Validated computation layer',
    examples: 'NONMEM · R · SAS · Phoenix · Pumas · pyDarwin · PBPK / ML libraries',
    role: 'Computes estimates, diagnostics, simulations, tables, and figures',
    accent: 'var(--amber)',
  },
  {
    label: 'Governance and evidence layer',
    examples: 'ICH M15 · FDA AI draft guidance · SOPs · QC checklists',
    role: 'Defines credibility, documentation, review, and audit expectations',
    accent: 'var(--cyan)',
  },
  {
    label: 'Privacy boundary',
    examples: 'SchemaExtractor · local data path · no raw patient rows to LLM',
    role: 'Keeps patient-level data outside the reasoning context',
    accent: 'var(--coral)',
  },
];

export default function CS3Landscape() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Ecosystem position</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        PharmAgent does not replace validated platforms.{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>It wraps the workflow around them.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        The defensible claim is architectural fit: human authority above,
        validated computation below, privacy and audit across the path.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-3)',
        }}>
          {/* LAYERED ECOSYSTEM MAP */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr',
              gap: 'var(--space-3)',
              flex: '1 1 0%',
              minHeight: 0,
            }}
          >
            {LAYERS.map((layer, i) => (
              <motion.div
                key={layer.label}
                initial={{ opacity: 0, y: 10 }}
                animate={go ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: 0.7 + i * 0.1, ease: EASE }}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '0.9fr 1.35fr 1.25fr',
                  gap: 'var(--space-4)',
                  alignItems: 'center',
                  padding: 'var(--space-3) var(--space-5)',
                  border: `1px solid color-mix(in srgb, ${layer.accent} ${layer.hero ? '42%' : '24%'}, transparent)`,
                  borderLeft: `4px solid ${layer.accent}`,
                  borderRadius: 'var(--radius-md)',
                  background: layer.hero
                    ? 'color-mix(in srgb, var(--sage) 12%, var(--panel))'
                    : 'color-mix(in srgb, var(--panel) 68%, transparent)',
                }}
              >
                <div className="deck-display" style={{
                  fontSize: 'var(--fs-slide-tagline)',
                  color: layer.accent,
                  fontWeight: 750,
                  lineHeight: 1.15,
                }}>
                  {layer.label}
                </div>
                <div className="deck-body" style={{
                  fontSize: 'var(--fs-slide-subhead)',
                  color: 'var(--cream)',
                  lineHeight: 1.35,
                  opacity: 0.92,
                }}>
                  {layer.role}
                </div>
                <div className="deck-mono" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream-muted)',
                  letterSpacing: 'var(--ls-mono)',
                  lineHeight: 1.45,
                }}>
                  {layer.examples}
                </div>
              </motion.div>
            ))}
          </motion.div>

          {/* PUNCHLINE */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={go ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE, delay: 1.6 }}
            style={{
              padding: 'var(--space-3) var(--space-5)',
              background: 'color-mix(in srgb, var(--amber) 8%, transparent)',
              border: '1px solid color-mix(in srgb, var(--amber) 32%, transparent)',
              borderLeft: '4px solid var(--amber)',
              borderRadius: 'var(--radius-md)',
              maxWidth: '76ch',
            }}
          >
            <p className="deck-display" style={{
              margin: 0,
              fontSize: 'var(--fs-slide-tagline)',
              fontWeight: 600,
              lineHeight: 1.5,
              color: 'var(--cream)',
            }}>
              The claim is not superiority over validated platforms.
              The claim is <span style={{ color: 'var(--amber)', fontWeight: 800 }}>regulated orchestration</span>:{' '}
              keep validated tools, add state, privacy, audit, and review gates.
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Landscape"
        tagline="Personal research architecture: keep validated computation; organize the workflow around it."
        source="Sources · pharmAgent.md · ICH M15 · FDA AI draft guidance · public pharmacometric tool ecosystem"
        delay={1.85}
      />
    </SlideGrid>
  );
}

