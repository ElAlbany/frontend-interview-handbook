# 45. Missing number in `0..n`

**Frequency in interviews:** medium

## The problem

An array contains `n` distinct numbers taken from the range `0..n` — exactly one is missing. Find it in O(n) time and O(1) space using the Gauss sum formula (or XOR as an alternative).

## Examples

- Valid: `[3,0,1]` → `2`
- Invalid: `[0,1,2]` → `3` (the missing one can be `n` itself — catches wrong sum formulas)

## Approach and explanation

Gauss sum minus actual sum. O(n), O(1) space. (XOR variant exists — same complexity, no overflow risk.)

## Solution

`code.js`

```js
/**
 * Problem 45 — Missing number in 0..n (Gauss sum). O(n), O(1).
 * Run: node code.js
 */
function missingNumber(nums) {
  const expected = (nums.length * (nums.length + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}

// XOR alternative — same complexity, no overflow risk
function missingNumberXor(nums) {
  let x = nums.length;
  nums.forEach((n, i) => (x ^= n ^ i));
  return x;
}

console.log(missingNumber([3, 0, 1]));       // 2
console.log(missingNumber([0, 1, 2]));       // 3 (the missing one can be n itself)
console.log(missingNumberXor([9,6,4,2,3,5,7,0,1])); // 8
```

`code.ts`

```ts
/**
 * Problem 45 — Missing number in 0..n (TypeScript)
 * Run: node code.ts
 */
function missingNumber(nums: number[]): number {
  const expected = (nums.length * (nums.length + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}

function missingNumberXor(nums: number[]): number {
  let x = nums.length;
  nums.forEach((n, i) => (x ^= n ^ i));
  return x;
}

console.log(missingNumber([3, 0, 1]));                 // 2
console.log(missingNumber([0, 1, 2]));                 // 3
console.log(missingNumberXor([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
```
