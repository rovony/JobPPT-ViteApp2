import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';
import SecObjectionCard from './cs2-shared/SecObjectionCard';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 17 (manifest position) · CS2 CHALLENGE — THE TURN.
 *
 * The hinge of the case. Per cs2-design.md beat 3: "December 10, 2024.
 * The SEC issues a verbatim recommendation to conduct a PK/PD study in
 * Indian patients. The slide doesn't just show the quote — it
 * dramatizes the strategic inflection."
 *
 * Cinematic role:
 *   • origin for T6 — the 6-pillar architecture appears for the FIRST
 *     time at the bottom, tiny and unlabeled (PillarArchitecture
 *     stage="seed"). It will grow on slide 18, then differentiate
 *     across 19 and 20.
 *   • origin for T7 — the SecObjectionCard is the hero element here
 *     (variant="hero") and will return as variant="resolved" on slide
 *     22 via shared layoutId="cs2-sec-objection".
 *
 * Layout:
 *   ┌──────────────────────────────────────────────────┐
 *   │  SEC OBJECTION QUOTE (large, amber, mono)        │
 *   ├──────────────────────────────────────────────────┤
 *   │  ┌──────────┐    ┌──────────────┐                │
 *   │  │ Defend ✗ │    │ Reframe →    │                │
 *   │  └──────────┘    └──────────────┘                │
 *   ├──────────────────────────────────────────────────┤
 *   │  ▢ ▢ ▢   ▢ ▢ ▢   ← pillar architecture seed     │
 *   └──────────────────────────────────────────────────┘
 */
export default function Slide15Case2Challenge() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--amber, #d8a634)"
      eyebrow="CS2 · The turn — 10 December 2024"
      headline={
        <>
          The SEC asked for a study —{' '}
          <span style={{ color: 'var(--amber, #d8a634)', fontStyle: 'italic', fontWeight: 700 }}>
            we changed what they were looking at.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="Defend with more subgroup data — or reframe the entire argument? The judgment call that defined the case."
      subheadMaxChars={120}
      footerKicker="Case 02 · The hinge"
      footerTagline="Source · CDSCO Oncology SEC minutes · 10 Dec 2024"
    >
      <TurnLayout />
    </SlideFrame>
  );
}

function TurnLayout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 'var(--space-5)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Top — SEC objection quote (T7 origin) */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1], delay: 0.6 }}
      >
        <SecObjectionCard layoutId="cs2-sec-objection" variant="hero" />
      </motion.div>

      {/* Middle — strategic split */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          columnGap: 'var(--space-5)',
          alignItems: 'stretch',
        }}
      >
        <DefendCard />
        <Divider />
        <ReframeCard />
      </div>

      {/* Bottom — pillar architecture seed (T6 origin) */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto 1fr',
          rowGap: 'var(--space-2)',
          minHeight: 0,
        }}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-pageno)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          The reframe — six pillars converging
        </div>
        <div style={{ minHeight: 0, height: '100%' }}>
          <PillarArchitecture stage="seed" />
        </div>
      </div>
    </div>
  );
}

/* ─── Strategic split cards ─────────────────────────────────────── */
function DefendCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 1.4 }}
      style={{
        padding: 'var(--space-4) var(--space-5)',
        border: '1px dashed var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 30%, transparent)',
        opacity: 0.55,
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cream-muted)',
          fontWeight: 700,
          marginBottom: 'var(--space-1)',
        }}
      >
        Option A — defend
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream-muted)',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
          textDecoration: 'line-through',
          textDecorationColor: 'var(--coral)',
          textDecorationThickness: 2,
          marginBottom: 'var(--space-2)',
        }}
      >
        More subgroup PK data
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream-faint)',
          lineHeight: 1.4,
        }}
      >
        Asian PK N = 8 in AGILE. No more retrospective patients exist.
        Even if more subgroup numbers materialized, the SEC had already
        seen the underlying argument. Defending the same frame would
        likely fail the same way.
      </div>
    </motion.div>
  );
}

function ReframeCard() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 1.6 }}
      style={{
        padding: 'var(--space-4) var(--space-5)',
        border: '1.5px solid var(--coral)',
        borderLeft: '4px solid var(--coral)',
        borderRadius: 'var(--radius-md)',
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--coral) 12%, transparent), color-mix(in srgb, var(--panel) 70%, transparent) 70%)',
        position: 'relative',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
          marginBottom: 'var(--space-1)',
        }}
      >
        Option B — reframe
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: '-0.01em',
          lineHeight: 1.15,
          marginBottom: 'var(--space-2)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
        }}
      >
        Mechanism-first · ICH E5 Appendix D
        <ArrowRight size={20} color="var(--coral)" strokeWidth={2.5} />
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        Move the question upstream. The drug target is somatic — IDH1
        R132 doesn't exist at birth. Inherited variation can't modulate
        engagement with a tumor-acquired enzyme. Build a six-pillar
        package anchored in ICH E5(R1) Appendix D's 9-criterion
        compound-property checklist.
      </div>
    </motion.div>
  );
}

function Divider() {
  return (
    <div
      aria-hidden
      style={{
        width: 1,
        background: 'var(--cream-hairline)',
        alignSelf: 'stretch',
        opacity: 0.4,
      }}
    />
  );
}
