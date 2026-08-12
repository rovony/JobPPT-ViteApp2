/**
 * Decision fork as geometry — not a card board.
 * Lungs = visual anchor. Thick rails + terminal nodes + labels.
 * Steps reweight emphasis only; composition is full at step 0.
 */
import { motion, useReducedMotion } from 'framer-motion';
import Lungs from '../Lungs';

const EASE = [0.2, 0.7, 0.3, 1] as const;

const CORAL = '#FB923C';
const CREAM = '#F5F0E8';

const PATHS = [
  {
    id: 'kill',
    label: 'Kill',
    sub: 'Walk away',
    d: 'M 140 200 C 260 200, 340 88, 520 78',
    end: { x: 520, y: 78 },
    labelAt: { x: 560, y: 72 },
  },
  {
    id: 'model',
    label: 'Model-informed',
    sub: 'Bridge the label',
    d: 'M 140 200 L 520 200',
    end: { x: 520, y: 200 },
    labelAt: { x: 560, y: 196 },
  },
  {
    id: 'more',
    label: 'More data',
    sub: 'Ask for another study',
    d: 'M 140 200 C 260 200, 340 312, 520 322',
    end: { x: 520, y: 322 },
    labelAt: { x: 560, y: 318 },
  },
] as const;

export default function DecisionForkViz({ step = 0 }: { step?: number }) {
  const reduced = useReducedMotion();
  const showTravel = step >= 2;
  const showStakes = step >= 3;
  const forkHot = step >= 1;

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'grid',
        gridTemplateRows: 'minmax(0, 1fr) auto',
        gap: 'clamp(8px, 1.2vh, 14px)',
      }}
    >
      {/* Lungs as real visual plane — not a whisper watermark */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          inset: '2% 6% 22% 28%',
          opacity: 0.28,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      >
        <Lungs layoutId="cs1-lung" variant="context" widthOverride="100%" opacity={1} bodyOpacity={0.2} />
      </div>

      <svg
        viewBox="0 0 780 400"
        preserveAspectRatio="xMidYMid meet"
        style={{ width: '100%', height: '100%', position: 'relative', zIndex: 1 }}
        role="img"
        aria-label="Three decision paths from a terminated pediatric trial"
      >
        {/* Origin */}
        <motion.g
          initial={reduced ? false : { opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <circle cx="96" cy="200" r="58" fill="rgba(251,146,60,0.12)" stroke={CORAL} strokeWidth="2.5" />
          <circle cx="96" cy="200" r="32" fill={CORAL} />
          <text
            x="96"
            y="196"
            textAnchor="middle"
            fill="#0F0E0C"
            fontSize="11"
            fontWeight="800"
            fontFamily="var(--font-mono)"
            letterSpacing="0.05em"
          >
            DECISION
          </text>
          <text
            x="96"
            y="212"
            textAnchor="middle"
            fill="#0F0E0C"
            fontSize="9"
            fontFamily="var(--font-mono)"
            opacity="0.8"
          >
            N=39 · OL
          </text>
        </motion.g>

        {PATHS.map((p, i) => {
          const isChosen = showTravel && p.id === 'model';
          const isDim = showTravel && p.id !== 'model';
          const stroke = p.id === 'model' ? CORAL : CREAM;
          const strokeOp = isDim ? 0.18 : p.id === 'model' ? (forkHot ? 0.95 : 0.75) : forkHot ? 0.55 : 0.42;

          return (
            <g key={p.id}>
              <motion.path
                d={p.d}
                fill="none"
                stroke={stroke}
                strokeWidth={isChosen ? 12 : p.id === 'model' ? 9 : 7}
                strokeLinecap="round"
                initial={false}
                animate={{ opacity: strokeOp }}
                transition={{ duration: 0.3, ease: EASE, delay: reduced ? 0 : i * 0.04 }}
              />
              <motion.circle
                cx={p.end.x}
                cy={p.end.y}
                r={isChosen ? 11 : 8}
                fill={p.id === 'model' ? CORAL : CREAM}
                initial={false}
                animate={{ opacity: isDim ? 0.2 : 1 }}
                transition={{ duration: 0.3 }}
              />
              <motion.g initial={false} animate={{ opacity: isDim ? 0.25 : 1 }} transition={{ duration: 0.3 }}>
                <text
                  x={p.labelAt.x}
                  y={p.labelAt.y}
                  fill={isChosen ? CORAL : CREAM}
                  fontSize="22"
                  fontWeight="600"
                  fontFamily="var(--font-display)"
                >
                  {p.label}
                </text>
                <text
                  x={p.labelAt.x}
                  y={p.labelAt.y + 22}
                  fill="rgba(245,240,232,0.65)"
                  fontSize="13"
                  fontFamily="var(--font-body)"
                >
                  {p.sub}
                </text>
                {isChosen && (
                  <text
                    x={p.labelAt.x}
                    y={p.labelAt.y + 44}
                    fill={CORAL}
                    fontSize="11"
                    fontWeight="700"
                    fontFamily="var(--font-mono)"
                    letterSpacing="0.1em"
                  >
                    CHOSEN PATH →
                  </text>
                )}
              </motion.g>
            </g>
          );
        })}

        {showTravel && (
          <motion.circle r="6" fill={CORAL} initial={reduced ? false : { opacity: 0 }} animate={{ opacity: 1 }}>
            <animateMotion dur={reduced ? '0.01s' : '1.35s'} repeatCount="indefinite" path={PATHS[1].d} />
          </motion.circle>
        )}
      </svg>

      {/* Stakes as type row — no card chrome */}
      <motion.div
        initial={false}
        animate={{ opacity: showStakes ? 1 : 0.4 }}
        transition={{ duration: 0.28 }}
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 'clamp(12px, 2vw, 28px)',
          alignItems: 'baseline',
          padding: '0.15rem 0.25rem',
          borderTop: '1px solid rgba(245,240,232,0.18)',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <div>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'clamp(0.62rem, 1vh, 0.72rem)',
              letterSpacing: '0.06em',
              color: 'rgba(245,240,232,0.45)',
              marginBottom: 4,
            }}
          >
            Upside
          </div>
          <div
            className="deck-body"
            style={{ fontSize: 'clamp(0.9rem, 1.4vh, 1.08rem)', color: CREAM, lineHeight: 1.35 }}
          >
            Pediatric label from incomplete evidence
          </div>
        </div>
        <div
          className="deck-mono"
          style={{
            fontSize: 'clamp(0.68rem, 1.05vh, 0.78rem)',
            color: CORAL,
            fontWeight: 700,
            letterSpacing: '0.06em',
          }}
        >
          STAKES
        </div>
        <div style={{ textAlign: 'right' }}>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'clamp(0.62rem, 1vh, 0.72rem)',
              letterSpacing: '0.06em',
              color: 'rgba(245,240,232,0.45)',
              marginBottom: 4,
            }}
          >
            Downside
          </div>
          <div
            className="deck-body"
            style={{ fontSize: 'clamp(0.9rem, 1.4vh, 1.08rem)', color: CREAM, lineHeight: 1.35 }}
          >
            Wrong dose in children · credibility loss
          </div>
        </div>
      </motion.div>
    </div>
  );
}
