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
