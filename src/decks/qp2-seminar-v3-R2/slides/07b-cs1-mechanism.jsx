import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07b — Mechanism + ambrisentan MOA + 4-pathway context.
 *
 * Inserted between cs1-context (V2-S3 disease foundation) and cs1-trial
 * (V2-S4 field timeline). Answers the implicit "why ambrisentan?" before
 * the field-level context.
 *
 * Pattern: copied from cs2-disease-background (CS2 IDH1 mechanism panel)
 * — vertical SVG flowchart on the LEFT showing the endothelin pathway
 * with ambrisentan blocker bars, contextual 4-pathway cards on the RIGHT.
 *
 * **Merck angle (deliberate):** the 4th pathway (Activin / TGF-β) is
 * codified by Merck's WINREVAIR (sotatercept) — first-in-class, FDA
 * Mar 26, 2024, from the $11.5B Acceleron acquisition (closed Nov 2021).
 * Ambrisentan opened pathway 1 in 2007; Merck opened pathway 4 in 2024.
 * Same disease, two decades apart, same intellectual move (target a
 * specific receptor in the dysregulated cascade).
 *
 * Verified facts (per web research 2026-04-26):
 *   - 2022 ESC/ERS PAH guideline codifies 3 pathways (ET, NO/cGMP,
 *     PGI2). The activin/TGF-β pathway became clinically actionable
 *     post-guideline with sotatercept's 2024 approval.
 *   - Ambrisentan: selective ETA antagonist, Ki = 0.011 nM,
 *     >4,000-fold ETA selectivity vs ETB; FDA Jun 15, 2007 (Letairis).
 *   - Bosentan (Tracleer, Actelion 2001): first ERA, dual ETA/ETB.
 *   - Macitentan (Opsumit, 2013): dual ERA, 50-fold ETA-preferring.
 *   - Sildenafil (Revatio, 2005), Tadalafil (Adcirca, 2009): PDE5i.
 *   - Riociguat (Adempas, 2013): sGC stimulator (also CTEPH).
 *   - Epoprostenol (Flolan, 1995): IV prostacyclin, t½ ~6 min.
 *   - Treprostinil (Remodulin, 2002): SC/IV/inh/oral.
 *   - Selexipag (Uptravi, 2015): non-prostanoid IP agonist.
 *   - Sotatercept (WINREVAIR, Merck, FDA Mar 26, 2024): activin trap;
 *     STELLAR trial +41 m 6MWD, 84% RRR death/clinical worsening.
 *
 * Sources: ESC/ERS 2022 PAH guideline · Letairis prescribing
 * information · Hoeper STELLAR NEJM 2023 · Merck press releases.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  moa: 0.40,
  card1: 0.55,
  card2: 0.70,
  card3: 0.85,
  card4: 1.00,
  anchor: 1.50,
};

