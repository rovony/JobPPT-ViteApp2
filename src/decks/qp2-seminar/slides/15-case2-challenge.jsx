import React from 'react';
import { motion } from 'framer-motion';
import { useTokens } from '@/lib/token';
import SlideFrame from '@/components/deck/SlideFrame';

/**
 * Slide 15 · CS2 Challenge — India required local data.
 * Migrated to SlideFrame. Two-row viz:
 *   row 1: two info cards (global approved · India ask)
 *   row 2: three icon-stat cards
 * Closing question renders in the footer tagline.
 */

const TIMELINE_MARKS = [
  { x: 60,  tag: 'FDA',  yr: '2018' },
  { x: 220, tag: 'EMA',  yr: '2023' },
  { x: 380, tag: 'PMDA', yr: '2024' },
  { x: 540, tag: '+39',  yr: '2018–25' },
];

export default function Slide15CS2Challenge() {
  const D = {
    colLeft: 0.70, colRight: 0.95,
    tlSpine: 1.20, tlMarkers: 1.60, tlLabels: 1.90,
    venn: 1.30, vennList: 1.90,
    stats: 2.30,
    question: 3.00,
  };

  const T = useTokens(['--cyan', '--cream', '--cream-muted', '--cream-faint', '--cream-hairline']);
  const tk = (n, fb = 'transparent') => (T ? T[n] || fb : fb);

  return (
    <SlideFrame
      dataCase="cyan"
      eyebrowColor="var(--cyan)"
      eyebrow="CS2 Challenge — India CDSCO"
      headline={
        <>
          Approved in 42+ countries —{' '}
          <span style={{ color: 'var(--cyan)', fontStyle: 'italic', fontWeight: 700 }}>
            India required local data before approval.
          </span>
        </>
      }
      headlineMaxChars={32}
      subhead="Efficacy. Safety. Pharmacokinetics. In Indian patients. Before the approval decision."
      subheadMaxChars={80}
      footerKicker="Case 02 · The challenge"
      footerTagline="Source · CS2 Reading Pt. 1 · CDSCO waiver framework · ICH E5(R1)"
    >
      {/* Three-row viz: two cards · stats · closing question */}
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'grid',
          gridTemplateRows: '1.6fr 1fr auto',
          rowGap: 'var(--space-6)',
          minHeight: 0,
        }}
      >
        {/* Row 1 — two cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            columnGap: 'var(--space-6)',
            minHeight: 0,
          }}
        >
          <GlobalApprovedCard tk={tk} delayCard={D.colLeft} delayMarkers={D.tlMarkers} delaySpine={D.tlSpine} delayLabels={D.tlLabels} />
          <IndiaAskCard tk={tk} delayCard={D.colRight} delayVenn={D.venn} delayList={D.vennList} />
        </div>

        {/* Row 2 — three stat cards */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            columnGap: 'var(--space-5)',
            minHeight: 0,
          }}
        >
          <StatCard
            delay={D.stats}
            icon={<IconRings />}
            label="Three data domains"
            big="Required pre-approval"
            detail="Efficacy · safety · pharmacokinetics — all in Indian patients."
          />
          <StatCard
            delay={D.stats + 0.15}
            icon={<IconHourglass />}
            label="Multi-month delay"
            big="To Indian patient access"
            detail="Rare oncology · median survival under one year."
          />
          <StatCard
            delay={D.stats + 0.30}
            icon={<IconCoinStack />}
            label="Material cost"
            big="Dedicated local study"
            detail="Clinical operations · CMC · regulatory · pharmacovigilance."
          />
        </div>

        {/* Closing question ribbon */}
        <motion.div
          style={{
            paddingTop: 'var(--space-3)',
            paddingLeft: 'var(--space-6)',
            borderTop: '2px solid var(--cyan)',
            position: 'relative',
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1], delay: D.question }}
        >
          <motion.span
            style={{
              position: 'absolute',
              left: 0,
              top: 18,
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: 'var(--cyan)',
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              boxShadow: [
                `0 0 0 6px color-mix(in srgb, var(--cyan) 14%, transparent)`,
                `0 0 0 12px color-mix(in srgb, var(--cyan) 6%, transparent)`,
                `0 0 0 6px color-mix(in srgb, var(--cyan) 14%, transparent)`,
              ],
            }}
            transition={{
              opacity: { duration: 0.5, delay: D.question },
              scale: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1], delay: D.question },
              boxShadow: { duration: 2.4, ease: 'easeInOut', delay: D.question + 0.6, repeat: Infinity },
            }}
          />
          <p
            className="deck-display italic"
            style={{
              fontSize: 'var(--fs-slide-tagline)',
              lineHeight: 1.3,
              color: 'var(--cream)',
              fontWeight: 400,
              margin: 0,
            }}
          >
            Could a clinical-pharmacology evidence package — built from existing global data — convert the entire pre-approval requirement into a{' '}
            <span style={{ color: 'var(--cyan)', fontWeight: 700, fontStyle: 'normal' }}>
              post-approval Phase 4 commitment?
            </span>
          </p>
        </motion.div>
      </div>
    </SlideFrame>
  );
}

