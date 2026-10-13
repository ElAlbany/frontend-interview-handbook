/**
 * A15 — Search in a rotated sorted array (TypeScript). O(log n).
 * Run: node code.ts
 */
function searchRotated(nums: number[], target: number): number {
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    const mid = (lo + hi) >> 1;
    if (nums[mid] === target) return mid;
    if (nums[lo] <= nums[mid]) {
      // left half is sorted — is the target inside it?
      if (nums[lo] <= target && target < nums[mid]) hi = mid - 1;
      else lo = mid + 1;
    } else {
      // right half is sorted
      if (nums[mid] < target && target <= nums[hi]) lo = mid + 1;
      else hi = mid - 1;
    }
  }
  return -1;
}

console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 0)); // 4
console.log(searchRotated([4, 5, 6, 7, 0, 1, 2], 3)); // -1
console.log(searchRotated([1], 1));                   // 0
