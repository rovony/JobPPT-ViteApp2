// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EASE = [0.2, 0.7, 0.3, 1];

/**
 * CS3 · Competitive landscape — what others built, what's still missing.
 *
 * Built 2026-04-26 in response to fixes-on-v6.md ask to include
 * competitors. Closes the can-of-worms: "what's already out there
 * and how is yours different?"
 *
 * Story: every published system covers ONE component of the
 * pharmacometric workflow. PharmAgent is the first to cover the
 * full pipeline AND be designed M15-native from day one.
 *
 * Data source: pharmAgent.md "The Current Landscape" + Theme D research.
 */

const COMPETITORS = [
  {
    name: 'Apollo-AI',
    org: 'Pfizer · Shahin et al.',
    pub: 'CTS 2025',
    scope: 'Conceptual framework',
    coverage: { data: 0, nca: 0, popPK: 0, qc: 0, sim: 0, report: 0, audit: 0, m15: 0 },
    note: 'Theory; no public implementation',
    accent: 'var(--cream-faint)',
  },
  {
    name: 'pyDarwin',
    org: 'AstraZeneca',
    pub: 'Open source',
    scope: 'Model search only',
    coverage: { data: 0, nca: 0, popPK: 1, qc: 0, sim: 0, report: 0, audit: 0, m15: 0 },
    note: 'Genetic-algorithm PopPK structural search',
    accent: 'var(--cream-faint)',
  },
  {
    name: 'DeepPumas',
    org: 'PumasAI',
    pub: 'Commercial',
    scope: 'Hybrid neural-ODE',
    coverage: { data: 0, nca: 0, popPK: 1, qc: 0, sim: 1, report: 0, audit: 0, m15: 0 },
    note: 'NN inside compartmental models',
    accent: 'var(--cream-faint)',
  },
  {
    name: 'PEARL',
    org: 'U Buffalo · Waikar',
    pub: 'CPT:PSP 2026',
    scope: 'RAG over guidances',
    coverage: { data: 0, nca: 0, popPK: 0, qc: 0, sim: 0, report: 0, audit: 0, m15: 1 },
    note: 'Regulatory question-answering',
    accent: 'var(--cream-faint)',
  },
  {
    name: 'QSP-Copilot',
    org: 'Saini et al.',
    pub: 'CPT:PSP 2026',
    scope: 'QSP modeling',
    coverage: { data: 0, nca: 0, popPK: 0, qc: 0, sim: 1, report: 0, audit: 0, m15: 0 },
    note: 'Multi-agent QSP, adjacent domain',
    accent: 'var(--cream-faint)',
  },
  {
    name: 'PharmAgent',
    org: 'Okour · personal',
    pub: 'v1.0 · Feb 2026',
    scope: 'Full pipeline',
    coverage: { data: 1, nca: 1, popPK: 1, qc: 1, sim: 1, report: 1, audit: 1, m15: 1 },
    note: '13 agents · 151 tools · 76 templates · M15-native',
    accent: 'var(--sage)',
    hero: true,
  },
];

const COL_KEYS = [
  { k: 'data',   label: 'Data' },
  { k: 'nca',    label: 'NCA' },
  { k: 'popPK',  label: 'PopPK' },
  { k: 'qc',     label: 'QC' },
  { k: 'sim',    label: 'Sim' },
  { k: 'report', label: 'Report' },
  { k: 'audit',  label: 'Audit' },
  { k: 'm15',    label: 'M15' },
];

