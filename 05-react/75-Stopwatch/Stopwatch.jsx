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
