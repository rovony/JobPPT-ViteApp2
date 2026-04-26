# JobPPT-ViteApp

React/Vite presentation deck for the **Merck QP2-CMD Senior Director
candidate seminar** — a 45-minute talk + 15-minute Q&A covering three
clinical-pharmacology case studies (ambrisentan, ivosidenib, CMD/rare-disease).

Forked from a [base44](https://base44.com) starter, then extended with a
custom slide framework, AI assistant, RAG pipeline, and PDF export tooling.

> Workspace context, planning docs, and source materials live in the
> sibling repo **[JobPPT-Master](https://github.com/rovony/JobPPT-Master)**.

---

## Stack

- **Build:** Vite 6
- **UI:** React 18, Tailwind, Radix UI primitives
- **Routing:** React Router v6
- **Slides:** custom registry under `src/decks/qp2-seminar-v3-R2/`
- **Export:** Playwright-driven PDF capture in `audit/`
- **Hosting:** Vercel (auto-deploy from GitHub)

## Branches & deployments

| Branch | Vercel target | Use |
|---|---|---|
| `main` | Production | Live deck delivered to the panel |
| `dev`  | Preview     | Day-to-day development; previews open per push |

`vercel.json` pins the build/output config so Vercel's auto-detect cannot
drift between local and remote builds.

## Local development

```bash
git clone git@github.com:rovony/JobPPT-ViteApp.git
cd JobPPT-ViteApp
npm install
npm run dev                        # Vite dev server on :5173
```

If `.env.local` is needed for the AI assistant / RAG pipeline:

```
VITE_OPENAI_API_KEY=sk-...
VITE_QDRANT_URL=https://....qdrant.io:6333
VITE_QDRANT_API_KEY=...
VITE_QDRANT_COLLECTION=merck-deck
```

> ⚠ `VITE_*` vars are inlined into the client bundle. Use only for
> local single-user dev. Never deploy a build with secrets in `VITE_*`
> to a public URL.

## Useful scripts

```bash
npm run dev        # Vite dev server with HMR
npm run build      # Production build → dist/
npm run preview    # Preview the production build locally
npm run lint       # eslint --quiet
npm run typecheck  # tsc -p jsconfig.json
```

PDF export and slide-deck audit scripts live under `audit/`. See
[`CLAUDE.md`](./CLAUDE.md) for the full layout-token system, slide
authoring rules, AI assistant + RAG pipeline, and Vercel deploy
contract.

## Repo conventions

- Slides are JSX modules registered in
  `src/decks/qp2-seminar-v3-R2/manifest.js`.
- Each slide imports a shared `SlideFrame` and standard layout tokens
  (`SLIDE_TOKENS`) from `src/components/deck/`.
- Coordinate-driven elements (callouts, illustrations) MUST follow the
  bounding-box audit protocol in `CLAUDE.md` before declaring a layout
  done.
- Commit messages: imperative, short first line. Branch naming:
  `feature/...`, `fix/...`.

## Privacy

Private repository. Contains candidate positioning material and
pre-publication research framing. Do not share publicly without
permission.
