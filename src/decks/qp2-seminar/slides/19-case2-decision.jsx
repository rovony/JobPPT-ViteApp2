import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * Slide 19 · CS2 Decision — "Mechanism is ethnicity-independent."
 *
 * Layout:
 *   LEFT column:
 *     • Centered question tile ("Where does the drug target live?")
 *     • Two branches side-by-side below:
 *         A · Host genome (dimmed · NOT THIS CASE · struck-through title)
 *         B · Tumor cells (active · THIS CASE · cyan accent)
 *   RIGHT column:
 *     • ICH E5(R1) Appendix D — 9-criterion checklist
 *     • 9/9 hero numeral at footer + one amber "partial" row for CYP3A4.
 *
 * No SVG tree or leader lines — pure CSS grid + cards for legibility.
 */

const ICH_CRITERIA = [
  { ok: true,  b: 'Wide therapeutic dose range', t: '· MTD not reached', domain: 'PK' },
  { ok: true,  b: 'Nonlinear PK',                t: ' well-characterized · less than dose-proportional', domain: 'PK' },
  { ok: true,  b: 'Low protein-binding variability', t: '', domain: 'PK' },
  { ok: true,  b: 'Flat PD curve at 500 mg QD', t: ' · 2-HG inhibition plateau', domain: 'PD' },
  { ok: true,  b: 'Direct PD marker = mechanism', t: ' · not a surrogate', domain: 'PD' },
  { partial: true, b: 'CYP3A4 polymorphism', t: ' · DDI quantified · label dose adjustment', domain: 'DDI' },
  { ok: true,  b: 'Oral systemic administration', t: '', domain: 'USE' },
  { ok: true,  b: 'Specialist oncology drug', t: ' · low inappropriate-use potential', domain: 'USE' },
  { ok: true,  b: 'Low individual-factor dose adjustment', t: '', domain: 'USE' },
];

export default function Slide19Case2Decision() {
  const ease = [0.2, 0.7, 0.3, 1];
  const D = {
    chrome: 0.10,
    eyebrow: 0.20,
    headline: 0.35,
    subhead: 0.60,
    question: 0.85,
    branchA: 1.10,
    branchB: 1.25,
    ichPanel: 1.45,
    ichRow: 1.70,
    source: 3.20,
  };

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--cyan)" delay={D.eyebrow}>CS2 · Decision</Eyebrow>
      <Headline delay={D.headline} maxChars={40}>
        Mechanism is{' '}
        <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
          ethnicity-independent
        </span>{' '}
        — by biology, not by statistics.
      </Headline>
      <Subhead delay={D.subhead} maxChars={90}>
        IDH1 R132 is a <strong style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>somatic mutation</strong> in the tumor — not in the host genome. Inherited variation does
        not modulate drug-target engagement.
      </Subhead>

      <Viz>
      {/* Body grid */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 0.85fr)',
          gap: 'var(--space-8)',
          minHeight: 0,
        }}
      >
        {/* LEFT cluster */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: 'auto 1fr',
            rowGap: '18px',
            minWidth: 0,
            minHeight: 0,
          }}
        >
          <QuestionTile delay={D.question} />
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              columnGap: '18px',
              minHeight: 0,
            }}
          >
            <BranchCard
              dim
              tag="Branch A · Germline"
              title="Host genome"
              bullets={[
                'Inherited at birth',
                'Frequencies vary by population',
                'Pharmacogenomics modulates engagement',
                'Ethnic subgroup data becomes pivotal',
              ]}
              verdict="Would require ethnic subgroup evidence to establish comparability."
              foot="Not this case"
              delay={D.branchA}
            />
            <BranchCard
              tag="Branch B · Somatic ✓"
              title="Tumor cells"
              bullets={[
                'IDH1 R132 arises during cancer development',
                '> 99% somatic in IDH1-mutant cancers',
                'Drug binds mutant enzyme inside the tumor',
                'Host genome does not modulate engagement',
              ]}
              verdict={
                <>
                  Mechanism determined by{' '}
                  <b style={{ color: 'var(--cyan)', fontStyle: 'normal', fontWeight: 700 }}>
                    tumor biology + drug chemistry
                  </b>{' '}
                  — not ethnicity.
                </>
              }
              foot="2-HG inhibition · 84.6% vs 84.4%"
              delay={D.branchB}
            />
          </div>
        </div>

        {/* RIGHT — ICH panel */}
        <IchPanel delayPanel={D.ichPanel} delayRowBase={D.ichRow} />
      </div>

      </Viz>

      <Footer
        kicker="Case 02 · Decision"
        tagline="Source · ICH E5(R1) Appendix D · Dang 2009 · Figueroa 2010"
        delay={D.source}
      />
    </SlideGrid>
  );
}

