/**
 * A28 — Climbing stairs (TypeScript). Fibonacci-shaped DP.
 * Run: node code.ts
 */
function climbStairs(n: number): number {
  if (n <= 2) return n;
  let a = 1, // ways(1)
    b = 2;   // ways(2)
  for (let i = 3; i <= n; i++) [a, b] = [b, a + b];
  return b;
}

console.log(climbStairs(2)); // 2
console.log(climbStairs(3)); // 3
console.log(climbStairs(5)); // 8
console.log(climbStairs(10)); // 89
