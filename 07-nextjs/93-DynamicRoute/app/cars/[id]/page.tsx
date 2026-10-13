// Problem 93 — Dynamic route with static params, per-page SEO, intentional 404.
// Place at: app/cars/[id]/page.tsx  →  matches /cars/anything
import { notFound } from "next/navigation";
import { db } from "@/lib/db";

export async function generateStaticParams() {
  const cars = await db.car.findMany({ select: { id: true }, take: 100 });
  return cars.map((c: { id: string }) => ({ id: c.id })); // pre-build the top 100
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await db.car.findUnique({ where: { id } });
  return { title: car ? `${car.brand} | CarHub` : "Not found" };
}

export default async function CarPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const car = await db.car.findUnique({ where: { id } });
  if (!car) notFound(); // -> not-found.tsx
  return <h1>{car.brand}</h1>;
}
