import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import WorldMapShared from './cs2-shared/WorldMapShared';

/**
 * Slide 16 · CS2 BACKGROUND — global picture · India still empty.
 *
 * v3 (Apr-26 cinematic-handoff pass) — TWO BEATS in one slide.
 *
 *   Beat 1 (mount → +1300 ms):
 *     India outline alone, large, anchored on the RIGHT pane. Morphs
 *     in from the slide-15 marginalia seed via the shared
 *     layoutId="india-cdsco" (LayoutGroup is wired in DeckRunner).
 *     The text content (drug card, disease card, footprint stats)
 *     sits flush on the LEFT pane so India is never covered.
 *
 *   Beat 2 (+1300 ms → end):
 *     A faint world map fades in across the right pane. The
 *     standalone India outline morphs (layout) into India's actual
 *     geographic position on the Robinson projection — the parent
 *     box shrinks to the .IND bbox we computed from the world-map
 *     SVG viewBox, and framer-motion interpolates the bbox change
 *     in 1.4 s. The 42 approved countries light coral around it;
 *     India stays conspicuously empty.
 *
 * Bone marrow has been removed: cholangiocarcinoma is not a marrow
 * disease, and the CS2 narrative is regulatory geography.
 */

// India's bbox inside the world map's Robinson viewBox
//   svg viewBox: -180 -91.296 360 182.592
//   IND bbox:    x ∈ [55.786, 83.465], y ∈ [-40.181, -9.018]
// → left 65.5%, top 28.0%, width 7.7%, height 17.1%
const INDIA_GEO = {
  left:   '65.5%',
  top:    '28.0%',
  width:  '7.7%',
  height: '17.1%',
};

const INDIA_PATH = 'M83.304,-31.995 L83.465,-31.566 L83.168,-31.357 L83.384,-30.661 L82.652,-30.866 L81.546,-30.084 L81.691,-29.435 L81.316,-28.485 L81.355,-27.934 L81.06,-27.001 L80.259,-27.259 L80.387,-26.087 L80.218,-25.701 L80.385,-25.22 L79.937,-24.952 L79.183,-26.747 L78.914,-26.744 L78.852,-26.021 L78.239,-26.608 L78.45,-27.252 L78.876,-27.317 L79.183,-28.276 L78.592,-28.468 L77.692,-28.452 L76.743,-28.607 L76.53,-29.394 L76.058,-29.45 L75.209,-29.94 L74.991,-29.171 L75.786,-28.572 L75.241,-28.15 L75.083,-27.738 L75.726,-27.435 L75.653,-26.752 L76.103,-25.901 L76.372,-24.969 L76.282,-24.556 L75.613,-24.569 L74.434,-24.335 L74.587,-23.483 L74.136,-22.813 L72.808,-22.052 L71.851,-20.719 L71.183,-20.005 L70.274,-19.264 L70.321,-18.744 L69.855,-18.464 L69.001,-18.059 L68.545,-17.999 L68.322,-17.135 L68.642,-15.663 L68.762,-14.724 L68.412,-13.648 L68.52,-11.725 L68.008,-11.671 L67.598,-10.807 L67.92,-10.434 L67.026,-10.113 L66.723,-9.343 L66.337,-9.018 L65.349,-10.074 L64.813,-11.66 L64.371,-12.801 L63.993,-13.337 L63.4,-14.425 L63.062,-15.841 L62.841,-16.547 L61.822,-18.103 L61.229,-20.297 L60.804,-21.745 L60.681,-23.117 L60.395,-24.176 L59.029,-23.498 L58.326,-23.634 L56.923,-25.006 L57.356,-25.416 L57.025,-25.86 L55.786,-26.821 L56.359,-27.576 L58.503,-27.574 L58.201,-28.545 L57.586,-29.119 L57.367,-29.991 L56.667,-30.499 L57.572,-31.686 L58.707,-31.599 L59.539,-32.787 L59.957,-33.935 L60.69,-35.072 L60.527,-35.88 L61.216,-36.534 L60.339,-37.093 L59.856,-37.859 L59.317,-38.851 L59.677,-39.339 L61.169,-39.063 L62.185,-39.231 L62.88,-40.181 L64.196,-38.856 L64.304,-37.932 L64.807,-37.353 L64.898,-36.775 L64.183,-36.927 L64.703,-35.679 L65.783,-34.962 L67.267,-34.169 L66.754,-33.656 L66.567,-32.597 L67.574,-32.169 L68.578,-31.613 L69.944,-30.979 L71.294,-30.832 L71.948,-30.256 L72.713,-30.148 L73.923,-29.884 L74.727,-29.904 L74.764,-30.351 L74.512,-31.071 L74.499,-31.559 L75.045,-31.796 L75.287,-30.904 L75.348,-30.678 L76.303,-30.248 L76.88,-30.426 L77.712,-30.35 L78.496,-30.383 L78.438,-31.079 L77.977,-31.44 L78.729,-31.581 L79.441,-32.424 L80.402,-33.144 L81.268,-32.866 L81.851,-33.343 L82.455,-32.639 L82.229,-32.163 Z';

