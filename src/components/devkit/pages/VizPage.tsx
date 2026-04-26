// @ts-nocheck
import React from 'react';
import DevKitPageHeader from '../DevKitPageHeader';
import ComponentShowcase from '../ComponentShowcase';
import PKCurve from '@/components/deck/viz/PKCurve';
import TimelineTrack from '@/components/deck/viz/TimelineTrack';
import MonteCarloScatter from '@/components/deck/viz/MonteCarloScatter';
import AgencyStamp from '@/components/deck/viz/AgencyStamp';
import SketchBox from '@/components/deck/viz/SketchBox';

/**
 * VizPage — live previews of the visualization primitives in
 * components/deck/viz/*. Each showcase renders the component with
 * representative props so the visual is immediately recognizable.
 */
export default function VizPage() {
  return (
    <>
      <DevKitPageHeader
        eyebrow="Viz"
        title="Visualization Primitives"
        description="Custom SVG visualizations used across slides. Each preview shows the component running with sample data — the same way it appears in production."
      />

      <ComponentShowcase
        name="PKCurve"
        importPath="@/components/deck/viz/PKCurve"
        description="One-compartment pharmacokinetic concentration-time curve with tick axes and an optional t/label highlight marker. Pure SVG."
        props={[
          { name: 'dose',      type: 'number',                 desc: 'Dose (mg) · default 100' },
          { name: 'ka',        type: 'number',                 desc: 'Absorption rate · default 1.2' },
          { name: 'ke',        type: 'number',                 desc: 'Elimination rate · default 0.25' },
          { name: 'V',         type: 'number',                 desc: 'Volume of distribution (L) · default 20' },
          { name: 'tMax',      type: 'number',                 desc: 'Time horizon (h) · default 24' },
          { name: 'highlight', type: '{ t, label }',           desc: 'Optional marker at time t' },
        ]}
        example={`<PKCurve
  dose={100}
  ka={1.2}
  ke={0.25}
  V={20}
  tMax={24}
  highlight={{ t: 8, label: 'Cmax window' }}
/>`}
        previewHeight={360}
      >
        <PKCurve
          dose={100}
          ka={1.2}
          ke={0.25}
          V={20}
          tMax={24}
          highlight={{ t: 8, label: 'Cmax window' }}
        />
      </ComponentShowcase>

      <ComponentShowcase
        name="TimelineTrack"
        importPath="@/components/deck/viz/TimelineTrack"
        description="Horizontal narrative track with year anchors and milestone dots. Good for career arcs, regulatory timelines, or any chronological sequence."
        props={[
          { name: 'milestones', type: '{ label, sub }[]', desc: 'Ordered milestones; `sub` shows above the dot', required: true },
        ]}
        example={`<TimelineTrack
  milestones={[
    { sub: '2012', label: 'PhD · KU Leuven' },
    { sub: '2015', label: 'Pfizer · Clinical Pharm' },
    { sub: '2019', label: 'FDA · OCP fellow' },
    { sub: '2023', label: 'Independent QP2 lead' },
  ]}
/>`}
        previewHeight={200}
      >
        <TimelineTrack
          milestones={[
            { sub: '2012', label: 'PhD · KU Leuven' },
            { sub: '2015', label: 'Pfizer · Clinical Pharm' },
            { sub: '2019', label: 'FDA · OCP fellow' },
            { sub: '2023', label: 'Independent QP2 lead' },
          ]}
        />
      </ComponentShowcase>

      <ComponentShowcase
        name="MonteCarloScatter"
        importPath="@/components/deck/viz/MonteCarloScatter"
        description="Dense dot-cloud scatter for Monte Carlo exposure simulation. Shows a target therapeutic window as a shaded band with in-band vs out-of-band coloring. Deterministic (seeded)."
        props={[
          { name: 'n',          type: 'number',              desc: 'Number of virtual subjects · default 500' },
          { name: 'seed',       type: 'number',              desc: 'PRNG seed · default 42' },
          { name: 'targetLow',  type: 'number',              desc: 'AUC target band low · default 40' },
          { name: 'targetHigh', type: 'number',              desc: 'AUC target band high · default 90' },
          { name: 'highlight',  type: '{ wt, auc, label }',  desc: 'Optional index patient callout' },
        ]}
        example={`<MonteCarloScatter
  n={500}
  targetLow={40}
  targetHigh={90}
  highlight={{ wt: 22, auc: 55, label: 'Index pt.' }}
/>`}
        previewHeight={400}
      >
        <MonteCarloScatter
          n={400}
          targetLow={40}
          targetHigh={90}
          highlight={{ wt: 22, auc: 55, label: 'Index pt.' }}
        />
      </ComponentShowcase>

      <ComponentShowcase
        name="AgencyStamp"
        importPath="@/components/deck/viz/AgencyStamp"
        description="Passport-style circular stamp to signal a regulatory verdict. Use `status='ghost'` for no-submission / pending."
        props={[
          { name: 'agency',  type: 'string',                 desc: 'Short agency name (e.g. "EMA")', required: true },
          { name: 'verdict', type: 'string',                 desc: 'Verdict line (e.g. "APPROVED")', required: true },
          { name: 'date',    type: 'string',                 desc: 'Subhead date (optional)' },
          { name: 'status',  type: '"approved" | "ghost"',   desc: 'Controls color + dashed ring' },
          { name: 'tilt',    type: 'number',                 desc: 'Rotation degrees · default 0' },
          { name: 'size',    type: 'number',                 desc: 'Pixel size · default 160' },
        ]}
        example={`<AgencyStamp agency="FDA"  verdict="APPROVED" date="2024" tilt={-4} />
<AgencyStamp agency="EMA"  verdict="APPROVED" date="2024" tilt={3}  />
<AgencyStamp agency="PMDA" verdict="NO FILING" status="ghost" tilt={-2} />`}
        previewHeight={220}
      >
        <div className="flex items-center gap-8">
          <AgencyStamp agency="FDA"  verdict="APPROVED"  date="2024" tilt={-4} />
          <AgencyStamp agency="EMA"  verdict="APPROVED"  date="2024" tilt={3}  />
          <AgencyStamp agency="PMDA" verdict="NO FILING" status="ghost" tilt={-2} />
        </div>
      </ComponentShowcase>

      <ComponentShowcase
        name="SketchBox"
        importPath="@/components/deck/viz/SketchBox"
        description="Hand-drawn-style callout frame around children. Use to annotate a number or a short phrase with an informal scribble feel."
        props={[
          { name: 'color',    type: 'string',     desc: 'Stroke color · default case accent' },
          { name: 'children', type: 'ReactNode',  desc: 'Anything — usually a number or 1–2 words', required: true },
        ]}
        example={`<SketchBox>
  <span className="deck-display text-3xl text-deck-ink">46%</span>
</SketchBox>`}
        previewHeight={160}
      >
        <SketchBox>
          <span
            className="deck-display"
            style={{ fontSize: '2rem', color: 'var(--cream)', fontWeight: 600 }}
          >
            46%
          </span>
        </SketchBox>
      </ComponentShowcase>
    </>
  );
}
