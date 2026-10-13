/**
 * Problem 6 — Fibonacci: naive (O(2^n)), memoized (O(n)), iterative (O(n) time, O(1) space)
 * Run: node code.js
 */
const fibBad = (n) => (n <= 1 ? n : fibBad(n - 1) + fibBad(n - 2)); // trap answer

function fibMemo(n, memo = {}) {
  if (n <= 1) return n;
  if (memo[n]) return memo[n];
  return (memo[n] = fibMemo(n - 1, memo) + fibMemo(n - 2, memo));
}

function fib(n) {
  if (n < 0) throw new Error("n must be >= 0");
  let a = 0, b = 1;
  for (let i = 0; i < n; i++) [a, b] = [b, a + b];
  return a;
}

console.log(fib(0));      // 0
console.log(fib(1));      // 1
console.log(fib(10));     // 55
console.log(fibMemo(50)); // 12586269025 (instant — fibBad(50) would take minutes)
