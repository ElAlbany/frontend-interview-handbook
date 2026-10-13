// Problem 91, FILE 1 of 2 — the Server Action.
// Place at: app/actions.ts
"use server";
import { revalidatePath } from "next/cache";
import { z } from "zod";
import { db } from "@/lib/db";

const schema = z.object({
  brand: z.string().min(1),
  price: z.coerce.number().positive(),
});

export async function createCar(prevState: any, formData: FormData) {
  const parsed = schema.safeParse(Object.fromEntries(formData));
  if (!parsed.success) return { error: parsed.error.flatten().fieldErrors };
  await db.car.create({ data: parsed.data });
  revalidatePath("/cars"); // refresh the cached list
  return { success: true };
}
