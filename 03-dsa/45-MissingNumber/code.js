/**
 * Problem 45 — Missing number in 0..n (Gauss sum). O(n), O(1).
 * Run: node code.js
 */
function missingNumber(nums) {
  const expected = (nums.length * (nums.length + 1)) / 2;
  return expected - nums.reduce((a, b) => a + b, 0);
}

// XOR alternative — same complexity, no overflow risk
function missingNumberXor(nums) {
  let x = nums.length;
  nums.forEach((n, i) => (x ^= n ^ i));
  return x;
}

console.log(missingNumber([3, 0, 1]));       // 2
console.log(missingNumber([0, 1, 2]));       // 3 (the missing one can be n itself)
console.log(missingNumberXor([9,6,4,2,3,5,7,0,1])); // 8
