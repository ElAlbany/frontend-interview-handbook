# 68. `useFetch` custom hook

**Frequency in interviews:** high

## The problem

Build a `useFetch(url)` hook returning `{ data, error, loading }`, with abort on unmount or URL change. Then say the senior line: in production you'd use TanStack Query for caching, retries, and deduping.

## Approach and explanation

Then say: "in production I'd reach for TanStack Query instead — it adds caching, deduping, retries, and background refetching on top of exactly this shape." Knowing when NOT to hand-roll is the senior signal.

## Solution

`useFetch.js`

```js
/**
 * Problem 68 — useFetch custom hook
 * Hook file — import it from a component inside a React app.
 */
import { useEffect, useState } from "react";

export function useFetch(url) {
  const [state, setState] = useState({ data: null, error: null, loading: true });
  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, error: null, loading: true });
    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(res.status))))
      .then((data) => setState({ data, error: null, loading: false }))
      .catch((err) => {
        if (err.name !== "AbortError")
          setState({ data: null, error: err.message, loading: false });
      });
    return () => controller.abort();
  }, [url]);
  return state;
}

// Usage:
//   const { data, error, loading } = useFetch("https://api.example.com/cars");
// Production note: TanStack Query does this + caching + retries + deduping.
```

`useFetch.ts`

```ts
/**
 * Problem 68 — useFetch hook (TypeScript, generic + discriminated union)
 * Hook file — import from a component inside a React app.
 */
import { useEffect, useState } from "react";

type FetchState<T> =
  | { data: null; error: null; loading: true }
  | { data: null; error: string; loading: false }
  | { data: T; error: null; loading: false };

export function useFetch<T>(url: string): FetchState<T> {
  const [state, setState] = useState<FetchState<T>>({ data: null, error: null, loading: true });

  useEffect(() => {
    const controller = new AbortController();
    setState({ data: null, error: null, loading: true });
    fetch(url, { signal: controller.signal })
      .then((res) => (res.ok ? res.json() : Promise.reject(new Error(String(res.status)))))
      .then((data: T) => setState({ data, error: null, loading: false }))
      .catch((err: Error) => {
        if (err.name !== "AbortError")
          setState({ data: null, error: err.message, loading: false });
      });
    return () => controller.abort();
  }, [url]);

  return state;
}

// Usage:
//   interface Car { id: string; brand: string }
//   const { data, error, loading } = useFetch<Car[]>("/api/cars");
```
