/**
 * Problem 66 — Debounced search (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    setLoading(true);
    const timer = setTimeout(async () => {
      try {
        const res = await fetch(
          `https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(query)}`,
          { signal: controller.signal }
        );
        setResults((await res.json()) as User[]);
      } catch (err) {
        if ((err as Error).name !== "AbortError") console.error(err);
      } finally {
        setLoading(false);
      }
    }, 300);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [query]);

  return (
    <div>
      <input value={query} onChange={(e) => setQuery(e.target.value)}
             placeholder="Search users..." aria-label="Search" />
      {loading && <p>Searching...</p>}
      <ul>{results.map((r) => <li key={r.id}>{r.name}</li>)}</ul>
    </div>
  );
}
