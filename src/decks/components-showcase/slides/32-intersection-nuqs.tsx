// @ts-nocheck
import React from 'react';
import { useInView } from 'react-intersection-observer';
import { motion, useReducedMotion } from 'framer-motion';
import { useQueryState } from 'nuqs';
import { Link2 } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const SECTIONS = [
  { id: 's1', title: 'Section 01 · Discovery', body: '2008 — IDH1/IDH2 mutations identified in AML. The biology is named.', tone: 'var(--cyan)' },
  { id: 's2', title: 'Section 02 · First-in-class', body: 'Aug 2017 — enasidenib FDA approval. The race begins.', tone: 'var(--coral)' },
  { id: 's3', title: 'Section 03 · Class maturation', body: '2018–2024 — five approvals, three sponsors, four indications.', tone: 'var(--violet)' },
];

function Reveal({ tone, children }) {
  const reduce = useReducedMotion();
  const { ref, inView } = useInView({ threshold: 0.4, triggerOnce: false });
  return (
    <div ref={ref} style={{
      padding: 'var(--space-4)',
      border: `1.5px solid ${tone}`,
      borderLeft: `4px solid ${tone}`,
      borderRadius: 8,
      background: `color-mix(in srgb, ${tone} 8%, var(--panel))`,
    }}>
      <motion.div
        initial={reduce ? false : { opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0.2, y: 10 }}
        transition={{ duration: 0.6, ease: [0.2, 0.7, 0.3, 1] }}
      >
        {children}
      </motion.div>
    </div>
  );
}

export default function IntersectionNuqsShowcase() {
  const [tab, setTab] = useQueryState('demo-tab', { defaultValue: 'overview' });
  return (
    <LibraryShowcase
      category="§5A · URL state + scroll reveals"
      library="react-intersection-observer + nuqs"
      npmInstall="npm install react-intersection-observer nuqs"
      url="github.com/thebuilder/react-intersection-observer · nuqs.47ng.com"
      headline={<>URL-state for deep-links + <span style={{ color: 'var(--violet)', fontStyle: 'italic' }}>scroll-triggered</span> reveals.</>}
      subhead="Intersection-observer fires when an element enters/exits the viewport. nuqs syncs React state to URL search params — every state change becomes shareable."
      tone="var(--violet)"
      noteBelow="Look at your browser URL ↓ — the Tab buttons mutate ?demo-tab=… · scroll the right column to see reveal animations"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · nuqs URL state" tone="var(--violet)">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12 }}>
            <div style={{ display: 'flex', gap: 6 }}>
              {['overview', 'data', 'methods', 'sources'].map((t) => (
                <button
                  key={t}
                  onClick={() => setTab(t)}
                  style={{
                    padding: '6px 12px',
                    border: tab === t ? '1.5px solid var(--violet)' : '1px solid var(--cream-hairline)',
                    background: tab === t ? 'color-mix(in srgb, var(--violet) 14%, var(--panel))' : 'transparent',
                    color: tab === t ? 'var(--violet)' : 'var(--cream-faint)',
                    borderRadius: 6,
                    fontFamily: 'var(--font-mono)',
                    fontSize: 'var(--fs-slide-pageno)',
                    cursor: 'pointer',
                  }}
                >
                  {t}
                </button>
              ))}
            </div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 10px', border: '1px dashed var(--violet)', borderRadius: 6, fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-slide-pageno)', color: 'var(--violet)' }}>
              <Link2 size={12} /> ?demo-tab={tab}
            </div>
            <div style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', maxWidth: '36ch', lineHeight: 1.5 }}>
              Refresh the page or share the URL — the tab persists. Same hook handles arrays, JSON, and history modes.
            </div>
          </div>
        </Frame>
        <Frame title="Variant B · Scroll reveal stack" tone="var(--cyan)">
          <div style={{ overflow: 'auto', height: '100%', width: '100%', display: 'flex', flexDirection: 'column', gap: 12, padding: 4 }}>
            {SECTIONS.map((s) => (
              <Reveal key={s.id} tone={s.tone}>
                <div className="deck-mono uppercase" style={{ fontSize: 'var(--fs-slide-pageno)', color: s.tone, letterSpacing: '.08em' }}>{s.title}</div>
                <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', marginTop: 6, lineHeight: 1.5 }}>{s.body}</div>
              </Reveal>
            ))}
            <div style={{ height: 80, color: 'var(--cream-faint)', fontSize: 'var(--fs-slide-pageno)', textAlign: 'center', paddingTop: 24 }}>
              ↑ scroll up to re-trigger reveal
            </div>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
