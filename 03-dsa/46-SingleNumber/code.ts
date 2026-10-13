/**
 * Problem 46 — Single number via XOR (TypeScript). O(n), O(1).
 * Run: node code.ts
 */
const singleNumber = (nums: number[]): number => nums.reduce((acc, n) => acc ^ n, 0);

function singleNumberMap(nums: number[]): number | undefined {
  const count = new Map<number, number>();
  for (const n of nums) count.set(n, (count.get(n) ?? 0) + 1);
  for (const [n, c] of count) if (c === 1) return n;
  return undefined;
}

console.log(singleNumber([4, 1, 2, 1, 2]));    // 4
console.log(singleNumber([7]));                // 7
console.log(singleNumberMap([4, 1, 2, 1, 2])); // 4
