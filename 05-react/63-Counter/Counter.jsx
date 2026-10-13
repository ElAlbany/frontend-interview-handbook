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
