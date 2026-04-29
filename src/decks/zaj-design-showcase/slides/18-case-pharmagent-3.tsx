import React from 'react';
import { motion } from 'framer-motion';
import SlideGrid, { STANDARD_AREAS } from '@/components/deck/SlideGrid';
import { Eyebrow, Headline, Subhead, Viz, Footer } from '@/components/deck/SlideParts';

const EDITORIAL_EASE = [0.22, 1, 0.36, 1];

export default function Slide18() {
  const l1Nodes = ['Data Mgr', 'NCA', 'Modeler Mgr', 'QC', 'Report'];
  const l2Nodes = ['PopPK', 'PKPD', 'E-R'];
  const stateNodes = ['Context', 'Dataset', 'NCA', 'Modeling', 'QC', 'Audit'];

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS}>
      <Eyebrow color="var(--sage)" delay={0.1}>PharmAgent Beat 3 (Centerpiece)</Eyebrow>
      <Headline delay={0.2} maxChars={60}>
        The architecture.
      </Headline>
      <Subhead delay={0.4} maxChars={90}>
        13 agents · 5 tiers · bidirectional typed state bus.
      </Subhead>
      
      <Viz>
        <div style={{ display: 'flex', flexDirection: 'column', height: '100%', alignItems: 'center', justifyContent: 'space-between', padding: 'var(--space-4) 0' }}>
          
          {/* Tier 1: Maya */}
          <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.8 }} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: 'color-mix(in srgb, var(--rose) 20%, transparent)', border: '2px solid var(--rose)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <span className="deck-display" style={{ color: 'var(--rose)' }}>M</span>
            </div>
          </motion.div>

          <div style={{ width: '2px', height: '24px', background: 'var(--rose)' }} />

          {/* Tier 2: L0 Supervisor */}
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, delay: 1.2 }} style={{ background: 'var(--sage)', padding: 'var(--space-2) var(--space-6)', borderRadius: 'var(--radius-full)' }}>
            <span className="deck-mono" style={{ color: 'var(--panel)', fontWeight: 600 }}>L0 Supervisor</span>
          </motion.div>

          <div style={{ display: 'flex', width: '80%', borderTop: '2px solid var(--sage)', height: '24px', position: 'relative' }}>
             {/* Arrows down to L1 */}
             {[10, 30, 50, 70, 90].map((left, i) => (
                <div key={i} style={{ position: 'absolute', left: `${left}%`, top: 0, width: '2px', height: '100%', background: 'var(--sage)' }} />
             ))}
          </div>

          {/* Tier 3: L1 Row */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'space-around' }}>
            {l1Nodes.map((node, i) => (
              <motion.div key={node} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 1.6 + (i * 0.1) }} style={{ border: '2px solid var(--sage)', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', background: 'var(--panel)', width: '120px', textAlign: 'center' }}>
                <span className="deck-body" style={{ color: 'var(--cream)', fontSize: '14px' }}>{node}</span>
              </motion.div>
            ))}
          </div>

          {/* Connection Modeler Mgr -> L2 */}
          <div style={{ display: 'flex', width: '100%', justifyContent: 'center', height: '24px', position: 'relative' }}>
             <div style={{ position: 'absolute', left: '50%', width: '2px', height: '100%', background: 'var(--sage)' }} />
             <div style={{ position: 'absolute', top: '100%', left: '40%', width: '20%', borderTop: '2px solid var(--sage)' }} />
          </div>

          {/* Tier 4: L2 Row */}
          <div style={{ display: 'flex', width: '60%', justifyContent: 'space-around' }}>
            {l2Nodes.map((node, i) => (
              <motion.div key={node} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 2.2 + (i * 0.1) }} style={{ border: '1px solid var(--sage)', borderStyle: 'dashed', padding: 'var(--space-2) var(--space-4)', borderRadius: 'var(--radius-full)', background: 'var(--panel)' }}>
                <span className="deck-body" style={{ color: 'var(--cream-muted)', fontSize: '14px' }}>{node}</span>
              </motion.div>
            ))}
          </div>

          {/* Bidirectional bus connections */}
          <div style={{ width: '100%', height: '40px', position: 'relative' }}>
             <svg width="100%" height="100%" style={{ position: 'absolute' }}>
                <motion.path initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.0, delay: 2.6 }} d="M 100 0 L 100 40 M 300 0 L 300 40 M 500 0 L 500 40 M 700 0 L 700 40 M 900 0 L 900 40" stroke="var(--sage)" strokeWidth="2" fill="none" opacity="0.3" markerEnd="url(#arrowhead)" markerStart="url(#arrowstart)" />
                
                <defs>
                  <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--sage)" opacity="0.3" />
                  </marker>
                  <marker id="arrowstart" markerWidth="10" markerHeight="7" refX="1" refY="3.5" orient="auto-start-reverse">
                    <polygon points="0 0, 10 3.5, 0 7" fill="var(--sage)" opacity="0.3" />
                  </marker>
                </defs>
             </svg>
          </div>

          {/* Tier 5: PharmState Bus */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 3.0 }} style={{ width: '100%', background: 'color-mix(in srgb, var(--sage) 10%, transparent)', border: '1px solid var(--sage)', borderRadius: 'var(--radius-md)', display: 'flex' }}>
            {stateNodes.map((state, i) => (
              <div key={state} style={{ flex: 1, padding: 'var(--space-3) 0', textAlign: 'center', borderRight: i !== stateNodes.length - 1 ? '1px solid var(--cream-hairline)' : 'none' }}>
                <span className="deck-mono" style={{ color: 'var(--sage)', fontSize: '12px', letterSpacing: '0.05em' }}>{state}</span>
              </div>
            ))}
          </motion.div>

        </div>
      </Viz>
      <Footer delay={3.5} kicker="PharmAgent Explainer" source="case-pharmagent.md" />
    </SlideGrid>
  );
}
