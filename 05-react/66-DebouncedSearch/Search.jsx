/**
 * Problem 66 — Debounced search (debounce + abort + loading)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) { setResults([]); return; }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        setResults(await res.json());
      } catch (err) {
        if (err.name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300); // debounce window
    return () => { clearTimeout(timer); controller.abort(); };
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)}
             placeholder="Search users…" aria-label="Search" />
      {loading && <p>Searching…</p>}
      <ul>{results.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </div>
  );
}
