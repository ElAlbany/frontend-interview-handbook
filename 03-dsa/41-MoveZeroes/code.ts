/**
 * Problem 41 — Move zeroes in place (TypeScript). O(n), O(1).
 * Run: node code.ts
 */
function moveZeroes(nums: number[]): number[] {
  let insert = 0;
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
