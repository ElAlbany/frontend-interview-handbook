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
