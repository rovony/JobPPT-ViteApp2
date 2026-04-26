// @ts-nocheck
import React, { useState } from 'react';
import jsPDF from 'jspdf';
import pptxgen from 'pptxgenjs';
import { FileText, Presentation } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function ExportPdfPptxShowcase() {
  const [last, setLast] = useState<string>('');

  function exportPdf() {
    const pdf = new jsPDF({ orientation: 'landscape', unit: 'pt', format: [960, 540] });
    pdf.setFillColor(27, 27, 30); pdf.rect(0, 0, 960, 540, 'F');
    pdf.setTextColor(215, 212, 204); pdf.setFontSize(36); pdf.text('QP2 seminar — case 02', 60, 100);
    pdf.setTextColor(116, 199, 225); pdf.setFontSize(18); pdf.text('First IDH1 inhibitor approved on the Indian market', 60, 140);
    pdf.setTextColor(255, 203, 71); pdf.setFontSize(96); pdf.text('Mar 2024', 60, 280);
    pdf.setTextColor(167, 167, 167); pdf.setFontSize(10); pdf.text('Source · CDSCO Rule-101 public record · jspdf export', 60, 510);
    pdf.save('showcase-export.pdf');
    setLast('PDF saved');
  }

  async function exportPptx() {
    const pres = new pptxgen();
    pres.layout = 'LAYOUT_WIDE';
    const slide = pres.addSlide();
    slide.background = { color: '1B1B1E' };
    slide.addText('QP2 seminar — case 02', { x: 0.6, y: 0.5, w: 12, h: 0.6, fontSize: 28, color: 'D7D4CC', fontFace: 'Inter' });
    slide.addText('First IDH1 inhibitor approved on the Indian market', { x: 0.6, y: 1.2, w: 12, h: 0.5, fontSize: 16, color: '74C7E1', italic: true });
    slide.addText('Mar 2024', { x: 0.6, y: 2.4, w: 12, h: 1.6, fontSize: 84, bold: true, color: 'FFCB47', fontFace: 'Fraunces' });
    slide.addText('Source · CDSCO Rule-101 public record · pptxgenjs export', { x: 0.6, y: 6.6, w: 12, h: 0.3, fontSize: 9, color: 'A7A7A7' });
    await pres.writeFile({ fileName: 'showcase-export.pptx' });
    setLast('PPTX saved');
  }

  return (
    <LibraryShowcase
      category="§11 · Export pipeline alternatives"
      library="jspdf + pptxgenjs"
      npmInstall="npm install jspdf pptxgenjs"
      url="github.com/parallax/jsPDF · gitbrent.github.io/PptxGenJS"
      headline={<>Native <span style={{ color: 'var(--amber)', fontStyle: 'italic' }}>PDF</span> + native <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>PPTX</span> from React.</>}
      subhead="When stakeholders want editable PowerPoint or vector PDF instead of PNG. Both run client-side, no server, no Office license."
      tone="var(--amber)"
      noteBelow={last && <>Last action: {last}</>}
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · jsPDF — native PDF" tone="var(--amber)">
          <button onClick={exportPdf} style={btn('var(--amber)')}>
            <FileText size={18} /> Export PDF
          </button>
          <ul style={ul}>
            <li>Vector text · selectable · searchable</li>
            <li>Server-free · runs in browser</li>
            <li>Pair with <code>jspdf-autotable</code> for tables</li>
          </ul>
        </Frame>
        <Frame title="Variant B · pptxgenjs — native PPTX" tone="var(--coral)">
          <button onClick={exportPptx} style={btn('var(--coral)')}>
            <Presentation size={18} /> Export PPTX
          </button>
          <ul style={ul}>
            <li>Editable in PowerPoint / Keynote / Google Slides</li>
            <li>Tokens, fonts, layouts preserved</li>
            <li>Useful when reviewers won't accept PDF</li>
          </ul>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}

const btn = (color: string) => ({
  padding: '12px 20px',
  border: `1.5px solid ${color}`,
  borderRadius: 8,
  background: `color-mix(in srgb, ${color} 12%, var(--panel))`,
  color, cursor: 'pointer',
  fontFamily: 'var(--font-mono)',
  fontSize: 'var(--fs-slide-tagline)',
  fontWeight: 700,
  display: 'inline-flex', alignItems: 'center', gap: 10,
});

const ul: React.CSSProperties = {
  listStyle: 'none', padding: 0, margin: '16px 0 0 0',
  display: 'flex', flexDirection: 'column', gap: 8,
  fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream)', lineHeight: 1.5,
};
