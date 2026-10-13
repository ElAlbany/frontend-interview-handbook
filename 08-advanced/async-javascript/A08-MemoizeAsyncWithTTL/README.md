# A08 — Async memoize with TTL and request coalescing

## The problem

Memoize an async function: cache resolved values for `ttl` milliseconds, and coalesce concurrent calls with the same arguments into one underlying request (ten simultaneous calls produce one fetch).

## Examples

- two sequential calls within the TTL -> fn runs once
- ten concurrent calls -> fn still runs once (coalescing)
- a call after the TTL expires -> fn runs again

## Approach

Two maps: `cache` stores value + expiry; `inflight` stores the in-flight promise per key. Check cache first, then inflight, then start the work — store its promise in inflight, and on success write the cache entry. `finally` removes the inflight entry so errors are not cached forever.

## Complexity

Time O(1) per call, space O(cache size).

## Run

```bash
node code.ts
```
