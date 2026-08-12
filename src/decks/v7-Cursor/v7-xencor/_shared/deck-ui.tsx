// @ts-nocheck
/**
 * CS1 visual kit — calm Swiss/editorial inside clinical tokens.
 * Responsive: fluid type, minmax grids, no fixed px columns that break.
 * Motion: staged reveal order (eyebrow→headline→sub→viz); 1 viz entrance.
 */
import { motion } from 'framer-motion';
import Lungs from '../components/Lungs';

export const EASE = [0.22, 0.68, 0.28, 1];

export const TYPE = {
  hero: 'clamp(2.75rem, min(5.5vw, 8vh), 4.25rem)',
  heroSm: 'clamp(2.15rem, min(4.2vw, 6.5vh), 3.25rem)',
  title: 'clamp(1.15rem, min(1.7vw, 2.6vh), 1.45rem)',
  body: 'clamp(1rem, min(1.35vw, 2.15vh), 1.2rem)',
  label: 'clamp(0.78rem, min(1.05vw, 1.55vh), 0.92rem)',
};

export const INK = {
  primary: 'var(--cream)',
  secondary: 'var(--cream-muted)',
  meta: 'var(--cream-faint)',
  accent: 'var(--case)',
  hairline: 'var(--cream-hairline)',
  panel: 'var(--panel)',
};

export const SPACE = {
  gap: 'clamp(1.1rem, 2.2vw, 1.75rem)',
  pad: 'clamp(1.2rem, 2.4vw, 1.75rem)',
  padLg: 'clamp(1.4rem, 2.8vw, 2rem)',
};

/** Staged delays matching DeckRunner eyebrow/headline cadence */
export const STAGE = {
  eyebrow: 0.1,
  headline: 0.2,
  subhead: 0.28,
  viz: 0.4,
  vizLate: 0.5,
};

export function fadeIn(reduced, delay = STAGE.viz, y = 8) {
  return {
    initial: reduced ? false : { opacity: 0, y },
    animate: { opacity: 1, y: 0 },
    transition: { duration: reduced ? 0 : 0.28, delay: reduced ? 0 : delay, ease: EASE },
  };
}

export function AmbientLungs({ variant = 'context', opacity = 0.12 }) {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        right: 'clamp(0.25rem, 2.5vw, 3rem)',
        top: '18%',
        bottom: '16%',
        width: 'min(28%, 22rem)',
        maxWidth: '40vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity,
        pointerEvents: 'none',
        zIndex: 0,
      }}
    >
      <Lungs layoutId="cs1-lung" variant={variant} widthOverride="100%" opacity={1} bodyOpacity={0.18} />
    </div>
  );
}

export function HeroNum({
  value,
  label,
  detail,
  delay = STAGE.viz,
  reduced,
  color = INK.accent,
  size = TYPE.hero,
}) {
  return (
    <motion.div {...fadeIn(reduced, delay, 10)} style={{ minWidth: 0 }}>
      <div
        className="deck-display"
        style={{
          fontSize: size,
          fontWeight: 700,
          lineHeight: 0.98,
          color,
          fontVariantNumeric: 'tabular-nums',
          letterSpacing: '-0.025em',
        }}
      >
        {value}
      </div>
      {label && (
        <div
          className="deck-body"
          style={{
            marginTop: 'var(--space-3)',
            fontSize: TYPE.label,
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: INK.secondary,
            fontWeight: 700,
          }}
        >
          {label}
        </div>
      )}
      {detail && (
        <div
          className="deck-body"
          style={{
            marginTop: 'var(--space-2)',
            fontSize: TYPE.body,
            color: INK.secondary,
            lineHeight: 1.55,
            maxWidth: '36ch',
          }}
        >
          {detail}
        </div>
      )}
    </motion.div>
  );
}

