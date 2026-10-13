/**
 * Problem 53 — 3Sum: unique triplets summing to 0 (TypeScript). O(n^2).
 * Run: node code.ts
 */
function threeSum(nums: number[]): number[][] {
  nums.sort((a, b) => a - b);
  const out: number[][] = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue;
    let l = i + 1,
      r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        out.push([nums[i], nums[l], nums[r]]);
        while (nums[l] === nums[++l]);
        while (nums[r] === nums[--r]);
      } else if (sum < 0) l++;
      else r--;
    }
  }
  return out;
}

console.log(threeSum([-1, 0, 1, 2, -1, -4])); // [[-1,-1,2], [-1,0,1]]
console.log(threeSum([0, 0, 0]));             // [[0,0,0]]
console.log(threeSum([1, 2, 3]));             // []
