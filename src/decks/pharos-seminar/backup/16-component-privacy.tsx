// @ts-nocheck
import React from 'react';
import { motion } from 'framer-motion';
import ComponentCard from '../components/ComponentCard';
import PhaseChip from '../components/PhaseChip';
import { Particles } from '@/components/magicui/particles';
import { useStory } from '../lib/useStory';
import { EASE } from '../motion';

/**
 * Slide 16 — Component 4 / 5 · Privacy Wall.
 *
 * Elevation pass (Apr 2026):
 *   - Particles atmospheric background suggests an active barrier field
 *   - SVG path morph for the wall band — subtle breathing pulse so the
 *     wall reads as alive, not static
 *   - Realistic PHI tokens: PT-NAME / DOB-1962 / MRN-1234 / LAB-AST
 *   - Sha-256 truncated hash references emerge on the LLM side
 *   - WITHOUT-WALL ✗ / WITH-WALL ✓ comparison strip at top frames the
 *     entire visual as a structural-vs-runtime argument
 *
 * Animation cadence is still time-driven via SEQ (start → tokens
 * → contrast → footer) but token emission stays on a setInterval so
 * the pipe never appears empty.
 *
 * Case color: cyan (links to P2 structural privacy).
 */

const BAND = {
  patient:  { x0:   0,  x1: 308 },
  wall:     { x0: 308,  x1: 660 },
  llm:      { x0: 660,  x1: 1100 },
};

// Realistic PHI tokens — what would actually appear in clinical data.
const PHI_LABELS = [
  'PT-NAME',
  'DOB-1962',
  'MRN-1234',
  'LAB-AST',
  'RX-A2',
  'BSA-1.83',
  'DX-GBM',
  'LAB-TGN',
];

// Truncated sha-256 references — the format Pharazi actually emits.
const HASH_LABELS = [
  '[ref:f8a29c41]',
  '[ref:71ba3ec2]',
  '[ref:0a44f5d1]',
  '[ref:5d2c91b7]',
  '[ref:3e0a7b82]',
  '[ref:9c1d2289]',
  '[ref:a44f00d3]',
  '[ref:b1c4e3f0]',
];

const LANE_YS = [148, 224, 300, 376];
const TOKEN_TRAVEL_MS = 4800;
const SPAWN_MS = 1100;

const SEQ = {
  start:    0.00,
  bands:    0.20,
  tokens:   0.80,    // first PHI token enters
  contrast: 1.40,    // top WITHOUT/WITH strip activates
  steady:   2.40,    // pipe in steady continuous flow
  final:    4.00,
};

const PHASE_LABEL: Record<keyof typeof SEQ, string> = {
  start:    'priming',
  bands:    'staging boundary',
  tokens:   'PHI in flight',
  contrast: 'wall holds',
  steady:   'opaque references only',
  final:    'idle · structurally clean',
};

