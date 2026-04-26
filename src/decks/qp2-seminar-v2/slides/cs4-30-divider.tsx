// @ts-nocheck
import React from 'react';
import CaseHeroDivider from '@/components/deck/patterns/CaseHeroDivider';

/**
 * CS4 · S30 DIVIDER — AI/ML in Clinical Pharmacology.
 *
 * Sage is CS4's case color (only unused theme — coral=CS1, cyan=CS2,
 * violet=CS3, sage=CS4). The divider follows the existing Case 01–03
 * divider pattern so the audience reads "another case" not "different
 * deck mode."
 *
 * No illustration prop: this is a typographic divider — the brief
 * specifies "no corner badges, no emoji, no motion." Tagline carries
 * the entire visual weight.
 */
export default function Slide30Cs4Divider() {
  return (
    <CaseHeroDivider
      caseToken="sage"
      caseNumber="04"
      totalCases={4}
      kicker="CASE STUDY 04"
      title="AI/ML in Clinical Pharmacology"
      subtitle="Multi-Agent Orchestration for Quantitative Pharmacology Workflows"
      tagline="The discipline is the same. The substrate has advanced."
      meta={[
        ['Substrate', 'PharmAgent · multi-agent orchestration'],
        ['Anchor', 'Kim et al. 2025 · scaling laws (arXiv:2512.08296)'],
        ['Frame', 'ICH M15 · effective 23 Jul 2026'],
      ]}
      verdict="RESEARCH"
      source="Personal research direction · architecture documented · engineering implementation internal"
    />
  );
}
