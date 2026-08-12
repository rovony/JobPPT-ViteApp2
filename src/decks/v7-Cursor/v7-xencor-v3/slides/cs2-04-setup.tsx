// @ts-nocheck
import React, { useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';
import CaseOrientationStrip from '../_shared/CaseOrientationStrip';

/**
 * CS3 · Setup — the SEC challenge (Dec 2024).
 *
 * Full 9.3s entry sequence:
 *   0.0–0.8s  chrome (SlideFrame)
 *   1.1s      Timeline baseline draws L→R (gray 600ms, cyan trails 100ms behind)
 *   1.7s      First 3 ticks fade in muted (300ms)
 *   2.0s      SEC tick lands with overshoot + ambient pulsing ring (3s infinite)
 *   2.3s      "this slide ↓" caption
 *   2.7s      Quote card scale 0.94→1.0 + cyan rule draws
 *   3.1s      Top attribution
 *   3.4s      Quote text word-by-word (120ms/word, dramatic)
 *   5.3s      Hold 1.5s silence
 *   6.8s      Bottom attribution
 *   7.0s      ASKED cascade (120ms stagger)
 *   7.8s      ALREADY IN HAND cascade (120ms stagger)
 *   8.6s      Amber band slide-up
 *   9.1s      Source footer
 *
 * The 1.5s silence after the quote is the most important second of the case.
 */

const EASE = [0.2, 0.7, 0.3, 1];
const EASE_OVER = [0.34, 1.56, 0.64, 1];

const D = {
  timelineDraw: 1.10,
  ticks123: 1.70,
  tickSec: 2.00,
  tickCaption: 2.30,
  quoteCard: 2.70,
  quoteAttrTop: 3.10,
  quoteTextBase: 3.40,
  quoteWordGap: 0.12,
  quoteAttrBottom: 6.80,
  asked: 7.00,
  askedStagger: 0.12,
  inHand: 7.80,
  inHandStagger: 0.12,
  amber: 8.60,
};

const QUOTE_WORDS_L1 = ['"Conduct', 'a', 'PK/PD', 'study'];
const QUOTE_WORDS_L2_BEFORE = ['in'];
const QUOTE_WORDS_L2_CYAN = ['Indian', 'population'];
const QUOTE_WORDS_L2_AFTER = ['."'];

const ASKED_ITEMS = [
  'Local PK/PD study in Indian population',
  'Pre-approval PK/PD dataset',
  '~12–18 mo enrollment delay for cohort',
];

const IN_HAND_ITEMS = [
  { text: 'PopPK n=253 · race n.s.', cite: '— Jiang et al., CTS 2021', pmcUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8212730/' },
  { text: 'PBPK-supported DDI label · midazolam AUC ratio 0.18', cite: '— Bolleddula et al., CPT:PSP 2021', pmcUrl: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC8213421/' },
  { text: 'Flat exposure-response across studied range', cite: null, pmcUrl: null },
];

export default function CS2Setup() {
  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="Case 03 · Setup + challenge"
      headline={
        <>
          December 2024 — the SEC asked for{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 500 }}>
            local PK/PD
          </span>
          .
        </>
      }
      headlineMaxChars={52}
      subhead={
        <>
          <strong style={{ fontWeight: 600 }}>Ivosidenib</strong> (Tibsovo) · IDH1-mutant AML &amp; cholangiocarcinoma — approved in{' '}
          <strong style={{ fontWeight: 600 }}>42+ countries</strong>, blocked in India until a reliance dossier could answer the local-data question.
        </>
      }
      subheadMaxChars={130}
      subheadSize="lead"
      footerKicker="Case 03 · Setup + challenge"
      footerSource="CDSCO SEC public minutes · Dec 2024"
    >
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(10px, 1.6vh, 20px)',
          minHeight: 0,
        }}
      >
        <CaseOrientationStrip
          accent="var(--cyan)"
          delay={0.9}
          items={[
            {
              kicker: 'Global status',
              body: <>Marketing authorization in 42+ reference countries · years of post-approval safety</>,
            },
            {
              kicker: 'India gap',
              body: <>No pre-approval local trial · SEC requested Indian PK/PD before registration</>,
            },
            {
              kicker: 'Clin pharm move',
              body: <>Prove the <strong style={{ fontWeight: 600 }}>global dossier</strong> answers the local-data question</>,
            },
          ]}
        />
        <TimelineSVG />
        <QuoteCard />
        <AsymmetryPanel />
        <AmberBand />
      </div>
    </SlideFrame>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BAND 1 — Lead-up timeline with draw + cascade
   ══════════════════════════════════════════════════════════════════ */

function TimelineSVG() {
  const reduced = useReducedMotion();
  return (
    <div style={{ flexShrink: 0 }}>
      <svg
        viewBox="0 0 1180 82"
        width="100%"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label="Regulatory timeline: Rule 101 order then SEC PK/PD opinion"
      >
        {/* Baseline — gray draws first, cyan trails */}
        <motion.line
          x1="80" y1="44" x2="1140" y2="44"
          stroke="var(--cream-faint)" strokeWidth="1"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: EASE, delay: D.timelineDraw }}
        />
        <motion.line
          x1="80" y1="44" x2="1100" y2="44"
          stroke="var(--cyan)" strokeWidth="1" strokeOpacity="0.35"
          initial={reduced ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.7, ease: EASE, delay: D.timelineDraw + 0.1 }}
        />

        {/* Rule 101 — chronology anchor before SEC */}
        <TimelineTick cx={400} date="AUG 2024" label="Rule 101 order · waiver categories"
          delay={D.ticks123} reduced={reduced} accent />

        {/* SEC opinion — pulsing endpoint */}
        <motion.circle
          cx="1100" cy="44" r="7" fill="var(--cyan)"
          initial={reduced ? false : { scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, ease: EASE_OVER, delay: D.tickSec }}
          style={{ transformOrigin: '1100px 44px' }}
        />
        {/* Ambient pulsing ring — 3s infinite loop */}
        <motion.circle
          cx="1100" cy="44" r="11" fill="none"
          stroke="var(--cyan)" strokeWidth="1"
          initial={reduced ? { opacity: 0.4 } : { opacity: 0, scale: 1 }}
          animate={reduced
            ? { opacity: 0.4 }
            : { opacity: [0, 0.4, 0], scale: [1, 1.5, 1.8] }}
          transition={reduced
            ? {}
            : { duration: 3, delay: D.tickSec + 0.1, repeat: Infinity, ease: 'linear' }}
          style={{ transformOrigin: '1100px 44px' }}
        />

        <motion.text
          x="1100" y="20" textAnchor="middle" fontFamily="var(--font-mono)"
          fontSize="11" fill="var(--cyan)" letterSpacing="1.4" fontWeight="600"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: EASE, delay: D.tickSec }}
        >
          DEC 2024
        </motion.text>

        <motion.text
          x="1100" y="66" textAnchor="middle" fontFamily="'Fraunces', Georgia, serif"
          fontSize="12" fill="var(--cyan)" fontStyle="italic" fontWeight="500"
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: EASE, delay: D.tickCaption }}
        >
          SEC opinion · this slide ↓
        </motion.text>
      </svg>
    </div>
  );
}

