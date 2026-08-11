// @ts-nocheck
import React, { useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

/**
 * CS2 BACKUP · B1 · CDSCO Engagement Timeline
 *
 * V6 Type 1 — Historical Context lane.
 *
 * Source · Servier India public press releases · CDSCO public approval record.
 * (Internal SEC meeting dates and regulatory deliberations are out of public scope —
 * preserved as caveat per V6 Public-Sources-Only rule.)
 *
 * Ported from HTML deck (Slides-Backup/43-cs2-backup-cdsco-timeline.html)
 * 2026-04-26 — re-authored against SlideGrid + fluid tokens. Numbers
 * verbatim. Caveat about industry-typical estimates preserved.
 */
const EASE = [0.2, 0.7, 0.3, 1];

const STOPS = [
  { tag: 'Late 2024', title: 'Pre-submission Engagement', body: 'Pre-submission meeting with CDSCO Subject Expert Committee. Six-pillar evidence package presented as the regulatory architecture for a Phase 3 CT and PK-PD study waiver.' },
  { tag: 'Q1 2025',   title: 'Response to Queries',       body: 'Written responses to SEC queries submitted. Each query mapped to specific quantitative artifacts across the six pillars. Responses strengthened the evidentiary basis rather than conceded procedural requirements.' },
  { tag: 'April 2025', title: 'Waiver Granted',           body: 'CDSCO Phase 3 CT and PK-PD study waiver granted (contingent on Phase IV post-marketing commitments).' },
  { tag: 'May–Jun 2025', title: 'Approval + Launch',     body: 'May 14, 2025 · Import, sale, distribution approved by CDSCO. June 5, 2025 · Servier India launch for IDH1-mutant AML and cholangiocarcinoma.' },
];

const cardStyle = {
  border: '1px solid var(--cream-hairline)',
  background: 'color-mix(in srgb, var(--panel) 65%, transparent)',
  borderRadius: 'var(--radius-lg)',
  padding: 'var(--space-3) var(--space-4)',
  display: 'flex',
  flexDirection: 'column',
  position: 'relative',
};

const tagStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-eyebrow)',
  letterSpacing: 'var(--ls-mono-wide)',
  color: 'var(--case)',
  textTransform: 'uppercase',
  fontWeight: 700,
  marginBottom: 'var(--space-1)',
};

const titleStyle = {
  fontFamily: 'var(--font-display)',
  fontSize: 'var(--fs-slide-subhead)',
  fontWeight: 700,
  color: 'var(--cream)',
  marginBottom: 'var(--space-2)',
  lineHeight: 1.25,
};

const bodyStyle = {
  fontSize: 'var(--fs-slide-subhead)',
  color: 'var(--cream-muted)',
  lineHeight: 1.5,
};

const enabledItems = [
  ['$10M+', 'in bridging study costs avoided'],
  ['18–24 months', 'of Indian patient-access acceleration'],
  ['Reusable', 'six-pillar framework adopted as Servier template'],
];

export default function Cs2BackupB1CdscoTimeline() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });
  const reduced = useReducedMotion();
  const go = inView && !reduced;

  return (
    <SlideGrid dataCase="cyan" areas={STANDARD_AREAS}>
      <Eyebrow delay={0.10}>Backup B1 · Historical Context · CDSCO timeline</Eyebrow>

      <Headline delay={0.25} maxChars={64}>
        From pre-submission to patient access —{' '}
        <span style={{ color: 'var(--case)', fontStyle: 'italic' }}>
          the regulatory path.
        </span>
      </Headline>

      <Subhead delay={0.40}>
        Late 2024 to June 2025 · waiver granted contingent on Phase IV post-marketing commitments.
      </Subhead>

      <Viz>
        <div
          ref={ref}
          style={{
            display: 'grid',
            gridTemplateRows: 'auto auto',
            gap: 'var(--space-4)',
            height: '100%',
          }}
        >
          {/* Timeline cards */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(15rem, 100%), 1fr))',
              gap: 'var(--space-3)',
              position: 'relative',
            }}
          >
            {STOPS.map((s, i) => (
              <motion.div
                key={s.tag}
                style={cardStyle}
                initial={{ opacity: 0, y: 12 }}
                animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
                transition={{ duration: 0.55, ease: EASE, delay: 0.55 + i * 0.12 }}
              >
                <div
                  aria-hidden
                  style={{
                    position: 'absolute',
                    top: 'calc(-1 * var(--space-2))',
                    left: 'var(--space-3)',
                    width: 32,
                    height: 32,
                    borderRadius: '50%',
                    background: 'var(--case)',
                    color: 'var(--bg)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-slide-subhead)',
                    fontWeight: 700,
                  }}
                >
                  {i + 1}
                </div>
                <div style={{ ...tagStyle, marginTop: 'var(--space-2)' }}>{s.tag}</div>
                <div style={titleStyle}>{s.title}</div>
                <div style={bodyStyle}>{s.body}</div>
              </motion.div>
            ))}
          </div>

          {/* What this enabled */}
          <motion.div
            style={{
              borderTop: '1px solid var(--cream-hairline)',
              paddingTop: 'var(--space-3)',
            }}
            initial={{ opacity: 0, y: 8 }}
            animate={go ? { opacity: 1, y: 0 } : { opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: EASE, delay: 1.10 }}
          >
            <div
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-slide-eyebrow)',
                letterSpacing: 'var(--ls-mono-wide)',
                color: 'var(--case)',
                textTransform: 'uppercase',
                fontWeight: 700,
                marginBottom: 'var(--space-2)',
              }}
            >
              What this timeline enabled
            </div>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(16rem, 100%), 1fr))',
                gap: 'var(--space-3)',
              }}
            >
              {enabledItems.map(([num, label]) => (
                <div key={num} style={{ display: 'flex', flexDirection: 'column', minWidth: 0 }}>
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: 'var(--fs-slide-headline)',
                      color: 'var(--case)',
                      fontWeight: 700,
                      fontVariantNumeric: 'tabular-nums',
                      lineHeight: 1.1,
                    }}
                  >
                    {num}
                  </span>
                  <span style={{ fontSize: 'var(--fs-slide-subhead)', color: 'var(--cream-muted)' }}>
                    {label}
                  </span>
                </div>
              ))}
            </div>
            <div
              style={{
                marginTop: 'var(--space-2)',
                fontFamily: 'var(--font-display)',
                fontStyle: 'italic',
                fontSize: 'var(--fs-slide-eyebrow)',
                color: 'var(--cream-faint)',
                lineHeight: 1.4,
              }}
            >
              Dates from Servier India public press releases and CDSCO public approval record. Specific
              SEC meeting dates and internal regulatory deliberations are out of public scope.
              "$10M+ saved" and "18–24 months" are industry-typical estimates, not Servier-documented.
            </div>
          </motion.div>
        </div>
      </Viz>

      <Footer
        kicker="CS2 · Backup · Historical Context"
        tagline="Pre-submission → SEC queries → waiver → approval → launch."
        source="Source · Servier India public press releases · CDSCO public approval record"
      />
    </SlideGrid>
  );
}
