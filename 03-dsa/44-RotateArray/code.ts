/**
 * Problem 44 — Rotate array right by k, in place (TypeScript)
 * Run: node code.ts
 */
function rotate(nums: number[], k: number): number[] {
  const n = nums.length;
  if (n === 0) return nums;
  k %= n;
  const rev = (l: number, r: number): void => {
    while (l < r) {
      [nums[l], nums[r]] = [nums[r], nums[l]];
      l++;
      r--;
    }
  };
  rev(0, n - 1);
  rev(0, k - 1);
  rev(k, n - 1);
  return nums;
}

console.log(rotate([1, 2, 3, 4, 5], 3)); // [3, 4, 5, 1, 2]
console.log(rotate([1, 2, 3, 4, 5], 8)); // [3, 4, 5, 1, 2]
console.log(rotate([1], 10));            // [1]
