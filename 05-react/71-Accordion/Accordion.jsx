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
