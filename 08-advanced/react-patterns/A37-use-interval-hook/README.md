# A37. useInterval hook

Difficulty: Medium

## Problem

Implement `useInterval(callback, delay)`, a declarative replacement for
`setInterval`. Requirements:

- The interval must always call the *latest* version of `callback`
  (no stale closure over old state).
- Setting `delay` to `null` must pause the interval.
- Changing `delay` must restart the interval with the new delay.

The naive version (`useEffect(() => { const id = setInterval(callback, delay); ... }, [delay])`)
captures the callback from the render where the effect ran and never sees
updated state - this hook exists to fix that.

## Example

```tsx
function Timer() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(true);

  useInterval(() => setSeconds((s) => s + 1), running ? 1000 : null);
  return <button onClick={() => setRunning((r) => !r)}>{seconds}s</button>;
}
```

## Approach

- Keep the latest callback in a ref that is updated on every render (or in an effect). The interval then calls `savedCallback.current()`, so it never goes stale.
- Use a second effect keyed only by `delay` to create/clear the interval. Because the callback lives in a ref, changing the callback does not restart the timer.
- `delay === null` is the pause signal: skip creating the interval entirely.
- Always return a cleanup that calls `clearInterval`, otherwise timers leak on unmount.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
