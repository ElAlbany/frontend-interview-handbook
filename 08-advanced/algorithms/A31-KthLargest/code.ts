/**
 * A31 — Kth largest element (TypeScript)
 * Run: node code.ts
 */
function findKthLargest(nums: number[], k: number): number {
  return [...nums].sort((a, b) => b - a)[k - 1]; // baseline: O(n log n)
}

// quickselect: O(n) average — partition, recurse only into the relevant side
function quickselect(nums: number[], k: number): number {
  const target = nums.length - k; // index in ASCENDING order
  let lo = 0,
    hi = nums.length - 1;
  while (lo <= hi) {
    const pivot = nums[hi];
    let store = lo;
    for (let i = lo; i < hi; i++) {
      if (nums[i] <= pivot) [nums[store], nums[i]] = [nums[i], nums[store++]];
    }
    [nums[store], nums[hi]] = [nums[hi], nums[store]];
    if (store === target) return nums[store];
    if (store < target) lo = store + 1;
    else hi = store - 1;
  }
  return -1;
}

console.log(findKthLargest([3, 2, 1, 5, 6, 4], 2));       // 5
console.log(quickselect([3, 2, 1, 5, 6, 4], 2));          // 5
console.log(quickselect([3, 2, 3, 1, 2, 4, 5, 5, 6], 4)); // 4
