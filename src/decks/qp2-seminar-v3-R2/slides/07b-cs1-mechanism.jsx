import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import Lungs from '../components/Lungs';

/**
 * CS1 · Slide 07b — Mechanism + ambrisentan MOA + 3-pathway context.
 *
 * Three established PAH pathways with first-FDA-approval dates on the
 * right; compressed endothelin mechanism schematic on the left showing
 * selective ETA blockade. The fourth pathway (Activin/TGF-β) is noted
 * in the disease-biology footer as an emerging adult-only class — it
 * doesn't carry into the case and therefore doesn't earn a full card.
 *
 * Verified facts:
 *   - 2022 ESC/ERS PAH guideline codifies 3 pathways (ET, NO/cGMP, PGI2).
 *   - Ambrisentan: selective ETA antagonist, Ki = 0.011 nM,
 *     >4,000-fold ETA selectivity vs ETB; FDA Jun 15, 2007 (Letairis).
 *   - Bosentan (Tracleer, 2001): first ERA, dual ETA/ETB.
 *   - Macitentan (Opsumit, 2013): dual ERA, 50-fold ETA-preferring.
 *   - Sildenafil (Revatio, 2005), Tadalafil (Adcirca, 2009): PDE5i.
 *   - Riociguat (Adempas, 2013): sGC stimulator (also CTEPH).
 *   - Epoprostenol (Flolan, 1995): IV prostacyclin.
 *   - Treprostinil (Remodulin, 2002): SC/IV/inh/oral.
 *   - Selexipag (Uptravi, 2015): non-prostanoid IP agonist.
 *
 * Sources: ESC/ERS 2022 · Letairis PI · Humbert NEJM 2023.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const D = {
  moa: 0.40,
  card1: 0.55,
  card2: 0.70,
  card3: 0.85,
  anchor: 1.30,
};

export default function Cs1Mechanism() {
  return (
    <SlideFrame
      dataCase="coral"
      eyebrowColor="var(--case)"
      eyebrow="Case 01 · Mechanism — endothelin pathway"
      headline={
        <>
          Four pathways drive PAH.{' '}
          <span style={{ color: 'var(--case)', fontStyle: 'italic', fontWeight: 700 }}>
            Ambrisentan blocks one.
          </span>
        </>
      }
      headlineMaxChars={48}
      footerKicker="Case 01 · Mechanism"
      footerSource="Sources · ESC/ERS 2022 · Letairis PI · Humbert NEJM 2023"
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
        <div
          aria-hidden
          style={{
            position: 'absolute',
            right: '2%',
            top: '50%',
            transform: 'translateY(-50%)',
            width: 'clamp(20rem, 36vw, 32rem)',
            opacity: 0.12,
            pointerEvents: 'none',
            zIndex: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Lungs layoutId="cs1-lung" variant="foundation" />
        </div>

        {/* LEFT — compressed 3-node mechanism schematic */}
        <MOAPanel />

        {/* RIGHT — 3 pathway cards, vertical stack, equal height */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gridTemplateRows: '1fr 1fr 1fr',
            gap: 'var(--space-3)',
            minHeight: 0,
            position: 'relative',
            zIndex: 1,
          }}
        >
          <PathwayCard
            n="01"
            name="Endothelin"
            year="2007"
            status="↑ ET-1 OVERACTIVE"
            statusColor="var(--case)"
            mech="ET-1 → ETA → vasoconstriction + SMC proliferation. ETB preserved (NO release · ET-1 clearance)."
            drugClass="ERAs"
            drugDetail={<><strong style={{ color: 'var(--case)' }}>Ambrisentan</strong> (selective ETA) · Bosentan · Macitentan (dual ETA/ETB)</>}
            isThisCase
            delay={D.card1}
          />
          <PathwayCard
            n="02"
            name="NO / cGMP"
            year="2005"
            status="↓ NO UNDERACTIVE"
            mech="NO → sGC → cGMP → vasodilation. PDE5 degrades cGMP; PDE5i + sGC stimulator restore signal."
            drugClass="PDE5i · sGC stimulator"
            drugDetail={<>Sildenafil · Tadalafil · Riociguat (also CTEPH)</>}
            delay={D.card2}
          />
          <PathwayCard
            n="03"
            name="Prostacyclin"
            year="1995"
            status="↓ PGI2 UNDERACTIVE"
            mech="PGI2 → IP → cAMP → vasodilation + anti-proliferation. IV/SC/inhaled/oral routes."
            drugClass="Prostanoids · IP agonist"
            drugDetail={<>Epoprostenol · Treprostinil · Iloprost · Selexipag</>}
            delay={D.card3}
          />
        </div>
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   MOA PANEL — compressed 3-node endothelin schematic.
   Nodes: ET-1 → ETA receptor → vasoconstriction/proliferation.
   Ambrisentan blocking arrow + Ki selectivity callout at the
   ET-1 → ETA step. ETB preserved as a faint dashed side-note.
   Disease-biology footer below with 4 bullet points.
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
      <PanelKicker color="var(--case)">Mechanism — endothelin pathway</PanelKicker>

      <PathwayFlowchart reduced={reduced} />

      <motion.div
        initial={reduced ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: EASE, delay: D.anchor }}
        style={{
          borderTop: '1px solid var(--cream-hairline)',
          paddingTop: 'var(--space-3)',
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'clamp(0.65rem, min(1vw, 1.5vh), 0.9rem)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
            fontWeight: 700,
          }}
        >
          Disease biology · beyond the 3 pathways
        </div>
        <ul
          className="deck-body"
          style={{
            margin: 0,
            paddingLeft: 'var(--space-4)',
            fontSize: 'var(--fs-card-body)',
            color: 'var(--cream-muted)',
            lineHeight: 1.5,
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--space-1)',
          }}
        >
          <li>
            <strong style={{ color: 'var(--cream)' }}>Vascular remodeling</strong>{' '}
            — PASMC proliferation · plexiform lesions
          </li>
          <li>
            <strong style={{ color: 'var(--cream)' }}>In-situ thrombosis</strong>{' '}
            in pulmonary arterioles
          </li>
          <li>
            <strong style={{ color: 'var(--cream)' }}>RV maladaptation</strong>{' '}
            — hypertrophy → dilation → failure
          </li>
          <li>
            <strong style={{ color: 'var(--cream)' }}>Activin/TGF-β rebalancing</strong>{' '}
            — emerging class, adult-only data
          </li>
        </ul>
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

