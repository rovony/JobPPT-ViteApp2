/**
 * Writes src/decks/deck-catalog-git.json — first commit touching each manifest
 * (git log --follow --reverse). Untracked manifests fall back to file mtime (ISO).
 *
 * Run: node scripts/gen-deck-git-catalog.mjs
 */
import { spawnSync } from 'node:child_process';
import { statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');

const DECK_IDS = [
  'qp2-seminar',
  'qp2-seminar-v2',
  'qp2-seminar-v3-R2',
  'qp2-seminar-v4',
  'qp2-seminar-v4-2',
  'cs4-flagship-v1',
  'cs4-canvas-flagship',
  'launch-keynote',
  'template-blank',
  'slide-templates',
  'components-showcase',
  'zaj-design-showcase',
  'pharazi-seminar',
];

function gitFirstIso(relPath) {
  const r = spawnSync(
    'git',
    ['log', '--follow', '--format=%cI', '--reverse', '--', relPath],
    { encoding: 'utf8', cwd: root }
  );
  if (r.status !== 0 || !r.stdout) return null;
  const line = r.stdout.trim().split(/\r?\n/).filter(Boolean)[0];
  return line || null;
}

function mtimeIso(absPath) {
  try {
    const st = statSync(absPath);
    const d = st.birthtimeMs ? new Date(st.birthtimeMs) : new Date(st.mtimeMs);
    return d.toISOString();
  } catch {
    return null;
  }
}

const catalog = {};
for (const id of DECK_IDS) {
  const rel = `src/decks/${id}/manifest.ts`;
  const abs = join(root, rel);
  let iso = gitFirstIso(rel);
  if (!iso) iso = mtimeIso(abs);
  if (iso) catalog[id] = iso;
}

const target = join(root, 'src', 'decks', 'deck-catalog-git.json');
writeFileSync(target, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
console.log(`Wrote ${Object.keys(catalog).length} entries -> ${target}`);
