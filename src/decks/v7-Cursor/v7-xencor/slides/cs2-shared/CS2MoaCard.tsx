// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';

/**
 * CS2 MoaCard — persistent across slides 6 (foundation, large) and
 * 7 (lead, compact). Both slides mount this with layoutId="cs2-moa-pillar"
 * so framer-motion FLIPs the bounding box across the route change.
 *
 * Design language matches the cs2-disease-background StatCard:
 *  - 1px cream-hairline border + cyan-wash background (lead pillar
 *    distinguishes itself from the supporting 5 with the cyan tint)
 *  - Top cyan gradient bar on both variants
 *  - Large weight-700 hero treatment for the Foundation hero
 *  - Cyan mono uppercase section labels with --ls-mono-wide
 *  - Inter body in cream-muted at lineHeight 1.45
 */

const C = {
  cyan: 'var(--cyan)',
  cream: 'var(--cream)',
  creamMuted: 'var(--cream-muted)',
  creamFaint: 'var(--cream-faint)',
  panel: 'var(--panel)',
  hairline: 'var(--cream-hairline)',
};

const CARD_BASE_STYLE = {
  position: 'relative',
  overflow: 'hidden',
  background: 'var(--panel)',
  border: '1px solid var(--cream-hairline)',
  borderTop: '3px solid var(--cyan)',
  borderRadius: 'var(--radius-lg)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0, minHeight: 0,
};

/* ────────── FOUNDATION variant — slide 6, large MoaCard ──────────
 * Padding tightened from space-5 → space-4 (2026-04-26) to fit the
 * vertical pathway in the 50% column without overflow. min-height: 0 +
 * overflow: hidden cascade keeps content boxed inside the card. */
function FoundationContent() {
  return (
    <div style={{
      padding: 'var(--space-4)',
      flex: 1, display: 'flex', flexDirection: 'column',
      minHeight: 0, minWidth: 0, overflow: 'hidden',
    }}>
      {/* Eyebrow row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="deck-mono uppercase" style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono)', color: C.creamFaint,
          }}>
            Pillar 01 · Foundation
          </div>
          <div className="deck-mono uppercase" style={{
            fontSize: 'var(--fs-slide-eyebrow)',
            letterSpacing: 'var(--ls-mono)',
            color: C.cyan, fontWeight: 700,
            marginTop: 'var(--space-1)',
          }}>
            Mechanism of Action
          </div>
        </div>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)', color: C.cyan, fontWeight: 600,
        }}>
          Somatic
        </div>
      </div>

      {/* Hero typographic treatment — uses fluid display token for scaling */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <div className="deck-display" style={{
          fontSize: 'var(--fs-slide-display)',
          fontStyle: 'italic', fontWeight: 600,
          color: C.cyan, lineHeight: 0.95, letterSpacing: '-0.022em',
        }}>
          IDH1 R132
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-subhead)',
          color: C.creamMuted,
          marginTop: 'var(--space-2)',
          lineHeight: 1.4,
        }}>
          somatic point mutation · ~95% hotspot · Dang Cancer Cell 2009
        </div>
      </div>

      {/* Internal mechanism schematic */}
      <div style={{ marginTop: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <FoundationSchematic />
      </div>
    </div>
  );
}

/* FoundationSchematic — VERTICAL STACK (rebuilt 2026-04-26 after horizontal
 * SVG layout cramped boxes at the MoaCard's narrow column width, clipping
 * the "ivosidenib intervenes" label). Now HTML divs, one box per row,
 * full column width per box, scales naturally with the MoaCard. */
