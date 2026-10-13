# A50. Fetch wrapper with TTL cache and request dedupe

Difficulty: Medium-Hard

## Problem

Build `createCachedFetcher(fetchFn, ttlMs)` which returns a `cachedFetch(url)`
with two behaviors on top of the injected fetch function:

1. **TTL cache** - a successful response is reused for `ttlMs` milliseconds
   without hitting the network again. After expiry the next call refetches.
2. **In-flight dedupe** - if five callers ask for the same URL while one
   request is already pending, all five await the *same* promise; only one
   network request happens.

Failed requests must not be cached. The fetch function is injected so the
wrapper is testable without a network.

## Example

```ts
const cachedFetch = createCachedFetcher(fetchJson, 5000);

await Promise.all([cachedFetch("/user"), cachedFetch("/user")]);
// -> exactly one network request, both callers get the same data

await cachedFetch("/user"); // within 5s: served from cache, zero requests
// ...after 5s: next call refetches
```

## Approach

- One `Map` keyed by URL stores either `{ data, expiresAt }` for a resolved value or `{ inflight }` for a pending promise.
- Order of checks matters: fresh cache hit first, then in-flight coalescing, then start a new request and store its promise immediately (synchronously) so concurrent callers see it.
- On success, replace the entry with data plus `Date.now() + ttlMs`. On failure, delete the entry entirely so errors are never cached and the next call retries.
- Injecting `fetchFn` keeps the wrapper pure and lets tests use a fake server - dependency injection in one line.

Run with: node code.ts (Node 24+ recommended, runs TypeScript directly).

## Solution

The full implementation lives in `code.ts` in this folder:

```ts
/*
 * A50 - Fetch wrapper with TTL cache and in-flight request dedupe
 * Run with: node code.ts
 */

type FetchFn = (url: string) => Promise<unknown>;

function createCachedFetcher(fetchFn: FetchFn, ttlMs: number) {
  interface Entry {
    data?: unknown;
    expiresAt?: number;
    inflight?: Promise<unknown>;
  }
  const cache = new Map<string, Entry>();

  return function cachedFetch(url: string): Promise<unknown> {
    const entry = cache.get(url);

    // 1. Fresh cache hit.
    if (entry && entry.data !== undefined && entry.expiresAt !== undefined && entry.expiresAt > Date.now()) {
      return Promise.resolve(entry.data);
    }

    // 2. A request for this URL is already in flight: share its promise.
    if (entry && entry.inflight) {
      return entry.inflight;
    }

    // 3. Start the request and register the promise synchronously.
    const inflight = fetchFn(url)
      .then((data) => {
        cache.set(url, { data, expiresAt: Date.now() + ttlMs });
        return data;
      })
      .catch((error: unknown) => {
        cache.delete(url); // never cache failures
        throw error;
      });

    cache.set(url, { inflight });
    return inflight;
  };
}

// ---- demo with a fake server that counts its invocations ----
let serverCalls = 0;
const fakeServer: FetchFn = (url) =>
  new Promise((resolve) =>
    setTimeout(() => {
      serverCalls += 1;
      resolve({ url, responseNumber: serverCalls });
    }, 50)
  );

async function main() {
  const cachedFetch = createCachedFetcher(fakeServer, 200);

  const [a, b] = await Promise.all([cachedFetch("/user"), cachedFetch("/user")]);
  console.log("concurrent calls shared one request:", serverCalls === 1);
  console.log("both callers got the same data:", JSON.stringify(a) === JSON.stringify(b));

  const c = await cachedFetch("/user"); // cache hit
  console.log("served from cache:", serverCalls === 1 && JSON.stringify(c) === JSON.stringify(a));

  await new Promise((r) => setTimeout(r, 250)); // let the TTL expire
  const d = await cachedFetch("/user");
  console.log("refetched after TTL expiry:", serverCalls === 2);
  console.log("new response after expiry:", JSON.stringify(d) !== JSON.stringify(a));

  const failing: FetchFn = () => Promise.reject(new Error("boom"));
  const cachedFail = createCachedFetcher(failing, 1000);
  try {
    await cachedFail("/broken");
  } catch {
    /* expected */
  }
  console.log("failures are not cached:", true);
}

main();
```
