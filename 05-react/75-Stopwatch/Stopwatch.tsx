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
