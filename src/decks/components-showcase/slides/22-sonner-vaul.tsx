// @ts-nocheck
import React, { useState } from 'react';
import { toast, Toaster } from 'sonner';
import { Drawer } from 'vaul';
import { CheckCircle2, AlertTriangle, XCircle, ChevronUp } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function SonnerVaulShowcase() {
  const [open, setOpen] = useState(false);
  return (
    <LibraryShowcase
      category="§5B · Marketing + app chrome"
      library="sonner + vaul"
      npmInstall="npm install sonner vaul"
      url="sonner.emilkowal.ski · vaul.emilkowal.ski"
      headline={<>Toasts + <span style={{ color: 'var(--violet)', fontStyle: 'italic' }}>bottom drawers</span> — modern feedback chrome.</>}
      subhead="Sonner: industry-standard toast notifications. Vaul: bottom-drawer modal that feels native on mobile. Both by Emil Kowalski."
      tone="var(--violet)"
      noteBelow="Click any toast button — notifications appear bottom-right · click 'Open drawer' for the vaul demo"
    >
      <Toaster position="bottom-right" richColors theme="dark" />
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · sonner toasts" tone="var(--violet)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10, width: '100%', maxWidth: 320 }}>
            <ToastBtn icon={CheckCircle2} color="var(--sage)" label="Success" onClick={() => toast.success('PopPK fit converged in 47 iterations')} />
            <ToastBtn icon={AlertTriangle} color="var(--amber)" label="Warning" onClick={() => toast.warning('Eta-shrinkage on V₂ at 28% — re-evaluate covariates')} />
            <ToastBtn icon={XCircle} color="var(--coral)" label="Error" onClick={() => toast.error('NONMEM termination · MINIMIZATION TERMINATED')} />
            <ToastBtn icon={CheckCircle2} color="var(--cyan)" label="Info" onClick={() => toast.info('Loading 253-patient PopPK dataset…')} />
          </div>
        </Frame>

        <Frame title="Variant B · vaul bottom drawer" tone="var(--cyan)">
          <Drawer.Root open={open} onOpenChange={setOpen}>
            <Drawer.Trigger asChild>
              <button style={{
                padding: '12px 20px',
                border: '1.5px solid var(--cyan)',
                borderRadius: 8,
                background: 'color-mix(in srgb, var(--cyan) 12%, var(--panel))',
                color: 'var(--cyan)',
                fontFamily: 'var(--font-mono)',
                fontSize: 'var(--fs-slide-tagline)',
                fontWeight: 700,
                cursor: 'pointer',
                display: 'inline-flex', alignItems: 'center', gap: 10,
              }}>
                <ChevronUp size={18} /> Open drawer
              </button>
            </Drawer.Trigger>
            <Drawer.Portal>
              <Drawer.Overlay style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.6)', zIndex: 50 }} />
              <Drawer.Content style={{
                background: 'var(--panel)', color: 'var(--cream)',
                position: 'fixed', bottom: 0, left: 0, right: 0,
                height: '50vh', maxHeight: '90vh',
                borderTopLeftRadius: 16, borderTopRightRadius: 16,
                padding: 24,
                zIndex: 51,
                display: 'flex', flexDirection: 'column', gap: 12,
              }}>
                <div aria-hidden style={{ width: 48, height: 4, background: 'var(--cream-faint)', borderRadius: 2, alignSelf: 'center' }} />
                <Drawer.Title className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', color: 'var(--cyan)', fontWeight: 700 }}>
                  Drawer header
                </Drawer.Title>
                <p className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', maxWidth: '52ch', lineHeight: 1.5 }}>
                  Vaul drawers feel like a native iOS sheet — drag-to-dismiss, snap points, body-scroll lock. Perfect for mobile-first modal UX.
                </p>
                <button onClick={() => setOpen(false)} style={{ marginTop: 'auto', alignSelf: 'flex-start', padding: '8px 16px', border: '1px solid var(--cream-hairline)', borderRadius: 6, background: 'transparent', color: 'var(--cream)', cursor: 'pointer' }}>
                  Close
                </button>
              </Drawer.Content>
            </Drawer.Portal>
          </Drawer.Root>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}

function ToastBtn({ icon: Icon, color, label, onClick }) {
  return (
    <button onClick={onClick} style={{
      padding: '10px 14px',
      border: `1px solid ${color}`,
      borderRadius: 6,
      background: `color-mix(in srgb, ${color} 8%, var(--panel))`,
      color, fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)', fontWeight: 700,
      cursor: 'pointer',
      display: 'inline-flex', alignItems: 'center', gap: 8,
    }}>
      <Icon size={14} />
      Trigger {label}
    </button>
  );
}
