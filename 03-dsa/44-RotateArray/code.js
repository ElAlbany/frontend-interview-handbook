/**
 * Problem 44 — Rotate array right by k, in place (three-reversal trick)
 * Run: node code.js
 */
function rotate(nums, k) {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n; // guard: k can exceed the length
  const rev = (l, r) => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++; r--; // separate lines — l++/r-- inside the swap assign to the wrong slots
    }
  };
  rev(0, n - 1); rev(0, k - 1); rev(k, n - 1);
  return nums;
}

console.log(rotate([1, 2, 3, 4, 5], 3));  // [3, 4, 5, 1, 2]
console.log(rotate([1, 2, 3, 4, 5], 8));  // [3, 4, 5, 1, 2] (8 % 5 = 3)
console.log(rotate([1], 10));             // [1]
