// @ts-nocheck
import React from 'react';
import SlideFrame from '@/components/deck/SlideFrame';

export function BackupGroupDivider({ eyebrow, headline, subhead, label = 'Backup', items = [], dataCase = 'violet' }: any) {
  return (
    <SlideFrame
      dataCase={dataCase}
      eyebrow={eyebrow}
      headline={headline}
      headlineMaxChars={70}
      subhead={subhead}
      subheadMaxChars={110}
      subheadSize="lead"
      footerKicker={label}
      footerTagline="Use only if the panel asks for this depth."
    >
      <div style={{
        width: '100%',
        height: '100%',
        minHeight: 0,
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(20rem, 100%), 1fr))',
        gap: 'var(--space-4)',
        alignContent: 'center',
      }}>
        {items.map((item) => (
          <div key={item} className="deck-display" style={{
            padding: 'var(--space-4) var(--space-5)',
            border: '1px solid color-mix(in srgb, var(--case) 26%, transparent)',
            borderLeft: '3px solid var(--case)',
            borderRadius: 'var(--radius-md)',
            background: 'color-mix(in srgb, var(--case) 6%, var(--panel))',
            color: 'var(--cream)',
            fontSize: 'var(--fs-slide-tagline)',
            lineHeight: 1.25,
          }}>
            {item}
          </div>
        ))}
      </div>
    </SlideFrame>
  );
}

export function AiBackupDivider() {
  return (
    <BackupGroupDivider
      dataCase="violet"
      eyebrow="Backup · AI / Pharazi"
      headline={<>Extended AI workflow slides moved out of the main talk.</>}
      subhead="The live Vir story uses only the regulatory floor, gap, working overview, PopPK dashboard, and publication close. The rest stays available for deeper technical discussion."
      label="Backup · AI"
      items={['Regulatory context', 'Five architecture principles', 'Component-level workflow views', 'Audit dashboards', 'Interactive dossier']}
    />
  );
}

export function IvosidenibBackupDivider() {
  return (
    <BackupGroupDivider
      dataCase="sage"
      eyebrow="Backup · prior work"
      headline={<>Prior work · India reliance (Ivosidenib).</>}
      subhead="These slides are preserved as supporting evidence for global-to-local reliance and regulatory dossier strategy, but they are not part of the Vir main flow."
      label="Backup · Ivosidenib"
      items={['CDSCO Rule 101 pathway', 'Six-pillar dossier strategy', 'IDH1 disease and mechanism context', 'Local-data waiver outcome']}
    />
  );
}
