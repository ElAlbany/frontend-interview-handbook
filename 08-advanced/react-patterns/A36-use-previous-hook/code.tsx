/*
 * A36 - usePrevious hook
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useEffect, useRef } from "react";

export function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);

  useEffect(() => {
    ref.current = value; // runs after commit, so the render above saw the old value
  }, [value]);

  return ref.current;
}