/* ======================================================== */
function GlobalApprovedCard({ tk, delayCard, delaySpine, delayMarkers, delayLabels }) {
  const ease = [0.2, 0.7, 0.3, 1];
  const overshoot = [0.34, 1.56, 0.64, 1];
  const spineLen = 660;
  return (
    <motion.div
      style={{
        padding: 'var(--space-5) var(--space-6)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--cyan)',
        borderRadius: 'var(--radius-lg)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 'var(--space-3)',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: delayCard }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        Approved globally
      </div>

      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1.1,
          display: 'flex',
          alignItems: 'baseline',
          gap: 'var(--space-4)',
          flexWrap: 'wrap',
        }}
      >
        <span
          style={{
            fontSize: 'clamp(3rem, min(5vw, 8vh), 5.5rem)',
            fontWeight: 800,
            color: 'var(--cyan)',
            letterSpacing: '-0.04em',
            lineHeight: 0.95,
          }}
        >
          42+
        </span>
        <span>countries · 500 mg QD</span>
      </div>

      <div style={{ position: 'relative', minHeight: 0 }}>
        <svg viewBox="0 0 700 140" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', height: '100%' }}>
          <motion.line
            x1={20} x2={680} y1={76} y2={76}
            stroke={tk('--cyan')} strokeWidth={2} strokeLinecap="round"
            strokeDasharray={spineLen}
            initial={{ strokeDashoffset: spineLen }}
            animate={{ strokeDashoffset: 0 }}
            transition={{ duration: 1.0, ease, delay: delaySpine }}
          />
          {TIMELINE_MARKS.map((m, i) => (
            <motion.circle
              key={i}
              cx={m.x} cy={76} r={8}
              fill={tk('--cyan')}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
              transition={{ duration: 0.5, ease: overshoot, delay: delayMarkers + i * 0.12 }}
            />
          ))}
          {TIMELINE_MARKS.map((m, i) => (
            <g key={`l${i}`}>
              <motion.text
                x={m.x} y={56} textAnchor="middle"
                fontFamily="var(--font-display)" fontSize={11} fontWeight={600}
                fill={tk('--cream')}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: delayLabels + i * 0.08 }}
              >
                {m.tag}
              </motion.text>
              <motion.text
                x={m.x} y={100} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize={9}
                fill={tk('--cream-faint')}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: delayLabels + 0.08 + i * 0.08 }}
              >
                {m.yr}
              </motion.text>
            </g>
          ))}
          <motion.text
            x={20} y={126}
            fontFamily="var(--font-mono)" fontSize={9}
            letterSpacing="0.14em" fill={tk('--cream-muted')}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            transition={{ duration: 0.4, ease, delay: delayLabels + 0.4 }}
          >
            GLOBAL APPROVAL TIMELINE
          </motion.text>
        </svg>
      </div>
    </motion.div>
  );
}

function IndiaAskCard({ tk, delayCard, delayVenn, delayList }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        padding: 'var(--space-5) var(--space-6)',
        border: '1px solid var(--cream-hairline)',
        borderLeft: '3px solid var(--cyan)',
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(135deg, color-mix(in srgb, var(--cyan) 10%, transparent), color-mix(in srgb, var(--panel) 60%, transparent) 60%)',
        display: 'grid',
        gridTemplateRows: 'auto auto 1fr',
        rowGap: 'var(--space-3)',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay: delayCard }}
    >
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-kicker)',
          letterSpacing: 'var(--ls-mono-wide)',
          color: 'var(--cyan)',
          fontWeight: 700,
        }}
      >
        India — the regulatory ask
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1.1,
        }}
      >
        Pre-approval local clinical data
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'minmax(140px, 200px) 1fr',
          columnGap: 'var(--space-5)',
          alignItems: 'center',
          minHeight: 0,
        }}
      >
        <svg viewBox="0 0 220 168" preserveAspectRatio="xMidYMid meet" style={{ width: '100%', maxWidth: 200 }}>
          {[
            { cx: 78,  cy: 64,  r: 48, delay: delayVenn,         label: { x: 48,  y: 42,  text: 'Efficacy' } },
            { cx: 142, cy: 64,  r: 48, delay: delayVenn + 0.15,  label: { x: 172, y: 42,  text: 'Safety' } },
            { cx: 110, cy: 116, r: 48, delay: delayVenn + 0.30,  label: { x: 110, y: 162, text: 'PK' } },
          ].map((c, i) => (
            <g key={i}>
              <motion.circle
                cx={c.cx} cy={c.cy} r={c.r}
                fill={tk('--cyan')} fillOpacity={0.12}
                stroke={tk('--cyan')} strokeWidth={1.6}
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: c.delay }}
              />
              <motion.text
                x={c.label.x} y={c.label.y} textAnchor="middle"
                fontFamily="var(--font-mono)" fontSize={9}
                letterSpacing="0.16em" fill={tk('--cream')}
                initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                transition={{ duration: 0.4, ease, delay: c.delay + 0.4 }}
              >
                {c.label.text.toUpperCase()}
              </motion.text>
            </g>
          ))}
        </svg>

        <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
          {[
            <>3 required domains <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>— in Indian patients</em></>,
            <>Waiver pathway exists — but needs <b style={{ color: 'var(--cyan)', fontWeight: 700 }}>scientific justification</b>, not administrative exemption</>,
            <>ICH E5(R1) Appendix D <em style={{ color: 'var(--cream-muted)', fontStyle: 'italic' }}>— ethnic-sensitivity bridge</em></>,
          ].map((item, i) => (
            <motion.li
              key={i}
              style={{
                fontFamily: 'var(--font-body)',
                fontSize: 'var(--fs-slide-kicker)',
                lineHeight: 1.45,
                color: 'var(--cream)',
                padding: 'var(--space-1) 0',
                borderBottom: i === 2 ? 'none' : '1px dashed var(--cream-hairline)',
                textTransform: 'none',
                letterSpacing: 0,
              }}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease, delay: delayList + i * 0.15 }}
            >
              {item}
            </motion.li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}

