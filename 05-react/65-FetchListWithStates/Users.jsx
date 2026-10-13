/**
 * Problem 65 — Fetch list with loading/error/empty states
 * React component — NOT runnable with plain node.
 * To try it: create a Vite React app (npm create vite@latest), paste this
 * component into src/, and render it from App.jsx.
 */

import { useEffect, useState } from "react";

export default function Users() {
  const [state, setState] = useState({ status: "loading", data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`); // fetch doesn't throw on 404!
        return res.json();
      })
      .then((data) => setState({ status: "success", data, error: null }))
      .catch((err) => {
        if (err.name !== "AbortError")
          setState({ status: "error", data: null, error: err.message });
      });
    return () => controller.abort(); // cancel on unmount
  }, []);

  if (state.status === "loading") return <p>Loading…</p>;
  if (state.status === "error") return <p role="alert">Failed: {state.error}</p>;
  if (state.data.length === 0) return <p>No users yet.</p>;
  return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
