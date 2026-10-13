/**
 * Problem 1 — FizzBuzz
 * Print 1..100; multiples of 3 -> Fizz, 5 -> Buzz, both -> FizzBuzz.
 * Run: node code.js
 */
for (let i = 1; i <= 100; i++) {
  let out = "";
  if (i % 3 === 0) out += "Fizz";
  if (i % 5 === 0) out += "Buzz";
  console.log(out || i);
}
// Expected: 1, 2, Fizz, 4, Buzz, Fizz, 7, ... 14, FizzBuzz, ...
