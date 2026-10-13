# 11. Throttle

**Frequency in interviews:** high

## The problem

Implement `throttle(fn, interval)`: the wrapped function runs at most once per `interval` ms no matter how often it's called; extra calls inside the window are dropped. Used for scroll/resize handlers. Be ready to contrast it with debounce in one sentence.

## Examples

- Valid: 10 calls in 1s with 500ms interval → `fn` runs ~2 times
- Invalid: calls spaced beyond the interval → every one runs (throttle doesn't help there)

## Approach and explanation

Debounce = "wait until they stop" (search box); throttle = "steady drip" (scroll position). Saying when you'd use each matters more than the code.

## Solution

`code.js`

```js
/**
 * Problem 11 — Throttle: at most one run per `interval` ms.
 * Run: node code.js
 */
function throttle(fn, interval) {
  let lastTime = 0;
  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

const log = throttle((msg) => console.log("fired:", msg), 500);
log("a"); // fires (first call always runs)
log("b"); // dropped — inside the 500ms window
log("c"); // dropped
setTimeout(() => log("d"), 600); // fires — window expired
// Expected output: 'fired: a' then 'fired: d'
```

`code.ts`

```ts
/**
 * Problem 11 — Throttle (TypeScript)
 * Run: node code.ts
 */
function throttle<F extends (...args: never[]) => void>(
  fn: F,
  interval: number
): (...args: Parameters<F>) => void {
  let lastTime = 0;
  return function (this: unknown, ...args: Parameters<F>) {
    const now = Date.now();
    if (now - lastTime >= interval) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}

const log = throttle((msg: string) => console.log("fired:", msg), 500);
log("a"); // fires
log("b"); // dropped
log("c"); // dropped
setTimeout(() => log("d"), 600); // fires
```
