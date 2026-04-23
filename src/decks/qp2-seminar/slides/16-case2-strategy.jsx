import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 16 · CS2 Strategy — "Six pillars. One integrated defense."
 *
 * Pattern: 3×2 grid of typographic pillars. Each pillar has a vertical cyan
 * spine that draws top-down on stagger (framer-motion scaleY). Below the
 * grid, an ICH E5(R1) anchor strip with a cyan top-rule summarizes the
 * framework criteria addressed by the package.
 *
 * Content fidelity (per _DECK-CORRECTIONS C2.1):
 *   • Pillar 1 popPK attribution: Jiang CTS 2021 (N=253). No "Bayesian
 *     9-covariate" attribution here — that's Servier internal work, slide 17.
 *   • Pillar 4 DDI numerics: +56% AUC / +47% Cmax with strong CYP3A4 inhibitor.
 *   • Pillar 5 PSUR: Nov 2024 · 15,867 patients global · 1,281 CT subjects.
 *
 * All colors/fonts/timing resolve from tokens.
 */
const PILLARS = [
  {
    n: '1',
    title: 'Population PK',
    body: (
      <>
        Race tested as covariate on clearance and volume across the pooled global
        dataset (<strong>Jiang CTS 2021</strong>, N=253).
      </>
    ),
    arrow: (
      <>
        Not significant. <strong>Body weight</strong> and <strong>hepatic function</strong>{' '}
        drive disposition — not ethnicity.
      </>
    ),
  },
  {
    n: '2',
    title: 'Exposure–Response',
    body: (
      <>
        Exposure–efficacy (PFS, ORR) and exposure–safety (QTc, differentiation
        syndrome) across ethnic subgroups in <strong>ClarIDHy</strong> and{' '}
        <strong>AGILE</strong>.
      </>
    ),
    arrow: 'Clinical benefit and safety ethnicity-independent at the E–R level.',
  },
  {
    n: '3',
    title: 'Intrinsic Factors',
    body: (
      <>
        Dedicated hepatic and renal impairment studies. DME polymorphism
        frequencies (PharmGKB). Japanese vs Caucasian HV PK (
        <strong>Dai EJCP 2019</strong>).
      </>
    ),
    arrow: 'Key covariates identified and labeled. Ethnicity not among them.',
  },
  {
    n: '4',
    title: 'Extrinsic Factors',
    body: (
      <>
        Dedicated CYP3A4 DDI program. Strong inhibitor{' '}
        <strong>+56% AUC / +47% C<sub>max</sub></strong>. Food effect ~2×
        C<sub>max</sub>, labeled.
      </>
    ),
    arrow: 'Quantified. Managed by dose adjustment, not population stratification.',
  },
  {
    n: '5',
    title: 'Safety Database',
    body: (
      <>
        Eight years of post-marketing surveillance across a 42+ country global
        rollout. <strong>PSUR Nov 2024</strong>: 15,867 patients global exposure;
        1,281 CT subjects.
      </>
    ),
    arrow: 'No ethnicity-specific adverse event patterns.',
  },
  {
    n: '6',
    title: 'Mechanism of Action',
    body: (
      <>
        <strong>IDH1 R132</strong> is a somatic mutation — tumor-intrinsic, not
        germline. Drug targets the mutant enzyme at the tumor level (
        <strong>Dang 2009</strong>, <strong>Figueroa 2010</strong>).
      </>
    ),
    arrow:
      'Target biology ethnicity-independent by mechanism, not just by statistics.',
  },
];

