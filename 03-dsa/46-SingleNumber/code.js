/**
 * Problem 46 — Single number (all others appear twice). XOR: O(n), O(1).
 * Run: node code.js
 */
const singleNumber = (nums) => nums.reduce((acc, n) => acc ^ n, 0);
// a ^ a = 0, a ^ 0 = a -> pairs cancel, the loner survives

// fallback answer if XOR doesn't come to mind: frequency Map
function singleNumberMap(nums) {
  const count = new Map();
  for (const n of nums) count.set(n, (count.get(n) || 0) + 1);
  for (const [n, c] of count) if (c === 1) return n;
}

console.log(singleNumber([4, 1, 2, 1, 2]));    // 4
console.log(singleNumber([7]));                // 7
console.log(singleNumberMap([4, 1, 2, 1, 2])); // 4
