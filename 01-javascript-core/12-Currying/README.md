# 12. Currying — `sum(1)(2)(3)()`

**Frequency in interviews:** high

## The problem

Write `sum` so that `sum(1)(2)(3)()` returns `6` — each call takes one argument, and calling with **no** argument returns the accumulated total. Then be ready to describe general currying: transforming `f(a, b, c)` into `f(a)(b)(c)`.

## Examples

- Valid: `sum(1)(2)(3)()` → `6`
- Invalid: `sum(1)()` → `1` (calling with no argument returns the accumulated value)

## Approach and explanation

Currying = transforming `f(a, b, c)` into `f(a)(b)(c)`. Real use: partially applied config — `const withAuth = api(token)` then `withAuth.get('/cars')`.

## Solution

`code.js`

```js
/**
 * Problem 12 — Currying: sum(1)(2)(3)() and a general curry helper
 * Run: node code.js
 */
function sum(a) {
  return function (b) {
    if (b === undefined) return a;
    return sum(a + b);
  };
}

const curry = (fn) =>
  function curried(...args) {
    return args.length >= fn.length
      ? fn(...args)
      : (...rest) => curried(...args, ...rest);
  };

console.log(sum(1)(2)(3)()); // 6
console.log(sum(1)());       // 1

const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)(3));   // 6
console.log(add3(1, 2)(3));   // 6 (partial application also works)
```

`code.ts`

```ts
/**
 * Problem 12 — Currying (TypeScript)
 * Run: node code.ts
 */
type Summer = (b?: number) => number | Summer;

function sum(a: number): Summer {
  return function (b?: number): number | Summer {
    if (b === undefined) return a;
    return sum(a + b);
  };
}

console.log(sum(1)(2)(3)() as number); // 6 — hmm, see note below
console.log(sum(1)());                 // 1

// A fully type-safe curried 3-argument adder:
function curry3<A, B, C, R>(fn: (a: A, b: B, c: C) => R) {
  return (a: A) => (b: B) => (c: C): R => fn(a, b, c);
}
const add3 = curry3((a: number, b: number, c: number) => a + b + c);
console.log(add3(1)(2)(3)); // 6

// Note: typing variadic curry in full generality requires tuple-type
// recursion — a known hard TypeScript exercise, fine to mention as such.
```
