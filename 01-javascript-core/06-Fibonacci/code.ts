/**
 * Problem 6 — Fibonacci three ways (TypeScript)
 * Run: node code.ts
 */
function fibMemo(n: number, memo: Record<number, number> = {}): number {
  if (n <= 1) return n;
  if (memo[n] !== undefined) return memo[n];
  return (memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
}

function fib(n: number): number {
  if (n < 0) throw new Error("n must be >= 0");
  let a = 0,
    b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

console.log(fib(0));      // 0
console.log(fib(10));     // 55
console.log(fibMemo(50)); // 12586269025
