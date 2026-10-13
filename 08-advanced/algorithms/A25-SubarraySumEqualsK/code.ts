/**
 * A25 — Subarray sum equals K (TypeScript). Prefix sums + frequency map.
 * Run: node code.ts
 */
function subarraySum(nums: number[], k: number): number {
  const prefixCount = new Map<number, number>([[0, 1]]); // empty prefix
  let sum = 0,
    count = 0;
  for (const n of nums) {
    sum += n;
    count += prefixCount.get(sum - k) ?? 0; // how many earlier prefixes fit
    prefixCount.set(sum, (prefixCount.get(sum) ?? 0) + 1);
  }
  return count;
}

console.log(subarraySum([1, 1, 1], 2));   // 2
console.log(subarraySum([1, 2, 3], 3));   // 2
console.log(subarraySum([-1, -1, 1], 0)); // 1
