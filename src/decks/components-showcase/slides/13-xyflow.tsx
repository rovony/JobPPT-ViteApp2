// @ts-nocheck
import React from 'react';
import { ReactFlow, Background, Controls, MarkerType } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import LibraryShowcase from '../_LibraryShowcase';

const nodeStyle = {
  border: '1.5px solid var(--cyan)',
  background: 'color-mix(in srgb, var(--cyan) 8%, var(--panel))',
  color: 'var(--cream)',
  padding: '8px 14px',
  borderRadius: 8,
  fontSize: 13,
  fontFamily: 'var(--font-display)',
  boxShadow: '0 4px 12px rgba(0,0,0,0.18)',
};

const nodes = [
  { id: 'pop', position: { x: 0,   y: 100 }, data: { label: 'PopPK fit (NONMEM)' }, style: nodeStyle },
  { id: 'cov', position: { x: 240, y: 100 }, data: { label: 'Covariate screen' },  style: nodeStyle },
  { id: 'sim', position: { x: 480, y: 0   }, data: { label: 'Sim 1000 patients' }, style: nodeStyle },
  { id: 'pbpk',position: { x: 480, y: 200 }, data: { label: 'PBPK midazolam DDI' },style: nodeStyle },
  { id: 'sub', position: { x: 720, y: 100 }, data: { label: 'Submit · CDSCO' },    style: { ...nodeStyle, border: '1.5px solid var(--amber)', background: 'color-mix(in srgb, var(--amber) 12%, var(--panel))' } },
];

const edges = [
  { id: 'e1', source: 'pop', target: 'cov', animated: true, style: { stroke: 'var(--cyan)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--cyan)' } },
  { id: 'e2', source: 'cov', target: 'sim', animated: true, style: { stroke: 'var(--cyan)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--cyan)' } },
  { id: 'e3', source: 'cov', target: 'pbpk', animated: true, style: { stroke: 'var(--cyan)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--cyan)' } },
  { id: 'e4', source: 'sim', target: 'sub', animated: true, style: { stroke: 'var(--amber)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--amber)' } },
  { id: 'e5', source: 'pbpk', target: 'sub', animated: true, style: { stroke: 'var(--amber)' }, markerEnd: { type: MarkerType.ArrowClosed, color: 'var(--amber)' } },
];

export default function XyflowShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · workflows"
      library="@xyflow/react"
      npmInstall="npm install @xyflow/react"
      url="reactflow.dev (now @xyflow)"
      headline={<>Process workflows + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>regulatory pathways</span> as nodes.</>}
      subhead="Drag-able, zoom-able, animated edges. Use for compartment models, regulatory submission paths, and decision trees. Replaces hand-drawn boxes-and-arrows."
      tone="var(--cyan)"
      noteBelow="Nodes drag · pan + zoom controls live · animated edges show flow direction"
    >
      <div style={{ flex: 1, minHeight: 0, width: '100%', border: '1px solid var(--cream-hairline)', borderRadius: 'var(--radius-lg)', overflow: 'hidden' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          fitView
          proOptions={{ hideAttribution: true }}
          style={{ background: 'var(--panel)' }}
        >
          <Background color="var(--cream-hairline)" gap={20} />
          <Controls />
        </ReactFlow>
      </div>
    </LibraryShowcase>
  );
}
