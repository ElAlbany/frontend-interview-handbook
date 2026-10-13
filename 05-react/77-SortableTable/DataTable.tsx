/**
 * Problem 77 — Sortable data table (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useMemo, useState } from "react";

interface Row {
  id?: number;
  name: string;
  price: number;
  year: number;
}

type SortKey = keyof Omit<Row, "id">;

interface SortState {
  key: SortKey;
  dir: 1 | -1;
}

export default function DataTable({ rows }: { rows: Row[] }) {
  const [sort, setSort] = useState<SortState>({ key: "name", dir: 1 });

  const sorted = useMemo(
    () =>
      [...rows].sort(
        (a, b) => String(a[sort.key]).localeCompare(String(b[sort.key])) * sort.dir
      ),
    [rows, sort]
  );

  const click = (key: SortKey) =>
    setSort((s) => ({ key, dir: s.key === key ? (s.dir === 1 ? -1 : 1) : 1 }));

  return (
    <table border={1} cellPadding={6}>
      <thead>
        <tr>
          {(["name", "price", "year"] as SortKey[]).map((key) => (
            <th key={key}>
              <button onClick={() => click(key)}>
                {key} {sort.key === key ? (sort.dir === 1 ? "^" : "v") : ""}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={row.id ?? i}>
            <td>{row.name}</td>
            <td>{row.price}</td>
            <td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
