# 65. Fetch and render a list with loading/error/empty states

**Frequency in interviews:** very high

## The problem

Fetch a list from an API and render it, handling **all four states**: loading, error, empty, success. Cancel the request on unmount with `AbortController`, and check `res.ok` — fetch doesn't throw on a 404.

## Approach and explanation

What they're testing: all **four** states (loading, error, empty, success), `res.ok` check, AbortController cleanup. Then say: "in Next.js I'd do this in a Server Component with `loading.tsx` — no useEffect at all."

## Solution

`Users.jsx`

```jsx
/**
 * Problem 65 — Fetch list with loading/error/empty states
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

export default function Users() {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch doesn't throw on 404!
        return res.json();
      })
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError")
          setState({ status: "error", data: null, error: err.message });
      });
    return () => controller.abort(); // cancel on unmount
  }, []);

  if (state.status === "loading") return <p>Loading…</p>;
  if (state.status === "error") return <p role="alert">Failed: {state.error}</p>;
  if (state.data.length === 0) return <p>No users yet.</p>;
  return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

`Users.tsx`

```tsx
/**
 * Problem 65 — Fetch list with loading/error/empty states (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

// discriminated union — the idiomatic TS way to model async state
type FetchState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: User[] };

export default function Users() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: User[]) => setState({ status: "success", data }))
      .catch((err: Error) => {
        if (err.name !== "AbortError") setState({ status: "error", error: err.message });
      });
    return () => controller.abort();
  }, []);

  if (state.status === "loading") return <p>Loading...</p>;
  if (state.status === "error") return <p role="alert">Failed: {state.error}</p>;
  if (state.data.length === 0) return <p>No users yet.</p>;
  return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
```
