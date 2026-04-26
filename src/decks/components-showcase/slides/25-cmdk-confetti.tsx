// @ts-nocheck
import React, { useState } from 'react';
import { Command } from 'cmdk';
import confetti from 'canvas-confetti';
import { Search, FlaskConical, Pill, FileText, Sparkles, PartyPopper } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function CmdkConfettiShowcase() {
  const [value, setValue] = useState('');

  function pop() {
    confetti({ particleCount: 80, spread: 70, origin: { y: 0.7 }, colors: ['#FFCB47', '#74C7E1', '#F4B382', '#A38BC4'] });
  }

  return (
    <LibraryShowcase
      category="§6 / §10 · Command palette + cinematic moments"
      library="cmdk + canvas-confetti"
      npmInstall="npm install cmdk canvas-confetti"
      url="cmdk.paco.me · github.com/catdad/canvas-confetti"
      headline={<>⌘K palette + <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>confetti</span> for show-stoppers.</>}
      subhead="cmdk: the same component Linear and Vercel use for Cmd-K. Canvas-confetti: 1 line for celebratory moments — approval reveals, milestone reaches."
      tone="var(--amber)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · cmdk command palette" tone="var(--cyan)">
          <Command
            value={value}
            onValueChange={setValue}
            label="Slide search"
            style={{
              width: '100%', maxWidth: 420,
              border: '1px solid var(--cream-hairline)',
              borderRadius: 'var(--radius-lg)',
              background: 'color-mix(in srgb, var(--panel) 90%, transparent)',
              fontSize: 'var(--fs-slide-tagline)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, padding: '10px 14px', borderBottom: '1px solid var(--cream-hairline)' }}>
              <Search size={16} color="var(--cream-faint)" />
              <Command.Input placeholder="Search slides, drugs, frameworks…" style={{
                flex: 1, border: 'none', outline: 'none', background: 'transparent',
                color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-tagline)',
              }} />
            </div>
            <Command.List style={{ maxHeight: 220, overflow: 'auto', padding: 8 }}>
              <Command.Empty style={{ padding: 16, color: 'var(--cream-faint)', textAlign: 'center', fontSize: 'var(--fs-slide-pageno)' }}>
                No matches.
              </Command.Empty>
              <Command.Group heading="Slides" style={{ color: 'var(--cream-faint)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)', textTransform: 'uppercase', letterSpacing: '.08em' }}>
                <PaletteItem icon={Pill} label="Case 01 · ambrisentan" hint="cs1-mechanism" />
                <PaletteItem icon={FlaskConical} label="Case 02 · ivosidenib" hint="cs2-divider" />
                <PaletteItem icon={FileText} label="Case 03 · PharmAgent" hint="cs3-architecture" />
              </Command.Group>
              <Command.Group heading="Actions" style={{ color: 'var(--cream-faint)', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)', textTransform: 'uppercase', letterSpacing: '.08em', marginTop: 8 }}>
                <PaletteItem icon={Sparkles} label="Toggle dark / light" hint="⌘D" />
                <PaletteItem icon={Search} label="Find in notes" hint="⌘F" />
              </Command.Group>
            </Command.List>
          </Command>
        </Frame>

        <Frame title="Variant B · Confetti moment" tone="var(--amber)">
          <button onClick={pop} style={{
            padding: '14px 22px',
            border: '1.5px solid var(--amber)',
            borderRadius: 8,
            background: 'color-mix(in srgb, var(--amber) 14%, var(--panel))',
            color: 'var(--amber)',
            fontFamily: 'var(--font-mono)',
            fontSize: 'var(--fs-slide-tagline)',
            fontWeight: 700,
            cursor: 'pointer',
            display: 'inline-flex', alignItems: 'center', gap: 10,
          }}>
            <PartyPopper size={18} /> Approved!
          </button>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 16, maxWidth: '32ch', textAlign: 'center', lineHeight: 1.5 }}>
            Use sparingly · once per case max · carries no semantics, only delight
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}

function PaletteItem({ icon: Icon, label, hint }) {
  return (
    <Command.Item style={{
      display: 'flex', alignItems: 'center', gap: 10,
      padding: '8px 10px',
      borderRadius: 6,
      cursor: 'pointer',
      color: 'var(--cream)',
      fontFamily: 'var(--font-display)',
    }}>
      <Icon size={14} color="var(--cyan)" />
      <span style={{ flex: 1 }}>{label}</span>
      <span className="deck-mono" style={{ fontSize: 'calc(var(--fs-slide-pageno) * 0.85)', color: 'var(--cream-faint)' }}>{hint}</span>
    </Command.Item>
  );
}
