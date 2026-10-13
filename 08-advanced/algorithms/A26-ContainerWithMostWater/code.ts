/**
 * A26 — Container with most water (TypeScript). Two pointers, greedy.
 * Run: node code.ts
 */
function maxArea(heights: number[]): number {
  let l = 0,
    r = heights.length - 1,
    best = 0;
  while (l < r) {
    const area = (r - l) * Math.min(heights[l], heights[r]);
    best = Math.max(best, area);
    if (heights[l] < heights[r]) l++; // always move the shorter side inward
    else r--;
  }
  return best;
}

console.log(maxArea([1, 8, 6, 2, 5, 4, 8, 3, 7])); // 49
console.log(maxArea([1, 1]));                      // 1
