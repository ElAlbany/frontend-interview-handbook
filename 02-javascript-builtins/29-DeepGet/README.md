# 29. Deep get — lodash `get(obj, 'a.b.c', fallback)`

**Frequency in interviews:** high

## The problem

Implement lodash-style `get(obj, path, fallback)`: safely read a nested value by dot path, returning the fallback instead of crashing when any segment is missing. It's optional chaining with a dynamic path.

## Examples

- Valid: `get(obj, 'a.b.c')` → `1`
- Invalid: `get(obj, 'a.x.y')` → the fallback — never throws on a missing path

## Approach and explanation

This is what optional chaining (`obj?.a?.b?.c`) does with dynamic paths. Prevents the classic "Cannot read properties of undefined" crash.

## Solution

`code.js`

```js
/**
 * Problem 29 — lodash-style get(obj, 'a.b.c', fallback)
 * Run: node code.js
 */
function get(obj, path, fallback = undefined) {
  const keys = Array.isArray(path) ? path : path.split(".");
  let cur = obj;
  for (const key of keys) {
    if (cur == null) return fallback;
    cur = cur[key];
  }
  return cur === undefined ? fallback : cur;
}

const data = { user: { address: { city: "Cairo" } } };

console.log(get(data, "user.address.city"));      // 'Cairo'
console.log(get(data, "user.phone.number", "N/A")); // 'N/A' — missing path, no crash
console.log(get(null, "a.b", "fallback"));        // 'fallback'
```

`code.ts`

```ts
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
```
