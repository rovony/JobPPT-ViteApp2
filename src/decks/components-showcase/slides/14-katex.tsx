// @ts-nocheck
import React from 'react';
import { BlockMath, InlineMath } from 'react-katex';
import 'katex/dist/katex.min.css';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function KatexShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · equations"
      library="katex + react-katex"
      npmInstall="npm install katex react-katex"
      url="katex.org"
      headline={<>PK equations, rendered <span style={{ color: 'var(--violet)', fontStyle: 'italic' }}>type-set</span>.</>}
      subhead="LaTeX-quality math rendering — no MathJax weight, no MathML inconsistencies. Fast, server-renderable, and always pixel-perfect."
      tone="var(--violet)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · Two-compartment IV bolus" tone="var(--violet)">
          <div style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)' }}>
            <BlockMath math={"C(t) = A \\, e^{-\\alpha t} + B \\, e^{-\\beta t}"} />
          </div>
          <div style={{ marginTop: 12, fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
            Where <InlineMath math={"\\alpha"} /> and <InlineMath math={"\\beta"} /> are the macro-rate constants
          </div>
        </Frame>

        <Frame title="Variant B · Allometric scaling" tone="var(--coral)">
          <div style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)' }}>
            <BlockMath math={"CL_i = CL_{adult} \\cdot \\left( \\frac{WT_i}{70} \\right)^{0.75}"} />
          </div>
          <div style={{ marginTop: 12, fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
            Prespecified exponent · 0.75 for clearance, 1.0 for volume
          </div>
        </Frame>

        <Frame title="Variant C · Sigmoidal Emax" tone="var(--amber)">
          <div style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)' }}>
            <BlockMath math={"E = E_0 + \\frac{E_{max} \\cdot C^{\\gamma}}{EC_{50}^{\\gamma} + C^{\\gamma}}"} />
          </div>
          <div style={{ marginTop: 12, fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
            <InlineMath math={"\\gamma"} /> = Hill coefficient · steepness of the curve
          </div>
        </Frame>

        <Frame title="Variant D · Bayesian posterior" tone="var(--cyan)">
          <div style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)' }}>
            <BlockMath math={"p(\\theta \\mid D) = \\frac{p(D \\mid \\theta) \\, p(\\theta)}{\\int p(D \\mid \\theta') p(\\theta') \\, d\\theta'}"} />
          </div>
          <div style={{ marginTop: 12, fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
            Posterior ∝ likelihood × prior · the bridging-study principle
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
