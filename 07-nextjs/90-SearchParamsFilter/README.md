# 90. URL-driven filters (searchParams)

**Frequency in interviews:** very high

## The problem

Build a filterable, paginated list where the filter state lives in the URL `searchParams`: the Server Component reads them and queries the DB; the client control only updates the URL. Be ready to explain why (shareable links, working back button, SEO).

## Approach and explanation

The URL is the single source of truth — shareable, back-button-friendly, SEO-indexed, no state-sync bugs.

## Solution

`app/cars/page.tsx`

```tsx
// Problem 90, FILE 1 of 2 — the Server Component that reads the URL.
// Place at: app/cars/page.tsx
import { db } from "@/lib/db"; // your Prisma client

export default async function CarsPage({ searchParams }: { searchParams: Promise<Record<string, string | undefined>> }) {
  const { q = "", min, max, page = "1" } = await searchParams;
  const cars = await db.car.findMany({
    where: {
      brand: q ? { contains: q, mode: "insensitive" } : undefined,
      price: { gte: min ? +min : undefined, lte: max ? +max : undefined },
    },
    skip: (+page - 1) * 20,
    take: 20,
  });
  return (
    <ul>
      {cars.map((car: any) => (
        <li key={car.id}>{car.brand} — ${String(car.price)}</li>
      ))}
    </ul>
  );
}
// The URL is the single source of truth: /cars?q=toyota&page=2
```

`components/SearchBox.tsx`

```tsx
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
```
