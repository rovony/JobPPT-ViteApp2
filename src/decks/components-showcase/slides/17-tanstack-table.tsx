// @ts-nocheck
import React, { useState } from 'react';
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender } from '@tanstack/react-table';
import { ArrowUp, ArrowDown, ChevronsUpDown } from 'lucide-react';
import LibraryShowcase from '../_LibraryShowcase';

const data = [
  { drug: 'ambrisentan', class: 'Selective ETA', selectivity: 4147, year: 2007, sponsor: 'Gilead' },
  { drug: 'macitentan',  class: 'Tissue-targeted', selectivity: 50,  year: 2013, sponsor: 'Janssen' },
  { drug: 'bosentan',    class: 'Dual ETA/ETB',   selectivity: 20,  year: 2001, sponsor: 'Actelion' },
  { drug: 'sildenafil',  class: 'PDE-5i',          selectivity: null, year: 2005, sponsor: 'Pfizer' },
  { drug: 'tadalafil',   class: 'PDE-5i',          selectivity: null, year: 2009, sponsor: 'Lilly' },
  { drug: 'riociguat',   class: 'sGC stimulator',  selectivity: null, year: 2013, sponsor: 'Bayer' },
  { drug: 'epoprostenol',class: 'PGI2 IV',         selectivity: null, year: 1995, sponsor: 'GSK' },
  { drug: 'selexipag',   class: 'IP agonist',      selectivity: null, year: 2015, sponsor: 'Actelion' },
  { drug: 'sotatercept', class: 'BMPR2 ligand trap', selectivity: null, year: 2024, sponsor: 'Merck' },
];

const columns = [
  { accessorKey: 'drug',        header: 'Drug' },
  { accessorKey: 'class',       header: 'Class' },
  { accessorKey: 'selectivity', header: 'ETA selectivity (×)', cell: (info) => info.getValue() ?? '—' },
  { accessorKey: 'year',        header: 'FDA year' },
  { accessorKey: 'sponsor',     header: 'Sponsor' },
];

export default function TanstackTableShowcase() {
  const [sorting, setSorting] = useState([{ id: 'year', desc: false }]);
  const table = useReactTable({
    data, columns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <LibraryShowcase
      category="§5A · Presentation decks · tables"
      library="@tanstack/react-table"
      npmInstall="npm install @tanstack/react-table"
      url="tanstack.com/table"
      headline={<>Sortable, filterable, <span style={{ color: 'var(--coral)', fontStyle: 'italic' }}>headless</span> tables.</>}
      subhead="Click any column header to sort. Headless = you own the markup, library only owns the state. Replaces every hand-rolled sortable table."
      tone="var(--coral)"
      noteBelow="Click column headers to toggle sort · sorting state is reactive · all rendering is your JSX"
    >
      <div style={{ flex: 1, minHeight: 0, width: '100%', overflow: 'auto', border: '1px solid var(--cream-hairline)', borderRadius: 'var(--radius-lg)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--fs-slide-tagline)' }}>
          <thead style={{ position: 'sticky', top: 0, background: 'color-mix(in srgb, var(--panel) 90%, transparent)', backdropFilter: 'blur(8px)' }}>
            {table.getHeaderGroups().map((hg) => (
              <tr key={hg.id}>
                {hg.headers.map((h) => {
                  const dir = h.column.getIsSorted();
                  return (
                    <th key={h.id} onClick={h.column.getToggleSortingHandler()} style={{
                      textAlign: 'left',
                      padding: '10px 12px',
                      borderBottom: '1px solid var(--cream-hairline)',
                      cursor: 'pointer',
                      color: 'var(--coral)',
                      fontFamily: 'var(--font-mono)',
                      textTransform: 'uppercase',
                      fontSize: 'var(--fs-slide-pageno)',
                      letterSpacing: 'var(--ls-mono-wide)',
                      userSelect: 'none',
                    }}>
                      <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                        {flexRender(h.column.columnDef.header, h.getContext())}
                        {dir === 'asc' ? <ArrowUp size={12} /> : dir === 'desc' ? <ArrowDown size={12} /> : <ChevronsUpDown size={12} style={{ opacity: 0.4 }} />}
                      </span>
                    </th>
                  );
                })}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row, i) => (
              <tr key={row.id} style={{ background: i % 2 ? 'transparent' : 'color-mix(in srgb, var(--panel) 50%, transparent)' }}>
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} style={{ padding: '8px 12px', borderBottom: '1px solid var(--cream-ghost)', fontVariantNumeric: 'tabular-nums', color: 'var(--cream)' }}>
                    {flexRender(cell.column.columnDef.cell ?? cell.column.columnDef.accessorFn ?? ((c) => c.getValue()), cell.getContext()) ?? cell.getValue()}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </LibraryShowcase>
  );
}
