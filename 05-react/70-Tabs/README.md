# 70. Tabs

**Frequency in interviews:** very high

## The problem

Build a Tabs component receiving `[{ label, content }]` with one active panel at a time. Graded details: `role="tablist"` / `role="tab"`, `aria-selected`, and content passed as React nodes (composition).

## Approach and explanation

Composition via props (content as React nodes), `role="tab"`/`aria-selected` for a11y. Follow-up: keyboard arrow-key navigation between tabs.

## Solution

`Tabs.jsx`

```jsx
/**
 * Problem 70 — Tabs component
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function Tabs({ tabs }) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, i) => (
          <button key={tab.label} role="tab" aria-selected={i === active}
                  onClick={() => setActive(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[active].content}</div>
    </div>
  );
}

// Usage in App.jsx:
//   <Tabs tabs={[
//     { label: "Details", content: <p>Details content</p> },
//     { label: "Reviews", content: <p>Reviews content</p> },
//   ]} />
```

`Tabs.tsx`

```tsx
/**
 * Problem 70 — Tabs (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { ReactNode, useState } from "react";

interface Tab {
  label: string;
  content: ReactNode;
}

interface TabsProps {
  tabs: Tab[];
}

export default function Tabs({ tabs }: TabsProps) {
  const [active, setActive] = useState(0);
  return (
    <div>
      <div role="tablist">
        {tabs.map((tab, i) => (
          <button key={tab.label} role="tab" aria-selected={i === active}
                  onClick={() => setActive(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div role="tabpanel">{tabs[active].content}</div>
    </div>
  );
}
```
