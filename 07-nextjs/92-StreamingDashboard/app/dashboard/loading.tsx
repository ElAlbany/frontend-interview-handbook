// Problem 92, FILE 1 of 2 — route-level loading state.
// Place at: app/dashboard/loading.tsx (wraps the whole segment in Suspense)
export default function Loading() {
  return (
    <div style={{ height: 400, background: "#e2e8f0", borderRadius: 12 }}>
      Loading dashboard…
    </div>
  );
}