function FoundationSchematic() {
  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      gap: '4px',
      minWidth: 0, minHeight: 0,
      overflow: 'hidden',
    }}>
      {/* DISEASE PATHWAY — 3 stacked boxes with downward arrows */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono)',
        color: C.creamFaint,
        marginBottom: '2px',
      }}>
        Disease pathway
      </div>
      <PathwayBox kicker="Source" main="tumor cell" italic="IDH1 R132" tone="disease" />
      <PathwayArrow tone="disease" />
      <PathwayBox kicker="Neomorphic" main="↑ 2-HG" sub="↓ α-KG (substrate displaced)" tone="disease" />
      <PathwayArrow tone="disease" />
      <PathwayBox kicker="Downstream" main="TET2 · JmjC inhibited" italic="→ blocked differentiation" tone="disease" />

      {/* Intervention divider — full-width dashed cyan band with label */}
      <div style={{
        display: 'flex', alignItems: 'center', gap: 'var(--space-2)',
        marginTop: 'var(--space-2)', marginBottom: 'var(--space-1)',
      }}>
        <span style={{
          flex: 1, height: 0,
          borderTop: `1px dashed ${C.cyan}`,
        }} />
        <span className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: C.cyan,
          flex: '0 0 auto',
        }}>
          Ivosidenib intervenes
        </span>
        <span style={{
          flex: 1, height: 0,
          borderTop: `1px dashed ${C.cyan}`,
        }} />
      </div>

      {/* DRUG PATHWAY — 3 stacked boxes mirroring disease */}
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono)',
        color: C.cyan,
        marginBottom: '2px',
      }}>
        Drug pathway
      </div>
      <PathwayBox kicker="Drug" main="ivosidenib" sub="500 mg QD oral" tone="drug" />
      <PathwayArrow tone="drug" />
      <PathwayBox kicker="Binds" main="mutant IDH1" sub="α-KG production restored" tone="drug" />
      <PathwayArrow tone="drug" />
      <PathwayBox kicker="Restores" main="TET2 · JmjC active" italic="→ differentiation resumes" tone="drug" />
    </div>
  );
}

/* PathwayBox — single step in the vertical pathway. `tone` controls whether
 * it reads as "disease" (neutral cream/grey) or "drug" (cyan-tinted).
 * Padding tightened 2026-04-26 to fit 6 boxes + 2 arrows + intervention bar
 * within MoaCard's 50% column height without overflow. */
function PathwayBox({ kicker, main, sub, italic, tone }) {
  const isDrug = tone === 'drug';
  return (
    <div style={{
      padding: '4px var(--space-3)',
      background: isDrug
        ? 'color-mix(in srgb, var(--cyan) 8%, var(--panel))'
        : C.panel,
      border: isDrug
        ? '1px solid var(--cream-hairline)'
        : `1px solid ${C.creamFaint}`,
      borderRadius: 'var(--radius-sm)',
      display: 'flex', flexDirection: 'column',
      gap: 0,
      minWidth: 0,
    }}>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono)',
        color: isDrug ? C.cyan : C.creamFaint,
        fontWeight: 600,
      }}>
        {kicker}
      </div>
      <div className="deck-display" style={{
        fontSize: 'var(--fs-slide-subhead)',
        color: C.cream,
        lineHeight: 1.25,
        fontWeight: 500,
      }}>
        {main}
      </div>
      {sub && (
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-pageno)',
          color: C.creamMuted,
          lineHeight: 1.3,
        }}>
          {sub}
        </div>
      )}
      {italic && (
        <div className="deck-display" style={{
          fontStyle: 'italic',
          fontSize: 'var(--fs-slide-pageno)',
          color: isDrug ? C.cyan : C.creamMuted,
          lineHeight: 1.3,
        }}>
          {italic}
        </div>
      )}
    </div>
  );
}

