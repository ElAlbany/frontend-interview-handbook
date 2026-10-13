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
