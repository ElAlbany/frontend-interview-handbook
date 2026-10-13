# 64. Todo list

**Frequency in interviews:** very high

## The problem

Build a todo list: add items via a form, toggle done with a checkbox, delete with a button. The requirements they watch for: immutable updates, stable id keys (never the index), and ignoring empty input.

## Approach and explanation

The full CRUD loop: immutable add/toggle/remove, stable `key` from an id (never the index), controlled input, empty-text guard. Follow-ups: filter all/active/done, persist to localStorage, edit-in-place.

## Solution

`TodoList.jsx`

```jsx
/**
 * Problem 64 — Todo list (add / toggle / delete)
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useState } from "react";

export default function TodoList() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");

  const add = (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((t) => [...t, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  };
  const toggle = (id) =>
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  const remove = (id) => setTodos((t) => t.filter((todo) => todo.id !== id));

  return (
    <form onSubmit={add}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo" />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
            <button type="button" onClick={() => remove(t.id)}>×</button>
          </li>
        ))}
      </ul>
    </form>
  );
}
```

`TodoList.tsx`

```tsx
/**
 * Problem 64 — Todo list (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { FormEvent, useState } from "react";

interface Todo {
  id: string;
  text: string;
  done: boolean;
}

export default function TodoList() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [text, setText] = useState("");

  const add = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!text.trim()) return;
    setTodos((t) => [...t, { id: crypto.randomUUID(), text: text.trim(), done: false }]);
    setText("");
  };
  const toggle = (id: string) =>
    setTodos((t) => t.map((todo) => (todo.id === id ? { ...todo, done: !todo.done } : todo)));
  const remove = (id: string) => setTodos((t) => t.filter((todo) => todo.id !== id));

  return (
    <form onSubmit={add}>
      <input value={text} onChange={(e) => setText(e.target.value)} placeholder="Add a todo" />
      <ul>
        {todos.map((t) => (
          <li key={t.id}>
            <label style={{ textDecoration: t.done ? "line-through" : "none" }}>
              <input type="checkbox" checked={t.done} onChange={() => toggle(t.id)} />
              {t.text}
            </label>
            <button type="button" onClick={() => remove(t.id)}>x</button>
          </li>
        ))}
      </ul>
    </form>
  );
}
```
