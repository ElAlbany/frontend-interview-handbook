# 37. Binary search

**Frequency in interviews:** high

## The problem

Given a **sorted** array and a target, return the target's index or -1 — in O(log n) by halving the search space each step. State the precondition out loud: the array must be sorted, or the answer is garbage.

## Examples

- Valid: `binarySearch([1,3,5,7], 5)` → `2`
- Invalid: target `4` → `-1` (and say it: input MUST be sorted or the answer is garbage)

## Approach and explanation

O(log n) on a **sorted** array. One-liner worth memorizing: "halve the search space every step." Follow-up: recursive version.

## Solution

`code.js`

```js
/**
 * Problem 37 — Binary search on a SORTED array. O(log n).
 * Run: node code.js
 */
function binarySearch(arr, target) {
  let lo = 0, hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearch([1, 3, 5, 7, 9], 4)); // -1
console.log(binarySearch([], 1));              // -1
```

`code.ts`

```ts
/**
 * Problem 37 — Binary search (TypeScript). Input MUST be sorted. O(log n).
 * Run: node code.ts
 */
function binarySearch(arr: number[], target: number): number {
  let lo = 0,
    hi = arr.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (arr[mid] === target) return mid;
    arr[mid] < target ? (lo = mid + 1) : (hi = mid - 1);
  }
  return -1;
}

console.log(binarySearch([1, 3, 5, 7, 9], 5)); // 2
console.log(binarySearch([1, 3, 5, 7, 9], 4)); // -1
console.log(binarySearch([], 1));              // -1
```
