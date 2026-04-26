// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import { Bot, Activity, Wrench } from 'lucide-react';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';
import { QP2_THEMES } from '../themes';

/**
 * Slide 33 · Leadership principles — Three principles for leading
 * quantitative pharmacology in the next five years.
 *
 * Manifesto-stack composition (Option a per the closing-arc brief):
 * three principles arranged as a vertical typographic stack — each
 * a moment of three-column anatomy (oversized numeral · theme glyph
 * · principle title + elaboration), separated by full-bleed hairlines.
 * Reads like a leader's manifesto, not a checklist.
 *
 * The themes vocabulary from `themes.js` carries through here: each
 * principle is paired with the QP2 theme glyph it instantiates, so
 * the icons the audience first met on slide 30 keep accruing meaning
 * across the closing arc (30 = preview · 31/32/33/34 = exercises).
 *
 * The bottom pair — AI/ML research strip + ICH M15 pipeline bridge —
 * stays as the technical receipts beneath the philosophy. They earn
 * a quieter visual register so the manifesto carries the weight.
 */

// Per zaj-slides P5 case-color contract: coral / cyan / violet are
// reserved for CS1 / CS2 / CS3. Principles + research cards use only
// deck-neutral tokens (amber, sage, cream, cream-muted) so the
// leadership claim doesn't accidentally inherit case identity. The
// pipeline-bridge ribbon at the bottom is the one place case colors
// reappear — there they're earned, naming specific case templates.
const PRINCIPLES = [
  {
    num: '01',
    title: 'QP as strategic architecture',
    elaboration:
      'The group that decides what evidence is needed and what the regulator will accept — upstream of study execution, not downstream.',
    themeKey: 'qp-replaces-study',
    accent: 'amber',
  },
  {
    num: '02',
    title: 'Scaffolds over templates',
    elaboration:
      'Each case study is an instance; the scaffold is the durable output. Framework identity outlasts any single analysis.',
    themeKey: 'novel-methods',
    accent: 'sage',
  },
  {
    num: '03',
    title: 'Teams over deliverables',
    elaboration:
      'PhD fellows and junior pharmacometricians mentored into regulatory-thinking scientists — capability compounds when you invest in the strategic layer.',
    themeKey: 'judgment',
    accent: 'amber',
  },
];

// Resolve theme metadata at module load (titles + glyphs are stable).
const THEME_BY_KEY = Object.fromEntries(QP2_THEMES.map((t) => [t.key, t]));

const RESEARCH_CARDS = [
  {
    key: 'pharmagent',
    icon: Bot,
    badge: 'Multi-agent',
    title: 'PharmAgent',
    spec: '13 agents · 151 tools',
    detail: 'End-to-end pharmacometric workflows — NONMEM automation, QC, regulatory drafting.',
    themeKey: 'novel-methods',
    token: 'amber',
    MiniViz: AgentHierarchyViz,
  },
  {
    key: 'deeppk',
    icon: Activity,
    badge: 'Neural ODE',
    title: 'DeepPK',
    spec: 'Neural + compartmental',
    detail: 'Neural ODE approach to PopPK structure learning for hybrid mechanistic + neural inference.',
    themeKey: 'qp-replaces-study',
    token: 'sage',
    MiniViz: NeuralODEViz,
  },
  {
    key: 'dosepredict',
    icon: Wrench,
    badge: 'Peer-reviewed',
    title: 'DosePredict',
    spec: 'R Shiny · JCP 2020',
    detail: 'Individual-patient dose adjustment — published JCP 2020, released on GitHub.',
    themeKey: 'dose-precision',
    token: 'cream-muted',
    MiniViz: DoseResponseViz,
  },
];