export default function CS3Landscape() {
  const reduce = useReducedMotion();
  const go = !reduce;

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Case 03 · Competitive landscape</Eyebrow>

      <Headline delay={0.25} maxChars={56}>
        Each tool solves one cell.{' '}
        <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>PharmAgent owns the row.</span>
      </Headline>

      <Subhead delay={0.45} size="lead" maxChars={120}>
        Five published or commercial systems address fragments of the
        pharmacometric workflow. None covers the full pipeline. None was
        designed M15-native from day one.
      </Subhead>

      <Viz>
        <div style={{
          width: '100%', height: '100%',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-3)',
        }}>
          {/* COVERAGE MATRIX */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={go ? { opacity: 1 } : {}}
            transition={{ duration: 0.4, ease: EASE, delay: 0.6 }}
            style={{
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
              overflow: 'hidden',
              flex: '1 1 0%',
              minHeight: 0,
              display: 'grid',
              gridTemplateRows: 'auto 1fr',
            }}
          >
            {/* HEADER ROW */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '2.4fr repeat(8, 1fr) 2.6fr',
              gap: 'var(--space-1)',
              padding: 'var(--space-2) var(--space-4)',
              borderBottom: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--sage) 4%, transparent)',
            }}>
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream)',
                opacity: 0.78,
                letterSpacing: 'var(--ls-mono-wide)',
              }}>System · org</span>
              {COL_KEYS.map((c) => (
                <span key={c.k} className="deck-mono uppercase" style={{
                  fontSize: 'var(--fs-slide-pageno)',
                  color: 'var(--cream)',
                  opacity: 0.65,
                  letterSpacing: 'var(--ls-mono-wide)',
                  textAlign: 'center',
                }}>{c.label}</span>
              ))}
              <span className="deck-mono uppercase" style={{
                fontSize: 'var(--fs-slide-pageno)',
                color: 'var(--cream)',
                opacity: 0.78,
                letterSpacing: 'var(--ls-mono-wide)',
                paddingLeft: 'var(--space-2)',
              }}>Scope · note</span>
            </div>

            {/* ROWS */}
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              {COMPETITORS.map((row, rowIdx) => (
                <motion.div
                  key={row.name}
                  initial={{ opacity: 0, x: -8 }}
                  animate={go ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.4, delay: 0.75 + rowIdx * 0.08, ease: EASE }}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '2.4fr repeat(8, 1fr) 2.6fr',
                    gap: 'var(--space-1)',
                    padding: 'var(--space-2) var(--space-4)',
                    alignItems: 'center',
                    borderBottom: rowIdx < COMPETITORS.length - 1
                      ? '1px solid color-mix(in srgb, var(--cream-hairline) 50%, transparent)'
                      : 'none',
                    background: row.hero
                      ? 'color-mix(in srgb, var(--sage) 10%, transparent)'
                      : 'transparent',
                    borderLeft: row.hero ? '3px solid var(--sage)' : '3px solid transparent',
                  }}
                >
                  {/* NAME + ORG */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 1, minWidth: 0 }}>
                    <span className="deck-display" style={{
                      fontSize: 'var(--fs-slide-tagline)',
                      fontWeight: row.hero ? 700 : 600,
                      color: row.hero ? 'var(--sage)' : 'var(--cream)',
                    }}>{row.name}</span>
                    <span className="deck-mono" style={{
                      fontSize: 'var(--fs-slide-pageno)',
                      color: 'var(--cream)',
                      opacity: 0.55,
                    }}>{row.org} · {row.pub}</span>
                  </div>

                  {/* COVERAGE CELLS */}
                  {COL_KEYS.map((c) => (
                    <CoverageCell
                      key={c.k}
                      filled={!!row.coverage[c.k]}
                      tone={row.hero ? 'var(--sage)' : 'var(--cream-faint)'}
                    />
                  ))}

                  {/* NOTE */}
                  <span className="deck-body" style={{
                    fontSize: 'var(--fs-slide-pageno)',
                    color: 'var(--cream)',
                    opacity: row.hero ? 0.95 : 0.7,
                    fontStyle: row.hero ? 'normal' : 'italic',
                    fontWeight: row.hero ? 600 : 400,
                    lineHeight: 1.35,
                    paddingLeft: 'var(--space-2)',
                  }}>{row.note}</span>
                </motion.div>
              ))}
            </div>
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
              The gap is not <em>capability</em> — every cell here works in isolation.
              The gap is <span style={{ color: 'var(--amber)', fontWeight: 800 }}>integration with audit</span>{' '}
              and <span style={{ color: 'var(--amber)', fontWeight: 800 }}>privacy by construction.</span>{' '}
              That is what M15 will reward.
            </p>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Case 03 · Landscape"
        tagline="Five tools. One row that crosses every column."
        source="Sources · Shahin CTS 2025 · pyDarwin GH · DeepPumas · PEARL CPT:PSP 2026 · QSP-Copilot CPT:PSP 2026 · pharmAgent.md"
        delay={1.85}
      />
    </SlideGrid>
  );
}

function CoverageCell({ filled, tone }) {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}>
      <div style={{
        width: 16,
        height: 16,
        borderRadius: '50%',
        background: filled ? tone : 'transparent',
        border: filled ? 'none' : `1.5px solid color-mix(in srgb, ${tone} 35%, transparent)`,
        boxShadow: filled ? `0 0 8px color-mix(in srgb, ${tone} 40%, transparent)` : 'none',
      }} />
    </div>
  );
}