function TimelineTick({ cx, date, label, delay, reduced, accent = false }) {
  const fill = accent ? 'var(--cyan)' : 'var(--bg)';
  const stroke = accent ? 'var(--cyan)' : 'var(--cream-faint)';
  const dateFill = accent ? 'var(--cyan)' : 'var(--cream-faint)';
  const labelFill = accent ? 'var(--cream)' : 'var(--cream-muted)';
  return (
    <motion.g
      initial={reduced ? false : { opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3, ease: EASE, delay }}
    >
      <circle cx={cx} cy="44" r="5" fill={fill} stroke={stroke} strokeWidth="1.5" />
      <text x={cx} y="22" textAnchor="middle" fontFamily="var(--font-mono)"
        fontSize="11" fill={dateFill} letterSpacing="1.4">{date}</text>
      <text x={cx} y="66" textAnchor="middle" fontFamily="'Fraunces', Georgia, serif"
        fontSize="13" fill={labelFill} fontStyle="italic">{label}</text>
    </motion.g>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BAND 2 — Quote card with word-by-word reveal
   ══════════════════════════════════════════════════════════════════ */

function QuoteCard() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);

  let wordIndex = 0;
  const wordDelay = (idx) => D.quoteTextBase + idx * D.quoteWordGap;

  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, ease: EASE, delay: D.quoteCard }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        flex: '1 1 0%',
        minHeight: 0,
        display: 'flex',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
        overflow: 'hidden',
        transform: hovered ? 'translateY(-2px)' : 'translateY(0)',
        boxShadow: hovered
          ? '0 8px 32px rgba(0,0,0,0.3)'
          : '0 2px 8px rgba(0,0,0,0.1)',
        transition: 'transform 0.2s, box-shadow 0.2s',
      }}
    >
      {/* Cyan quote-rule bar — draws downward */}
      <motion.div
        initial={reduced ? false : { scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.6, ease: EASE, delay: D.quoteCard }}
        style={{
          width: 5,
          flexShrink: 0,
          background: 'var(--cyan)',
          transformOrigin: 'top',
        }}
      />

      <div
        style={{
          flex: 1,
          padding: 'clamp(16px, 2.5vh, 36px) clamp(20px, 2.5vw, 40px)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: 'clamp(8px, 1.2vh, 16px)',
        }}
      >
        {/* Top attribution */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, ease: EASE, delay: D.quoteAttrTop }}
        >
          <div
            className="deck-mono uppercase xc-slide-subhead xc-cyan" style={{
              letterSpacing: 'var(--ls-mono-wide)',
              fontWeight: 700 }}
          >
            CDSCO · Subject Expert Committee for Oncology
          </div>
          <div
            className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={{
              marginTop: 'var(--space-1)',
              letterSpacing: '0.14em'}}
          >
            December 2024 · Meeting Minutes (Public Record)
          </div>
        </motion.div>

        {/* Quote text — word-by-word reveal */}
        <div
          className="deck-display xc-h1 xc-ink" style={{
            margin: 0,
            lineHeight: 1.15,
            letterSpacing: '-0.012em',
            fontWeight: 400,
            fontStyle: 'italic' }}
        >
          {/* Line 1 */}
          <span>
            {QUOTE_WORDS_L1.map((w) => {
              const idx = wordIndex++;
              return (
                <motion.span
                  key={idx}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: EASE, delay: wordDelay(idx) }}
                >
                  {w}{' '}
                </motion.span>
              );
            })}
          </span>
          <br />
          {/* Line 2 */}
          <span>
            {QUOTE_WORDS_L2_BEFORE.map((w) => {
              const idx = wordIndex++;
              return (
                <motion.span
                  key={idx}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: EASE, delay: wordDelay(idx) }}
                >
                  {w}{' '}
                </motion.span>
              );
            })}
            {QUOTE_WORDS_L2_CYAN.map((w) => {
              const idx = wordIndex++;
              return (
                <motion.span
                  key={idx}
                  style={{ color: 'var(--cyan)', fontWeight: 500 }}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: EASE, delay: wordDelay(idx) }}
                >
                  {w}{' '}
                </motion.span>
              );
            })}
            {QUOTE_WORDS_L2_AFTER.map((w) => {
              const idx = wordIndex++;
              return (
                <motion.span
                  key={idx}
                  initial={reduced ? false : { opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.15, ease: EASE, delay: wordDelay(idx) }}
                >
                  {w}
                </motion.span>
              );
            })}
          </span>
        </div>

        {/* Bottom attribution */}
        <motion.div
          initial={reduced ? false : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2, ease: EASE, delay: D.quoteAttrBottom }}
          style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}
        >
          <span
            className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={{
              letterSpacing: '0.14em',
              fontWeight: 600 }}
          >
            Verbatim · Committee opinion
          </span>
          <span
            className="deck-mono uppercase xc-slide-eyebrow xc-muted" style={{
              letterSpacing: '0.14em',
              fontWeight: 600 }}
          >
            ~9 mo post-filing
          </span>
        </motion.div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════════════════════════
   BAND 3 — ASKED vs ALREADY IN HAND with L→R cascade
   ══════════════════════════════════════════════════════════════════ */