export default function Slide33LeadershipPrinciples() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    principle1: 0.85,
    principle2: 1.20,
    principle3: 1.55,
    researchLabel: 2.25,
    research: 2.45,
    ribbon: 3.30,
    source: 3.05,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  const principleDelays = [D.principle1, D.principle2, D.principle3];

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Leadership · Manifesto</Eyebrow>
      <Headline delay={D.headline} maxChars={56}>
        Three principles for leading{' '}
        <span style={{ color: 'var(--amber)', fontStyle: 'italic', fontWeight: 700 }}>
          quantitative pharmacology
        </span>{' '}
        in the next five years.
      </Headline>

      <Viz>
        <div
          style={{
            width: '100%',
            height: '100%',
            display: 'grid',
            gridTemplateRows: 'minmax(0, 1.6fr) auto auto',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ─── Manifesto stack — three principles, vertical ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateRows: 'repeat(3, minmax(0, 1fr))',
              minHeight: 0,
              borderTop: '1px solid var(--cream-hairline)',
              borderBottom: '1px solid var(--cream-hairline)',
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <PrincipleRow
                key={p.num}
                principle={p}
                theme={THEME_BY_KEY[p.themeKey]}
                delay={principleDelays[i]}
                isFirst={i === 0}
                tk={tk}
              />
            ))}
          </div>

          {/* ─── Research strip · three cards. The cards' own
              "MULTI-AGENT / NEURAL ODE / PEER-REVIEWED" eyebrows already
              telegraph that this row is the AI/ML research front — no
              standalone label needed at slide scale. ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            {RESEARCH_CARDS.map((c, i) => (
              <ResearchCard
                key={c.key}
                card={c}
                theme={THEME_BY_KEY[c.themeKey]}
                delay={D.research + i * 0.12}
                tk={tk}
              />
            ))}
          </div>

          {/* ─── ICH M15 / pipeline-bridge ribbon ─── */}
          <motion.div
            style={{
              alignSelf: 'end',
              padding: 'var(--space-4) var(--space-5)',
              border: '1px solid color-mix(in srgb, var(--amber) 40%, var(--cream-hairline))',
              borderLeft: '3px solid var(--amber)',
              background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
              display: 'grid',
              gridTemplateColumns: 'auto 1fr',
              columnGap: 'var(--space-5)',
              alignItems: 'center',
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease, delay: D.ribbon }}
          >
            <div
              className="deck-mono uppercase"
              style={{
                fontSize: 'var(--fs-card-label)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--amber)',
                fontWeight: 700,
                whiteSpace: 'nowrap',
              }}
            >
              ICH M15 · Step 4
              <br />
              Feb 2026 · EU effective Jul 2026
            </div>
            <div
              style={{
                fontSize: 'var(--fs-card-body)',
                color: 'var(--cream-muted)',
                lineHeight: 1.5,
              }}
            >
              <span style={{ color: 'var(--cream)', fontWeight: 600 }}>
                Where this lands — pipeline bridge.
              </span>{' '}
              WINREVAIR pediatric extrapolation (MOONBEAM, 2028) ←{' '}
              <span style={{ color: 'var(--coral)', fontWeight: 600 }}>CS1 template</span>.
              Enlicitide CORALreef LDL-C reduction ←{' '}
              <span style={{ color: 'var(--violet)', fontWeight: 600 }}>CS3 modeling template</span>.
              HRS-5346 · MK-2060 ← breadth mapping. Operating under the{' '}
              <span style={{ color: 'var(--cream)', fontStyle: 'italic' }}>
                first global MIDD guideline.
              </span>
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="Closing · 33 of 35"
        source="Source · ICH M15 Step 4 · Feb 2026 · DosePredict JCP 2020 · DeepPK + PharmAgent (active)"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ============================================================
   PrincipleRow — one entry in the manifesto stack.
   Anatomy (left → right):
     · oversized numeral (01) in the accent token
     · vertical hairline divider
     · theme glyph + theme key (Act IV vocabulary callback)
     · principle title (display) over the elaboration (italic)
   No card chrome — the rule between rows is the only structure.
   ============================================================ */
