/*
 * A42 - Multi-step form (wizard)
 * Reference implementation: requires a React + TypeScript project (Vite, Next.js, ...).
 */
import { useState, type ReactNode } from "react";

export interface Step {
  title: string;
  content: ReactNode;
  validate?: () => boolean;
}

interface MultiStepFormProps {
  steps: Step[];
  onSubmit: () => void;
}

export function MultiStepForm({ steps, onSubmit }: MultiStepFormProps) {
  const [index, setIndex] = useState(0);

  const isFirst = index === 0;
  const isLast = index === steps.length - 1;
  const current = steps[index];

  const next = () => {
    if (current.validate && current.validate() === false) return; // blocked
    if (isLast) onSubmit();
    else setIndex((i) => i + 1);
  };

  const back = () => setIndex((i) => Math.max(0, i - 1));

  return (
    <div>
      <header>
        <span>Step {index + 1} of {steps.length}</span>
        <h2>{current.title}</h2>
        <progress value={index + 1} max={steps.length} />
      </header>

      <section>{current.content}</section>

      <footer>
        <button onClick={back} disabled={isFirst}>Back</button>
        <button onClick={next}>{isLast ? "Submit" : "Next"}</button>
      </footer>
    </div>
  );
}
