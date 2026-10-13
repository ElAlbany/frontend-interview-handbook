# 67. `useDebounce` custom hook

**Frequency in interviews:** high

## The problem

Extract debouncing into a reusable `useDebounce(value, delay)` hook that returns the value only after it has stopped changing for `delay` ms — then use it in a search. Hooks as reusable logic is the lesson.

## Approach and explanation

Extracting Problem 66's timer into a reusable hook. Follow-up: `useThrottle` (same shape, track last-run timestamp).

## Solution

`useDebounce.js`

```js
/**
 * Problem 67 — useDebounce custom hook
 * Hook file — import it from a component inside a React app.
 */
import { useEffect, useState } from "react";

export function useDebounce(value, delay = 300) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage inside a component:
//   const [query, setQuery] = useState("");
//   const debouncedQuery = useDebounce(query, 300);
//   useEffect(() => { /* fetch with debouncedQuery */ }, [debouncedQuery]);
```

`useDebounce.ts`

```ts
/**
 * Problem 67 — useDebounce hook (TypeScript, generic)
 * Hook file — import from a component inside a React app.
 */
import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay = 300): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

// Usage:
//   const debouncedQuery = useDebounce(query, 300); // T inferred as string
```
