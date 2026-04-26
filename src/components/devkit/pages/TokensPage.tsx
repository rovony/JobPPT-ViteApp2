// @ts-nocheck
import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';

const COLOR_TOKENS = [
  { name: '--bg',             role: 'Canvas background' },
  { name: '--panel',          role: 'Elevated surface' },
  { name: '--panel-elevated', role: 'Higher elevation' },
  { name: '--cream',          role: 'Primary ink' },
  { name: '--cream-muted',    role: 'Secondary ink' },
  { name: '--cream-faint',    role: 'Tertiary ink' },
  { name: '--cream-hairline', role: 'Hairline rules' },
  { name: '--amber',          role: 'Accent · theme 01' },
  { name: '--cyan',           role: 'Accent · theme 02' },
  { name: '--sage',           role: 'Accent · theme 03' },
  { name: '--violet',         role: 'Accent · theme 04' },
  { name: '--coral',          role: 'Accent · theme 05' },
  { name: '--case',           role: 'Per-case primary accent' },
  { name: '--success',        role: 'Semantic · success' },
  { name: '--warn',           role: 'Semantic · warning' },
  { name: '--danger',         role: 'Semantic · danger' },
  { name: '--info',           role: 'Semantic · info' },
];

const TYPE_TOKENS = [
  { name: '--fs-hero',     label: 'Hero · 128pt' },
  { name: '--fs-display',  label: 'Display · 96pt' },
  { name: '--fs-h1',       label: 'H1 · 60pt' },
  { name: '--fs-h2',       label: 'H2 · 48pt' },
  { name: '--fs-h3',       label: 'H3 · 36pt' },
  { name: '--fs-lead',     label: 'Lead · 28pt' },
  { name: '--fs-body-lg',  label: 'Body LG · 19pt' },
  { name: '--fs-body',     label: 'Body · 16pt' },
  { name: '--fs-body-sm',  label: 'Body SM · 14pt' },
  { name: '--fs-meta',     label: 'Meta · 13pt' },
];

const SPACING_TOKENS = [
  { name: '--space-1', px: 4 },
  { name: '--space-2', px: 8 },
  { name: '--space-3', px: 12 },
  { name: '--space-4', px: 16 },
  { name: '--space-6', px: 24 },
  { name: '--space-8', px: 32 },
  { name: '--space-12', px: 48 },
  { name: '--space-16', px: 64 },
];

export default function TokensPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Tokens"
        title="Design System Tokens"
        description="The single source of truth for color, type, and spacing. Every component reads from these variables — no hardcoded values."
      />

      <ComponentShowcase
        name="Color Tokens"
        importPath="var(--token-name) in CSS"
        description="Semantic surface + ink tokens flip with theme; accent tokens stay fixed. Per-deck themes override only surface/ink/case."
        previewHeight="auto"
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))',
            gap: 'var(--space-3)',
            width: '100%',
            padding: 'var(--space-2)',
          }}
        >
          {COLOR_TOKENS.map((t) => (
            <div
              key={t.name}
              style={{
                border: '1px solid var(--cream-hairline)',
                borderRadius: 'var(--radius-sm)',
                overflow: 'hidden',
              }}
            >
              <div style={{ height: 48, background: `var(${t.name})` }} />
              <div style={{ padding: 'var(--space-2) var(--space-3)', background: 'var(--panel)' }}>
                <code
                  className="deck-mono"
                  style={{ fontSize: '0.7rem', color: 'var(--cream)', display: 'block' }}
                >
                  {t.name}
                </code>
                <div
                  style={{
                    fontSize: '0.65rem',
                    color: 'var(--cream-faint)',
                    marginTop: 2,
                  }}
                >
                  {t.role}
                </div>
              </div>
            </div>
          ))}
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Type Scale"
        importPath="font-size: var(--fs-*)"
        description="Pt-based scale anchored to 1920×1080 authoring. Fluid slide-specific tokens (--fs-slide-*) clamp on viewport."
        previewHeight="auto"
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          {TYPE_TOKENS.map((t) => (
            <div
              key={t.name}
              style={{
                display: 'flex',
                alignItems: 'baseline',
                gap: 'var(--space-6)',
                padding: 'var(--space-3)',
                borderBottom: '1px solid var(--cream-hairline)',
              }}
            >
              <code
                className="deck-mono"
                style={{ fontSize: '0.7rem', color: 'var(--cream-faint)', minWidth: 120 }}
              >
                {t.name}
              </code>
              <span
                className="deck-display"
                style={{ fontSize: `var(${t.name})`, color: 'var(--cream)', lineHeight: 1 }}
              >
                {t.label}
              </span>
            </div>
          ))}
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="Spacing Scale"
        importPath="var(--space-*)"
        description="Px-based spacing for component gutters, card padding, grid gaps."
        previewHeight="auto"
      >
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 'var(--space-2)' }}>
          {SPACING_TOKENS.map((t) => (
            <div key={t.name} style={{ display: 'flex', alignItems: 'center', gap: 'var(--space-4)' }}>
              <code
                className="deck-mono"
                style={{ fontSize: '0.7rem', color: 'var(--cream-muted)', minWidth: 90 }}
              >
                {t.name}
              </code>
              <div
                style={{
                  height: 16,
                  width: t.px,
                  background: 'var(--case, var(--amber))',
                  borderRadius: 2,
                }}
              />
              <span className="deck-mono" style={{ fontSize: '0.7rem', color: 'var(--cream-faint)' }}>
                {t.px}px
              </span>
            </div>
          ))}
        </div>
      </ComponentShowcase>
    </>
  );
}
