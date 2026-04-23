import React from 'react';
import { motion } from 'framer-motion';
import { Beaker, ShieldCheck, Activity } from 'lucide-react';

/**
 * AsymmetryDiagram — the one-visual heart of slide 15.
 *
 * Left side  : a compact grid of country "chips" with a hero "42+" numeral —
 *              represents the global approval landscape.
 * Right side : India glyph standing alone, with its three required-data
 *              domains fanned out around it (efficacy · safety · PK).
 * Between    : a vertical cyan hairline as the asymmetry axis.
 *
 * No borders, no cards. Just spatial rhythm + one hero number.
 * All values/glyphs resolve from tokens (--cyan / --cream / --coral).
 */
export default function AsymmetryDiagram({ delay = 0 }) {
  const ease = [0.2, 0.7, 0.3, 1];

  // Four rows × 8 cols = 32 chips, + "42+" hero numeral reads as the rest
  const chipRows = [
    ['FDA', 'EMA', 'PMDA', 'NMPA', 'MFDS', 'MHRA', 'TGA', 'HC'],
    ['Swissmedic', 'ANVISA', 'COFEPRIS', 'INVIMA', 'ANMAT', 'ANSM', 'AIFA', 'BfArM'],
    ['AEMPS', 'Lakemedelsverket', 'DKMA', 'Fimea', 'AGES', 'FAMHP', 'CBG-MEB', 'HPRA'],
    ['NMRA', 'DCA', 'TFDA', 'BPOM', 'MOH-KSA', 'DHA', 'MOH-IL', 'MOH-TR'],
  ];

  const domains = [
    { label: 'Efficacy',         Icon: Activity,    angle: -60 },
    { label: 'Safety',           Icon: ShieldCheck, angle:   0 },
    { label: 'Pharmacokinetics', Icon: Beaker,      angle:  60 },
  ];

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1.25fr auto 1fr',
        alignItems: 'center',
        columnGap: '48px',
        width: '100%',
        height: '100%',
        minHeight: 0,
      }}
    >
      {/* ═══════════ LEFT · 42+ countries ═══════════ */}
      <div style={{ minWidth: 0 }}>
        <motion.div
          className="deck-mono uppercase flex items-center gap-3"
          style={{
            fontSize: '0.7rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cyan)',
            marginBottom: '10px',
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay }}
        >
          <span className="h-px w-8" style={{ background: 'var(--cyan)' }} />
          Approved globally
        </motion.div>

        {/* Hero numeral + caption */}
        <div style={{ display: 'flex', alignItems: 'baseline', gap: 16, marginBottom: 20 }}>
          <motion.div
            className="deck-display"
            style={{
              fontSize: 'clamp(3.5rem, 6vw, 7rem)',
              lineHeight: 1,
              letterSpacing: 'var(--ls-display)',
              color: 'var(--cyan)',
              fontWeight: 700,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease, delay: delay + 0.15 }}
          >
            42+
          </motion.div>
          <motion.div
            className="deck-display"
            style={{
              fontSize: 'clamp(0.95rem, 1.2vw, 1.3rem)',
              color: 'var(--cream)',
              fontWeight: 400,
              lineHeight: 1.2,
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, ease, delay: delay + 0.4 }}
          >
            countries<br />
            <span style={{ color: 'var(--cream-muted)', fontSize: '0.8em' }}>
              500 mg QD · since 2018
            </span>
          </motion.div>
        </div>

        {/* Country chip grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(8, 1fr)',
            gap: '5px',
          }}
        >
          {chipRows.flat().map((c, i) => (
            <motion.div
              key={`${c}-${i}`}
              className="deck-mono uppercase"
              style={{
                fontSize: '0.6rem',
                letterSpacing: '0.08em',
                padding: '5px 6px',
                color: 'var(--cream-muted)',
                background: 'color-mix(in srgb, var(--cyan) 8%, transparent)',
                border: '1px solid color-mix(in srgb, var(--cyan) 24%, transparent)',
                borderRadius: 3,
                textAlign: 'center',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.3,
                ease: [0.34, 1.56, 0.64, 1],
                delay: delay + 0.55 + (i * 0.018),
              }}
            >
              {c}
            </motion.div>
          ))}
        </div>
      </div>

      {/* ═══════════ DIVIDER · vertical cyan hairline ═══════════ */}
      <motion.div
        style={{
          width: 2,
          height: '85%',
          background: 'var(--cyan)',
          transformOrigin: 'top center',
          opacity: 0.5,
        }}
        initial={{ scaleY: 0 }}
        animate={{ scaleY: 1 }}
        transition={{ duration: 0.9, ease, delay: delay + 0.3 }}
      />

      {/* ═══════════ RIGHT · India alone ═══════════ */}
      <div style={{ minWidth: 0, position: 'relative' }}>
        <motion.div
          className="deck-mono uppercase flex items-center gap-3"
          style={{
            fontSize: '0.7rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--coral)',
            marginBottom: '12px',
          }}
          initial={{ opacity: 0, x: -8 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, ease, delay: delay + 0.2 }}
        >
          <span className="h-px w-8" style={{ background: 'var(--coral)' }} />
          India — the regulatory ask
        </motion.div>

        {/* Central INDIA plate */}
        <IndiaPlate delay={delay + 0.4} />

        {/* Three required domains */}
        <div
          style={{
            marginTop: 22,
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 12,
          }}
        >
          {domains.map((d, i) => (
            <motion.div
              key={d.label}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 8,
                padding: '10px 6px',
                borderTop: '1px solid var(--coral)',
                background: 'color-mix(in srgb, var(--coral) 6%, transparent)',
              }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease, delay: delay + 0.8 + i * 0.12 }}
            >
              <d.Icon size={22} strokeWidth={1.6} color="var(--coral)" />
              <div
                className="deck-mono uppercase"
                style={{
                  fontSize: '0.62rem',
                  letterSpacing: '0.14em',
                  color: 'var(--cream)',
                  textAlign: 'center',
                  lineHeight: 1.25,
                  fontWeight: 600,
                }}
              >
                {d.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Waiver footer note */}
        <motion.div
          className="deck-display italic"
          style={{
            marginTop: 16,
            fontSize: 'clamp(0.72rem, 0.82vw, 0.88rem)',
            color: 'var(--cream-muted)',
            lineHeight: 1.4,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, ease, delay: delay + 1.3 }}
        >
          Waiver pathway exists — but required{' '}
          <span style={{ color: 'var(--coral)', fontWeight: 600, fontStyle: 'normal' }}>
            scientific justification
          </span>
          , not administrative exemption.
        </motion.div>
      </div>
    </div>
  );
}

