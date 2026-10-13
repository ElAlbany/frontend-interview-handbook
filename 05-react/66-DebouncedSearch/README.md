# 66. Debounced search input

**Frequency in interviews:** very high

## The problem

Build a search box that queries an API as the user types: debounce the input (~300ms), abort the previous request when a new one fires, and show loading + results. This one task tests effects, cleanup, and race conditions at the same time.

## Approach and explanation

The whole pattern in one component: debounce via cleanup-cleared timeout, abort in-flight requests when the query changes (race-condition fix), encode the query string. This single task covers useEffect cleanup, async state, and races — that's why it's asked so often.

## Solution

`Search.jsx`

```jsx
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
```

`Search.tsx`

```tsx
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
```
