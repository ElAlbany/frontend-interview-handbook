/**
 * Problem 29 — lodash-style get() (TypeScript)
 * Run: node code.ts
 */
function get(obj: unknown, path: string | string[], fallback?: unknown): unknown {
  const keys = Array.isArray(path) ? path : path.split(".");
  let cur: unknown = obj;
  for (const key of keys) {
    if (cur === null || cur === undefined) return fallback;
    cur = (cur as Record<string, unknown>)[key];
  }
  return cur === undefined ? fallback : cur;
}

const data = { user: { address: { city: "Cairo" } } };

console.log(get(data, "user.address.city"));        // 'Cairo'
console.log(get(data, "user.phone.number", "N/A")); // 'N/A'
console.log(get(null, "a.b", "fallback"));          // 'fallback'