/* ========================================================
   QuestionTile — centered cyan-bordered prompt
   ======================================================== */
function QuestionTile({ delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        justifySelf: 'center',
        width: 'min(520px, 100%)',
        padding: '12px 24px',
        border: '1.5px solid var(--cyan)',
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--cyan) 10%, transparent)',
        textAlign: 'center',
      }}
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.66rem',
          letterSpacing: '0.22em',
          color: 'var(--cyan)',
          fontWeight: 700,
          marginBottom: 4,
        }}
      >
        The question
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
          lineHeight: 1.15,
          color: 'var(--cream)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-headline)',
        }}
      >
        Where does the drug target live?
      </div>
    </motion.div>
  );
}

/* ========================================================
   BranchCard — active or dimmed branch
   ======================================================== */
function BranchCard({ dim, tag, title, bullets, verdict, foot, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const borderLeft = dim ? '3px solid var(--cream-hairline)' : '3px solid var(--cyan)';
  const tagColor = dim ? 'var(--cream-faint)' : 'var(--cyan)';
  const titleColor = dim ? 'var(--cream-muted)' : 'var(--cream)';
  const bulletColor = dim ? 'var(--cream-faint)' : 'var(--cream)';
  const dotColor = dim ? 'var(--cream-faint)' : 'var(--cyan)';

  return (
    <motion.div
      style={{
        position: 'relative',
        padding: '16px 18px 16px 18px',
        border: '1px solid var(--cream-hairline)',
        borderLeft,
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        minWidth: 0,
        display: 'flex',
        flexDirection: 'column',
        gap: 10,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: dim ? 0.75 : 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.66rem',
          letterSpacing: '0.22em',
          color: tagColor,
          fontWeight: 700,
        }}
      >
        {tag}
      </div>

      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(1rem, 1.3vw, 1.4rem)',
          lineHeight: 1.1,
          color: titleColor,
          fontWeight: 700,
          letterSpacing: 'var(--ls-headline)',
          textDecoration: dim ? 'line-through' : 'none',
          textDecorationColor: dim ? 'var(--cream-faint)' : 'transparent',
        }}
      >
        {title}
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
        {bullets.map((b, i) => (
          <li
            key={i}
            style={{
              position: 'relative',
              padding: '4px 0 4px 14px',
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.72rem, 0.82vw, 0.86rem)',
              lineHeight: 1.35,
              color: bulletColor,
              borderBottom: i === bullets.length - 1 ? 'none' : '1px dashed var(--cream-ghost)',
            }}
          >
            <span
              aria-hidden
              style={{ position: 'absolute', left: 2, top: 4, color: dotColor, fontWeight: 700 }}
            >
              ·
            </span>
            {b}
          </li>
        ))}
      </ul>

      <div
        className="deck-display italic"
        style={{
          padding: '8px 12px',
          borderLeft: dim ? '2px solid var(--cream-hairline)' : '2px solid var(--cyan)',
          background: dim ? 'var(--cream-ghost)' : 'color-mix(in srgb, var(--cyan) 8%, transparent)',
          borderRadius: '0 4px 4px 0',
          fontSize: 'clamp(0.78rem, 0.88vw, 0.94rem)',
          lineHeight: 1.35,
          color: dim ? 'var(--cream-faint)' : 'var(--cream)',
          fontWeight: 500,
        }}
      >
        {verdict}
      </div>

      <div
        className="deck-mono uppercase"
        style={{
          textAlign: 'right',
          fontSize: '0.6rem',
          letterSpacing: '0.22em',
          color: dim ? 'var(--cream-faint)' : 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        {foot}
      </div>
    </motion.div>
  );
}

