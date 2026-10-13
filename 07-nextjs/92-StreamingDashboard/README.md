# 92. Streaming with loading.tsx + Suspense

**Frequency in interviews:** high

## The problem

Make a dashboard render its fast shell instantly while a slow section streams in via `<Suspense>`, with `loading.tsx` as the route-level fallback.

## Approach and explanation

The page shell renders instantly; the slow section streams in when its data resolves. A slow query delays only its own Suspense boundary, never the whole page.

## Solution

`app/dashboard/loading.tsx`

```tsx
// Problem 92, FILE 1 of 2 — route-level loading state.
// Place at: app/dashboard/loading.tsx (wraps the whole segment in Suspense)
export default function Loading() {
  return (
    <div style={{ height: 400, background: "#e2e8f0", borderRadius: 12 }}>
      Loading dashboard…
    </div>
  );
}
```

`app/dashboard/page.tsx`

```tsx
// Problem 92, FILE 2 of 2 — the page that streams a slow section.
// Place at: app/dashboard/page.tsx
import { Suspense } from "react";

async function Stats() {
  return <section>Fast stats — arrive immediately</section>;
}

async function SlowChart() {
  await new Promise((r) => setTimeout(r, 3000)); // simulate a slow query
  return <section>Slow chart — streamed in after 3s</section>;
}

export default function Dashboard() {
  return (
    <main>
      <Stats />
      <Suspense fallback={<p>Chart loading…</p>}>
        <SlowChart /> {/* a slow query delays only ITS boundary, never the page */}
      </Suspense>
    </main>
  );
}
```
