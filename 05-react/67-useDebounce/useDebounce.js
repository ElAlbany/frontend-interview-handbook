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
