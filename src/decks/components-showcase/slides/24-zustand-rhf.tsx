// @ts-nocheck
import React from 'react';
import { create } from 'zustand';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { CheckCircle2, AlertCircle, Plus, Minus } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

// ── ZUSTAND STORE ──
const useCounter = create<{ count: number; bump: () => void; reset: () => void; drop: () => void }>((set) => ({
  count: 0,
  bump: () => set((s) => ({ count: s.count + 1 })),
  drop: () => set((s) => ({ count: Math.max(0, s.count - 1) })),
  reset: () => set({ count: 0 }),
}));

// ── ZOD SCHEMA + FORM ──
const schema = z.object({
  patientId: z.string().min(3, 'Min 3 chars').regex(/^[A-Z0-9-]+$/, 'Uppercase + digits only'),
  weight: z.coerce.number().positive('Must be > 0').max(200, 'Max 200 kg'),
  ageGroup: z.enum(['neonate', 'infant', 'child', 'adolescent']),
});
type FormData = z.infer<typeof schema>;

export default function ZustandFormShowcase() {
  const { count, bump, drop, reset } = useCounter();
  const { register, handleSubmit, formState: { errors, isSubmitSuccessful } } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { patientId: '', weight: 30, ageGroup: 'child' },
  });

  return (
    <LibraryShowcase
      category="§5D / §5E · App state + forms"
      library="zustand + react-hook-form + zod"
      npmInstall="npm install zustand react-hook-form zod @hookform/resolvers"
      url="zustand-demo.pmnd.rs · react-hook-form.com · zod.dev"
      headline={<>State + forms + <span style={{ color: 'var(--sage)', fontStyle: 'italic' }}>runtime validation</span> — 6 KB total.</>}
      subhead="Zustand: 2-KB global store (alternative to Redux). React Hook Form: uncontrolled forms. Zod: TypeScript-first runtime validation."
      tone="var(--sage)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Zustand counter" tone="var(--sage)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div className="deck-display" style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', fontWeight: 700, color: 'var(--sage)', lineHeight: 1, fontVariantNumeric: 'tabular-nums' }}>
              {count}
            </div>
            <div style={{ display: 'flex', gap: 8 }}>
              <button onClick={drop} style={btn('var(--coral)')}><Minus size={18} /></button>
              <button onClick={reset} style={{ ...btn('var(--cream-faint)'), padding: '8px 16px' }}>reset</button>
              <button onClick={bump} style={btn('var(--sage)')}><Plus size={18} /></button>
            </div>
            <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
              global state · 2 KB · no boilerplate
            </div>
          </div>
        </Frame>

        <Frame title="Variant B · RHF + Zod form" tone="var(--cyan)">
          <form
            onSubmit={handleSubmit((data) => alert('Form valid! ' + JSON.stringify(data)))}
            style={{ width: '100%', maxWidth: 380, display: 'flex', flexDirection: 'column', gap: 12 }}
          >
            <Field label="Patient ID" error={errors.patientId?.message}>
              <input {...register('patientId')} placeholder="P-001" style={input(errors.patientId)} />
            </Field>
            <Field label="Weight (kg)" error={errors.weight?.message}>
              <input type="number" step="0.1" {...register('weight')} style={input(errors.weight)} />
            </Field>
            <Field label="Age group" error={errors.ageGroup?.message}>
              <select {...register('ageGroup')} style={input(errors.ageGroup)}>
                <option value="neonate">Neonate (0–28 d)</option>
                <option value="infant">Infant (1–12 mo)</option>
                <option value="child">Child (1–12 y)</option>
                <option value="adolescent">Adolescent (12–17 y)</option>
              </select>
            </Field>
            <button type="submit" style={{ ...btn('var(--cyan)'), padding: '10px 16px', marginTop: 8, fontFamily: 'var(--font-mono)', fontWeight: 700 }}>
              Validate + submit
            </button>
            {isSubmitSuccessful && (
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, color: 'var(--sage)', fontSize: 'var(--fs-slide-pageno)' }}>
                <CheckCircle2 size={14} /> Submitted
              </div>
            )}
          </form>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}

function btn(color: string) {
  return {
    border: `1.5px solid ${color}`,
    background: `color-mix(in srgb, ${color} 12%, var(--panel))`,
    color, padding: 8, borderRadius: 6,
    cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)',
  } as React.CSSProperties;
}

function input(error: any) {
  return {
    width: '100%',
    padding: '8px 10px',
    border: error ? '1.5px solid var(--coral)' : '1px solid var(--cream-hairline)',
    borderRadius: 6,
    background: 'color-mix(in srgb, var(--panel) 70%, transparent)',
    color: 'var(--cream)',
    fontFamily: 'var(--font-mono)',
    fontSize: 'var(--fs-slide-pageno)',
  } as React.CSSProperties;
}

function Field({ label, error, children }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
      <span className="deck-mono uppercase" style={{ fontSize: 'calc(var(--fs-slide-pageno) * 0.85)', color: 'var(--cream-faint)', letterSpacing: 'var(--ls-mono-wide)' }}>
        {label}
      </span>
      {children}
      {error && (
        <span style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--coral)', display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          <AlertCircle size={12} /> {error}
        </span>
      )}
    </label>
  );
}
