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