const INDIA_VIEWBOX = '55 -41 30 33';

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
  const reduced = useReducedMotion();
  const [beat, setBeat] = useState(1);

  useEffect(() => {
    if (reduced) {
      setBeat(2);
      return undefined;
    }
    const t = setTimeout(() => setBeat(2), 1300);
    return () => clearTimeout(t);
  }, [reduced]);

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: 'minmax(0, 0.92fr) minmax(0, 1.08fr)',
        columnGap: 'var(--space-7)',
        alignItems: 'stretch',
      }}
    >
      {/* ─── LEFT pane: text content (no India coverage) ─── */}
      <div
        style={{
          display: 'grid',
          gridTemplateRows: 'auto auto auto 1fr auto',
          rowGap: 'var(--space-3)',
          minHeight: 0,
          paddingBottom: 'var(--space-4)',
        }}
      >
        <DrugCard />
        <DiseaseCard />
        <FootprintLine />
        <div />
        <BottomAssertion />
      </div>

      {/* ─── RIGHT pane: India → World map handoff ─── */}
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: '100%',
          minHeight: 0,
        }}
      >
        {/* World map — beat-2 only. Faded so the lit countries + the
            empty India read first. */}
        <AnimatePresence>
          {beat === 2 && (
            <motion.div
              key="world-map"
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.62 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.9, ease: [0.2, 0.7, 0.3, 1] }}
              style={{
                position: 'absolute',
                inset: 0,
                pointerEvents: 'none',
              }}
              aria-hidden
            >
              <WorldMapShared
                layoutId="cs2-world-map"
                variant="context"
                indiaState="empty"
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* India outline — single shared element with layoutId.
            Beat 1: parent absolute box fills the right pane (centered).
            Beat 2: parent absolute box shrinks to India's geographic
                    .IND position on the world map. framer-motion
                    interpolates the bbox change in 1.4 s. */}
        <motion.div
          layout
          layoutId="india-cdsco"
          transition={{ layout: { duration: 1.4, ease: [0.4, 0, 0.2, 1] } }}
          style={
            beat === 1
              ? {
                  position: 'absolute',
                  left:   '8%',
                  top:    '6%',
                  width:  '84%',
                  height: '78%',
                  pointerEvents: 'none',
                  color: 'var(--coral)',
                }
              : {
                  position: 'absolute',
                  left:   INDIA_GEO.left,
                  top:    INDIA_GEO.top,
                  width:  INDIA_GEO.width,
                  height: INDIA_GEO.height,
                  pointerEvents: 'none',
                  color: 'var(--coral)',
                }
          }
          aria-hidden
        >
          <svg
            viewBox={INDIA_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            style={{ width: '100%', height: '100%', display: 'block', overflow: 'visible' }}
            role="img"
            aria-label="India outline"
          >
            <path
              d={INDIA_PATH}
              fill="var(--coral)"
              fillOpacity={beat === 1 ? 0.10 : 0.06}
              stroke="var(--coral)"
              strokeWidth={beat === 1 ? 1.6 : 1.4}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeOpacity={0.95}
            />
          </svg>
        </motion.div>

        {/* Beat-1 caption underneath the standalone India */}
        <AnimatePresence>
          {beat === 1 && (
            <motion.div
              key="india-beat1-caption"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              transition={{ duration: 0.45, ease: [0.2, 0.7, 0.3, 1], delay: 0.3 }}
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: 'var(--space-2)',
                textAlign: 'center',
                pointerEvents: 'none',
              }}
            >
              <span
                className="deck-mono uppercase"
                style={{
                  fontSize: 'var(--fs-card-label)',
                  letterSpacing: 'var(--ls-mono-wide)',
                  color: 'var(--cream-muted)',
                }}
              >
                INDIA · pre-approval, no local data accepted
              </span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Beat-2 callout: "INDIA · still required local data" */}
        <AnimatePresence>
          {beat === 2 && (
            <motion.div
              key="india-callout"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.6 }}
              style={{
                position: 'absolute',
                left: '74%',
                top: '48%',
                pointerEvents: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 4,
                  padding: '6px 10px',
                  borderLeft: '2px solid var(--coral)',
                }}
              >
                <span
                  className="deck-mono uppercase"
                  style={{
                    fontSize: 'var(--fs-card-label)',
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: 'var(--coral)',
                    fontWeight: 700,
                  }}
                >
                  INDIA
                </span>
                <span
                  className="deck-display"
                  style={{
                    fontSize: 'var(--fs-card-body)',
                    color: 'var(--cream)',
                    fontStyle: 'italic',
                    fontWeight: 600,
                    lineHeight: 1.2,
                  }}
                >
                  still required local data
                </span>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

