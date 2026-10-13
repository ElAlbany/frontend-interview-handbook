# A36. usePrevious hook

Difficulty: Medium

## Problem

Write a custom hook `usePrevious(value)` that returns the value that `value`
had during the *previous* render of the calling component. On the first render
it should return `undefined`.

This is a common interview question because it tests whether you understand the
difference between values captured during render (props/state) and values that
persist across renders without triggering re-renders (refs).

## Example

```tsx
function Counter() {
  const [count, setCount] = useState(0);
  const prevCount = usePrevious(count);
  // render 1: count = 0, prevCount = undefined
  // render 2: count = 1, prevCount = 0
  return <button onClick={() => setCount(count + 1)}>
    now {count}, before {String(prevCount)}
  </button>;
}
```

## Approach

- A ref survives re-renders and mutating `ref.current` does not cause a re-render, which is exactly what we need.
- Update the ref inside `useEffect`, not during render. Effects run after the commit, so during render `ref.current` still holds the previous value.
- Keeping the update in an effect also keeps the render phase pure, which matters for concurrent rendering where renders can be discarded.
- Return `T | undefined` so callers handle the first render explicitly.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
