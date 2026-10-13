/**
 * Problem 65 — Fetch list with loading/error/empty states (TypeScript)
 * React component — needs a React + TypeScript app (Vite: npm create vite@latest -- --template react-ts).
 */

import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

// discriminated union — the idiomatic TS way to model async state
type FetchState =
  | { status: "loading" }
  | { status: "error"; error: string }
  | { status: "success"; data: User[] };

export default function Users() {
  const [state, setState] = useState<FetchState>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    fetch("https://jsonplaceholder.typicode.com/users", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      })
      .then((data: User[]) => setState({ status: "success", data }))
      .catch((err: Error) => {
        if (err.name !== "AbortError") setState({ status: "error", error: err.message });
      });
    return () => controller.abort();
  }, []);

  if (state.status === "loading") return <p>Loading...</p>;
  if (state.status === "error") return <p role="alert">Failed: {state.error}</p>;
  if (state.data.length === 0) return <p>No users yet.</p>;
  return <ul>{state.data.map((u) => <li key={u.id}>{u.name}</li>)}</ul>;
}
