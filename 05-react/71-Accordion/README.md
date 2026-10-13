# 71. Accordion

**Frequency in interviews:** high

## The problem

Build an accordion where clicking a title expands its body and collapses the others. Follow-up: allow multiple open (state becomes a Set). Bonus knowledge: native `<details>`/`<summary>` does this with zero JS.

## Approach and explanation

Single-open accordion. Follow-up: multi-open → state becomes a Set of ids. Mention the CSS-only alternative: native `<details>/<summary>` — knowing the platform impresses.

## Solution

`Accordion.jsx`

```jsx
/**
 * Problem 71 — Accordion (single-open)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function Accordion({ items }) {
  const [openId, setOpenId] = useState(null);
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <button aria-expanded={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}>
            {item.title}
          </button>
          {openId === item.id && <div>{item.body}</div>}
        </div>
      ))}
    </div>
  );
}

// Usage:
//   <Accordion items={[
//     { id: 1, title: "What is React?", body: "A UI library." },
//     { id: 2, title: "What is Next.js?", body: "A React framework." },
//   ]} />
// Follow-up: multi-open -> state becomes a Set of ids.
// Zero-JS alternative: native <details>/<summary> elements.
```

`Accordion.tsx`

```tsx
/**
 * Problem 71 — Accordion (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { ReactNode, useState } from "react";

interface AccordionItem {
  id: string | number;
  title: string;
  body: ReactNode;
}

export default function Accordion({ items }: { items: AccordionItem[] }) {
  const [openId, setOpenId] = useState<string | number | null>(null);
  return (
    <div>
      {items.map((item) => (
        <div key={item.id}>
          <button aria-expanded={openId === item.id}
                  onClick={() => setOpenId(openId === item.id ? null : item.id)}>
            {item.title}
          </button>
          {openId === item.id && <div>{item.body}</div>}
        </div>
      ))}
    </div>
  );
}
```
