/**
 * Writes src/decks/deck-catalog-git.json — git-derived metadata per registered deck.
 *
 * Auto-discovers decks by scanning src/decks/* for folders containing manifest.ts
 * (so the script never drifts from the registry).
 *
 * For each deck, captures:
 *   firstCommittedAt  — ISO timestamp of the first commit touching the deck folder
 *   lastUpdatedAt     — ISO timestamp of the most recent commit touching the deck folder
 *   commitCount       — number of commits touching the deck folder
 *   lastCommitSubject — subject line of the most recent commit
 *   kind              — derived taxonomy: presentation | case-study | template | showcase
 *   versionFamily     — root id with version suffix stripped (e.g. "qp2-seminar-v4-2" → "qp2-seminar")
 *   versionLabel      — version suffix if present (e.g. "v4-2"), else null
 *   isLatestInFamily  — true for the most-recently-updated deck in each family
 *
 * Fallback: untracked manifests use file mtime/birthtime as firstCommittedAt.
 *
 * Run: node scripts/gen-deck-git-catalog.mjs   (or `npm run gen:deck-catalog-git`)
 */
import { spawnSync } from 'node:child_process';
import { existsSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, '..');
const decksDir = join(root, 'src/decks');

function git(args) {
  const r = spawnSync('git', args, { encoding: 'utf8', cwd: root });
  return r.status === 0 ? r.stdout : '';
}

function gitFirstIso(folder) {
  const out = git(['log', '--follow', '--format=%cI', '--reverse', '--', folder]);
  return out.trim().split(/\r?\n/).filter(Boolean)[0] || null;
}

function gitLastIso(folder) {
  const out = git(['log', '-1', '--format=%cI', '--', folder]);
  return out.trim() || null;
}

function gitCommitCount(folder) {
  const out = git(['rev-list', '--count', 'HEAD', '--', folder]);
  const n = parseInt(out.trim(), 10);
  return Number.isFinite(n) ? n : 0;
}

function gitLastSubject(folder) {
  return git(['log', '-1', '--format=%s', '--', folder]).trim() || null;
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

// Heuristic taxonomy. A manifest may also opt-in by setting `kind` directly;
// the registry layer prefers manifest.kind over the derived value when present.
function deriveKind(id) {
  if (/showcase/i.test(id)) return 'showcase';
  if (/^template-|-templates?$|-template$/i.test(id)) return 'template';
  if (/^cs\d|-flagship/i.test(id)) return 'case-study';
  return 'presentation';
}

// Version family detection.
// Splits a deck id into (family, versionLabel):
//   "qp2-seminar"        → { family: "qp2-seminar", versionLabel: null }
//   "qp2-seminar-v2"     → { family: "qp2-seminar", versionLabel: "v2" }
//   "qp2-seminar-v3-R2"  → { family: "qp2-seminar", versionLabel: "v3-R2" }
//   "qp2-seminar-v4-2"   → { family: "qp2-seminar", versionLabel: "v4-2" }
//   "v5-pharazi"         → { family: "v5-pharazi", versionLabel: null } (leading v## is part of name)
function parseVersion(id) {
  const m = id.match(/^(.+?)-(v\d+(?:-(?:R?\d+))?)$/i);
  if (m) return { family: m[1], versionLabel: m[2] };
  return { family: id, versionLabel: null };
}

// Discover decks by folder scan (any folder containing manifest.ts is a deck)
const DECK_IDS = readdirSync(decksDir, { withFileTypes: true })
  .filter((d) => d.isDirectory() && existsSync(join(decksDir, d.name, 'manifest.ts')))
  .map((d) => d.name)
  .sort();

if (DECK_IDS.length === 0) {
  console.error('No deck folders found under src/decks/* (looked for manifest.ts)');
  process.exit(1);
}

const catalog = {};
for (const id of DECK_IDS) {
  const folder = `src/decks/${id}`;
  const absManifest = join(root, folder, 'manifest.ts');
  const firstIso = gitFirstIso(folder) || mtimeIso(absManifest);
  const lastIso = gitLastIso(folder) || firstIso;
  const { family, versionLabel } = parseVersion(id);

  catalog[id] = {
    firstCommittedAt: firstIso,
    lastUpdatedAt: lastIso,
    commitCount: gitCommitCount(folder),
    lastCommitSubject: gitLastSubject(folder),
    kind: deriveKind(id),
    versionFamily: family,
    versionLabel,
    isLatestInFamily: false,
  };
}

// Flag latest per family by lastUpdatedAt (ISO strings sort lexicographically)
const latestByFamily = {};
for (const [id, m] of Object.entries(catalog)) {
  if (!m.lastUpdatedAt) continue;
  const f = m.versionFamily;
  if (!latestByFamily[f] || m.lastUpdatedAt > latestByFamily[f].date) {
    latestByFamily[f] = { id, date: m.lastUpdatedAt };
  }
}
for (const { id } of Object.values(latestByFamily)) {
  catalog[id].isLatestInFamily = true;
}

const target = join(root, 'src', 'decks', 'deck-catalog-git.json');
writeFileSync(target, `${JSON.stringify(catalog, null, 2)}\n`, 'utf8');
console.log(`Wrote ${Object.keys(catalog).length} entries -> ${target}`);