function PrincipleRow({ principle, theme, delay, isFirst, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const accent = tk(`--${principle.accent}`);
  const themeColor = theme ? tk(`--${theme.token}`) : tk('--cream-muted');

  return (
    <motion.div
      style={{
        display: 'grid',
        gridTemplateColumns: 'minmax(96px, 0.16fr) auto minmax(110px, 0.28fr) 1fr',
        columnGap: 'var(--space-5)',
        alignItems: 'center',
        padding: 'var(--space-3) var(--space-3)',
        borderTop: isFirst ? 'none' : '1px solid var(--cream-hairline)',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      {/* Column 1 · Oversized numeral */}
      <div
        className="deck-display tabular-nums"
        style={{
          color: accent,
          fontSize: 'clamp(2.4rem, min(4.4vw, 6vh), 5rem)',
          fontWeight: 700,
          lineHeight: 0.9,
          letterSpacing: '-0.01em',
          textAlign: 'left',
        }}
      >
        {principle.num}
      </div>

      {/* Column 2 · Vertical hairline divider */}
      <div
        aria-hidden
        style={{
          width: 1,
          alignSelf: 'stretch',
          background: 'var(--cream-hairline)',
        }}
      />

      {/* Column 3 · Theme glyph + theme name (Act IV vocabulary) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 10,
            color: themeColor,
          }}
        >
          <span
            aria-hidden
            className="deck-display"
            style={{
              fontSize: 'clamp(1.4rem, 1.8vw, 1.9rem)',
              lineHeight: 1,
              fontWeight: 700,
            }}
          >
            {theme?.glyph ?? '·'}
          </span>
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-card-meta)',
              letterSpacing: 'var(--ls-mono)',
              fontWeight: 700,
              color: themeColor,
            }}
          >
            {theme?.num ?? ''}
          </span>
        </div>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {theme?.title ?? 'Theme'}
        </span>
      </div>

      {/* Column 4 · Principle title + elaboration */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, minWidth: 0 }}>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.05rem, min(1.45vw, 2.1vh), 1.55rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.2,
          }}
        >
          {principle.title}
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.45,
          }}
        >
          {principle.elaboration}
        </div>
      </div>
    </motion.div>
  );
}

/* ============================================================
   ResearchCard — bottom-row AI/ML card with mini SVG diagram.
   ============================================================ */
