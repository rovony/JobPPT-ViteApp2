// @ts-nocheck
import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import SlideFrame from '@/components/deck/SlideFrame';

const PORTFOLIO_ROWS = [
  {
    area: 'Oncology',
    assets: 'Tibsovo (ivosidenib), Onivyde, Oncaspar / Asparlas',
    work: 'dose & exposure-response, Japanese ethnobridging, global submissions',
    agencies: 'FDA · EMA · PMDA · TGA · Swissmedic · ANVISA',
  },
  {
    area: 'Biologics',
    assets: 'Sotrovimab (mAb); BCLxL & BCMA ADC strategy',
    work: 'mAb PK across populations/routes; led multi-analyte ADC + FIH dose strategy',
    agencies: 'FDA · EMA · PMDA',
  },
  {
    area: 'Antiviral / ID',
    assets: 'Sotrovimab (COVID), Dectova (influenza), HBV combination patent (AU2023213173A1)',
    work: 'viral mAb PK, preterm-neonate sims, co-invented HBV combo therapy',
    agencies: 'EMA · FDA',
  },
  {
    area: 'Respiratory / PAH',
    assets: 'Trelegy, Anoro, Incruse; ambrisentan',
    work: 'popPK / E-R, adult to paediatric extrapolation',
    agencies: 'multi-region',
  },
  {
    area: 'Dose prediction / AI',
    assets: 'DosePredict (J Clin Pharmacol 2020), DeepPK, Pharazi',
    work: 'FIH/dose tools, Neural-ODE PK, auditable AI',
    agencies: '-',
  },
];

export default function Portfolio01() {
  const reduced = useReducedMotion();
  const go = !reduced;

  return (
    <SlideFrame
      dataCase="amber"
      eyebrow="Beyond these four · the portfolio"
      headline={<>Breadth across <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>modality, therapeutic area, and agency.</span></>}
      subhead="The four cases are the spine; the broader portfolio is why the bridge can cover oncology, biologics, antiviral, respiratory, PAH, and AI-enabled dose prediction."
      footerKicker="Stable core · portfolio breadth"
      footerTagline="The bridge to Vir starts from a portfolio, not a single case."
      footerSource="Vir Deck Content Pack · master CV · public publication/regulatory record"
    >
      <div
        style={{
          width: '100%',
          height: '100%',
          minHeight: 0,
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.55fr 1.65fr 1fr',
          gap: '1px',
          border: '1px solid color-mix(in srgb, var(--amber) 28%, transparent)',
          background: 'color-mix(in srgb, var(--amber) 28%, transparent)',
          overflow: 'hidden',
        }}
      >
        {['Area', 'Assets', 'What I did', 'Agencies'].map((heading) => (
          <div
            key={heading}
            className="deck-mono uppercase"
            style={{
              padding: 'var(--space-3) var(--space-4)',
              background: 'color-mix(in srgb, var(--amber) 16%, var(--panel))',
              color: 'var(--amber)',
              fontSize: 'var(--fs-slide-eyebrow)',
              letterSpacing: 'var(--ls-mono-wide)',
              fontWeight: 800,
            }}
          >
            {heading}
          </div>
        ))}
        {PORTFOLIO_ROWS.map((row, i) => (
          <React.Fragment key={row.area}>
            <Cell delay={0.65 + i * 0.08} go={go} strong>{row.area}</Cell>
            <Cell delay={0.70 + i * 0.08} go={go}>{row.assets}</Cell>
            <Cell delay={0.75 + i * 0.08} go={go}>{row.work}</Cell>
            <Cell delay={0.80 + i * 0.08} go={go} mono>{row.agencies}</Cell>
          </React.Fragment>
        ))}
      </div>
    </SlideFrame>
  );
}

function Cell({ children, delay, go, strong = false, mono = false }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={go ? { opacity: 1 } : { opacity: 1 }}
      transition={{ duration: 0.35, delay }}
      className={mono ? 'deck-mono' : 'deck-body'}
      style={{
        minWidth: 0,
        minHeight: 0,
        padding: 'var(--space-3) var(--space-4)',
        background: 'color-mix(in srgb, var(--panel) 92%, transparent)',
        color: strong ? 'var(--amber)' : 'var(--cream-muted)',
        fontSize: mono ? 'var(--fs-slide-eyebrow)' : 'var(--fs-slide-subhead)',
        lineHeight: 1.35,
        fontWeight: strong ? 800 : 500,
        letterSpacing: mono ? '0.02em' : 0,
      }}
    >
      {children}
    </motion.div>
  );
}
