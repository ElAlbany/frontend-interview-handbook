/**
 * Problem 41 — Move zeroes to the end, in place, order preserved. O(n), O(1).
 * Run: node code.js
 */
function moveZeroes(nums) {
  let insert = 0; // where the next non-zero belongs
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== 0) {
      [nums[insert], nums[i]] = [nums[i], nums[insert]];
      insert++; // separate line — incrementing inside the swap assigns to the wrong slot
    }
  }
  return nums;
}

console.log(moveZeroes([0, 1, 0, 3, 12])); // [1, 3, 12, 0, 0]
console.log(moveZeroes([0, 0, 0]));        // [0, 0, 0]
console.log(moveZeroes([1, 2, 3]));        // [1, 2, 3]
