# 7. Remove duplicates from an array

**Frequency in interviews:** very high

## The problem

Given an array, return a new array with duplicates removed, keeping first-occurrence order. The follow-up you'll almost certainly get: dedupe an array of **objects** by a key like `id`.

## Examples

- Valid: `[1,2,2,3,1]` → `[1,2,3]`
- Invalid: `[]` → `[]` (empty array in, empty array out)

## Approach and explanation

`Set` keeps insertion order and dedupes primitives. O(n). Follow-up: dedupe an **array of objects** by id → `uniqueBy` above.

## Solution

`code.js`

```js
/**
 * Problem 7 — Remove duplicates (Set one-liner, manual loop, objects by key)
 * Run: node code.js
 */
const unique = (arr) => [...new Set(arr)];

function uniqueManual(arr) {
  const seen = new Set();
  const out = [];
  for (const item of arr) {
    if (!seen.has(item)) { seen.add(item); out.push(item); }
  }
  return out;
}

function uniqueBy(arr, key) {
  const seen = new Set();
  return arr.filter((item) => !seen.has(item[key]) && seen.add(item[key]));
}

console.log(unique([1, 2, 2, 3, 1]));       // [1, 2, 3]
console.log(unique([]));                    // []
console.log(unique(["a", "b", "a"]));       // ['a', 'b']
console.log(uniqueManual([1, 2, 2, 3, 1])); // [1, 2, 3]
console.log(uniqueManual([5, 5, 5]));       // [5]

const cars = [
  { id: 1, brand: "Toyota" },
  { id: 2, brand: "BMW" },
  { id: 1, brand: "Toyota" }, // duplicate id
];
console.log(uniqueBy(cars, "id")); // [{ id: 1, ... }, { id: 2, ... }]
```

`code.ts`

```ts
/**
 * Problem 7 — TypeScript version (generics + keyof)
 * Run: node code.ts   (lowercase .ts — Node 24 strips types natively)
 */
interface Car {
  id: number;
  brand: string;
}

const cars: Car[] = [
  { id: 1, brand: "Toyota" },
  { id: 2, brand: "BMW" },
  { id: 1, brand: "Toyota" },
];

function uniqueBy<T, K extends keyof T>(arr: T[], key: K): T[] {
  const set = new Set<T[K]>();
  return arr.filter((item) => !set.has(item[key]) && set.add(item[key]));
}

console.log(uniqueBy(cars, "id"));
console.log(uniqueBy(cars, "brand"));
// console.log(uniqueBy(cars, "color")); // compile error: not a key of Car
```
