# 79. Autocomplete / typeahead

**Frequency in interviews:** high

## The problem

Build an autocomplete: debounced fetching, aborting stale requests, keyboard navigation (arrows / Enter / Escape), a highlighted option, and combobox/listbox ARIA roles.

## Approach and explanation

This is the live-coded twin of the system-design question: debounce + abort + keyboard nav + ARIA roles. Being able to *build* it, not just describe it, is a differentiator.

## Solution

`Autocomplete.jsx`

```jsx
/**
 * Problem 79 — Autocomplete (debounce + abort + keyboard nav)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

// same hook as Problem 67, inlined so this file is self-contained
function useDebounce(value, delay = 250) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState([]);
  const [highlight, setHighlight] = useState(-1);
  const debounced = useDebounce(query);

  useEffect(() => {
    if (!debounced) { setOptions([]); return; }
    const controller = new AbortController();
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(debounced)}`,
          { signal: controller.signal })
      .then((r) => r.json())
      .then(setOptions)
      .catch(() => {});
    return () => controller.abort();
  }, [debounced]);

  const onKeyDown = (e) => {
    if (e.key === "ArrowDown") setHighlight((h) => Math.min(h + 1, options.length - 1));
    if (e.key === "ArrowUp") setHighlight((h) => Math.max(h - 1, 0));
    if (e.key === "Enter" && highlight >= 0) { setQuery(options[highlight].name); setOptions([]); }
    if (e.key === "Escape") setOptions([]);
  };

  return (
    <div>
      <input value={query}
             onChange={(e) => { setQuery(e.target.value); setHighlight(-1); }}
             onKeyDown={onKeyDown}
             role="combobox" aria-expanded={options.length > 0}
             placeholder="Type a name…" />
      <ul role="listbox" style={{ listStyle: "none", padding: 0 }}>
        {options.map((o, i) => (
          <li key={o.id} role="option" aria-selected={i === highlight}
              style={{ padding: 4, cursor: "pointer",
                       background: i === highlight ? "#e2e8f0" : "transparent" }}
              onClick={() => { setQuery(o.name); setOptions([]); }}>
            {o.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```

`Autocomplete.tsx`

```tsx
/**
 * Problem 79 — Autocomplete (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { KeyboardEvent, useEffect, useState } from "react";

interface Option {
  id: number;
  name: string;
}

function useDebounce<T>(value: T, delay = 250): T {
  const [debounced, setDebounced] = useState<T>(value);
  useEffect(() => {
    const timer = setTimeout(() => setDebounced(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);
  return debounced;
}

export default function Autocomplete() {
  const [query, setQuery] = useState("");
  const [options, setOptions] = useState<Option[]>([]);
  const [highlight, setHighlight] = useState(-1);
  const debounced = useDebounce(query);

  useEffect(() => {
    if (!debounced) {
      setOptions([]);
      return;
    }
    const controller = new AbortController();
    fetch(`https://jsonplaceholder.typicode.com/users?name_like=${encodeURIComponent(debounced)}`,
          { signal: controller.signal })
      .then((r) => r.json())
      .then((data: Option[]) => setOptions(data))
      .catch(() => {});
    return () => controller.abort();
  }, [debounced]);

  const select = (option: Option) => {
    setQuery(option.name);
    setOptions([]);
  };

  const onKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "ArrowDown") setHighlight((h) => Math.min(h + 1, options.length - 1));
    if (e.key === "ArrowUp") setHighlight((h) => Math.max(h - 1, 0));
    if (e.key === "Enter" && highlight >= 0) select(options[highlight]);
    if (e.key === "Escape") setOptions([]);
  };

  return (
    <div>
      <input value={query}
             onChange={(e) => { setQuery(e.target.value); setHighlight(-1); }}
             onKeyDown={onKeyDown}
             role="combobox" aria-expanded={options.length > 0}
             placeholder="Type a name..." />
      <ul role="listbox" style={{ listStyle: "none", padding: 0 }}>
        {options.map((o, i) => (
          <li key={o.id} role="option" aria-selected={i === highlight}
              style={{ padding: 4, cursor: "pointer",
                       background: i === highlight ? "#e2e8f0" : "transparent" }}
              onClick={() => select(o)}>
            {o.name}
          </li>
        ))}
      </ul>
    </div>
  );
}
```
