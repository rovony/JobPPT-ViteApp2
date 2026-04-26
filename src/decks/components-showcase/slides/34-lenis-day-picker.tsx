// @ts-nocheck
import React, { useState } from 'react';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import { format } from 'date-fns';
import { Mouse, MousePointer2 } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function LenisDayPickerShowcase() {
  const [selected, setSelected] = useState<Date | undefined>(new Date(2024, 11, 24));

  return (
    <LibraryShowcase
      category="§5A / §5D · Smooth scroll + date selection"
      library="lenis + react-day-picker + date-fns"
      npmInstall="npm install lenis react-day-picker date-fns"
      url="lenis.dev · react-day-picker.js.org · date-fns.org"
      headline={<>Awwwards-tier scroll + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>headless</span> date picker.</>}
      subhead="Lenis: industry-default smooth scroll (premium feel). React Day Picker: headless, accessible date picker. Date-fns: tree-shakeable replacement for moment.js."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Smooth scroll concept (lenis)" tone="var(--cyan)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14, alignItems: 'flex-start' }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
              <Mouse size={32} color="var(--cyan)" strokeWidth={1.5} />
              <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cyan)' }}>Lenis enables silky scroll lerp</span>
            </div>
            <pre style={{
              fontSize: 'var(--fs-slide-pageno)',
              fontFamily: 'var(--font-mono)',
              color: 'var(--cream)',
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              padding: 12,
              borderRadius: 6,
              border: '1px solid var(--cream-hairline)',
              width: '100%', overflow: 'auto',
              lineHeight: 1.5,
            }}>{`import Lenis from 'lenis';

const lenis = new Lenis({ duration: 1.2 });
function raf(time) {
  lenis.raf(time);
  requestAnimationFrame(raf);
}
requestAnimationFrame(raf);`}</pre>
            <div style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', lineHeight: 1.5 }}>
              Used by Awwwards SOTD winners. Disable inside iframes / scroll containers per their docs.
            </div>
          </div>
        </Frame>

        <Frame title="Variant B · react-day-picker + date-fns" tone="var(--violet)">
          <DayPicker
            mode="single"
            selected={selected}
            onSelect={setSelected}
            modifiersStyles={{ selected: { backgroundColor: 'var(--violet)', color: 'var(--cream)' } }}
            styles={{
              months: { color: 'var(--cream)', fontFamily: 'var(--font-display)' },
              caption: { color: 'var(--violet)', fontWeight: 700 },
              head: { color: 'var(--cream-faint)', fontFamily: 'var(--font-mono)', fontSize: 11 },
              day: { color: 'var(--cream)', fontFamily: 'var(--font-mono)', fontSize: 12 },
            }}
          />
          <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--violet)', marginTop: 8 }}>
            Selected: {selected ? format(selected, 'PP') : '—'}
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