/* ─── Drug card (text-only, hairline rule, no rounded chrome) ── */
function DrugCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.4 }}
      style={{
        padding: 'var(--space-3) var(--space-4)',
        borderLeft: '3px solid var(--cyan)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-2)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
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
          fontSize: 'var(--fs-card-quote)',
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
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        <div>Selective IDH1 R132 inhibitor</div>
        <div>FDA 2018 → 2021 (CCA) → 2022 (ND-AML+aza)</div>
        <div>EMA May 2023</div>
        <div>2-HG plateau at 500 mg · flat PD curve</div>
      </div>
    </motion.div>
  );
}

function DiseaseCard() {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.55, ease: [0.2, 0.7, 0.3, 1], delay: 0.6 }}
      style={{
        padding: 'var(--space-3) var(--space-4)',
        borderLeft: '3px solid var(--coral)',
        display: 'grid',
        gridTemplateRows: 'auto auto auto',
        rowGap: 'var(--space-2)',
      }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-card-label)',
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
          fontSize: 'var(--fs-card-quote)',
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
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.4,
        }}
      >
        <div>AML · ~6–20% IDH1-mutant</div>
        <div>iCCA · ~15–20% IDH1-mutant</div>
        <div>Rare oncology · single-digit-month median survival</div>
        <div>1,281 trial subjects · 8 yr · zero new safety signals</div>
      </div>
    </motion.div>
  );
}

function FootprintLine() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.2, 0.7, 0.3, 1], delay: 0.85 }}
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        columnGap: 'var(--space-6)',
        alignItems: 'baseline',
        paddingTop: 'var(--space-3)',
        borderTop: '1px solid var(--cream-hairline)',
      }}
    >
      <Stat number="42" unit="countries" caption="approvals across FDA, EMA, PMDA, NMPA, MFDS, Health Canada + others" />
      <Stat number="15,867" unit="patients" caption="cumulative recorded global exposure" />
    </motion.div>
  );
}

function Stat({ number, unit, caption }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
        <span
          className="deck-display"
          style={{
            fontSize: 'var(--fs-stat-number)',
            color: 'var(--cyan)',
            fontWeight: 800,
            letterSpacing: '-0.01em',
            lineHeight: 1,
          }}
        >
          {number}
        </span>
        <span
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-card-label)',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
          }}
        >
          {unit}
        </span>
      </div>
      <span
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-card-body)',
          color: 'var(--cream-muted)',
          lineHeight: 1.35,
        }}
      >
        {caption}
      </span>
    </div>
  );
}

function BottomAssertion() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: 2.6 }}
      style={{
        paddingTop: 'var(--space-3)',
        borderTop: '2px solid var(--cyan)',
      }}
    >
      <p
        className="deck-display"
        style={{
          margin: 0,
          fontSize: 'var(--fs-card-quote)',
          fontWeight: 600,
          color: 'var(--cream)',
          letterSpacing: '-0.005em',
          lineHeight: 1.3,
        }}
      >
        <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>42 countries.</span>{' '}
        <span style={{ color: 'var(--cyan)', fontWeight: 800 }}>15,867 patients.</span>{' '}
        India still required local data.
      </p>
    </motion.div>
  );
}
