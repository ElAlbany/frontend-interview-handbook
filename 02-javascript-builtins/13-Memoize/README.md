# 13. Memoize a function

**Frequency in interviews:** high

## The problem

Write `memoize(fn)`: a wrapper that caches results by arguments so calling it twice with the same inputs runs `fn` only once. State your cache-key strategy (`JSON.stringify` of the args) and its limits (functions, circular objects).

## Examples

- Valid: same args twice → inner `fn` runs once, second call is cached
- Invalid: different args → cache miss, `fn` recomputes

## Approach and explanation

Cache keyed by serialized arguments. Mention limits: `JSON.stringify` breaks on functions/circular refs — production libs use nested Maps. This is exactly what `React.memo`/`useMemo` do conceptually.

## Solution

`code.js`

```js
/**
 * Problem 13 — Memoize: cache results by arguments
 * Run: node code.js
 */
function memoize(fn) {
  const cache = new Map();
  return function (...args) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  };
}

let calls = 0;
const slowSquare = memoize((n) => { calls++; return n * n; });

console.log(slowSquare(4)); // 16 (computed)
console.log(slowSquare(4)); // 16 (from cache — no recompute)
console.log(slowSquare(5)); // 25 (new args -> cache miss)
console.log("fn ran", calls, "times"); // 2
```

`code.ts`

```ts
/**
 * Problem 13 — Memoize (TypeScript)
 * Run: node code.ts
 */
function memoize<F extends (...args: never[]) => unknown>(fn: F): F {
  const cache = new Map<string, unknown>();
  return function (this: unknown, ...args: Parameters<F>) {
    const key = JSON.stringify(args);
    if (cache.has(key)) return cache.get(key);
    const result = fn.apply(this, args);
    cache.set(key, result);
    return result;
  } as F;
}

let calls = 0;
const slowSquare = memoize((n: number): number => {
  calls++;
  return n * n;
});

console.log(slowSquare(4)); // 16 (computed)
console.log(slowSquare(4)); // 16 (cached)
console.log(slowSquare(5)); // 25
console.log("fn ran", calls, "times"); // 2
```
