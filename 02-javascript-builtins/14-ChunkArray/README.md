# 14. Chunk an array — `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`

**Frequency in interviews:** high

## The problem

Write `chunk(array, size)` that splits an array into sub-arrays of at most `size` elements: `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`. Watch the boundary: `size` of 0 or negative must be guarded.

## Examples

- Valid: `chunk([1,2,3,4,5], 2)` → `[[1,2],[3,4],[5]]`
- Invalid: `chunk([1,2], 0)` → infinite loop risk — guard: throw if `size < 1`

## Approach and explanation

O(n). Real use: batching API calls, pagination of a client-side list.

## Solution

`code.js`

```js
/**
 * Problem 14 — Chunk an array into groups of `size`
 * Run: node code.js
 */
function chunk(arr, size) {
  if (size < 1) throw new Error("size must be >= 1"); // guard: size 0 = infinite loop
  const out = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

console.log(chunk([1, 2, 3, 4, 5], 2)); // [[1,2],[3,4],[5]]
console.log(chunk([1, 2, 3], 5));       // [[1,2,3]]
console.log(chunk([], 3));              // []
try { chunk([1], 0); } catch (e) { console.log(e.message); } // 'size must be >= 1'
```

`code.ts`

```ts
/**
 * Problem 14 — Chunk an array (TypeScript, generic)
 * Run: node code.ts
 */
function chunk<T>(arr: T[], size: number): T[][] {
  if (size < 1) throw new Error("size must be >= 1");
  const out: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    out.push(arr.slice(i, i + size));
  }
  return out;
}

console.log(chunk([1, 2, 3, 4, 5], 2));       // [[1,2],[3,4],[5]]
console.log(chunk(["a", "b", "c"], 5));       // [['a','b','c']]
console.log(chunk<number>([], 3));            // []
try {
  chunk([1], 0);
} catch (e) {
  console.log((e as Error).message); // 'size must be >= 1'
}
```
