// @ts-nocheck
import React from 'react';
import { Card, Metric, Text, Flex, ProgressBar, BadgeDelta } from '@tremor/react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function TremorShowcase() {
  return (
    <LibraryShowcase
      category="§5A · Presentation decks · KPI cards"
      library="@tremor/react"
      npmInstall="npm install @tremor/react"
      url="tremor.so"
      headline={<>KPI cards + <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>scorecards</span> in one component.</>}
      subhead="Pre-built dashboard components: Metric, Card, BadgeDelta, ProgressBar. Use for case-impact stats and dashboards. Built on Tailwind."
      tone="var(--amber)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Card decoration="left" decorationColor="amber">
          <Flex justifyContent="between" alignItems="center">
            <Text>Bioequivalence ratio</Text>
            <BadgeDelta deltaType="moderateIncrease">98%</BadgeDelta>
          </Flex>
          <Metric>0.98</Metric>
          <Text className="mt-1">Indian healthy volunteers vs global PopPK</Text>
          <Flex className="mt-4">
            <Text>90% CI 0.85–1.13</Text>
            <Text>Pass</Text>
          </Flex>
          <ProgressBar value={98} color="amber" className="mt-2" />
        </Card>

        <Card decoration="left" decorationColor="cyan">
          <Flex justifyContent="between" alignItems="center">
            <Text>Midazolam AUC ratio</Text>
            <BadgeDelta deltaType="increase">DDI</BadgeDelta>
          </Flex>
          <Metric>4.2×</Metric>
          <Text className="mt-1">PBPK predicted CYP3A4 inhibition (in label)</Text>
          <Flex className="mt-4">
            <Text>Range 3.6–4.9</Text>
            <Text>Predicted</Text>
          </Flex>
          <ProgressBar value={84} color="cyan" className="mt-2" />
        </Card>

        <Card decoration="left" decorationColor="rose">
          <Flex justifyContent="between" alignItems="center">
            <Text>Race covariate</Text>
            <BadgeDelta deltaType="unchanged">n.s.</BadgeDelta>
          </Flex>
          <Metric>p = 0.32</Metric>
          <Text className="mt-1">Asian vs non-Asian on CL — 253-pt PopPK</Text>
          <Flex className="mt-4">
            <Text>α threshold 0.05</Text>
            <Text>Reject</Text>
          </Flex>
          <ProgressBar value={32} color="rose" className="mt-2" />
        </Card>
      </div>
    </LibraryShowcase>
  );
}
