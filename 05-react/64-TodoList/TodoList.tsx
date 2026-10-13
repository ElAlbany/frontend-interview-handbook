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
