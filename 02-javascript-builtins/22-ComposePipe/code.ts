/**
 * Problem 22 — compose and pipe (TypeScript)
 * Run: node code.ts
 */
const compose = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduceRight((acc, fn) => fn(acc), x);

const pipe = <T>(...fns: Array<(x: T) => T>) =>
  (x: T): T => fns.reduce((acc, fn) => fn(acc), x);

const add1 = (x: number): number => x + 1;
const double = (x: number): number => x * 2;

console.log(pipe(add1, double)(3));    // 8
console.log(compose(add1, double)(3)); // 7
