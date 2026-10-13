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
