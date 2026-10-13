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
