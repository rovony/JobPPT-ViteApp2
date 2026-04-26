// @ts-nocheck
import React, { useEffect, useState } from 'react';
import { codeToTokens } from 'shiki';
import ReactPlayer from 'react-player';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const NMTAB = `; NONMEM control - two-compartment IV
$PROB ambrisentan PopPK pediatric
$INPUT ID TIME AMT DV WT AGE SEX RACE EVID MDV
$DATA peds-amb.csv IGNORE=@

$SUBR ADVAN3 TRANS4

$PK
  TVCL = THETA(1) * (WT/70)**0.75
  CL   = TVCL * EXP(ETA(1))
  V1   = THETA(2) * (WT/70)
  Q    = THETA(3)
  V2   = THETA(4)

$ERROR
  IPRED = F
  Y     = IPRED * (1 + EPS(1)) + EPS(2)

$THETA  (0, 1.92)  (0, 18.4) (0, 4.5) (0, 22)
$OMEGA  0.18 0.22
$SIGMA  0.04 0.05

$EST METHOD=1 INTERACTION MAXEVAL=9999`;

export default function ShikiPlayerShowcase() {
  const [tokens, setTokens] = useState<any[]>([]);
  useEffect(() => {
    let cancelled = false;
    codeToTokens(NMTAB, { lang: 'fortran', theme: 'github-dark' })
      .then((res) => { if (!cancelled) setTokens(res.tokens); })
      .catch((e) => { console.error(e); });
    return () => { cancelled = true; };
  }, []);

  return (
    <LibraryShowcase
      category="§5C · Online courses · code + video"
      library="shiki + react-player"
      npmInstall="npm install shiki react-player"
      url="shiki.style · github.com/cookpete/react-player"
      headline={<>VS Code-quality syntax + <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>universal video</span>.</>}
      subhead="Shiki uses TextMate grammars — pixel-identical to VS Code. React Player handles YouTube, Vimeo, MP4, HLS, DASH with one component."
      tone="var(--cyan)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '3fr 2fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Variant A · NONMEM control file (shiki)" tone="var(--cyan)">
          <pre style={{
            flex: 1, minHeight: 0, width: '100%',
            margin: 0, padding: 16,
            fontSize: 'calc(var(--fs-slide-pageno) * 1.05)',
            lineHeight: 1.5,
            borderRadius: 8, overflow: 'auto',
            background: '#0d1117',
            fontFamily: 'var(--font-mono)',
            color: '#c9d1d9',
          }}>
            {tokens.length === 0 ? (
              NMTAB
            ) : (
              tokens.map((line, i) => (
                <div key={i} style={{ minHeight: '1em' }}>
                  {line.map((tok: any, j: number) => (
                    <span key={j} style={{ color: tok.color }}>{tok.content}</span>
                  ))}
                </div>
              ))
            )}
          </pre>
        </Frame>

        <Frame title="Variant B · Embedded video (react-player)" tone="var(--coral)">
          <div style={{ width: '100%', aspectRatio: '16/9', borderRadius: 8, overflow: 'hidden', background: 'var(--cream-ghost)' }}>
            <ReactPlayer
              url="https://www.youtube.com/watch?v=jNQXAC9IVRw"
              width="100%"
              height="100%"
              light
              controls
            />
          </div>
          <div className="deck-body" style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)', marginTop: 12, lineHeight: 1.5 }}>
            Click thumbnail to load player · YouTube / Vimeo / MP4 / HLS all supported by one component
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
