/**
 * NotebookLM / Xencor-Deck pivot language — React, not PNG.
 * variant hero  — EFFICACY struck · EXPOSURE (bracket optional — use Subhead when false)
 * variant full  — + core premise box
 */
import type { CSSProperties } from 'react';

const GRID = {
  backgroundImage:
    'linear-gradient(color-mix(in srgb, var(--cream-hairline) 65%, transparent) 1px, transparent 1px), linear-gradient(90deg, color-mix(in srgb, var(--cream-hairline) 65%, transparent) 1px, transparent 1px)',
  backgroundSize: '22px 22px',
  backgroundColor: 'var(--panel)',
};

export const EXPOSURE_BLUE = '#1E5BB8';
const STRIKE = 'var(--amber)';

type Props = {
  variant?: 'hero' | 'full';
  /** When false, omit bracket line — put it in SlideParts Subhead instead. */
  showBracket?: boolean;
  compact?: boolean;
  style?: CSSProperties;
};

export default function EfficacyExposurePlate({
  variant = 'full',
  showBracket = true,
  compact = false,
  style,
}: Props) {
  const hero = variant === 'hero';

  return (
    <div
      style={{
        ...GRID,
        height: '100%',
        minHeight: 0,
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        padding: compact
          ? 'clamp(0.7rem, 1.5vh, 1rem) clamp(0.8rem, 1.4vw, 1.1rem)'
          : 'clamp(1rem, 2.2vh, 1.55rem) clamp(1.1rem, 2vw, 1.6rem)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: compact ? 'clamp(0.55rem, 1.3vh, 0.9rem)' : 'clamp(0.85rem, 2vh, 1.35rem)',
        textAlign: 'center',
        overflow: 'hidden',
        ...style,
      }}
    >
      <div style={{ position: 'relative', lineHeight: 0.88, width: '100%' }}>
        <div
          className="deck-display"
          style={{
            position: 'relative',
            display: 'inline-block',
            fontSize: hero
              ? 'clamp(2.8rem, min(6.2vw, 10vh), 4.8rem)'
              : compact
                ? 'clamp(1.55rem, min(3.2vw, 5.2vh), 2.35rem)'
                : 'clamp(2.1rem, min(4.6vw, 7.2vh), 3.6rem)',
            fontWeight: 800,
            color: 'var(--cream-faint)',
            textTransform: 'uppercase',
            letterSpacing: '-0.03em',
          }}
        >
          Efficacy
          <span
            aria-hidden
            style={{
              position: 'absolute',
              left: '-6%',
              right: '-6%',
              top: '48%',
              height: hero ? 14 : compact ? 7 : 10,
              background: STRIKE,
              transform: 'rotate(-11deg)',
              borderRadius: 2,
              pointerEvents: 'none',
            }}
          />
        </div>
        <div
          className="deck-display"
          style={{
            fontSize: hero
              ? 'clamp(3.4rem, min(7.4vw, 12.5vh), 6rem)'
              : compact
                ? 'clamp(1.85rem, min(3.8vw, 6.2vh), 2.85rem)'
                : 'clamp(2.55rem, min(5.6vw, 8.8vh), 4.4rem)',
            fontWeight: 800,
            color: EXPOSURE_BLUE,
            textTransform: 'uppercase',
            letterSpacing: '-0.035em',
            marginTop: 6,
          }}
        >
          Exposure
        </div>
      </div>

      {showBracket && (
        <div
          style={{
            display: 'flex',
            alignItems: 'stretch',
            gap: '0.7rem',
            maxWidth: hero ? '42rem' : '36rem',
            width: '100%',
            justifyContent: 'center',
          }}
        >
          <SquareBracket />
          <p
            className="deck-display"
            style={{
              margin: 0,
              flex: 1,
              fontSize: hero
                ? 'clamp(1.15rem, min(1.7vw, 2.7vh), 1.4rem)'
                : compact
                  ? 'clamp(0.95rem, min(1.35vw, 2.1vh), 1.12rem)'
                  : 'clamp(1.05rem, min(1.55vw, 2.45vh), 1.3rem)',
              fontWeight: 600,
              color: 'var(--cream)',
              lineHeight: 1.35,
              textAlign: 'center',
              alignSelf: 'center',
            }}
          >
            Stop asking the efficacy question. Start asking an exposure question.
          </p>
          <SquareBracket side="right" />
        </div>
      )}

      {!hero && (
        <div
          style={{
            width: '100%',
            maxWidth: '40rem',
            padding: compact ? '0.65rem 0.85rem' : '0.85rem 1.15rem',
            border: `1.5px solid ${STRIKE}`,
            borderRadius: 'var(--radius-sm)',
            background: 'var(--bg)',
            textAlign: 'left',
          }}
        >
          <div
            className="deck-body"
            style={{
              fontSize: compact ? '0.95rem' : 'clamp(0.95rem, 1.25vw, 1.1rem)',
              color: 'var(--cream)',
              lineHeight: 1.45,
              fontWeight: 500,
            }}
          >
            <strong style={{ fontWeight: 800 }}>Core premise:</strong> Disease similarity allows
            matching the adult therapeutic exposure range to answer the dose.
          </div>
        </div>
      )}
    </div>
  );
}

function SquareBracket({ side = 'left' }: { side?: 'left' | 'right' }) {
  const vertical = side === 'left' ? 'borderLeft' : 'borderRight';
  return (
    <span
      aria-hidden
      style={{
        width: 14,
        flexShrink: 0,
        alignSelf: 'stretch',
        minHeight: '2.4em',
        [vertical]: `3px solid ${EXPOSURE_BLUE}`,
        borderTop: `3px solid ${EXPOSURE_BLUE}`,
        borderBottom: `3px solid ${EXPOSURE_BLUE}`,
      }}
    />
  );
}
