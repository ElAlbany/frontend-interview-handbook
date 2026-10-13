/**
 * A23 — Product of array except self (TypeScript). No division, O(n).
 * Run: node code.ts
 */
function productExceptSelf(nums: number[]): number[] {
  const n = nums.length;
  const out = new Array<number>(n).fill(1);
  let prefix = 1;
  for (let i = 0; i < n; i++) {
    out[i] = prefix;           // product of everything to the left
    prefix *= nums[i];
  }
  let suffix = 1;
  for (let i = n - 1; i >= 0; i--) {
    out[i] *= suffix;          // multiply in everything to the right
    suffix *= nums[i];
  }
  return out;
}

console.log(productExceptSelf([1, 2, 3, 4]));    // [24, 12, 8, 6]
console.log(productExceptSelf([-1, 1, 0, -3, 3])); // [0, 0, 9, 0, 0]
