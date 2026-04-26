import React from 'react';

const DEFAULT_OPTS = {
  markClass: 'notes-mark',
  hardPauseClass: 'notes-pause-hard',
  softPauseClass: 'notes-pause-soft',
};

/**
 * Transforms note markdown children: ==highlight==, ⏸ (hard pause),
 * … or ... (soft beat). Used by speaker notes and Q&A markdown paths
 * so markers behave the same everywhere.
 *
 * @param {import('react').ReactNode} children
 * @param {Partial<typeof DEFAULT_OPTS>} [opts] — e.g. `{ markClass: 'reading-mark' }` in ReadingViewer
 */
export function transformNotesInlineChildren(children, opts) {
  const o = { ...DEFAULT_OPTS, ...opts };
  return React.Children.map(children, (child, i) => {
    if (typeof child !== 'string') return child;
    return processTextWithMarkers(child, i, o);
  });
}

function processTextWithMarkers(s, i, o) {
  if (!s.includes('==')) {
    return applyPausesOnly(s, `t-${i}`, o);
  }
  const segs = s.split(/==([^=]+)==/g);
  return segs.map((seg, j) => {
    if (j % 2 === 1) {
      return (
        <mark key={`mk-${i}-${j}`} className={o.markClass}>
          {applyPausesOnly(seg, `in-${i}-${j}`, o)}
        </mark>
      );
    }
    return <React.Fragment key={`ev-${i}-${j}`}>{applyPausesOnly(seg, `ev-${i}-${j}`, o)}</React.Fragment>;
  });
}

/**
 * @returns {string|import('react').ReactNode}
 */
function applyPausesOnly(str, keyPrefix, o) {
  if (str === '' || str == null) return str;
  let parts = [str];

  parts = parts.flatMap((p) => {
    if (typeof p !== 'string' || !p.includes('⏸')) return [p];
    const bits = p.split('⏸');
    const out = [];
    bits.forEach((b, k) => {
      out.push(b);
      if (k < bits.length - 1) {
        out.push(
          <span key={`${keyPrefix}-h-${k}`} className={o.hardPauseClass}>
            ⏸
          </span>
        );
      }
    });
    return out;
  });

  parts = parts.flatMap((p) => {
    if (typeof p !== 'string') return [p];
    if (!/(…|\.{3})/.test(p)) return [p];
    return p
      .split(/(…|\.{3})/g)
      .filter((x) => x !== undefined)
      .map((b, k) => {
        if (b === '…' || b === '...') {
          return (
            <span key={`${keyPrefix}-s-${k}`} className={o.softPauseClass}>
              {b}
            </span>
          );
        }
        return b;
      });
  });

  if (parts.length === 1 && typeof parts[0] === 'string') return parts[0];
  return parts;
}