/* PathwayArrow — small downward chevron between PathwayBox steps. */
function PathwayArrow({ tone }) {
  const color = tone === 'drug' ? C.cyan : C.creamFaint;
  return (
    <div aria-hidden style={{
      display: 'flex', justifyContent: 'center',
      lineHeight: 0,
    }}>
      <svg width="12" height="8" viewBox="0 0 12 8" style={{ display: 'block' }}>
        <path d="M 1 1 L 6 6 L 11 1" fill="none" stroke={color} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ────────── LEAD variant — slide 7, compact MoaCard (cols 1-2) ────────── */
function LeadContent() {
  return (
    <div style={{
      padding: 'var(--space-4)',
      flex: 1, display: 'flex', flexDirection: 'column',
    }}>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: 'var(--ls-mono)', color: C.creamFaint,
      }}>
        Pillar 01
      </div>
      <div className="deck-mono uppercase" style={{
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono)',
        color: C.cyan, fontWeight: 700,
        marginTop: 'var(--space-1)',
        lineHeight: 1.3,
      }}>
        MOA
      </div>

      <div className="deck-display" style={{
        fontSize: 'var(--fs-slide-lead)',
        fontStyle: 'italic', fontWeight: 600,
        color: C.cyan, lineHeight: 1, letterSpacing: '-0.018em',
        marginTop: 'var(--space-3)',
      }}>
        IDH1<br />R132
      </div>
      <div className="deck-display" style={{
        fontStyle: 'italic',
        fontSize: 'var(--fs-slide-subhead)',
        color: C.creamMuted,
        marginTop: 'var(--space-1)',
      }}>
        somatic mutation
      </div>

      <div style={{
        flex: 1,
        minHeight: 0,
        margin: 'var(--space-3) 0',
        position: 'relative',
      }}>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'flex-start' }}>
          <LeadSchematic />
        </div>
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'var(--fs-slide-subhead)',
        color: C.cream,
        lineHeight: 1.45,
        flex: 1,
      }}>
        Drug binds mutant enzyme directly. <span style={{ color: C.cyan }}>Biology conserved.</span>
      </div>
      <div className="deck-mono" style={{
        fontSize: 'var(--fs-slide-pageno)',
        letterSpacing: '0.04em',
        color: C.creamFaint,
        marginTop: 'var(--space-3)',
        paddingTop: 'var(--space-2)',
        borderTop: `1px solid ${C.hairline}`,
        lineHeight: 1.4,
      }}>
        Dang<br />Cancer Cell 2009
      </div>
    </div>
  );
}

function LeadSchematic() {
  return (
    <svg viewBox="0 0 60 140" width="100%" height="100%" preserveAspectRatio="xMinYMid meet" style={{ display: 'block' }}>
      <defs>
        <marker id="arr-c-lead" viewBox="0 0 5 5" refX="4" refY="2.5" markerWidth="5" markerHeight="5" orient="auto">
          <path d="M 0 0 L 5 2.5 L 0 5 z" style={{ fill: C.cyan }} />
        </marker>
      </defs>
      <circle cx="20" cy="14" r="8" style={{ fill: 'color-mix(in srgb, var(--cyan) 12%, transparent)', stroke: C.cyan, strokeWidth: 1 }} />
      <text x="34" y="16.5" textAnchor="start" fontSize="8" letterSpacing="0.5" fontWeight="600" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>MUT</text>

      <line x1="20" y1="22" x2="20" y2="58" markerEnd="url(#arr-c-lead)" style={{ stroke: C.cyan, strokeWidth: 1 }} />

      <circle cx="20" cy="68" r="8" style={{ fill: 'color-mix(in srgb, var(--cyan) 12%, transparent)', stroke: C.cyan, strokeWidth: 1 }} />
      <text x="20" y="71" textAnchor="middle" fontSize="7.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>2HG</text>
      <text x="34" y="70.5" textAnchor="start" fontSize="8" letterSpacing="0.5" fontWeight="600" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>↑ 2-HG</text>

      <line x1="20" y1="76" x2="20" y2="112" markerEnd="url(#arr-c-lead)" style={{ stroke: C.cyan, strokeWidth: 1 }} />

      <circle cx="20" cy="122" r="8" style={{ fill: C.cyan }} />
      <text x="20" y="125" textAnchor="middle" fontSize="8.5" fontWeight="700" style={{ fill: 'var(--bg)', fontFamily: 'var(--font-mono)' }}>Rx</text>
      <text x="34" y="124.5" textAnchor="start" fontSize="8" letterSpacing="0.5" fontWeight="600" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>DRUG</text>
    </svg>
  );
}

export default function CS2MoaCard({ variant = 'foundation', style }) {
  const isFoundation = variant === 'foundation';
  // NOTE: layoutId-based shared morph between slides 6→7 is parked.
  // It hung sibling framer animations on slide 7 (eyebrow + subhead +
  // Pillar entrances stuck at initial opacity). Both variants now mount
  // independently. The morph can be reintroduced once we isolate which
  // LayoutGroup interaction was blocking.
  return (
    <motion.div
      initial={false}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.3, 1] }}
      style={{ ...CARD_BASE_STYLE, ...style }}
    >
      {isFoundation ? <FoundationContent /> : <LeadContent />}
    </motion.div>
  );
}
