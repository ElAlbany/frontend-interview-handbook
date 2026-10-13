/*
 * A40 - useAsync hook
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useCallback, useEffect, useRef, useState } from "react";

export interface AsyncState<T> {
  status: "idle" | "pending" | "success" | "error";
  data: T | null;
  error: Error | null;
}

export function useAsync<T>(asyncFn: () => Promise<T>, immediate = true) {
  const [state, setState] = useState<AsyncState<T>>({
    status: "idle",
    data: null,
    error: null,
  });

  const mounted = useRef(true);
  useEffect(() => {
    mounted.current = true;
    return () => {
      mounted.current = false;
    };
  }, []);

  const execute = useCallback(async () => {
    setState({ status: "pending", data: null, error: null });
    try {
      const data = await asyncFn();
      if (mounted.current) setState({ status: "success", data, error: null });
    } catch (error) {
      if (mounted.current) {
        setState({ status: "error", data: null, error: error as Error });
      }
    }
  }, [asyncFn]);

  useEffect(() => {
    if (immediate) void execute();
  }, [execute, immediate]);

  return { ...state, execute };
}
