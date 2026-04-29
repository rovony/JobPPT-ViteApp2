// @ts-nocheck
import React, { useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import * as Switch from '@radix-ui/react-switch';
import * as Slider from '@radix-ui/react-slider';
import * as Tooltip from '@radix-ui/react-tooltip';
import * as Dialog from '@radix-ui/react-dialog';
import { Info, X } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function ShadcnRadixShowcase() {
  const [open, setOpen] = useState(false);
  const [enabled, setEnabled] = useState(true);
  const [value, setValue] = useState([42]);
  return (
    <LibraryShowcase
      category="§3 · Foundation · shadcn/ui + Radix primitives"
      library="@radix-ui/* (shadcn-style)"
      npmInstall="npx shadcn@latest add tabs switch slider tooltip dialog"
      url="ui.shadcn.com · radix-ui.com"
      headline={<>Headless primitives + <span style={{ fontStyle: 'italic', color: 'var(--coral)' }}>copy-paste</span> styling.</>}
      subhead="Radix ships behavior + a11y; you own the styling. shadcn/ui is the convention — copy components into your codebase, customize freely."
      tone="var(--coral)"
    >
      <Tooltip.Provider delayDuration={150}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
          <Frame title="Variant A · Tabs + Switch + Slider" tone="var(--coral)">
            <Tabs.Root defaultValue="poppk" style={{ width: '100%' }}>
              <Tabs.List style={{ display: 'flex', gap: 4, borderBottom: '1px solid var(--cream-hairline)', marginBottom: 12 }}>
                {['poppk', 'pbpk', 'er'].map((v) => (
                  <Tabs.Trigger key={v} value={v} style={{
                    padding: '6px 12px',
                    background: 'transparent',
                    border: 'none',
                    color: 'var(--cream-faint)',
                    cursor: 'pointer',
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-slide-pageno)',
                    textTransform: 'uppercase',
                    borderBottom: '2px solid transparent',
                    letterSpacing: '.08em',
                  }} className="radix-tabs-trigger">
                    {v.toUpperCase()}
                  </Tabs.Trigger>
                ))}
              </Tabs.List>
              <Tabs.Content value="poppk" style={{ color: 'var(--cream)', fontSize: 'var(--fs-slide-pageno)' }}>
                Population PK — non-linear mixed effects. Allometric scaling on CL with prespecified exponent 0.75.
              </Tabs.Content>
              <Tabs.Content value="pbpk" style={{ color: 'var(--cream)', fontSize: 'var(--fs-slide-pageno)' }}>
                Physiology-based PK — Simcyp / GastroPlus. Used for DDI label predictions (CYP3A4 perpetrators).
              </Tabs.Content>
              <Tabs.Content value="er" style={{ color: 'var(--cream)', fontSize: 'var(--fs-slide-pageno)' }}>
                Exposure-response — sigmoidal Emax, dose justification, label range support.
              </Tabs.Content>
            </Tabs.Root>

            <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginTop: 18 }}>
              <Switch.Root
                checked={enabled}
                onCheckedChange={setEnabled}
                style={{
                  width: 36, height: 20,
                  borderRadius: 999,
                  background: enabled ? 'var(--coral)' : 'var(--cream-faint)',
                  position: 'relative', cursor: 'pointer', transition: 'background 0.2s',
                }}
              >
                <Switch.Thumb style={{
                  display: 'block',
                  width: 16, height: 16,
                  background: 'var(--cream)', borderRadius: 999,
                  transform: enabled ? 'translateX(18px)' : 'translateX(2px)',
                  transition: 'transform 0.2s',
                  boxShadow: '0 1px 2px rgba(0,0,0,0.4)',
                }} />
              </Switch.Root>
              <span className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)' }}>
                Bayesian prior · {enabled ? 'enabled' : 'disabled'}
              </span>
            </div>

            <div style={{ marginTop: 18, width: '100%' }}>
              <div className="deck-mono uppercase" style={{ fontSize: 'calc(var(--fs-slide-pageno) * 0.85)', color: 'var(--cream-faint)', marginBottom: 6, letterSpacing: '.08em' }}>
                Dose · {value[0]} mg
              </div>
              <Slider.Root value={value} onValueChange={setValue} min={0} max={100} step={1} style={{ position: 'relative', display: 'flex', alignItems: 'center', height: 18, width: '100%' }}>
                <Slider.Track style={{ background: 'var(--cream-hairline)', position: 'relative', flex: 1, height: 4, borderRadius: 999 }}>
                  <Slider.Range style={{ position: 'absolute', background: 'var(--coral)', height: 4, borderRadius: 999 }} />
                </Slider.Track>
                <Slider.Thumb style={{ display: 'block', width: 14, height: 14, background: 'var(--coral)', borderRadius: 999, cursor: 'grab', boxShadow: '0 1px 4px rgba(0,0,0,0.4)' }} />
              </Slider.Root>
            </div>
          </Frame>

          <Frame title="Variant B · Tooltip + Dialog" tone="var(--violet)">
            <Tooltip.Root>
              <Tooltip.Trigger asChild>
                <button style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '8px 14px', border: '1px solid var(--cream-hairline)', borderRadius: 6, background: 'color-mix(in srgb, var(--panel) 70%, transparent)', color: 'var(--cream)', cursor: 'help' }}>
                  <Info size={14} /> Hover me
                </button>
              </Tooltip.Trigger>
              <Tooltip.Portal>
                <Tooltip.Content side="top" sideOffset={6} style={{ padding: '6px 10px', background: 'var(--cream)', color: 'var(--bg)', borderRadius: 4, fontSize: 'var(--fs-slide-pageno)' }}>
                  Tooltip · positioned via Floating UI · keyboard a11y
                  <Tooltip.Arrow style={{ fill: 'var(--cream)' }} />
                </Tooltip.Content>
              </Tooltip.Portal>
            </Tooltip.Root>

            <Dialog.Root open={open} onOpenChange={setOpen}>
              <Dialog.Trigger asChild>
                <button style={{ marginTop: 18, padding: '8px 14px', border: '1.5px solid var(--violet)', borderRadius: 6, background: 'color-mix(in srgb, var(--violet) 12%, var(--panel))', color: 'var(--violet)', cursor: 'pointer', fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)', fontWeight: 700 }}>
                  Open dialog
                </button>
              </Dialog.Trigger>
              <Dialog.Portal>
                <Dialog.Overlay style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 }} />
                <Dialog.Content style={{
                  position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)',
                  background: 'var(--panel)', color: 'var(--cream)',
                  padding: 24, borderRadius: 12, width: 'min(90vw, 420px)',
                  zIndex: 51, border: '1px solid var(--cream-hairline)',
                  boxShadow: '0 24px 48px rgba(0,0,0,0.5)',
                }}>
                  <Dialog.Title className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', color: 'var(--violet)', fontWeight: 700, marginBottom: 8 }}>
                    Radix Dialog
                  </Dialog.Title>
                  <Dialog.Description className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', lineHeight: 1.5 }}>
                    Focus-trapped, scroll-locked, Escape closes, returns focus to trigger. WAI-ARIA compliant by default.
                  </Dialog.Description>
                  <Dialog.Close asChild>
                    <button style={{ position: 'absolute', top: 12, right: 12, background: 'transparent', border: 'none', color: 'var(--cream-faint)', cursor: 'pointer' }}>
                      <X size={18} />
                    </button>
                  </Dialog.Close>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </Frame>
        </div>
      </Tooltip.Provider>
    </LibraryShowcase>
  );
}
