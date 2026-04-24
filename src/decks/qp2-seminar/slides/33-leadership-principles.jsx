import React from 'react';
import { motion } from 'framer-motion';
import { Compass, Layers, Users, Bot, Activity, Wrench } from 'lucide-react';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 33 · Leadership principles — Three principles for leading
 * quantitative pharmacology in the next five years.
 *
 * The slide that earns the title "Director · Clinical Pharmacology
 * & Pharmacometrics" by translating the three case studies into a
 * forward-looking operating posture. Three editorial principles on
 * top (the philosophy), three AI/ML research-front cards on the
 * bottom (the technical receipts), and a single ICH M15 ribbon
 * that anchors the whole thing to the regulatory ground that came
 * into effect in 2026 — the first global guideline on MIDD.
 *
 * The pipeline-bridge ribbon at the bottom names where these
 * principles land in Merck's pipeline (WINREVAIR pediatric,
 * Enlicitide CORALreef, HRS-5346, MK-2060) so the close isn't
 * abstract — it's a hand-off to specific programs.
 */

const PRINCIPLES = [
  {
    num: '01',
    icon: Compass,
    title: 'QP as strategic architecture',
    detail: 'The group that decides what evidence is needed and what the regulator will accept — upstream of study execution, not downstream of it.',
    token: 'amber',
  },
  {
    num: '02',
    icon: Layers,
    title: 'Scaffolds over templates',
    detail: 'Each case study is an instance; the scaffold is the durable output. Framework identity outlasts any single analysis.',
    token: 'cyan',
  },
  {
    num: '03',
    icon: Users,
    title: 'Teams over deliverables',
    detail: 'Mentored PhD fellows and junior pharmacometricians into regulatory-thinking scientists — first-author publications and career progression. Capability compounds when you invest in the strategic layer, not only the technical one.',
    token: 'coral',
  },
];

const RESEARCH_CARDS = [
  {
    key: 'pharmagent',
    icon: Bot,
    badge: 'Multi-agent',
    title: 'PharmAgent',
    spec: '13 agents · 151 tools',
    detail: 'End-to-end pharmacometric workflows — NONMEM automation, QC, regulatory drafting.',
    token: 'violet',
  },
  {
    key: 'deeppk',
    icon: Activity,
    badge: 'Neural ODE',
    title: 'DeepPK',
    spec: 'Neural + compartmental',
    detail: 'Neural ODE approach to PopPK structure learning for hybrid mechanistic + neural inference.',
    token: 'sage',
  },
  {
    key: 'dosepredict',
    icon: Wrench,
    badge: 'Peer-reviewed',
    title: 'DosePredict',
    spec: 'R Shiny · JCP 2020',
    detail: 'Individual-patient dose adjustment — published JCP 2020, released on GitHub.',
    token: 'amber',
  },
];

export default function Slide33LeadershipPrinciples() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    eyebrow: 0.20,
    headline: 0.35,
    principles: 0.85,
    researchLabel: 1.85,
    research: 2.05,
    ribbon: 3.10,
    source: 2.80,
  };

  const T = useTokens([
    '--coral', '--amber', '--cyan', '--sage', '--violet',
    '--cream', '--cream-muted', '--cream-faint', '--cream-hairline',
  ]);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--amber)" delay={D.eyebrow}>Closing · Leadership · Three principles</Eyebrow>
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
            gridTemplateRows: 'auto auto auto 1fr',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          {/* ─── Top row: 3 principles ─── */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 'var(--space-4)',
              minHeight: 0,
            }}
          >
            {PRINCIPLES.map((p, i) => (
              <PrincipleCard
                key={p.num}
                principle={p}
                delay={D.principles + i * 0.14}
                tk={tk}
              />
            ))}
          </div>

          {/* Section divider label */}
          <motion.div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-card-label)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-faint)',
              fontWeight: 700,
              paddingTop: 'var(--space-3)',
              borderTop: '1px solid var(--cream-hairline)',
              textAlign: 'center',
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: D.researchLabel }}
          >
            Where principle meets practice · AI/ML research front
          </motion.div>

          {/* ─── Bottom row: 3 AI/ML research cards ─── */}
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
              borderRadius: 'var(--radius-lg)',
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

/* ========================================================
   PrincipleCard — numbered top-row card
   ======================================================== */
function PrincipleCard({ principle, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const Icon = principle.icon;
  const color = tk(`--${principle.token}`);
  return (
    <motion.div
      style={{
        padding: 'var(--space-4) var(--space-4) var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderTop: `3px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 10,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {/* Numbered chip + icon */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
        <span
          className="deck-mono"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 38,
            height: 38,
            borderRadius: '50%',
            border: `2px solid ${color}`,
            background: `color-mix(in srgb, ${color} 12%, transparent)`,
            color,
            fontSize: 'var(--fs-card-body)',
            fontWeight: 700,
            letterSpacing: '0.04em',
          }}
        >
          {principle.num}
        </span>
        <Icon size={20} strokeWidth={1.6} color={color} aria-hidden />
      </div>

      {/* Title */}
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-title)',
          color: 'var(--cream)',
          fontWeight: 600,
          lineHeight: 1.25,
        }}
      >
        {principle.title}
      </div>

      {/* Detail */}
      <div
        className="deck-display italic"
        style={{
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.45,
        }}
      >
        {principle.detail}
      </div>
    </motion.div>
  );
}

/* ========================================================
   ResearchCard — bottom-row AI/ML card
   ======================================================== */
function ResearchCard({ card, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const Icon = card.icon;
  const color = tk(`--${card.token}`);
  return (
    <motion.div
      style={{
        padding: 'var(--space-3) var(--space-4)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: `3px solid ${color}`,
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 45%, transparent)',
        display: 'grid',
        gridTemplateColumns: 'auto 1fr',
        columnGap: 'var(--space-3)',
        alignItems: 'start',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {/* Icon column */}
      <div
        style={{
          width: 32,
          height: 32,
          borderRadius: 6,
          background: `color-mix(in srgb, ${color} 14%, transparent)`,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Icon size={16} strokeWidth={1.8} color={color} aria-hidden />
      </div>

      {/* Text column */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 0 }}>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-meta)',
            letterSpacing: 'var(--ls-mono)',
            color,
            fontWeight: 700,
          }}
        >
          {card.badge}
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 8,
            flexWrap: 'wrap',
          }}
        >
          <span
            className="deck-display"
            style={{
              fontSize: 'var(--fs-card-title)',
              color: 'var(--cream)',
              fontWeight: 700,
            }}
          >
            {card.title}
          </span>
          <span
            className="deck-mono"
            style={{
              fontSize: 'var(--fs-card-label)',
              color: 'var(--cream-faint)',
              fontWeight: 500,
            }}
          >
            · {card.spec}
          </span>
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
        >
          {card.detail}
        </div>
      </div>
    </motion.div>
  );
}
