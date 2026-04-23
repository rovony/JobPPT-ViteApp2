import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';
import SlideTransition from '@/components/deck/SlideTransition';
import { SLIDE_TRANSITIONS } from '@/lib/slide-transitions';

/**
 * TransitionsPage — live preview of every slide transition preset.
 * Click any card to replay its animation.
 */
const PRESETS = Object.keys(SLIDE_TRANSITIONS);

const GROUPS = [
  { label: 'Simple',    items: ['fade', 'none'] },
  { label: 'Slide',     items: ['slide-left', 'slide-right', 'slide-up', 'slide-down'] },
  { label: 'Zoom',      items: ['zoom-in', 'zoom-out'] },
  { label: '3D Canvas', items: ['canvas-pan', 'canvas-cube', 'canvas-flip', 'canvas-depth'] },
];

export default function TransitionsPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Transitions"
        title="Slide Transition Presets"
        description="Every slide's `transition` field picks one of these. 3D presets use spring physics + composite depth transforms for weight. Click a tile to replay."
      />

      {GROUPS.map((group) => (
        <section key={group.label} style={{ marginBottom: 'var(--space-12)' }}>
          <div
            className="deck-mono uppercase"
            style={{
              fontSize: 'var(--fs-nano)',
              letterSpacing: 'var(--ls-mono-wide)',
              color: 'var(--case, var(--amber))',
              marginBottom: 'var(--space-4)',
            }}
          >
            {group.label}
          </div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
              gap: 'var(--space-4)',
            }}
          >
            {group.items.map((preset) => (
              <TransitionPreviewCard key={preset} preset={preset} />
            ))}
          </div>
        </section>
      ))}

      <ComponentShowcase
        name="Usage"
        importPath="manifest.slide.transition"
        description="Specify a preset on any slide in its manifest entry. The deck-wide `defaultTransition` is used when a slide doesn't specify one."
        example={`// manifest.js
export default {
  id: 'qp2-seminar',
  defaultTransition: 'canvas-pan',
  slides: [
    { id: 'title',  component: SlideTitle,  transition: 'canvas-cube' },
    { id: 'hook',   component: SlideHook    /* inherits canvas-pan */ },
    { id: 'impact', component: SlideImpact, transition: 'canvas-depth' },
  ],
};`}
        previewHeight="auto"
      >
        <div
          className="deck-body"
          style={{ color: 'var(--cream-muted)', fontSize: 'var(--fs-body-sm)', lineHeight: 1.6, maxWidth: '68ch' }}
        >
          Available presets: <code className="deck-mono" style={{ color: 'var(--cream)' }}>{PRESETS.join(', ')}</code>
        </div>
      </ComponentShowcase>
    </>
  );
}

function TransitionPreviewCard({ preset }) {
  const [tick, setTick] = useState(0);
  const replay = () => setTick((t) => t + 1);

  return (
    <button
      onClick={replay}
      style={{
        display: 'block',
        width: '100%',
        padding: 0,
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        background: 'var(--panel)',
        cursor: 'pointer',
        overflow: 'hidden',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          height: 140,
          position: 'relative',
          overflow: 'hidden',
          background: 'var(--bg)',
          perspective: 2400,
        }}
      >
        <AnimatePresence mode="wait">
          <SlideTransition key={tick} transition={preset}>
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'linear-gradient(135deg, var(--panel) 0%, var(--panel-elevated) 100%)',
                border: '1px solid var(--case, var(--amber))',
              }}
            >
              <span
                className="deck-display"
                style={{ color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 500 }}
              >
                Slide
              </span>
            </div>
          </SlideTransition>
        </AnimatePresence>
      </div>
      <div
        style={{
          padding: 'var(--space-3) var(--space-4)',
          borderTop: '1px solid var(--cream-hairline)',
        }}
      >
        <code
          className="deck-mono"
          style={{
            color: 'var(--cream)',
            fontSize: '0.78rem',
          }}
        >
          {preset}
        </code>
        <div
          className="deck-mono"
          style={{
            fontSize: '0.62rem',
            color: 'var(--cream-faint)',
            letterSpacing: 'var(--ls-mono)',
            marginTop: 2,
          }}
        >
          Click to replay
        </div>
      </div>
    </button>
  );
}