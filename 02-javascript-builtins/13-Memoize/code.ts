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