function ResearchCard({ card, theme, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const Icon = card.icon;
  const MiniViz = card.MiniViz;
  const color = tk(`--${card.token}`);
  const themeColor = theme ? tk(`--${theme.token}`) : color;
  return (
    <motion.div
      style={{
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${color}`,
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto 1fr',
        rowGap: 'var(--space-2)',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* Top: Icon + text */}
      <div style={{ display: 'grid', gridTemplateColumns: 'auto 1fr auto', columnGap: 'var(--space-3)', alignItems: 'start' }}>
        <div
          style={{
            width: 32, height: 32,
            background: `color-mix(in srgb, ${color} 14%, transparent)`,
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            marginTop: 2,
          }}
        >
          <Icon size={16} strokeWidth={1.8} color={color} aria-hidden />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
          <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', color, fontWeight: 700 }}>
            {card.badge}
          </div>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 8, flexWrap: 'wrap' }}>
            <span className="deck-display" style={{ fontSize: 'var(--fs-card-title)', color: 'var(--cream)', fontWeight: 700 }}>{card.title}</span>
            <span className="deck-mono" style={{ fontSize: 'var(--fs-card-label)', color: 'var(--cream-faint)', fontWeight: 500 }}>· {card.spec}</span>
          </div>
          <div className="deck-display italic" style={{ fontSize: 'var(--fs-card-body)', color: 'var(--cream-muted)', lineHeight: 1.4 }}>
            {card.detail}
          </div>
        </div>

        {theme && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, paddingLeft: 'var(--space-2)', borderLeft: '1px dashed var(--cream-hairline)', color: themeColor }}>
            <span aria-hidden className="deck-display" style={{ fontSize: 'clamp(1rem, 1.3vw, 1.3rem)', lineHeight: 1, fontWeight: 700 }}>{theme.glyph}</span>
            <span className="deck-mono" style={{ fontSize: 'var(--fs-card-meta)', letterSpacing: 'var(--ls-mono)', fontWeight: 700 }}>{theme.num}</span>
          </div>
        )}
      </div>

      {/* Bottom: Mini SVG architecture diagram */}
      {MiniViz && (
        <motion.div
          style={{ borderTop: '1px solid var(--cream-hairline)', paddingTop: 'var(--space-2)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: delay + 0.3 }}
        >
          <MiniViz color={color} />
        </motion.div>
      )}
    </motion.div>
  );
}

/* ============================================================
   Mini architecture SVGs for research cards
   ============================================================ */
function AgentHierarchyViz({ color }) {
  return (
    <svg viewBox="0 0 200 50" style={{ width: '100%', height: 'auto', maxHeight: 48 }} aria-label="Agent hierarchy">
      {/* Supervisor */}
      <circle cx={100} cy={10} r={6} fill={color} opacity={0.8} />
      <text x={100} y={10} textAnchor="middle" dominantBaseline="middle" fill="var(--bg)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>S</text>
      {/* Lines to coordinators */}
      <line x1={100} y1={16} x2={50} y2={28} stroke={color} strokeWidth={1} opacity={0.4} />
      <line x1={100} y1={16} x2={100} y2={28} stroke={color} strokeWidth={1} opacity={0.4} />
      <line x1={100} y1={16} x2={150} y2={28} stroke={color} strokeWidth={1} opacity={0.4} />
      {/* Coordinators */}
      {[50, 100, 150].map((cx) => (
        <circle key={cx} cx={cx} cy={32} r={4} fill="none" stroke={color} strokeWidth={1.2} opacity={0.6} />
      ))}
      {/* Worker dots */}
      {[25, 40, 60, 75, 90, 110, 125, 140, 160, 175].map((cx) => (
        <circle key={cx} cx={cx} cy={46} r={2} fill={color} opacity={0.25} />
      ))}
      {/* Labels */}
      <text x={4} y={10} fill="var(--cream-muted)" style={{ fontSize: 6, fontFamily: 'var(--font-mono)' }}>SUPERVISOR</text>
      <text x={4} y={32} fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>COORDINATORS</text>
      <text x={4} y={46} fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>WORKERS</text>
    </svg>
  );
}

function NeuralODEViz({ color }) {
  const layers = [
    [30, 10, 30, 50],
    [70, 20, 40],
    [110, 15, 35, 50],
    [150, 25],
  ];
  return (
    <svg viewBox="0 0 200 55" style={{ width: '100%', height: 'auto', maxHeight: 48 }} aria-label="Neural ODE architecture">
      {/* Connection lines */}
      {layers.slice(0, -1).map((layer, li) =>
        layer.map((y1) =>
          layers[li + 1].map((y2) => (
            <line
              key={`${li}-${y1}-${y2}`}
              x1={layers[li] === layer ? [30, 70, 110][li] : 0}
              y1={y1}
              x2={[70, 110, 150][li]}
              y2={y2}
              stroke={color}
              strokeWidth={0.5}
              opacity={0.15}
            />
          ))
        )
      )}
      {/* Nodes */}
      {layers.map((layer, li) => {
        const x = [30, 70, 110, 150][li];
        return layer.map((y) => (
          <circle key={`${li}-${y}`} cx={x} cy={y} r={li === 3 ? 5 : 3.5} fill={color} opacity={li === 3 ? 0.9 : 0.5} />
        ));
      })}
      {/* ODE symbol */}
      <text x={170} y={28} fill={color} style={{ fontSize: 10, fontFamily: 'var(--font-display)', fontWeight: 700, fontStyle: 'italic' }}>dx/dt</text>
      {/* Arrow to ODE */}
      <line x1={155} y1={25} x2={165} y2={25} stroke={color} strokeWidth={1} opacity={0.5} markerEnd="none" />
      {/* Labels */}
      <text x={30} y={55} textAnchor="middle" fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>INPUT</text>
      <text x={150} y={10} textAnchor="middle" fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>PK</text>
    </svg>
  );
}

function DoseResponseViz({ color }) {
  const pts = [
    [10, 42], [25, 40], [40, 37], [55, 33], [70, 27],
    [85, 20], [100, 14], [115, 10], [130, 8], [145, 7], [160, 7],
  ];
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ');
  return (
    <svg viewBox="0 0 200 50" style={{ width: '100%', height: 'auto', maxHeight: 48 }} aria-label="Dose-response curve">
      {/* Grid lines */}
      <line x1={10} y1={45} x2={170} y2={45} stroke="var(--cream-hairline)" strokeWidth={0.5} />
      <line x1={10} y1={5} x2={10} y2={45} stroke="var(--cream-hairline)" strokeWidth={0.5} />
      {/* Curve */}
      <path d={path} fill="none" stroke={color} strokeWidth={1.5} opacity={0.7} strokeLinecap="round" strokeLinejoin="round" />
      {/* Therapeutic window */}
      <rect x={65} y={5} width={55} height={40} fill={color} opacity={0.06} />
      <line x1={65} y1={5} x2={65} y2={45} stroke={color} strokeWidth={0.5} strokeDasharray="2 2" opacity={0.3} />
      <line x1={120} y1={5} x2={120} y2={45} stroke={color} strokeWidth={0.5} strokeDasharray="2 2" opacity={0.3} />
      {/* Labels */}
      <text x={92} y={50} textAnchor="middle" fill={color} style={{ fontSize: 5, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>THERAPEUTIC WINDOW</text>
      <text x={170} y={48} fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>DOSE</text>
      <text x={5} y={5} fill="var(--cream-muted)" style={{ fontSize: 5, fontFamily: 'var(--font-mono)' }}>E</text>
    </svg>
  );
}
