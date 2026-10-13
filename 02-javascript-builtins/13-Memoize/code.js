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
