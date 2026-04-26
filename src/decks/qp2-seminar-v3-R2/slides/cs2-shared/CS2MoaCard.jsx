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
  background: 'color-mix(in srgb, var(--cyan) 9%, transparent)',
  border: `1px solid color-mix(in srgb, var(--cyan) 28%, transparent)`,
  borderRadius: 'var(--radius-lg)',
  display: 'flex',
  flexDirection: 'column',
  minWidth: 0, minHeight: 0,
};

function TopBar() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: 2,
        background: 'linear-gradient(90deg, var(--cyan) 0%, color-mix(in srgb, var(--cyan) 35%, transparent) 100%)',
      }}
    />
  );
}

/* ────────── FOUNDATION variant — slide 6, large MoaCard ────────── */
function FoundationContent() {
  return (
    <div style={{
      padding: 'var(--space-5)',
      flex: 1, display: 'flex', flexDirection: 'column',
    }}>
      {/* Eyebrow row */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
        <div>
          <div className="deck-mono uppercase" style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono-wide)', color: C.creamFaint,
          }}>
            Pillar 01 · Foundation
          </div>
          <div className="deck-mono uppercase" style={{
            fontSize: 'clamp(0.78rem, min(1.1vw, 1.7vh), 1rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: C.cyan, fontWeight: 700,
            marginTop: 'var(--space-1)',
          }}>
            Mechanism of Action
          </div>
        </div>
        <div className="deck-mono uppercase" style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)', color: C.cyan, fontWeight: 600,
        }}>
          Somatic
        </div>
      </div>

      {/* Hero typographic treatment — matches StatCard numeral scale */}
      <div style={{ marginTop: 'var(--space-4)' }}>
        <div className="deck-display" style={{
          fontSize: 'clamp(2.2rem, min(4.2vw, 6.8vh), 4.4rem)',
          fontStyle: 'italic', fontWeight: 600,
          color: C.cyan, lineHeight: 0.95, letterSpacing: '-0.022em',
        }}>
          IDH1 R132
        </div>
        <div style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.82rem, min(1.05vw, 1.6vh), 1rem)',
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

