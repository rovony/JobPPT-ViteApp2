// @ts-nocheck
import React from 'react';
import { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck } from 'lucide-react';
import SlideGrid, { STANDARD_AREAS, STANDARD_ROW_SIZES } from '@/components/deck/SlideGrid';
import { Eyebrow, Subhead, Viz, Footer } from '@/components/deck/SlideParts';
import SolidHeadline from '../../components/cs1/SolidHeadline';
import SwissBoard from '../../_shared/SwissBoard';

const ICONS = { Bot, FileCheck2, GitBranch, LockKeyhole, PanelsTopLeft, ShieldCheck };

/**
 * AiEvidenceSlide — Pharazi setup/gap slides on the CS1 SwissBoard pattern.
 */
export function AiEvidenceSlide({
  eyebrow,
  headline,
  subhead,
  subheadMaxChars = 116,
  cards,
  footerTagline,
  footerSource,
}: any) {
  const panels = cards.map((card, i) => {
    const Icon = ICONS[card.icon] || Bot;
    return {
      id: card.label,
      kicker: card.label,
      accent: 'var(--sage)',
      accentAt: i,
      title: (
        <span style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>
          <Icon size={26} color="var(--sage)" strokeWidth={2.2} aria-hidden />
          <span>{card.title}</span>
        </span>
      ),
      body: card.body,
    };
  });

  return (
    <SlideGrid dataCase="sage" areas={STANDARD_AREAS} rowSizes={STANDARD_ROW_SIZES}>
      <Eyebrow color="var(--sage)" delay={0.1}>
        {eyebrow}
      </Eyebrow>
      <SolidHeadline delay={0.16} maxChars={68}>
        {headline}
      </SolidHeadline>
      {subhead ? (
        <Subhead delay={0.22} maxChars={subheadMaxChars}>
          {subhead}
        </Subhead>
      ) : null}
      <Viz>
        <SwissBoard
          panels={panels}
          conclusionAccent="var(--sage)"
          conclusion={
            footerTagline ?? (
              <>
                Auditability before autonomy — traceable inputs, deterministic compute, human owner.
              </>
            )
          }
        />
      </Viz>
      <Footer
        kicker="AI / Pharazi"
        tagline=""
        source={footerSource}
        delay={0.28}
      />
    </SlideGrid>
  );
}