export default function PrivacyWallComponent() {
  const story = useStory(SEQ, { loop: 9.0 });

  // Token emission stays on a separate interval so the pipe is dense.
  const [tokens, setTokens] = React.useState<Array<{ id: number; lane: number; phi: string; hash: string }>>([]);
  React.useEffect(() => {
    if (story.reduced) return;
    let next = 0;
    const spawn = () => {
      const id = next++;
      const lane = id % LANE_YS.length;
      setTokens((prev) => {
        const window = [...prev, {
          id,
          lane,
          phi: PHI_LABELS[id % PHI_LABELS.length],
          hash: HASH_LABELS[id % HASH_LABELS.length],
        }];
        return window.slice(-8);
      });
      // GC after travel completes
      setTimeout(() => {
        setTokens((prev) => prev.filter((t) => t.id !== id));
      }, TOKEN_TRAVEL_MS + 200);
    };

    spawn();
    const t1 = setTimeout(spawn, 380);
    const t2 = setTimeout(spawn, 760);
    const id = setInterval(spawn, SPAWN_MS);
    return () => {
      clearTimeout(t1); clearTimeout(t2);
      clearInterval(id);
    };
  }, [story.reduced]);

  return (
    <ComponentCard
      dataCase="cyan"
      componentNumber={4}
      domainEyebrow="PRIVACY"
      headline={
        <>
          Privacy{' '}
          <span className="italic" style={{ color: 'var(--case)' }}>Wall.</span>
        </>
      }
      subhead="PHI never reaches the model. Only opaque references cross."
      takeHomeText="Privacy is structural — a property of the code, not a runtime policy."
      activeId="privacy"
      footerSource="HIPAA §164.312 · GDPR Art. 32 · 21 CFR Part 11 — satisfied structurally"
    >
      <div className="relative w-full h-full flex flex-col" style={{ minHeight: 0 }}>
        <PhaseChip label={story.phase ? PHASE_LABEL[story.phase] : null} />

        {/* === Particles atmospheric background === */}
        {!story.reduced && (
          <div
            className="absolute inset-0"
            style={{
              borderRadius: 4,
              overflow: 'hidden',
              pointerEvents: 'none',
              opacity: 0.55,
            }}
          >
            <Particles
              className="absolute inset-0"
              quantity={70}
              ease={70}
              size={0.6}
              color="var(--case)"
              vx={0}
              vy={0}
            />
          </div>
        )}

        {/* === WITHOUT/WITH comparison strip (top) === */}
        <motion.div
          className="absolute"
          style={{
            top: 0,
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: 14,
            pointerEvents: 'none',
            zIndex: 5,
          }}
          initial={{ opacity: 0, y: -6 }}
          animate={{
            opacity: story.isAfter('contrast') ? 1 : 0,
            y: story.isAfter('contrast') ? 0 : -6,
          }}
          transition={{ duration: 0.45, ease: EASE.expoOut }}
        >
          <ContrastChip
            tone="bad"
            kicker="WITHOUT WALL"
            text="✗ context contains PHI"
          />
          <ContrastChip
            tone="good"
            kicker="WITH WALL"
            text="✓ refs only"
          />
        </motion.div>

        <svg
          viewBox="0 0 1100 540"
          preserveAspectRatio="xMidYMid meet"
          className="w-full h-full relative"
          role="img"
          aria-label="Patient PHI tokens flow toward a privacy wall, get absorbed, and emerge as opaque sha-256 references on the LLM side."
          style={{ minHeight: 0 }}
        >
          <defs>
            <pattern
              id="wall-hatch" patternUnits="userSpaceOnUse"
              width="14" height="14"
              patternTransform="rotate(45)"
            >
              <line x1="0" y1="0" x2="0" y2="14"
                stroke="var(--case)" strokeWidth="1" strokeOpacity="0.45" />
            </pattern>
            <linearGradient id="patient-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="var(--cream)" stopOpacity="0.04" />
              <stop offset="100%" stopColor="var(--cream)" stopOpacity="0.10" />
            </linearGradient>
            <linearGradient id="llm-fade" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="var(--case)" stopOpacity="0.10" />
              <stop offset="100%" stopColor="var(--case)" stopOpacity="0.02" />
            </linearGradient>
            <linearGradient id="wall-membrane" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"  stopColor="var(--case)" stopOpacity="0.18" />
              <stop offset="50%" stopColor="var(--case)" stopOpacity="0.42" />
              <stop offset="100%" stopColor="var(--case)" stopOpacity="0.18" />
            </linearGradient>
          </defs>

          {/* === band backgrounds === */}
          <motion.rect
            x={BAND.patient.x0} y={90}
            width={BAND.patient.x1 - BAND.patient.x0} height={360}
            fill="url(#patient-fade)"
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('bands') ? 1 : 0 }}
            transition={{ duration: 0.55 }}
          />
          {/* Wall: membrane gradient + breathing morph */}
          <motion.rect
            x={BAND.wall.x0} y={90}
            width={BAND.wall.x1 - BAND.wall.x0} height={360}
            fill="url(#wall-membrane)"
            initial={{ opacity: 0 }}
            animate={{
              opacity: story.isAfter('bands') ? 1 : 0,
            }}
            transition={{ duration: 0.55 }}
          />
          {/* Hatch overlay — animated translate */}
          <motion.rect
            x={BAND.wall.x0} y={90}
            width={BAND.wall.x1 - BAND.wall.x0} height={360}
            fill="url(#wall-hatch)"
            initial={{ x: BAND.wall.x0 }}
            animate={story.reduced ? undefined : { x: [BAND.wall.x0, BAND.wall.x0 - 28] }}
            transition={story.reduced ? undefined : { duration: 6, ease: 'linear', repeat: Infinity }}
          />
          {/* Wall edge "breathing" hairlines */}
          {!story.reduced && [0, 1].map((side) => {
            const x = side === 0 ? BAND.wall.x0 : BAND.wall.x1;
            return (
              <motion.line
                key={`edge-${side}`}
                x1={x} y1={90} x2={x} y2={450}
                stroke="var(--case)" strokeWidth="2"
                animate={{
                  opacity: [0.65, 1.0, 0.65],
                  strokeWidth: [1.6, 2.4, 1.6],
                }}
                transition={{
                  duration: 3.2,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: side * 1.6,
                }}
              />
            );
          })}
          <motion.rect
            x={BAND.llm.x0} y={90}
            width={BAND.llm.x1 - BAND.llm.x0} height={360}
            fill="url(#llm-fade)"
            initial={{ opacity: 0 }}
            animate={{ opacity: story.isAfter('bands') ? 1 : 0 }}
            transition={{ duration: 0.55 }}
          />

          {/* === band header labels === */}
          <BandHeader x={BAND.patient.x0 + 16} text="PATIENT · PHI" />
          <BandHeader x={BAND.wall.x0 + 16} text="PRIVACY · WALL" emphasis />
          <BandHeader x={BAND.llm.x0 + 16} text="LLM · CONTEXT" />

          {/* === tokens === */}
          {!story.reduced && tokens.map((t) => {
            const y = LANE_YS[t.lane];
            const startX = BAND.patient.x0 + 28;
            const wallEnter = BAND.wall.x0;
            const wallExit  = BAND.wall.x1;
            const endX = BAND.llm.x1 - 30;
            return (
              <motion.g key={`tok-${t.id}`}>
                {/* PHI token — visible only on patient side, absorbed at wall */}
                <motion.g
                  initial={{ x: startX, opacity: 0 }}
                  animate={{
                    x: [startX, wallEnter - 10, wallEnter + 4],
                    opacity: [0, 1, 1, 0],
                    scale: [1, 1, 1, 0.5],
                  }}
                  transition={{
                    duration: TOKEN_TRAVEL_MS / 1000 * 0.45,
                    ease: 'linear',
                    times: [0, 0.18, 0.92, 1],
                  }}
                >
                  <rect
                    x={0} y={y - 14} width={108} height={26} rx={4}
                    fill="color-mix(in srgb, var(--cream) 10%, transparent)"
                    stroke="var(--cream)" strokeOpacity="0.55" strokeWidth="0.8"
                  />
                  <text
                    x={54} y={y + 4} textAnchor="middle"
                    className="deck-mono uppercase"
                    style={{ fontSize: 11, fill: 'var(--cream)', letterSpacing: '0.10em' }}
                  >
                    {t.phi}
                  </text>
                </motion.g>

                {/* Spark at wall absorption — tiny burst */}
                <motion.circle
                  cx={wallEnter + 6} cy={y}
                  initial={{ r: 0, opacity: 0 }}
                  animate={{ r: [0, 16, 0], opacity: [0, 0.55, 0] }}
                  transition={{
                    duration: 0.55,
                    delay: TOKEN_TRAVEL_MS / 1000 * 0.40,
                    ease: 'easeOut',
                  }}
                  fill="var(--case)"
                />

                {/* Hash reference emerges on LLM side */}
                <motion.g
                  initial={{ x: wallExit - 10, opacity: 0 }}
                  animate={{
                    x: [wallExit - 10, wallExit + 30, endX],
                    opacity: [0, 1, 1, 0],
                  }}
                  transition={{
                    duration: TOKEN_TRAVEL_MS / 1000 * 0.55,
                    delay:    TOKEN_TRAVEL_MS / 1000 * 0.45,
                    ease: 'linear',
                    times: [0, 0.1, 0.9, 1],
                  }}
                >
                  <rect
                    x={0} y={y - 14} width={132} height={26} rx={4}
                    fill="color-mix(in srgb, var(--case) 22%, transparent)"
                    stroke="var(--case)" strokeOpacity="0.85" strokeWidth="0.8"
                  />
                  <text
                    x={66} y={y + 4} textAnchor="middle"
                    className="deck-mono"
                    style={{ fontSize: 10.5, fill: 'var(--case)', letterSpacing: '0.05em' }}
                  >
                    {t.hash}
                  </text>
                </motion.g>
              </motion.g>
            );
          })}

          {/* reduced-motion fallback */}
          {story.reduced && (
            <g>
              <rect
                x={BAND.patient.x0 + 30} y={LANE_YS[1] - 14}
                width={108} height={26} rx={4}
                fill="color-mix(in srgb, var(--cream) 10%, transparent)"
                stroke="var(--cream)" strokeOpacity="0.55" strokeWidth="0.8"
              />
              <text
                x={BAND.patient.x0 + 84} y={LANE_YS[1] + 4} textAnchor="middle"
                className="deck-mono uppercase"
                style={{ fontSize: 11, fill: 'var(--cream)', letterSpacing: '0.10em' }}
              >
                PT-NAME
              </text>
              <rect
                x={BAND.llm.x0 + 30} y={LANE_YS[1] - 14}
                width={132} height={26} rx={4}
                fill="color-mix(in srgb, var(--case) 22%, transparent)"
                stroke="var(--case)" strokeOpacity="0.85" strokeWidth="0.8"
              />
              <text
                x={BAND.llm.x0 + 96} y={LANE_YS[1] + 4} textAnchor="middle"
                className="deck-mono"
                style={{ fontSize: 10.5, fill: 'var(--case)', letterSpacing: '0.05em' }}
              >
                [ref:f8a29c41]
              </text>
            </g>
          )}

          {/* === footer evidence row === */}
          <motion.g
            initial={{ opacity: 0, y: 10 }}
            animate={{
              opacity: story.isAfter('contrast') ? 1 : 0,
              y: story.isAfter('contrast') ? 0 : 10,
            }}
            transition={{ duration: 0.5, ease: EASE.expoOut }}
          >
            <line
              x1={60} y1={476} x2={1040} y2={476}
              stroke="var(--cream)" strokeWidth="0.5" opacity="0.15"
            />
            <text
              x={60} y={502}
              className="deck-mono uppercase"
              style={{ fontSize: 10, fill: 'var(--case)', letterSpacing: '0.18em' }}
            >
              CROSSING TYPES
            </text>
            <text
              x={60} y={528}
              className="deck-mono"
              style={{ fontSize: 12, fill: 'var(--cream)', letterSpacing: '0.04em' }}
            >
              PHI: 0 · References: ∞ · Wall is compile-time, not runtime
            </text>
          </motion.g>
        </svg>
      </div>
    </ComponentCard>
  );
}

