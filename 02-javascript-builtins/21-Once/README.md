# 21. `once` — a function that runs only one time

**Frequency in interviews:** high

## The problem

Write `once(fn)`: return a function that executes `fn` only on its first call; later calls return the first result without re-running. Real-world uses: lazy initialization, payment-submit double-click protection.

## Examples

- Valid: two calls → `fn` runs once; second call returns the cached result
- Invalid: expecting the second call to re-run → it never does

## Approach and explanation

Real uses: lazy initialization, event handlers that must fire once, payment submissions (double-click protection!).

## Solution

`code.js`

```js
/**
 * Problem 21 — once(): run a function only the first time
 * Run: node code.js
 */
function once(fn) {
  let called = false, result;
  return function (...args) {
    if (called) return result;
    called = true;
    return (result = fn.apply(this, args));
  };
}

let runs = 0;
const init = once(() => { runs++; return "initialized"; });

console.log(init()); // 'initialized'
console.log(init()); // 'initialized' — cached, fn NOT re-run
console.log(init()); // 'initialized'
console.log("fn ran", runs, "time(s)"); // 1
```

`code.ts`

```ts
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
```
