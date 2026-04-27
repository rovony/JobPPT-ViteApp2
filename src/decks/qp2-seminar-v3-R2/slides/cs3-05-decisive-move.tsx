// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS3 Act 4 · The decisive move — privacy and audit by construction.
 *
 * Two architectural commitments that make model-as-answer acceptable
 * at regulatory scale.
 */

const COMMITMENTS = [
  {
    label: 'Privacy by Architecture',
    detail: 'SchemaExtractor separates raw rows from reasoning context. Local tools compute on the dataset; the LLM sees metadata, summaries, and typed state — not patient records.',
    accent: 'var(--sage)',
  },
  {
    label: 'Audit by Construction',
    detail: 'Every tool call records timestamp, agent, tool, input hash, output hash, and previous hash. If a past entry changes, the downstream chain breaks.',
    accent: 'var(--amber)',
  },
];

export default function CS3DecisiveMove() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Decisive move</Eyebrow>

      <Headline delay={0.25} maxChars={52}>
        The decisive move was not "use AI."{' '}
        <span style={{ color: 'var(--sage)' }}>
          It was privacy and audit by construction.
        </span>
      </Headline>

      <Subhead delay={0.55} maxChars={100} size="lead">
        The model can only become evidence if the data boundary and
        the evidence trail are architectural facts, not policy promises.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            width: '100%', height: '100%',
            display: 'grid',
            gridTemplateColumns: '1.2fr 1fr',
            gap: 'var(--space-6)',
            alignItems: 'stretch',
            paddingTop: 'var(--space-2)',
          }}
        >
          {/* LEFT COLUMN: Text Cards */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            {COMMITMENTS.map((c, i) => (
              <motion.div
                key={c.label}
                style={{
                  position: 'relative', overflow: 'hidden',
                  border: `1px solid color-mix(in srgb, ${c.accent} 30%, transparent)`,
                  borderRadius: 'var(--radius-lg)',
                  background: `linear-gradient(135deg,
                    color-mix(in srgb, ${c.accent} 12%, transparent),
                    color-mix(in srgb, var(--panel) 80%, transparent) 80%)`,
                  backdropFilter: 'blur(12px)',
                  boxShadow: `0 12px 32px color-mix(in srgb, ${c.accent} 8%, transparent)`,
                  padding: 'clamp(var(--space-5), 3vw, var(--space-8))',
                  display: 'flex', flexDirection: 'column', gap: 'var(--space-4)',
                  flex: 1, justifyContent: 'center',
                }}
                initial={{ opacity: 0, x: -20 }}
                animate={go ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.55, delay: 0.85 + i * 0.2, ease: [0.2, 0.7, 0.3, 1] }}
              >
                <div style={{
                  position: 'absolute', left: 0, top: 0, bottom: 0,
                  width: 4, background: c.accent,
                }} />

                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-3)' }}>
                  <div style={{
                    width: 36, height: 36, borderRadius: '50%',
                    background: `color-mix(in srgb, ${c.accent} 20%, transparent)`,
                    border: `2px solid color-mix(in srgb, ${c.accent} 60%, transparent)`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    flexShrink: 0,
                  }}>
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-eyebrow)', color: c.accent, fontWeight: 800,
                    }}>{i + 1}</span>
                  </div>
                  <span className="deck-mono uppercase" style={{
                    fontSize: 'var(--fs-slide-name)', color: c.accent,
                    letterSpacing: '0.08em', fontWeight: 800,
                  }}>{c.label}</span>
                </div>

                <div className="deck-body" style={{
                  fontSize: 'calc(var(--fs-slide-subhead) * 1.05)', color: 'var(--cream)',
                  lineHeight: 1.45, paddingLeft: 'calc(36px + var(--space-3))',
                }}>
                  {c.detail}
                </div>
              </motion.div>
            ))}
          </div>

          {/* RIGHT COLUMN: Visuals */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
            <motion.div
              style={{ flex: 1, minHeight: 0 }}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={go ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.0, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <PrivacySchematic />
            </motion.div>
            <motion.div
              style={{ flex: 1, minHeight: 0 }}
              initial={{ opacity: 0, scale: 0.95, x: 20 }}
              animate={go ? { opacity: 1, scale: 1, x: 0 } : {}}
              transition={{ duration: 0.6, delay: 1.2, ease: [0.2, 0.7, 0.3, 1] }}
            >
              <AuditSchematic />
            </motion.div>
          </div>
        </div>
      </Viz>

      <Footer
        delay={reduced ? 0 : 1.8}
        kicker="Act 4 · The turn"
        tagline="Privacy is a boundary; audit is a chain. Both have to exist before scale."
      />
    </SlideGrid>
  );
}

