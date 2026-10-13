/**
 * A30 — House robber (TypeScript). 1D DP with rolling variables.
 * Run: node code.ts
 */
function rob(nums: number[]): number {
  let prevTwo = 0, // best up to i-2
    prevOne = 0;   // best up to i-1
  for (const money of nums) {
    [prevTwo, prevOne] = [prevOne, Math.max(prevOne, prevTwo + money)];
  }
  return prevOne;
}

console.log(rob([2, 7, 9, 3, 1])); // 12 (2 + 9 + 1)
console.log(rob([1, 2, 3, 1]));    // 4
console.log(rob([2, 1, 1, 2]));    // 4
