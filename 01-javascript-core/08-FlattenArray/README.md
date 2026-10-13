# 8. Flatten a nested array

**Frequency in interviews:** very high

## The problem

Given an arbitrarily nested array like `[1,[2,[3,[4]]]]`, return a flat array `[1,2,3,4]`. Name the built-in (`arr.flat(Infinity)`) first, then write the recursive version — that's what's actually being tested. Common follow-up: flatten only to a given depth.

## Examples

- Valid: `[1,[2,[3,[4]]]]` → `[1,2,3,4]`
- Invalid: `[[]]` → `[]` (nested empties must not crash the recursion)

## Approach and explanation

Know that `arr.flat(Infinity)` exists, then write the recursive version. O(n) where n = total elements.

## Solution

`code.js`

```js
/**
 * Problem 8 — Flatten a nested array (built-in, recursive, to-depth)
 * Run: node code.js
 */
const flat = (arr) => arr.flat(Infinity);

function flatten(arr) {
  const out = [];
  for (const item of arr) {
    Array.isArray(item) ? out.push(...flatten(item)) : out.push(item);
  }
  return out;
}

function flattenDepth(arr, depth = 1) {
  if (depth === 0) return arr.slice();
  return arr.reduce(
    (out, item) => out.concat(Array.isArray(item) ? flattenDepth(item, depth - 1) : item),
    []
  );
}

console.log(flat([1, [2, [3, [4]]]]));        // [1, 2, 3, 4]
console.log(flatten([1, [2, [3, [4]]]]));     // [1, 2, 3, 4]
console.log(flatten([[]]));                   // []
console.log(flattenDepth([1, [2, [3]]], 1));  // [1, 2, [3]]
```

`code.ts`

```ts
/**
 * Problem 8 — Flatten a nested array (TypeScript, recursive type)
 * Run: node code.ts
 */
type NestedArray<T> = (T | NestedArray<T>)[];

function flatten<T>(arr: NestedArray<T>): T[] {
  const out: T[] = [];
  for (const item of arr) {
    Array.isArray(item) ? out.push(...flatten(item)) : out.push(item);
  }
  return out;
}

function flattenDepth<T>(arr: NestedArray<T>, depth = 1): unknown[] {
  if (depth === 0) return arr.slice();
  return arr.reduce<unknown[]>(
    (out, item) => out.concat(Array.isArray(item) ? flattenDepth(item, depth - 1) : item),
    []
  );
}

console.log(flatten([1, [2, [3, [4]]]]));       // [1, 2, 3, 4]
console.log(flatten([[]]));                     // []
console.log(flattenDepth([1, [2, [3]]], 1));    // [1, 2, [3]]
```
