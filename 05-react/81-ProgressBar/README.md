# 81. Progress bar (animated)

**Frequency in interviews:** medium

## The problem

Build a progress bar driven by a 0–100 `value` prop, with a smooth width transition and proper `progressbar` ARIA attributes.

## Approach and explanation

Simple, but the ARIA attributes (`role="progressbar"`, `aria-valuenow`) and CSS-transition-on-transform/width (not layout properties) are the graded details.

## Solution

`ProgressBar.jsx`

```jsx
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
```

`ProgressBar.tsx`

```tsx
/**
 * Problem 81 — Progress bar (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

interface ProgressBarProps {
  value: number; // 0-100
}

export default function ProgressBar({ value }: ProgressBarProps) {
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
```
