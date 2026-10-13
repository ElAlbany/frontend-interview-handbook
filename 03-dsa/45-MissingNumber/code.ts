/**
 * Problem 45 — Missing number in 0..n (TypeScript)
 * Run: node code.ts
 */
function missingNumber(nums: number[]): number {
  const expected = (nums.length * (nums.length + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}

function missingNumberXor(nums: number[]): number {
  let x = nums.length;
  nums.forEach((n, i) => (x ^= n ^ i));
  return x;
}

console.log(missingNumber([3, 0, 1]));                 // 2
console.log(missingNumber([0, 1, 2]));                 // 3
console.log(missingNumberXor([9, 6, 4, 2, 3, 5, 7, 0, 1])); // 8
