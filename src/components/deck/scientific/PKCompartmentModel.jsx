import React, { useCallback, useMemo } from 'react';
import {
  ReactFlow, ReactFlowProvider, Background, Controls,
  addEdge, useNodesState, useEdgesState, MarkerType,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import CompartmentNode from './pk-compartment/CompartmentNode';
import FlowEdge from './pk-compartment/FlowEdge';

/**
 * PKCompartmentModel — a global, slide-ready component for rendering
 * interactive pharmacokinetic compartment diagrams.
 *
 * Usage (static presentation, most common):
 *   <PKCompartmentModel
 *     nodes={[
 *       { id: 'depot', data: { label: 'Depot', kind: 'depot' }, position: { x: 0, y: 200 } },
 *       { id: 'vc',    data: { label: 'V_c',   kind: 'central', volume: '24 L' }, position: { x: 260, y: 200 } },
 *       { id: 'vp',    data: { label: 'V_p',   kind: 'peripheral', volume: '86 L' }, position: { x: 520, y: 80 } },
 *       { id: 'elim',  data: { label: '∅',     kind: 'elimination' }, position: { x: 520, y: 320 } },
 *     ]}
 *     edges={[
 *       { id: 'e1', source: 'depot', target: 'vc', data: { rate: 'k_a',   color: 'var(--sage)',  speed: 'fast' } },
 *       { id: 'e2', source: 'vc',    target: 'vp', data: { rate: 'k_12',  color: 'var(--cyan)',  speed: 'medium' } },
 *       { id: 'e3', source: 'vp',    target: 'vc', data: { rate: 'k_21',  color: 'var(--cyan)',  speed: 'medium' } },
 *       { id: 'e4', source: 'vc',    target: 'elim', data: { rate: 'CL/V_c', color: 'var(--case)', speed: 'slow' } },
 *     ]}
 *   />
 *
 * Modes:
 *   · interactive={false} (default) — locked-down presentation mode:
 *     no dragging, no zooming, no connect. Animated flux particles stay on.
 *   · interactive={true}            — full edit: drag nodes, draw edges.
 *                                     Useful when a slide or editor lets
 *                                     the presenter live-build the model.
 *
 * What this component OWNS:
 *   · Custom nodeTypes / edgeTypes so callers pass plain data, not JSX.
 *   · Sensible defaults for markerEnd (arrowhead) + deck-themed background.
 *   · ReactFlowProvider wrapping so multiple instances coexist per slide.
 *
 * What this component does NOT do:
 *   · Simulate the PK math. Edge rate labels are for display only; any
 *     simulation/curve should live in a sibling chart (e.g. PKCurve viz).
 *   · Persist edits. Interactive mode is local state; wrap it in a
 *     controlled parent if you need to save a custom diagram.
 */
const nodeTypes = { compartment: CompartmentNode };
const edgeTypes = { flow: FlowEdge };

const defaultEdgeOptions = {
  type: 'flow',
  markerEnd: { type: MarkerType.ArrowClosed, color: 'currentColor' },
};

function PKCompartmentModelInner({
  nodes: initialNodes,
  edges: initialEdges,
  interactive = false,
  fitView = true,
  style,
  className,
}) {
  // Normalize nodes to use our custom compartment type unless caller overrode.
  const normalizedNodes = useMemo(
    () => initialNodes.map((n) => ({ type: 'compartment', ...n })),
    [initialNodes],
  );
  const normalizedEdges = useMemo(
    () => initialEdges.map((e) => ({ type: 'flow', ...e })),
    [initialEdges],
  );

  const [nodes, , onNodesChange] = useNodesState(normalizedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(normalizedEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge({ ...defaultEdgeOptions, ...params }, eds)),
    [setEdges],
  );

  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        minHeight: 320,
        background: 'var(--panel)',
        border: '1px solid var(--cream-hairline)',
        borderRadius: 'var(--radius-md)',
        overflow: 'hidden',
        ...style,
      }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={interactive ? onNodesChange : undefined}
        onEdgesChange={interactive ? onEdgesChange : undefined}
        onConnect={interactive ? onConnect : undefined}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        defaultEdgeOptions={defaultEdgeOptions}
        fitView={fitView}
        fitViewOptions={{ padding: 0.2 }}
        nodesDraggable={interactive}
        nodesConnectable={interactive}
        elementsSelectable={interactive}
        panOnDrag={interactive}
        zoomOnScroll={interactive}
        zoomOnPinch={interactive}
        zoomOnDoubleClick={interactive}
        proOptions={{ hideAttribution: true }}
      >
        <Background
          color="var(--cream-hairline)"
          gap={32}
          size={1}
          style={{ background: 'var(--panel)' }}
        />
        {interactive && <Controls showInteractive={false} />}
      </ReactFlow>
    </div>
  );
}

export default function PKCompartmentModel(props) {
  return (
    <ReactFlowProvider>
      <PKCompartmentModelInner {...props} />
    </ReactFlowProvider>
  );
}