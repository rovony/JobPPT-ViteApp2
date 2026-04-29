// @ts-nocheck
import React, { createElement } from 'react';

import notes from './notes';
import qa from './qa';
import { DECK_META } from './data';

// ── Slides ─────────────────────────────────────────────────────────
import CS4Divider               from './slides/01-divider';
import CS4HookIntegrationLayer  from './slides/02-hook-integration-layer';
import CS4WhyNowM15             from './slides/03-why-now-m15';
import CS4WhatIsAgent           from './slides/04-what-is-agent';

// ── Group B / C / D — placeholder stub ─────────────────────────────
// Renders a minimal "in production" panel so the deck loads end-to-end
// before all slides ship. Replace each stub with the real component as
// it lands. Keep the eyebrow + headline accurate so the navigator
// + presenter pane read correctly.
//
// Built with React.createElement instead of JSX because this file is
// .ts (not .tsx) — same convention as qp2-seminar-v3-R2/manifest.ts.
function ComingSoon({ slideKey, title, headline, eyebrow }) {
  const eyebrowEl = createElement(
    'div',
    {
      className: 'deck-mono uppercase',
      style: {
        fontSize: '0.85rem',
        letterSpacing: 'var(--ls-mono-wide, 0.12em)',
        color: 'var(--case)',
        fontWeight: 700,
        marginBottom: '2vh',
      },
    },
    eyebrow || `CS4 · ${slideKey || title}`,
  );

  const headlineEl = createElement(
    'div',
    {
      className: 'deck-display',
      style: {
        fontSize: 'clamp(2rem, 4vw, 4rem)',
        color: 'var(--cream)',
        fontWeight: 600,
        maxWidth: '32ch',
        lineHeight: 'var(--lh-tight, 1.05)',
        marginBottom: '4vh',
      },
    },
    headline || title,
  );

  const captionEl = createElement(
    'div',
    {
      className: 'deck-mono',
      style: {
        fontSize: '0.95rem',
        color: 'var(--cream-faint)',
        letterSpacing: 'var(--ls-mono, 0.06em)',
      },
    },
    'Slide in production · Group B / C / D · see ',
    createElement('code', null, 'cs4-flagship-v1/README.md'),
  );

  return createElement(
    'section',
    {
      'data-case': 'sage',
      style: {
        position: 'relative',
        width: '100%',
        height: '100dvh',
        background: 'var(--bg)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        paddingLeft: 'var(--deck-gutter)',
        paddingRight: 'var(--deck-gutter)',
      },
    },
    eyebrowEl,
    headlineEl,
    captionEl,
  );
}

const stub = ({ id, title, eyebrow, headline }) => {
  const props = { slideKey: id, title, eyebrow, headline };
  const Wrapped = (extra) => createElement(ComingSoon, { ...extra, ...props });
  Wrapped.displayName = `Stub(${id})`;
  return Wrapped;
};

