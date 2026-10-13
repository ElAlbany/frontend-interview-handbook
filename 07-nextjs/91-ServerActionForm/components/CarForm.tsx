// Problem 91, FILE 2 of 2 — the form that calls the action directly.
// Place at: components/CarForm.tsx
"use client";
import { useActionState } from "react";
import { createCar } from "@/app/actions";

export default function CarForm() {
  const [state, formAction, pending] = useActionState(createCar, null);
  return (
    <form action={formAction}>
      <input name="brand" required placeholder="Brand" />
      <input name="price" type="number" required placeholder="Price" />
      {state?.error && <p role="alert">Fix the highlighted fields</p>}
      {state?.success && <p>Car added!</p>}
      <button disabled={pending}>{pending ? "Saving…" : "Add car"}</button>
    </form>
  );
}
// No fetch, no API route — and it works even with JS disabled (progressive enhancement).
