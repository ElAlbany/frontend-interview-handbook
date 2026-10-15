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
console.log(sum(1)()); // 1

const add3 = curry((a, b, c) => a + b + c);
console.log(add3(1)(2)(3)); // 6
console.log(add3(1, 2)(3)); // 6 (partial application also works)
