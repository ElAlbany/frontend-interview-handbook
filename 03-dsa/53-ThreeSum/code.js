/**
 * Problem 53 — 3Sum: all unique triplets summing to 0. Sort + two pointers. O(n^2).
 * Run: node code.js
 */
function threeSum(nums) {
  nums.sort((a, b) => a - b);
  const out = [];
  for (let i = 0; i < nums.length - 2; i++) {
    if (i > 0 && nums[i] === nums[i - 1]) continue; // skip duplicate anchors
    let l = i + 1, r = nums.length - 1;
    while (l < r) {
      const sum = nums[i] + nums[l] + nums[r];
      if (sum === 0) {
        out.push([nums[i], nums[l], nums[r]]);
        while (nums[l] === nums[++l]); // skip duplicate pairs
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