/* ========================================================
   IndiaPlate — small typographic plate reading "INDIA — 1".
   Treats India as one market standing opposite the 42+ cluster.
   ======================================================== */
function IndiaPlate({ delay }) {
  const ease = [0.2, 0.7, 0.3, 1];
  return (
    <motion.div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        gap: 18,
        padding: '16px 22px',
        border: '2px solid var(--coral)',
        background: 'color-mix(in srgb, var(--coral) 10%, transparent)',
        borderRadius: 4,
      }}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease, delay }}
    >
      <div
        className="deck-display"
        style={{
          fontSize: 'clamp(2rem, 3.2vw, 3.4rem)',
          lineHeight: 1,
          color: 'var(--coral)',
          fontWeight: 700,
          letterSpacing: 'var(--ls-display)',
        }}
      >
        1
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        <div
          className="deck-display"
          style={{
            fontSize: 'clamp(1.1rem, 1.5vw, 1.5rem)',
            color: 'var(--cream)',
            fontWeight: 700,
            letterSpacing: 'var(--ls-headline)',
            lineHeight: 1.1,
          }}
        >
          India · CDSCO
        </div>
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: '0.62rem',
            letterSpacing: 'var(--ls-mono-wide)',
            color: 'var(--cream-muted)',
          }}
        >
          Required local clinical data
        </div>
      </div>
    </motion.div>
  );
}