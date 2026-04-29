/**
 * Vite dev: answer `/api/decks` against Neon when `DATABASE_URL` is set so the Deck Studio
 * list matches Postgres even if `@base44/vite-plugin` proxies the rest of `/api` elsewhere.
 *
 * Requires `drizzle/0001_decks_subtitle_description_theme.sql` applied if POST uses subtitle/theme.
 */
import { loadEnv } from 'vite';
import { neon } from '@neondatabase/serverless';

function readBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', (c) => chunks.push(c));
    req.on('end', () => resolve(Buffer.concat(chunks).toString('utf8')));
    req.on('error', reject);
  });
}

function pgRowToClient(r) {
  const iso = (v) => {
    if (!v) return null;
    if (v instanceof Date) return v.toISOString();
    const d = new Date(v);
    return Number.isFinite(d.getTime()) ? d.toISOString() : null;
  };
  return {
    id: r.id,
    folderId: r.folder_id ?? null,
    ownerId: r.owner_id ?? null,
    title: r.title,
    subtitle: r.subtitle ?? null,
    description: r.description ?? null,
    theme: r.theme ?? null,
    versionId: r.version_id ?? null,
    variant: r.variant ?? null,
    status: r.status ?? null,
    layoutEnabled: r.layout_enabled ?? null,
    createdAt: iso(r.created_at),
    updatedAt: iso(r.updated_at),
  };
}

export function deckStudioApiDevPlugin() {
  return {
    name: 'deck-studio-api-dev',
    enforce: 'pre',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        const url = req.url || '';
        if (!url.startsWith('/api/decks')) return next();

        const env = loadEnv(server.config.mode, server.config.root, '');
        const databaseUrl = env.DATABASE_URL;
        if (!databaseUrl) return next();

        const hostUrl = new URL(url, 'http://localhost');
        const pathname = hostUrl.pathname;
        const m = pathname.match(/^\/api\/decks(?:\/([^/]+))?$/);
        if (!m) return next();

        const id = m[1];
        const method = (req.method || 'GET').toUpperCase();

        try {
          const sql = neon(databaseUrl);

          res.setHeader('Content-Type', 'application/json');

          if (method === 'GET' && !id) {
            const rows = await sql`select * from decks order by created_at desc`;
            res.statusCode = 200;
            res.end(JSON.stringify(rows.map(pgRowToClient)));
            return;
          }

          if (method === 'POST' && !id) {
            const raw = await readBody(req);
            const body = raw ? JSON.parse(raw) : {};
            const title = body.title || 'Untitled Deck';
            const subtitle = body.subtitle ?? null;
            const description = body.description ?? null;
            const theme = body.theme || 'clinical';
            const rows = await sql`
              insert into decks (title, subtitle, description, theme)
              values (${title}, ${subtitle}, ${description}, ${theme})
              returning *
            `;
            res.statusCode = 201;
            res.end(JSON.stringify(pgRowToClient(rows[0])));
            return;
          }

          if (method === 'PATCH' && id) {
            const raw = await readBody(req);
            const body = raw ? JSON.parse(raw) : {};
            const cur = await sql`select * from decks where id = ${id}::uuid limit 1`;
            if (!cur[0]) {
              res.statusCode = 404;
              res.end(JSON.stringify({ error: 'Not found' }));
              return;
            }
            if (body.title !== undefined) {
              await sql`update decks set title = ${body.title}, updated_at = now() where id = ${id}::uuid`;
            }
            if (body.subtitle !== undefined) {
              await sql`update decks set subtitle = ${body.subtitle}, updated_at = now() where id = ${id}::uuid`;
            }
            if (body.description !== undefined) {
              await sql`update decks set description = ${body.description}, updated_at = now() where id = ${id}::uuid`;
            }
            if (body.theme !== undefined) {
              await sql`update decks set theme = ${body.theme}, updated_at = now() where id = ${id}::uuid`;
            }
            if (
              body.title === undefined &&
              body.subtitle === undefined &&
              body.description === undefined &&
              body.theme === undefined
            ) {
              await sql`update decks set updated_at = now() where id = ${id}::uuid`;
            }
            const rows = await sql`select * from decks where id = ${id}::uuid limit 1`;
            res.statusCode = 200;
            res.end(JSON.stringify(pgRowToClient(rows[0])));
            return;
          }

          if (method === 'DELETE' && id) {
            await sql`delete from decks where id = ${id}::uuid`;
            res.statusCode = 204;
            res.end();
            return;
          }

          res.statusCode = 405;
          res.end(JSON.stringify({ error: 'Method Not Allowed' }));
        } catch (err) {
          console.error('[deck-studio-api-dev]', err);
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json');
          res.end(JSON.stringify({ error: 'Deck API dev handler error', detail: String(err?.message || err) }));
        }
      });
    },
  };
}