/* ── Compressed 3-node SVG flowchart ─────────────────────────────
   ET-1 → (ambrisentan blocks) → ETA receptor → vasoconstriction.
   ETB preserved shown as a faint dashed side-branch.
   Animated coral particles flow down and get blocked.
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
        <CompressedSVG reduced={reduced} />
      </div>
    </motion.div>
  );
}

function CompressedSVG({ reduced }) {
  return (
    <svg
      viewBox="0 0 300 460"
      preserveAspectRatio="xMidYMid meet"
      style={{ width: '100%', height: '100%', display: 'block' }}
      aria-hidden
    >
      {/* NODE 1: ET-1 */}
      <circle cx="150" cy="55" r="38" fill="none" stroke="var(--case)" strokeWidth="2" />
      <text x="150" y="50" textAnchor="middle"
            fontFamily="var(--font-display)" fontSize="20" fontWeight="700" fill="var(--cream)">
        ET-1
      </text>
      <text x="150" y="68" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.2" fill="var(--cream-muted)">
        ENDOTHELIN-1
      </text>

      {/* Arrow: ET-1 → ETA */}
      <line x1="150" y1="95" x2="150" y2="200" stroke="var(--case)" strokeWidth="2" />
      <polygon points="145,198 150,210 155,198" fill="var(--case)" />

      {/* Ambrisentan blocker bars */}
      <line x1="128" y1="148" x2="172" y2="148" stroke="var(--case)" strokeWidth="4" strokeLinecap="round" />
      <line x1="128" y1="159" x2="172" y2="159" stroke="var(--case)" strokeWidth="4" strokeLinecap="round" />

      {/* Blocker label — left of bars */}
      <text x="122" y="140" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="11" fontWeight="800"
            letterSpacing="0.08em" fill="var(--case)">
        AMBRISENTAN
      </text>
      <text x="122" y="156" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="9" fontWeight="700"
            letterSpacing="0.06em" fill="var(--case)" opacity="0.85">
        BLOCKS ETA
      </text>
      <text x="122" y="172" textAnchor="end"
            fontFamily="var(--font-mono)" fontSize="8.5" fontWeight="600"
            letterSpacing="0.04em" fill="var(--cream-muted)">
        Ki 0.011 nM · &gt;4000:1
      </text>

      {/* NODE 2: ETA receptor box */}
      <rect x="30" y="215" width="240" height="65" rx="8" fill="var(--bg)" />
      <rect x="30" y="215" width="240" height="65" rx="8"
            fill="var(--case)" fillOpacity="0.10"
            stroke="var(--case)" strokeWidth="1.4" />
      <text x="150" y="238" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="9" letterSpacing="1.5" fill="var(--case)">
        ETA RECEPTOR
      </text>
      <text x="150" y="256" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="11" fill="var(--cream)">
        Vascular smooth muscle
      </text>
      <text x="150" y="272" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="11" fontWeight="600" fill="var(--cream)">
        Vasoconstriction + proliferation
      </text>

      {/* ETB preserved — dashed side-branch (selectivity visual) */}
      <line x1="186" y1="55" x2="262" y2="110" stroke="var(--cream-muted)" strokeWidth="1.2" strokeDasharray="4 4" opacity="0.55" />
      <rect x="210" y="115" width="85" height="42" rx="6"
            fill="none" stroke="var(--cream-muted)" strokeWidth="0.8" strokeDasharray="3 3" opacity="0.45" />
      <text x="252" y="132" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="7.5" letterSpacing="1" fill="var(--cream-muted)" opacity="0.65">
        ETB · PRESERVED
      </text>
      <text x="252" y="148" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="8" fill="var(--cream-muted)" opacity="0.55">
        NO release · clearance
      </text>

      {/* Separator */}
      <line x1="40" y1="305" x2="260" y2="305"
            stroke="var(--cream-faint)" strokeWidth="0.5" opacity="0.4" />

      {/* NODE 3: Result chip */}
      <rect x="30" y="320" width="240" height="62" rx="6" fill="var(--bg)" />
      <rect x="30" y="320" width="240" height="62" rx="6"
            fill="var(--case)" fillOpacity="0.08"
            stroke="var(--case)" strokeWidth="1.2" />
      <text x="150" y="340" textAnchor="middle"
            fontFamily="var(--font-mono)" fontSize="8" letterSpacing="1.5" fill="var(--case)">
        AMBRISENTAN EFFECT
      </text>
      <text x="150" y="358" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        ↓ vasoconstriction · ↓ proliferation
      </text>
      <text x="150" y="374" textAnchor="middle"
            fontFamily="var(--font-body)" fontSize="10" fill="var(--cream)">
        ETB-mediated benefits preserved
      </text>

      {/* Flowing particles: ET-1 → ETA */}
      {!reduced && [
        { delay: 1.4, duration: 2.2 },
        { delay: 2.2, duration: 2.2 },
        { delay: 3.0, duration: 2.2 },
      ].map((p, i) => (
        <motion.circle
          key={`pa-${i}`}
          r={PARTICLE_R} fill="var(--case)"
          cx={150}
          initial={{ cy: 95, opacity: 0 }}
          animate={{
            cy: [95, 95, 200, 200],
            opacity: [0, 1, 1, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.08, 0.92, 1],
            repeat: Infinity,
          }}
        />
      ))}

      {/* Blocked particles — hit blocker bars and fade */}
      {!reduced && [
        { delay: 1.7, duration: 1.6 },
        { delay: 2.5, duration: 1.6 },
      ].map((p, i) => (
        <motion.circle
          key={`pb-${i}`}
          r={PARTICLE_R} fill="var(--case)"
          cx={150}
          initial={{ cy: 95, opacity: 0 }}
          animate={{
            cy: [95, 95, 148, 148],
            opacity: [0, 0.9, 0.9, 0],
          }}
          transition={{
            duration: p.duration, delay: p.delay, ease: PARTICLE_EASE,
            times: [0, 0.1, 0.7, 1],
            repeat: Infinity,
          }}
        />
      ))}
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════
   PATHWAY CARD — 3 cards in vertical stack, equal height.
   Card 01 (endothelin) gets the coral THIS CASE treatment.
   ══════════════════════════════════════════════════════════════════ */

