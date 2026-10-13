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