/* ========================================================
   IchPanel — 9-criterion checklist + 9/9 hero
   ======================================================== */
function IchPanel({ delayPanel, delayRowBase }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: '18px 20px',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--cyan)',
        borderRadius: 8,
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr auto',
        rowGap: 10,
        minWidth: 0,
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: delayPanel }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: '0.66rem',
          letterSpacing: '0.22em',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        ICH E5(R1) · Appendix D
      </div>
      <div>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1rem, 1.3vw, 1.35rem)',
            lineHeight: 1.1,
            color: 'var(--cream)',
            fontWeight: 700,
            letterSpacing: 'var(--ls-headline)',
          }}
        >
          Compound-property criteria{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
            evaluated
          </span>
        </div>
        <div
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.72rem, 0.82vw, 0.88rem)',
            color: 'var(--cream-muted)',
            marginTop: 2,
          }}
        >
          Each criterion favors ethnic insensitivity when satisfied.
        </div>
      </div>

      <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'grid', rowGap: 2 }}>
        {ICH_CRITERIA.map((c, i) => (
          <IchRow key={i} c={c} delay={delayRowBase + i * 0.08} />
        ))}
      </ul>

      {/* Footer row — 9/9 hero + caption */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          alignItems: 'end',
          columnGap: 18,
          paddingTop: 10,
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        <div
          className="deck-display italic"
          style={{
            fontSize: 'clamp(0.76rem, 0.88vw, 0.92rem)',
            lineHeight: 1.35,
            color: 'var(--cream-muted)',
          }}
        >
          <b style={{ color: 'var(--cream)', fontStyle: 'normal', fontWeight: 700 }}>
            8 directly satisfied
          </b>{' '}
          · 1 polymorphic (CYP3A4) handled via labeled management, which ICH E5 explicitly permits.
        </div>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(2.4rem, 3.6vw, 3.6rem)',
            fontWeight: 800,
            color: 'var(--cyan)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          9<span style={{ color: 'var(--cream-faint)', fontWeight: 500, fontSize: '0.62em', margin: '0 4px' }}>/</span>9
        </div>
      </div>
    </motion.div>
  );
}

function IchRow({ c, delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const partial = c.partial;
  const color = partial ? 'var(--amber)' : 'var(--cyan)';
  const bg = partial
    ? 'color-mix(in srgb, var(--amber) 12%, transparent)'
    : 'color-mix(in srgb, var(--cyan) 16%, transparent)';
  return (
    <motion.li
      style={{
        display: 'grid',
        gridTemplateColumns: '26px minmax(0, 1fr) auto',
        alignItems: 'center',
        columnGap: 10,
        padding: '5px 2px',
        borderBottom: '1px dashed var(--cream-ghost)',
        fontFamily: 'var(--font-body)',
        fontSize: 'clamp(0.72rem, 0.82vw, 0.86rem)',
        lineHeight: 1.3,
        color: 'var(--cream)',
      }}
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease, delay }}
    >
      <span
        style={{
          width: 20,
          height: 20,
          borderRadius: '50%',
          border: `1.5px solid ${color}`,
          background: bg,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.72rem',
          fontWeight: 700,
          color,
        }}
      >
        {partial ? '~' : '✓'}
      </span>
      <span style={{ minWidth: 0 }}>
        <b style={{ color: 'var(--cream)', fontWeight: 700 }}>{c.b}</b>
        <span style={{ color: 'var(--cream-muted)' }}>{c.t}</span>
      </span>
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: '0.58rem',
          letterSpacing: '0.18em',
          color: 'var(--cream-faint)',
          paddingLeft: 6,
        }}
      >
        {c.domain}
      </span>
    </motion.li>
  );
}