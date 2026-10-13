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