export default function Cs1Mechanism() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--coral)"
      eyebrow="Case 01 · Mechanism — pathway + drug"
      headline={
        <>
          Four pathways drive PAH.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            Ambrisentan blocks one — selectively.
          </span>
        </>
      }
      headlineMaxChars={48}
      footerKicker="Case 01 · Mechanism"
      footerSource="ESC/ERS 2022 PAH guideline · Letairis (ambrisentan, Gilead) PI · Hoeper STELLAR NEJM 2023 · Merck WINREVAIR FDA approval Mar 26 2024"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'grid',
          gridTemplateColumns: '2fr 3fr',
          gridTemplateRows: '1fr',
          columnGap: 'var(--space-4)',
          minHeight: 0,
        }}
      >
        {/* Lung backdrop — continues the layoutId chain from slide 07
            (cs1-context foundation) into 08 (cs1-trial trachea-axis).
            Sized + opacity matched to slide 07 so the FLIP morph
            reads as "same lung pivoting" not a disappear/reappear.
            Sits in the RIGHT pane behind the 4 pathway cards. */}
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(20rem, 36vw, 32rem)',
            opacity: 0.16,
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lungs
            layoutId="cs1-lung"
            variant="foundation"
          />
        </div>

        {/* ═══ LEFT — endothelin pathway flowchart + ambrisentan blocker ═══ */}
        <MOAPanel />

        {/* ═══ RIGHT — 4 pathway cards (one per pillar) ═══
            position:relative + zIndex:1 so cards render above the lung
            backdrop (which is at zIndex:0) */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gridTemplateRows: '1fr 1fr',
            gap: 'var(--space-3)',
            minHeight: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <PathwayCard
            n="01"
            name="Endothelin"
            arrow="↑"
            arrowColor="var(--coral)"
            arrowLabel="overactive"
            mech="ET-1 → ETA receptor → vasoconstriction + smooth-muscle proliferation. ETB on endothelium drives NO release + ET-1 clearance."
            drugClass="Endothelin Receptor Antagonists (ERAs)"
            drugDetail={<><strong style={{ color: 'var(--coral)' }}>Ambrisentan</strong> (Letairis · Gilead · 2007 — selective ETA, &gt;4000:1) · Bosentan (Tracleer · Actelion · 2001 — dual) · Macitentan (Opsumit · 2013 — dual)</>}
            isThisCase
            delay={D.card1}
          />
          <PathwayCard
            n="02"
            name="NO / cGMP"
            arrow="↓"
            arrowColor="var(--cream-muted)"
            arrowLabel="underactive"
            mech="eNOS → NO → sGC → cGMP → vasodilation + anti-proliferation. PDE5 degrades cGMP."
            drugClass="PDE5 inhibitors · sGC stimulators"
            drugDetail={<>Sildenafil (Revatio · 2005) · Tadalafil (Adcirca · 2009) · Riociguat (Adempas · Bayer · 2013 — also CTEPH)</>}
            delay={D.card2}
          />
          <PathwayCard
            n="03"
            name="Prostacyclin"
            arrow="↓"
            arrowColor="var(--cream-muted)"
            arrowLabel="underactive"
            mech="PGI2 → IP receptor → cAMP → vasodilation, anti-proliferation, anti-thrombotic."
            drugClass="Prostanoids · IP-receptor agonist"
            drugDetail={<>Epoprostenol (Flolan · 1995 — IV, t½ ~6 min) · Treprostinil (Remodulin · 2002) · Selexipag (Uptravi · 2015 — oral, non-prostanoid)</>}
            delay={D.card3}
          />
          <PathwayCard
            n="04"
            name="Activin / TGF-β"
            arrow="—"
            arrowColor="var(--amber)"
            arrowLabel="dysregulated"
            mech="BMPR2-Smad1/5/8 (anti-proliferative) ↓ · ActRIIA-Smad2/3 (pro-proliferative) ↑. BMPR2 LoF in 70–80% heritable PAH."
            drugClass="Activin signaling inhibitor · NEW IN 2024"
            drugDetail={<><strong style={{ color: 'var(--amber)' }}>Sotatercept (WINREVAIR — Merck — FDA Mar 26, 2024)</strong>. First-in-class ActRIIA-Fc ligand trap. STELLAR: +41 m 6MWD wk 24 · 84% RRR death/clinical worsening. Acceleron acquisition $11.5 B, 2021.</>}
            isMerck
            delay={D.card4}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MOA PANEL — left column · vertical endothelin flowchart with
   ambrisentan blocker. The story: ET-1 binds ETA → vasoconstriction
   + proliferation. Ambrisentan selectively blocks ETA, sparing ETB
   (which provides beneficial NO release + ET-1 clearance).
   ══════════════════════════════════════════════════════════════════ */

function MOAPanel() {
  const reduced = useReducedMotion();
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: D.moa }}
      style={{
        border: '1px solid var(--cream-hairline)',
        background: 'color-mix(in srgb, var(--panel) 55%, transparent)',
        borderRadius: 'var(--radius-lg)',
        padding: 'var(--space-5)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        gap: 'var(--space-4)',
        minHeight: 0,
        overflow: 'hidden',
      }}
    >
      <PanelKicker color="var(--coral)">Mechanism — endothelin pathway</PanelKicker>

      <PathwayFlowchart reduced={reduced} />

      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(0.75rem, min(1vw, 1.5vh), 0.92rem)',
          color: 'var(--cream-muted)',
          lineHeight: 1.5,
        }}
      >
        Ambrisentan blocks ETA selectively (Ki = 0.011 nM, &gt;4000:1 vs ETB).
        ETB-mediated NO release and ET-1 clearance are preserved — that's
        the selectivity argument vs the dual antagonists bosentan and macitentan.
      </div>

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: D.anchor }}
        style={{
          borderTop: '1px solid var(--cream-hairline)',
          paddingTop: 'var(--space-3)',
        }}
      >
        <p
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'clamp(0.9rem, min(1.3vw, 2vh), 1.15rem)',
            fontStyle: 'italic',
            lineHeight: 1.4,
            color: 'var(--cream)',
            fontWeight: 500,
          }}
        >
          Ambrisentan opened pathway 1 in 2007.{' '}
          <span style={{ color: 'var(--amber)', fontStyle: 'normal', fontWeight: 700 }}>
            Merck opened pathway 4 in 2024.
          </span>
        </p>
        <span
          className="deck-mono"
          style={{
            display: 'block',
            marginTop: 'var(--space-1)',
            fontSize: 'clamp(0.6rem, min(0.8vw, 1.2vh), 0.75rem)',
            letterSpacing: '0.04em',
            color: 'var(--cream-faint)',
          }}
        >
          Yanagisawa Nature 1988 · Galiè ARIES NEJM 2008 · Hoeper STELLAR NEJM 2023
        </span>
      </motion.div>
    </motion.div>
  );
}