function PathwayCard({
  n, name, year, status, statusColor, mech,
  drugClass, drugDetail, isThisCase, delay,
}) {
  const reduced = useReducedMotion();
  const accent = isThisCase ? 'var(--case)' : 'var(--cream-muted)';
  const tintColor = isThisCase ? 'var(--case)' : null;
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
          ? 'color-mix(in srgb, var(--case) 8%, transparent)'
          : 'color-mix(in srgb, var(--panel) 70%, transparent)',
        padding: 'clamp(var(--space-3), 1.6vw, var(--space-5))',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--space-3)',
        overflow: 'hidden',
      }}
    >
      {/* Header: pathway kicker + name left, year right */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 'var(--space-2)' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2, minWidth: 0, flex: 1 }}>
          <span className="deck-mono uppercase" style={{
            fontSize: 'clamp(0.65rem, min(1vw, 1.5vh), 0.9rem)',
            color: accent,
            letterSpacing: 'var(--ls-mono-wide)',
            fontWeight: 700,
            fontVariantNumeric: 'tabular-nums',
          }}>
            Pathway {n}
          </span>
          <span className="deck-display" style={{
            fontSize: 'clamp(1.1rem, min(1.5vw, 2vh), 1.6rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            lineHeight: 1.1,
          }}>
            {name}
          </span>
          <span className="deck-mono" style={{
            fontSize: 'clamp(0.6rem, min(0.85vw, 1.2vh), 0.8rem)',
            color: statusColor || 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono)',
            fontWeight: 600,
            marginTop: 2,
          }}>
            {status}
          </span>
        </div>
        <div style={{ flexShrink: 0, textAlign: 'right' }}>
          <div className="deck-display" style={{
            fontSize: 'clamp(2.5rem, min(5vw, 7.5vh), 4.5rem)',
            color: accent,
            fontWeight: 700,
            lineHeight: 1,
            fontVariantNumeric: 'tabular-nums',
            letterSpacing: '-0.02em',
          }}>
            {year}
          </div>
          <div className="deck-mono uppercase" style={{
            fontSize: 'clamp(0.6rem, min(0.85vw, 1.2vh), 0.8rem)',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono-wide)',
            marginTop: 2,
          }}>
            1st FDA approval
          </div>
        </div>
      </div>

      {/* Mechanism */}
      <div className="deck-body" style={{
        fontSize: 'clamp(0.84rem, min(1vw, 1.4vh), 1.05rem)',
        color: 'var(--cream)',
        opacity: 0.92,
        lineHeight: 1.45,
      }}>
        {mech}
      </div>

      {/* Drug class + list */}
      <div style={{
        marginTop: 'auto',
        paddingTop: 'var(--space-2)',
        borderTop: '1px dashed var(--cream-hairline)',
      }}>
        <div className="deck-mono uppercase" style={{
          fontSize: 'clamp(0.65rem, min(1vw, 1.5vh), 0.9rem)',
          color: accent,
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700,
          marginBottom: 4,
        }}>
          {isThisCase ? '★ THIS CASE · ' : ''}{drugClass}
        </div>
        <div className="deck-body" style={{
          fontSize: 'clamp(0.84rem, min(1vw, 1.4vh), 1.05rem)',
          color: 'var(--cream-muted)',
          opacity: 0.92,
          lineHeight: 1.45,
        }}>
          {drugDetail}
        </div>
      </div>
    </motion.div>
  );
}
