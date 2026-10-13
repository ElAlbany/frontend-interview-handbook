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
