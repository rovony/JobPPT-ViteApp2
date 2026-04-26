// @ts-nocheck
import React, { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const SAMPLE = `## Speaker note · CS1 cs1-mechanism

==The hero number is the selectivity ratio==. Ambrisentan binds ETA *4000-fold* over ETB.

### Why selectivity matters
- ETA blockade → vasodilation
- ETB preserved → NO release continues
- Net effect: **vasodilation + reduced proliferation**

> If pressed: cite Galie 2008 NEJM ARIES-1/2.

| Drug | Selectivity | FDA |
|---|---|---|
| ambrisentan | >4000:1 | 2007 |
| macitentan  | ~50:1   | 2013 |
| bosentan    | ~20:1   | 2001 |

\`\`\`r
fit <- nlme(Cp ~ A*exp(-alpha*t) + B*exp(-beta*t),
            data = peds, fixed = ...)
\`\`\``;

export default function MarkdownQuillShowcase() {
  const [src, setSrc] = useState(SAMPLE);
  return (
    <LibraryShowcase
      category="§5C · Markdown rendering (notes + Q&A)"
      library="react-markdown + remark-gfm"
      npmInstall="npm install react-markdown remark-gfm"
      url="github.com/remarkjs/react-markdown"
      headline={<>Speaker notes + Q&A as <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>GFM-rendered</span> markdown.</>}
      subhead="The deck uses react-markdown for every speaker note and Q&A entry. remark-gfm adds tables, strikethrough, and task lists. Inline ==highlight== via a custom rehype plugin in the deck."
      tone="var(--coral)"
    >
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--space-4)', flex: 1, minHeight: 0 }}>
        <Frame title="Source markdown (editable)" tone="var(--coral)">
          <textarea
            value={src}
            onChange={(e) => setSrc(e.target.value)}
            style={{
              width: '100%', height: '100%', minHeight: 220,
              padding: 12,
              border: '1px solid var(--cream-hairline)',
              background: 'color-mix(in srgb, var(--panel) 80%, transparent)',
              color: 'var(--cream)',
              fontFamily: 'var(--font-mono)',
              fontSize: 'var(--fs-slide-pageno)',
              borderRadius: 6, resize: 'none',
              lineHeight: 1.5,
            }}
          />
        </Frame>
        <Frame title="Rendered output (react-markdown + GFM)" tone="var(--cyan)">
          <div style={{
            width: '100%', height: '100%', overflow: 'auto',
            padding: 12,
            border: '1px solid var(--cream-hairline)',
            borderRadius: 6,
            background: 'color-mix(in srgb, var(--panel) 60%, transparent)',
            fontSize: 'var(--fs-slide-pageno)',
            color: 'var(--cream)',
            lineHeight: 1.55,
          }}
          className="prose prose-invert prose-sm">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {src}
            </ReactMarkdown>
          </div>
        </Frame>
      </div>
    </LibraryShowcase>
  );
}
