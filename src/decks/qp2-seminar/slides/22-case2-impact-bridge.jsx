import React from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import SlideFrame from '@/components/deck/SlideFrame';
import IndiaMap from '@/components/deck/illustrations/IndiaMap';
import SecObjectionCard from './cs2-shared/SecObjectionCard';

/**
 * Slide 22 (manifest position) · CS2 IMPACT + BRIDGE.
 *
 * Per cs2-design.md beat 8: The closing slide. Three things land at
 * once and a fourth opens the next case:
 *   1. T7 destination — the SEC objection card RETURNS in resolved
 *      state (struck-through verbatim, slate-grey, small).
 *   2. T8 destination — India outline FILLS coral (variant="filled").
 *   3. Three hero tiles — May 14 approval · June 5 launch · zero new
 *      safety signals.
 *   4. Bridge scaffold — handoff to CS3 (Asparlas / SPARK-ALL).
 */
export default function Slide22Case2ImpactBridge() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--coral)"
      eyebrow="CS2 · Impact — and the bridge to CS3"
      headline={
        <>
          The objection resolved.{' '}
          <span style={{ color: 'var(--coral)', fontStyle: 'italic', fontWeight: 700 }}>
            India filled in.
          </span>
        </>
      }
      headlineMaxChars={36}
      subhead="From a single SEC objection to first-launch — twelve months later — with no Indian PK study and no new safety signal."
      subheadMaxChars={120}
      footerKicker="Case 02 · The impact"
      footerSource="Source · CDSCO MAA · 14 May 2025 · Servier India launch · 5 Jun 2025 · Servier PSUR Nov 2024"
    >
      <ImpactBridgeLayout />
    </SlideFrame>
  );
}

function ImpactBridgeLayout() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateRows: 'auto 1fr auto',
        rowGap: 'var(--space-5)',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* Top — T7 destination: resolved SEC quote */}
      <SecObjectionCard layoutId="cs2-sec-objection" variant="resolved" />

      {/* Middle — three hero tiles + India fills coral */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(0, 1.4fr) minmax(0, 1fr)',
          columnGap: 'var(--space-6)',
          alignItems: 'center',
          minHeight: 0,
        }}
      >
        {/* Left — three hero tiles */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: 'var(--space-4)',
            alignItems: 'stretch',
          }}
        >
          <HeroTile date="14 / 05" sub="CDSCO marketing authorization" body="India approval — no new clinical study required" tone="cyan" delay={0.5} />
          <HeroTile date="05 / 06" sub="Servier India launch" body="22 days from authorization to first patient access" tone="coral" delay={0.8} />
          <HeroTile date="0" sub="New safety signals · 8-yr exposure" body="1,281 trial subjects · 15,867 patients global · zero new signal" tone="cream" delay={1.1} muted />
        </div>

        {/* Right — India fills coral (T8 destination) */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 'var(--space-3)',
          }}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: 0.3 }}
          >
            <IndiaMap layoutId="india-cdsco" variant="filled" fillIntensity={1} />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 1.4 }}
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-slide-pageno)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--coral)',
              fontWeight: 700,
              textAlign: 'center',
            }}
          >
            India · approved
          </motion.div>
        </div>
      </div>

      {/* Bottom — bridge scaffold to CS3 */}
      <BridgeScaffold />
    </div>
  );
}

/* Hero numeric tile */
function HeroTile({ date, sub, body, tone, delay, muted }) {
  const color =
    tone === 'coral' ? 'var(--coral)' : tone === 'cyan' ? 'var(--cyan)' : 'var(--cream)';
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay }}
      style={{
        padding: 'var(--space-4)',
        border: `1.5px solid ${muted ? 'var(--cream-hairline)' : color}`,
        borderLeft: `4px solid ${color}`,
        borderRadius: 'var(--radius-md)',
        background: muted
          ? 'color-mix(in srgb, var(--panel) 60%, transparent)'
          : `linear-gradient(180deg, color-mix(in srgb, ${color} 12%, transparent), color-mix(in srgb, var(--panel) 75%, transparent) 70%)`,
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(2.4rem, 4.4vw, 3.6rem)',
          fontWeight: 700,
          color,
          letterSpacing: '-0.04em',
          lineHeight: 0.95,
          fontVariantNumeric: 'tabular-nums',
        }}
      >
        {date}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          marginTop: 4,
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: muted ? 'var(--cream-muted)' : color,
          fontWeight: 700,
        }}
      >
        {sub}
      </div>
      <div
        style={{
          marginTop: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-pageno)',
          color: 'var(--cream-muted)',
          lineHeight: 1.35,
        }}
      >
        {body}
      </div>
    </motion.div>
  );
}

/* Bridge to CS3 */
function BridgeScaffold() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 1.8 }}
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto 1fr auto',
        columnGap: 'var(--space-4)',
        alignItems: 'center',
        padding: 'var(--space-3) var(--space-5)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        Themes exercised — CS2
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          color: 'var(--cream)',
          lineHeight: 1.4,
        }}
      >
        <strong style={{ color: 'var(--cyan)' }}>Mechanism &gt; population</strong> · <strong style={{ color: 'var(--cyan)' }}>Reframing &gt; defending</strong> · <strong style={{ color: 'var(--cyan)' }}>Convergence of independent evidence</strong> · <strong style={{ color: 'var(--cyan)' }}>Regulatory architecture as deliverable</strong>
      </div>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--space-2)',
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-tagline)',
          fontWeight: 700,
          color: 'var(--violet, #c8a8ff)',
          fontStyle: 'italic',
        }}
      >
        Next · Asparlas · SPARK-ALL
        <ArrowRight size={20} color="var(--violet, #c8a8ff)" strokeWidth={2.5} />
      </div>
    </motion.div>
  );
}
