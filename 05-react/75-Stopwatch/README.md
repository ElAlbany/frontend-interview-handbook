# 75. Stopwatch

**Frequency in interviews:** high

## The problem

Build a stopwatch with start/pause/reset showing `mm:ss`. The graded detail: `setInterval` inside `useEffect` with cleanup, and a functional update so the effect doesn't depend on the seconds value.

## Approach and explanation

The interval-in-useEffect with cleanup is the point. Gotcha they'd probe: putting `seconds` in the dep array recreates the interval every tick — the functional update `s => s + 1` avoids needing it.

## Solution

`Stopwatch.jsx`

```jsx
/**
 * Problem 75 — Stopwatch (interval in useEffect)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000); // functional update!
    return () => clearInterval(id);
  }, [running]); // seconds is NOT a dep — the functional update removes the need

  return (
    <div>
      <p>{Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}</p>
      <button onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}
```

`Stopwatch.tsx`

```tsx
/**
 * Problem 75 — Stopwatch (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useEffect, useState } from "react";

export default function Stopwatch() {
  const [seconds, setSeconds] = useState(0);
  const [running, setRunning] = useState(false);

  useEffect(() => {
    if (!running) return;
    const id = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(id);
  }, [running]);

  return (
    <div>
      <p>
        {Math.floor(seconds / 60)}:{String(seconds % 60).padStart(2, "0")}
      </p>
      <button onClick={() => setRunning((r) => !r)}>{running ? "Pause" : "Start"}</button>
      <button onClick={() => { setRunning(false); setSeconds(0); }}>Reset</button>
    </div>
  );
}
```
