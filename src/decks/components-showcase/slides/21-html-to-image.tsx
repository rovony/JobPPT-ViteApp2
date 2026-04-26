// @ts-nocheck
import React, { useRef, useState } from 'react';
import { toPng } from 'html-to-image';
import download from 'downloadjs';
import { Download, Image as ImageIcon } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

export default function HtmlToImageShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  const [busy, setBusy] = useState(false);
  const [done, setDone] = useState(false);

  async function handleExport() {
    if (!ref.current) return;
    setBusy(true); setDone(false);
    try {
      const dataUrl = await toPng(ref.current, { pixelRatio: 2, cacheBust: true });
      download(dataUrl, 'showcase-export.png');
      setDone(true);
    } catch (e) { console.error(e); }
    finally { setBusy(false); setTimeout(() => setDone(false), 2500); }
  }

  return (
    <LibraryShowcase
      category="§5A / §11 · Export pipeline"
      library="html-to-image + downloadjs"
      npmInstall="npm install html-to-image downloadjs"
      url="github.com/bubkoo/html-to-image"
      headline={<>DOM → <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>PNG</span> in two function calls.</>}
      subhead="Capture any DOM node as a PNG at any DPI. The deck uses this for slide export, LinkedIn shares, and manuscript figures. Pair with downloadjs for the file save."
      tone="var(--coral)"
      noteBelow="Click 'Export PNG' below — the framed card on the left becomes a 2× retina PNG file"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <div ref={ref} style={{
          padding: 'var(--space-5)',
          border: '1.5px solid var(--coral)',
          borderRadius: 'var(--radius-lg)',
          background: `linear-gradient(135deg, color-mix(in srgb, var(--coral) 14%, var(--panel)), color-mix(in srgb, var(--panel) 70%, transparent))`,
          display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'flex-start', gap: 12,
        }}>
          <ImageIcon size={28} color="var(--coral)" />
          <div className="deck-display" style={{ fontSize: 'var(--fs-slide-headline)', fontWeight: 600, color: 'var(--coral)', lineHeight: 1.1 }}>
            Capture me
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-tagline)', color: 'var(--cream)', maxWidth: '32ch', lineHeight: 1.5 }}>
            Any DOM tree. Tokens, fonts, gradients, animations frozen at the capture instant — all preserved.
          </div>
          <div className="deck-mono" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
            captured 2026-04-26 · pixelRatio 2.0
          </div>
        </div>

        <Frame title="Variant B · Export controls" tone="var(--coral)">
          <button
            onClick={handleExport}
            disabled={busy}
            style={{
              padding: '12px 20px',
              border: '1.5px solid var(--coral)',
              borderRadius: 8,
              background: busy ? 'var(--cream-ghost)' : 'color-mix(in srgb, var(--coral) 12%, var(--panel))',
              color: 'var(--coral)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-slide-tagline)',
              fontWeight: 700,
              cursor: busy ? 'wait' : 'pointer',
              display: 'inline-flex', alignItems: 'center', gap: 10,
            }}
          >
            <Download size={18} />
            {busy ? 'Capturing…' : 'Export PNG (2×)'}
          </button>
          {done && (
            <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--sage)', marginTop: 12 }}>
              ✓ Downloaded showcase-export.png
            </div>
          )}
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 16, maxWidth: '36ch', lineHeight: 1.5 }}>
            For publication-quality (300 DPI / print) use Playwright server-side instead — see directory §11.
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
