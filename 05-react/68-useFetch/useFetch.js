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
