# 4. Two Sum

**Frequency in interviews:** very high

## The problem

Given an array of integers and a target number, return the **indices** of the two elements that add up to the target. Each input has exactly one solution, and you may not use the same element twice. Start with the O(n²) brute force, then improve it to O(n) — that progression is the test.

## Examples

- Valid: `twoSum([2,7,11,15], 9)` → `[0,1]`
- Invalid: `twoSum([1,2,3], 7)` → `undefined` (no pair — say out loud what you return)

## Approach and explanation

Brute force is O(n²); the hashmap makes it **O(n)** in one pass. This is THE most asked DSA question — the "store what you've seen in a Map" pattern solves half of all array problems.

## Solution

`code.js`

```js
/**
 * Problem 4 — Two Sum: indices of two numbers that add up to target. O(n).
 * Run: node code.js
 */
function twoSum(nums, target) {
  const seen = new Map(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    if (seen.has(need)) return [seen.get(need), i];
    seen.set(nums[i], i);
  }
  return undefined; // no pair found
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]  (2 + 7 = 9)
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([1, 2, 3], 7));      // undefined (no pair)
```

`code.ts`

```ts
/**
 * Problem 4 — Two Sum (TypeScript). O(n) with a Map.
 * Run: node code.ts
 */
function twoSum(nums: number[], target: number): [number, number] | undefined {
  const seen = new Map<number, number>(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    const j = seen.get(need);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }
  return undefined;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([1, 2, 3], 7));      // undefined
```
