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
