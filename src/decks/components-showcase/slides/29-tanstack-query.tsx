// @ts-nocheck
import React from 'react';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { Loader2, RefreshCw, CheckCircle2 } from 'lucide-react';
import LibraryShowcase, { Frame } from '../_LibraryShowcase';

const qc = new QueryClient();

// Simulated trial-status API
async function fetchTrials() {
  await new Promise((r) => setTimeout(r, 800 + Math.random() * 400));
  return [
    { id: 'NCT01332331', drug: 'ambrisentan', phase: 'III', status: 'completed', enrolled: 41 },
    { id: 'NCT01342952', drug: 'ambrisentan', phase: 'LTE', status: 'completed', enrolled: 38 },
    { id: 'NCT04458441', drug: 'ivosidenib',  phase: 'III', status: 'recruiting', enrolled: 200 },
    { id: 'NCT04573309', drug: 'sotatercept', phase: 'III', status: 'completed', enrolled: 323 },
  ];
}

function TrialList() {
  const { data, isFetching, refetch } = useQuery({
    queryKey: ['trials'],
    queryFn: fetchTrials,
    staleTime: 0,
  });
  return (
    <div style={{ width: '100%' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
        <button onClick={() => refetch()} disabled={isFetching} style={{
          padding: '8px 14px',
          border: '1px solid var(--cyan)',
          background: isFetching ? 'var(--cream-ghost)' : 'color-mix(in srgb, var(--cyan) 12%, var(--panel))',
          color: 'var(--cyan)',
          borderRadius: 6,
          cursor: isFetching ? 'wait' : 'pointer',
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-slide-pageno)',
          display: 'inline-flex', alignItems: 'center', gap: 6,
        }}>
          {isFetching ? <Loader2 size={14} className="animate-spin" /> : <RefreshCw size={14} />}
          {isFetching ? 'Loading…' : 'Refetch'}
        </button>
        <span style={{ fontSize: 'var(--fs-slide-pageno)', color: 'var(--cream-faint)' }}>
          {isFetching ? 'fetching from cache + revalidating' : `${data?.length ?? 0} trials cached`}
        </span>
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}>
        {(data ?? []).map((t) => (
          <div key={t.id} style={{
            padding: '8px 12px',
            border: '1px solid var(--cream-hairline)',
            borderLeft: `3px solid ${t.status === 'completed' ? 'var(--sage)' : 'var(--amber)'}`,
            borderRadius: 6,
            display: 'grid',
            gridTemplateColumns: 'auto 1fr auto auto',
            alignItems: 'center',
            gap: 10,
            fontSize: 'var(--fs-slide-pageno)',
            fontFamily: 'var(--font-mono)',
          }}>
            <span style={{ color: 'var(--cyan)', fontWeight: 700 }}>{t.id}</span>
            <span style={{ color: 'var(--cream)' }}>{t.drug}</span>
            <span style={{ color: 'var(--cream-faint)' }}>Ph {t.phase} · n={t.enrolled}</span>
            <span style={{ color: t.status === 'completed' ? 'var(--sage)' : 'var(--amber)' }}>{t.status}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function TanstackQueryShowcase() {
  return (
    <QueryClientProvider client={qc}>
      <LibraryShowcase
        category="§5D · Server state management"
        library="@tanstack/react-query"
        npmInstall="npm install @tanstack/react-query"
        url="tanstack.com/query"
        headline={<>Server state, <span style={{ color: 'var(--cyan)', fontStyle: 'italic' }}>cached</span> + revalidated.</>}
        subhead="Replaces 90% of useEffect-based data fetching. Stale-while-revalidate, background refetch, request dedup, optimistic updates — all with one hook."
        tone="var(--cyan)"
        noteBelow="Click 'Refetch' to trigger a stale-while-revalidate cycle · cached results render instantly while the new fetch runs in background"
      >
        <Frame title="Variant A · Trial registry (simulated)" tone="var(--cyan)">
          <TrialList />
        </Frame>
      </LibraryShowcase>
    </QueryClientProvider>
  );
}
