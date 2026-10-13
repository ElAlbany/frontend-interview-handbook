/**
 * Problem 21 — once() (TypeScript)
 * Run: node code.ts
 */
function once<F extends (...args: never[]) => unknown>(fn: F): F {
  let called = false;
  let result: unknown;
  return function (this: unknown, ...args: Parameters<F>) {
    if (called) return result;
    called = true;
    return (result = fn.apply(this, args));
  } as F;
}

let runs = 0;
const init = once((): string => {
  runs++;
  return "initialized";
});

console.log(init()); // 'initialized'
console.log(init()); // 'initialized' (cached)
console.log(init()); // 'initialized'
console.log("fn ran", runs, "time(s)"); // 1
