import React from 'react';
import { motion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import WorldMapShared from './cs2-shared/WorldMapShared';
import BoneMarrowShared from './cs2-shared/BoneMarrowShared';

/**
 * Slide 16 (manifest position) · CS2 BACKGROUND — the global picture.
 *
 * Per cs2-design.md beat 2: "The dual anchor morphs to full size: 42
 * countries approved (world map, dotted), India empty (outline, coral).
 * Disease shown at molecular/organ level (bone marrow). Drug shown as
 * cards. This is what the world looked like by early 2025."
 *
 * Cinematic role:
 *   • destination for T5 — the bone marrow seed (slide 15) MORPHS to
 *     a centered anatomical anchor here via shared layoutId.
 *   • destination for T5 — India outline grows from the divider into
 *     the world-map slot; the WorldMapBackdrop hosts an India-shaped
 *     coral outline that becomes the T8 origin (filled on slide 22).
 *
 * Layout:
 *   ┌────────────────────────────────────────────────────────────┐
 *   │  WorldMapBackdrop (full slide width, faded as backdrop)    │
 *   │                                                            │
 *   │   ┌─────────────────┐         ┌──────────────────────┐    │
 *   │   │  Bone marrow    │         │  Drug card           │    │
 *   │   │  (zoomed-in)    │         │  Disease card        │    │
 *   │   └─────────────────┘         └──────────────────────┘    │
 *   │                                                            │
 *   │   42 countries · 15,867 patients · India still required…  │
 *   └────────────────────────────────────────────────────────────┘
 */
export default function Slide16Case2Background() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 · Background — by early 2025"
      headline={
        <>
          42 countries.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            One outline still empty.
          </span>
        </>
      }
      headlineMaxChars={32}
      subhead="Ivosidenib · 500 mg QD · IDH1-mutant AML & CCA · 15,867 patients of global recorded exposure."
      subheadMaxChars={100}
      footerKicker="Case 02 · The global picture"
      footerSource="Source · TIBSOVO USPI (cumulative exposure) · CDSCO MAA filing 27 Mar 2024 · Jiang CTS 2021 (PMID 33369167)"
    >
      <BackgroundLayout />
    </SlideFrame>
  );
}

function BackgroundLayout() {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* World map backdrop — fills the viz area, faded so the cards
          and bone-marrow anchor sit on top. The 42 coral dots and the
          empty India outline do most of the visual work. */}
      {/* Backdrop opacity dropped from 0.95 → 0.32: the world map's job
          here is to communicate "global footprint" at backdrop volume,
          not to compete with the bone-marrow + drug/disease cards for
          eye-hit 1. Headline owns the "42 countries" claim; the map
          confirms it visually without crowding the foreground. */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.18,
          zIndex: 0,
        }}
      >
        <WorldMapShared layoutId="cs2-world-map" variant="context" indiaState="empty" />
      </div>

      {/* Foreground: bone marrow anchor (left) + drug/disease cards (right) */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 0.85fr) minmax(0, 1.15fr)',
          columnGap: 'var(--space-7)',
          alignItems: 'center',
          width: '100%',
          height: '100%',
          minHeight: 0,
          padding: 'var(--space-4) 0 var(--space-7) 0',
        }}
      >
        {/* Bone marrow — context variant (T5 destination) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-4)',
          }}
        >
          <BoneMarrowShared layoutId="bone-marrow-cs2" variant="context" />
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--cream-muted)',
              textAlign: 'center',
            }}
          >
            IDH1 R132 · somatic, not germline ·<br />
            the drug target lives <span style={{ color: 'var(--coral)', fontWeight: 700 }}>inside the tumor</span>
          </div>
        </div>

        {/* Right column — drug + disease cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateRows: '1fr 1fr',
            rowGap: 'var(--space-4)',
            minHeight: 0,
          }}
        >
          <DrugCard />
          <DiseaseCard />
        </div>
      </div>

      {/* Bottom assertion line */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 3.6 }}
        style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'var(--space-3) var(--space-5)',
          borderTop: '2px solid var(--cyan)',
          background: 'color-mix(in srgb, var(--bg) 80%, transparent)',
          backdropFilter: 'blur(4px)',
          textAlign: 'center',
          zIndex: 2,
        }}
      >
        <p
          className="deck-display"
          style={{
            margin: 0,
            fontSize: 'var(--fs-slide-tagline)',
            fontWeight: 600,
            color: 'var(--cream)',
            letterSpacing: '-0.01em',
            lineHeight: 1.3,
          }}
        >
          <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>42 countries.</span>{' '}
          <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>15,867 patients.</span>{' '}
          India still required local data.
        </p>
      </motion.div>
    </div>
  );
}

/* ─── Drug card ─────────────────────────────────────────────────── */
function DrugCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 1.2 }}
      style={{
        padding: 'var(--space-4) var(--space-5)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--cyan)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 78%, transparent)',
        backdropFilter: 'blur(8px)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-2)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        The drug
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.15,
        }}
      >
        Ivosidenib · 500 mg QD
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: 'var(--space-4)',
          rowGap: 4,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        <div>Selective IDH1 R132 inhibitor</div>
        <div>FDA 2018 (R/R AML) → 2021 (CCA) → 2022 (ND-AML+aza)</div>
        <div>EMA May 2023</div>
        <div>2-HG plateau at 500 mg · flat PD curve</div>
      </div>
    </motion.div>
  );
}

/* ─── Disease card ──────────────────────────────────────────────── */
function DiseaseCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: 16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 1.5 }}
      style={{
        padding: 'var(--space-4) var(--space-5)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--coral)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 78%, transparent)',
        backdropFilter: 'blur(8px)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-2)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
        }}
      >
        The diseases
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          lineHeight: 1.15,
        }}
      >
        IDH1-mutant AML + cholangiocarcinoma
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          columnGap: 'var(--space-4)',
          rowGap: 4,
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        <div>AML · ~6–20% IDH1-mutant (cohort-dependent)</div>
        <div>iCCA · ~15–20% IDH1-mutant</div>
        <div>Rare oncology · single-digit-month median survival</div>
        <div>1,281 clinical-trial subjects · 8 yr · zero new safety signals</div>
      </div>
    </motion.div>
  );
}
