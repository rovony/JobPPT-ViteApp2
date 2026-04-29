/**
 * Normalize deck rows for JSON clients: Drizzle returns Date objects for timestamps;
 * HTTP JSON must use ISO strings so `new Date(...)` in the browser is stable.
 */
export function serializeDeckRow(row: Record<string, unknown>) {
  const out: Record<string, unknown> = { ...row };
  for (const [k, v] of Object.entries(out)) {
    if (v instanceof Date) out[k] = v.toISOString();
  }
  return out;
}

export function serializeDeckRows(rows: Record<string, unknown>[]) {
  return rows.map(serializeDeckRow);
}
