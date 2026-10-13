/**
 * Problem 40 — Contains duplicate + nearby-duplicate follow-up (TypeScript)
 * Run: node code.ts
 */
const containsDuplicate = (nums: number[]): boolean => new Set(nums).size !== nums.length;

function containsNearbyDuplicate(nums: number[], k: number): boolean {
  const window = new Set<number>();
  for (let i = 0; i < nums.length; i++) {
    if (window.has(nums[i])) return true;
    window.add(nums[i]);
    if (window.size > k) window.delete(nums[i - k]);
  }
  return false;
}

console.log(containsDuplicate([1, 2, 3, 1]));          // true
console.log(containsDuplicate([1, 2, 3]));             // false
console.log(containsNearbyDuplicate([1, 2, 3, 1], 3)); // true
console.log(containsNearbyDuplicate([1, 2, 3, 1], 2)); // false
