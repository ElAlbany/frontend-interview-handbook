# 43. Intersection of two arrays

**Frequency in interviews:** medium

## The problem

Given two arrays, return their unique common elements. Use a `Set` for O(n+m). Follow-up variant (Intersection II): duplicates count — then you need a frequency Map instead.

## Examples

- Valid: `intersection([1,2,2,1], [2,2])` → `[2]` (unique results)
- Invalid: no common elements → `[]`

## Approach and explanation

O(n + m). If they ask for duplicates counted (intersection II), use a frequency Map and decrement.

## Solution

`code.js`

```js
/**
 * Problem 43 — Intersection of two arrays (unique / with-duplicates variants)
 * Run: node code.js
 */
function intersection(a, b) {
  const setB = new Set(b);
  return [...new Set(a.filter((x) => setB.has(x)))];
}

// variant: duplicates counted (Intersection II)
function intersectionWithDuplicates(a, b) {
  const count = new Map();
  for (const x of b) count.set(x, (count.get(x) || 0) + 1);
  const out = [];
  for (const x of a) {
    if (count.get(x) > 0) { out.push(x); count.set(x, count.get(x) - 1); }
  }
  return out;
}

console.log(intersection([1, 2, 2, 1], [2, 2]));                  // [2]
console.log(intersection([1, 2], [3, 4]));                        // []
console.log(intersectionWithDuplicates([1, 2, 2, 1], [2, 2]));    // [2, 2]
```

`code.ts`

```ts
/**
 * Problem 43 — Array intersection, unique and counted variants (TypeScript)
 * Run: node code.ts
 */
function intersection(a: number[], b: number[]): number[] {
  const setB = new Set(b);
  return [...new Set(a.filter((x) => setB.has(x)))];
}

function intersectionWithDuplicates(a: number[], b: number[]): number[] {
  const count = new Map<number, number>();
  for (const x of b) count.set(x, (count.get(x) ?? 0) + 1);
  const out: number[] = [];
  for (const x of a) {
    if ((count.get(x) ?? 0) > 0) {
      out.push(x);
      count.set(x, count.get(x)! - 1);
    }
  }
  return out;
}

console.log(intersection([1, 2, 2, 1], [2, 2]));               // [2]
console.log(intersection([1, 2], [3, 4]));                     // []
console.log(intersectionWithDuplicates([1, 2, 2, 1], [2, 2])); // [2, 2]
```
