// @ts-nocheck
import React, { useRef } from 'react';
import { AnimatedBeam } from '@/components/magicui/animated-beam';

const NodeBox = React.forwardRef<HTMLDivElement, { label: string; tone?: string }>(
  ({ label, tone = 'var(--coral)' }, ref) => (
    <div
      ref={ref}
      className="deck-mono uppercase"
      style={{
        zIndex: 10,
        padding: 'var(--space-2) var(--space-3)',
        background: `color-mix(in srgb, ${tone} 14%, var(--panel))`,
        border: `1.5px solid ${tone}`,
        borderRadius: 'var(--radius-md)',
        fontSize: 'var(--fs-slide-eyebrow)',
        letterSpacing: 'var(--ls-mono-wide)',
        color: tone,
        whiteSpace: 'nowrap',
      }}
    >
      {label}
    </div>
  ),
);

function VariantA() {
  // Linear pathway A → B → C
  const containerRef = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  const c = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 120, padding: '0 var(--space-4)' }}>
      <NodeBox ref={a} label="ET-1" tone="var(--coral)" />
      <NodeBox ref={b} label="ETA" tone="var(--amber)" />
      <NodeBox ref={c} label="Vasoconstriction" tone="var(--coral)" />
      <AnimatedBeam containerRef={containerRef} fromRef={a} toRef={b} duration={3} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
      <AnimatedBeam containerRef={containerRef} fromRef={b} toRef={c} duration={3} delay={0.5} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
    </div>
  );
}

function VariantB() {
  // Hub-and-spoke
  const containerRef = useRef<HTMLDivElement>(null);
  const hub = useRef<HTMLDivElement>(null);
  const s1 = useRef<HTMLDivElement>(null);
  const s2 = useRef<HTMLDivElement>(null);
  const s3 = useRef<HTMLDivElement>(null);
  const s4 = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gridTemplateRows: '1fr 1fr 1fr', height: 200, gap: 'var(--space-2)' }}>
      <div style={{ gridColumn: 1, gridRow: 1, justifySelf: 'start', alignSelf: 'start' }}>
        <NodeBox ref={s1} label="SMC proliferation" tone="var(--coral)" />
      </div>
      <div style={{ gridColumn: 3, gridRow: 1, justifySelf: 'end', alignSelf: 'start' }}>
        <NodeBox ref={s2} label="Vasoconstriction" tone="var(--coral)" />
      </div>
      <div style={{ gridColumn: 2, gridRow: 2, justifySelf: 'center', alignSelf: 'center' }}>
        <NodeBox ref={hub} label="ETA receptor" tone="var(--amber)" />
      </div>
      <div style={{ gridColumn: 1, gridRow: 3, justifySelf: 'start', alignSelf: 'end' }}>
        <NodeBox ref={s3} label="Inflammation" tone="var(--coral)" />
      </div>
      <div style={{ gridColumn: 3, gridRow: 3, justifySelf: 'end', alignSelf: 'end' }}>
        <NodeBox ref={s4} label="Fibrosis" tone="var(--coral)" />
      </div>
      <AnimatedBeam containerRef={containerRef} fromRef={hub} toRef={s1} curvature={-30} duration={4} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
      <AnimatedBeam containerRef={containerRef} fromRef={hub} toRef={s2} curvature={-30} duration={4} delay={0.4} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
      <AnimatedBeam containerRef={containerRef} fromRef={hub} toRef={s3} curvature={30} duration={4} delay={0.8} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
      <AnimatedBeam containerRef={containerRef} fromRef={hub} toRef={s4} curvature={30} duration={4} delay={1.2} pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--coral)" />
    </div>
  );
}

function VariantC() {
  // Curved bidirectional
  const containerRef = useRef<HTMLDivElement>(null);
  const a = useRef<HTMLDivElement>(null);
  const b = useRef<HTMLDivElement>(null);
  return (
    <div ref={containerRef} style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 140, padding: '0 var(--space-4)' }}>
      <NodeBox ref={a} label="ET-1" tone="var(--coral)" />
      <NodeBox ref={b} label="ETA" tone="var(--amber)" />
      <AnimatedBeam containerRef={containerRef} fromRef={a} toRef={b} curvature={40} duration={3} pathColor="var(--cream-hairline)" gradientStartColor="var(--coral)" gradientStopColor="var(--amber)" />
      <AnimatedBeam containerRef={containerRef} fromRef={b} toRef={a} curvature={-40} duration={3} delay={0.5} reverse pathColor="var(--cream-hairline)" gradientStartColor="var(--amber)" gradientStopColor="var(--cyan)" />
    </div>
  );
}

const Frame: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
  <div style={{
    border: '1px solid var(--cream-hairline)',
    background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
    borderRadius: 'var(--radius-lg)',
    padding: 'var(--space-4)',
    display: 'flex',
    flexDirection: 'column',
    minHeight: 0,
  }}>
    <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-3)' }}>
      {title}
    </div>
    <div style={{ flex: 1, display: 'flex', alignItems: 'center' }}>
      {children}
    </div>
  </div>
);

export default function BeamPathway() {
  return (
    <section className="relative h-[100dvh] w-full overflow-hidden p-8" style={{ background: 'var(--bg)', color: 'var(--cream)' }}>
      <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-eyebrow)', letterSpacing: 'var(--ls-mono-wide)', color: 'var(--amber)', marginBottom: 'var(--space-2)' }}>
        Component · AnimatedBeam · Magic UI
      </div>
      <h2 className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', lineHeight: 'var(--lh-tight)', fontWeight: 500, margin: 0, marginBottom: 'var(--space-5)' }}>
        Three pathway visualizations <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>using one primitive.</span>
      </h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(22rem, 100%), 1fr))', gap: 'var(--space-4)', height: 'calc(100% - 180px)' }}>
        <Frame title="Variant A — Linear cascade">
          <VariantA />
        </Frame>
        <Frame title="Variant B — Hub & spoke">
          <VariantB />
        </Frame>
        <Frame title="Variant C — Curved bidirectional">
          <VariantC />
        </Frame>
      </div>
    </section>
  );
}
