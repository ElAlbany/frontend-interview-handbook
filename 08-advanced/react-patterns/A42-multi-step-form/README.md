# A42. Multi-step form (wizard)

Difficulty: Medium

## Problem

Implement a `MultiStepForm` component driven by a `steps` configuration
array. Each step has a `title`, `content` (JSX), and an optional `validate()`
function. Requirements:

- Show a progress indicator (`Step 2 of 4` plus the current title).
- `Next` is blocked when the current step's `validate()` returns `false`.
- `Back` is disabled on the first step.
- On the last step the primary button reads `Submit` and calls `onSubmit`.

## Example

```tsx
const steps = [
  { title: "Account",  content: <AccountFields />,  validate: () => email.includes("@") },
  { title: "Profile",  content: <ProfileFields /> },
  { title: "Confirm",  content: <Summary /> },
];
<MultiStepForm steps={steps} onSubmit={() => api.signup(form)} />
```

## Approach

- Keep only the current index in state; derive `isFirst` / `isLast` instead of storing them (single source of truth).
- Gate `next()` on the optional validator: `steps[index].validate?.() === false` means block. Optional chaining keeps steps without validators free.
- Clamp `back()` with `Math.max(0, i - 1)`; small defensive habit that interviewers like.
- Form field values should live in a parent (or context) so moving between steps does not wipe them - mention this trade-off out loud.

Reference implementation. It requires a React + TypeScript project (for example Vite or Next.js) and is not meant to run with plain node.

## Solution

The full implementation lives in `code.tsx` in this folder:

```tsx
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
```
