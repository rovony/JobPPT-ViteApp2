// @ts-nocheck
import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';

/**
 * PatternsPage — higher-level slide patterns (full-slide layouts)
 * and layout primitives. These are named "patterns" because each one
 * is a ready-made composition of the primitives — drop into a slide
 * to get a specific genre (title, quote, divider, stat grid, etc.).
 */
const PATTERNS = [
  {
    name: 'SlideGrid',
    path: '@/components/deck/SlideGrid',
    desc: 'The 12-column grid primitive every slide uses. Named areas prevent overlaps structurally. Import STANDARD_AREAS for the default (chrome-l, chrome-r, eyebrow, headline, subhead, viz, footer).',
    example: `<SlideGrid dataCase="amber" areas={STANDARD_AREAS}>
  <Eyebrow>...</Eyebrow>
  <Headline>...</Headline>
  <Viz>...</Viz>
  <Footer kicker="..." tagline="..." />
</SlideGrid>`,
  },
  {
    name: 'GridSlot',
    path: '@/components/deck/SlideGrid',
    desc: 'Positions a child into a named grid area. Optional motion props for staggered entrance.',
    example: `<GridSlot area="viz" motion={{ delay: 0.4 }}>
  <MyChart />
</GridSlot>`,
  },
  {
    name: 'TitleCard',
    path: '@/components/deck/patterns/TitleCard',
    desc: 'Hero title composition with kicker, headline, and author meta. Use for deck-opener slides.',
  },
  {
    name: 'QuoteCard',
    path: '@/components/deck/patterns/QuoteCard',
    desc: 'Large pull-quote with attribution. Italic display face, case-accent rule on the left.',
  },
  {
    name: 'StatGrid',
    path: '@/components/deck/patterns/StatGrid',
    desc: '2–4 big-number tiles with labels. Tabular figures. Great for impact/KPI slides.',
  },
  {
    name: 'BulletList',
    path: '@/components/deck/patterns/BulletList',
    desc: 'Token-driven bullet list with case-accent markers and staggered reveals.',
  },
  {
    name: 'ClosingCard',
    path: '@/components/deck/patterns/ClosingCard',
    desc: 'Deck-closing slide pattern: headline, payoff line, call-to-action.',
  },
  {
    name: 'TwoColumn',
    path: '@/components/deck/patterns/TwoColumn',
    desc: '50/50 split layout with slots for text column + visual column. Responsive gutter.',
  },
  {
    name: 'CaseDividerSlide',
    path: '@/components/deck/patterns/CaseDividerSlide',
    desc: 'Act-break pattern used between case studies. Large case number, setup line, case color takeover.',
  },
  {
    name: 'CaseHeroDivider',
    path: '@/components/deck/patterns/CaseHeroDivider',
    desc: 'Dramatic case introduction with illustration slot + hero headline.',
  },
  {
    name: 'ImpactNumerals',
    path: '@/components/deck/patterns/ImpactNumerals',
    desc: 'Oversized numerals for outcome slides (e.g. regulatory approvals, trial results).',
  },
  {
    name: 'FloatingAnnotation',
    path: '@/components/deck/patterns/FloatingAnnotation',
    desc: 'Callout box anchored to a coordinate on the slide — points to a specific area of a viz.',
  },
  {
    name: 'HighlightWord',
    path: '@/components/deck/patterns/HighlightWord',
    desc: 'Inline word emphasis — case-color underline or backdrop tint. Drop inside headlines or prose.',
  },
  {
    name: 'MetaLine',
    path: '@/components/deck/patterns/MetaLine',
    desc: 'Compact author/date/source line — small mono type, hairline-separated segments.',
  },
  {
    name: 'ThemeStrip',
    path: '@/components/deck/patterns/ThemeStrip',
    desc: 'Horizontal strip of 5 accent pills — used to preview the deck\'s theme color family.',
  },
  {
    name: 'SlideTransition',
    path: '@/components/deck/SlideTransition',
    desc: 'Wraps a slide in a motion container that runs the configured enter/exit animation. Handles 3D perspective + reduced-motion fallback automatically.',
  },
  {
    name: 'Reveal',
    path: '@/components/deck/Reveal',
    desc: 'Fade/slide reveal on intersection. Useful for staggering body content after the headline lands.',
  },
];

export default function PatternsPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Patterns"
        title="Slide Patterns & Layout"
        description="Full-slide compositions and layout primitives. Patterns are named, opinionated starting points — drop one in to get a specific slide genre."
      />

      {PATTERNS.map((p) => (
        <ComponentShowcase
          key={p.name}
          name={p.name}
          importPath={p.path}
          description={p.desc}
          example={p.example}
        />
      ))}
    </>
  );
}
