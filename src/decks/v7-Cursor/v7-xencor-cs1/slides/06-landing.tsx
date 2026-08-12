// @ts-nocheck
import { motion, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import { AccentRule, Split, fadeIn, INK, TYPE, SPACE, STAGE } from '../_shared/cs1-ui';

const MOVES = [
  { who: 'Clinical', move: 'Stopped treating “no powered efficacy” as a dead end' },
  { who: 'Regulatory', move: 'Accepted exposure matching as primary dose language' },
  { who: 'Quantitative', move: 'Owned kill criteria and named uncertainty' },
];

const AGENCIES = [
  { name: 'EMA', status: 'Accepted', win: true },
  { name: 'PMDA', status: 'Accepted', win: true },
  { name: 'FDA', status: 'Gap remains', win: false },
];

/** Beats 7–8 — influence + outcome (story-flow spine #6) */
export default function Cs1Landing() {
  const reduced = useReducedMotion();
  return (
    <SlideGrid dataCase="coral" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow delay={STAGE.eyebrow}>Case 01 · Influence + outcome</Eyebrow>
      <Headline delay={STAGE.headline} maxChars={64}>
        Alignment converted the bridge into{' '}
        <span style={{ color: INK.accent, fontStyle: 'italic', fontWeight: 500 }}>an agency-ready recommendation.</span>
      </Headline>
      <Subhead delay={STAGE.subhead}>EMA + PMDA accepted. FDA remains an honest gap — not rewritten.</Subhead>
      <Viz>
        <div style={{ display: 'grid', gridTemplateRows: 'minmax(0, 1.1fr) auto', gap: SPACE.gap, height: '100%', minHeight: 0 }}>
          <motion.div {...fadeIn(reduced, STAGE.viz, 6)} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', minHeight: 0 }}>
            {MOVES.map((m, i) => (
              <div
                key={m.who}
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'minmax(6.5rem, 9rem) minmax(0, 1fr)',
                  gap: SPACE.gap,
                  alignItems: 'center',
                  padding: 'clamp(0.65rem, 1.4vh, 1rem) 0',
                  borderBottom: i < MOVES.length - 1 ? `1px solid ${INK.hairline}` : 'none',
                }}
              >
                <div className="deck-mono uppercase" style={{ fontSize: TYPE.label, color: INK.accent, letterSpacing: 'var(--ls-mono-wide)', fontWeight: 700 }}>
                  {m.who}
                </div>
                <div className="deck-body" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 500, lineHeight: 1.4 }}>
                  {m.move}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            {...fadeIn(reduced, STAGE.vizLate, 4)}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 8rem), 1fr))',
              gap: 'var(--space-2)',
            }}
          >
            {AGENCIES.map((a) => (
              <div
                key={a.name}
                style={{
                  padding: SPACE.pad,
                  borderRadius: 'var(--radius-md)',
                  border: `1px solid ${a.win ? 'color-mix(in srgb, var(--sage) 35%, transparent)' : 'color-mix(in srgb, var(--amber) 40%, transparent)'}`,
                  background: a.win ? 'color-mix(in srgb, var(--sage) 7%, var(--panel))' : 'color-mix(in srgb, var(--amber) 7%, var(--panel))',
                  minWidth: 0,
                }}
              >
                <AccentRule reduced delay={0} color={a.win ? 'var(--sage)' : 'var(--amber)'} />
                <div className="deck-display" style={{ fontSize: TYPE.title, color: INK.primary, fontWeight: 700 }}>
                  {a.name}
                </div>
                <div
                  className="deck-mono uppercase"
                  style={{
                    marginTop: 4,
                    fontSize: TYPE.label,
                    letterSpacing: 'var(--ls-mono-wide)',
                    color: a.win ? 'var(--sage)' : 'var(--amber)',
                    fontWeight: 700,
                  }}
                >
                  {a.status}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </Viz>
      <Footer kicker="Landing" tagline="Influence is who changed their next action · outcome is who said yes" source="Beats 7–8" />
    </SlideGrid>
  );
}
