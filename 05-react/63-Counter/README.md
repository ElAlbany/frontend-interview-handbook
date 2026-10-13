# 63. Counter with step

**Frequency in interviews:** very high

## The problem

Build a counter with + and − buttons, a configurable `step` prop (default 1), and the current value between them. They're checking functional state updates and accessibility labels, not styling.

## Approach and explanation

Tiny, but it checks: functional updates (`c => c + step`), props with defaults, and aria labels. Follow-ups: min/max clamping, reset button, history of values.

## Solution

`Counter.jsx`

```jsx
/**
 * Problem 63 — Counter with step
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function Counter({ step = 1 }) {
  const [count, setCount] = useState(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c - step)} aria-label="decrement">−</button>
      <span style={{ margin: "0 12px" }}>{count}</span>
      <button onClick={() => setCount((c) => c + step)} aria-label="increment">+</button>
    </div>
  );
}

// Usage in App.jsx:
//   <Counter />         — step 1
//   <Counter step={5} /> — step 5
```

`Counter.tsx`

```tsx
/**
 * Problem 63 — Counter with step (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useState } from "react";

interface CounterProps {
  step?: number;
}

export default function Counter({ step = 1 }: CounterProps) {
  const [count, setCount] = useState<number>(0);
  return (
    <div>
      <button onClick={() => setCount((c) => c - step)} aria-label="decrement">-</button>
      <span style={{ margin: "0 12px" }}>{count}</span>
      <button onClick={() => setCount((c) => c + step)} aria-label="increment">+</button>
    </div>
  );
}
```
