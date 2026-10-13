# 39. Maximum subarray (Kadane's)

**Frequency in interviews:** high

## The problem

Find the contiguous subarray with the largest sum and return that sum (Kadane's algorithm). At each element decide: extend the running sum or start fresh. Watch the all-negative input — the answer is the least-negative element, not 0.

## Examples

- Valid: `[-2,1,-3,4,-1,2,1,-5,4]` → `6` (the `[4,-1,2,1]` run)
- Invalid: all negatives `[-3,-1,-2]` → `-1` (must take one element — returning 0 is wrong)

## Approach and explanation

At each position: either continue the running sum or start fresh here. O(n) time, O(1) space. This is the gateway to dynamic programming thinking.

## Solution

`code.js`

```js
/**
 * Problem 39 — Maximum subarray (Kadane's). O(n) time, O(1) space.
 * Run: node code.js
 */
function maxSubArray(nums) {
  let best = nums[0], current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]); // extend or restart
    best = Math.max(best, current);
  }
  return best;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6  ([4,-1,2,1])
console.log(maxSubArray([-3, -1, -2]));                     // -1 (must take one element)
console.log(maxSubArray([5]));                              // 5
```

`code.ts`

```ts
/**
 * Problem 39 — Maximum subarray, Kadane's (TypeScript). O(n).
 * Run: node code.ts
 */
function maxSubArray(nums: number[]): number {
  let best = nums[0],
    current = nums[0];
  for (let i = 1; i < nums.length; i++) {
    current = Math.max(nums[i], current + nums[i]);
    best = Math.max(best, current);
  }
  return best;
}

console.log(maxSubArray([-2, 1, -3, 4, -1, 2, 1, -5, 4])); // 6
console.log(maxSubArray([-3, -1, -2]));                     // -1
console.log(maxSubArray([5]));                              // 5
```