function StatCard({ delay, icon, label, big, detail }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        position: 'relative',
        padding: 'var(--space-4) var(--space-5) var(--space-4) 86px',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
        minHeight: 0,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease, delay }}
    >
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: 18,
          width: 52,
          height: 52,
          transform: 'translateY(-50%)',
        }}
      >
        {icon}
      </div>
      <div
        className="deck-mono uppercase"
        style={{
          fontSize: 'var(--fs-slide-pageno)',
          letterSpacing: 'var(--ls-mono)',
          color: 'var(--cyan)',
          fontWeight: 700,
          marginBottom: 'var(--space-1)',
        }}
      >
        {label}
      </div>
      <div
        className="deck-display"
        style={{
          fontSize: 'var(--fs-slide-subhead)',
          fontWeight: 700,
          color: 'var(--cream)',
          letterSpacing: 'var(--ls-headline)',
          lineHeight: 1.15,
          marginBottom: 'var(--space-1)',
        }}
      >
        {big}
      </div>
      <div
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'var(--fs-slide-kicker)',
          lineHeight: 1.35,
          color: 'var(--cream-muted)',
          textTransform: 'none',
          letterSpacing: 0,
        }}
      >
        {detail}
      </div>
    </motion.div>
  );
}

const stroke = 'var(--cyan)';
const fill = 'var(--cyan)';
const iconProps = {
  fill: 'none',
  stroke,
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function IconRings() {
  return (
    <svg viewBox="0 0 56 56" width="100%" height="100%" aria-hidden>
      <circle cx={28} cy={28} r={22} {...iconProps} />
      <circle cx={28} cy={28} r={14} {...iconProps} />
      <circle cx={28} cy={28} r={6} fill={fill} fillOpacity={0.22} stroke={stroke} strokeWidth={1.8} />
    </svg>
  );
}
function IconHourglass() {
  return (
    <svg viewBox="0 0 56 56" width="100%" height="100%" aria-hidden>
      <path d="M 12 6 L 44 6 L 28 28 L 44 50 L 12 50 L 28 28 Z" {...iconProps} />
      <line x1={12} x2={44} y1={6} y2={6} {...iconProps} />
      <line x1={12} x2={44} y1={50} y2={50} {...iconProps} />
      <circle cx={28} cy={38} r={2}   fill={fill} fillOpacity={0.9} stroke="none" />
      <circle cx={24} cy={44} r={1.6} fill={fill} fillOpacity={0.9} stroke="none" />
      <circle cx={32} cy={44} r={1.6} fill={fill} fillOpacity={0.9} stroke="none" />
    </svg>
  );
}
function IconCoinStack() {
  return (
    <svg viewBox="0 0 56 56" width="100%" height="100%" aria-hidden>
      <ellipse cx={28} cy={14} rx={18} ry={5} fill={fill} fillOpacity={0.22} stroke={stroke} strokeWidth={1.8} />
      <path d="M 10 14 L 10 24" {...iconProps} />
      <path d="M 46 14 L 46 24" {...iconProps} />
      <ellipse cx={28} cy={24} rx={18} ry={5} {...iconProps} />
      <path d="M 10 24 L 10 34" {...iconProps} />
      <path d="M 46 24 L 46 34" {...iconProps} />
      <ellipse cx={28} cy={34} rx={18} ry={5} {...iconProps} />
      <path d="M 10 34 L 10 44" {...iconProps} />
      <path d="M 46 34 L 46 44" {...iconProps} />
      <ellipse cx={28} cy={44} rx={18} ry={5} {...iconProps} />
    </svg>
  );
}