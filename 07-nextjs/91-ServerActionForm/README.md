# 91. Form → Server Action

**Frequency in interviews:** high

## The problem

Wire a form directly to a Server Action: validate with Zod on the server, use `useActionState` for pending/errors, and `revalidatePath` so the list refreshes. Know when a route handler is the right choice instead.

## Approach and explanation

The full modern loop: `action={serverAction}`, Zod validation on the server, `useActionState` for pending/errors, `revalidatePath` to refresh. Works without JS (progressive enhancement) — mention that.

## Solution

`app/actions.ts`

```ts
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
```

`components/CarForm.tsx`

```tsx
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
```
