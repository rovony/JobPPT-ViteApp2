import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';
import { Equation, InlineMath, PKCompartmentModel } from '@/components/deck/scientific';

/**
 * ScientificPage — showcases high-fidelity scientific primitives:
 * KaTeX-rendered equations and React Flow PK compartment models.
 */

const PK_NODES = [
  { id: 'depot', data: { label: 'Depot', kind: 'depot' }, position: { x: 0,   y: 140 } },
  { id: 'vc',    data: { label: 'V_c',   kind: 'central', volume: '24 L' }, position: { x: 220, y: 140 } },
  { id: 'vp',    data: { label: 'V_p',   kind: 'peripheral', volume: '86 L' }, position: { x: 440, y: 30  } },
  { id: 'elim',  data: { label: '∅',     kind: 'elimination' }, position: { x: 440, y: 240 } },
];

const PK_EDGES = [
  { id: 'e1', source: 'depot', target: 'vc',  data: { rate: 'k_a',     color: 'var(--sage)', speed: 'fast' } },
  { id: 'e2', source: 'vc',    target: 'vp',  data: { rate: 'k_{12}',  color: 'var(--cyan)', speed: 'medium' } },
  { id: 'e3', source: 'vp',    target: 'vc',  data: { rate: 'k_{21}',  color: 'var(--cyan)', speed: 'medium' } },
  { id: 'e4', source: 'vc',    target: 'elim',data: { rate: 'CL/V_c',  color: 'var(--amber)',speed: 'slow' } },
];

export default function ScientificPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Scientific"
        title="Equations & PK Models"
        description="High-fidelity scientific notation (KaTeX) and interactive pharmacokinetic compartment diagrams (React Flow). Both deck-themed and token-driven."
      />

      <ComponentShowcase
        name="Equation"
        importPath="@/components/deck/scientific"
        description="Block-level KaTeX formula with optional caption and equation number. Graceful fallback if the LaTeX fails to parse."
        props={[
          { name: 'latex',    type: 'string',  desc: 'LaTeX source', required: true },
          { name: 'caption',  type: 'string',  desc: 'Italic description beneath the equation' },
          { name: 'number',   type: 'string',  desc: 'Equation number · e.g. "Eq. 1"' },
          { name: 'align',    type: '"left" | "center"', desc: 'Horizontal alignment · default "center"' },
          { name: 'size',     type: '"display" | "lead" | "body"', desc: 'Type scale · default "display"' },
          { name: 'delay',    type: 'number',  desc: 'Entrance delay · default 0.3' },
        ]}
        example={`<Equation
  latex="C(t) = \\frac{D}{V_d}\\, e^{-k_e t}"
  caption="Plasma concentration decay · one-compartment model"
  number="Eq. 1"
/>`}
        previewHeight={240}
      >
        <Equation
          latex={String.raw`C(t) = \frac{D}{V_d}\, e^{-k_e t}`}
          caption="Plasma concentration decay · one-compartment model"
          number="Eq. 1"
        />
      </ComponentShowcase>

      <ComponentShowcase
        name="InlineMath"
        importPath="@/components/deck/scientific"
        description="Mid-sentence math. Inherits color from surrounding text so it blends into any prose."
        props={[
          { name: 'children', type: 'string', desc: 'LaTeX source as a string', required: true },
        ]}
        example={`<p>The volume of distribution <InlineMath>{'V_d = D / C_0'}</InlineMath> is calculated at steady state.</p>`}
        previewHeight={120}
      >
        <p
          className="deck-body"
          style={{
            fontSize: 'var(--fs-body-lg)',
            color: 'var(--cream)',
            maxWidth: 520,
            textAlign: 'center',
            margin: 0,
          }}
        >
          The volume of distribution{' '}
          <InlineMath>{String.raw`V_d = D / C_0`}</InlineMath>
          {' '}is calculated at steady state.
        </p>
      </ComponentShowcase>

      <ComponentShowcase
        name="PKCompartmentModel"
        importPath="@/components/deck/scientific"
        description="React Flow compartment diagram with animated flux particles riding edges. Static by default (locked for presentation); pass interactive={true} to enable dragging and connecting."
        props={[
          { name: 'nodes',       type: 'Node[]',  desc: 'Compartments · {id, data:{label, kind, volume?}, position}', required: true },
          { name: 'edges',       type: 'Edge[]',  desc: 'Flows · {id, source, target, data:{rate, color, speed}}', required: true },
          { name: 'interactive', type: 'boolean', desc: 'Enable drag/connect · default false' },
          { name: 'fitView',     type: 'boolean', desc: 'Auto-fit on mount · default true' },
        ]}
        example={`<PKCompartmentModel
  nodes={[
    { id: 'depot', data: { label: 'Depot', kind: 'depot' }, position: { x: 0, y: 200 } },
    { id: 'vc',    data: { label: 'V_c', kind: 'central', volume: '24 L' }, position: { x: 260, y: 200 } },
    { id: 'vp',    data: { label: 'V_p', kind: 'peripheral' }, position: { x: 520, y: 80 } },
    { id: 'elim',  data: { label: '∅', kind: 'elimination' }, position: { x: 520, y: 320 } },
  ]}
  edges={[
    { id: 'e1', source: 'depot', target: 'vc', data: { rate: 'k_a', color: 'var(--sage)', speed: 'fast' } },
    { id: 'e2', source: 'vc', target: 'vp', data: { rate: 'k_12', color: 'var(--cyan)', speed: 'medium' } },
    { id: 'e3', source: 'vp', target: 'vc', data: { rate: 'k_21', color: 'var(--cyan)', speed: 'medium' } },
    { id: 'e4', source: 'vc', target: 'elim', data: { rate: 'CL/V_c', color: 'var(--amber)', speed: 'slow' } },
  ]}
/>`}
        previewHeight={380}
      >
        <div style={{ width: '100%', height: '100%' }}>
          <PKCompartmentModel nodes={PK_NODES} edges={PK_EDGES} />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="CompartmentNode (variants)"
        importPath="@/components/deck/scientific/pk-compartment/CompartmentNode"
        description="Internal node type used by PKCompartmentModel. Five kinds encode pharmacological role. Don't render directly — pass kind via node.data."
        props={[
          { name: 'data.kind', type: '"central" | "peripheral" | "depot" | "effect" | "elimination"', desc: 'Pharmacological role (drives color + shape)', required: true },
          { name: 'data.label', type: 'string', desc: 'Short label shown inside the glyph', required: true },
          { name: 'data.volume', type: 'string', desc: 'Optional volume annotation (e.g. "24 L")' },
        ]}
        previewHeight={180}
      >
        <div
          className="deck-mono"
          style={{
            fontSize: 'var(--fs-meta)',
            color: 'var(--cream-muted)',
            letterSpacing: 'var(--ls-mono)',
            lineHeight: 2,
            textAlign: 'left',
          }}
        >
          <div>• <span style={{ color: 'var(--amber)' }}>central</span> — solid ring, case accent</div>
          <div>• <span style={{ color: 'var(--cyan)' }}>peripheral</span> — dashed ring, cyan</div>
          <div>• <span style={{ color: 'var(--sage)' }}>depot</span> — filled disk, sage</div>
          <div>• <span style={{ color: 'var(--violet)' }}>effect</span> — dotted ring, violet</div>
          <div>• <span style={{ color: 'var(--cream-faint)' }}>elimination</span> — open square, faint</div>
        </div>
      </ComponentShowcase>
    </>
  );
}