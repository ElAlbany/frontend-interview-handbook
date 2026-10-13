# 17. Deep equality check

**Frequency in interviews:** high

## The problem

Write `deepEqual(a, b)`: compare two values recursively — objects are equal when they have the same keys with deeply equal values, regardless of key order. Explain why `===` alone can't do it (it compares references, not contents).

## Examples

- Valid: `deepEqual({a:1,b:{c:2}}, {a:1,b:{c:2}})` → `true`
- Invalid: `deepEqual({a:1}, {a:1,b:2})` → `false` (key-count check catches it)

## Approach and explanation

`===` compares objects by reference, so `{} === {}` is false — that's the "why" behind this question. O(n) over total keys.

## Solution

`code.js`

```js
/**
 * Problem 17 — Deep equality check
 * Run: node code.js
 */
function deepEqual(a, b) {
  if (a === b) return true;
  if (typeof a !== "object" || typeof b !== "object" || !a || !b) return false;
  const keysA = Object.keys(a), keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));               // true (key order irrelevant)
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }));                     // false
console.log({} === {});                                               // false — why this problem exists
```

`code.ts`

```ts
/**
 * Problem 17 — Deep equality (TypeScript, unknown + type guards)
 * Run: node code.ts
 */
function isObject(x: unknown): x is Record<string, unknown> {
  return typeof x === "object" && x !== null;
}

function deepEqual(a: unknown, b: unknown): boolean {
  if (a === b) return true;
  if (!isObject(a) || !isObject(b)) return false;
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);
  if (keysA.length !== keysB.length) return false;
  return keysA.every((k) => deepEqual(a[k], b[k]));
}

console.log(deepEqual({ a: 1, b: { c: 2 } }, { a: 1, b: { c: 2 } })); // true
console.log(deepEqual({ a: 1, b: 2 }, { b: 2, a: 1 }));               // true
console.log(deepEqual({ a: 1 }, { a: 1, b: 2 }));                     // false
console.log(deepEqual([1, [2]], [1, [2]]));                           // true
```