function PanelKicker({ color, children }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: 'clamp(0.65rem, min(1vw, 1.5vh), 0.9rem)',
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
      }}
    >
      {children}
    </div>
  );
}

/* ── Endothelin pathway SVG flowchart ──────────────────────────────
   Vertical flow: dysfunction → ET-1 → ETA / ETB split → vasoconst+prolif
   with ambrisentan blocker bars at ETA. Animated coral particles flow
   from ET-1 down the LEFT arrow; blocked particles hit the blocker
   and fade. ETB branch (preserved by selective ETA antagonism) gets
   muted dashed treatment so the audience reads the selectivity
   argument visually.
─────────────────────────────────────────────────────────────────── */

const PARTICLE_R = 2.8;
const PARTICLE_EASE = 'linear';

function PathwayFlowchart({ reduced }) {
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: EASE, delay: D.moa + 0.3 }}
      style={{
        flex: '1 1 0%',
        minHeight: 0,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ position: 'absolute', inset: 0 }}>
        <PathwaySVG reduced={reduced} />
      </div>
    </motion.div>
  );
}

function PathwaySVG({ reduced }) {
  return (
    <svg
      viewBox="0 0 380 620"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    >
      {/* ── STEP 1: Endothelial dysfunction (PAH driver, dimmed) ── */}
      <rect x="60" y="10" width="260" height="50" rx="8"
            fill="none" stroke="var(--cream-muted)" strokeWidth="1.2" opacity="0.55" />
      <text x="190" y="32" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="15" fontWeight="600" fill="var(--cream-muted)" opacity="0.7">
        Endothelial dysfunction
      </text>
      <text x="190" y="48" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5" fill="var(--cream-faint)" opacity="0.5">
        PAH DRIVER
      </text>

      {/* Arrow 1: Dysfunction → ET-1 (overproduction) */}
      <line x1="190" y1="62" x2="190" y2="92" stroke="var(--cream-muted)" strokeWidth="1.2" opacity="0.5" />
      <polygon points="186,90 190,100 194,90" fill="var(--cream-muted)" opacity="0.5" />
      <text x="210" y="82" textAnchor="start"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1" fill="var(--cream-faint)" opacity="0.6">
        ET-1 ↑↑
      </text>

      {/* ── STEP 2: ET-1 (Endothelin-1) central node ── */}
      <circle cx="190" cy="130" r="40" fill="none" stroke="var(--coral)" strokeWidth="2" />
      <text x="190" y="126" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="var(--cream)">
        ET-1
      </text>
      <text x="190" y="146" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill="var(--cream-muted)">
        ENDOTHELIN-1
      </text>

      {/* LEFT BRANCH: ET-1 → ETA receptor (the bad pathway, ambrisentan blocks) */}
      <line x1="170" y1="170" x2="105" y2="225" stroke="var(--coral)" strokeWidth="2" />
      <polygon points="100,221 102,233 110,228" fill="var(--coral)" />

      <text x="135" y="195" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" fontWeight="700"
            letterSpacing="0.06em" fill="var(--coral)">
        ETA
      </text>

      {/* Blocker bars — ambrisentan at the ETA arrow */}
      <line x1="118" y1="200" x2="148" y2="222" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      <line x1="125" y1="195" x2="155" y2="217" stroke="var(--amber)" strokeWidth="4" strokeLinecap="round" />
      <text x="84" y="184" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight="800"
            letterSpacing="0.08em" fill="var(--amber)">
        AMBRISENTAN
      </text>
      <text x="84" y="200" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="9" fontWeight="700"
            letterSpacing="0.08em" fill="var(--amber)" opacity="0.85">
        BLOCKS ETA
      </text>
      <text x="84" y="214" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8" fontWeight="600"
            letterSpacing="0.04em" fill="var(--amber)" opacity="0.7">
        Ki 0.011 nM · &gt;4000:1
      </text>

      {/* ETA box — vasoconstriction + proliferation */}
      <rect x="20" y="240" width="170" height="70" rx="8"
            fill="var(--bg)" />
      <rect x="20" y="240" width="170" height="70" rx="8"
            fill="var(--coral)" fillOpacity="0.10"
            stroke="var(--coral)" strokeWidth="1.4" />
      <text x="105" y="260" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--coral)">
        ETA RECEPTOR
      </text>
      <text x="105" y="278" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        Vascular smooth muscle
      </text>
      <text x="105" y="294" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fontWeight="600" fill="var(--cream)">
        Vasoconstriction + proliferation
      </text>

      {/* RIGHT BRANCH: ET-1 → ETB receptor (preserved — selectivity argument) */}
      <line x1="210" y1="170" x2="275" y2="225" stroke="var(--cream-muted)" strokeWidth="1.4" strokeDasharray="4 4" opacity="0.7" />
      <polygon points="270,221 268,233 280,228" fill="var(--cream-muted)" opacity="0.7" />

      <text x="245" y="195" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" fontWeight="700"
            letterSpacing="0.06em" fill="var(--cream-muted)">
        ETB
      </text>

      {/* ETB box — preserved by selectivity */}
      <rect x="195" y="240" width="170" height="70" rx="8"
            fill="var(--bg)" />
      <rect x="195" y="240" width="170" height="70" rx="8"
            fill="var(--cream-muted)" fillOpacity="0.06"
            stroke="var(--cream-muted)" strokeWidth="1" strokeDasharray="3 3" />
      <text x="280" y="260" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--cream-muted)">
        ETB · PRESERVED
      </text>
      <text x="280" y="278" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)" opacity="0.85">
        Endothelium · NO release
      </text>
      <text x="280" y="294" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)" opacity="0.85">
        + ET-1 clearance
      </text>

      {/* ── STEP 4: convergence — pulmonary arteriole narrowing ── */}
      <line x1="105" y1="312" x2="160" y2="370" stroke="var(--coral)" strokeWidth="1.4" />
      <line x1="280" y1="312" x2="225" y2="370" stroke="var(--cream-muted)" strokeWidth="1" strokeDasharray="3 3" opacity="0.5" />

      <rect x="55" y="375" width="270" height="55" rx="10"
            fill="var(--bg)" />
      <rect x="55" y="375" width="270" height="55" rx="10"
            fill="var(--coral)" fillOpacity="0.10"
            stroke="var(--coral)" strokeWidth="1.4" />
      <text x="190" y="395" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--coral)">
        PULMONARY ARTERIOLES NARROW
      </text>
      <text x="190" y="416" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="11" fill="var(--cream)">
        ↑ PVR · RV hypertrophy → dilation → failure
      </text>

      {/* ── FOOTER: Ambrisentan effect chip ── */}
      <line x1="60" y1="455" x2="320" y2="455"
            stroke="var(--cream-faint)" strokeWidth="0.5" opacity="0.4" />
      <rect x="55" y="470" width="270" height="58" rx="6"
            fill="var(--bg)" />
      <rect x="55" y="470" width="270" height="58" rx="6"
            fill="var(--amber)" fillOpacity="0.10"
            stroke="var(--amber)" strokeWidth="1.2" />
      <text x="190" y="488" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5" fill="var(--amber)">
        AMBRISENTAN EFFECT
      </text>
      <text x="190" y="504" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="9.5" fill="var(--cream)">
        ↓ vasoconstriction · ↓ proliferation
      </text>
      <text x="190" y="519" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="9.5" fill="var(--cream)">
        ETB-mediated benefits preserved
      </text>

      {/* ═══════════ Flowing particles ═══════════ */}

      {/* ET-1 → ETA flow (coral, down the LEFT arrow) */}
      {!reduced && [
        { delay: 1.4, duration: 2.2 },
        { delay: 2.2, duration: 2.2 },
        { delay: 3.0, duration: 2.2 },
      ].map((p, i) => (
        <motion.circle
          key={`pa-${i}`}
          r={PARTICLE_R} fill="var(--coral)"
          initial={{ cx: 170, cy: 170, opacity: 0 }}
          animate={{
            cx: [170, 170, 105, 105],
            cy: [170, 170, 225, 225],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.08, 0.92, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Blocked particles — hit blocker bars and fade (amber) */}
      {!reduced && [
        { delay: 1.7, duration: 1.6 },
        { delay: 2.5, duration: 1.6 },
      ].map((p, i) => (
        <motion.circle
          key={`pb-${i}`}
          r={PARTICLE_R} fill="var(--amber)"
          initial={{ cx: 170, cy: 170, opacity: 0 }}
          animate={{
            cx: [170, 170, 140, 140],
            cy: [170, 170, 195, 195],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.7, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* ET-1 → ETB flow (cream-muted, down the RIGHT arrow — slower, fewer) */}
      {!reduced && [
        { delay: 2.0, duration: 2.4 },
        { delay: 3.4, duration: 2.4 },
      ].map((p, i) => (
        <motion.circle
          key={`pe-${i}`}
          r={PARTICLE_R} fill="var(--cream-muted)"
          initial={{ cx: 210, cy: 170, opacity: 0 }}
          animate={{
            cx: [210, 210, 275, 275],
            cy: [170, 170, 225, 225],
            opacity: [0, 0.75, 0.75, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.85, 1],
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PATHWAY CARD — one per pillar (4 total, 2x2 grid).
   Card 01 (endothelin) gets the ★ THIS CASE coral treatment.
   Card 04 (Activin/TGF-β) gets the amber Merck/WINREVAIR treatment.
   ══════════════════════════════════════════════════════════════════ */

function PathwayCard({
  n, name, arrow, arrowColor, arrowLabel, mech,
  drugClass, drugDetail, isThisCase, isMerck, delay,
}) {
  const reduced = useReducedMotion();
  const accent = isThisCase ? 'var(--coral)' : isMerck ? 'var(--amber)' : 'var(--cream-muted)';
  const tintColor = isThisCase ? 'var(--coral)' : isMerck ? 'var(--amber)' : null;
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: EASE, delay }}
      style={{
        position: 'relative',
        minWidth: 0,
        border: `1px solid ${tintColor ? `color-mix(in srgb, ${tintColor} 36%, transparent)` : 'var(--cream-hairline)'}`,
        borderLeft: `4px solid ${accent}`,
        borderRadius: 'var(--radius-lg)',
        background: tintColor
          ? `color-mix(in srgb, ${tintColor} 10%, var(--bg))`
          : 'color-mix(in srgb, var(--panel) 75%, var(--bg))',
        padding: 'clamp(var(--space-2), 1vw, var(--space-3))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-1)',
        overflow: 'hidden',
      }}
    >
      {/* Header row: number · name · ↑/↓ arrow */}
      <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 'var(--space-2)' }}>
          <span className="deck-mono" style={{
            fontSize: 'clamp(0.7rem, min(0.95vw, 1.4vh), 0.85rem)',
            color: accent,
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}>
            {n}
          </span>
          <span className="deck-display" style={{
            fontSize: 'clamp(1.15rem, min(2vw, 2.8vh), 1.55rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}>
            {name}
          </span>
        </div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 4, flexShrink: 0 }}>
          <span className="deck-display" style={{
            fontSize: 'clamp(1.3rem, min(2.2vw, 2.8vh), 1.7rem)',
            color: arrowColor,
            fontWeight: 800,
            lineHeight: 1,
          }}>
            {arrow}
          </span>
          <span className="deck-mono" style={{
            fontSize: 'clamp(0.65rem, min(0.85vw, 1.25vh), 0.78rem)',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono)',
            opacity: 0.88,
          }}>
            {arrowLabel}
          </span>
        </div>
      </div>

      {/* Mechanism line */}
      <div className="deck-body" style={{
        fontSize: 'clamp(0.88rem, min(1.15vw, 1.7vh), 1.05rem)',
        color: 'var(--cream)',
        opacity: 0.92,
        lineHeight: 1.4,
      }}>
        {mech}
      </div>

      {/* Drug class + detail (pinned to bottom) */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 'var(--space-1)',
        borderTop: '1px dashed var(--cream-hairline)',
      }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'clamp(0.7rem, min(0.95vw, 1.4vh), 0.85rem)',
          color: accent,
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700,
          marginBottom: 2,
        }}>
          {isThisCase ? '★ THIS CASE · ' : isMerck ? '★ MERCK · ' : ''}{drugClass}
        </div>
        <div className="deck-body" style={{
          fontSize: 'clamp(0.82rem, min(1.05vw, 1.55vh), 0.96rem)',
          color: 'var(--cream-muted)',
          opacity: 0.92,
          lineHeight: 1.4,
        }}>
          {drugDetail}
        </div>
      </div>
    </motion.div>
  );
}
