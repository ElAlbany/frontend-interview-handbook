# 89. Fetch and render in a Server Component

**Frequency in interviews:** very high

## The problem

Render a list fetched inside an async Server Component with a 60-second ISR cache. Be ready to map cache options to rendering modes: `force-cache` → SSG, `no-store` → SSR, `revalidate` → ISR.

## Approach and explanation

No `useEffect`, no loading state in the component — the component is async, and `loading.tsx` handles the wait. Be ready to explain each cache option: `force-cache` (SSG), `no-store` (SSR), `revalidate` (ISR).

## Solution

`app/cars/page.tsx`

```tsx
// Problem 89 — Fetch in a Server Component.
// Needs a Next.js project: npx create-next-app@latest
// Place at: app/cars/page.tsx  →  then visit /cars
export default async function CarsPage() {
  const res = await fetch("https://jsonplaceholder.typicode.com/users", {
    next: { revalidate: 60 }, // ISR: refresh at most every 60s
  });
  if (!res.ok) throw new Error("Failed to load"); // -> error.tsx
  const users = await res.json();
  return (
    <ul>
      {users.map((u: any) => (
        <li key={u.id}>{u.name}</li>
      ))}
    </ul>
  );
}
// Cache options map to rendering modes:
//   force-cache -> SSG | no-store -> SSR | revalidate -> ISR
```
