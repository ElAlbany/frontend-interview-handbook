// Problem 90, FILE 2 of 2 — the client control that only updates the URL.
// Place at: components/SearchBox.tsx  →  render it inside the page above
"use client";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBox() {
  const router = useRouter();
  const params = useSearchParams();

  const update = (q: string) => {
    const next = new URLSearchParams(params);
    q ? next.set("q", q) : next.delete("q");
    next.delete("page"); // reset pagination on a new filter
    router.push(`?${next}`);
  };

  return <input onChange={(e) => update(e.target.value)} placeholder="Search brand…" />;
}
