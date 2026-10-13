# 42. Merge two sorted arrays

**Frequency in interviews:** high

## The problem

Merge two already-sorted arrays into one sorted array in O(n+m): walk both with two pointers, taking the smaller head each time. This is the merge step of merge sort — name that connection out loud.

## Examples

- Valid: `mergeSorted([1,3],[2,4])` → `[1,2,3,4]`
- Invalid: `mergeSorted([], [1])` → `[1]` (one side empty — the `concat` tail handles it)

## Approach and explanation

O(n + m). This is the merge step of merge sort — say that out loud and you've named a sorting algorithm for free.

## Solution

`code.js`

```js
/**
 * Problem 42 — Merge two sorted arrays. O(n+m). This is merge sort's merge step.
 * Run: node code.js
 */
function mergeSorted(a, b) {
  const out = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
console.log(mergeSorted([], [1]));              // [1]
console.log(mergeSorted([1, 2], []));           // [1,2]
```

`code.ts`

```ts
/**
 * Problem 42 — Merge two sorted arrays (TypeScript). O(n+m).
 * Run: node code.ts
 */
function mergeSorted(a: number[], b: number[]): number[] {
  const out: number[] = [];
  let i = 0,
    j = 0;
  while (i < a.length && j < b.length) {
    out.push(a[i] <= b[j] ? a[i++] : b[j++]);
  }
  return out.concat(a.slice(i), b.slice(j));
}

console.log(mergeSorted([1, 3, 5], [2, 4, 6])); // [1,2,3,4,5,6]
console.log(mergeSorted([], [1]));              // [1]
```
