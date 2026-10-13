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
