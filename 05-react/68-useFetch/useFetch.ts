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
