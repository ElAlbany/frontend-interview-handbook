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
