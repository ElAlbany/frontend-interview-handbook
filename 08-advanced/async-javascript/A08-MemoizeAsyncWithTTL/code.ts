/**
 * A08 — Async memoize with TTL and request coalescing (TypeScript)
 * Run: node code.ts
 */
function memoizeAsync<A extends unknown[], R>(
  fn: (...args: A) => Promise<R>,
  ttl: number
): (...args: A) => Promise<R> {
  const cache = new Map<string, { value: R; expires: number }>();
  const inflight = new Map<string, Promise<R>>();

  return async (...args: A): Promise<R> => {
    const key = JSON.stringify(args);
    const hit = cache.get(key);
    if (hit && hit.expires > Date.now()) return hit.value;       // fresh cache hit
    const pending = inflight.get(key);
    if (pending) return pending;                                 // coalesce concurrent calls
    const p = fn(...args)
      .then((value) => {
        cache.set(key, { value, expires: Date.now() + ttl });
        return value;
      })
      .finally(() => inflight.delete(key));
    inflight.set(key, p);
    return p;
  };
}

let calls = 0;
const fetchUser = memoizeAsync(async (id: number) => {
  calls++;
  await new Promise((r) => setTimeout(r, 50));
  return { id };
}, 1000);

(async () => {
  await Promise.all([fetchUser(1), fetchUser(1), fetchUser(1)]); // 10 concurrent -> 1 fetch
  await fetchUser(1);                                            // cache hit
  console.log("underlying fn ran", calls, "time(s)");            // 1
})();
