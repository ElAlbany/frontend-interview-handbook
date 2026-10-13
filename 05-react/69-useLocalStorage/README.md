# 69. `useLocalStorage` hook

**Frequency in interviews:** high

## The problem

Build a `useLocalStorage(key, initial)` hook that behaves like `useState` but persists to localStorage and hydrates from it. Details that score: lazy initialization, try/catch (private mode throws), and the SSR guard for Next.js.

## Approach and explanation

Details that score: lazy initializer (function form of useState so JSON.parse runs once), try/catch (private-mode Safari throws), JSON serialization. Mention SSR: `localStorage` doesn't exist on the server — guard with `typeof window` in Next.js.

## Solution

`useLocalStorage.js`

```js
/**
 * Problem 69 — useLocalStorage hook (persisted state)
 * Hook file — import it from a component inside a React app.
 */
import { useEffect, useState } from "react";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? JSON.parse(saved) : initialValue;
    } catch {
      return initialValue; // private-mode Safari throws on access
    }
  });
  useEffect(() => {
    try { localStorage.setItem(key, JSON.stringify(value)); } catch { /* ignore */ }
  }, [key, value]);
  return [value, setValue];
}

// Usage:
//   const [theme, setTheme] = useLocalStorage("theme", "light");
// Next.js note: guard with typeof window !== "undefined" — no localStorage on the server.
```

`useLocalStorage.ts`

```ts
/**
 * Problem 69 — useLocalStorage hook (TypeScript, generic)
 * Hook file — import from a component inside a React app.
 */
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      const saved = localStorage.getItem(key);
      return saved !== null ? (JSON.parse(saved) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch {
      /* storage unavailable */
    }
  }, [key, value]);

  return [value, setValue] as const;
}

// Usage:
//   const [theme, setTheme] = useLocalStorage<"light" | "dark">("theme", "light");
```