// ── Manifest ───────────────────────────────────────────────────────
const manifest = {
  id: 'cs4-flagship-v1',
  title: 'PharmAgent · Workflow Infrastructure',
  subtitle: 'Architectural argument for AI-augmented model-informed drug development',
  theme: 'clinical',
  notes,
  qa,
  defaultTransition: 'card',

  // Standard layout system — same shell as V5 so every slide gets a
  // consistent footer + slide number + sage rule. Body slides plug
  // their own <SlideGrid> + <SlideParts>.
  standardLayout: {
    enabled: true,
    footer: {
      line: true,
      text: 'Case 04 · PharmAgent · Spring 2026',
      showSlideNumber: true,
      showTime: false,
    },
  },

  export: {
    defaultSettleMs: 1500,
    slideSettleMs: {
      'cs4-divider':           1900,
      'cs4-hook-integration':  3200,  // three Venn circles + AiBrain morph
      'cs4-why-now-m15':       3400,  // 6-pillar dial sequential reveal
      'cs4-architecture':      4800,  // NumberTicker cascade + hierarchy
      'cs4-privacy-boundary':  4200,  // particle crossing + reveal
      'cs4-audit-chain':       3800,  // hash chain + tamper demo
      'cs4-workflow-trace':    4400,  // network trace particles
    },
  },

  slides: [
    // ── S01 — Divider · sage cascade · AiBrain anchor ───────────────
    {
      id: 'cs4-divider',
      title: 'Case 04 · PharmAgent',
      component: CS4Divider,
      isTitle: true,
      transition: 'fade',
      time: 45,
    },

    // ── S02 — Hook · three-circle integration-layer Venn ────────────
    {
      id: 'cs4-hook-integration',
      title: 'CS4 · the workflow layer',
      component: CS4HookIntegrationLayer,
      isTitle: false,
      transition: 'fade',
      time: 75,
    },

    // ── S03 — Why now · ICH M15 6-pillar dial ──────────────────────
    {
      id: 'cs4-why-now-m15',
      title: 'CS4 · ICH M15 · why now',
      component: CS4WhyNowM15,
      isTitle: false,
      transition: 'fade',
      time: 60,
    },

    // ── S04 — What is an agent · single-loop visual ────────────────
    {
      id: 'cs4-what-is-agent',
      title: 'CS4 · what an agent is',
      component: CS4WhatIsAgent,
      isTitle: false,
      transition: 'fade',
      time: 90,
    },

    // ── S05 — Architecture · NumberTicker cascade + hierarchy ──────
    {
      id: 'cs4-architecture',
      title: 'CS4 · architecture',
      component: stub({
        id: 'cs4-architecture',
        title: 'CS4 · architecture',
        eyebrow: 'CS4 · S05 · ARCHITECTURE',
        headline: '13 agents · 151 tools · 76 templates · 34 fields · 6 buckets',
      }),
      isTitle: false,
      transition: 'fade',
      time: 120,
    },

    // ── S06 — Novelty · vs published landscape ─────────────────────
    {
      id: 'cs4-novelty',
      title: 'CS4 · novelty',
      component: stub({
        id: 'cs4-novelty',
        title: 'CS4 · novelty',
        eyebrow: 'CS4 · S06 · NOVELTY',
        headline: 'Where this differs from Kim et al. and the typical agentic stack',
      }),
      isTitle: false,
      transition: 'fade',
      time: 75,
    },

    // ── S07 — Privacy boundary · SchemaExtractor ───────────────────
    {
      id: 'cs4-privacy-boundary',
      title: 'CS4 · privacy by construction',
      component: stub({
        id: 'cs4-privacy-boundary',
        title: 'CS4 · privacy by construction',
        eyebrow: 'CS4 · S07 · PRIVACY BOUNDARY',
        headline: 'Patient rows stay local · only metadata crosses the boundary',
      }),
      isTitle: false,
      transition: 'fade',
      time: 90,
    },

    // ── S08 — Audit chain · hash-chain tamper demo ─────────────────
    {
      id: 'cs4-audit-chain',
      title: 'CS4 · audit chain',
      component: stub({
        id: 'cs4-audit-chain',
        title: 'CS4 · audit chain',
        eyebrow: 'CS4 · S08 · AUDIT CHAIN',
        headline: 'Cryptographic provenance · tamper-evident by construction',
      }),
      isTitle: false,
      transition: 'fade',
      time: 90,
    },

    // ── S09 — Workflow trace · live particles on the network ──────
    {
      id: 'cs4-workflow-trace',
      title: 'CS4 · workflow trace',
      component: stub({
        id: 'cs4-workflow-trace',
        title: 'CS4 · workflow trace',
        eyebrow: 'CS4 · S09 · WORKFLOW TRACE',
        headline: 'One question · one trace · twelve agent calls · one signed result',
      }),
      isTitle: false,
      transition: 'fade',
      time: 105,
    },

    // ── S10 — Bracket bridge · what this case proves + bridge ─────
    {
      id: 'cs4-bracket-bridge',
      title: 'CS4 · what this case proves',
      component: stub({
        id: 'cs4-bracket-bridge',
        title: 'CS4 · what this case proves',
        eyebrow: 'CS4 · S10 · BRACKET + BRIDGE',
        headline: 'Workflow infrastructure is the unbuilt half of the M15 commitment',
      }),
      isTitle: false,
      transition: 'fade',
      time: 60,
    },
  ],
};

export default manifest;
