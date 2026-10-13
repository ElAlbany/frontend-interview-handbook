/**
 * Problem 22 — compose and pipe
 * Run: node code.js
 */
const compose = (...fns) => (x) => fns.reduceRight((acc, fn) => fn(acc), x);
const pipe = (...fns) => (x) => fns.reduce((acc, fn) => fn(acc), x);

const add1 = (x) => x + 1;
const double = (x) => x * 2;

console.log(pipe(add1, double)(3));    // 8  — add1 first, then double
console.log(compose(add1, double)(3)); // 7  — double first, then add1
