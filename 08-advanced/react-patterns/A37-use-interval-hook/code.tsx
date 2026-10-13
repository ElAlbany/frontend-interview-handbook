/*
 * A37 - useInterval hook
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, useRef } from "react";

export function useInterval(callback: () => void, delay: number | null): void {
  const savedCallback = useRef(callback);

  // Remember the latest callback so the interval never sees a stale closure.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up (and tear down) the interval itself.
  useEffect(() => {
    if (delay === null) return; // paused
    const id = setInterval(() => savedCallback.current(), delay);
    return () => clearInterval(id);
  }, [delay]);
}