function AsymmetryPanel() {
  const reduced = useReducedMotion();
  /* Restructured 2026-04-26 per user feedback: was loose 2-col flex with
   * dot bullets; now two contained panel cards (asked = dashed muted /
   * in-hand = cyan tinted) with proper kicker + bigger body text per
   * the v2 deck's case-build pattern. */
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--space-4)',
      }}
    >
      {/* LEFT — Asked (muted panel card, dashed border, cascades first) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: -8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: D.asked }}
        style={{
          border: `1px dashed var(--cream-faint)`,
          background: 'color-mix(in srgb, var(--panel) 50%, transparent)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div className="deck-mono uppercase xc-slide-subhead xc-muted" style={{
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700 }}>
          Asked · what SEC requested
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {ASKED_ITEMS.map((item, i) => (
            <motion.div
              key={item}
              initial={reduced ? false : { opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: EASE, delay: D.asked + 0.2 + i * D.askedStagger }}
              style={{
                display: 'flex', alignItems: 'baseline',
                gap: 'var(--space-3)',
                paddingLeft: 'var(--space-2)',
                borderLeft: `2px solid var(--cream-faint)`,
              }}
            >
              <span className="xc-slide-subhead xc-muted">
                {item}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* RIGHT — Already in hand (cyan panel card, cascades after) */}
      <motion.div
        initial={reduced ? false : { opacity: 0, x: 8 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4, ease: EASE, delay: D.inHand }}
        style={{
          border: `1px solid color-mix(in srgb, var(--cyan) 28%, transparent)`,
          background: 'color-mix(in srgb, var(--cyan) 8%, transparent)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--space-3) var(--space-4)',
          display: 'flex', flexDirection: 'column',
          gap: 'var(--space-2)',
        }}
      >
        <div className="deck-mono uppercase xc-slide-subhead xc-cyan" style={{
          letterSpacing: 'var(--ls-mono-wide)',
          fontWeight: 700 }}>
          Already in hand · global Clin Pharm record
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {IN_HAND_ITEMS.map((item, i) => (
            <motion.div
              key={item.text}
              initial={reduced ? false : { opacity: 0, x: 8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2, ease: EASE, delay: D.inHand + 0.2 + i * D.inHandStagger }}
              style={{
                display: 'flex', alignItems: 'baseline',
                gap: 'var(--space-3)',
                paddingLeft: 'var(--space-2)',
                borderLeft: `2px solid var(--cyan)`,
              }}
            >
              <span className="xc-slide-subhead xc-ink">
                {item.text}
                {item.cite && (
                  <CitationLink cite={item.cite} href={item.pmcUrl} />
                )}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

function CitationLink({ cite, href }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      className="deck-display xc-tagline xc-muted"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={href ? () => window.open(href, '_blank', 'noopener') : undefined}
      style={{
        fontStyle: 'italic',
        cursor: href ? 'pointer' : 'default',
        textDecoration: hovered ? 'underline' : 'none',
        transition: 'text-decoration 0.15s',
      }}
    >
      {' '}{cite}
    </span>
  );
}

/* ══════════════════════════════════════════════════════════════════
   AMBER BAND — decision fork
   ══════════════════════════════════════════════════════════════════ */

function AmberBand() {
  const reduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  return (
    <motion.div
      initial={reduced ? false : { opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: EASE, delay: D.amber }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        background: hovered
          ? 'color-mix(in srgb, var(--amber) 18%, transparent)'
          : 'color-mix(in srgb, var(--amber) 12%, transparent)',
        borderTop: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
        borderBottom: '1px solid color-mix(in srgb, var(--amber) 42%, transparent)',
        padding: 'clamp(10px, 1.5vh, 18px) clamp(14px, 2vw, 28px)',
        flexShrink: 0,
        transition: 'background 0.2s',
      }}
    >
      <p
        className="deck-display xc-tagline xc-ink" style={{
          margin: 0,
          fontStyle: 'italic',
          lineHeight: 1.4,
          textAlign: 'center' }}
      >
        <span aria-hidden style={{
          display: 'inline-block',
          transform: 'rotate(45deg)',
          width: 12, height: 12,
          background: 'var(--amber)',
          marginRight: 10,
          verticalAlign: 'middle',
        }} />
        The decision:{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 500 }}>generate new data</span>
        {' '}— or build the case from the{' '}
        <span style={{ color: 'var(--amber)', fontWeight: 500 }}>global Clin Pharm record</span>
        .
      </p>
    </motion.div>
  );
}
