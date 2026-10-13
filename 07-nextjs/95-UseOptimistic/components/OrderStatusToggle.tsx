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
