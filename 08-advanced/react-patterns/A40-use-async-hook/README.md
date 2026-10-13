# A40. useAsync hook

Difficulty: Medium-Hard

## Problem

Build `useAsync(asyncFn, immediate)` that wraps any promise-returning
function and exposes a small state machine:

- `status`: `"idle" | "pending" | "success" | "error"`
- `data`: the resolved value (or `null`)
- `error`: the rejection reason (or `null`)
- `execute()`: a function to (re)run the async operation manually

If `immediate` is true the operation starts on mount. Setting state after the
component has unmounted must not happen.

## Example

```tsx
function Users() {
  const { status, data, error, execute } = useAsync(() => fetch("/api/users").then(r => r.json()));
  if (status === "pending") return <p>Loading...</p>;
  if (status === "error") return <button onClick={execute}>Retry ({error.message})</button>;
  return <ul>{data.map(u => <li key={u.id}>{u.name}</li>)}</ul>;
}
```

## Approach

- Model the result as one state object with a `status` discriminant - it makes impossible states (data AND error set) unrepresentable.
- Track unmounting with a `mounted` ref and guard every `setState`; calling setState after unmount is a no-op warning in React and a bug in general.
- Wrap `execute` in `useCallback` so the `immediate` effect does not loop.
- Interview follow-up: concurrent executions can resolve out of order. A production version would also ignore responses that are not the latest call (race guard).

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
