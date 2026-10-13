# 77. Sortable data table

**Frequency in interviews:** high

## The problem

Render an array of objects as a table with click-to-sort column headers that toggle direction on repeat clicks. Details: never sort the props array in place (spread first), and memoize the sorted result.

## Approach and explanation

Key details: never mutate `rows` (spread before sort), `useMemo` so sorting doesn't recompute every render, toggle direction on repeat click. Follow-up: server-side sorting via searchParams for big datasets.

## Solution

`DataTable.jsx`

```jsx
/**
 * Problem 77 — Sortable data table
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useMemo, useState } from "react";

export default function DataTable({ rows }) {
  const [sort, setSort] = useState({ key: "name", dir: 1 });
  const sorted = useMemo(
    () => [...rows].sort((a, b) =>
      String(a[sort.key]).localeCompare(String(b[sort.key])) * sort.dir
    ),
    [rows, sort]
  );

  const click = (key) =>
    setSort((s) => ({ key, dir: s.key === key ? -s.dir : 1 }));

  return (
    <table border="1" cellPadding="6">
      <thead>
        <tr>
          {["name", "price", "year"].map((key) => (
            <th key={key}>
              <button onClick={() => click(key)}>
                {key} {sort.key === key ? (sort.dir === 1 ? "▲" : "▼") : ""}
              </button>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sorted.map((row, i) => (
          <tr key={row.id ?? i}>
            <td>{row.name}</td><td>{row.price}</td><td>{row.year}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// Usage:
//   <DataTable rows={[
//     { id: 1, name: "Toyota Corolla", price: 22000, year: 2022 },
//     { id: 2, name: "BMW 320i", price: 41000, year: 2023 },
//   ]} />
```

`DataTable.tsx`

```tsx
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
```
