/**
 * Problem 4 — Two Sum (TypeScript). O(n) with a Map.
 * Run: node code.ts
 */
function twoSum(nums: number[], target: number): [number, number] | undefined {
  const seen = new Map<number, number>(); // value -> index
  for (let i = 0; i < nums.length; i++) {
    const need = target - nums[i];
    const j = seen.get(need);
    if (j !== undefined) return [j, i];
    seen.set(nums[i], i);
  }
  return undefined;
}

console.log(twoSum([2, 7, 11, 15], 9)); // [0, 1]
console.log(twoSum([3, 2, 4], 6));      // [1, 2]
console.log(twoSum([1, 2, 3], 7));      // undefined