export default function Slide16Case2Strategy() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.70,
    pillarsBase: 0.95,   // first pillar fires here; each subsequent = +0.18s
    anchor: 2.40,
    source: 2.90,
  };

  const T = useTokens(['--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={D.eyebrow}>Case 02 · Ivosidenib · India CDSCO</Eyebrow>
      <Headline delay={D.headline} maxChars={30}>
        Six pillars.{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
          One integrated defense.
        </span>
      </Headline>
      <Subhead delay={D.subhead} maxChars={110}>
        A clinical pharmacology package that answers the regulator's question — with{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'normal', fontWeight: 600 }}>
          population PK as one of six pillars
        </span>
        , not the whole argument.
      </Subhead>

      <Viz>
        <div style={{ width: '100%', height: '100%', display: 'grid', gridTemplateRows: '1fr auto', rowGap: 'var(--space-5)', minHeight: 0 }}>
      {/* ─── 3×2 pillar grid ──────────────────────── */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gridTemplateRows: 'repeat(2, minmax(0, 1fr))',
          columnGap: 'var(--space-8)',
          rowGap: 'var(--space-6)',
          minHeight: 0,
        }}
      >
        {PILLARS.map((p, i) => (
          <Pillar key={p.n} pillar={p} delay={D.pillarsBase + i * 0.18} tk={tk} />
        ))}
      </div>

      {/* ─── ICH E5(R1) anchor strip ──────────────── */}
      <motion.div
        style={{
          paddingTop: 'var(--space-3)',
          borderTop: '2px solid var(--cyan)',
        }}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease, delay: D.anchor }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.65rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cyan)',
            marginBottom: '6px',
          }}
        >
          ICH E5(R1) framework for ethnic insensitivity
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.85rem, 1.05vw, 1.15rem)',
            lineHeight: 1.3,
            color: 'var(--cream)',
            fontWeight: 400,
            maxWidth: '110ch',
          }}
        >
          <span style={{ color: 'var(--cyan)', fontStyle: 'normal', fontWeight: 700 }}>
            Wide therapeutic range · flat exposure–response · managed drug–drug
            interactions · ethnicity-independent target biology
          </span>{' '}
          <span style={{ color: 'var(--cream-muted)', fontStyle: 'normal' }}>
            — all four criteria addressed across the six-pillar package.
          </span>
        </div>
      </motion.div>

        </div>
      </Viz>

      <Footer
        kicker="Case 02 · Strategy"
        tagline="Source · CS2 Reading Pt. 1 · ICH E5(R1) Appendix D anchor"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   Pillar — number · title · body · arrow-conclusion
   Vertical cyan spine draws top-down via scaleY.
   ======================================================== */
function Pillar({ pillar, delay, tk }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      className="relative"
      style={{ padding: '8px 22px 8px 32px', minWidth: 0 }}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: delay + 0.1 }}
    >
      {/* Vertical spine — draws top-down */}
      <motion.span
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: 3,
          height: '100%',
          background: 'var(--cyan)',
          transformOrigin: 'top center',
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease, delay }}
      />

      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1.4rem, 2vw, 2.2rem)',
          lineHeight: 1,
          color: 'var(--cyan)',
          letterSpacing: 'var(--ls-display)',
          fontWeight: 700,
          marginBottom: '2px',
        }}
      >
        {pillar.n}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(0.95rem, 1.2vw, 1.35rem)',
          lineHeight: 1.1,
          color: 'var(--cream)',
          fontWeight: 500,
          letterSpacing: 'var(--ls-headline)',
          marginBottom: '8px',
        }}
      >
        {pillar.title}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.72rem, 0.85vw, 0.88rem)',
          lineHeight: 1.38,
          color: 'var(--cream-muted)',
          marginBottom: '6px',
        }}
      >
        {pillar.body}
      </div>
      <div
        className="deck-display italic"
        style={{
          fontSize: 'clamp(0.7rem, 0.82vw, 0.85rem)',
          lineHeight: 1.32,
          color: 'var(--cyan)',
          fontWeight: 400,
        }}
      >
        <span style={{ fontStyle: 'normal', fontWeight: 700, marginRight: 6 }}>→</span>
        {pillar.arrow}
      </div>
    </motion.div>
  );
}