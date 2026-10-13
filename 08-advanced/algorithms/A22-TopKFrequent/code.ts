/**
 * A22 — Top K frequent elements (TypeScript)
 * Run: node code.ts
 */
function topKFrequent(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  return [...freq.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, k)
    .map(([value]) => value);
}

// O(n) bucket-sort version: index = frequency
function topKFrequentBucket(nums: number[], k: number): number[] {
  const freq = new Map<number, number>();
  for (const n of nums) freq.set(n, (freq.get(n) ?? 0) + 1);
  const buckets: number[][] = Array.from({ length: nums.length + 1 }, () => []);
  for (const [value, count] of freq) buckets[count].push(value);
  const out: number[] = [];
  for (let i = buckets.length - 1; i >= 0 && out.length < k; i--) {
    out.push(...buckets[i]);
  }
  return out.slice(0, k);
}

console.log(topKFrequent([1, 1, 1, 2, 2, 3], 2));       // [1, 2]
console.log(topKFrequentBucket([1, 1, 1, 2, 2, 3], 2)); // [1, 2]
console.log(topKFrequent([1], 1));                      // [1]