function FoundationSchematic() {
  return (
    <svg viewBox="0 0 420 156" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <defs>
        <marker id="arr-mute-foundation" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 6 3 L 0 6 z" style={{ fill: C.creamFaint }} />
        </marker>
        <marker id="arr-cyan-foundation" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
          <path d="M 0 0 L 6 3 L 0 6 z" style={{ fill: C.cyan }} />
        </marker>
      </defs>

      {/* DISEASE PATHWAY */}
      <text x="0" y="14" fontSize="9" letterSpacing="1.4" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>DISEASE PATHWAY</text>

      <g transform="translate(0, 28)">
        <rect x="0" y="0" width="84" height="34" rx="3" style={{ fill: C.panel, stroke: C.creamFaint, strokeWidth: 1 }} />
        <text x="42" y="14" textAnchor="middle" fontSize="10" style={{ fill: C.creamMuted, fontFamily: 'var(--font-display)' }}>tumor cell</text>
        <text x="42" y="26" textAnchor="middle" fontSize="11" fontStyle="italic" style={{ fill: C.cream, fontFamily: 'var(--font-display)' }}>IDH1 R132</text>
      </g>
      <path d="M 86 45 L 110 45" fill="none" markerEnd="url(#arr-mute-foundation)" style={{ stroke: C.creamFaint, strokeWidth: 1 }} />

      <g transform="translate(112, 28)">
        <rect x="0" y="0" width="80" height="34" rx="3" style={{ fill: C.panel, stroke: C.creamFaint, strokeWidth: 1 }} />
        <text x="40" y="14" textAnchor="middle" fontSize="9" letterSpacing="0.8" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>PRODUCES</text>
        <text x="40" y="26" textAnchor="middle" fontSize="11" style={{ fill: C.cream, fontFamily: 'var(--font-display)' }}>↑ 2-HG</text>
      </g>
      <path d="M 194 45 L 218 45" fill="none" markerEnd="url(#arr-mute-foundation)" style={{ stroke: C.creamFaint, strokeWidth: 1 }} />

      <g transform="translate(220, 28)">
        <rect x="0" y="0" width="120" height="34" rx="3" style={{ fill: C.panel, stroke: C.creamFaint, strokeWidth: 1 }} />
        <text x="60" y="14" textAnchor="middle" fontSize="9" letterSpacing="0.8" style={{ fill: C.creamFaint, fontFamily: 'var(--font-mono)' }}>RESULTS IN</text>
        <text x="60" y="26" textAnchor="middle" fontSize="11" fontStyle="italic" style={{ fill: C.creamMuted, fontFamily: 'var(--font-display)' }}>blocked differentiation</text>
      </g>

      <line x1="280" y1="64" x2="280" y2="84" strokeDasharray="2 2" style={{ stroke: C.cyan, strokeWidth: 1.5 }} />
      <text x="290" y="78" fontSize="9" letterSpacing="0.8" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>ivosidenib intervenes</text>

      {/* DRUG PATHWAY */}
      <text x="0" y="98" fontSize="9" letterSpacing="1.4" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>DRUG PATHWAY</text>

      <g transform="translate(0, 112)">
        <rect x="0" y="0" width="84" height="34" rx="3"
          style={{ fill: 'color-mix(in srgb, var(--cyan) 8%, transparent)', stroke: 'color-mix(in srgb, var(--cyan) 35%, transparent)', strokeWidth: 1 }} />
        <text x="42" y="14" textAnchor="middle" fontSize="9" letterSpacing="0.8" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>DRUG</text>
        <text x="42" y="26" textAnchor="middle" fontSize="11" fontStyle="italic" style={{ fill: C.cream, fontFamily: 'var(--font-display)' }}>ivosidenib</text>
      </g>
      <path d="M 86 129 L 110 129" fill="none" markerEnd="url(#arr-cyan-foundation)" style={{ stroke: C.cyan, strokeWidth: 1.5 }} />

      <g transform="translate(112, 112)">
        <rect x="0" y="0" width="80" height="34" rx="3"
          style={{ fill: 'color-mix(in srgb, var(--cyan) 8%, transparent)', stroke: 'color-mix(in srgb, var(--cyan) 35%, transparent)', strokeWidth: 1 }} />
        <text x="40" y="14" textAnchor="middle" fontSize="9" letterSpacing="0.8" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>BINDS</text>
        <text x="40" y="26" textAnchor="middle" fontSize="11" style={{ fill: C.cream, fontFamily: 'var(--font-display)' }}>mutant IDH1</text>
      </g>
      <path d="M 194 129 L 218 129" fill="none" markerEnd="url(#arr-cyan-foundation)" style={{ stroke: C.cyan, strokeWidth: 1.5 }} />

      <g transform="translate(220, 112)">
        <rect x="0" y="0" width="120" height="34" rx="3"
          style={{ fill: 'color-mix(in srgb, var(--cyan) 8%, transparent)', stroke: 'color-mix(in srgb, var(--cyan) 35%, transparent)', strokeWidth: 1 }} />
        <text x="60" y="14" textAnchor="middle" fontSize="9" letterSpacing="0.8" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>RESTORES</text>
        <text x="60" y="26" textAnchor="middle" fontSize="11" fontStyle="italic" style={{ fill: C.cyan, fontFamily: 'var(--font-display)' }}>↓ 2-HG · diff. resumes</text>
      </g>
    </svg>
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
        letterSpacing: 'var(--ls-mono-wide)', color: C.creamFaint,
      }}>
        Pillar 01
      </div>
      <div className="deck-mono uppercase" style={{
        fontSize: 'clamp(0.7rem, min(1vw, 1.5vh), 0.92rem)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: C.cyan, fontWeight: 700,
        marginTop: 'var(--space-1)',
        lineHeight: 1.3,
      }}>
        MOA
      </div>

      <div className="deck-display" style={{
        fontSize: 'clamp(1.4rem, min(2.2vw, 3.6vh), 2.2rem)',
        fontStyle: 'italic', fontWeight: 600,
        color: C.cyan, lineHeight: 1, letterSpacing: '-0.018em',
        marginTop: 'var(--space-3)',
      }}>
        IDH1<br />R132
      </div>
      <div className="deck-display" style={{
        fontStyle: 'italic',
        fontSize: 'clamp(0.78rem, min(1vw, 1.5vh), 0.95rem)',
        color: C.creamMuted,
        marginTop: 'var(--space-1)',
      }}>
        somatic mutation
      </div>

      <div style={{
        flex: '0 0 auto',
        height: 'clamp(56px, 11vh, 88px)',
        margin: 'var(--space-3) 0',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}>
        <LeadSchematic />
      </div>

      <div style={{
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.78rem, min(1vw, 1.5vh), 0.95rem)',
        color: C.cream,
        lineHeight: 1.45,
        flex: 1,
      }}>
        Drug binds mutant enzyme directly. <span style={{ color: C.cyan }}>Biology conserved.</span>
      </div>
      <div className="deck-mono" style={{
        fontSize: 'clamp(0.66rem, min(0.85vw, 1.3vh), 0.8rem)',
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
    <svg viewBox="0 0 140 60" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" style={{ display: 'block' }}>
      <defs>
        <marker id="arr-c-lead" viewBox="0 0 5 5" refX="4" refY="2.5" markerWidth="5" markerHeight="5" orient="auto-start-reverse">
          <path d="M 0 0 L 5 2.5 L 0 5 z" style={{ fill: C.cyan }} />
        </marker>
      </defs>
      <circle cx="14" cy="20" r="8" style={{ fill: 'color-mix(in srgb, var(--cyan) 12%, transparent)', stroke: C.cyan, strokeWidth: 1 }} />
      <text x="14" y="42" textAnchor="middle" fontSize="7.5" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>MUT</text>

      <line x1="22" y1="20" x2="58" y2="20" markerEnd="url(#arr-c-lead)" style={{ stroke: C.cyan, strokeWidth: 1 }} />

      <circle cx="68" cy="20" r="8" style={{ fill: 'color-mix(in srgb, var(--cyan) 12%, transparent)', stroke: C.cyan, strokeWidth: 1 }} />
      <text x="68" y="23" textAnchor="middle" fontSize="7" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>2HG</text>
      <text x="68" y="42" textAnchor="middle" fontSize="7.5" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>↑ 2-HG</text>

      <line x1="76" y1="20" x2="112" y2="20" markerEnd="url(#arr-c-lead)" style={{ stroke: C.cyan, strokeWidth: 1 }} />

      <circle cx="122" cy="20" r="8" style={{ fill: C.cyan }} />
      <text x="122" y="23" textAnchor="middle" fontSize="8" fontWeight="600" style={{ fill: 'var(--bg)', fontFamily: 'var(--font-mono)' }}>Rx</text>
      <text x="122" y="42" textAnchor="middle" fontSize="7.5" letterSpacing="0.5" style={{ fill: C.cyan, fontFamily: 'var(--font-mono)' }}>DRUG</text>
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1] }}
      style={{ ...CARD_BASE_STYLE, ...style }}
    >
      <TopBar />
      {isFoundation ? <FoundationContent /> : <LeadContent />}
    </motion.div>
  );
}