function PrivacySchematic() {
  return (
    <div style={{
      width: '100%', height: '100%',
      border: '1px solid color-mix(in srgb, var(--sage) 20%, transparent)',
      borderRadius: 'var(--radius-lg)',
      background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="deck-mono uppercase" style={{ position: 'absolute', top: 16, left: 24, fontSize: '11px', color: 'var(--sage)', letterSpacing: '0.1em', fontWeight: 700 }}>
        Architecture Topology
      </div>
      <svg viewBox="0 0 300 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ padding: 'var(--space-6)' }}>
        {/* Dataset */}
        <rect x="10" y="30" width="60" height="60" rx="8" fill="var(--bg)" stroke="var(--cream-hairline)" strokeWidth="2" />
        <text x="40" y="58" textAnchor="middle" fill="var(--cream)" fontSize="10" fontWeight="600" fontFamily="var(--font-mono)">DATASET</text>
        <text x="40" y="72" textAnchor="middle" fill="var(--cream-faint)" fontSize="8" fontFamily="var(--font-mono)">RAW PHI</text>

        {/* Schema Extractor */}
        <rect x="110" y="20" width="80" height="80" rx="8" fill="color-mix(in srgb, var(--sage) 15%, transparent)" stroke="var(--sage)" strokeWidth="2" />
        <text x="150" y="52" textAnchor="middle" fill="var(--sage)" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">SCHEMA</text>
        <text x="150" y="68" textAnchor="middle" fill="var(--sage)" fontSize="11" fontWeight="700" fontFamily="var(--font-mono)">EXTRACTOR</text>
        
        {/* Arrow 1 */}
        <line x1="75" y1="60" x2="102" y2="60" stroke="var(--sage)" strokeWidth="2" markerEnd="url(#arrow-sage)" />
        
        {/* LLM */}
        <rect x="230" y="30" width="60" height="60" rx="8" fill="var(--bg)" stroke="var(--cream-hairline)" strokeWidth="2" />
        <text x="260" y="58" textAnchor="middle" fill="var(--cream)" fontSize="10" fontWeight="600" fontFamily="var(--font-mono)">LLM</text>
        <text x="260" y="72" textAnchor="middle" fill="var(--cream-faint)" fontSize="8" fontFamily="var(--font-mono)">AGENT</text>

        {/* Arrow 2 (Safe) */}
        <line x1="195" y1="45" x2="222" y2="45" stroke="var(--sage)" strokeWidth="2" strokeDasharray="4 3" markerEnd="url(#arrow-sage)" />
        <text x="210" y="38" textAnchor="middle" fill="var(--sage)" fontSize="7" fontWeight="700" fontFamily="var(--font-mono)">METADATA</text>

        {/* Arrow 3 (Blocked) */}
        <line x1="195" y1="75" x2="220" y2="75" stroke="var(--coral)" strokeWidth="2" />
        <line x1="215" y1="65" x2="205" y2="85" stroke="var(--coral)" strokeWidth="2" />
        <text x="210" y="90" textAnchor="middle" fill="var(--coral)" fontSize="7" fontWeight="700" fontFamily="var(--font-mono)">RAW BLOCKED</text>

        <defs>
          <marker id="arrow-sage" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--sage)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}

function AuditSchematic() {
  return (
    <div style={{
      width: '100%', height: '100%',
      border: '1px solid color-mix(in srgb, var(--amber) 20%, transparent)',
      borderRadius: 'var(--radius-lg)',
      background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
      position: 'relative',
      overflow: 'hidden',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
    }}>
      <div className="deck-mono uppercase" style={{ position: 'absolute', top: 16, left: 24, fontSize: '11px', color: 'var(--amber)', letterSpacing: '0.1em', fontWeight: 700 }}>
        Hash Chain State
      </div>
      <svg viewBox="0 0 300 120" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ padding: 'var(--space-6)' }}>
        {/* Block N-1 */}
        <rect x="20" y="40" width="60" height="40" rx="6" fill="color-mix(in srgb, var(--amber) 12%, transparent)" stroke="var(--amber)" strokeWidth="1.5" />
        <text x="50" y="58" textAnchor="middle" fill="var(--amber)" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">HASH n-1</text>
        <text x="50" y="72" textAnchor="middle" fill="var(--cream-faint)" fontSize="8" fontFamily="var(--font-mono)">0x4A2B...</text>

        {/* Chain Link 1 */}
        <line x1="85" y1="60" x2="112" y2="60" stroke="var(--amber)" strokeWidth="2" markerEnd="url(#arrow-amber)" />
        <circle cx="100" cy="60" r="3" fill="var(--bg)" stroke="var(--amber)" strokeWidth="1.5" />

        {/* Tool Call N */}
        <rect x="120" y="20" width="60" height="80" rx="6" fill="var(--bg)" stroke="var(--cream-hairline)" strokeWidth="1.5" />
        <text x="150" y="38" textAnchor="middle" fill="var(--cream)" fontSize="9" fontWeight="700" fontFamily="var(--font-mono)">TOOL CALL</text>
        <line x1="125" y1="46" x2="175" y2="46" stroke="var(--cream-hairline)" strokeWidth="1" />
        <text x="150" y="60" textAnchor="middle" fill="var(--cream-muted)" fontSize="7.5" fontFamily="var(--font-mono)">Input Params</text>
        <text x="150" y="72" textAnchor="middle" fill="var(--cream-muted)" fontSize="7.5" fontFamily="var(--font-mono)">Agent ID</text>
        <text x="150" y="84" textAnchor="middle" fill="var(--cream-muted)" fontSize="7.5" fontFamily="var(--font-mono)">Timestamp</text>

        {/* Chain Link 2 */}
        <line x1="185" y1="60" x2="212" y2="60" stroke="var(--amber)" strokeWidth="2" markerEnd="url(#arrow-amber)" />
        <circle cx="200" cy="60" r="3" fill="var(--bg)" stroke="var(--amber)" strokeWidth="1.5" />

        {/* Block N */}
        <rect x="220" y="40" width="60" height="40" rx="6" fill="color-mix(in srgb, var(--amber) 25%, transparent)" stroke="var(--amber)" strokeWidth="2" />
        <text x="250" y="58" textAnchor="middle" fill="var(--amber)" fontSize="10" fontWeight="700" fontFamily="var(--font-mono)">HASH n</text>
        <text x="250" y="72" textAnchor="middle" fill="var(--cream)" fontSize="8" fontFamily="var(--font-mono)">0x9F8C...</text>

        <defs>
          <marker id="arrow-amber" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="5" markerHeight="5" orient="auto">
            <path d="M 0 0 L 10 5 L 0 10 z" fill="var(--amber)" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
