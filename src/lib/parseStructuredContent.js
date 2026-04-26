/**
 * parseStructuredContent — markdown-aware parsers for the speaker notes
 * and anticipated Q&A vocabularies defined in Notes-And-QA-Structure.md.
 *
 * Both parsers are TOLERANT — if the input doesn't match the new spec,
 * `structured: false` is returned with the original raw string. Renderers
 * fall back to the existing raw-markdown path so legacy content (notes
 * authored before the spec) keeps working.
 *
 * The new spec lights up automatically whenever an author writes content
 * matching the section / question shapes.
 */

/* ─────────────────────────────────────────────────────────────────
   Speaker notes — split into ## Spoken / ## Cues / ## Bridge.
   ───────────────────────────────────────────────────────────────── */
export function parseStructuredNotes(input) {
  if (typeof input !== 'string' || !input.trim()) {
    return { structured: false, raw: input || '' };
  }

  const sections = splitSections(input, ['Spoken', 'Cues', 'Bridge']);
  if (!sections.Spoken && !sections.Cues && !sections.Bridge) {
    return { structured: false, raw: input };
  }

  return {
    structured: true,
    spoken: sections.Spoken?.trim() || '',
    cues: parseCues(sections.Cues || ''),
    bridge: sections.Bridge?.trim() || '',
  };
}

/** Cues section is a bullet list. Each bullet may carry a leading glyph
 *  (⏱ 🎯 🎚 📍 ⚠ ✅ 🛟) that maps to a semantic category. */
const CUE_GLYPHS = {
  '⏱': 'time',
  '🎯': 'focus',
  '🎚': 'tone',
  '📍': 'position',
  '⚠':  'warn',
  '✅': 'must',
  '🛟': 'recovery',
};

function parseCues(raw) {
  if (!raw.trim()) return [];
  const lines = raw.split('\n').map((l) => l.trim()).filter(Boolean);
  const cues = [];
  for (const line of lines) {
    // Strip leading bullet markers
    const m = line.match(/^[-*•]\s+(.*)$/);
    const content = m ? m[1] : line;
    // Detect leading glyph
    const first = Array.from(content)[0];
    const category = CUE_GLYPHS[first] || 'note';
    const text = category === 'note' ? content : content.slice(first.length).trim();
    cues.push({ category, glyph: first in CUE_GLYPHS ? first : null, text });
  }
  return cues;
}

/* ─────────────────────────────────────────────────────────────────
   Anticipated Q&A — extract `## QN: question` blocks with metadata.
   ───────────────────────────────────────────────────────────────── */
export function parseAnticipatedQA(input) {
  if (typeof input !== 'string' || !input.trim()) {
    return { structured: false, raw: input || '' };
  }

  // Match `## Q:`, `## Q1:`, `## Q12:` (case-insensitive). Capture the
  // optional number and the question text after the colon.
  const headingRe = /^\s*##\s+Q(\d*):\s*(.+)$/gim;
  const matches = [...input.matchAll(headingRe)];
  if (!matches.length) {
    return { structured: false, raw: input };
  }

  const questions = [];
  for (let i = 0; i < matches.length; i++) {
    const m = matches[i];
    const startIdx = m.index + m[0].length;
    const endIdx = i + 1 < matches.length ? matches[i + 1].index : input.length;
    const body = input.slice(startIdx, endIdx).trim();

    questions.push({
      id: `q${i + 1}`,
      num: m[1] ? parseInt(m[1], 10) : i + 1,
      question: m[2].trim(),
      ...parseQuestionBody(body),
    });
  }

  return { structured: true, questions };
}

/** Pull `**From:**`, `**Difficulty:**`, `**Topic:**` metadata lines, the
 *  answer paragraph(s), and the optional `> **If pressed:**` blockquote. */
function parseQuestionBody(body) {
  const meta = { from: '', difficulty: 0, difficultyRaw: '', topic: '' };
  const lines = body.split('\n');
  const remaining = [];

  for (const line of lines) {
    const t = line.trim();
    let consumed = false;
    const fromM = t.match(/^\*\*From:\*\*\s*(.+?)(?:\s*·\s*\*\*Difficulty:\*\*.*)?$/i);
    if (fromM && !meta.from) { meta.from = fromM[1].trim(); consumed = true; }
    const diffM = t.match(/\*\*Difficulty:\*\*\s*(★+|☆+|[★☆]+|\d+)/i);
    if (diffM) {
      meta.difficultyRaw = diffM[1];
      meta.difficulty = (diffM[1].match(/★/g) || []).length || (Number.isFinite(+diffM[1]) ? +diffM[1] : 0);
      consumed = true;
    }
    const topicM = t.match(/\*\*Topic:\*\*\s*([\w-]+)/i);
    if (topicM) { meta.topic = topicM[1].trim(); consumed = true; }
    if (!consumed) remaining.push(line);
  }

  // Split body remainder into answer + ifPressed (the > **If pressed:** blockquote).
  const rest = remaining.join('\n').trim();
  const ifPressedRe = />\s*\*\*If pressed:\*\*\s*([\s\S]*)/i;
  const ipM = rest.match(ifPressedRe);
  let answer = rest;
  let ifPressed = '';
  if (ipM) {
    answer = rest.slice(0, ipM.index).trim();
    ifPressed = ipM[1]
      .split('\n')
      .map((l) => l.replace(/^>\s?/, ''))
      .join('\n')
      .trim();
  }
  // Strip leading "A:" if present so the renderer can render the answer
  // body without the literal "A:" prefix bleeding into the prose.
  answer = answer.replace(/^A\s*:\s*/i, '');

  return { ...meta, answer, ifPressed };
}

/* ─────────────────────────────────────────────────────────────────
   Section splitter — finds `## Heading` blocks and returns a map
   keyed by heading name. Tolerant of leading whitespace on the heading.
   ───────────────────────────────────────────────────────────────── */
function splitSections(input, names) {
  const wanted = new Set(names.map((n) => n.toLowerCase()));
  const headingRe = /^\s*##\s+([\w &]+?)\s*$/gim;
  const headings = [...input.matchAll(headingRe)];
  if (!headings.length) return {};

  const out = {};
  for (let i = 0; i < headings.length; i++) {
    const h = headings[i];
    const name = h[1].trim();
    if (!wanted.has(name.toLowerCase())) continue;
    const startIdx = h.index + h[0].length;
    const endIdx = i + 1 < headings.length ? headings[i + 1].index : input.length;
    out[name] = input.slice(startIdx, endIdx);
  }
  return out;
}
