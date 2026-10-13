/**
 * Problem 1 — FizzBuzz (TypeScript)
 * Run: node code.ts
 */
function fizzBuzz(n: number): void {
  for (let i = 1; i <= n; i++) {
    let out = "";
    if (i % 3 === 0) out += "Fizz";
    if (i % 5 === 0) out += "Buzz";
    console.log(out || i);
  }
}

fizzBuzz(100);
// Expected: 1, 2, Fizz, 4, Buzz, Fizz, 7, ... 14, FizzBuzz, ...