/* ────────── helpers ────────── */

function BandHeader({ x, text, emphasis = false }: { x: number; text: string; emphasis?: boolean }) {
  return (
    <text
      x={x} y={70}
      className="deck-mono uppercase"
      style={{
        fontSize: emphasis ? 11 : 10,
        fill: emphasis ? 'var(--case)' : 'var(--cream-muted)',
        letterSpacing: '0.18em',
        fontWeight: emphasis ? 600 : 500,
      }}
    >
      {text}
    </text>
  );
}

function ContrastChip({
  tone, kicker, text,
}: {
  tone: 'good' | 'bad';
  kicker: string;
  text: string;
}) {
  const color = tone === 'good' ? 'var(--case)' : 'var(--coral)';
  const bg = tone === 'good'
    ? 'color-mix(in srgb, var(--case) 14%, transparent)'
    : 'color-mix(in srgb, var(--coral) 14%, transparent)';
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '6px 14px',
        borderRadius: 999,
        background: bg,
        border: `1px solid ${color}`,
        color: 'var(--cream)',
        backdropFilter: 'blur(6px)',
        WebkitBackdropFilter: 'blur(6px)',
      }}
    >
      <span
        className="deck-mono uppercase"
        style={{
          fontSize: 9,
          letterSpacing: '0.20em',
          color,
          fontWeight: 700,
        }}
      >
        {kicker}
      </span>
      <span
        className="deck-mono"
        style={{
          fontSize: 11,
          letterSpacing: '0.04em',
          color: 'var(--cream)',
        }}
      >
        {text}
      </span>
    </div>
  );
}
