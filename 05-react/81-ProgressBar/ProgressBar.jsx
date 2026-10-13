/**
 * Problem 81 — Progress bar with ARIA + smooth transition
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

export default function ProgressBar({ value }) { // 0-100
  return (
    <div role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}
         style={{ background: "#e2e8f0", borderRadius: 8, overflow: "hidden", width: 320 }}>
      <div style={{
        width: `${value}%`, height: 12, background: "#3b82f6",
        transition: "width 300ms ease",
      }} />
    </div>
  );
}
// Usage: <ProgressBar value={65} />
