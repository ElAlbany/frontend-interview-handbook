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
