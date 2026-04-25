import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';
import SecObjectionCard from './cs2-shared/SecObjectionCard';
import PillarArchitecture from './cs2-shared/PillarArchitecture';

/**
 * Slide 17 · CS2 CHALLENGE — THE TURN.
 *
 * v3 (Apr-26 audit pass):
 *   • DefendCard previously struck through "More subgroup PK data" with
 *     a thick coral line that made the headline of the option
 *     unreadable. Replaced with an X chip + muted (not crossed) text —
 *     audience sees the option is dismissed, but reads it.
 *   • Pillar seed at the bottom now uses the new SeedGrid (single-row,
 *     labeled, readable) — see PillarArchitecture v2.
 */
export default function Slide17Case2ChallengeTurn() {
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
      footerSource="Source · CDSCO Oncology SEC recommendation · 10 Dec 2024"
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
        rowGap: 'var(--space-4)',
        height: '100%',
        minHeight: 0,
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.2, 0.7, 0.3, 1], delay: 0.6 }}
      >
        <SecObjectionCard layoutId="cs2-sec-objection" variant="hero" />
      </motion.div>

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
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-faint)',
          }}
        >
          The reframe — six pillars converging (about to lock in)
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
        paddingLeft: 'var(--space-4)',
        paddingRight: 0,
        paddingTop: 'var(--space-2)',
        paddingBottom: 'var(--space-2)',
        opacity: 0.6,
        position: 'relative',
        borderLeft: '1px dashed color-mix(in srgb, var(--coral) 60%, transparent)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          marginBottom: 'var(--space-2)',
        }}
      >
        <div
          aria-hidden
          style={{
            width: 18,
            height: 18,
            borderRadius: 4,
            border: '1.5px solid var(--coral)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'color-mix(in srgb, var(--coral) 14%, transparent)',
            flexShrink: 0,
          }}
        >
          <X size={12} color="var(--coral)" strokeWidth={3} />
        </div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--coral)',
            fontWeight: 700,
          }}
        >
          Option A — defend (rejected)
        </div>
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 700,
          color: 'var(--cream-muted)',
          letterSpacing: '-0.005em',
          lineHeight: 1.15,
          marginBottom: 'var(--space-2)',
        }}
      >
        More subgroup PK data
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
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
        paddingLeft: 'var(--space-4)',
        paddingRight: 0,
        paddingTop: 'var(--space-2)',
        paddingBottom: 'var(--space-2)',
        borderLeft: '4px solid var(--coral)',
        position: 'relative',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--coral)',
          fontWeight: 700,
          marginBottom: 'var(--space-2)',
        }}
      >
        Option B — reframe (chosen)
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: '-0.005em',
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
          fontSize: 'var(--fs-card-body)',
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
