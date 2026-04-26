// @ts-nocheck
import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';
import SplitHeadline from '@/components/deck/SplitHeadline';

/**
 * TypographyPage — showcases the SlideParts typography components that
 * make up every slide's text chrome. These are normally positioned via
 * SlideGrid areas; here we render them as free-standing elements with
 * inline styles matching their grid-slotted appearance.
 */
export default function TypographyPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Typography"
        title="Slide Text Components"
        description="The typographic building blocks of every slide. Import from @/components/deck/SlideParts and place them in named grid areas via SlideGrid."
      />

      <ComponentShowcase
        name="Eyebrow"
        importPath="@/components/deck/SlideParts"
        description="Small top-left kicker — always paired with a hairline rule. Colored by the current case accent."
        props={[
          { name: 'area',     type: 'string',  desc: 'Grid area name (default: "eyebrow")' },
          { name: 'color',    type: 'string',  desc: 'CSS color · default var(--case)' },
          { name: 'delay',    type: 'number',  desc: 'Entrance delay in seconds · default 0.15' },
          { name: 'children', type: 'ReactNode', desc: 'Eyebrow content', required: true },
        ]}
        example={`<Eyebrow color="var(--amber)" delay={0.2}>
  Framework · Five recurring themes
</Eyebrow>`}
      >
        <div className="flex items-center gap-4 deck-mono uppercase"
             style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)' }}>
          <span className="h-px w-10" style={{ background: 'var(--amber)' }} />
          Framework · Five recurring themes
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Headline"
        importPath="@/components/deck/SlideParts"
        description="Slide's primary display line. Animates char-by-char via GSAP SplitText (respects prefers-reduced-motion). Accepts nested JSX for colored inline words."
        props={[
          { name: 'children', type: 'ReactNode', desc: 'Headline text · may include <br/>, <span style>, <em>', required: true },
          { name: 'delay',    type: 'number',    desc: 'Entrance delay (s) · default 0.3' },
          { name: 'maxChars', type: 'number',    desc: 'ch-based max width · default 34' },
        ]}
        example={`<Headline delay={0.3} maxChars={34}>
  The model is the instrument;
  <br/>
  the <span style={{ color: 'var(--cyan)' }}>decision</span> is the product.
</Headline>`}
        previewHeight={220}
      >
        <SplitHeadline delay={0.15}>
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(1.5rem, 3vw, 2.5rem)',
              lineHeight: 1.05,
              color: 'var(--cream)',
              fontWeight: 500,
              letterSpacing: 'var(--ls-display)',
              display: 'block',
            }}
          >
            The model is the instrument;<br />
            the <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>decision</span> is the product.
          </span>
        </SplitHeadline>
      </ComponentShowcase>

      <ComponentShowcase
        name="Subhead"
        importPath="@/components/deck/SlideParts"
        description="Italic display line beneath the headline. Supports 'default' and 'lead' sizes."
        props={[
          { name: 'children', type: 'ReactNode', desc: 'Subhead text', required: true },
          { name: 'delay',    type: 'number',    desc: 'Entrance delay · default 0.55' },
          { name: 'maxChars', type: 'number',    desc: 'Max ch width · default 100' },
          { name: 'size',     type: '"default" | "lead"', desc: 'Typographic scale · default "default"' },
        ]}
        example={`<Subhead delay={2.1} size="lead">
  Five themes → one judgment → three outcomes.
</Subhead>`}
      >
        <p
          className="deck-display italic"
          style={{
            fontSize: 'clamp(1rem, 1.5vw, 1.5rem)',
            lineHeight: 'var(--lh-snug)',
            color: 'var(--cream-muted)',
            fontWeight: 400,
            margin: 0,
            textAlign: 'center',
          }}
        >
          Five themes → one judgment → three outcomes.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="TopRight"
        importPath="@/components/deck/SlideParts"
        description="Slide identifier in the top-right chrome — usually the deck name or section code."
        props={[
          { name: 'children', type: 'ReactNode', desc: 'Content (typically 1–2 short lines)', required: true },
          { name: 'delay',    type: 'number',    desc: 'Entrance delay · default 0.15' },
        ]}
        example={`<TopRight>QP2 · Framework</TopRight>`}
      >
        <div
          className="deck-mono uppercase"
          style={{
            fontSize: 'var(--fs-slide-topright)',
            letterSpacing: 'var(--ls-mono)',
            color: 'var(--cream-faint)',
          }}
        >
          QP2 · Framework
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Footer"
        importPath="@/components/deck/SlideParts"
        description="Bottom rail with kicker (left), tagline (center-right), page N/total (right). Page number is pulled from deck context."
        props={[
          { name: 'kicker',   type: 'string', desc: 'Left-side mono label' },
          { name: 'tagline',  type: 'string', desc: 'Right-side italic payoff' },
          { name: 'delay',    type: 'number', desc: 'Entrance delay · default 2.6' },
        ]}
        example={`<Footer
  kicker="Five themes · one judgment · three outcomes"
  tagline="The model is the instrument."
/>`}
        previewHeight={120}
      >
        <div
          className="flex items-baseline gap-6 w-full"
          style={{
            paddingTop: 'var(--space-3)',
            borderTop: '1px solid var(--cream-hairline)',
          }}
        >
          <span className="deck-mono uppercase shrink-0"
                style={{ fontSize: 'var(--fs-slide-kicker)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--cream-faint)' }}>
            Five themes · one judgment · three outcomes
          </span>
          <span className="deck-display italic flex-1 text-right truncate"
                style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream-muted)', fontWeight: 500 }}>
            The model is the instrument.
          </span>
          <span className="deck-mono uppercase shrink-0"
                style={{ fontSize: 'var(--fs-slide-pageno)', letterSpacing: 'var(--ls-mono)', color: 'var(--cream-faint)' }}>
            04 / 20
          </span>
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="SplitHeadline"
        importPath="@/components/deck/SplitHeadline"
        description="Lower-level GSAP SplitText char-reveal primitive used internally by Headline. Use directly when you need the flourish on non-headline text."
        props={[
          { name: 'children',      type: 'ReactNode', desc: 'Text to split', required: true },
          { name: 'delay',         type: 'number',    desc: 'Entrance delay · default 0.3' },
          { name: 'charDuration',  type: 'number',    desc: 'Per-char fade duration · default 0.7' },
          { name: 'charStagger',   type: 'number',    desc: 'Time between chars · default 0.018' },
        ]}
        example={`<SplitHeadline delay={0.2} charStagger={0.025}>
  Quantitative Pharmacology in Action
</SplitHeadline>`}
        previewHeight={160}
      >
        <SplitHeadline delay={0.1}>
          <span
            className="deck-display"
            style={{
              fontSize: 'clamp(1.25rem, 2.2vw, 1.75rem)',
              color: 'var(--cream)',
              fontWeight: 500,
              display: 'block',
            }}
          >
            Each character rises into place.
          </span>
        </SplitHeadline>
      </ComponentShowcase>
    </>
  );
}
