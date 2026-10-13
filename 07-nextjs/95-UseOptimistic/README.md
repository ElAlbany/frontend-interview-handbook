# 95. Optimistic updates with useOptimistic (React 19 / Next.js)

**Frequency in interviews:** medium

## The problem

Build an admin toggle that updates instantly using `useOptimistic` with a Server Action, auto-reverting if the action throws — the React 19 successor to hand-rolled optimistic state.

## Approach and explanation

`useOptimistic` shows the expected result before the server confirms and auto-reverts if the action throws — the React 19 way to do Problem 80's manual optimistic pattern.

---

# Interview-Day Strategy for Live Coding

- **Narrate constantly.** Silence reads as stuck; thinking out loud reads as methodical. "First I'll handle the happy path, then edge cases."
- **Clarify before coding.** "Should the search be case-sensitive? What does empty input do?" — 30 seconds of questions signals seniority.
- **Happy path first, then harden.** Working code beats perfect code that never got finished.
- **Test out loud.** Walk through `['a','b']` or an empty array by hand; interviewers grade the testing instinct.
- **Name the complexity** for every algorithm — O(n) time, O(1) space — before they ask.
- **Know your tiers.** If time is short, master — frequency: very high first: they're the majority of what juniors actually face.

## Solution

`components/OrderStatusToggle.tsx`

```tsx
// Problem 95 — useOptimistic + Server Action (React 19 / Next.js 16).
// Place at: components/OrderStatusToggle.tsx — the action lives in app/actions.ts
"use client";
import { useOptimistic, useTransition } from "react";
import { updateOrderStatus } from "@/app/actions"; // "use server" action

export default function OrderStatusToggle({ order }: { order: { id: string; status: string } }) {
  const [optimisticStatus, setOptimisticStatus] = useOptimistic(order.status);
  const [pending, startTransition] = useTransition();

  const markShipped = () =>
    startTransition(async () => {
      setOptimisticStatus("shipped");                    // UI updates instantly
      await updateOrderStatus(order.id, "shipped");      // throws -> auto-revert
    });

  return (
    <button onClick={markShipped} disabled={pending || optimisticStatus === "shipped"}>
      {optimisticStatus === "shipped" ? "✓ Shipped" : "Mark shipped"}
    </button>
  );
}
```
