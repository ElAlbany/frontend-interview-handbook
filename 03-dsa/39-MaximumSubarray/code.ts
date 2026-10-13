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
