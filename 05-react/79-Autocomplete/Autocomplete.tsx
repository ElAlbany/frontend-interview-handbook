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