export function AccentRule({ delay = STAGE.viz, reduced, width = '2.25rem', color = INK.accent }) {
  return (
    <motion.div
      aria-hidden
      initial={reduced ? false : { scaleX: 0, opacity: 0 }}
      animate={{ scaleX: 1, opacity: 1 }}
      transition={{ duration: reduced ? 0 : 0.26, delay: reduced ? 0 : delay, ease: EASE }}
      style={{
        width,
        height: 2,
        background: color,
        transformOrigin: 'left center',
        borderRadius: 1,
        marginBottom: 'var(--space-2)',
        flexShrink: 0,
      }}
    />
  );
}

export function Surface({ children, delay = STAGE.viz, reduced, accent, style = {} }) {
  return (
    <motion.div
      {...fadeIn(reduced, delay, 8)}
      style={{
        position: 'relative',
        border: `1px solid ${INK.hairline}`,
        borderTop: accent ? `2px solid ${accent}` : `1px solid ${INK.hairline}`,
        borderRadius: 'var(--radius-md)',
        background: INK.panel,
        padding: SPACE.pad,
        minWidth: 0,
        minHeight: 0,
        ...style,
      }}
    >
      {children}
    </motion.div>
  );
}

export function Kicker({ children, color = INK.accent }) {
  return (
    <div
      className="deck-mono uppercase"
      style={{
        fontSize: TYPE.label,
        letterSpacing: 'var(--ls-mono-wide)',
        color,
        fontWeight: 700,
        marginBottom: 'var(--space-2)',
      }}
    >
      {children}
    </div>
  );
}

/** Two-column that stacks under ~900px via CSS grid auto-fit */
export function Split({ children, min = '16rem', gap = SPACE.gap, style = {} }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${min}), 1fr))`,
        gap,
        width: '100%',
        height: '100%',
        minHeight: 0,
        alignItems: 'stretch',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function ExposureBand({ reduced, delay = STAGE.viz, pediatricPct = 48 }) {
  return (
    <motion.div
      {...fadeIn(reduced, delay, 0)}
      style={{ width: '100%', minWidth: 0 }}
      role="img"
      aria-label="Pediatric AUCss lands inside the adult therapeutic band"
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: TYPE.label,
          letterSpacing: 'var(--ls-mono-wide)',
          color: INK.secondary,
          fontWeight: 700,
          marginBottom: 'var(--space-3)',
        }}
      >
        Adult AUCss therapeutic band
      </div>
      <div
        style={{
          position: 'relative',
          height: 'clamp(2.5rem, 5.5vh, 3.5rem)',
          borderRadius: 'var(--radius-md)',
          background:
            'linear-gradient(90deg, color-mix(in srgb, var(--cream) 5%, transparent) 0%, color-mix(in srgb, var(--case) 22%, var(--panel)) 20%, color-mix(in srgb, var(--case) 22%, var(--panel)) 80%, color-mix(in srgb, var(--cream) 5%, transparent) 100%)',
          border: '1px solid color-mix(in srgb, var(--case) 30%, transparent)',
        }}
      >
        <div
          style={{
            position: 'absolute',
            left: `${pediatricPct}%`,
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 12,
            height: 12,
            borderRadius: '50%',
            background: INK.primary,
            border: '2px solid var(--case)',
            boxShadow: '0 0 0 4px color-mix(in srgb, var(--case) 18%, transparent)',
            zIndex: 2,
          }}
        />
        <div
          className="deck-mono"
          style={{
            position: 'absolute',
            left: `${pediatricPct}%`,
            bottom: 'calc(100% + 0.3rem)',
            transform: 'translateX(-50%)',
            fontSize: TYPE.label,
            color: INK.accent,
            fontWeight: 700,
            whiteSpace: 'nowrap',
          }}
        >
          Pediatric · −3%
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'var(--space-2)', gap: '0.5rem' }}>
        {['Below', 'Target', 'Above'].map((t) => (
          <span
            key={t}
            className="deck-mono"
            style={{ fontSize: TYPE.label, color: t === 'Target' ? INK.secondary : INK.meta, fontWeight: t === 'Target' ? 700 : 500 }}
          >
            {t}
          </span>
        ))}
      </div>
    </motion.div>
  );
}
