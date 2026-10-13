# 1. FizzBuzz

**Frequency in interviews:** very high

## The problem

Write a function that prints the numbers 1 to 100, one per line — but multiples of 3 print `"Fizz"`, multiples of 5 print `"Buzz"`, and multiples of both print `"FizzBuzz"`. The interviewer is really watching how you handle the "both" case without a clunky if-chain.

## Examples

- Valid: `15` → `"FizzBuzz"` (divisible by both)
- Invalid: `7` → `7` (not divisible by 3 or 5 — prints the number itself)

## Approach and explanation

**Why string concat beats if/else chains:** the 15 case falls out naturally (Fizz+Buzz) instead of needing a separate `i % 15` branch first. O(n) time, O(1) space. Follow-up: "make it extensible for 7 → 'Jazz'" → use a map of divisors.

## Solution

`code.js`

```js
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
```

`code.ts`

```ts
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
```
