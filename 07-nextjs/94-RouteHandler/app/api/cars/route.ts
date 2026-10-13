// Problem 94 — Route handler (REST endpoint).
// Place at: app/api/cars/route.ts  →  serves GET/POST /api/cars
import { NextResponse } from "next/server";
import { z } from "zod";
import { db } from "@/lib/db";

const CreateCarSchema = z.object({
  brand: z.string().min(1),
  price: z.coerce.number().positive(),
});

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const cars = await db.car.findMany({ take: Number(searchParams.get("limit")) || 20 });
  return NextResponse.json(cars); // 200
}

export async function POST(req: Request) {
  const body = await req.json();
  const parsed = CreateCarSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.flatten() }, { status: 400 });
  }
  const car = await db.car.create({ data: parsed.data });
  return NextResponse.json(car, { status: 201 });
}
// Rule of thumb: Server Actions for your own UI; route handlers for webhooks,
// mobile apps, and public APIs.
