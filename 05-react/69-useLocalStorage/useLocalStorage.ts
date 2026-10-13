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
